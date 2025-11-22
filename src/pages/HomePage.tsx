import { useState } from 'react';
import { Header } from '../components/Header';
import { HeroSection } from '../components/HeroSection';
import { LatestTuitionPosts } from '../components/LatestTuitionPosts';
import { BenefitsSection } from '../components/BenefitsSection';
import { WhyChooseUs } from '../components/WhyChooseUs';
import { HowItWorksSection } from '../components/HowItWorksSection';
import { PopularSubjects } from '../components/PopularSubjects';
import { ForParentsSection } from '../components/ForParentsSection';
import { BlogStoriesSection } from '../components/BlogStoriesSection';
import { TestimonialsSection } from '../components/TestimonialsSection';
import { PartnersSection } from '../components/PartnersSection';
import { AppDownloadSection } from '../components/AppDownloadSection';
import { FAQSection } from '../components/FAQSection';
import { Footer } from '../components/Footer';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';
import { AIMatchmaker } from '../components/AIMatchmaker';
import { teachersDatabase } from '../utils/teachersData';
import { motion } from 'motion/react';

import type { User } from '../utils/authGuard';

interface HomePageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin') => void;
  onLogout?: () => void;
  isAuthenticated?: boolean;
  userRole?: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor' | null;
  currentUser?: User | null;
}

export function HomePage({ 
  language, 
  setLanguage, 
  setPage, 
  announcement, 
  onLogin,
  onLogout,
  isAuthenticated = false,
  userRole = null,
  currentUser = null
}: HomePageProps) {
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  // Handle auth requirement - intercept login/register page navigation
  const handleSetPage = (page: string) => {
    if (page === 'login') {
      setAuthMode('login');
      setAuthDialogOpen(true);
    } else if (page === 'register') {
      setAuthMode('register');
      setAuthDialogOpen(true);
    } else {
      setPage(page);
    }
  };

  const handleAuthSuccess = (type: 'teacher' | 'guardian' | 'student' | 'admin') => {
    if (onLogin) {
      onLogin(type);
    }
  };

  // Handle auth required from HeroSection
  const handleAuthRequired = () => {
    setAuthMode('login');
    setAuthDialogOpen(true);
  };

  const handleMatchFound = (matches: any[]) => {
    // In a real app, we might want to navigate to search results with these matches
    // For now, we'll just let the user see them in the chat window or navigate
    console.log('Matches found:', matches);
    // Optional: Navigate to find-teachers with pre-selected filters
    // setPage('find-teachers');
  };

  return (
    <>
      {/* Global Background Gradient Mesh */}
      <div className="fixed inset-0 -z-50 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-emerald-500/10 blur-[100px] animate-pulse-slow" />
        <div className="absolute bottom-[-10%] left-[-5%] w-[500px] h-[500px] rounded-full bg-blue-500/10 blur-[100px] animate-pulse-slow" style={{ animationDelay: '2s' }} />
        <div className="absolute top-[40%] left-[30%] w-[300px] h-[300px] rounded-full bg-teal-500/10 blur-[80px] animate-float" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
      </div>

      <Header 
        language={language} 
        setLanguage={setLanguage} 
        setPage={handleSetPage} 
        announcement={announcement} 
        onLogin={onLogin}
        currentUser={currentUser}
        onLogout={onLogout}
      />
      
      <main className="min-h-screen relative">
        <HeroSection 
          language={language} 
          setPage={handleSetPage}
          isAuthenticated={isAuthenticated}
          userRole={userRole}
          currentUser={currentUser}
          onAuthRequired={handleAuthRequired}
        />

        {/* AI Matchmaker Section */}
        <section className="container mx-auto px-4 -mt-10 relative z-20 mb-12">
           <AIMatchmaker 
             teachers={teachersDatabase}
             onMatchFound={handleMatchFound}
             language={language}
           />
        </section>

        <LatestTuitionPosts language={language} setPage={handleSetPage} />
        <BenefitsSection language={language} />
        <WhyChooseUs language={language} setPage={handleSetPage} />
        <HowItWorksSection language={language} />
        <PopularSubjects language={language} setPage={handleSetPage} />
        <ForParentsSection language={language} setPage={handleSetPage} />
        <BlogStoriesSection language={language} setPage={handleSetPage} />
        <TestimonialsSection language={language} />
        <PartnersSection language={language} />
        <AppDownloadSection language={language} />
        <FAQSection language={language} />
      </main>
      <Footer language={language} setPage={handleSetPage} />

      {/* Auth Dialog for Login/Register */}
      <UnifiedAuthDialog
        open={authDialogOpen}
        onOpenChange={setAuthDialogOpen}
        language={language}
        onLogin={handleAuthSuccess}
        initialMode={authMode}
      />
    </>
  );
}
