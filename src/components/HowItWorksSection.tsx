import { UserPlus, Search, MessageSquare, CheckCircle, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

interface HowItWorksSectionProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'কিভাবে কাজ করে?',
    subtitle: 'সহজ ৪ ধাপে আপনার পছন্দের শিক্ষক খুঁজে নিন',
    forParents: 'অভিভাবকদের জন্য',
    forParentsDesc: 'আপনার সন্তানের জন্য সঠিক শিক্ষক খুঁজুন',
    forTeachers: 'শিক্ষকদের জন্য',
    forTeachersDesc: 'আপনার দক্ষতা অনুযায়ী টিউশন পান',
    stepsParents: [
      {
        id: 'parent-step-1',
        icon: UserPlus,
        title: 'নিবন্ধন করুন',
        description: 'বিনামূল্যে অ্যাকাউন্ট তৈরি করুন এবং ১০০ ফ্রি ক্রেডিট পান',
        color: 'from-emerald-500 to-teal-500',
      },
      {
        id: 'parent-step-2',
        icon: Search,
        title: 'টিউশন পোস্ট করুন',
        description: 'বিষয়, ক্লাস, বেতন এবং এলাকা উল্লেখ করে পোস্ট করুন',
        color: 'from-teal-500 to-cyan-500',
      },
      {
        id: 'parent-step-3',
        icon: MessageSquare,
        title: 'শিক্ষক নির্বাচন করুন',
        description: 'আবেদনকারী শিক্ষকদের প্রোফাইল দেখুন এবং যোগাযোগ করুন',
        color: 'from-cyan-500 to-blue-500',
      },
      {
        id: 'parent-step-4',
        icon: CheckCircle,
        title: 'টিউশন শুরু করুন',
        description: 'উপযুক্ত শিক্ষক নিয়োগ করুন এবং পড়াশোনা শুরু করুন',
        color: 'from-blue-500 to-indigo-500',
      },
    ],
    stepsTeachers: [
      {
        id: 'teacher-step-1',
        icon: UserPlus,
        title: 'প্রোফাইল তৈরি করুন',
        description: 'NID ও শিক্ষাগত সনদপত্র জমা দিয়ে সম্পূর্ণ প্রোফাইল তৈরি করুন এবং ৫০ ফ্রি ক্রেডিট পান',
        color: 'from-purple-500 to-pink-500',
      },
      {
        id: 'teacher-step-2',
        icon: Search,
        title: 'টিউশন খুঁজুন',
        description: 'আপনার যোগ্যতা অনুযায়ী টিউশন খুঁজুন এবং ফিল্টার করুন',
        color: 'from-pink-500 to-rose-500',
      },
      {
        id: 'teacher-step-3',
        icon: MessageSquare,
        title: 'আবেদন করুন',
        description: 'পছন্দের টিউশনে আবেদন করুন এবং অভিভাবকদের সাথে যোগাযোগ করুন',
        color: 'from-rose-500 to-red-500',
      },
      {
        id: 'teacher-step-4',
        icon: CheckCircle,
        title: 'টিউশন পান',
        description: 'নির্বাচিত হলে টিউশন শুরু করুন এবং আয় করুন',
        color: 'from-red-500 to-orange-500',
      },
    ],
  },
  en: {
    title: 'How It Works?',
    subtitle: 'Find your suitable teacher in just 4 easy steps',
    forParents: 'For Parents',
    forParentsDesc: 'Find the right teacher for your child',
    forTeachers: 'For Teachers',
    forTeachersDesc: 'Get tuition according to your skills',
    stepsParents: [
      {
        id: 'parent-step-1',
        icon: UserPlus,
        title: 'Register',
        description: 'Create free account and get 100 free credits',
        color: 'from-emerald-500 to-teal-500',
      },
      {
        id: 'parent-step-2',
        icon: Search,
        title: 'Post Tuition',
        description: 'Post by specifying subject, class, salary and area',
        color: 'from-teal-500 to-cyan-500',
      },
      {
        id: 'parent-step-3',
        icon: MessageSquare,
        title: 'Select Teacher',
        description: 'View applicant profiles and contact them',
        color: 'from-cyan-500 to-blue-500',
      },
      {
        id: 'parent-step-4',
        icon: CheckCircle,
        title: 'Start Tuition',
        description: 'Hire suitable teacher and start learning',
        color: 'from-blue-500 to-indigo-500',
      },
    ],
    stepsTeachers: [
      {
        id: 'teacher-step-1',
        icon: UserPlus,
        title: 'Create Profile',
        description: 'Submit NID & educational certificates, create complete profile, get 50 free credits',
        color: 'from-purple-500 to-pink-500',
      },
      {
        id: 'teacher-step-2',
        icon: Search,
        title: 'Find Tuition',
        description: 'Search and filter tuition according to your qualification',
        color: 'from-pink-500 to-rose-500',
      },
      {
        id: 'teacher-step-3',
        icon: MessageSquare,
        title: 'Apply',
        description: 'Apply to preferred tuition and contact parents',
        color: 'from-rose-500 to-red-500',
      },
      {
        id: 'teacher-step-4',
        icon: CheckCircle,
        title: 'Get Tuition',
        description: 'If selected, start tuition and earn',
        color: 'from-red-500 to-orange-500',
      },
    ],
  },
};

export function HowItWorksSection({ language }: HowItWorksSectionProps) {
  const t = content[language];

  return (
    <section className="py-10 sm:py-14 lg:py-18 bg-gradient-to-br from-gray-50 via-white to-emerald-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-purple-200 rounded-full blur-3xl opacity-10"></div>
      
      <div className="container mx-auto px-3 sm:px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <h2 className={`text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-gray-600 max-w-2xl mx-auto text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Parents Steps */}
        <div className="mb-20">
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-8 py-3 rounded-full shadow-lg mb-3">
              <h3 className={`text-white ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.forParents}
              </h3>
            </div>
            <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.forParentsDesc}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {t.stepsParents.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-emerald-200 hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden">
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                    
                    {/* Step number */}
                    <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h4 className={`text-gray-900 mb-3 relative ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {step.title}
                    </h4>
                    <p className={`text-gray-600 text-sm relative leading-relaxed ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow connector */}
                  {index < t.stepsParents.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                      <ArrowRight className="w-6 h-6 text-emerald-400" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Teachers Steps */}
        <div>
          <div className="text-center mb-12">
            <div className="inline-block bg-gradient-to-r from-purple-500 to-pink-500 text-white px-8 py-3 rounded-full shadow-lg mb-3">
              <h3 className={`text-white ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.forTeachers}
              </h3>
            </div>
            <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.forTeachersDesc}</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 relative">
            {t.stepsTeachers.map((step, index) => {
              const Icon = step.icon;
              return (
                <motion.div 
                  key={step.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative group"
                >
                  <div className="bg-white border-2 border-gray-100 rounded-2xl p-8 hover:border-purple-200 hover:shadow-2xl transition-all duration-300 h-full relative overflow-hidden">
                    {/* Background gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${step.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                    
                    {/* Step number */}
                    <div className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${step.color} rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg`}>
                      {index + 1}
                    </div>
                    
                    {/* Icon */}
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mb-6 shadow-md group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h4 className={`text-gray-900 mb-3 relative ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {step.title}
                    </h4>
                    <p className={`text-gray-600 text-sm relative leading-relaxed ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {step.description}
                    </p>
                  </div>
                  
                  {/* Arrow connector */}
                  {index < t.stepsTeachers.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-3 z-10">
                      <ArrowRight className="w-6 h-6 text-purple-400" />
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
