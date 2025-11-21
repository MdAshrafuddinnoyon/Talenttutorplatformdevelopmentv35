import { useState } from 'react';
import { Button } from './ui/button';
import { Database, CheckCircle, Loader2, AlertCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface QuickDemoDataButtonProps {
  language: 'bn' | 'en';
  className?: string;
  variant?: 'default' | 'outline' | 'ghost';
}

const content = {
  bn: {
    initButton: 'Demo Data তৈরি করুন',
    initializing: 'তৈরি হচ্ছে...',
    success: 'Demo data সফলভাবে তৈরি হয়েছে!',
    alreadyExists: 'Demo data ইতিমধ্যে আছে',
    error: 'Demo data তৈরি করতে সমস্যা হয়েছে',
    tooltip: 'Testing এর জন্য demo users এবং data তৈরি করুন',
  },
  en: {
    initButton: 'Initialize Demo Data',
    initializing: 'Initializing...',
    success: 'Demo data initialized successfully!',
    alreadyExists: 'Demo data already exists',
    error: 'Failed to initialize demo data',
    tooltip: 'Create demo users and data for testing',
  }
};

export function QuickDemoDataButton({ language, className, variant = 'outline' }: QuickDemoDataButtonProps) {
  const t = content[language];
  const [isInitializing, setIsInitializing] = useState(false);
  const [isInitialized, setIsInitialized] = useState(false);

  const handleInitialize = async () => {
    setIsInitializing(true);

    try {
      console.log('🚀 Initializing demo data...');
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/init-demo-data`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      console.log('Response status:', response.status);
      const data = await response.json();
      console.log('Response data:', data);

      if (response.ok) {
        setIsInitialized(true);
        
        if (data.message === 'Demo data already initialized') {
          toast.info(t.alreadyExists, {
            description: language === 'bn' 
              ? 'আপনি সরাসরি demo accounts ব্যবহার করতে পারেন' 
              : 'You can use demo accounts directly',
          });
        } else {
          toast.success(t.success, {
            description: language === 'bn'
              ? `${data.users?.length || 20} জন user এবং ${data.tuitionPosts || 3} টি post তৈরি হয়েছে`
              : `Created ${data.users?.length || 20} users and ${data.tuitionPosts || 3} posts`,
            duration: 5000,
          });
          
          console.log('✅ Demo data initialized successfully!');
          console.log('📝 Check /REAL_DEMO_DATA_CREDENTIALS.md for login credentials');
        }
      } else {
        throw new Error(data.error || 'Failed to initialize');
      }
    } catch (error) {
      console.error('❌ Initialize demo data error:', error);
      toast.error(t.error, {
        description: error instanceof Error ? error.message : 'Unknown error',
      });
    } finally {
      setIsInitializing(false);
    }
  };

  if (isInitialized) {
    return (
      <Button 
        variant="outline" 
        disabled
        className={className}
      >
        <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
        {language === 'bn' ? 'তৈরি সম্পূর্ণ' : 'Initialized'}
      </Button>
    );
  }

  return (
    <Button
      variant={variant}
      onClick={handleInitialize}
      disabled={isInitializing}
      className={className}
      title={t.tooltip}
    >
      {isInitializing ? (
        <>
          <Loader2 className="w-4 h-4 mr-2 animate-spin" />
          {t.initializing}
        </>
      ) : (
        <>
          <Database className="w-4 h-4 mr-2" />
          {t.initButton}
        </>
      )}
    </Button>
  );
}
