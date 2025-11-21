import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  Heart,
  CheckCircle,
  AlertTriangle,
  Shield,
  DollarSign,
  Package,
  FileText,
  ArrowLeft,
  Award,
  TrendingUp,
} from 'lucide-react';

interface DonorGuidelinesPageProps {
  language: 'bn' | 'en';
  onBack?: () => void;
}

const content = {
  bn: {
    title: 'দাতাদের জন্য নির্দেশনাবলী',
    subtitle: 'Talent Tutor প্ল্যাটফর্ম ব্যবহারের নিয়ম ও নীতিমালা',
    back: 'ফিরে যান',
    
    sections: {
      welcome: {
        title: 'স্বাগতম',
        content: 'Talent Tutor এ স্বাগতম! দাতা হিসেবে আপনি অসহায় ছাত্র-ছাত্রীদের জীবন পরিবর্তনে সাহায্য করতে পারবেন। এই নির্দেশনাবলী অনুসরণ করে আপনি সঠিকভাবে দান করতে পারবেন।',
      },
      types: {
        title: 'দানের ধরন',
        items: [
          'যাকাত প্রদানকারী: অর্থ ও সব ধরনের সাহায্য',
          'শিক্ষা উপকরণ দাতা: বই, খাতা, কলম ইত্যাদি',
          'মাসিক/বার্ষিক দান',
          'এককালীন দান',
        ],
      },
      process: {
        title: 'দান করার প্রক্রিয়া',
        items: [
          'প্রোফাইল তৈরি করুন',
          'দানের ধরন নির্বাচন করুন',
          'ছাত্র-ছাত্রীদের প্রোফাইল দেখুন',
          'যাচাইকৃত আবেদন পর্যালোচনা করুন',
          'দান করুন',
          'প্রভাব ট্র্যাক করুন',
        ],
      },
      dos: {
        title: 'করণীয়',
        items: [
          'যাচাইকৃত ছাত্র-ছাত্রীদের সাহায্য করুন',
          'নিয়মিত দান করুন',
          'অগ্রগতি রিপোর্ট দেখুন',
          'স্বচ্ছতা বজায় রাখুন',
          'প্ল্যাটফর্মের মাধ্যমে দান করুন',
        ],
      },
      donts: {
        title: 'বর্জনীয়',
        items: [
          'প্ল্যাটফর্মের বাইরে দান করবেন না',
          'অযাচাইকৃত আবেদনে দান করবেন না',
          'ব্যক্তিগত তথ্য শেয়ার করবেন না',
          'দানে শর্ত আরোপ করবেন না',
          'মিথ্যা প্রতিশ্রুতি দেবেন না',
        ],
      },
      transparency: {
        title: 'স্বচ্ছতা এবং ট্র্যাকিং',
        items: [
          'প্রতিটি দানের রসিদ পাবেন',
          'দানের ব্যবহার দেখতে পারবেন',
          'ছাত্র-ছাত্রীদের অগ্রগতি ট্র্যাক করুন',
          'মাসিক রিপোর্ট পাবেন',
        ],
      },
      zakat: {
        title: 'যাকাত সংক্রান্ত',
        items: [
          'যাকাত গণনা করুন',
          'সঠিক খাতে যাকাত দিন',
          'যাকাতের সার্টিফিকেট পাবেন',
          'শরিয়াহ অনুমোদিত',
        ],
      },
      privacy: {
        title: 'গোপনীয়তা ও নিরাপত্তা',
        items: [
          'আপনার দান গোপন রাখা হবে (চাইলে)',
          'নিরাপদ পেমেন্ট গেটওয়ে',
          'আপনার তথ্য সুরক্ষিত',
          'ব্যাংক লেভেল সিকিউরিটি',
        ],
      },
      violations: {
        title: 'নীতিমালা লঙ্ঘন',
        content: 'নীতিমালা লঙ্ঘন করলে আপনার অ্যাকাউন্ট সাসপেন্ড করা হতে পারে। প্রতারণার ক্ষেত্রে আইনি ব্যবস্থা নেওয়া হবে।',
      },
    },
  },
  en: {
    title: 'Donor Guidelines',
    subtitle: 'Rules and Policies for Using Talent Tutor Platform',
    back: 'Go Back',
    
    sections: {
      welcome: {
        title: 'Welcome',
        content: 'Welcome to Talent Tutor! As a donor, you can help change the lives of helpless students. Follow these guidelines to donate properly.',
      },
      types: {
        title: 'Types of Donation',
        items: [
          'Zakat Donor: Money & All Kinds of Help',
          'Educational Materials Donor: Books, Notebooks, Pens etc.',
          'Monthly/Annual Donation',
          'One-time Donation',
        ],
      },
      process: {
        title: 'Donation Process',
        items: [
          'Create profile',
          'Select donation type',
          'View student profiles',
          'Review verified applications',
          'Make donation',
          'Track impact',
        ],
      },
      dos: {
        title: 'Do\'s',
        items: [
          'Help verified students',
          'Donate regularly',
          'View progress reports',
          'Maintain transparency',
          'Donate through platform',
        ],
      },
      donts: {
        title: 'Don\'ts',
        items: [
          'Don\'t donate outside platform',
          'Don\'t donate to unverified applications',
          'Don\'t share personal information',
          'Don\'t impose conditions on donations',
          'Don\'t make false promises',
        ],
      },
      transparency: {
        title: 'Transparency & Tracking',
        items: [
          'Get receipt for each donation',
          'See how donation is used',
          'Track student progress',
          'Receive monthly reports',
        ],
      },
      zakat: {
        title: 'Zakat Related',
        items: [
          'Calculate Zakat',
          'Give Zakat to proper channels',
          'Receive Zakat certificate',
          'Shariah compliant',
        ],
      },
      privacy: {
        title: 'Privacy & Security',
        items: [
          'Your donation kept private (optional)',
          'Secure payment gateway',
          'Your information protected',
          'Bank level security',
        ],
      },
      violations: {
        title: 'Policy Violations',
        content: 'Violating policies may result in account suspension. Fraud cases will result in legal action.',
      },
    },
  },
};

export function DonorGuidelinesPage({ language, onBack }: DonorGuidelinesPageProps) {
  const t = content[language];

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Header language={language} />

      <main className="flex-1 py-12">
        <div className="container max-w-4xl mx-auto px-4">
          <div className="mb-8">
            {onBack && (
              <Button variant="ghost" onClick={onBack} className="mb-4">
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.back}
              </Button>
            )}
            <div className="text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-pink-500 to-red-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">{t.title}</h1>
              <p className="text-gray-600">{t.subtitle}</p>
            </div>
          </div>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Heart className="w-5 h-5 text-pink-600" />
                {t.sections.welcome.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{t.sections.welcome.content}</p>
            </CardContent>
          </Card>

          <Card className="mb-6 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Package className="w-5 h-5 text-pink-600" />
                {t.sections.types.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {t.sections.types.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Heart className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{item}</span>
                  </li>
                ))}
              </ul>
            </CardContent>
          </Card>

          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="w-5 h-5 text-blue-600" />
                {t.sections.process.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {t.sections.process.items.map((item, index) => (
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

          <div className="grid md:grid-cols-2 gap-6 mb-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-blue-600" />
                  {t.sections.transparency.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.sections.transparency.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  {t.sections.zakat.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.sections.zakat.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

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
