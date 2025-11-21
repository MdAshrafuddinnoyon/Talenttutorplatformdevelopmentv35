# 🧩 Component Usage Guide - Talent Tutor

This guide provides correct usage examples for key components in the Talent Tutor platform.

---

## 🎁 PaymentGatewayDialog

### ✅ Correct Usage

```tsx
import { PaymentGatewayDialog } from '../components/PaymentGatewayDialog';

function MyComponent() {
  const [showPayment, setShowPayment] = useState(false);
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');
  const [currentUser, setCurrentUser] = useState<any>(null);

  return (
    <PaymentGatewayDialog
      open={showPayment}
      onOpenChange={setShowPayment}
      amount={5000}
      donorName={currentUser?.name || 'Anonymous'}
      donationType="বৃত্তি"
      language={language}  // ⭐ REQUIRED
      onPaymentSuccess={(transactionData) => {
        console.log('Payment successful:', transactionData);
        setShowPayment(false);
      }}
    />
  );
}
```

### 📋 Props Interface

```tsx
interface PaymentGatewayDialogProps {
  open: boolean;                              // Dialog open state
  onOpenChange: (open: boolean) => void;      // Open state handler
  amount: number;                             // Payment amount
  donorName?: string;                         // Donor's name (optional)
  donationType: string;                       // Type of donation (e.g., 'বৃত্তি', 'বই')
  onPaymentSuccess: (transactionData: any) => void;  // Success callback
  language: 'bn' | 'en';                      // ⭐ REQUIRED - Language for UI
}
```

### ❌ Common Mistakes

#### Mistake 1: Missing `language` prop
```tsx
// ❌ Wrong - Will cause error
<PaymentGatewayDialog
  open={showPayment}
  amount={5000}
  // Missing language prop!
/>
// Error: Cannot read properties of undefined (reading 'bkash')
```

#### Mistake 2: Wrong prop names
```tsx
// ❌ Wrong - Props don't match interface
<PaymentGatewayDialog
  open={showPayment}
  onOpenChange={setShowPayment}
  amount={5000}
  studentName="রহিম"          // ❌ Should be "donorName"
  onSuccess={() => {}}         // ❌ Should be "onPaymentSuccess"
  language={language}
/>
```

#### Mistake 3: Wrong callback parameter
```tsx
// ❌ Wrong - Missing transactionData parameter
<PaymentGatewayDialog
  onPaymentSuccess={() => {   // ❌ Missing parameter
    doSomething();
  }}
/>

// ✅ Correct - Includes transactionData parameter
<PaymentGatewayDialog
  onPaymentSuccess={(transactionData) => {
    console.log(transactionData);
    doSomething();
  }}
/>
```

---

## 💸 DonorAuthDialog

### ✅ Correct Usage

```tsx
import { DonorAuthDialog } from '../components/DonorAuthDialog';

function MyComponent() {
  const [showAuth, setShowAuth] = useState(false);
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  const handleDonorLogin = (donorData: any) => {
    console.log('Donor logged in:', donorData);
    console.log('Donor type:', donorData.donorType); // 'zakat' or 'materials'
    // Update your app state here
  };

  return (
    <DonorAuthDialog
      open={showAuth}
      onOpenChange={setShowAuth}
      onLoginSuccess={handleDonorLogin}
      language={language}
    />
  );
}
```

### 📋 Props Interface

```tsx
interface DonorAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (donorData: any) => void;
  language?: 'bn' | 'en';  // Optional, defaults to 'bn'
}
```

### 📦 Donor Data Structure

```tsx
interface DonorData {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'donor';
  donorType: 'zakat' | 'materials';  // ⭐ Important field
  totalDonations: number;
  donationsCount: number;
  joinDate: string;
}
```

---

## 👤 StudentProfileViewer

### ✅ Correct Usage

```tsx
import { StudentProfileViewer } from '../components/StudentProfileViewer';

function MyComponent() {
  const [showProfile, setShowProfile] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [language, setLanguage] = useState<'bn' | 'en'>('bn');

  return (
    <StudentProfileViewer
      open={showProfile}
      onOpenChange={setShowProfile}
      application={selectedApp}
      donorType="zakat"  // or "materials"
      language={language}
      onDonate={(application) => {
        console.log('Donate to:', application);
      }}
    />
  );
}
```

### 📋 Props Interface

```tsx
interface StudentProfileViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: any;           // Student application data
  donorType: 'zakat' | 'materials';
  language: 'bn' | 'en';
  onDonate: (application: any) => void;
}
```

---

## 🎨 Dialog Components (General)

### ✅ Accessible Dialog Pattern

All custom dialogs must include `DialogTitle` and `DialogDescription` for accessibility:

```tsx
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from './ui/dialog';

function MyDialog({ open, onOpenChange }) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Dialog Title</DialogTitle>  {/* ⭐ REQUIRED */}
          <DialogDescription>               {/* ⭐ REQUIRED */}
            Description of dialog content
          </DialogDescription>
        </DialogHeader>
        
        {/* Your dialog content here */}
      </DialogContent>
    </Dialog>
  );
}
```

### ❌ Wrong - Missing Required Elements

```tsx
// ❌ Wrong - Missing DialogTitle and DialogDescription
<Dialog open={open} onOpenChange={onOpenChange}>
  <DialogContent>
    {/* Missing DialogHeader, DialogTitle, DialogDescription */}
    <div>Content here</div>
  </DialogContent>
</Dialog>

// Error: DialogContent requires a DialogTitle for accessibility
```

---

## 🔐 Authentication Flow

### Donor Login Flow

```tsx
// 1. User clicks "দান করুন" or "আমার দান সমূহ"
function DonationPage({ onDonorLogin }) {
  const [showAuth, setShowAuth] = useState(false);

  // 2. DonorAuthDialog opens
  return (
    <DonorAuthDialog
      open={showAuth}
      onOpenChange={setShowAuth}
      onLoginSuccess={(donorData) => {
        // 3. Login successful
        onDonorLogin(donorData);  // Update App.tsx state
      }}
      language="bn"
    />
  );
}

// In App.tsx
function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [userType, setUserType] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleDonorLogin = (donorData) => {
    setCurrentUser(donorData);
    setUserType('donor');
    setIsAuthenticated(true);
    setCurrentPage('donor-dashboard');
  };

  return (
    <DonationPage onDonorLogin={handleDonorLogin} />
  );
}
```

---

## 💰 Payment Flow

### Complete Payment Flow with Type Safety

```tsx
function DonorDashboard({ currentUser, language }) {
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);

  const handleDonate = (application: any) => {
    setSelectedApplication(application);
    setShowPaymentGateway(true);
  };

  return (
    <>
      {/* Student applications list */}
      <StudentCard 
        onClick={() => handleDonate(studentApp)} 
      />

      {/* Payment Gateway */}
      <PaymentGatewayDialog
        open={showPaymentGateway}
        onOpenChange={setShowPaymentGateway}
        amount={selectedApplication?.amount || 0}
        donorName={currentUser?.name || ''}
        donationType={
          selectedApplication?.applicationType === 'scholarship' 
            ? 'বৃত্তি' 
            : 'বই'
        }
        language={language}
        onPaymentSuccess={(transactionData) => {
          // Handle successful payment
          console.log('Transaction:', transactionData);
          
          // Close dialog
          setShowPaymentGateway(false);
          
          // Show success message
          toast.success('দান সফল হয়েছে! ছাত্রকে জানানো হবে।');
          
          // Update UI or fetch new data
          refreshDonations();
        }}
      />
    </>
  );
}
```

---

## 🎯 Best Practices

### 1. Always Provide Language Prop

```tsx
// ✅ Good
<Component language={language} />

// ❌ Bad - Will cause errors if component needs translations
<Component />
```

### 2. Handle Callbacks Properly

```tsx
// ✅ Good - Proper callback with parameter
<Component 
  onSuccess={(data) => {
    console.log(data);
    doSomething(data);
  }}
/>

// ❌ Bad - Missing parameter
<Component onSuccess={() => doSomething()} />
```

### 3. Type Safety

```tsx
// ✅ Good - Define interfaces
interface MyComponentProps {
  language: 'bn' | 'en';
  onSuccess: (data: any) => void;
}

// ✅ Good - Use TypeScript
const [language, setLanguage] = useState<'bn' | 'en'>('bn');
```

### 4. State Management

```tsx
// ✅ Good - Initialize state properly
const [currentUser, setCurrentUser] = useState<User | null>(null);

// ❌ Bad - Undefined state
const [currentUser, setCurrentUser] = useState();
```

---

## 🚨 Error Prevention Checklist

When using components, verify:

- [ ] All required props are provided
- [ ] Prop names match the interface exactly
- [ ] Callbacks have correct parameters
- [ ] Language prop is provided (if required)
- [ ] State is properly initialized
- [ ] Dialog has DialogTitle and DialogDescription
- [ ] TypeScript types are correct

---

## 📚 Reference

### Quick Props Reference Table

| Component | Required Props | Optional Props | Common Errors |
|-----------|---------------|----------------|---------------|
| PaymentGatewayDialog | open, onOpenChange, amount, donationType, onPaymentSuccess, **language** | donorName | Missing language |
| DonorAuthDialog | open, onOpenChange, onLoginSuccess | language | Wrong callback name |
| StudentProfileViewer | open, onOpenChange, application, donorType, language, onDonate | - | Missing props |

---

## 🔍 Debugging Tips

### If you get "Cannot read properties of undefined"

1. Check if all required props are passed
2. Verify prop names match interface
3. Ensure language prop is provided
4. Check state initialization

### If Dialog doesn't show content

1. Verify DialogTitle is present
2. Check DialogDescription is present
3. Ensure proper Dialog import from shadcn

### If callbacks don't fire

1. Verify callback prop name matches interface
2. Check if callback has correct parameters
3. Ensure callback is a function

---

## 📝 Examples in Codebase

### Working Examples:
- ✅ `/pages/DonorDashboard.tsx` - Lines 1140-1151
- ✅ `/pages/DonationPageEnhanced.tsx` - Lines 467-475

### Documentation:
- 📖 `/FIXED_PAYMENT_GATEWAY_ERROR.md`
- 📖 `/FIXED_CURRENTUSER_ERROR.md`
- 📖 `/TEST_DIALOG_ACCESSIBILITY.md`

---

**Last Updated:** November 3, 2025  
**Maintained by:** Talent Tutor Development Team
