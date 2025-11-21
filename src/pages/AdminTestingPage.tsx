import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Terminal, Database, Mail, Bell, Zap, Ticket, ArrowUp, LogIn } from 'lucide-react';
import { APITestingDashboard } from '../components/APITestingDashboard';
import { TalentTutorLogo } from '../components/TalentTutorLogo';
import { DemoDataInitializer } from '../components/DemoDataInitializer';
import { TicketSystemTester } from '../components/TicketSystemTester';
import { ScrollToTopTester } from '../components/ScrollToTopTester';
import { DashboardConnectivityTester } from '../components/DashboardConnectivityTester';
import { LoginDebugger } from '../components/LoginDebugger';

interface AdminTestingPageProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
}

export function AdminTestingPage({ language, setPage }: AdminTestingPageProps) {
  const [activeTab, setActiveTab] = useState('connectivity');

  const content = {
    bn: {
      title: 'টেস্টিং ও ডেভেলপমেন্ট',
      subtitle: 'সিস্টেম টেস্টিং এবং ডিবাগিং টুলস',
      backToDashboard: 'ড্যাশবোর্ডে ফিরুন',
      connectivityTesting: 'ড্যাশবোর্ড সংযোগ',
      loginDebugger: 'লগইন ডিবাগার',
      apiTesting: 'API টেস্টিং',
      databaseTesting: 'ডেটাবেস টেস্টিং',
      ticketSystemTesting: 'টিকেট সিস্টেম টেস্টিং',
      scrollToTopTesting: 'ScrollToTop টেস্টিং',
      emailTesting: 'ইমেইল টেস্টিং',
      notificationTesting: 'নোটিফিকেশন টেস্টিং',
      performanceTesting: 'পারফরম্যান্স টেস্টিং',
    },
    en: {
      title: 'Testing & Development',
      subtitle: 'System Testing and Debugging Tools',
      backToDashboard: 'Back to Dashboard',
      connectivityTesting: 'Dashboard Connectivity',
      loginDebugger: 'Login Debugger',
      apiTesting: 'API Testing',
      databaseTesting: 'Database Testing',
      ticketSystemTesting: 'Ticket System Testing',
      scrollToTopTesting: 'ScrollToTop Testing',
      emailTesting: 'Email Testing',
      notificationTesting: 'Notification Testing',
      performanceTesting: 'Performance Testing',
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
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-4 lg:grid-cols-8 mb-8">
            <TabsTrigger value="connectivity" className="gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">{t.connectivityTesting}</span>
              <span className="sm:hidden">Connect</span>
            </TabsTrigger>
            <TabsTrigger value="api" className="gap-2">
              <Terminal className="w-4 h-4" />
              <span className="hidden sm:inline">{t.apiTesting}</span>
              <span className="sm:hidden">API</span>
            </TabsTrigger>
            <TabsTrigger value="database" className="gap-2">
              <Database className="w-4 h-4" />
              <span className="hidden sm:inline">{t.databaseTesting}</span>
              <span className="sm:hidden">DB</span>
            </TabsTrigger>
            <TabsTrigger value="tickets" className="gap-2">
              <Ticket className="w-4 h-4" />
              <span className="hidden sm:inline">{t.ticketSystemTesting}</span>
              <span className="sm:hidden">Ticket</span>
            </TabsTrigger>
            <TabsTrigger value="scroll" className="gap-2">
              <ArrowUp className="w-4 h-4" />
              <span className="hidden sm:inline">{t.scrollToTopTesting}</span>
              <span className="sm:hidden">Scroll</span>
            </TabsTrigger>
            <TabsTrigger value="email" className="gap-2">
              <Mail className="w-4 h-4" />
              <span className="hidden sm:inline">{t.emailTesting}</span>
              <span className="sm:hidden">Email</span>
            </TabsTrigger>
            <TabsTrigger value="notification" className="gap-2">
              <Bell className="w-4 h-4" />
              <span className="hidden sm:inline">{t.notificationTesting}</span>
              <span className="sm:hidden">Notif</span>
            </TabsTrigger>
            <TabsTrigger value="performance" className="gap-2">
              <Zap className="w-4 h-4" />
              <span className="hidden sm:inline">{t.performanceTesting}</span>
              <span className="sm:hidden">Perf</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="connectivity">
            <DashboardConnectivityTester language={language} />
          </TabsContent>

          <TabsContent value="api">
            <APITestingDashboard language={language} />
          </TabsContent>

          <TabsContent value="database">
            <DemoDataInitializer language={language} />
          </TabsContent>

          <TabsContent value="tickets">
            <TicketSystemTester language={language} />
          </TabsContent>

          <TabsContent value="scroll">
            <ScrollToTopTester />
          </TabsContent>

          <TabsContent value="email">
            <Card className="p-8">
              <div className="text-center">
                <Mail className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl mb-2">Email Testing</h3>
                <p className="text-gray-600 mb-4">
                  Test email templates, delivery, and tracking
                </p>
                <Badge>Coming Soon</Badge>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="notification">
            <Card className="p-8">
              <div className="text-center">
                <Bell className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl mb-2">Notification Testing</h3>
                <p className="text-gray-600 mb-4">
                  Test push notifications, in-app notifications, and delivery
                </p>
                <Badge>Coming Soon</Badge>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="performance">
            <Card className="p-8">
              <div className="text-center">
                <Zap className="w-16 h-16 mx-auto mb-4 text-gray-400" />
                <h3 className="text-xl mb-2">Performance Testing</h3>
                <p className="text-gray-600 mb-4">
                  Test system performance, load testing, and optimization
                </p>
                <Badge>Coming Soon</Badge>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
