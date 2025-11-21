import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Separator } from './ui/separator';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { VisuallyHidden } from './ui/visually-hidden';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  GraduationCap,
  Users,
  BookOpen,
  Shield,
  Heart,
  Package,
  Phone,
  MapPin,
  ArrowLeft,
  Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { type UserRole } from '../utils/authGuard';
import * as authService from '../utils/authService';

interface UnifiedAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'bn' | 'en';
  onLogin?: (type: UserRole, userData: any) => void;
  initialMode?: 'login' | 'register';
  preselectedRole?: UserRole;
}

type DonorType = 'zakat' | 'materials';

const content = {
  bn: {
    // Tabs
    loginTab: 'লগইন',
    registerTab: 'নিবন্ধন',
    
    // Titles
    loginTitle: 'লগইন করুন',
    loginSubtitle: 'আপনার অ্যাকাউন্টে প্রবেশ করুন',
    
    // User Type Selection
    whoAreYou: 'আপনি কে?',
    
    // User Types
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    student: 'ছাত্র',
    donate: 'দান',
    admin: 'অ্যাডমিন',
    
    // Donor Types
    zakatDonor: 'যাকাত প্রদানকারী',
    zakatDonorDesc: 'অর্থ ও সব ধরনের সাহায্য',
    materialsDonor: 'শিক্ষা উপকরণ দাতা',
    materialsDonorDesc: 'বই ও শিক্ষা উপকরণ',
    
    // Fields
    email: 'ইমেইল',
    emailPlaceholder: 'example@email.com',
    phone: 'মোবাইল নাম্বার',
    phonePlaceholder: '01XXXXXXXXX',
    password: 'পাসওয়ার্ড',
    passwordPlaceholder: '••••••',
    fullName: 'পূর্ণ নাম',
    fullNamePlaceholder: 'আপনার পূর্ণ নাম লিখুন',
    address: 'ঠিকানা',
    addressPlaceholder: 'আপনার ঠিকানা লিখুন',
    
    // Buttons
    loginButton: 'লগইন',
    registerButton: 'নিবন্ধন করুন',
    continueWith: 'অথবা',
    google: 'Google',
    facebook: 'Facebook',
    
    // Other
    rememberMe: 'মনে রাখুন',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
    noAccount: 'অ্যাকাউন্ট নেই?',
    registerNow: 'নিবন্ধন করুন',
    back: 'পিছনে',
    agreeTerms: 'আমি',
    termsAndConditions: 'নীতিমালা ও শর্তাবলী',
    privacyPolicy: 'গোপনীয়তা নীতি',
    and: 'এবং',
    agree: 'সম্মত',
    
    // Forgot Password
    forgotPasswordTitle: 'পাসওয়ার্ড রিসেট করুন',
    forgotPasswordSubtitle: 'আপনার ইমেইল ঠিকানা লিখুন',
    forgotPasswordDescription: 'আমরা আপনার ইমেইলে পাসওয়ার্ড রিসেট লিঙ্ক পাঠাবো',
    sendResetLink: 'রিসেট লিঙ্ক পাঠান',
    backToLogin: 'লগইনে ফিরে যান',
    resetLinkSent: 'রিসেট লিঙ্ক পাঠানো হয়েছে',
    checkYourEmail: 'অনুগ্রহ করে আপনার ইমেইল চেক করুন',
  },
  en: {
    // Tabs
    loginTab: 'Login',
    registerTab: 'Register',
    
    // Titles
    loginTitle: 'Login',
    loginSubtitle: 'Login to your account',
    
    // User Type Selection
    whoAreYou: 'Who are you?',
    
    // User Types
    teacher: 'Teacher',
    guardian: 'Guardian',
    student: 'Student',
    donate: 'Donate',
    admin: 'Admin',
    
    // Donor Types
    zakatDonor: 'Zakat Donor',
    zakatDonorDesc: 'Money & All Kinds of Help',
    materialsDonor: 'Educational Materials Donor',
    materialsDonorDesc: 'Books & Educational Materials',
    
    // Fields
    email: 'Email',
    emailPlaceholder: 'example@email.com',
    phone: 'Mobile Number',
    phonePlaceholder: '01XXXXXXXXX',
    password: 'Password',
    passwordPlaceholder: '••••••',
    fullName: 'Full Name',
    fullNamePlaceholder: 'Enter your full name',
    address: 'Address',
    addressPlaceholder: 'Enter your address',
    
    // Buttons
    loginButton: 'Login',
    registerButton: 'Register',
    continueWith: 'Or continue with',
    google: 'Google',
    facebook: 'Facebook',
    
    // Other
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    noAccount: "Don't have an account?",
    registerNow: 'Register now',
    back: 'Back',
    agreeTerms: 'I agree to the',
    termsAndConditions: 'Terms & Conditions',
    privacyPolicy: 'Privacy Policy',
    and: 'and',
    agree: 'agree',
    
    // Forgot Password
    forgotPasswordTitle: 'Reset Password',
    forgotPasswordSubtitle: 'Enter your email address',
    forgotPasswordDescription: 'We will send you a password reset link',
    sendResetLink: 'Send Reset Link',
    backToLogin: 'Back to Login',
    resetLinkSent: 'Reset link sent',
    checkYourEmail: 'Please check your email',
  },
};

export function UnifiedAuthDialog({
  open,
  onOpenChange,
  language,
  onLogin,
  initialMode = 'login',
  preselectedRole,
}: UnifiedAuthDialogProps) {
  const [mode, setMode] = useState<'login' | 'register'>(initialMode);
  const [step, setStep] = useState<'role-selection' | 'donor-type-selection' | 'form' | 'forgot-password'>('role-selection');
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(preselectedRole || null);
  const [donorType, setDonorType] = useState<DonorType | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState('');

  // Login Form State
  const [loginData, setLoginData] = useState({
    emailOrPhone: '',
    password: '',
  });

  // Register Form State
  const [registerData, setRegisterData] = useState({
    fullName: '',
    email: '',
    phone: '',
    password: '',
    address: '',
  });

  const t = content[language];

  // Reset states when dialog opens/closes
  useEffect(() => {
    if (open) {
      if (preselectedRole) {
        setSelectedRole(preselectedRole);
        if (preselectedRole === 'donor') {
          setStep('donor-type-selection');
        } else {
          setStep('form');
        }
      } else {
        setStep('role-selection');
        setSelectedRole(null);
        setDonorType(null);
      }
      setMode(initialMode);
    } else {
      // Reset after dialog closes
      setTimeout(() => {
        setStep('role-selection');
        setSelectedRole(null);
        setDonorType(null);
        setShowPassword(false);
        setRememberMe(false);
        setAgreedToTerms(false);
        setLoginData({ emailOrPhone: '', password: '' });
        setRegisterData({ fullName: '', email: '', phone: '', password: '', address: '' });
        setForgotPasswordEmail('');
      }, 300);
    }
  }, [open, preselectedRole, initialMode]);

  // User Type Cards Configuration
  const userTypes = [
    {
      role: 'teacher' as UserRole,
      icon: GraduationCap,
      title: t.teacher,
    },
    {
      role: 'guardian' as UserRole,
      icon: Users,
      title: t.guardian,
    },
    {
      role: 'student' as UserRole,
      icon: BookOpen,
      title: t.student,
    },
    {
      role: 'donor' as UserRole,
      icon: Heart,
      title: t.donate,
    },
    {
      role: 'admin' as UserRole,
      icon: Shield,
      title: t.admin,
    },
  ];

  // Donor Type Cards Configuration
  const donorTypes = [
    {
      type: 'zakat' as DonorType,
      icon: Heart,
      title: t.zakatDonor,
      description: t.zakatDonorDesc,
    },
    {
      type: 'materials' as DonorType,
      icon: Package,
      title: t.materialsDonor,
      description: t.materialsDonorDesc,
    },
  ];

  const handleRoleSelect = (role: UserRole) => {
    setSelectedRole(role);
    // If donor selected, show donor type selection
    if (role === 'donor') {
      setStep('donor-type-selection');
    } else {
      setStep('form');
    }
  };

  const handleDonorTypeSelect = (type: DonorType) => {
    setDonorType(type);
    setStep('form');
  };

  const handleBackToRoleSelection = () => {
    setStep('role-selection');
    setSelectedRole(null);
    setDonorType(null);
  };

  const handleBackToDonorTypeSelection = () => {
    setStep('donor-type-selection');
    setDonorType(null);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!loginData.emailOrPhone || !loginData.password) {
      toast.error(language === 'bn' ? 'সব ফিল্ড পূরণ করুন' : 'Please fill all fields');
      return;
    }

    if (!selectedRole) {
      toast.error(language === 'bn' ? 'ইউজার টাইপ নির্বাচন করুন' : 'Please select user type');
      return;
    }

    // For donor role, ensure donor type is selected
    if (selectedRole === 'donor' && !donorType) {
      toast.error(language === 'bn' ? 'দাতার ধরন নির্বাচন করুন' : 'Please select donor type');
      return;
    }

    setIsLoading(true);

    try {
      // Call authentication API with selected role
      const result = await authService.login({
        emailOrPhone: loginData.emailOrPhone,
        password: loginData.password
      }, selectedRole);

      if (result.success && result.user) {
        // Check if user role matches selected role (skip in mock mode)
        if (result.user.role !== selectedRole && !result.message?.includes('Mock')) {
          toast.error(
            language === 'bn' 
              ? `এই অ্যাকাউন্ট ${result.user.role === 'teacher' ? 'শিক্ষক' : result.user.role === 'guardian' ? 'অভিভাবক' : result.user.role === 'student' ? 'ছাত্র' : result.user.role === 'admin' ? 'অ্যাডমিন' : 'দাতা'} হিসেবে নিবন্ধিত` 
              : `This account is registered as ${result.user.role}`
          );
          setIsLoading(false);
          return;
        }

        // For donor, check donor type
        if (selectedRole === 'donor' && result.user.donorType !== donorType) {
          toast.error(
            language === 'bn' 
              ? `এই অ্যাকাউন্ট ${result.user.donorType === 'zakat' ? 'যাকাত প্রদানকারী' : 'শিক্ষা উপকরণ দাতা'} হিসেবে নিবন্ধিত` 
              : `This account is registered as ${result.user.donorType === 'zakat' ? 'Zakat Donor' : 'Materials Donor'}`
          );
          setIsLoading(false);
          return;
        }

        // Map database user to app user format
        const userData = {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          phone: result.user.phone,
          role: result.user.role,
          donorType: result.user.donorType,
          credits: result.user.credits,
          userType: result.user.role, // for compatibility
          avatar: undefined,
        };

        onLogin?.(selectedRole, userData);
        toast.success(language === 'bn' ? 'সফলভাবে লগইন হয়েছে!' : 'Login successful!');
        onOpenChange(false);
      } else {
        // More descriptive error messages
        const errorMessage = result.error || 'Login failed';
        
        // Check for common errors and provide helpful messages
        if (errorMessage.includes('Invalid login credentials') || errorMessage.includes('Invalid')) {
          toast.error(
            language === 'bn' 
              ? '❌ ইমেইল বা পাসওয়ার্ড ভুল হয়েছে। অনুগ্রহ করে আবার চেষ্টা করুন।' 
              : '❌ Invalid email or password. Please check and try again.'
          );
        } else if (errorMessage.includes('not found')) {
          toast.error(
            language === 'bn' 
              ? '❌ এই ইমেইল দিয়ে কোন অ্যাকাউন্ট পাওয়া যায়নি। অনুগ্রহ করে নিবন্ধন করুন।' 
              : '❌ No account found with this email. Please register first.'
          );
        } else {
          toast.error(
            language === 'bn' 
              ? result.error || 'লগইন ব্যর্থ হয়েছে' 
              : result.error || 'Login failed'
          );
        }
      }
    } catch (error) {
      console.error('Login error:', error);
      toast.error(
        language === 'bn' 
          ? '❌ লগইন করতে সমস্যা হয়েছে। দয়া করে ইন্টারনেট সংযোগ চেক করুন।' 
          : '❌ Failed to login. Please check your internet connection.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!registerData.fullName || !registerData.email || !registerData.phone || !registerData.password) {
      toast.error(language === 'bn' ? 'সব ফিল্ড পূরণ করুন' : 'Please fill all required fields');
      return;
    }

    if (!selectedRole) {
      toast.error(language === 'bn' ? 'ইউজার টাইপ নির্বাচন করুন' : 'Please select user type');
      return;
    }

    // For donor role, ensure donor type is selected
    if (selectedRole === 'donor' && !donorType) {
      toast.error(language === 'bn' ? 'দাতার ধরন নির্বাচন করুন' : 'Please select donor type');
      return;
    }

    // Check if terms are agreed
    if (!agreedToTerms) {
      toast.error(language === 'bn' ? 'নীতিমালা ও শর্তাবলী গ্রহণ করুন' : 'Please agree to Terms & Conditions');
      return;
    }

    setIsLoading(true);

    try {
      // Call real registration API
      const result = await authService.register({
        fullName: registerData.fullName,
        email: registerData.email,
        phone: registerData.phone,
        password: registerData.password,
        address: registerData.address,
        role: selectedRole,
        donorType: selectedRole === 'donor' ? donorType : undefined
      });

      if (result.success && result.user) {
        // Map database user to app user format
        const userData = {
          id: result.user.id,
          name: result.user.name,
          email: result.user.email,
          phone: result.user.phone,
          role: result.user.role,
          donorType: result.user.donorType,
          credits: result.user.credits,
          userType: result.user.role, // for compatibility
          avatar: undefined,
        };

        onLogin?.(selectedRole, userData);
        toast.success(language === 'bn' ? 'সফলভাবে নিবন্ধন হয়েছে!' : 'Registration successful!');
        onOpenChange(false);
      } else {
        toast.error(
          language === 'bn' 
            ? result.error || 'নিবন্ধন ব্যর্থ হয়েছে' 
            : result.error || 'Registration failed'
        );
      }
    } catch (error) {
      console.error('Registration error:', error);
      toast.error(
        language === 'bn' 
          ? 'নিবন্ধন করতে সমস্যা হয়েছে' 
          : 'Failed to register'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderRoleSelection = () => (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="space-y-6 py-4"
    >
      {/* Header Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{t.loginTitle}</h3>
        <p className="text-sm text-gray-600">{t.loginSubtitle}</p>
      </div>

      {/* User Type Selection */}
      <div>
        <p className="text-center text-sm font-medium text-gray-700 mb-4">{t.whoAreYou}</p>
        <div className="grid grid-cols-5 gap-3">
          {userTypes.map((type) => {
            const Icon = type.icon;
            return (
              <button
                key={type.role}
                onClick={() => handleRoleSelect(type.role)}
                className="flex flex-col items-center gap-2 p-3 rounded-lg hover:bg-gray-50 transition-colors group"
              >
                <div className="w-12 h-12 bg-white border-2 border-gray-200 rounded-lg flex items-center justify-center group-hover:border-teal-500 group-hover:bg-teal-50 transition-all">
                  <Icon className="w-6 h-6 text-gray-600 group-hover:text-teal-600" />
                </div>
                <span className="text-xs font-medium text-gray-700">{type.title}</span>
              </button>
            );
          })}
        </div>
      </div>
    </motion.div>
  );

  const renderDonorTypeSelection = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 py-4"
    >
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={handleBackToRoleSelection}
        className="mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t.back}
      </Button>

      {/* Header Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center shadow-lg">
          <Heart className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{t.donate}</h3>
        <p className="text-sm text-gray-600">{language === 'bn' ? 'আপনি কোন ধরনের দাতা?' : 'What type of donor are you?'}</p>
      </div>

      {/* Donor Types */}
      <div className="space-y-3">
        {donorTypes.map((type) => {
          const Icon = type.icon;
          return (
            <button
              key={type.type}
              onClick={() => handleDonorTypeSelect(type.type)}
              className="w-full p-4 rounded-xl border-2 border-gray-200 hover:border-pink-400 hover:bg-pink-50 transition-all text-left group"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <h4 className="font-bold text-gray-900 mb-1">{type.title}</h4>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </motion.div>
  );

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!forgotPasswordEmail) {
      toast.error(language === 'bn' ? 'ইমেইল ঠিকানা লিখুন' : 'Please enter your email');
      return;
    }

    if (!forgotPasswordEmail.includes('@')) {
      toast.error(language === 'bn' ? 'সঠিক ইমেইল ঠিকানা লিখুন' : 'Please enter a valid email');
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.sendPasswordResetEmail(forgotPasswordEmail);

      if (result.success) {
        toast.success(
          language === 'bn' 
            ? 'পাসওয়ার্ড রিসেট লিঙ্ক আপনার ইমেইলে পাঠানো হয়েছে' 
            : 'Password reset link sent to your email'
        );
        setForgotPasswordEmail('');
        setStep('role-selection');
      } else {
        toast.error(
          language === 'bn' 
            ? result.error || 'রিসেট লিঙ্ক পাঠাতে ব্যর্থ' 
            : result.error || 'Failed to send reset link'
        );
      }
    } catch (error) {
      console.error('Forgot password error:', error);
      toast.error(
        language === 'bn' 
          ? 'সমস্যা হয়েছে, আবার চেষ্টা করুন' 
          : 'Something went wrong, please try again'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const renderForgotPasswordForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 py-4"
    >
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={() => {
          setStep('form');
          setForgotPasswordEmail('');
        }}
        className="mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t.backToLogin}
      </Button>

      {/* Header Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
          <Lock className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{t.forgotPasswordTitle}</h3>
        <p className="text-sm text-gray-600">{t.forgotPasswordDescription}</p>
      </div>

      {/* Forgot Password Form */}
      <form onSubmit={handleForgotPassword} className="space-y-4">
        {/* Email Field */}
        <div>
          <Label htmlFor="forgot-email" className="text-sm mb-2 block">
            {t.email}
          </Label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              id="forgot-email"
              type="email"
              placeholder={t.emailPlaceholder}
              value={forgotPasswordEmail}
              onChange={(e) => setForgotPasswordEmail(e.target.value)}
              className="pl-10 h-12 border-2"
            />
          </div>
        </div>

        {/* Send Reset Link Button */}
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {language === 'bn' ? 'পাঠানো হচ্ছে...' : 'Sending...'}
            </>
          ) : (
            t.sendResetLink
          )}
        </Button>
      </form>
    </motion.div>
  );

  const renderLoginForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 py-4"
    >
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={selectedRole === 'donor' && donorType ? handleBackToDonorTypeSelection : handleBackToRoleSelection}
        className="mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t.back}
      </Button>

      {/* Header Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">{t.loginTitle}</h3>
        <p className="text-sm text-gray-600">{t.loginSubtitle}</p>
        
        {/* Demo Mode Helper Text */}
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-800">
            {language === 'bn' 
              ? '🎯 ডেমো মোড: যেকোনো ইমেইল এবং পাসওয়ার্ড দিয়ে লগইন করুন'
              : '🎯 Demo Mode: Login with any email and password'}
          </p>
        </div>
      </div>

      {/* Login Form */}
      <form onSubmit={handleLogin} className="space-y-4">
        {/* Email/Phone Field */}
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={t.emailPlaceholder}
              value={loginData.emailOrPhone}
              onChange={(e) => setLoginData({ ...loginData, emailOrPhone: e.target.value })}
              className="pl-10 h-12 border-2"
            />
          </div>
        </div>

        {/* Password Field */}
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={t.passwordPlaceholder}
              value={loginData.password}
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
              className="pl-10 pr-10 h-12 border-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Remember Me */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Checkbox
              id="remember"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
            />
            <Label htmlFor="remember" className="text-sm cursor-pointer">
              {t.rememberMe}
            </Label>
          </div>
          <button 
            type="button" 
            onClick={() => setStep('forgot-password')}
            className="text-sm text-teal-600 hover:underline"
          >
            {t.forgotPassword}
          </button>
        </div>

        {/* Login Button */}
        <Button 
          type="submit" 
          disabled={isLoading}
          className="w-full h-12 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {language === 'bn' ? 'লগইন হচ্ছে...' : 'Logging in...'}
            </>
          ) : (
            t.loginButton
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
            {t.continueWith}
          </span>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" className="h-12">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t.google}
          </Button>
          <Button type="button" variant="outline" className="h-12">
            <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            {t.facebook}
          </Button>
        </div>

        {/* Register Link */}
        <div className="text-center text-sm">
          <span className="text-gray-600">{t.noAccount} </span>
          <button
            type="button"
            onClick={() => setMode('register')}
            className="text-teal-600 hover:underline font-medium"
          >
            {t.registerNow}
          </button>
        </div>
      </form>
    </motion.div>
  );

  const renderRegisterForm = () => (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="space-y-6 py-4"
    >
      {/* Back Button */}
      <Button
        variant="ghost"
        size="sm"
        onClick={selectedRole === 'donor' && donorType ? handleBackToDonorTypeSelection : handleBackToRoleSelection}
        className="mb-2"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        {t.back}
      </Button>

      {/* Header Icon */}
      <div className="flex justify-center">
        <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
          <GraduationCap className="w-8 h-8 text-white" />
        </div>
      </div>

      {/* Title */}
      <div className="text-center">
        <h3 className="text-2xl font-bold text-gray-900 mb-1">
          {language === 'bn' ? 'নিবন্ধন করুন' : 'Register'}
        </h3>
        <p className="text-sm text-gray-600">
          {language === 'bn' ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'Create a new account'}
        </p>
        
        {/* Demo Mode Helper Text */}
        <div className="mt-3 p-3 bg-green-50 border border-green-200 rounded-lg">
          <p className="text-xs text-green-800">
            {language === 'bn' 
              ? '🎯 ডেমো মোড: যেকোনো তথ্য দিয়ে নিবন্ধন করুন'
              : '🎯 Demo Mode: Register with any information'}
          </p>
        </div>
      </div>

      {/* Register Form */}
      <form onSubmit={handleRegister} className="space-y-4">
        {/* Full Name */}
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={t.fullNamePlaceholder}
              value={registerData.fullName}
              onChange={(e) => setRegisterData({ ...registerData, fullName: e.target.value })}
              className="pl-10 h-12 border-2"
            />
          </div>
        </div>

        {/* Email */}
        <div>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="email"
              placeholder={t.emailPlaceholder}
              value={registerData.email}
              onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
              className="pl-10 h-12 border-2"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="tel"
              placeholder={t.phonePlaceholder}
              value={registerData.phone}
              onChange={(e) => setRegisterData({ ...registerData, phone: e.target.value })}
              className="pl-10 h-12 border-2"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder={t.passwordPlaceholder}
              value={registerData.password}
              onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
              className="pl-10 pr-10 h-12 border-2"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Address (Optional) */}
        <div>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <Input
              type="text"
              placeholder={t.addressPlaceholder}
              value={registerData.address}
              onChange={(e) => setRegisterData({ ...registerData, address: e.target.value })}
              className="pl-10 h-12 border-2"
            />
          </div>
        </div>

        {/* Terms & Conditions */}
        <div className="flex items-start gap-2">
          <Checkbox
            id="terms"
            checked={agreedToTerms}
            onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            className="mt-1"
          />
          <Label htmlFor="terms" className="text-sm cursor-pointer leading-relaxed">
            {t.agreeTerms}{' '}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                // Open in new window/tab - this works in SPA context
                window.open(
                  `?page=${selectedRole === 'teacher' ? 'teacher' : selectedRole === 'guardian' ? 'guardian' : selectedRole === 'student' ? 'student' : 'donor'}-guidelines`,
                  '_blank'
                );
              }}
              className="text-teal-600 hover:underline font-medium underline cursor-pointer"
            >
              {t.termsAndConditions}
            </button>{' '}
            {t.and}{' '}
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                // Open privacy policy in new window/tab
                window.open('?page=privacy-policy', '_blank');
              }}
              className="text-teal-600 hover:underline font-medium underline cursor-pointer"
            >
              {t.privacyPolicy}
            </button>
          </Label>
        </div>

        {/* Register Button */}
        <Button 
          type="submit" 
          disabled={!agreedToTerms || isLoading}
          className="w-full h-12 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {language === 'bn' ? 'নিবন্ধন হচ্ছে...' : 'Registering...'}
            </>
          ) : (
            t.registerButton
          )}
        </Button>

        {/* Divider */}
        <div className="relative">
          <Separator />
          <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-sm text-gray-500">
            {t.continueWith}
          </span>
        </div>

        {/* Social Login */}
        <div className="grid grid-cols-2 gap-3">
          <Button type="button" variant="outline" className="h-12">
            <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {t.google}
          </Button>
          <Button type="button" variant="outline" className="h-12">
            <svg className="w-5 h-5 mr-2" fill="#1877F2" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
            {t.facebook}
          </Button>
        </div>
      </form>
    </motion.div>
  );

  const getDialogTitle = () => {
    if (step === 'forgot-password') {
      return t.forgotPasswordTitle;
    }
    if (step === 'role-selection') {
      return mode === 'login' ? t.loginTitle : (language === 'bn' ? 'নিবন্ধন করুন' : 'Register');
    }
    if (step === 'donor-type-selection') {
      return t.donate;
    }
    return mode === 'login' ? t.loginTitle : (language === 'bn' ? 'নিবন্ধন করুন' : 'Register');
  };

  const getDialogDescription = () => {
    if (step === 'forgot-password') {
      return t.forgotPasswordSubtitle;
    }
    if (step === 'role-selection') {
      return mode === 'login' ? t.loginSubtitle : (language === 'bn' ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'Create a new account');
    }
    if (step === 'donor-type-selection') {
      return language === 'bn' ? 'আপনি কোন ধরনের দাতা?' : 'What type of donor are you?';
    }
    return mode === 'login' ? t.loginSubtitle : (language === 'bn' ? 'নতুন অ্যাকাউন্ট তৈরি করুন' : 'Create a new account');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <VisuallyHidden>
          <DialogTitle>{getDialogTitle()}</DialogTitle>
          <DialogDescription>{getDialogDescription()}</DialogDescription>
        </VisuallyHidden>
        
        {/* Mock Mode Indicator */}
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="outline" className="bg-green-50 text-green-700 border-green-300">
            {language === 'bn' ? '🎭 ডেমো মোড' : '🎭 Demo Mode'}
          </Badge>
        </div>
        
        <Tabs value={mode} onValueChange={(v) => setMode(v as 'login' | 'register')} className="w-full">
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">{t.loginTab}</TabsTrigger>
            <TabsTrigger value="register">{t.registerTab}</TabsTrigger>
          </TabsList>

          <TabsContent value="login" className="mt-0">
            <AnimatePresence mode="wait">
              {step === 'role-selection' && renderRoleSelection()}
              {step === 'donor-type-selection' && renderDonorTypeSelection()}
              {step === 'form' && renderLoginForm()}
              {step === 'forgot-password' && renderForgotPasswordForm()}
            </AnimatePresence>
          </TabsContent>

          <TabsContent value="register" className="mt-0">
            <AnimatePresence mode="wait">
              {step === 'role-selection' && renderRoleSelection()}
              {step === 'donor-type-selection' && renderDonorTypeSelection()}
              {step === 'form' && renderRegisterForm()}
            </AnimatePresence>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
