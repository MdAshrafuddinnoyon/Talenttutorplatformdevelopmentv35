import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Heart, Mail, Phone, Lock, User, Eye, EyeOff, DollarSign, BookOpen } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface DonorAuthDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onLoginSuccess: (donorData: any) => void;
  language?: 'bn' | 'en';
}

export function DonorAuthDialog({ open, onOpenChange, onLoginSuccess, language = 'bn' }: DonorAuthDialogProps) {
  const [activeTab, setActiveTab] = useState('login');
  const [loginMethod, setLoginMethod] = useState<'email' | 'phone'>('email');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  
  // Login States
  const [loginData, setLoginData] = useState({
    emailOrPhone: '',
    password: '',
    donorType: 'zakat' as 'zakat' | 'materials',
  });

  // Registration States
  const [registerData, setRegisterData] = useState({
    donorType: 'zakat' as 'zakat' | 'materials',
    name: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  });

  const content = {
    bn: {
      loginTitle: 'দাতা লগইন',
      loginSubtitle: 'আপনার অ্যাকাউন্টে প্রবেশ করুন',
      registerTitle: 'দাতা রেজিস্ট্রেশন',
      registerSubtitle: 'নতুন অ্যাকাউন্ট তৈরি করুন',
      loginTab: 'লগইন',
      registerTab: 'রেজিস্টার',
      selectDonorType: 'আপনি কোন ধরনের দাতা?',
      zakatDonor: 'যাকাত প্রদানকারী',
      zakatDesc: '💰 অর্থ ও সব সাহায্য',
      materialsDonor: 'শিক্ষা উপকরণ দাতা',
      materialsDesc: '📚 বই ও উপকরণ',
      fullName: 'পূর্ণ নাম',
      fullNamePlaceholder: 'আপনার পূর্ণ নাম লিখুন',
      email: 'ইমেইল ঠিকানা',
      emailPlaceholder: 'donor@example.com',
      phone: 'মোবাইল নম্বর',
      phonePlaceholder: '০১৭XXXXXXXXX',
      password: 'পাসওয়ার্ড',
      passwordPlaceholder: 'কমপক্ষে ৬ অক্ষর',
      confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
      confirmPasswordPlaceholder: 'পাসওয়ার্ড পুনরায় লিখুন',
      rememberMe: 'মনে রাখুন',
      forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
      loginButton: 'লগইন করুন',
      registerButton: 'রেজিস্টার করুন',
      termsText: 'রেজিস্ট্রেশন করে আপনি আমাদের',
      termsLink: 'শর্তাবলী',
      and: 'এবং',
      privacyLink: 'গোপনীয়তা নীতি',
      agreeText: 'এ সম্মত হচ্ছেন।',
      zakatLoginInfo: 'আপনি যাকাত প্রদানকারী হিসেবে লগইন করছেন। আপনি অর্থ এবং সব ধরনের সাহায্য প্রদান করতে পারবেন।',
      materialsLoginInfo: 'আপনি শিক্ষা উপকরণ দাতা হিসেবে লগইন করছেন। আপনি শুধু বই ও শিক্ষা উপকরণ দান করতে পারবেন।',
      differenceInfo: 'পার্থক্য কি?',
      differenceTooltip: 'যাকাত দাতা: সব ধরনের সাহায্য করতে পারেন। উপকরণ দাতা: শুধু বই ও শিক্ষা উপকরণ দিতে পারেন।',
      tagline: 'দানের মাধ্যমে আপনি একজন শিক্ষার্থীর জীবন পরিবর্তন করতে পারেন',
    },
    en: {
      loginTitle: 'Donor Login',
      loginSubtitle: 'Access your account',
      registerTitle: 'Donor Registration',
      registerSubtitle: 'Create a new account',
      loginTab: 'Login',
      registerTab: 'Register',
      selectDonorType: 'What type of donor are you?',
      zakatDonor: 'Zakat Donor',
      zakatDesc: '💰 Money & All Aid',
      materialsDonor: 'Educational Materials Donor',
      materialsDesc: '📚 Books & Materials',
      fullName: 'Full Name',
      fullNamePlaceholder: 'Enter your full name',
      email: 'Email Address',
      emailPlaceholder: 'donor@example.com',
      phone: 'Mobile Number',
      phonePlaceholder: '01XXXXXXXXX',
      password: 'Password',
      passwordPlaceholder: 'At least 6 characters',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter password',
      rememberMe: 'Remember me',
      forgotPassword: 'Forgot Password?',
      loginButton: 'Login',
      registerButton: 'Register',
      termsText: 'By registering, you agree to our',
      termsLink: 'Terms',
      and: 'and',
      privacyLink: 'Privacy Policy',
      agreeText: '.',
      zakatLoginInfo: 'You are logging in as a Zakat donor. You can provide money and all types of aid.',
      materialsLoginInfo: 'You are logging in as an Educational Materials donor. You can only donate books and educational materials.',
      differenceInfo: 'What\'s the difference?',
      differenceTooltip: 'Zakat Donor: Can provide all types of aid. Materials Donor: Can only donate books and educational materials.',
      tagline: 'Through donation, you can change a student\'s life',
    }
  };

  const t = content[language];

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!loginData.emailOrPhone || !loginData.password) {
      toast.error(language === 'bn' ? 'সব ফিল্ড পূরণ করুন' : 'Fill all fields');
      return;
    }
    
    // Mock login - replace with actual API call
    const mockDonorData = {
      id: 'donor-001',
      name: language === 'bn' ? 'আব্দুল করিম' : 'Abdul Karim',
      email: loginData.emailOrPhone.includes('@') ? loginData.emailOrPhone : 'donor@example.com',
      phone: loginData.emailOrPhone.includes('@') ? '০১৭১২৩৪৫৬৭৮' : loginData.emailOrPhone,
      totalDonations: 25000,
      donationsCount: 8,
      joinDate: language === 'bn' ? '০১/০১/২০২৪' : '01/01/2024',
      role: 'donor',
      donorType: loginData.donorType,
    };

    const donorTypeText = loginData.donorType === 'zakat' 
      ? (language === 'bn' ? 'যাকাত প্রদানকারী' : 'Zakat Donor')
      : (language === 'bn' ? 'শিক্ষা উপকরণ দাতা' : 'Materials Donor');
    
    toast.success(language === 'bn' 
      ? `সফলভাবে লগইন হয়েছে! (${donorTypeText})`
      : `Successfully logged in! (${donorTypeText})`);
    
    onLoginSuccess(mockDonorData);
    onOpenChange(false);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!registerData.name || !registerData.email || !registerData.phone || !registerData.password || !registerData.confirmPassword) {
      toast.error(language === 'bn' ? 'সব ফিল্ড পূরণ করুন' : 'Fill all fields');
      return;
    }

    if (registerData.password !== registerData.confirmPassword) {
      toast.error(language === 'bn' ? 'পাসওয়ার্ড মিলছে না!' : 'Passwords do not match!');
      return;
    }

    if (registerData.password.length < 6) {
      toast.error(language === 'bn' 
        ? 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!' 
        : 'Password must be at least 6 characters!');
      return;
    }

    // Mock registration - replace with actual API call
    const newDonor = {
      id: 'donor-new-' + Date.now(),
      name: registerData.name,
      email: registerData.email,
      phone: registerData.phone,
      totalDonations: 0,
      donationsCount: 0,
      joinDate: new Date().toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US'),
      role: 'donor',
      donorType: registerData.donorType,
    };

    const donorTypeText = registerData.donorType === 'zakat' 
      ? (language === 'bn' ? 'যাকাত প্রদানকারী' : 'Zakat Donor')
      : (language === 'bn' ? 'শিক্ষা উপকরণ দাতা' : 'Materials Donor');
    
    toast.success(language === 'bn' 
      ? `রেজিস্ট্রেশন সফল হয়েছে! স্বাগতম (${donorTypeText})`
      : `Registration successful! Welcome (${donorTypeText})`);
    
    onLoginSuccess(newDonor);
    onOpenChange(false);
  };

  const handleDialogChange = (isOpen: boolean) => {
    onOpenChange(isOpen);
    if (!isOpen) {
      setActiveTab('login');
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-600 via-pink-600 to-red-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <DialogTitle className="text-2xl text-center">
              {activeTab === 'login' ? t.loginTitle : t.registerTitle}
            </DialogTitle>
            <DialogDescription className="text-gray-600 text-center mt-1">
              {activeTab === 'login' ? t.loginSubtitle : t.registerSubtitle}
            </DialogDescription>
          </div>
        </DialogHeader>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-2 mb-6">
            <TabsTrigger value="login">{t.loginTab}</TabsTrigger>
            <TabsTrigger value="register">{t.registerTab}</TabsTrigger>
          </TabsList>

          {/* Login Tab */}
          <TabsContent value="login">
            <form onSubmit={handleLogin} className="space-y-4">
              {/* Donor Type Selection */}
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label className="text-sm text-gray-700">{t.selectDonorType}</Label>
                  <button
                    type="button"
                    onClick={() => toast.info(t.differenceTooltip)}
                    className="text-xs text-blue-600 hover:underline"
                  >
                    {t.differenceInfo}
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLoginData({ ...loginData, donorType: 'zakat' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      loginData.donorType === 'zakat'
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        loginData.donorType === 'zakat'
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                          : 'bg-gray-100'
                      }`}>
                        <DollarSign className={`w-6 h-6 ${
                          loginData.donorType === 'zakat' ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="text-center">
                        <p className={`text-sm ${
                          loginData.donorType === 'zakat' ? 'text-emerald-900' : 'text-gray-700'
                        }`}>
                          {t.zakatDonor}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {t.zakatDesc}
                        </p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setLoginData({ ...loginData, donorType: 'materials' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      loginData.donorType === 'materials'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        loginData.donorType === 'materials'
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-600'
                          : 'bg-gray-100'
                      }`}>
                        <BookOpen className={`w-6 h-6 ${
                          loginData.donorType === 'materials' ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="text-center">
                        <p className={`text-sm ${
                          loginData.donorType === 'materials' ? 'text-blue-900' : 'text-gray-700'
                        }`}>
                          {t.materialsDonor}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {t.materialsDesc}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </div>

              {/* Login Method Selection */}
              <div className="flex gap-2 p-1 bg-gray-100 rounded-lg">
                <Button
                  type="button"
                  variant={loginMethod === 'email' ? 'default' : 'ghost'}
                  className="flex-1"
                  onClick={() => setLoginMethod('email')}
                >
                  <Mail className="w-4 h-4 mr-2" />
                  {language === 'bn' ? 'ইমেইল' : 'Email'}
                </Button>
                <Button
                  type="button"
                  variant={loginMethod === 'phone' ? 'default' : 'ghost'}
                  className="flex-1"
                  onClick={() => setLoginMethod('phone')}
                >
                  <Phone className="w-4 h-4 mr-2" />
                  {language === 'bn' ? 'মোবাইল' : 'Mobile'}
                </Button>
              </div>

              {/* Email/Phone Input */}
              <div>
                <Label className="flex items-center gap-2">
                  {loginMethod === 'email' ? (
                    <>
                      <Mail className="w-4 h-4" />
                      {t.email}
                    </>
                  ) : (
                    <>
                      <Phone className="w-4 h-4" />
                      {t.phone}
                    </>
                  )}
                </Label>
                <Input
                  type={loginMethod === 'email' ? 'email' : 'tel'}
                  placeholder={loginMethod === 'email' ? t.emailPlaceholder : t.phonePlaceholder}
                  value={loginData.emailOrPhone}
                  onChange={(e) =>
                    setLoginData({ ...loginData, emailOrPhone: e.target.value })
                  }
                  required
                />
              </div>

              {/* Password Input */}
              <div>
                <Label className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  {t.password}
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={loginData.password}
                    onChange={(e) =>
                      setLoginData({ ...loginData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              {/* Selected Donor Type Info */}
              <div className={`p-3 rounded-lg border ${
                loginData.donorType === 'zakat'
                  ? 'bg-emerald-50 border-emerald-200'
                  : 'bg-blue-50 border-blue-200'
              }`}>
                <div className="flex items-start gap-2 text-xs">
                  <span className="text-lg">
                    {loginData.donorType === 'zakat' ? '💰' : '📚'}
                  </span>
                  <p className={loginData.donorType === 'zakat' ? 'text-emerald-800' : 'text-blue-800'}>
                    {loginData.donorType === 'zakat' ? t.zakatLoginInfo : t.materialsLoginInfo}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2">
                  <input type="checkbox" className="rounded" />
                  <span className="text-gray-600">{t.rememberMe}</span>
                </label>
                <button
                  type="button"
                  className="text-rose-600 hover:underline"
                  onClick={() => toast.info(language === 'bn' 
                    ? 'পাসওয়ার্ড রিসেট লিংক পাঠানো হয়েছে!' 
                    : 'Password reset link sent!')}
                >
                  {t.forgotPassword}
                </button>
              </div>

              <Button
                type="submit"
                className={`w-full shadow-md ${
                  loginData.donorType === 'zakat'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                }`}
              >
                <User className="w-4 h-4 mr-2" />
                {t.loginButton}
              </Button>
            </form>
          </TabsContent>

          {/* Register Tab */}
          <TabsContent value="register">
            <form onSubmit={handleRegister} className="space-y-4">
              {/* Donor Type Selection */}
              <div className="space-y-2">
                <Label className="text-sm text-gray-700">{t.selectDonorType}</Label>
                <div className="grid grid-cols-2 gap-3">
                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRegisterData({ ...registerData, donorType: 'zakat' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      registerData.donorType === 'zakat'
                        ? 'border-emerald-500 bg-gradient-to-br from-emerald-50 to-teal-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-emerald-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        registerData.donorType === 'zakat'
                          ? 'bg-gradient-to-br from-emerald-500 to-teal-600'
                          : 'bg-gray-100'
                      }`}>
                        <DollarSign className={`w-6 h-6 ${
                          registerData.donorType === 'zakat' ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="text-center">
                        <p className={`text-sm ${
                          registerData.donorType === 'zakat' ? 'text-emerald-900' : 'text-gray-700'
                        }`}>
                          {t.zakatDonor}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {t.zakatDesc}
                        </p>
                      </div>
                    </div>
                  </motion.button>

                  <motion.button
                    type="button"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => setRegisterData({ ...registerData, donorType: 'materials' })}
                    className={`p-4 rounded-lg border-2 transition-all ${
                      registerData.donorType === 'materials'
                        ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-cyan-50 shadow-md'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <div className="flex flex-col items-center gap-2">
                      <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
                        registerData.donorType === 'materials'
                          ? 'bg-gradient-to-br from-blue-500 to-cyan-600'
                          : 'bg-gray-100'
                      }`}>
                        <BookOpen className={`w-6 h-6 ${
                          registerData.donorType === 'materials' ? 'text-white' : 'text-gray-400'
                        }`} />
                      </div>
                      <div className="text-center">
                        <p className={`text-sm ${
                          registerData.donorType === 'materials' ? 'text-blue-900' : 'text-gray-700'
                        }`}>
                          {t.materialsDonor}
                        </p>
                        <p className="text-xs text-gray-500 mt-1">
                          {t.materialsDesc}
                        </p>
                      </div>
                    </div>
                  </motion.button>
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {t.fullName}
                </Label>
                <Input
                  placeholder={t.fullNamePlaceholder}
                  value={registerData.name}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, name: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {t.email}
                </Label>
                <Input
                  type="email"
                  placeholder={t.emailPlaceholder}
                  value={registerData.email}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, email: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {t.phone}
                </Label>
                <Input
                  type="tel"
                  placeholder={t.phonePlaceholder}
                  value={registerData.phone}
                  onChange={(e) =>
                    setRegisterData({ ...registerData, phone: e.target.value })
                  }
                  required
                />
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  {t.password}
                </Label>
                <div className="relative">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t.passwordPlaceholder}
                    value={registerData.password}
                    onChange={(e) =>
                      setRegisterData({ ...registerData, password: e.target.value })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Lock className="w-4 h-4" />
                  {t.confirmPassword}
                </Label>
                <div className="relative">
                  <Input
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={t.confirmPasswordPlaceholder}
                    value={registerData.confirmPassword}
                    onChange={(e) =>
                      setRegisterData({
                        ...registerData,
                        confirmPassword: e.target.value,
                      })
                    }
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                  >
                    {showConfirmPassword ? (
                      <EyeOff className="w-4 h-4" />
                    ) : (
                      <Eye className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>

              <div className="bg-rose-50 border border-rose-200 rounded-lg p-3 text-sm">
                <p className="text-gray-700">
                  {t.termsText}{' '}
                  <button type="button" className="text-rose-600 hover:underline">
                    {t.termsLink}
                  </button>{' '}
                  {t.and}{' '}
                  <button type="button" className="text-rose-600 hover:underline">
                    {t.privacyLink}
                  </button>{' '}
                  {t.agreeText}
                </p>
              </div>

              <Button
                type="submit"
                className={`w-full shadow-md ${
                  registerData.donorType === 'zakat'
                    ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                    : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
                }`}
              >
                {t.registerButton}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center text-sm text-gray-500 mt-4">
          <p>
            {t.tagline}{' '}
            <Heart className="w-4 h-4 inline text-rose-600 fill-rose-600" />
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
}
