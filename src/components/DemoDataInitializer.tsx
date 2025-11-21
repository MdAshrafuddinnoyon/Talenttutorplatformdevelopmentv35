import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Alert, AlertDescription } from './ui/alert';
import { CheckCircle, AlertCircle, Loader2, Database, RefreshCw } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { getApiUrl, getApiHeaders } from '../utils/apiConfig';

interface DemoDataInitializerProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'Demo Data Initializer',
    subtitle: 'টেস্টিং এর জন্য demo data তৈরি করুন',
    initButton: 'Demo Data Initialize করুন',
    resetButton: 'Reset করুন',
    initializing: 'Initialize হচ্ছে...',
    resetting: 'Reset হচ্ছে...',
    successInit: 'Demo data সফলভাবে তৈরি হয়েছে!',
    successReset: 'Demo data reset হয়েছে',
    errorInit: 'Demo data তৈরি করতে সমস্যা হয়েছে',
    alreadyInit: 'Demo data ইতিমধ্যে তৈরি আছে',
    description: 'এটি নিম্নলিখিত demo data তৈরি করবে:',
    users: '২০ জন user (শিক্ষক, অভিভাবক, ছাত্র, দাতা, এডমিন)',
    posts: '৩টি tuition post',
    applications: '৪টি teacher application',
    warning: 'সতর্কতা: এটি শুধুমাত্র testing এর জন্য।',
  },
  en: {
    title: 'Demo Data Initializer',
    subtitle: 'Create demo data for testing',
    initButton: 'Initialize Demo Data',
    resetButton: 'Reset',
    initializing: 'Initializing...',
    resetting: 'Resetting...',
    successInit: 'Demo data initialized successfully!',
    successReset: 'Demo data reset',
    errorInit: 'Failed to initialize demo data',
    alreadyInit: 'Demo data already initialized',
    description: 'This will create the following demo data:',
    users: '20 users (teachers, guardians, students, donors, admins)',
    posts: '3 tuition posts',
    applications: '4 teacher applications',
    warning: 'Warning: This is for testing only.',
  }
};

export function DemoDataInitializer({ language }: DemoDataInitializerProps) {
  const t = content[language];
  const [isInitializing, setIsInitializing] = useState(false);
  const [isResetting, setIsResetting] = useState(false);
  const [initResult, setInitResult] = useState<any>(null);

  const handleInitialize = async () => {
    setIsInitializing(true);
    setInitResult(null);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/init-demo-data`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
        }
      );

      const data = await response.json();

      if (response.ok) {
        setInitResult(data);
        if (data.message === 'Demo data already initialized') {
          toast.info(t.alreadyInit);
        } else {
          toast.success(t.successInit);
        }
      } else {
        throw new Error(data.error || 'Failed to initialize');
      }
    } catch (error) {
      console.error('Initialize demo data error:', error);
      toast.error(t.errorInit);
    } finally {
      setIsInitializing(false);
    }
  };

  const handleReset = async () => {
    setIsResetting(true);

    try {
      // Delete the initialized flag
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/kv/delete`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ key: 'demo:initialized' }),
        }
      );

      setInitResult(null);
      toast.success(t.successReset);
    } catch (error) {
      console.error('Reset demo data error:', error);
    } finally {
      setIsResetting(false);
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center gap-3 mb-4">
        <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
          <Database className="w-6 h-6 text-white" />
        </div>
        <div>
          <h3 className="text-xl font-semibold">{t.title}</h3>
          <p className="text-sm text-gray-600">{t.subtitle}</p>
        </div>
      </div>

      <Alert className="mb-4 bg-amber-50 border-amber-200">
        <AlertCircle className="w-4 h-4 text-amber-600" />
        <AlertDescription className="text-amber-800">
          {t.warning}
        </AlertDescription>
      </Alert>

      <div className="space-y-3 mb-6">
        <p className="font-medium">{t.description}</p>
        <ul className="space-y-2 ml-4">
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-600" />
            {t.users}
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-600" />
            {t.posts}
          </li>
          <li className="flex items-center gap-2 text-sm text-gray-700">
            <CheckCircle className="w-4 h-4 text-green-600" />
            {t.applications}
          </li>
        </ul>
      </div>

      {initResult && (
        <Alert className="mb-4 bg-green-50 border-green-200">
          <CheckCircle className="w-4 h-4 text-green-600" />
          <AlertDescription className="text-green-800">
            <div className="space-y-1">
              <p className="font-medium">{initResult.message}</p>
              {initResult.users && (
                <p className="text-sm">
                  Users: {initResult.users.length} | 
                  Posts: {initResult.tuitionPosts || 0} | 
                  Applications: {initResult.applications || 0}
                </p>
              )}
            </div>
          </AlertDescription>
        </Alert>
      )}

      <div className="flex gap-3">
        <Button
          onClick={handleInitialize}
          disabled={isInitializing || isResetting}
          className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
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

        <Button
          variant="outline"
          onClick={handleReset}
          disabled={isInitializing || isResetting}
        >
          {isResetting ? (
            <>
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
              {t.resetting}
            </>
          ) : (
            <>
              <RefreshCw className="w-4 h-4 mr-2" />
              {t.resetButton}
            </>
          )}
        </Button>
      </div>

      {initResult?.users && (
        <div className="mt-6">
          <h4 className="font-medium mb-3">Test Credentials:</h4>
          <div className="space-y-2 max-h-64 overflow-y-auto">
            {initResult.users.slice(0, 5).map((user: any) => (
              <Card key={user.id} className="p-3 bg-gray-50">
                <div className="flex justify-between items-start text-sm">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-gray-600">{user.email}</p>
                    <p className="text-xs text-gray-500">{user.role}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-500">Password:</p>
                    <p className="font-mono text-xs">{user.password}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            See /REAL_DEMO_DATA_CREDENTIALS.md for all credentials
          </p>
        </div>
      )}
    </Card>
  );
}
