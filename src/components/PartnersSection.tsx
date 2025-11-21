import { Building2, Users, BookCheck, TrendingUp, Award, Shield } from 'lucide-react';
import { motion } from 'motion/react';

interface PartnersSectionProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'আমাদের অংশীদার ও সহযোগী',
    subtitle: 'যারা আমাদের সাথে শিক্ষার মান উন্নয়নে কাজ করছেন',
    trustBadge: 'বিশ্বস্ত অংশীদার',
    partners: [
      { name: 'শিক্ষা মন্ত্রণালয়', icon: Building2, type: 'সরকারি' },
      { name: 'ঢাকা বিশ্ববিদ্যালয়', icon: BookCheck, type: 'শিক্ষা প্রতিষ্ঠান' },
      { name: 'BRAC শিক্ষা কর্মসূচি', icon: Users, type: 'NGO' },
      { name: 'ICT বিভাগ', icon: Building2, type: 'সরকারি' },
      { name: 'পরিবেশ অধিদপ্তর', icon: Building2, type: 'সরকারি' },
      { name: 'শিক্ষক সমিতি বাংলাদেশ', icon: Users, type: 'সংস্থা' },
    ],
    stats: [
      { label: 'যাচাইকৃত শিক্ষক', value: '৫০০০+', icon: Shield },
      { label: 'সক্রিয় শিক্ষার্থী', value: '১০,০০০+', icon: Users },
      { label: 'সম্পন্ন টিউশন', value: '৩৫,০০০+', icon: BookCheck },
      { label: 'গড় রেটিং', value: '৪.৮/৫.০', icon: Award },
    ],
  },
  en: {
    title: 'Our Partners & Collaborators',
    subtitle: 'Those who are working with us to improve education quality',
    trustBadge: 'Trusted Partners',
    partners: [
      { name: 'Ministry of Education', icon: Building2, type: 'Government' },
      { name: 'Dhaka University', icon: BookCheck, type: 'Institution' },
      { name: 'BRAC Education Program', icon: Users, type: 'NGO' },
      { name: 'ICT Division', icon: Building2, type: 'Government' },
      { name: 'Department of Environment', icon: Building2, type: 'Government' },
      { name: 'Teachers Association BD', icon: Users, type: 'Organization' },
    ],
    stats: [
      { label: 'Verified Teachers', value: '5000+', icon: Shield },
      { label: 'Active Students', value: '10,000+', icon: Users },
      { label: 'Completed Tuitions', value: '35,000+', icon: BookCheck },
      { label: 'Average Rating', value: '4.8/5.0', icon: Award },
    ],
  },
};

export function PartnersSection({ language }: PartnersSectionProps) {
  const t = content[language];

  return (
    <section className="py-10 sm:py-14 lg:py-18 bg-white relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-purple-100 rounded-full blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-3 sm:px-4 relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-12"
        >
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-100 to-purple-100 text-blue-700 px-4 py-2 rounded-full mb-4 shadow-md">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm">{t.trustBadge}</span>
          </div>
          <h2 className="text-gray-900 mb-4">
            {t.title}
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            {t.subtitle}
          </p>
        </motion.div>

        {/* Partners Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {t.partners.map((partner, index) => {
            const Icon = partner.icon;
            const colors = [
              { bg: 'from-blue-500 to-cyan-500', light: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
              { bg: 'from-purple-500 to-pink-500', light: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
              { bg: 'from-emerald-500 to-teal-500', light: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
              { bg: 'from-orange-500 to-red-500', light: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
              { bg: 'from-indigo-500 to-purple-500', light: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
              { bg: 'from-rose-500 to-pink-500', light: 'bg-rose-50', text: 'text-rose-700', border: 'border-rose-200' },
            ];
            const color = colors[index % colors.length];
            
            return (
              <motion.div
                key={partner.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`group bg-white border-2 ${color.border} rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2`}
              >
                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${color.bg} rounded-xl flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                
                {/* Partner name */}
                <h4 className="text-gray-900 mb-2">
                  {partner.name}
                </h4>
                
                {/* Type badge */}
                <div className={`inline-flex items-center ${color.light} ${color.text} px-3 py-1 rounded-full text-sm`}>
                  {partner.type}
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Stats Bar - Enhanced Design */}
        <div className="relative">
          {/* Gradient background with pattern */}
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-transparent rounded-3xl"></div>
          
          <div className="relative bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 rounded-3xl p-12 shadow-2xl overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-white/10 rounded-full blur-2xl"></div>
            
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {t.stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center group">
                    {/* Icon */}
                    <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:bg-white/30 group-hover:scale-110 transition-all duration-300 shadow-lg">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Value */}
                    <div className="text-4xl text-white mb-2 group-hover:scale-110 transition-transform duration-300">
                      {stat.value}
                    </div>
                    
                    {/* Label */}
                    <div className="text-emerald-100 text-sm">
                      {stat.label}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Additional trust indicators */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-6">
          <div className="flex items-center gap-2 bg-green-50 text-green-700 px-6 py-3 rounded-full border border-green-200">
            <Shield className="w-5 h-5" />
            <span>সম্পূর্ণ যাচাইকৃত শিক্ষক</span>
          </div>
          <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-6 py-3 rounded-full border border-blue-200">
            <Award className="w-5 h-5" />
            <span>সরকার অনুমোদিত</span>
          </div>
          <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-6 py-3 rounded-full border border-purple-200">
            <TrendingUp className="w-5 h-5" />
            <span>দ্রুত বর্ধনশীল</span>
          </div>
        </div>
      </div>
    </section>
  );
}
