import { Button } from './ui/button';
import { Globe, Menu, X, BookOpen, Heart, GraduationCap, Users, Home, Newspaper, Crown, ChevronDown, LogOut, Settings, User } from 'lucide-react';
import { useState } from 'react';
import { NotificationCenter } from './NotificationCenter';
import { GradientButton } from './ui/gradient-button';
import { UnifiedAuthDialog } from './UnifiedAuthDialog';
import { TalentTutorLogo } from './TalentTutorLogo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { motion, AnimatePresence } from 'motion/react';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from './ui/tooltip';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface HeaderProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage?: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin') => void;
  currentUser?: any;
  onLogout?: () => void;
}

const content = {
  bn: {
    home: 'হোম',
    about: 'আমাদের সম্পর্কে',
    forTeachers: 'শিক্ষক খুঁজুন',
    forParents: 'নতুন টিউশন',
    library: 'লাইব্রেরি',
    donate: 'দান করুন',
    blog: 'ব্লগ',
    subscription: 'সাবস্ক্রিপশন',
    getStarted: 'এখনই শুরু করুন',
    myDashboard: 'আমার ড্যাশবোর্ড',
    dashboard: 'ড্যাশবোর্ড',
  },
  en: {
    home: 'Home',
    about: 'About Us',
    forTeachers: 'Find Teachers',
    forParents: 'New Tuition',
    library: 'Library',
    donate: 'Donate',
    blog: 'Blog',
    subscription: 'Subscription',
    getStarted: 'Get Started',
    myDashboard: 'My Dashboard',
    dashboard: 'Dashboard',
  },
};

export function Header({ language, setLanguage, setPage, announcement, onLogin, currentUser, onLogout }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const t = content[language];

  const handleNavClick = (page: string) => {
    if (setPage) {
      setPage(page);
      setMobileMenuOpen(false);
    }
  };

  const handleGetStarted = () => {
    setAuthDialogOpen(true);
  };

  const handleFindTeachers = () => handleNavClick('find-teachers');
  const handleBrowseTuitions = () => handleNavClick('browse-tuitions');
  const handleLibrary = () => handleNavClick('library');
  const handleBlog = () => handleNavClick('blog');
  const handleSubscription = () => handleNavClick('subscription');
  const handleDonation = () => handleNavClick('donation');

  return (
    <>
      {/* Modern Glassmorphic Header */}
      <motion.header 
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="fixed top-0 left-0 right-0 z-50"
      >
        {/* Background with blur effect */}
        <div className="absolute inset-0 bg-gradient-to-b from-white/95 via-white/90 to-white/80 backdrop-blur-xl border-b border-gray-200/50 shadow-lg shadow-gray-200/50" />
        
        <div className="relative container mx-auto rounded-[77654 rounded-[20px]3210px] rounded-tl-[0px] rounded-tr-[0px] rounded-bl-[50px] rounded-br-[100px]">
          <div className="flex items-center justify-between h-14 sm:h-16">
            
            {/* Premium Logo Section */}
            <TalentTutorLogo 
              size="md"
              showText={true}
              showSubtitle={true}
              onClick={() => handleNavClick('home')}
              language={language}
            />

            {/* Modern Desktop Navigation - Icon Badges Style */}
            <TooltipProvider delayDuration={200}>
              <nav className="hidden lg:flex items-center gap-1">
                
                {/* Home */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={() => handleNavClick('home')}
                      className="group relative px-2.5 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-emerald-50 hover:to-teal-50"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-emerald-500 group-hover:to-teal-500 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-emerald-500/30">
                          <Home className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className={`hidden 2xl:inline text-sm text-gray-700 group-hover:text-emerald-700 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.home}</span>
                      </div>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="2xl:hidden">
                    <p className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>{t.home}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Find Teachers */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={handleFindTeachers}
                      className="group relative px-2.5 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-blue-50 hover:to-indigo-50"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-blue-500 group-hover:to-indigo-500 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-blue-500/30">
                          <GraduationCap className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className={`hidden 2xl:inline text-sm text-gray-700 group-hover:text-blue-700 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.forTeachers}</span>
                      </div>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="2xl:hidden">
                    <p className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>{t.forTeachers}</p>
                  </TooltipContent>
                </Tooltip>

                {/* New Tuition */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={handleBrowseTuitions}
                      className="group relative px-2.5 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-teal-50 hover:to-cyan-50"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-teal-500 group-hover:to-cyan-500 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-teal-500/30">
                          <Users className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className={`hidden 2xl:inline text-sm text-gray-700 group-hover:text-teal-700 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.forParents}</span>
                      </div>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="2xl:hidden">
                    <p className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>{t.forParents}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Library */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={handleLibrary}
                      className="group relative px-2.5 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-purple-50 hover:to-pink-50"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-purple-500 group-hover:to-pink-500 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-purple-500/30">
                          <BookOpen className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className={`hidden 2xl:inline text-sm text-gray-700 group-hover:text-purple-700 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.library}</span>
                      </div>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="2xl:hidden">
                    <p className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>{t.library}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Blog */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={handleBlog}
                      className="group relative px-2.5 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-amber-50 hover:to-orange-50"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-amber-500 group-hover:to-orange-500 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-amber-500/30">
                          <Newspaper className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className={`hidden 2xl:inline text-sm text-gray-700 group-hover:text-amber-700 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.blog}</span>
                      </div>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="2xl:hidden">
                    <p className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>{t.blog}</p>
                  </TooltipContent>
                </Tooltip>

                {/* Subscription */}
                <Tooltip>
                  <TooltipTrigger asChild>
                    <motion.button
                      onClick={handleSubscription}
                      className="group relative px-2.5 py-2 rounded-xl transition-all duration-300 hover:bg-gradient-to-br hover:from-yellow-50 hover:to-amber-50"
                      whileHover={{ y: -2 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <div className="flex items-center gap-1.5">
                        <div className="w-8 h-8 rounded-lg bg-gray-100 group-hover:bg-gradient-to-br group-hover:from-yellow-500 group-hover:to-amber-500 flex items-center justify-center transition-all duration-300 group-hover:shadow-lg group-hover:shadow-yellow-500/30">
                          <Crown className="w-4 h-4 text-gray-600 group-hover:text-white transition-colors" />
                        </div>
                        <span className={`hidden 2xl:inline text-sm text-gray-700 group-hover:text-yellow-700 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.subscription}</span>
                      </div>
                    </motion.button>
                  </TooltipTrigger>
                  <TooltipContent side="bottom" className="2xl:hidden">
                    <p className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>{t.subscription}</p>
                  </TooltipContent>
                </Tooltip>
              </nav>
            </TooltipProvider>

            {/* Right Actions */}
            <div className="flex items-center gap-1 sm:gap-2">
              
              {/* Notification Center */}
              <NotificationCenter setPage={setPage} />

              {/* Donate - Premium Pill Style */}
              <motion.div 
                whileHover={{ scale: 1.05 }} 
                whileTap={{ scale: 0.95 }}
                className="hidden md:block"
              >
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full blur opacity-60 group-hover:opacity-100 transition-opacity" />
                  <button
                    onClick={handleDonation}
                    className="relative flex items-center gap-1.5 px-3 py-2 bg-gradient-to-r from-rose-500 to-pink-500 rounded-full text-white shadow-lg shadow-rose-500/30 group-hover:shadow-rose-500/50 transition-all"
                  >
                    <Heart className="w-4 h-4 fill-white" />
                    <span className={`text-sm font-medium ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.donate}</span>
                  </button>
                </div>
              </motion.div>

              {/* Dashboard Button (for logged in users) */}
              {currentUser && (
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:block"
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full blur opacity-60 group-hover:opacity-100 transition-opacity" />
                    <button
                      onClick={() => setPage?.(`${currentUser.role}-dashboard`)}
                      className="relative flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full text-white shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all"
                    >
                      <Home className="w-4 h-4" />
                      <span className={`text-sm font-medium ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.dashboard}</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* User Menu or Get Started */}
              {currentUser ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="hidden md:flex items-center gap-2 h-10 px-3 rounded-full hover:bg-gray-100"
                    >
                      <Avatar className="w-7 h-7">
                        <AvatarImage src={currentUser.avatar} />
                        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white text-xs">
                          {currentUser.name?.charAt(0) || 'U'}
                        </AvatarFallback>
                      </Avatar>
                      <span className={`text-sm max-w-[100px] truncate ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {currentUser.name}
                      </span>
                      <ChevronDown className="w-3 h-3 text-gray-500" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                      {language === 'bn' ? 'আমার অ্যাকাউন্ট' : 'My Account'}
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => setPage?.(`${currentUser.role}-dashboard`)}>
                      <Home className="w-4 h-4 mr-2" />
                      <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                        {language === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPage?.(`${currentUser.role}-profile`)}>
                      <User className="w-4 h-4 mr-2" />
                      <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                        {language === 'bn' ? 'প্রোফাইল' : 'Profile'}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setPage?.('settings')}>
                      <Settings className="w-4 h-4 mr-2" />
                      <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                        {language === 'bn' ? 'সেটিংস' : 'Settings'}
                      </span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onLogout} className="text-red-600">
                      <LogOut className="w-4 h-4 mr-2" />
                      <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                        {language === 'bn' ? 'লগআউট' : 'Logout'}
                      </span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <motion.div 
                  whileHover={{ scale: 1.05 }} 
                  whileTap={{ scale: 0.95 }}
                  className="hidden md:block"
                >
                  <div className="relative group">
                    <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full blur opacity-60 group-hover:opacity-100 transition-opacity" />
                    <button
                      data-auth-trigger
                      onClick={handleGetStarted}
                      className="relative flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 rounded-full text-white shadow-lg shadow-emerald-500/30 group-hover:shadow-emerald-500/50 transition-all"
                    >
                      <Users className="w-4 h-4" />
                      <span className={`text-sm font-medium ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.getStarted}</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Language Switcher - Modern Dropdown */}
              <div className="hidden md:block">
                <LanguageSwitcher language={language} setLanguage={setLanguage} variant="header" />
              </div>

              {/* Mobile Menu Toggle */}
              <Button
                variant="ghost"
                size="sm"
                className="lg:hidden h-9 w-9 p-0"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5 text-gray-700" />
                ) : (
                  <Menu className="w-5 h-5 text-gray-700" />
                )}
              </Button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu - Modern Slide In */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 lg:hidden"
              onClick={() => setMobileMenuOpen(false)}
            />

            {/* Mobile Menu Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="fixed top-14 sm:top-16 right-0 bottom-0 w-72 bg-white/95 backdrop-blur-xl shadow-2xl z-40 lg:hidden overflow-y-auto border-l border-gray-200/50"
            >
              <nav className="p-4 space-y-2">
                
                {/* Mobile Nav Item Component */}
                {[
                  { icon: Home, label: t.home, onClick: () => handleNavClick('home'), gradient: 'from-emerald-500 to-teal-500' },
                  { icon: GraduationCap, label: t.forTeachers, onClick: handleFindTeachers, gradient: 'from-blue-500 to-indigo-500' },
                  { icon: Users, label: t.forParents, onClick: handleBrowseTuitions, gradient: 'from-teal-500 to-cyan-500' },
                  { icon: BookOpen, label: t.library, onClick: handleLibrary, gradient: 'from-purple-500 to-pink-500' },
                  { icon: Newspaper, label: t.blog, onClick: handleBlog, gradient: 'from-amber-500 to-orange-500' },
                  { icon: Crown, label: t.subscription, onClick: handleSubscription, gradient: 'from-yellow-500 to-amber-500' },
                ].map((item, index) => (
                  <motion.button
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.05 }}
                    onClick={item.onClick}
                    className="w-full group flex items-center gap-3 p-3 rounded-xl hover:bg-gray-50 transition-all"
                  >
                    <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${item.gradient} flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform`}>
                      <item.icon className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-gray-700 font-medium ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{item.label}</span>
                  </motion.button>
                ))}

                {/* Dashboard Button - Mobile (for logged in users) */}
                {currentUser && (
                  <motion.button
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.25 }}
                    onClick={() => {
                      setPage?.(`${currentUser.role}-dashboard`);
                      setMobileMenuOpen(false);
                    }}
                    className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 shadow-lg shadow-emerald-500/30 hover:shadow-emerald-500/50 transition-all mt-4"
                  >
                    <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                      <Home className="w-5 h-5 text-white" />
                    </div>
                    <span className={`text-white font-medium ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.myDashboard}</span>
                  </motion.button>
                )}

                {/* Donate Button - Mobile */}
                <motion.button
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: currentUser ? 0.3 : 0.25 }}
                  onClick={handleDonation}
                  className="w-full flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-rose-500 to-pink-500 shadow-lg shadow-rose-500/30 hover:shadow-rose-500/50 transition-all mt-4"
                >
                  <div className="w-10 h-10 rounded-lg bg-white/20 flex items-center justify-center">
                    <Heart className="w-5 h-5 text-white fill-white" />
                  </div>
                  <span className={`text-white font-medium ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.donate}</span>
                </motion.button>

                {/* User Section or Language & Get Started - Mobile */}
                <div className="pt-4 border-t border-gray-200 mt-4 space-y-2">
                  {currentUser && (
                    <>
                      {/* User Info Card */}
                      <div className="p-4 rounded-xl bg-gradient-to-br from-emerald-50 to-teal-50 mb-3">
                        <div className="flex items-center gap-3 mb-3">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={currentUser.avatar} />
                            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                              {currentUser.name?.charAt(0) || 'U'}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex-1 min-w-0">
                            <p className={`font-medium text-gray-900 truncate ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                              {currentUser.name}
                            </p>
                            <p className="text-xs text-gray-600 truncate">
                              {currentUser.email}
                            </p>
                          </div>
                        </div>
                        
                        {/* Quick Actions */}
                        <div className="space-y-1">
                          <button
                            onClick={() => {
                              setPage?.(`${currentUser.role}-dashboard`);
                              setMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-colors"
                          >
                            <Home className="w-4 h-4" />
                            <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                              {language === 'bn' ? 'ড্যাশবোর্ড' : 'Dashboard'}
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setPage?.(`${currentUser.role}-profile`);
                              setMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-colors"
                          >
                            <User className="w-4 h-4" />
                            <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                              {language === 'bn' ? 'প্রোফাইল' : 'Profile'}
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              setPage?.('settings');
                              setMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-white rounded-lg transition-colors"
                          >
                            <Settings className="w-4 h-4" />
                            <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                              {language === 'bn' ? 'সেটিংস' : 'Settings'}
                            </span>
                          </button>
                          <button
                            onClick={() => {
                              onLogout?.();
                              setMobileMenuOpen(false);
                            }}
                            className="w-full flex items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <LogOut className="w-4 h-4" />
                            <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                              {language === 'bn' ? 'লগআউট' : 'Logout'}
                            </span>
                          </button>
                        </div>
                      </div>
                    </>
                  )}
                  
                  <Button
                    variant="outline"
                    onClick={() => setLanguage(language === 'bn' ? 'en' : 'bn')}
                    className="w-full justify-start gap-3 h-12"
                  >
                    <Globe className="w-5 h-5" />
                    <span className={language === 'en' ? 'font-[Noto_Serif_Bengali]' : ''}>{language === 'bn' ? 'English' : 'বাংলা'}</span>
                  </Button>

                  {!currentUser && (
                    <GradientButton
                      variant="emerald"
                      onClick={handleGetStarted}
                      className={`w-full justify-start gap-3 h-12 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                    >
                      <Users className="w-5 h-5" />
                      <span>{t.getStarted}</span>
                    </GradientButton>
                  )}
                </div>
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Unified Auth Dialog - All user types */}
      <UnifiedAuthDialog 
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        language={language}
        onLogin={onLogin}
        initialMode="login"
      />

      {/* Spacer for fixed header */}
      <div className="h-14 sm:h-16" />
    </>
  );
}
