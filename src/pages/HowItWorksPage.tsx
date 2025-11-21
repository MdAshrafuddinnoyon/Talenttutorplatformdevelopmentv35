import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { CheckCircle2, Users, Search, MessageSquare, CreditCard, Star, ArrowRight, Book, UserCheck, FileText, Shield, TrendingUp, Award, Sparkles, Zap, Clock, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { motion } from 'motion/react';
import { useState } from 'react';

interface HowItWorksPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin') => void;
}

const content = {
  bn: {
    title: 'কিভাবে কাজ করে',
    subtitle: 'Talent Tutor প্ল্যাটফর্মে শিক্ষক ও অভিভাবকদের জন্য সহজ ৪ ধাপের প্রক্রিয়া',
    
    // For Teachers
    teachersTitle: 'শিক্ষকদের জন্য',
    teachersSubtitle: 'মাত্র ৪টি সহজ ধাপে আপনার টিউশন ক্যারিয়ার শুরু করুন',
    teachersSteps: [
      {
        icon: UserCheck,
        title: 'একাউন্ট তৈরি করুন',
        description: 'বিনামূল্যে শিক্ষক একাউন্ট তৈরি করুন এবং ৫০টি ফ্রি ক্রেডিট পান। আপনার শিক্ষাগত যোগ্যতা, অভিজ্ঞতা এবং বিষয় যোগ করুন।',
        time: '৫ মিনিট',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        icon: Search,
        title: 'টিউশন খুঁজুন',
        description: 'আপনার পছন্দের এলাকা, বিষয় এবং সময়সূচী অনুযায়ী টিউশন পোস্ট ব্রাউজ করুন। ফিল্টার ব্যবহার করে সঠিক টিউশন খুঁজুন।',
        time: '১০ মিনিট',
        color: 'from-teal-500 to-emerald-500'
      },
      {
        icon: MessageSquare,
        title: 'আবেদন করুন',
        description: '১০ ক্রেডিট খরচ করে টিউশনে আবেদন করুন। আপনার প্রোফাইল অভিভাবক দেখবেন এবং সরাসরি মেসেজ করতে পারবেন।',
        time: '২ মিনিট',
        color: 'from-orange-500 to-red-500'
      },
      {
        icon: Award,
        title: 'টিউশন শুরু করুন',
        description: 'অভিভাবক সম্মত হলে চুক্তি করুন এবং পড়ানো শুরু করুন। আপনার আয় সরাসরি মোবাইল ব্যাংকিং/ব্যাংকে পাবেন।',
        time: 'চলমান',
        color: 'from-emerald-500 to-teal-500'
      }
    ],
    
    // For Guardians
    guardiansTitle: 'অভিভাবকদের জন্য',
    guardiansSubtitle: 'সঠিক শিক্ষক খুঁজে পান মাত্র ৪টি সহজ ধাপে',
    guardiansSteps: [
      {
        icon: FileText,
        title: 'টিউশন পোস্ট করুন',
        description: 'ফ্রিতে একাউন্ট তৈরি করুন এবং ১০০টি ক্রেডিট পান। আপনার প্রয়োজনীয় টিউশনের বিস্তারিত পোস্ট করুন।',
        time: '৫ মিনিট',
        color: 'from-cyan-500 to-blue-500'
      },
      {
        icon: Users,
        title: 'শিক্ষক খুঁজুন',
        description: 'আবেদনকৃত শিক্ষকদের প্রোফাইল, যোগ্যতা, রিভিউ এবং রেটিং দেখুন। অথবা নিজে শিক্ষক সার্চ করুন।',
        time: '১৫ মিনিট',
        color: 'from-cyan-500 to-teal-500'
      },
      {
        icon: MessageSquare,
        title: 'আলোচনা করুন',
        description: 'পছন্দের শিক্ষকের সাথে সরাসরি চ্যাট করুন। সময়সূচী, বেতন এবং শর্তাবলী নিয়ে আলোচনা করুন।',
        time: '১০ মিনিট',
        color: 'from-pink-500 to-rose-500'
      },
      {
        icon: Shield,
        title: 'চুক্তি করুন',
        description: 'সবকিছু ঠিক হলে চুক্তি করুন এবং টিউশন শুরু করুন। রিভিউ ও রেটিং দিয়ে অন্যদের সাহায্য করুন।',
        time: 'চলমান',
        color: 'from-teal-500 to-emerald-500'
      }
    ],
    
    // Features
    featuresTitle: 'প্রধান বৈশিষ্ট্য',
    featuresSubtitle: 'যে সুবিধাগুলো আপনাকে এগিয়ে রাখবে',
    features: [
      {
        icon: CreditCard,
        title: 'ক্রেডিট সিস্টেম',
        description: 'শিক্ষক: ৫০ ফ্রি, অভিভাবক: ১০০ ফ্রি। আরও প্রয়োজন হলে সাশ্রয়ী মূল্যে কিনুন।',
        color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
      },
      {
        icon: Shield,
        title: 'নিরাপদ চুক্তি',
        description: 'ডিজিটাল চুক্তি সিস্টেম যা উভয় পক্ষের অধিকার সুরক্ষিত রাখে।',
        color: 'bg-gradient-to-br from-emerald-500 to-teal-500'
      },
      {
        icon: Star,
        title: 'রিভিউ ও রেটিং',
        description: 'প্রকৃত রিভিউ দেখে সঠিক শিক্ষক নির্বাচন করুন এবং বিশ্বস্ততা বাড়ান।',
        color: 'bg-gradient-to-br from-yellow-500 to-orange-500'
      },
      {
        icon: MessageSquare,
        title: 'সরাসরি মেসেজিং',
        description: 'রিয়েল-টাইম চ্যাট সিস্টেমে সরাসরি যোগাযোগ করুন, ফাইল শেয়ার করুন।',
        color: 'bg-gradient-to-br from-cyan-500 to-blue-500'
      },
      {
        icon: TrendingUp,
        title: 'ক্যারিয়ার ট্র্যাকিং',
        description: 'শিক্ষকরা তাদের পারফরম্যান্স, আয় এবং রেটিং ট্র্যাক করতে পারেন।',
        color: 'bg-gradient-to-br from-teal-500 to-emerald-500'
      },
      {
        icon: Book,
        title: 'মানবিক সহায়তা',
        description: 'অসহায় শিক্ষার্থীদের জন্য যাকাত/দান সিস্টেম এবং ফ্রি টিউশনের ব্যবস্থা।',
        color: 'bg-gradient-to-br from-rose-500 to-red-500'
      }
    ],
    
    // CTA
    ctaTitle: 'এখনই শুরু করুন',
    ctaDescription: 'আজই Talent Tutor এ যোগ দিন এবং শিক্ষার ডিজিটাল যাত্রায় অংশ নিন',
    teacherCTA: 'শিক্ষক হিসেবে যোগ দিন',
    guardianCTA: 'অভিভাবক হিসেবে যোগ দিন',
    
    // Benefits
    benefitsTitle: 'কেন Talent Tutor?',
    benefitsSubtitle: 'আমরা আপনার শিক্ষা যাত্রাকে সহজ এবং নিরাপদ করি',
    benefits: [
      { icon: Sparkles, text: 'সম্পূর্ণ বিনামূল্যে একাউন্ট তৈরি' },
      { icon: Zap, text: 'ফ্রি ক্রেডিট দিয়ে শুরু করুন' },
      { icon: Shield, text: 'স্বচ্ছ ও নিরাপদ লেনদেন' },
      { icon: Clock, text: '২৪/৭ কাস্টমার সাপোর্ট' },
      { icon: Heart, text: 'মোবাইল অ্যাপ সুবিধা' },
      { icon: CheckCircle2, text: 'কোনো লুকানো খরচ নেই' }
    ],
    
    // Stats
    stats: [
      { number: '৫,০০০+', label: 'নিবন্ধিত শিক্ষক' },
      { number: '১০,০০০+', label: 'সফল টিউশন' },
      { number: '৯৮%', label: 'সন্তুষ্ট ব্যবহারকারী' },
      { number: '২৪/৭', label: 'সাপোর্ট সেবা' }
    ]
  },
  en: {
    title: 'How It Works',
    subtitle: 'Simple 4-step process for teachers and guardians on Talent Tutor platform',
    
    // For Teachers
    teachersTitle: 'For Teachers',
    teachersSubtitle: 'Start your tuition career in just 4 easy steps',
    teachersSteps: [
      {
        icon: UserCheck,
        title: 'Create Account',
        description: 'Create a free teacher account and get 50 free credits. Add your educational qualifications, experience, and subjects.',
        time: '5 minutes',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        icon: Search,
        title: 'Find Tuitions',
        description: 'Browse tuition posts according to your preferred area, subject, and schedule. Use filters to find the right tuition.',
        time: '10 minutes',
        color: 'from-cyan-500 to-blue-500'
      },
      {
        icon: MessageSquare,
        title: 'Apply',
        description: 'Apply to tuitions by spending 10 credits. Guardians will see your profile and can message you directly.',
        time: '2 minutes',
        color: 'from-orange-500 to-red-500'
      },
      {
        icon: Award,
        title: 'Start Teaching',
        description: 'Sign agreement when guardian agrees and start teaching. Receive payment directly to mobile banking/bank.',
        time: 'Ongoing',
        color: 'from-emerald-500 to-teal-500'
      }
    ],
    
    // For Guardians
    guardiansTitle: 'For Guardians',
    guardiansSubtitle: 'Find the right teacher in just 4 easy steps',
    guardiansSteps: [
      {
        icon: FileText,
        title: 'Post Tuition',
        description: 'Create a free account and get 100 credits. Post detailed requirements for your needed tuition.',
        time: '5 minutes',
        color: 'from-cyan-500 to-blue-500'
      },
      {
        icon: Users,
        title: 'Find Teachers',
        description: 'View profiles, qualifications, reviews, and ratings of applied teachers. Or search for teachers yourself.',
        time: '15 minutes',
        color: 'from-blue-500 to-cyan-500'
      },
      {
        icon: MessageSquare,
        title: 'Discuss',
        description: 'Chat directly with preferred teachers. Discuss schedule, salary, and terms.',
        time: '10 minutes',
        color: 'from-pink-500 to-rose-500'
      },
      {
        icon: Shield,
        title: 'Sign Agreement',
        description: 'Sign agreement when everything is settled and start tuition. Help others with reviews and ratings.',
        time: 'Ongoing',
        color: 'from-teal-500 to-emerald-500'
      }
    ],
    
    // Features
    featuresTitle: 'Key Features',
    featuresSubtitle: 'Features that keep you ahead',
    features: [
      {
        icon: CreditCard,
        title: 'Credit System',
        description: 'Teachers: 50 free, Guardians: 100 free. Buy more at affordable prices when needed.',
        color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
      },
      {
        icon: Shield,
        title: 'Secure Agreements',
        description: 'Digital agreement system that protects rights of both parties.',
        color: 'bg-gradient-to-br from-emerald-500 to-teal-500'
      },
      {
        icon: Star,
        title: 'Reviews & Ratings',
        description: 'Select the right teacher by viewing genuine reviews and increase trustworthiness.',
        color: 'bg-gradient-to-br from-yellow-500 to-orange-500'
      },
      {
        icon: MessageSquare,
        title: 'Direct Messaging',
        description: 'Communicate directly in real-time chat system, share files.',
        color: 'bg-gradient-to-br from-cyan-500 to-blue-500'
      },
      {
        icon: TrendingUp,
        title: 'Career Tracking',
        description: 'Teachers can track their performance, earnings, and ratings.',
        color: 'bg-gradient-to-br from-blue-500 to-cyan-500'
      },
      {
        icon: Book,
        title: 'Humanitarian Support',
        description: 'Zakat/donation system and free tuition arrangements for underprivileged students.',
        color: 'bg-gradient-to-br from-rose-500 to-red-500'
      }
    ],
    
    // CTA
    ctaTitle: 'Get Started Now',
    ctaDescription: 'Join Talent Tutor today and be part of the digital education journey',
    teacherCTA: 'Join as Teacher',
    guardianCTA: 'Join as Guardian',
    
    // Benefits
    benefitsTitle: 'Why Talent Tutor?',
    benefitsSubtitle: 'We make your education journey easy and secure',
    benefits: [
      { icon: Sparkles, text: 'Completely free account creation' },
      { icon: Zap, text: 'Start with free credits' },
      { icon: Shield, text: 'Transparent and secure transactions' },
      { icon: Clock, text: '24/7 customer support' },
      { icon: Heart, text: 'Mobile app facility' },
      { icon: CheckCircle2, text: 'No hidden costs' }
    ],
    
    // Stats
    stats: [
      { number: '5,000+', label: 'Registered Teachers' },
      { number: '10,000+', label: 'Successful Tuitions' },
      { number: '98%', label: 'Satisfied Users' },
      { number: '24/7', label: 'Support Service' }
    ]
  }
};

export function HowItWorksPage({ language, setLanguage, setPage, onLogin }: HowItWorksPageProps) {
  const t = content[language];
  const [hoveredStep, setHoveredStep] = useState<number | null>(null);

  const handleGetStarted = (type: 'teacher' | 'guardian') => {
    if (onLogin) {
      onLogin(type);
    } else {
      setPage('home');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-blue-50">
      <Header language={language} setLanguage={setLanguage} setPage={setPage} onLogin={onLogin} />
      
      {/* Hero Section with Animated Background */}
      <section className="relative pt-24 pb-16 section-padding overflow-hidden">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200/30 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-teal-200/30 rounded-full blur-3xl animate-pulse delay-700" />
          <div className="absolute top-40 right-1/4 w-64 h-64 bg-cyan-200/30 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-500/10 to-teal-500/10 rounded-full border border-emerald-500/20 mb-6">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700">প্ল্যাটফর্ম গাইড</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl mb-6 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 bg-clip-text text-transparent">
              {t.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              {t.subtitle}
            </p>
          </motion.div>

          {/* Stats Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-16 max-w-5xl mx-auto"
          >
            {t.stats.map((stat, index) => (
              <motion.div
                key={index}
                whileHover={{ scale: 1.05 }}
                className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 shadow-lg border border-gray-100"
              >
                <div className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">
                  {stat.number}
                </div>
                <div className="text-gray-600">{stat.label}</div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* For Teachers Section */}
      <section className="section-padding bg-white relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-blue-500 via-cyan-500 to-teal-500" />
        
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 rounded-full border border-blue-200 mb-4">
              <UserCheck className="w-5 h-5 text-blue-600" />
              <span className="text-blue-700">শিক্ষকদের জন্য</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
              {t.teachersTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.teachersSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.teachersSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredStep(index)}
                  onHoverEnd={() => setHoveredStep(null)}
                  className="relative"
                >
                  <Card className="p-8 h-full hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-transparent relative overflow-hidden group bg-white">
                    {/* Animated Gradient Border */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                    <div className="absolute inset-0.5 bg-white rounded-lg -z-10" />
                    
                    {/* Top Accent Line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`} />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-bold text-gray-700">{index + 1}</span>
                    </div>

                    <div className="mb-6">
                      <motion.div
                        animate={{
                          rotate: hoveredStep === index ? [0, -10, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-all`}
                      >
                        <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                      </motion.div>
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-full mb-4 border border-blue-100">
                        <Clock className="w-4 h-4 text-blue-600" />
                        <span className="text-blue-700">{step.time}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Progress Arrow */}
                    {index < t.teachersSteps.length - 1 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                        <ArrowRight className="w-8 h-8 text-gray-300 group-hover:text-teal-500 transition-colors" />
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* CTA for Teachers */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => handleGetStarted('teacher')}
              size="lg"
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-12 py-6 text-xl shadow-lg hover:shadow-xl transition-all"
            >
              <UserCheck className="mr-2 w-6 h-6" />
              শিক্ষক হিসেবে শুরু করুন
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* For Guardians Section */}
      <section className="section-padding bg-gradient-to-br from-teal-50 via-emerald-50 to-cyan-50 relative overflow-hidden">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-cyan-500 via-teal-500 to-emerald-500" />
        
        <div className="container mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-full border border-emerald-200 mb-4">
              <Users className="w-5 h-5 text-emerald-600" />
              <span className="text-emerald-700">অভিভাবকদের জন্য</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
              {t.guardiansTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.guardiansSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {t.guardiansSteps.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onHoverStart={() => setHoveredStep(index + 10)}
                  onHoverEnd={() => setHoveredStep(null)}
                  className="relative"
                >
                  <Card className="p-8 h-full hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-transparent relative overflow-hidden group bg-white">
                    {/* Animated Gradient Border */}
                    <div className={`absolute inset-0 bg-gradient-to-r ${step.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10`} />
                    <div className="absolute inset-0.5 bg-white rounded-lg -z-10" />
                    
                    {/* Top Accent Line */}
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${step.color}`} />
                    
                    {/* Step Number Badge */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                      <span className="text-2xl font-bold text-emerald-700">{index + 1}</span>
                    </div>

                    <div className="mb-6">
                      <motion.div
                        animate={{
                          rotate: hoveredStep === index + 10 ? [0, -10, 10, -10, 0] : 0,
                        }}
                        transition={{ duration: 0.5 }}
                        className={`w-20 h-20 bg-gradient-to-br ${step.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl transition-all`}
                      >
                        <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                      </motion.div>
                      
                      <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-full mb-4 border border-emerald-100">
                        <Clock className="w-4 h-4 text-emerald-600" />
                        <span className="text-emerald-700">{step.time}</span>
                      </div>
                    </div>

                    <h3 className="text-2xl mb-4 text-gray-900 group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text group-hover:from-gray-900 group-hover:to-gray-600">
                      {step.title}
                    </h3>
                    <p className="text-lg text-gray-600 mb-6 leading-relaxed">
                      {step.description}
                    </p>

                    {/* Progress Arrow */}
                    {index < t.guardiansSteps.length - 1 && (
                      <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                        <ArrowRight className="w-8 h-8 text-gray-300 group-hover:text-emerald-500 transition-colors" />
                      </div>
                    )}
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* CTA for Guardians */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mt-12"
          >
            <Button
              onClick={() => handleGetStarted('guardian')}
              size="lg"
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white px-12 py-6 text-xl shadow-lg hover:shadow-xl transition-all"
            >
              <Users className="mr-2 w-6 h-6" />
              অভিভাবক হিসেবে শুরু করুন
              <ArrowRight className="ml-2 w-6 h-6" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Features Section with Modern Cards */}
      <section className="section-padding bg-white relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5" />
        
        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-50 to-pink-50 rounded-full border border-purple-200 mb-4">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <span className="text-purple-700">প্রধান সুবিধা</span>
            </div>
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-4 text-gray-900">
              {t.featuresTitle}
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              {t.featuresSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {t.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="p-8 h-full hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-transparent group relative overflow-hidden bg-white">
                    {/* Background Gradient on Hover */}
                    <div className="absolute inset-0 bg-gradient-to-br from-gray-50 to-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    <div className="relative z-10">
                      <div className={`w-20 h-20 ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:shadow-2xl group-hover:scale-110 transition-all duration-300`}>
                        <Icon className="w-10 h-10 text-white" strokeWidth={2} />
                      </div>
                      
                      <h3 className="text-2xl mb-4 text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="text-lg text-gray-600 leading-relaxed">
                        {feature.description}
                      </p>
                    </div>

                    {/* Corner Decoration */}
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-tl from-gray-100 to-transparent opacity-0 group-hover:opacity-50 transition-opacity duration-300 rounded-tl-full" />
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section with Icons */}
      <section className="section-padding bg-gradient-to-br from-gray-900 via-slate-800 to-gray-900 text-white relative overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl animate-pulse delay-700" />
        </div>

        <div className="container mx-auto relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
              {t.benefitsTitle}
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              {t.benefitsSubtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {t.benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  whileHover={{ scale: 1.05 }}
                  className="flex items-center gap-4 bg-white/10 backdrop-blur-md p-6 rounded-2xl hover:bg-white/20 transition-all border border-white/10 hover:border-white/20 group"
                >
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg group-hover:shadow-emerald-500/50 transition-all">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-lg">{benefit.text}</span>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Premium CTA Section */}
      <section className="section-padding bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white relative overflow-hidden">
        {/* Animated Circles */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-white/10 rounded-full blur-3xl animate-pulse delay-1000" />
        </div>

        <div className="container mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 backdrop-blur-sm rounded-full border border-white/30 mb-6">
              <Sparkles className="w-5 h-5" />
              <span>আজই যোগ দিন</span>
            </div>

            <h2 className="text-3xl md:text-4xl lg:text-5xl mb-6">
              {t.ctaTitle}
            </h2>
            <p className="text-xl md:text-2xl mb-12 max-w-3xl mx-auto opacity-90">
              {t.ctaDescription}
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => handleGetStarted('teacher')}
                  size="lg"
                  className="bg-white text-teal-700 hover:bg-gray-100 px-12 py-7 text-xl shadow-2xl hover:shadow-3xl transition-all"
                >
                  <UserCheck className="mr-2 w-6 h-6" />
                  {t.teacherCTA}
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  onClick={() => handleGetStarted('guardian')}
                  size="lg"
                  variant="outline"
                  className="border-2 border-white text-white hover:bg-white/10 backdrop-blur-sm px-12 py-7 text-xl shadow-2xl hover:shadow-3xl transition-all"
                >
                  <Users className="mr-2 w-6 h-6" />
                  {t.guardianCTA}
                  <ArrowRight className="ml-2 w-6 h-6" />
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
