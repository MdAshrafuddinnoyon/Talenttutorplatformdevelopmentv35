import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import { motion } from 'motion/react';

interface WhyChooseUsProps {
  language: 'bn' | 'en';
  setPage?: (page: string) => void;
}

const content = {
  bn: {
    badge: 'কেন Talent Tutor?',
    title: 'আমরা শুধু টিউশন প্ল্যাটফর্ম নই',
    subtitle: 'আমরা একটি সম্পূর্ণ শিক্ষা ও সামাজিক উদ্যোগ',
    feature1Title: 'শিক্ষকদের জন্য',
    feature1Points: [
      'বিনামূল্যে প্রোফাইল তৈরি করুন',
      '৫০ ফ্রি ক্রেডিট দিয়ে শুরু করুন',
      'AI-powered job matching',
      'অনলাইন পেমেন্ট সিস্টেম',
      'প্রোফাইল যাচাইকরণ ব্যাজ',
      'নিয়মিত টিউশনের সুযোগ',
    ],
    feature2Title: 'অভিভাবকদের জন্য',
    feature2Points: [
      '১০০ ফ্রি ক্রেডিট পাবেন',
      'যাচাইকৃত শিক্ষক প্রোফাইল',
      'রেটিং ও রিভিউ দেখুন',
      'সরাসরি মেসেজিং',
      'নিরাপদ পেমেন্ট',
      'মানি-ব্যাক গ্যারান্টি',
    ],
    feature3Title: 'সামাজিক দায়বদ্ধতা',
    feature3Points: [
      'অসহায় শিক্ষার্থীদের সাহায্য',
      'স্বচ্ছ দান ব্যবস্থা',
      'বিনামূল্যে বই লাইব্রেরি',
      'পরিবেশ শিক্ষা',
      'প্রবাসীদের সহযোগিতা',
      'সাফল্যের গল্প শেয়ার',
    ],
    learnMore: 'আরও জানুন',
  },
  en: {
    badge: 'Why Talent Tutor?',
    title: 'We\'re More Than Just a Tuition Platform',
    subtitle: 'We\'re a complete education and social initiative',
    feature1Title: 'For Teachers',
    feature1Points: [
      'Create free profile',
      'Start with 50 free credits',
      'AI-powered job matching',
      'Online payment system',
      'Profile verification badge',
      'Regular tuition opportunities',
    ],
    feature2Title: 'For Parents',
    feature2Points: [
      'Get 100 free credits',
      'Verified teacher profiles',
      'See ratings & reviews',
      'Direct messaging',
      'Secure payment',
      'Money-back guarantee',
    ],
    feature3Title: 'Social Responsibility',
    feature3Points: [
      'Help underprivileged students',
      'Transparent donation system',
      'Free book library',
      'Eco-education',
      'Expatriate support',
      'Share success stories',
    ],
    learnMore: 'Learn More',
  },
};

export function WhyChooseUs({ language, setPage }: WhyChooseUsProps) {
  const t = content[language];

  return (
    <section className="py-16 sm:py-20 lg:py-24 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGcmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmMmY0ZjYiIGZpbGwtb3BhY2l0eT0iMC40Ij48cGF0aCBkPSJNMzYgMzR2LTRoLTJ2NGgtNHYyaDR2NGgydi00aDR2LTJoLTR6bTAtMzBWNHgtMnY0aC00djJoNHY0aDJVMTBoNHVLTJoLTR6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-40"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 relative z-10">
        {/* Section Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16"
        >
          <Badge className={`mb-6 px-4 py-1.5 bg-emerald-50 text-emerald-700 border border-emerald-200 rounded-full text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            <Sparkles className="w-3.5 h-3.5 mr-2 fill-emerald-500 text-emerald-500" />
            {t.badge}
          </Badge>
          <h2 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-slate-900 mb-6 tracking-tight ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feature 1 - Teachers (Emerald) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <Card className="group p-8 bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-0 hover:shadow-2xl hover:shadow-emerald-200/50 transition-all duration-300 hover:-translate-y-2 h-full rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-700"></div>
              
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner border border-white/20">
                <span className="text-2xl">👨‍🏫</span>
              </div>
              <h3 className={`text-2xl font-bold text-white mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.feature1Title}</h3>
              <ul className="space-y-4 mb-8">
                {t.feature1Points.map((point, index) => (
                  <motion.li 
                    key={point}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-200 flex-shrink-0 mt-0.5" />
                    <span className={`text-emerald-50 font-medium ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{point}</span>
                  </motion.li>
                ))}
              </ul>
              <Button 
                className={`w-full bg-white text-emerald-700 hover:bg-emerald-50 hover:shadow-lg transition-all rounded-xl h-12 font-semibold mt-auto ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                onClick={() => setPage && setPage('login')}
              >
                {t.learnMore}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </motion.div>

          {/* Feature 2 - Parents (Violet/Indigo) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <Card className="group p-8 bg-gradient-to-br from-violet-600 to-indigo-600 text-white border-0 hover:shadow-2xl hover:shadow-indigo-200/50 transition-all duration-300 hover:-translate-y-2 h-full rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-700"></div>

              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner border border-white/20">
                <span className="text-2xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className={`text-2xl font-bold text-white mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.feature2Title}</h3>
              <ul className="space-y-4 mb-8">
                {t.feature2Points.map((point, index) => (
                  <motion.li 
                    key={point}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-violet-200 flex-shrink-0 mt-0.5" />
                    <span className={`text-violet-50 font-medium ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{point}</span>
                  </motion.li>
                ))}
              </ul>
              <Button 
                className={`w-full bg-white text-violet-700 hover:bg-violet-50 hover:shadow-lg transition-all rounded-xl h-12 font-semibold mt-auto ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                onClick={() => setPage && setPage('login')}
              >
                {t.learnMore}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </motion.div>

          {/* Feature 3 - Social (Rose/Orange) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="group p-8 bg-gradient-to-br from-rose-500 to-orange-600 text-white border-0 hover:shadow-2xl hover:shadow-orange-200/50 transition-all duration-300 hover:-translate-y-2 h-full rounded-3xl overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full blur-3xl -mr-20 -mt-20 transition-transform group-hover:scale-150 duration-700"></div>

              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-8 group-hover:scale-110 transition-transform shadow-inner border border-white/20">
                <span className="text-2xl">❤️</span>
              </div>
              <h3 className={`text-2xl font-bold text-white mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.feature3Title}</h3>
              <ul className="space-y-4 mb-8">
                {t.feature3Points.map((point, index) => (
                  <motion.li 
                    key={point}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-rose-200 flex-shrink-0 mt-0.5" />
                    <span className={`text-rose-50 font-medium ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{point}</span>
                  </motion.li>
                ))}
              </ul>
              <Button 
                className={`w-full bg-white text-rose-600 hover:bg-rose-50 hover:shadow-lg transition-all rounded-xl h-12 font-semibold mt-auto ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                onClick={() => setPage && setPage('donation')}
              >
                {t.learnMore}
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}