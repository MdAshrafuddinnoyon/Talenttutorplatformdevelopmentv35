import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import {
  Headphones,
  MessageSquare,
  Mail,
  Phone,
  Clock,
  CheckCircle,
  Send,
  FileText,
  Video,
  ArrowLeft,
  HelpCircle,
  Zap,
} from 'lucide-react';

interface SupportSystemPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'সাপোর্ট সিস্টেম',
    subtitle: 'আমরা সবসময় আপনার সাহায্যের জন্য প্রস্তুত',
    back: 'ফিরে যান',
    
    introduction: 'Talent Tutor এ আপনার সমস্যা সমাধানের জন্য আমাদের ডেডিকেটেড সাপোর্ট টিম ২৪/৭ প্রস্তুত। বিভিন্ন উপায়ে আমাদের সাথে যোগাযোগ করতে পারেন।',

    supportChannels: {
      title: 'সাপোর্ট চ্যানেল',
      channels: [
        {
          title: 'লাইভ চ্যাট',
          icon: MessageSquare,
          description: 'তাৎক্ষণিক সাহায্যের জন্য লাইভ চ্যাট ব্যবহার করুন',
          availability: '২৪/৭ উপলব্ধ',
          responseTime: '১-৫ মিনিট',
          color: 'from-blue-500 to-emerald-500',
          action: 'চ্যাট শুরু করুন',
        },
        {
          title: 'ইমেইল সাপোর্ট',
          icon: Mail,
          description: 'বিস্তারিত সমস্যার জন্য ইমেইল পাঠান',
          availability: 'support@talenttutor.com',
          responseTime: '২-৬ ঘন্টা',
          color: 'from-purple-500 to-pink-500',
          action: 'ইমেইল পাঠান',
        },
        {
          title: 'ফোন সাপোর্ট',
          icon: Phone,
          description: 'জরুরি সমস্যার জন্য সরাসরি কল করুন',
          availability: '+880-1XXX-XXXXXX',
          responseTime: 'তাৎক্ষণিক',
          color: 'from-green-500 to-teal-500',
          action: 'কল করুন',
        },
        {
          title: 'টিকেট সিস্টেম',
          icon: FileText,
          description: 'জটিল সমস্যার জন্য টিকেট তৈরি করুন',
          availability: 'লগইন প্রয়োজন',
          responseTime: '৬-২৪ ঘন্টা',
          color: 'from-orange-500 to-red-500',
          action: 'টিকেট তৈরি করুন',
        },
      ],
    },

    howItWorks: {
      title: 'কিভাবে কাজ করে',
      steps: [
        {
          step: 1,
          title: 'সমস্যা নির্বাচন করুন',
          description: 'আপনার সমস্যার ক্যাটাগরি নির্বাচন করুন (টেকনিক্যাল, পেমেন্ট, অ্যাকাউন্ট, ইত্যাদি)',
        },
        {
          step: 2,
          title: 'যোগাযোগ মাধ্যম বেছে নিন',
          description: 'জরুরি হলে চ্যাট/ফোন, জটিল হলে ইমেইল/টিকেট বেছে নিন',
        },
        {
          step: 3,
          title: 'বিস্তারিত প্রদান করুন',
          description: 'সমস্যার বিস্তারিত বর্ণনা, স্ক্রিনশট বা প্রয়োজনীয় তথ্য দিন',
        },
        {
          step: 4,
          title: 'সমাধান পান',
          description: 'আমাদের টিম দ্রুত আপনার সমস্যা সমাধান করবে',
        },
        {
          step: 5,
          title: 'ফিডব্যাক দিন',
          description: 'সাপোর্টের মান উন্নতির জন্য ফিডব্যাক প্রদান করুন',
        },
      ],
    },

    supportTypes: {
      title: 'সাপোর্ট বিভাগ',
      types: [
        {
          title: 'টেকনিক্যাল সাপোর্ট',
          description: 'লগইন সমস্যা, অ্যাপ ক্র্যাশ, বাগ রিপোর্ট',
          priority: 'উচ্চ',
        },
        {
          title: 'পেমেন্ট সাপোর্ট',
          description: 'পেমেন্ট ব্যর্থতা, রিফান্ড, ক্রেডিট সমস্যা',
          priority: 'খুব উচ্চ',
        },
        {
          title: 'অ্যাকাউন্ট সাপোর্ট',
          description: 'প্রোফাইল আপডেট, ভেরিফিকেশন, অ্যাকাউন্ট রিকভারি',
          priority: 'মাঝারি',
        },
        {
          title: 'বিরোধ নিষ্পত্তি',
          description: 'শিক্ষক-অভিভাবক বিরোধ, রিফান্ড অনুরোধ',
          priority: 'উচ্চ',
        },
        {
          title: 'সাধারণ প্রশ্ন',
          description: 'প্ল্যাটফর্ম ব্যবহার, ফিচার সম্পর্কে জানতে',
          priority: 'সাধারণ',
        },
        {
          title: 'রিপোর্ট করুন',
          description: 'হয়রানি, স্প্যাম, নীতিমালা লঙ্ঘন রিপোর্ট',
          priority: 'খুব উচ্চ',
        },
      ],
    },

    tips: {
      title: 'দ্রুত সমাধানের টিপস',
      items: [
        'প্রথমে FAQ সেকশন চেক করুন, আপনার প্রশ্নের উত্তর সেখানে থাকতে পারে',
        'সমস্যার বিস্তারিত বর্ণনা দিন, স্ক্রিনশট সংযুক্ত করুন',
        'আপনার ইউজার ID বা ট্রান্জ্যাকশন ID উল্লেখ করুন',
        'ধৈর্য ধরুন, আমাদের টিম যত তাড়াতাড়ি সম্ভব উত্তর দেবে',
        'একই সমস্যার জন্য একাধিক টিকেট তৈরি করবেন না',
      ],
    },

    sla: {
      title: 'সার্ভিস লেভেল এগ্রিমেন্ট (SLA)',
      levels: [
        {
          priority: 'ক্রিটিক্যাল',
          description: 'পেমেন্ট ব্যর্থতা, অ্যাকাউন্ট হ্যাক, হয়রানি',
          responseTime: '১ ঘন্টা',
          resolutionTime: '৪ ঘন্টা',
          color: 'red',
        },
        {
          priority: 'উচ্চ',
          description: 'টেকনিক্যাল সমস্যা, বিরোধ',
          responseTime: '৪ ঘন্টা',
          resolutionTime: '২৪ ঘন্টা',
          color: 'orange',
        },
        {
          priority: 'মাঝারি',
          description: 'অ্যাকাউন্ট সমস্যা, প্রোফাইল আপডেট',
          responseTime: '১২ ঘন্টা',
          resolutionTime: '৪৮ ঘন্টা',
          color: 'yellow',
        },
        {
          priority: 'সাধারণ',
          description: 'সাধারণ প্রশ্ন, ফিচার সম্পর্কে',
          responseTime: '২৪ ঘন্টা',
          resolutionTime: '৭২ ঘন্টা',
          color: 'green',
        },
      ],
    },
  },
  en: {
    title: 'Support System',
    subtitle: 'We are always ready to help you',
    back: 'Go Back',
    
    introduction: 'Our dedicated support team at Talent Tutor is ready 24/7 to solve your problems. You can contact us in various ways.',

    supportChannels: {
      title: 'Support Channels',
      channels: [
        {
          title: 'Live Chat',
          icon: MessageSquare,
          description: 'Use live chat for instant help',
          availability: 'Available 24/7',
          responseTime: '1-5 minutes',
          color: 'from-blue-500 to-emerald-500',
          action: 'Start Chat',
        },
        {
          title: 'Email Support',
          icon: Mail,
          description: 'Send email for detailed problems',
          availability: 'support@talenttutor.com',
          responseTime: '2-6 hours',
          color: 'from-purple-500 to-pink-500',
          action: 'Send Email',
        },
        {
          title: 'Phone Support',
          icon: Phone,
          description: 'Call directly for urgent problems',
          availability: '+880-1XXX-XXXXXX',
          responseTime: 'Instant',
          color: 'from-green-500 to-teal-500',
          action: 'Call Now',
        },
        {
          title: 'Ticket System',
          icon: FileText,
          description: 'Create ticket for complex problems',
          availability: 'Login required',
          responseTime: '6-24 hours',
          color: 'from-orange-500 to-red-500',
          action: 'Create Ticket',
        },
      ],
    },

    howItWorks: {
      title: 'How It Works',
      steps: [
        {
          step: 1,
          title: 'Select Problem',
          description: 'Select your problem category (Technical, Payment, Account, etc.)',
        },
        {
          step: 2,
          title: 'Choose Contact Method',
          description: 'Chat/Phone for urgent, Email/Ticket for complex issues',
        },
        {
          step: 3,
          title: 'Provide Details',
          description: 'Detailed description, screenshots or necessary information',
        },
        {
          step: 4,
          title: 'Get Solution',
          description: 'Our team will quickly solve your problem',
        },
        {
          step: 5,
          title: 'Give Feedback',
          description: 'Provide feedback to improve support quality',
        },
      ],
    },

    supportTypes: {
      title: 'Support Categories',
      types: [
        {
          title: 'Technical Support',
          description: 'Login issues, app crash, bug reports',
          priority: 'High',
        },
        {
          title: 'Payment Support',
          description: 'Payment failure, refund, credit issues',
          priority: 'Very High',
        },
        {
          title: 'Account Support',
          description: 'Profile update, verification, account recovery',
          priority: 'Medium',
        },
        {
          title: 'Dispute Resolution',
          description: 'Teacher-guardian disputes, refund requests',
          priority: 'High',
        },
        {
          title: 'General Questions',
          description: 'Platform usage, feature information',
          priority: 'Normal',
        },
        {
          title: 'Report',
          description: 'Harassment, spam, policy violations',
          priority: 'Very High',
        },
      ],
    },

    tips: {
      title: 'Quick Resolution Tips',
      items: [
        'First check FAQ section, your answer might be there',
        'Provide detailed description, attach screenshots',
        'Mention your User ID or Transaction ID',
        'Be patient, our team will respond ASAP',
        'Don\'t create multiple tickets for same issue',
      ],
    },

    sla: {
      title: 'Service Level Agreement (SLA)',
      levels: [
        {
          priority: 'Critical',
          description: 'Payment failure, account hack, harassment',
          responseTime: '1 hour',
          resolutionTime: '4 hours',
          color: 'red',
        },
        {
          priority: 'High',
          description: 'Technical issues, disputes',
          responseTime: '4 hours',
          resolutionTime: '24 hours',
          color: 'orange',
        },
        {
          priority: 'Medium',
          description: 'Account issues, profile update',
          responseTime: '12 hours',
          resolutionTime: '48 hours',
          color: 'yellow',
        },
        {
          priority: 'Normal',
          description: 'General questions, feature info',
          responseTime: '24 hours',
          resolutionTime: '72 hours',
          color: 'green',
        },
      ],
    },
  },
};

export function SupportSystemPage({ language, setLanguage, setPage, announcement, onLogin }: SupportSystemPageProps) {
  const t = content[language];

  const getPriorityColor = (color: string) => {
    const colors = {
      red: 'bg-red-100 text-red-700 border-red-300',
      orange: 'bg-orange-100 text-orange-700 border-orange-300',
      yellow: 'bg-yellow-100 text-yellow-700 border-yellow-300',
      green: 'bg-green-100 text-green-700 border-green-300',
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} onLogin={onLogin} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto">
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
                <Headphones className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl md:text-4xl">{t.title}</h1>
                <p className="text-gray-600 mt-1">{t.subtitle}</p>
              </div>
            </div>

            <p className="text-gray-700 bg-blue-50 p-4 rounded-lg border border-blue-200">
              {t.introduction}
            </p>
          </div>

          <Separator className="my-8" />

          {/* Support Channels */}
          <div className="mb-12">
            <h2 className="text-2xl mb-6 flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-emerald-600" />
              {t.supportChannels.title}
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              {t.supportChannels.channels.map((channel, idx) => {
                const ChannelIcon = channel.icon;
                return (
                  <Card key={idx} className="border-2 border-emerald-100 hover:shadow-lg transition-shadow">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className={`bg-gradient-to-br ${channel.color} p-3 rounded-xl`}>
                          <ChannelIcon className="w-6 h-6 text-white" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-lg mb-2">{channel.title}</h3>
                          <p className="text-gray-600 text-sm mb-3">{channel.description}</p>
                          <div className="space-y-1 text-sm mb-4">
                            <div className="flex items-center gap-2 text-gray-700">
                              <Clock className="w-4 h-4" />
                              {channel.availability}
                            </div>
                            <div className="flex items-center gap-2 text-gray-700">
                              <Zap className="w-4 h-4" />
                              {language === 'bn' ? 'রেসপন্স: ' : 'Response: '}{channel.responseTime}
                            </div>
                          </div>
                          <Button className={`w-full bg-gradient-to-r ${channel.color} hover:opacity-90`}>
                            {channel.action}
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>

          {/* How It Works */}
          <Card className="border-2 border-blue-100 shadow-lg mb-12">
            <CardHeader className="bg-gradient-to-r from-blue-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <HelpCircle className="w-6 h-6 text-blue-600" />
                {t.howItWorks.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-6">
                {t.howItWorks.steps.map((step, idx) => (
                  <div key={idx} className="flex gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-emerald-500 rounded-full flex items-center justify-center text-white text-xl">
                        {step.step}
                      </div>
                    </div>
                    <div className="flex-1 pt-2">
                      <h3 className="font-semibold text-gray-900 mb-1">{step.title}</h3>
                      <p className="text-gray-600">{step.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Support Types */}
          <Card className="border-2 border-purple-100 shadow-lg mb-12">
            <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <FileText className="w-6 h-6 text-purple-600" />
                {t.supportTypes.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {t.supportTypes.types.map((type, idx) => (
                  <Card key={idx} className="bg-purple-50 border-purple-200">
                    <CardContent className="pt-6">
                      <Badge className="mb-3 bg-purple-600">{type.priority}</Badge>
                      <h3 className="font-semibold text-gray-900 mb-2">{type.title}</h3>
                      <p className="text-sm text-gray-600">{type.description}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Tips */}
          <Card className="border-2 border-green-100 shadow-lg mb-12">
            <CardHeader className="bg-gradient-to-r from-green-50 to-emerald-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <CheckCircle className="w-6 h-6 text-green-600" />
                {t.tips.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-3">
                {t.tips.items.map((tip, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700">{tip}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* SLA */}
          <Card className="border-2 border-orange-100 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-orange-50 to-yellow-50">
              <CardTitle className="flex items-center gap-3 text-2xl">
                <Clock className="w-6 h-6 text-orange-600" />
                {t.sla.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="space-y-4">
                {t.sla.levels.map((level, idx) => (
                  <div key={idx} className={`border-2 rounded-lg p-4 ${getPriorityColor(level.color)}`}>
                    <div className="flex items-start justify-between gap-4 mb-2">
                      <h3 className="font-semibold text-lg">{level.priority}</h3>
                      <div className="text-sm">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4" />
                          {language === 'bn' ? 'রেসপন্স: ' : 'Response: '}{level.responseTime}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <CheckCircle className="w-4 h-4" />
                          {language === 'bn' ? 'সমাধান: ' : 'Resolution: '}{level.resolutionTime}
                        </div>
                      </div>
                    </div>
                    <p className="text-sm">{level.description}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* CTA */}
          <div className="mt-8 text-center">
            <Button
              size="lg"
              onClick={() => setPage('help-center')}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {language === 'bn' ? 'সাহায্য কেন্দ্রে যান' : 'Go to Help Center'}
            </Button>
          </div>
        </div>
      </main>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
