import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { 
  PlayCircle, 
  CheckCircle2, 
  XCircle, 
  Loader2, 
  Code, 
  Send,
  Copy,
  Download,
  RefreshCw,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import api from '../utils/apiClient';

interface APITestingDashboardProps {
  language: 'bn' | 'en';
}

interface TestCase {
  id: string;
  name: string;
  category: string;
  endpoint: string;
  method: string;
  description: string;
  testData?: any;
}

const testCases: TestCase[] = [
  // Donor APIs
  {
    id: 'donor-register',
    name: 'Register Donor',
    category: 'Donor',
    endpoint: '/donor/register',
    method: 'POST',
    description: 'Test donor registration',
    testData: {
      name: 'Test Donor',
      email: `test${Date.now()}@example.com`,
      phone: '01712345678',
      password: 'testpassword123',
    },
  },
  {
    id: 'donor-login',
    name: 'Login Donor',
    category: 'Donor',
    endpoint: '/donor/login',
    method: 'POST',
    description: 'Test donor login',
    testData: {
      emailOrPhone: 'test@example.com',
      password: 'testpassword123',
    },
  },
  
  // Student Application APIs
  {
    id: 'seed-applications',
    name: 'Seed Sample Applications',
    category: 'Student',
    endpoint: '/seed-applications',
    method: 'POST',
    description: 'Create sample student applications for testing',
  },
  {
    id: 'student-submit-application',
    name: 'Submit Application',
    category: 'Student',
    endpoint: '/application/submit',
    method: 'POST',
    description: 'Submit new student application',
    testData: {
      studentName: 'Test Student',
      studentId: null,
      class: 'ক্লাস ১০',
      school: 'Test School',
      applicationType: 'scholarship',
      amount: 5000,
      purpose: 'পরীক্ষার ফি',
      urgency: 'high',
      coverLetter: 'আমার পরিবার গরিব। পরীক্ষার ফি দিতে পারছি না। আমার সাহায্য প্রয়োজন।',
      documents: 2,
    },
  },
  {
    id: 'get-pending-applications',
    name: 'Get Pending Applications',
    category: 'Student',
    endpoint: '/applications/pending',
    method: 'GET',
    description: 'Get all pending applications (Admin)',
  },
  {
    id: 'get-approved-applications',
    name: 'Get Approved Applications',
    category: 'Student',
    endpoint: '/applications/approved',
    method: 'GET',
    description: 'Get all approved applications (Donors)',
  },
  
  // Notification APIs
  {
    id: 'notification-send',
    name: 'Send Notification',
    category: 'Notification',
    endpoint: '/notifications/send',
    method: 'POST',
    description: 'Test sending notification',
    testData: {
      userId: 'donor-test-123',
      title: 'Test Notification',
      message: 'This is a test notification',
      type: 'info',
      priority: 'normal',
    },
  },
  
  // Payment APIs
  {
    id: 'payment-create-intent',
    name: 'Create Payment Intent',
    category: 'Payment',
    endpoint: '/payment/create-intent',
    method: 'POST',
    description: 'Test creating payment intent',
    testData: {
      amount: 5000,
      currency: 'BDT',
      donorId: 'donor-test-123',
      donationType: 'যাকাত',
      description: 'Test payment',
    },
  },
  
  // Analytics APIs
  {
    id: 'analytics-platform-stats',
    name: 'Get Platform Stats',
    category: 'Analytics',
    endpoint: '/analytics/platform-stats',
    method: 'GET',
    description: 'Test getting platform statistics',
  },
];

export function APITestingDashboard({ language }: APITestingDashboardProps) {
  const [selectedTest, setSelectedTest] = useState<TestCase | null>(null);
  const [testData, setTestData] = useState<string>('');
  const [response, setResponse] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [testResults, setTestResults] = useState<Map<string, any>>(new Map());

  const content = {
    bn: {
      title: 'API টেস্টিং ড্যাশবোর্ড',
      subtitle: 'ব্যাকএন্ড API টেস্ট করুন',
      selectTest: 'টেস্ট কেস নির্বাচন করুন',
      runTest: 'টেস্ট চালান',
      runAllTests: 'সব টেস্ট চালান',
      testData: 'টেস্ট ডেটা',
      response: 'রেসপন্স',
      testResults: 'টেস্ট ফলাফল',
      passed: 'সফল',
      failed: 'ব্যর্থ',
      pending: 'অপেক্ষমাণ',
      clearResults: 'ফলাফল মুছুন',
      copyResponse: 'রেসপন্স কপি করুন',
      downloadReport: 'রিপোর্ট ডাউনলোড করুন',
    },
    en: {
      title: 'API Testing Dashboard',
      subtitle: 'Test Backend APIs',
      selectTest: 'Select Test Case',
      runTest: 'Run Test',
      runAllTests: 'Run All Tests',
      testData: 'Test Data',
      response: 'Response',
      testResults: 'Test Results',
      passed: 'Passed',
      failed: 'Failed',
      pending: 'Pending',
      clearResults: 'Clear Results',
      copyResponse: 'Copy Response',
      downloadReport: 'Download Report',
    },
  };

  const t = content[language];

  const handleTestSelect = (test: TestCase) => {
    setSelectedTest(test);
    setTestData(test.testData ? JSON.stringify(test.testData, null, 2) : '');
    setResponse(null);
  };

  const runTest = async (test: TestCase, data?: string) => {
    setLoading(true);
    setResponse(null);

    try {
      let result;
      const parsedData = data ? JSON.parse(data) : test.testData;

      // Call API based on test case
      switch (test.id) {
        case 'donor-register':
          result = await fetch(`https://ndagafjsslqzobcljqpx.supabase.co/functions/v1/make-server-5b21d3ea/donor/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kYWdhZmpzc2xxem9iY2xqcXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDI1MTYsImV4cCI6MjA1MjUxODUxNn0.Zf4_iJNYNGl2dQczd-WHZlTtHnqnFqOcqOqKLf7wQ1k',
            },
            body: JSON.stringify(parsedData),
          });
          result = await result.json();
          break;

        case 'donor-login':
          result = await fetch(`https://ndagafjsslqzobcljqpx.supabase.co/functions/v1/make-server-5b21d3ea/donor/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kYWdhZmpzc2xxem9iY2xqcXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDI1MTYsImV4cCI6MjA1MjUxODUxNn0.Zf4_iJNYNGl2dQczd-WHZlTtHnqnFqOcqOqKLf7wQ1k',
            },
            body: JSON.stringify(parsedData),
          });
          result = await result.json();
          break;

        case 'student-create-application':
          result = await fetch(`https://ndagafjsslqzobcljqpx.supabase.co/functions/v1/make-server-5b21d3ea/student/application/create`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
              'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5kYWdhZmpzc2xxem9iY2xqcXB4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzY5NDI1MTYsImV4cCI6MjA1MjUxODUxNn0.Zf4_iJNYNGl2dQczd-WHZlTtHnqnFqOcqOqKLf7wQ1k',
            },
            body: JSON.stringify(parsedData),
          });
          result = await result.json();
          break;

        case 'notification-send':
          result = await api.notificationApi.send(parsedData);
          result = result.data;
          break;

        case 'payment-create-intent':
          result = await api.paymentApi.createIntent(parsedData);
          result = result.data;
          break;

        case 'analytics-platform-stats':
          result = await api.analyticsApi.getPlatformStats();
          result = result.data;
          break;

        default:
          result = { error: 'Test case not implemented' };
      }

      setResponse(result);
      
      // Update test results
      const newResults = new Map(testResults);
      newResults.set(test.id, {
        status: result.success || !result.error ? 'passed' : 'failed',
        timestamp: new Date().toISOString(),
        response: result,
      });
      setTestResults(newResults);

      if (result.success || !result.error) {
        toast.success(`✅ Test ${test.name} passed`);
      } else {
        toast.error(`❌ Test ${test.name} failed`);
      }
    } catch (error: any) {
      const errorResult = { error: error.message };
      setResponse(errorResult);
      
      const newResults = new Map(testResults);
      newResults.set(test.id, {
        status: 'failed',
        timestamp: new Date().toISOString(),
        response: errorResult,
      });
      setTestResults(newResults);
      
      toast.error(`❌ Test ${test.name} failed: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const runAllTests = async () => {
    toast.info('Running all tests...');
    for (const test of testCases) {
      await runTest(test);
      // Wait 1 second between tests
      await new Promise(resolve => setTimeout(resolve, 1000));
    }
    toast.success('All tests completed!');
  };

  const copyResponse = () => {
    if (response) {
      navigator.clipboard.writeText(JSON.stringify(response, null, 2));
      toast.success('Response copied to clipboard');
    }
  };

  const downloadReport = () => {
    const report = {
      timestamp: new Date().toISOString(),
      totalTests: testCases.length,
      passed: Array.from(testResults.values()).filter(r => r.status === 'passed').length,
      failed: Array.from(testResults.values()).filter(r => r.status === 'failed').length,
      results: Object.fromEntries(testResults),
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `api-test-report-${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('Test report downloaded');
  };

  const groupedTests = testCases.reduce((acc, test) => {
    if (!acc[test.category]) {
      acc[test.category] = [];
    }
    acc[test.category].push(test);
    return acc;
  }, {} as Record<string, TestCase[]>);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl text-gray-900 mb-2">{t.title}</h1>
          <p className="text-gray-600">{t.subtitle}</p>
          
          <div className="flex gap-3 mt-4">
            <Button onClick={runAllTests} className="gap-2">
              <PlayCircle className="w-4 h-4" />
              {t.runAllTests}
            </Button>
            <Button variant="outline" onClick={() => setTestResults(new Map())} className="gap-2">
              <RefreshCw className="w-4 h-4" />
              {t.clearResults}
            </Button>
            <Button variant="outline" onClick={downloadReport} className="gap-2" disabled={testResults.size === 0}>
              <Download className="w-4 h-4" />
              {t.downloadReport}
            </Button>
          </div>
        </div>

        {/* Test Results Summary */}
        {testResults.size > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-6">
            <Card className="p-6 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
              <div className="text-3xl mb-1">
                {Array.from(testResults.values()).filter(r => r.status === 'passed').length}
              </div>
              <div className="text-sm opacity-90">{t.passed}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-rose-500 to-pink-600 text-white">
              <div className="text-3xl mb-1">
                {Array.from(testResults.values()).filter(r => r.status === 'failed').length}
              </div>
              <div className="text-sm opacity-90">{t.failed}</div>
            </Card>
            <Card className="p-6 bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
              <div className="text-3xl mb-1">
                {testCases.length - testResults.size}
              </div>
              <div className="text-sm opacity-90">{t.pending}</div>
            </Card>
          </div>
        )}

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Test Cases List */}
          <Card className="lg:col-span-1 p-4">
            <h3 className="font-semibold mb-4">{t.selectTest}</h3>
            <ScrollArea className="h-[600px]">
              <div className="space-y-4">
                {Object.entries(groupedTests).map(([category, tests]) => (
                  <div key={category}>
                    <h4 className="text-sm text-gray-600 mb-2">{category}</h4>
                    <div className="space-y-2">
                      {tests.map((test) => {
                        const result = testResults.get(test.id);
                        return (
                          <motion.div
                            key={test.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                          >
                            <Card
                              className={`p-3 cursor-pointer transition-all ${
                                selectedTest?.id === test.id
                                  ? 'border-2 border-blue-500 bg-blue-50'
                                  : 'hover:border-blue-300'
                              }`}
                              onClick={() => handleTestSelect(test)}
                            >
                              <div className="flex items-start justify-between">
                                <div className="flex-1">
                                  <div className="flex items-center gap-2 mb-1">
                                    <p className="text-sm">{test.name}</p>
                                    {result && (
                                      result.status === 'passed' ? (
                                        <CheckCircle2 className="w-4 h-4 text-green-600" />
                                      ) : (
                                        <XCircle className="w-4 h-4 text-red-600" />
                                      )
                                    )}
                                  </div>
                                  <Badge variant="outline" className="text-xs">
                                    {test.method}
                                  </Badge>
                                </div>
                              </div>
                            </Card>
                          </motion.div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </Card>

          {/* Test Details & Execution */}
          <Card className="lg:col-span-2 p-6">
            {selectedTest ? (
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-xl">{selectedTest.name}</h3>
                      <p className="text-sm text-gray-600">{selectedTest.description}</p>
                    </div>
                    <Button onClick={() => runTest(selectedTest, testData)} disabled={loading} className="gap-2">
                      {loading ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Send className="w-4 h-4" />
                      )}
                      {t.runTest}
                    </Button>
                  </div>
                  
                  <div className="flex gap-2 mb-4">
                    <Badge>{selectedTest.method}</Badge>
                    <Badge variant="outline">{selectedTest.category}</Badge>
                    <code className="text-xs bg-gray-100 px-2 py-1 rounded">{selectedTest.endpoint}</code>
                  </div>
                </div>

                <Tabs defaultValue="data" className="w-full">
                  <TabsList>
                    <TabsTrigger value="data">{t.testData}</TabsTrigger>
                    <TabsTrigger value="response">{t.response}</TabsTrigger>
                  </TabsList>

                  <TabsContent value="data" className="space-y-4">
                    <div>
                      <Label className="mb-2 block">Request Body (JSON)</Label>
                      <Textarea
                        value={testData}
                        onChange={(e) => setTestData(e.target.value)}
                        placeholder="Enter JSON test data..."
                        className="font-mono text-sm h-[400px]"
                      />
                    </div>
                  </TabsContent>

                  <TabsContent value="response" className="space-y-4">
                    {response ? (
                      <div>
                        <div className="flex items-center justify-between mb-2">
                          <Label>Response</Label>
                          <Button size="sm" variant="outline" onClick={copyResponse} className="gap-2">
                            <Copy className="w-3 h-3" />
                            {t.copyResponse}
                          </Button>
                        </div>
                        <div className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-auto h-[400px]">
                          <pre className="text-xs">
                            <code>{JSON.stringify(response, null, 2)}</code>
                          </pre>
                        </div>
                      </div>
                    ) : (
                      <div className="flex items-center justify-center h-[400px] text-gray-400">
                        <div className="text-center">
                          <Code className="w-12 h-12 mx-auto mb-2 opacity-50" />
                          <p>Run test to see response</p>
                        </div>
                      </div>
                    )}
                  </TabsContent>
                </Tabs>
              </div>
            ) : (
              <div className="flex items-center justify-center h-[600px] text-gray-400">
                <div className="text-center">
                  <PlayCircle className="w-16 h-16 mx-auto mb-4 opacity-50" />
                  <p className="text-lg">Select a test case to begin</p>
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
}
