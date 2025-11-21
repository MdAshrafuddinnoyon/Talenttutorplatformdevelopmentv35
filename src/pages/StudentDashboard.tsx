import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../components/ui/dialog';
import { Progress } from '../components/ui/progress';
import { ScrollArea } from '../components/ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { ProfilePageAvatar, CardAvatar } from '../components/ui/profile-avatar';
import {
  Home,
  PlusCircle,
  Book,
  DollarSign,
  FileText,
  Bell,
  User,
  LogOut,
  CheckCircle,
  Clock,
  XCircle,
  Camera,
  Lock,
  Mail,
  Phone,
  MapPin,
  Save,
  GraduationCap,
  Heart,
  BookOpen,
  TrendingUp,
  Award,
  Gift,
  Share2,
  Video,
  Edit3,
  Send,
  MessageSquare,
  Eye,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import { NotificationCenter } from '../components/NotificationCenter';
import { TicketSystem } from '../components/TicketSystem';
import { TalentTutorLogo } from '../components/TalentTutorLogo';

import { AdminNoticeViewer } from '../components/AdminNoticeViewer';
import { StudentApplicationForm } from '../components/StudentApplicationForm';
import { StudentProfileCompletion } from '../components/StudentProfileCompletion';
import { StudentProfileNotifications } from '../components/StudentProfileNotifications';
import { StudentRequestManager } from '../components/StudentRequestManager';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { type User, type UserRole } from '../utils/authGuard';

interface StudentDashboardProps {
  language: 'bn' | 'en';
  onLogout: () => void;
  setPage: (page: string) => void;
  currentUser?: User | null;
  isAuthenticated?: boolean;
  onLogin?: (type: UserRole) => void;
}

const content = {
  bn: {
    dashboard: 'ড্যাশবোর্ড',
    applyForAid: 'সাহায্যের আবেদন',
    myApplications: 'আমার আবেদন',
    myRequests: 'আমার অনুরোধসমূহ',
    myBooks: 'আমার বই',
    myProgress: 'আমার অগ্রগতি',
    profile: 'প্রোফাইল',
    support: 'সাপোর্ট',
    logout: 'লগআউট',
    welcome: 'স্বাগতম',
    totalApplications: 'মোট আবেদন',
    approved: 'অনুমোদিত',
    pending: 'বিবেচনাধীন',
    rejected: 'প্রত্যাখ্যাত',
    booksReceived: 'প্রাপ্ত বই',
    moneyReceived: 'প্রাপ্ত অর্থ',
    createApplication: 'নতুন আবেদন',
    applicationType: 'আবেদনের ধরন',
    scholarship: 'বৃত্তি/অর্থ সহায়তা',
    tutionSupport: 'টিউশন সহায়তা',
    books: 'বই',
    uniform: 'ইউনিফর্ম',
    stationery: 'স্টেশনারি',
    studentName: 'শিক্ষার্থীর নাম',
    class: 'শ্রেণী',
    school: 'স্কুল/কলেজ',
    guardianName: 'অভিভাবকের নাম',
    phone: 'মোবাইল',
    address: 'ঠিকানা',
    monthlyIncome: 'মাসিক আয়',
    familyMembers: 'পরিবারের সদস্য',
    reason: 'সাহায্যের কারণ',
    amountNeeded: 'প্রয়োজনীয় পরিমাণ',
    nidNumber: 'NID নম্বর (অভিভাবক)',
    submit: 'জমা দিন',
    viewDetails: 'বিস্তারিত দেখুন',
    status: 'অবস্থা',
    appliedDate: 'আবেদনের তারিখ',
    uploadDocuments: 'ডকুমেন্ট আপলোড',
    myTeacher: 'আমার শিক্ষক',
    currentTuition: 'বর্তমান টিউশন',
    subject: 'বিষয়',
    schedule: 'সময়সূচী',
    attendance: 'উপস্থিতি',
    helpReceived: 'প্রাপ্ত সাহায্য',
    shareStory: 'গল্প শেয়ার করুন',
    myStories: 'আমার গল্প',
    viewSuccessStories: 'সফলতার গল্প দেখুন',
    storyTitle: 'গল্পের শিরোনাম',
    storyContent: 'গল্পের বিষয়বস্তু',
    youtubeLink: 'ইউটিউব ভিডিও লিংক (ঐচ্ছিক)',
    category: 'ক্যাটাগরি',
    successStory: 'সফলতার গল্প',
    learningJourney: 'শিক্ষার যাত্রা',
    gratitude: 'কৃতজ্ঞতা',
    publishStory: 'গল্প প্রকাশ করুন',
  },
  en: {
    dashboard: 'Dashboard',
    applyForAid: 'Apply for Aid',
    myApplications: 'My Applications',
    myRequests: 'My Requests',
    myBooks: 'My Books',
    myProgress: 'My Progress',
    profile: 'Profile',
    support: 'Support',
    logout: 'Logout',
    welcome: 'Welcome',
    totalApplications: 'Total Applications',
    approved: 'Approved',
    pending: 'Pending',
    rejected: 'Rejected',
    booksReceived: 'Books Received',
    moneyReceived: 'Money Received',
    createApplication: 'New Application',
    applicationType: 'Application Type',
    scholarship: 'Scholarship/Financial Aid',
    tutionSupport: 'Tuition Support',
    books: 'Books',
    uniform: 'Uniform',
    stationery: 'Stationery',
    studentName: 'Student Name',
    class: 'Class',
    school: 'School/College',
    guardianName: 'Guardian Name',
    phone: 'Phone',
    address: 'Address',
    monthlyIncome: 'Monthly Income',
    familyMembers: 'Family Members',
    reason: 'Reason for Aid',
    amountNeeded: 'Amount Needed',
    nidNumber: 'NID Number (Guardian)',
    submit: 'Submit',
    viewDetails: 'View Details',
    status: 'Status',
    appliedDate: 'Applied Date',
    uploadDocuments: 'Upload Documents',
    myTeacher: 'My Teacher',
    currentTuition: 'Current Tuition',
    subject: 'Subject',
    schedule: 'Schedule',
    attendance: 'Attendance',
    helpReceived: 'Help Received',
    shareStory: 'Share Story',
    myStories: 'My Stories',
    viewSuccessStories: 'View Success Stories',
    storyTitle: 'Story Title',
    storyContent: 'Story Content',
    youtubeLink: 'YouTube Video Link (Optional)',
    category: 'Category',
    successStory: 'Success Story',
    learningJourney: 'Learning Journey',
    gratitude: 'Gratitude',
    publishStory: 'Publish Story',
  },
};

// Mock data
const applications = [
  {
    id: 1,
    type: 'টিউশন সহায়তা',
    status: 'approved',
    amount: 5000,
    appliedDate: '১০/০১/২০২৫',
    approvedDate: '১৫/০১/২০২৫',
    assignedTeacher: 'করিম স্যার',
    subject: 'গণিত, পদার্থবিজ্ঞান',
  },
  {
    id: 2,
    type: 'বই',
    status: 'approved',
    quantity: '৮টি পাঠ্যবই',
    appliedDate: '০৫/০১/২০২৫',
    receivedDate: '১২/০১/২০২৫',
  },
  {
    id: 3,
    type: 'বৃত্তি',
    status: 'pending',
    amount: 10000,
    appliedDate: '২৫/০১/২০২৫',
  },
];

const myBooks = [
  { id: 1, name: 'গণিত - ক্লাস ১০', receivedDate: '১২/০১/২০২৫', condition: 'নতুন' },
  { id: 2, name: 'পদার্থবিজ্ঞান - ক্লাস ১০', receivedDate: '১২/০১/২০২৫', condition: 'নতুন' },
  { id: 3, name: 'রসায়ন - ক্লাস ১০', receivedDate: '১২/০১/২০২৫', condition: 'নতুন' },
  { id: 4, name: 'ইংরেজি - ক্লাস ১০', receivedDate: '১২/০১/২০২৫', condition: 'ভালো' },
];

const studentProgress = {
  attendance: 92,
  performance: 85,
  assignmentsCompleted: 18,
  totalAssignments: 20,
};

export function StudentDashboard({ language, onLogout, setPage }: StudentDashboardProps) {
  const t = content[language];
  const [activeTab, setActiveTab] = useState('dashboard');
  const [showApplicationForm, setShowApplicationForm] = useState(false);
  const [isStoryDialogOpen, setIsStoryDialogOpen] = useState(false);
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [isSubmittingApp, setIsSubmittingApp] = useState(false);
  const [isProfileCompletionOpen, setIsProfileCompletionOpen] = useState(false);
  
  // Mock current user for testing
  const [currentUser] = useState({
    id: 'student-123',
    name: 'রাহুল চৌধুরী',
    email: 'rahul@example.com',
    role: 'student',
    class: 'ক্লাস ১০',
    school: 'ঢাকা সরকারি উচ্চ বিদ্যালয়',
  });
  
  // Profile verification status - Change this to test different states
  // 'incomplete' | 'pending_approval' | 'approved' | 'needs_update'
  const [profileStatus, setProfileStatus] = useState<'incomplete' | 'pending_approval' | 'approved' | 'needs_update'>('incomplete');
  const [applicationForm, setApplicationForm] = useState({
    applicationType: '',
    studentName: '',
    class: '',
    school: '',
    guardianName: '',
    phone: '',
    address: '',
    monthlyIncome: '',
    familyMembers: '',
    amountNeeded: '',
    reason: '',
    nidNumber: '',
  });
  const [storyForm, setStoryForm] = useState({
    title: '',
    content: '',
    youtubeLink: '',
    category: 'successStory',
  });

  const handleSubmitApplication = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!applicationForm.applicationType || !applicationForm.studentName || !applicationForm.reason) {
      toast.error('সব প্রয়োজনীয় ফিল্ড পূরণ করুন');
      return;
    }

    setIsSubmittingApp(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/student/application/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            studentId: 'student-demo-001',
            studentName: applicationForm.studentName,
            applicationType: applicationForm.applicationType,
            class: applicationForm.class,
            school: applicationForm.school,
            guardianName: applicationForm.guardianName,
            phone: applicationForm.phone,
            address: applicationForm.address,
            monthlyIncome: applicationForm.monthlyIncome ? parseInt(applicationForm.monthlyIncome) : null,
            familyMembers: applicationForm.familyMembers ? parseInt(applicationForm.familyMembers) : null,
            reason: applicationForm.reason,
            amountNeeded: applicationForm.amountNeeded ? parseInt(applicationForm.amountNeeded) : null,
            nidNumber: applicationForm.nidNumber,
            documents: [],
          }),
        }
      );

      const data = await response.json();
      
      if (data.success) {
        toast.success('আবেদন সফলভাবে জমা হয়েছে! অ্যাডমিন শীঘ্রই পর্যালোচনা করবেন।');
        setShowApplicationForm(false);
        // Reset form
        setApplicationForm({
          applicationType: '',
          studentName: '',
          class: '',
          school: '',
          guardianName: '',
          phone: '',
          address: '',
          monthlyIncome: '',
          familyMembers: '',
          amountNeeded: '',
          reason: '',
          nidNumber: '',
        });
      } else {
        toast.error(data.error || 'আবেদন জমা দিতে ব্যর্থ হয়েছে');
      }
    } catch (error) {
      console.error('Submit application error:', error);
      toast.error('একটি ত্রুটি ঘটেছে');
    } finally {
      setIsSubmittingApp(false);
    }
  };

  const handleSubmitStory = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success('আপনার গল্প সফলভাবে পাবলিশ করা হয়েছে! এটি ব্লগ পেজে দেখা যাবে।');
    setIsStoryDialogOpen(false);
    setStoryForm({ title: '', content: '', youtubeLink: '', category: 'successStory' });
  };
  
  const loadApplications = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/student-applications/my-applications`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        // Update applications list
        console.log('Loaded applications:', data);
      }
    } catch (error) {
      console.error('Load applications error:', error);
    }
  };

  const stats = {
    totalApplications: applications.length,
    approved: applications.filter(a => a.status === 'approved').length,
    pending: applications.filter(a => a.status === 'pending').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
    booksReceived: myBooks.length,
    moneyReceived: applications
      .filter(a => a.status === 'approved' && a.amount)
      .reduce((sum, a) => sum + (a.amount || 0), 0),
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      {/* Header */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <TalentTutorLogo size="md" showText={true} showSubtitle={false} />
              <p className="text-sm text-gray-500">
                {language === 'bn' ? 'ছাত্র ড্যাশবোর্ড' : 'Student Dashboard'}
              </p>
            </div>

            <div className="flex items-center gap-3">
              <Button 
                variant="outline" 
                size="sm"
                onClick={() => setIsTicketDialogOpen(true)}
              >
                <MessageSquare className="w-4 h-4 mr-2" />
                সাপোর্ট
              </Button>
              
              <NotificationCenter 
                setPage={setPage}
                language={language}
                userRole="student"
              />
              
              <Button variant="ghost" size="icon" onClick={onLogout}>
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
                  onClick={() => {
                    setActiveTab('dashboard');
                    setShowApplicationForm(false);
                  }}
                >
                  <Home className="w-4 h-4" />
                  {t.dashboard}
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 bg-gradient-to-r from-green-50 to-emerald-50 hover:from-green-100 hover:to-emerald-100 border-2 border-green-200"
                  onClick={() => {
                    if (profileStatus !== 'approved') {
                      toast.error(language === 'bn' ? 'প্রোফাইল অনুমোদনের পরে এই ফিচার ব্যবহার করতে পারবেন' : 'Complete and get profile approved first');
                      return;
                    }
                    setActiveTab('dashboard');
                    setShowApplicationForm(true);
                  }}
                  disabled={profileStatus !== 'approved'}
                >
                  <PlusCircle className="w-4 h-4 text-green-600" />
                  <span className="text-green-700">{t.applyForAid}</span>
                  {profileStatus !== 'approved' && <Lock className="w-4 h-4 ml-auto text-gray-400" />}
                </Button>

                <Button
                  variant={activeTab === 'applications' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    if (profileStatus !== 'approved') {
                      toast.error(language === 'bn' ? 'প্রোফাইল অনুমোদনের পরে এই ফিচার ব্যবহার করতে পারবেন' : 'Complete and get profile approved first');
                      return;
                    }
                    setActiveTab('applications');
                    setShowApplicationForm(false);
                  }}
                  disabled={profileStatus !== 'approved'}
                >
                  <FileText className="w-4 h-4" />
                  {t.myApplications}
                  {stats.pending > 0 && profileStatus === 'approved' && (
                    <Badge className="ml-auto bg-amber-500">{stats.pending}</Badge>
                  )}
                  {profileStatus !== 'approved' && <Lock className="w-4 h-4 ml-auto text-gray-400" />}
                </Button>

                <Button
                  variant={activeTab === 'requests' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    setActiveTab('requests');
                    setShowApplicationForm(false);
                  }}
                >
                  <Send className="w-4 h-4" />
                  {t.myRequests}
                </Button>

                <Button
                  variant={activeTab === 'books' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    setActiveTab('books');
                    setShowApplicationForm(false);
                  }}
                >
                  <Book className="w-4 h-4" />
                  {t.myBooks}
                </Button>

                <Button
                  variant={activeTab === 'progress' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    setActiveTab('progress');
                    setShowApplicationForm(false);
                  }}
                >
                  <TrendingUp className="w-4 h-4" />
                  {t.myProgress}
                </Button>

                <Button
                  variant={activeTab === 'stories' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2 bg-gradient-to-r from-blue-50 to-cyan-50 hover:from-blue-100 hover:to-cyan-100 border border-blue-200"
                  onClick={() => {
                    setActiveTab('stories');
                    setShowApplicationForm(false);
                  }}
                >
                  <Share2 className="w-4 h-4 text-blue-600" />
                  <span className="text-blue-700">{t.myStories}</span>
                </Button>

                <Button
                  variant="ghost"
                  className="w-full justify-start gap-2 bg-gradient-to-r from-cyan-50 to-blue-50 hover:from-cyan-100 hover:to-blue-100 border border-cyan-200"
                  onClick={() => {
                    setPage('blog');
                    setShowApplicationForm(false);
                  }}
                >
                  <BookOpen className="w-4 h-4 text-cyan-600" />
                  <span className="text-cyan-700">{t.viewSuccessStories}</span>
                </Button>

                <Button
                  variant={activeTab === 'profile' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    setActiveTab('profile');
                    setShowApplicationForm(false);
                  }}
                >
                  <User className="w-4 h-4" />
                  {t.profile}
                </Button>

                <Button
                  variant={activeTab === 'support' ? 'default' : 'ghost'}
                  className="w-full justify-start gap-2"
                  onClick={() => {
                    setActiveTab('support');
                    setShowApplicationForm(false);
                  }}
                >
                  <MessageSquare className="w-4 h-4" />
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
                {/* Profile Incomplete/Pending - Show Priority Message */}
                {profileStatus !== 'approved' ? (
                  <Card className="p-8 bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 border-2 border-orange-300 shadow-xl">
                    <div className="flex items-start gap-6">
                      <div className="flex-shrink-0">
                        <div className="w-20 h-20 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center shadow-lg">
                          {profileStatus === 'incomplete' && <User className="w-10 h-10 text-white" />}
                          {profileStatus === 'pending_approval' && <Clock className="w-10 h-10 text-white animate-pulse" />}
                          {profileStatus === 'needs_update' && <AlertCircle className="w-10 h-10 text-white" />}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        {profileStatus === 'incomplete' && (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-2xl font-bold text-gray-900">
                                {language === 'bn' ? '⚠️ প্রোফাইল সম্পূর্ণ করুন' : '⚠️ Complete Your Profile'}
                              </h3>
                              <Badge className="bg-orange-500">{language === 'bn' ? 'অসম্পূর্ণ' : 'Incomplete'}</Badge>
                            </div>
                            <p className="text-gray-700 mb-4 text-lg">
                              {language === 'bn' 
                                ? 'আপনার প্রোফাইল সম্পূর্ণ করুন এবং এডমিন অনুমোদনের জন্য জমা দিন। অনুমোদন পেলেই আপনি সব ফিচার ব্যবহার করতে পারবেন (সাহায্যের আবেদন, টিকেট সিস্টেম, ইত্যাদি)।'
                                : 'Complete your profile and submit for admin verification. After approval, you can access all features (apply for aid, ticket system, etc.).'}
                            </p>
                            <div className="bg-white/70 border-2 border-orange-200 rounded-lg p-4 mb-6">
                              <h4 className="font-semibold text-gray-900 mb-2">
                                {language === 'bn' ? '📋 প্রয়োজনীয় তথ্য:' : '📋 Required Information:'}
                              </h4>
                              <ul className="grid md:grid-cols-2 gap-2 text-sm text-gray-700">
                                <li>✓ {language === 'bn' ? 'ব্যক্তিগত তথ্য' : 'Personal Information'}</li>
                                <li>✓ {language === 'bn' ? 'শিক্ষাগত তথ্য' : 'Educational Information'}</li>
                                <li>✓ {language === 'bn' ? 'পারিবারিক তথ্য' : 'Family Information'}</li>
                                <li>✓ {language === 'bn' ? 'সব প্রয়োজনীয় ডকুমেন্ট' : 'All Required Documents'}</li>
                              </ul>
                            </div>
                            <Button
                              size="lg"
                              onClick={() => setIsProfileCompletionOpen(true)}
                              className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-lg text-lg"
                            >
                              <GraduationCap className="w-5 h-5 mr-2" />
                              {language === 'bn' ? 'প্রোফাইল সম্পূর্ণ করুন' : 'Complete Profile'}
                            </Button>
                          </>
                        )}
                        
                        {profileStatus === 'pending_approval' && (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-2xl font-bold text-gray-900">
                                {language === 'bn' ? '⏳ পর্যালোচনাধীন' : '⏳ Under Review'}
                              </h3>
                              <Badge className="bg-blue-500 animate-pulse">{language === 'bn' ? 'যাচাইকরণ চলছে' : 'Pending Approval'}</Badge>
                            </div>
                            <p className="text-gray-700 mb-4 text-lg">
                              {language === 'bn'
                                ? 'আপনার প্রোফাইল সফলভাবে জমা হয়েছে এবং এডমিন এটি পর্যালোচনা করছেন। অনুমোদন পেলে আপনি একটি নোটিফিকেশন পাবেন এবং সব ফিচার ব্যবহার শুরু করতে পারবেন।'
                                : 'Your profile has been submitted successfully and is under admin review. You will receive a notification once approved and can start using all features.'}
                            </p>
                            <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                              <div className="flex items-center gap-2 text-blue-800">
                                <Clock className="w-5 h-5 animate-pulse" />
                                <p className="font-medium">
                                  {language === 'bn' 
                                    ? 'অনুমোদন সাধারণত ২৪-৪৮ ঘন্টার মধ্যে সম্পন্ন হয়'
                                    : 'Approval usually takes 24-48 hours'}
                                </p>
                              </div>
                            </div>
                          </>
                        )}
                        
                        {profileStatus === 'needs_update' && (
                          <>
                            <div className="flex items-center gap-2 mb-2">
                              <h3 className="text-2xl font-bold text-gray-900">
                                {language === 'bn' ? '📝 আপডেট প্রয়োজন' : '📝 Update Required'}
                              </h3>
                              <Badge className="bg-red-500">{language === 'bn' ? 'আপডেট করুন' : 'Needs Update'}</Badge>
                            </div>
                            <p className="text-gray-700 mb-4">
                              {language === 'bn'
                                ? 'এডমিন আপনার প্রোফাইলে কিছু সংশোধন চেয়েছেন। দয়া করে প্রোফাইল আপডেট করে পুনরায় জমা দিন।'
                                : 'Admin has requested some updates to your profile. Please update and resubmit.'}
                            </p>
                            <Button
                              size="lg"
                              onClick={() => setIsProfileCompletionOpen(true)}
                              className="bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 shadow-lg"
                            >
                              <Edit3 className="w-5 h-5 mr-2" />
                              {language === 'bn' ? 'প্রোফাইল আপডেট করুন' : 'Update Profile'}
                            </Button>
                          </>
                        )}
                      </div>
                    </div>
                  </Card>
                ) : showApplicationForm ? (
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-6">
                      <h2 className="text-2xl text-gray-900">
                        {language === 'bn' ? 'সাহায্যের জন্য আবেদন' : 'Apply for Aid'}
                      </h2>
                      <Button
                        variant="ghost"
                        onClick={() => setShowApplicationForm(false)}
                        className="text-gray-500 hover:text-gray-700"
                      >
                        <XCircle className="w-5 h-5 mr-2" />
                        {language === 'bn' ? 'বাতিল করুন' : 'Cancel'}
                      </Button>
                    </div>
                    <StudentApplicationForm
                      language={language}
                      currentUser={currentUser}
                      onSuccess={() => {
                        setShowApplicationForm(false);
                        toast.success(language === 'bn' ? 'আপনার আবেদন সফলভাবে জমা হয়েছে!' : 'Application submitted successfully!');
                      }}
                      onClose={() => setShowApplicationForm(false)}
                    />
                  </Card>
                ) : (
                  <>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900 mb-2">
                        {t.welcome}, রিয়া খাতুন!
                      </h2>
                      <p className="text-gray-600">আপনার আজকের সংক্ষিপ্ত তথ্য</p>
                    </div>

                    {/* Hero CTA - Apply for Aid */}
                    <Card className="bg-gradient-to-r from-rose-500 via-pink-500 to-rose-600 text-white p-8 border-0 shadow-xl overflow-hidden relative">
                  {/* Decorative Elements */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-32 -mt-32" />
                  <div className="absolute bottom-0 left-0 w-48 h-48 bg-white/10 rounded-full -ml-24 -mb-24" />
                  
                  <div className="relative z-10 flex items-center justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Heart className="w-8 h-8 text-white animate-pulse" />
                        <h2 className="text-2xl">💖 সাহায্য প্রয়োজন?</h2>
                      </div>
                      <p className="text-white/90 mb-6 text-lg">
                        বৃত্তি, বই, অথবা টিউশনের জন্য আবেদন করুন
                      </p>
                      <Button 
                        size="lg"
                        onClick={() => setShowApplicationForm(true)}
                        className="bg-white text-rose-600 hover:bg-gray-50 shadow-lg"
                      >
                        <PlusCircle className="w-5 h-5 mr-2" />
                        সাহায্যের আবেদন করুন
                      </Button>
                    </div>
                    <div className="hidden md:block">
                      <div className="text-8xl opacity-90">🎓</div>
                    </div>
                  </div>
                </Card>

                {/* Stats Grid */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-6 bg-gradient-to-br from-green-500 to-emerald-500 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <CheckCircle className="w-8 h-8 opacity-80" />
                      <Badge className="bg-white/20 text-white border-0">
                        {t.approved}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.approved}</div>
                    <div className="text-sm opacity-90">অনুমোদিত আবেদন</div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-orange-500 to-red-500 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <Clock className="w-8 h-8 opacity-80" />
                      <Badge className="bg-white/20 text-white border-0">
                        {t.pending}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.pending}</div>
                    <div className="text-sm opacity-90">বিবেচনাধীন</div>
                  </Card>

                  <Card className="p-6 bg-gradient-to-br from-cyan-500 to-blue-500 text-white">
                    <div className="flex items-center justify-between mb-3">
                      <Book className="w-8 h-8 opacity-80" />
                      <Badge className="bg-white/20 text-white border-0">
                        {t.books}
                      </Badge>
                    </div>
                    <div className="text-3xl font-bold mb-1">{stats.booksReceived}</div>
                    <div className="text-sm opacity-90">{t.booksReceived}</div>
                  </Card>
                </div>

                {/* Admin Notice Board */}
                <AdminNoticeViewer language={language} userRole="student" />

                {/* Help Received Summary */}
                <Card className="p-6">
                  <h3 className="text-lg font-semibold mb-4">{t.helpReceived}</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg">
                        <div className="p-3 bg-blue-500 rounded-full">
                          <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">টিউশন সহায়তা</div>
                          <div className="text-xl font-bold text-gray-900">৳{stats.moneyReceived.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <div className="flex items-center gap-3 p-4 bg-teal-50 rounded-lg">
                        <div className="p-3 bg-teal-500 rounded-full">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <div className="text-sm text-gray-600">মোট বই</div>
                          <div className="text-xl font-bold text-gray-900">{stats.booksReceived}টি</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>

                {/* Current Tuition */}
                {applications.find(a => a.status === 'approved' && a.assignedTeacher) && (
                  <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200">
                    <h3 className="text-lg font-semibold mb-4">{t.currentTuition}</h3>
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-xl font-bold text-gray-900 mb-2">
                          {applications.find(a => a.assignedTeacher)?.assignedTeacher}
                        </h4>
                        <div className="grid md:grid-cols-2 gap-3 text-sm">
                          <div>
                            <span className="text-gray-600">{t.subject}:</span>{' '}
                            <span className="font-medium">{applications.find(a => a.assignedTeacher)?.subject}</span>
                          </div>
                          <div>
                            <span className="text-gray-600">{t.schedule}:</span>{' '}
                            <span className="font-medium">রবি, মঙ্গল, বৃহঃ - ৫:০০ PM</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Card>
                )}

                {/* Gratitude Message */}
                <Card className="p-6 bg-gradient-to-r from-pink-500 to-rose-500 text-white">
                  <div className="flex items-start gap-4">
                    <Heart className="w-12 h-12 opacity-80 flex-shrink-0" />
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">আপনার দাতাদের ধন্যবাদ</h3>
                      <p className="text-pink-100 mb-3">
                        আপনার শিক্ষার জন্য অনেক উদার দাতা সাহায্য করেছেন। তাদের প্রত্যাশা পূরণ করতে 
                        লেখাপড়ায় মনোযোগী থাকুন এবং ভবিষ্যতে অন্যদের সাহায্য করুন।
                      </p>
                      <Button variant="outline" className="border-white text-[rgb(0,0,0)] hover:bg-white/10">
                        <Gift className="w-4 h-4 mr-2" />
                        ধন্যবাদ বার্তা পাঠান
                      </Button>
                    </div>
                  </div>
                </Card>
                  </>
                )}
              </motion.div>
            )}

            {/* Applications Tab */}
            {activeTab === 'applications' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold">{t.myApplications}</h2>
                {applications.map((app) => (
                  <Card key={app.id} className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">{app.type}</h3>
                        <p className="text-sm text-gray-500">{t.appliedDate}: {app.appliedDate}</p>
                      </div>
                      <Badge 
                        className={
                          app.status === 'approved' ? 'bg-green-600' :
                          app.status === 'pending' ? 'bg-amber-500' :
                          'bg-red-600'
                        }
                      >
                        {app.status === 'approved' ? t.approved :
                         app.status === 'pending' ? t.pending :
                         t.rejected}
                      </Badge>
                    </div>

                    <div className="space-y-2 text-sm">
                      {app.amount && (
                        <div>
                          <span className="text-gray-600">পরিমাণ:</span>{' '}
                          <span className="font-semibold text-gray-900">৳{app.amount.toLocaleString()}</span>
                        </div>
                      )}
                      {app.quantity && (
                        <div>
                          <span className="text-gray-600">পরিমাণ:</span>{' '}
                          <span className="font-semibold text-gray-900">{app.quantity}</span>
                        </div>
                      )}
                      {app.assignedTeacher && (
                        <div>
                          <span className="text-gray-600">নিয়োগকৃত শিক্ষক:</span>{' '}
                          <span className="font-semibold text-gray-900">{app.assignedTeacher}</span>
                        </div>
                      )}
                      {app.subject && (
                        <div>
                          <span className="text-gray-600">বিষয়:</span>{' '}
                          <span className="font-semibold text-gray-900">{app.subject}</span>
                        </div>
                      )}
                    </div>

                    {app.status === 'approved' && (
                      <div className="mt-4 p-3 bg-green-50 rounded-lg border border-green-200">
                        <p className="text-sm text-green-700">
                          ✓ আপনার আবেদন অনুমোদিত হয়েছে! 
                          {app.approvedDate && ` (${app.approvedDate})`}
                        </p>
                      </div>
                    )}
                  </Card>
                ))}
              </motion.div>
            )}

            {/* Requests Tab */}
            {activeTab === 'requests' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <StudentRequestManager 
                  language={language}
                  currentUser={currentUser}
                />
              </motion.div>
            )}

            {/* Books Tab */}
            {activeTab === 'books' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-4"
              >
                <h2 className="text-xl font-semibold">{t.myBooks}</h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {myBooks.map((book) => (
                    <Card key={book.id} className="p-6">
                      <div className="flex items-start gap-4">
                        <div className="p-3 bg-teal-100 rounded-lg">
                          <BookOpen className="w-6 h-6 text-teal-600" />
                        </div>
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{book.name}</h3>
                          <div className="text-sm space-y-1">
                            <div>
                              <span className="text-gray-600">প্রাপ্তির তারিখ:</span>{' '}
                              <span className="text-gray-900">{book.receivedDate}</span>
                            </div>
                            <div>
                              <span className="text-gray-600">অবস্থা:</span>{' '}
                              <Badge variant="outline">{book.condition}</Badge>
                            </div>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Progress Tab */}
            {activeTab === 'progress' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold">{t.myProgress}</h2>
                
                <div className="grid md:grid-cols-2 gap-4">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">উপস্থিতি</h3>
                      <span className="text-2xl font-bold text-green-600">{studentProgress.attendance}%</span>
                    </div>
                    <Progress value={studentProgress.attendance} className="mb-2" />
                    <p className="text-sm text-gray-600">চমৎকার উপস্থিতি!</p>
                  </Card>

                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-semibold">পারফরম্যান্স</h3>
                      <span className="text-2xl font-bold text-blue-600">{studentProgress.performance}%</span>
                    </div>
                    <Progress value={studentProgress.performance} className="mb-2" />
                    <p className="text-sm text-gray-600">ভালো অগ্রগতি!</p>
                  </Card>
                </div>

                <Card className="p-6">
                  <h3 className="font-semibold mb-4">অ্যাসাইনমেন্ট</h3>
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-gray-600">সম্পন্ন</span>
                    <span className="font-bold">{studentProgress.assignmentsCompleted}/{studentProgress.totalAssignments}</span>
                  </div>
                  <Progress 
                    value={(studentProgress.assignmentsCompleted / studentProgress.totalAssignments) * 100} 
                    className="mb-2"
                  />
                  <p className="text-sm text-gray-600">
                    আরও {studentProgress.totalAssignments - studentProgress.assignmentsCompleted}টি বাকি
                  </p>
                </Card>

                <Card className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200">
                  <div className="flex items-start gap-4">
                    <Award className="w-12 h-12 text-yellow-600" />
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 mb-2">অসাধারণ অগ্রগতি!</h3>
                      <p className="text-gray-700">
                        আপনার শিক্ষক আপনার পরিশ্রম ও উন্নতিতে খুবই সন্তুষ্ট। 
                        এভাবেই চালিয়ে যান!
                      </p>
                    </div>
                  </div>
                </Card>
              </motion.div>
            )}

            {/* Stories Tab */}
            {activeTab === 'stories' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="space-y-6"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-bold text-gray-900">{t.myStories}</h2>
                    <p className="text-gray-600">আপনার সফলতার গল্প এবং অভিজ্ঞতা শেয়ার করুন</p>
                  </div>
                  
                  <Dialog open={isStoryDialogOpen} onOpenChange={setIsStoryDialogOpen}>
                    <DialogTrigger asChild>
                      <Button className="bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700">
                        <Edit3 className="w-4 h-4 mr-2" />
                        {t.shareStory}
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
                      <DialogHeader>
                        <DialogTitle className="text-2xl">{t.shareStory}</DialogTitle>
                        <DialogDescription>
                          আপনার শিক্ষা যাত্রার গল্প, সফলতা এবং অভিজ্ঞতা শেয়ার করুন। এটি অন্যদের অনুপ্রাণিত করবে।
                        </DialogDescription>
                      </DialogHeader>
                      
                      <form onSubmit={handleSubmitStory} className="space-y-6 mt-4">
                        <div>
                          <Label>{t.category}</Label>
                          <Select 
                            value={storyForm.category}
                            onValueChange={(value) => setStoryForm({ ...storyForm, category: value })}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="successStory">{t.successStory}</SelectItem>
                              <SelectItem value="learningJourney">{t.learningJourney}</SelectItem>
                              <SelectItem value="gratitude">{t.gratitude}</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label>{t.storyTitle}</Label>
                          <Input
                            required
                            value={storyForm.title}
                            onChange={(e) => setStoryForm({ ...storyForm, title: e.target.value })}
                            placeholder="যেমন: কিভাবে আমি গণিতে ভালো হলাম"
                          />
                        </div>

                        <div>
                          <Label>{t.storyContent}</Label>
                          <Textarea
                            required
                            rows={12}
                            value={storyForm.content}
                            onChange={(e) => setStoryForm({ ...storyForm, content: e.target.value })}
                            placeholder="আপনার গল্প বিস্তারিত লিখুন..."
                            className="resize-none"
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            {storyForm.content.length}/2000 অক্ষর
                          </p>
                        </div>

                        <div>
                          <Label className="flex items-center gap-2">
                            <Video className="w-4 h-4" />
                            {t.youtubeLink}
                          </Label>
                          <Input
                            value={storyForm.youtubeLink}
                            onChange={(e) => setStoryForm({ ...storyForm, youtubeLink: e.target.value })}
                            placeholder="https://www.youtube.com/watch?v=..."
                          />
                          <p className="text-xs text-gray-500 mt-1">
                            আপনার রেকর্ডিং ভিডিও লিংক দিন (যদি থাকে)
                          </p>
                        </div>

                        <div className="flex items-center gap-3 pt-4">
                          <Button
                            type="button"
                            variant="outline"
                            onClick={() => setIsStoryDialogOpen(false)}
                            className="flex-1"
                          >
                            বাতিল
                          </Button>
                          <Button
                            type="submit"
                            className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600"
                          >
                            <Send className="w-4 h-4 mr-2" />
                            {t.publishStory}
                          </Button>
                        </div>
                      </form>
                    </DialogContent>
                  </Dialog>
                </div>

                {/* Info Card */}
                <Card className="p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200">
                  <div className="flex items-start gap-4">
                    <div className="p-3 bg-blue-500 rounded-full">
                      <Share2 className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-2">কেন গল্প শেয়ার করবেন?</h3>
                      <ul className="space-y-1 text-sm text-gray-700">
                        <li>✓ অন্য শিক্ষার্থীদের অনুপ্রাণিত করুন</li>
                        <li>✓ দাতাদের দেখান আপনার অগ্রগতি</li>
                        <li>✓ ব্লগ এবং সফলতার গল্প পেজে প্রকাশিত হবে</li>
                        <li>✓ ভিডিও সহ আপনার অভিজ্ঞতা শেয়ার করুন</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                {/* Published Stories - Sample */}
                <div>
                  <h3 className="text-lg font-semibold mb-4">প্রকাশিত গল্প</h3>
                  <div className="space-y-4">
                    <Card className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <Badge className="bg-green-100 text-green-700 mb-2">{t.successStory}</Badge>
                          <h4 className="text-lg font-semibold text-gray-900 mb-2">
                            আমার শিক্ষা যাত্রার গল্প
                          </h4>
                          <p className="text-gray-600 text-sm line-clamp-3">
                            আমার পরিবারে অর্থের অভাব থাকলেও Talent Tutor প্ল্যাটফর্মের মাধ্যমে আমি একজন 
                            ভালো শিক্ষক পেয়েছি। এখন আমি গণিতে অনেক ভালো করছি...
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-500">
                        <span>প্রকাশিত: ২৫/০১/২০২৫</span>
                        <Button variant="ghost" size="sm">
                          <Eye className="w-4 h-4 mr-1" />
                          দেখুন
                        </Button>
                      </div>
                    </Card>

                    <Card className="p-6 text-center text-gray-500 border-2 border-dashed">
                      <Edit3 className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                      <p>আরো গল্প লিখুন এবং শেয়ার করুন</p>
                    </Card>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Profile Tab */}
            {activeTab === 'profile' && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card className="p-6">
                  <h2 className="text-xl font-semibold mb-6">{t.profile}</h2>
                  <div className="space-y-6">
                    <div className="flex items-center gap-4">
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                        <GraduationCap className="w-10 h-10 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">রিয়া খাতুন</h3>
                        <p className="text-gray-600">ক্লাস ১০</p>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>স্কুল</Label>
                        <Input value="আদর্শ বিদ্যালয়" readOnly />
                      </div>
                      <div>
                        <Label>রোল নম্বর</Label>
                        <Input value="১২৩৪৫" readOnly />
                      </div>
                      <div>
                        <Label>মোবাইল</Label>
                        <Input value="০১৭১২৩৪৫৬৭৮" readOnly />
                      </div>
                      <div>
                        <Label>ঠিকানা</Label>
                        <Input value="মিরপুর, ঢাকা" readOnly />
                      </div>
                    </div>
                  </div>
                </Card>
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
                    <Bell className="w-5 h-5 text-cyan-600" />
                    {language === 'bn' ? 'গুরুত্বপূর্ণ নোটিশ' : 'Important Notices'}
                  </h3>
                  <AdminNoticeViewer language={language} userRole="student" maxItems={3} />
                </Card>

                {/* Ticket System */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-cyan-600" />
                      {language === 'bn' ? 'টিকেট সিস্টেম' : 'Ticket System'}
                    </h3>
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button className="bg-gradient-to-r from-cyan-600 to-blue-600">
                          <PlusCircle className="w-4 h-4 mr-2" />
                          {language === 'bn' ? 'নতুন টিকেট' : 'New Ticket'}
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl">
                        <TicketSystem
                          open={true}
                          onOpenChange={() => {}}
                          language={language}
                          userId="student-demo-001"
                          userName="রিয়া খাতুন"
                          userRole="student"
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {language === 'bn'
                      ? 'আপনার সমস্যা বা প্রশ্নের জন্য টিকেট তৈরি করুন এবং আমাদের টিম আপনাকে সাহায্য করবে।'
                      : 'Create a ticket for your issues or questions and our team will help you.'}
                  </p>
                </Card>

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
                      onClick={() => setPage('student-guidelines')}
                    >
                      <User className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-left text-sm">
                        {language === 'bn' ? 'ছাত্রদের নির্দেশনা' : 'Student Guidelines'}
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
                      <User className="w-4 h-4 mr-2 text-purple-600" />
                      <span className="text-left text-sm">
                        {language === 'bn' ? 'কমিউনিটি গাইডলাইন' : 'Community Guidelines'}
                      </span>
                    </Button>
                    <Button
                      variant="outline"
                      className="justify-start h-auto py-3 hover:bg-red-100 hover:border-red-400"
                      onClick={() => setPage('security-tips')}
                    >
                      <Lock className="w-4 h-4 mr-2 text-red-600" />
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
                  <Card className="p-6 hover:shadow-lg transition-all cursor-pointer" onClick={() => setPage('platform-usage-guide')}>
                    <BookOpen className="w-8 h-8 text-blue-600 mb-3" />
                    <h4 className="font-semibold mb-2">
                      {language === 'bn' ? 'সহায়তা ডকুমেন্ট' : 'Help Documents'}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {language === 'bn'
                        ? 'প্ল্যাটফর্ম ব্যবহারের গাইড এবং টিপস'
                        : 'Platform usage guides and tips'}
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
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>

      {/* Ticket System Dialog */}
      <TicketSystem
        open={isTicketDialogOpen}
        onOpenChange={setIsTicketDialogOpen}
        language={language}
        userId="student-demo-001"
        userName="রিয়া খাতুন"
        userRole="student"
      />
      
      {/* Student Profile Completion Dialog */}
      <StudentProfileCompletion
        open={isProfileCompletionOpen}
        onOpenChange={setIsProfileCompletionOpen}
        language={language}
        currentUser={currentUser}
        onSuccess={() => {
          setProfileStatus('pending_approval');
          toast.success(language === 'bn' ? 'প্রোফাইল সফলভাবে জমা হয়েছে!' : 'Profile submitted successfully!');
        }}
      />
    </div>
  );
}
