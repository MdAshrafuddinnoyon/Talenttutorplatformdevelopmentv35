import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import {
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Shield,
  Award,
  Users,
  DollarSign,
  Clock,
  FileText,
  ArrowLeft,
} from 'lucide-react';

interface TeacherGuidelinesPageProps {
  language: 'bn' | 'en';
  onBack?: () => void;
}

const content = {
  bn: {
    title: 'শিক্ষকদের জন্য নির্দেশনাবলী',
    subtitle: 'Talent Tutor প্ল্যাটফর্ম ব্যবহারের নিয়ম ও নীতিমালা',
    back: 'ফিরে যান',
    
    sections: {
      welcome: {
        title: 'স্বাগতম',
        content: 'Talent Tutor এ স্বাগতম! শিক্ষক হিসেবে আপনি ছাত্র-ছাত্রীদের জীবনে ইতিবাচক প্রভাব ফেলতে পারবেন। এই নির্দেশনাবলী অনুসরণ করে আপনি সফলভাবে প্ল্যাটফর্ম ব্যবহার করতে পারবেন।',
      },
      credits: {
        title: 'ক্রেডিট সিস্টেম',
        items: [
          'নতুন শিক্ষকরা ৫০টি ফ্রি ক্রেডিট পাবেন',
          'প্রতিটি টিউশনে আবেদন করতে ২ ক্রেডিট খরচ হবে',
          'অভিভাবকদের সাথে যোগাযোগ করতে ১ ক্রেডিট প্রয়োজন',
          'অতিরিক্ত ক্রেডিট কিনতে পারবেন',
        ],
      },
      subjects: {
        title: 'পাঠদানের বিষয়সমূহ',
        items: [
          '২০০+ বিষয় উপলব্ধ: প্রাথমিক (কেজি-৫ম), মাধ্যমিক, উচ্চ মাধ্যমিক',
          'O/A Level - সব বিষয় (Math, Physics, Chemistry, Biology)',
          'ভাষা প্রশিক্ষণ - IELTS, TOEFL, Spoken English, অন্যান্য ভাষা',
          'ধর্মীয় শিক্ষা - কুরআন তিলাওয়াত, হিফজ, তাজবীদ, আরবি ভাষা, মাদ্রাসা',
          'ইঞ্জিনিয়ারিং - CSE, EEE, Mechanical, Civil এবং সব বিভাগ',
          'মেডিকেল - MBBS, BDS, Pharmacy, Nursing সব বিষয়',
          'শিল্পকলা - Drawing, Painting, Music, Dance',
          'দক্ষতা উন্নয়ন - Computer, MS Office, Graphic Design',
        ],
      },
      application: {
        title: 'টিউশনে আবেদন প্রক্রিয়া',
        items: [
          'প্রোফাইল সম্পূর্ণ করুন (৮০% বা তার বেশি)',
          'আপনার পাঠদানের বিষয় নির্বাচন করুন',
          'টিউশন খুঁজুন এবং বিস্তারিত দেখুন',
          'আবেদন করুন এবং আপনার যোগ্যতা তুলে ধরুন',
          'অভিভাবকের প্রতিক্রিয়ার জন্য অপেক্ষা করুন',
        ],
      },
      dos: {
        title: 'করণীয়',
        items: [
          'সময়মত ক্লাস নিন',
          'পেশাদার আচরণ বজায় রাখুন',
          'ছাত্র-ছাত্রীদের অগ্রগতি ট্র্যাক করুন',
          'নিয়মিত অভিভাবকদের সাথে যোগাযোগ রাখুন',
          'সৎ এবং স্বচ্ছ থাকুন',
        ],
      },
      donts: {
        title: 'বর্জনীয়',
        items: [
          'প্ল্যাটফর্মের বাইরে পেমেন্ট নেবেন না',
          'মিথ্যা তথ্য প্রদান করবেন না',
          'অপ্রফেশনাল আচরণ করবেন না',
          'অন্য শিক্ষকদের নেগেটিভ রিভিউ দেবেন না',
          'ছাত্র-ছাত্রীদের সাথে অনুপযুক্ত যোগাযোগ করবেন না',
        ],
      },
      payment: {
        title: 'পেমেন্ট নীতিমালা',
        items: [
          'সকল পেমেন্ট প্ল্যাটফর্মের মাধ্যমে হবে',
          'মাসিক বা সাপ্তাহিক পেমেন্ট গ্রহণ করতে পারবেন',
          'প্ল্যাটফর্ম ফি: ১৫%',
          'পেমেন্ট প্রসেসিং সময়: ২-৩ কার্যদিবস',
        ],
      },
      privacy: {
        title: 'গোপনীয়তা ও নিরাপত্তা',
        items: [
          'ছাত্র-ছাত্রীদের ব্যক্তিগত তথ্য গোপন রাখুন',
          'আপনার পাসওয়ার্ড কাউকে শেয়ার করবেন না',
          'সন্দেহজনক কার্যকলাপ রিপোর্ট করুন',
          'নিয়মিত আপনার প্রোফাইল আপডেট করুন',
        ],
      },
      violations: {
        title: 'নীতিমালা লঙ্ঘন',
        content: 'নীতিমালা লঙ্ঘন করলে আপনার অ্যাকাউন্ট সাসপেন্ড বা স্থায়ীভাবে বন্ধ করা হতে পারে। গুরুতর ক্ষেত্রে আইনি ব্যবস্থা নেওয়া হবে।',
      },
    },
  },
  en: {
    title: 'Teacher Guidelines',
    subtitle: 'Rules and Policies for Using Talent Tutor Platform',
    back: 'Go Back',
    
    sections: {
      welcome: {
        title: 'Welcome',
        content: 'Welcome to Talent Tutor! As a teacher, you can make a positive impact on students\' lives. Follow these guidelines to use the platform successfully.',
      },
      credits: {
        title: 'Credit System',
        items: [
          'New teachers receive 50 free credits',
          'Each tuition application costs 2 credits',
          'Contacting guardians costs 1 credit',
          'Additional credits can be purchased',
        ],
      },
      subjects: {
        title: 'Teaching Subjects',
        items: [
          '200+ subjects available: Primary (KG-Grade 5), Secondary, Higher Secondary',
          'O/A Level - All subjects (Math, Physics, Chemistry, Biology)',
          'Language Training - IELTS, TOEFL, Spoken English, Other Languages',
          'Religious Education - Quran Recitation, Hifz, Tajweed, Arabic, Madrasa',
          'Engineering - CSE, EEE, Mechanical, Civil and all departments',
          'Medical - MBBS, BDS, Pharmacy, Nursing all subjects',
          'Arts - Drawing, Painting, Music, Dance',
          'Skills Development - Computer, MS Office, Graphic Design',
        ],
      },
      application: {
        title: 'Tuition Application Process',
        items: [
          'Complete your profile (80% or more)',
          'Select your teaching subjects',
          'Search and view tuition details',
          'Apply and highlight your qualifications',
          'Wait for guardian response',
        ],
      },
      dos: {
        title: 'Do\'s',
        items: [
          'Attend classes on time',
          'Maintain professional behavior',
          'Track student progress',
          'Communicate regularly with guardians',
          'Be honest and transparent',
        ],
      },
      donts: {
        title: 'Don\'ts',
        items: [
          'Don\'t accept payments outside the platform',
          'Don\'t provide false information',
          'Don\'t behave unprofessionally',
          'Don\'t give negative reviews to other teachers',
          'Don\'t communicate inappropriately with students',
        ],
      },
      payment: {
        title: 'Payment Policy',
        items: [
          'All payments through the platform',
          'Accept monthly or weekly payments',
          'Platform fee: 15%',
          'Payment processing time: 2-3 business days',
        ],
      },
      privacy: {
        title: 'Privacy & Security',
        items: [
          'Keep student information confidential',
          'Don\'t share your password',
          'Report suspicious activities',
          'Update your profile regularly',
        ],
      },
      violations: {
        title: 'Policy Violations',
        content: 'Violating policies may result in account suspension or permanent ban. Serious cases will result in legal action.',
      },
    },
  },
};

export function TeacherGuidelinesPage({ language, onBack }: TeacherGuidelinesPageProps) {
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
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
          </div>

          {/* Welcome Section */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-teal-600" />
                {t.sections.welcome.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{t.sections.welcome.content}</p>
            </CardContent>
          </Card>

          {/* Credit System */}
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

          {/* Application Process */}
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                {t.sections.application.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {t.sections.application.items.map((item, index) => (
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

          {/* Do's */}
          <Card className="mb-6">
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
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Don'ts */}
          <Card className="mb-6">
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
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Payment Policy */}
          <Card className="mb-6">
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
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="mb-6">
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
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          {/* Violations */}
          <Card className="mb-6 border-2 border-red-200 bg-red-50">
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
