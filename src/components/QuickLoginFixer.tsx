import { useState } from 'react';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { toast } from 'sonner@2.0.3';
import { CheckCircle, AlertCircle, Loader2, UserPlus, Database } from 'lucide-react';
import { API_BASE_URL } from '../utils/apiConfig';
import { publicAnonKey } from '../utils/supabase/info';

interface QuickLoginFixerProps {
  language: 'bn' | 'en';
}

export function QuickLoginFixer({ language }: QuickLoginFixerProps) {
  const [isInitializing, setIsInitializing] = useState(false);
  const [initStatus, setInitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [message, setMessage] = useState('');

  const content = {
    bn: {
      title: 'দ্রুত লগইন সমাধান',
      description: 'Demo users তৈরি করুন এবং লগইন সিস্টেম টেস্ট করুন',
      initDemoButton: 'Demo Users তৈরি করুন',
      initializing: 'তৈরি করা হচ্ছে...',
      checkHealth: 'Server Status চেক করুন',
      checking: 'চেক করা হচ্ছে...',
      successTitle: 'সফল!',
      errorTitle: 'ত্রুটি',
      demoUsers: 'Demo Users',
      teacher: 'শিক্ষক: teacher@test.com',
      guardian: 'অভিভাবক: guardian@test.com',
      student: 'ছাত্র: student@test.com',
      admin: 'অ্যাডমিন: admin@test.com',
      donor: 'যাকাত দাতা: donor@test.com',
      materialsDonor: 'শিক্ষা উপকরণ দাতা: materials@test.com',
      password: 'সব পাসওয়ার্ড: password123',
      instructions: 'এখন আপনি এই credentials দিয়ে লগইন করতে পারবেন'
    },
    en: {
      title: 'Quick Login Fix',
      description: 'Create demo users and test the login system',
      initDemoButton: 'Initialize Demo Users',
      initializing: 'Initializing...',
      checkHealth: 'Check Server Status',
      checking: 'Checking...',
      successTitle: 'Success!',
      errorTitle: 'Error',
      demoUsers: 'Demo Users',
      teacher: 'Teacher: teacher@test.com',
      guardian: 'Guardian: guardian@test.com',
      student: 'Student: student@test.com',
      admin: 'Admin: admin@test.com',
      donor: 'Zakat Donor: donor@test.com',
      materialsDonor: 'Materials Donor: materials@test.com',
      password: 'All passwords: password123',
      instructions: 'You can now login with these credentials'
    }
  };

  const t = content[language];

  const checkServerHealth = async () => {
    setIsInitializing(true);
    setInitStatus('idle');
    
    try {
      console.log('🔍 Checking server health...');
      console.log('API Base URL:', API_BASE_URL);
      
      const healthUrl = `${API_BASE_URL}/make-server-5b21d3ea/health`;
      console.log('Health check URL:', healthUrl);
      
      const response = await fetch(healthUrl, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      const data = await response.json();
      
      if (response.ok) {
        console.log('✅ Server is healthy:', data);
        setInitStatus('success');
        setMessage(`Server Status: ${data.status} - ${data.message}`);
        toast.success(language === 'bn' ? 'Server ঠিকমতো চলছে!' : 'Server is running!');
      } else {
        console.error('❌ Health check failed:', data);
        setInitStatus('error');
        setMessage(`Error: ${data.error || 'Unknown error'}`);
        toast.error(language === 'bn' ? 'Server সমস্যা হচ্ছে' : 'Server error');
      }
    } catch (error) {
      console.error('❌ Health check error:', error);
      setInitStatus('error');
      setMessage(`Connection Error: ${error instanceof Error ? error.message : 'Unknown'}`);
      toast.error(language === 'bn' ? 'Server এ সংযোগ করতে ব্যর্থ' : 'Failed to connect to server');
    } finally {
      setIsInitializing(false);
    }
  };

  const initializeDemoUsers = async () => {
    setIsInitializing(true);
    setInitStatus('idle');
    
    try {
      console.log('👥 Initializing demo users...');
      console.log('API Base URL:', API_BASE_URL);
      
      const initUrl = `${API_BASE_URL}/make-server-5b21d3ea/init-demo-data`;
      console.log('Init URL:', initUrl);
      
      const response = await fetch(initUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`
        }
      });

      const data = await response.json();
      console.log('Init response:', data);

      if (response.ok && data.success) {
        console.log('✅ Demo users created:', data.usersCreated);
        console.log('Users:', data.users);
        setInitStatus('success');
        setMessage(`${data.usersCreated} users created successfully`);
        
        // Mark as initialized
        localStorage.setItem('demo_users_initialized', 'true');
        
        toast.success(
          language === 'bn' 
            ? `${data.usersCreated} জন user তৈরি হয়েছে!` 
            : `${data.usersCreated} users created!`
        );
      } else {
        console.error('❌ Init failed:', data);
        setInitStatus('error');
        setMessage(data.error || data.details || 'Failed to initialize');
        toast.error(
          language === 'bn' 
            ? 'Demo users তৈরি করতে ব্যর্থ' 
            : 'Failed to create demo users'
        );
      }
    } catch (error) {
      console.error('❌ Init error:', error);
      setInitStatus('error');
      setMessage(`Error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      toast.error(
        language === 'bn' 
          ? 'সমস্যা হয়েছে, আবার চেষ্টা করুন' 
          : 'Something went wrong'
      );
    } finally {
      setIsInitializing(false);
    }
  };

  return (
    <Card id="quick-login-fixer" className="w-full max-w-2xl mx-auto my-8 border-2 shadow-lg">
      <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50">
        <CardTitle className="flex items-center gap-2">
          <Database className="w-6 h-6" />
          {t.title}
        </CardTitle>
        <CardDescription className="text-base">
          {t.description}
        </CardDescription>
      </CardHeader>
      
      <CardContent className="space-y-6 pt-6">
        {/* Action Buttons */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Button
            onClick={checkServerHealth}
            disabled={isInitializing}
            variant="outline"
            className="h-12 border-2"
          >
            {isInitializing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t.checking}
              </>
            ) : (
              <>
                <AlertCircle className="w-4 h-4 mr-2" />
                {t.checkHealth}
              </>
            )}
          </Button>

          <Button
            onClick={initializeDemoUsers}
            disabled={isInitializing}
            className="h-12 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
          >
            {isInitializing ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t.initializing}
              </>
            ) : (
              <>
                <UserPlus className="w-4 h-4 mr-2" />
                {t.initDemoButton}
              </>
            )}
          </Button>
        </div>

        {/* Status Message */}
        {message && (
          <div className={`p-4 rounded-lg border-2 ${
            initStatus === 'success' 
              ? 'bg-green-50 border-green-200 text-green-800' 
              : initStatus === 'error'
              ? 'bg-red-50 border-red-200 text-red-800'
              : 'bg-blue-50 border-blue-200 text-blue-800'
          }`}>
            <div className="flex items-start gap-2">
              {initStatus === 'success' ? (
                <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : initStatus === 'error' ? (
                <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              ) : null}
              <p className="text-sm break-all">{message}</p>
            </div>
          </div>
        )}

        {/* Demo Credentials */}
        <div className="space-y-3 p-4 bg-gradient-to-br from-purple-50 to-blue-50 rounded-lg border-2 border-purple-200">
          <h3 className="font-semibold text-purple-900">{t.demoUsers}</h3>
          <div className="space-y-2 text-sm">
            <p className="font-mono bg-white px-3 py-2 rounded border">👨‍🏫 {t.teacher}</p>
            <p className="font-mono bg-white px-3 py-2 rounded border">👨‍👩‍👧 {t.guardian}</p>
            <p className="font-mono bg-white px-3 py-2 rounded border">🎓 {t.student}</p>
            <p className="font-mono bg-white px-3 py-2 rounded border">🛡️ {t.admin}</p>
            <p className="font-mono bg-white px-3 py-2 rounded border">💝 {t.donor}</p>
            <p className="font-mono bg-white px-3 py-2 rounded border">📚 {t.materialsDonor}</p>
            <p className="font-mono bg-white px-3 py-2 rounded border font-semibold text-purple-700">
              🔑 {t.password}
            </p>
          </div>
          <p className="text-sm text-purple-800 italic mt-3">
            {t.instructions}
          </p>
        </div>

        {/* Debug Info */}
        <details className="text-xs text-gray-600 bg-gray-50 p-3 rounded border">
          <summary className="cursor-pointer font-semibold mb-2">Debug Info (Click to expand)</summary>
          <div className="space-y-1 font-mono break-all">
            <p>API Base URL: {API_BASE_URL}</p>
            <p>Health URL: {API_BASE_URL}/make-server-5b21d3ea/health</p>
            <p>Init URL: {API_BASE_URL}/make-server-5b21d3ea/init-demo-data</p>
          </div>
        </details>
      </CardContent>
    </Card>
  );
}
