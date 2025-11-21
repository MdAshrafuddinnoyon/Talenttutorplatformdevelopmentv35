import { useState, useEffect } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';
import { Button } from './ui/button';
import { API_BASE_URL } from '../utils/apiConfig';
import { publicAnonKey } from '../utils/supabase/info';

interface DemoUsersWarningBannerProps {
  language: 'bn' | 'en';
}

export function DemoUsersWarningBanner({ language }: DemoUsersWarningBannerProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [isChecking, setIsChecking] = useState(true);
  const [isDismissed, setIsDismissed] = useState(false);

  const content = {
    bn: {
      warning: '⚠️ Demo Users তৈরি করা হয়নি!',
      message: 'Login করার জন্য প্রথমে demo users তৈরি করুন। নিচে scroll করে "Demo Users তৈরি করুন" বাটন click করুন।',
      scrollButton: '👇 Demo Users তৈরি করতে যান',
      dismiss: 'বন্ধ করুন',
      success: '✅ Demo Users তৈরি হয়েছে!',
      successMessage: 'এখন আপনি login করতে পারবেন।'
    },
    en: {
      warning: '⚠️ Demo Users Not Created!',
      message: 'To login, you must first create demo users. Scroll down and click "Initialize Demo Users" button.',
      scrollButton: '👇 Go to Create Demo Users',
      dismiss: 'Dismiss',
      success: '✅ Demo Users Created!',
      successMessage: 'You can now login.'
    }
  };

  const t = content[language];

  useEffect(() => {
    // Check if user has dismissed the banner
    const dismissed = localStorage.getItem('demo_users_warning_dismissed');
    if (dismissed === 'true') {
      setIsDismissed(true);
      setIsVisible(false);
      setIsChecking(false);
      return;
    }

    // Check if demo users exist
    checkDemoUsers();
  }, []);

  const checkDemoUsers = async () => {
    try {
      // Try to check if any users exist by checking health endpoint
      const response = await fetch(`${API_BASE_URL}/make-server-5b21d3ea/health`, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      if (response.ok) {
        // Check if demo users might exist
        const usersExist = localStorage.getItem('demo_users_initialized');
        if (usersExist === 'true') {
          setIsVisible(false);
        } else {
          setIsVisible(true);
        }
      } else {
        setIsVisible(true);
      }
    } catch (error) {
      console.log('Could not check demo users status');
      setIsVisible(true);
    } finally {
      setIsChecking(false);
    }
  };

  const scrollToQuickLoginFixer = () => {
    const element = document.getElementById('quick-login-fixer');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  };

  const handleDismiss = () => {
    setIsDismissed(true);
    setIsVisible(false);
    localStorage.setItem('demo_users_warning_dismissed', 'true');
  };

  if (isChecking || !isVisible || isDismissed) {
    return null;
  }

  return (
    <div className="sticky top-0 z-50 bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg">
      <div className="container mx-auto px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3 flex-1">
            <AlertCircle className="w-6 h-6 flex-shrink-0 animate-pulse" />
            <div className="flex-1">
              <p className="font-bold text-lg">{t.warning}</p>
              <p className="text-sm opacity-95">{t.message}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <Button
              onClick={scrollToQuickLoginFixer}
              className="bg-white text-orange-600 hover:bg-orange-50 font-semibold shadow-lg"
            >
              {t.scrollButton}
            </Button>
            
            <Button
              onClick={handleDismiss}
              variant="ghost"
              size="icon"
              className="text-white hover:bg-white/20"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
