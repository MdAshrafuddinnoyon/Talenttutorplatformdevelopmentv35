import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { ArrowLeft, Mail, Phone, MapPin, Target, Eye, Heart, Shield, Zap, Users as UsersIcon, CheckCircle2, LayoutDashboard, Award, TrendingUp, Star } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { motion } from 'motion/react';

interface AboutPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'আমাদের সম্পর্কে',
    subtitle: 'বাংলাদেশের প্রথম সম্পূর্ণ ডিজিটাল টিউশন ও দান প্ল্যাটফর্ম',
    backToHome: 'হোমে ফিরুন',
    ourStory: 'আমাদের যাত্রা',
    ourMission: 'আমাদের লক্ষ্য',
    ourVision: 'আমাদের স্বপ্ন',
    ourTeam: 'আমাদের টিম',
    ourValues: 'আমাদের মূল্যবোধ',
    developedBy: 'ডেভেলপার কোম্পানি',
    achievements: 'আমাদের অর্জন',
  },
  en: {
    title: 'About Us',
    subtitle: 'Bangladesh\'s first fully digital tuition and donation platform',
    backToHome: 'Back to Home',
    ourStory: 'Our Journey',
    ourMission: 'Our Mission',
    ourVision: 'Our Vision',
    ourTeam: 'Our Team',
    ourValues: 'Our Values',
    developedBy: 'Developer Company',
    achievements: 'Our Achievements',
  },
};

const teamMembers = [
  {
    name: 'Md. Ariful Islam',
    role: 'CEO & Founder',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&q=80',
    bio: 'শিক্ষা ও প্রযুক্তিতে ১০+ বছরের অভিজ্ঞতা',
    color: 'from-[#10B981] to-[#059669]',
  },
  {
    name: 'Sabina Yasmin',
    role: 'CTO',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=300&q=80',
    bio: 'সফটওয়্যার ইঞ্জিনিয়ারিং ও AI বিশেষজ্ঞ',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Karim Rahman',
    role: 'Head of Operations',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=300&q=80',
    bio: 'শিক্ষা খাতে ৮ বছরের ব্যবস্থাপনা অভিজ্ঞতা',
    color: 'from-emerald-500 to-teal-500',
  },
  {
    name: 'Fatima Khatun',
    role: 'Head of Donations',
    photo: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&q=80',
    bio: 'সামাজিক উদ্যোগ ও দা�� ব্যবস্থাপনা বিশেষজ্ঞ',
    color: 'from-rose-500 to-orange-500',
  },
];

const values = [
  {
    title: 'স্বচ্ছতা',
    description: 'প্রতিটি দান ও লেনদেনে সম্পূর্ণ স্বচ্ছতা নিশ্চিতকরণ',
    icon: Shield,
    color: 'from-[#10B981] to-[#059669]',
  },
  {
    title: 'বিশ্বস্ততা',
    description: 'যাচাইকৃত শিক্ষক এবং নিরাপদ পেমেন্ট ব্যবস্থা',
    icon: CheckCircle2,
    color: 'from-emerald-500 to-teal-500',
  },
  {
    title: 'মানবিকতা',
    description: 'অসহায় শিক্ষার্থীদের সাহায্য করা আমাদের অগ্রাধিকার',
    icon: Heart,
    color: 'from-rose-500 to-pink-500',
  },
  {
    title: 'প্রযুক্তি',
    description: 'অত্যাধুনিক প্রযুক্তির মাধ্যমে সেবা প্রদান',
    icon: Zap,
    color: 'from-[#10B981] to-[#059669]',
  },
];

const achievements = [
  { value: '৫০০০+', label: 'যাচাইকৃত শিক্ষক' },
  { value: '১০,০০০+', label: 'সক্রিয় শিক্ষার্থী' },
  { value: '৩৫,০০০+', label: 'সম্পন্ন টিউশন' },
  { value: '৩৫০+', label: 'সাহায্যপ্রাপ্ত অসহায় ছাত্র' },
];

export function AboutPage({ language, setLanguage, setPage, announcement, onLogin }: AboutPageProps) {
  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} onLogin={onLogin} />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-96 bg-gradient-to-r from-emerald-200 to-teal-200 rounded-full blur-3xl opacity-30 animate-pulse"></div>
          <div className="relative">
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="inline-block bg-gradient-to-r from-emerald-100 to-teal-100 px-6 py-3 rounded-full mb-6 shadow-lg"
            >
              <span className={`text-emerald-700 flex items-center gap-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                <Award className="w-4 h-4" />
                ২০২৩ সাল থেকে সেবারত
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
              className={`text-gray-600 text-xl max-w-3xl mx-auto leading-relaxed ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            >
              {t.subtitle}
            </motion.p>
          </div>
        </motion.div>

        {/* Our Story */}
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <h2 className={`text-gray-900 mb-8 text-center ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.ourStory}</h2>
          <Card className="p-10 max-w-5xl mx-auto bg-white/80 backdrop-blur-sm shadow-2xl border-2 border-gray-100 hover:shadow-3xl transition-all duration-500 hover:scale-[1.02]">
            <div className="prose prose-lg max-w-none">
              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2, duration: 0.6 }}
                className={`text-gray-600 mb-6 leading-relaxed text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
              >
                ২০২৩ সালে আমরা লক্ষ্য করলাম যে বাংলাদেশে যোগ্য শিক্ষক খুঁজে পাওয়া এবং অসহায় শিক্ষার্থীদের সাহায্য করা দুটিই কঠিন। প্রবাসীরা দান করতে চাইলেও জানতেন না তাদের দান সঠিক জায়গায় পৌঁছাচ্ছে কিনা।
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.4, duration: 0.6 }}
                className={`text-gray-600 mb-6 leading-relaxed text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
              >
                এই সমস্যা সমাধানের জন্য আমরা তৈরি করলাম Talent Tutor - একটি প্ল্যাটফর্ম যা একসাথে টিউশন মার্কেটপ্লেস এবং স্বচ্ছ দান ব্যবস্থা।
              </motion.p>
              <motion.p 
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.6, duration: 0.6 }}
                className={`text-gray-600 leading-relaxed text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
              >
                আজ আমরা গর্বিত যে আমরা হাজার হাজার শিক্ষক ও শিক্ষার্থীকে সংযুক্ত করতে পেরেছি এবং শত শত অসহায় ছাত্রকে সাহায্য করতে পেরেছি।
              </motion.p>
            </div>
          </Card>
        </motion.div>

        {/* Mission & Vision */}
        <div className="grid md:grid-cols-2 gap-8 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
          >
            <Card className="p-10 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 h-full">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600"
                animate={{
                  background: [
                    "linear-gradient(to bottom right, rgb(5, 150, 105), rgb(20, 184, 166))",
                    "linear-gradient(to top left, rgb(5, 150, 105), rgb(20, 184, 166))",
                    "linear-gradient(to bottom right, rgb(5, 150, 105), rgb(20, 184, 166))",
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent"></div>
              <div className="relative text-white">
                <motion.div 
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Target className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className={`text-white mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.ourMission}</h3>
                <p className={`text-emerald-50 leading-relaxed ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  প্রতিটি শিক্ষার্থীকে যোগ্য শিক্ষক এবং প্রয়োজনীয় শিক্ষা উপকরণ পৌঁছে দেওয়া। প্রযুক্তির মাধ্যমে শিক্ষা ব্যবস্থায় স্বচ্ছতা আনা এবং অসহায়দের সাহায্য করা।
                </p>
              </div>
            </Card>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            whileHover={{ scale: 1.03 }}
          >
            <Card className="p-10 relative overflow-hidden group hover:shadow-2xl transition-all duration-500 h-full">
              <motion.div 
                className="absolute inset-0 bg-gradient-to-br from-emerald-600 to-teal-600"
                animate={{
                  background: [
                    "linear-gradient(to bottom right, rgb(5, 150, 105), rgb(20, 184, 166))",
                    "linear-gradient(to top left, rgb(5, 150, 105), rgb(20, 184, 166))",
                    "linear-gradient(to bottom right, rgb(5, 150, 105), rgb(20, 184, 166))",
                  ]
                }}
                transition={{ duration: 5, repeat: Infinity }}
              />
              <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-transparent"></div>
              <div className="relative text-white">
                <motion.div 
                  className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6"
                  whileHover={{ scale: 1.2, rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Eye className="w-8 h-8 text-white" />
                </motion.div>
                <h3 className={`text-white mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.ourVision}</h3>
                <p className={`text-white/90 leading-relaxed ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  ২০৩০ সালের মধ্যে বাংলাদেশের প্রতিটি জেলায় আমাদের উপস্থিতি থাকবে এবং ১ লক্ষ শিক্ষার্থীকে সাহায্য করব। আমরা চাই প্রতিটি মেধাবী শিক্ষার্থী অর্থের অভাবে পড়াশোনা বন্ধ না করুক।
                </p>
              </div>
            </Card>
          </motion.div>
        </div>

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
            className={`text-gray-900 mb-10 text-center ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
          >
            প্ল্যাটফর্ম কীভাবে কাজ করে
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { num: '১', title: 'নিবন্ধন করুন', desc: 'শিক্ষক, অভিভাবক, ছাত্র বা দাতা হিসেবে ফ্রি রেজিস্টার করুন এবং প্রোফাইল সম্পূর্ণ করুন', color: 'from-[#10B981] to-[#059669]' },
              { num: '২', title: 'পোস্ট/আবেদন করুন', desc: 'অভিভাবকরা টিউশন পোস্ট করুন, শিক্ষকরা আবেদন করুন, ছাত্ররা সাহায্যের আবেদন করুন', color: 'from-[#10B981] to-[#059669]' },
              { num: '৩', title: 'যাচাই এবং ম্যাচিং', desc: 'আমাদের টিম যাচাই করে এবং সেরা শিক্ষক-অভিভাবক ম্যাচ করে। ছাত্রদের আবেদন অ্যাডমিন অনুমোদন করেন', color: 'from-[#10B981] to-[#059669]' },
              { num: '৪', title: 'শুরু করুন', desc: 'টিউশন শুরু করুন, চুক্তিপত্র তৈরি করুন এবং স্বচ্ছভাবে পেমেন্ট করুন', color: 'from-[#10B981] to-[#059669]' }
            ].map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-6 text-center hover:shadow-xl transition-all duration-500 group h-full relative overflow-hidden">
                  <motion.div 
                    className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity duration-500`}
                  />
                  <motion.div 
                    className={`relative w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center mx-auto mb-4 text-white text-2xl font-bold shadow-lg`}
                    whileHover={{ 
                      scale: 1.2, 
                      rotate: [0, -10, 10, -10, 0] 
                    }}
                    transition={{ 
                      scale: { duration: 0.3 },
                      rotate: { duration: 0.5 }
                    }}
                  >
                    {step.num}
                  </motion.div>
                  <h3 className={`font-semibold text-gray-900 mb-3 relative ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{step.title}</h3>
                  <p className={`text-gray-600 text-sm leading-relaxed relative ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {step.desc}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Additional Info */}
          <Card className="mt-8 p-8 bg-gradient-to-r from-emerald-50 to-teal-50 border-2 border-emerald-200">
            <h3 className="font-semibold text-lg text-gray-900 mb-4 font-[Noto_Serif_Bengali]">মানবিক উদ্যোগ (যাকাত/দান)</h3>
            <div className="grid md:grid-cols-3 gap-6 text-sm">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold font-[Noto_Serif_Bengali]">১</div>
                  <h4 className="font-medium text-gray-900 font-[Noto_Serif_Bengali]">ছাত্র আবেদন</h4>
                </div>
                <p className="text-gray-600 pl-10 font-[Noto_Serif_Bengali]">অসহায় ছাত্র তাদের প্রয়োজনের বিবরণ দিয়ে আবেদন করে</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold font-[Noto_Serif_Bengali]">২</div>
                  <h4 className="font-medium text-gray-900 font-[Noto_Serif_Bengali]">অ্যাডমিন যাচাই</h4>
                </div>
                <p className="text-gray-600 pl-10 font-[Noto_Serif_Bengali]">অ্যাডমিন ডকুমেন্ট যাচাই করে অনুমোদন দেন</p>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center text-white font-bold font-[Noto_Serif_Bengali]">৩</div>
                  <h4 className="font-medium text-gray-900 font-[Noto_Serif_Bengali]">দাতা সাহায্য</h4>
                </div>
                <p className="text-gray-600 pl-10 font-[Noto_Serif_Bengali]">দাতারা ছাত্রদের প্রোফাইল দেখে দান করেন</p>
              </div>
            </div>
          </Card>
        </motion.div>

        {/* Achievements */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-20"
        >
          <motion.h2 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className={`text-gray-900 mb-10 text-center ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
          >
            {t.achievements}
          </motion.h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {achievements.map((achievement, index) => (
              <motion.div
                key={achievement.label}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
                whileHover={{ scale: 1.05, y: -10 }}
              >
                <Card className="p-8 text-center bg-white hover:shadow-2xl transition-all duration-300 border-2 border-gray-100 hover:border-emerald-200 group relative overflow-hidden">
                  {/* Animated background */}
                  <motion.div 
                    className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                    animate={{ 
                      background: [
                        "linear-gradient(to bottom right, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))",
                        "linear-gradient(to top left, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))",
                        "linear-gradient(to bottom right, rgba(16, 185, 129, 0.1), rgba(20, 184, 166, 0.1))",
                      ]
                    }}
                    transition={{ duration: 3, repeat: Infinity }}
                  />
                  
                  <motion.div 
                    className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-3 relative"
                    whileHover={{ scale: 1.15 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    {achievement.value}
                  </motion.div>
                  <div className={`text-gray-600 relative ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{achievement.label}</div>
                  
                  {/* Icon decoration */}
                  <motion.div
                    className="absolute top-4 right-4 opacity-0 group-hover:opacity-100"
                    initial={{ rotate: 0 }}
                    whileHover={{ rotate: 360 }}
                    transition={{ duration: 0.6 }}
                  >
                    <TrendingUp className="w-6 h-6 text-emerald-500" />
                  </motion.div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Our Values */}
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
            {t.ourValues}
          </motion.h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.6 }}
                  whileHover={{ y: -10 }}
                >
                  <Card className="p-8 text-center hover:shadow-2xl transition-all duration-500 group border-2 border-gray-100 hover:border-transparent relative overflow-hidden h-full">
                    <motion.div 
                      className={`absolute inset-0 bg-gradient-to-br ${value.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}
                      animate={{
                        scale: [1, 1.2, 1],
                      }}
                      transition={{ duration: 4, repeat: Infinity }}
                    />
                    
                    <motion.div 
                      className={`relative w-16 h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-lg`}
                      whileHover={{ 
                        scale: 1.2, 
                        rotate: [0, -10, 10, -10, 0],
                      }}
                      transition={{ 
                        scale: { duration: 0.3 },
                        rotate: { duration: 0.5 }
                      }}
                    >
                      <Icon className="w-8 h-8 text-white" />
                    </motion.div>
                    
                    <h4 className={`text-gray-900 mb-3 relative ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{value.title}</h4>
                    <p className={`text-gray-600 text-sm relative leading-relaxed ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{value.description}</p>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Our Team */}
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
            {t.ourTeam}
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className={`text-gray-600 text-center mb-10 text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
          >
            প্রতিটি সদস্য তাদের ক্ষেত্রে অভিজ্ঞ এবং প্রতিশ্রুতিবদ্ধ
          </motion.p>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                whileHover={{ y: -10 }}
              >
                <Card className="p-8 text-center hover:shadow-2xl transition-all duration-500 group border-2 border-gray-100 hover:border-transparent relative overflow-hidden h-full">
                  {/* Animated gradient background on hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${member.color} opacity-0 group-hover:opacity-10 transition-opacity duration-500`}></div>
                  
                  {/* Decorative circles */}
                  <div className={`absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br ${member.color} rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`}></div>
                  <div className={`absolute -bottom-10 -left-10 w-32 h-32 bg-gradient-to-br ${member.color} rounded-full opacity-0 group-hover:opacity-20 blur-2xl transition-all duration-500`}></div>
                  
                  <div className="relative">
                    {/* Image with 3D effect */}
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      transition={{ type: "spring", stiffness: 300 }}
                      className="relative mb-6"
                    >
                      <div className={`absolute inset-0 bg-gradient-to-br ${member.color} rounded-full blur-xl opacity-0 group-hover:opacity-40 transition-opacity duration-500`}></div>
                      <img
                        src={member.photo}
                        alt={member.name}
                        className={`w-32 h-32 rounded-full mx-auto object-cover ring-4 ring-gray-100 group-hover:ring-8 transition-all shadow-xl relative z-10`}
                      />
                      {/* Star badge */}
                      <div className={`absolute -top-2 -right-2 w-10 h-10 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center shadow-lg transform group-hover:scale-110 transition-transform z-20`}>
                        <Star className="w-5 h-5 text-white fill-white" />
                      </div>
                    </motion.div>
                    
                    <motion.h4 
                      whileHover={{ scale: 1.05 }}
                      className={`text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                    >
                      {member.name}
                    </motion.h4>
                    <p className={`bg-gradient-to-r ${member.color} bg-clip-text text-transparent mb-4 font-semibold ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {member.role}
                    </p>
                    <p className={`text-gray-600 text-sm leading-relaxed ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{member.bio}</p>
                    
                    {/* Social icons placeholder */}
                    <div className="mt-6 flex justify-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className={`w-8 h-8 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center cursor-pointer shadow-md`}
                      >
                        <Mail className="w-4 h-4 text-white" />
                      </motion.div>
                      <motion.div 
                        whileHover={{ scale: 1.2, rotate: 360 }}
                        transition={{ duration: 0.3 }}
                        className={`w-8 h-8 bg-gradient-to-br ${member.color} rounded-full flex items-center justify-center cursor-pointer shadow-md`}
                      >
                        <Phone className="w-4 h-4 text-white" />
                      </motion.div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Developed By Section - Enhanced */}
        <Card className="p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500 rounded-full blur-3xl opacity-10"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-500 rounded-full blur-3xl opacity-10"></div>
          
          <div className="relative">
            <div className="text-center mb-10">
              <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-2 rounded-full mb-4">
                <span className={`text-white text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.developedBy}</span>
              </div>
              <h2 className={`text-white mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>Web Search BD</h2>
              <p className={`text-gray-300 text-lg mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                Software Company - Web Design & Development Agency
              </p>
              <p className={`text-emerald-400 italic text-xl ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                "Where Ideas Meet Innovation"
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1 font-[Noto_Serif_Bengali]">অফিসিয়াল নম্বর</p>
                    <a href="tel:+8801581855238" className="text-white hover:text-emerald-400 transition-colors text-lg">
                      +880 1581-855238
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1 font-[Noto_Serif_Bengali]">হটলাইন নম্বর</p>
                    <a href="tel:+8809696540730" className="text-white hover:text-emerald-400 transition-colors text-lg">
                      +880 9696-540730
                    </a>
                  </div>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-xl flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1 font-[Noto_Serif_Bengali]">ইমেইল</p>
                    <a href="mailto:info@websearchbd.com" className="text-white hover:text-emerald-400 transition-colors text-lg">
                      info@websearchbd.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start gap-4 bg-white/5 backdrop-blur-sm rounded-xl p-4 hover:bg-white/10 transition-all">
                  <div className="w-12 h-12 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-xl flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <p className="text-gray-400 text-sm mb-1 font-[Noto_Serif_Bengali]">ওয়েবসাইট</p>
                    <a href="https://www.websearchbd.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-emerald-400 transition-colors text-lg">
                      www.websearchbd.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Footer */}
      <Footer language={language} setPage={setPage} />
    </div>
  );
}
