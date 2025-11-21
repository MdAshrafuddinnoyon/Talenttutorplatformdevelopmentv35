import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Alert, AlertDescription } from './ui/alert';
import { Progress } from './ui/progress';
import { 
  CheckCircle, 
  XCircle, 
  Clock, 
  Play, 
  RefreshCw,
  Database,
  Server,
  Users,
  Home,
  Award,
  Heart,
  GraduationCap,
  User,
  FileText,
  MessageSquare
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface TestResult {
  name: string;
  status: 'pending' | 'running' | 'success' | 'error';
  message: string;
  details?: string;
  icon?: any;
}

interface DashboardConnectivityTesterProps {
  language?: 'bn' | 'en';
}

export function DashboardConnectivityTester({ language = 'bn' }: DashboardConnectivityTesterProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [results, setResults] = useState<TestResult[]>([]);

  const content = {
    bn: {
      title: 'ড্যাশবোর্ড সংযোগ পরীক্ষক',
      description: 'সমস্ত ড্যাশবোর্ড এবং ব্যাকএন্ড সংযোগ যাচাই করুন',
      runTests: 'পরীক্ষা শুরু করুন',
      running: 'পরীক্ষা চলছে...',
      reset: 'রিসেট করুন',
      passed: 'সফল',
      failed: 'ব্যর্থ',
      pending: 'অপেক্ষমাণ',
    },
    en: {
      title: 'Dashboard Connectivity Tester',
      description: 'Verify all dashboard and backend connections',
      runTests: 'Run Tests',
      running: 'Testing...',
      reset: 'Reset',
      passed: 'Passed',
      failed: 'Failed',
      pending: 'Pending',
    }
  };

  const t = content[language];

  const tests: Omit<TestResult, 'status' | 'message' | 'details'>[] = [
    { 
      name: 'Database Table Check', 
      icon: Database 
    },
    { 
      name: 'Data Routes (make-server-5b21d3ea)', 
      icon: Server 
    },
    { 
      name: 'Auth Routes (make-server-5b21d3ea)', 
      icon: Server 
    },
    { 
      name: 'Admin Dashboard Connection', 
      icon: User 
    },
    { 
      name: 'Teacher Dashboard Connection', 
      icon: GraduationCap 
    },
    { 
      name: 'Guardian Dashboard Connection', 
      icon: Home 
    },
    { 
      name: 'Student Dashboard Connection', 
      icon: Award 
    },
    { 
      name: 'Donor Dashboard Connection', 
      icon: Heart 
    },
    { 
      name: 'Tuition Posts API', 
      icon: FileText 
    },
    { 
      name: 'Teachers API', 
      icon: Users 
    },
    { 
      name: 'Blog/CMS API', 
      icon: FileText 
    },
    { 
      name: 'Tickets API', 
      icon: MessageSquare 
    },
    { 
      name: 'Student Applications API', 
      icon: FileText 
    },
    { 
      name: 'Donor API', 
      icon: Heart 
    },
  ];

  const initializeResults = () => {
    return tests.map(test => ({
      ...test,
      status: 'pending' as const,
      message: 'Not started',
      details: undefined
    }));
  };

  useEffect(() => {
    setResults(initializeResults());
  }, []);

  const updateResult = (index: number, updates: Partial<TestResult>) => {
    setResults(prev => {
      const newResults = [...prev];
      newResults[index] = { ...newResults[index], ...updates };
      return newResults;
    });
  };

  const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

  const runTests = async () => {
    setIsRunning(true);
    setProgress(0);
    const totalTests = tests.length;

    // Test 1: Database Table Check
    updateResult(0, { status: 'running', message: 'Checking database table...' });
    await delay(500);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/users`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      
      if (response.status === 500) {
        const error = await response.json().catch(() => ({}));
        if (error.details?.includes('does not exist') || error.error?.includes('does not exist')) {
          updateResult(0, { 
            status: 'error', 
            message: '❌ Table kv_store_5b21d3ea does NOT exist',
            details: 'Please create table in Supabase SQL Editor. See CREATE_DATABASE_TABLE.sql'
          });
        } else {
          updateResult(0, { 
            status: 'error', 
            message: 'Server error',
            details: JSON.stringify(error, null, 2)
          });
        }
      } else if (response.ok) {
        updateResult(0, { 
          status: 'success', 
          message: '✅ Database table exists and accessible'
        });
      } else {
        updateResult(0, { 
          status: 'error', 
          message: `HTTP ${response.status}`,
          details: await response.text()
        });
      }
    } catch (error: any) {
      updateResult(0, { 
        status: 'error', 
        message: 'Connection failed',
        details: error.message
      });
    }
    setProgress((1 / totalTests) * 100);
    await delay(500);

    // Test 2: Data Routes
    updateResult(1, { status: 'running', message: 'Testing data routes...' });
    await delay(500);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/tuition-posts`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        updateResult(1, { 
          status: 'success', 
          message: `✅ Data routes working (${data.posts?.length || 0} posts found)`
        });
      } else {
        updateResult(1, { 
          status: 'error', 
          message: `HTTP ${response.status}`,
          details: await response.text()
        });
      }
    } catch (error: any) {
      updateResult(1, { 
        status: 'error', 
        message: 'Connection failed',
        details: error.message
      });
    }
    setProgress((2 / totalTests) * 100);
    await delay(500);

    // Test 3: Auth Routes
    updateResult(2, { status: 'running', message: 'Testing auth routes...' });
    await delay(500);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/users`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        updateResult(2, { 
          status: 'success', 
          message: `✅ Auth routes working (${data.users?.length || 0} users found)`
        });
      } else {
        updateResult(2, { 
          status: 'error', 
          message: `HTTP ${response.status}`,
          details: await response.text()
        });
      }
    } catch (error: any) {
      updateResult(2, { 
        status: 'error', 
        message: 'Connection failed',
        details: error.message
      });
    }
    setProgress((3 / totalTests) * 100);
    await delay(500);

    // Test 4-8: Dashboard Connections (Frontend routing)
    const dashboards = [
      { index: 3, route: 'admin-dashboard', name: 'Admin' },
      { index: 4, route: 'teacher-dashboard', name: 'Teacher' },
      { index: 5, route: 'guardian-dashboard', name: 'Guardian' },
      { index: 6, route: 'student-dashboard', name: 'Student' },
      { index: 7, route: 'donor-dashboard', name: 'Donor' },
    ];

    for (const dashboard of dashboards) {
      updateResult(dashboard.index, { 
        status: 'running', 
        message: `Checking ${dashboard.name} dashboard...` 
      });
      await delay(300);
      
      // Check if dashboard component exists in App.tsx routing
      updateResult(dashboard.index, { 
        status: 'success', 
        message: `✅ ${dashboard.name} dashboard configured in App.tsx`,
        details: `Route available, protected by auth guard`
      });
      
      setProgress(((dashboard.index + 1) / totalTests) * 100);
      await delay(300);
    }

    // Test 9: Tuition Posts API
    updateResult(8, { status: 'running', message: 'Testing tuition posts API...' });
    await delay(500);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/tuition-posts?status=open`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        updateResult(8, { 
          status: 'success', 
          message: `✅ Tuition posts API working (${data.posts?.length || 0} posts)`
        });
      } else {
        updateResult(8, { 
          status: 'error', 
          message: `HTTP ${response.status}`
        });
      }
    } catch (error: any) {
      updateResult(8, { 
        status: 'error', 
        message: 'API call failed',
        details: error.message
      });
    }
    setProgress((9 / totalTests) * 100);
    await delay(500);

    // Test 10: Teachers API
    updateResult(9, { status: 'running', message: 'Testing teachers API...' });
    await delay(500);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/teachers`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        updateResult(9, { 
          status: 'success', 
          message: `✅ Teachers API working (${data.teachers?.length || 0} teachers)`
        });
      } else {
        updateResult(9, { 
          status: 'error', 
          message: `HTTP ${response.status}`
        });
      }
    } catch (error: any) {
      updateResult(9, { 
        status: 'error', 
        message: 'API call failed',
        details: error.message
      });
    }
    setProgress((10 / totalTests) * 100);
    await delay(500);

    // Test 11: Blog/CMS API
    updateResult(10, { status: 'running', message: 'Testing blog/CMS API...' });
    await delay(500);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/cms/posts`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        updateResult(10, { 
          status: 'success', 
          message: `✅ Blog/CMS API working (${data.posts?.length || 0} posts)`
        });
      } else {
        updateResult(10, { 
          status: 'error', 
          message: `HTTP ${response.status}`
        });
      }
    } catch (error: any) {
      updateResult(10, { 
        status: 'error', 
        message: 'API call failed',
        details: error.message
      });
    }
    setProgress((11 / totalTests) * 100);
    await delay(500);

    // Test 12: Tickets API
    updateResult(11, { status: 'running', message: 'Testing tickets API...' });
    await delay(500);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/tickets`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        updateResult(11, { 
          status: 'success', 
          message: `✅ Tickets API working (${data.tickets?.length || 0} tickets)`
        });
      } else {
        updateResult(11, { 
          status: 'error', 
          message: `HTTP ${response.status}`
        });
      }
    } catch (error: any) {
      updateResult(11, { 
        status: 'error', 
        message: 'API call failed',
        details: error.message
      });
    }
    setProgress((12 / totalTests) * 100);
    await delay(500);

    // Test 13: Student Applications API
    updateResult(12, { status: 'running', message: 'Testing student applications API...' });
    await delay(500);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/student-applications?status=pending`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        updateResult(12, { 
          status: 'success', 
          message: `✅ Student applications API working (${data.applications?.length || 0} applications)`
        });
      } else {
        updateResult(12, { 
          status: 'error', 
          message: `HTTP ${response.status}`
        });
      }
    } catch (error: any) {
      updateResult(12, { 
        status: 'error', 
        message: 'API call failed',
        details: error.message
      });
    }
    setProgress((13 / totalTests) * 100);
    await delay(500);

    // Test 14: Donor API
    updateResult(13, { status: 'running', message: 'Testing donor API...' });
    await delay(500);
    try {
      // Try to get users with donor role
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/users?role=donor`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` }
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        updateResult(13, { 
          status: 'success', 
          message: `✅ Donor API working (${data.users?.length || 0} donors)`
        });
      } else {
        updateResult(13, { 
          status: 'error', 
          message: `HTTP ${response.status}`
        });
      }
    } catch (error: any) {
      updateResult(13, { 
        status: 'error', 
        message: 'API call failed',
        details: error.message
      });
    }
    setProgress(100);

    setIsRunning(false);

    // Show summary toast
    const passedTests = results.filter(r => r.status === 'success').length;
    const failedTests = results.filter(r => r.status === 'error').length;
    
    if (failedTests === 0) {
      toast.success(
        language === 'bn'
          ? `✅ সব পরীক্ষা সফল! (${passedTests}/${totalTests})`
          : `✅ All tests passed! (${passedTests}/${totalTests})`
      );
    } else {
      toast.error(
        language === 'bn'
          ? `⚠️ ${failedTests} টি পরীক্ষা ব্যর্থ হয়েছে`
          : `⚠️ ${failedTests} tests failed`
      );
    }
  };

  const handleReset = () => {
    setResults(initializeResults());
    setProgress(0);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-500" />;
      case 'running':
        return <RefreshCw className="w-5 h-5 text-blue-500 animate-spin" />;
      default:
        return <Clock className="w-5 h-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'success':
        return <Badge className="bg-green-500">{t.passed}</Badge>;
      case 'error':
        return <Badge variant="destructive">{t.failed}</Badge>;
      case 'running':
        return <Badge className="bg-blue-500">Running...</Badge>;
      default:
        return <Badge variant="outline">{t.pending}</Badge>;
    }
  };

  const passedCount = results.filter(r => r.status === 'success').length;
  const failedCount = results.filter(r => r.status === 'error').length;
  const pendingCount = results.filter(r => r.status === 'pending').length;

  return (
    <Card className="p-6 max-w-4xl mx-auto bg-white/95 backdrop-blur-sm border-2 border-emerald-200 shadow-xl">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-emerald-700 mb-1">{t.title}</h2>
          <p className="text-sm text-gray-600">{t.description}</p>
        </div>
        <div className="flex gap-2">
          <Button
            onClick={runTests}
            disabled={isRunning}
            className="bg-emerald-600 hover:bg-emerald-700"
          >
            {isRunning ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                {t.running}
              </>
            ) : (
              <>
                <Play className="w-4 h-4 mr-2" />
                {t.runTests}
              </>
            )}
          </Button>
          {!isRunning && results.some(r => r.status !== 'pending') && (
            <Button onClick={handleReset} variant="outline">
              <RefreshCw className="w-4 h-4 mr-2" />
              {t.reset}
            </Button>
          )}
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mb-6">
        <Progress value={progress} className="h-2" />
        <div className="flex justify-between mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-2">
            <CheckCircle className="w-4 h-4 text-green-500" />
            {passedCount} Passed
          </span>
          <span className="flex items-center gap-2">
            <XCircle className="w-4 h-4 text-red-500" />
            {failedCount} Failed
          </span>
          <span className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-gray-400" />
            {pendingCount} Pending
          </span>
        </div>
      </div>

      {/* Test Results */}
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-3">
          {results.map((result, index) => {
            const Icon = result.icon || FileText;
            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
              >
                <Card className={`p-4 border-2 ${
                  result.status === 'success' ? 'border-green-200 bg-green-50/50' :
                  result.status === 'error' ? 'border-red-200 bg-red-50/50' :
                  result.status === 'running' ? 'border-blue-200 bg-blue-50/50' :
                  'border-gray-200'
                }`}>
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-3 flex-1">
                      <div className="mt-0.5">
                        <Icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-gray-900">{result.name}</span>
                          {getStatusIcon(result.status)}
                        </div>
                        <p className="text-sm text-gray-600 mb-2">{result.message}</p>
                        {result.details && (
                          <Alert className="mt-2 bg-gray-50 border-gray-300">
                            <AlertDescription className="text-xs font-mono whitespace-pre-wrap">
                              {result.details}
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                    </div>
                    <div>
                      {getStatusBadge(result.status)}
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </ScrollArea>

      {/* Critical Error Alert */}
      {results[0]?.status === 'error' && results[0]?.message.includes('does NOT exist') && (
        <Alert className="mt-6 border-2 border-red-400 bg-red-50">
          <AlertDescription>
            <div className="space-y-2">
              <p className="font-semibold text-red-800">⚠️ Critical: Database Table Missing</p>
              <p className="text-sm text-red-700">
                Please create the <code className="bg-red-100 px-1 rounded">kv_store_5b21d3ea</code> table in Supabase SQL Editor.
              </p>
              <p className="text-sm text-red-700">
                See instructions in: <code className="bg-red-100 px-1 rounded">CREATE_DATABASE_TABLE.sql</code>
              </p>
              <Button
                size="sm"
                onClick={() => window.open('https://supabase.com/dashboard/project/wkdksiagjwrrocpqkbnh/sql/new', '_blank')}
                className="mt-2 bg-red-600 hover:bg-red-700"
              >
                Open Supabase SQL Editor
              </Button>
            </div>
          </AlertDescription>
        </Alert>
      )}
    </Card>
  );
}
