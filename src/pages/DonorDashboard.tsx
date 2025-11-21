import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ScrollArea } from '../components/ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { CardAvatar } from '../components/ui/profile-avatar';
import {
  Home,
  Heart,
  Book,
  BookOpen,
  TrendingUp,
  Users,
  DollarSign,
  Calendar,
  Award,
  LogOut,
  Bell,
  ArrowLeft,
  Download,
  Eye,
  GraduationCap,
  Target,
  Gift,
  FileText,
  Share2,
  ArrowUpRight,
  RefreshCw,
  MessageSquare,
  PlusCircle,
  Video,
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { NotificationCenter } from '../components/NotificationCenter';
import { DonationCertificate } from '../components/DonationCertificate';
import { MonthlyDonationReport } from '../components/MonthlyDonationReport';
import { DonationSocialShare } from '../components/DonationSocialShare';
import { ZakatCalculator } from '../components/ZakatCalculator';
import { TicketSystem } from '../components/TicketSystem';
import { TalentTutorLogo } from '../components/TalentTutorLogo';

import { AdminNoticeViewer } from '../components/AdminNoticeViewer';
import { StudentProfileViewer } from '../components/StudentProfileViewer';
import { PaymentGatewayDialog } from '../components/PaymentGatewayDialog';
import { QuickDemoDataButton } from '../components/QuickDemoDataButton';
import { DonorRequestInbox } from '../components/DonorRequestInbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../components/ui/dialog';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { type User, type UserRole } from '../utils/authGuard';

interface DonorDashboardProps {
  language: 'bn' | 'en';
  onLogout: () => void;
  setPage: (page: string) => void;
  currentUser?: User | any;
  isAuthenticated?: boolean;
  onLogin?: (type: UserRole) => void;
}

const content = {
  bn: {
    dashboard: 'ড্যাশবোর্ড',
    myDonations: 'আমার দান',
    requests: 'প্রাপ্ত অনুরোধ',
    impact: 'প্রভাব রিপোর্ট',
    beneficiaries: 'সুবিধাভোগী',
    certificates: 'সার্টিফিকেট',
    logout: 'লগআউট',
    welcome: 'স্বাগতম',
    totalDonated: 'মোট দান',
    studentsHelped: 'উপকৃত ছাত্র',
    booksdonated: 'দান করা বই',
    activeCampaigns: 'সক্রিয় ক্যাম্পেইন',
    thisMonth: 'এই মাসে',
    thisYear: 'এই বছরে',
    allTime: 'সর্বমোট',
    donationHistory: 'দান ইতিহাস',
    impactStories: 'প্রভাবের গল্প',
    donationType: 'দানের ধরন',
    amount: 'পরিমাণ',
    date: 'তারিখ',
    status: 'স্ট্যাটাস',
    viewReceipt: 'রসিদ দেখুন',
    downloadCertificate: 'সার্টিফিকেট ডাউনলোড',
    backToHome: 'হোমে ফিরুন',
    studentName: 'ছাত্রের নাম',
    progress: 'অগ্রগতি',
    currentStatus: 'বর্তমান অবস্থা',
    fundedBy: 'অর্থায়ন',
    yourImpact: 'আপনার প্রভাব',
    monthlyBreakdown: 'মাসিক বিবরণ',
    makeADonation: 'দান করুন',
    shareImpact: 'শেয়ার করুন',
    taxBenefit: 'ট্যাক্স সুবিধা',
    support: 'সাপোর্ট',
  },
  en: {
    dashboard: 'Dashboard',
    myDonations: 'My Donations',
    requests: 'Received Requests',
    impact: 'Impact Report',
    beneficiaries: 'Beneficiaries',
    certificates: 'Certificates',
    logout: 'Logout',
    welcome: 'Welcome',
    totalDonated: 'Total Donated',
    studentsHelped: 'Students Helped',
    booksdonated: 'Books Donated',
    activeCampaigns: 'Active Campaigns',
    thisMonth: 'This Month',
    thisYear: 'This Year',
    allTime: 'All Time',
    donationHistory: 'Donation History',
    impactStories: 'Impact Stories',
    donationType: 'Donation Type',
    amount: 'Amount',
    date: 'Date',
    status: 'Status',
    viewReceipt: 'View Receipt',
    downloadCertificate: 'Download Certificate',
    backToHome: 'Back to Home',
    studentName: 'Student Name',
    progress: 'Progress',
    currentStatus: 'Current Status',
    fundedBy: 'Funded By',
    yourImpact: 'Your Impact',
    monthlyBreakdown: 'Monthly Breakdown',
    makeADonation: 'Make a Donation',
    shareImpact: 'Share Impact',
    taxBenefit: 'Tax Benefit',
    support: 'Support',
  },
};

// Mock data
const donationHistory = [
  { id: 1, type: 'যাকাত', amount: 5000, date: '২৫/০১/২০২৫', status: 'সম্পন্ন', receipt: '#DON12345', students: 1 },
  { id: 2, type: 'বই দান', amount: 0, quantity: '১০টি বই', date: '২০/০১/২০২৫', status: 'বিতরণ হয়েছে', receipt: '#DON12346', students: 3 },
  { id: 3, type: 'বৃত্তি', amount: 10000, date: '১৫/০১/২০২৫', status: 'সম্পন্ন', receipt: '#DON12347', students: 2 },
  { id: 4, type: 'যাকাত', amount: 3000, date: '১০/০১/২০২৫', status: 'সম্পন্ন', receipt: '#DON12348', students: 1 },
  { id: 5, type: 'স্টেশনারি', amount: 0, quantity: '৫ সেট', date: '০৫/০১/২০২৫', status: 'বিতরণ হয়েছে', receipt: '#DON12349', students: 5 },
];

const beneficiaries = [
  {
    id: 1,
    name: 'রিয়া খাতুন',
    class: 'ক্লাস ১০',
    school: 'সরকারি বালিকা উচ্চ বিদ্যালয়',
    subject: 'গণিত, পদার্থবিজ্ঞান',
    progress: 85,
    status: 'পড়াশোনা চলছে',
    fundedAmount: 5000,
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    location: 'ঢাকা',
    fundingDate: '১৫/০১/২০২৫',
  },
  {
    id: 2,
    name: 'আব্দুল করিম',
    class: 'ক্লাস ১০',
    school: 'মাধ্যমিক বিদ্যালয়',
    subject: 'পদার্থবিজ্ঞান',
    progress: 78,
    status: 'পড়াশোনা চলছে',
    fundedAmount: 10000,
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    location: 'চট্টগ্রাম',
    fundingDate: '১০/০১/২০২৫',
  },
  {
    id: 3,
    name: 'ফাতেমা বেগম',
    class: 'ক্লাস ৮',
    school: 'জুনিয়র হাই স্কুল',
    subject: 'ইংরেজি, গণিত',
    progress: 92,
    status: 'পড়াশোনা চলছে',
    fundedAmount: 3000,
    photo: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&q=80',
    location: 'সিলেট',
    fundingDate: '০৫/০১/২০২৫',
  },
];

const impactStories = [
  {
    id: 1,
    student: 'রিয়া খাতুন',
    message: 'আপনার দানের কারণে আমি এখন নিয়মিত পড়াশোনা চালিয়ে যেতে পারছি। আমার স্বপ্ন ডাক্তার হওয়া। আপনার সাহায্যের জন্য অসংখ্য ধন্যবাদ!',
    date: '২০/০১/২০২৫',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    id: 2,
    student: 'আব্দুল করিম',
    message: 'আপনার উদারতায় আমি বই পেয়েছি এবং এখন ভালোভাবে পড়তে পারছি। আমার রেজাল্ট আগের চেয়ে অনেক ভালো হয়েছে। আল্লাহ আপনার ভালো করুন।',
    date: '১৮/০১/২০২৫',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
  },
];

export function DonorDashboard({ language, onLogout, setPage, currentUser }: DonorDashboardProps) {
  const t = content[language];
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Donor type - 'zakat' or 'materials'
  // Get from currentUser or default to 'zakat'
  const donorType: 'zakat' | 'materials' = currentUser?.donorType || 'zakat';
  
  // Student Profile Viewer state
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showProfileViewer, setShowProfileViewer] = useState(false);
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [showDonationDialog, setShowDonationDialog] = useState(false);
  const [showDonationOptions, setShowDonationOptions] = useState(false);
  const [isLoadingApplications, setIsLoadingApplications] = useState(false);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  
  // Student applications that need help - fetch from backend
  const [studentApplications, setStudentApplications] = useState<any[]>([]);

  // Fetch approved student applications on mount
  useEffect(() => {
    fetchApprovedApplications();
  }, [donorType]);

  const fetchApprovedApplications = async () => {
    try {
      setIsLoadingApplications(true);
      
      // Check if user is logged in
      if (!currentUser?.id) {
        console.warn('No current user ID found');
        setIsLoadingApplications(false);
        return;
      }
      
      console.log(`🔍 Fetching applications for donor: ${currentUser.id}`);
      const url = `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/donor/${currentUser.id}/available-applications`;
      console.log(`📡 API URL: ${url}`);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });

      console.log(`📊 Response status: ${response.status}`);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`❌ API Error Response: ${errorText}`);
        throw new Error(`Failed to fetch applications: ${response.status} - ${errorText}`);
      }

      const data = await response.json();
      console.log(`✅ API Response:`, data);
      
      if (data.success && data.applications) {
        // Applications are already filtered by donor type on backend
        console.log(`✅ Setting ${data.applications.length} applications`);
        setStudentApplications(data.applications);
        
        if (data.applications.length === 0) {
          toast.info(language === 'bn' 
            ? 'কোনো approved application পাওয়া যায়নি। Demo data initialize করুন।' 
            : 'No approved applications found. Initialize demo data.'
          );
        } else {
          toast.success(language === 'bn'
            ? `${data.applications.length}টি application পাওয়া গেছে`
            : `Found ${data.applications.length} applications`
          );
        }
      } else {
        console.warn('⚠️ Response success is false or no applications:', data);
        setStudentApplications([]);
      }
    } catch (error) {
      console.error('❌ Error fetching donor applications:');
      console.error('Error details:', error);
      console.error('Current user:', currentUser);
      
      // Show error toast
      toast.error(language === 'bn'
        ? 'Applications লোড করতে সমস্যা হয়েছে। Demo data initialize করুন।'
        : 'Failed to load applications. Please initialize demo data.'
      );
      
      // Don't use fallback mock data - keep empty to show the real issue
      setStudentApplications([]);
    } finally {
      setIsLoadingApplications(false);
    }
  };

  const stats = {
    totalDonated: donationHistory.reduce((sum, d) => sum + (d.amount || 0), 0),
    studentsHelped: 12,
    booksdonated: 35,
    activeCampaigns: 3,
    thisMonthDonations: 5000,
    thisYearDonations: 18000,
  };

  const handleDownloadCertificate = (receiptId: string) => {
    toast.success(`সার্টিফিকেট ডাউনলোড হচ্ছে: ${receiptId}`);
  };

  const handleViewReceipt = (receiptId: string) => {
    toast.info(`রসিদ দেখাচ্ছে: ${receiptId}`);
  };
  
  const handleViewProfile = (application: any) => {
    setSelectedApplication(application);
    setShowProfileViewer(true);
  };
  
  const handleDonate = (applicationId: string, applicationType: string) => {
    const application = studentApplications.find(a => a.id === applicationId);
    if (!application) return;
    
    setShowProfileViewer(false);
    
    // For scholarship applications, go straight to payment
    if (applicationType === 'scholarship') {
      setShowPaymentGateway(true);
    } 
    // For materials, show options
    else if (applicationType === 'materials') {
      setShowDonationOptions(true);
    }
  };
  
  const handleDonationOption = (option: 'physical' | 'money') => {
    setShowDonationOptions(false);
    if (option === 'physical') {
      setShowDonationDialog(true);
    } else {
      setShowPaymentGateway(true);
    }
  };

  const handleDonationSuccess = () => {
    setShowDonationDialog(false);
    toast.success(language === 'bn' ? 'দান সফল হয়েছে! এডমিন যাচাই করবে।' : 'Donation successful! Admin will verify.');
    fetchApprovedApplications(); // Refresh applications list
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-pink-50 to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TalentTutorLogo size="md" showText={true} showSubtitle={false} />
              <div className="flex items-center gap-2">
                <p className="text-sm text-gray-500">দাতা ড্যাশবোর্ড</p>
                <Badge className={donorType === 'zakat' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'}>
                  {donorType === 'zakat' ? '💰 যাকাত' : '📚 উপকরণ'}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage('home')}
                className="gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span className="hidden sm:inline">{t.backToHome}</span>
              </Button>

              {donorType === 'zakat' && <ZakatCalculator language={language} />}

              <QuickDemoDataButton language={language} variant="ghost" />

              <DonationSocialShare
                donorName={currentUser?.name || 'জনাব আহমেদ'}
                totalDonations={stats.totalDonated}
                studentsHelped={stats.studentsHelped}
                booksdonated={stats.booksdonated}
              />

              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setPage('donation')}
                className={`gap-2 ${
                  donorType === 'zakat' 
                    ? 'bg-gradient-to-r from-rose-50 to-pink-50 border-rose-200' 
                    : 'bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200'
                }`}
              >
                {donorType === 'zakat' ? (
                  <Heart className="w-4 h-4 text-rose-600" />
                ) : (
                  <Book className="w-4 h-4 text-blue-600" />
                )}
                <span className={donorType === 'zakat' ? 'text-rose-700' : 'text-blue-700'}>
                  {donorType === 'zakat' ? t.makeADonation : 'বই দান করুন'}
                </span>
              </Button>

              <NotificationCenter 
                setPage={setPage}
                language={language}
                userRole="donor"
              />
              
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={handleLogout}
                title={language === 'bn' ? 'লগআউট' : 'Logout'}
              >
                <LogOut className="w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-4 sticky top-24">
              <div className="space-y-2">
                <Button
                  variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveTab('dashboard')}
                >
                  <Home className="w-4 h-4" />
                  {t.dashboard}
                </Button>

                <Button
                  variant={activeTab === 'applications' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border border-blue-200"
                  onClick={() => setActiveTab('applications')}
                >
                  <GraduationCap className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700 flex-1 text-left">
                    {language === 'bn' ? 'ছাত্রদের আবেদন' : 'Student Applications'}
                  </span>
                  <Badge className="bg-blue-500 text-white">
                    {donorType === 'zakat' 
                      ? studentApplications.length 
                      : studentApplications.filter(a => a.applicationType === 'materials').length}
                  </Badge>
                </Button>

                <Button
                  variant={activeTab === 'donations' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveTab('donations')}
                >
                  <DollarSign className="w-4 h-4" />
                  {t.myDonations}
                </Button>

                <Button
                  variant={activeTab === 'requests' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-green-200"
                  onClick={() => setActiveTab('requests')}
                >
                  <MessageSquare className="w-4 h-4 text-green-600" />
                  <span className="text-green-700">{t.requests}</span>
                </Button>

                <Button
                  variant={activeTab === 'impact' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveTab('impact')}
                >
                  <TrendingUp className="w-4 h-4" />
                  {t.impact}
                </Button>

                <Button
                  variant={activeTab === 'beneficiaries' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveTab('beneficiaries')}
                >
                  <Users className="w-4 h-4" />
                  {t.beneficiaries}
                  <Badge className="ml-auto">{studentApplications.length}</Badge>
                </Button>

                <Button
                  variant={activeTab === 'certificates' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveTab('certificates')}
                >
                  <Award className="w-4 h-4" />
                  {t.certificates}
                </Button>

                <Button
                  variant={activeTab === 'support' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => setActiveTab('support')}
                >
                  <Bell className="w-4 h-4" />
                  {t.support}
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Dashboard Tab */}
            {activeTab === 'dashboard' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {t.welcome}, {currentUser?.name || 'জনাব আহমেদ'}!
                  </h2>
                  <p className="text-gray-600">
                    {donorType === 'zakat' 
                      ? 'আপনার দানের প্রভাব দেখুন এবং আরো শিক্ষার্থীদের সাহায্য করুন'
                      : 'আপনার দানকৃত শিক্ষা উপকরণের প্রভাব দেখুন'}
                  </p>
                </div>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-4 gap-4">
                  {donorType === 'zakat' && (
                    <Card className="p-6 bg-gradient-to-br from-rose-500 to-pink-500 text-white">
                      <div className="flex items-center justify-between mb-3">
                        <DollarSign className="w-8 h-8 opacity-80" />
                        <Badge className="bg-white/20 text-white border-0">
                          {t.allTime}
                        </Badge>
                      </div>
                      <div className="text-3xl font-bold mb-1">৳{(stats.totalDonated / 1000).toFixed(0)}K</div>
                      <div className="text-sm opacity-90">{t.totalDonated}</div>
                    </Card>
                  )}

                  <Card className="p-6 bg-gradient-to-br from-teal-500 to-emerald-500 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <Users className="w-8 h-8 opacity-80" />
                      <Badge className="bg-white/20 text-white border-0">
                        <ArrowUpRight className="w-3 h-3" />
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.studentsHelped}</div>
                    <div className="text-sm opacity-90">{t.studentsHelped}</div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <Book className="w-8 h-8 opacity-80" />
                      <Badge className="bg-white/20 text-white border-0">
                        Books
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.booksdonated}</div>
                    <div className="text-sm opacity-90">{t.booksdonated}</div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-orange-500 to-amber-500 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <Target className="w-8 h-8 opacity-80" />
                      <Badge className="bg-white/20 text-white border-0">
                        Active
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.activeCampaigns}</div>
                    <div className="text-sm opacity-90">{t.activeCampaigns}</div>
                  </Card>
                </div>

                {/* Donor Type Info */}
                {donorType === 'materials' && (
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-xl flex items-center justify-center flex-shrink-0">
                        <BookOpen className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg text-gray-900 mb-1">📚 শিক্ষা উপকরণ দাতা</h3>
                        <p className="text-gray-600 text-sm">
                          আপনি শুধুমাত্র বই, খাতা, কলম এবং অন্যান্য শিক্ষা উপকরণ দান করেন। কোন আর্থিক লেনদেন নেই। 
                          আপনার দানকৃত উপকরণ ��রাসরি অভাবী শিক্ষার্থীদের কাছে পৌঁছায়।
                        </p>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Monthly Impact */}
                <div className="grid md:grid-cols-2 gap-6">
                  {donorType === 'zakat' && (
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{t.thisMonth}</h3>
                        <Badge className="bg-green-100 text-green-700">সক্রিয়</Badge>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-3">
                        ৳{stats.thisMonthDonations.toLocaleString()}
                      </div>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span className="text-gray-600">উপকৃত ছাত্র</span>
                        <span className="font-semibold">২ জন</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">দানের সংখ্যা</span>
                        <span className="font-semibold">১ টি</span>
                      </div>
                    </div>
                    </Card>
                  )}

                  {donorType === 'zakat' ? (
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">{t.thisYear}</h3>
                        <Badge className="bg-blue-100 text-blue-700">২০২৫</Badge>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-3">
                        ৳{stats.thisYearDonations.toLocaleString()}
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">মোট দান</span>
                          <span className="font-semibold">৪ টি</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">ট্যাক্স সেভিং</span>
                          <span className="font-semibold text-green-600">৳৪,৫০০</span>
                        </div>
                      </div>
                    </Card>
                  ) : (
                    <Card className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="font-semibold">এই মাসে দান</h3>
                        <Badge className="bg-blue-100 text-blue-700">���পকরণ</Badge>
                      </div>
                      <div className="text-3xl font-bold text-gray-900 mb-3">
                        {stats.booksdonated} টি বই
                      </div>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">খাতা ও স্টেশনারি</span>
                          <span className="font-semibold">১৫ টি</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">উপকৃত ছাত্র</span>
                          <span className="font-semibold text-green-600">৮ জন</span>
                        </div>
                      </div>
                    </Card>
                  )}
                </div>

                {/* Admin Notice Board */}
                <AdminNoticeViewer language={language} userRole="donor" />

                {/* Monthly Report */}
                <MonthlyDonationReport
                  month="জানুয়ারি"
                  year="২০২৫"
                  totalDonations={stats.thisMonthDonations}
                  donationsCount={1}
                  studentsHelped={2}
                  booksdonated={0}
                  monthlyGoal={10000}
                  previousMonthTotal={12000}
                />

                {/* Impact Stories Preview */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold">{t.impactStories}</h3>
                    <Button variant="ghost" size="sm" onClick={() => setActiveTab('impact')}>
                      সব দেখুন
                    </Button>
                  </div>
                  <div className="space-y-4">
                    {impactStories.slice(0, 2).map((story) => (
                      <Card key={story.id} className="p-4 bg-gradient-to-r from-rose-50 to-pink-50">
                        <div className="flex items-start gap-3">
                          <img 
                            src={story.photo}
                            alt={story.student}
                            className="w-12 h-12 rounded-full object-cover"
                          />
                          <div className="flex-1">
                            <div className="flex items-center justify-between mb-2">
                              <h4 className="font-semibold text-gray-900">{story.student}</h4>
                              <span className="text-xs text-gray-500">{story.date}</span>
                            </div>
                            <p className="text-sm text-gray-700 line-clamp-2">{story.message}</p>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </Card>

                {/* Materials Donor Guide */}
                {donorType === 'materials' && (
                  <Card className="p-6 bg-gradient-to-br from-blue-500 to-cyan-500 text-white">
                    <div className="flex items-start gap-4">
                      <Book className="w-12 h-12 opacity-80 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">📚 বই দান করার নির্দেশিকা</h3>
                        <div className="text-blue-100 mb-4 space-y-2 text-sm">
                          <p>✅ বই পরিষ্কার ও ভালো অবস্থায় থাকতে হবে</p>
                          <p>✅ পাঠ্যবই, গল্পের বই, রেফারেন্স বই সব গ্রহণযোগ্য</p>
                          <p>✅ খাতা, কলম, পেন্সিল, স্কেল ইত্যাদিও দান করতে পারবেন</p>
                          <p>✅ পুরনো বা ছেঁড়া বই মেরামত করে দিলে ভালো হবে</p>
                        </div>
                        <div className="flex gap-3">
                          <Button 
                            className="bg-white text-blue-600 hover:bg-gray-100"
                            onClick={() => setPage('donation')}
                          >
                            <Book className="w-4 h-4 mr-2" />
                            বই দান করুন
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-white text-white hover:bg-white/10"
                            onClick={() => setActiveTab('applications')}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            আবেদন দেখুন
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Call to Action for Zakat Donors */}
                {donorType === 'zakat' && (
                  <Card className="p-6 bg-gradient-to-r from-rose-500 to-teal-500 text-white">
                    <div className="flex items-start gap-4">
                      <Gift className="w-12 h-12 opacity-80 flex-shrink-0" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-white mb-2">আরও শিক্ষার্থীদের সাহায্য করুন</h3>
                        <p className="text-rose-100 mb-4">
                          এখনও ১৫ ���ন শিক্ষার্থী আপনার সাহায্যের জন্য অপেক্ষা করছে। 
                          তাদের স্বপ্ন পূরণে সাহায্য করুন।
                        </p>
                        <div className="flex gap-3">
                          <Button 
                            className="bg-white text-rose-600 hover:bg-gray-100"
                            onClick={() => setPage('donation')}
                          >
                            <Heart className="w-4 h-4 mr-2" />
                            দান করুন
                          </Button>
                          <Button 
                            variant="outline" 
                            className="border-white text-[rgb(9,8,8)] hover:bg-white/10"
                            onClick={() => setActiveTab('beneficiaries')}
                          >
                            <Eye className="w-4 h-4 mr-2" />
                            ছাত্রদের দেখুন
                          </Button>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <DonorRequestInbox 
                  language={language}
                  currentUser={currentUser}
                />
              </motion.div>
            )}

            {/* Donations Tab */}
            {activeTab === 'donations' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-xl font-semibold">{t.donationHistory}</h2>
                    <p className="text-sm text-gray-600 mt-1">
                      {donorType === 'zakat' 
                        ? 'আপনার সকল দান ও লেনদেনের ইতিহাস'
                        : 'আপনার দানকৃত শিক্ষা উপকরণের তালিকা'}
                    </p>
                  </div>
                  <Badge className={donorType === 'zakat' ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'}>
                    {donorType === 'zakat' ? '💰 যাকাত' : '📚 উপকরণ'}
                  </Badge>
                </div>
                
                <Card className="p-6">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>রসিদ</TableHead>
                        <TableHead>{t.donationType}</TableHead>
                        <TableHead>{t.amount}</TableHead>
                        <TableHead>উপকৃত</TableHead>
                        <TableHead>{t.date}</TableHead>
                        <TableHead>{t.status}</TableHead>
                        <TableHead>Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {donationHistory
                        .filter(donation => {
                          if (donorType === 'materials') {
                            // Materials donors only see book/materials donations
                            return donation.type === 'বই' || donation.type === 'শিক্ষা উপকরণ';
                          }
                          return true; // Zakat donors see all
                        })
                        .map((donation) => (
                        <TableRow key={donation.id}>
                          <TableCell className="font-mono text-sm">{donation.receipt}</TableCell>
                          <TableCell className="font-medium">{donation.type}</TableCell>
                          <TableCell>
                            {donation.amount > 0 
                              ? `৳${donation.amount.toLocaleString()}`
                              : donation.quantity
                            }
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{donation.students} জন</Badge>
                          </TableCell>
                          <TableCell>{donation.date}</TableCell>
                          <TableCell>
                            <Badge className="bg-green-600">{donation.status}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleViewReceipt(donation.receipt)}
                              >
                                <Eye className="w-3 h-3 mr-1" />
                                রসিদ
                              </Button>
                              <Button 
                                size="sm" 
                                variant="outline"
                                onClick={() => handleDownloadCertificate(donation.receipt)}
                              >
                                <Download className="w-3 h-3 mr-1" />
                                সার্টিফিকেট
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </Card>

                {/* Tax Benefit Card - Only for Zakat Donors */}
                {donorType === 'zakat' && (
                  <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-green-500 rounded-full">
                        <FileText className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">{t.taxBenefit}</h3>
                        <p className="text-sm text-gray-700 mb-3">
                          আপনার মোট দান: ৳{stats.totalDonated.toLocaleString()}<br/>
                          সম্ভাব্য ট্যাক্স সাশ্রয়: ৳{(stats.totalDonated * 0.25).toLocaleString()} (২৫%)
                        </p>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-2" />
                          ট্যাক্স সার্টিফিকেট ডাউনলোড
                        </Button>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Social Share Sticker - For Materials Donors */}
                {donorType === 'materials' && (
                  <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
                    <div className="flex items-start gap-4">
                      <div className="p-3 bg-blue-500 rounded-full">
                        <Share2 className="w-6 h-6 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="font-semibold text-gray-900 mb-2">
                          {language === 'bn' ? 'সোশ্যাল মিডিয়ায় শেয়ার করুন' : 'Share on Social Media'}
                        </h3>
                        <p className="text-sm text-gray-700 mb-3">
                          {language === 'bn' 
                            ? 'আপনার দানের প্রভ��ব সোশ্যাল মিডিয়ায় শেয়ার করে অন্যদের অনুপ্রাণিত করুন। একটি সুন্দর স্টিকার ডাউনলোড করুন।'
                            : 'Share your donation impact on social media to inspire others. Download a beautiful sticker.'}
                        </p>
                        <DonationSocialShare
                          donorName={currentUser?.name || 'জনাব আহমেদ'}
                          totalDonations={0}
                          studentsHelped={stats.studentsHelped}
                          booksdonated={stats.booksdonated}
                          trigger={
                            <Button size="sm" className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                              <Download className="w-4 h-4 mr-2" />
                              {language === 'bn' ? 'স্টিকার ডাউনলোড করুন' : 'Download Sticker'}
                            </Button>
                          }
                        />
                      </div>
                    </div>
                  </Card>
                )}
              </motion.div>
            )}

            {/* Beneficiaries Tab */}
            {activeTab === 'beneficiaries' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{t.beneficiaries}</h2>
                  <Badge variant="outline">
                    {studentApplications.length} {language === 'bn' ? 'জন' : 'students'}
                  </Badge>
                </div>

                {/* Filter Info */}
                {donorType === 'materials' && (
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <p className="text-sm text-gray-700">
                      <Book className="w-4 h-4 inline mr-2 text-blue-600" />
                      {language === 'bn' 
                        ? 'আপনি শুধু বই ও শিক্ষা উপকরণ চাহিদা সম্পন্ন শিক্ষার্থীদের দেখছেন'
                        : 'You are viewing only students who need books & materials'}
                    </p>
                  </Card>
                )}
                
                <div className="grid md:grid-cols-2 gap-6">
                  {isLoadingApplications ? (
                    <div className="col-span-2 text-center py-12 text-gray-500">
                      <RefreshCw className="w-16 h-16 mx-auto mb-4 text-gray-300 animate-spin" />
                      <p className="text-lg">
                        {language === 'bn' 
                          ? 'আবেদন লোড হচ্ছে...' 
                          : 'Loading applications...'}
                      </p>
                    </div>
                  ) : studentApplications.length === 0 ? (
                    <div className="col-span-2 text-center py-12 text-gray-500">
                      <Users className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                      <p className="text-lg mb-2">
                        {language === 'bn' 
                          ? 'এখনও কোনো আবেদন নেই' 
                          : 'No applications yet'}
                      </p>
                      <p className="text-sm text-gray-400 mb-4">
                        {language === 'bn'
                          ? 'Demo data initialize করুন তথ্য দেখার জন্য'
                          : 'Initialize demo data to see information'}
                      </p>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={fetchApprovedApplications}
                        className="gap-2"
                      >
                        <RefreshCw className="w-4 h-4" />
                        {language === 'bn' ? 'রিফ্রেশ করুন' : 'Refresh'}
                      </Button>
                    </div>
                  ) : (
                    studentApplications.map((student) => (
                    <Card key={student.id} className={`p-6 hover:shadow-lg transition-shadow border-l-4 ${
                      student.applicationType === 'materials' ? 'border-l-blue-500' : 'border-l-emerald-500'
                    }`}>
                      <div className="flex items-start gap-4 mb-4">
                        <div className="relative">
                          <CardAvatar 
                            src={student.studentPhoto}
                            alt={student.studentName}
                            fallback={student.studentName?.charAt(0) || 'S'}
                            size="lg"
                          />
                          <div className={`absolute -bottom-1 -right-1 w-6 h-6 rounded-full flex items-center justify-center ${
                            student.applicationType === 'materials' ? 'bg-blue-500' : 'bg-emerald-500'
                          }`}>
                            {student.applicationType === 'materials' ? (
                              <Book className="w-3 h-3 text-white" />
                            ) : (
                              <Heart className="w-3 h-3 text-white" fill="white" />
                            )}
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-1">
                            <div>
                              <h3 className="font-semibold text-lg text-gray-900">{student.studentName}</h3>
                              <p className="text-sm text-gray-600">{student.class}</p>
                            </div>
                            <Badge className={
                              student.applicationType === 'materials'
                                ? 'bg-blue-100 text-blue-700 border-blue-300'
                                : 'bg-emerald-100 text-emerald-700 border-emerald-300'
                            }>
                              {student.applicationType === 'scholarship' && '💰 বৃত্তি'}
                              {student.applicationType === 'materials' && '📚 উপকরণ'}
                              {student.applicationType === 'tuition' && '🎓 টিউশন'}
                            </Badge>
                          </div>
                          {student.subject && (
                            <Badge variant="outline" className="mt-1">{student.subject}</Badge>
                          )}
                        </div>
                      </div>

                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">স্কুল</span>
                          <span className="text-gray-900 text-right text-xs">{student.school}</span>
                        </div>

                        {student.address && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">ঠিকানা</span>
                            <span className="text-gray-900 text-right text-xs">{student.address}</span>
                          </div>
                        )}

                        {donorType === 'zakat' && student.amount && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">প্রয়োজন</span>
                            <span className="font-semibold text-emerald-600">৳{student.amount.toLocaleString()}</span>
                          </div>
                        )}

                        {student.applicationType === 'materials' && student.itemsNeeded && (
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">প্রয়োজনীয় জিনিস</span>
                            <span className="text-gray-900 text-right text-xs">{student.itemsNeeded}</span>
                          </div>
                        )}

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">জমা দেওয়া</span>
                          <span className="text-gray-900">{student.submittedDate || 'N/A'}</span>
                        </div>

                        <div className="flex justify-between text-sm">
                          <span className="text-gray-600">স্ট্যাটাস</span>
                          <Badge className="bg-green-100 text-green-700">
                            {student.status || 'অনুমোদিত'}
                          </Badge>
                        </div>
                      </div>

                      <Button 
                        variant="outline" 
                        className="w-full mt-4" 
                        size="sm"
                        onClick={() => {
                          handleViewProfile(student);
                        }}
                      >
                        <Eye className="w-4 h-4 mr-2" />
                        বিস্তারিত দেখুন
                      </Button>
                    </Card>
                  )))}
                </div>
              </motion.div>
            )}

            {/* Impact Tab */}
            {activeTab === 'impact' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <h2 className="text-xl font-semibold">{t.impactStories}</h2>
                  <Button variant="outline" size="sm">
                    <Share2 className="w-4 h-4 mr-2" />
                    {t.shareImpact}
                  </Button>
                </div>

                {impactStories.map((story) => (
                  <Card key={story.id} className="p-6">
                    <div className="flex items-start gap-4">
                      <CardAvatar 
                        src={story.photo}
                        alt={story.student}
                        fallback={story.student.charAt(0)}
                        size="lg"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-3">
                          <div>
                            <h3 className="font-semibold text-lg text-gray-900">{story.student}</h3>
                            <p className="text-sm text-gray-500">{story.date}</p>
                          </div>
                          <Heart className="w-6 h-6 text-rose-500" />
                        </div>
                        <p className="text-gray-700 leading-relaxed">{story.message}</p>
                      </div>
                    </div>
                  </Card>
                ))}

                {/* Overall Impact Summary */}
                <Card className="p-6 bg-gradient-to-r from-teal-50 to-rose-50">
                  <h3 className="font-semibold mb-4">{t.yourImpact}</h3>
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center p-4 bg-white rounded-lg">
                      <GraduationCap className="w-8 h-8 mx-auto mb-2 text-[#10B981]" />
                      <div className="text-gray-900">12</div>
                      <div className="text-sm text-gray-600">শিক্ষার্থী</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Book className="w-8 h-8 mx-auto mb-2 text-blue-600" />
                      <div className="text-2xl font-bold text-gray-900">35</div>
                      <div className="text-sm text-gray-600">বই প্রদান</div>
                    </div>
                    <div className="text-center p-4 bg-white rounded-lg">
                      <Award className="w-8 h-8 mx-auto mb-2 text-amber-600" />
                      <div className="text-2xl font-bold text-gray-900">৪.৮</div>
                      <div className="text-sm text-gray-600">গড় উ��্নতি</div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Certificates Tab */}
            {activeTab === 'certificates' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold">{t.certificates}</h2>

                <div className="space-y-6">
                  {donationHistory.filter(d => d.amount > 0).map((donation) => (
                    <DonationCertificate
                      key={donation.id}
                      donorName="জনাব আহমেদ"
                      donationAmount={donation.amount}
                      donationType={donation.type}
                      donationDate={donation.date}
                      receiptNumber={donation.receipt}
                      studentsHelped={donation.students}
                    />
                  ))}
                </div>
              </motion.div>
            )}

            {/* Student Applications Tab */}
            {activeTab === 'applications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {language === 'bn' ? 'ছাত্রদের আবেদন' : 'Student Applications'}
                    </h2>
                    <p className="text-gray-600">
                      {donorType === 'zakat' 
                        ? (language === 'bn' ? 'যে ছাত্ররা আপনার সাহায্য প্রয়োজন' : 'Students who need your help')
                        : (language === 'bn' ? 'যে ছাত্ররা বই ও উপকরণ প্রয়োজন' : 'Students who need books & materials')}
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={fetchApprovedApplications}
                    disabled={isLoadingApplications}
                  >
                    <RefreshCw className={`w-4 h-4 mr-2 ${isLoadingApplications ? 'animate-spin' : ''}`} />
                    {language === 'bn' ? 'রিফ্রেশ' : 'Refresh'}
                  </Button>
                </div>

                {/* Filter Info */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                      donorType === 'zakat' ? 'bg-emerald-500' : 'bg-blue-500'
                    }`}>
                      {donorType === 'zakat' ? (
                        <Heart className="w-5 h-5 text-white" />
                      ) : (
                        <Book className="w-5 h-5 text-white" />
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-1">
                        {donorType === 'zakat' ? 
                          (language === 'bn' ? 'যাকাত দাতা হিসেবে' : 'As Zakat Donor') :
                          (language === 'bn' ? 'শিক্ষা উপকরণ দাতা হিসেবে' : 'As Materials Donor')}
                      </h3>
                      <p className="text-sm text-gray-700">
                        {donorType === 'zakat' ? 
                          (language === 'bn' ? 'আপনি সব ধরনের আবেদন (বৃত্তি, বই, টিউশন) দেখতে এবং সাহায্য করতে পারবেন' : 
                           'You can see all types of applications (scholarship, books, tuition) and help') :
                          (language === 'bn' ? 'আপনি শুধু বই ও শিক্ষা উপকরণ সংক্রান্ত আবেদন দেখছেন। আর্থিক তথ্য লুকানো আছে।' :
                           'You see only book & materials applications. Financial information is hidden.')}
                      </p>
                    </div>
                  </div>
                </Card>

                {/* Applications Count */}
                {!isLoadingApplications && studentApplications.length > 0 && (
                  <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-emerald-500 rounded-full flex items-center justify-center">
                          <Users className="w-5 h-5 text-white" />
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">
                            {language === 'bn' ? 'মোট আবেদন' : 'Total Applications'}
                          </p>
                          <p className="text-2xl font-bold text-gray-900">
                            {studentApplications.filter(app => 
                              donorType === 'zakat' || app.applicationType === 'materials'
                            ).length}
                          </p>
                        </div>
                      </div>
                      <Badge className="bg-emerald-500">
                        {language === 'bn' ? 'সাহায্যের অপেক্ষায়' : 'Waiting for Help'}
                      </Badge>
                    </div>
                  </Card>
                )}

                {/* Loading State */}
                {isLoadingApplications && (
                  <Card className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin" />
                      <p className="text-gray-600">
                        {language === 'bn' ? 'আবেদন লোড হচ্ছে...' : 'Loading applications...'}
                      </p>
                    </div>
                  </Card>
                )}
                
                {/* Empty State */}
                {!isLoadingApplications && studentApplications.length === 0 && (
                  <Card className="p-12 text-center">
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-gray-400" />
                      </div>
                      <h3 className="font-semibold text-gray-900">
                        {language === 'bn' ? 'কোন আবেদন নেই' : 'No Applications'}
                      </h3>
                      <p className="text-gray-600 max-w-md">
                        {language === 'bn' 
                          ? 'এই মুহূর্তে কোন ছাত্র আবেদন নেই। নতুন আবেদন আসলে আপনি notification পাবেন।' 
                          : 'No student applications at this moment. You will be notified when new applications arrive.'}
                      </p>
                    </div>
                  </Card>
                )}

                {/* Applications List */}
                {!isLoadingApplications && (
                  <div className="space-y-4">
                    {studentApplications
                      .filter(app => donorType === 'zakat' || app.applicationType === 'materials')
                      .map((app) => (
                      <Card key={app.id} className="p-6 hover:shadow-lg transition-shadow">
                        <div className="flex items-start gap-4">
                          <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-emerald-500 rounded-full flex items-center justify-center flex-shrink-0">
                            <GraduationCap className="w-8 h-8 text-white" />
                          </div>
                          
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h3 className="text-lg font-semibold text-gray-900">{app.studentName}</h3>
                                <p className="text-sm text-gray-600">{app.class} • {app.school}</p>
                              </div>
                              <Badge className={
                                app.applicationType === 'scholarship' ? 'bg-emerald-100 text-emerald-700' :
                                app.applicationType === 'materials' ? 'bg-blue-100 text-blue-700' :
                                'bg-purple-100 text-purple-700'
                              }>
                                {app.applicationType === 'scholarship' ? '💰 বৃত্তি' :
                                 app.applicationType === 'materials' ? '📚 বই' :
                                 '🎓 টিউশন'}
                              </Badge>
                            </div>

                            {/* Application Details */}
                            <div className="space-y-2 mb-4">
                              {donorType === 'zakat' && app.amount && (
                                <div className="flex items-center gap-2">
                                  <DollarSign className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-700">
                                    প্রয়োজনীয় পরিমাণ: <strong className="text-emerald-600">৳{app.amount.toLocaleString()}</strong>
                                  </span>
                                  {app.purpose && <span className="text-sm text-gray-500">({app.purpose})</span>}
                                </div>
                              )}
                              
                              {app.itemsNeeded && (
                                <div className="flex items-center gap-2">
                                  <Book className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-700">
                                    প্রয়োজন: <strong>{app.itemsNeeded}</strong>
                                  </span>
                                </div>
                              )}
                              
                              {app.quantity && (
                                <div className="flex items-center gap-2">
                                  <Gift className="w-4 h-4 text-gray-500" />
                                  <span className="text-sm text-gray-700">পরিমাণ: {app.quantity}</span>
                                </div>
                              )}

                              {app.urgency && donorType === 'zakat' && (
                                <Badge variant={app.urgency === 'high' ? 'destructive' : 'secondary'} className="text-xs">
                                  {app.urgency === 'high' ? '🔴 অত্যন্ত জরুরি' : '🟡 মাঝারি'}
                                </Badge>
                              )}
                            </div>

                            {/* Cover Letter Preview */}
                            <div className="bg-gray-50 rounded-lg p-3 mb-4">
                              <p className="text-sm text-gray-700 line-clamp-2 italic">
                                "{app.coverLetter}"
                              </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-4 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Calendar className="w-3 h-3" />
                                  {app.submittedDate}
                                </span>
                                <span className="flex items-center gap-1">
                                  <FileText className="w-3 h-3" />
                                  {app.documents} ডকুমেন্ট
                                </span>
                              </div>
                              
                              <div className="flex gap-2">
                                <Button
                                  variant="outline"
                                  size="sm"
                                  onClick={() => handleViewProfile(app)}
                                >
                                  <Eye className="w-4 h-4 mr-1" />
                                  বিস্তারিত দেখুন
                                </Button>
                                <Button
                                  size="sm"
                                  className="btn-primary"
                                  onClick={() => handleDonate(app.id, app.applicationType)}
                                >
                                  <Heart className="w-4 h-4 mr-1" />
                                  {app.applicationType === 'materials' && donorType === 'materials'
                                    ? 'দান করুন'
                                    : `৳${app.amount?.toLocaleString() || '...'} দান করুন`}
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    ))}
                    
                    {/* Empty State */}
                    {studentApplications.filter(app => donorType === 'zakat' || app.applicationType === 'materials').length === 0 && (
                      <Card className="p-12 text-center">
                        <GraduationCap className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                        <h3 className="text-lg font-semibold text-gray-600 mb-2">
                          {language === 'bn' ? 'কোন আবেদন নেই' : 'No Applications'}
                        </h3>
                        <p className="text-gray-500">
                          {language === 'bn' ? 'এই মুহূর্তে কোন ছাত্রের আবেদন নেই। এডমিন কর্তৃক অনুমোদিত আবেদন এখানে প্রদর্শিত হবে।' : 'No student applications at the moment. Admin-approved applications will appear here.'}
                        </p>
                      </Card>
                    )}
                  </div>
                )}
              </motion.div>
            )}

            {/* Support Tab */}
            {activeTab === 'support' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">
                    {language === 'bn' ? 'সাপোর্ট সেন্টার' : 'Support Center'}
                  </h2>
                  <p className="text-gray-600">
                    {language === 'bn' 
                      ? 'আমাদের সাথে যোগাযোগ করুন এবং আপনার সমস্যার সমাধান পান' 
                      : 'Contact us and get solutions to your problems'}
                  </p>
                </div>

                {/* Admin Notices */}
                <Card className="p-6">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-rose-600" />
                    {language === 'bn' ? 'গুরুত্বপূর্ণ নোটিশ' : 'Important Notices'}
                  </h3>
                  <AdminNoticeViewer language={language} userRole="donor" maxItems={3} />
                </Card>

                {/* Ticket System */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-rose-600" />
                      {language === 'bn' ? 'টিকেট সিস্টেম' : 'Ticket System'}
                    </h3>
                    <Button 
                      className="bg-gradient-to-r from-rose-600 to-pink-600"
                      onClick={() => setIsTicketDialogOpen(true)}
                    >
                      <PlusCircle className="w-4 h-4 mr-2" />
                      {language === 'bn' ? 'নতুন টিকেট' : 'New Ticket'}
                    </Button>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {language === 'bn'
                      ? 'আপনার সমস্যা বা প্রশ্নের জন্য টিকেট তৈরি করুন এবং আমাদের টিম আপনাকে সাহায্য করবে।'
                      : 'Create a ticket for your issues or questions and our team will help you.'}
                  </p>
                </Card>
                
                {/* Ticket System Dialog */}
                <TicketSystem
                  open={isTicketDialogOpen}
                  onOpenChange={setIsTicketDialogOpen}
                  language={language}
                  userId={currentUser?.id || 'donor-demo-001'}
                  userName={currentUser?.name || 'জনাব আহমেদ'}
                  userRole="donor"
                />

                {/* Guidelines & Policies */}
                <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <BookOpen className="w-6 h-6 text-emerald-600" />
                    {language === 'bn' ? 'নীতিমালা ও গাইডলাইন' : 'Guidelines & Policies'}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {language === 'bn'
                      ? 'প্ল্যাটফর্ম ব্যবহার, নিরাপত্তা এবং নীতিমালা সম্পর্কে জানুন'
                      : 'Learn about platform usage, security and policies'}
                  </p>
                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-3">
                    <Button
                      variant="outline"
                      className="justify-start h-auto py-3 hover:bg-emerald-100 hover:border-emerald-400"
                      onClick={() => setPage('donor-guidelines')}
                    >
                      <Heart className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-left text-sm">
                        {language === 'bn' ? 'দাতাদের নির্দেশনা' : 'Donor Guidelines'}
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto py-3 hover:bg-blue-100 hover:border-blue-400"
                      onClick={() => setPage('platform-usage-guide')}
                    >
                      <BookOpen className="w-4 h-4 mr-2 text-blue-600" />
                      <span className="text-left text-sm">
                        {language === 'bn' ? 'প্ল্যাটফর্ম গাইড' : 'Platform Guide'}
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto py-3 hover:bg-purple-100 hover:border-purple-400"
                      onClick={() => setPage('community-guidelines')}
                    >
                      <Users className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="text-left text-sm">
                        {language === 'bn' ? 'কমিউনিটি গাইডলাইন' : 'Community Guidelines'}
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto py-3 hover:bg-red-100 hover:border-red-400"
                      onClick={() => setPage('security-tips')}
                    >
                      <FileText className="w-4 h-4 mr-2 text-red-600" />
                      <span className="text-left text-sm">
                        {language === 'bn' ? 'নিরাপত্তা টিপস' : 'Security Tips'}
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto py-3 hover:bg-orange-100 hover:border-orange-400"
                      onClick={() => setPage('support-system')}
                    >
                      <MessageSquare className="w-4 h-4 mr-2 text-orange-600" />
                      <span className="text-left text-sm">
                        {language === 'bn' ? 'সাপোর্ট সিস্টেম' : 'Support System'}
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto py-3 hover:bg-teal-100 hover:border-teal-400"
                      onClick={() => setPage('help-center')}
                    >
                      <Bell className="w-4 h-4 mr-2 text-teal-600" />
                      <span className="text-left text-sm">
                        {language === 'bn' ? 'সাহায্য কেন্দ্র' : 'Help Center'}
                      </span>
                    </Button>
                  </div>
                </Card>

                {/* Help Resources */}
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setPage('donor-guidelines')}>
                    <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
                    <h4 className="font-semibold mb-2">
                      {language === 'bn' ? 'দান গাইড' : 'Donation Guide'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'bn'
                        ? 'কিভাবে কার্যকরভাবে দান করবেন তা জানুন'
                        : 'Learn how to donate effectively'}
                    </p>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                    <Video className="w-8 h-8 text-purple-600 mb-3" />
                    <h4 className="font-semibold mb-2">
                      {language === 'bn' ? 'ভিডিও টিউটোরিয়াল' : 'Video Tutorials'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'bn'
                        ? 'ভিডিও দেখে শিখুন কিভাবে প্ল্যাটফর্ম ব্যবহার করবেন'
                        : 'Learn how to use the platform through videos'}
                    </p>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                    <Award className="w-8 h-8 text-amber-600 mb-3" />
                    <h4 className="font-semibold mb-2">
                      {language === 'bn' ? 'সার্টিফিকেট FAQ' : 'Certificate FAQ'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'bn'
                        ? 'দান সার্টিফিকেট সম্পর্কিত প্রশ্ন'
                        : 'Questions about donation certificates'}
                    </p>
                  </Card>
                  <Card className="p-6 hover:shadow-lg transition-all cursor-pointer">
                    <Target className="w-8 h-8 text-green-600 mb-3" />
                    <h4 className="font-semibold mb-2">
                      {language === 'bn' ? 'প্রভাব ট্র্যাকিং' : 'Impact Tracking'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'bn'
                        ? 'আপনার দানের প্রভাব কিভাবে দেখবেন'
                        : 'How to track your donation impact'}
                    </p>
                  </Card>
                </div>
              </motion.div>
            )}
          </div>
        </div>
        
      </div>

      {/* Student Profile Viewer */}
      {selectedApplication && (
        <StudentProfileViewer
          open={showProfileViewer}
          onOpenChange={setShowProfileViewer}
          application={selectedApplication}
          donorType={donorType}
          language={language}
          onDonate={handleDonate}
        />
      )}

      {/* Payment Gateway Dialog */}
      <PaymentGatewayDialog
        open={showPaymentGateway}
        onOpenChange={setShowPaymentGateway}
        amount={selectedApplication?.amount || 0}
        donorName={currentUser?.name || ''}
        donationType={selectedApplication?.applicationType === 'scholarship' ? 'বৃত্তি' : 'বই'}
        onPaymentSuccess={(txnData) => {
          setShowPaymentGateway(false);
          toast.success('দান সফল হয়েছে! ছাত্রকে জানানো হবে।');
        }}
        language={language}
      />

      {/* Physical Donation Dialog */}
      <Dialog open={showDonationDialog} onOpenChange={setShowDonationDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {language === 'bn' ? 'শারীরিক দান করুন' : 'Physical Donation'}
            </DialogTitle>
            <DialogDescription>
              {language === 'bn' 
                ? 'আপনার দানের তথ্য দিন এবং এডমিন যাচাই করবে' 
                : 'Provide your donation details and admin will verify'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-start gap-3">
                <Book className="w-5 h-5 text-blue-600 mt-0.5" />
                <div className="text-sm text-blue-800">
                  <p className="mb-1">
                    {language === 'bn' 
                      ? `আপনি ${selectedApplication?.studentName || 'ছাত্রকে'} বই/উপকরণ দান করছেন`
                      : `You are donating books/materials to ${selectedApplication?.studentName || 'student'}`}
                  </p>
                  <p className="text-xs text-blue-700">
                    {language === 'bn'
                      ? 'প্রয়োজন: ' + (selectedApplication?.itemsNeeded || 'বই এবং খাতা')
                      : 'Needed: ' + (selectedApplication?.itemsNeeded || 'Books and notebooks')}
                  </p>
                </div>
              </div>
            </Card>
            
            <div className="space-y-3">
              <p className="text-sm text-gray-600">
                {language === 'bn' 
                  ? 'আপনার দানের বিবরণ সংরক্ষণ করতে হলে, অনুগ্রহ করে Donation পেজে যান এবং সম্পূর্ণ ফর্ম পূরণ করুন।'
                  : 'To record your donation details, please go to the Donation page and fill out the complete form.'}
              </p>
              
              <Button
                onClick={() => {
                  setShowDonationDialog(false);
                  setPage('donation');
                }}
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
              >
                <Book className="w-4 h-4 mr-2" />
                {language === 'bn' ? 'দান পেজে যান' : 'Go to Donation Page'}
              </Button>
              
              <Button
                variant="outline"
                onClick={() => setShowDonationDialog(false)}
                className="w-full"
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Donation Options Dialog (Materials) */}
      {showDonationOptions && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <Card className="p-8 max-w-md w-full mx-4">
            <h3 className="text-xl font-semibold mb-4">
              {language === 'bn' ? 'দানের ধরন নির্বাচন করুন' : 'Choose Donation Type'}
            </h3>
            <p className="text-gray-600 mb-6">
              {language === 'bn' 
                ? 'আপনি শারীরিক বই/উপকরণ দান করতে পারেন অথবা কিনে দেওয়ার জন্য টাকা পাঠাতে পারেন।'
                : 'You can donate physical books/materials or send money to buy them.'}
            </p>
            
            <div className="space-y-3">
              <Button
                className="w-full bg-gradient-to-r from-blue-500 to-cyan-500 text-white"
                onClick={() => handleDonationOption('physical')}
              >
                <Book className="w-5 h-5 mr-2" />
                {language === 'bn' ? 'শারীরিক দান করুন' : 'Donate Physical Items'}
              </Button>
              
              <Button
                className="w-full bg-gradient-to-r from-emerald-500 to-teal-500 text-white"
                onClick={() => handleDonationOption('money')}
              >
                <DollarSign className="w-5 h-5 mr-2" />
                {language === 'bn' ? 'টাকা পাঠান (কেনার জন্য)' : 'Send Money (To Buy)'}
              </Button>
              
              <Button
                variant="outline"
                className="w-full"
                onClick={() => setShowDonationOptions(false)}
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </Button>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
