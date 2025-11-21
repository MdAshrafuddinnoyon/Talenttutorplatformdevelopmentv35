import { Button } from './ui/button';
import { GradientButton } from './ui/gradient-button';
import { Book, Calculator, Beaker, Globe2, Code, Languages, Microscope, Music, TrendingUp, Star, ArrowRight, GraduationCap, BookOpen, Atom } from 'lucide-react';
import { motion } from 'motion/react';
import { getPopularSubjects } from '../utils/subjectsData';

interface PopularSubjectsProps {
  language: 'bn' | 'en';
  setPage?: (page: string) => void;
}

// Icon mapping for subjects
const iconMap: { [key: string]: any } = {
  Calculator,
  Book,
  BookOpen,
  Beaker,
  Globe2,
  Code,
  Languages,
  Microscope,
  Music,
  GraduationCap,
  Atom,
};

// Color schemes for different subject types
const colorSchemes = [
  { color: 'from-blue-500 to-blue-600', bgColor: 'bg-blue-50', textColor: 'text-blue-700' },
  { color: 'from-purple-500 to-purple-600', bgColor: 'bg-purple-50', textColor: 'text-purple-700' },
  { color: 'from-green-500 to-green-600', bgColor: 'bg-green-50', textColor: 'text-green-700' },
  { color: 'from-orange-500 to-orange-600', bgColor: 'bg-orange-50', textColor: 'text-orange-700' },
  { color: 'from-cyan-500 to-cyan-600', bgColor: 'bg-cyan-50', textColor: 'text-cyan-700' },
  { color: 'from-red-500 to-red-600', bgColor: 'bg-red-50', textColor: 'text-red-700' },
  { color: 'from-indigo-500 to-indigo-600', bgColor: 'bg-indigo-50', textColor: 'text-indigo-700' },
  { color: 'from-pink-500 to-pink-600', bgColor: 'bg-pink-50', textColor: 'text-pink-700' },
  { color: 'from-emerald-500 to-emerald-600', bgColor: 'bg-emerald-50', textColor: 'text-emerald-700' },
  { color: 'from-teal-500 to-teal-600', bgColor: 'bg-teal-50', textColor: 'text-teal-700' },
];

const content = {
  bn: {
    title: 'জনপ্রিয় বিষয়সমূহ',
    subtitle: 'প্রাথমিক থেকে উচ্চ মাধ্যমিক, O/A Level, IELTS, কোরআন, ইঞ্জিনিয়ারিং এবং মেডিকেল - সব বিষয়ের দক্ষ শিক্ষক',
    viewAll: 'সব বিষয় দেখুন',
    teachers: 'জন শিক্ষক',
    verified: 'যাচাইকৃত',
  },
  en: {
    title: 'Popular Subjects',
    subtitle: 'Expert teachers from Primary to Higher Secondary, O/A Level, IELTS, Quran, Engineering & Medical',
    viewAll: 'View All Subjects',
    teachers: 'Teachers',
    verified: 'Verified',
  },
};

export function PopularSubjects({ language, setPage }: PopularSubjectsProps) {
  const t = content[language];
  
  // Get popular subjects from subjectsData
  const popularSubjects = getPopularSubjects();
  
  // Map subjects to display format with colors and ratings
  const displaySubjects = popularSubjects.slice(0, 8).map((subject, index) => {
    const colorScheme = colorSchemes[index % colorSchemes.length];
    const Icon = iconMap[subject.icon] || Book;
    const name = language === 'bn' ? subject.name_bn : subject.name_en;
    
    // Generate realistic teacher counts based on subject popularity
    const teacherCounts = ['১২০০+', '৯৫০+', '৮০০+', '৬৫০+', '৫৫০+', '৭০০+', '৪৮০+', '৩২০+', '৪৫০+', '৬০০+'];
    const teacherCountsEn = ['1200+', '950+', '800+', '650+', '550+', '700+', '480+', '320+', '450+', '600+'];
    const ratings = ['৪.৯', '৪.৮', '৪.৮', '৪.৭', '৪.৯', '৪.৮', '৪.৮', '৪.৭', '৪.৯', '৪.৮'];
    const ratingsEn = ['4.9', '4.8', '4.8', '4.7', '4.9', '4.8', '4.8', '4.7', '4.9', '4.8'];
    
    return {
      ...subject,
      icon: Icon,
      name,
      teachers: language === 'bn' ? teacherCounts[index] : teacherCountsEn[index],
      rating: language === 'bn' ? ratings[index] : ratingsEn[index],
      ...colorScheme,
    };
  });

  return (
    <section className="py-10 sm:py-14 lg:py-18 bg-gradient-to-br from-white via-emerald-50/30 to-teal-50/30 relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-teal-100 rounded-full blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-3 sm:px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full mb-4">
            <TrendingUp className="w-4 h-4" />
            <span className={`text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{language === 'bn' ? 'জনপ্রিয় পছন্দ' : 'Popular Choice'}</span>
          </div>
          <h2 className={`text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-gray-600 max-w-2xl mx-auto text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.subtitle}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-5 mb-8">
          {displaySubjects.map((subject, index) => {
            const Icon = subject.icon;
            return (
              <motion.div
                key={subject.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                onClick={() => setPage && setPage('find-teachers')}
                className={`group relative bg-white border-2 border-gray-100 rounded-xl sm:rounded-2xl p-4 sm:p-5 hover:border-transparent hover:shadow-2xl transition-all duration-300 cursor-pointer overflow-hidden hover:-translate-y-2`}
              >
                {/* Background gradient on hover */}
                <div className={`absolute inset-0 bg-gradient-to-br ${subject.color} opacity-0 group-hover:opacity-5 transition-opacity duration-300`}></div>
                
                {/* Icon */}
                <div className={`relative w-12 h-12 sm:w-14 sm:h-14 rounded-lg sm:rounded-xl bg-gradient-to-br ${subject.color} flex items-center justify-center mb-3 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <Icon className="w-6 h-6 sm:w-7 sm:h-7 text-white" />
                </div>
                
                {/* Content */}
                <div className="relative">
                  <h4 className={`text-gray-900 mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {subject.name}
                  </h4>
                  
                  {/* Teachers count */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full bg-gradient-to-r ${subject.color}`}></div>
                      <span className={`text-gray-600 text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{subject.teachers}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className={`${subject.textColor} font-medium text-sm`}>{subject.rating}</span>
                    </div>
                  </div>
                  
                  {/* Verified badge */}
                  <div className={`inline-flex items-center gap-1 ${subject.bgColor} ${subject.textColor} px-3 py-1 rounded-full text-xs ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    {t.verified}
                  </div>
                </div>

                {/* Arrow on hover */}
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight className={`w-5 h-5 ${subject.textColor}`} />
                </div>
              </motion.div>
            );
          })}
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <GradientButton 
            variant="emerald"
            size="lg" 
            className={`px-8 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            onClick={() => setPage && setPage('all-subjects')}
          >
            {t.viewAll}
            <ArrowRight className="w-5 h-5" />
          </GradientButton>
        </motion.div>
      </div>
    </section>
  );
}
