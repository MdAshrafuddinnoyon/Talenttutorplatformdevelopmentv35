import { Shield, Users, Clock, Wallet, Star, BookOpen, Heart, Zap, CheckCircle, TrendingUp, Globe, Lock } from 'lucide-react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';

interface BenefitsSectionProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    badge: 'কেন আমরা?',
    title: 'কেন Talent Tutor বেছে নেবেন?',
    subtitle: 'আমরা শিক্ষার্থী, অভিভাবক এবং শিক্ষকদের জন্য সর্বোত্তম সেবা প্রদান করি',
    benefits: [
      {
        icon: Shield,
        title: 'সম্পূর্ণ যাচাইকৃত শিক্ষক',
        description: 'সকল শিক্ষক জাতীয় পরিচয়পত্র (NID), শিক্ষাগত সনদপত্র এবং অভিজ্ঞতার সার্টিফিকেট দ্বারা যাচাইকৃত। আপনার সন্তানের নিরাপত্তা আমাদের প্রথম অগ্রাধিকার।',
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
      },
      {
        icon: Zap,
        title: 'দ্রুত ম্যাচিং',
        description: '২৪ ঘন্টার মধ্যে AI-powered সিস্টেম আপনার জন্য সবচেয়ে উপযুক্ত শিক্ষক খুঁজে দেবে।',
        color: 'from-yellow-500 to-orange-600',
        bgColor: 'bg-yellow-50',
        iconColor: 'text-yellow-600',
      },
      {
        icon: Users,
        title: 'বিশাল নেটওয়ার্ক',
        description: '৫০০০+ যোগ্য শিক্ষক, ১০,০০০+ শিক্ষার্থী এবং ২০০+ বিষয় - প্রাথমিক থেকে ইঞ্জিনিয়ারিং, মেডিকেল, কুরআন শিক্ষা সহ সব কিছু।',
        color: 'from-teal-500 to-teal-600',
        bgColor: 'bg-teal-50',
        iconColor: 'text-teal-600',
      },
      {
        icon: Wallet,
        title: 'স্বচ্ছ মূল্য নির্ধারণ',
        description: 'কোনো লুকানো খরচ নেই। স্বচ্ছ মূল্য এবং সহজ পেমেন্ট সিস্টেম - bKash, Nagad, Rocket সাপোর্ট।',
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
      },
      {
        icon: Star,
        title: 'রেটিং ও রিভিউ',
        description: 'প্রকৃত অভিভাবকদের রিভিউ এবং রেটিং দেখে সিদ্ধান্ত নিন। গড় রেটিং ৪.৮/৫.০।',
        color: 'from-yellow-400 to-yellow-600',
        bgColor: 'bg-yellow-50',
        iconColor: 'text-yellow-600',
      },
      {
        icon: BookOpen,
        title: 'ডিজিটাল লাইব্রেরি',
        description: 'বিনামূল্যে ২,৫০০+ বই, নোট এবং প্র্যাকটিস পেপার। পরিবেশ শিক্ষা মডিউল সম্পূর্ণ ফ্রি।',
        color: 'from-teal-500 to-cyan-600',
        bgColor: 'bg-teal-50',
        iconColor: 'text-teal-600',
      },
      {
        icon: Heart,
        title: 'দান ও সাহায্য',
        description: 'অসহায় শিক্ষার্থীদের সাহায্য করুন। স্বচ্ছ দান ব্যবস্থা - প্রতিটি টাকার হিসাব জানুন।',
        color: 'from-red-500 to-pink-600',
        bgColor: 'bg-red-50',
        iconColor: 'text-red-600',
      },
      {
        icon: Lock,
        title: 'নিরাপদ পেমেন্ট',
        description: 'SSL এনক্রিপ্টেড পেমেন্ট সিস্টেম। আপনার অর্থ এবং তথ্য সম্পূর্ণ সুরক্ষিত।',
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
      },
      {
        icon: TrendingUp,
        title: 'প্রমাণিত সাফল্য',
        description: '৩৫,০০০+ সফল টিউশন সম্পন্ন। ৯৮% অভিভাবক এবং শিক্ষক সন্তুষ্ট।',
        color: 'from-emerald-500 to-green-600',
        bgColor: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
      },
      {
        icon: Globe,
        title: 'যেকোনো জায়গা থেকে',
        description: 'মোবাইল অ্যাপ এবং ওয়েবসাইট - যেকোনো জায়গা থেকে, যেকোনো সময় ব্যবহার করুন।',
        color: 'from-cyan-500 to-blue-600',
        bgColor: 'bg-cyan-50',
        iconColor: 'text-cyan-600',
      },
      {
        icon: CheckCircle,
        title: '২৪/৭ সাপোর্ট',
        description: 'যেকোনো সমস্যায় আমাদের সাপোর্ট টিম ২৪/৭ আপনার সাথে আছে। লাইভ চ্যাট এবং ফোন সাপোর্ট।',
        color: 'from-green-500 to-teal-600',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
      },
      {
        icon: Clock,
        title: 'সময় বাঁচান',
        description: 'ঘরে বসে শিক্ষক খুঁজুন। শত শত প্রোফাইল ব্রাউজ করুন মিনিটের মধ্যে।',
        color: 'from-orange-500 to-red-600',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600',
      },
    ],
  },
  en: {
    badge: 'Why Us?',
    title: 'Why Choose Talent Tutor?',
    subtitle: 'We provide the best service for students, parents, and teachers',
    benefits: [
      {
        icon: Shield,
        title: 'Fully Verified Teachers',
        description: 'All teachers are verified with National ID (NID), educational certificates and experience credentials. Your child\'s safety is our first priority.',
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
      },
      {
        icon: Zap,
        title: 'Quick Matching',
        description: 'AI-powered system finds the most suitable teacher for you within 24 hours.',
        color: 'from-yellow-500 to-orange-600',
        bgColor: 'bg-yellow-50',
        iconColor: 'text-yellow-600',
      },
      {
        icon: Users,
        title: 'Large Network',
        description: '5000+ qualified teachers, 10,000+ students and 200+ subjects - Primary to Engineering, Medical, Quran, everything.',
        color: 'from-teal-500 to-teal-600',
        bgColor: 'bg-teal-50',
        iconColor: 'text-purple-600',
      },
      {
        icon: Wallet,
        title: 'Transparent Pricing',
        description: 'No hidden costs. Transparent pricing and easy payment system - bKash, Nagad, Rocket support.',
        color: 'from-green-500 to-emerald-600',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
      },
      {
        icon: Star,
        title: 'Ratings & Reviews',
        description: 'See real reviews and ratings from parents. Average rating 4.8/5.0.',
        color: 'from-yellow-400 to-yellow-600',
        bgColor: 'bg-yellow-50',
        iconColor: 'text-yellow-600',
      },
      {
        icon: BookOpen,
        title: 'Digital Library',
        description: 'Free 2,500+ books, notes and practice papers. Eco-education module completely free.',
        color: 'from-teal-500 to-cyan-600',
        bgColor: 'bg-teal-50',
        iconColor: 'text-teal-600',
      },
      {
        icon: Heart,
        title: 'Donation & Help',
        description: 'Help underprivileged students. Transparent donation system - track every penny.',
        color: 'from-red-500 to-pink-600',
        bgColor: 'bg-red-50',
        iconColor: 'text-red-600',
      },
      {
        icon: Lock,
        title: 'Secure Payment',
        description: 'SSL encrypted payment system. Your money and information completely secure.',
        color: 'from-blue-500 to-blue-600',
        bgColor: 'bg-blue-50',
        iconColor: 'text-blue-600',
      },
      {
        icon: TrendingUp,
        title: 'Proven Success',
        description: '35,000+ successful tuitions completed. 98% parents and teachers satisfied.',
        color: 'from-emerald-500 to-green-600',
        bgColor: 'bg-emerald-50',
        iconColor: 'text-emerald-600',
      },
      {
        icon: Globe,
        title: 'From Anywhere',
        description: 'Mobile app and website - use from anywhere, anytime.',
        color: 'from-cyan-500 to-blue-600',
        bgColor: 'bg-cyan-50',
        iconColor: 'text-cyan-600',
      },
      {
        icon: CheckCircle,
        title: '24/7 Support',
        description: 'Our support team is with you 24/7 for any problem. Live chat and phone support.',
        color: 'from-green-500 to-teal-600',
        bgColor: 'bg-green-50',
        iconColor: 'text-green-600',
      },
      {
        icon: Clock,
        title: 'Save Time',
        description: 'Find teachers from home. Browse hundreds of profiles in minutes.',
        color: 'from-orange-500 to-red-600',
        bgColor: 'bg-orange-50',
        iconColor: 'text-orange-600',
      },
    ],
  },
};

export function BenefitsSection({ language }: BenefitsSectionProps) {
  const t = content[language];

  return (
    <section className="py-10 sm:py-14 lg:py-20 bg-gradient-to-b from-white via-emerald-50/30 to-white overflow-hidden relative">
      {/* Enhanced Background decoration */}
      <div className="absolute inset-0 opacity-20 pointer-events-none">
        <div className="absolute top-20 left-10 w-96 h-96 bg-gradient-to-br from-emerald-400 via-teal-400 to-cyan-400 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-20 right-10 w-[500px] h-[500px] bg-gradient-to-br from-blue-400 via-cyan-400 to-teal-400 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-gradient-to-br from-purple-300 via-pink-300 to-rose-300 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '4s' }} />
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <Badge className={`mb-4 px-4 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200 shadow-md text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            <Zap className="w-3.5 h-3.5 mr-1.5" />
            {t.badge}
          </Badge>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-gray-900 mb-3 sm:mb-4 bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-sm sm:text-base md:text-lg text-gray-600 max-w-3xl mx-auto ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 sm:gap-4 lg:gap-5">
          {t.benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.05 }}
              >
                <Card
                  className="group relative p-6 h-full hover:shadow-2xl transition-all duration-500 border border-gray-200/50 hover:border-emerald-300/50 cursor-pointer bg-white/80 backdrop-blur-sm hover:-translate-y-2 overflow-hidden"
                >
                  {/* Gradient overlay on hover */}
                  <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/0 via-teal-50/0 to-cyan-50/0 group-hover:from-emerald-50/50 group-hover:via-teal-50/30 group-hover:to-cyan-50/50 transition-all duration-500 -z-10"></div>
                  
                  <div className={`w-16 h-16 bg-gradient-to-br ${benefit.color} rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 group-hover:rotate-12 transition-all duration-500 shadow-lg group-hover:shadow-2xl`}>
                    <Icon className="w-8 h-8 text-white drop-shadow-lg" />
                  </div>
                  <h3 className={`text-xl text-gray-900 mb-3 group-hover:text-emerald-700 transition-colors duration-300 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {benefit.title}
                  </h3>
                  <p className={`text-gray-600 leading-relaxed group-hover:text-gray-700 transition-colors duration-300 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {benefit.description}
                  </p>
                  
                  {/* Corner decoration */}
                  <div className="absolute top-0 right-0 w-20 h-20 bg-gradient-to-br from-emerald-200/0 to-transparent group-hover:from-emerald-200/20 rounded-bl-full transition-all duration-500"></div>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-20 text-center"
        >
          <div className="inline-block bg-gradient-to-r from-emerald-50 via-teal-50 to-emerald-50 rounded-3xl p-10 max-w-3xl border-2 border-emerald-100 shadow-xl">
            <div className="mb-6 flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center shadow-lg">
                <Zap className="w-8 h-8 text-white" />
              </div>
            </div>
            <h3 className={`text-3xl text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {language === 'bn' ? 'এখনই শুরু করুন' : 'Get Started Now'}
            </h3>
            <p className={`text-gray-600 mb-8 text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {language === 'bn' 
                ? 'আজই যুক্ত হয়ে অভিজ্ঞতা নিন বাংলাদেশের সেরা টিউশন প্ল্যাটফর্মের'
                : 'Join today and experience Bangladesh\'s best tuition platform'
              }
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <span className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className={`text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {language === 'bn' ? 'বিনামূল্যে রেজিস্ট্রেশন' : 'Free Registration'}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">
                  {language === 'bn' ? 'কোনো লুকানো খরচ নেই' : 'No Hidden Costs'}
                </span>
              </span>
              <span className="inline-flex items-center gap-2 px-5 py-3 bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow">
                <CheckCircle className="w-5 h-5 text-green-600" />
                <span className="text-gray-700">
                  {language === 'bn' ? 'যেকোনো সময় বাতিল করুন' : 'Cancel Anytime'}
                </span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
