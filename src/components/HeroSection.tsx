import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Search, MapPin, Sparkles, Users, BookOpen, Award } from 'lucide-react';
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
    badge: '🎓 বাংলাদেশের #১ টিউশন প্ল্যাটফর্ম',
    title: 'সেরা শিক্ষক খুঁজুন',
    titleHighlight: 'আপনার এলাকায়',
    subtitle: 'হাজারো যোগ্য ও সম্পূর্ণ যাচাইকৃত শিক্ষক - সব বিষয়, সব শ্রেণীর জন্য',
    description: 'Talent Tutor-এ যুক্ত হয়ে পাবেন NID ও সনদপত্র যাচাইকৃত শিক্ষক, স্বচ্ছ দান ব্যবস্থা এবং ডিজিটাল লাইব্রেরি - সব এক জায়গায়',
    searchPlaceholder: 'বিষয়, ক্লাস বা শিক্ষকের নাম লিখুন...',
    locationPlaceholder: 'আপনার এলাকা',
    searchButton: 'শিক্ষক খুঁজুন',
    findTeacher: 'শিক্ষক খুঁজুন',
    postJob: 'টিউশন পোস্ট করুন',
    donate: 'দান করুন ❤️',
    trustedBy: 'যারা আমাদের বিশ্বাস করেন',
    stat1: '৫০০০+',
    stat1Label: 'যাচাইকৃত শিক্ষক',
    stat2: '১০,০০০+',
    stat2Label: 'সন্তুষ্ট শিক্ষার্থী',
    stat3: '৩৫,০০০+',
    stat3Label: 'সম্পন্ন টিউশন',
    stat4: '৪.৮★',
    stat4Label: 'গড় রেটিং',
    // Auth messages
    loginRequired: 'টিউশন পোস্ট করতে লগইন করুন',
    guardianOnly: 'শুধুমাত্র অভিভাবকরা টিউশন পোস্ট করতে পারবেন',
    loginAsGuardian: 'অনুগ্রহ করে অভিভাবক হিসেবে লগইন করুন',
  },
  en: {
    badge: '🎓 Bangladesh\'s #1 Tuition Platform',
    title: 'Find the Best Tutors',
    titleHighlight: 'in Your Area',
    subtitle: 'Thousands of qualified and fully verified teachers - for all subjects, all classes',
    description: 'Join Talent Tutor to get NID & certificate verified teachers, transparent donation system and digital library - all in one place',
    searchPlaceholder: 'Search subject, class or teacher name...',
    locationPlaceholder: 'Your location',
    searchButton: 'Find Teachers',
    findTeacher: 'Find Teachers',
    postJob: 'Post Tuition',
    donate: 'Donate ❤️',
    trustedBy: 'Trusted By',
    stat1: '5000+',
    stat1Label: 'Verified Teachers',
    stat2: '10,000+',
    stat2Label: 'Happy Students',
    stat3: '35,000+',
    stat3Label: 'Completed Tuitions',
    stat4: '4.8★',
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
    <section className="relative overflow-hidden bg-gradient-to-br from-emerald-50 via-white to-teal-50" id="home">
      {/* Modern Background Decorations with Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-emerald-300 to-teal-300 rounded-full opacity-30 blur-3xl animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-tr from-teal-300 to-cyan-300 rounded-full opacity-30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-cyan-200 to-emerald-200 rounded-full opacity-20 blur-3xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgxNiwgMTg1LCAxMjksIDAuMDUpIiBzdHJva2Utd2lkdGg9IjEiLz48L3BhdHRlcm4+PC9kZWZzPjxyZWN0IHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiIGZpbGw9InVybCgjZ3JpZCkiLz48L3N2Zz4=')] opacity-40"></div>
      </div>

      <div className="container mx-auto px-3 sm:px-4 py-8 sm:py-12 lg:py-16 xl:py-20 relative z-10">
        <div className="grid lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Left Content */}
          <div className="space-y-4 sm:space-y-6">
            {/* Modern Badge with Glassmorphism */}
            <Badge className={`inline-flex items-center gap-2 px-4 py-2 bg-emerald-100/80 backdrop-blur-sm text-emerald-700 hover:bg-emerald-200/80 hover:shadow-lg border border-emerald-200/50 text-sm transition-all duration-300 hover:scale-105 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              <Sparkles className="w-4 h-4 animate-pulse" />
              {t.badge}
            </Badge>

            {/* Main Heading */}
            <div>
              <h1 className={`text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl text-gray-900 mb-3 sm:mb-4 leading-tight ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.title}
                <br />
                <span className="bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent">
                  {t.titleHighlight}
                </span>
              </h1>
              <p className={`text-sm sm:text-base md:text-lg text-gray-600 mb-2 sm:mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.subtitle}
              </p>
              <p className={`text-xs sm:text-sm text-gray-500 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.description}
              </p>
            </div>

            {/* Modern CTA Buttons with Enhanced Effects */}
            <div className="flex flex-col sm:flex-row flex-wrap gap-3 sm:gap-4">
              <Button 
                className={`group w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg hover:shadow-2xl transition-all duration-300 px-6 py-3 h-auto hover:scale-105 hover:-translate-y-0.5 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                onClick={() => setPage && setPage('find-teachers')}
              >
                <Search className="w-4 h-4 mr-2 group-hover:rotate-12 transition-transform duration-300" />
                <span className="text-sm">{t.findTeacher}</span>
              </Button>
              <Button 
                variant="outline" 
                className={`group w-full sm:w-auto border-2 border-emerald-600 text-emerald-700 hover:bg-emerald-50 hover:border-emerald-700 px-6 py-3 h-auto shadow-md hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-0.5 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                onClick={handlePostTuition}
              >
                <BookOpen className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform duration-300" />
                <span className="text-sm">{t.postJob}</span>
              </Button>
              <Button 
                className={`group w-full sm:w-auto bg-gradient-to-r from-rose-500 via-pink-600 to-red-600 hover:from-rose-600 hover:via-pink-700 hover:to-red-700 shadow-lg hover:shadow-2xl transition-all duration-300 px-6 py-3 h-auto hover:scale-105 hover:-translate-y-0.5 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                onClick={() => setPage && setPage('donation')}
              >
                <span className="text-sm group-hover:scale-110 inline-block transition-transform duration-300">{t.donate}</span>
              </Button>
            </div>

            {/* Modern Stats with Cards */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 pt-6 sm:pt-8">
              <div className="group text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-emerald-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className={`text-2xl sm:text-3xl bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.stat1}</div>
                <div className={`text-xs text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.stat1Label}</div>
              </div>
              <div className="group text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-teal-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className={`text-2xl sm:text-3xl bg-gradient-to-r from-teal-600 to-cyan-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.stat2}</div>
                <div className={`text-xs text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.stat2Label}</div>
              </div>
              <div className="group text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-cyan-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className={`text-2xl sm:text-3xl bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.stat3}</div>
                <div className={`text-xs text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.stat3Label}</div>
              </div>
              <div className="group text-center p-4 rounded-xl bg-white/60 backdrop-blur-sm border border-yellow-100 shadow-sm hover:shadow-lg transition-all duration-300 hover:scale-105 hover:-translate-y-1">
                <div className={`text-2xl sm:text-3xl bg-gradient-to-r from-yellow-600 to-orange-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform duration-300 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.stat4}</div>
                <div className={`text-xs text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.stat4Label}</div>
              </div>
            </div>
          </div>

          {/* Right - Enhanced Visual Elements */}
          <div className="relative hidden lg:block">
            <div className="relative z-10">
              {/* Modern Image Card with Glassmorphism */}
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

              {/* Modern Floating Cards with Glassmorphism */}
              <div className="absolute -top-4 -left-4 bg-white/95 backdrop-blur-md rounded-2xl shadow-2xl p-4 max-w-[220px] border border-white/50 hover:scale-105 transition-all duration-300" style={{ animation: 'bounce 3s ease-in-out infinite' }}>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-lg">
                    <Award className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-900 font-[Noto_Serif_Bengali]">সম্পূর্ণ যাচাইকৃত</div>
                    <div className="text-xs text-gray-600 font-[Noto_Serif_Bengali]">সব শিক্ষক</div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-4 -right-4 bg-gradient-to-br from-amber-400 via-yellow-500 to-orange-500 text-white rounded-2xl shadow-2xl p-4 border border-yellow-300/50 hover:scale-105 transition-all duration-300" style={{ animation: 'pulse 3s ease-in-out infinite' }}>
                <div className="flex items-center gap-3">
                  <div className="text-3xl drop-shadow-lg">⭐</div>
                  <div>
                    <div className="text-xl font-[Noto_Serif_Bengali]">৪.৮/৫.০</div>
                    <div className="text-xs text-yellow-50 font-[Noto_Serif_Bengali]">গড় রেটিং</div>
                  </div>
                </div>
              </div>

              <div className="absolute top-1/2 -right-6 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl p-4 hidden xl:block border border-white/50 hover:scale-105 transition-all duration-300">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
                    <Users className="w-4 h-4 text-white" />
                  </div>
                  <div className="text-xs text-gray-700 font-[Noto_Serif_Bengali]">১০০+ নতুন শিক্ষার্থী</div>
                </div>
              </div>
            </div>

            {/* Enhanced Background Decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-200/50 via-teal-200/50 to-cyan-200/50 rounded-3xl transform rotate-6 -z-10 blur-sm"></div>
            <div className="absolute inset-0 bg-gradient-to-tl from-emerald-300/30 via-teal-300/30 to-cyan-300/30 rounded-3xl transform -rotate-3 -z-20 blur-md"></div>
          </div>
        </div>

        {/* Trusted By Section */}
        <div className="mt-10 sm:mt-16 text-center">
          <p className={`text-sm text-gray-500 mb-4 sm:mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.trustedBy}</p>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-6 opacity-50">
            <div className="text-base sm:text-lg font-[Noto_Serif_Bengali]">🏛️ Ministry of Education</div>
            <div className="text-base sm:text-lg font-[Noto_Serif_Bengali]">🎓 Dhaka University</div>
            <div className="text-base sm:text-lg">📚 BRAC</div>
            <div className="text-base sm:text-lg font-[Noto_Serif_Bengali]">💼 ICT Department</div>
          </div>
        </div>
      </div>

      {/* Post Tuition Dialog - Only opens if authentication check passes */}
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
