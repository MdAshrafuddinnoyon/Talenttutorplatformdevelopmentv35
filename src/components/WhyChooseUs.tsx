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
    <section className="py-10 sm:py-14 lg:py-20 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-gradient-to-br from-emerald-400 to-teal-400 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-10 w-96 h-96 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-3xl" />
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
          <Badge className={`mb-6 px-6 py-2 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200 shadow-md ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            <Sparkles className="w-4 h-4 mr-2" />
            {t.badge}
          </Badge>
          <h2 className={`text-4xl md:text-5xl lg:text-6xl text-gray-900 mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-xl text-gray-600 max-w-3xl mx-auto ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Feature 1 */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <Card className="group p-8 bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">👨‍🏫</span>
              </div>
              <h3 className={`text-2xl text-white mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.feature1Title}</h3>
              <ul className="space-y-3 mb-8">
                {t.feature1Points.map((point, index) => (
                  <motion.li 
                    key={point}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-200 flex-shrink-0 mt-0.5" />
                    <span className={`text-emerald-50 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{point}</span>
                  </motion.li>
                ))}
              </ul>
              <Button 
                className={`w-full bg-white text-emerald-700 hover:bg-emerald-50 hover:shadow-lg transition-all ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                onClick={() => setPage && setPage('login')}
              >
                {t.learnMore}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          </motion.div>

          {/* Feature 2 */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <Card className="group p-8 bg-gradient-to-br from-emerald-600 to-teal-600 text-white border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">👨‍👩‍👧‍👦</span>
              </div>
              <h3 className={`text-2xl text-white mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.feature2Title}</h3>
              <ul className="space-y-3 mb-8">
                {t.feature2Points.map((point, index) => (
                  <motion.li 
                    key={point}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-emerald-200 flex-shrink-0 mt-0.5" />
                    <span className={`text-emerald-50 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{point}</span>
                  </motion.li>
                ))}
              </ul>
              <Button 
                className="w-full bg-white text-purple-700 hover:bg-purple-50 hover:shadow-lg transition-all"
                onClick={() => setPage && setPage('login')}
              >
                {t.learnMore}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          </motion.div>

          {/* Feature 3 */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            <Card className="group p-8 bg-gradient-to-br from-red-500 to-orange-600 text-white border-0 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 h-full">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <span className="text-3xl">❤️</span>
              </div>
              <h3 className={`text-2xl text-white mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.feature3Title}</h3>
              <ul className="space-y-3 mb-8">
                {t.feature3Points.map((point, index) => (
                  <motion.li 
                    key={point}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: index * 0.1 }}
                    className="flex items-start gap-3"
                  >
                    <CheckCircle className="w-5 h-5 text-red-200 flex-shrink-0 mt-0.5" />
                    <span className={`text-red-50 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{point}</span>
                  </motion.li>
                ))}
              </ul>
              <Button 
                className="w-full bg-white text-red-700 hover:bg-red-50 hover:shadow-lg transition-all"
                onClick={() => setPage && setPage('donation')}
              >
                {t.learnMore}
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
