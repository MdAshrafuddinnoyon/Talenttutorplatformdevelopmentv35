import { motion } from 'motion/react';
import { AlertCircle, Home, Search, ArrowLeft, BookOpen, Users, GraduationCap, Heart } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { TalentTutorLogo } from '../components/TalentTutorLogo';
import { type UserRole } from '../utils/authGuard';

interface NotFoundPageProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
  userRole?: UserRole | null;
  isAuthenticated?: boolean;
  requestedPage?: string;
}

const content = {
  bn: {
    title: 'পেজ পাওয়া যায়নি',
    error404: '৪০৪',
    subtitle: 'দুঃখিত, আপনি যে পেজটি খুঁজছেন সেটি পাওয়া যায়নি।',
    unauthorized: 'আপনার এই পেজে প্রবেশের অনুমতি নেই',
    notFound: 'পেজটি বিদ্যমান নেই বা সরানো হয়েছে',
    loginRequired: 'এই পেজটি দেখতে লগইন করুন',
    goHome: 'হোমপেজে যান',
    goBack: 'ফিরে যান',
    login: 'লগইন করুন',
    
    // Role-specific suggestions
    teacherSuggestions: 'শিক্ষকদের জন্য প্রস্তাবিত পেজ:',
    guardianSuggestions: 'অভিভাবকদের জন্য প্রস্তাবিত পেজ:',
    studentSuggestions: 'ছাত্রদের জন্য প্রস্তাবিত পেজ:',
    donorSuggestions: 'দাতাদের জন্য প্রস্তাবিত পেজ:',
    visitorSuggestions: 'আপনার জন্য প্রস্তাবিত পেজ:',
    
    // Pages
    dashboard: 'ড্যাশবোর্ড',
    profile: 'প্রোফাইল',
    findTeachers: 'শিক্ষক খুঁজুন',
    browseTuitions: 'টিউশন ব্রাউজ করুন',
    findJobs: 'চাকরি খুঁজুন',
    donate: 'দান করুন',
    studentHelp: 'ছাত্র সাহায্য',
    aboutUs: 'আমাদের সম্পর্কে',
    contactUs: 'যোগাযোগ',
    howItWorks: 'কীভাবে কাজ করে',
    
    // Error messages
    roleRestriction: 'এই পেজটি শুধুমাত্র {role} ব্যবহারকারীদের জন্য উপলব্ধ।',
    teachers: 'শিক্ষক',
    guardians: 'অভিভাবক',
    students: 'ছাত্র',
    donors: 'দাতা',
    admins: 'এডমিন',
  },
  en: {
    title: 'Page Not Found',
    error404: '404',
    subtitle: 'Sorry, the page you are looking for could not be found.',
    unauthorized: 'You do not have permission to access this page',
    notFound: 'The page does not exist or has been moved',
    loginRequired: 'Login to view this page',
    goHome: 'Go to Homepage',
    goBack: 'Go Back',
    login: 'Login',
    
    // Role-specific suggestions
    teacherSuggestions: 'Suggested pages for Teachers:',
    guardianSuggestions: 'Suggested pages for Guardians:',
    studentSuggestions: 'Suggested pages for Students:',
    donorSuggestions: 'Suggested pages for Donors:',
    visitorSuggestions: 'Suggested pages for you:',
    
    // Pages
    dashboard: 'Dashboard',
    profile: 'Profile',
    findTeachers: 'Find Teachers',
    browseTuitions: 'Browse Tuitions',
    findJobs: 'Find Jobs',
    donate: 'Donate',
    studentHelp: 'Student Help',
    aboutUs: 'About Us',
    contactUs: 'Contact',
    howItWorks: 'How It Works',
    
    // Error messages
    roleRestriction: 'This page is only available for {role} users.',
    teachers: 'Teacher',
    guardians: 'Guardian',
    students: 'Student',
    donors: 'Donor',
    admins: 'Admin',
  }
};

// Role-based page suggestions
const roleSuggestions = {
  teacher: [
    { label: 'dashboard', page: 'teacher-dashboard', icon: Home },
    { label: 'profile', page: 'teacher-profile', icon: Users },
    { label: 'findJobs', page: 'browse-tuitions', icon: Search },
  ],
  guardian: [
    { label: 'dashboard', page: 'guardian-dashboard', icon: Home },
    { label: 'profile', page: 'guardian-profile', icon: Users },
    { label: 'findTeachers', page: 'find-teachers', icon: GraduationCap },
  ],
  student: [
    { label: 'dashboard', page: 'student-dashboard', icon: Home },
    { label: 'profile', page: 'student-profile', icon: Users },
    { label: 'studentHelp', page: 'donation-page', icon: Heart },
  ],
  donor: [
    { label: 'dashboard', page: 'donor-dashboard', icon: Home },
    { label: 'profile', page: 'donor-profile', icon: Users },
    { label: 'donate', page: 'donation-page', icon: Heart },
  ],
  admin: [
    { label: 'dashboard', page: 'admin-dashboard', icon: Home },
    { label: 'profile', page: 'admin-profile', icon: Users },
  ],
  visitor: [
    { label: 'goHome', page: 'home', icon: Home },
    { label: 'aboutUs', page: 'about', icon: BookOpen },
    { label: 'howItWorks', page: 'how-it-works', icon: Search },
    { label: 'contactUs', page: 'contact', icon: Users },
  ]
};

export function NotFoundPage({ 
  language, 
  setPage, 
  userRole, 
  isAuthenticated,
  requestedPage 
}: NotFoundPageProps) {
  const t = content[language];
  
  // Determine error type
  const isUnauthorized = isAuthenticated && userRole && requestedPage;
  const isLoginRequired = !isAuthenticated && requestedPage;
  
  // Get suggestions based on role
  const suggestionKey = userRole || 'visitor';
  const suggestions = roleSuggestions[suggestionKey] || roleSuggestions.visitor;
  const suggestionTitle = userRole 
    ? t[`${userRole}Suggestions` as keyof typeof t] 
    : t.visitorSuggestions;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12 shadow-2xl bg-white">
            {/* Logo */}
            <div className="flex justify-center mb-6">
              <TalentTutorLogo size="lg" showText={true} showSubtitle={false} />
            </div>

            {/* 404 Animation */}
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ 
                  type: "spring",
                  stiffness: 260,
                  damping: 20,
                  delay: 0.2 
                }}
                className="relative"
              >
                <div className="text-9xl font-bold text-gray-200 select-none">
                  {t.error404}
                </div>
                <motion.div
                  className="absolute inset-0 flex items-center justify-center"
                  animate={{ 
                    rotate: [0, 10, -10, 0],
                    scale: [1, 1.1, 1]
                  }}
                  transition={{ 
                    duration: 2,
                    repeat: Infinity,
                    repeatDelay: 1
                  }}
                >
                  <AlertCircle className="w-24 h-24 text-red-400" />
                </motion.div>
              </motion.div>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 font-[Noto_Serif_Bengali]"
            >
              {t.title}
            </motion.h1>

            {/* Subtitle/Error Message */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center mb-8"
            >
              {isUnauthorized ? (
                <div className="space-y-2">
                  <p className="text-lg text-red-600 font-semibold font-[Noto_Serif_Bengali]">
                    {t.unauthorized}
                  </p>
                  <p className="text-gray-600 font-[Noto_Serif_Bengali]">
                    {t.roleRestriction.replace('{role}', t[`${userRole}s` as keyof typeof t] as string)}
                  </p>
                </div>
              ) : isLoginRequired ? (
                <div className="space-y-2">
                  <p className="text-lg text-amber-600 font-semibold font-[Noto_Serif_Bengali]">
                    {t.loginRequired}
                  </p>
                  <p className="text-gray-600 font-[Noto_Serif_Bengali]">
                    {t.subtitle}
                  </p>
                </div>
              ) : (
                <p className="text-lg text-gray-600 font-[Noto_Serif_Bengali]">
                  {t.notFound}
                </p>
              )}
              
              {requestedPage && (
                <p className="text-sm text-gray-500 mt-2">
                  {language === 'bn' ? 'অনুরোধকৃত পেজ' : 'Requested page'}: <code className="bg-gray-100 px-2 py-1 rounded">{requestedPage}</code>
                </p>
              )}
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex flex-wrap justify-center gap-4 mb-8"
            >
              <Button
                size="lg"
                onClick={() => setPage(userRole ? `${userRole}-dashboard` : 'home')}
                className="font-[Noto_Serif_Bengali]"
              >
                <Home className="w-5 h-5 mr-2" />
                {userRole ? t.dashboard : t.goHome}
              </Button>
              
              <Button
                size="lg"
                variant="outline"
                onClick={() => window.history.back()}
                className="font-[Noto_Serif_Bengali]"
              >
                <ArrowLeft className="w-5 h-5 mr-2" />
                {t.goBack}
              </Button>
              
              {!isAuthenticated && (
                <Button
                  size="lg"
                  variant="outline"
                  onClick={() => setPage('login')}
                  className="font-[Noto_Serif_Bengali]"
                >
                  {t.login}
                </Button>
              )}
            </motion.div>

            {/* Role-based Suggestions */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="border-t pt-6"
            >
              <h3 className="text-center font-semibold text-gray-900 mb-4 font-[Noto_Serif_Bengali]">
                {suggestionTitle}
              </h3>
              <div className="grid md:grid-cols-3 gap-4 max-w-2xl mx-auto">
                {suggestions.map((suggestion, index) => {
                  const Icon = suggestion.icon;
                  return (
                    <motion.div
                      key={suggestion.page}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.7 + index * 0.1 }}
                    >
                      <Card
                        className="p-4 hover:shadow-lg transition-all cursor-pointer hover:border-emerald-500 group"
                        onClick={() => setPage(suggestion.page)}
                      >
                        <div className="flex flex-col items-center text-center gap-2">
                          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center group-hover:bg-emerald-500 transition-colors">
                            <Icon className="w-6 h-6 text-emerald-600 group-hover:text-white transition-colors" />
                          </div>
                          <span className="font-semibold text-gray-700 group-hover:text-emerald-600 transition-colors font-[Noto_Serif_Bengali]">
                            {t[suggestion.label as keyof typeof t] as string}
                          </span>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>

            {/* Additional Help */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 }}
              className="text-center mt-8 pt-6 border-t"
            >
              <p className="text-sm text-gray-600 mb-2 font-[Noto_Serif_Bengali]">
                {language === 'bn' 
                  ? 'এখনও সাহায্যের প্রয়োজন?' 
                  : 'Still need help?'}
              </p>
              <div className="flex justify-center gap-4">
                <Button
                  variant="link"
                  onClick={() => setPage('contact')}
                  className="font-[Noto_Serif_Bengali]"
                >
                  {t.contactUs}
                </Button>
                <Button
                  variant="link"
                  onClick={() => setPage('help-center')}
                  className="font-[Noto_Serif_Bengali]"
                >
                  {language === 'bn' ? 'হেল্প সেন্টার' : 'Help Center'}
                </Button>
              </div>
            </motion.div>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="text-center mt-6 text-gray-600"
        >
          <p className="text-sm font-[Noto_Serif_Bengali]">
            © 2025 Talent Tutor. {language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
