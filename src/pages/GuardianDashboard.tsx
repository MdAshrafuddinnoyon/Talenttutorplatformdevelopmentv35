import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { ProfilePageAvatar, CardAvatar } from '../components/ui/profile-avatar';
import {
  Home,
  PlusCircle,
  Users,
  MessageSquare,
  Bell,
  Wallet,
  User,
  LogOut,
  Star,
  MapPin,
  BookOpen,
  Calendar,
  CreditCard,
  DollarSign,
  Heart,
  TrendingUp,
  CheckCircle,
  Book,
  FileText,
  Gift,
  Camera,
  Lock,
  Mail,
  Phone,
  Save,
} from 'lucide-react';
import { ContractManagementSection } from '../components/ContractManagementSection';
import { ReviewDialog } from '../components/ReviewDialog';
import { NotificationCenter } from '../components/NotificationCenter';
import { TicketSystem } from '../components/TicketSystem';
import { TalentTutorLogo } from '../components/TalentTutorLogo';
import { ContractMessagingSystem } from '../components/ContractMessagingSystem';
import { PlatformReviewDialog } from '../components/PlatformReviewDialog';
import { EnhancedAITeacherFinderMap } from '../components/EnhancedAITeacherFinderMap';
import { MapErrorBoundary } from '../components/MapErrorBoundary';
import { AdminNoticeViewer } from '../components/AdminNoticeViewer';

import { toast } from 'sonner@2.0.3';
import { type User, type UserRole } from '../utils/authGuard';
import { GuardianProgressReports } from '../components/GuardianProgressReports';

interface GuardianDashboardProps {
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
    postJob: 'টিউশন পোস্ট করুন',
    myPosts: 'আমার পোস্ট',
    findTeachers: 'শিক্ষক খুঁজুন',
    findTeachersMap: 'মানচিত্রে শিক্ষক খুঁজুন',
    messages: 'মেসেজ',
    profile: 'প্রোফাইল',
    logout: 'লগআউট',
    welcome: 'স্বাগতম',
    creditBalance: 'ক্রেডিট ব্যালেন্স',
    activePosts: 'সক্রিয় পোস্ট',
    applicants: 'আবেদনকারী',
    hiredTeachers: 'নিয়োগপ্রাপ্ত শিক্ষক',
    createJobPost: 'নতুন টিউশন পোস্ট',
    jobTitle: 'টিউশনের শিরোনাম',
    subject: 'বিষয়',
    class: 'শ্রেণী',
    medium: 'মাধ্যম',
    location: 'এলাকা',
    salary: 'বেতন (মাসিক)',
    schedule: 'সময়সূচী',
    requirements: 'শিক্ষকের যোগ্যতা',
    description: 'বিস্তারিত বর্ণনা',
    postNow: 'পোস্ট করুন',
    viewApplications: 'আবেদন দেখুন',
    shortlist: 'শর্টলিস্ট',
    hire: 'নিয়োগ দিন',
    reject: 'প্রত্যাখ্যান',
    teacherProfile: 'শিক্ষকের প্রোফাইল',
    experience: 'অভিজ্ঞতা',
    rating: 'রেটিং',
    applications: 'আবেদন',
    payments: 'পেমেন্ট',
    donate: 'দান করুন',
    contracts: 'চুক্তিনামা',
    progressReports: 'প্রগ্রেস রিপোর্ট',
    paymentHistory: 'পেমেন্ট হিস্টরি',
    subscriptionHistory: 'সাবস্ক্রিপশন হিস্টরি',
    makePayment: 'পেমেন্ট করুন',
    teacherName: 'শিক্ষকের নাম',
    amount: 'পরিমাণ',
    month: 'মাস',
    status: 'স্ট্যাটাস',
    date: 'তারিখ',
    paid: 'পরিশোধিত',
    pending: 'বাকি',
    donateBooks: 'বই দান',
    donateZakat: 'যাকাত দান',
    studentProgress: 'ছাত্রের অগ্রগতি',
    overallPerformance: 'সামগ্রিক পারফরম্যান্স',
    recentUpdates: 'সাম্প্রতিক আপডেট',
    payNow: 'এখনই পরিশোধ করুন',
    totalPaid: 'মোট পরিশোধিত',
    totalPending: 'মোট বাকি',
    subscriptionPlan: 'সাবস্ক্রিপশন প্ল্যান',
    renewalDate: 'নবায়নের তারিখ',
    donateToLibrary: 'লাইব্রেরিতে দান',
    donateToZakat: 'যাকাত ফান্ডে দান',
    // Profile Settings
    profileSettings: 'প্রোফাইল সেটিংস',
    personalInfo: 'ব্যক্তিগত তথ্য',
    changePassword: 'পাসওয়ার্ড পরিবর্তন',
    fullName: 'সম্পূর্ণ নাম',
    email: 'ইমেইল',
    phoneNumber: 'মোবাইল নম্বর',
    address: 'ঠিকানা',
    bio: 'পরিচিতি',
    currentPassword: 'বর্তমান পাসওয়ার্ড',
    newPassword: 'নতুন পাসওয়ার্ড',
    confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
    changePhoto: 'ছবি পরিবর্তন করুন',
    uploadPhoto: 'ছবি আপলোড',
    saveChanges: 'পরিবর্তন সংরক্ষণ করুন',
    cancel: 'বাতিল',
    support: 'সাপোর্ট',
    writeReview: 'রিভিউ লিখুন',
  },
  en: {
    dashboard: 'Dashboard',
    postJob: 'Post Tuition',
    myPosts: 'My Posts',
    findTeachers: 'Find Teachers',
    findTeachersMap: 'Find Teachers on Map',
    messages: 'Messages',
    profile: 'Profile',
    logout: 'Logout',
    welcome: 'Welcome',
    creditBalance: 'Credit Balance',
    activePosts: 'Active Posts',
    applicants: 'Applicants',
    hiredTeachers: 'Hired Teachers',
    createJobPost: 'Create New Job Post',
    jobTitle: 'Job Title',
    subject: 'Subject',
    class: 'Class',
    medium: 'Medium',
    location: 'Location',
    salary: 'Salary (Monthly)',
    schedule: 'Schedule',
    requirements: 'Teacher Requirements',
    description: 'Detailed Description',
    postNow: 'Post Now',
    viewApplications: 'View Applications',
    shortlist: 'Shortlist',
    hire: 'Hire',
    reject: 'Reject',
    teacherProfile: 'Teacher Profile',
    experience: 'Experience',
    rating: 'Rating',
    applications: 'Applications',
    payments: 'Payments',
    donate: 'Donate',
    contracts: 'Contracts',
    progressReports: 'Progress Reports',
    paymentHistory: 'Payment History',
    subscriptionHistory: 'Subscription History',
    makePayment: 'Make Payment',
    teacherName: 'Teacher Name',
    amount: 'Amount',
    month: 'Month',
    status: 'Status',
    date: 'Date',
    paid: 'Paid',
    pending: 'Pending',
    donateBooks: 'Donate Books',
    donateZakat: 'Donate Zakat',
    studentProgress: 'Student Progress',
    overallPerformance: 'Overall Performance',
    recentUpdates: 'Recent Updates',
    payNow: 'Pay Now',
    totalPaid: 'Total Paid',
    totalPending: 'Total Pending',
    subscriptionPlan: 'Subscription Plan',
    renewalDate: 'Renewal Date',
    donateToLibrary: 'Donate to Library',
    donateToZakat: 'Donate to Zakat Fund',
    // Profile Settings
    profileSettings: 'Profile Settings',
    personalInfo: 'Personal Information',
    changePassword: 'Change Password',
    fullName: 'Full Name',
    email: 'Email',
    phoneNumber: 'Phone Number',
    address: 'Address',
    bio: 'Bio',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    changePhoto: 'Change Photo',
    uploadPhoto: 'Upload Photo',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    support: 'Support',
    writeReview: 'Write Review',
  },
};

// Mock data
const myPosts = [
  {
    id: 1,
    title: 'গণিত ���িক্ষক প্রয়োজন (ক্লাস ৮-১০)',
    subject: 'গণিত',
    class: 'ক্লাস ৮-১০',
    location: 'ধানমন্ডি, ঢাকা',
    salary: '৮,০০০-১০,০০০ টাকা/মাস',
    posted: '২ দিন আগে',
    applicants: 12,
    status: 'active',
  },
  {
    id: 2,
    title: 'ইংরেজি টিউটর',
    subject: 'ইংরেজি',
    class: 'ক্লাস ৬',
    location: 'ধানমন্ডি, ঢাকা',
    salary: '৬,০০০ টাকা/মাস',
    posted: '১ সপ্তাহ আগে',
    applicants: 8,
    status: 'active',
  },
];

const applicants = [
  {
    id: 1,
    name: 'মোঃ করিম উদ্দিন',
    subject: 'গণিত',
    experience: '৫ বছর',
    education: 'ঢাকা বিশ্ববিদ্যালয়, গণিত (মাস্টার্স)',
    rating: 4.8,
    reviews: 24,
    location: 'মিরপুর, ঢাকা',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
    status: 'applied',
  },
  {
    id: 2,
    name: 'সাবিনা আক্তার',
    subject: 'গণিত, পদার্থবিজ্ঞান',
    experience: '৩ বছর',
    education: 'বুয়েট, পদার্থবিজ্ঞান (বিএসসি)',
    rating: 4.9,
    reviews: 18,
    location: 'ধানমন্ডি, ঢাকা',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
    status: 'shortlisted',
  },
  {
    id: 3,
    name: 'রফিকুল ইসলাম',
    subject: 'গণিত',
    experience: '৭ বছর',
    education: 'রাজশাহী বিশ্ববিদ্যালয়, গণিত (এমফিল)',
    rating: 4.7,
    reviews: 32,
    location: 'মোহাম্মদপুর, ঢাকা',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
    status: 'applied',
  },
];

// Payment History Mock Data
const paymentHistory = [
  { id: 1, teacher: 'মোঃ করিম উদ্দিন', amount: 8000, month: 'জানুয়ারি ২০২৫', status: 'paid', date: '০৫/০১/২০২৫' },
  { id: 2, teacher: 'সাবিনা আক্তার', amount: 6000, month: 'জানুয়ারি ২০২৫', status: 'paid', date: '০৫/০১/২০২৫' },
  { id: 3, teacher: 'মোঃ করিম উদ্দিন', amount: 8000, month: 'ফেব্রুয়ারি ২০২৫', status: 'pending', date: '-' },
  { id: 4, teacher: 'সাবিনা আক্তার', amount: 6000, month: 'ফেব্রুয়ারি ২০২৫', status: 'pending', date: '-' },
];

// Subscription History Mock Data
const subscriptionHistory = [
  { id: 1, plan: 'Premium Plan', amount: 1500, startDate: '০১/০১/২০২৫', endDate: '৩১/০৩/২০২৫', status: 'active' },
  { id: 2, plan: 'Basic Plan', amount: 500, startDate: '০১/১০/২০২৪', endDate: '৩১/১২/২০২৪', status: 'expired' },
];

// Progress Reports Mock Data
const progressReports = [
  {
    id: 1,
    student: 'রাফি আহমেদ',
    teacher: 'মোঃ করিম উদ্দিন',
    subject: 'গণিত',
    overallProgress: 85,
    lastUpdate: '২৫/০১/২০২৫',
    updates: [
      { date: '২৫/০১/২০২৫', comment: 'চমৎকার অগ্রগতি। বীজগণিতে খুব ভালো করছে।', performance: 'excellent' },
      { date: '১৮/০১/২০২৫', comment: 'জ্যামিতিতে আরও অনুশীলন প্রয়োজন।', performance: 'good' },
    ],
  },
  {
    id: 2,
    student: 'সামিয়া খান',
    teacher: 'সাবিনা আক্তার',
    subject: 'ইংরেজি',
    overallProgress: 78,
    lastUpdate: '২৪/০১/২০২৫',
    updates: [
      { date: '২৪/০১/২০২৫', comment: 'গ্রামারে ভালো দক্ষতা অর্জন করছে।', performance: 'good' },
      { date: '১৭/০১/২০২৫', comment: 'স্পিকিং স্কিলে আরও উন্নতি প্রয়োজন।', performance: 'average' },
    ],
  },
];

export function GuardianDashboard({ language, onLogout, setPage, currentUser }: GuardianDashboardProps) {
  const t = content[language];
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Load credits from localStorageCredit system
  const [credits, setCredits] = useState(() => {
    if (currentUser?.id) {
      try {
        const { getOrCreateUserCredits, getCurrentBalance } = require('../utils/localStorageCredit');
        getOrCreateUserCredits(currentUser.id, 'guardian');
        return getCurrentBalance(currentUser.id);
      } catch (error) {
        console.error('Error loading credits:', error);
        return 100;
      }
    }
    return 100;
  });
  
  // Refresh credits
  const refreshCredits = () => {
    if (currentUser?.id) {
      try {
        const { getCurrentBalance } = require('../utils/localStorageCredit');
        const balance = getCurrentBalance(currentUser.id);
        setCredits(balance);
      } catch (error) {
        console.error('Error refreshing credits:', error);
      }
    }
  };
  
  // Listen for credit updates
  useState(() => {
    const handleCreditsUpdate = () => refreshCredits();
    window.addEventListener('creditsUpdated', handleCreditsUpdate);
    return () => window.removeEventListener('creditsUpdated', handleCreditsUpdate);
  });
  
  const [isPostDialogOpen, setIsPostDialogOpen] = useState(false);
  
  // Review System States
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedTeacherForReview, setSelectedTeacherForReview] = useState<{
    id: string;
    name: string;
  } | null>(null);
  
  // Platform Review Dialog
  const [platformReviewDialogOpen, setPlatformReviewDialogOpen] = useState(false);
  
  // Ticket System State
  const [showTicketSystem, setShowTicketSystem] = useState(false);
  
  // Profile states
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80');
  const [profileData, setProfileData] = useState({
    name: 'মিসেস রহিমা খাতুন',
    email: 'rahima@example.com',
    phone: '০১৭১২৩৪৫৬৭৮',
    address: 'ধানমন্ডি, ঢাকা',
    bio: 'আমার সন্তানের ভবিষ্যতের জন্য সেরা শিক্ষা নিশ্চিত করতে চাই',
  });

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    alert(language === 'bn' ? 'প্রোফাইল সফলভাবে আপডেট হয়েছে!' : 'Profile updated successfully!');
  };

  // Handle hiring a teacher
  const handleHireTeacher = (teacherId: number, teacherName: string) => {
    if (!currentUser?.id) return;
    
    try {
      const { hireTeacher, CREDIT_COSTS, hasEnoughCredits } = require('../utils/localStorageCredit');
      
      const hireCost = CREDIT_COSTS.SEND_INVITATION; // 5 credits
      
      if (hasEnoughCredits(currentUser.id, hireCost)) {
        hireTeacher(currentUser.id, `teacher-${teacherId}`, 'tuition-1', language);
        refreshCredits();
        
        toast.success(
          language === 'bn'
            ? `${teacherName} কে সফলভাবে নিয়োগ দেওয়া হয়েছে! ${hireCost} ক্রেডিট কাটা হয়েছে।`
            : `Successfully hired ${teacherName}! ${hireCost} credits deducted.`
        );
      } else {
        toast.error(
          language === 'bn'
            ? `পর্যাপ্ত ক্রেডিট নেই। শিক্ষক নিয়োগে ${hireCost} ক্রেডিট প্রয়োজন।`
            : `Insufficient credits. ${hireCost} credits required to hire teacher.`
        );
        setPage('subscription');
      }
    } catch (error) {
      console.error('Error hiring teacher:', error);
      toast.error(
        language === 'bn'
          ? 'শিক্ষক নিয়োগে সমস্যা হয়েছে।'
          : 'Failed to hire teacher.'
      );
    }
  };
  
  // Handle posting a tuition
  const handlePostTuition = () => {
    if (!currentUser?.id) return;
    
    try {
      const { postTuition, CREDIT_COSTS, hasEnoughCredits } = require('../utils/localStorageCredit');
      
      if (hasEnoughCredits(currentUser.id, CREDIT_COSTS.POST_TUITION)) {
        const tuitionId = `tuition-${Date.now()}`;
        postTuition(currentUser.id, tuitionId, language);
        refreshCredits();
        
        toast.success(
          language === 'bn'
            ? `টিউশন সফলভাবে পোস্ট করা হয়েছে! ${CREDIT_COSTS.POST_TUITION} ক্রেডিট কাটা হয়েছে।`
            : `Tuition posted successfully! ${CREDIT_COSTS.POST_TUITION} credits deducted.`
        );
        
        setIsPostDialogOpen(false);
      } else {
        toast.error(
          language === 'bn'
            ? `পর্যাপ্ত ক্রেডিট নেই। টিউশন পোস্ট করতে ${CREDIT_COSTS.POST_TUITION} ক্রেডিট প্রয়োজন।`
            : `Insufficient credits. ${CREDIT_COSTS.POST_TUITION} credits required to post tuition.`
        );
        setPage('subscription');
      }
    } catch (error) {
      console.error('Error posting tuition:', error);
      toast.error(
        language === 'bn'
          ? 'টিউশন পোস্ট করতে সমস্যা হয়েছে।'
          : 'Failed to post tuition.'
      );
    }
  };

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    if (!selectedTeacherForReview) return;
    
    console.log('Review submitted:', {
      reviewerId: 'current-guardian-id',
      reviewerType: 'guardian',
      targetId: selectedTeacherForReview.id,
      targetType: 'teacher',
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString(),
    });
    
    toast.success(`রিভিউ সফলভাবে জমা হয়েছে! ${selectedTeacherForReview.name} কে ${review.rating} ⭐ দিয়েছেন।`);
    setSelectedTeacherForReview(null);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(language === 'bn' ? 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!' : 'Password changed successfully!');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-rose-50 to-rose-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-teal-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <TalentTutorLogo size="md" showText={true} showSubtitle={false} />
            <p className="text-xs text-gray-500 hidden sm:block ml-2">
              {language === 'bn' ? 'অভিভাবক ড্যাশবোর্ড' : 'Guardian Dashboard'}
            </p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <NotificationCenter 
              setPage={setPage}
              language={language}
              userRole="guardian"
            />
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-teal-50 to-rose-50 border border-teal-200 rounded-xl shadow-sm">
              <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-teal-600" />
              <span className="font-semibold text-teal-700">{credits}</span>
              <span className="text-sm text-teal-600 hidden sm:inline">{language === 'bn' ? 'ক্রেডিট' : 'Credits'}</span>
            </div>
            <Button 
              variant="ghost" 
              size="icon"
              onClick={onLogout}
              className="hover:bg-red-50 hover:text-red-600 transition-colors"
            >
              <LogOut className="w-5 h-5" />
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-6">
          {/* Modern Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-5 shadow-lg border-teal-100 bg-white/80 backdrop-blur-sm">
              <div className="space-y-2">
                <Button
                  variant={activeTab === 'dashboard' ? 'default' : 'ghost'}
                  className={`w-full justify-start transition-all ${
                    activeTab === 'dashboard' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' 
                      : 'hover:bg-emerald-50'
                  }`}
                  onClick={() => setActiveTab('dashboard')}
                >
                  <Home className="w-4 h-4 mr-2" />
                  {t.dashboard}
                </Button>
                <Dialog open={isPostDialogOpen} onOpenChange={setIsPostDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="ghost" className="w-full justify-start">
                      <PlusCircle className="w-4 h-4 mr-2" />
                      {t.postJob}
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle>{t.createJobPost}</DialogTitle>
                      <DialogDescription>
                        আপনার সন্তানের জন্য উপযুক্ত শিক্ষক খুঁজতে নিচের ফর্মটি পূরণ করুন
                      </DialogDescription>
                    </DialogHeader>
                    <form className="space-y-4">
                      <div>
                        <Label>{t.jobTitle}</Label>
                        <Input placeholder="যেমন: গণিত শিক্ষক প্রয়োজন (ক্লাস ৮-১০)" />
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>{t.subject}</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="বিষয় নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="math">গণিত</SelectItem>
                              <SelectItem value="english">ইংরেজি</SelectItem>
                              <SelectItem value="science">বিজ্ঞান</SelectItem>
                              <SelectItem value="bangla">বাংলা</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>{t.class}</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="শ্রেণী নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="6-8">ক্লাস ৬-৮</SelectItem>
                              <SelectItem value="9-10">ক্লাস ৯-১০</SelectItem>
                              <SelectItem value="11-12">একাদশ-দ্বাদশ</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>{t.medium}</Label>
                          <Select>
                            <SelectTrigger>
                              <SelectValue placeholder="মাধ্যম নির্বাচন করুন" />
                            </SelectTrigger>
                            <SelectContent className="font-[Noto_Serif_Bengali]">
                              <SelectItem value="bangla">বাংলা মাধ্যম</SelectItem>
                              <SelectItem value="english">ইংরেজি মাধ্যম</SelectItem>
                              <SelectItem value="both">উভয়</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label>{t.location}</Label>
                          <Input placeholder="যেমন: ধানমন্ডি, ঢাকা" />
                        </div>
                      </div>
                      <div>
                        <Label>{t.salary}</Label>
                        <Input placeholder="যেমন: ৮,০০০-১০,��০০ টাকা" />
                      </div>
                      <div>
                        <Label>{t.schedule}</Label>
                        <Input placeholder="যেমন: সপ্তাহে ৪ দিন, প্রতিদিন ১.৫ ঘন্টা" />
                      </div>
                      <div>
                        <Label>{t.requirements}</Label>
                        <Textarea placeholder="শিক্ষকের অভিজ্ঞতা, শিক্ষাগত যোগ্যতা..." rows={3} />
                      </div>
                      <div>
                        <Label>{t.description}</Label>
                        <Textarea placeholder="অতিরিক্ত বিস্তারিত তথ্য..." rows={4} />
                      </div>
                      <Button
                        type="submit"
                        className="w-full bg-teal-600 hover:bg-teal-700"
                        onClick={() => setIsPostDialogOpen(false)}
                      >
                        {t.postNow}
                      </Button>
                    </form>
                  </DialogContent>
                </Dialog>
                <Button
                  variant={activeTab === 'posts' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('posts')}
                >
                  <BookOpen className="w-4 h-4 mr-2" />
                  {t.myPosts}
                </Button>
                <Button
                  variant={activeTab === 'teachers' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setPage('find-teachers')}
                >
                  <Users className="w-4 h-4 mr-2" />
                  {t.findTeachers}
                </Button>
                <Button
                  variant={activeTab === 'teachersMap' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('teachersMap')}
                >
                  <MapPin className="w-4 h-4 mr-2" />
                  {t.findTeachersMap}
                </Button>
                <Button
                  variant={activeTab === 'payments' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('payments')}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {t.payments}
                </Button>
                <Button
                  variant={activeTab === 'progress' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('progress')}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {t.progressReports}
                </Button>
                <Button
                  variant={activeTab === 'contracts' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('contracts')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {t.contracts}
                </Button>
                <Button
                  variant={activeTab === 'donate' ? 'default' : 'ghost'}
                  className="w-full justify-start bg-gradient-to-r from-rose-50 to-pink-50 hover:from-rose-100 hover:to-pink-100 border border-rose-200"
                  onClick={() => setActiveTab('donate')}
                >
                  <Heart className="w-4 h-4 mr-2 text-rose-600" />
                  <span className="text-rose-700">{t.donate}</span>
                </Button>
                <Button
                  variant={activeTab === 'messages' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('messages')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t.messages}
                  <Badge className="ml-auto" variant="secondary">
                    5
                  </Badge>
                </Button>
                <Button
                  variant="ghost"
                  className="w-full justify-start bg-gradient-to-r from-yellow-50 to-amber-50 hover:from-yellow-100 hover:to-amber-100 border border-yellow-200"
                  onClick={() => setPlatformReviewDialogOpen(true)}
                >
                  <Star className="w-4 h-4 mr-2 text-yellow-600" />
                  <span className="text-yellow-700">{t.writeReview}</span>
                </Button>
                <Button
                  variant={activeTab === 'support' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('support')}
                >
                  <Bell className="w-4 h-4 mr-2" />
                  {t.support}
                </Button>
                <Button
                  variant={activeTab === 'profile' ? 'default' : 'ghost'}
                  className="w-full justify-start"
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="w-4 h-4 mr-2" />
                  {t.profile}
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {activeTab === 'dashboard' && (
              <div className="space-y-6">
                <div>
                  <h1 className="text-gray-900 mb-2">
                    {t.welcome}, মিসেস রহিমা খাতুন!
                  </h1>
                  <p className="text-gray-600">আপনার আজকের সংক্ষিপ্ত তথ্য</p>
                </div>

                {/* Admin Notices */}
                <Card className="p-6">
                  <h3 className="text-xl mb-4 flex items-center gap-2">
                    <Bell className="w-5 h-5 text-teal-600" />
                    {language === 'bn' ? 'গুরুত্বপূর্ণ নোটিশ' : 'Important Notices'}
                  </h3>
                  <AdminNoticeViewer language={language} userRole="guardian" maxItems={3} />
                </Card>

                {/* Stats */}
                <div className="grid md:grid-cols-4 gap-4">
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">ক্রেডিট</span>
                      <Wallet className="w-5 h-5 text-teal-600" />
                    </div>
                    <div className="text-2xl text-gray-900">{credits}</div>
                  </Card>
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">সক্���িয় পোস্ট</span>
                      <BookOpen className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-2xl text-gray-900">2</div>
                  </Card>
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">আবেদন</span>
                      <Users className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-2xl text-gray-900">20</div>
                  </Card>
                  <Card className="p-6">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">নিয়োগপ্রাপ্ত</span>
                      <Star className="w-5 h-5 text-yellow-500" />
                    </div>
                    <div className="text-2xl text-gray-900">1</div>
                  </Card>
                </div>

                {/* Recent Applicants */}
                <Card className="p-6">
                  <h3 className="text-gray-900 mb-4">সাম্প্রতিক আবেদনকারী</h3>
                  <div className="space-y-4">
                    {applicants.slice(0, 3).map((applicant) => (
                      <div key={applicant.id} className="flex items-start gap-4 p-4 border rounded-lg hover:bg-gray-50">
                        <CardAvatar 
                          src={applicant.photo}
                          alt={applicant.name}
                          fallback={applicant.name.charAt(0)}
                          size="lg"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h4 className="text-gray-900">{applicant.name}</h4>
                              <p className="text-gray-600 text-sm">{applicant.subject}</p>
                            </div>
                            {applicant.status === 'shortlisted' && (
                              <Badge className="bg-green-600">শর্টলিস্টেড</Badge>
                            )}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                            <span>📚 {applicant.experience}</span>
                            <span>⭐ {applicant.rating} ({applicant.reviews})</span>
                            <span>📍 {applicant.location}</span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">প্রোফাইল দেখুন</Button>
                            {applicant.status === 'applied' && (
                              <>
                                <Button size="sm" className="bg-green-600">শর্টলিস্ট</Button>
                                <Button size="sm" variant="outline">প্রত্যাখ্যান</Button>
                              </>
                            )}
                            {applicant.status === 'shortlisted' && (
                              <Button 
                                size="sm" 
                                className="bg-teal-600"
                                onClick={() => handleHireTeacher(applicant.id, applicant.name)}
                              >
                                নিয়োগ দিন
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'posts' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-gray-900">{t.myPosts}</h2>
                  <Button onClick={() => setIsPostDialogOpen(true)} className="bg-teal-600">
                    <PlusCircle className="w-4 h-4 mr-2" />
                    নতুন পোস্ট
                  </Button>
                </div>
                <div className="space-y-4">
                  {myPosts.map((post) => (
                    <Card key={post.id} className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-gray-900 mb-1">{post.title}</h3>
                          <p className="text-gray-600">{post.location}</p>
                        </div>
                        <Badge className="bg-green-600">সক্রিয়</Badge>
                      </div>
                      <div className="flex flex-wrap gap-2 mb-4">
                        <Badge variant="secondary">{post.subject}</Badge>
                        <Badge variant="secondary">{post.class}</Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <p>💰 {post.salary}</p>
                          <p>
                            ⏰ {post.posted} • 👥 {post.applicants} আবেদন
                          </p>
                        </div>
                        <Button size="sm" onClick={() => setActiveTab('teachers')}>
                          আবেদন দেখুন
                        </Button>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'teachers' && (
              <div className="space-y-6">
                <h2 className="text-gray-900">আবেদনকারী শিক্ষক</h2>
                <div className="space-y-4">
                  {applicants.map((applicant) => (
                    <Card key={applicant.id} className="p-6 hover:shadow-lg transition-shadow">
                      <div className="flex items-start gap-4">
                        <img
                          src={applicant.photo}
                          alt={applicant.name}
                          className="w-20 h-20 rounded-full object-cover"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-2">
                            <div>
                              <h3 className="text-gray-900 mb-1">{applicant.name}</h3>
                              <p className="text-gray-600">{applicant.education}</p>
                            </div>
                            {applicant.status === 'shortlisted' && (
                              <Badge className="bg-green-600">শর্টলিস্টেড</Badge>
                            )}
                          </div>
                          <div className="flex flex-wrap gap-2 mb-3">
                            {applicant.subject.split(', ').map((subj, i) => (
                              <Badge key={i} variant="secondary">
                                {subj}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center gap-4 text-sm text-gray-600 mb-4">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-4 h-4" />
                              {applicant.experience}
                            </span>
                            <span className="flex items-center gap-1">
                              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                              {applicant.rating} ({applicant.reviews} রিভিউ)
                            </span>
                            <span className="flex items-center gap-1">
                              <MapPin className="w-4 h-4" />
                              {applicant.location}
                            </span>
                          </div>
                          <div className="flex gap-2">
                            <Button size="sm" variant="outline">
                              প্রোফাইল দেখুন
                            </Button>
                            <Button size="sm" variant="outline">
                              <MessageSquare className="w-4 h-4 mr-1" />
                              মেসেজ
                            </Button>
                            {applicant.status === 'applied' && (
                              <>
                                <Button size="sm" className="bg-green-600">
                                  শর্টলিস্ট
                                </Button>
                                <Button size="sm" variant="outline" className="text-red-600">
                                  প্রত্যাখ্যান
                                </Button>
                              </>
                            )}
                            {applicant.status === 'shortlisted' && (
                              <Button size="sm" className="bg-teal-600">
                                নিয়োগ দিন
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'payments' && (
              <div className="space-y-6">
                <h2 className="text-gray-900">{t.payments}</h2>
                
                {/* Payment Requests Notification */}
                {(() => {
                  const requests = JSON.parse(localStorage.getItem('paymentRequests') || '[]');
                  const pendingRequests = requests.filter((req: any) => req.status === 'pending');
                  
                  if (pendingRequests.length > 0) {
                    return (
                      <Card className="p-6 bg-gradient-to-r from-amber-50 to-orange-50 border-2 border-amber-200">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 bg-amber-600 rounded-full flex items-center justify-center shrink-0">
                            <Bell className="w-6 h-6 text-white" />
                          </div>
                          <div className="flex-1">
                            <h3 className="text-lg text-amber-900 mb-2">নতুন পেমেন্ট রিকুয়েস্ট!</h3>
                            <p className="text-amber-700 mb-4">
                              আপনার {pendingRequests.length} টি নতুন পেমেন্ট রিকুয়েস্ট রয়েছে
                            </p>
                            <div className="space-y-3">
                              {pendingRequests.map((req: any) => (
                                <div key={req.id} className="bg-white p-4 rounded-lg">
                                  <div className="flex items-center justify-between mb-2">
                                    <div>
                                      <p className="text-gray-900 font-medium">{req.teacherName}</p>
                                      <p className="text-sm text-gray-600">{req.student} - {req.month}</p>
                                    </div>
                                    <p className="text-lg text-amber-700 font-bold">৳{req.amount.toLocaleString()}</p>
                                  </div>
                                  <div className="flex gap-2 mt-3">
                                    <Button
                                      size="sm"
                                      className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
                                      onClick={() => {
                                        const updatedRequests = requests.map((r: any) =>
                                          r.id === req.id ? { ...r, status: 'paid' } : r
                                        );
                                        localStorage.setItem('paymentRequests', JSON.stringify(updatedRequests));
                                        toast.success('পেমেন্ট সফল হয়েছে!', {
                                          description: `${req.teacherName} কে ৳${req.amount.toLocaleString()} পরিশোধ করা হয়েছে`
                                        });
                                        window.location.reload();
                                      }}
                                    >
                                      <CheckCircle className="w-4 h-4 mr-1" />
                                      পেমেন্ট করুন
                                    </Button>
                                    <Button
                                      size="sm"
                                      variant="outline"
                                      onClick={() => {
                                        const updatedRequests = requests.filter((r: any) => r.id !== req.id);
                                        localStorage.setItem('paymentRequests', JSON.stringify(updatedRequests));
                                        toast.success('রিকুয়েস্ট বাতিল করা হয়েছে');
                                        window.location.reload();
                                      }}
                                      className="border-red-300 text-red-600 hover:bg-red-50"
                                    >
                                      <X className="w-4 h-4 mr-1" />
                                      বাতিল করুন
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </Card>
                    );
                  }
                  return null;
                })()}
                
                <Tabs defaultValue="payment-history">
                  <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value="payment-history">{t.paymentHistory}</TabsTrigger>
                    <TabsTrigger value="subscription">{t.subscriptionHistory}</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="payment-history" className="space-y-4 mt-6">
                    {/* Payment Summary */}
                    <div className="grid md:grid-cols-2 gap-4">
                      <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">{t.totalPaid}</span>
                          <CheckCircle className="w-5 h-5 text-green-600" />
                        </div>
                        <div className="text-2xl text-green-700">৳ ১৪,০০০</div>
                        <p className="text-sm text-gray-500 mt-1">এই মাসে</p>
                      </Card>
                      <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50">
                        <div className="flex items-center justify-between mb-2">
                          <span className="text-gray-600">{t.totalPending}</span>
                          <DollarSign className="w-5 h-5 text-amber-600" />
                        </div>
                        <div className="text-amber-700">৳ ১৪,০০০</div>
                        <p className="text-sm text-gray-500 mt-1">পরবর্তী মাস</p>
                      </Card>
                    </div>

                    {/* Payment History Table */}
                    <Card className="overflow-hidden">
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-gray-900">{t.teacherName}</th>
                              <th className="px-6 py-3 text-left text-gray-900">{t.month}</th>
                              <th className="px-6 py-3 text-left text-gray-900">{t.amount}</th>
                              <th className="px-6 py-3 text-left text-gray-900">{t.status}</th>
                              <th className="px-6 py-3 text-left text-gray-900">{t.date}</th>
                              <th className="px-6 py-3 text-left text-gray-900">অ্যাকশন</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {paymentHistory.map((payment) => (
                              <tr key={payment.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-900">{payment.teacher}</td>
                                <td className="px-6 py-4 text-gray-600">{payment.month}</td>
                                <td className="px-6 py-4 text-gray-900">৳ {payment.amount.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                  {payment.status === 'paid' ? (
                                    <Badge className="bg-green-600">{t.paid}</Badge>
                                  ) : (
                                    <Badge className="bg-amber-600">{t.pending}</Badge>
                                  )}
                                </td>
                                <td className="px-6 py-4 text-gray-600">{payment.date}</td>
                                <td className="px-6 py-4">
                                  {payment.status === 'pending' && (
                                    <Button size="sm" className="bg-teal-600">
                                      {t.payNow}
                                    </Button>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="subscription" className="space-y-4 mt-6">
                    <div className="grid md:grid-cols-3 gap-4">
                      <Card className="p-6 md:col-span-2 bg-gradient-to-br from-teal-50 to-cyan-50">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <Badge className="bg-teal-600 mb-2">সক্রিয়</Badge>
                            <h3 className="text-xl text-gray-900">Premium Plan</h3>
                            <p className="text-gray-600">সর্বোচ্চ সুবিধা সহ</p>
                          </div>
                          <div className="text-right">
                            <div className="text-teal-700">৳ ১,৫০০</div>
                            <p className="text-sm text-gray-500">৩ মাসের জন্য</p>
                          </div>
                        </div>
                        <div className="space-y-2 mb-4">
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>অসীম টিউশন পোস্ট</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>প্রিমিয়াম শিক্ষক অ্যাক্সেস</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-gray-600">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                            <span>প্রায়োরিটি সাপোর্ট</span>
                          </div>
                        </div>
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="text-sm text-gray-600">
                            {t.renewalDate}: <span className="text-gray-900">৩১/০৩/২০২৫</span>
                          </div>
                          <Button size="sm" variant="outline">নবায়ন করুন</Button>
                        </div>
                      </Card>
                      <Card className="p-6">
                        <h4 className="text-gray-900 mb-4">দ্রুত অ্যাকশন</h4>
                        <div className="space-y-2">
                          <Button className="w-full" variant="outline" onClick={() => setPage('subscription')}>
                            <Gift className="w-4 h-4 mr-2" />
                            আপগ্রেড করুন
                          </Button>
                          <Button className="w-full" variant="outline">
                            <FileText className="w-4 h-4 mr-2" />
                            ইনভয়েস ডাউনলোড
                          </Button>
                        </div>
                      </Card>
                    </div>

                    {/* Subscription History */}
                    <Card className="overflow-hidden">
                      <div className="p-6 bg-gray-50 border-b">
                        <h3 className="text-gray-900">সাবস্ক্রিপশন ইতিহাস</h3>
                      </div>
                      <div className="overflow-x-auto">
                        <table className="w-full">
                          <thead className="bg-gray-50">
                            <tr>
                              <th className="px-6 py-3 text-left text-gray-900">{t.subscriptionPlan}</th>
                              <th className="px-6 py-3 text-left text-gray-900">শুরুর তারিখ</th>
                              <th className="px-6 py-3 text-left text-gray-900">শেষ তারিখ</th>
                              <th className="px-6 py-3 text-left text-gray-900">{t.amount}</th>
                              <th className="px-6 py-3 text-left text-gray-900">{t.status}</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y">
                            {subscriptionHistory.map((sub) => (
                              <tr key={sub.id} className="hover:bg-gray-50">
                                <td className="px-6 py-4 text-gray-900">{sub.plan}</td>
                                <td className="px-6 py-4 text-gray-600">{sub.startDate}</td>
                                <td className="px-6 py-4 text-gray-600">{sub.endDate}</td>
                                <td className="px-6 py-4 text-gray-900">৳ {sub.amount.toLocaleString()}</td>
                                <td className="px-6 py-4">
                                  {sub.status === 'active' ? (
                                    <Badge className="bg-green-600">সক্রিয়</Badge>
                                  ) : (
                                    <Badge className="bg-gray-600">মেয়াদউত্তীর্ণ</Badge>
                                  )}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            )}

            {activeTab === 'progress' && (
              <GuardianProgressReports language={language} />
            )}
            
            {activeTab === 'progress-old-backup' && (
              <div className="space-y-6">
                <h2 className="text-gray-900">{t.progressReports}</h2>
                
                {progressReports.map((report) => (
                  <Card key={report.id} className="p-6">
                    <div className="flex items-start justify-between mb-6">
                      <div>
                        <h3 className="text-xl text-gray-900 mb-1">{report.student}</h3>
                        <p className="text-gray-600">{report.subject} • শিক্���ক: {report.teacher}</p>
                      </div>
                      <Badge className="bg-teal-600">সর্বশেষ: {report.lastUpdate}</Badge>
                    </div>

                    {/* Overall Progress */}
                    <div className="mb-6">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-gray-700">{t.overallPerformance}</span>
                        <span className="text-xl text-teal-700">{report.overallProgress}%</span>
                      </div>
                      <Progress value={report.overallProgress} className="h-3" />
                    </div>

                    {/* Recent Updates */}
                    <div>
                      <h4 className="text-gray-900 mb-3">{t.recentUpdates}</h4>
                      <div className="space-y-3">
                        {report.updates.map((update, idx) => (
                          <div key={idx} className="border-l-4 border-teal-500 pl-4 py-2">
                            <div className="flex items-center justify-between mb-1">
                              <span className="text-sm text-gray-500">{update.date}</span>
                              {update.performance === 'excellent' && (
                                <Badge className="bg-green-600">চমৎকার</Badge>
                              )}
                              {update.performance === 'good' && (
                                <Badge className="bg-blue-600">ভালো</Badge>
                              )}
                              {update.performance === 'average' && (
                                <Badge className="bg-yellow-600 font-[Noto_Serif_Bengali]">গড়</Badge>
                              )}
                            </div>
                            <p className="text-gray-700">{update.comment}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </Card>
                ))}
                
                {/* Rate Your Teachers Section */}
                <Card className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50">
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    শিক্ষকদের রিভিউ করুন
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    আপনার অভিজ্ঞতা শেয়ার করুন এবং শিক্ষকদের রেটিং দিন
                  </p>
                  <div className="space-y-3">
                    {progressReports.map((report) => (
                      <div key={report.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <p className="text-gray-900">{report.teacher}</p>
                          <p className="text-sm text-gray-500">{report.student} এর {report.subject} শিক্ষক</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedTeacherForReview({
                              id: `teacher-${report.id}`,
                              name: report.teacher,
                            });
                            setIsReviewDialogOpen(true);
                          }}
                          className="bg-yellow-600 hover:bg-yellow-700"
                        >
                          <Star className="w-4 h-4 mr-1" />
                          রিভিউ দিন
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'teachersMap' && (
              <div className="space-y-6">
                <EnhancedAITeacherFinderMap language={language} />
              </div>
            )}

            {activeTab === 'contracts' && (
              <ContractManagementSection userRole="guardian" language={language} />
            )}

            {activeTab === 'donate' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-gray-900 mb-2">{t.donate}</h2>
                  <p className="text-gray-600">অসহায় শিক্ষার্থীদের সাহায্য করুন</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {/* Donate Books */}
                  <Card className="p-6 bg-gradient-to-br from-teal-50 to-cyan-50 border-2 border-teal-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center">
                        <Book className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl text-gray-900 mb-1">{t.donateBooks}</h3>
                        <p className="text-gray-600">আপনার পুরাতন বই দান করুন</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">
                      আপনার ব্যবহৃত বই এবং শিক্ষা উপকরণ দান করে অসহায় শিক্ষার্থীদের পড়াশোনায় সাহায্য করুন।
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span>বিনামূল্যে পিকআপ সুবিধা</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span>দান সার্টিফিকেট প্রদান</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-teal-600" />
                        <span>সরাসরি শিক্ষার্থীদের কাছে পৌঁছায়</span>
                      </div>
                    </div>
                    <Button className="w-full bg-teal-600 hover:bg-teal-700" onClick={() => setPage('donation-library')}>
                      {t.donateToLibrary}
                    </Button>
                  </Card>

                  {/* Donate Zakat */}
                  <Card className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200 hover:shadow-lg transition-shadow">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center">
                        <Heart className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <h3 className="text-xl text-gray-900 mb-1">{t.donateZakat}</h3>
                        <p className="text-gray-600">যাকাত ও দান করুন</p>
                      </div>
                    </div>
                    <p className="text-gray-600 mb-6">
                      আপনার যাকাত এবং দান অসহায় শিক্ষার্থীদের বৃত্তি, বই এবং অন্যান্য শিক্ষা উপকরণ প্রদানে ব্যবহৃত হবে।
                    </p>
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-rose-600" />
                        <span>১০০% স্বচ্ছতা নিশ্���িত</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-rose-600" />
                        <span>মাসিক রিপোর্ট প্রদান</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600">
                        <CheckCircle className="w-4 h-4 text-rose-600" />
                        <span>যোগ্য শিক্ষার্থী নির্বাচন</span>
                      </div>
                    </div>
                    <Button className="w-full bg-rose-600 hover:bg-rose-700" onClick={() => setPage('donation')}>
                      {t.donateToZakat}
                    </Button>
                  </Card>
                </div>

                {/* Donation Impact */}
                <Card className="p-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  <h3 className="text-xl text-white mb-4">আপনার দানের প্রভাব</h3>
                  <div className="grid md:grid-cols-3 gap-6">
                    <div className="text-center">
                      <div className="text-3xl mb-2">২৫০+</div>
                      <p className="text-emerald-100">শিক্ষার্থী উপকৃত</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">১,০০০+</div>
                      <p className="text-emerald-100">বই বিতরণ</p>
                    </div>
                    <div className="text-center">
                      <div className="text-3xl mb-2">৫০+</div>
                      <p className="text-emerald-100">বৃত্তি প্রদান</p>
                    </div>
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-gray-900 mb-2">{t.support}</h2>
                  <p className="text-gray-600">সাপোর্ট টিকেট তৈরি করুন এবং আপনার সমস্যার সমাধান পান</p>
                </div>

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
                      onClick={() => setPage('guardian-guidelines')}
                    >
                      <User className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-left text-sm">
                        {language === 'bn' ? 'অভিভাবকদের নির্দেশনা' : 'Guardian Guidelines'}
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

                <Card className="p-8 text-center">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-teal-600" />
                  <h3 className="text-xl text-gray-900 mb-2">সাপোর্ট টিকেট সিস্টেম</h3>
                  <p className="text-gray-600 mb-6">
                    কোন সমস্যা হলে টিকেট তৈরি করুন। আমরা শীঘ্রই সাহায্য করব।
                  </p>
                  <Button
                    onClick={() => setShowTicketSystem(true)}
                    className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    নতুন টিকেট তৈরি করুন
                  </Button>
                </Card>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-gray-900 mb-2">{t.profileSettings}</h2>
                  <p className="text-gray-600">আপনার প্রোফাইল তথ্য আপডেট করুন</p>
                </div>

                {/* Profile Image Section */}
                <Card className="p-6">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <ProfilePageAvatar 
                        src={profileImage}
                        alt={profileData.name}
                        fallback={profileData.name.charAt(0)}
                        editable={true}
                        onEditClick={() => document.getElementById('profile-image-guardian')?.click()}
                        className="ring-teal-100"
                      />
                      <input
                        id="profile-image-guardian"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleImageChange}
                      />
                    </div>
                    <div>
                      <h3 className="text-xl text-gray-900 mb-2">{profileData.name}</h3>
                      <p className="text-gray-600 mb-1">{profileData.email}</p>
                      <p className="text-gray-600">{profileData.phone}</p>
                      <Badge className="mt-2 bg-teal-600">অভিভাবক</Badge>
                    </div>
                  </div>
                </Card>

                {/* Personal Information Form */}
                <Card className="p-6">
                  <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-teal-600" />
                    {t.personalInfo}
                  </h3>
                  <form onSubmit={handleProfileUpdate} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>{t.fullName}</Label>
                        <Input
                          value={profileData.name}
                          onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label className="flex items-center gap-2">
                          <Mail className="w-4 h-4" />
                          {t.email}
                        </Label>
                        <Input
                          type="email"
                          value={profileData.email}
                          onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label className="flex items-center gap-2">
                          <Phone className="w-4 h-4" />
                          {t.phoneNumber}
                        </Label>
                        <Input
                          value={profileData.phone}
                          onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                          required
                        />
                      </div>
                      <div>
                        <Label className="flex items-center gap-2">
                          <MapPin className="w-4 h-4" />
                          {t.address}
                        </Label>
                        <Input
                          value={profileData.address}
                          onChange={(e) => setProfileData({ ...profileData, address: e.target.value })}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <Label>{t.bio}</Label>
                      <Textarea
                        value={profileData.bio}
                        onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                        rows={3}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-teal-600">
                        <Save className="w-4 h-4 mr-2" />
                        {t.saveChanges}
                      </Button>
                      <Button type="button" variant="outline">{t.cancel}</Button>
                    </div>
                  </form>
                </Card>

                {/* Change Password */}
                <Card className="p-6">
                  <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <Lock className="w-5 h-5 text-teal-600" />
                    {t.changePassword}
                  </h3>
                  <form onSubmit={handlePasswordChange} className="space-y-4">
                    <div>
                      <Label>{t.currentPassword}</Label>
                      <Input type="password" required />
                    </div>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>{t.newPassword}</Label>
                        <Input type="password" required />
                      </div>
                      <div>
                        <Label>{t.confirmPassword}</Label>
                        <Input type="password" required />
                      </div>
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-teal-600">
                        <Lock className="w-4 h-4 mr-2" />
                        {t.changePassword}
                      </Button>
                      <Button type="button" variant="outline">{t.cancel}</Button>
                    </div>
                  </form>
                </Card>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl text-gray-900 mb-2">বার্তা</h2>
                  <p className="text-gray-600">আপনার নিয়োগকৃত শিক্ষকদের সাথে কথোপকথন করুন</p>
                </div>

                <ContractMessagingSystem
                  userId="guardian-demo-001"
                  userName="রহিমা খাতুন"
                  userRole="guardian"
                  language={language}
                />
              </div>
            )}


          </div>
        </div>
      </div>
      
      {/* Review Dialog */}
      <ReviewDialog
        open={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        language={language}
        targetType="teacher"
        targetName={selectedTeacherForReview?.name || ''}
        targetId={selectedTeacherForReview?.id || ''}
        onSubmit={handleReviewSubmit}
      />

      {/* Ticket System Dialog */}
      <TicketSystem
        open={showTicketSystem}
        onOpenChange={setShowTicketSystem}
        language={language}
        userRole="guardian"
        userId="guardian-demo-001"
        userName="রহিমা খাতুন"
      />

      {/* Platform Review Dialog */}
      <PlatformReviewDialog
        open={platformReviewDialogOpen}
        onOpenChange={setPlatformReviewDialogOpen}
        language={language}
        userType="guardian"
        userName={currentUser?.name || profileData.name || 'মিসেস রহিমা খাতুন'}
      />
    </div>
  );
}
