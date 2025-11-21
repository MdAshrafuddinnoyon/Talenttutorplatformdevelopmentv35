import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
  Shield,
  Lock,
  Eye,
  AlertTriangle,
  CheckCircle,
  Smartphone,
  CreditCard,
  Mail,
  Key,
  FileCheck,
  UserCheck,
  ArrowLeft,
  Info,
} from 'lucide-react';

interface SecurityTipsPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'নিরাপত্তা টিপস',
    subtitle: 'আপনার অ্যাকাউন্ট এবং ব্যক্তিগত তথ্য সুরক্ষিত রাখার উপায়',
    back: 'ফিরে যান',
    
    introduction: 'অনলাইন নিরাপত্তা আমাদের সর্বোচ্চ অগ্রাধিকার। এই টিপসগুলো অনুসরণ করে আপনি আপনার অ্যাকাউন্ট এবং ব্যক্তিগত তথ্য সুরক্ষিত রাখতে পারবেন।',

    sections: {
      accountSecurity: {
        title: 'অ্যাকাউন্ট সিকিউরিটি',
        icon: Lock,
        tips: [
          {
            title: 'শক্তিশালী পাসওয়ার্ড ব্যবহার করুন',
            description: 'কমপক্ষে ৮ অক্ষরের পাসওয়ার্ড ব্যবহার করুন যাতে বড় হাতের অক্ষর, ছোট হাতের অক্ষর, সংখ্যা এবং বিশেষ চিহ্ন থাকে।',
            examples: ['সঠিক: MyP@ssw0rd2024!', 'ভুল: 123456 বা password'],
            icon: Key,
          },
          {
            title: 'পাসওয়ার্ড কখনো শেয়ার করবেন না',
            description: 'আপনার পাসওয়ার্ড কাউকে বলবেন না, এমনকি Talent Tutor স্টাফকেও না। আমরা কখনো আপনার পাসওয়ার্ড চাইব না।',
            icon: Eye,
          },
          {
            title: 'নিয়মিত পাসওয়ার্ড পরিবর্তন করুন',
            description: 'প্রতি ৩-৬ মাসে একবার পাসওয়ার্ড পরিবর্তন করুন। একই পাসওয়ার্ড অন্য সাইটে ব্যবহার করবেন না।',
            icon: Lock,
          },
          {
            title: 'টু-ফ্যাক্টর অথেন্টিকেশন চালু করুন',
            description: 'অতিরিক্ত নিরাপত্তার জন্য 2FA চালু করুন। লগইনের সময় একটি কোড আপনার ফোনে পাঠানো হবে।',
            icon: Smartphone,
          },
        ],
      },
      personalInfo: {
        title: 'ব্যক্তিগত তথ্য সুরক্ষা',
        icon: UserCheck,
        tips: [
          {
            title: 'সীমিত তথ্য শেয়ার করুন',
            description: 'শুধুমাত্র প্রয়োজনীয় তথ্য প্রোফাইলে দিন। ব্যক্তিগত ফোন নম্বর, ঠিকানা সবার সাথে শেয়ার করবেন না।',
          },
          {
            title: 'যাচাইকৃত ব্যবহারকারীদের সাথে যোগাযোগ করুন',
            description: 'সবসময় ভেরিফাইড ব্যাজ দেখে নিন। অযাচাইকৃত ব্যক্তিদের সাথে সতর্কতার সাথে যোগাযোগ করুন।',
          },
          {
            title: 'প্ল্যাটফর্মের মধ্যেই থাকুন',
            description: 'প্রথম কয়েকটি যোগাযোগ প্ল্যাটফর্মের চ্যাটেই করুন। বাইরে যোগাযোগ করার আগে নিশ্চিত হন।',
          },
        ],
      },
      paymentSecurity: {
        title: 'পেমেন্ট নিরাপত্তা',
        icon: CreditCard,
        tips: [
          {
            title: 'শুধু অফিশিয়াল গেটওয়ে ব্যবহার করুন',
            description: 'শুধুমাত্র Talent Tutor এর পেমেন্ট গেটওয়ে দিয়ে পেমেন্ট করুন। বাইরে কোন লেনদেন করবেন না।',
            severity: 'high',
          },
          {
            title: 'কার্ড তথ্য সুরক্ষিত রাখুন',
            description: 'কার্ড নম্বর, CVV, পিন কখনো কাউকে বলবেন না। আমরা কখনো এই তথ্য চাইব না।',
            severity: 'critical',
          },
          {
            title: 'পেমেন্ট রিসিপ্ট সংরক্ষণ করুন',
            description: 'প্রতিটি পেমেন্টের রিসিপ্ট এবং ট্রান্জ্যাকশন ID সংরক্ষণ করুন। বিরোধের ক্ষেত্রে কাজে লাগবে।',
          },
          {
            title: 'সন্দেহজনক লেনদেন রিপোর্ট করুন',
            description: 'কোন অস্বাভাবিক বা অননুমোদিত লেনদেন দেখলে সাথে সাথে আমাদের জানান।',
            severity: 'high',
          },
        ],
      },
      phishing: {
        title: 'ফিশিং থেকে সাবধান',
        icon: AlertTriangle,
        tips: [
          {
            title: 'সন্দেহজনক ইমেইল',
            description: 'ফেক ইমেইল চিনুন: বানান ভুল, অস্বাভাবিক প্রেরক, জরুরি টোন, লিংক ক্লিক করতে বাধ্য করা।',
            warning: true,
          },
          {
            title: 'লিংক যাচাই করুন',
            description: 'কোন লিংকে ক্লিক করার আগে URL দেখুন। সঠিক ডোমেইন talenttutor.com কিনা চেক করুন।',
            warning: true,
          },
          {
            title: 'আমরা কখনই চাইব না',
            description: 'Talent Tutor কখনো ইমেইল/মেসেজে আপনার পাসওয়ার্ড, কার্ড তথ্য, পিন চাইবে না।',
            warning: true,
          },
        ],
      },
      deviceSecurity: {
        title: 'ডিভাইস নিরাপত্তা',
        icon: Smartphone,
        tips: [
          {
            title: 'আপডেট রাখুন',
            description: 'আপনার ব্রাউজার, অপারেটিং সিস্টেম, অ্যান্টিভাইরাস সব সময় আপডেট রাখুন।',
          },
          {
            title: 'পাবলিক WiFi এড়িয়ে চলুন',
            description: 'পাবলিক WiFi তে লগইন বা পেমেন্ট করবেন না। নিজের সিকিউর নেটওয়ার্ক ব্যবহার করুন।',
          },
          {
            title: 'লগআউট করুন',
            description: 'শেয়ারড ডিভাইস ব্যবহার করলে কাজ শেষে অবশ্যই লগআউট করুন।',
          },
        ],
      },
      bestPractices: {
        title: 'সর্বোত্তম অনুশীলন',
        icon: CheckCircle,
        items: [
          'নিয়মিত আপনার অ্যাকাউন্ট অ্যাক্টিভিটি চেক করুন',
          'সন্দেহজনক কিছু দেখলে সাথে সাথে পাসওয়ার্ড পরিবর্তন করুন',
          'অপরিচিত ব্যক্তিদের সাথে ব্যক্তিগত তথ্য শেয়ার করবেন না',
          'চুক্তি এবং পেমেন্টের রেকর্ড রাখুন',
          'নিয়মিত ব্যাকআপ নিন গুরুত্বপূর্ণ ডকুমেন্টের',
          'সেটিংস থেকে প্রাইভেসি অপশন কনফিগার করুন',
        ],
      },
    },

    emergencyContact: {
      title: 'জরুরি যোগাযোগ',
      description: 'যদি আপনার অ্যাকাউন্ট হ্যাক হয় বা কোন নিরাপত্তা সমস্যা হয়:',
      actions: [
        'সাথে সাথে পাসওয়ার্ড পরিবর্তন করুন',
        'security@talenttutor.com এ ইমেইল করুন',
        'সাপোর্ট টিকেট খুলুন',
        'প্রয়োজনে অ্যাকাউন্ট সাময়িকভাবে বন্ধ করুন',
      ],
    },
  },
  en: {
    title: 'Security Tips',
    subtitle: 'How to keep your account and personal information secure',
    back: 'Go Back',
    
    introduction: 'Online security is our top priority. By following these tips, you can keep your account and personal information secure.',

    sections: {
      accountSecurity: {
        title: 'Account Security',
        icon: Lock,
        tips: [
          {
            title: 'Use Strong Passwords',
            description: 'Use passwords with at least 8 characters including uppercase, lowercase, numbers and special characters.',
            examples: ['Good: MyP@ssw0rd2024!', 'Bad: 123456 or password'],
            icon: Key,
          },
          {
            title: 'Never Share Password',
            description: 'Don\'t tell anyone your password, not even Talent Tutor staff. We will never ask for your password.',
            icon: Eye,
          },
          {
            title: 'Change Password Regularly',
            description: 'Change password every 3-6 months. Don\'t use the same password on other sites.',
            icon: Lock,
          },
          {
            title: 'Enable Two-Factor Authentication',
            description: 'Enable 2FA for extra security. A code will be sent to your phone when logging in.',
            icon: Smartphone,
          },
        ],
      },
      personalInfo: {
        title: 'Personal Information Protection',
        icon: UserCheck,
        tips: [
          {
            title: 'Share Limited Information',
            description: 'Only provide necessary information on profile. Don\'t share personal phone number, address with everyone.',
          },
          {
            title: 'Communicate with Verified Users',
            description: 'Always check for verified badge. Communicate cautiously with unverified individuals.',
          },
          {
            title: 'Stay on Platform',
            description: 'Keep initial communications within platform chat. Make sure before moving outside.',
          },
        ],
      },
      paymentSecurity: {
        title: 'Payment Security',
        icon: CreditCard,
        tips: [
          {
            title: 'Use Only Official Gateway',
            description: 'Only make payments through Talent Tutor\'s payment gateway. No outside transactions.',
            severity: 'high',
          },
          {
            title: 'Protect Card Information',
            description: 'Never tell anyone card number, CVV, pin. We will never ask for this information.',
            severity: 'critical',
          },
          {
            title: 'Save Payment Receipts',
            description: 'Save receipts and transaction IDs for each payment. Useful in case of disputes.',
          },
          {
            title: 'Report Suspicious Transactions',
            description: 'Immediately inform us if you see any unusual or unauthorized transactions.',
            severity: 'high',
          },
        ],
      },
      phishing: {
        title: 'Beware of Phishing',
        icon: AlertTriangle,
        tips: [
          {
            title: 'Suspicious Emails',
            description: 'Identify fake emails: spelling errors, unusual sender, urgent tone, forcing to click links.',
            warning: true,
          },
          {
            title: 'Verify Links',
            description: 'Check URL before clicking any link. Verify if domain is correct talenttutor.com.',
            warning: true,
          },
          {
            title: 'We Will Never Ask',
            description: 'Talent Tutor will never ask for your password, card info, pin via email/message.',
            warning: true,
          },
        ],
      },
      deviceSecurity: {
        title: 'Device Security',
        icon: Smartphone,
        tips: [
          {
            title: 'Keep Updated',
            description: 'Always keep your browser, operating system, antivirus updated.',
          },
          {
            title: 'Avoid Public WiFi',
            description: 'Don\'t login or make payments on public WiFi. Use your own secure network.',
          },
          {
            title: 'Log Out',
            description: 'If using shared device, always log out after finishing.',
          },
        ],
      },
      bestPractices: {
        title: 'Best Practices',
        icon: CheckCircle,
        items: [
          'Regularly check your account activity',
          'Change password immediately if you see anything suspicious',
          'Don\'t share personal information with strangers',
          'Keep records of contracts and payments',
          'Regularly backup important documents',
          'Configure privacy options from settings',
        ],
      },
    },

    emergencyContact: {
      title: 'Emergency Contact',
      description: 'If your account is hacked or you have a security issue:',
      actions: [
        'Change password immediately',
        'Email security@talenttutor.com',
        'Open a support ticket',
        'Temporarily close account if needed',
      ],
    },
  },
};

export function SecurityTipsPage({ language, setLanguage, setPage, announcement, onLogin }: SecurityTipsPageProps) {
  const t = content[language];

  const getSeverityBadge = (severity?: string) => {
    if (!severity) return null;
    
    const colors = {
      critical: 'bg-red-600 text-white',
      high: 'bg-orange-600 text-white',
    };
    
    const labels = {
      critical: language === 'bn' ? 'অত্যন্ত গুরুত্বপূর্ণ' : 'Critical',
      high: language === 'bn' ? 'গুরুত্বপূর্ণ' : 'High Priority',
    };
    
    return (
      <Badge className={colors[severity as keyof typeof colors]}>
        {labels[severity as keyof typeof labels]}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} onLogin={onLogin} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <Button
              variant="ghost"
              onClick={() => setPage('help-center')}
              className="mb-4 gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.back}
            </Button>
            
            <div className="flex items-center gap-4 mb-4">
              <div className="bg-gradient-to-br from-blue-500 to-emerald-500 p-3 rounded-xl">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl">{t.title}</h1>
                <p className="text-gray-600 mt-1">{t.subtitle}</p>
              </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <Info className="w-4 h-4 text-blue-600" />
              <AlertDescription className="text-gray-700">
                {t.introduction}
              </AlertDescription>
            </Alert>
          </div>

          <Separator className="my-8" />

          {/* Account Security */}
          <Card className="border-2 border-blue-100 shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Lock className="w-6 h-6 text-blue-600" />
                {t.sections.accountSecurity.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {t.sections.accountSecurity.tips.map((tip, idx) => {
                  const TipIcon = tip.icon;
                  return (
                    <div key={idx} className="border-l-4 border-blue-500 pl-6 py-2">
                      <div className="flex items-center gap-2 mb-2">
                        <TipIcon className="w-5 h-5 text-blue-600" />
                        <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-2">{tip.description}</p>
                      {tip.examples && (
                        <div className="bg-gray-50 p-3 rounded-lg border border-gray-200 mt-2">
                          {tip.examples.map((example, i) => (
                            <div key={i} className="text-sm text-gray-700">• {example}</div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </CardContent>
          </Card>

          {/* Personal Info */}
          <Card className="border-2 border-emerald-100 shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <UserCheck className="w-6 h-6 text-emerald-600" />
                {t.sections.personalInfo.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {t.sections.personalInfo.tips.map((tip, idx) => (
                  <div key={idx} className="flex gap-4">
                    <CheckCircle className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-1" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{tip.title}</h3>
                      <p className="text-gray-600">{tip.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Payment Security */}
          <Card className="border-2 border-orange-100 shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <CreditCard className="w-6 h-6 text-orange-600" />
                {t.sections.paymentSecurity.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {t.sections.paymentSecurity.tips.map((tip, idx) => (
                  <div key={idx} className="bg-white border-2 border-orange-100 rounded-lg p-4">
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-gray-900">{tip.title}</h3>
                      {getSeverityBadge(tip.severity)}
                    </div>
                    <p className="text-gray-600">{tip.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Phishing Warning */}
          <Card className="border-2 border-red-200 shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <AlertTriangle className="w-6 h-6 text-red-600" />
                {t.sections.phishing.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {t.sections.phishing.tips.map((tip, idx) => (
                  <Alert key={idx} className="bg-red-50 border-red-300">
                    <AlertTriangle className="w-4 h-4 text-red-600" />
                    <AlertDescription>
                      <div className="font-semibold text-red-900 mb-1">{tip.title}</div>
                      <div className="text-sm text-gray-700">{tip.description}</div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Device Security */}
          <Card className="border-2 border-purple-100 shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-blue-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Smartphone className="w-6 h-6 text-purple-600" />
                {t.sections.deviceSecurity.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-3 gap-4">
                {t.sections.deviceSecurity.tips.map((tip, idx) => (
                  <Card key={idx} className="bg-purple-50 border-purple-200">
                    <CardContent className="pt-6">
                      <h3 className="font-semibold text-gray-900 mb-2">{tip.title}</h3>
                      <p className="text-sm text-gray-600">{tip.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Best Practices */}
          <Card className="border-2 border-green-100 shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
                {t.sections.bestPractices.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 gap-3">
                {t.sections.bestPractices.items.map((item, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Emergency Contact */}
          <Card className="border-2 border-red-200 shadow-lg bg-gradient-to-r from-red-50 to-orange-50">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <AlertTriangle className="w-8 h-8 text-red-600 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2 text-xl">
                    {t.emergencyContact.title}
                  </h3>
                  <p className="text-gray-700 mb-4">{t.emergencyContact.description}</p>
                  <div className="space-y-2">
                    {t.emergencyContact.actions.map((action, idx) => (
                      <div key={idx} className="flex gap-3">
                        <Badge className="bg-red-600">{idx + 1}</Badge>
                        <span className="text-gray-800">{action}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
