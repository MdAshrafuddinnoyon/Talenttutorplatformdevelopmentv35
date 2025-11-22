import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, MapPin, Sparkles, Users, BookOpen, Award, ArrowRight } from 'lucide-react';
import { PostTuitionDialog } from './PostTuitionDialog';
import { toast } from 'sonner@2.0.3';
import type { User } from '../utils/authGuard';

interface HeroSectionProps {
  language: 'bn' | 'en';
  setPage?: (page: string) => void;
  isAuthenticated?: boolean;
  userRole?: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor' | null;
  currentUser?: User | null;
  onAuthRequired?: () => void;
}

const content = {
  bn: {
    badge: '✨ বাংলাদেশের #১ স্মার্ট টিউশন প্ল্যাটফর্ম',
    title: 'সেরা শিক্ষক খুঁজুন',
    titleHighlight: 'আপনার এলাকায়',
    subtitle: 'হাজারো যোগ্য ও সম্পূর্ণ যাচাইকৃত শিক্ষক - সব বিষয়, সব শ্রেণীর জন্য। আধুনিক শিক্ষার নতুন দিগন্ত।',
    description: 'Talent Tutor-এ যুক্ত হয়ে পাবেন NID ও সনদপত্র যাচাইকৃত শিক্ষক, স্বচ্ছ দান ব্যবস্থা এবং ডিজিটাল লাইব্রেরি - সব এক জায়গায়',
    searchPlaceholder: 'বিষয়, ক্লাস বা শিক্ষকের নাম লিখুন...',
    locationPlaceholder: 'আপনার এলাকা',
    searchButton: 'শিক্ষক খুঁজুন',
    findTeacher: 'শিক্ষক খুঁজুন',
    postJob: 'টিউশন পোস্ট করুন',
    donate: 'দান করুন',
    trustedBy: 'যাদের আস্থায় আমরা',
    stat1: '৫০০০+',
    stat1Label: 'যাচাইকৃত শিক্ষক',
    stat2: '১০,০০০+',
    stat2Label: 'সন্তুষ্ট শিক্ষার্থী',
    stat3: '৩৫,০০০+',
    stat3Label: 'সম্পন্ন টিউশন',
    stat4: '৪.৮',
    stat4Label: 'গড় রেটিং',
    // Auth messages
    loginRequired: 'টিউশন পোস্ট করতে লগইন করুন',
    guardianOnly: 'শুধুমাত্র অভিভাবকরা টিউশন পোস্ট করতে পারবেন',
    loginAsGuardian: 'অনুগ্রহ করে অভিভাবক হিসেবে লগইন করুন',
  },
  en: {
    badge: '✨ Bangladesh\'s #1 Smart Tuition Platform',
    title: 'Find the Best Tutors',
    titleHighlight: 'in Your Area',
    subtitle: 'Thousands of qualified and fully verified teachers - for all subjects, all classes. A new horizon of modern education.',
    description: 'Join Talent Tutor to get NID & certificate verified teachers, transparent donation system and digital library - all in one place',
    searchPlaceholder: 'Search subject, class or teacher name...',
    locationPlaceholder: 'Your location',
    searchButton: 'Find Teachers',
    findTeacher: 'Find Teachers',
    postJob: 'Post Tuition',
    donate: 'Donate',
    trustedBy: 'Trusted Partners',
    stat1: '5000+',
    stat1Label: 'Verified Teachers',
    stat2: '10,000+',
    stat2Label: 'Happy Students',
    stat3: '35,000+',
    stat3Label: 'Completed Tuitions',
    stat4: '4.8',
    stat4Label: 'Average Rating',
    // Auth messages
    loginRequired: 'Please login to post a tuition',
    guardianOnly: 'Only guardians can post tuitions',
    loginAsGuardian: 'Please login as a guardian',
  },
};

export function HeroSection({ 
  language, 
  setPage, 
  isAuthenticated = false,
  userRole = null,
  currentUser = null,
  onAuthRequired 
}: HeroSectionProps) {
  const t = content[language];
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);

  // Handle post tuition button click with authentication check
  const handlePostTuition = () => {
    // Check if user is logged in
    if (!isAuthenticated || !userRole) {
      toast.error(t.loginRequired);
      // Trigger auth dialog if callback provided
      if (onAuthRequired) {
        onAuthRequired();
      }
      return;
    }

    // Check if user is a guardian
    if (userRole !== 'guardian') {
      toast.error(t.guardianOnly);
      return;
    }

    // All checks passed, open the dialog
    setIsPostDialogOpen(true);
  };

  return (
    <section className="relative overflow-hidden selection:bg-emerald-100 selection:text-emerald-900" id="home">
      
      <div className="container mx-auto px-4 sm:px-6 py-12 sm:py-20 lg:py-24 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left Content */}
          <div className="space-y-8 max-w-2xl">
            {/* Premium Badge */}
            <div className="inline-flex items-center">
              <Badge className={`px-4 py-1.5 bg-white/80 backdrop-blur-md text-emerald-700 border border-emerald-100 shadow-sm rounded-full text-xs sm:text-sm font-medium transition-all duration-300 hover:shadow-md hover:border-emerald-200 hover:bg-white ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                <Sparkles className="w-3.5 h-3.5 mr-2 text-emerald-500 fill-emerald-500" />
                {t.badge}
              </Badge>
            </div>

            {/* Main Heading */}
            <div>
              <h1 className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 tracking-tight leading-[1.1] mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.title}
                <br />
                <span className="relative inline-block">
                  <span className="relative z-10 bg-gradient-to-r from-emerald-600 via-teal-500 to-cyan-600 bg-clip-text text-transparent pb-2">
                    {t.titleHighlight}
                  </span>
                  {/* Underline decoration */}
                  <svg className="absolute -bottom-2 left-0 w-full h-3 text-emerald-400/30 -z-10" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="8" fill="none" />
                  </svg>
                </span>
              </h1>
              <p className={`text-lg sm:text-xl text-slate-600 leading-relaxed max-w-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.subtitle}
              </p>
            </div>

            {/* Modern CTA Buttons */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-4 pt-2">
              <Button 
                className={`h-12 sm:h-14 px-8 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white shadow-[0_8px_20px_-6px_rgba(16,185,129,0.4)] hover:shadow-[0_12px_24px_-8px_rgba(16,185,129,0.5)] hover:-translate-y-0.5 transition-all duration-300 text-base font-medium group ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                onClick={() => setPage && setPage('find-teachers')}
              >
                <Search className="w-5 h-5 mr-2.5 group-hover:rotate-12 transition-transform duration-300" />
                {t.findTeacher}
              </Button>
              
              <Button 
                variant="outline" 
                className={`h-12 sm:h-14 px-8 rounded-full border-2 border-slate-200 text-slate-700 hover:border-emerald-500 hover:text-emerald-700 hover:bg-emerald-50/50 bg-white/50 backdrop-blur-sm transition-all duration-300 text-base font-medium group ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                onClick={handlePostTuition}
              >
                <BookOpen className="w-5 h-5 mr-2.5 group-hover:scale-110 transition-transform duration-300" />
                {t.postJob}
              </Button>

              <Button 
                variant="ghost"
                className={`h-12 sm:h-14 px-6 rounded-full text-rose-600 hover:text-rose-700 hover:bg-rose-50/80 transition-all duration-300 text-base font-medium group ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                onClick={() => setPage && setPage('donation')}
              >
                <span className="mr-2">{t.donate}</span>
                <span className="group-hover:scale-125 inline-block transition-transform duration-300">❤️</span>
              </Button>
            </div>

            {/* Glass Stats */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-8">
              {[
                { val: t.stat1, label: t.stat1Label, color: 'emerald' },
                { val: t.stat2, label: t.stat2Label, color: 'teal' },
                { val: t.stat3, label: t.stat3Label, color: 'cyan' },
                { val: t.stat4, label: t.stat4Label, color: 'amber', icon: '⭐' }
              ].map((stat, idx) => (
                <div key={idx} className="group p-4 rounded-2xl bg-white/60 backdrop-blur-md border border-white/60 shadow-sm hover:shadow-md hover:bg-white/80 transition-all duration-300 hover:-translate-y-1">
                  <div className={`text-2xl sm:text-3xl font-bold text-slate-800 mb-1 group-hover:text-${stat.color}-600 transition-colors duration-300 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {stat.icon && <span className="text-amber-500 mr-1 text-xl">{stat.icon}</span>}
                    {stat.val}
                  </div>
                  <div className={`text-xs font-medium text-slate-500 uppercase tracking-wide ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Right - Hero Visual */}
          <div className="relative hidden lg:block">
            <div className="relative z-10">
              {/* Modern Image Card with Glassmorphism - RESTORED AS REQUESTED */}
              <div className="group bg-white/90 backdrop-blur-md rounded-3xl shadow-2xl p-4 transform hover:scale-105 transition-all duration-500 border border-white/50 hover:shadow-emerald-200/50">
                <div className="aspect-[4/3] rounded-2xl overflow-hidden relative">
                  <img
                    src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800&q=80"
                    alt="Students learning"
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                  />
                  {/* Gradient Overlay on Hover */}
                  <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
              </div>

              {/* Floating Cards */}
              {/* Card 1: Verified Tutors */}
              <div className="absolute top-12 -left-12 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/40 animate-float">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 flex items-center justify-center text-emerald-600">
                    <Award className="w-6 h-6" />
                  </div>
                  <div>
                    <div className={`font-bold text-slate-800 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>১০০% যাচাইকৃত</div>
                    <div className={`text-xs text-slate-500 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>অভিজ্ঞ শিক্ষক</div>
                  </div>
                </div>
              </div>

              {/* Card 2: Rating */}
              <div className="absolute bottom-20 -right-8 bg-white/90 backdrop-blur-xl p-4 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.08)] border border-white/40 animate-float" style={{ animationDelay: '1.5s' }}>
                <div className="flex items-center gap-3">
                  <div className="flex -space-x-3">
                    {[1,2,3].map((i) => (
                      <div key={i} className="w-10 h-10 rounded-full border-2 border-white bg-slate-200 overflow-hidden">
                        <img src={`https://i.pravatar.cc/100?img=${i + 10}`} alt="User" className="w-full h-full object-cover" />
                      </div>
                    ))}
                  </div>
                  <div>
                    <div className={`font-bold text-slate-800 flex items-center gap-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      ৪.৮ <span className="text-amber-500">★</span>
                    </div>
                    <div className={`text-xs text-slate-500 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>প্যারেন্টস রিভিউ</div>
                  </div>
                </div>
              </div>

              {/* Decorative Elements */}
              <div className="absolute -z-10 top-[-5%] right-[-5%] w-full h-full bg-emerald-100/50 rounded-[2.5rem] rotate-6 scale-95"></div>
              <div className="absolute -z-20 top-[-2%] right-[-2%] w-full h-full bg-teal-50/50 rounded-[2.5rem] -rotate-3 scale-105"></div>
            </div>
          </div>
        </div>

        {/* Trusted By Section - Modernized */}
        <div className="mt-20 sm:mt-32 pt-10">
          <p className={`text-sm font-semibold text-slate-400 mb-8 text-center uppercase tracking-[0.2em] ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.trustedBy}
          </p>
          
          {/* Scrollable container for mobile, Wrapped for desktop */}
          <div className="flex flex-wrap justify-center gap-4 sm:gap-6 max-w-6xl mx-auto px-4">
            {/* Partner Cards - Text Only */}
            {[
              { name: 'Ministry of Education', bn: 'শিক্ষা মন্ত্রণালয়' },
              { name: 'Dhaka University', bn: 'ঢাকা বিশ্ববিদ্যালয়' },
              { name: 'UCB Bank', bn: 'ইউসিবি ব্যাংক' },
              { name: 'ICT Division', bn: 'আইসিটি বিভাগ' },
              { name: 'Grameenphone', bn: 'গ্রামীণফোন' },
            ].map((partner, index) => (
              <div 
                key={index}
                className="group relative flex items-center justify-center px-6 py-3 sm:px-8 sm:py-4 bg-white/60 backdrop-blur-sm rounded-2xl border border-white/60 shadow-sm hover:shadow-lg hover:bg-white hover:-translate-y-1 transition-all duration-300 cursor-default"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 to-teal-50/50 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity" />
                <span className={`text-sm sm:text-base font-bold text-slate-600 group-hover:text-emerald-700 transition-colors relative z-10 text-center whitespace-nowrap ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {language === 'bn' ? partner.bn : partner.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Post Tuition Dialog */}
      <PostTuitionDialog
        open={isPostDialogOpen}
        onOpenChange={setIsPostDialogOpen}
        language={language}
        currentUser={currentUser}
        userRole={userRole}
      />
    </section>
  );
}