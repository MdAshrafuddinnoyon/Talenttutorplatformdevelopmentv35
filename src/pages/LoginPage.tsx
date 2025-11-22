import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Mail, Phone, Lock, ArrowLeft, ShieldCheck, User, GraduationCap } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface LoginPageProps {
  language: 'bn' | 'en';
  onLogin: (type: 'teacher' | 'guardian' | 'student' | 'admin') => void;
  setPage: (page: string) => void;
}

const content = {
  bn: {
    title: 'স্বাগতম',
    subtitle: 'আপনার অ্যাকাউন্টে প্রবেশ করুন',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    student: 'ছাত্র',
    admin: 'অ্যাডমিন',
    emailOrPhone: 'ইমেইল অথবা মোবাইল নাম্বার',
    emailPlaceholder: 'আপনার ইমেইল অথবা ০১৭xxxxxxxx',
    password: 'পাসওয়ার্ড',
    login: 'লগইন করুন',
    noAccount: 'অ্যাকাউন্ট নেই?',
    register: 'নিবন্ধন করুন',
    backToHome: 'হোমে ফিরুন',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
    invalidPhone: 'অবৈধ মোবাইল নাম্বার। ১১ সংখ্যার বাংলাদেশি নাম্বার দিন।',
    loginWith: 'দিয়ে লগইন করুন',
  },
  en: {
    title: 'Welcome Back',
    subtitle: 'Access your account',
    teacher: 'Teacher',
    guardian: 'Guardian',
    student: 'Student',
    admin: 'Admin',
    emailOrPhone: 'Email or Mobile Number',
    emailPlaceholder: 'Your email or 01xxxxxxxxx',
    password: 'Password',
    login: 'Login',
    noAccount: 'No account?',
    register: 'Register',
    backToHome: 'Back to Home',
    forgotPassword: 'Forgot Password?',
    invalidPhone: 'Invalid mobile number. Enter 11-digit Bangladeshi number.',
    loginWith: 'Login with',
  },
};

export function LoginPage({ language, onLogin, setPage }: LoginPageProps) {
  const t = content[language];
  const [activeTab, setActiveTab] = useState<'teacher' | 'guardian' | 'student' | 'admin'>('teacher');
  const [emailOrPhone, setEmailOrPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Validate if input is a valid Bangladeshi phone number
  const isValidBDPhone = (phone: string): boolean => {
    // Remove spaces and dashes
    const cleaned = phone.replace(/[\s-]/g, '');
    // Check if it's a valid BD number: starts with 01 and has 11 digits
    return /^01[3-9]\d{8}$/.test(cleaned);
  };

  // Validate if input is a valid email
  const isValidEmail = (email: string): boolean => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  };

  const handleSubmit = async (e: React.FormEvent, tabType: 'teacher' | 'guardian' | 'student' | 'admin') => {
    e.preventDefault();
    setIsLoading(true);
    
    const formData = new FormData(e.target as HTMLFormElement);
    const identifier = formData.get('emailOrPhone') as string;
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // Validate input
    if (!isValidEmail(identifier) && !isValidBDPhone(identifier)) {
      toast.error(t.invalidPhone);
      setIsLoading(false);
      return;
    }
    
    // Success message based on input type
    const loginType = isValidEmail(identifier) ? 'email' : 'phone';
    console.log(`Login with ${loginType}:`, identifier);
    
    onLogin(tabType);
    setIsLoading(false);
  };

  const getTabIcon = (type: string) => {
    switch (type) {
      case 'teacher': return <GraduationCap className="w-4 h-4 mr-2" />;
      case 'guardian': return <ShieldCheck className="w-4 h-4 mr-2" />;
      case 'student': return <User className="w-4 h-4 mr-2" />;
      default: return <ShieldCheck className="w-4 h-4 mr-2" />;
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative z-10">
      {/* Back Button */}
      <button 
        onClick={() => setPage('home')}
        className="absolute top-6 left-6 p-2 rounded-full bg-white/50 hover:bg-white/80 backdrop-blur-sm transition-all hover:shadow-md group"
      >
        <ArrowLeft className="w-6 h-6 text-slate-600 group-hover:text-emerald-600" />
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="w-full p-6 sm:p-8 bg-white/70 backdrop-blur-2xl border-white/50 shadow-2xl shadow-emerald-100/20 rounded-[2rem]">
          <div className="text-center mb-8">
            <motion.div 
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.8 }}
              className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg shadow-emerald-500/30"
            >
              <span className="text-white text-2xl font-bold font-serif">TT</span>
            </motion.div>
            <h1 className={`text-2xl sm:text-3xl font-bold text-slate-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.title}
            </h1>
            <p className={`text-slate-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.subtitle}
            </p>
          </div>

          <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-8">
            <TabsList className="grid w-full grid-cols-4 p-1 bg-slate-100/50 rounded-xl h-12">
              <TabsTrigger value="teacher" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm">{t.teacher}</TabsTrigger>
              <TabsTrigger value="guardian" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm">{t.guardian}</TabsTrigger>
              <TabsTrigger value="student" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm">{t.student}</TabsTrigger>
              <TabsTrigger value="admin" className="rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm text-xs sm:text-sm">{t.admin}</TabsTrigger>
            </TabsList>

            {['teacher', 'guardian', 'student', 'admin'].map((tab) => (
              <TabsContent key={tab} value={tab} className="mt-6">
                <form onSubmit={(e) => handleSubmit(e, tab as any)} className="space-y-5">
                  <div className="space-y-2">
                    <Label htmlFor={`${tab}-emailOrPhone`} className={`text-slate-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {t.emailOrPhone}
                    </Label>
                    <div className="relative group">
                      <Input 
                        id={`${tab}-emailOrPhone`} 
                        name="emailOrPhone"
                        type="text" 
                        required 
                        placeholder={t.emailPlaceholder}
                        className="pl-11 h-12 bg-white/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl transition-all"
                      />
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                        <Mail className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <Label htmlFor={`${tab}-password`} className={`text-slate-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {t.password}
                      </Label>
                      <a href="#" className={`text-xs text-emerald-600 hover:text-emerald-700 hover:underline ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {t.forgotPassword}
                      </a>
                    </div>
                    <div className="relative group">
                      <Input 
                        id={`${tab}-password`} 
                        type="password" 
                        required 
                        placeholder="••••••••"
                        className="pl-11 h-12 bg-white/50 border-slate-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl transition-all" 
                      />
                      <div className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-emerald-500 transition-colors">
                        <Lock className="w-5 h-5" />
                      </div>
                    </div>
                  </div>

                  <Button 
                    type="submit" 
                    className={`w-full h-12 rounded-xl bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white font-medium shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 hover:-translate-y-0.5 transition-all duration-300 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    ) : (
                      t.login
                    )}
                  </Button>
                </form>
              </TabsContent>
            ))}
          </Tabs>

          <div className="text-center">
            <p className={`text-slate-500 text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.noAccount}{' '}
              <button 
                onClick={() => setPage('register')} 
                className="text-emerald-600 font-semibold hover:text-emerald-700 hover:underline transition-colors"
              >
                {t.register}
              </button>
            </p>
          </div>
        </Card>
      </motion.div>
    </div>
  );
}