import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion, useInView } from 'motion/react';
import { 
  Users, Search, FileText, CreditCard, MessageSquare, 
  Star, Shield, Clock, Award, CheckCircle2, ArrowRight,
  BookOpen, UserCheck, DollarSign, Target, TrendingUp,
  Bell, Calendar, Video, Download, Play, ChevronDown, Calculator, Quote, MapPin
} from 'lucide-react';
import { useState, useRef, useEffect } from 'react';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';

interface ForGuardiansPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin') => void;
}

const content = {
  bn: {
    title: 'অভিভাবকদের জন্য',
    subtitle: 'যোগ্য শিক্ষক খুঁজুন এবং আপনার সন্তানের শিক্ষাকে এগিয়ে নিয়ে যান',
    startNow: 'এখনই শুরু করুন',
    howItWorks: 'কীভাবে কাজ করে',
    features: 'সুবিধাসমূহ',
    benefits: 'উপকারিতা',
    pricing: 'ক্রেডিট সিস্টেম',
    faq: 'প্রশ্নোত্তর',
  },
  en: {
    title: 'For Guardians',
    subtitle: 'Find qualified teachers and advance your child\'s education',
    startNow: 'Start Now',
    howItWorks: 'How It Works',
    features: 'Features',
    benefits: 'Benefits',
    pricing: 'Credit System',
    faq: 'FAQ',
  }
};

const steps = [
  {
    icon: Users,
    titleBn: 'রেজিস্ট্রেশন করুন',
    titleEn: 'Register',
    descBn: 'ফ্রিতে রেজিস্টার করুন এবং ১০০ ক্রেডিট পান',
    descEn: 'Register for free and get 100 credits',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: FileText,
    titleBn: 'টিউশন পোস্ট করুন',
    titleEn: 'Post Tuition',
    descBn: 'আপনার প্রয়োজন অনুযায়ী টিউশন পোস্ট করুন',
    descEn: 'Post tuition according to your needs',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: Search,
    titleBn: 'শিক্ষক খুঁজুন',
    titleEn: 'Find Teachers',
    descBn: 'যাচাইকৃত শিক্ষকদের প্রোফাইল দেখুন এবং যোগাযোগ করুন',
    descEn: 'View verified teacher profiles and contact them',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: UserCheck,
    titleBn: 'চুক্তি করুন',
    titleEn: 'Make Agreement',
    descBn: 'চুক্তিপত্র তৈরি করুন এবং শিক্ষা শুরু করুন',
    descEn: 'Create agreement and start education',
    color: 'from-orange-500 to-red-500'
  }
];

const features = [
  {
    icon: Shield,
    titleBn: 'যাচাইকৃত শিক্ষক',
    titleEn: 'Verified Teachers',
    descBn: 'সকল শিক্ষক যাচাইকৃত এবং অভিজ্ঞ',
    descEn: 'All teachers are verified and experienced',
    color: 'from-blue-500 to-cyan-500'
  },
  {
    icon: Star,
    titleBn: 'রিভিউ সিস্টেম',
    titleEn: 'Review System',
    descBn: 'অন্যান্য অভিভাবকদের রিভিউ দেখুন',
    descEn: 'See reviews from other guardians',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: CreditCard,
    titleBn: 'নিরাপদ পেমেন্ট',
    titleEn: 'Secure Payment',
    descBn: 'bKash, Card এবং Bank transfer সুবিধা',
    descEn: 'bKash, Card and Bank transfer facilities',
    color: 'from-emerald-500 to-teal-500'
  },
  {
    icon: MessageSquare,
    titleBn: 'সরাসরি চ্যাট',
    titleEn: 'Direct Chat',
    descBn: 'শিক্ষকদের সাথে সরাসরি যোগাযোগ করুন',
    descEn: 'Communicate directly with teachers',
    color: 'from-orange-500 to-red-500'
  },
  {
    icon: FileText,
    titleBn: 'ডিজিটাল চুক্তি',
    titleEn: 'Digital Agreement',
    descBn: 'কাস্টম চুক্তিপত্র তৈরি এবং PDF ডাউনলোড',
    descEn: 'Create custom agreements and download PDF',
    color: 'from-rose-500 to-pink-500'
  },
  {
    icon: Video,
    titleBn: 'ভিডিও মিটিং',
    titleEn: 'Video Meeting',
    descBn: 'অনলাইন ক্লাস এবং মিটিং এর সুবিধা',
    descEn: 'Online class and meeting facilities',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: Bell,
    titleBn: 'নোটিফিকেশন',
    titleEn: 'Notifications',
    descBn: 'সকল আপডেট রিয়েল-টাইমে পান',
    descEn: 'Get all updates in real-time',
    color: 'from-teal-500 to-cyan-500'
  },
  {
    icon: Calendar,
    titleBn: 'সময়সূচী',
    titleEn: 'Schedule',
    descBn: 'ক্লাসের সময়সূচী পরিচালনা করুন',
    descEn: 'Manage class schedule',
    color: 'from-amber-500 to-orange-500'
  }
];

const benefits = [
  {
    titleBn: 'সময় সাশ্রয়',
    titleEn: 'Time Saving',
    descBn: 'ঘরে বসেই যোগ্য শিক্ষক খুঁজুন, কোথাও যেতে হবে না',
    descEn: 'Find qualified teachers from home',
    icon: Clock
  },
  {
    titleBn: 'খরচ সাশ্রয়',
    titleEn: 'Cost Effective',
    descBn: 'মধ্যস্থতাকারী ছাড়াই সরাসরি শিক্ষকদের সাথে যোগাযোগ',
    descEn: 'Direct contact with teachers without middleman',
    icon: DollarSign
  },
  {
    titleBn: 'স্বচ্ছতা',
    titleEn: 'Transparency',
    descBn: 'সম্পূর্ণ স্বচ্ছ সিস্টেম, সকল তথ্য দেখতে পারবেন',
    descEn: 'Fully transparent system',
    icon: Target
  },
  {
    titleBn: 'গুণমান',
    titleEn: 'Quality',
    descBn: 'শুধুমাত্র যাচাইকৃত এবং অভিজ্ঞ শিক্ষক',
    descEn: 'Only verified and experienced teachers',
    icon: Award
  }
];

const pricingInfo = [
  { titleBn: 'রেজিস্ট্রেশন বোনাস', titleEn: 'Registration Bonus', value: '১০০ ক্রেডিট', color: 'from-emerald-500 to-teal-500' },
  { titleBn: 'টিউশন পোস্ট', titleEn: 'Tuition Post', value: '১০ ক্রেডিট', color: 'from-blue-500 to-cyan-500' },
  { titleBn: 'শিক্ষক যোগাযোগ', titleEn: 'Contact Teacher', value: '৫ ক্রেডিট', color: 'from-emerald-500 to-teal-500' },
  { titleBn: 'ক্রেডিট কিনুন', titleEn: 'Buy Credits', value: '১০০ টাকা = ১০০ ক্রেডিট', color: 'from-orange-500 to-red-500' }
];

const stats = [
  { value: 5000, suffix: '+', labelBn: 'যাচাইকৃত শিক্ষক', labelEn: 'Verified Teachers' },
  { value: 10000, suffix: '+', labelBn: 'সক্রিয় অভিভাবক', labelEn: 'Active Guardians' },
  { value: 15000, suffix: '+', labelBn: 'সফল টিউশন', labelEn: 'Successful Tuitions' },
  { value: 98, suffix: '%', labelBn: 'সন্তুষ্টির হার', labelEn: 'Satisfaction Rate' }
];

const testimonials = [
  {
    nameBn: 'রহিমা বেগম',
    nameEn: 'Rahima Begum',
    locationBn: 'ঢাকা',
    locationEn: 'Dhaka',
    textBn: 'আমার মেয়ের জন্য একজন চমৎকার গণিত শিক্ষক পেয়েছি। প্ল্যাটফর্মটি খুবই সহজ এবং নিরাপদ।',
    textEn: 'Found an excellent math teacher for my daughter. The platform is very easy and secure.',
    rating: 5
  },
  {
    nameBn: 'করিম আহমেদ',
    nameEn: 'Karim Ahmed',
    locationBn: 'চট্টগ্রাম',
    locationEn: 'Chittagong',
    textBn: 'মাত্র ৩ দিনে শিক্ষক পেয়েছি। ক্রেডিট সিস্টেম খুব সুবিধাজনক।',
    textEn: 'Got a teacher in just 3 days. Credit system is very convenient.',
    rating: 5
  },
  {
    nameBn: 'আয়েশা খান',
    nameEn: 'Ayesha Khan',
    locationBn: 'সিলেট',
    locationEn: 'Sylhet',
    textBn: 'সব শিক্ষকই যাচাইকৃত এবং অভিজ্ঞ। আমার ছেলের রেজাল্ট অনেক উন্নতি হয়েছে।',
    textEn: 'All teachers are verified and experienced. My son\'s results have improved a lot.',
    rating: 5
  }
];

const faqs = [
  {
    questionBn: 'রেজিস্ট্রেশন করতে কি খরচ হয়?',
    questionEn: 'Does registration cost anything?',
    answerBn: 'না, রেজিস্ট্রেশন সম্পূর্ণ ফ্রি এবং আপনি ১০০ ক্রেডিট বোনাস পাবেন।',
    answerEn: 'No, registration is completely free and you get 100 credits as bonus.'
  },
  {
    questionBn: 'কিভাবে শিক্ষক যাচাই করা হয়?',
    questionEn: 'How are teachers verified?',
    answerBn: 'আমরা সকল শিক্ষকের শিক্ষাগত যোগ্যতা, পরিচয়পত্র এবং অভিজ্ঞতা যাচাই করি।',
    answerEn: 'We verify all teachers\' educational qualifications, ID cards and experience.'
  },
  {
    questionBn: 'পেমেন্ট কিভাবে করব?',
    questionEn: 'How to make payment?',
    answerBn: 'bKash, রকেট, নগদ, ব্যাংক ট্রান্সফার অথবা কার্ড দিয়ে পেমেন্ট করতে পারবেন।',
    answerEn: 'You can pay via bKash, Rocket, Nagad, Bank Transfer or Card.'
  },
  {
    questionBn: 'ক্রেডিট কিভাবে কাজ করে?',
    questionEn: 'How do credits work?',
    answerBn: 'প্রতিটি টিউশন পোস্ট এবং শিক্ষক যোগাযোগে ক্রেডিট খরচ হয়। আপনি যেকোনো সময় ক্রেডিট কিনতে পারবেন।',
    answerEn: 'Credits are spent on each tuition post and teacher contact. You can buy credits anytime.'
  },
  {
    questionBn: 'রিফান্ড পলিসি কি?',
    questionEn: 'What is the refund policy?',
    answerBn: 'যদি কোন শিক্ষক না পান, আমরা ১০০% ক্রেডিট রিফান্ড দেব।',
    answerEn: 'If you don\'t get a teacher, we will refund 100% credits.'
  },
  {
    questionBn: 'কাস্টমার সাপোর্ট কখন পাওয়া যায়?',
    questionEn: 'When is customer support available?',
    answerBn: 'আমাদের সাপোর্ট টিম ২৪/৭ উপলব্ধ রয়েছে।',
    answerEn: 'Our support team is available 24/7.'
  }
];

// Counter Animation Component
function AnimatedCounter({ value, suffix = '' }: { value: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  useEffect(() => {
    if (isInView) {
      let start = 0;
      const end = value;
      const duration = 2000;
      const increment = end / (duration / 16);

      const timer = setInterval(() => {
        start += increment;
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 16);

      return () => clearInterval(timer);
    }
  }, [isInView, value]);

  return (
    <div ref={ref} className="text-4xl font-bold bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
      {count.toLocaleString()}{suffix}
    </div>
  );
}

export function ForGuardiansPage({ language, setLanguage, setPage, announcement, onLogin }: ForGuardiansPageProps) {
  const t = content[language];
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [currentTestimonial, setCurrentTestimonial] = useState(0);
  const [creditCalc, setCreditCalc] = useState({ posts: 1, contacts: 2 });

  const handleGetStarted = () => {
    setAuthDialogOpen(true);
  };

  const handleAuthSuccess = (type: 'teacher' | 'guardian' | 'student' | 'admin') => {
    setAuthDialogOpen(false);
    if (onLogin) {
      onLogin(type);
    } else {
      setPage('guardian-dashboard');
    }
  };

  const calculateTotalCredits = () => {
    return (creditCalc.posts * 10) + (creditCalc.contacts * 5);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50">
      <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} onLogin={onLogin} />

      {/* Modern Auth Dialog */}
      <UnifiedAuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        language={language}
        onLogin={handleAuthSuccess}
        initialMode="register"
      />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-blue-200 to-cyan-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          
          <div className="relative">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-3 rounded-full mb-6 shadow-lg"
            >
              <span className={`text-blue-700 flex items-center gap-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                <Award className="w-4 h-4" />
                {language === 'bn' ? '৫,০০০+ যাচাইকৃত শিক্ষক' : '5,000+ Verified Teachers'}
              </span>
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className={`text-gray-900 mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            >
              {t.title}
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className={`text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed mb-8 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            >
              {t.subtitle}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.8, duration: 0.6 }}
            >
              <Button
                onClick={handleGetStarted}
                className={`bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-8 py-6 text-lg hover:from-blue-700 hover:to-cyan-700 shadow-xl hover:shadow-2xl transition-all duration-300 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
              >
                {t.startNow}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-gray-900 mb-4 text-center ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
          >
            {t.howItWorks}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`text-gray-600 text-center mb-10 text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
          >
            {language === 'bn' ? 'মাত্র ৪টি ধাপে শুরু করুন' : 'Start in just 4 steps'}
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="p-6 text-center hover:shadow-xl transition-all duration-500 group relative overflow-hidden h-full">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                    />
                    
                    <div className="relative mb-4">
                      <div className={`w-16 h-16 mx-auto bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center shadow-lg`}>
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div className="absolute -top-2 -right-2 w-8 h-8 bg-white rounded-full flex items-center justify-center shadow-md">
                        <span className="text-sm font-bold text-gray-700">{i + 1}</span>
                      </div>
                    </div>
                    
                    <h3 className={`font-semibold text-gray-900 mb-2 relative ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {language === 'bn' ? step.titleBn : step.titleEn}
                    </h3>
                    <p className={`text-gray-600 text-sm leading-relaxed relative ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {language === 'bn' ? step.descBn : step.descEn}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-gray-900 mb-10 text-center ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
          >
            {t.features}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, i) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="p-6 hover:shadow-xl transition-all duration-500 group relative overflow-hidden h-full">
                    <motion.div
                      className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                    />
                    
                    <motion.div
                      className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center mb-4 shadow-md`}
                      whileHover={{ scale: 1.1, rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <Icon className="w-6 h-6 text-white" />
                    </motion.div>
                    
                    <h4 className={`font-semibold text-gray-900 mb-2 relative ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {language === 'bn' ? feature.titleBn : feature.titleEn}
                    </h4>
                    <p className={`text-gray-600 text-sm relative ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {language === 'bn' ? feature.descBn : feature.descEn}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Benefits */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-gray-900 mb-10 text-center ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
          >
            {t.benefits}
          </motion.h2>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {benefits.map((benefit, i) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ scale: 1.05 }}
                >
                  <Card className="p-6 text-center hover:shadow-xl transition-all duration-500 group bg-white h-full">
                    <motion.div
                      className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.6 }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h4 className={`font-semibold text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {language === 'bn' ? benefit.titleBn : benefit.titleEn}
                    </h4>
                    <p className={`text-gray-600 text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {language === 'bn' ? benefit.descBn : benefit.descEn}
                    </p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Pricing/Credit System */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-gray-900 mb-4 text-center ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
          >
            {t.pricing}
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`text-gray-600 text-center mb-10 text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
          >
            {language === 'bn' ? 'সহজ এবং স্বচ্ছ ক্রেডিট সিস্টেম' : 'Simple and transparent credit system'}
          </motion.p>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto">
            {pricingInfo.map((info, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <Card className="p-6 text-center hover:shadow-xl transition-all duration-500 group relative overflow-hidden">
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${info.color} opacity-5 group-hover:opacity-10 transition-opacity`}
                  />
                  <div className={`text-3xl font-bold bg-gradient-to-r ${info.color} bg-clip-text text-transparent mb-2 relative`}>
                    {info.value}
                  </div>
                  <div className={`text-gray-600 text-sm relative ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {language === 'bn' ? info.titleBn : info.titleEn}
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-center mt-8"
          >
            <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 max-w-2xl mx-auto">
              <div className="flex items-center justify-center gap-2 mb-2">
                <CheckCircle2 className="w-5 h-5 text-blue-600" />
                <h4 className="font-semibold text-gray-900">
                  {language === 'bn' ? 'বিশেষ সুবিধা' : 'Special Benefits'}
                </h4>
              </div>
              <p className="text-gray-600 text-sm">
                {language === 'bn' 
                  ? 'রেজিস্ট্রেশনের সাথে সাথে ১০০ ক্রেডিট ফ্রি! কোন লুকানো চার্জ নেই।'
                  : '100 credits free with registration! No hidden charges.'}
              </p>
            </Card>
          </motion.div>
        </motion.div>

        {/* Statistics Section - Enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-10"
          >
            <h2 className={`text-gray-900 mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {language === 'bn' ? 'আমাদের সাফল্য' : 'Our Success'}
            </h2>
            <p className={`text-gray-600 text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {language === 'bn' 
                ? 'সংখ্যায় Talent Tutor এর বিশ্বাসযোগ্যতা' 
                : 'Talent Tutor by numbers'}
            </p>
          </motion.div>

          <Card className="p-12 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white relative overflow-hidden shadow-2xl">
            {/* Animated Background Elements */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10 animate-pulse"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10 animate-pulse" style={{ animationDelay: '1s' }}></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-white rounded-full blur-3xl opacity-5"></div>
            
            <div className="relative grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {stats.map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 transition-all"
                  >
                    <div className="mb-4">
                      {i === 0 && <Shield className="w-10 h-10 mx-auto text-white" />}
                      {i === 1 && <Users className="w-10 h-10 mx-auto text-white" />}
                      {i === 2 && <CheckCircle2 className="w-10 h-10 mx-auto text-white" />}
                      {i === 3 && <Star className="w-10 h-10 mx-auto text-white" />}
                    </div>
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                    <p className={`text-blue-100 mt-3 font-medium ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {language === 'bn' ? stat.labelBn : stat.labelEn}
                    </p>
                  </motion.div>
                </motion.div>
              ))}
            </div>
          </Card>
        </motion.div>

        {/* Testimonials Carousel - Enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-3 rounded-full mb-6 shadow-md"
            >
              <Star className="w-5 h-5 text-blue-600 fill-blue-600" />
              <span className={`text-blue-700 font-medium ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {language === 'bn' ? 'সন্তুষ্ট অভিভাবক' : 'Happy Guardians'}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            >
              {language === 'bn' ? 'অভিভাবকদের মতামত' : 'Guardian Testimonials'}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={`text-gray-600 text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            >
              {language === 'bn' 
                ? 'যারা ইতিমধ্যে আমাদের সেবা নিয়েছেন তাদের অভিজ্ঞতা' 
                : 'Experiences from those who already used our service'}
            </motion.p>
          </div>

          <Card className="p-10 max-w-4xl mx-auto relative overflow-hidden shadow-xl bg-gradient-to-br from-white to-blue-50">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-200 rounded-full blur-3xl opacity-30"></div>
            <Quote className="absolute top-8 left-8 w-16 h-16 text-blue-200 opacity-50" />
            
            <div className="relative z-10">
              <motion.div
                key={currentTestimonial}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.5 }}
              >
                <div className="mb-6 flex justify-center gap-1">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                
                <p className={`text-gray-700 text-xl mb-8 text-center leading-relaxed px-8 italic ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  "{language === 'bn' 
                    ? testimonials[currentTestimonial].textBn 
                    : testimonials[currentTestimonial].textEn}"
                </p>
                
                <div className="flex items-center justify-center gap-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {(language === 'bn' 
                      ? testimonials[currentTestimonial].nameBn 
                      : testimonials[currentTestimonial].nameEn
                    ).charAt(0)}
                  </div>
                  <div className="text-left">
                    <p className={`font-semibold text-gray-900 text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {language === 'bn' 
                        ? testimonials[currentTestimonial].nameBn 
                        : testimonials[currentTestimonial].nameEn}
                    </p>
                    <p className={`text-gray-600 flex items-center gap-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      <MapPin className="w-4 h-4" />
                      {language === 'bn' 
                        ? testimonials[currentTestimonial].locationBn 
                        : testimonials[currentTestimonial].locationEn}
                    </p>
                  </div>
                </div>
              </motion.div>

              <div className="flex justify-center gap-3 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentTestimonial(i)}
                    className={`transition-all rounded-full ${
                      i === currentTestimonial 
                        ? 'w-12 h-3 bg-gradient-to-r from-blue-600 to-cyan-600' 
                        : 'w-3 h-3 bg-gray-300 hover:bg-gray-400'
                    }`}
                  />
                ))}
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Credit Calculator - Enhanced */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-3 rounded-full mb-6 shadow-md"
            >
              <Calculator className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700 font-medium">
                {language === 'bn' ? 'খরচ হিসাব' : 'Cost Calculation'}
              </span>
            </motion.div>

            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="text-gray-900 mb-4"
            >
              {language === 'bn' ? 'ক্রেডিট ক্যালকুলেটর' : 'Credit Calculator'}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="text-gray-600 text-lg"
            >
              {language === 'bn' 
                ? 'আপনার প্রয়োজন অনুযায়ী ক্রেডিট খরচ দেখুন' 
                : 'See credit cost based on your needs'}
            </motion.p>
          </div>

          <Card className="p-10 max-w-3xl mx-auto shadow-xl bg-gradient-to-br from-white to-blue-50">
            <div className="flex items-center gap-3 mb-8 justify-center">
              <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center shadow-lg">
                <Calculator className="w-6 h-6 text-white" />
              </div>
              <p className={`text-gray-700 font-medium text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {language === 'bn' 
                  ? 'আপনার খরচ হিসাব করুন' 
                  : 'Calculate your cost'}
              </p>
            </div>

            <div className="space-y-8">
              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className={`block text-base font-semibold text-gray-800 mb-4 flex items-center gap-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  <FileText className="w-5 h-5 text-blue-600" />
                  {language === 'bn' ? 'টিউশন পোস্ট সংখ্যা' : 'Number of Tuition Posts'}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={creditCalc.posts}
                    onChange={(e) => setCreditCalc({ ...creditCalc, posts: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {creditCalc.posts}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-xl p-6 shadow-sm">
                <label className={`block text-base font-semibold text-gray-800 mb-4 flex items-center gap-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  <Users className="w-5 h-5 text-cyan-600" />
                  {language === 'bn' ? 'শিক্ষক যোগাযোগ সংখ্যা' : 'Number of Teacher Contacts'}
                </label>
                <div className="flex items-center gap-4">
                  <input
                    type="range"
                    min="1"
                    max="20"
                    value={creditCalc.contacts}
                    onChange={(e) => setCreditCalc({ ...creditCalc, contacts: parseInt(e.target.value) })}
                    className="flex-1 h-2 bg-cyan-200 rounded-lg appearance-none cursor-pointer accent-cyan-600"
                  />
                  <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl flex items-center justify-center text-white text-xl font-bold shadow-lg">
                    {creditCalc.contacts}
                  </div>
                </div>
              </div>

              <div className="pt-8 border-t-2 border-gray-200">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 rounded-xl p-6 space-y-3">
                  <div className="flex justify-between items-center">
                    <span className={`text-gray-700 font-medium flex items-center gap-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      <FileText className="w-4 h-4" />
                      {language === 'bn' ? 'টিউশন পোস্ট:' : 'Tuition Posts:'}
                    </span>
                    <span className={`font-semibold text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {creditCalc.posts} × 10 = <span className="text-blue-600">{creditCalc.posts * 10}</span> {language === 'bn' ? 'ক্রেডিট' : 'credits'}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className={`text-gray-700 font-medium flex items-center gap-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      <Users className="w-4 h-4" />
                      {language === 'bn' ? 'শিক্ষক যোগাযোগ:' : 'Teacher Contacts:'}
                    </span>
                    <span className={`font-semibold text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {creditCalc.contacts} × 5 = <span className="text-cyan-600">{creditCalc.contacts * 5}</span> {language === 'bn' ? 'ক্রেডিট' : 'credits'}
                    </span>
                  </div>
                  
                  <div className="pt-4 border-t border-blue-200">
                    <div className="flex justify-between items-center">
                      <span className={`font-bold text-gray-900 text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {language === 'bn' ? 'মোট প্রয়োজন:' : 'Total Required:'}
                      </span>
                      <div className="flex items-center gap-3">
                        <CreditCard className="w-6 h-6 text-blue-600" />
                        <span className="font-bold text-3xl bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                          {calculateTotalCredits()}
                        </span>
                        <span className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{language === 'bn' ? 'ক্রেডিট' : 'credits'}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className={`mt-6 p-4 rounded-xl ${calculateTotalCredits() <= 100 ? 'bg-green-50 border-2 border-green-200' : 'bg-amber-50 border-2 border-amber-200'}`}>
                  <div className="flex items-start gap-3">
                    {calculateTotalCredits() <= 100 ? (
                      <CheckCircle2 className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
                    ) : (
                      <Award className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className={`font-semibold ${calculateTotalCredits() <= 100 ? 'text-green-900' : 'text-amber-900'} ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {language === 'bn' ? 'রেজিস্ট্রেশন বোনাস: ১০০ ক্রেডিট ফ্রি!' : 'Registration Bonus: 100 Credits Free!'}
                      </p>
                      <p className={`text-sm mt-1 ${calculateTotalCredits() <= 100 ? 'text-green-700' : 'text-amber-700'} ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {language === 'bn' 
                          ? calculateTotalCredits() <= 100 
                            ? '✨ দারুণ! আপনার কোন খরচ লাগবে না।' 
                            : `💡 আরও ${calculateTotalCredits() - 100} ক্রেডিট কিনতে হবে (${calculateTotalCredits() - 100} টাকা)।`
                          : calculateTotalCredits() <= 100 
                            ? '✨ Great! You won\'t need to buy any.' 
                            : `💡 You need to buy ${calculateTotalCredits() - 100} more credits (${calculateTotalCredits() - 100} BDT).`}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* FAQ Section - Enhanced Design */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <div className="text-center mb-12">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-cyan-100 px-6 py-3 rounded-full mb-6 shadow-md"
            >
              <CheckCircle2 className="w-5 h-5 text-blue-600" />
              <span className={`text-blue-700 font-medium ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.faq}</span>
            </motion.div>
            
            <motion.h2
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className={`text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            >
              {language === 'bn' ? 'সাধারণ প্রশ্নোত্তর' : 'Frequently Asked Questions'}
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className={`text-gray-600 text-lg max-w-2xl mx-auto ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            >
              {language === 'bn' 
                ? 'অভিভাবকদের সবচেয়ে জিজ্ঞাসিত প্রশ্নের উত্তর' 
                : 'Most asked questions by guardians'}
            </motion.p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05, duration: 0.5 }}
                >
                  <AccordionItem 
                    value={`item-${i}`} 
                    className="border border-gray-200 rounded-xl px-6 bg-white shadow-sm hover:shadow-md transition-all"
                  >
                    <AccordionTrigger className="hover:no-underline py-5">
                      <div className="flex items-start gap-3 text-left">
                        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-cyan-500 flex items-center justify-center text-white text-sm font-bold flex-shrink-0 mt-0.5">
                          {i + 1}
                        </div>
                        <span className={`font-medium text-gray-900 leading-relaxed ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          {language === 'bn' ? faq.questionBn : faq.questionEn}
                        </span>
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className={`text-gray-600 leading-relaxed pt-2 pl-11 pb-5 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {language === 'bn' ? faq.answerBn : faq.answerEn}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>

          {/* Need More Help Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="mt-10 max-w-4xl mx-auto"
          >
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-100">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className={`font-semibold text-gray-900 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {language === 'bn' ? 'আরো সাহায্য প্রয়োজন?' : 'Need More Help?'}
                    </h4>
                    <p className={`text-gray-600 text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {language === 'bn' 
                        ? 'আমাদের সাপোর্ট টিম ২৪/৭ আপনার সেবায় নিয়োজিত' 
                        : 'Our support team is available 24/7'}
                    </p>
                  </div>
                </div>
                <Button 
                  className={`bg-gradient-to-r from-blue-600 to-cyan-600 text-white hover:from-blue-700 hover:to-cyan-700 shadow-md ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                  onClick={() => setPage && setPage('help-center')}
                >
                  {language === 'bn' ? 'সাপোর্টে যোগাযোগ করুন' : 'Contact Support'}
                  <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </Card>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-blue-600 via-cyan-600 to-teal-600 text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"></div>
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl opacity-10"></div>
            
            <div className="relative">
              <motion.h2
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className={`text-white mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
              >
                {language === 'bn' ? 'আজই শুরু করুন' : 'Start Today'}
              </motion.h2>
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className={`text-blue-50 text-lg mb-8 max-w-2xl mx-auto ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
              >
                {language === 'bn'
                  ? 'হাজারো যাচাইকৃত শিক্ষকের মধ্যে থেকে আপনার সন্তানের জন্য সেরা শিক্ষক খুঁজুন'
                  : 'Find the best teacher for your child from thousands of verified teachers'}
              </motion.p>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  onClick={handleGetStarted}
                  className={`bg-white text-blue-600 px-8 py-6 text-lg hover:bg-gray-100 shadow-xl hover:shadow-2xl transition-all duration-300 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                >
                  {language === 'bn' ? 'ফ্রি রেজিস্ট্রেশন করুন' : 'Free Registration'}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </motion.div>
            </div>
          </Card>
        </motion.div>
      </div>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
