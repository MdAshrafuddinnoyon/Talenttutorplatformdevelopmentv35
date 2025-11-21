import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import {
  BookOpen,
  CheckCircle,
  Users,
  CreditCard,
  MessageSquare,
  Search,
  Shield,
  Award,
  ArrowLeft,
  User,
  FileText,
  Star,
} from 'lucide-react';

interface PlatformUsageGuidePageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'প্ল্যাটফর্ম ব্যবহার গাইড',
    subtitle: 'Talent Tutor প্ল্যাটফর্ম কিভাবে ব্যবহার করবেন তার সম্পূর্ণ নির্দেশিকা',
    back: 'ফিরে যান',
    
    sections: {
      gettingStarted: {
        title: 'শুরু করা',
        icon: BookOpen,
        items: [
          {
            title: 'রেজিস্ট্রেশন',
            description: 'প্রথমে আপনার ইউজার টাইপ নির্বাচন করুন (শিক্ষক/অভিভাবক/ছাত্র/দাতা)। ইমেইল, পাসওয়ার্ড এবং প্রয়োজনীয় তথ্য দিন।',
          },
          {
            title: 'প্রোফাইল সম্পূর্ণকরণ',
            description: 'রেজিস্ট্রেশনের পর প্রোফাইল সম্পূর্ণ করুন। ছবি আপলোড করুন, শিক্ষাগত যোগ্যতা, অভিজ্ঞতা এবং অন্যান্য তথ্য যুক্ত করুন।',
          },
          {
            title: 'ভেরিফিকেশন',
            description: 'শিক্ষকদের জন্য NID, শিক্ষাগত সনদপত্র যাচাই প্রয়োজন। ডকুমেন্ট আপলোড করুন এবং অনুমোদনের জন্য অপেক্ষা করুন।',
          },
        ],
      },
      forTeachers: {
        title: 'শিক্ষকদের জন্য',
        icon: Users,
        items: [
          {
            title: 'টিউশন খুঁজুন',
            description: 'ব্রাউজ টিউশন পেজে যান। বিষয়, এলাকা, শ্রেণী অনুযায়ী ফিল্টার করুন। উপযুক্ত টিউশন খুঁজুন।',
          },
          {
            title: 'আবেদন করুন',
            description: 'টিউশনের বিস্তারিত দেখুন। "আবেদন করুন" বাটনে ক্লিক করুন। ২ ক্রেডিট খরচ হবে। আপনার যোগ্যতা তুলে ধরুন।',
          },
          {
            title: 'যোগাযোগ করুন',
            description: 'অভিভাবকরা আপনার প্রোফাইল দেখবেন। পছন্দ হলে মেসেজ পাঠাবেন। রেসপন্স দিন এবং চূড়ান্ত সিদ্ধান্ত নিন।',
          },
          {
            title: 'ক্রেডিট ম্যানেজমেন্ট',
            description: '৫০ ফ্রি ক্রেডিট দিয়ে শুরু করুন। প্রয়োজনে অতিরিক্ত ক্রেডিট কিনুন। আবেদন ও মেসেজে খরচ হবে।',
          },
        ],
      },
      forGuardians: {
        title: 'অভিভাবকদের জন্য',
        icon: User,
        items: [
          {
            title: 'টিউশন পোস্ট করুন',
            description: 'ড্যাশবোর্ডে "টিউশন পোস্ট করুন" ক্লিক করুন। বিষয়, শ্রেণী, পারিশ্রমিক, সময়সূচী ইত্যাদি তথ্য দিন।',
          },
          {
            title: 'শিক্ষক খুঁজুন',
            description: 'ফাইন্ড টিচার্স পেজে যান। বিষয়, অভিজ্ঞতা, যোগ্যতা অনুযায়ী ফিল্টার করুন। প্রোফাইল দেখুন।',
          },
          {
            title: 'আবেদন পর্যালোচনা',
            description: 'আপনার পোস্টে শিক্ষকরা আবেদন করবেন। প্রতিটি আবেদন পর্যালোচনা করুন। পছন্দসই শিক্ষকদের শর্টলিস্ট করুন।',
          },
          {
            title: 'নিয়োগ করুন',
            description: 'মেসেজের মাধ্যমে যোগাযোগ করুন। ইন্টারভিউ নিন। উপযুক্ত শিক্ষক নির্বাচন করুন এবং চুক্তি করুন।',
          },
        ],
      },
      messaging: {
        title: 'মেসেজিং সিস্টেম',
        icon: MessageSquare,
        items: [
          {
            title: 'চ্যাট শুরু করুন',
            description: 'শুধুমাত্র আবেদিত বা গৃহীত ব্যবহারকারীদের সাথে চ্যাট করতে পারবেন। মেসেজ আইকনে ক্লিক করুন।',
          },
          {
            title: 'ফাইল শেয়ার',
            description: 'ডকুমেন্ট, ইমেজ শেয়ার করতে পারবেন (সর্বোচ্চ ১০ MB)। চ্যাটে অ্যাটাচমেন্ট বাটন ব্যবহার করুন।',
          },
          {
            title: 'নোটিফিকেশন',
            description: 'নতুন মেসেজ এলে নোটিফিকেশন পাবেন। ইমেইলেও জানানো হবে (সেটিংস থেকে কন্ট্রোল করুন)।',
          },
        ],
      },
      creditSystem: {
        title: 'ক্রেডিট সিস্টেম',
        icon: CreditCard,
        items: [
          {
            title: 'ফ্রি ক্রেডিট',
            description: 'শিক্ষক: ৫০ ক্রেডিট | অভিভাবক: ১০০ ক্রেডিট | নতুন ইউজারদের জন্য ফ্রি।',
          },
          {
            title: 'ক্রেডিট ব্যবহার',
            description: 'টিউশনে আবেদন: ২ ক্রেডিট | প্রথম মেসেজ: ১ ক্রেডিট | প্রোফাইল দেখা ফ্রি।',
          },
          {
            title: 'ক্রেডিট কিনুন',
            description: 'ক্রেডিট শেষ হলে পেমেন্ট গেটওয়ে থেকে কিনতে পারবেন। bKash, Nagad, কার্ড সাপোর্ট আছে।',
          },
        ],
      },
      tips: {
        title: 'সফলতার টিপস',
        icon: Star,
        items: [
          {
            title: 'প্রোফাইল সম্পূর্ণ রাখুন',
            description: 'সম্পূর্ণ প্রোফাইলে বিশ্বাসযোগ্যতা বাড়ে। ছবি, সনদপত্র, অভিজ্ঞতা সব আপডেট রাখুন।',
          },
          {
            title: 'দ্রুত রেসপন্স দিন',
            description: 'মেসেজের দ্রুত উত্তর দিন। অভিভাবক/শিক্ষকরা সক্রিয় ব্যবহারকারীদের পছন্দ করেন।',
          },
          {
            title: 'সৎ থাকুন',
            description: 'সঠিক তথ্য দিন। মিথ্যা তথ্য দিলে অ্যাকাউন্ট সাস্পেন্ড হতে পারে।',
          },
          {
            title: 'রেটিং বজায় রাখুন',
            description: 'ভালো সেবা দিন যাতে ভালো রেটিং পান। উচ্চ রেটিং আরও সুযোগ আনে।',
          },
        ],
      },
    },
  },
  en: {
    title: 'Platform Usage Guide',
    subtitle: 'Complete guide on how to use Talent Tutor platform',
    back: 'Go Back',
    
    sections: {
      gettingStarted: {
        title: 'Getting Started',
        icon: BookOpen,
        items: [
          {
            title: 'Registration',
            description: 'First select your user type (Teacher/Guardian/Student/Donor). Provide email, password and required information.',
          },
          {
            title: 'Profile Completion',
            description: 'After registration, complete your profile. Upload photo, add educational qualifications, experience and other details.',
          },
          {
            title: 'Verification',
            description: 'Teachers need NID and educational certificate verification. Upload documents and wait for approval.',
          },
        ],
      },
      forTeachers: {
        title: 'For Teachers',
        icon: Users,
        items: [
          {
            title: 'Find Tuitions',
            description: 'Go to Browse Tuitions page. Filter by subject, area, grade. Find suitable tuitions.',
          },
          {
            title: 'Apply',
            description: 'View tuition details. Click "Apply" button. 2 credits will be deducted. Highlight your qualifications.',
          },
          {
            title: 'Communicate',
            description: 'Guardians will view your profile. If interested, they will message. Respond and make final decision.',
          },
          {
            title: 'Credit Management',
            description: 'Start with 50 free credits. Buy additional credits if needed. Used for applications and messages.',
          },
        ],
      },
      forGuardians: {
        title: 'For Guardians',
        icon: User,
        items: [
          {
            title: 'Post Tuition',
            description: 'Click "Post Tuition" on dashboard. Provide subject, grade, salary, schedule and other details.',
          },
          {
            title: 'Find Teachers',
            description: 'Go to Find Teachers page. Filter by subject, experience, qualifications. View profiles.',
          },
          {
            title: 'Review Applications',
            description: 'Teachers will apply to your post. Review each application. Shortlist preferred teachers.',
          },
          {
            title: 'Hire',
            description: 'Communicate via messages. Conduct interviews. Select suitable teacher and make agreement.',
          },
        ],
      },
      messaging: {
        title: 'Messaging System',
        icon: MessageSquare,
        items: [
          {
            title: 'Start Chat',
            description: 'Can only chat with applied or accepted users. Click on message icon.',
          },
          {
            title: 'File Sharing',
            description: 'Can share documents, images (max 10 MB). Use attachment button in chat.',
          },
          {
            title: 'Notifications',
            description: 'Get notifications for new messages. Also sent via email (control from settings).',
          },
        ],
      },
      creditSystem: {
        title: 'Credit System',
        icon: CreditCard,
        items: [
          {
            title: 'Free Credits',
            description: 'Teacher: 50 credits | Guardian: 100 credits | Free for new users.',
          },
          {
            title: 'Credit Usage',
            description: 'Tuition application: 2 credits | First message: 1 credit | Profile viewing is free.',
          },
          {
            title: 'Buy Credits',
            description: 'When credits run out, can buy from payment gateway. bKash, Nagad, card supported.',
          },
        ],
      },
      tips: {
        title: 'Success Tips',
        icon: Star,
        items: [
          {
            title: 'Complete Profile',
            description: 'Complete profile increases credibility. Keep photo, certificates, experience updated.',
          },
          {
            title: 'Respond Quickly',
            description: 'Reply to messages quickly. Guardians/teachers prefer active users.',
          },
          {
            title: 'Be Honest',
            description: 'Provide accurate information. False information can lead to account suspension.',
          },
          {
            title: 'Maintain Rating',
            description: 'Provide good service to get good ratings. High ratings bring more opportunities.',
          },
        ],
      },
    },
  },
};

export function PlatformUsageGuidePage({ language, setLanguage, setPage, announcement, onLogin }: PlatformUsageGuidePageProps) {
  const t = content[language];

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
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl">{t.title}</h1>
                <p className="text-gray-600 mt-1">{t.subtitle}</p>
              </div>
            </div>
          </div>

          <Separator className="my-8" />

          {/* Sections */}
          <div className="space-y-8">
            {Object.entries(t.sections).map(([key, section]) => {
              const SectionIcon = section.icon;
              return (
                <Card key={key} className="border-2 border-emerald-100 shadow-lg">
                  <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50">
                    <CardTitle className="flex items-center gap-3 text-2xl">
                      <SectionIcon className="w-6 h-6 text-emerald-600" />
                      {section.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <div className="space-y-6">
                      {section.items.map((item, idx) => (
                        <div key={idx} className="flex gap-4">
                          <div className="flex-shrink-0">
                            <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white">
                              {idx + 1}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                              {item.title}
                            </h3>
                            <p className="text-gray-600 leading-relaxed">
                              {item.description}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Help Note */}
          <Card className="mt-8 bg-gradient-to-r from-blue-50 to-emerald-50 border-2 border-blue-200">
            <CardContent className="pt-6">
              <div className="flex gap-4">
                <MessageSquare className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">
                    {language === 'bn' ? 'আরও সাহায্য প্রয়োজন?' : 'Need More Help?'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'bn'
                      ? 'কোন প্রশ্ন বা সমস্যা থাকলে আমাদের সাপোর্ট টিম ২৪/৭ আপনাকে সাহায্য করতে প্রস্তুত।'
                      : 'If you have any questions or problems, our support team is ready to help you 24/7.'}
                  </p>
                  <Button
                    onClick={() => setPage('help-center')}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  >
                    {language === 'bn' ? 'সাহায্য কেন্দ্রে যান' : 'Go to Help Center'}
                  </Button>
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
