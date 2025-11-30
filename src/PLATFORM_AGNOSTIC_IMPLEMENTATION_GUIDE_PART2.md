# 🔧 Talent Tutor - Platform-Agnostic Implementation Guide (Part 2)

> এই ডকুমেন্ট Part 1 এর continuation

---

## 💳 Payment System বিস্তারিত

### Payment Flow Chart

```
User Selects Package
  ↓
Select Payment Method
  ↓
┌───────────────────────┐
│  Payment Method?      │
├───────────────────────┤
│ bKash    → bKash API  │
│ Nagad    → Nagad API  │
│ Card     → SSL API    │
│ Bank     → SSL API    │
└───────────────────────┘
  ↓
Create Payment Intent
  ↓
Redirect to Payment Gateway
  ↓
User Completes Payment
  ↓
Gateway Callback
  ↓
Verify Payment
  ↓
Update Payment Status
  ↓
Add Credits to Account
  ↓
Generate Receipt
  ↓
Send Confirmation Email
  ↓
Show Success Message
```

---

### 1. bKash Integration

#### bKash Payment Flow

```typescript
// Step 1: Get bKash Token
function getBkashToken(): Promise<string> {
  const credentials = {
    app_key: process.env.BKASH_APP_KEY,
    app_secret: process.env.BKASH_APP_SECRET
  };
  
  const authHeader = 'Basic ' + base64Encode(
    process.env.BKASH_USERNAME + ':' + process.env.BKASH_PASSWORD
  );
  
  const response = await fetch(
    process.env.BKASH_BASE_URL + '/tokenized/checkout/token/grant',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'username': process.env.BKASH_USERNAME,
        'password': process.env.BKASH_PASSWORD
      },
      body: JSON.stringify(credentials)
    }
  );
  
  const data = await response.json();
  return data.id_token;
}

// Step 2: Create Payment
async function createBkashPayment(
  userId: string,
  amount: number,
  invoiceNumber: string
): Promise<BkashPaymentResponse> {
  
  const token = await getBkashToken();
  
  const paymentRequest = {
    mode: '0011',  // Checkout
    payerReference: userId,
    callbackURL: process.env.APP_URL + '/payment/bkash/callback',
    amount: amount.toString(),
    currency: 'BDT',
    intent: 'sale',
    merchantInvoiceNumber: invoiceNumber
  };
  
  const response = await fetch(
    process.env.BKASH_BASE_URL + '/tokenized/checkout/create',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'X-APP-Key': process.env.BKASH_APP_KEY
      },
      body: JSON.stringify(paymentRequest)
    }
  );
  
  const data = await response.json();
  
  if (data.statusCode !== '0000') {
    throw new Error('bKash payment creation failed: ' + data.statusMessage);
  }
  
  return {
    paymentID: data.paymentID,
    bkashURL: data.bkashURL,
    callbackURL: data.callbackURL,
    amount: data.amount,
    invoiceNumber: data.merchantInvoiceNumber
  };
}

// Step 3: Execute Payment (after user completes on bKash app)
async function executeBkashPayment(
  paymentID: string
): Promise<BkashExecuteResponse> {
  
  const token = await getBkashToken();
  
  const response = await fetch(
    process.env.BKASH_BASE_URL + '/tokenized/checkout/execute',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
        'X-APP-Key': process.env.BKASH_APP_KEY
      },
      body: JSON.stringify({ paymentID })
    }
  );
  
  const data = await response.json();
  
  if (data.statusCode !== '0000') {
    throw new Error('bKash payment execution failed: ' + data.statusMessage);
  }
  
  return {
    paymentID: data.paymentID,
    trxID: data.trxID,
    transactionStatus: data.transactionStatus,
    amount: data.amount,
    customerMsisdn: data.customerMsisdn,
    paymentExecuteTime: data.paymentExecuteTime
  };
}

// Complete Payment Flow
async function processBkashPayment(
  userId: string,
  packageId: string,
  amount: number
): Promise<PaymentResult> {
  
  // 1. Generate invoice number
  const invoiceNumber = 'INV-' + Date.now() + '-' + Math.random().toString(36).substr(2, 9);
  
  // 2. Create payment record (pending)
  const payment = {
    id: generateUUID(),
    userId: userId,
    packageId: packageId,
    amount: amount,
    paymentMethod: 'bkash',
    invoiceNumber: invoiceNumber,
    status: 'pending',
    createdAt: now()
  };
  
  database.insert('payments', payment);
  
  // 3. Create bKash payment
  const bkashPayment = await createBkashPayment(userId, amount, invoiceNumber);
  
  // 4. Update payment with bKash payment ID
  database.query(`
    UPDATE payments 
    SET transaction_id = ?
    WHERE id = ?
  `, [bkashPayment.paymentID, payment.id]);
  
  // 5. Return bKash URL for user to complete payment
  return {
    success: true,
    paymentId: payment.id,
    bkashURL: bkashPayment.bkashURL,
    paymentID: bkashPayment.paymentID,
    message: 'Please complete payment on bKash'
  };
}

// Callback Handler (called by bKash after payment)
async function handleBkashCallback(
  paymentID: string,
  status: string
): Promise<void> {
  
  if (status === 'success') {
    // Execute payment
    const execution = await executeBkashPayment(paymentID);
    
    // Find payment record
    const payment = database.query(`
      SELECT * FROM payments 
      WHERE transaction_id = ?
    `, [paymentID])[0];
    
    if (!payment) {
      throw new Error('Payment record not found');
    }
    
    // Update payment status
    database.query(`
      UPDATE payments 
      SET status = 'completed',
          completed_at = ?,
          metadata = ?
      WHERE id = ?
    `, [
      now(),
      JSON.stringify(execution),
      payment.id
    ]);
    
    // Add credits
    const package = CREDIT_PACKAGES.find(p => p.id === payment.packageId);
    const totalCredits = package.credits + package.bonus;
    
    addCredits(
      payment.userId,
      totalCredits,
      'purchased',
      `${package.name} প্যাকেজ ক্রয় (bKash)`
    );
    
    // Send notifications
    sendPaymentSuccessNotifications(payment.userId, payment, package);
    
  } else {
    // Payment failed
    database.query(`
      UPDATE payments 
      SET status = 'failed',
          failure_reason = ?
      WHERE transaction_id = ?
    `, [status, paymentID]);
  }
}
```

---

### 2. Nagad Integration

```typescript
// Similar structure to bKash, but different API endpoints

async function createNagadPayment(
  userId: string,
  amount: number,
  orderId: string
): Promise<NagadPaymentResponse> {
  
  // 1. Create order
  const orderData = {
    merchantId: process.env.NAGAD_MERCHANT_ID,
    orderId: orderId,
    amount: amount.toString(),
    currency: 'BDT',
    challenge: generateRandomString(40)
  };
  
  // 2. Sign the order
  const signature = signWithPrivateKey(orderData, process.env.NAGAD_PRIVATE_KEY);
  
  // 3. Call Nagad API
  const response = await fetch(
    process.env.NAGAD_BASE_URL + '/check-out/initialize/' + process.env.NAGAD_MERCHANT_ID + '/' + orderId,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-KM-Api-Version': 'v-0.2.0',
        'X-KM-IP-V4': getUserIP(),
        'X-KM-Client-Type': 'PC_WEB'
      },
      body: JSON.stringify({
        accountNumber: process.env.NAGAD_MERCHANT_NUMBER,
        dateTime: new Date().toISOString(),
        sensitiveData: encrypt(JSON.stringify(orderData), process.env.NAGAD_PUBLIC_KEY),
        signature: signature
      })
    }
  );
  
  const data = await response.json();
  
  return {
    paymentReferenceId: data.paymentReferenceId,
    checkoutURL: data.callBackUrl,
    orderId: orderId
  };
}

// Complete Payment
async function completeNagadPayment(
  paymentReferenceId: string
): Promise<NagadExecuteResponse> {
  
  // Verify with Nagad
  const response = await fetch(
    process.env.NAGAD_BASE_URL + '/verify/payment/' + paymentReferenceId,
    {
      method: 'GET',
      headers: {
        'X-KM-Api-Version': 'v-0.2.0',
        'X-KM-IP-V4': getUserIP()
      }
    }
  );
  
  const data = await response.json();
  
  return {
    orderId: data.orderId,
    paymentRefId: data.paymentRefId,
    amount: data.amount,
    status: data.status,
    issuerPaymentDateTime: data.issuerPaymentDateTime
  };
}
```

---

### 3. SSLCOMMERZ Integration (Card/Bank)

```typescript
async function initializeSSLPayment(
  userId: string,
  amount: number,
  packageId: string
): Promise<SSLPaymentResponse> {
  
  const user = getUser(userId);
  const transactionId = 'TXN-' + Date.now();
  
  const paymentData = {
    store_id: process.env.SSL_STORE_ID,
    store_passwd: process.env.SSL_STORE_PASSWORD,
    total_amount: amount,
    currency: 'BDT',
    tran_id: transactionId,
    success_url: process.env.APP_URL + '/payment/ssl/success',
    fail_url: process.env.APP_URL + '/payment/ssl/fail',
    cancel_url: process.env.APP_URL + '/payment/ssl/cancel',
    emi_option: 0,
    cus_name: user.fullName,
    cus_email: user.email,
    cus_phone: user.phone,
    cus_add1: user.address || 'Dhaka',
    cus_city: 'Dhaka',
    cus_country: 'Bangladesh',
    product_name: 'Credit Package',
    product_category: 'Digital',
    product_profile: 'general',
    shipping_method: 'NO',
    num_of_item: 1,
    product_amount: amount
  };
  
  const response = await fetch(
    process.env.SSL_BASE_URL + '/gwprocess/v4/api.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(paymentData)
    }
  );
  
  const data = await response.json();
  
  if (data.status === 'SUCCESS') {
    return {
      sessionKey: data.sessionkey,
      gatewayURL: data.GatewayPageURL,
      transactionId: transactionId
    };
  } else {
    throw new Error('SSL payment initialization failed');
  }
}

// Validation after payment
async function validateSSLPayment(
  transactionId: string
): Promise<SSLValidationResponse> {
  
  const validationData = {
    store_id: process.env.SSL_STORE_ID,
    store_passwd: process.env.SSL_STORE_PASSWORD,
    val_id: transactionId
  };
  
  const response = await fetch(
    process.env.SSL_BASE_URL + '/validator/api/validationserverAPI.php',
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: new URLSearchParams(validationData)
    }
  );
  
  const data = await response.json();
  
  return {
    status: data.status,
    transactionId: data.tran_id,
    amount: data.amount,
    cardType: data.card_type,
    cardBrand: data.card_brand
  };
}
```

---

## 📍 Location System বিস্তারিত

### Bangladesh Location Data

```typescript
// Complete Bangladesh location hierarchy
const BangladeshLocations = {
  divisions: [
    'ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা',
    'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'
  ],
  
  districts: {
    'ঢাকা': [
      'ঢাকা', 'গাজীপুর', 'নারায়ণগঞ্জ', 'টাঙ্গাইল',
      'মানিকগঞ্জ', 'মুন্সিগঞ্জ', 'ফরিদপুর', 'গোপালগঞ্জ',
      'মাদারীপুর', 'রাজবাড়ী', 'শরীয়তপুর', 'কিশোরগঞ্জ',
      'নরসিংদী'
    ],
    'চট্টগ্রাম': [
      'চট্টগ্রাম', 'কক্সবাজার', 'রাঙ্গামাটি', 'বান্দরবান',
      'খাগড়াছড়ি', 'ফেনী', 'লক্ষ্মীপুর', 'কুমিল্লা',
      'নোয়াখালী', 'ব্রাহ্মণবাড়িয়া', 'চাঁদপুর'
    ],
    // ... বাকি divisions
  },
  
  areas: {
    'ঢাকা': [
      'ধানমন্ডি', 'মিরপুর', 'গুলশান', 'বনানী', 'উত্তরা',
      'মোহাম্মদপুর', 'বাড়ীধারা', 'ক্যান্টনমেন্ট', 'মতিঝিল',
      'কাওরানবাজার', 'নিউমার্কেট', 'বায়তুল মোকাররম', 'রমনা',
      'শাহবাগ', 'নীলক্ষেত', 'পল্টন', 'কাকরাইল', 'মগবাজার',
      'মালিবাগ', 'খিলগাঁও', 'যাত্রাবাড়ী', 'সায়েদাবাদ',
      'জিগাতলা', 'কল্যাণপুর', 'শ্যামলী', 'আগারগাঁও',
      'তেজগাঁও', 'রামপুরা', 'বাড্ডা', 'নতুনবাজার'
      // ... আরো areas
    ],
    // ... বাকি districts
  }
};

// Helper functions
function getDivisions(): string[] {
  return BangladeshLocations.divisions;
}

function getDistricts(division: string): string[] {
  return BangladeshLocations.districts[division] || [];
}

function getAreas(district: string): string[] {
  return BangladeshLocations.areas[district] || [];
}

function validateLocation(
  division: string,
  district: string,
  area: string
): boolean {
  
  // Check division exists
  if (!BangladeshLocations.divisions.includes(division)) {
    return false;
  }
  
  // Check district belongs to division
  const districts = getDistricts(division);
  if (!districts.includes(district)) {
    return false;
  }
  
  // Check area belongs to district
  const areas = getAreas(district);
  if (!areas.includes(area)) {
    return false;
  }
  
  return true;
}
```

---

### Google Maps Integration

```typescript
// Get coordinates from address
async function geocodeAddress(address: string): Promise<Coordinates> {
  const response = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?address=${encodeURIComponent(address)}&key=${GOOGLE_MAPS_API_KEY}`
  );
  
  const data = await response.json();
  
  if (data.status === 'OK' && data.results.length > 0) {
    const location = data.results[0].geometry.location;
    return {
      latitude: location.lat,
      longitude: location.lng
    };
  }
  
  throw new Error('Geocoding failed');
}

// Calculate distance between two points (Haversine formula)
function calculateDistance(
  lat1: number,
  lon1: number,
  lat2: number,
  lon2: number
): number {
  
  const R = 6371; // Radius of Earth in km
  const dLat = toRadians(lat2 - lat1);
  const dLon = toRadians(lon2 - lon1);
  
  const a = 
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRadians(lat1)) * Math.cos(toRadians(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c;
  
  return distance; // in km
}

function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

// Find teachers near a location
function findTeachersNearLocation(
  latitude: number,
  longitude: number,
  radiusKm: number
): Teacher[] {
  
  const teachers = getAllTeachers();
  const nearbyTeachers = [];
  
  for (const teacher of teachers) {
    if (teacher.latitude && teacher.longitude) {
      const distance = calculateDistance(
        latitude,
        longitude,
        teacher.latitude,
        teacher.longitude
      );
      
      if (distance <= radiusKm) {
        nearbyTeachers.push({
          ...teacher,
          distance: distance
        });
      }
    }
  }
  
  // Sort by distance
  nearbyTeachers.sort((a, b) => a.distance - b.distance);
  
  return nearbyTeachers;
}
```

---

## ⭐ Review & Rating System বিস্তারিত

### 1. Submit Review

```typescript
function submitReview(
  guardianId: string,
  teacherId: string,
  contractId: string,
  rating: number,
  comment: string
): Review {
  
  // 1. Validate guardian
  const guardian = getUser(guardianId);
  if (guardian.role !== 'guardian') {
    throw new Error('Only guardians can submit reviews');
  }
  
  // 2. Validate rating
  if (rating < 1 || rating > 5 || !Number.isInteger(rating)) {
    throw new Error('Rating must be an integer between 1 and 5');
  }
  
  // 3. Validate comment
  if (comment && comment.length > 1000) {
    throw new Error('Comment must not exceed 1000 characters');
  }
  
  // 4. Verify contract exists and is completed
  const contract = getContract(contractId);
  if (!contract) {
    throw new Error('Contract not found');
  }
  
  if (contract.status !== 'completed') {
    throw new Error('Can only review completed contracts');
  }
  
  if (contract.guardianId !== guardianId || contract.teacherId !== teacherId) {
    throw new Error('Invalid contract');
  }
  
  // 5. Check if already reviewed
  const existingReview = database.query(`
    SELECT id FROM reviews 
    WHERE contract_id = ? AND guardian_id = ?
  `, [contractId, guardianId]);
  
  if (existingReview.length > 0) {
    throw new Error('You have already reviewed this contract');
  }
  
  // 6. Create review
  const review = {
    id: generateUUID(),
    teacherId: teacherId,
    guardianId: guardianId,
    contractId: contractId,
    rating: rating,
    comment: comment,
    status: 'published',
    helpfulCount: 0,
    reportCount: 0,
    createdAt: now()
  };
  
  database.insert('reviews', review);
  
  // 7. Update teacher rating
  updateTeacherRating(teacherId);
  
  // 8. Give bonus credits to guardian
  addCredits(
    guardianId,
    CREDIT_COSTS.FIRST_REVIEW,
    'earned',
    'প্রথম রিভিউ দেওয়ার বোনাস'
  );
  
  // 9. Send notification to teacher
  sendNotification(teacherId, {
    type: 'review_received',
    title: 'নতুন রিভিউ পেয়েছেন',
    message: `${guardian.fullName} আপনাকে ${rating} স্টার রেটিং দিয়েছেন`,
    link: `/reviews/${review.id}`
  });
  
  return review;
}

// Update teacher's average rating
function updateTeacherRating(teacherId: string): void {
  const reviews = database.query(`
    SELECT rating FROM reviews 
    WHERE teacher_id = ? AND status = 'published'
  `, [teacherId]);
  
  if (reviews.length === 0) {
    return;
  }
  
  const totalRating = reviews.reduce((sum, r) => sum + r.rating, 0);
  const averageRating = totalRating / reviews.length;
  
  database.query(`
    UPDATE teacher_profiles 
    SET rating = ?,
        total_reviews = ?
    WHERE user_id = ?
  `, [
    Math.round(averageRating * 100) / 100, // Round to 2 decimal places
    reviews.length,
    teacherId
  ]);
}
```

---

### 2. Report Review

```typescript
function reportReview(
  userId: string,
  reviewId: string,
  reason: string
): void {
  
  // 1. Validate review exists
  const review = getReview(reviewId);
  if (!review) {
    throw new Error('Review not found');
  }
  
  // 2. Check if already reported by this user
  const existingReport = database.query(`
    SELECT id FROM review_reports 
    WHERE review_id = ? AND reported_by = ?
  `, [reviewId, userId]);
  
  if (existingReport.length > 0) {
    throw new Error('You have already reported this review');
  }
  
  // 3. Create report
  const report = {
    id: generateUUID(),
    reviewId: reviewId,
    reportedBy: userId,
    reason: reason,
    status: 'pending',
    createdAt: now()
  };
  
  database.insert('review_reports', report);
  
  // 4. Increment report count
  database.query(`
    UPDATE reviews 
    SET report_count = report_count + 1
    WHERE id = ?
  `, [reviewId]);
  
  // 5. If report count exceeds threshold, auto-hide
  const updatedReview = getReview(reviewId);
  if (updatedReview.reportCount >= 5) {
    database.query(`
      UPDATE reviews 
      SET status = 'hidden'
      WHERE id = ?
    `, [reviewId]);
    
    // Notify admin
    sendNotificationToAdmins({
      type: 'review_auto_hidden',
      title: 'রিভিউ স্বয়ংক্রিয়ভাবে লুকানো হয়েছে',
      message: 'একটি রিভিউতে ৫+ রিপোর্ট পাওয়ায় এটি লুকানো হয়েছে',
      link: `/admin/reviews/moderate/${reviewId}`
    });
  }
}
```

---

## 🔄 State Management Strategy

### Application State Structure

```typescript
AppState {
  // Auth State
  auth: {
    isAuthenticated: boolean,
    user: User | null,
    token: string | null,
    loading: boolean,
    error: string | null
  },
  
  // User Profile State
  profile: {
    basicProfile: UserProfile | null,
    roleProfile: TeacherProfile | GuardianProfile | StudentProfile | null,
    loading: boolean,
    error: string | null
  },
  
  // Credits State
  credits: {
    balance: number,
    transactions: CreditTransaction[],
    packages: CreditPackage[],
    loading: boolean
  },
  
  // Tuitions State
  tuitions: {
    posts: TuitionPost[],
    filters: TuitionFilters,
    pagination: {
      currentPage: number,
      totalPages: number,
      totalItems: number
    },
    loading: boolean
  },
  
  // Applications State
  applications: {
    sent: Application[],
    received: Application[],
    loading: boolean
  },
  
  // Messages State
  messages: {
    conversations: Conversation[],
    activeConversation: Conversation | null,
    messages: Message[],
    unreadCount: number,
    loading: boolean
  },
  
  // Notifications State
  notifications: {
    items: Notification[],
    unreadCount: number,
    loading: boolean
  },
  
  // Donations State
  donations: {
    requests: DonationRequest[],
    myDonations: Donation[],
    receivedDonations: Donation[],
    loading: boolean
  },
  
  // UI State
  ui: {
    sidebarOpen: boolean,
    activeTab: string,
    modal: {
      type: string | null,
      data: any,
      isOpen: boolean
    },
    toast: {
      message: string,
      type: 'success' | 'error' | 'info',
      visible: boolean
    }
  }
}
```

---

### State Management Actions

```typescript
// Auth Actions
function loginAction(credentials: LoginData) {
  setState({ auth: { loading: true, error: null } });
  
  try {
    const result = await authService.login(credentials);
    
    if (result.success) {
      setState({
        auth: {
          isAuthenticated: true,
          user: result.user,
          token: result.token,
          loading: false,
          error: null
        }
      });
      
      // Store in local storage
      storage.set('auth_token', result.token);
      storage.set('current_user', JSON.stringify(result.user));
      
      // Navigate to dashboard
      navigate('/' + result.user.role + '-dashboard');
    }
  } catch (error) {
    setState({
      auth: {
        loading: false,
        error: error.message
      }
    });
  }
}

function logoutAction() {
  // Clear state
  setState({
    auth: {
      isAuthenticated: false,
      user: null,
      token: null,
      loading: false,
      error: null
    }
  });
  
  // Clear storage
  storage.remove('auth_token');
  storage.remove('current_user');
  
  // Navigate to home
  navigate('/');
}

// Credits Actions
function loadCreditsAction(userId: string) {
  setState({ credits: { loading: true } });
  
  const balance = creditService.getBalance(userId);
  const transactions = creditService.getTransactions(userId);
  const packages = creditService.getPackages();
  
  setState({
    credits: {
      balance: balance,
      transactions: transactions,
      packages: packages,
      loading: false
    }
  });
}

// Tuitions Actions
function loadTuitionsAction(filters: TuitionFilters) {
  setState({ tuitions: { loading: true } });
  
  const result = tuitionService.browse(filters);
  
  setState({
    tuitions: {
      posts: result.items,
      filters: filters,
      pagination: result.pagination,
      loading: false
    }
  });
}

// Messages Actions
function sendMessageAction(receiverId: string, content: string) {
  const message = messageService.send({
    senderId: currentUserId,
    receiverId: receiverId,
    content: content
  });
  
  // Optimistic update
  setState({
    messages: {
      messages: [...state.messages.messages, message]
    }
  });
}
```

---

## 🚨 Error Handling

### Error Types

```typescript
enum ErrorType {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  AUTHENTICATION_ERROR = 'AUTHENTICATION_ERROR',
  AUTHORIZATION_ERROR = 'AUTHORIZATION_ERROR',
  INSUFFICIENT_CREDITS = 'INSUFFICIENT_CREDITS',
  NOT_FOUND = 'NOT_FOUND',
  ALREADY_EXISTS = 'ALREADY_EXISTS',
  PAYMENT_FAILED = 'PAYMENT_FAILED',
  NETWORK_ERROR = 'NETWORK_ERROR',
  SERVER_ERROR = 'SERVER_ERROR',
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

class AppError extends Error {
  type: ErrorType;
  statusCode: number;
  isOperational: boolean;
  
  constructor(
    type: ErrorType,
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true
  ) {
    super(message);
    this.type = type;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
  }
}
```

---

### Error Handling Strategy

```typescript
// Global error handler
function handleError(error: Error | AppError): void {
  
  if (error instanceof AppError) {
    
    switch (error.type) {
      
      case ErrorType.AUTHENTICATION_ERROR:
        // Redirect to login
        logout();
        navigate('/login');
        showToast('আবার লগইন করুন', 'error');
        break;
      
      case ErrorType.AUTHORIZATION_ERROR:
        showToast('আপনার এই কাজ করার অনুমতি নেই', 'error');
        navigate('/');
        break;
      
      case ErrorType.INSUFFICIENT_CREDITS:
        showToast('যথেষ্ট ক্রেডিট নেই। ক্রেডিট কিনুন।', 'error');
        navigate('/credit-purchase');
        break;
      
      case ErrorType.VALIDATION_ERROR:
        showToast(error.message, 'error');
        break;
      
      case ErrorType.NOT_FOUND:
        showToast('তথ্য পাওয়া যায়নি', 'error');
        navigate('/');
        break;
      
      case ErrorType.PAYMENT_FAILED:
        showToast('পেমেন্ট ব্যর্থ হয়েছে। আবার চেষ্টা করুন।', 'error');
        break;
      
      case ErrorType.NETWORK_ERROR:
        showToast('ইন্টারনেট সংযোগ সমস্যা', 'error');
        break;
      
      default:
        showToast('কিছু একটা সমস্যা হয়েছে', 'error');
        break;
    }
    
    // Log error
    logError(error);
    
  } else {
    // Unknown error
    showToast('একটি সমস্যা হয়েছে', 'error');
    logError(error);
  }
}

// Usage in async functions
async function applyToTuition(tuitionId: string, proposal: string) {
  try {
    const result = await tuitionService.apply(tuitionId, proposal);
    showToast('আবেদন সফল হয়েছে', 'success');
    return result;
  } catch (error) {
    handleError(error);
    throw error;
  }
}
```

---

## 📡 API Contracts

### Request/Response Format

```typescript
// Standard API Response
interface APIResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
  message?: string;
  pagination?: {
    page: number;
    limit: number;
    total: number;
  };
}

// Example: Login Response
{
  "success": true,
  "data": {
    "user": {
      "id": "uuid",
      "email": "user@example.com",
      "role": "teacher",
      "fullName": "করিম উদ্দিন"
    },
    "token": "jwt_token_here"
  },
  "message": "Login successful"
}

// Example: Error Response
{
  "success": false,
  "error": "Invalid credentials",
  "message": "লগইন ব্যর্থ"
}

// Example: List Response with Pagination
{
  "success": true,
  "data": {
    "items": [...],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100
    }
  }
}
```

---

## 🔒 Security Best Practices

### 1. Password Security

```typescript
// Hash password before storing
function hashPassword(password: string): string {
  // Use bcrypt with salt rounds of 10
  return bcrypt.hash(password, 10);
}

// Verify password
function verifyPassword(password: string, hash: string): boolean {
  return bcrypt.compare(password, hash);
}

// Password strength validation
function validatePassword(password: string): boolean {
  // At least 6 characters
  if (password.length < 6) return false;
  
  // At least one letter
  if (!/[a-zA-Z]/.test(password)) return false;
  
  // At least one number
  if (!/[0-9]/.test(password)) return false;
  
  return true;
}
```

---

### 2. JWT Token Security

```typescript
// Generate JWT with expiration
function generateJWT(payload: any): string {
  return jwt.sign(
    payload,
    JWT_SECRET,
    {
      expiresIn: '7d', // 7 days
      issuer: 'talent-tutor',
      audience: 'talent-tutor-users'
    }
  );
}

// Verify JWT
function verifyJWT(token: string): any {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new AppError(
      ErrorType.AUTHENTICATION_ERROR,
      'Invalid or expired token',
      401
    );
  }
}

// Check if token is expired
function isTokenExpired(token: string): boolean {
  try {
    const decoded = jwt.decode(token);
    const now = Date.now() / 1000;
    return decoded.exp < now;
  } catch {
    return true;
  }
}
```

---

### 3. Input Sanitization

```typescript
// Sanitize user input to prevent XSS
function sanitizeInput(input: string): string {
  return input
    .replace(/</g, '<')
    .replace(/>/g, '>')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;')
    .replace(/\//g, '&#x2F;');
}

// Validate and sanitize form data
function validateFormData(data: any): any {
  const sanitized = {};
  
  for (const key in data) {
    if (typeof data[key] === 'string') {
      sanitized[key] = sanitizeInput(data[key].trim());
    } else {
      sanitized[key] = data[key];
    }
  }
  
  return sanitized;
}
```

---

### 4. Rate Limiting

```typescript
// Simple rate limiter
class RateLimiter {
  private requests: Map<string, number[]> = new Map();
  private limit: number;
  private windowMs: number;
  
  constructor(limit: number, windowMs: number) {
    this.limit = limit;
    this.windowMs = windowMs;
  }
  
  isAllowed(userId: string): boolean {
    const now = Date.now();
    const userRequests = this.requests.get(userId) || [];
    
    // Remove old requests outside window
    const validRequests = userRequests.filter(
      time => now - time < this.windowMs
    );
    
    if (validRequests.length >= this.limit) {
      return false;
    }
    
    validRequests.push(now);
    this.requests.set(userId, validRequests);
    
    return true;
  }
}

// Usage
const loginLimiter = new RateLimiter(5, 15 * 60 * 1000); // 5 requests per 15 minutes

function login(credentials: LoginData) {
  if (!loginLimiter.isAllowed(credentials.emailOrPhone)) {
    throw new AppError(
      ErrorType.AUTHORIZATION_ERROR,
      'Too many login attempts. Please try again later.',
      429
    );
  }
  
  // Proceed with login
  ...
}
```

---

## 🎯 Implementation Checklist

এই ডকুমেন্ট অনুসরণ করে যেকোনো প্ল্যাটফর্মে implementation করার জন্য:

### ✅ Phase 1: Foundation
```
□ Setup project structure
□ Implement data models
□ Setup local storage/database
□ Implement authentication
□ Implement authorization guards
```

### ✅ Phase 2: Core Features
```
□ Implement credit system
□ Implement tuition marketplace
□ Implement application system
□ Implement user profiles
□ Implement location system
```

### ✅ Phase 3: Communication
```
□ Implement messaging
□ Implement notifications
□ Implement real-time updates
```

### ✅ Phase 4: Payments
```
□ Integrate bKash
□ Integrate Nagad
□ Integrate SSLCOMMERZ
□ Implement payment verification
```

### ✅ Phase 5: Advanced Features
```
□ Implement donation system
□ Implement review system
□ Implement contract system
□ Implement analytics
```

---

**এই গাইড দিয়ে আপনি Flutter, React Native, বা যেকোনো প্ল্যাটফর্মে Talent Tutor তৈরি করতে পারবেন!** 🚀

---

**Last Updated**: November 28, 2025  
**Version**: 2.0  
**Platform**: Agnostic (Works with any framework)

