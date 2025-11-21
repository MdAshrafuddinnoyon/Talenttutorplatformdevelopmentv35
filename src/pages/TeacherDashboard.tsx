import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '../components/ui/dialog';
import { Progress } from '../components/ui/progress';
import { CardAvatar } from '../components/ui/profile-avatar';
import {
  Home,
  Search,
  Briefcase,
  MessageSquare,
  Bell,
  Wallet,
  Star,
  User,
  LogOut,
  CreditCard,
  CheckCircle,
  Clock,
  X,
  DollarSign,
  TrendingUp,
  FileText,
  PlusCircle,
  Camera,
  Lock,
  Mail,
  Phone,
  MapPin,
  Save,
  Calendar,
  BookOpen,
  Video,
  Download,
  Send,
} from 'lucide-react';
import { ContractManagementSection } from '../components/ContractManagementSection';
import { ProfileCompletionDialog } from '../components/ProfileCompletionDialog';
import { ReviewDialog } from '../components/ReviewDialog';
import { NotificationCenter } from '../components/NotificationCenter';
import { TicketSystem } from '../components/TicketSystem';
import { TalentTutorLogo } from '../components/TalentTutorLogo';
import { ContractMessagingSystem } from '../components/ContractMessagingSystem';
import { PlatformReviewDialog } from '../components/PlatformReviewDialog';

import { toast } from 'sonner@2.0.3';
import { type User, type UserRole } from '../utils/authGuard';
import { TeacherJobApplicationManager } from '../components/TeacherJobApplicationManager';
import { JobDetailsDialog } from '../components/JobDetailsDialog';
import { ApplyTuitionDialog } from '../components/ApplyTuitionDialog';
import { PaymentGatewayDialog } from '../components/PaymentGatewayDialog';
import { PaymentInvoiceGenerator } from '../components/PaymentInvoiceGenerator';

interface TeacherDashboardProps {
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
    findJobs: 'টিউশন খুঁজুন',
    myApplications: 'আমার আবেদন',
    messages: 'মেসেজ',
    profile: 'প্রোফাইল',
    credits: 'ক্রেডিট',
    support: 'সাপোর্ট',
    logout: 'লগআউট',
    welcome: 'স্বাগতম',
    creditBalance: 'ক্রেডিট ব্যালেন্স',
    buyCredits: 'ক্রেডিট কিনুন',
    totalApplications: 'মোট আবেদন',
    shortlisted: 'শর্টলিস্টেড',
    hired: 'নিয়োগপ্রাপ্ত',
    rating: 'রেটিং',
    availableJobs: 'নতুন টিউশন',
    matchedJobs: 'আপনার জন্য উপযুক্ত',
    applyNow: 'আবেদন করুন',
    viewDetails: 'বিস্তারিত দেখুন',
    applied: '��বেদিত',
    pending: 'বিবেচনাধীন',
    rejected: 'প্রত্যাখ্যাত',
    notifications: 'নোটিফিকেশন',
    newMatch: 'নতুন ম্যাচ পাওয়া গেছে!',
    creditCost: '২ ক্রেডিট',
    perApplication: 'প্রতি আবেদনে',
    payments: 'পেমেন্ট',
    paymentHistory: 'পেমেন্ট হিস্টরি',
    contracts: 'চুক্তিনামা',
    progressReports: 'প্রগ্রেস রিপোর্ট',
    totalEarned: 'মোট আয়',
    totalPending: 'মোট বাকি',
    thisMonth: 'এই মাসে',
    studentName: 'ছাত্রের নাম',
    guardianName: 'অভিভাবক',
    amount: 'পরিমাণ',
    month: 'মাস',
    status: 'স্ট্যাটাস',
    date: 'তারিখ',
    paid: 'পরিশোধিত',
    addProgressReport: 'রিপোর্ট যুক্ত করুন',
    updateProgress: 'অগ্রগতি আপডেট করুন',
    performance: 'পারফরম্যান্স',
    comments: 'মন্তব্য',
    submit: 'জমা দিন',
    excellent: 'চমৎকার',
    good: 'ভালো',
    average: 'গড়',
    needsImprovement: 'উন্নতি প্রয়োজন',
    myStudents: 'আমার ছাত্ররা',
    subject: 'বিষয়',
    overallProgress: 'সামগ্রিক অগ্রগতি',
    lastUpdated: 'সর্বশেষ আপডেট',
    // Profile Settings
    profileSettings: 'প্রোফাইল সেটিংস',
    personalInfo: 'ব্যক্তিগত তথ্য',
    changePassword: 'পাসওয়ার্ড পরিবর্তন',
    fullName: 'সম্পূর্ণ নাম',
    email: 'ইমেইল',
    phoneNumber: 'মোবাইল নম্বর',
    address: 'ঠিকানা',
    bio: 'পরিচিতি',
    education: 'শিক্ষাগত যোগ্যতা',
    experience: 'অভিজ্ঞতা',
    subjects: 'পড়ানোর বিষয়',
    currentPassword: 'বর্তমান পাসওয়ার্ড',
    newPassword: 'নতুন পাসওয়ার্ড',
    confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
    changePhoto: 'ছবি পরিবর্তন করুন',
    uploadPhoto: 'ছবি আপলোড',
    saveChanges: 'পরিবর্তন সংরক্ষণ করুন',
    cancel: 'বাতিল',
    writeReview: 'রিভিউ লিখুন',
    support: 'সাপোর্ট',
  },
  en: {
    dashboard: 'Dashboard',
    findJobs: 'Find Jobs',
    myApplications: 'My Applications',
    messages: 'Messages',
    profile: 'Profile',
    credits: 'Credits',
    logout: 'Logout',
    welcome: 'Welcome',
    creditBalance: 'Credit Balance',
    buyCredits: 'Buy Credits',
    totalApplications: 'Total Applications',
    shortlisted: 'Shortlisted',
    hired: 'Hired',
    rating: 'Rating',
    availableJobs: 'Available Jobs',
    matchedJobs: 'Matched for You',
    applyNow: 'Apply Now',
    viewDetails: 'View Details',
    applied: 'Applied',
    pending: 'Pending',
    rejected: 'Rejected',
    notifications: 'Notifications',
    newMatch: 'New Match Found!',
    creditCost: '2 Credits',
    perApplication: 'per application',
    payments: 'Payments',
    paymentHistory: 'Payment History',
    contracts: 'Contracts',
    progressReports: 'Progress Reports',
    totalEarned: 'Total Earned',
    totalPending: 'Total Pending',
    thisMonth: 'This Month',
    studentName: 'Student Name',
    guardianName: 'Guardian',
    amount: 'Amount',
    month: 'Month',
    status: 'Status',
    date: 'Date',
    paid: 'Paid',
    addProgressReport: 'Add Report',
    updateProgress: 'Update Progress',
    performance: 'Performance',
    comments: 'Comments',
    submit: 'Submit',
    excellent: 'Excellent',
    good: 'Good',
    average: 'Average',
    needsImprovement: 'Needs Improvement',
    myStudents: 'My Students',
    subject: 'Subject',
    overallProgress: 'Overall Progress',
    lastUpdated: 'Last Updated',
    profileSettings: 'Profile Settings',
    personalInfo: 'Personal Information',
    changePassword: 'Change Password',
    fullName: 'Full Name',
    email: 'Email',
    phoneNumber: 'Phone Number',
    address: 'Address',
    bio: 'Bio',
    education: 'Education',
    experience: 'Experience',
    subjects: 'Subjects',
    currentPassword: 'Current Password',
    newPassword: 'New Password',
    confirmPassword: 'Confirm Password',
    changePhoto: 'Change Photo',
    uploadPhoto: 'Upload Photo',
    saveChanges: 'Save Changes',
    cancel: 'Cancel',
    completeProfile: 'Complete Profile',
    profileIncomplete: 'Profile Incomplete',
    profileIncompleteMsg: 'Complete your profile to get more tuition opportunities',
  },
};

// Mock data
const jobs = [
  {
    id: 1,
    title: 'গণিত শিক্ষক প্রয়োজন (ক্লাস ৮-১০)',
    subject: 'গণিত',
    studentClass: 'ক্লাস ৮-১০',
    location: 'ধানমন্ডি, ঢাকা',
    salary: '৮,০০০-১০,০০০',
    posted: '২ ঘন্টা আগে',
    applicants: 5,
    matched: true,
    gender: 'any',
    schedule: 'সন্ধ্যা ৫-৭টা, সপ্তাহে ৩ দিন',
    duration: '৬ মাস',
    requirements: [
      'স্নাতক ডিগ্রী (গণিত/বিজ্ঞান)',
      'ন্যূনতম ২ বছরের শিক্ষকতার অভিজ্ঞতা',
      'ভালো যোগাযোগ দক্ষতা',
      'পাঠ্যবইয়ের সাথে পরিচিত'
    ],
    guardian: {
      name: 'জনাব রহিম উদ্দিন',
      verified: true,
    },
    postedDate: '২৫ জানুয়ারি ২০২৫',
  },
  {
    id: 2,
    title: 'ইংরেজি ও বিজ্ঞান টিউট���',
    subject: 'ইংরেজি, বিজ্ঞান',
    studentClass: 'ক্লাস ৬-৭',
    location: 'গুলশান, ঢাকা',
    salary: '৬,০০০-৮,০০০',
    gender: 'female',
    schedule: 'বিকাল ৪-৬টা, প্রতিদিন',
    duration: '১ বছর',
    requirements: [
      'মহিলা শিক্ষক প্রয়োজন',
      'ইংরেজি মাধ্যম শিক্ষার অভিজ্ঞতা',
      'আবাসিক এলাকায় থাকা পছন্দনীয়'
    ],
    guardian: {
      name: 'মিসেস নাসরিন আক্তার',
      verified: true,
    },
    postedDate: '২৫ জানুয়ারি ২০২৫',
    posted: '৫ ঘন্টা আগে',
    applicants: 12,
    matched: false,
  },
  {
    id: 3,
    title: 'পদার্থবিজ্ঞান শিক্ষক (HSC)',
    subject: 'পদার্থবিজ্ঞান',
    studentClass: 'HSC (১১-১২)',
    location: 'মিরপুর, ঢাকা',
    salary: '১০,০০০-১২,০০০',
    posted: '১ দিন আগে',
    applicants: 8,
    matched: true,
    gender: 'male',
    schedule: 'সক��ল ৮-১০টা, শুক্র-শনি বন্ধ',
    duration: '১ বছর (পরীক্ষা পর্যন্ত)',
    requirements: [
      'বিশ্ববিদ্যালয়ের পদার্থবিজ্ঞান বিভাগ থেকে স্নাতক',
      'HSC শিক্ষার্থী পড়ানোর অভিজ্ঞতা',
      'ব্যবহারিক পরীক্ষার প্রস্তুতি দিতে পারবেন'
    ],
    guardian: {
      name: 'ডঃ কামাল হোসেন',
      verified: true,
    },
    postedDate: '২৪ জানুয়ারি ২০২৫',
  },
];

const applications = [
  {
    id: 1,
    title: 'গণিত শিক্ষক - ক্লাস ৯',
    location: 'বনানী, ঢাকা',
    appliedDate: '২ দিন আগে',
    status: 'shortlisted',
  },
  {
    id: 2,
    title: 'বিজ্ঞান টিউটর - ক্লাস ৭',
    location: 'উত্তরা, ঢাকা',
    appliedDate: '৫ দিন আগে',
    status: 'pending',
  },
  {
    id: 3,
    title: 'ইংরেজি শিক্ষক - ক্লাস ৮',
    location: 'মোহাম্মদপুর, ঢাকা',
    appliedDate: '১ সপ্তাহ আগে',
    status: 'rejected',
  },
];

// Payment History for Teachers
const teacherPayments = [
  { id: 1, student: 'রাফি আহমেদ', guardian: 'মিসেস রহিমা খাতুন', amount: 8000, month: 'জানুয়ারি ২০২৫', status: 'paid', date: '০৫/০১/২০২৫' },
  { id: 2, student: 'সামিয়া খান', guardian: 'জনাব করিম সাহেব', amount: 6000, month: 'জানুয়ারি ২০২৫', status: 'paid', date: '০৫/০১/২০২৫' },
  { id: 3, student: 'তানভীর হাসান', guardian: 'মিসেস সাবিনা', amount: 7000, month: 'জানুয়ারি ২০২৫', status: 'paid', date: '০৭/০১/২০২৫' },
  { id: 4, student: 'রাফি আহমেদ', guardian: 'মিসেস রহিমা খাতুন', amount: 8000, month: 'ফেব্রুয়ারি ২০২৫', status: 'pending', date: '-' },
  { id: 5, student: 'সামিয়া খান', guardian: 'জনাব করিম সাহেব', amount: 6000, month: 'ফেব্রুয়ারি ২০২৫', status: 'pending', date: '-' },
  { id: 6, student: 'তানভীর হাসান', guardian: 'মিসেস সাবিনা', amount: 7000, month: 'ফেব্রুয়ারি ২০২৫', status: 'pending', date: '-' },
];

// Student Progress Data
const myStudents = [
  {
    id: 1,
    name: 'রাফি আহমেদ',
    guardian: 'মিসেস রহিমা খাতুন',
    subject: 'গণিত',
    class: 'ক্লাস ৯',
    progress: 85,
    lastUpdate: '২৫/০১/২০২৫',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
  },
  {
    id: 2,
    name: 'সামিয়া খান',
    guardian: 'জনাব করিম সাহেব',
    subject: 'ইংরেজি',
    class: 'ক্লাস ৭',
    progress: 78,
    lastUpdate: '২৪/০১/২০২৫',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
  },
  {
    id: 3,
    name: 'তানভীর হাসান',
    guardian: 'মিসেস সাবিনা',
    subject: 'বিজ্ঞান',
    class: 'ক্লাস ৮',
    progress: 72,
    lastUpdate: '২৩/০১/২০২৫',
    photo: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&q=80',
  },
];

export function TeacherDashboard({ language, onLogout, setPage, currentUser }: TeacherDashboardProps) {
  const t = content[language];
  const [activeTab, setActiveTab] = useState('dashboard');
  
  // Load credits from localStorageCredit system
  const [credits, setCredits] = useState(() => {
    if (currentUser?.id) {
      try {
        const { getOrCreateUserCredits, getCurrentBalance } = require('../utils/localStorageCredit');
        getOrCreateUserCredits(currentUser.id, 'teacher');
        return getCurrentBalance(currentUser.id);
      } catch (error) {
        console.error('Error loading credits:', error);
        return 50;
      }
    }
    return 50;
  });
  
  // Refresh credits when component mounts or user changes
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
  const [isProgressDialogOpen, setIsProgressDialogOpen] = useState(false);
  const [selectedStudent, setSelectedStudent] = useState<typeof myStudents[0] | null>(null);
  const [isProfileCompletionOpen, setIsProfileCompletionOpen] = useState(false);
  
  // Review System States
  const [isReviewDialogOpen, setIsReviewDialogOpen] = useState(false);
  const [selectedGuardianForReview, setSelectedGuardianForReview] = useState<{
    id: string;
    name: string;
  } | null>(null);
  
  // Ticket System State
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  
  // Payment state
  const [isPaymentDialogOpen, setIsPaymentDialogOpen] = useState(false);
  const [selectedCreditPackage, setSelectedCreditPackage] = useState<{
    name: string;
    credits: number;
    price: number;
  } | null>(null);
  
  // Job Details Dialog State
  const [isJobDetailsOpen, setIsJobDetailsOpen] = useState(false);
  const [selectedJob, setSelectedJob] = useState<typeof jobs[0] | null>(null);
  
  // Apply Dialog State
  const [isApplyDialogOpen, setIsApplyDialogOpen] = useState(false);
  const [jobToApply, setJobToApply] = useState<typeof jobs[0] | null>(null);
  
  // Profile states
  const [profileImage, setProfileImage] = useState('https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80');
  const [profileData, setProfileData] = useState({
    name: 'মোঃ করিম উদ্দিন',
    email: 'karim@example.com',
    phone: '০১৭১২৩৪৫৬৭��',
    address: 'মিরপুর, ঢাকা',
    bio: 'গণিত বিষয়ে ৫ বছরের অভিজ্ঞতা সম্পন্ন শিক্ষক',
    education: 'ঢাকা বিশ্ববিদ্যালয়, গণিত (মাস্টার্স)',
    experience: '৫ বছর',
    subjects: 'গণিত, পদার্থবিজ্ঞান',
  });
  
  // Payment filter states
  const [paymentSearchQuery, setPaymentSearchQuery] = useState('');
  const [paymentStatusFilter, setPaymentStatusFilter] = useState<'all' | 'paid' | 'pending'>('all');
  const [paymentMonthFilter, setPaymentMonthFilter] = useState('all');
  
  // Progress report viewer state
  const [isViewReportsOpen, setIsViewReportsOpen] = useState(false);
  const [selectedStudentForReports, setSelectedStudentForReports] = useState<typeof myStudents[0] | null>(null);

  const handleApply = (jobId: number) => {
    if (!currentUser?.id) return;
    
    try {
      const { applyToTuition, CREDIT_COSTS } = require('../utils/localStorageCredit');
      
      if (credits >= CREDIT_COSTS.APPLY_TO_TUITION) {
        applyToTuition(currentUser.id, `tuition-${jobId}`, language);
        refreshCredits();
        toast.success(
          language === 'bn' 
            ? `আবেদন সফল হয়েছে! ${CREDIT_COSTS.APPLY_TO_TUITION} ক্রেডিট কেটে নেওয়া হয়েছে।`
            : `Application successful! ${CREDIT_COSTS.APPLY_TO_TUITION} credits deducted.`
        );
      } else {
        toast.error(
          language === 'bn'
            ? 'পর্যাপ্ত ক্রেডিট নেই। অনুগ্রহ করে ক্রেডিট কিনুন।'
            : 'Insufficient credits. Please purchase credits.'
        );
        setPage('subscription');
      }
    } catch (error) {
      console.error('Error applying to tuition:', error);
      toast.error(
        language === 'bn'
          ? 'আবেদনে সমস্যা হয়েছে। আবার চেষ্টা করুন।'
          : 'Failed to apply. Please try again.'
      );
    }
  };

  const handleProgressUpdate = (student: typeof myStudents[0]) => {
    setSelectedStudent(student);
    setIsProgressDialogOpen(true);
  };
  
  // Filter payments based on search and filters
  const filteredPayments = teacherPayments.filter((payment) => {
    // Search filter
    if (paymentSearchQuery) {
      const query = paymentSearchQuery.toLowerCase();
      const matchesStudent = payment.student.toLowerCase().includes(query);
      const matchesGuardian = payment.guardian.toLowerCase().includes(query);
      if (!matchesStudent && !matchesGuardian) return false;
    }
    
    // Status filter
    if (paymentStatusFilter !== 'all' && payment.status !== paymentStatusFilter) {
      return false;
    }
    
    // Month filter
    if (paymentMonthFilter !== 'all' && payment.month !== paymentMonthFilter) {
      return false;
    }
    
    return true;
  });
  
  // Calculate payment statistics
  const totalPaidAmount = teacherPayments.filter(p => p.status === 'paid').reduce((sum, p) => sum + p.amount, 0);
  const totalPendingAmount = teacherPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
  const totalAmount = totalPaidAmount + totalPendingAmount;

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
    toast.success(language === 'bn' ? 'প্রোফাইল সফলভাবে আপডেট হয়েছে!' : 'Profile updated successfully!');
  };

  const handleReviewSubmit = (review: { rating: number; comment: string }) => {
    if (!selectedGuardianForReview) return;
    
    console.log('Review submitted:', {
      reviewerId: 'current-teacher-id',
      reviewerType: 'teacher',
      targetId: selectedGuardianForReview.id,
      targetType: 'guardian',
      rating: review.rating,
      comment: review.comment,
      date: new Date().toISOString(),
    });
    
    toast.success(`রিভিউ সফলভাবে জমা হয়েছে! ${selectedGuardianForReview.name} কে ${review.rating} ⭐ দিয়েছেন।`);
    setSelectedGuardianForReview(null);
  };

  const handlePasswordChange = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(language === 'bn' ? 'পাসওয়ার্ড সফলভাবে পরিবর্তন হয়েছে!' : 'Password changed successfully!');
  };

  const handleCreditPurchase = (packageData: { name: string; credits: number; price: number }) => {
    setSelectedCreditPackage(packageData);
    setIsPaymentDialogOpen(true);
  };

  const handlePaymentSuccess = () => {
    if (selectedCreditPackage && currentUser?.id) {
      try {
        const { purchasePackage } = require('../utils/localStorageCredit');
        
        // This would normally involve actual payment processing
        // For now, we'll just add credits directly
        purchasePackage(currentUser.id, selectedCreditPackage.name, language);
        refreshCredits();
        
        toast.success(
          language === 'bn'
            ? `${selectedCreditPackage.credits} ক্রেডিট সফলভাবে যোগ হয়েছে!`
            : `${selectedCreditPackage.credits} credits added successfully!`
        );
      } catch (error) {
        console.error('Error purchasing credits:', error);
        toast.error(
          language === 'bn'
            ? 'ক্রেডিট ক্রয়ে সমস্যা হয়েছে।'
            : 'Failed to purchase credits.'
        );
      }
    }
    setIsPaymentDialogOpen(false);
    setSelectedCreditPackage(null);
  };

  // Handle Job Details View
  const handleViewJobDetails = (job: typeof jobs[0]) => {
    setSelectedJob(job);
    setIsJobDetailsOpen(true);
  };

  // Handle Job Application
  const handleApplyForJob = (job: typeof jobs[0]) => {
    setJobToApply(job);
    setIsApplyDialogOpen(true);
  };

  // Handle Application Submit
  const handleApplicationSubmit = () => {
    if (!jobToApply || !currentUser?.id) return;
    
    try {
      const { applyToTuition, CREDIT_COSTS, hasEnoughCredits } = require('../utils/localStorageCredit');
      
      if (hasEnoughCredits(currentUser.id, CREDIT_COSTS.APPLY_TO_TUITION)) {
        applyToTuition(currentUser.id, `tuition-${jobToApply.id}`, language);
        refreshCredits();
        
        toast.success(
          language === 'bn'
            ? `আবেদন সফলভাবে জমা হয়েছে! ${CREDIT_COSTS.APPLY_TO_TUITION} ক্রেডিট কাটা হয়েছে।`
            : `Application submitted successfully! ${CREDIT_COSTS.APPLY_TO_TUITION} credits deducted.`
        );
        
        setIsApplyDialogOpen(false);
        setJobToApply(null);
      } else {
        toast.error(
          language === 'bn'
            ? `পর্যাপ্ত ক্রেডিট নেই। আবেদন করতে ${CREDIT_COSTS.APPLY_TO_TUITION} ক্রেডিট প্রয়োজন।`
            : `Insufficient credits. You need ${CREDIT_COSTS.APPLY_TO_TUITION} credits to apply.`
        );
        setPage('subscription');
      }
    } catch (error) {
      console.error('Error submitting application:', error);
      toast.error(
        language === 'bn'
          ? 'আবেদন জমা দিতে সমস্যা হয়েছে।'
          : 'Failed to submit application.'
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Modern Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-emerald-100 sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-2 sm:px-4 py-3 sm:py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            <TalentTutorLogo size="md" showText={true} showSubtitle={false} />
            <p className="text-xs text-gray-500 hidden sm:block ml-2 font-[Noto_Serif_Bengali]">শিক্ষক ড্যাশবোর্ড</p>
          </div>

          <div className="flex items-center gap-2 sm:gap-4">
            <Button 
              variant="outline" 
              size="sm"
              onClick={() => setIsTicketDialogOpen(true)}
              className="hidden sm:flex font-[Noto_Serif_Bengali]"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              সাপোর্ট
            </Button>
            
            <NotificationCenter 
              setPage={setPage}
              language={language}
              userRole="teacher"
            />
            <div className="flex items-center gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl shadow-sm">
              <Wallet className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-600" />
              <span className="font-semibold text-emerald-700">{credits}</span>
              <span className="text-sm text-emerald-600 hidden sm:inline font-[Noto_Serif_Bengali]">ক্রেডিট</span>
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
            <Card className="p-5 shadow-lg border-emerald-100 bg-white/80 backdrop-blur-sm">
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
                <Button
                  variant="ghost"
                  className="w-full justify-start bg-gradient-to-r from-emerald-50 to-teal-50 hover:from-emerald-100 hover:to-teal-100 border-2 border-emerald-200"
                  onClick={() => setPage('browse-tuitions')}
                >
                  <Search className="w-4 h-4 mr-2 text-emerald-600" />
                  <span className="text-emerald-700">{t.findJobs}</span>
                </Button>
                <Button
                  variant={activeTab === 'applications' ? 'default' : 'ghost'}
                  className={`w-full justify-start transition-all ${ 
                    activeTab === 'applications' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' 
                      : 'hover:bg-emerald-50'
                  }`}
                  onClick={() => setActiveTab('applications')}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  {t.myApplications}
                </Button>
                <Button
                  variant={activeTab === 'payments' ? 'default' : 'ghost'}
                  className={`w-full justify-start transition-all ${ 
                    activeTab === 'payments' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' 
                      : 'hover:bg-emerald-50'
                  }`}
                  onClick={() => setActiveTab('payments')}
                >
                  <DollarSign className="w-4 h-4 mr-2" />
                  {t.payments}
                </Button>
                <Button
                  variant={activeTab === 'progress' ? 'default' : 'ghost'}
                  className={`w-full justify-start transition-all ${ 
                    activeTab === 'progress' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' 
                      : 'hover:bg-emerald-50'
                  }`}
                  onClick={() => setActiveTab('progress')}
                >
                  <TrendingUp className="w-4 h-4 mr-2" />
                  {t.progressReports}
                </Button>
                <Button
                  variant={activeTab === 'applications' ? 'default' : 'ghost'}
                  className={`w-full justify-start transition-all ${ 
                    activeTab === 'applications' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' 
                      : 'hover:bg-emerald-50'
                  }`}
                  onClick={() => setActiveTab('applications')}
                >
                  <Briefcase className="w-4 h-4 mr-2" />
                  {t.myApplications}
                  <Badge className="ml-auto" variant="secondary">
                    {(() => {
                      const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
                      return applications.filter((app: any) => app.teacherId === currentUser?.id).length;
                    })()}
                  </Badge>
                </Button>
                <Button
                  variant={activeTab === 'contracts' ? 'default' : 'ghost'}
                  className={`w-full justify-start transition-all ${ 
                    activeTab === 'contracts' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' 
                      : 'hover:bg-emerald-50'
                  }`}
                  onClick={() => setActiveTab('contracts')}
                >
                  <FileText className="w-4 h-4 mr-2" />
                  {t.contracts}
                </Button>
                <Button
                  variant={activeTab === 'messages' ? 'default' : 'ghost'}
                  className={`w-full justify-start transition-all ${ 
                    activeTab === 'messages' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' 
                      : 'hover:bg-emerald-50'
                  }`}
                  onClick={() => setActiveTab('messages')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t.messages}
                  <Badge className="ml-auto" variant="secondary">
                    3
                  </Badge>
                </Button>
                <Button
                  variant={activeTab === 'profile' ? 'default' : 'ghost'}
                  className={`w-full justify-start transition-all ${ 
                    activeTab === 'profile' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' 
                      : 'hover:bg-emerald-50'
                  }`}
                  onClick={() => setActiveTab('profile')}
                >
                  <User className="w-4 h-4 mr-2" />
                  {t.profile}
                </Button>
                <Button
                  variant={activeTab === 'credits' ? 'default' : 'ghost'}
                  className={`w-full justify-start transition-all ${ 
                    activeTab === 'credits' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' 
                      : 'hover:bg-emerald-50'
                  }`}
                  onClick={() => setActiveTab('credits')}
                >
                  <CreditCard className="w-4 h-4 mr-2" />
                  {t.credits}
                </Button>
                <Button
                  variant={activeTab === 'support' ? 'default' : 'ghost'}
                  className={`w-full justify-start transition-all ${ 
                    activeTab === 'support' 
                      ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-md' 
                      : 'hover:bg-emerald-50'
                  }`}
                  onClick={() => setActiveTab('support')}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t.support}
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
                    {t.welcome}, মোঃ করিম উদ্দিন!
                  </h1>
                  <p className="text-gray-600">আপনার আজকের সংক্ষিপ্ত তথ্য</p>
                </div>

                {/* Modern Stats Cards */}
                <div className="grid md:grid-cols-4 gap-4">
                  <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">ক্রেডিট</span>
                      <Wallet className="w-5 h-5 text-emerald-600" />
                    </div>
                    <div className="text-3xl font-bold text-emerald-700">{credits}</div>
                    <p className="text-sm text-emerald-600 mt-1">বর্তমান ব্যালেন্স</p>
                  </Card>
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">আবেদন</span>
                      <Briefcase className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-blue-700">
                      {(() => {
                        const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
                        return applications.filter((app: any) => app.teacherId === currentUser?.id).length;
                      })()}
                    </div>
                    <p className="text-sm text-blue-600 mt-1">মোট আবেদন</p>
                  </Card>
                  <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">শর্টলিস্ট</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-3xl font-bold text-green-700">
                      {(() => {
                        const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
                        return applications.filter((app: any) => 
                          app.teacherId === currentUser?.id && app.status === 'accepted'
                        ).length;
                      })()}
                    </div>
                    <p className="text-sm text-green-600 mt-1">নির্বাচিত</p>
                  </Card>
                  <Card className="p-6 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200 hover:shadow-lg transition-all">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">রেটিং</span>
                      <Star className="w-5 h-5 text-yellow-600" />
                    </div>
                    <div className="text-3xl font-bold text-yellow-700 flex items-center gap-1">
                      ৪.৮ <Star className="w-5 h-5 fill-yellow-500 text-yellow-500" />
                    </div>
                    <p className="text-sm text-yellow-600 mt-1">২৪টি রিভিউ</p>
                  </Card>
                </div>

                {/* Profile Completion Alert */}
                <Card className="p-6 bg-gradient-to-br from-amber-50 via-yellow-50 to-amber-50 border-2 border-amber-200 shadow-lg">
                  <div className="flex items-start gap-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-amber-500 to-yellow-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg">
                      <User className="w-7 h-7 text-white" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-gray-900 mb-2 flex items-center gap-2">
                        {t.profileIncomplete}
                        <Badge className="bg-amber-100 text-amber-700 border-amber-300">জরুরী</Badge>
                      </h3>
                      <p className="text-gray-700 mb-4">{t.profileIncompleteMsg}</p>
                      <div className="flex items-center gap-3 mb-4">
                        <Progress value={65} className="flex-1 h-3" />
                        <span className="font-bold text-amber-700">৬৫%</span>
                      </div>
                      <Button 
                        onClick={() => setIsProfileCompletionOpen(true)}
                        className="bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-md"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        {t.completeProfile}
                      </Button>
                    </div>
                  </div>
                </Card>

                {/* Matched Jobs */}
                <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm border-emerald-100">
                  <div className="flex items-center gap-2 mb-4">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
                      <Star className="w-5 h-5 text-white fill-white" />
                    </div>
                    <h3 className="text-xl text-gray-900">{t.matchedJobs}</h3>
                  </div>
                  <div className="space-y-4">
                    {jobs
                      .filter((job) => job.matched)
                      .map((job) => (
                        <div key={job.id} className="border-2 border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-5 hover:shadow-lg transition-all">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h4 className="text-lg text-gray-900 mb-1">{job.title}</h4>
                              <p className="text-gray-600 text-sm flex items-center gap-1">
                                <MapPin className="w-3 h-3" />
                                {job.location}
                              </p>
                            </div>
                            <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 shadow-md">
                              ✨ নতুন ম্যাচ
                            </Badge>
                          </div>
                          <div className="flex flex-wrap items-center gap-3 text-sm text-gray-600 mb-4">
                            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full">💰 {job.salary} টাকা/মাস</span>
                            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full">📚 {job.subject}</span>
                            <span className="flex items-center gap-1 bg-white px-3 py-1 rounded-full">👥 {job.applicants} আবেদন</span>
                          </div>
                          <div className="flex gap-2">
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md" 
                              onClick={() => handleApplyForJob(job)}
                            >
                              {t.applyNow} (২ ক্রেডিট)
                            </Button>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                              onClick={() => handleViewJobDetails(job)}
                            >
                              {t.viewDetails}
                            </Button>
                          </div>
                        </div>
                      ))}
                  </div>
                </Card>
              </div>
            )}

            {activeTab === 'applications' && (
              <TeacherJobApplicationManager 
                language={language}
                currentUser={currentUser || {
                  id: 'teacher-1',
                  name: profileData.name,
                  email: profileData.email,
                  role: 'teacher',
                }}
                onCreditPurchase={() => setActiveTab('credits')}
              />
            )}

            {activeTab === 'payments' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-gray-900">{t.paymentHistory}</h2>
                  <Button 
                    onClick={() => {
                      const paidPayments = teacherPayments.filter(p => p.status === 'paid');
                      const totalPaid = paidPayments.reduce((sum, p) => sum + p.amount, 0);
                      const totalPending = teacherPayments.filter(p => p.status === 'pending').reduce((sum, p) => sum + p.amount, 0);
                      
                      toast.success(language === 'bn' ? 'মাসিক স্টেটমেন্ট ডাউনলোড হচ্ছে...' : 'Downloading monthly statement...');
                      setTimeout(() => {
                        const blob = new Blob([`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
        TALENT TUTOR - মাসিক আয়ের স্টেটমেন্ট
           MONTHLY EARNING STATEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

শিক্ষক / Teacher: ${profileData.name}
তৈরির তারিখ / Generated: ${new Date().toLocaleString('bn-BD', {
  year: 'numeric',
  month: 'long', 
  day: 'numeric',
  hour: '2-digit',
  minute: '2-digit'
})}
সময়কাল / Period: ${teacherPayments[0]?.month || 'জানুয়ারি ২০২৫'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
পরিশোধিত পেমেন্ট / PAID PAYMENTS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

${paidPayments.map((p, i) => `
${i + 1}. ছাত্র/ছাত্রী / Student: ${p.student}
   অভিভাবক / Guardian: ${p.guardian}
   মাস / Month: ${p.month}
   পরিমাণ / Amount: ৳${p.amount.toLocaleString()}
   তারিখ / Date: ${p.date}
   ────────────────────────────────
`).join('\n')}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
আর্থিক সংক্ষিপ্তসার / FINANCIAL SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

মোট পরিশোধিত / Total Paid:        ৳${totalPaid.toLocaleString()}
প্ল্যাটফর্ম ফি (১০%) / Platform Fee: -৳${(totalPaid * 0.1).toLocaleString()}
নিট আয় / Net Earnings:            ৳${(totalPaid * 0.9).toLocaleString()}

মোট বকেয়া / Total Pending:         ৳${totalPending.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
এই স্টেটমেন্টটি স্বয়ংক্রিয়ভাবে তৈরি হয়েছে।
This statement is auto-generated.

Talent Tutor Platform
ওয়েবসাইট / Website: www.talenttutor.com
সাপোর্ট / Support: support@talenttutor.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                        `], { type: 'text/plain;charset=utf-8' });
                        const url = URL.createObjectURL(blob);
                        const a = document.createElement('a');
                        a.href = url;
                        a.download = `Statement-${profileData.name.replace(/\s+/g, '-')}-${new Date().toISOString().split('T')[0]}.txt`;
                        a.click();
                        URL.revokeObjectURL(url);
                        toast.success(language === 'bn' ? 'স্টেটমেন্ট সফলভাবে ডাউনলোড হয়েছে!' : 'Statement downloaded successfully!');
                      }, 1000);
                    }}
                    className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    মাসিক স্টেটমেন্ট ডাউনলোড
                  </Button>
                </div>
                
                {/* Search and Filter Section */}
                <Card className="p-4">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div className="md:col-span-2">
                      <Label className="text-sm mb-2">সার্চ করুন</Label>
                      <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                          placeholder="ছাত্র, অভিভাবক বা মোবাইল নম্বর..."
                          value={paymentSearchQuery}
                          onChange={(e) => setPaymentSearchQuery(e.target.value)}
                          className="pl-10"
                        />
                      </div>
                    </div>
                    <div>
                      <Label className="text-sm mb-2">স্ট্যাটাস</Label>
                      <select
                        value={paymentStatusFilter}
                        onChange={(e) => setPaymentStatusFilter(e.target.value as 'all' | 'paid' | 'pending')}
                        className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm"
                      >
                        <option value="all">সব দেখুন</option>
                        <option value="paid">পরিশোধিত</option>
                        <option value="pending">বকেয়া</option>
                      </select>
                    </div>
                    <div>
                      <Label className="text-sm mb-2">মাস</Label>
                      <select
                        value={paymentMonthFilter}
                        onChange={(e) => setPaymentMonthFilter(e.target.value)}
                        className="w-full h-10 px-3 rounded-md border border-gray-300 bg-white text-sm"
                      >
                        <option value="all">সব মাস</option>
                        <option value="জানুয়ারি ২০২৫">জানুয়ারি ২০২৫</option>
                        <option value="ফেব্রুয়ারি ২০২৫">ফেব্রুয়ারি ২০২৫</option>
                        <option value="মার্চ ২০২৫">মার্চ ২০২৫</option>
                      </select>
                    </div>
                  </div>
                </Card>
                
                {/* Payment Summary */}
                <div className="grid md:grid-cols-3 gap-4">
                  <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">{t.totalEarned}</span>
                      <CheckCircle className="w-5 h-5 text-green-600" />
                    </div>
                    <div className="text-2xl text-green-700">৳ {totalPaidAmount.toLocaleString()}</div>
                    <p className="text-sm text-gray-500 mt-1">{t.thisMonth}</p>
                    <p className="text-xs text-emerald-600 mt-1">নিট: ৳{(totalPaidAmount * 0.9).toLocaleString()}</p>
                  </Card>
                  <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">{t.totalPending}</span>
                      <Clock className="w-5 h-5 text-amber-600" />
                    </div>
                    <div className="text-2xl text-amber-700">৳ {totalPendingAmount.toLocaleString()}</div>
                    <p className="text-sm text-gray-500 mt-1">বকেয়া</p>
                    <p className="text-xs text-amber-600 mt-1">নিট: ৳{(totalPendingAmount * 0.9).toLocaleString()}</p>
                  </Card>
                  <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-600">মোট আয়</span>
                      <DollarSign className="w-5 h-5 text-blue-600" />
                    </div>
                    <div className="text-2xl text-blue-700">৳ {totalAmount.toLocaleString()}</div>
                    <p className="text-sm text-gray-500 mt-1">সর্বমোট</p>
                    <p className="text-xs text-blue-600 mt-1">নিট: ৳{(totalAmount * 0.9).toLocaleString()}</p>
                  </Card>
                </div>

                {/* Payment History Table */}
                <Card className="overflow-hidden">
                  <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-b">
                    <h3 className="text-gray-900">পেমেন্ট ইতিহাস</h3>
                    <p className="text-sm text-gray-600">আপনার সকল পেমেন্ট এবং বকেয়া তথ্য</p>
                  </div>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-6 py-3 text-left text-gray-900">{t.studentName}</th>
                          <th className="px-6 py-3 text-left text-gray-900">{t.guardianName}</th>
                          <th className="px-6 py-3 text-left text-gray-900">{t.month}</th>
                          <th className="px-6 py-3 text-left text-gray-900">{t.amount}</th>
                          <th className="px-6 py-3 text-left text-gray-900">{t.status}</th>
                          <th className="px-6 py-3 text-left text-gray-900">{t.date}</th>
                          <th className="px-6 py-3 text-left text-gray-900">অ্যাকশন</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y">
                        {filteredPayments.length === 0 ? (
                          <tr>
                            <td colSpan={7} className="px-6 py-12 text-center">
                              <div className="flex flex-col items-center gap-2">
                                <Search className="w-12 h-12 text-gray-300" />
                                <p className="text-gray-500">কোনো পেমেন্ট পাওয়া যায়নি</p>
                                <p className="text-sm text-gray-400">অন্য ফিল্টার চেষ্টা করুন</p>
                              </div>
                            </td>
                          </tr>
                        ) : (
                          filteredPayments.map((payment) => (
                            <tr key={payment.id} className="hover:bg-gray-50">
                              <td className="px-6 py-4 text-gray-900">{payment.student}</td>
                              <td className="px-6 py-4 text-gray-600">{payment.guardian}</td>
                              <td className="px-6 py-4 text-gray-600">{payment.month}</td>
                              <td className="px-6 py-4">
                                <div className="text-gray-900">৳ {payment.amount.toLocaleString()}</div>
                                <div className="text-xs text-gray-500">নিট: ৳{(payment.amount * 0.9).toLocaleString()}</div>
                              </td>
                              <td className="px-6 py-4">
                                {payment.status === 'paid' ? (
                                  <Badge className="bg-green-600">{t.paid}</Badge>
                                ) : (
                                  <Badge className="bg-amber-600">{t.pending}</Badge>
                                )}
                              </td>
                              <td className="px-6 py-4 text-gray-600">{payment.date}</td>
                              <td className="px-6 py-4">
                                {payment.status === 'pending' ? (
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    onClick={() => {
                                      // Save payment request to localStorage
                                      const requests = JSON.parse(localStorage.getItem('paymentRequests') || '[]');
                                      requests.push({
                                        id: `req-${Date.now()}`,
                                        paymentId: payment.id,
                                        teacherId: currentUser?.id || 'teacher-unknown',
                                        teacherName: profileData.name,
                                        guardianName: payment.guardian,
                                        student: payment.student,
                                        amount: payment.amount,
                                        month: payment.month,
                                        requestDate: new Date().toISOString(),
                                        status: 'pending'
                                      });
                                      localStorage.setItem('paymentRequests', JSON.stringify(requests));
                                      
                                      toast.success('পেমেন্ট রিকুয়েস্ট পাঠানো হয়েছে!', {
                                        description: `${payment.guardian} কে অনুরোধ পাঠানো হয়েছে`,
                                      });
                                    }}
                                    className="text-xs"
                                  >
                                    <Send className="w-3 h-3 mr-1" />
                                    রিকুয়েস্ট
                                  </Button>
                                ) : (
                                  <PaymentInvoiceGenerator 
                                    payment={payment}
                                    teacherName={profileData.name}
                                    language={language}
                                  />
                                )}
                              </td>
                            </tr>
                          ))
                        )}
                      </tbody>
                    </table>
                  </div>
                </Card>

                {/* Monthly Breakdown */}
                <Card className="p-6">
                  <h3 className="text-gray-900 mb-4">মাসিক আয়ের বিস্তারিত</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
                      <div>
                        <p className="text-gray-600 text-sm">জানুয়ারি ২০২৫</p>
                        <p className="text-green-700">৩টি পেমেন্ট সম্পন্ন</p>
                      </div>
                      <div className="text-xl text-green-700">৳ ২১,০০০</div>
                    </div>
                    <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
                      <div>
                        <p className="text-gray-600 text-sm">ফেব্রুয়ারি ২০২৫</p>
                        <p className="text-amber-700">৩টি পেমেন্ট বাকি</p>
                      </div>
                      <div className="text-amber-700">৳ ২১,০০০</div>
                    </div>
                  </div>
                </Card>
                
                {/* Rate Your Guardians Section */}
                <Card className="p-6 bg-gradient-to-r from-yellow-50 to-amber-50">
                  <h3 className="text-gray-900 mb-4 flex items-center gap-2">
                    <Star className="w-5 h-5 text-yellow-600" />
                    অভিভাবকদের রিভিউ করুন
                  </h3>
                  <p className="text-gray-600 text-sm mb-4">
                    আপনার কাজের অভিজ্ঞতা শেয়ার করুন এবং অভিভাবকদের রেটিং দিন
                  </p>
                  <div className="space-y-3">
                    {teacherPayments.filter(p => p.status === 'paid').slice(0, 3).map((payment) => (
                      <div key={payment.id} className="flex items-center justify-between p-3 bg-white rounded-lg">
                        <div>
                          <p className="text-gray-900">{payment.guardian}</p>
                          <p className="text-sm text-gray-500">{payment.student} এর অভিভাবক</p>
                        </div>
                        <Button
                          size="sm"
                          onClick={() => {
                            setSelectedGuardianForReview({
                              id: `guardian-${payment.id}`,
                              name: payment.guardian,
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

            {activeTab === 'progress' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-2xl text-gray-900">{t.myStudents}</h2>
                  <Badge className="bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-300 px-4 py-2 text-base">
                    {myStudents.length} জন ছাত্র
                  </Badge>
                </div>

                {/* Progress Update Dialog */}
                <Dialog open={isProgressDialogOpen} onOpenChange={setIsProgressDialogOpen}>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{t.updateProgress}</DialogTitle>
                      <DialogDescription>
                        ছাত্রের অগ্রগতি এবং পারফরম্যান্স আপডেট করুন
                      </DialogDescription>
                    </DialogHeader>
                    {selectedStudent && (
                      <form className="space-y-4" onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.currentTarget);
                        const performance = formData.get('performance') as string;
                        const progress = parseInt(formData.get('progress') as string);
                        const comments = formData.get('comments') as string;
                        
                        // Create progress report
                        const progressReport = {
                          id: `report-${Date.now()}`,
                          studentId: selectedStudent.id,
                          studentName: selectedStudent.name,
                          guardianName: selectedStudent.guardian,
                          teacherId: currentUser?.id || 'teacher-unknown',
                          teacherName: profileData.name,
                          subject: selectedStudent.subject,
                          class: selectedStudent.class,
                          performance,
                          progress,
                          comments,
                          date: new Date().toISOString(),
                          dateFormatted: new Date().toLocaleDateString('bn-BD', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric'
                          })
                        };
                        
                        // Save to localStorage
                        const reports = JSON.parse(localStorage.getItem('progressReports') || '[]');
                        reports.push(progressReport);
                        localStorage.setItem('progressReports', JSON.stringify(reports));
                        
                        setIsProgressDialogOpen(false);
                        toast.success('প্রগ্রেস রিপোর্ট সফলভাবে আপডেট করা হয়েছে!', {
                          description: `${selectedStudent.name} এর রিপোর্ট সংরক্ষিত হয়েছে`
                        });
                      }}>
                        <div>
                          <Label>ছাত্রের নাম</Label>
                          <Input value={selectedStudent.name} disabled />
                        </div>
                        <div>
                          <Label>{t.performance}</Label>
                          <select name="performance" className="w-full border rounded-md p-2" required>
                            <option value="excellent">{t.excellent}</option>
                            <option value="good">{t.good}</option>
                            <option value="average">{t.average}</option>
                            <option value="needs-improvement">{t.needsImprovement}</option>
                          </select>
                        </div>
                        <div>
                          <Label>{t.overallProgress} (%)</Label>
                          <Input name="progress" type="number" min="0" max="100" defaultValue={selectedStudent.progress} required />
                        </div>
                        <div>
                          <Label>{t.comments}</Label>
                          <Textarea name="comments" rows={5} placeholder="ছাত্রের অগ্রগতি, শক্তিশালী দিক, উন্নতির প্রয়োজনীয় ক্ষেত্র সম্পর্কে বিস্তারিত লিখুন..." required />
                        </div>
                        <Button type="submit" className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                          {t.submit}
                        </Button>
                      </form>
                    )}
                  </DialogContent>
                </Dialog>

                {/* Students List */}
                <div className="space-y-4">
                  {myStudents.map((student) => (
                    <Card key={student.id} className="p-6 hover:shadow-xl transition-all bg-white/80 backdrop-blur-sm border-emerald-100">
                      <div className="flex items-start gap-4">
                        <CardAvatar 
                          src={student.photo}
                          alt={student.name}
                          fallback={student.name.charAt(0)}
                          className="ring-4 ring-emerald-100"
                        />
                        <div className="flex-1">
                          <div className="flex items-start justify-between mb-3">
                            <div>
                              <h3 className="text-xl text-gray-900 mb-2">{student.name}</h3>
                              <p className="text-gray-600 mb-1 flex items-center gap-2">
                                <BookOpen className="w-4 h-4 text-emerald-600" />
                                {student.subject} • {student.class}
                              </p>
                              <p className="text-gray-500 text-sm flex items-center gap-1">
                                <User className="w-3 h-3" />
                                অভি���াবক: {student.guardian}
                              </p>
                            </div>
                            <Button 
                              size="sm" 
                              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md"
                              onClick={() => handleProgressUpdate(student)}
                            >
                              <PlusCircle className="w-4 h-4 mr-1" />
                              {t.addProgressReport}
                            </Button>
                          </div>

                          {/* Progress Bar */}
                          <div className="mb-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-sm font-medium text-gray-700">{t.overallProgress}</span>
                              <span className="text-lg font-bold text-emerald-700">{student.progress}%</span>
                            </div>
                            <Progress value={student.progress} className="h-3" />
                          </div>

                          <div className="flex items-center justify-between text-sm">
                            <span className="text-gray-500 flex items-center gap-1">
                              <Clock className="w-4 h-4" />
                              {t.lastUpdated}: {student.lastUpdate}
                            </span>
                            <Button 
                              size="sm" 
                              variant="outline" 
                              className="border-emerald-300 text-emerald-700 hover:bg-emerald-50"
                              onClick={() => {
                                setSelectedStudentForReports(student);
                                setIsViewReportsOpen(true);
                              }}
                            >
                              <FileText className="w-4 h-4 mr-1" />
                              সব রিপোর্ট দেখুন
                            </Button>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Progress Tips */}
                <Card className="p-6 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-600 text-white shadow-xl">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center flex-shrink-0">
                      <span className="text-2xl">💡</span>
                    </div>
                    <div>
                      <h3 className="text-xl text-white mb-3">রিপোর্ট লেখার টিপস</h3>
                      <ul className="space-y-2 text-emerald-50">
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <span>ছাত্রের শক্তিশালী দিক এবং উন্নতির ক্ষেত্র উভয়ই উল্লেখ করুন</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <span>নির্দিষ্ট উদাহরণ দিয়ে ব্যাখ্যা করুন</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <span>পরবর্তী পদক্ষেপ এবং সুপারিশ প্রদান করুন</span>
                        </li>
                        <li className="flex items-start gap-2">
                          <CheckCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
                          <span>নিয়���িত আপডেট করুন (সপ্তাহে অন্তত একবার)</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </Card>
                
                {/* View All Progress Reports Dialog */}
                <Dialog open={isViewReportsOpen} onOpenChange={setIsViewReportsOpen}>
                  <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                    <DialogHeader>
                      <DialogTitle className="flex items-center gap-2">
                        <FileText className="w-5 h-5 text-emerald-600" />
                        প্রগ্রেস রিপোর্ট - {selectedStudentForReports?.name}
                      </DialogTitle>
                      <DialogDescription>
                        সকল প্রগ্রেস রিপোর্ট এবং পারফরম্যান্স হিস্টরি
                      </DialogDescription>
                    </DialogHeader>
                    
                    {selectedStudentForReports && (() => {
                      const allReports = JSON.parse(localStorage.getItem('progressReports') || '[]');
                      const studentReports = allReports.filter((r: any) => 
                        r.studentId === selectedStudentForReports.id
                      ).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());
                      
                      return (
                        <div className="space-y-4 py-4">
                          {studentReports.length === 0 ? (
                            <div className="text-center py-12">
                              <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                              <p className="text-gray-500">এখনও কোনো রিপোর্ট যোগ করা হয়নি</p>
                            </div>
                          ) : (
                            studentReports.map((report: any, index: number) => (
                              <Card key={report.id} className="p-6 border-2 border-emerald-100">
                                <div className="flex items-start justify-between mb-4">
                                  <div>
                                    <h4 className="text-lg text-gray-900 mb-1">রিপোর্ট #{studentReports.length - index}</h4>
                                    <p className="text-sm text-gray-500">{report.dateFormatted}</p>
                                  </div>
                                  <Badge className={
                                    report.performance === 'excellent' ? 'bg-green-600' :
                                    report.performance === 'good' ? 'bg-blue-600' :
                                    report.performance === 'average' ? 'bg-yellow-600' :
                                    'bg-orange-600'
                                  }>
                                    {report.performance === 'excellent' && 'অসাধারণ'}
                                    {report.performance === 'good' && 'ভালো'}
                                    {report.performance === 'average' && 'মধ্যম'}
                                    {report.performance === 'needs-improvement' && 'উন্নতি প্রয়োজন'}
                                  </Badge>
                                </div>
                                
                                <div className="space-y-3">
                                  <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                                    <span className="text-sm text-gray-700">অগ্রগতি</span>
                                    <span className="text-lg font-bold text-emerald-700">{report.progress}%</span>
                                  </div>
                                  
                                  <div>
                                    <p className="text-sm font-medium text-gray-700 mb-2">মন্তব্য:</p>
                                    <p className="text-gray-600 bg-gray-50 p-3 rounded-lg">{report.comments}</p>
                                  </div>
                                  
                                  <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <User className="w-4 h-4" />
                                    <span>শিক্ষক: {report.teacherName}</span>
                                  </div>
                                </div>
                              </Card>
                            ))
                          )}
                        </div>
                      );
                    })()}
                  </DialogContent>
                </Dialog>
              </div>
            )}

            {activeTab === 'applications' && (
              <div className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-gray-900">আমার আবেদনসমূহ</h2>
                    <p className="text-gray-600">আপনার সকল টিউশন আবেদনের তথ্য</p>
                  </div>
                </div>

                {(() => {
                  const applications = JSON.parse(localStorage.getItem('jobApplications') || '[]');
                  const myApplications = applications.filter((app: any) => 
                    app.teacherId === currentUser?.id
                  ).sort((a: any, b: any) => new Date(b.date).getTime() - new Date(a.date).getTime());

                  if (myApplications.length === 0) {
                    return (
                      <Card className="p-12">
                        <div className="text-center">
                          <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                          <h3 className="text-gray-900 mb-2">কোনো আবেদন নেই</h3>
                          <p className="text-gray-600 mb-6">
                            আপনি এখনও কোনো টিউশনে আবেদন করেননি
                          </p>
                          <Button 
                            onClick={() => setActiveTab('dashboard')}
                            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                          >
                            <Search className="w-4 h-4 mr-2" />
                            টিউশন খুঁজুন
                          </Button>
                        </div>
                      </Card>
                    );
                  }

                  return (
                    <>
                      {/* Statistics */}
                      <div className="grid md:grid-cols-4 gap-4">
                        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">মোট আবেদন</span>
                            <Briefcase className="w-5 h-5 text-blue-600" />
                          </div>
                          <div className="text-2xl text-blue-700">{myApplications.length}</div>
                        </Card>
                        <Card className="p-6 bg-gradient-to-br from-amber-50 to-yellow-50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">অপেক্ষমাণ</span>
                            <Clock className="w-5 h-5 text-amber-600" />
                          </div>
                          <div className="text-2xl text-amber-700">
                            {myApplications.filter((app: any) => app.status === 'pending').length}
                          </div>
                        </Card>
                        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">গৃহীত</span>
                            <CheckCircle className="w-5 h-5 text-green-600" />
                          </div>
                          <div className="text-2xl text-green-700">
                            {myApplications.filter((app: any) => app.status === 'accepted').length}
                          </div>
                        </Card>
                        <Card className="p-6 bg-gradient-to-br from-red-50 to-rose-50">
                          <div className="flex items-center justify-between mb-2">
                            <span className="text-gray-600">প্রত্যাখ্যাত</span>
                            <X className="w-5 h-5 text-red-600" />
                          </div>
                          <div className="text-2xl text-red-700">
                            {myApplications.filter((app: any) => app.status === 'rejected').length}
                          </div>
                        </Card>
                      </div>

                      {/* Applications List */}
                      <div className="space-y-4">
                        {myApplications.map((application: any) => (
                          <Card key={application.id} className="p-6 hover:shadow-lg transition-shadow">
                            <div className="flex items-start justify-between mb-4">
                              <div className="flex-1">
                                <div className="flex items-center gap-3 mb-2">
                                  <h3 className="text-xl text-gray-900">{application.jobTitle}</h3>
                                  <Badge className={
                                    application.status === 'accepted' ? 'bg-green-600' :
                                    application.status === 'rejected' ? 'bg-red-600' :
                                    'bg-amber-600'
                                  }>
                                    {application.status === 'accepted' && 'গৃহীত'}
                                    {application.status === 'rejected' && 'প্রত্যাখ্যাত'}
                                    {application.status === 'pending' && 'অপেক্ষমাণ'}
                                  </Badge>
                                </div>
                                <div className="grid md:grid-cols-2 gap-2 text-sm text-gray-600">
                                  <p className="flex items-center gap-2">
                                    <BookOpen className="w-4 h-4 text-emerald-600" />
                                    {application.subject}
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <MapPin className="w-4 h-4 text-emerald-600" />
                                    {application.location}
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <DollarSign className="w-4 h-4 text-emerald-600" />
                                    ৳{application.salary?.toLocaleString()}/মাস
                                  </p>
                                  <p className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-emerald-600" />
                                    আবেদন: {new Date(application.date).toLocaleDateString('bn-BD')}
                                  </p>
                                </div>
                              </div>
                            </div>

                            {/* Application Details */}
                            <div className="bg-gray-50 p-4 rounded-lg mb-4">
                              <h4 className="text-sm font-medium text-gray-900 mb-2">আপনার প্রস্তাব:</h4>
                              <p className="text-sm text-gray-700 mb-2">{application.proposal}</p>
                              <div className="flex gap-4 text-sm text-gray-600">
                                <span>প্রত্যাশিত বেতন: ৳{application.expectedSalary?.toLocaleString()}</span>
                                <span>•</span>
                                <span>শুরুর তারিখ: {application.startDate}</span>
                              </div>
                            </div>

                            {/* Actions */}
                            <div className="flex gap-2">
                              {application.status === 'accepted' && (
                                <Button
                                  size="sm"
                                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                                  onClick={() => {
                                    setActiveTab('contracts');
                                    toast.success('চুক্তি পাতায় যাচ্ছেন...');
                                  }}
                                >
                                  <FileText className="w-4 h-4 mr-1" />
                                  চুক্তি দেখুন
                                </Button>
                              )}
                              {application.status === 'pending' && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => {
                                    const updatedApplications = applications.map((app: any) =>
                                      app.id === application.id ? { ...app, status: 'cancelled' } : app
                                    );
                                    localStorage.setItem('jobApplications', JSON.stringify(updatedApplications));
                                    toast.success('আবেদন বাতিল করা হয়েছে');
                                    window.location.reload();
                                  }}
                                  className="text-red-600 border-red-300 hover:bg-red-50"
                                >
                                  <X className="w-4 h-4 mr-1" />
                                  আবেদন বাতিল করুন
                                </Button>
                              )}
                            </div>
                          </Card>
                        ))}
                      </div>
                    </>
                  );
                })()}
              </div>
            )}

            {activeTab === 'contracts' && (
              <ContractManagementSection userRole="teacher" language={language} />
            )}

            {activeTab === 'credits' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl text-gray-900 mb-2">{t.buyCredits}</h2>
                  <p className="text-gray-600 text-lg">
                    আপনার বর্তমান ব্যালেন্স: <span className="font-bold text-emerald-700">{credits} ক্রেডিট</span>
                  </p>
                </div>
                
                {/* Credit Info Card */}
                <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-xl flex items-center justify-center shadow-lg">
                      <Wallet className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="text-lg text-gray-900 mb-2">ক্রেডিট কিভাবে কাজ করে?</h3>
                      <ul className="text-gray-600 space-y-1 text-sm">
                        <li>✅ প্রতি আবেদনে ২ ক্রেডিট প্রয়োজন</li>
                        <li>✅ প্রথম ৬ মাস সম্পূর্ণ ফ্রি</li>
                        <li>✅ তারপর ১০% প্ল্যাটফর্ম চার্জ</li>
                        <li>✅ রেজিস্ট্রেশনে ৫০ ফ্রি ক্রেডিট</li>
                      </ul>
                    </div>
                  </div>
                </Card>

                <div className="grid md:grid-cols-3 gap-6">
                  <Card className="p-8 border-2 border-emerald-200 hover:border-emerald-400 hover:shadow-xl transition-all cursor-pointer bg-white/80 backdrop-blur-sm">
                    <h3 className="text-xl text-gray-900 mb-3">Starter</h3>
                    <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">১০০</div>
                    <p className="text-gray-600 mb-6">ক্রেডিট</p>
                    <div className="text-3xl font-bold text-gray-900 mb-6">৳৫০০</div>
                    <Button 
                      onClick={() => handleCreditPurchase({ name: 'Starter', credits: 100, price: 500 })}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md"
                    >
                      কিনুন
                    </Button>
                  </Card>
                  
                  <Card className="p-8 border-4 border-emerald-500 hover:shadow-2xl transition-all cursor-pointer relative bg-gradient-to-br from-emerald-50 to-teal-50 transform scale-105">
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 shadow-lg px-4 py-1">
                      ⭐ জনপ্রিয়
                    </Badge>
                    <h3 className="text-xl text-gray-900 mb-3">Pro</h3>
                    <div className="text-5xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 bg-clip-text text-transparent mb-2">৩০০</div>
                    <p className="text-gray-600 mb-6">ক্রেডিট</p>
                    <div className="text-3xl font-bold text-gray-900 mb-2">৳১,২০০</div>
                    <p className="text-sm text-green-600 mb-4">২০% সাশ্রয়!</p>
                    <Button 
                      onClick={() => handleCreditPurchase({ name: 'Pro', credits: 300, price: 1200 })}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-lg"
                    >
                      কিনুন
                    </Button>
                  </Card>
                  
                  <Card className="p-8 border-2 border-amber-300 hover:border-amber-400 hover:shadow-xl transition-all cursor-pointer bg-gradient-to-br from-amber-50 to-yellow-50">
                    <h3 className="text-xl text-gray-900 mb-3 flex items-center gap-2">
                      Golden <Star className="w-5 h-5 text-amber-500 fill-amber-500" />
                    </h3>
                    <div className="text-5xl font-bold bg-gradient-to-r from-amber-600 to-yellow-600 bg-clip-text text-transparent mb-2">৫০০</div>
                    <p className="text-gray-600 mb-6">ক্রেডিট</p>
                    <div className="text-3xl font-bold text-gray-900 mb-2">৳১,৮০০</div>
                    <p className="text-sm text-green-600 mb-4">৩০% সাশ্রয়!</p>
                    <Button 
                      onClick={() => handleCreditPurchase({ name: 'Golden', credits: 500, price: 1800 })}
                      className="w-full bg-gradient-to-r from-amber-600 to-yellow-600 hover:from-amber-700 hover:to-yellow-700 shadow-md"
                    >
                      কিনুন
                    </Button>
                  </Card>
                </div>
              </div>
            )}

            {activeTab === 'profile' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl text-gray-900 mb-2">{t.profileSettings}</h2>
                  <p className="text-gray-600 text-lg">আপনার প্রোফাইল তথ্য আপডেট করুন</p>
                </div>

                {/* Profile Image Section */}
                <Card className="p-8 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 shadow-lg">
                  <div className="flex items-center gap-6">
                    <div className="relative">
                      <img
                        src={profileImage}
                        alt="Profile"
                        className="w-32 h-32 rounded-full object-cover ring-4 ring-white shadow-xl"
                      />
                      <label
                        htmlFor="profile-image"
                        className="absolute bottom-0 right-0 w-12 h-12 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-full flex items-center justify-center cursor-pointer hover:from-emerald-700 hover:to-teal-700 transition-all shadow-lg"
                      >
                        <Camera className="w-6 h-6 text-white" />
                        <input
                          id="profile-image"
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">{profileData.name}</h3>
                      <p className="text-gray-600 mb-1 flex items-center gap-2">
                        <Mail className="w-4 h-4 text-emerald-600" />
                        {profileData.email}
                      </p>
                      <p className="text-gray-600 flex items-center gap-2">
                        <Phone className="w-4 h-4 text-emerald-600" />
                        {profileData.phone}
                      </p>
                      <Badge className="mt-3 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 px-4 py-1.5 shadow-md">
                        ✅ শিক্ষক
                      </Badge>
                    </div>
                  </div>
                </Card>

                {/* Personal Information Form */}
                <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm border-emerald-100">
                  <h3 className="text-xl text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                      <User className="w-5 h-5 text-white" />
                    </div>
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
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label>{t.education}</Label>
                        <Input
                          value={profileData.education}
                          onChange={(e) => setProfileData({ ...profileData, education: e.target.value })}
                        />
                      </div>
                      <div>
                        <Label>{t.experience}</Label>
                        <Input
                          value={profileData.experience}
                          onChange={(e) => setProfileData({ ...profileData, experience: e.target.value })}
                        />
                      </div>
                    </div>
                    <div>
                      <Label>{t.subjects}</Label>
                      <Input
                        value={profileData.subjects}
                        onChange={(e) => setProfileData({ ...profileData, subjects: e.target.value })}
                      />
                    </div>
                    <div className="flex gap-3">
                      <Button type="submit" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md">
                        <Save className="w-4 h-4 mr-2" />
                        {t.saveChanges}
                      </Button>
                      <Button type="button" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                        {t.cancel}
                      </Button>
                    </div>
                  </form>
                </Card>

                {/* Change Password */}
                <Card className="p-6 shadow-lg bg-white/80 backdrop-blur-sm border-emerald-100">
                  <h3 className="text-xl text-gray-900 mb-6 flex items-center gap-2">
                    <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                      <Lock className="w-5 h-5 text-white" />
                    </div>
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
                      <Button type="submit" className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md">
                        <Lock className="w-4 h-4 mr-2" />
                        {t.changePassword}
                      </Button>
                      <Button type="button" variant="outline" className="border-emerald-300 text-emerald-700 hover:bg-emerald-50">
                        {t.cancel}
                      </Button>
                    </div>
                  </form>
                </Card>
              </div>
            )}

            {activeTab === 'messages' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl text-gray-900 mb-2">বার্তা</h2>
                  <p className="text-gray-600">আপনার নিয়োগদাতা অভিভবকদের সাথে কথোপকথন করুন</p>
                </div>

                <ContractMessagingSystem
                  userId={currentUser?.id || "teacher-demo-001"}
                  userName={currentUser?.name || profileData.name}
                  userRole="teacher"
                  language={language}
                />
              </div>
            )}

            {activeTab === 'support' && (
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl text-gray-900 mb-2">
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
                    <Bell className="w-5 h-5 text-emerald-600" />
                    {language === 'bn' ? 'গুরুত্বপূর্ণ নোটিশ' : 'Important Notices'}
                  </h3>
                  <AdminNoticeViewer language={language} userRole="teacher" maxItems={3} />
                </Card>

                {/* Ticket System */}
                <Card className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl flex items-center gap-2">
                      <MessageSquare className="w-5 h-5 text-emerald-600" />
                      {language === 'bn' ? 'টিকেট সিস্টেম' : 'Ticket System'}
                    </h3>
                    <Button
                      onClick={() => setIsTicketDialogOpen(true)}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600"
                    >
                      <PlusCircle className="w-4 h-4 mr-2" />
                      {language === 'bn' ? 'নতুন টিকেট' : 'New Ticket'}
                    </Button>
                  </div>
                  <p className="text-gray-600 mb-4">
                    {language === 'bn'
                      ? 'আপনার সমস্যা বা প্রশ্নে��� জন্য টিকেট তৈরি করুন এবং আমাদের টিম আপনাকে সাহায���য করবে।'
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
                      onClick={() => setPage('teacher-guidelines')}
                    >
                      <User className="w-4 h-4 mr-2 text-emerald-600" />
                      <span className="text-left text-sm">
                        {language === 'bn' ? 'শিক্ষকদের নির্দেশনা' : 'Teacher Guidelines'}
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
                      <MessageSquare className="w-4 h-4 mr-2 text-teal-600" />
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
                        ? 'ভ���ডিও দেখে শিখুন কিভাবে প্ল্যাটফর্ম ব্যবহার করবেন'
                        : 'Learn how to use the platform through videos'}
                    </p>
                  </Card>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Profile Completion Dialog */}
      <ProfileCompletionDialog
        open={isProfileCompletionOpen}
        onOpenChange={setIsProfileCompletionOpen}
        language={language}
      />
      
      {/* Review Dialog */}
      <ReviewDialog
        open={isReviewDialogOpen}
        onOpenChange={setIsReviewDialogOpen}
        language={language}
        targetType="guardian"
        targetName={selectedGuardianForReview?.name || ''}
        targetId={selectedGuardianForReview?.id || ''}
        onSubmit={handleReviewSubmit}
      />
      
      {/* Ticket System Dialog */}
      <TicketSystem
        open={isTicketDialogOpen}
        onOpenChange={setIsTicketDialogOpen}
        language={language}
        userId={currentUser?.id || "teacher-demo-001"}
        userName={currentUser?.name || profileData.name}
        userRole="teacher"
      />
      
      {/* Payment Dialog */}
      {selectedCreditPackage && (
        <PaymentGatewayDialog
          open={isPaymentDialogOpen}
          onOpenChange={setIsPaymentDialogOpen}
          language={language}
          amount={selectedCreditPackage.price}
          donorName={currentUser?.name || profileData.name}
          donationType={`${selectedCreditPackage.credits} ${language === 'bn' ? 'ক্রেডিট' : 'Credits'} - ${selectedCreditPackage.name}`}
          onPaymentSuccess={(transactionData) => {
            handlePaymentSuccess();
            toast.success(
              language === 'bn' 
                ? `✅ পেমেন্ট সফল হয়েছে! ট্রানজেকশন ID: ${transactionData.transactionId}` 
                : `✅ Payment successful! Transaction ID: ${transactionData.transactionId}`
            );
          }}
          userId={currentUser?.id}
          purpose="credit_purchase"
          metadata={{
            credits: selectedCreditPackage.credits,
            packageName: selectedCreditPackage.name
          }}
        />
      )}
      
      {/* Job Details Dialog */}
      {selectedJob && (
        <JobDetailsDialog
          open={isJobDetailsOpen}
          onOpenChange={setIsJobDetailsOpen}
          job={selectedJob}
          language={language}
          onApply={handleApplyForJob}
          userCredits={credits}
        />
      )}
      
      {/* Apply Tuition Dialog */}
      {jobToApply && (
        <ApplyTuitionDialog
          open={isApplyDialogOpen}
          onOpenChange={setIsApplyDialogOpen}
          language={language}
          tuitionPost={{
            id: jobToApply.id,
            title: jobToApply.title,
            subject: jobToApply.subject,
            class: jobToApply.studentClass || '',
            location: jobToApply.location,
            salary: jobToApply.salary,
            schedule: jobToApply.schedule || '',
            guardianName: jobToApply.guardian?.name || '',
          }}
          onSubmit={handleApplicationSubmit}
        />
      )}
    </div>
  );
}
