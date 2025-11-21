import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Mail, Phone } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface LoginPageProps {
  language: 'bn' | 'en';
  onLogin: (type: 'teacher' | 'guardian' | 'student' | 'admin') => void;
  setPage: (page: string) => void;
}

const content = {
  bn: {
    title: 'লগইন করুন',
    subtitle: 'আপনার অ্যাকাউন্টে প্রবেশ করুন',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    student: 'ছাত্র',
    admin: 'অ্যাডমিন',
    emailOrPhone: 'ইমেইল অথবা মোবাইল নাম্বার',
    emailPlaceholder: 'আপনার ইমেইল অথবা ০১৭xxxxxxxx',
    password: 'পাসওয়ার্ড',
    login: 'লগইন',
    noAccount: 'অ্যাকাউন্ট নেই?',
    register: 'নিবন্ধন করুন',
    backToHome: 'হোমে ফিরুন',
    forgotPassword: 'পাসওয়ার্ড ভুলে গেছেন?',
    invalidPhone: 'অবৈধ মোবাইল নাম্বার। ১১ সংখ্যার বাংলাদেশি নাম্বার দিন।',
    loginWith: 'দিয়ে লগইন করুন',
  },
  en: {
    title: 'Login',
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

  const handleSubmit = (e: React.FormEvent, tabType: 'teacher' | 'guardian' | 'student' | 'admin') => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const identifier = formData.get('emailOrPhone') as string;
    
    // Validate input
    if (!isValidEmail(identifier) && !isValidBDPhone(identifier)) {
      toast.error(t.invalidPhone);
      return;
    }
    
    // Success message based on input type
    const loginType = isValidEmail(identifier) ? 'email' : 'phone';
    console.log(`Login with ${loginType}:`, identifier);
    
    onLogin(tabType);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8">
        <div className="text-center mb-6">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white text-xl">TT</span>
            </div>
          </div>
          <h1 className="text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)} className="mb-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="teacher">{t.teacher}</TabsTrigger>
            <TabsTrigger value="guardian">{t.guardian}</TabsTrigger>
            <TabsTrigger value="student">{t.student}</TabsTrigger>
            <TabsTrigger value="admin">{t.admin}</TabsTrigger>
          </TabsList>

          <TabsContent value="teacher">
            <form onSubmit={(e) => handleSubmit(e, 'teacher')} className="space-y-4">
              <div>
                <Label htmlFor="teacher-emailOrPhone">{t.emailOrPhone}</Label>
                <div className="relative">
                  <Input 
                    id="teacher-emailOrPhone" 
                    name="emailOrPhone"
                    type="text" 
                    required 
                    placeholder={t.emailPlaceholder}
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  ইমেইল: teacher@example.com অথবা মোবাইল: 01712345678
                </p>
              </div>
              <div>
                <Label htmlFor="teacher-password">{t.password}</Label>
                <Input id="teacher-password" type="password" required placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                {t.login}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="guardian">
            <form onSubmit={(e) => handleSubmit(e, 'guardian')} className="space-y-4">
              <div>
                <Label htmlFor="guardian-emailOrPhone">{t.emailOrPhone}</Label>
                <div className="relative">
                  <Input 
                    id="guardian-emailOrPhone" 
                    name="emailOrPhone"
                    type="text" 
                    required 
                    placeholder={t.emailPlaceholder}
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  ইমেইল: guardian@example.com অথবা ম���বাইল: 01812345678
                </p>
              </div>
              <div>
                <Label htmlFor="guardian-password">{t.password}</Label>
                <Input id="guardian-password" type="password" required placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                {t.login}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="student">
            <form onSubmit={(e) => handleSubmit(e, 'student')} className="space-y-4">
              <div>
                <Label htmlFor="student-emailOrPhone">{t.emailOrPhone}</Label>
                <div className="relative">
                  <Input 
                    id="student-emailOrPhone" 
                    name="emailOrPhone"
                    type="text" 
                    required 
                    placeholder={t.emailPlaceholder}
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  ইমেইল: student@example.com অথবা মোবাইল: 01912345678
                </p>
              </div>
              <div>
                <Label htmlFor="student-password">{t.password}</Label>
                <Input id="student-password" type="password" required placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                {t.login}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="admin">
            <form onSubmit={(e) => handleSubmit(e, 'admin')} className="space-y-4">
              <div>
                <Label htmlFor="admin-emailOrPhone">{t.emailOrPhone}</Label>
                <div className="relative">
                  <Input 
                    id="admin-emailOrPhone" 
                    name="emailOrPhone"
                    type="text" 
                    required 
                    placeholder={t.emailPlaceholder}
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  ইমেইল: admin@example.com অথবা মোবাইল: 01612345678
                </p>
              </div>
              <div>
                <Label htmlFor="admin-password">{t.password}</Label>
                <Input id="admin-password" type="password" required placeholder="••••••••" />
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                {t.login}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center space-y-3">
          <a href="#" className="text-emerald-600 hover:underline text-sm">
            {t.forgotPassword}
          </a>
          <div className="text-gray-600 text-sm">
            {t.noAccount}{' '}
            <button onClick={() => setPage('register')} className="text-emerald-600 hover:underline">
              {t.register}
            </button>
          </div>
          <button onClick={() => setPage('home')} className="text-gray-600 hover:text-emerald-600 text-sm">
            {t.backToHome}
          </button>
        </div>
      </Card>
    </div>
  );
}