import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
  Users,
  Heart,
  Shield,
  AlertTriangle,
  CheckCircle,
  XCircle,
  MessageCircle,
  Star,
  ArrowLeft,
  BookOpen,
  Ban,
} from 'lucide-react';

interface CommunityGuidelinesPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'কমিউনিটি গাইডলাইন',
    subtitle: 'Talent Tutor কমিউনিটিতে সবার জন্য নিরাপদ এবং সম্মানজনক পরিবেশ নিশ্চিত করা',
    back: 'ফিরে যান',
    
    introduction: 'Talent Tutor একটি শিক্ষামূলক প্ল্যাটফর্ম যেখানে শিক্ষক, অভিভাবক এবং শিক্ষার্থীরা একসাথে কাজ করে। আমরা সবার জন্য একটি নিরাপদ, সম্মানজনক এবং উৎপাদনশীল পরিবেশ তৈরি করতে প্রতিশ্রুতিবদ্ধ। নিচের নির্দেশিকা অনুসরণ করুন।',

    sections: {
      coreValues: {
        title: 'মূল মূল্যবোধ',
        icon: Heart,
        items: [
          {
            title: 'সম্মান',
            description: 'সবার সাথে সম্মানজনক আচরণ করুন। ভাষা, ধর্ম, লিঙ্গ, বয়স নির্বিশেষে সবাইকে সমান দৃষ্টিতে দেখুন।',
            do: ['সদয় এবং ভদ্র ভাষা ব্যবহার করুন', 'অন্যের মতামতকে মূল্য দিন', 'ধৈর্য ধরে শুনুন'],
            dont: ['গালাগালি বা অভদ্র ভাষা', 'ব্যক্তিগত আক্রমণ', 'বৈষম্যমূলক মন্তব্য'],
          },
          {
            title: 'সততা',
            description: 'সবসময় সত্য এবং সঠিক তথ্য প্রদান করুন। মিথ্যা তথ্য দিয়ে কাউকে বিভ্রান্ত করবেন না।',
            do: ['সঠিক যোগ্যতা উল্লেখ করুন', 'বাস্তবসম্মত প্রতিশ্রুতি দিন', 'ভুল হলে স্বীকার করুন'],
            dont: ['নকল সার্টিফিকেট দেওয়া', 'মিথ্যা অভিজ্ঞতা দাবি', 'ভুয়া রিভিউ তৈরি'],
          },
          {
            title: 'দায়িত্বশীলতা',
            description: 'আপনার প্রতিশ্রুতি রক্ষা করুন। সময়মত ক্লাস নিন, পেমেন্ট করুন এবং যোগাযোগে সক্রিয় থাকুন।',
            do: ['সময়মত হাজির হন', 'প্রতিশ্রুতি রক্ষা করুন', 'সমস্যা হলে জানান'],
            dont: ['হঠাৎ ক্যান্সেল করা', 'যোগাযোগ বন্ধ করা', 'পেমেন্ট এড়িয়ে যাওয়া'],
          },
        ],
      },
      communication: {
        title: 'যোগাযোগ নীতি',
        icon: MessageCircle,
        items: [
          {
            title: 'পেশাদার যোগাযোগ',
            description: 'সবসময় পেশাদার এবং শিক্ষামূলক উদ্দেশ্যে যোগাযোগ করুন। ব্যক্তিগত তথ্য চাওয়া বা শেয়ার করা থেকে বিরত থাকুন।',
          },
          {
            title: 'স্প্যাম নিষিদ্ধ',
            description: 'একই মেসেজ বারবার পাঠানো, অপ্রাসঙ্গিক বিজ্ঞাপন বা লিংক শেয়ার করবেন না।',
          },
          {
            title: 'গোপনীয়তা রক্ষা',
            description: 'অন্যের ব্যক্তিগত তথ্য যেমন ফোন নম্বর, ঠিকানা, ছবি তাদের অনুমতি ছাড়া শেয়ার করবেন না।',
          },
        ],
      },
      prohibited: {
        title: 'নিষিদ্ধ কার্যক্রম',
        icon: Ban,
        items: [
          {
            title: 'হয়রানি',
            description: 'যেকোনো ধরনের হয়রানি, হুমকি, ভয় দেখানো, বুলিং সম্পূর্ণ নিষিদ্ধ।',
            severity: 'critical',
          },
          {
            title: 'জালিয়াতি',
            description: 'নকল ডকুমেন্ট, পরিচয় চুরি, পেমেন্ট জালিয়াতি করা যাবে না।',
            severity: 'critical',
          },
          {
            title: 'অনুপযুক্ত কন্টেন্ট',
            description: 'যৌন, হিংসাত্মক, রাজনৈতিক বা ধর্মীয় বিদ্বেষমূলক কন্টেন্ট নিষিদ্ধ।',
            severity: 'critical',
          },
          {
            title: 'অফ-প্ল্যাটফর্ম লেনদেন',
            description: 'প্ল্যাটফর্মের বাইরে পেমেন্ট বা চুক্তি করতে উৎসাহিত করা নিষিদ্ধ। নিরাপত্তার জন্য সব কিছু প্ল্যাটফর্মে রাখুন।',
            severity: 'high',
          },
        ],
      },
      consequences: {
        title: 'নীতিমালা লঙ্ঘনের পরিণতি',
        icon: AlertTriangle,
        levels: [
          {
            level: 'সতর্কতা',
            description: 'প্রথম বার ছোট লঙ্ঘনের জন্য লিখিত সতর্কতা।',
          },
          {
            level: 'সাময়িক নিষেধাজ্ঞা',
            description: '৭-৩০ দিনের জন্য অ্যাকাউন্ট সাসপেন্ড। বারবার লঙ্ঘনের জন্য।',
          },
          {
            level: 'স্থায়ী নিষেধাজ্ঞা',
            description: 'গুরুতর লঙ্ঘন (হয়রানি, জালিয়াতি) এর জন্য অ্যাকাউন্ট স্থায়ীভাবে বন্ধ।',
          },
          {
            level: 'আইনি ব্যবস্থা',
            description: 'আইন ভাঙার ক্ষেত্রে কর্তৃপক্ষকে জানানো হবে।',
          },
        ],
      },
      reporting: {
        title: 'রিপোর্ট করার প্রক্রিয়া',
        icon: Shield,
        steps: [
          'যদি কেউ নীতিমালা লঙ্ঘন করে, তাহলে সাথে সাথে রিপোর্ট করুন',
          'প্রোফাইল বা মেসেজের "রিপোর্ট" বাটনে ক্লিক করুন',
          'লঙ্ঘনের ধরন নির্বাচন করুন এবং বিস্তারিত লিখুন',
          'প্রমাণ (স্ক্রিনশট, মেসেজ) সংযুক্ত করুন',
          'আমাদের টিম ২৪-৪৮ ঘন্টার মধ্যে তদন্ত করবে',
        ],
      },
    },
  },
  en: {
    title: 'Community Guidelines',
    subtitle: 'Ensuring a safe and respectful environment for everyone in Talent Tutor community',
    back: 'Go Back',
    
    introduction: 'Talent Tutor is an educational platform where teachers, guardians and students work together. We are committed to creating a safe, respectful and productive environment for everyone. Follow these guidelines.',

    sections: {
      coreValues: {
        title: 'Core Values',
        icon: Heart,
        items: [
          {
            title: 'Respect',
            description: 'Treat everyone respectfully. View everyone equally regardless of language, religion, gender, age.',
            do: ['Use kind and polite language', 'Value others\' opinions', 'Listen patiently'],
            dont: ['Abusive or rude language', 'Personal attacks', 'Discriminatory comments'],
          },
          {
            title: 'Honesty',
            description: 'Always provide true and accurate information. Do not mislead anyone with false information.',
            do: ['Mention correct qualifications', 'Make realistic promises', 'Admit if wrong'],
            dont: ['Fake certificates', 'False experience claims', 'Creating fake reviews'],
          },
          {
            title: 'Responsibility',
            description: 'Keep your commitments. Attend classes on time, make payments and stay active in communication.',
            do: ['Be on time', 'Keep promises', 'Inform if there\'s a problem'],
            dont: ['Sudden cancellations', 'Stop communication', 'Avoid payments'],
          },
        ],
      },
      communication: {
        title: 'Communication Policy',
        icon: MessageCircle,
        items: [
          {
            title: 'Professional Communication',
            description: 'Always communicate for professional and educational purposes. Refrain from asking or sharing personal information.',
          },
          {
            title: 'No Spam',
            description: 'Do not send the same message repeatedly, share irrelevant advertisements or links.',
          },
          {
            title: 'Privacy Protection',
            description: 'Do not share others\' personal information like phone numbers, addresses, photos without their permission.',
          },
        ],
      },
      prohibited: {
        title: 'Prohibited Activities',
        icon: Ban,
        items: [
          {
            title: 'Harassment',
            description: 'Any form of harassment, threats, intimidation, bullying is completely prohibited.',
            severity: 'critical',
          },
          {
            title: 'Fraud',
            description: 'Fake documents, identity theft, payment fraud are not allowed.',
            severity: 'critical',
          },
          {
            title: 'Inappropriate Content',
            description: 'Sexual, violent, political or religiously hateful content is prohibited.',
            severity: 'critical',
          },
          {
            title: 'Off-Platform Transactions',
            description: 'Encouraging payments or contracts outside the platform is prohibited. Keep everything on the platform for security.',
            severity: 'high',
          },
        ],
      },
      consequences: {
        title: 'Consequences of Policy Violations',
        icon: AlertTriangle,
        levels: [
          {
            level: 'Warning',
            description: 'Written warning for first-time minor violations.',
          },
          {
            level: 'Temporary Ban',
            description: 'Account suspended for 7-30 days. For repeated violations.',
          },
          {
            level: 'Permanent Ban',
            description: 'Account permanently closed for serious violations (harassment, fraud).',
          },
          {
            level: 'Legal Action',
            description: 'Authorities will be informed in case of law breaking.',
          },
        ],
      },
      reporting: {
        title: 'Reporting Process',
        icon: Shield,
        steps: [
          'If someone violates the policy, report immediately',
          'Click the "Report" button on profile or message',
          'Select violation type and write details',
          'Attach evidence (screenshots, messages)',
          'Our team will investigate within 24-48 hours',
        ],
      },
    },
  },
};

export function CommunityGuidelinesPage({ language, setLanguage, setPage, announcement, onLogin }: CommunityGuidelinesPageProps) {
  const t = content[language];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical':
        return 'bg-red-100 text-red-700 border-red-300';
      case 'high':
        return 'bg-orange-100 text-orange-700 border-orange-300';
      default:
        return 'bg-yellow-100 text-yellow-700 border-yellow-300';
    }
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
              <div className="bg-gradient-to-br from-emerald-500 to-teal-500 p-3 rounded-xl">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl">{t.title}</h1>
                <p className="text-gray-600 mt-1">{t.subtitle}</p>
              </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <BookOpen className="w-4 h-4 text-blue-600" />
              <AlertDescription className="text-gray-700">
                {t.introduction}
              </AlertDescription>
            </Alert>
          </div>

          <Separator className="my-8" />

          {/* Core Values */}
          <Card className="border-2 border-emerald-100 shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Heart className="w-6 h-6 text-emerald-600" />
                {t.sections.coreValues.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {t.sections.coreValues.items.map((item, idx) => (
                  <div key={idx} className="border-l-4 border-emerald-500 pl-6 py-2">
                    <h3 className="font-semibold text-gray-900 mb-2 text-lg">{item.title}</h3>
                    <p className="text-gray-600 mb-4">{item.description}</p>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="bg-green-50 p-4 rounded-lg border border-green-200">
                        <div className="flex items-center gap-2 mb-2">
                          <CheckCircle className="w-5 h-5 text-green-600" />
                          <span className="font-semibold text-green-900">
                            {language === 'bn' ? 'করুন' : 'Do'}
                          </span>
                        </div>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {item.do.map((point, i) => (
                            <li key={i}>• {point}</li>
                          ))}
                        </ul>
                      </div>
                      <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                        <div className="flex items-center gap-2 mb-2">
                          <XCircle className="w-5 h-5 text-red-600" />
                          <span className="font-semibold text-red-900">
                            {language === 'bn' ? 'করবেন না' : 'Don\'t'}
                          </span>
                        </div>
                        <ul className="space-y-1 text-sm text-gray-700">
                          {item.dont.map((point, i) => (
                            <li key={i}>• {point}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Communication Policy */}
          <Card className="border-2 border-blue-100 shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <MessageCircle className="w-6 h-6 text-blue-600" />
                {t.sections.communication.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {t.sections.communication.items.map((item, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{item.title}</h3>
                      <p className="text-gray-600">{item.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Prohibited Activities */}
          <Card className="border-2 border-red-100 shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-red-50 to-orange-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Ban className="w-6 h-6 text-red-600" />
                {t.sections.prohibited.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {t.sections.prohibited.items.map((item, idx) => (
                  <Alert key={idx} className={getSeverityColor(item.severity)}>
                    <AlertTriangle className="w-4 h-4" />
                    <AlertDescription>
                      <div className="font-semibold mb-1">{item.title}</div>
                      <div className="text-sm">{item.description}</div>
                    </AlertDescription>
                  </Alert>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Consequences */}
          <Card className="border-2 border-orange-100 shadow-lg mb-8">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-red-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <AlertTriangle className="w-6 h-6 text-orange-600" />
                {t.sections.consequences.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {t.sections.consequences.levels.map((level, idx) => (
                  <div key={idx} className="flex gap-4 items-start">
                    <Badge className="mt-1">{idx + 1}</Badge>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">{level.level}</h3>
                      <p className="text-gray-600">{level.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Reporting */}
          <Card className="border-2 border-emerald-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Shield className="w-6 h-6 text-emerald-600" />
                {t.sections.reporting.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {t.sections.reporting.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white flex-shrink-0">
                      {idx + 1}
                    </div>
                    <p className="text-gray-700 leading-relaxed pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
