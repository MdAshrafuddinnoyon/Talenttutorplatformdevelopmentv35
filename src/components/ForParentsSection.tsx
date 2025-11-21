import { useState } from 'react';
import { Button } from './ui/button';
import { GradientButton } from './ui/gradient-button';
import { Card } from './ui/card';
import { Shield, Clock, MessageSquare, Star, TrendingUp, Award, BookOpen, Users, ArrowRight, Sparkles } from 'lucide-react';
import { Badge } from './ui/badge';
import { motion } from 'motion/react';
import { PostTuitionDialog } from './PostTuitionDialog';

interface ForParentsSectionProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
}

const content = {
  bn: {
    title: 'অভিভাবকদের জন্য',
    subtitle: 'আপনার সন্তানের জন্য সেরা শিক্ষক খুঁজে নিন',
    cta: 'টিউশন পোস্ট করুন',
    features: [
      {
        icon: Shield,
        title: 'যাচাইকৃত শিক্ষক',
        description: 'সকল শিক্ষক NID ও সনদপত্র যাচাইকৃত এবং অভিজ্ঞ',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        icon: Clock,
        title: 'দ্রুত ম্যাচিং',
        description: 'AI দ্বারা ২৪ ঘন্টায় উপযুক্ত শিক্ষক খুঁজে পান',
        color: 'from-emerald-500 to-teal-500',
      },
      {
        icon: MessageSquare,
        title: 'সহজ যোগাযোগ',
        description: 'শিক্ষকদের সাথে সরাসরি চ্যাট ও ভিডিও কল',
        color: 'from-purple-500 to-pink-500',
      },
      {
        icon: Star,
        title: 'রেটিং সিস্টেম',
        description: 'অন্য অভিভাবকদের রিভিউ দেখে সিদ্ধান্ত নিন',
        color: 'from-orange-500 to-red-500',
      },
      {
        icon: TrendingUp,
        title: 'অগ্রগতি ট্র্যাকিং',
        description: 'সন্তানের পড়াশোনার উন্নতি নিয়মিত দেখুন',
        color: 'from-indigo-500 to-purple-500',
      },
      {
        icon: Award,
        title: '১০০ ফ্রি ক্রেডিট',
        description: 'নিবন্ধনের সাথে সাথে ১০০ ফ্রি ক্রেডিট পান',
        color: 'from-rose-500 to-pink-500',
      },
    ],
    stats: [
      { value: '১০,০০০+', label: 'সন্তুষ্ট অভিভাবক' },
      { value: '৯৫%', label: 'সাফল্যের হার' },
      { value: '২৪ ঘন্টা', label: 'গড় ম্যাচিং সময়' },
    ],
  },
  en: {
    title: 'For Parents',
    subtitle: 'Find the best teacher for your child',
    cta: 'Post Tuition',
    features: [
      {
        icon: Shield,
        title: 'Verified Teachers',
        description: 'All teachers are NID & certificate verified and experienced',
        color: 'from-blue-500 to-cyan-500',
      },
      {
        icon: Clock,
        title: 'Fast Matching',
        description: 'Find suitable teacher in 24 hours by AI',
        color: 'from-emerald-500 to-teal-500',
      },
      {
        icon: MessageSquare,
        title: 'Easy Communication',
        description: 'Direct chat and video call with teachers',
        color: 'from-purple-500 to-pink-500',
      },
      {
        icon: Star,
        title: 'Rating System',
        description: 'Make decisions by viewing other parents reviews',
        color: 'from-orange-500 to-red-500',
      },
      {
        icon: TrendingUp,
        title: 'Progress Tracking',
        description: 'Regularly view your child\'s improvement',
        color: 'from-indigo-500 to-purple-500',
      },
      {
        icon: Award,
        title: '100 Free Credits',
        description: 'Get 100 free credits upon registration',
        color: 'from-rose-500 to-pink-500',
      },
    ],
    stats: [
      { value: '10,000+', label: 'Satisfied Parents' },
      { value: '95%', label: 'Success Rate' },
      { value: '24 Hours', label: 'Avg Matching Time' },
    ],
  },
};

export function ForParentsSection({ language, setPage }: ForParentsSectionProps) {
  const t = content[language];
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  return (
    <section id="for-parents-section" className="py-10 sm:py-14 lg:py-18 bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50 relative overflow-hidden">
      {/* Background decorations */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-teal-200 rounded-full blur-3xl opacity-20"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-200 rounded-full blur-3xl opacity-20"></div>
      
      <div className="container mx-auto px-3 sm:px-4 relative">
        {/* Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <Badge className="mb-4 px-4 py-2 bg-gradient-to-r from-teal-50 to-cyan-50 text-teal-700 border-2 border-teal-200 shadow-lg hover:shadow-xl transition-all text-sm">
            <MessageSquare className="w-4 h-4 mr-1.5" />
            <span>{t.title}</span>
          </Badge>
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3 max-w-3xl mx-auto leading-tight">
            {t.subtitle}
          </h2>
          <p className="text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto mb-6">
            সহজে খুঁজে নিন আপনার সন্তানের জন্য যোগ্য শিক্ষক
          </p>
        </motion.div>

        {/* Main CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-4xl mx-auto mb-16"
        >
          <div className="bg-gradient-to-br from-teal-50 via-cyan-50 to-emerald-50 border-2 border-teal-200 rounded-3xl p-8 md:p-12 shadow-xl">
            <div className="text-center mb-8">
              <div className="inline-flex items-center gap-3 bg-white px-6 py-3 rounded-full shadow-md mb-6">
                <div className="w-10 h-10 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center animate-pulse">
                  <Sparkles className="w-5 h-5 text-white" />
                </div>
                <span className="text-lg text-gray-900">মাত্র ৩টি ধাপে শিক্ষক খুঁজুন</span>
              </div>
              
              <div className="grid md:grid-cols-3 gap-6 mb-8">
                {[
                  { icon: BookOpen, text: 'টিউশন পোস্ট করুন', color: 'from-teal-500 to-cyan-500' },
                  { icon: Users, text: 'শিক্ষকরা আবেদন করবেন', color: 'from-emerald-500 to-teal-500' },
                  { icon: Star, text: 'সেরা শিক্ষক নির্বাচন করুন', color: 'from-cyan-500 to-blue-500' }
                ].map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5, delay: 0.3 + idx * 0.1 }}
                    className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all hover:-translate-y-1"
                  >
                    <div className={`w-12 h-12 bg-gradient-to-br ${step.color} rounded-xl flex items-center justify-center mx-auto mb-3`}>
                      <step.icon className="w-6 h-6 text-white" />
                    </div>
                    <p className="text-gray-700">{step.text}</p>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <GradientButton 
                  variant="emerald"
                  size="lg" 
                  className="px-8 shadow-xl hover:shadow-2xl"
                  onClick={() => setIsPostDialogOpen(true)}
                >
                  <Sparkles className="w-5 h-5" />
                  {t.cta}
                  <ArrowRight className="w-5 h-5" />
                </GradientButton>
                <Button 
                  variant="outline"
                  size="lg"
                  onClick={() => setPage('tuition-posts')}
                  className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-8"
                >
                  <TrendingUp className="w-5 h-5 mr-2" />
                  সব টিউশন দেখুন
                </Button>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="text-center mb-10">
            <h3 className="text-3xl text-gray-900 mb-3">কেন Talent Tutor বেছে নেবেন?</h3>
            <p className="text-gray-600 text-lg">অভিভাবকদের জন্য বিশেষ সুবিধা</p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {t.features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                >
                  <Card 
                    className="p-8 bg-white hover:shadow-2xl transition-all duration-300 group border-2 border-gray-100 hover:border-teal-200 relative overflow-hidden hover:-translate-y-2 h-full"
                  >
                    {/* Background gradient on hover */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${feature.color} opacity-0 group-hover:opacity-5 transition-opacity`}></div>
                    
                    {/* Icon */}
                    <div className={`relative w-16 h-16 bg-gradient-to-br ${feature.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-300`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    
                    {/* Content */}
                    <h4 className="text-xl text-gray-900 mb-3 relative group-hover:text-teal-700 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-gray-600 relative leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Decorative element */}
                    <div className="absolute bottom-4 right-4 w-8 h-8 border-2 border-teal-200 rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-center mt-16 pt-12 border-t-2 border-gray-100"
        >
          <div className="max-w-2xl mx-auto">
            <h3 className="text-3xl text-gray-900 mb-4">এখনই শুরু করুন</h3>
            <p className="text-gray-600 text-lg mb-8">
              বিনামূল্যে রেজিস্টার করুন এবং পান ১০০ ফ্রি ক্রেডিট
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <GradientButton 
                variant="emerald"
                size="lg" 
                className="px-10 shadow-xl"
                onClick={() => setPage('register')}
              >
                <Sparkles className="w-5 h-5" />
                ফ্রি রেজিস্ট্রেশন করুন
                <ArrowRight className="w-5 h-5" />
              </GradientButton>
              <Button 
                variant="outline"
                size="lg"
                onClick={() => setPage('find-teachers')}
                className="border-2 border-teal-600 text-teal-600 hover:bg-teal-50 px-10"
              >
                <Users className="w-5 h-5 mr-2" />
                শিক্ষক খুঁজুন
              </Button>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Post Tuition Dialog */}
      <PostTuitionDialog
        open={isPostDialogOpen}
        onOpenChange={setIsPostDialogOpen}
        language={language}
      />
    </section>
  );
}
