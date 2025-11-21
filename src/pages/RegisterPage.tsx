import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Gift, Upload, FileText, CheckCircle2, Mail, Phone } from 'lucide-react';
import { Alert, AlertDescription } from '../components/ui/alert';
import { toast } from 'sonner@2.0.3';

interface RegisterPageProps {
  language: 'bn' | 'en';
  onRegister: (type: 'teacher' | 'guardian') => void;
  setPage: (page: string) => void;
}

const content = {
  bn: {
    title: 'নিবন্ধন করুন',
    subtitle: 'নতুন অ্যাকাউন্ট তৈরি করুন',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    teacherBonus: '৫০ ফ্রি ক্রেডিট পাবেন!',
    guardianBonus: '১০০ ফ্রি ক্রেডিট পাবেন!',
    fullName: 'পূর্ণ নাম',
    email: 'ইমেইল',
    phone: 'মোবাইল নম্বর',
    phoneRequired: 'মোবাইল নম্বর (১১ সংখ্যার বাংলাদেশি নাম্বার)',
    phonePlaceholder: '01712345678',
    emailPlaceholder: 'আপনার ইমেইল ঠিকানা',
    password: 'পাসওয়ার্ড',
    confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
    nid: 'জাতীয় পরিচয়পত্র নম্বর (NID)',
    nidCopy: 'NID এর ছবি/কপি আপলোড করুন',
    certificates: 'শিক্ষাগত সনদপত্র আপলোড করুন',
    certificatesDesc: 'সর্বশেষ ডিগ্রি/সার্টিফিকেট (SSC/HSC/স্নাতক/স্নাতকোত্তর)',
    experience: 'অভিজ্ঞতার সার্টিফিকেট (যদি থাকে)',
    uploadBtn: 'ফাইল নির্বাচন করুন',
    verificationNote: 'দ্রষ্টব্য: সব ডকুমেন্ট যাচাইকরণের জন্য ২৪-৪৮ ঘন্টা সময় লাগতে পারে',
    register: 'নিবন্ধন করুন',
    haveAccount: 'ইতিমধ্যে অ্যাকাউন্ট আছে?',
    login: 'লগইন করুন',
    backToHome: 'হোমে ফিরুন',
    agreeTerms: 'আমি শর্তাবলীতে সম্মত',
    invalidPhone: 'অবৈধ মোবাইল নাম্বার। ১১ সংখ্যার বাংলাদেশি নাম্বার দিন।',
    passwordMismatch: 'পাসওয়ার্ড মিলছে না',
  },
  en: {
    title: 'Register',
    subtitle: 'Create a new account',
    teacher: 'Teacher',
    guardian: 'Guardian',
    teacherBonus: 'Get 50 Free Credits!',
    guardianBonus: 'Get 100 Free Credits!',
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone Number',
    phoneRequired: 'Mobile Number (11-digit Bangladeshi number)',
    phonePlaceholder: '01712345678',
    emailPlaceholder: 'Your email address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    nid: 'National ID Number (NID)',
    nidCopy: 'Upload NID Photo/Copy',
    certificates: 'Upload Educational Certificates',
    certificatesDesc: 'Latest degree/certificate (SSC/HSC/Bachelor/Masters)',
    experience: 'Experience Certificate (if available)',
    uploadBtn: 'Choose File',
    verificationNote: 'Note: All documents may take 24-48 hours for verification',
    register: 'Register',
    haveAccount: 'Already have an account?',
    login: 'Login',
    backToHome: 'Back to Home',
    agreeTerms: 'I agree to terms',
    invalidPhone: 'Invalid mobile number. Enter 11-digit Bangladeshi number.',
    passwordMismatch: 'Passwords do not match',
  },
};

export function RegisterPage({ language, onRegister, setPage }: RegisterPageProps) {
  const t = content[language];
  const [activeTab, setActiveTab] = useState<'teacher' | 'guardian'>('teacher');

  // Validate if input is a valid Bangladeshi phone number
  const isValidBDPhone = (phone: string): boolean => {
    // Remove spaces and dashes
    const cleaned = phone.replace(/[\s-]/g, '');
    // Check if it's a valid BD number: starts with 01 and has 11 digits
    return /^01[3-9]\d{8}$/.test(cleaned);
  };

  const handleSubmit = (e: React.FormEvent, tabType: 'teacher' | 'guardian') => {
    e.preventDefault();
    
    const formData = new FormData(e.target as HTMLFormElement);
    const phone = formData.get('phone') as string;
    const password = formData.get('password') as string;
    const confirmPassword = formData.get('confirmPassword') as string;
    
    // Validate phone number
    if (!isValidBDPhone(phone)) {
      toast.error(t.invalidPhone);
      return;
    }
    
    // Validate password match
    if (password !== confirmPassword) {
      toast.error(t.passwordMismatch);
      return;
    }
    
    // Success
    toast.success('নিবন্ধন সফল হয়েছে! ডকুমেন্ট যাচাইকরণ চলছে...');
    onRegister(tabType);
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
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="teacher">
              <div className="flex items-center gap-2">
                {t.teacher}
                <Gift className="w-4 h-4" />
              </div>
            </TabsTrigger>
            <TabsTrigger value="guardian">
              <div className="flex items-center gap-2">
                {t.guardian}
                <Gift className="w-4 h-4" />
              </div>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="teacher">
            <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-3 mb-4 text-center">
              <p className="text-emerald-700">🎉 {t.teacherBonus}</p>
            </div>
            <form onSubmit={(e) => handleSubmit(e, 'teacher')} className="space-y-4">
              <div>
                <Label htmlFor="teacher-name">{t.fullName}</Label>
                <Input id="teacher-name" name="fullName" required placeholder="মোঃ করিম উদ্দিন" />
              </div>
              <div>
                <Label htmlFor="teacher-email">{t.email}</Label>
                <div className="relative">
                  <Input 
                    id="teacher-email" 
                    name="email"
                    type="email" 
                    required 
                    placeholder={t.emailPlaceholder}
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="teacher-phone">{t.phoneRequired}</Label>
                <div className="relative">
                  <Input 
                    id="teacher-phone" 
                    name="phone"
                    type="tel" 
                    required 
                    placeholder={t.phonePlaceholder}
                    className="pl-10"
                    pattern="^01[3-9]\d{8}$"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  বৈধ নাম্বার: 01712345678, 01812345678, 01912345678 ইত্যাদি
                </p>
              </div>
              <div>
                <Label htmlFor="teacher-nid">{t.nid}</Label>
                <Input id="teacher-nid" required placeholder="1234567890123456" />
              </div>
              
              {/* Document Upload Section */}
              <div className="border-t pt-4 space-y-4">
                <div className="flex items-center gap-2 text-emerald-700 mb-2">
                  <FileText className="w-5 h-5" />
                  <span className="font-semibold">প্রয়োজনীয় ডকুমেন্ট সমূহ</span>
                </div>
                
                {/* NID Upload */}
                <div>
                  <Label htmlFor="teacher-nid-file" className="flex items-center gap-2">
                    {t.nidCopy}
                    <span className="text-red-500">*</span>
                  </Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Input 
                      id="teacher-nid-file" 
                      type="file" 
                      required 
                      accept="image/*,.pdf"
                      className="cursor-pointer"
                    />
                    <Upload className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">JPG, PNG অথবা PDF (সর্বোচ্চ 5MB)</p>
                </div>
                
                {/* Educational Certificates */}
                <div>
                  <Label htmlFor="teacher-certificates" className="flex items-center gap-2">
                    {t.certificates}
                    <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-xs text-gray-600 mb-2">{t.certificatesDesc}</p>
                  <div className="mt-2 flex items-center gap-2">
                    <Input 
                      id="teacher-certificates" 
                      type="file" 
                      required 
                      accept="image/*,.pdf"
                      multiple
                      className="cursor-pointer"
                    />
                    <Upload className="w-5 h-5 text-gray-400" />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">একাধিক ফাইল নির্বাচন করতে পারবেন</p>
                </div>
                
                {/* Experience Certificate (Optional) */}
                <div>
                  <Label htmlFor="teacher-experience" className="flex items-center gap-2">
                    {t.experience}
                    <span className="text-gray-400 text-xs">(ঐচ্ছিক)</span>
                  </Label>
                  <div className="mt-2 flex items-center gap-2">
                    <Input 
                      id="teacher-experience" 
                      type="file" 
                      accept="image/*,.pdf"
                      multiple
                      className="cursor-pointer"
                    />
                    <Upload className="w-5 h-5 text-gray-400" />
                  </div>
                </div>
                
                <Alert className="bg-blue-50 border-blue-200">
                  <CheckCircle2 className="h-4 w-4 text-blue-600" />
                  <AlertDescription className="text-blue-800 text-sm">
                    {t.verificationNote}
                  </AlertDescription>
                </Alert>
              </div>
              
              <div>
                <Label htmlFor="teacher-password">{t.password}</Label>
                <Input 
                  id="teacher-password" 
                  name="password"
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  minLength={8}
                />
                <p className="text-xs text-gray-500 mt-1">কমপক্ষে ৮ অক্ষরের হতে হবে</p>
              </div>
              <div>
                <Label htmlFor="teacher-confirm">{t.confirmPassword}</Label>
                <Input 
                  id="teacher-confirm" 
                  name="confirmPassword"
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  minLength={8}
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="teacher-terms" required className="w-4 h-4" />
                <label htmlFor="teacher-terms" className="text-sm text-gray-600">
                  {t.agreeTerms}
                </label>
              </div>
              <Button type="submit" className="w-full bg-emerald-600 hover:bg-emerald-700">
                {t.register}
              </Button>
            </form>
          </TabsContent>

          <TabsContent value="guardian">
            <div className="bg-teal-50 border border-teal-200 rounded-lg p-3 mb-4 text-center">
              <p className="text-teal-700">🎉 {t.guardianBonus}</p>
            </div>
            <form onSubmit={(e) => handleSubmit(e, 'guardian')} className="space-y-4">
              <div>
                <Label htmlFor="guardian-name">{t.fullName}</Label>
                <Input id="guardian-name" name="fullName" required placeholder="মিসেস রহিমা খাতুন" />
              </div>
              <div>
                <Label htmlFor="guardian-email">{t.email}</Label>
                <div className="relative">
                  <Input 
                    id="guardian-email" 
                    name="email"
                    type="email" 
                    required 
                    placeholder={t.emailPlaceholder}
                    className="pl-10"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Mail className="w-4 h-4" />
                  </div>
                </div>
              </div>
              <div>
                <Label htmlFor="guardian-phone">{t.phoneRequired}</Label>
                <div className="relative">
                  <Input 
                    id="guardian-phone" 
                    name="phone"
                    type="tel" 
                    required 
                    placeholder={t.phonePlaceholder}
                    className="pl-10"
                    pattern="^01[3-9]\d{8}$"
                  />
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <Phone className="w-4 h-4" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  বৈধ নাম্বার: 01712345678, 01812345678, 01912345678 ইত্যাদি
                </p>
              </div>
              <div>
                <Label htmlFor="guardian-password">{t.password}</Label>
                <Input 
                  id="guardian-password" 
                  name="password"
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  minLength={8}
                />
                <p className="text-xs text-gray-500 mt-1">কমপক্ষে ৮ অক্ষরের হতে হবে</p>
              </div>
              <div>
                <Label htmlFor="guardian-confirm">{t.confirmPassword}</Label>
                <Input 
                  id="guardian-confirm" 
                  name="confirmPassword"
                  type="password" 
                  required 
                  placeholder="••••••••" 
                  minLength={8}
                />
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" id="guardian-terms" required className="w-4 h-4" />
                <label htmlFor="guardian-terms" className="text-sm text-gray-600">
                  {t.agreeTerms}
                </label>
              </div>
              <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
                {t.register}
              </Button>
            </form>
          </TabsContent>
        </Tabs>

        <div className="text-center space-y-3">
          <div className="text-gray-600 text-sm">
            {t.haveAccount}{' '}
            <button onClick={() => setPage('login')} className="text-emerald-600 hover:underline">
              {t.login}
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
