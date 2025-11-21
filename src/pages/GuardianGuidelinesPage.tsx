import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  Users,
  CheckCircle,
  AlertTriangle,
  Shield,
  DollarSign,
  FileText,
  ArrowLeft,
  Award,
  Clock,
} from 'lucide-react';

interface GuardianGuidelinesPageProps {
  language: 'bn' | 'en';
  onBack?: () => void;
}

const content = {
  bn: {
    title: 'অভিভাবকদের জন্য নির্দেশনাবলী',
    subtitle: 'Talent Tutor প্ল্যাটফর্ম ব্যবহারের নিয়ম ও নীতিমালা',
    back: 'ফিরে যান',
    
    sections: {
      welcome: {
        title: 'স্বাগতম',
        content: 'Talent Tutor এ স্বাগতম! অভিভাবক হিসেবে আপনি আপনার সন্তানের জন্য সেরা শিক্ষক খুঁজে পাবেন। এই নির্দেশনাবলী অনুসরণ করে আপনি সফলভাবে প্ল্যাটফর্ম ব্যবহার করতে পারবেন।',
      },
      credits: {
        title: 'ক্রেডিট সিস্টেম',
        items: [
          'নতুন অভিভাবকরা ১০০টি ফ্রি ক্রেডিট পাবেন',
          'টিউশন পোস্ট করতে ৫ ক্রেডিট খরচ হবে',
          'শিক্ষকদের সাথে যোগাযোগ করতে ১ ক্রেডিট প্রয়োজন',
          'অতিরিক্ত ক্রেডিট কিনতে পারবেন',
        ],
      },
      availableSubjects: {
        title: 'উপলব্ধ বিষয়সমূহ',
        items: [
          'প্রাথমিক শিক্ষা (কেজি-৫ম): সব বিষয়, ইংরেজি মিডিয়াম, বাংলা মিডিয়াম',
          'মাধ্যমিক ও উচ্চ মাধ্যমিক: বিজ্ঞান, মানবিক, ব্যবসায় শিক্ষা',
          'O/A Level: Math, Physics, Chemistry, Biology, Accounting, Business',
          'IELTS, TOEFL, Spoken English, অন্যান্য ভাষা প্রশিক্ষণ',
          'কুরআন শিক্ষা, হিফজ, তাজবীদ, আরবি ভাষা, মাদ্রাসা শিক্ষা',
          'ইঞ্জিনিয়ারিং: CSE, EEE, Mechanical, Civil সব বিভাগের সব বিষয়',
          'মেডিকেল: MBBS, BDS, Pharmacy, Nursing সব কোর্স',
          'শিল্পকলা ও দক্ষতা: Drawing, Music, Computer, Graphic Design',
        ],
      },
      posting: {
        title: 'টিউশন পোস্ট করার প্রক্রিয়া',
        items: [
          'প্রোফাইল সম্পূর্ণ করুন',
          'টিউশনের বিষয় এবং শ্রেণী নির্বাচন করুন',
          'টিউশনের বিস্তারিত তথ্য দিন',
          'বাজেট নির্ধারণ করুন',
          'শিক্ষকদের আবেদন পর্যালোচনা করুন',
          'উপযুক্ত শিক্ষক নিয়োগ করুন',
        ],
      },
      dos: {
        title: 'করণীয়',
        items: [
          'স্পষ্ট এবং বিস্তারিত টিউশন পোস্ট করুন',
          'শিক্ষকদের সাথে পেশাদার আচরণ করুন',
          'সময়মত পেমেন্ট করুন',
          'শিক্ষকদের সৎ রিভিউ দিন',
          'নিয়মিত সন্তানের অগ্রগতি পর্যবেক্ষণ করুন',
        ],
      },
      donts: {
        title: 'বর্জনীয়',
        items: [
          'প্ল্যাটফর্মের বাইরে পেমেন্ট করবেন না',
          'মিথ্যা তথ্য প্রদান করবেন না',
          'অপ্রফেশনাল আচরণ করবেন না',
          'শিক্ষকদের হয়রানি করবেন না',
          'অযথা কম রিভিউ দেবেন না',
        ],
      },
      payment: {
        title: 'পেমেন্ট নীতিমালা',
        items: [
          'সকল পেমেন্ট প্ল্যাটফর্মের মাধ্যমে করুন',
          'মাসিক বা সাপ্তাহিক পেমেন্ট করতে পারবেন',
          'নিরাপদ পেমেন্ট গেটওয়ে ব্যবহার করুন',
          'পেমেন্ট রসিদ সংরক্ষণ করুন',
        ],
      },
      privacy: {
        title: 'গোপনীয়তা ও নিরাপত্তা',
        items: [
          'সন্তানের ব্যক্তিগত তথ্য সুরক্ষিত রাখুন',
          'আপনার পাসওয়ার্ড কাউকে শেয়ার করবেন না',
          'সন্দেহজনক কার্যকলাপ রিপোর্ট করুন',
          'যাচাইকৃত শিক্ষক নিয়োগ করুন',
        ],
      },
      violations: {
        title: 'নীতিমালা লঙ্ঘন',
        content: 'নীতিমালা লঙ্ঘন করলে আপনার অ্যাকাউন্ট সাসপেন্ড বা স্থায়ীভাবে বন্ধ করা হতে পারে।',
      },
    },
  },
  en: {
    title: 'Guardian Guidelines',
    subtitle: 'Rules and Policies for Using Talent Tutor Platform',
    back: 'Go Back',
    
    sections: {
      welcome: {
        title: 'Welcome',
        content: 'Welcome to Talent Tutor! As a guardian, you can find the best teachers for your children. Follow these guidelines to use the platform successfully.',
      },
      credits: {
        title: 'Credit System',
        items: [
          'New guardians receive 100 free credits',
          'Posting tuition costs 5 credits',
          'Contacting teachers costs 1 credit',
          'Additional credits can be purchased',
        ],
      },
      availableSubjects: {
        title: 'Available Subjects',
        items: [
          'Primary Education (KG-Grade 5): All subjects, English Medium, Bangla Medium',
          'Secondary & Higher Secondary: Science, Arts, Commerce',
          'O/A Level: Math, Physics, Chemistry, Biology, Accounting, Business',
          'IELTS, TOEFL, Spoken English, Other Language Training',
          'Quran Education, Hifz, Tajweed, Arabic, Madrasa Education',
          'Engineering: CSE, EEE, Mechanical, Civil all department subjects',
          'Medical: MBBS, BDS, Pharmacy, Nursing all courses',
          'Arts & Skills: Drawing, Music, Computer, Graphic Design',
        ],
      },
      posting: {
        title: 'Tuition Posting Process',
        items: [
          'Complete your profile',
          'Select tuition subject and class',
          'Provide detailed tuition information',
          'Set your budget',
          'Review teacher applications',
          'Hire suitable teacher',
        ],
      },
      dos: {
        title: 'Do\'s',
        items: [
          'Post clear and detailed tuitions',
          'Maintain professional behavior with teachers',
          'Make payments on time',
          'Give honest reviews to teachers',
          'Monitor child\'s progress regularly',
        ],
      },
      donts: {
        title: 'Don\'ts',
        items: [
          'Don\'t make payments outside the platform',
          'Don\'t provide false information',
          'Don\'t behave unprofessionally',
          'Don\'t harass teachers',
          'Don\'t give unfairly low reviews',
        ],
      },
      payment: {
        title: 'Payment Policy',
        items: [
          'Make all payments through the platform',
          'Pay monthly or weekly',
          'Use secure payment gateway',
          'Keep payment receipts',
        ],
      },
      privacy: {
        title: 'Privacy & Security',
        items: [
          'Protect child\'s personal information',
          'Don\'t share your password',
          'Report suspicious activities',
          'Hire verified teachers',
        ],
      },
      violations: {
        title: 'Policy Violations',
        content: 'Violating policies may result in account suspension or permanent ban.',
      },
    },
  },
};

export function GuardianGuidelinesPage({ language, onBack }: GuardianGuidelinesPageProps) {
  const t = content[language];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header language={language} />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          {/* Header */}
          <div className="mb-8">
            {onBack && (
              <Button variant="ghost" onClick={onBack} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.back}
              </Button>
            )}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
          </div>

          {/* Welcome */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-blue-600" />
                {t.sections.welcome.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{t.sections.welcome.content}</p>
            </CardContent>
          </Card>

          {/* Credits */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <DollarSign className="w-5 h-5 text-green-600" />
                {t.sections.credits.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {t.sections.credits.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Posting Process */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                {t.sections.posting.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {t.sections.posting.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <div className="w-6 h-6 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center flex-shrink-0 text-sm font-bold">
                      {index + 1}
                    </div>
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Do's and Don'ts */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                  {t.sections.dos.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.sections.dos.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  {t.sections.donts.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.sections.donts.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <AlertTriangle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Payment & Privacy */}
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  {t.sections.payment.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.sections.payment.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="w-5 h-5 text-purple-600" />
                  {t.sections.privacy.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.sections.privacy.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <Shield className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

          {/* Violations */}
          <Card className="border-2 border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-red-700">
                <AlertTriangle className="w-5 h-5" />
                {t.sections.violations.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-red-700">{t.sections.violations.content}</p>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer language={language} />
    </div>
  );
}
