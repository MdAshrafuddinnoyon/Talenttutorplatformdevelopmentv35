import { Button } from '../components/ui/button';
import { ArrowLeft } from 'lucide-react';
import { TalentTutorLogo } from '../components/TalentTutorLogo';
import { LoginDebugger } from '../components/LoginDebugger';
import { APIDiagnostics } from '../components/APIDiagnostics';
import { QuickLoginFixer } from '../components/QuickLoginFixer';

interface LoginTestingPageProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
}

export function LoginTestingPage({ language, setPage }: LoginTestingPageProps) {
  const content = {
    bn: {
      title: 'লগইন সিস্টেম ডিবাগার',
      subtitle: 'লগইন ফাংশনালিটি টেস্ট করুন এবং ডেমো অ্যাকাউন্ট তৈরি করুন',
      backToDashboard: 'ড্যাশবোর্ডে ফিরুন',
    },
    en: {
      title: 'Login System Debugger',
      subtitle: 'Test login functionality and create demo accounts',
      backToDashboard: 'Back to Dashboard',
    },
  };

  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <TalentTutorLogo size="md" showText={true} showSubtitle={false} />
              <div>
                <h1 className="text-xl text-gray-900">{t.title}</h1>
                <p className="text-sm text-gray-600">{t.subtitle}</p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={() => setPage('admin-dashboard')}
              className="gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t.backToDashboard}
            </Button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 space-y-6">
        {/* Quick Login Fixer - NEW */}
        <QuickLoginFixer language={language} />

        {/* API Diagnostics */}
        <APIDiagnostics />

        {/* Login Debugger */}
        <LoginDebugger />
      </div>
    </div>
  );
}
