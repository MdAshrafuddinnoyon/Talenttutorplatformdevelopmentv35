# 💻 Talent Tutor - Complete Technical Guide for Developers

## 🎯 Project Overview

**Talent Tutor** is a full-stack tuition marketplace platform with humanitarian features (Zakat/Donation system) targeting Bangladesh market.

**Current Status**: Phase 1 Complete (Frontend), Ready for Phase 2 (Backend Integration)

---

## 📊 Technology Stack

### Frontend (✅ Completed)
```json
{
  "framework": "React 18.3.1",
  "language": "TypeScript 5.6.2",
  "buildTool": "Vite 5.4.8",
  "styling": "Tailwind CSS 3.4.14",
  "uiLibrary": "Shadcn UI (42 components)",
  "animations": "Motion/React 11.0.0",
  "routing": "React Router DOM 6.26.1",
  "icons": "Lucide React 0.445.0",
  "charts": "Recharts 2.12.7",
  "notifications": "Sonner 2.0.3",
  "forms": "React Hook Form 7.55.0",
  "dates": "date-fns 4.1.0"
}
```

### Backend (⏳ To Be Implemented)
```json
{
  "database": "Supabase (PostgreSQL)",
  "authentication": "Supabase Auth + JWT",
  "api": "Express.js + TypeScript",
  "realtime": "Supabase Realtime / Socket.io",
  "fileStorage": "AWS S3 / Cloudinary",
  "emailService": "SendGrid / AWS SES",
  "smsService": "Twilio / BulkSMS BD",
  "paymentGateway": "bKash, Nagad, SSLCOMMERZ",
  "videoCalling": "Twilio Video / Agora.io",
  "maps": "Google Maps API"
}
```

---

## 🗂️ Project Structure

```
talent-tutor/
│
├── 📁 client/ (Frontend - React)
│   ├── src/
│   │   ├── App.tsx                 # Main app with routing
│   │   ├── main.tsx                # Entry point
│   │   │
│   │   ├── pages/                  # 30+ page components
│   │   │   ├── HomePage.tsx
│   │   │   ├── TeacherDashboard.tsx
│   │   │   ├── GuardianDashboard.tsx
│   │   │   └── ... (27 more)
│   │   │
│   │   ├── components/             # 100+ reusable components
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── UnifiedAuthDialog.tsx
│   │   │   ├── CreditBalance.tsx
│   │   │   ├── ui/                 # Shadcn UI components (42)
│   │   │   └── ... (95 more)
│   │   │
│   │   ├── utils/                  # Services & utilities
│   │   │   ├── authService.ts      # Authentication logic
│   │   │   ├── authGuard.ts        # Authorization guards
│   │   │   ├── creditSystem.ts     # Credit management
│   │   │   ├── translations.ts     # Multi-language
│   │   │   ├── demoUsers.ts        # Demo data
│   │   │   └── ... (10 more)
│   │   │
│   │   └── styles/                 # CSS files
│   │       ├── globals.css
│   │       └── responsive-optimized.css
│   │
│   ├── public/                     # Static assets
│   ├── package.json
│   ├── vite.config.ts
│   └── tsconfig.json
│
├── 📁 server/ (Backend - To Be Created)
│   ├── src/
│   │   ├── index.ts                # Server entry
│   │   ├── config/
│   │   │   ├── database.ts         # Supabase config
│   │   │   ├── redis.ts            # Redis cache
│   │   │   └── aws.ts              # AWS S3 config
│   │   │
│   │   ├── routes/                 # API routes
│   │   │   ├── auth.ts
│   │   │   ├── users.ts
│   │   │   ├── credits.ts
│   │   │   ├── tuitions.ts
│   │   │   ├── donations.ts
│   │   │   └── ... (15 more)
│   │   │
│   │   ├── controllers/            # Business logic
│   │   ├── services/               # Service layer
│   │   ├── middleware/             # Auth, validation, etc.
│   │   ├── models/                 # Type definitions
│   │   └── utils/                  # Helper functions
│   │
│   ├── package.json
│   └── tsconfig.json
│
├── 📁 database/                    # Database migrations
│   ├── migrations/
│   ├── seeds/
│   └── schema.sql
│
├── 📁 docs/                        # Documentation
│   ├── API.md
│   ├── DATABASE.md
│   └── DEPLOYMENT.md
│
├── .env.example
├── .gitignore
├── package.json                    # Root package (monorepo setup)
└── README.md
```

---

## 🚀 Quick Start Guide

### Prerequisites
```bash
Node.js:    20.12.1 or higher
npm:        9.0.0 or higher
Git:        2.x
PostgreSQL: 14+ (for Supabase local development)
```

### Step 1: Clone & Setup
```bash
# Clone repository
git clone https://github.com/your-org/talent-tutor.git
cd talent-tutor

# Install dependencies (frontend)
npm install

# Copy environment file
cp .env.example .env

# Edit .env with your configuration
nano .env
```

### Step 2: Environment Variables
```bash
# .env
# Application
VITE_APP_URL=http://localhost:5173
VITE_API_URL=http://localhost:3000

# Supabase (Get from https://supabase.com)
VITE_SUPABASE_URL=https://xxxxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...

# Google Maps (Get from https://console.cloud.google.com)
VITE_GOOGLE_MAPS_API_KEY=AIzaSyXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX

# Payment Gateways (Sandbox credentials)
BKASH_APP_KEY=your_app_key
BKASH_APP_SECRET=your_app_secret
BKASH_USERNAME=your_username
BKASH_PASSWORD=your_password
BKASH_BASE_URL=https://checkout.sandbox.bkash.com

# Email Service (Get from https://sendgrid.com)
SENDGRID_API_KEY=SG.xxxxxxxxxxxxxxxxxxxxxxxxxxxxx
FROM_EMAIL=noreply@talenttutor.com

# SMS Service (Get from local provider)
SMS_API_KEY=your_sms_api_key
SMS_SENDER_ID=TalentTutor

# AWS S3 (Get from https://aws.amazon.com)
AWS_ACCESS_KEY_ID=AKIAXXXXXXXXXXXXXXXXX
AWS_SECRET_ACCESS_KEY=xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
AWS_S3_BUCKET=talent-tutor-uploads
AWS_REGION=ap-south-1

# JWT Secret (Generate: openssl rand -base64 32)
JWT_SECRET=your_random_secret_key_here

# Encryption Key (Generate: openssl rand -base64 32)
ENCRYPTION_KEY=your_encryption_key_here
```

### Step 3: Run Development Server
```bash
# Frontend only (current state)
npm run dev

# Open browser
# http://localhost:5173
```

### Step 4: Backend Setup (To Be Done)
```bash
# Create server directory
mkdir server
cd server

# Initialize Node.js project
npm init -y

# Install dependencies
npm install express typescript ts-node @types/node @types/express
npm install @supabase/supabase-js bcrypt jsonwebtoken cors helmet
npm install express-rate-limit joi dotenv
npm install -D @types/bcrypt @types/jsonwebtoken @types/cors

# Create TypeScript config
npx tsc --init

# Create basic server structure
mkdir -p src/{routes,controllers,services,middleware,models,utils}
touch src/index.ts
```

---

## 💾 Database Setup (Supabase)

### Step 1: Create Supabase Project
```bash
1. Go to https://supabase.com
2. Sign up / Login
3. Create new project
4. Note down:
   - Project URL
   - Anon key
   - Service role key
```

### Step 2: Run Database Migrations
```sql
-- Copy all SQL from COMPLETE_PROJECT_SPECIFICATION_BANGLA.md
-- Database Schema section

-- Execute in Supabase SQL Editor:

-- 1. Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 2. Create all tables (copy from documentation)
CREATE TABLE users (...);
CREATE TABLE user_profiles (...);
-- ... etc

-- 3. Create indexes
CREATE INDEX idx_users_email ON users(email);
-- ... etc

-- 4. Setup Row Level Security
ALTER TABLE users ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view own profile"
  ON users FOR SELECT
  USING (auth.uid() = id);
-- ... etc
```

### Step 3: Seed Demo Data
```sql
-- Insert demo users
INSERT INTO users (email, phone, password_hash, role, status) VALUES
('karim@teacher.demo', '01712345678', '$2b$10$...', 'teacher', 'active'),
('fatema@teacher.demo', '01823456789', '$2b$10$...', 'teacher', 'active'),
-- ... more demo users

INSERT INTO user_profiles (user_id, full_name, bio, ...) VALUES
(...),
-- ... more profiles

-- Insert demo tuition posts
INSERT INTO tuition_posts (guardian_id, title, subject, ...) VALUES
(...),
-- ... more posts
```

---

## 🔧 Backend Implementation (Step-by-Step)

### Week 1-2: Authentication System

#### 1. Setup Express Server
```typescript
// server/src/index.ts
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

// Middleware
app.use(cors({
  origin: process.env.CLIENT_URL || 'http://localhost:5173',
  credentials: true
}));
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use('/api/', limiter);

// Health check
app.get('/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

// Routes
import authRoutes from './routes/auth';
import userRoutes from './routes/users';
import creditRoutes from './routes/credits';

app.use('/api/auth', authRoutes);
app.use('/api/users', userRoutes);
app.use('/api/credits', creditRoutes);

// Error handler
app.use((err: any, req: any, res: any, next: any) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    error: err.message || 'Internal Server Error'
  });
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
```

#### 2. Supabase Configuration
```typescript
// server/src/config/supabase.ts
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

export const supabase = createClient(supabaseUrl, supabaseKey);
```

#### 3. Authentication Controller
```typescript
// server/src/controllers/authController.ts
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { supabase } from '../config/supabase';

export class AuthController {
  // Register
  static async register(req: any, res: any) {
    try {
      const { email, phone, password, fullName, role, donorType } = req.body;
      
      // Validation
      if (!email || !password || !fullName || !role) {
        return res.status(400).json({ 
          error: 'Missing required fields' 
        });
      }
      
      // Check if user exists
      const { data: existingUser } = await supabase
        .from('users')
        .select('id')
        .or(`email.eq.${email},phone.eq.${phone}`)
        .single();
        
      if (existingUser) {
        return res.status(409).json({ 
          error: 'User already exists' 
        });
      }
      
      // Hash password
      const passwordHash = await bcrypt.hash(password, 10);
      
      // Create user
      const { data: user, error: userError } = await supabase
        .from('users')
        .insert({
          email,
          phone,
          password_hash: passwordHash,
          role,
          status: 'active'
        })
        .select()
        .single();
        
      if (userError) throw userError;
      
      // Create profile
      const { error: profileError } = await supabase
        .from('user_profiles')
        .insert({
          user_id: user.id,
          full_name: fullName
        });
        
      if (profileError) throw profileError;
      
      // Create role-specific profile
      if (role === 'teacher') {
        await supabase.from('teacher_profiles').insert({
          user_id: user.id
        });
      } else if (role === 'guardian') {
        await supabase.from('guardian_profiles').insert({
          user_id: user.id
        });
      } else if (role === 'student') {
        await supabase.from('student_profiles').insert({
          user_id: user.id
        });
      } else if (role === 'donor') {
        await supabase.from('donor_profiles').insert({
          user_id: user.id,
          donor_type: donorType || 'zakat'
        });
      }
      
      // Give signup bonus credits
      const bonusCredits = role === 'teacher' ? 50 : 
                          role === 'guardian' ? 100 : 0;
      
      if (bonusCredits > 0) {
        await supabase.from('credit_transactions').insert({
          user_id: user.id,
          type: 'bonus',
          amount: bonusCredits,
          balance_before: 0,
          balance_after: bonusCredits,
          description: 'সাইনআপ বোনাস',
          description_en: 'Signup Bonus'
        });
      }
      
      // Generate JWT
      const token = jwt.sign(
        { 
          userId: user.id, 
          role: user.role,
          email: user.email
        },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );
      
      // Remove password from response
      delete user.password_hash;
      
      res.status(201).json({
        success: true,
        user,
        token,
        message: 'Registration successful'
      });
      
    } catch (error: any) {
      console.error('Registration error:', error);
      res.status(500).json({ 
        error: error.message || 'Registration failed' 
      });
    }
  }
  
  // Login
  static async login(req: any, res: any) {
    try {
      const { emailOrPhone, password } = req.body;
      
      // Validation
      if (!emailOrPhone || !password) {
        return res.status(400).json({ 
          error: 'Email/Phone and password required' 
        });
      }
      
      // Find user
      const { data: user, error } = await supabase
        .from('users')
        .select('*')
        .or(`email.eq.${emailOrPhone},phone.eq.${emailOrPhone}`)
        .single();
        
      if (error || !user) {
        return res.status(401).json({ 
          error: 'Invalid credentials' 
        });
      }
      
      // Verify password
      const validPassword = await bcrypt.compare(
        password, 
        user.password_hash
      );
      
      if (!validPassword) {
        return res.status(401).json({ 
          error: 'Invalid credentials' 
        });
      }
      
      // Check account status
      if (user.status === 'blocked') {
        return res.status(403).json({ 
          error: 'Account is blocked. Contact support.' 
        });
      }
      
      // Update last login
      await supabase
        .from('users')
        .update({ last_login_at: new Date().toISOString() })
        .eq('id', user.id);
      
      // Generate JWT
      const token = jwt.sign(
        { 
          userId: user.id, 
          role: user.role,
          email: user.email
        },
        process.env.JWT_SECRET!,
        { expiresIn: '7d' }
      );
      
      // Get user profile
      const { data: profile } = await supabase
        .from('user_profiles')
        .select('*')
        .eq('user_id', user.id)
        .single();
      
      // Remove password
      delete user.password_hash;
      
      res.json({
        success: true,
        user: {
          ...user,
          profile
        },
        token,
        message: 'Login successful'
      });
      
    } catch (error: any) {
      console.error('Login error:', error);
      res.status(500).json({ 
        error: error.message || 'Login failed' 
      });
    }
  }
  
  // Get current user
  static async me(req: any, res: any) {
    try {
      const userId = req.user.userId; // From auth middleware
      
      const { data: user, error } = await supabase
        .from('users')
        .select(`
          *,
          profile:user_profiles(*),
          teacher_profile:teacher_profiles(*),
          guardian_profile:guardian_profiles(*),
          student_profile:student_profiles(*),
          donor_profile:donor_profiles(*)
        `)
        .eq('id', userId)
        .single();
        
      if (error) throw error;
      
      delete user.password_hash;
      
      res.json({ success: true, user });
      
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

#### 4. Authentication Middleware
```typescript
// server/src/middleware/auth.ts
import jwt from 'jsonwebtoken';

export const authenticateToken = (req: any, res: any, next: any) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN
  
  if (!token) {
    return res.status(401).json({ error: 'Access token required' });
  }
  
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ error: 'Invalid or expired token' });
  }
};

export const authorizeRoles = (...roles: string[]) => {
  return (req: any, res: any, next: any) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({ 
        error: 'You do not have permission to access this resource' 
      });
    }
    next();
  };
};
```

#### 5. Auth Routes
```typescript
// server/src/routes/auth.ts
import { Router } from 'express';
import { AuthController } from '../controllers/authController';
import { authenticateToken } from '../middleware/auth';

const router = Router();

router.post('/register', AuthController.register);
router.post('/login', AuthController.login);
router.get('/me', authenticateToken, AuthController.me);
router.post('/logout', authenticateToken, (req, res) => {
  // JWT is stateless, logout handled on client
  res.json({ success: true, message: 'Logged out' });
});

export default router;
```

---

### Week 3-4: Credit System & Core Features

#### Credit Service
```typescript
// server/src/services/creditService.ts
import { supabase } from '../config/supabase';

export class CreditService {
  // Get balance
  static async getBalance(userId: string): Promise<number> {
    const { data, error } = await supabase
      .from('credit_transactions')
      .select('balance_after')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
      
    if (error && error.code !== 'PGRST116') { // Not found
      throw error;
    }
    
    return data?.balance_after || 0;
  }
  
  // Deduct credits
  static async deductCredits(
    userId: string,
    amount: number,
    description: string,
    descriptionEn: string,
    relatedTo?: string,
    relatedType?: string
  ): Promise<boolean> {
    const currentBalance = await this.getBalance(userId);
    
    if (currentBalance < amount) {
      throw new Error('Insufficient credits');
    }
    
    const newBalance = currentBalance - amount;
    
    const { error } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type: 'spent',
        amount: -amount,
        balance_before: currentBalance,
        balance_after: newBalance,
        description,
        description_en: descriptionEn,
        related_to: relatedTo,
        related_type: relatedType
      });
      
    if (error) throw error;
    
    return true;
  }
  
  // Add credits
  static async addCredits(
    userId: string,
    amount: number,
    type: string,
    description: string,
    descriptionEn: string
  ): Promise<boolean> {
    const currentBalance = await this.getBalance(userId);
    const newBalance = currentBalance + amount;
    
    const { error } = await supabase
      .from('credit_transactions')
      .insert({
        user_id: userId,
        type,
        amount,
        balance_before: currentBalance,
        balance_after: newBalance,
        description,
        description_en: descriptionEn
      });
      
    if (error) throw error;
    
    return true;
  }
  
  // Get transactions
  static async getTransactions(userId: string, limit = 50) {
    const { data, error } = await supabase
      .from('credit_transactions')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
      
    if (error) throw error;
    
    return data;
  }
}
```

#### Credit Controller
```typescript
// server/src/controllers/creditController.ts
import { CreditService } from '../services/creditService';

export class CreditController {
  static async getBalance(req: any, res: any) {
    try {
      const userId = req.params.userId || req.user.userId;
      const balance = await CreditService.getBalance(userId);
      res.json({ success: true, balance });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static async getTransactions(req: any, res: any) {
    try {
      const userId = req.params.userId || req.user.userId;
      const limit = parseInt(req.query.limit) || 50;
      
      const transactions = await CreditService.getTransactions(
        userId, 
        limit
      );
      
      res.json({ success: true, transactions });
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
  
  static async purchasePackage(req: any, res: any) {
    try {
      const userId = req.user.userId;
      const { packageId, paymentMethod, transactionId } = req.body;
      
      // Package details
      const packages: any = {
        starter: { credits: 100, price: 500, bonus: 0 },
        basic: { credits: 250, price: 1000, bonus: 25 },
        standard: { credits: 600, price: 2000, bonus: 120 },
        premium: { credits: 1500, price: 4000, bonus: 450 },
        enterprise: { credits: 4000, price: 10000, bonus: 1600 }
      };
      
      const pkg = packages[packageId];
      if (!pkg) {
        return res.status(400).json({ error: 'Invalid package' });
      }
      
      // Save payment record
      const { data: payment, error: paymentError } = await supabase
        .from('payments')
        .insert({
          user_id: userId,
          package_id: packageId,
          amount: pkg.price,
          credits_amount: pkg.credits,
          bonus_credits: pkg.bonus,
          payment_method: paymentMethod,
          transaction_id: transactionId,
          status: 'completed'
        })
        .select()
        .single();
        
      if (paymentError) throw paymentError;
      
      // Add credits
      const totalCredits = pkg.credits + pkg.bonus;
      await CreditService.addCredits(
        userId,
        totalCredits,
        'purchased',
        `${packageId} প্যাকেজ ক্রয় (${pkg.credits} + ${pkg.bonus} বোনাস)`,
        `${packageId} package purchased (${pkg.credits} + ${pkg.bonus} bonus)`
      );
      
      const newBalance = await CreditService.getBalance(userId);
      
      res.json({
        success: true,
        message: 'Package purchased successfully',
        payment,
        newBalance,
        creditsAdded: totalCredits
      });
      
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  }
}
```

---

## 📱 Frontend Integration Example

### Update authService.ts to use API
```typescript
// utils/authService.ts
import { API_BASE_URL } from './apiConfig';

export const login = async (data: LoginData): Promise<AuthResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    
    const result = await response.json();
    
    if (result.success) {
      localStorage.setItem('currentUser', JSON.stringify(result.user));
      localStorage.setItem('auth_token', result.token);
      return result;
    } else {
      throw new Error(result.error);
    }
  } catch (error: any) {
    console.error('Login error:', error);
    throw error;
  }
};

export const getCurrentUser = async (): Promise<User | null> => {
  const token = localStorage.getItem('auth_token');
  
  if (!token) return null;
  
  try {
    const response = await fetch(`${API_BASE_URL}/api/auth/me`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    
    const result = await response.json();
    
    if (result.success) {
      localStorage.setItem('currentUser', JSON.stringify(result.user));
      return result.user;
    }
    
    return null;
  } catch (error) {
    console.error('Get user error:', error);
    return null;
  }
};
```

---

## 🧪 Testing Strategy

### Unit Tests (Jest)
```typescript
// server/tests/auth.test.ts
import { AuthController } from '../src/controllers/authController';

describe('Authentication', () => {
  test('should register new user', async () => {
    const req = {
      body: {
        email: 'test@example.com',
        password: 'Test123!',
        fullName: 'Test User',
        role: 'teacher'
      }
    };
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn()
    };
    
    await AuthController.register(req, res);
    
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(
      expect.objectContaining({
        success: true,
        user: expect.any(Object),
        token: expect.any(String)
      })
    );
  });
});
```

### Integration Tests
```typescript
// server/tests/integration/auth.integration.test.ts
import request from 'supertest';
import app from '../src/index';

describe('Auth Integration', () => {
  test('POST /api/auth/register', async () => {
    const response = await request(app)
      .post('/api/auth/register')
      .send({
        email: 'integration@test.com',
        password: 'Test123!',
        fullName: 'Integration Test',
        role: 'teacher'
      });
      
    expect(response.status).toBe(201);
    expect(response.body.success).toBe(true);
    expect(response.body.token).toBeDefined();
  });
  
  test('POST /api/auth/login', async () => {
    const response = await request(app)
      .post('/api/auth/login')
      .send({
        emailOrPhone: 'integration@test.com',
        password: 'Test123!'
      });
      
    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
  });
});
```

---

## 📚 Additional Resources

### Package Scripts
```json
{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx",
    "test": "jest",
    "test:watch": "jest --watch",
    "test:coverage": "jest --coverage",
    "server:dev": "cd server && npm run dev",
    "server:build": "cd server && npm run build",
    "server:start": "cd server && npm start"
  }
}
```

### Helpful Commands
```bash
# Generate password hash (for seeding)
node -e "const bcrypt = require('bcrypt'); bcrypt.hash('password123', 10).then(console.log);"

# Generate JWT secret
openssl rand -base64 32

# Generate encryption key
openssl rand -base64 32

# Check port usage
lsof -i :5173
lsof -i :3000

# Kill process on port
kill -9 $(lsof -t -i:5173)
```

---

## 🎯 Next Steps for Developers

### Immediate (Week 1-2)
1. Setup Supabase project
2. Run database migrations
3. Create backend server structure
4. Implement authentication APIs
5. Test authentication flow

### Short-term (Week 3-4)
1. Implement credit system APIs
2. Implement tuition marketplace APIs
3. Integrate frontend with backend APIs
4. Setup file upload system
5. Basic testing

### Medium-term (Week 5-8)
1. Payment gateway integration
2. Email/SMS services
3. Real-time messaging
4. Advanced features
5. Comprehensive testing

### Long-term (Week 9+)
1. Mobile app development
2. Performance optimization
3. SEO optimization
4. Launch preparation
5. Monitoring & analytics

---

**This guide provides everything a developer needs to continue building Talent Tutor from where you left off!** 🚀

**Last Updated**: November 28, 2025
