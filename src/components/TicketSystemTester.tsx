import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { UniversalTicketSystem } from './UniversalTicketSystem';
import { 
  Users, 
  Ticket, 
  CheckCircle, 
  XCircle,
  PlayCircle,
  Info,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface TicketSystemTesterProps {
  language: 'bn' | 'en';
}

const testUsers = {
  teacher: {
    id: 'teacher-demo-1',
    name: 'রহিম শিক্ষক',
    role: 'teacher' as const,
    email: 'teacher@test.com',
  },
  guardian: {
    id: 'guardian-demo-1',
    name: 'করিম অভিভাবক',
    role: 'guardian' as const,
    email: 'guardian@test.com',
  },
  student: {
    id: 'student-demo-1',
    name: 'সামিয়া ছাত্র',
    role: 'student' as const,
    email: 'student@test.com',
  },
  donor: {
    id: 'donor-demo-1',
    name: 'হাসান দাতা',
    role: 'donor' as const,
    email: 'donor@test.com',
  },
  admin: {
    id: 'admin-1',
    name: 'Admin',
    role: 'admin' as const,
    email: 'admin@talent.com',
  },
};

export function TicketSystemTester({ language }: TicketSystemTesterProps) {
  const [selectedUser, setSelectedUser] = useState<keyof typeof testUsers>('teacher');
  const [showTicketSystem, setShowTicketSystem] = useState(false);
  const [testResults, setTestResults] = useState<{[key: string]: boolean}>({});

  const content = {
    bn: {
      title: 'টিকেট সিস্টেম টেস্টার',
      subtitle: 'সব ইউজার টাইপের জন্য টিকেট সিস্টেম পরীক্ষা করুন',
      selectUser: 'ইউজার নির্বাচন করুন',
      openTicketSystem: 'টিকেট সিস্টেম খুলুন',
      testScenarios: 'টেস্ট সিনারিও',
      runTest: 'টেস্ট চালান',
      passed: 'পাস',
      failed: 'ফেইল',
      notRun: 'চালানো হয়নি',
      instructions: 'নির্দেশনা',
      teacher: 'শিক্ষক',
      guardian: 'অভিভাবক',
      student: 'ছাত্র',
      donor: 'দাতা',
      admin: 'এডমিন',
      
      // Test scenarios
      scenario1: 'টিকেট তৈরি করুন',
      scenario1Desc: 'নতুন সাপোর্ট টিকেট তৈরি করুন এবং যাচাই করুন',
      scenario2: 'টিকেট তালিকা দেখুন',
      scenario2Desc: 'আপনার সব টিকেট দেখুন এবং ফিল্টার করুন',
      scenario3: 'টিকেটে রিপ্লাই করুন',
      scenario3Desc: 'একটি টিকেটে বার্তা যুক্ত করুন',
      scenario4: 'ভাষা পরিবর্তন',
      scenario4Desc: 'বাংলা এবং ইংরেজি ভাষায় টেস্ট করুন',
      scenario5: 'স্ট্যাটাস আপডেট (এডমিন)',
      scenario5Desc: 'টিকেটের স্ট্যাটাস পরিবর্তন করুন',
      
      // Instructions
      inst1: '১. উপরে একটি ইউজার টাইপ নির্বাচন করুন',
      inst2: '২. "টিকেট সিস্টেম খুলুন" বাটনে ক্লিক করুন',
      inst3: '৩. নতুন টিকেট তৈরি করুন অথবা বিদ্যমান টিকেট দেখুন',
      inst4: '৪. বিভিন্ন ফিচার পরীক্ষা করুন',
      inst5: '৫. অন্য ইউজার টাইপ নির্বাচন করে পুনরায় টেস্ট করুন',
    },
    en: {
      title: 'Ticket System Tester',
      subtitle: 'Test the ticket system for all user types',
      selectUser: 'Select User',
      openTicketSystem: 'Open Ticket System',
      testScenarios: 'Test Scenarios',
      runTest: 'Run Test',
      passed: 'Passed',
      failed: 'Failed',
      notRun: 'Not Run',
      instructions: 'Instructions',
      teacher: 'Teacher',
      guardian: 'Guardian',
      student: 'Student',
      donor: 'Donor',
      admin: 'Admin',
      
      // Test scenarios
      scenario1: 'Create a Ticket',
      scenario1Desc: 'Create a new support ticket and verify',
      scenario2: 'View Ticket List',
      scenario2Desc: 'View all your tickets and apply filters',
      scenario3: 'Reply to Ticket',
      scenario3Desc: 'Add a message to a ticket',
      scenario4: 'Language Switch',
      scenario4Desc: 'Test in Bengali and English',
      scenario5: 'Update Status (Admin)',
      scenario5Desc: 'Change ticket status',
      
      // Instructions
      inst1: '1. Select a user type above',
      inst2: '2. Click "Open Ticket System" button',
      inst3: '3. Create a new ticket or view existing tickets',
      inst4: '4. Test various features',
      inst5: '5. Select different user type and test again',
    },
  };

  const t = content[language];
  const currentUser = testUsers[selectedUser];

  const testScenarios = [
    {
      id: 'scenario1',
      title: t.scenario1,
      description: t.scenario1Desc,
      icon: Ticket,
      steps: [
        language === 'bn' 
          ? 'টিকেট সিস্টেম খুলুন'
          : 'Open ticket system',
        language === 'bn'
          ? '"Create Ticket" ট্যাবে যান'
          : 'Go to "Create Ticket" tab',
        language === 'bn'
          ? 'ক্যাটাগরি এবং অগ্রাধিকার নির্বাচন করুন'
          : 'Select category and priority',
        language === 'bn'
          ? 'বিষয় এবং বিবরণ লিখুন'
          : 'Fill in subject and description',
        language === 'bn'
          ? 'জমা দিন এবং টিকেট নম্বর যাচাই করুন'
          : 'Submit and verify ticket number',
      ],
    },
    {
      id: 'scenario2',
      title: t.scenario2,
      description: t.scenario2Desc,
      icon: Users,
      steps: [
        language === 'bn'
          ? '"My Tickets" ট্যাবে যান'
          : 'Go to "My Tickets" tab',
        language === 'bn'
          ? 'টিকেট তালিকা দেখুন'
          : 'View ticket list',
        language === 'bn'
          ? 'স্ট্যাটাস ফিল্টার ব্যবহার করুন'
          : 'Use status filter',
        language === 'bn'
          ? 'ক্যাটাগরি ফিল্টার ব্যবহার করুন'
          : 'Use category filter',
        language === 'bn'
          ? 'সার্চ ফিচার টেস্ট করুন'
          : 'Test search feature',
      ],
    },
    {
      id: 'scenario3',
      title: t.scenario3,
      description: t.scenario3Desc,
      icon: PlayCircle,
      steps: [
        language === 'bn'
          ? 'একটি টিকেটে ক্লিক করুন'
          : 'Click on a ticket',
        language === 'bn'
          ? 'টিকেটের বিস্তারিত দেখুন'
          : 'View ticket details',
        language === 'bn'
          ? 'রিপ্লাই বক্সে বার্তা লিখুন'
          : 'Type message in reply box',
        language === 'bn'
          ? 'রিপ্লাই পাঠান'
          : 'Send reply',
        language === 'bn'
          ? 'কনভার্সেশনে রিপ্লাই দেখুন'
          : 'See reply in conversation',
      ],
    },
    {
      id: 'scenario4',
      title: t.scenario4,
      description: t.scenario4Desc,
      icon: Info,
      steps: [
        language === 'bn'
          ? 'বাংলা ভাষায় টেস্ট করুন'
          : 'Test in Bengali',
        language === 'bn'
          ? 'ইংরেজি ভাষায় পরিবর্তন করুন'
          : 'Switch to English',
        language === 'bn'
          ? 'সব টেক্সট অনুবাদিত আছে কিনা যাচাই করুন'
          : 'Verify all text is translated',
        language === 'bn'
          ? 'উভয় ভাষায় ফিচার কাজ করছে কিনা পরীক্ষা করুন'
          : 'Test features work in both languages',
      ],
    },
  ];

  if (selectedUser === 'admin') {
    testScenarios.push({
      id: 'scenario5',
      title: t.scenario5,
      description: t.scenario5Desc,
      icon: CheckCircle,
      steps: [
        language === 'bn'
          ? 'যেকোনো টিকেট খুলুন'
          : 'Open any ticket',
        language === 'bn'
          ? 'স্ট্যাটাস ড্রপডাউন দেখুন'
          : 'See status dropdown',
        language === 'bn'
          ? 'স্ট্যাটাস পরিবর্তন করুন'
          : 'Change status',
        language === 'bn'
          ? 'স্ট্যাটাস আপডেট হয়েছে কিনা যাচাই করুন'
          : 'Verify status is updated',
      ],
    });
  }

  const handleRunTest = (scenarioId: string) => {
    // Simulate running test
    setShowTicketSystem(true);
    toast.info(
      language === 'bn'
        ? 'টিকেট সিস্টেম খোলা হয়েছে। ম্যানুয়ালি স্টেপগুলো অনুসরণ করুন।'
        : 'Ticket system opened. Follow the steps manually.'
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50">
        <div className="flex items-start justify-between">
          <div>
            <h2 className="text-2xl flex items-center gap-3 mb-2">
              <Ticket className="w-7 h-7 text-teal-600" />
              {t.title}
            </h2>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>
          <Badge className="bg-teal-600">
            {language === 'bn' ? 'টেস্টিং টুল' : 'Testing Tool'}
          </Badge>
        </div>
      </Card>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Left: User Selection */}
        <Card className="p-6 lg:col-span-1">
          <h3 className="flex items-center gap-2 mb-4">
            <Users className="w-5 h-5 text-teal-600" />
            {t.selectUser}
          </h3>
          
          <div className="space-y-2">
            {Object.entries(testUsers).map(([key, user]) => (
              <button
                key={key}
                onClick={() => setSelectedUser(key as keyof typeof testUsers)}
                className={`w-full p-4 rounded-lg border-2 text-left transition-all ${
                  selectedUser === key
                    ? 'border-teal-500 bg-teal-50'
                    : 'border-gray-200 hover:border-teal-300'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{user.name}</p>
                    <p className="text-sm text-gray-600">{t[key as keyof typeof t]}</p>
                    <p className="text-xs text-gray-500 mt-1">{user.email}</p>
                  </div>
                  {selectedUser === key && (
                    <CheckCircle className="w-5 h-5 text-teal-600" />
                  )}
                </div>
              </button>
            ))}
          </div>

          <Button
            onClick={() => setShowTicketSystem(true)}
            className="w-full mt-4 bg-gradient-to-r from-teal-600 to-emerald-600"
          >
            <Ticket className="w-4 h-4 mr-2" />
            {t.openTicketSystem}
          </Button>
        </Card>

        {/* Right: Test Scenarios */}
        <Card className="p-6 lg:col-span-2">
          <Tabs defaultValue="scenarios" className="w-full">
            <TabsList className="grid w-full grid-cols-2 mb-4">
              <TabsTrigger value="scenarios">
                {t.testScenarios}
              </TabsTrigger>
              <TabsTrigger value="instructions">
                {t.instructions}
              </TabsTrigger>
            </TabsList>

            <TabsContent value="scenarios" className="space-y-4">
              {testScenarios.map((scenario) => {
                const Icon = scenario.icon;
                const status = testResults[scenario.id];
                
                return (
                  <Card key={scenario.id} className="p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-start gap-3 flex-1">
                        <div className="w-10 h-10 rounded-lg bg-teal-100 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-5 h-5 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <h4 className="font-medium mb-1">{scenario.title}</h4>
                          <p className="text-sm text-gray-600 mb-3">
                            {scenario.description}
                          </p>
                          
                          <div className="bg-gray-50 rounded-lg p-3 space-y-1">
                            {scenario.steps.map((step, idx) => (
                              <div key={idx} className="flex items-start gap-2 text-sm">
                                <span className="text-teal-600 font-medium">{idx + 1}.</span>
                                <span className="text-gray-700">{step}</span>
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end gap-2 ml-4">
                        {status !== undefined && (
                          <Badge
                            className={
                              status
                                ? 'bg-green-100 text-green-700'
                                : 'bg-red-100 text-red-700'
                            }
                          >
                            {status ? (
                              <>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {t.passed}
                              </>
                            ) : (
                              <>
                                <XCircle className="w-3 h-3 mr-1" />
                                {t.failed}
                              </>
                            )}
                          </Badge>
                        )}
                        
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleRunTest(scenario.id)}
                        >
                          <PlayCircle className="w-4 h-4 mr-1" />
                          {t.runTest}
                        </Button>
                      </div>
                    </div>
                  </Card>
                );
              })}
            </TabsContent>

            <TabsContent value="instructions">
              <Card className="p-6 bg-blue-50 border-blue-200">
                <div className="flex items-start gap-3 mb-4">
                  <Info className="w-6 h-6 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <h4 className="font-medium mb-1 text-blue-900">
                      {language === 'bn' 
                        ? 'টিকেট সিস্টেম কিভাবে টেস্ট করবেন'
                        : 'How to Test the Ticket System'}
                    </h4>
                    <p className="text-sm text-blue-700">
                      {language === 'bn'
                        ? 'নিচের ধাপগুলো অনুসরণ করুন:'
                        : 'Follow these steps:'}
                    </p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {[t.inst1, t.inst2, t.inst3, t.inst4, t.inst5].map((instruction, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <div className="w-6 h-6 rounded-full bg-blue-600 text-white flex items-center justify-center text-sm flex-shrink-0">
                        {idx + 1}
                      </div>
                      <p className="text-gray-700 pt-0.5">{instruction}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-6 p-4 bg-white rounded-lg border border-blue-200">
                  <h5 className="font-medium mb-2 text-blue-900">
                    {language === 'bn' ? 'গুরুত্বপূর্ণ নোট:' : 'Important Note:'}
                  </h5>
                  <ul className="space-y-2 text-sm text-gray-700">
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>
                        {language === 'bn'
                          ? 'প্রতিটি ইউজার টাইপের জন্য আলাদা ফিচার রয়েছে'
                          : 'Each user type has different features'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>
                        {language === 'bn'
                          ? 'এডমিন সব টিকেট দেখতে এবং পরিচালনা করতে পারেন'
                          : 'Admin can view and manage all tickets'}
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-teal-600 mt-1">•</span>
                      <span>
                        {language === 'bn'
                          ? 'সব ফিচার বাংলা ও ইংরেজি উভয় ভাষায় কাজ করে'
                          : 'All features work in both Bengali and English'}
                      </span>
                    </li>
                  </ul>
                </div>
              </Card>
            </TabsContent>
          </Tabs>
        </Card>
      </div>

      {/* Ticket System Dialog */}
      <UniversalTicketSystem
        open={showTicketSystem}
        onOpenChange={setShowTicketSystem}
        language={language}
        userId={currentUser.id}
        userName={currentUser.name}
        userRole={currentUser.role}
      />
    </div>
  );
}
