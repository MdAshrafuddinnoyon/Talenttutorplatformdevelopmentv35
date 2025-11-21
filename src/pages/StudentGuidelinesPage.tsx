import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  BookOpen,
  CheckCircle,
  AlertTriangle,
  Shield,
  Heart,
  FileText,
  ArrowLeft,
  Award,
  HelpCircle,
} from 'lucide-react';

interface StudentGuidelinesPageProps {
  language: 'bn' | 'en';
  onBack?: () => void;
}

const content = {
  bn: {
    title: 'ছাত্র/অসহায়দের জন্য নির্দেশনাবলী',
    subtitle: 'Talent Tutor প্ল্যাটফর্ম ব্যবহারের নিয়ম ও নীতিমালা',
    back: 'ফিরে যান',
    
    sections: {
      welcome: {
        title: 'স্বাগতম',
        content: 'Talent Tutor এ স্বাগতম! এই প্ল্যাটফর্মে আপনি বিনামূল্যে শিক্ষা সহায়তা পাবেন। এই নির্দেশনাবলী অনুসরণ করে আপনি সফলভাবে প্ল্যাটফর্ম ব্যবহার করতে পারবেন।',
      },
      application: {
        title: 'সাহায্যের জন্য আবেদন',
        items: [
          'প্রোফাইল সম্পূর্ণ করুন',
          'আপনার পরিস্থিতি বর্ণনা করুন',
          'প্রয়োজনীয় ডকুমেন্ট জমা দিন',
          'যাচাইকরণের জন্য অপেক্ষা করুন',
          'অনুমোদিত হলে সাহায্য পাবেন',
        ],
      },
      benefits: {
        title: 'যে সুবিধা পাবেন',
        items: [
          'বিনামূল্যে টিউশন',
          'শিক্ষা উপকরণ (বই, খাতা, কলম)',
          'অনলাইন ক্লাস সুবিধা',
          'মেন্টরশিপ এবং গাইডেন্স',
        ],
      },
      dos: {
        title: 'করণীয়',
        items: [
          'নিয়মিত ক্লাসে উপস্থিত থাকুন',
          'পড়াশোনায় মনোযোগী হন',
          'শিক্ষকদের সম্মান করুন',
          'সৎ এবং স্বচ্ছ থাকুন',
          'অগ্রগতি রিপোর্ট করুন',
        ],
      },
      donts: {
        title: 'বর্জনীয়',
        items: [
          'মিথ্যা তথ্য দেবেন না',
          'অন্যায়ভাবে সাহায্য নেবেন না',
          'শিক্ষা উপকরণ অপব্যবহার করবেন না',
          'ক্লাস মিস করবেন না',
          'অন্যদের সাথে খারাপ ব্যবহার করবেন না',
        ],
      },
      privacy: {
        title: 'গোপনীয়তা ও নিরাপত্তা',
        items: [
          'আপনার ব্যক্তিগত তথ্য সুরক্ষিত রাখুন',
          'পাসওয়ার্ড কাউকে শেয়ার করবেন না',
          'সন্দেহজনক কার্যকলাপ রিপোর্ট করুন',
          'শুধু যাচাইকৃত দাতাদের সাথে যোগাযোগ করুন',
        ],
      },
      support: {
        title: 'সহায়তা কেন্দ্র',
        items: [
          'যেকোনো সমস্যায় অ্যাডমিনে যোগাযোগ করুন',
          'হেল্প সেন্টার ব্যবহার করুন',
          'FAQ দেখুন',
          'সাপোর্ট টিকেট খুলুন',
        ],
      },
      violations: {
        title: 'নীতিমালা লঙ্ঘন',
        content: 'নীতিমালা লঙ্ঘন করলে আপনার সাহায্য বন্ধ করা হতে পারে। মিথ্যা তথ্য প্রদান করলে আইনি ব্যবস্থা নেওয়া হবে।',
      },
    },
  },
  en: {
    title: 'Student/Helpless Guidelines',
    subtitle: 'Rules and Policies for Using Talent Tutor Platform',
    back: 'Go Back',
    
    sections: {
      welcome: {
        title: 'Welcome',
        content: 'Welcome to Talent Tutor! You will receive free educational support on this platform. Follow these guidelines to use the platform successfully.',
      },
      application: {
        title: 'Applying for Help',
        items: [
          'Complete your profile',
          'Describe your situation',
          'Submit required documents',
          'Wait for verification',
          'Receive help once approved',
        ],
      },
      benefits: {
        title: 'Benefits You Will Receive',
        items: [
          'Free tuition',
          'Educational materials (books, notebooks, pens)',
          'Online class facilities',
          'Mentorship and guidance',
        ],
      },
      dos: {
        title: 'Do\'s',
        items: [
          'Attend classes regularly',
          'Focus on your studies',
          'Respect your teachers',
          'Be honest and transparent',
          'Report your progress',
        ],
      },
      donts: {
        title: 'Don\'ts',
        items: [
          'Don\'t provide false information',
          'Don\'t take help unfairly',
          'Don\'t misuse educational materials',
          'Don\'t miss classes',
          'Don\'t behave badly with others',
        ],
      },
      privacy: {
        title: 'Privacy & Security',
        items: [
          'Protect your personal information',
          'Don\'t share your password',
          'Report suspicious activities',
          'Contact only verified donors',
        ],
      },
      support: {
        title: 'Support Center',
        items: [
          'Contact admin for any problem',
          'Use help center',
          'Check FAQ',
          'Open support ticket',
        ],
      },
      violations: {
        title: 'Policy Violations',
        content: 'Violating policies may result in termination of your help. Providing false information will result in legal action.',
      },
    },
  },
};

export function StudentGuidelinesPage({ language, onBack }: StudentGuidelinesPageProps) {
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
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <BookOpen className="w-8 h-8 text-white" />
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

          <Card className="mb-6 bg-gradient-to-br from-pink-50 to-purple-50 border-pink-200">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Award className="w-5 h-5 text-pink-600" />
                {t.sections.benefits.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ul className="space-y-2">
                {t.sections.benefits.items.map((item, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <Heart className="w-5 h-5 text-pink-600 flex-shrink-0 mt-0.5" />
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

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-blue-600" />
                  {t.sections.support.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {t.sections.support.items.map((item, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <HelpCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          </div>

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
