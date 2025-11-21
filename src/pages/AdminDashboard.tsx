import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '../components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Switch } from '../components/ui/switch';
import { ScrollArea } from '../components/ui/scroll-area';
import { Alert, AlertDescription } from '../components/ui/alert';
import { Checkbox } from '../components/ui/checkbox';
import {
  Home, Users, Briefcase, DollarSign, AlertCircle, Shield, BarChart3, Settings, LogOut,
  CheckCircle, XCircle, Clock, Heart, Book, TrendingUp, Megaphone, Send, Eye, Edit, Trash2,
  FileText, Bell, Crown, PlusCircle, Search, Filter, Download, Upload, RefreshCw,
  GraduationCap, UserCheck, Ban, MoreVertical, CreditCard, Wallet, Calendar, Activity,
  Target, Award, Globe, MessageSquare, Save, UserPlus, Layers, Package, TrendingDown,
  Code, Mail, Phone, MapPin, ExternalLink, Image, Video, List, Lock, Unlock, Key,
  Copy, FileDown, FileUp, Percent, Gift, Tag, Zap, Database, History, Star
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { AdminStudentApplicationManager } from '../components/AdminStudentApplicationManager';
import { AdminStudentProfileManager } from '../components/AdminStudentProfileManager';
import { AdminDonationRequestManager } from '../components/AdminDonationRequestManager';
import { DynamicCMS } from '../components/DynamicCMS';
import { AdminUserManagementTab } from '../components/AdminUserManagementTab';
import { ConsolidatedUserManagement } from '../components/ConsolidatedUserManagement';
import { TalentTutorLogo } from '../components/TalentTutorLogo';
import { NewsletterManagement } from '../components/NewsletterManagement';
import { LanguageSwitcher } from '../components/LanguageSwitcher';

import { copyToClipboard } from '../utils/clipboard';
import { AdminCreditPackageManager } from '../components/AdminCreditPackageManager';
import { CreditAnalyticsDashboard } from '../components/CreditAnalyticsDashboard';
import { CreditUsageReports } from '../components/CreditUsageReports';
import { AdminTicketManager } from '../components/AdminTicketManager';
import { AdminDonationRequestManager } from '../components/AdminDonationRequestManager';
import { AdminAPIKeyManager } from '../components/AdminAPIKeyManager';
import { type User, type UserRole } from '../utils/authGuard';
import { adminAPI } from '../utils/databaseService';

interface AdminDashboardProps {
  language: 'bn' | 'en';
  onLogout: () => void;
  setPage: (page: string) => void;
  setLanguage: (lang: 'bn' | 'en') => void;
  onAnnouncement?: (announcement: { title: string; message: string; type: string }) => void;
  currentUser?: User | null;
  isAuthenticated?: boolean;
  onLogin?: (type: UserRole) => void;
}

// Enhanced Mock Data
const initialTeachers = [
  { 
    id: 1, name: 'মোঃ করিম উদ্দিন', email: 'karim@example.com', phone: '01712345678', 
    password: '********', status: 'pending', nid: '1234567890', subjects: 'গণিত, পদার্থবিজ্ঞান', 
    joinDate: '2025-10-25', credits: 50, education: 'বিএসসি - ঢাকা বিশ্ববিদ্যালয়',
    experience: '৫ বছর', location: 'ঢাকা', profileComplete: 85, totalEarnings: 15000,
    documents: ['nid.pdf', 'degree.pdf'], verified: false, lastActive: '২ ঘন্টা আগে',
    rating: 4.5, totalClasses: 45, completedJobs: 12, responseTime: '২ ঘন্টা'
  },
  { 
    id: 2, name: 'সাবিনা আক্তার', email: 'sabina@example.com', phone: '01812345678',
    password: '********', status: 'approved', nid: '9876543210', subjects: 'ইংরেজি, বাংলা',
    joinDate: '2025-10-20', credits: 120, education: 'এমএ - জাহাঙ্গীরনগর বিশ্ববিদ্যালয়',
    experience: '৮ বছর', location: 'চট্টগ্রাম', profileComplete: 100, totalEarnings: 45000,
    documents: ['nid.pdf', 'certificate.pdf'], verified: true, lastActive: '১ দিন আগে',
    rating: 4.8, totalClasses: 120, completedJobs: 35, responseTime: '১ ঘন্টা'
  },
];

const initialGuardians = [
  { 
    id: 1, name: 'মিসেস খান', email: 'khan@example.com', phone: '01712345679',
    password: '********', subscription: 'premium', credits: 150, joinDate: '2025-10-22',
    posts: 5, activeContracts: 3, location: 'ঢাকা', verified: true,
    totalSpent: 5000, lastActive: '১ ঘন্টা আগে', children: 2, preferredSubjects: 'গণিত, ইংরেজি'
  },
  { 
    id: 2, name: 'জনাব আলম', email: 'alam@example.com', phone: '01812345679',
    password: '********', subscription: 'basic', credits: 50, joinDate: '2025-10-18',
    posts: 2, activeContracts: 1, location: 'চট্টগ্রাম', verified: false,
    totalSpent: 1500, lastActive: '৩ দিন আগে', children: 1, preferredSubjects: 'বিজ্ঞান'
  },
];

const initialStudents = [
  { 
    id: 1, name: 'রাফি আহমেদ', email: 'rafi@example.com', phone: '01612345678',
    password: '********', status: 'pending', class: 'ক্লাস ১০', need: 'গণিত টিউশন',
    appliedDate: '2025-10-28', documents: ['application.pdf', 'income_cert.pdf'],
    familyIncome: '১৫,০০০ টাকা', reason: 'পরিবারে আর্থিক সমস্যা', helpAmount: 5000,
    verified: false, location: 'ঢাকা', guardianName: 'রহিম সাহেব', guardianPhone: '01711111111'
  },
  { 
    id: 2, name: 'সুমাইয়া খাতুন', email: 'sumaiya@example.com', phone: '01512345678',
    password: '********', status: 'approved', class: 'ক্লাস ৯', need: 'ইংরেজি টিউশন',
    appliedDate: '2025-10-20', documents: ['income.pdf', 'student_id.pdf'],
    familyIncome: '১০,০০০ টাকা', reason: 'পিতার অসুস্থতা', helpAmount: 3000,
    verified: true, location: 'চট্টগ্রাম', guardianName: 'ফাতিমা বেগম', guardianPhone: '01822222222'
  },
];

const initialDonors = [
  { 
    id: 1, name: 'আবদুল মালেক', email: 'malek@example.com', phone: '01712349999',
    password: '********', amount: 50000, totalDonations: 150000, donationCount: 8,
    date: '2025-10-25', type: 'যাকাত', verified: true, location: 'সৌদি আরব',
    lastDonation: '২০২৫-১০-২৫', preferredMethod: 'bKash', tier: 'Gold'
  },
  { 
    id: 2, name: 'ফাতিমা বেগম', email: 'fatima@example.com', phone: '01812349999',
    password: '********', amount: 10000, totalDonations: 45000, donationCount: 5,
    date: '2025-10-27', type: 'দান', verified: true, location: 'মালয়েশিয়া',
    lastDonation: '২০২৫-১০-২৭', preferredMethod: 'Bank', tier: 'Silver'
  },
];

const initialContent = [
  { 
    id: 1, title: 'শিক্ষায় প্রযুক্তির ভূমিকা', type: 'blog', author: 'Admin', status: 'published',
    date: '2025-10-20', views: 1250, likes: 85, comments: 23, category: 'শিক্ষা',
    image: 'https://images.unsplash.com/photo-1501504905252-473c47e087f8?w=400',
    excerpt: 'আধুনিক শিক্ষায় প্রযুক্তির গুরুত্ব এবং ব্যবহার সম্পর্��ে বিস্তারিত আলোচনা...',
    tags: ['প্রযুক্তি', 'শিক্ষা', 'ডিজিটাল'], featured: true
  },
  { 
    id: 2, title: 'কীভাবে ভালো শিক্ষক খুঁজবেন', type: 'blog', author: 'Admin', status: 'draft',
    date: '2025-10-28', views: 0, likes: 0, comments: 0, category: 'গাইড',
    image: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=400',
    excerpt: 'আপনার সন্তানের জন্য সঠিক শিক্ষক নির্বাচনের টিপস এবং কৌশল...',
    tags: ['টিউশন', 'শিক্ষক', 'গাইড'], featured: false
  },
  { 
    id: 3, title: 'Talent Tutor প্ল্যাটফর্ম পরিচিতি', type: 'video', author: 'Admin', status: 'published',
    date: '2025-10-15', views: 3500, likes: 250, comments: 45, category: 'টিউটোরিয়াল',
    videoUrl: 'https://www.youtube.com/watch?v=example',
    thumbnail: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400',
    duration: '5:30', tags: ['প্ল্যাটফর্ম', 'টিউটোরিয়াল'], featured: true
  },
];

const initialPlans = [
  { 
    id: 1, name: 'বেসিক', price: 500, credits: 50, duration: '১ মাস',
    features: ['৫টি টিউশন পোস্ট', 'সীমিত সাপোর্ট', 'বেসিক প্রোফাইল'],
    active: true, subscribers: 45, revenue: 22500, popular: false, forRole: 'guardian'
  },
  { 
    id: 2, name: 'প্রিমিয়াম', price: 1500, credits: 200, duration: '৩ মাস',
    features: ['২০টি টিউশন পোস্ট', 'প্রায়োরিটি সাপোর্ট', 'ফ্রি ক্রেডিট বোনাস', 'প্রো প্রোফাইল'],
    active: true, subscribers: 78, revenue: 117000, popular: true, forRole: 'guardian'
  },
  { 
    id: 3, name: 'টিচার প্রো', price: 2000, credits: 300, duration: '৬ মাস',
    features: ['আনলিমিটেড আবেদন', 'প্রিমিয়াম ব্যাজ', 'টপ লিস্টিং', 'ডেডিকেটেড সাপোর্ট'],
    active: true, subscribers: 32, revenue: 64000, popular: false, forRole: 'teacher'
  },
];

const initialOffers = [
  {
    id: 1, title: 'ঈদ বিশেষ অফার', description: '৫০% ছাড় সব প্ল্যানে', 
    discount: 50, code: 'EID50', validTill: '2025-11-15', active: true,
    usageCount: 45, maxUsage: 100, targetUsers: 'all'
  },
  {
    id: 2, title: 'নতুন ইউজার বোনাস', description: '১০০ ফ্রি ক্রেডিট', 
    discount: 0, code: 'NEW100', validTill: '2025-12-31', active: true,
    usageCount: 120, maxUsage: 500, targetUsers: 'new'
  },
];

const content = {
  bn: {
    // Navigation
    dashboard: 'ড্যাশবোর্ড', 
    teacherManagement: 'শিক্ষক ম্যানেজমেন্ট',
    guardianManagement: 'অভিভাবক ম্যানেজমেন্ট', 
    studentManagement: 'ছাত্র ম্যানেজমেন্ট',
    donorManagement: 'দাতা ম্যানেজমেন্ট', 
    contentManagement: 'কন্টেন্ট ম্যানেজমেন্ট',
    subscriptionPlans: 'সাবস্ক্রিপশন প্ল্যান', 
    paymentGateway: 'পেমেন্ট গেটওয়ে',
    supportTickets: 'সাপোর্ট টিকেট', 
    analytics: 'এনালিটিক্স',
    marketing: 'মার্কেটিং টুলস', 
    settings: 'সেটিংস', 
    noticeBoard: 'নোটিশ বোর্ড',
    offerManagement: 'অফার ম্যানেজমেন্ট', 
    messaging: 'মেসেজিং সিস্টেম',
    activityLogs: 'কার্যকলাপ লগ', 
    dataManagement: 'ডাটা ম্যানেজমেন্ট',
    newsletter: 'নিউজলেটার',
    
    // Stats
    totalUsers: 'মোট ইউজার',
    activeTeachers: 'সক্রিয় শিক্ষক',
    activeGuardians: 'সক্রিয় অভিভাবক',
    pendingApprovals: 'অনুমোদন বাকি',
    totalRevenue: 'মোট আয়',
    totalDonations: 'মোট দান',
    
    // Actions
    approve: 'অনুমোদন করুন',
    reject: 'প্রত্যাখ্যান করুন',
    edit: 'সম্পাদনা',
    delete: 'মুছুন',
    view: 'দেখুন',
    save: 'সংরক্ষণ',
    cancel: 'বাতিল',
    search: 'অনুসন্ধান',
    filter: 'ফিল্টার',
    export: 'এক্সপোর্ট',
    import: 'ইমপোর্ট',
    
    // Status
    pending: 'বিবেচনাধীন',
    approved: 'অনুমোদিত',
    rejected: 'প্রত্যাখ্যাত',
    active: 'সক্রিয়',
    inactive: 'নিষ্ক্রিয়',
    blocked: 'ব্লক করা',
    suspended: 'সাসপেন্ডেড',
    
    // Messages
    notificationSent: 'ইউজারকে নোটিফিকেশন পাঠানো হয়েছে!',
    settingsSaved: '��েটিংস সেভ করা হয়েছে!',
    platformSettingsSaved: 'প্ল্যাটফর্ম সেটিংস সেভ করা হয়েছে!',
    marketingSettingsSaved: 'মার্কেটিং সেটিংস সেভ করা হয়েছে!',
    paymentSettingsSaved: 'পেমেন্ট সেটিংস সেভ করা হয়েছে!',
    dataExported: 'ডাটা এক্সপোর্ট সম্পন্ন হয়েছে!',
    profileUpdated: 'প্রোফাইল আপডেট করা হয়েছে!',
    infoUpdated: 'তথ্য আপডেট করা হয়েছে!',
    justNow: 'এখনই',
    
    // Common
    name: 'নাম',
    email: 'ইমেইল',
    phone: 'ফোন',
    status: 'স্ট্যাটাস',
    date: 'তারিখ',
    amount: 'পরিমাণ',
    credits: 'ক্রেডিট',
    actions: 'অ্যাকশন',
    logout: 'লগআউট',
    
    // Additional Translations
    adminPanel: 'এডমিন প্যানেল',
    managementPanel: 'ব্যবস্থাপনা প্যানেল',
    userManagement: 'ব্যবহারকারী ব্যবস্থাপনা',
    studentProfileManagement: 'ছাত্র প্রোফাইল ম্যানেজমেন্ট',
    creditPackages: 'ক্রেডিট প্যাকেজ',
    creditAnalytics: 'ক্রেডিট অ্যানালিটিক্স',
    creditReports: 'ক্রেডিট রিপোর্ট',
    apiManagement: 'API Key ম্যানেজমেন্ট',
    bookRequestManagement: 'বই অনুরোধ ব্যবস্থাপনা',
    newsletterAndLeads: 'নিউজলেটার ও লিড',
    quickActions: 'দ্রুত কাজ',
    recentActivity: 'সাম্প্রতিক কার্যকলাপ',
    activeTuitions: 'সক্রিয় টিউশন',
    subscribers: 'সাবস্ক্রাইবার',
    teacherApproval: 'শিক্ষক অনুমোদন',
    studentApplication: 'ছাত্র আবেদন',
    manageContent: 'কন্টেন্ট পরিচালনা',
    viewAnalytics: 'এনালিটিক্স দেখুন',
    sendMessage: 'বার্তা পাঠান',
    userMessage: 'ইউজারদের বার্তা পাঠান',
    selectRecipientGroup: 'নির্দিষ্ট গ্রুপ অথবা সব ইউজারদের বার্তা পাঠান',
    recipient: 'প্রাপক',
    allUsers: 'সব ইউজার',
    onlyTeachers: 'শুধু শিক্ষক',
    onlyGuardians: 'শুধু অভিভাবক',
    onlyStudents: 'শুধু ছাত্র',
    onlyDonors: 'শুধু দাতা',
    title: 'শিরোনাম',
    messagePlaceholder: 'বার্তার শিরোনাম',
    message: 'বার্তা',
    yourMessage: 'আপনার বার্তা লিখুন...',
    send: 'পাঠান',
    saveBtn: 'সেভ করুন',
    platformControl: 'প্ল্যাটফর্ম কন্ট্রোল',
    maintenanceMode: 'মেইনটেনেন্স মোড',
    temporarilySuspendSite: 'সাইট সাময়িকভাবে বন্ধ রাখুন',
    newRegistration: 'নতুন রেজিস্ট্রেশন',
    allowNewUserRegistration: 'নতুন ইউজার রেজিস্ট্রেশন অনুমতি',
    userProfile: 'ইউজার প্রোফাইল',
    studentProfile: 'ছাত্র প্রোফাইল',
    publishNotice: 'নোটিশ প্রকাশ',
    createOffer: 'অফার তৈরি',
    blogManagement: 'ব্লগ ম্যানেজমেন্ট',
    recentActivities: 'সাম্প্রতিক কার্যক্রম',
    activeOffers: 'সক্রিয় অফার',
    recentDonations: 'সাম্প্রতিক দান',
    
    // Newsletter Section
    newsletterManagement: 'নিউজলেটার ম্যানেজমেন্ট',
    manageSubscribersLeads: 'সাবস্ক্রাইবার এবং লিড ম্যানেজ করুন',
    
    // Marketing Section
    marketingTools: 'মার্কেটিং টুলস',
    seoSettings: 'SEO সেটিংস',
    trackingCodes: 'ট্র্যাকিং কোড',
    socialMedia: 'সোশ্যাল মিডিয়া',
    facebookPixelId: 'Facebook Pixel ID লিখুন',
    googleAnalyticsId: 'Google Analytics ID লিখুন (G-XXXXXXXXXX)',
    
    // Notice Board
    noticeBoard: 'নোটিশ বোর্ড',
    totalNotices: 'মোট নোটিশ',
    headerBanner: 'হেডার ব্যানার',
    popup: 'পপআপ',
    
    // Settings Section
    platformSettings: 'প্ল্যাটফর্ম সেটিংস',
    generalSettings: 'সাধারণ সেটিংস',
    platformFee: 'প্ল্যাটফর্ম ফি (শিক্ষকদের জন্য %)',
    platformFeeDescription: 'শিক্ষকদের ৬ মাস পর কত শতাংশ ফি নেওয়া হবে',
    teacherFreePeriod: 'শিক্ষকদের ফ্রি পিরিয়ড (মাস)',
    teacherFreeCredits: 'শিক্ষকদের ফ্রি ক্রেডিট',
    guardianFreeCredits: 'অভিভাবকদের ফ্রি ক্রেডিট',
    automationSettings: 'অটোমেশন সেটিংস',
    autoApproveTeachers: 'স্বয়ংক্রিয় শিক্ষক অনুমোদন',
    autoApproveTeachersDesc: 'ডকুমেন্ট যাচাই ছাড়াই শিক্ষক অনুমোদন',
    autoApproveStudents: 'স্বয়ংক্রিয় ছাত্র অনুমোদন',
    autoApproveStudentsDesc: 'সাহায্যের আবেদন স্বয়ংক্রিয় অনুমোদন',
    
    // Advanced Settings
    emailSettings: 'ইমেইল সেটিংস',
    smsSettings: 'এসএমএস সেটিংস',
    notificationSettings: 'নোটিফিকেশন সেটিংস',
    securitySettings: 'নিরাপত্তা সেটিংস',
    backupSettings: 'ব্যাকআপ সেটিংস',
    appearanceSettings: 'চেহারা সেটিংস',
    localizationSettings: 'স্থানীয়করণ সেটিংস',
    advancedFeatures: 'উন্নত ফিচার',
    systemConfiguration: 'সিস্টেম কনফিগারেশন',
    
    // Email Settings
    smtpServer: 'SMTP সার্ভার',
    smtpPort: 'SMTP পোর্ট',
    smtpUsername: 'ইমেইল ইউজারনেম',
    smtpPassword: 'ইমেইল পাসওয়ার্ড',
    senderEmail: 'প্রেরকের ইমেইল',
    senderName: 'প্রেরকের নাম',
    enableEmailNotifications: 'ইমেইল নোটিফিকেশন চালু করুন',
    testEmail: 'টেস্ট ইমেইল পাঠান',
    
    // SMS Settings
    smsProvider: 'এসএমএস প্রদানকারী',
    smsApiKey: 'এসএমএস API Key',
    smsSenderId: 'এসএমএস Sender ID',
    enableSmsNotifications: 'এসএমএস নোটিফিকেশন চালু করুন',
    testSms: 'টেস্ট এসএমএস পাঠান',
    smsBalance: 'এসএমএস ব্যালেন্স',
    
    // Notification Settings
    emailOnRegistration: 'রেজিস্ট্রেশনে ইমেইল',
    emailOnApproval: 'অনুমোদনে ইমেইল',
    emailOnPayment: 'পেমেন্টে ইমেইল',
    smsOnRegistration: 'রেজিস্ট্রেশনে এসএমএস',
    smsOnApproval: 'অনুমোদনে এসএমএস',
    pushNotifications: 'পুশ নোটিফিকেশন',
    inAppNotifications: 'ইন-অ্যাপ নোটিফিকেশন',
    
    // Security Settings
    twoFactorAuth: 'টু-ফ্যাক্টর অথেন্টিকেশন',
    passwordComplexity: 'পাসওয়ার্ড জটিলতা',
    sessionTimeout: 'সেশন টাইমআউট (মিনিট)',
    ipWhitelist: 'IP হোয়াইটলিস্ট',
    enableCaptcha: 'ক্যাপচা চালু করুন',
    loginAttempts: 'লগইন চেষ্টার সীমা',
    accountLockDuration: 'অ্যাকাউন্ট লক সময়কাল (মিনিট)',
    
    // Backup Settings
    autoBackup: 'স্বয়ংক্রিয় ব্যাকআপ',
    backupFrequency: 'ব্যাকআপ ফ্রিকোয়েন্সি',
    backupLocation: 'ব্যাকআপ লোকেশন',
    lastBackup: 'শেষ ব্যাকআপ',
    createBackup: 'ব্যাকআপ তৈরি করুন',
    restoreBackup: 'ব্যাকআপ পুনরুদ্ধার করুন',
    downloadBackup: 'ব্যাকআপ ডাউনলোড করুন',
    
    // Appearance Settings
    primaryColor: 'প্রাথমিক রঙ',
    secondaryColor: 'সেকেন্ডারি রঙ',
    logoUpload: 'লোগো আপলোড',
    faviconUpload: 'ফ্যাভিকন আপলোড',
    customCSS: 'কাস্টম CSS',
    darkMode: 'ডার্ক মোড',
    compactView: 'কমপ্যাক্ট ভিউ',
    
    // Localization Settings
    defaultLanguage: 'ডিফল্ট ভাষা',
    supportedLanguages: 'সমর্থিত ভাষা',
    dateFormat: 'তারিখ ফর্ম্যাট',
    timeFormat: 'সময় ফর্ম্যাট',
    timezone: 'টাইমজোন',
    currency: 'মুদ্রা',
    currencySymbol: 'মুদ্রা চিহ্ন',
    
    // Advanced Features
    enableAI: 'AI ফিচার চালু করুন',
    enableChat: 'চ্যাট সিস্টেম চালু করুন',
    enableVideoCall: 'ভিডিও কল চালু করুন',
    enableFileSharing: 'ফাইল শেয়ারিং চালু করুন',
    maxFileSize: 'সর্বোচ্চ ফাইল সাইজ (MB)',
    allowedFileTypes: 'অনুমোদিত ফাইল টাইপ',
    
    // System Configuration
    cachingEnabled: 'ক্যাশিং চালু',
    debugMode: 'ডিবাগ মোড',
    apiRateLimit: 'API রেট লিমিট',
    maxConcurrentUsers: 'সর্বোচ্চ সমসাময়িক ইউজার',
    databaseOptimization: 'ডাটাবেস অপটিমাইজেশন',
    performanceMonitoring: 'পারফরম্যান্স মনিটরিং',
    
    // Action Messages
    settingsExported: 'সেটিংস এক্সপোর্ট করা হয়েছে!',
    settingsImported: 'সেটিংস ইমপোর্ট করা হয়েছে!',
    settingsReset: 'সেটিংস রিসেট করা হয়েছে!',
    testEmailSent: 'টেস্ট ইমেইল পাঠানো হয়েছে!',
    testSmsSent: 'টেস্ট এসএমএস পাঠানো হয়েছে!',
    backupCreated: 'ব্যাকআপ তৈরি করা হয়েছে!',
    backupRestored: 'ব্যাকআপ পুনরুদ্ধার করা হয়েছে!',
    configurationUpdated: 'কনফিগারেশন আপডেট করা হয়েছে!',
    
    // More UI Text
    createNewNotice: 'নতুন নোটিশ তৈরি করুন',
    editBtn: 'এডিট',
    viewBtn: 'দেখুন',
    noActiveNotices: 'কোন সক্রিয় নোটিশ নেই',
    donorDetailsInfo: 'দাতার বিস্তারিত তথ্য',
    certificateWillBeSent: 'সার্টিফিকেট পাঠানো হবে',
    details: 'বিস্তারিত',
    sendCertificate: 'সার্টিফিকেট পাঠান',
    deleteItem: 'মুছে ফেলুন',
    mostPopular: 'সবচেয়ে জনপ্রিয়',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    planStatistics: 'প্ল্যান পরিসংখ্যান',
    newPlan: 'নতুন প্ল্যান',
    paymentGatewaySettings: 'পেমেন্ট গেটওয়ে সেটিংস',
    enable: 'সক্রিয় করুন',
    enterApiKey: 'API Key লিখুন',
    enterMerchantNumber: 'Merchant Number লিখুন',
    enterMerchantId: 'Merchant ID লিখুন',
    creditDebitCard: 'ক্রেডিট/ডেবিট কার্ড',
    userGrowth: 'ইউজার বৃদ্ধি',
    revenueAnalysis: 'রেভিনিউ বিশ্লেষণ',
    analyticsAndReports: 'এনালিটিক্স ও রিপোর্ট',
    helpRequest: 'সাহায্য',
    bothBanner: 'দুটোই',
    headerBannerLabel: 'হেডার ব্যানার',
    popupLabel: 'পপআপ',
    activeNotices: 'সক্রিয় নোটিশ',
    confirmResetSettings: 'সব সেটিংস ডিফল্টে রিসেট করবেন?',
    resetBtn: 'রিসেট করুন',
    downloadStarted: 'ডাউনলোড শুরু হয়েছে!',
    fileReadError: 'ফাইল পড়তে ত্রুটি!',
    maintenanceModeEnabled: 'মেইনটেনেন্স মোড চালু করা হয়েছে!',
    
    // Toast Messages
    teacherApproved: 'শিক্ষক অনুমোদন করা হয়েছে!',
    teacherRejected: 'শিক্ষক প্রত্যাখ্যান করা হয়েছে!',
    teacherSuspended: 'শিক্ষক সাসপেন্ড করা হয়েছে!',
    teacherDeleted: 'শিক্ষক মুছে ফেলা হয়েছে!',
    guardianDeleted: 'অভিভাবক মুছে ফেলা হয়েছে!',
    studentApprovedForHelp: 'ছাত্রকে সাহায্যের জন্য অনুমোদন করা হয়েছে!',
    studentApplicationRejected: 'ছাত্রের আবেদন প্রত্যাখ্যান করা হয়েছে!',
    studentDeleted: 'ছাত্র মুছে ফেলা হয়েছে!',
    donorDeleted: 'দাতা মুছে ফেলা হয়েছে!',
    contentPublished: 'কন্টেন্ট প্রকাশ করা হয়েছে!',
    contentUnpublished: 'কন্টেন্ট আনপাবলিশ করা হয়েছে!',
    contentDeleted: 'কন্টেন্ট মুছে ফেলা হয়েছে!',
    featureStatusUpdated: 'ফিচার স্ট্যাটাস আপডেট করা হয়েছে!',
    planStatusUpdated: 'প্ল্যান স্ট্যাটাস আপডেট করা হয়েছে!',
    planUpdated: 'প্ল্যান আপডেট করা হয়েছে!',
    newPlanCreated: 'নতুন প্ল্যান তৈরি করা হয়েছে!',
    offerUpdated: 'অফার আপডেট করা হয়েছে!',
    newOfferCreated: 'নতুন অফার তৈরি করা হয়েছে!',
    offerStatusUpdated: 'অফার স্ট্যাটাস আপডেট করা হয়েছে!',
    offerDeleted: 'অফার মুছে ফেলা হয়েছে!',
    titleAndMessageRequired: 'শিরোনাম এবং বার্তা উভয়ই আবশ্যক!',
    noticePublished: 'নোটিশ প্রকাশ করা হয়েছে!',
    noticeDeleted: 'নোটিশ মুছে ফেলা হয়েছে!',
    paymentSettingsSaved: 'পেমেন্ট সেটিংস সেভ করা হয়েছে!',
    marketingSettingsSaved: 'মার্কেটিং সেটিংস সেভ করা হয়েছে!',
    contentUpdated: 'কন্টেন্ট আপডেট করা হয়েছে!',
    newContentCreated: 'নতুন কন্টেন্ট তৈরি করা হয়েছে!',
    passwordResetSuccess: 'এর পাসওয়ার্ড রিসেট করা হয়েছে!',
    passwordMinLength: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে!',
    creditsAdded: 'ক্রেডিট যোগ করা হয়েছে!',
    noTeacherSelected: 'কোন শিক্ষক নির্বাচন করা হয়নি!',
    bulkTeachersApproved: 'জন শিক্ষক অনুমোদন করা হয়েছে!',
    bulkTeachersRejected: 'জন শিক্ষক প্রত্যাখ্যান করা হয়েছে!',
    messageSent: 'জন ইউজারকে বার্তা পাঠানো হয়েছে!',
    donorDetails: 'দাতার বিস্তারিত তথ্য',
    certificateWillBeSent: 'সার্টিফিকেট পাঠানো হবে',
    copied: 'কপি করা হয়েছে!',
    copyFailed: 'কপি করতে ব্যর্থ',
    
    // Confirm Messages
    confirmDeleteTeacher: 'আপনি কি নিশ্চিত এই শিক্ষককে মুছে ফেলতে চান?',
    confirmDeleteGuardian: 'আপনি কি নিশ্চিত এই অভিভাবককে মুছে ফেলতে চান?',
    confirmDeleteStudent: 'আপনি কি নিশ্চিত এই ছাত্রকে মুছে ফেলতে চান?',
    confirmDeleteDonor: 'আপনি কি নিশ্চিত এই দাতাকে মুছে ফেলতে চান?',
    confirmDeleteContent: 'আপনি কি নিশ্চিত এই কন্টেন্ট মুছে ফেলতে চান?',
    confirmDeleteOffer: 'আপনি কি নিশ্চিত এই অফার মুছে ফেলতে চান?',
    confirmBulkReject: 'আপনি কি',
    teachersReject: 'জন শিক্ষককে প্রত্যাখ্যান করতে চান?',
    
    // Prompts
    enterNewPassword: 'নতুন পাসওয়ার্ড লিখুন:',
    howManyCredits: 'কত ক্রেডিট যোগ করতে চান?',
    
    // Activity Logs (samples)
    activityTeacherApproval: 'শিক্ষক অনুমোদন',
    activityStudentRejection: 'ছাত্র আবেদন প্রত্যাখ্যান',
    activityNoticePublish: 'নোটিশ প্রকাশ',
    activityPasswordReset: 'পাসওয়ার্ড রিসেট',
    activityCreditsAdded: 'ক্রেডিট যোগ',
    activityBulkApproval: 'বাল্ক অনুমোদন',
    activityBulkRejection: 'বাল্ক প্রত্যাখ্যান',
    activityTeacherDeleted: 'শিক্ষক মুছে ফেলা',
    activityGuardianDeleted: 'অভিভাবক মুছে ফেলা',
    activityStudentDeleted: 'ছাত্র মুছে ফেলা',
    activityDonorDeleted: 'দাতা মুছে ফেলা',
    activityContentPublished: 'কন্টেন্ট প্রকাশ',
    activityContentDeleted: 'কন্টেন্ট মুছে ফেলা',
    activityPlanUpdated: 'প্ল্যান আপডেট',
    activityNewPlan: 'নতুন প্ল্যান',
    activityOfferUpdated: 'অফার আপডেট',
    activityNewOffer: 'নতুন অফার',
    activityOfferDeleted: 'অফার মুছে ফেলা',
    activityMessageSent: 'বার্তা পাঠানো',
    activitySettingsUpdated: 'সেটিংস আপডেট',
    activityUserUpdated: 'ইউজার আপডেট',
    activityDataExport: 'ডাটা এক্সপোর্ট',
    
    // Detail Messages
    approvedStatus: 'অনুমোদিত হয়েছে',
    rejectedStatus: 'প্রত্যাখ্যাত হয়েছে',
    suspendedStatus: 'সাসপেন্ড করা হয়েছে',
    deletedStatus: 'মুছে ফেলা হয়েছে',
    publishedStatus: 'প্রকাশ করা হয়েছে',
    updatedStatus: 'আপডেট করা হয়েছে',
    createdStatus: 'তৈরি করা হয়েছে',
    passwordResetStatus: 'এর পাসওয়ার্ড রিসেট করা হয়েছে',
    creditsAddedFor: 'এর জন্য',
    creditsAddedStatus: 'ক্রেডিট যোগ করা হয়েছে',
    teachersApprovedCount: 'জন শিক্ষক অনুমোদিত',
    teachersRejectedCount: 'জন শিক্ষক প্রত্যাখ্যাত',
    applicationApproved: 'এর আবেদন অনুমোদিত',
    applicationRejected: 'এর আবেদন প্রত্যাখ্যাত',
    messageSentTo: 'জন ইউজারকে',
    messageSentStatus: 'বার্তা পাঠানো হয়েছে',
    dataExported: 'ডাটা এক্সপোর্ট করা হয়েছে',
    infoUpdatedFor: 'এর তথ্য আপডেট করা হয়েছে',
    
    // Notification Texts
    notifTeacherApprovedTitle: 'আবেদন অনুমোদিত',
    notifTeacherApprovedMsg: 'আপনার শিক্ষক আবেদন অনুমোদন করা হয়েছে। এখন আপনি টিউশনে আবেদন করতে পারবেন।',
    notifTeacherRejectedTitle: 'আবেদন প্রত্যাখ্যাত',
    notifTeacherRejectedMsg: 'দুঃখিত, আপনার শিক্ষক আবেদন প্রত্যাখ্যান করা হয়েছে। আরও তথ্যের জন্য সাপোর্টে যোগাযোগ করুন।',
    notifAccountSuspendedTitle: 'অ্যাকাউন্ট সাসপেন্ড',
    notifAccountSuspendedMsg: 'আপনার অ্যাকাউন্ট সাময়িকভাবে সাসপেন্ড করা হয়েছে। বিস্তারিত জানতে সাপোর্টে যোগাযোগ করুন।',
    notifPasswordChangedTitle: 'পাসওয়ার্ড পরিবর্তন',
    notifPasswordChangedMsg: 'আপনার পাসওয়ার্ড এডমিন দ্বারা রিসেট করা হয়েছে। নতুন পাসওয়ার্ড:',
    notifCreditsAddedTitle: 'ক্রেডিট যোগ',
    notifCreditsAddedMsg: 'আপনার অ্যাকাউন্টে',
    notifCreditsAddedMsg2: 'ক্রেডিট যোগ করা হয়েছে।',
    notifStudentApprovedTitle: 'সাহায্যের আবেদন অনুমোদিত',
    notifStudentApprovedMsg: 'আপনার সাহায্যের আবেদন অনুমোদন করা হয়েছে।',
    notifStudentApprovedMsg2: 'টাকা সাহায্য প্রদান করা হবে।',
    notifStudentRejectedTitle: 'আবেদন প্রত্যাখ্যাত',
    notifStudentRejectedMsg: 'দুঃখিত, আপনার সাহায্যের আবেদন প্রত্যাখ্যান করা হয়েছে।',
    
    // Dialog & Form Labels (New)
    editOffer: 'অফার এডিট করুন',
    createNewOffer: 'নতুন অফার তৈরি করুন',
    offerDetailsInfo: 'ডিসকাউন্ট অফার এবং প্রমো কোডের তথ্য দিন',
    offerTitle: 'অফার টাইটেল',
    offerTitlePlaceholder: 'ঈদ স্পেশাল অফার',
    description: 'বর্ণনা',
    offerDescriptionPlaceholder: 'অফারের বিবরণ...',
    discount: 'ছাড়',
    discountPercent: 'ছাড় (%)',
    code: 'কোড',
    validUntil: 'মেয়াদ শেষ',
    maxUsage: 'সর্বোচ্চ ব্যবহার',
    targetUsers: 'টার্গেট ইউজার',
    all: 'সকল',
    newUsers: 'নতুন ইউজার',
    teachers: 'শিক্ষক',
    guardians: 'অভিভাবক',
    students: 'ছাত্র',
    editPlan: 'প্ল্যান এডিট করুন',
    createNewPlan: 'নতুন প্ল্যান তৈরি করুন',
    subscriptionPlanDetails: 'সাবস্ক্রিপশন প্ল্যানের তথ্য দিন',
    planName: 'প্ল্যান নাম',
    planNamePlaceholder: 'প্রিমিয়াম',
    price: 'মূল্য',
    pricePlaceholder: 'টাকায় মূল্য',
    creditsIncluded: 'ক্রেডিট অন্তর্ভুক্ত',
    duration: 'মেয়াদ',
    durationPlaceholder: '৩ মাস',
    features: 'ফিচার',
    featuresPlaceholder: 'প্রতিটি ফিচার নতুন লাইনে লিখুন...',
    forRole: 'কার জন্য',
    editContent: 'কন্টেন্ট এডিট করুন',
    createNewContent: 'নতুন কন্টেন্ট তৈরি করুন',
    contentDetails: 'ব্লগ পোস্ট বা ভিডিওর তথ্য দিন',
    contentTitle: 'শিরোনাম',
    contentTitlePlaceholder: 'কন্টেন্ট টাইটেল',
    type: 'ধরন',
    blog: 'ব্লগ',
    video: 'ভিডিও',
    category: 'ক্যাটেগরি',
    categoryPlaceholder: 'শিক্ষা',
    excerpt: 'সংক্ষিপ্ত',
    excerptPlaceholder: 'কন্টেন্টের সংক্ষিপ্ত বিবরণ...',
    tags: 'ট্যাগ',
    tagsPlaceholder: 'ট্যাগ কমা দিয়ে আলাদা করুন',
    imageUrl: 'ছবির URL',
    videoUrl: 'ভিডিও URL',
    featured: 'ফিচারড',
    makeContentFeatured: 'এই কন্টেন্ট ফিচারড করুন',
    editUser: 'ইউজার এডিট করুন',
    userDetailsInfo: 'ইউজারের তথ্য আপডেট করুন',
    fullName: 'পূর্ণ নাম',
    emailAddress: 'ইমেইল ঠিকানা',
    phoneNumber: 'ফোন নম্বর',
    userStatus: 'স্ট্যাটাস',
    currentCredits: 'বর্তমান ক্রেডিট',
    nidNumber: 'NID নম্বর',
    teachingSubjects: 'শিক্ষার বিষয়',
    education: 'শিক্ষা',
    experience: 'অভিজ্ঞতা',
    subscriptionType: 'সাবস্ক্রিপশন টাইপ',
    basic: 'বেসিক',
    premium: 'প্রিমিয়াম',
    pro: 'প্রো',
    totalPosts: 'মোট পোস্ট',
    activeContracts: 'সক্রিয় চুক্তি',
    class: 'ক্লাস',
    need: 'প্রয়োজন',
    familyIncome: 'পরিবারের আয়',
    helpReason: 'সাহায্যের কারণ',
    helpAmount: 'সাহায্যের পরিমাণ',
    donationType: 'দানের ধরন',
    totalDonated: 'মোট দান',
    donationCount: 'দানের সংখ্যা',
    used: 'ব্যবহৃত',
    
    // Render Section Labels (More detailed)
    jobsCompleted: 'কাজ সম্পন্ন',
    classes: 'ক্লাস',
    responseTime: 'প্রতিক্রিয়া সময়',
    profileCompletion: 'প্রোফাইল সম্পূর্ণতা',
    submittedDocuments: 'জমা দেওয়া ডকুমেন্ট',
    approveAction: 'অনুমোদন করুন',
    rejectAction: 'প্রত্যাখ্যান করুন',
    viewDetails: 'বিস্তারিত দেখুন',
    teacherActiveWorking: 'এই শিক্ষক সক্রিয় এবং কর্মরত',
    area: 'এলাকা',
    subjectsLabel: 'বিষয়সমূহ',
    
    // Donor Management Section
    donorManagementTitle: 'দাতা ম্যানেজমেন্ট',
    downloadReport: 'রিপোর্ট ডাউনলোড',
    contact: 'যোগাযোগ',
    place: 'স্থান',
    lastDonation: 'সর্বশেষ দান',
    tier: 'টায়ার',
    actions: 'অ্যাকশন',
    times: 'বার',
    latest: 'সর্বশেষ',
    donorDetails: 'দাতার বিস্তারিত তথ্য',
    sendCertificate: 'সার্টিফিকেট পাঠান',
    certificateWillBeSent: 'সার্টিফিকেট পাঠানো হবে',
    
    // Content Management Section
    contentManagementTitle: 'কন্টেন্ট ম্যানেজমেন্ট',
    addNewBlogVideo: 'নতুন ব্লগ/ভিডিও যোগ করুন',
    published: 'প্রকাশিত',
    draft: 'খসড়া',
    author: 'লেখক',
    publishedDate: 'প্রকাশের তারিখ',
    
    // Notice Board Section
    noticeBoardTitle: 'নোটিশ বোর্ড',
    createNotice: 'নোটিশ তৈরি করুন',
    noticeTitle: 'নোটিশ শিরোনাম',
    noticeType: 'নোটিশ ধরন',
    general: 'সাধারণ',
    urgent: 'জরুরি',
    maintenance: 'রক্ষণাবেক্ষণ',
    targetAudience: 'লক্ষ্য দর্শক',
    expiryDate: 'মেয়াদ শেষ',
    noticeContent: 'নোটিশ বিষয়বস্তু',
    noticeContentPlaceholder: 'আপনার নোটিশ এখানে লিখুন...',
    
    // Offer Management Section
    offerManagementTitle: 'অফার ম্যানেজমেন্ট',
    createNewOfferBtn: 'নতুন অফার তৈরি করুন',
    usage: 'ব্যবহার',
    edit: 'এডিট',
    activate: 'চালু করুন',
    deactivate: 'বন্ধ করুন',
    copiedSuccess: 'কপি করা হয়েছে!',
    copyFailed: 'কপি করতে ব্যর্থ',
    thisMonth: 'এই মাসে',
    goldDonors: 'গোল্ড দাতা',
    
    // Activity Logs Section
    activityLogsTitle: 'কার্যকলাপ লগ',
    export: 'এক্সপোর্ট',
    by: 'দ্বারা',
    
    // Subscription Plans Section
    subscriptionPlansTitle: 'সাবস্ক্রিপশন প্ল্যান ম্যানেজমেন্ট',
    newPlan: 'নতুন প্ল্যান',
    mostPopular: 'সবচেয়ে জনপ্রিয়',
    
    // Notice Board Types
    headerBanner: 'হেডার ব্যানার',
    popupNotice: 'পপআপ',
    both: 'দুটোই',
    
    // Analytics Section
    revenueAnalysis: 'রেভিনিউ বিশ্লেষণ',
    thisMonthIncome: 'এই মাসের আয়',
    lastMonthIncome: 'গত মাসের আয়',
    totalDonations: 'মোট দান',
    subscriptionBreakdown: 'সাবস্ক্রিপশন ব্রেকডাউন',
    contentPerformance: 'কন্টেন্ট পারফরম্যান্স',
    donors: 'দাতা',
    
    // Settings Section
    import: 'ইমপোর্ট',
    errorReadingFile: 'ফাইল পড়তে ত্রুটি!',
    userGrowth: 'ইউজার বৃদ্ধি',
    
    // Subscription Plans Details
    credits: 'ক্রেডিট',
    subscribers: 'সাবস্ক্রাইবার',
    revenue: 'রেভিনিউ',
    people: 'জন',
    planStatistics: 'প্ল্যান পরিসংখ্যান',
    view: 'দেখুন',
    
    // Payment Gateway Section
    paymentGatewaySettings: 'পেমেন্ট গেটওয়ে সেটিংস',
    enableBkash: 'bKash সক্রিয় করুন',
    enableNagad: 'Nagad সক্রিয় করুন',
    enableCardPayment: 'কার্ড পেমেন্ট সক্রিয় করুন',
    creditDebitCard: 'ক্রেডিট/ডেবিট কার্ড',
    
    // More Hardcoded Texts Fix
    titleAndMessageRequired: 'শিরোনাম এবং বার্তা উভয়ই আবশ্যক!',
    messageSent: 'বার্তা পাঠানো',
    messagesSentToUsers: 'জন ইউজারকে বার্তা পাঠানো হয়েছে!',
    noticePublished: 'নোটিশ প্রকাশ',
    noticePublishedSuccess: 'নোটিশ প্রকাশ করা হয়েছে!',
    noticeDeleted: 'নোটিশ মুছে ফেলা হয়েছে!',
    profileUpdate: 'প্রোফাইল আপডেট',
    profileUpdatedByAdmin: 'আপনার প্রোফাইল এডমিন দ্বারা আপডেট করা হয়েছে।',
    userUpdate: 'ইউজার আপডেট',
    dataUpdatedSuccess: 'তথ্য আপডেট করা হয়েছে!',
    used: 'ব্যবহৃত',
    saveButton: 'সেভ করুন',
    
    // Teacher Approval Section
    teacherApprovalTitle: 'শিক্ষক অনুমোদন',
    reviewAndApproveTeachers: 'নতুন শিক্ষকদের আবেদন পর্যালোচনা ও অনুমোদন করুন',
    pending: 'অপেক্ষমাণ',
    reportDownloadBtn: 'রিপোর্ট ডাউনলোড',
    searchTeacher: 'শিক্ষক খুঁজুন (নাম, ইমেইল, ফোন)...',
    allStatus: 'সব স্ট্যাটাস',
    pendingStatus: 'অপেক্ষমাণ',
    approvedStatus: 'অনুমোদিত',
    rejectedStatus: 'প্রত্যাখ্যাত',
    pendingBadge: 'অপেক্ষমাণ',
    approvedBadge: 'অনুমোদিত',
    rejectedBadge: 'প্রত্যাখ্যাত',
    joinedOn: 'যোগদান',
    nid: 'এনআইডি',
    education: 'শিক্ষা',
    
  },
  en: {
    // Navigation
    dashboard: 'Dashboard', 
    teacherManagement: 'Teacher Management',
    guardianManagement: 'Guardian Management', 
    studentManagement: 'Student Management',
    donorManagement: 'Donor Management', 
    contentManagement: 'Content Management',
    subscriptionPlans: 'Subscription Plans', 
    paymentGateway: 'Payment Gateway',
    supportTickets: 'Support Tickets', 
    analytics: 'Analytics',
    marketing: 'Marketing Tools', 
    settings: 'Settings', 
    noticeBoard: 'Notice Board',
    offerManagement: 'Offer Management', 
    messaging: 'Messaging System',
    activityLogs: 'Activity Logs', 
    dataManagement: 'Data Management',
    newsletter: 'Newsletter',
    
    // Stats
    totalUsers: 'Total Users',
    activeTeachers: 'Active Teachers',
    activeGuardians: 'Active Guardians',
    pendingApprovals: 'Pending Approvals',
    totalRevenue: 'Total Revenue',
    totalDonations: 'Total Donations',
    
    // Actions
    approve: 'Approve',
    reject: 'Reject',
    edit: 'Edit',
    delete: 'Delete',
    view: 'View',
    save: 'Save',
    cancel: 'Cancel',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    import: 'Import',
    
    // Status
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    active: 'Active',
    inactive: 'Inactive',
    blocked: 'Blocked',
    suspended: 'Suspended',
    
    // Messages
    notificationSent: 'Notification sent to user!',
    settingsSaved: 'Settings saved!',
    platformSettingsSaved: 'Platform settings saved!',
    marketingSettingsSaved: 'Marketing settings saved!',
    paymentSettingsSaved: 'Payment settings saved!',
    dataExported: 'Data export completed!',
    profileUpdated: 'Profile updated!',
    infoUpdated: 'Information updated!',
    justNow: 'Just now',
    
    // Common
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    status: 'Status',
    date: 'Date',
    amount: 'Amount',
    credits: 'Credits',
    actions: 'Actions',
    logout: 'Logout',
    
    // Additional Translations
    adminPanel: 'Admin Panel',
    managementPanel: 'Management Panel',
    userManagement: 'User Management',
    studentProfileManagement: 'Student Profile Management',
    creditPackages: 'Credit Packages',
    creditAnalytics: 'Credit Analytics',
    creditReports: 'Credit Reports',
    apiManagement: 'API Key Management',
    bookRequestManagement: 'Book Request Management',
    newsletterAndLeads: 'Newsletter & Leads',
    quickActions: 'Quick Actions',
    recentActivity: 'Recent Activity',
    activeTuitions: 'Active Tuitions',
    subscribers: 'Subscribers',
    teacherApproval: 'Teacher Approval',
    studentApplication: 'Student Application',
    manageContent: 'Manage Content',
    viewAnalytics: 'View Analytics',
    sendMessage: 'Send Message',
    userMessage: 'Send Message to Users',
    selectRecipientGroup: 'Send message to specific group or all users',
    recipient: 'Recipient',
    allUsers: 'All Users',
    onlyTeachers: 'Only Teachers',
    onlyGuardians: 'Only Guardians',
    onlyStudents: 'Only Students',
    onlyDonors: 'Only Donors',
    title: 'Title',
    messagePlaceholder: 'Message title',
    message: 'Message',
    yourMessage: 'Write your message...',
    send: 'Send',
    saveBtn: 'Save',
    platformControl: 'Platform Control',
    maintenanceMode: 'Maintenance Mode',
    temporarilySuspendSite: 'Temporarily suspend site',
    newRegistration: 'New Registration',
    allowNewUserRegistration: 'Allow new user registration',
    userProfile: 'User Profile',
    studentProfile: 'Student Profile',
    publishNotice: 'Publish Notice',
    createOffer: 'Create Offer',
    blogManagement: 'Blog Management',
    recentActivities: 'Recent Activities',
    activeOffers: 'Active Offers',
    recentDonations: 'Recent Donations',
    
    // Newsletter Section
    newsletterManagement: 'Newsletter Management',
    manageSubscribersLeads: 'Manage subscribers and leads',
    
    // Marketing Section
    marketingTools: 'Marketing Tools',
    seoSettings: 'SEO Settings',
    trackingCodes: 'Tracking Codes',
    socialMedia: 'Social Media',
    facebookPixelId: 'Enter Facebook Pixel ID',
    googleAnalyticsId: 'Enter Google Analytics ID (G-XXXXXXXXXX)',
    
    // Notice Board
    noticeBoard: 'Notice Board',
    totalNotices: 'Total Notices',
    headerBanner: 'Header Banner',
    popup: 'Popup',
    
    // Settings Section
    platformSettings: 'Platform Settings',
    generalSettings: 'General Settings',
    platformFee: 'Platform Fee (for teachers %)',
    platformFeeDescription: 'Percentage fee charged to teachers after 6 months',
    teacherFreePeriod: 'Teacher Free Period (months)',
    teacherFreeCredits: 'Teacher Free Credits',
    guardianFreeCredits: 'Guardian Free Credits',
    automationSettings: 'Automation Settings',
    autoApproveTeachers: 'Auto-approve Teachers',
    autoApproveTeachersDesc: 'Approve teachers without document verification',
    autoApproveStudents: 'Auto-approve Students',
    autoApproveStudentsDesc: 'Auto-approve help applications',
    
    // Advanced Settings
    emailSettings: 'Email Settings',
    smsSettings: 'SMS Settings',
    notificationSettings: 'Notification Settings',
    securitySettings: 'Security Settings',
    backupSettings: 'Backup Settings',
    appearanceSettings: 'Appearance Settings',
    localizationSettings: 'Localization Settings',
    advancedFeatures: 'Advanced Features',
    systemConfiguration: 'System Configuration',
    
    // Email Settings
    smtpServer: 'SMTP Server',
    smtpPort: 'SMTP Port',
    smtpUsername: 'Email Username',
    smtpPassword: 'Email Password',
    senderEmail: 'Sender Email',
    senderName: 'Sender Name',
    enableEmailNotifications: 'Enable Email Notifications',
    testEmail: 'Send Test Email',
    
    // SMS Settings
    smsProvider: 'SMS Provider',
    smsApiKey: 'SMS API Key',
    smsSenderId: 'SMS Sender ID',
    enableSmsNotifications: 'Enable SMS Notifications',
    testSms: 'Send Test SMS',
    smsBalance: 'SMS Balance',
    
    // Notification Settings
    emailOnRegistration: 'Email on Registration',
    emailOnApproval: 'Email on Approval',
    emailOnPayment: 'Email on Payment',
    smsOnRegistration: 'SMS on Registration',
    smsOnApproval: 'SMS on Approval',
    pushNotifications: 'Push Notifications',
    inAppNotifications: 'In-App Notifications',
    
    // Security Settings
    twoFactorAuth: 'Two-Factor Authentication',
    passwordComplexity: 'Password Complexity',
    sessionTimeout: 'Session Timeout (minutes)',
    ipWhitelist: 'IP Whitelist',
    enableCaptcha: 'Enable Captcha',
    loginAttempts: 'Login Attempts Limit',
    accountLockDuration: 'Account Lock Duration (minutes)',
    
    // Backup Settings
    autoBackup: 'Auto Backup',
    backupFrequency: 'Backup Frequency',
    backupLocation: 'Backup Location',
    lastBackup: 'Last Backup',
    createBackup: 'Create Backup',
    restoreBackup: 'Restore Backup',
    downloadBackup: 'Download Backup',
    
    // Appearance Settings
    primaryColor: 'Primary Color',
    secondaryColor: 'Secondary Color',
    logoUpload: 'Logo Upload',
    faviconUpload: 'Favicon Upload',
    customCSS: 'Custom CSS',
    darkMode: 'Dark Mode',
    compactView: 'Compact View',
    
    // Localization Settings
    defaultLanguage: 'Default Language',
    supportedLanguages: 'Supported Languages',
    dateFormat: 'Date Format',
    timeFormat: 'Time Format',
    timezone: 'Timezone',
    currency: 'Currency',
    currencySymbol: 'Currency Symbol',
    
    // Advanced Features
    enableAI: 'Enable AI Features',
    enableChat: 'Enable Chat System',
    enableVideoCall: 'Enable Video Call',
    enableFileSharing: 'Enable File Sharing',
    maxFileSize: 'Maximum File Size (MB)',
    allowedFileTypes: 'Allowed File Types',
    
    // System Configuration
    cachingEnabled: 'Caching Enabled',
    debugMode: 'Debug Mode',
    apiRateLimit: 'API Rate Limit',
    maxConcurrentUsers: 'Maximum Concurrent Users',
    databaseOptimization: 'Database Optimization',
    performanceMonitoring: 'Performance Monitoring',
    
    // Action Messages
    settingsExported: 'Settings exported!',
    settingsImported: 'Settings imported!',
    settingsReset: 'Settings reset!',
    testEmailSent: 'Test email sent!',
    testSmsSent: 'Test SMS sent!',
    backupCreated: 'Backup created!',
    backupRestored: 'Backup restored!',
    configurationUpdated: 'Configuration updated!',
    
    // More UI Text
    createNewNotice: 'Create New Notice',
    editBtn: 'Edit',
    viewBtn: 'View',
    noActiveNotices: 'No active notices',
    donorDetailsInfo: 'Donor details information',
    certificateWillBeSent: 'Certificate will be sent',
    details: 'Details',
    sendCertificate: 'Send Certificate',
    deleteItem: 'Delete',
    mostPopular: 'Most Popular',
    teacher: 'Teacher',
    guardian: 'Guardian',
    planStatistics: 'Plan Statistics',
    newPlan: 'New Plan',
    paymentGatewaySettings: 'Payment Gateway Settings',
    enable: 'Enable',
    enterApiKey: 'Enter API Key',
    enterMerchantNumber: 'Enter Merchant Number',
    enterMerchantId: 'Enter Merchant ID',
    creditDebitCard: 'Credit/Debit Card',
    userGrowth: 'User Growth',
    revenueAnalysis: 'Revenue Analysis',
    analyticsAndReports: 'Analytics & Reports',
    helpRequest: 'Help',
    bothBanner: 'Both',
    headerBannerLabel: 'Header Banner',
    popupLabel: 'Popup',
    activeNotices: 'Active Notices',
    confirmResetSettings: 'Reset all settings to default?',
    resetBtn: 'Reset',
    downloadStarted: 'Download started!',
    fileReadError: 'Error reading file!',
    maintenanceModeEnabled: 'Maintenance mode enabled!',
    
    // Toast Messages
    teacherApproved: 'Teacher approved!',
    teacherRejected: 'Teacher rejected!',
    teacherSuspended: 'Teacher suspended!',
    teacherDeleted: 'Teacher deleted!',
    guardianDeleted: 'Guardian deleted!',
    studentApprovedForHelp: 'Student approved for help!',
    studentApplicationRejected: 'Student application rejected!',
    studentDeleted: 'Student deleted!',
    donorDeleted: 'Donor deleted!',
    contentPublished: 'Content published!',
    contentUnpublished: 'Content unpublished!',
    contentDeleted: 'Content deleted!',
    featureStatusUpdated: 'Feature status updated!',
    planStatusUpdated: 'Plan status updated!',
    planUpdated: 'Plan updated!',
    newPlanCreated: 'New plan created!',
    offerUpdated: 'Offer updated!',
    newOfferCreated: 'New offer created!',
    offerStatusUpdated: 'Offer status updated!',
    offerDeleted: 'Offer deleted!',
    titleAndMessageRequired: 'Title and message are both required!',
    noticePublished: 'Notice published!',
    noticeDeleted: 'Notice deleted!',
    paymentSettingsSaved: 'Payment settings saved!',
    marketingSettingsSaved: 'Marketing settings saved!',
    contentUpdated: 'Content updated!',
    newContentCreated: 'New content created!',
    passwordResetSuccess: "'s password has been reset!",
    passwordMinLength: 'Password must be at least 6 characters!',
    creditsAdded: 'Credits added!',
    noTeacherSelected: 'No teacher selected!',
    bulkTeachersApproved: 'teachers approved!',
    bulkTeachersRejected: 'teachers rejected!',
    messageSent: 'users sent message!',
    donorDetails: 'Donor details',
    certificateWillBeSent: 'Certificate will be sent',
    copied: 'Copied!',
    copyFailed: 'Copy failed',
    
    // Confirm Messages
    confirmDeleteTeacher: 'Are you sure you want to delete this teacher?',
    confirmDeleteGuardian: 'Are you sure you want to delete this guardian?',
    confirmDeleteStudent: 'Are you sure you want to delete this student?',
    confirmDeleteDonor: 'Are you sure you want to delete this donor?',
    confirmDeleteContent: 'Are you sure you want to delete this content?',
    confirmDeleteOffer: 'Are you sure you want to delete this offer?',
    confirmBulkReject: 'Do you want to reject',
    teachersReject: 'teachers?',
    
    // Prompts
    enterNewPassword: 'Enter new password:',
    howManyCredits: 'How many credits to add?',
    
    // Activity Logs (samples)
    activityTeacherApproval: 'Teacher Approval',
    activityStudentRejection: 'Student Application Rejection',
    activityNoticePublish: 'Notice Published',
    activityPasswordReset: 'Password Reset',
    activityCreditsAdded: 'Credits Added',
    activityBulkApproval: 'Bulk Approval',
    activityBulkRejection: 'Bulk Rejection',
    activityTeacherDeleted: 'Teacher Deleted',
    activityGuardianDeleted: 'Guardian Deleted',
    activityStudentDeleted: 'Student Deleted',
    activityDonorDeleted: 'Donor Deleted',
    activityContentPublished: 'Content Published',
    activityContentDeleted: 'Content Deleted',
    activityPlanUpdated: 'Plan Updated',
    activityNewPlan: 'New Plan',
    activityOfferUpdated: 'Offer Updated',
    activityNewOffer: 'New Offer',
    activityOfferDeleted: 'Offer Deleted',
    activityMessageSent: 'Message Sent',
    activitySettingsUpdated: 'Settings Updated',
    activityUserUpdated: 'User Updated',
    activityDataExport: 'Data Export',
    
    // Detail Messages
    approvedStatus: 'has been approved',
    rejectedStatus: 'has been rejected',
    suspendedStatus: 'has been suspended',
    deletedStatus: 'has been deleted',
    publishedStatus: 'has been published',
    updatedStatus: 'has been updated',
    createdStatus: 'has been created',
    passwordResetStatus: "'s password has been reset",
    creditsAddedFor: 'for',
    creditsAddedStatus: 'credits added',
    teachersApprovedCount: 'teachers approved',
    teachersRejectedCount: 'teachers rejected',
    applicationApproved: "'s application approved",
    applicationRejected: "'s application rejected",
    messageSentTo: 'users',
    messageSentStatus: 'message sent',
    dataExported: 'data exported',
    infoUpdatedFor: "'s information updated",
    
    // Notification Texts
    notifTeacherApprovedTitle: 'Application Approved',
    notifTeacherApprovedMsg: 'Your teacher application has been approved. You can now apply for tuitions.',
    notifTeacherRejectedTitle: 'Application Rejected',
    notifTeacherRejectedMsg: 'Sorry, your teacher application has been rejected. Please contact support for more information.',
    notifAccountSuspendedTitle: 'Account Suspended',
    notifAccountSuspendedMsg: 'Your account has been temporarily suspended. Please contact support for details.',
    notifPasswordChangedTitle: 'Password Changed',
    notifPasswordChangedMsg: 'Your password has been reset by admin. New password:',
    notifCreditsAddedTitle: 'Credits Added',
    notifCreditsAddedMsg: 'Your account has been credited with',
    notifCreditsAddedMsg2: 'credits.',
    notifStudentApprovedTitle: 'Help Application Approved',
    notifStudentApprovedMsg: 'Your help application has been approved.',
    notifStudentApprovedMsg2: 'Taka help will be provided.',
    notifStudentRejectedTitle: 'Application Rejected',
    notifStudentRejectedMsg: 'Sorry, your help application has been rejected.',
    
    // Dialog & Form Labels (New)
    editOffer: 'Edit Offer',
    createNewOffer: 'Create New Offer',
    offerDetailsInfo: 'Provide discount offer and promo code information',
    offerTitle: 'Offer Title',
    offerTitlePlaceholder: 'Eid Special Offer',
    description: 'Description',
    offerDescriptionPlaceholder: 'Offer description...',
    discount: 'Discount',
    discountPercent: 'Discount (%)',
    code: 'Code',
    validUntil: 'Valid Until',
    maxUsage: 'Max Usage',
    targetUsers: 'Target Users',
    all: 'All',
    newUsers: 'New Users',
    teachers: 'Teachers',
    guardians: 'Guardians',
    students: 'Students',
    editPlan: 'Edit Plan',
    createNewPlan: 'Create New Plan',
    subscriptionPlanDetails: 'Provide subscription plan details',
    planName: 'Plan Name',
    planNamePlaceholder: 'Premium',
    price: 'Price',
    pricePlaceholder: 'Price in BDT',
    creditsIncluded: 'Credits Included',
    duration: 'Duration',
    durationPlaceholder: '3 Months',
    features: 'Features',
    featuresPlaceholder: 'Enter each feature on a new line...',
    forRole: 'For Role',
    editContent: 'Edit Content',
    createNewContent: 'Create New Content',
    contentDetails: 'Provide blog post or video details',
    contentTitle: 'Title',
    contentTitlePlaceholder: 'Content Title',
    type: 'Type',
    blog: 'Blog',
    video: 'Video',
    category: 'Category',
    categoryPlaceholder: 'Education',
    excerpt: 'Excerpt',
    excerptPlaceholder: 'Brief description of the content...',
    tags: 'Tags',
    tagsPlaceholder: 'Separate tags with commas',
    imageUrl: 'Image URL',
    videoUrl: 'Video URL',
    featured: 'Featured',
    makeContentFeatured: 'Make this content featured',
    editUser: 'Edit User',
    userDetailsInfo: 'Update user information',
    fullName: 'Full Name',
    emailAddress: 'Email Address',
    phoneNumber: 'Phone Number',
    userStatus: 'Status',
    currentCredits: 'Current Credits',
    nidNumber: 'NID Number',
    teachingSubjects: 'Teaching Subjects',
    education: 'Education',
    experience: 'Experience',
    subscriptionType: 'Subscription Type',
    basic: 'Basic',
    premium: 'Premium',
    pro: 'Pro',
    totalPosts: 'Total Posts',
    activeContracts: 'Active Contracts',
    class: 'Class',
    need: 'Need',
    familyIncome: 'Family Income',
    helpReason: 'Reason for Help',
    helpAmount: 'Help Amount',
    donationType: 'Donation Type',
    totalDonated: 'Total Donated',
    donationCount: 'Donation Count',
    used: 'used',
    
    // Render Section Labels (More detailed)
    jobsCompleted: 'Jobs Completed',
    classes: 'Classes',
    responseTime: 'Response Time',
    profileCompletion: 'Profile Completion',
    submittedDocuments: 'Submitted Documents',
    approveAction: 'Approve',
    rejectAction: 'Reject',
    viewDetails: 'View Details',
    teacherActiveWorking: 'This teacher is active and working',
    area: 'Area',
    subjectsLabel: 'Subjects',
    
    // Donor Management Section
    donorManagementTitle: 'Donor Management',
    downloadReport: 'Download Report',
    contact: 'Contact',
    place: 'Place',
    lastDonation: 'Last Donation',
    tier: 'Tier',
    actions: 'Actions',
    times: 'times',
    latest: 'Latest',
    donorDetails: 'Donor Details',
    sendCertificate: 'Send Certificate',
    certificateWillBeSent: 'Certificate will be sent',
    
    // Content Management Section
    contentManagementTitle: 'Content Management',
    addNewBlogVideo: 'Add New Blog/Video',
    published: 'Published',
    draft: 'Draft',
    author: 'Author',
    publishedDate: 'Published Date',
    
    // Notice Board Section
    noticeBoardTitle: 'Notice Board',
    createNotice: 'Create Notice',
    noticeTitle: 'Notice Title',
    noticeType: 'Notice Type',
    general: 'General',
    urgent: 'Urgent',
    maintenance: 'Maintenance',
    targetAudience: 'Target Audience',
    allUsers: 'All Users',
    expiryDate: 'Expiry Date',
    noticeContent: 'Notice Content',
    noticeContentPlaceholder: 'Write your notice here...',
    
    // Offer Management Section
    offerManagementTitle: 'Offer Management',
    createNewOfferBtn: 'Create New Offer',
    usage: 'Usage',
    edit: 'Edit',
    activate: 'Activate',
    deactivate: 'Deactivate',
    copiedSuccess: 'Copied!',
    copyFailed: 'Failed to copy',
    thisMonth: 'This Month',
    goldDonors: 'Gold Donors',
    
    // Activity Logs Section
    activityLogsTitle: 'Activity Logs',
    export: 'Export',
    by: 'by',
    
    // Subscription Plans Section
    subscriptionPlansTitle: 'Subscription Plans Management',
    newPlan: 'New Plan',
    mostPopular: 'Most Popular',
    teacher: 'Teacher',
    guardian: 'Guardian',
    
    // Notice Board Types
    headerBanner: 'Header Banner',
    popupNotice: 'Popup',
    both: 'Both',
    
    // Analytics Section
    revenueAnalysis: 'Revenue Analysis',
    thisMonthIncome: 'This Month Income',
    lastMonthIncome: 'Last Month Income',
    totalDonations: 'Total Donations',
    subscriptionBreakdown: 'Subscription Breakdown',
    contentPerformance: 'Content Performance',
    donors: 'Donors',
    
    // Settings Section
    import: 'Import',
    errorReadingFile: 'Error reading file!',
    userGrowth: 'User Growth',
    
    // Subscription Plans Details
    credits: 'Credits',
    subscribers: 'Subscribers',
    revenue: 'Revenue',
    people: 'people',
    planStatistics: 'Plan Statistics',
    view: 'View',
    
    // Payment Gateway Section
    paymentGatewaySettings: 'Payment Gateway Settings',
    enableBkash: 'Enable bKash',
    enableNagad: 'Enable Nagad',
    enableCardPayment: 'Enable Card Payment',
    creditDebitCard: 'Credit/Debit Card',
    
    // More Hardcoded Texts Fix
    titleAndMessageRequired: 'Both title and message are required!',
    messageSent: 'Message Sent',
    messagesSentToUsers: 'users received the message!',
    noticePublished: 'Notice Published',
    noticePublishedSuccess: 'Notice published successfully!',
    noticeDeleted: 'Notice deleted successfully!',
    profileUpdate: 'Profile Update',
    profileUpdatedByAdmin: 'Your profile has been updated by admin.',
    userUpdate: 'User Update',
    dataUpdatedSuccess: 'Data updated successfully!',
    used: 'used',
    saveButton: 'Save',
    
    // Teacher Approval Section
    teacherApprovalTitle: 'Teacher Approval',
    reviewAndApproveTeachers: 'Review and approve new teacher applications',
    pending: 'Pending',
    reportDownloadBtn: 'Download Report',
    searchTeacher: 'Search teacher (name, email, phone)...',
    allStatus: 'All Status',
    pendingStatus: 'Pending',
    approvedStatus: 'Approved',
    rejectedStatus: 'Rejected',
    pendingBadge: 'Pending',
    approvedBadge: 'Approved',
    rejectedBadge: 'Rejected',
    joinedOn: 'Joined',
    nid: 'NID',
    education: 'Education',
    
  },
};

export function AdminDashboard({ language, onLogout, setPage, setLanguage, onAnnouncement }: AdminDashboardProps) {
  const t = content[language];
  const [activeSection, setActiveSection] = useState('dashboard');
  
  // State Management
  const [teachers, setTeachers] = useState(initialTeachers);
  const [guardians, setGuardians] = useState(initialGuardians);
  const [students, setStudents] = useState(initialStudents);
  const [donors, setDonors] = useState(initialDonors);
  const [contentItems, setContentItems] = useState(initialContent);
  const [plans, setPlans] = useState(initialPlans);
  const [offers, setOffers] = useState(initialOffers);
  
  // Selection for bulk actions
  const [selectedTeachers, setSelectedTeachers] = useState<number[]>([]);
  const [selectedGuardians, setSelectedGuardians] = useState<number[]>([]);
  
  // Dialog States
  const [editDialog, setEditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [editType, setEditType] = useState<string | null>(null);
  const [messageDialog, setMessageDialog] = useState(false);
  const [messageRecipients, setMessageRecipients] = useState<string>('all');
  const [messageTitle, setMessageTitle] = useState('');
  const [messageBody, setMessageBody] = useState('');
  const [contentDialog, setContentDialog] = useState(false);
  const [offerDialog, setOfferDialog] = useState(false);
  const [planDialog, setPlanDialog] = useState(false);
  const [selectedContent, setSelectedContent] = useState<any>(null);
  const [selectedOffer, setSelectedOffer] = useState<any>(null);
  const [selectedPlan, setSelectedPlan] = useState<any>(null);
  
  // Notice Board State
  const [noticeDialog, setNoticeDialog] = useState(false);
  const [noticeTitle, setNoticeTitle] = useState('');
  const [noticeMessage, setNoticeMessage] = useState('');
  const [noticeType, setNoticeType] = useState<'header' | 'popup' | 'both'>('header');
  const [activeNotices, setActiveNotices] = useState<any[]>([]);
  
  // Activity Logs
  const [activityLogs, setActivityLogs] = useState<any[]>([
    { id: 1, action: 'শিক্ষক অনুমোদন', user: 'Admin', details: 'সাবিনা আক্তার অনুমোদিত', time: '২ ঘন্টা আগে' },
    { id: 2, action: 'ছাত্র আবেদন প্রত্যাখ্যান', user: 'Admin', details: 'রহিম এর আবেদন প্রত্যাখ্যাত', time: '৫ ঘন্টা আগে' },
    { id: 3, action: 'নোটিশ প্রকাশ', user: 'Admin', details: 'ঈদ ছুটির নোটিশ', time: '১ দিন আগে' },
  ]);
  
  // Payment Gateway Settings
  const [paymentSettings, setPaymentSettings] = useState({
    bkash: { enabled: true, apiKey: '', merchantNumber: '' },
    nagad: { enabled: true, apiKey: '', merchantId: '' },
    rocket: { enabled: false, apiKey: '', agentNumber: '' },
    card: { enabled: true, stripeKey: '', paymentGateway: 'Stripe' },
  });
  
  // Marketing Settings
  const [marketingSettings, setMarketingSettings] = useState({
    fbPixel: '', googleAnalytics: '', seoTitle: 'Talent Tutor - টিউশন মার্কেটপ্লেস',
    seoDescription: 'বাংলাদেশের সেরা টিউশন এবং দান প্ল্যাটফর্ম',
    fbPage: '', twitter: '', instagram: '',
  });
  
  // Platform Settings
  const [platformSettings, setPlatformSettings] = useState({
    platformFee: 10, teacherFreePeriod: 6, teacherFreeCredits: 50,
    guardianFreeCredits: 100, maintenanceMode: false, registrationOpen: true,
    autoApproveTeachers: false, autoApproveStudents: false,
  });
  
  // Email Settings
  const [emailSettings, setEmailSettings] = useState({
    smtpServer: 'smtp.gmail.com',
    smtpPort: 587,
    smtpUsername: '',
    smtpPassword: '',
    senderEmail: 'noreply@talenttutor.com',
    senderName: 'Talent Tutor',
    enableNotifications: true,
  });
  
  // SMS Settings
  const [smsSettings, setSmsSettings] = useState({
    provider: 'ssl-wireless',
    apiKey: '',
    senderId: 'TALENTTUTOR',
    enableNotifications: true,
    balance: 5000,
  });
  
  // Notification Preferences
  const [notificationPreferences, setNotificationPreferences] = useState({
    emailOnRegistration: true,
    emailOnApproval: true,
    emailOnPayment: true,
    smsOnRegistration: false,
    smsOnApproval: true,
    pushNotifications: true,
    inAppNotifications: true,
  });
  
  // Security Settings
  const [securitySettings, setSecuritySettings] = useState({
    twoFactorAuth: false,
    passwordComplexity: 'medium',
    sessionTimeout: 30,
    ipWhitelist: '',
    enableCaptcha: true,
    loginAttempts: 5,
    accountLockDuration: 30,
  });
  
  // Backup Settings
  const [backupSettings, setBackupSettings] = useState({
    autoBackup: true,
    frequency: 'daily',
    location: 'supabase-storage',
    lastBackup: '2025-11-09 23:00',
  });
  
  // Appearance Settings
  const [appearanceSettings, setAppearanceSettings] = useState({
    primaryColor: '#10B981',
    secondaryColor: '#3B82F6',
    darkMode: false,
    compactView: false,
  });
  
  // Localization Settings
  const [localizationSettings, setLocalizationSettings] = useState({
    defaultLanguage: 'bn',
    supportedLanguages: ['bn', 'en'],
    dateFormat: 'DD/MM/YYYY',
    timeFormat: '24h',
    timezone: 'Asia/Dhaka',
    currency: 'BDT',
    currencySymbol: '৳',
  });
  
  // Advanced Features
  const [advancedFeatures, setAdvancedFeatures] = useState({
    enableAI: true,
    enableChat: true,
    enableVideoCall: true,
    enableFileSharing: true,
    maxFileSize: 10,
    allowedFileTypes: 'pdf,doc,docx,jpg,png',
  });
  
  // System Configuration
  const [systemConfig, setSystemConfig] = useState({
    cachingEnabled: true,
    debugMode: false,
    apiRateLimit: 100,
    maxConcurrentUsers: 1000,
    performanceMonitoring: true,
  });

  // Search and Filter
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');

  // Load platform settings from localStorage on mount
  useEffect(() => {
    try {
      const savedSettings = localStorage.getItem('platformSettings');
      if (savedSettings) {
        const parsed = JSON.parse(savedSettings);
        // IMPORTANT: Force maintenance mode to be false (disabled for now)
        // এটি deployment এর সময় enable করা হবে
        parsed.maintenanceMode = false;
        setPlatformSettings(parsed);
        // Update localStorage to ensure it's false
        localStorage.setItem('platformSettings', JSON.stringify(parsed));
      }
    } catch (error) {
      console.error('Failed to load platform settings:', error);
    }
  }, []);

  // Add activity log helper
  const addActivityLog = (action: string, details: string) => {
    const newLog = {
      id: Date.now(),
      action,
      user: 'Admin',
      details,
      time: t.justNow,
    };
    setActivityLogs([newLog, ...activityLogs]);
  };

  // Send notification to user (this would call backend API)
  const sendNotificationToUser = (userId: number, userType: string, title: string, message: string) => {
    // Backend API call here
    console.log('Notification sent:', { userId, userType, title, message });
    toast.success(t.notificationSent);
  };

  // Stats Calculation
  const stats = [
    { 
      label: t.totalUsers, 
      value: teachers.length + guardians.length + students.length + donors.length, 
      icon: Users, color: 'bg-[#10B981]', trend: '+12%', trendUp: true 
    },
    { 
      label: t.activeTeachers, 
      value: teachers.filter(t => t.status === 'approved').length, 
      icon: GraduationCap, color: 'bg-emerald-500', trend: '+8%', trendUp: true 
    },
    { 
      label: t.activeGuardians, 
      value: guardians.length, 
      icon: UserCheck, color: 'bg-teal-600', trend: '+15%', trendUp: true 
    },
    { 
      label: t.pendingApprovals, 
      value: teachers.filter(t => t.status === 'pending').length + students.filter(s => s.status === 'pending').length, 
      icon: Clock, color: 'bg-amber-500', trend: '-5%', trendUp: false 
    },
    { 
      label: t.totalRevenue, 
      value: '৳' + plans.reduce((sum, p) => sum + p.revenue, 0).toLocaleString(), 
      icon: DollarSign, color: 'bg-green-500', trend: '+22%', trendUp: true 
    },
    { 
      label: t.totalDonations, 
      value: '৳' + donors.reduce((sum, d) => sum + d.totalDonations, 0).toLocaleString(), 
      icon: Heart, color: 'bg-rose-500', trend: '+18%', trendUp: true 
    },
    { 
      label: t.activeTuitions, 
      value: guardians.reduce((sum, g) => sum + g.posts, 0), 
      icon: Briefcase, color: 'bg-cyan-500', trend: '+10%', trendUp: true 
    },
    { 
      label: t.subscribers, 
      value: plans.reduce((sum, p) => sum + p.subscribers, 0), 
      icon: Crown, color: 'bg-yellow-500', trend: '+25%', trendUp: true 
    },
  ];

  // ============== ACTION HANDLERS ==============

  // Teacher Actions
  const handleEditTeacher = (teacher: any) => {
    setSelectedUser(teacher);
    setEditType('teacher');
    setEditDialog(true);
  };

  const handleApproveTeacher = (id: number) => {
    const teacher = teachers.find(t => t.id === id);
    setTeachers(teachers.map(t => t.id === id ? { ...t, status: 'approved', verified: true } : t));
    if (teacher) {
      sendNotificationToUser(id, 'teacher', t.notifTeacherApprovedTitle, t.notifTeacherApprovedMsg);
      addActivityLog(t.activityTeacherApproval, `${teacher.name} ${t.approvedStatus}`);
    }
    toast.success(t.teacherApproved);
  };

  const handleRejectTeacher = (id: number) => {
    const teacher = teachers.find(t => t.id === id);
    setTeachers(teachers.map(t => t.id === id ? { ...t, status: 'rejected' } : t));
    if (teacher) {
      sendNotificationToUser(id, 'teacher', t.notifTeacherRejectedTitle, t.notifTeacherRejectedMsg);
      addActivityLog(t.activityTeacherApproval, `${teacher.name} ${t.rejectedStatus}`);
    }
    toast.success(t.teacherRejected);
  };

  const handleSuspendTeacher = (id: number) => {
    const teacher = teachers.find(t => t.id === id);
    setTeachers(teachers.map(t => t.id === id ? { ...t, status: 'suspended' } : t));
    if (teacher) {
      sendNotificationToUser(id, 'teacher', t.notifAccountSuspendedTitle, t.notifAccountSuspendedMsg);
      addActivityLog(t.activityTeacherApproval, `${teacher.name} ${t.suspendedStatus}`);
    }
    toast.success(t.teacherSuspended);
  };

  const handleDeleteTeacher = (id: number) => {
    const teacher = teachers.find(t => t.id === id);
    if (confirm(t.confirmDeleteTeacher)) {
      setTeachers(teachers.filter(t => t.id !== id));
      if (teacher) {
        addActivityLog(t.activityTeacherDeleted, `${teacher.name} ${t.deletedStatus}`);
      }
      toast.success(t.teacherDeleted);
    }
  };

  const handleResetPassword = (user: any, type: string) => {
    const newPassword = prompt(t.enterNewPassword);
    if (newPassword && newPassword.length >= 6) {
      sendNotificationToUser(user.id, type, t.notifPasswordChangedTitle, t.notifPasswordChangedMsg + ' ' + newPassword);
      addActivityLog(t.activityPasswordReset, `${user.name} ${t.passwordResetStatus}`);
      toast.success(`${user.name} ${t.passwordResetSuccess}`);
    } else if (newPassword) {
      toast.error(t.passwordMinLength);
    }
  };

  const handleAddCredits = (user: any, type: string) => {
    const amount = prompt(t.howManyCredits);
    if (amount && !isNaN(Number(amount))) {
      const credits = Number(amount);
      if (type === 'teacher') {
        setTeachers(teachers.map(t => t.id === user.id ? { ...t, credits: t.credits + credits } : t));
      } else if (type === 'guardian') {
        setGuardians(guardians.map(g => g.id === user.id ? { ...g, credits: g.credits + credits } : g));
      }
      sendNotificationToUser(user.id, type, t.notifCreditsAddedTitle, `${t.notifCreditsAddedMsg} ${credits} ${t.notifCreditsAddedMsg2}`);
      addActivityLog(t.activityCreditsAdded, `${user.name} ${t.creditsAddedFor} ${credits} ${t.creditsAddedStatus}`);
      toast.success(`${credits} ${t.creditsAdded}`);
    }
  };

  // Bulk Actions
  const handleBulkApprove = () => {
    if (selectedTeachers.length === 0) {
      toast.error(t.noTeacherSelected);
      return;
    }
    setTeachers(teachers.map(t => 
      selectedTeachers.includes(t.id) ? { ...t, status: 'approved', verified: true } : t
    ));
    selectedTeachers.forEach(id => {
      const teacher = teachers.find(t => t.id === id);
      if (teacher) {
        sendNotificationToUser(id, 'teacher', t.notifTeacherApprovedTitle, t.notifTeacherApprovedMsg);
      }
    });
    addActivityLog(t.activityBulkApproval, `${selectedTeachers.length} ${t.teachersApprovedCount}`);
    toast.success(`${selectedTeachers.length} ${t.bulkTeachersApproved}`);
    setSelectedTeachers([]);
  };

  const handleBulkReject = () => {
    if (selectedTeachers.length === 0) {
      toast.error(t.noTeacherSelected);
      return;
    }
    if (confirm(`${t.confirmBulkReject} ${selectedTeachers.length} ${t.teachersReject}`)) {
      setTeachers(teachers.map(t => 
        selectedTeachers.includes(t.id) ? { ...t, status: 'rejected' } : t
      ));
      addActivityLog(t.activityBulkRejection, `${selectedTeachers.length} ${t.teachersRejectedCount}`);
      toast.success(`${selectedTeachers.length} ${t.bulkTeachersRejected}`);
      setSelectedTeachers([]);
    }
  };

  // Guardian Actions
  const handleEditGuardian = (guardian: any) => {
    setSelectedUser(guardian);
    setEditType('guardian');
    setEditDialog(true);
  };

  const handleDeleteGuardian = (id: number) => {
    const guardian = guardians.find(g => g.id === id);
    if (confirm(t.confirmDeleteGuardian)) {
      setGuardians(guardians.filter(g => g.id !== id));
      if (guardian) {
        addActivityLog(t.activityGuardianDeleted, `${guardian.name} ${t.deletedStatus}`);
      }
      toast.success(t.guardianDeleted);
    }
  };

  // Student Actions
  const handleApproveStudent = (id: number) => {
    const student = students.find(s => s.id === id);
    setStudents(students.map(s => s.id === id ? { ...s, status: 'approved', verified: true } : s));
    if (student) {
      sendNotificationToUser(id, 'student', t.notifStudentApprovedTitle, `${t.notifStudentApprovedMsg} ${student.helpAmount} ${t.notifStudentApprovedMsg2}`);
      addActivityLog(t.activityStudentRejection, `${student.name} ${t.applicationApproved}`);
    }
    toast.success(t.studentApprovedForHelp);
  };

  const handleRejectStudent = (id: number) => {
    const student = students.find(s => s.id === id);
    setStudents(students.map(s => s.id === id ? { ...s, status: 'rejected' } : s));
    if (student) {
      sendNotificationToUser(id, 'student', 'আবেদন প্রত্যাখ্যাত', 'দুঃখিত, আপনার ��াহায্যের আবেদন প্রত্যাখ্যান করা হয়েছে।');
      addActivityLog('ছাত্র প্রত্যাখ্যান', `${student.name} এর আবেদন প্রত্যাখ্যাত`);
    }
    toast.success(t.studentApplicationRejected);
  };

  const handleDeleteStudent = (id: number) => {
    const student = students.find(s => s.id === id);
    if (confirm('আপনি কি নিশ্চিত এই ছাত্রকে মুছে ফেলতে চান?')) {
      setStudents(students.filter(s => s.id !== id));
      if (student) {
        addActivityLog('ছাত্র মুছে ফেলা', `${student.name} মুছে ফেলা হয়েছে`);
      }
      toast.success(t.studentDeleted);
    }
  };

  // Donor Actions
  const handleDeleteDonor = (id: number) => {
    const donor = donors.find(d => d.id === id);
    if (confirm('আপনি কি নিশ্চিত এই দাতাকে মুছে ফেলতে চান?')) {
      setDonors(donors.filter(d => d.id !== id));
      if (donor) {
        addActivityLog('দাতা মুছে ফেলা', `${donor.name} মুছে ফেলা হয়েছে`);
      }
      toast.success(t.donorDeleted);
    }
  };

  // Content Management
  const handlePublishContent = (id: number) => {
    const content = contentItems.find(c => c.id === id);
    setContentItems(contentItems.map(c => c.id === id ? { ...c, status: 'published' } : c));
    if (content) {
      addActivityLog('কন্টেন্ট প্রকাশ', `${content.title} প্রকাশ করা হয়েছে`);
    }
    toast.success('কন্টেন্ট প্রকাশ করা হয়েছে!');
  };

  const handleUnpublishContent = (id: number) => {
    setContentItems(contentItems.map(c => c.id === id ? { ...c, status: 'draft' } : c));
    toast.success('কন্টেন্ট আনপাবলিশ করা হয়েছে!');
  };

  const handleDeleteContent = (id: number) => {
    const content = contentItems.find(c => c.id === id);
    if (confirm('আপনি কি নিশ্চিত এই কন্টেন্ট মুছে ফেলতে চান?')) {
      setContentItems(contentItems.filter(c => c.id !== id));
      if (content) {
        addActivityLog('কন্টেন্ট মুছে ফেলা', `${content.title} মুছে ফেলা হয়েছে`);
      }
      toast.success('কন্টেন্ট মুছে ফেলা হয়েছে!');
    }
  };

  const handleFeatureContent = (id: number) => {
    setContentItems(contentItems.map(c => c.id === id ? { ...c, featured: !c.featured } : c));
    toast.success('ফিচার স্ট্যাটাস আপডেট করা হয়েছে!');
  };

  // Plan Actions
  const handleTogglePlan = (id: number) => {
    setPlans(plans.map(p => p.id === id ? { ...p, active: !p.active } : p));
    toast.success('প্ল্যান স্ট্যাটাস আপডেট করা হয়েছে!');
  };

  const handleEditPlan = (plan: any) => {
    setSelectedPlan(plan);
    setPlanDialog(true);
  };

  const handleSavePlan = () => {
    if (!selectedPlan) return;
    if (selectedPlan.id) {
      setPlans(plans.map(p => p.id === selectedPlan.id ? selectedPlan : p));
      addActivityLog('প্ল্যান আপডেট', `${selectedPlan.name} আপডেট করা হ���়েছে`);
      toast.success('প্ল্যান আপডেট করা হয়েছে!');
    } else {
      setPlans([...plans, { ...selectedPlan, id: Date.now() }]);
      addActivityLog('নতুন প্ল্যান', `${selectedPlan.name} তৈরি করা হয়েছে`);
      toast.success('নতুন প্ল্যান তৈরি করা হয়েছে!');
    }
    setPlanDialog(false);
    setSelectedPlan(null);
  };

  // Offer Management
  const handleCreateOffer = () => {
    setSelectedOffer({
      id: null, title: '', description: '', discount: 0, code: '',
      validTill: '', active: true, usageCount: 0, maxUsage: 100, targetUsers: 'all'
    });
    setOfferDialog(true);
  };

  const handleEditOffer = (offer: any) => {
    setSelectedOffer(offer);
    setOfferDialog(true);
  };

  const handleSaveOffer = () => {
    if (!selectedOffer) return;
    if (selectedOffer.id) {
      setOffers(offers.map(o => o.id === selectedOffer.id ? selectedOffer : o));
      addActivityLog('অফার আপডেট', `${selectedOffer.title} আপডেট করা হয়েছে`);
      toast.success('অফার আপডেট করা হয়েছে!');
    } else {
      setOffers([...offers, { ...selectedOffer, id: Date.now() }]);
      addActivityLog('নতুন অফার', `${selectedOffer.title} তৈরি করা হয়েছে`);
      toast.success('���তুন অফার তৈরি করা হয়েছে!');
    }
    setOfferDialog(false);
    setSelectedOffer(null);
  };

  const handleToggleOffer = (id: number) => {
    setOffers(offers.map(o => o.id === id ? { ...o, active: !o.active } : o));
    toast.success('অফার স্ট্যাটাস আপডেট ক���া হয়েছে!');
  };

  const handleDeleteOffer = (id: number) => {
    const offer = offers.find(o => o.id === id);
    if (confirm('আপনি কি নিশ্চিত এই অফার মুছে ফেলতে চান?')) {
      setOffers(offers.filter(o => o.id !== id));
      if (offer) {
        addActivityLog('অফার মুছে ফেলা', `${offer.title} মুছে ফেলা হয়েছে`);
      }
      toast.success('অফার মুছে ফেলা হয়েছে!');
    }
  };

  // Platform Settings Actions
  const handleSavePlatformSettings = () => {
    // Save to localStorage for persistence
    localStorage.setItem('platformSettings', JSON.stringify(platformSettings));
    
    addActivityLog(
      t.activitySettingsUpdated,
      language === 'bn' ? 'প্ল্যাটফর্ম সেটিংস সেভ করা হয়েছে' : 'Platform settings saved'
    );
    toast.success(t.platformSettingsSaved);
  };
  
  const handleSaveMarketingSettings = () => {
    addActivityLog(
      t.activitySettingsUpdated,
      language === 'bn' ? 'মার্কেটিং সেটিংস সেভ করা হয়েছে' : 'Marketing settings saved'
    );
    toast.success(t.marketingSettingsSaved);
  };
  
  const handleSavePaymentSettings = () => {
    addActivityLog(
      t.activitySettingsUpdated,
      language === 'bn' ? 'পেমেন্ট সেটিংস সেভ করা হয়েছে' : 'Payment settings saved'
    );
    toast.success(t.paymentSettingsSaved);
  };

  // Messaging System
  const handleSendMessage = () => {
    if (!messageTitle || !messageBody) {
      toast.error('শিরোনাম এবং বার্তা উভয়ই আবশ্যক!');
      return;
    }

    let recipientCount = 0;
    if (messageRecipients === 'all') {
      recipientCount = teachers.length + guardians.length + students.length + donors.length;
    } else if (messageRecipients === 'teachers') {
      recipientCount = teachers.length;
    } else if (messageRecipients === 'guardians') {
      recipientCount = guardians.length;
    } else if (messageRecipients === 'students') {
      recipientCount = students.length;
    } else if (messageRecipients === 'donors') {
      recipientCount = donors.length;
    }

    // Backend API call would happen here
    addActivityLog('বার্তা পাঠানো', `${recipientCount} জন ইউজারকে "${messageTitle}" বার্তা পাঠানো হয়েছে`);
    toast.success(`${recipientCount} জন ইউজারকে বার্তা পাঠানো হয়েছে!`);
    
    setMessageTitle('');
    setMessageBody('');
    setMessageDialog(false);
  };

  // Notice Board Actions
  const handleCreateNotice = () => {
    if (!noticeTitle || !noticeMessage) {
      toast.error('শিরোনাম এবং বার্তা উভয়ই আবশ্যক!');
      return;
    }

    const newNotice = {
      id: Date.now(),
      title: noticeTitle,
      message: noticeMessage,
      type: noticeType,
      createdAt: new Date().toISOString(),
      active: true,
    };

    setActiveNotices([...activeNotices, newNotice]);
    
    if (onAnnouncement && (noticeType === 'header' || noticeType === 'both')) {
      onAnnouncement({
        title: noticeTitle,
        message: noticeMessage,
        type: 'info',
      });
    }

    addActivityLog('নোটিশ প্রকাশ', noticeTitle);
    toast.success('নোটিশ প্রকাশ করা হয়েছে!');
    setNoticeTitle('');
    setNoticeMessage('');
    setNoticeDialog(false);
  };

  const handleDeleteNotice = (id: number) => {
    setActiveNotices(activeNotices.filter(n => n.id !== id));
    toast.success('নোটিশ মুছে ফেলা হয়েছে!');
  };

  // Update user data from edit dialog
  const handleSaveUserEdit = () => {
    if (!selectedUser) return;

    if (editType === 'teacher') {
      setTeachers(teachers.map(t => t.id === selectedUser.id ? selectedUser : t));
      sendNotificationToUser(selectedUser.id, 'teacher', 'প্রোফাইল আপডেট', 'আপনার প্রোফাইল এডমিন দ্বারা আপডেট করা হয়েছে।');
    } else if (editType === 'guardian') {
      setGuardians(guardians.map(g => g.id === selectedUser.id ? selectedUser : g));
      sendNotificationToUser(selectedUser.id, 'guardian', 'প্রোফাইল আপডেট', 'আপনার প্রোফাইল এডমিন দ্বারা আপডেট করা হয়েছে।');
    } else if (editType === 'student') {
      setStudents(students.map(s => s.id === selectedUser.id ? selectedUser : s));
      sendNotificationToUser(selectedUser.id, 'student', 'প্রোফাইল আপডেট', 'আপনার প্রোফাইল এডমিন দ্বারা আপডেট করা হয়েছে।');
    } else if (editType === 'donor') {
      setDonors(donors.map(d => d.id === selectedUser.id ? selectedUser : d));
      sendNotificationToUser(selectedUser.id, 'donor', 'প্রোফাইল আপডেট', 'আপনার প্রোফাইল এডমিন দ্বারা আপডেট করা হয়েছে।');
    }

    addActivityLog('ইউজার আপডেট', `${selectedUser.name} এর তথ্য আপডেট করা হয়েছে`);
    toast.success('তথ্য আপডেট করা হয়েছে!');
    setEditDialog(false);
    setSelectedUser(null);
    setEditType(null);
  };

  // Data Export
  const handleExportData = (type: string) => {
    let data: any[] = [];
    let filename = '';
    
    if (type === 'teachers') {
      data = teachers;
      filename = 'teachers_export.json';
    } else if (type === 'guardians') {
      data = guardians;
      filename = 'guardians_export.json';
    } else if (type === 'students') {
      data = students;
      filename = 'students_export.json';
    } else if (type === 'donors') {
      data = donors;
      filename = 'donors_export.json';
    }
    
    const dataStr = JSON.stringify(data, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = filename;
    link.click();
    
    addActivityLog('ডাটা এক্সপোর্ট', `${type} ডাটা এক্সপোর্ট করা হয়েছে`);
    toast.success('ডাটা এক্সপোর্ট সম্পন্ন হয়েছে!');
  };

  // Filter function
  const filterByStatus = (items: any[], statusField: string = 'status') => {
    if (filterStatus === 'all') return items;
    return items.filter(item => item[statusField] === filterStatus);
  };

  // ============== RENDER SECTIONS ==============

  const renderDashboard = () => (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow cursor-pointer">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600 mb-1">{stat.label}</p>
                    <h3 className="text-2xl text-gray-900">{stat.value}</h3>
                    <div className="flex items-center gap-1 mt-2">
                      {stat.trendUp ? (
                        <TrendingUp className="w-4 h-4 text-green-500" />
                      ) : (
                        <TrendingDown className="w-4 h-4 text-red-500" />
                      )}
                      <span className={`text-sm ${stat.trendUp ? 'text-green-500' : 'text-red-500'}`}>
                        {stat.trend}
                      </span>
                    </div>
                  </div>
                  <div className={`w-14 h-14 ${stat.color} rounded-xl flex items-center justify-center`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Quick Actions & Recent Activity */}
      <div className="grid md:grid-cols-3 gap-6">
        {/* Quick Actions */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 font-[Noto_Serif_Bengali]">{t.quickActions}</h3>
          <div className="space-y-2">
            <Button 
              onClick={() => setActiveSection('userManagement')} 
              variant="outline" 
              className="w-full justify-start font-[Noto_Serif_Bengali]"
            >
              <GraduationCap className="w-4 h-4 mr-2" />
              {t.teacherApproval}
              <Badge className="ml-auto">{teachers.filter(t => t.status === 'pending').length}</Badge>
            </Button>
            <Button 
              onClick={() => setActiveSection('studentProfileManagement')} 
              variant="outline" 
              className="w-full justify-start font-[Noto_Serif_Bengali]"
            >
              <UserCheck className="w-4 h-4 mr-2" />
              {t.studentApplication}
              <Badge className="ml-auto">{students.filter(s => s.status === 'pending').length}</Badge>
            </Button>
            <Button 
              onClick={() => setActiveSection('userManagement')} 
              variant="outline" 
              className="w-full justify-start bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-300 hover:from-emerald-100 hover:to-teal-100"
            >
              <UserPlus className="w-4 h-4 mr-2 text-emerald-600" />
              <span className="text-emerald-600 font-semibold font-[Noto_Serif_Bengali]">{t.userManagement}</span>
            </Button>
            <Button 
              onClick={() => setActiveSection('studentProfileManagement')} 
              variant="outline" 
              className="w-full justify-start bg-gradient-to-r from-purple-50 to-indigo-50 border-purple-300 hover:from-purple-100 hover:to-indigo-100"
            >
              <GraduationCap className="w-4 h-4 mr-2 text-purple-600" />
              <span className="text-purple-600 font-semibold font-[Noto_Serif_Bengali]">{t.studentProfile}</span>
            </Button>
            <Button 
              onClick={() => setMessageDialog(true)} 
              variant="outline" 
              className="w-full justify-start font-[Noto_Serif_Bengali]"
            >
              <Send className="w-4 h-4 mr-2" />
              {t.sendMessage}
            </Button>
            <Button 
              onClick={() => setNoticeDialog(true)} 
              variant="outline" 
              className="w-full justify-start font-[Noto_Serif_Bengali]"
            >
              <Megaphone className="w-4 h-4 mr-2" />
              {t.publishNotice}
            </Button>
            <Button 
              onClick={handleCreateOffer} 
              variant="outline" 
              className="w-full justify-start font-[Noto_Serif_Bengali]"
            >
              <Gift className="w-4 h-4 mr-2" />
              {t.createOffer}
            </Button>
            <Button 
              onClick={() => setPage('blog-management')} 
              variant="outline" 
              className="w-full justify-start bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200 hover:from-emerald-100 hover:to-teal-100"
            >
              <FileText className="w-4 h-4 mr-2 text-emerald-600" />
              <span className="text-emerald-600 font-[Noto_Serif_Bengali]">{t.blogManagement}</span>
            </Button>
          </div>
        </Card>

        {/* Recent Activity Logs */}
        <Card className="p-6 md:col-span-2">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 font-[Noto_Serif_Bengali]">
            <History className="w-5 h-5" />
            {t.recentActivities}
          </h3>
          <ScrollArea className="h-[280px]">
            <div className="space-y-3">
              {activityLogs.slice(0, 10).map((log) => (
                <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                  <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <Activity className="w-4 h-4 text-emerald-600" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900">{log.action}</p>
                    <p className="text-xs text-gray-600 truncate">{log.details}</p>
                    <p className="text-xs text-gray-400 mt-1">{log.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Active Offers & Recent Donations */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 font-[Noto_Serif_Bengali]">
            <Gift className="w-5 h-5" />
            {t.activeOffers}
          </h3>
          <div className="space-y-3">
            {offers.filter(o => o.active).slice(0, 3).map((offer) => (
              <div key={offer.id} className="flex items-center gap-3 p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center flex-shrink-0">
                  <Percent className="w-6 h-6 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-semibold text-gray-900">{offer.title}</p>
                  <p className="text-xs text-gray-600 font-[Noto_Serif_Bengali]">{offer.code} • {offer.usageCount}/{offer.maxUsage} {t.used}</p>
                </div>
                <Badge className="bg-emerald-500">{offer.discount}% OFF</Badge>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2 font-[Noto_Serif_Bengali]">
            <Heart className="w-5 h-5" />
            {t.recentDonations}
          </h3>
          <div className="space-y-3">
            {donors.slice(0, 3).map((donor) => (
              <div key={donor.id} className="flex items-center gap-3 p-3 bg-rose-50 rounded-lg border border-rose-200">
                <div className="w-10 h-10 bg-rose-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{donor.name}</p>
                  <p className="text-xs text-gray-500">{donor.location}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-emerald-600">৳{donor.amount.toLocaleString()}</p>
                  <p className="text-xs text-gray-500">{donor.type}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );



  /* REMOVED: renderTeacherManagement, renderGuardianManagement, renderStudentManagement
   * These functions are now replaced by ConsolidatedUserManagement component
   * which provides unified user management for all user types
   */

  const renderTeacherApproval = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900 font-[Noto_Serif_Bengali]">{t.teacherApprovalTitle}</h2>
          <p className="text-sm text-gray-500 mt-1 font-[Noto_Serif_Bengali]">{t.reviewAndApproveTeachers}</p>
        </div>
        <div className="flex gap-2">
          <Badge className="bg-amber-500">
            <Clock className="w-3 h-3 mr-1" />
            <span className="font-[Noto_Serif_Bengali]">{teachers.filter(t => t.status === 'pending').length} {t.pending}</span>
          </Badge>
          <Button variant="outline" onClick={() => handleExportData('teachers')} className="font-[Noto_Serif_Bengali]">
            <Download className="w-4 h-4 mr-2" />
            {t.reportDownloadBtn}
          </Button>
        </div>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="flex gap-3">
          <div className="flex-1">
            <Input
              placeholder={t.searchTeacher}
              className="w-full font-[Noto_Serif_Bengali]"
            />
          </div>
          <Select defaultValue="all">
            <SelectTrigger className="w-[180px] font-[Noto_Serif_Bengali]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="font-[Noto_Serif_Bengali]">
              <SelectItem value="all">{t.allStatus}</SelectItem>
              <SelectItem value="pending">{t.pendingStatus}</SelectItem>
              <SelectItem value="approved">{t.approvedStatus}</SelectItem>
              <SelectItem value="rejected">{t.rejectedStatus}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Teacher Applications */}
      <div className="grid gap-4">
        {teachers.map((teacher) => (
          <Card key={teacher.id} className="p-6 hover:shadow-lg transition-shadow">
            <div className="flex gap-6">
              {/* Profile Info */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{teacher.name}</h3>
                    <p className="text-sm text-gray-500 font-[Noto_Serif_Bengali]">ID: #{teacher.id} • {t.joinedOn}: {teacher.joinDate}</p>
                  </div>
                  <Badge className={`font-[Noto_Serif_Bengali] ${
                    teacher.status === 'pending' ? 'bg-amber-500' :
                    teacher.status === 'approved' ? 'bg-emerald-500' :
                    'bg-red-500'
                  }`}>
                    {teacher.status === 'pending' ? t.pendingBadge :
                     teacher.status === 'approved' ? t.approvedBadge :
                     t.rejectedBadge}
                  </Badge>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-4">
                  <div>
                    <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">{t.email}</p>
                    <p className="text-sm text-gray-900">{teacher.email}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">{t.phone}</p>
                    <p className="text-sm text-gray-900">{teacher.phone}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">{t.nid}</p>
                    <p className="text-sm text-gray-900">{teacher.nid}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">{t.education}</p>
                    <p className="text-sm text-gray-900">{teacher.education}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">{t.experience}</p>
                    <p className="text-sm text-gray-900">{teacher.experience}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">{t.area}</p>
                    <p className="text-sm text-gray-900">{teacher.location}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1 font-[Noto_Serif_Bengali]">{t.subjectsLabel}</p>
                  <div className="flex flex-wrap gap-2">
                    {teacher.subjects.split(', ').map((subject, idx) => (
                      <Badge key={idx} variant="outline" className="text-xs">
                        {subject}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex items-center gap-4 mb-4">
                  <div className="flex items-center gap-2">
                    <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                    <span className="text-sm font-medium">{teacher.rating}/5.0</span>
                  </div>
                  <div className="text-sm text-gray-500 font-[Noto_Serif_Bengali]">
                    {teacher.completedJobs} {t.jobsCompleted} • {teacher.totalClasses} {t.classes}
                  </div>
                  <div className="text-sm text-gray-500 font-[Noto_Serif_Bengali]">
                    {t.responseTime}: {teacher.responseTime}
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-xs text-gray-500 mb-1 font-[Noto_Serif_Bengali]">{t.profileCompletion}</p>
                  <div className="flex items-center gap-2">
                    <Progress value={teacher.profileComplete} className="flex-1" />
                    <span className="text-sm font-medium">{teacher.profileComplete}%</span>
                  </div>
                </div>

                {teacher.documents && teacher.documents.length > 0 && (
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-[Noto_Serif_Bengali]">{t.submittedDocuments}</p>
                    <div className="flex flex-wrap gap-2">
                      {teacher.documents.map((doc, idx) => (
                        <Button key={idx} variant="outline" size="sm" className="text-xs">
                          <FileText className="w-3 h-3 mr-1" />
                          {doc}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Action Buttons */}
            {teacher.status === 'pending' && (
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Button
                  className="flex-1 bg-emerald-500 hover:bg-emerald-600 font-[Noto_Serif_Bengali]"
                  onClick={() => {
                    handleApproveTeacher(teacher.id);
                  }}
                >
                  <CheckCircle className="w-4 h-4 mr-2" />
                  {t.approveAction}
                </Button>
                <Button
                  variant="outline"
                  className="flex-1 border-red-500 text-red-500 hover:bg-red-50 font-[Noto_Serif_Bengali]"
                  onClick={() => {
                    handleRejectTeacher(teacher.id);
                  }}
                >
                  <XCircle className="w-4 h-4 mr-2" />
                  {t.rejectAction}
                </Button>
                <Button
                  variant="outline"
                  className="font-[Noto_Serif_Bengali]"
                  onClick={() => {
                    setSelectedUser(teacher);
                    setEditType('teacher');
                    setEditDialog(true);
                  }}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  {t.viewDetails}
                </Button>
              </div>
            )}

            {teacher.status === 'approved' && (
              <div className="flex gap-2 mt-4 pt-4 border-t">
                <Badge className="bg-emerald-500 font-[Noto_Serif_Bengali]">
                  <CheckCircle className="w-3 h-3 mr-1" />
                  {t.teacherActiveWorking}
                </Badge>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setSelectedUser(teacher);
                    setEditType('teacher');
                    setEditDialog(true);
                  }}
                >
                  <Edit className="w-3 h-3 mr-2" />
                  এডিট করুন
                </Button>
              </div>
            )}
          </Card>
        ))}
      </div>
    </div>
  );

  const renderDonorManagement = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900 font-[Noto_Serif_Bengali]">{t.donorManagementTitle}</h2>
        <Button variant="outline" onClick={() => handleExportData('donors')} className="font-[Noto_Serif_Bengali]">
          <Download className="w-4 h-4 mr-2" />
          {t.downloadReport}
        </Button>
      </div>

      <Card>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-[Noto_Serif_Bengali]">{t.name}</TableHead>
                <TableHead className="font-[Noto_Serif_Bengali]">{t.contact}</TableHead>
                <TableHead className="font-[Noto_Serif_Bengali]">{t.place}</TableHead>
                <TableHead className="font-[Noto_Serif_Bengali]">{t.type}</TableHead>
                <TableHead className="font-[Noto_Serif_Bengali]">{t.lastDonation}</TableHead>
                <TableHead className="font-[Noto_Serif_Bengali]">{t.totalDonated}</TableHead>
                <TableHead className="font-[Noto_Serif_Bengali]">{t.tier}</TableHead>
                <TableHead className="text-right font-[Noto_Serif_Bengali]">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {donors.map((donor) => (
                <TableRow key={donor.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium text-gray-900">{donor.name}</p>
                      <p className="text-xs text-gray-500">ID: #{donor.id}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm">
                      <p className="flex items-center gap-1">
                        <Mail className="w-3 h-3" />
                        {donor.email}
                      </p>
                      <p className="flex items-center gap-1 text-gray-500">
                        <Phone className="w-3 h-3" />
                        {donor.phone}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{donor.location}</p>
                  </TableCell>
                  <TableCell>
                    <Badge variant={donor.type === 'যাকাত' ? 'default' : 'secondary'}>
                      {donor.type}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <p className="text-sm">{donor.lastDonation}</p>
                    <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">{donor.donationCount} {t.times}</p>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-semibold text-emerald-600">
                        ৳{donor.totalDonations.toLocaleString()}
                      </p>
                      <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                        {t.latest}: ৳{donor.amount.toLocaleString()}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge 
                      variant="outline"
                      className={
                        donor.tier === 'Gold' ? 'border-amber-500 text-amber-700' :
                        donor.tier === 'Silver' ? 'border-gray-400 text-gray-700' :
                        'border-rose-400 text-rose-700'
                      }
                    >
                      {donor.tier}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-1">
                      <Button
                        size="sm"
                        variant="ghost"
                        onClick={() => {
                          // Show donor details
                          toast.info(t.donorDetails);
                        }}
                        title={t.viewDetails}
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-blue-600"
                        onClick={() => {
                          toast.success(t.certificateWillBeSent);
                        }}
                        title={t.sendCertificate}
                      >
                        <FileText className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-red-600"
                        onClick={() => handleDeleteDonor(donor.id)}
                        title="মুছে ফেলুন"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      {/* Statistics */}
      <div className="grid grid-cols-4 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">মোট দাতা</p>
          <p className="text-2xl font-bold text-gray-900">{donors.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">মোট দান</p>
          <p className="text-2xl font-bold text-emerald-600">
            ৳{donors.reduce((sum, d) => sum + d.totalDonations, 0).toLocaleString()}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">{t.thisMonth}</p>
          <p className="text-2xl font-bold text-blue-600">
            ৳{donors.reduce((sum, d) => sum + d.amount, 0).toLocaleString()}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">{t.goldDonors}</p>
          <p className="text-2xl font-bold text-yellow-600">
            {donors.filter(d => d.tier === 'Gold').length}
          </p>
        </Card>
      </div>
    </div>
  );

  // Continue with other render functions...
  // (Due to character limit, I'll include the key parts)

  const renderOfferManagement = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900 font-[Noto_Serif_Bengali]">{t.offerManagementTitle}</h2>
        <Button onClick={handleCreateOffer} className="font-[Noto_Serif_Bengali]">
          <PlusCircle className="w-4 h-4 mr-2" />
          {t.createNewOfferBtn}
        </Button>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        {offers.map((offer) => (
          <Card key={offer.id} className={`p-6 ${offer.active ? 'border-emerald-500 border-2' : 'opacity-60'}`}>
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-2">
                  <Gift className="w-5 h-5 text-emerald-600" />
                  <h3 className="font-semibold text-gray-900">{offer.title}</h3>
                  {offer.active && <Badge className="bg-emerald-500 font-[Noto_Serif_Bengali]">সক্রিয়</Badge>}
                </div>
                <p className="text-sm text-gray-600 mb-3">{offer.description}</p>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4 mb-4">
              <div>
                <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">{t.discount}</p>
                <p className="text-2xl font-bold text-emerald-600">{offer.discount}%</p>
              </div>
              <div>
                <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">{t.code}</p>
                <div className="flex items-center gap-2">
                  <code className="text-sm font-mono bg-gray-100 px-2 py-1 rounded">{offer.code}</code>
                  <Button size="sm" variant="ghost" onClick={async () => {
                    const success = await copyToClipboard(offer.code);
                    if (success) {
                      toast.success(t.copiedSuccess);
                    } else {
                      toast.error(t.copyFailed);
                    }
                  }}>
                    <Copy className="w-3 h-3" />
                  </Button>
                </div>
              </div>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-[Noto_Serif_Bengali]">{t.usage}</span>
                <span className="font-medium">{offer.usageCount}/{offer.maxUsage}</span>
              </div>
              <Progress value={(offer.usageCount / offer.maxUsage) * 100} />
              <div className="flex justify-between text-sm">
                <span className="text-gray-600 font-[Noto_Serif_Bengali]">{t.validUntil}</span>
                <span className="font-medium">{offer.validTill}</span>
              </div>
            </div>

            <div className="flex gap-2">
              <Button size="sm" variant="outline" onClick={() => handleEditOffer(offer)} className="flex-1 font-[Noto_Serif_Bengali]">
                <Edit className="w-4 h-4 mr-1" />
                {t.edit}
              </Button>
              <Button 
                size="sm" 
                variant={offer.active ? 'outline' : 'default'} 
                onClick={() => handleToggleOffer(offer.id)}
                className="flex-1 font-[Noto_Serif_Bengali]"
              >
                {offer.active ? <Ban className="w-4 h-4 mr-1" /> : <CheckCircle className="w-4 h-4 mr-1" />}
                {offer.active ? t.deactivate : t.activate}
              </Button>
              <Button size="sm" variant="ghost" className="text-red-600" onClick={() => handleDeleteOffer(offer.id)}>
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );

  const renderMessaging = () => (
    <div className="space-y-6">
      <h2 className="text-2xl text-gray-900 font-[Noto_Serif_Bengali]">মেসেজিং সিস্টেম</h2>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">ইউজারদের বার্তা পাঠান</h3>
        <Button onClick={() => setMessageDialog(true)} className="w-full">
          <Send className="w-4 h-4 mr-2" />
          নতুন বার্তা তৈরি করুন
        </Button>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">সাম্প্রতিক বার্তা</h3>
        <div className="space-y-3">
          {activityLogs
            .filter(log => log.action === 'বার্তা পাঠানো')
            .slice(0, 5)
            .map((log) => (
              <div key={log.id} className="flex items-start gap-3 p-3 bg-gray-50 rounded-lg">
                <Mail className="w-5 h-5 text-emerald-600 mt-1" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{log.details}</p>
                  <p className="text-xs text-gray-500">{log.time}</p>
                </div>
              </div>
            ))}
        </div>
      </Card>
    </div>
  );

  const renderActivityLogs = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900 font-[Noto_Serif_Bengali]">{t.activityLogsTitle}</h2>
        <Button variant="outline" onClick={() => handleExportData('logs')} className="font-[Noto_Serif_Bengali]">
          <Download className="w-4 h-4 mr-2" />
          {t.export}
        </Button>
      </div>

      <Card>
        <ScrollArea className="h-[700px]">
          <div className="p-6 space-y-4">
            {activityLogs.map((log) => (
              <div key={log.id} className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                  <Activity className="w-5 h-5 text-emerald-600" />
                </div>
                <div className="flex-1">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-gray-900">{log.action}</p>
                      <p className="text-sm text-gray-600 mt-1">{log.details}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-xs text-gray-500">by {log.user}</span>
                        <span className="text-xs text-gray-400">• {log.time}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </Card>
    </div>
  );

  /* REMOVED: renderGuardianManagement, renderStudentManagement, and duplicate renderDonorManagement
   * These have been replaced by ConsolidatedUserManagement component for unified user management
   * Only the first renderDonorManagement (line ~990) is kept as donors have a separate section
   */

  const renderContentManagement = () => (
    <div className="space-y-6">
      {/* Main CMS */}
      <DynamicCMS />
    </div>
  );

  const renderSubscriptionPlans = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900 font-[Noto_Serif_Bengali]">{t.subscriptionPlansTitle}</h2>
        <Button onClick={() => {
          setSelectedPlan({ 
            id: null, name: '', price: 0, credits: 0, duration: '১ মাস',
            features: [], active: true, subscribers: 0, revenue: 0, popular: false, forRole: 'guardian'
          });
          setPlanDialog(true);
        }} className="font-[Noto_Serif_Bengali]">
          <PlusCircle className="w-4 h-4 mr-2" />
          {t.newPlan}
        </Button>
      </div>

      <div className="grid md:grid-cols-3 gap-6">
        {plans.map((plan) => (
          <Card key={plan.id} className={`p-6 ${plan.popular ? 'border-2 border-emerald-500 shadow-lg' : ''} ${!plan.active ? 'opacity-60' : ''}`}>
            <div className="flex items-start justify-between mb-4">
              <div>
                {plan.popular && (
                  <Badge className="mb-2 bg-emerald-500 font-[Noto_Serif_Bengali]">{t.mostPopular}</Badge>
                )}
                <h3 className="text-2xl font-semibold text-gray-900">{plan.name}</h3>
                <Badge variant="outline" className="mt-1 font-[Noto_Serif_Bengali]">
                  {plan.forRole === 'teacher' ? t.teachers : t.guardians}
                </Badge>
              </div>
              <Switch
                checked={plan.active}
                onCheckedChange={() => handleTogglePlan(plan.id)}
              />
            </div>
            
            <div className="mb-4">
              <span className="text-4xl font-bold text-gray-900">৳{plan.price}</span>
              <span className="text-gray-600">/{plan.duration}</span>
            </div>
            
            <div className="space-y-2 mb-6">
              <div className="flex items-center gap-2 text-sm font-semibold text-emerald-600 font-[Noto_Serif_Bengali]">
                <CreditCard className="w-4 h-4" />
                <span>{plan.credits} {t.credits}</span>
              </div>
              {plan.features.map((feature, i) => (
                <div key={i} className="flex items-center gap-2 text-sm">
                  <CheckCircle className="w-4 h-4 text-emerald-600 flex-shrink-0" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
            
            <div className="space-y-3 pt-4 border-t">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-[Noto_Serif_Bengali]">{t.subscribers}:</span>
                <span className="font-semibold font-[Noto_Serif_Bengali]">{plan.subscribers} {t.people}</span>
              </div>
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600 font-[Noto_Serif_Bengali]">{t.revenue}:</span>
                <span className="font-semibold text-emerald-600">৳{plan.revenue.toLocaleString()}</span>
              </div>
              
              <div className="flex gap-2 pt-2">
                <Button size="sm" variant="outline" className="flex-1 font-[Noto_Serif_Bengali]" onClick={() => handleEditPlan(plan)}>
                  <Edit className="w-4 h-4 mr-1" />
                  {t.edit}
                </Button>
                <Button size="sm" variant="outline" className="flex-1 font-[Noto_Serif_Bengali]">
                  <Eye className="w-4 h-4 mr-1" />
                  {t.view}
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Plan Statistics */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.planStatistics}</h3>
        <div className="grid grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div key={plan.id} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{plan.name}</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{plan.subscribers}</p>
              <p className="text-sm text-emerald-600">৳{plan.revenue.toLocaleString()}</p>
              <Progress value={(plan.subscribers / 200) * 100} className="mt-2" />
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderPaymentGateway = () => (
    <div className="space-y-6">
      <h2 className="text-2xl text-gray-900 font-[Noto_Serif_Bengali]">{t.paymentGatewaySettings}</h2>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <div className="w-10 h-10 bg-pink-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-pink-600" />
          </div>
          bKash
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="font-[Noto_Serif_Bengali]">{t.enableBkash}</Label>
            <Switch
              checked={paymentSettings.bkash.enabled}
              onCheckedChange={(checked) => 
                setPaymentSettings({
                  ...paymentSettings,
                  bkash: { ...paymentSettings.bkash, enabled: checked }
                })
              }
            />
          </div>
          <div>
            <Label>API Key</Label>
            <Input
              value={paymentSettings.bkash.apiKey}
              onChange={(e) => 
                setPaymentSettings({
                  ...paymentSettings,
                  bkash: { ...paymentSettings.bkash, apiKey: e.target.value }
                })
              }
              placeholder="bKash API Key লিখুন"
            />
          </div>
          <div>
            <Label>Merchant Number</Label>
            <Input
              value={paymentSettings.bkash.merchantNumber}
              onChange={(e) => 
                setPaymentSettings({
                  ...paymentSettings,
                  bkash: { ...paymentSettings.bkash, merchantNumber: e.target.value }
                })
              }
              placeholder="Merchant Number লিখুন"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-amber-600" />
          </div>
          Nagad
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="font-[Noto_Serif_Bengali]">{t.enableNagad}</Label>
            <Switch
              checked={paymentSettings.nagad.enabled}
              onCheckedChange={(checked) => 
                setPaymentSettings({
                  ...paymentSettings,
                  nagad: { ...paymentSettings.nagad, enabled: checked }
                })
              }
            />
          </div>
          <div>
            <Label>API Key</Label>
            <Input
              value={paymentSettings.nagad.apiKey}
              onChange={(e) => 
                setPaymentSettings({
                  ...paymentSettings,
                  nagad: { ...paymentSettings.nagad, apiKey: e.target.value }
                })
              }
              placeholder="Nagad API Key লিখুন"
            />
          </div>
          <div>
            <Label>Merchant ID</Label>
            <Input
              value={paymentSettings.nagad.merchantId}
              onChange={(e) => 
                setPaymentSettings({
                  ...paymentSettings,
                  nagad: { ...paymentSettings.nagad, merchantId: e.target.value }
                })
              }
              placeholder="Merchant ID লিখুন"
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-blue-600" />
          </div>
          <span className="font-[Noto_Serif_Bengali]">{t.creditDebitCard}</span>
        </h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label className="font-[Noto_Serif_Bengali]">{t.enableCardPayment}</Label>
            <Switch
              checked={paymentSettings.card.enabled}
              onCheckedChange={(checked) => 
                setPaymentSettings({
                  ...paymentSettings,
                  card: { ...paymentSettings.card, enabled: checked }
                })
              }
            />
          </div>
          <div>
            <Label>Stripe API Key</Label>
            <Input
              value={paymentSettings.card.stripeKey}
              onChange={(e) => 
                setPaymentSettings({
                  ...paymentSettings,
                  card: { ...paymentSettings.card, stripeKey: e.target.value }
                })
              }
              placeholder="Stripe API Key লিখুন"
            />
          </div>
        </div>
      </Card>

      <Button onClick={handleSavePaymentSettings}>
        <Save className="w-4 h-4 mr-2" />
        সেভ করুন
      </Button>
    </div>
  );

  const renderAnalytics = () => (
    <div className="space-y-6">
      <h2 className="text-2xl text-gray-900 font-[Noto_Serif_Bengali]">{t.analytics}</h2>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.userGrowth}</h3>
          <div className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">{t.teachers}</span>
                <span className="font-semibold">{teachers.length}</span>
              </div>
              <Progress value={teachers.length * 5} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">{t.guardians}</span>
                <span className="font-semibold">{guardians.length}</span>
              </div>
              <Progress value={guardians.length * 10} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">{t.students}</span>
                <span className="font-semibold">{students.length}</span>
              </div>
              <Progress value={students.length * 10} />
            </div>
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">{t.donors}</span>
                <span className="font-semibold">{donors.length}</span>
              </div>
              <Progress value={donors.length * 10} />
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.revenueAnalysis}</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">{t.thisMonthIncome}</p>
                <p className="text-2xl font-bold text-emerald-600">৳২,৩৫,৫০০</p>
              </div>
              <TrendingUp className="w-8 h-8 text-emerald-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-green-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">{t.lastMonthIncome}</p>
                <p className="text-2xl font-bold text-blue-600">৳১,৯২,০০০</p>
              </div>
              <DollarSign className="w-8 h-8 text-blue-600" />
            </div>
            <div className="flex items-center justify-between p-4 bg-rose-50 rounded-lg">
              <div>
                <p className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">{t.totalDonations}</p>
                <p className="text-2xl font-bold text-rose-600">
                  ৳{donors.reduce((sum, d) => sum + d.totalDonations, 0).toLocaleString()}
                </p>
              </div>
              <Heart className="w-8 h-8 text-rose-600" />
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.subscriptionBreakdown}</h3>
        <div className="grid grid-cols-3 gap-4">
          {plans.map((plan) => (
            <div key={plan.id} className="text-center p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-600 mb-1">{plan.name}</p>
              <p className="text-3xl font-bold text-gray-900 mb-1">{plan.subscribers}</p>
              <p className="text-sm text-emerald-600">৳{plan.revenue.toLocaleString()}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.contentPerformance}</h3>
        <div className="space-y-3">
          {contentItems.filter(c => c.status === 'published').slice(0, 5).map((content) => (
            <div key={content.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
              <div className="flex-1">
                <p className="font-medium text-gray-900">{content.title}</p>
                <div className="flex items-center gap-4 mt-1">
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Eye className="w-3 h-3" />
                    {content.views}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <Heart className="w-3 h-3" />
                    {content.likes}
                  </span>
                  <span className="text-sm text-gray-500 flex items-center gap-1">
                    <MessageSquare className="w-3 h-3" />
                    {content.comments}
                  </span>
                </div>
              </div>
              <Badge>{content.type === 'blog' ? '📝' : '🎥'}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );

  const renderNewsletter = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
                    <p className="text-sm text-gray-500 mt-1 font-[Noto_Serif_Bengali]">{t.manageSubscribersLeads}</p>
        </div>
      </div>
      <NewsletterManagement language={language} />
    </div>
  );

  const renderMarketing = () => (
    <div className="space-y-6">
      <h2 className="text-2xl text-gray-900 font-[Noto_Serif_Bengali]">{t.marketingTools}</h2>
      
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.seoSettings}</h3>
        <div className="space-y-4">
          <div>
            <Label>SEO Title</Label>
            <Input
              value={marketingSettings.seoTitle}
              onChange={(e) => setMarketingSettings({ ...marketingSettings, seoTitle: e.target.value })}
            />
          </div>
          <div>
            <Label>SEO Description</Label>
            <Textarea
              value={marketingSettings.seoDescription}
              onChange={(e) => setMarketingSettings({ ...marketingSettings, seoDescription: e.target.value })}
              rows={3}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.trackingCodes}</h3>
        <div className="space-y-4">
          <div>
            <Label>Facebook Pixel ID</Label>
            <Input
              value={marketingSettings.fbPixel}
              onChange={(e) => setMarketingSettings({ ...marketingSettings, fbPixel: e.target.value })}
              placeholder={t.facebookPixelId}
            />
          </div>
          <div>
            <Label>Google Analytics ID</Label>
            <Input
              value={marketingSettings.googleAnalytics}
              onChange={(e) => setMarketingSettings({ ...marketingSettings, googleAnalytics: e.target.value })}
              placeholder={t.googleAnalyticsId}
            />
          </div>
        </div>
      </Card>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.socialMedia}</h3>
        <div className="space-y-4">
          <div>
            <Label>Facebook Page</Label>
            <Input
              value={marketingSettings.fbPage}
              onChange={(e) => setMarketingSettings({ ...marketingSettings, fbPage: e.target.value })}
              placeholder="https://facebook.com/talenttutor"
            />
          </div>
          <div>
            <Label>Instagram</Label>
            <Input
              value={marketingSettings.instagram}
              onChange={(e) => setMarketingSettings({ ...marketingSettings, instagram: e.target.value })}
              placeholder="https://instagram.com/talenttutor"
            />
          </div>
          <div>
            <Label>Twitter/X</Label>
            <Input
              value={marketingSettings.twitter}
              onChange={(e) => setMarketingSettings({ ...marketingSettings, twitter: e.target.value })}
              placeholder="https://twitter.com/talenttutor"
            />
          </div>
        </div>
      </Card>

      <Button onClick={handleSaveMarketingSettings} className="font-[Noto_Serif_Bengali]">
        <Save className="w-4 h-4 mr-2" />
        {t.saveBtn}
      </Button>
    </div>
  );

  const renderNoticeBoard = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900 font-[Noto_Serif_Bengali]">{t.noticeBoard}</h2>
        <Button onClick={() => setNoticeDialog(true)} className="font-[Noto_Serif_Bengali]">
          <PlusCircle className="w-4 h-4 mr-2" />
          নতুন নোটিশ তৈরি করুন
        </Button>
      </div>

      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">সক্রিয় নোটিশ</h3>
        {activeNotices.length === 0 ? (
          <div className="text-center py-8 text-gray-500 font-[Noto_Serif_Bengali]">
            <Bell className="w-12 h-12 mx-auto mb-3 opacity-50" />
            <p>কোন সক্রিয় নোটিশ নেই</p>
          </div>
        ) : (
          <div className="space-y-3">
            {activeNotices.map((notice) => (
              <Card key={notice.id} className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Megaphone className="w-5 h-5 text-emerald-600" />
                      <h4 className="font-semibold text-gray-900">{notice.title}</h4>
                      <Badge variant="outline" className="font-[Noto_Serif_Bengali]">
                        {notice.type === 'header' ? t.headerBanner : 
                         notice.type === 'popup' ? t.popupNotice : t.both}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-2">{notice.message}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(notice.createdAt).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                    </p>
                  </div>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-red-600"
                    onClick={() => handleDeleteNotice(notice.id)}
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}
      </Card>

      {/* Notice Statistics */}
      <div className="grid grid-cols-3 gap-4">
        <Card className="p-4">
          <p className="text-sm text-gray-600">{t.totalNotices}</p>
          <p className="text-2xl font-bold text-gray-900">{activeNotices.length}</p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600">{t.headerBanner}</p>
          <p className="text-2xl font-bold text-emerald-600">
            {activeNotices.filter(n => n.type === 'header' || n.type === 'both').length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">{t.popup}</p>
          <p className="text-2xl font-bold text-blue-600">
            {activeNotices.filter(n => n.type === 'popup' || n.type === 'both').length}
          </p>
        </Card>
      </div>
    </div>
  );

  const renderSettings = () => (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl text-gray-900 font-[Noto_Serif_Bengali]">{t.platformSettings}</h2>
        <div className="flex gap-2">
          <Button variant="outline" size="sm" onClick={() => {
            const settingsData = JSON.stringify({
              platform: platformSettings,
              email: emailSettings,
              sms: smsSettings,
              notifications: notificationPreferences,
              security: securitySettings,
              backup: backupSettings,
              appearance: appearanceSettings,
              localization: localizationSettings,
              features: advancedFeatures,
              system: systemConfig,
            }, null, 2);
            const blob = new Blob([settingsData], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = `settings-${new Date().toISOString()}.json`;
            a.click();
            toast.success(t.settingsExported);
          }}>
            <Download className="w-4 h-4 mr-2" />
            {t.export}
          </Button>
          <Button variant="outline" size="sm" onClick={() => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = 'application/json';
            input.onchange = (e: any) => {
              const file = e.target?.files?.[0];
              if (file) {
                const reader = new FileReader();
                reader.onload = (event) => {
                  try {
                    const settings = JSON.parse(event.target?.result as string);
                    if (settings.platform) setPlatformSettings(settings.platform);
                    if (settings.email) setEmailSettings(settings.email);
                    if (settings.sms) setSmsSettings(settings.sms);
                    if (settings.notifications) setNotificationPreferences(settings.notifications);
                    if (settings.security) setSecuritySettings(settings.security);
                    if (settings.backup) setBackupSettings(settings.backup);
                    if (settings.appearance) setAppearanceSettings(settings.appearance);
                    if (settings.localization) setLocalizationSettings(settings.localization);
                    if (settings.features) setAdvancedFeatures(settings.features);
                    if (settings.system) setSystemConfig(settings.system);
                    toast.success(t.settingsImported);
                  } catch (error) {
                    toast.error(t.errorReadingFile);
                  }
                };
                reader.readAsText(file);
              }
            };
            input.click();
          }}>
            <Upload className="w-4 h-4 mr-2" />
            {t.import}
          </Button>
        </div>
      </div>
      
      <Tabs defaultValue="general" className="w-full">
        <TabsList className="grid w-full grid-cols-6 lg:grid-cols-10">
          <TabsTrigger value="general">{t.general}</TabsTrigger>
          <TabsTrigger value="email">{t.email}</TabsTrigger>
          <TabsTrigger value="sms">{t.sms}</TabsTrigger>
          <TabsTrigger value="notifications">{t.notifications}</TabsTrigger>
          <TabsTrigger value="security">{t.security}</TabsTrigger>
          <TabsTrigger value="backup">{t.backup}</TabsTrigger>
          <TabsTrigger value="appearance">{t.appearance}</TabsTrigger>
          <TabsTrigger value="localization">{language === 'bn' ? 'স্থানীয়করণ' : 'Localization'}</TabsTrigger>
          <TabsTrigger value="features">{language === 'bn' ? 'ফিচার' : 'Features'}</TabsTrigger>
          <TabsTrigger value="system">{language === 'bn' ? 'সিস্টেম' : 'System'}</TabsTrigger>
        </TabsList>

        {/* General Settings Tab */}
        <TabsContent value="general" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.generalSettings}</h3>
            <div className="space-y-4">
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.platformFee}</Label>
                <Input
                  type="number"
                  value={platformSettings.platformFee}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, platformFee: Number(e.target.value) })}
                />
                <p className="text-xs text-gray-500 mt-1 font-[Noto_Serif_Bengali]">{t.platformFeeDescription}</p>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.teacherFreePeriod}</Label>
                  <Input
                    type="number"
                    value={platformSettings.teacherFreePeriod}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, teacherFreePeriod: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.teacherFreeCredits}</Label>
                  <Input
                    type="number"
                    value={platformSettings.teacherFreeCredits}
                    onChange={(e) => setPlatformSettings({ ...platformSettings, teacherFreeCredits: Number(e.target.value) })}
                  />
                </div>
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.guardianFreeCredits}</Label>
                <Input
                  type="number"
                  value={platformSettings.guardianFreeCredits}
                  onChange={(e) => setPlatformSettings({ ...platformSettings, guardianFreeCredits: Number(e.target.value) })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.automationSettings}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.autoApproveTeachers}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">{t.autoApproveTeachersDesc}</p>
                </div>
                <Switch
                  checked={platformSettings.autoApproveTeachers}
                  onCheckedChange={(checked) => setPlatformSettings({ ...platformSettings, autoApproveTeachers: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.autoApproveStudents}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">{t.autoApproveStudentsDesc}</p>
                </div>
                <Switch
                  checked={platformSettings.autoApproveStudents}
                  onCheckedChange={(checked) => setPlatformSettings({ ...platformSettings, autoApproveStudents: checked })}
                />
              </div>
            </div>
          </Card>
          
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.platformControl}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-amber-50 rounded-lg border-2 border-amber-200">
                <div>
                  <Label className="text-amber-900 font-[Noto_Serif_Bengali]">{t.maintenanceMode}</Label>
                  <p className="text-xs text-amber-700 font-[Noto_Serif_Bengali]">{t.temporarilySuspendSite}</p>
                </div>
                <Switch
                  checked={platformSettings.maintenanceMode}
                  onCheckedChange={(checked) => {
                    setPlatformSettings({ ...platformSettings, maintenanceMode: checked });
                    if (checked) {
                      toast.warning(language === 'bn' ? 'মেইনটেনেন্স মোড চালু করা হয়েছে!' : 'Maintenance mode enabled!');
                    }
                  }}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.newRegistration}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">{t.allowNewUserRegistration}</p>
                </div>
                <Switch
                  checked={platformSettings.registrationOpen}
                  onCheckedChange={(checked) => setPlatformSettings({ ...platformSettings, registrationOpen: checked })}
                />
              </div>
            </div>
          </Card>

          <Button onClick={handleSavePlatformSettings} className="font-[Noto_Serif_Bengali]">
            <Save className="w-4 h-4 mr-2" />
            {t.saveBtn}
          </Button>
        </TabsContent>

        {/* Email Settings Tab */}
        <TabsContent value="email" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.emailSettings}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.enableEmailNotifications}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'সিস্টেম ইমেইল নোটিফিকেশন চালু/বন্ধ করুন' : 'Enable/disable system email notifications'}
                  </p>
                </div>
                <Switch
                  checked={emailSettings.enableNotifications}
                  onCheckedChange={(checked) => setEmailSettings({ ...emailSettings, enableNotifications: checked })}
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.smtpServer}</Label>
                  <Input
                    value={emailSettings.smtpServer}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpServer: e.target.value })}
                    placeholder="smtp.gmail.com"
                  />
                </div>
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.smtpPort}</Label>
                  <Input
                    type="number"
                    value={emailSettings.smtpPort}
                    onChange={(e) => setEmailSettings({ ...emailSettings, smtpPort: Number(e.target.value) })}
                    placeholder="587"
                  />
                </div>
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.smtpUsername}</Label>
                <Input
                  value={emailSettings.smtpUsername}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpUsername: e.target.value })}
                  placeholder="your-email@gmail.com"
                />
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.smtpPassword}</Label>
                <Input
                  type="password"
                  value={emailSettings.smtpPassword}
                  onChange={(e) => setEmailSettings({ ...emailSettings, smtpPassword: e.target.value })}
                  placeholder="••••••••"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.senderEmail}</Label>
                  <Input
                    value={emailSettings.senderEmail}
                    onChange={(e) => setEmailSettings({ ...emailSettings, senderEmail: e.target.value })}
                    placeholder="noreply@talenttutor.com"
                  />
                </div>
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.senderName}</Label>
                  <Input
                    value={emailSettings.senderName}
                    onChange={(e) => setEmailSettings({ ...emailSettings, senderName: e.target.value })}
                    placeholder="Talent Tutor"
                  />
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex gap-2">
            <Button onClick={() => {
              toast.success(t.settingsSaved);
              addActivityLog(t.activitySettingsUpdated, language === 'bn' ? 'ইমেইল সেটিংস আপডেট করা হয়েছে' : 'Email settings updated');
            }} className="font-[Noto_Serif_Bengali]">
              <Save className="w-4 h-4 mr-2" />
              {t.saveBtn}
            </Button>
            <Button variant="outline" onClick={() => {
              toast.success(t.testEmailSent);
            }} className="font-[Noto_Serif_Bengali]">
              <Send className="w-4 h-4 mr-2" />
              {t.testEmail}
            </Button>
          </div>
        </TabsContent>

        {/* SMS Settings Tab */}
        <TabsContent value="sms" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.smsSettings}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.enableSmsNotifications}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'সিস্টেম এসএমএস নোটিফিকেশন চালু/বন্ধ করুন' : 'Enable/disable system SMS notifications'}
                  </p>
                </div>
                <Switch
                  checked={smsSettings.enableNotifications}
                  onCheckedChange={(checked) => setSmsSettings({ ...smsSettings, enableNotifications: checked })}
                />
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.smsProvider}</Label>
                <Select value={smsSettings.provider} onValueChange={(value) => setSmsSettings({ ...smsSettings, provider: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ssl-wireless">SSL Wireless</SelectItem>
                    <SelectItem value="reve-systems">Reve Systems</SelectItem>
                    <SelectItem value="bulk-sms-bd">Bulk SMS BD</SelectItem>
                    <SelectItem value="twilio">Twilio</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.smsApiKey}</Label>
                <Input
                  type="password"
                  value={smsSettings.apiKey}
                  onChange={(e) => setSmsSettings({ ...smsSettings, apiKey: e.target.value })}
                  placeholder="••••••••••••••••"
                />
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.smsSenderId}</Label>
                <Input
                  value={smsSettings.senderId}
                  onChange={(e) => setSmsSettings({ ...smsSettings, senderId: e.target.value })}
                  placeholder="TALENTTUTOR"
                  maxLength={11}
                />
                <p className="text-xs text-gray-500 mt-1 font-[Noto_Serif_Bengali]">
                  {language === 'bn' ? 'সর্বোচ্চ ১১ অক্ষর' : 'Maximum 11 characters'}
                </p>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-[Noto_Serif_Bengali]">{t.smsBalance}</Label>
                    <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                      {language === 'bn' ? 'বর্তমান এসএমএস ব্যালেন্স' : 'Current SMS balance'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-2xl font-bold text-emerald-600">{smsSettings.balance}</p>
                    <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                      {language === 'bn' ? 'এসএমএস বাকি' : 'SMS remaining'}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex gap-2">
            <Button onClick={() => {
              toast.success(t.settingsSaved);
              addActivityLog(t.activitySettingsUpdated, language === 'bn' ? 'এসএমএস সেটিংস আপডেট করা হয়েছে' : 'SMS settings updated');
            }} className="font-[Noto_Serif_Bengali]">
              <Save className="w-4 h-4 mr-2" />
              {t.saveBtn}
            </Button>
            <Button variant="outline" onClick={() => {
              toast.success(t.testSmsSent);
            }} className="font-[Noto_Serif_Bengali]">
              <Send className="w-4 h-4 mr-2" />
              {t.testSms}
            </Button>
          </div>
        </TabsContent>

        {/* Notification Preferences Tab */}
        <TabsContent value="notifications" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.notificationSettings}</h3>
            <div className="space-y-4">
              <div className="space-y-3">
                <h4 className="font-semibold text-sm text-gray-700 font-[Noto_Serif_Bengali]">
                  {language === 'bn' ? 'ইমেইল নোটিফিকেশন' : 'Email Notifications'}
                </h4>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label className="font-[Noto_Serif_Bengali]">{t.emailOnRegistration}</Label>
                  <Switch
                    checked={notificationPreferences.emailOnRegistration}
                    onCheckedChange={(checked) => setNotificationPreferences({ ...notificationPreferences, emailOnRegistration: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label className="font-[Noto_Serif_Bengali]">{t.emailOnApproval}</Label>
                  <Switch
                    checked={notificationPreferences.emailOnApproval}
                    onCheckedChange={(checked) => setNotificationPreferences({ ...notificationPreferences, emailOnApproval: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label className="font-[Noto_Serif_Bengali]">{t.emailOnPayment}</Label>
                  <Switch
                    checked={notificationPreferences.emailOnPayment}
                    onCheckedChange={(checked) => setNotificationPreferences({ ...notificationPreferences, emailOnPayment: checked })}
                  />
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-3">
                <h4 className="font-semibold text-sm text-gray-700 font-[Noto_Serif_Bengali]">
                  {language === 'bn' ? 'এসএমএস নোটিফিকেশন' : 'SMS Notifications'}
                </h4>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label className="font-[Noto_Serif_Bengali]">{t.smsOnRegistration}</Label>
                  <Switch
                    checked={notificationPreferences.smsOnRegistration}
                    onCheckedChange={(checked) => setNotificationPreferences({ ...notificationPreferences, smsOnRegistration: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label className="font-[Noto_Serif_Bengali]">{t.smsOnApproval}</Label>
                  <Switch
                    checked={notificationPreferences.smsOnApproval}
                    onCheckedChange={(checked) => setNotificationPreferences({ ...notificationPreferences, smsOnApproval: checked })}
                  />
                </div>
              </div>
              
              <div className="border-t pt-4 space-y-3">
                <h4 className="font-semibold text-sm text-gray-700 font-[Noto_Serif_Bengali]">
                  {language === 'bn' ? 'অ্যাপ নোটিফিকেশন' : 'App Notifications'}
                </h4>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label className="font-[Noto_Serif_Bengali]">{t.pushNotifications}</Label>
                  <Switch
                    checked={notificationPreferences.pushNotifications}
                    onCheckedChange={(checked) => setNotificationPreferences({ ...notificationPreferences, pushNotifications: checked })}
                  />
                </div>
                
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <Label className="font-[Noto_Serif_Bengali]">{t.inAppNotifications}</Label>
                  <Switch
                    checked={notificationPreferences.inAppNotifications}
                    onCheckedChange={(checked) => setNotificationPreferences({ ...notificationPreferences, inAppNotifications: checked })}
                  />
                </div>
              </div>
            </div>
          </Card>
          
          <Button onClick={() => {
            toast.success(t.settingsSaved);
            addActivityLog(t.activitySettingsUpdated, language === 'bn' ? 'নোটিফিকেশন সেটিংস আপডেট করা হয়েছে' : 'Notification settings updated');
          }} className="font-[Noto_Serif_Bengali]">
            <Save className="w-4 h-4 mr-2" />
            {t.saveBtn}
          </Button>
        </TabsContent>

        {/* Security Settings Tab */}
        <TabsContent value="security" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.securitySettings}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.twoFactorAuth}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'এডমিনদের জন্য দুই-ফ্যাক্টর অথেন্টিকেশন প্রয়োজন' : 'Require two-factor authentication for admins'}
                  </p>
                </div>
                <Switch
                  checked={securitySettings.twoFactorAuth}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, twoFactorAuth: checked })}
                />
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.passwordComplexity}</Label>
                <Select value={securitySettings.passwordComplexity} onValueChange={(value) => setSecuritySettings({ ...securitySettings, passwordComplexity: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">{language === 'bn' ? 'নিম্ন (৬ অক্ষর)' : 'Low (6 chars)'}</SelectItem>
                    <SelectItem value="medium">{language === 'bn' ? 'মাঝারি (৮ অক্ষর + সংখ্যা)' : 'Medium (8 chars + numbers)'}</SelectItem>
                    <SelectItem value="high">{language === 'bn' ? 'উচ্চ (১০ অক্ষর + বিশেষ অক্ষর)' : 'High (10 chars + special)'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.sessionTimeout}</Label>
                  <Input
                    type="number"
                    value={securitySettings.sessionTimeout}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, sessionTimeout: Number(e.target.value) })}
                  />
                </div>
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.loginAttempts}</Label>
                  <Input
                    type="number"
                    value={securitySettings.loginAttempts}
                    onChange={(e) => setSecuritySettings({ ...securitySettings, loginAttempts: Number(e.target.value) })}
                  />
                </div>
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.accountLockDuration}</Label>
                <Input
                  type="number"
                  value={securitySettings.accountLockDuration}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, accountLockDuration: Number(e.target.value) })}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.enableCaptcha}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'লগইন এবং রেজিস্ট্রেশনে ক্যাপচা চালু করুন' : 'Enable captcha on login and registration'}
                  </p>
                </div>
                <Switch
                  checked={securitySettings.enableCaptcha}
                  onCheckedChange={(checked) => setSecuritySettings({ ...securitySettings, enableCaptcha: checked })}
                />
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.ipWhitelist}</Label>
                <Textarea
                  value={securitySettings.ipWhitelist}
                  onChange={(e) => setSecuritySettings({ ...securitySettings, ipWhitelist: e.target.value })}
                  placeholder={language === 'bn' ? 'প্রতি লাইনে একটি IP (ঐচ্ছিক)' : 'One IP per line (optional)'}
                  rows={3}
                />
              </div>
            </div>
          </Card>
          
          <Button onClick={() => {
            toast.success(t.settingsSaved);
            addActivityLog(t.activitySettingsUpdated, language === 'bn' ? 'নিরাপত্তা সেটিংস আপডেট করা হয়েছে' : 'Security settings updated');
          }} className="font-[Noto_Serif_Bengali]">
            <Save className="w-4 h-4 mr-2" />
            {t.saveBtn}
          </Button>
        </TabsContent>

        {/* Backup Settings Tab */}
        <TabsContent value="backup" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.backupSettings}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-purple-50 rounded-lg border border-purple-200">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.autoBackup}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'স্বয়ংক্রিয় ব্যাকআপ চালু করুন' : 'Enable automatic backup'}
                  </p>
                </div>
                <Switch
                  checked={backupSettings.autoBackup}
                  onCheckedChange={(checked) => setBackupSettings({ ...backupSettings, autoBackup: checked })}
                />
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.backupFrequency}</Label>
                <Select value={backupSettings.frequency} onValueChange={(value) => setBackupSettings({ ...backupSettings, frequency: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hourly">{language === 'bn' ? 'প্রতি ঘন্টা' : 'Hourly'}</SelectItem>
                    <SelectItem value="daily">{language === 'bn' ? 'প্রতিদিন' : 'Daily'}</SelectItem>
                    <SelectItem value="weekly">{language === 'bn' ? 'সাপ্তাহিক' : 'Weekly'}</SelectItem>
                    <SelectItem value="monthly">{language === 'bn' ? 'মাসিক' : 'Monthly'}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.backupLocation}</Label>
                <Select value={backupSettings.location} onValueChange={(value) => setBackupSettings({ ...backupSettings, location: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="supabase-storage">Supabase Storage</SelectItem>
                    <SelectItem value="local">Local Server</SelectItem>
                    <SelectItem value="aws-s3">AWS S3</SelectItem>
                    <SelectItem value="google-drive">Google Drive</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-[Noto_Serif_Bengali]">{t.lastBackup}</Label>
                    <p className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">{backupSettings.lastBackup}</p>
                  </div>
                  <Badge variant="outline" className="bg-white">
                    <Activity className="w-3 h-3 mr-1" />
                    {language === 'bn' ? 'সক্রিয়' : 'Active'}
                  </Badge>
                </div>
              </div>
              
              <div className="grid grid-cols-3 gap-3 pt-2">
                <Button variant="outline" onClick={() => {
                  toast.success(t.backupCreated);
                  addActivityLog(language === 'bn' ? 'ম্যানুয়াল ব্যাকআপ' : 'Manual Backup', language === 'bn' ? 'ডাটাবেস ব্যাকআপ তৈরি করা হয়েছে' : 'Database backup created');
                }} className="font-[Noto_Serif_Bengali]">
                  <Database className="w-4 h-4 mr-2" />
                  {t.createBackup}
                </Button>
                <Button variant="outline" onClick={() => {
                  toast.success(t.backupRestored);
                }} className="font-[Noto_Serif_Bengali]">
                  <RefreshCw className="w-4 h-4 mr-2" />
                  {t.restoreBackup}
                </Button>
                <Button variant="outline" onClick={() => {
                  toast.success(language === 'bn' ? 'ডাউনলোড শুরু হয়েছে!' : 'Download started!');
                }} className="font-[Noto_Serif_Bengali]">
                  <Download className="w-4 h-4 mr-2" />
                  {t.downloadBackup}
                </Button>
              </div>
            </div>
          </Card>
          
          <Button onClick={() => {
            toast.success(t.settingsSaved);
            addActivityLog(t.activitySettingsUpdated, language === 'bn' ? 'ব্যাকআপ সেটিংস আপডেট করা হয়েছে' : 'Backup settings updated');
          }} className="font-[Noto_Serif_Bengali]">
            <Save className="w-4 h-4 mr-2" />
            {t.saveBtn}
          </Button>
        </TabsContent>

        {/* Appearance Settings Tab */}
        <TabsContent value="appearance" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.appearanceSettings}</h3>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.primaryColor}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={appearanceSettings.primaryColor}
                      onChange={(e) => setAppearanceSettings({ ...appearanceSettings, primaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={appearanceSettings.primaryColor}
                      onChange={(e) => setAppearanceSettings({ ...appearanceSettings, primaryColor: e.target.value })}
                      placeholder="#10B981"
                    />
                  </div>
                </div>
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.secondaryColor}</Label>
                  <div className="flex gap-2">
                    <Input
                      type="color"
                      value={appearanceSettings.secondaryColor}
                      onChange={(e) => setAppearanceSettings({ ...appearanceSettings, secondaryColor: e.target.value })}
                      className="w-16 h-10"
                    />
                    <Input
                      value={appearanceSettings.secondaryColor}
                      onChange={(e) => setAppearanceSettings({ ...appearanceSettings, secondaryColor: e.target.value })}
                      placeholder="#3B82F6"
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.logoUpload}</Label>
                <div className="flex gap-2">
                  <Input type="file" accept="image/*" />
                  <Button variant="outline">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.faviconUpload}</Label>
                <div className="flex gap-2">
                  <Input type="file" accept="image/x-icon,image/png" />
                  <Button variant="outline">
                    <Upload className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.darkMode}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'ডার্ক মোড থিম চালু করুন' : 'Enable dark mode theme'}
                  </p>
                </div>
                <Switch
                  checked={appearanceSettings.darkMode}
                  onCheckedChange={(checked) => setAppearanceSettings({ ...appearanceSettings, darkMode: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.compactView}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'কমপ্যাক্ট ইন্টারফেস ব্যবহার করুন' : 'Use compact interface'}
                  </p>
                </div>
                <Switch
                  checked={appearanceSettings.compactView}
                  onCheckedChange={(checked) => setAppearanceSettings({ ...appearanceSettings, compactView: checked })}
                />
              </div>
            </div>
          </Card>
          
          <Button onClick={() => {
            toast.success(t.settingsSaved);
            addActivityLog(t.activitySettingsUpdated, language === 'bn' ? 'চেহারা সেটিংস আপডেট করা হয়েছে' : 'Appearance settings updated');
          }} className="font-[Noto_Serif_Bengali]">
            <Save className="w-4 h-4 mr-2" />
            {t.saveBtn}
          </Button>
        </TabsContent>

        {/* Localization Settings Tab */}
        <TabsContent value="localization" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.localizationSettings}</h3>
            <div className="space-y-4">
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.defaultLanguage}</Label>
                <Select value={localizationSettings.defaultLanguage} onValueChange={(value: 'bn' | 'en') => setLocalizationSettings({ ...localizationSettings, defaultLanguage: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bn">🇧🇩 বাংলা</SelectItem>
                    <SelectItem value="en">🇬🇧 English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.timezone}</Label>
                <Select value={localizationSettings.timezone} onValueChange={(value) => setLocalizationSettings({ ...localizationSettings, timezone: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Asia/Dhaka">Asia/Dhaka (GMT+6)</SelectItem>
                    <SelectItem value="Asia/Kolkata">Asia/Kolkata (GMT+5:30)</SelectItem>
                    <SelectItem value="UTC">UTC (GMT+0)</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.dateFormat}</Label>
                  <Select value={localizationSettings.dateFormat} onValueChange={(value) => setLocalizationSettings({ ...localizationSettings, dateFormat: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="DD/MM/YYYY">DD/MM/YYYY</SelectItem>
                      <SelectItem value="MM/DD/YYYY">MM/DD/YYYY</SelectItem>
                      <SelectItem value="YYYY-MM-DD">YYYY-MM-DD</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.timeFormat}</Label>
                  <Select value={localizationSettings.timeFormat} onValueChange={(value) => setLocalizationSettings({ ...localizationSettings, timeFormat: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="12h">12 {language === 'bn' ? 'ঘন্টা' : 'Hour'}</SelectItem>
                      <SelectItem value="24h">24 {language === 'bn' ? 'ঘন্টা' : 'Hour'}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.currency}</Label>
                  <Select value={localizationSettings.currency} onValueChange={(value) => setLocalizationSettings({ ...localizationSettings, currency: value })}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="BDT">BDT - Bangladeshi Taka</SelectItem>
                      <SelectItem value="USD">USD - US Dollar</SelectItem>
                      <SelectItem value="EUR">EUR - Euro</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.currencySymbol}</Label>
                  <Input
                    value={localizationSettings.currencySymbol}
                    onChange={(e) => setLocalizationSettings({ ...localizationSettings, currencySymbol: e.target.value })}
                    placeholder="৳"
                    maxLength={3}
                  />
                </div>
              </div>
            </div>
          </Card>
          
          <Button onClick={() => {
            toast.success(t.settingsSaved);
            addActivityLog(t.activitySettingsUpdated, language === 'bn' ? 'স্থানীয়করণ সেটিংস আপডেট করা হয়েছে' : 'Localization settings updated');
          }} className="font-[Noto_Serif_Bengali]">
            <Save className="w-4 h-4 mr-2" />
            {t.saveBtn}
          </Button>
        </TabsContent>

        {/* Advanced Features Tab */}
        <TabsContent value="features" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.advancedFeatures}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg border border-emerald-200">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.enableAI}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'AI-পাওয়ার্ড শিক্ষক সুপারিশ এবং ম্যাচিং' : 'AI-powered teacher recommendations and matching'}
                  </p>
                </div>
                <Switch
                  checked={advancedFeatures.enableAI}
                  onCheckedChange={(checked) => setAdvancedFeatures({ ...advancedFeatures, enableAI: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.enableChat}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'রিয়েল-টাইম চ্যাট সিস্টেম' : 'Real-time chat system'}
                  </p>
                </div>
                <Switch
                  checked={advancedFeatures.enableChat}
                  onCheckedChange={(checked) => setAdvancedFeatures({ ...advancedFeatures, enableChat: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.enableVideoCall}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'ভিডিও কল এবং অনলাইন ক্লাস' : 'Video call and online classes'}
                  </p>
                </div>
                <Switch
                  checked={advancedFeatures.enableVideoCall}
                  onCheckedChange={(checked) => setAdvancedFeatures({ ...advancedFeatures, enableVideoCall: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.enableFileSharing}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'ডকুমেন্ট এবং ফাইল শেয়ারিং' : 'Document and file sharing'}
                  </p>
                </div>
                <Switch
                  checked={advancedFeatures.enableFileSharing}
                  onCheckedChange={(checked) => setAdvancedFeatures({ ...advancedFeatures, enableFileSharing: checked })}
                />
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.maxFileSize}</Label>
                <Input
                  type="number"
                  value={advancedFeatures.maxFileSize}
                  onChange={(e) => setAdvancedFeatures({ ...advancedFeatures, maxFileSize: Number(e.target.value) })}
                />
                <p className="text-xs text-gray-500 mt-1 font-[Noto_Serif_Bengali]">
                  {language === 'bn' ? 'মেগাবাইটে সর্বোচ্চ ফাইল সাইজ' : 'Maximum file size in megabytes'}
                </p>
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.allowedFileTypes}</Label>
                <Input
                  value={advancedFeatures.allowedFileTypes}
                  onChange={(e) => setAdvancedFeatures({ ...advancedFeatures, allowedFileTypes: e.target.value })}
                  placeholder="pdf,doc,docx,jpg,png"
                />
                <p className="text-xs text-gray-500 mt-1 font-[Noto_Serif_Bengali]">
                  {language === 'bn' ? 'কমা দিয়ে আলাদা করুন' : 'Separate with commas'}
                </p>
              </div>
            </div>
          </Card>
          
          <Button onClick={() => {
            toast.success(t.settingsSaved);
            addActivityLog(t.activitySettingsUpdated, language === 'bn' ? 'ফিচার সেটিংস আপডেট করা হয়েছে' : 'Feature settings updated');
          }} className="font-[Noto_Serif_Bengali]">
            <Save className="w-4 h-4 mr-2" />
            {t.saveBtn}
          </Button>
        </TabsContent>

        {/* System Configuration Tab */}
        <TabsContent value="system" className="space-y-6 mt-6">
          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4 font-[Noto_Serif_Bengali]">{t.systemConfiguration}</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.cachingEnabled}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'পারফরম্যান্স উন্নতির জন্য ক্যাশিং চালু করুন' : 'Enable caching for better performance'}
                  </p>
                </div>
                <Switch
                  checked={systemConfig.cachingEnabled}
                  onCheckedChange={(checked) => setSystemConfig({ ...systemConfig, cachingEnabled: checked })}
                />
              </div>
              
              <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg border border-red-200">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.debugMode}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'ডেভেলপমেন্ট ডিবাগিং চালু করুন (প্রোডাকশনে বন্ধ রাখুন)' : 'Enable development debugging (turn off in production)'}
                  </p>
                </div>
                <Switch
                  checked={systemConfig.debugMode}
                  onCheckedChange={(checked) => setSystemConfig({ ...systemConfig, debugMode: checked })}
                />
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.apiRateLimit}</Label>
                <Input
                  type="number"
                  value={systemConfig.apiRateLimit}
                  onChange={(e) => setSystemConfig({ ...systemConfig, apiRateLimit: Number(e.target.value) })}
                />
                <p className="text-xs text-gray-500 mt-1 font-[Noto_Serif_Bengali]">
                  {language === 'bn' ? 'প্রতি মিনিটে API রিকোয়েস্ট সীমা' : 'API requests per minute limit'}
                </p>
              </div>
              
              <div>
                <Label className="font-[Noto_Serif_Bengali]">{t.maxConcurrentUsers}</Label>
                <Input
                  type="number"
                  value={systemConfig.maxConcurrentUsers}
                  onChange={(e) => setSystemConfig({ ...systemConfig, maxConcurrentUsers: Number(e.target.value) })}
                />
                <p className="text-xs text-gray-500 mt-1 font-[Noto_Serif_Bengali]">
                  {language === 'bn' ? 'একসাথে সর্বোচ্চ সংযুক্ত ইউজার' : 'Maximum connected users at once'}
                </p>
              </div>
              
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <Label className="font-[Noto_Serif_Bengali]">{t.performanceMonitoring}</Label>
                  <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                    {language === 'bn' ? 'সিস্টেম পারফরম্যান্স মনিটরিং চালু করুন' : 'Enable system performance monitoring'}
                  </p>
                </div>
                <Switch
                  checked={systemConfig.performanceMonitoring}
                  onCheckedChange={(checked) => setSystemConfig({ ...systemConfig, performanceMonitoring: checked })}
                />
              </div>
              
              <div className="p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg border border-blue-200">
                <h4 className="font-semibold mb-2 font-[Noto_Serif_Bengali]">
                  {language === 'bn' ? 'সিস্টেম তথ্য' : 'System Information'}
                </h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div>
                    <p className="text-gray-600 font-[Noto_Serif_Bengali]">{language === 'bn' ? 'সার্ভার স্ট্যাটাস' : 'Server Status'}</p>
                    <p className="font-semibold text-emerald-600">🟢 {language === 'bn' ? 'অনলাইন' : 'Online'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-[Noto_Serif_Bengali]">{language === 'bn' ? 'আপটাইম' : 'Uptime'}</p>
                    <p className="font-semibold">99.9%</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-[Noto_Serif_Bengali]">{language === 'bn' ? 'ডাটাবেস' : 'Database'}</p>
                    <p className="font-semibold text-emerald-600">🟢 {language === 'bn' ? 'সংযুক্ত' : 'Connected'}</p>
                  </div>
                  <div>
                    <p className="text-gray-600 font-[Noto_Serif_Bengali]">{language === 'bn' ? 'স্টোরেজ' : 'Storage'}</p>
                    <p className="font-semibold">2.5 GB / 10 GB</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
          
          <div className="flex gap-2">
            <Button onClick={() => {
              toast.success(t.settingsSaved);
              addActivityLog(t.activitySettingsUpdated, language === 'bn' ? 'সিস্টেম কনফিগারেশন আপডেট করা হয়েছে' : 'System configuration updated');
            }} className="font-[Noto_Serif_Bengali]">
              <Save className="w-4 h-4 mr-2" />
              {t.saveBtn}
            </Button>
            <Button variant="outline" onClick={() => {
              if (confirm(language === 'bn' ? 'সব সেটিংস ডিফল্টে রিসেট করবেন?' : 'Reset all settings to default?')) {
                setPlatformSettings({
                  platformFee: 10, teacherFreePeriod: 6, teacherFreeCredits: 50,
                  guardianFreeCredits: 100, maintenanceMode: false, registrationOpen: true,
                  autoApproveTeachers: false, autoApproveStudents: false,
                });
                setSystemConfig({
                  cachingEnabled: true, debugMode: false, apiRateLimit: 100,
                  maxConcurrentUsers: 1000, performanceMonitoring: true,
                });
                toast.success(t.settingsReset);
              }
            }} className="font-[Noto_Serif_Bengali]">
              <RefreshCw className="w-4 h-4 mr-2" />
              {language === 'bn' ? 'রিসেট করুন' : 'Reset'}
            </Button>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-gray-100 to-gray-50">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl z-50 overflow-hidden">
        <div className="p-6 border-b border-gray-700">
          <div className="flex items-center gap-3 mb-4">
            <TalentTutorLogo size="lg" showText={false} showSubtitle={false} className="text-white" />
            <div>
              <p className="text-sm font-semibold">{t.adminPanel}</p>
              <p className="text-xs text-gray-400 font-[Noto_Serif_Bengali]">{t.managementPanel}</p>
            </div>
          </div>
          
          {/* Language Switcher */}
          <div className="mt-3">
            <LanguageSwitcher language={language} setLanguage={setLanguage} variant="header" />
          </div>
        </div>

        <ScrollArea className="h-[calc(100vh-180px)]">
          <nav className="p-4 space-y-1">
            {[
              { id: 'dashboard', label: t.dashboard, icon: Home },
              
              // User Management Section
              { id: 'userManagement', label: t.userManagement, icon: UserPlus },
              { id: 'studentProfileManagement', label: t.studentProfileManagement, icon: GraduationCap },
              
              // Credit & Subscription Section (Connected)
              { id: 'creditPackages', label: t.creditPackages, icon: Package },
              { id: 'subscriptionPlans', label: t.subscriptionPlans, icon: Crown },
              { id: 'creditAnalytics', label: t.creditAnalytics, icon: TrendingUp },
              { id: 'creditReports', label: t.creditReports, icon: BarChart3 },
              
              // Support & Communication
              { id: 'supportTickets', label: t.supportTickets, icon: MessageSquare },
              { id: 'donationRequestManager', label: t.bookRequestManagement, icon: Book },
              
              // Content & Marketing
              { id: 'donorManagement', label: t.donorManagement, icon: Heart },
              { id: 'contentManagement', label: t.contentManagement, icon: Book },
              { id: 'offerManagement', label: t.offerManagement, icon: Gift },
              { id: 'newsletter', label: t.newsletterAndLeads, icon: Mail },
              { id: 'analytics', label: t.analytics, icon: BarChart3 },
              { id: 'marketing', label: t.marketing, icon: Megaphone },
              { id: 'noticeBoard', label: t.noticeBoard, icon: Bell },
              
              // Settings (includes Payment Gateway, API Keys & Activity Logs)
              { id: 'settings', label: t.settings, icon: Settings },
            ].map((item) => {
              const Icon = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-2.5 rounded-lg transition-all text-sm ${
                    activeSection === item.id
                      ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg scale-105'
                      : 'text-gray-300 hover:bg-gray-700/50 hover:text-white'
                  }`}
                >
                  <Icon className="w-4 h-4 flex-shrink-0" />
                  <span className="font-medium truncate font-[Noto_Serif_Bengali]">{item.label}</span>
                </button>
              );
            })}
          </nav>
        </ScrollArea>

        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700 bg-gray-900">
          <Button
            variant="ghost"
            className="w-full justify-start text-gray-300 hover:bg-gray-700/50 hover:text-white font-[Noto_Serif_Bengali]"
            onClick={onLogout}
          >
            <LogOut className="w-5 h-5 mr-3" />
            {t.logout}
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="ml-64 p-8">
        <motion.div
          key={activeSection}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
        >
          {activeSection === 'dashboard' && renderDashboard()}
          {activeSection === 'userManagement' && <ConsolidatedUserManagement language={language} />}
          {activeSection === 'teacherApproval' && renderTeacherApproval()}
          {activeSection === 'studentApplications' && <AdminStudentApplicationManager language={language} />}
          {activeSection === 'studentProfileManagement' && <AdminStudentProfileManager language={language} />}
          {activeSection === 'creditPackages' && <AdminCreditPackageManager language={language} />}
          {activeSection === 'creditAnalytics' && <CreditAnalyticsDashboard language={language} />}
          {activeSection === 'creditReports' && <CreditUsageReports language={language} />}
          {activeSection === 'supportTickets' && <AdminTicketManager language={language} />}
          {activeSection === 'donationRequestManager' && <AdminDonationRequestManager language={language} />}
          {activeSection === 'donorManagement' && renderDonorManagement()}
          {activeSection === 'contentManagement' && renderContentManagement()}
          {activeSection === 'subscriptionPlans' && renderSubscriptionPlans()}
          {activeSection === 'offerManagement' && renderOfferManagement()}
          {activeSection === 'paymentGateway' && renderPaymentGateway()}
          {activeSection === 'newsletter' && renderNewsletter()}
          {activeSection === 'analytics' && renderAnalytics()}
          {activeSection === 'marketing' && renderMarketing()}
          {activeSection === 'noticeBoard' && renderNoticeBoard()}
          {activeSection === 'activityLogs' && renderActivityLogs()}
          {activeSection === 'settings' && renderSettings()}
        </motion.div>
      </div>

      {/* Dialogs */}
      {/* Message Dialog */}
      <Dialog open={messageDialog} onOpenChange={setMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-[Noto_Serif_Bengali]">{t.userMessage}</DialogTitle>
            <DialogDescription className="font-[Noto_Serif_Bengali]">
              {t.selectRecipientGroup}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>{t.recipient}</Label>
              <Select value={messageRecipients} onValueChange={setMessageRecipients}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allUsers}</SelectItem>
                  <SelectItem value="teachers">{t.onlyTeachers}</SelectItem>
                  <SelectItem value="guardians">{t.onlyGuardians}</SelectItem>
                  <SelectItem value="students">{t.onlyStudents}</SelectItem>
                  <SelectItem value="donors">{t.onlyDonors}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label>{t.title}</Label>
              <Input
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
                placeholder={t.messagePlaceholder}
              />
            </div>

            <div>
              <Label>{t.message}</Label>
              <Textarea
                value={messageBody}
                onChange={(e) => setMessageBody(e.target.value)}
                placeholder={t.yourMessage}
                rows={5}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageDialog(false)} className="font-[Noto_Serif_Bengali]">
              {t.cancel}
            </Button>
            <Button onClick={handleSendMessage} className="font-[Noto_Serif_Bengali]">
              <Send className="w-4 h-4 mr-2" />
              {t.send}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Offer Dialog */}
      <Dialog open={offerDialog} onOpenChange={setOfferDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-[Noto_Serif_Bengali]">{selectedOffer?.id ? t.editOffer : t.createNewOffer}</DialogTitle>
            <DialogDescription className="font-[Noto_Serif_Bengali]">
              {t.offerDetailsInfo}
            </DialogDescription>
          </DialogHeader>

          {selectedOffer && (
            <div className="space-y-4 py-4">
              <div>
                <Label>{t.offerTitle}</Label>
                <Input
                  value={selectedOffer.title}
                  onChange={(e) => setSelectedOffer({ ...selectedOffer, title: e.target.value })}
                  placeholder={t.offerTitlePlaceholder}
                />
              </div>

              <div>
                <Label>{t.description}</Label>
                <Textarea
                  value={selectedOffer.description}
                  onChange={(e) => setSelectedOffer({ ...selectedOffer, description: e.target.value })}
                  placeholder={t.offerDescriptionPlaceholder}
                  rows={3}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t.discountPercent}</Label>
                  <Input
                    type="number"
                    value={selectedOffer.discount}
                    onChange={(e) => setSelectedOffer({ ...selectedOffer, discount: Number(e.target.value) })}
                    placeholder="50"
                  />
                </div>
                <div>
                  <Label>{t.code}</Label>
                  <Input
                    value={selectedOffer.code}
                    onChange={(e) => setSelectedOffer({ ...selectedOffer, code: e.target.value.toUpperCase() })}
                    placeholder="EID50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t.validUntil}</Label>
                  <Input
                    type="date"
                    value={selectedOffer.validTill}
                    onChange={(e) => setSelectedOffer({ ...selectedOffer, validTill: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{t.maxUsage}</Label>
                  <Input
                    type="number"
                    value={selectedOffer.maxUsage}
                    onChange={(e) => setSelectedOffer({ ...selectedOffer, maxUsage: Number(e.target.value) })}
                    placeholder="100"
                  />
                </div>
              </div>

              <div>
                <Label>{t.targetUsers}</Label>
                <Select
                  value={selectedOffer.targetUsers}
                  onValueChange={(value) => setSelectedOffer({ ...selectedOffer, targetUsers: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">{t.allUsers}</SelectItem>
                    <SelectItem value="new">{t.newUsers}</SelectItem>
                    <SelectItem value="teachers">{t.onlyTeachers}</SelectItem>
                    <SelectItem value="guardians">{t.onlyGuardians}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setOfferDialog(false)} className="font-[Noto_Serif_Bengali]">
              {t.cancel}
            </Button>
            <Button onClick={handleSaveOffer} className="font-[Noto_Serif_Bengali]">
              <Save className="w-4 h-4 mr-2" />
              {t.saveBtn}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Edit User Dialog */}
      <Dialog open={editDialog} onOpenChange={setEditDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="font-[Noto_Serif_Bengali]">{t.editUser}</DialogTitle>
            <DialogDescription className="font-[Noto_Serif_Bengali]">
              {t.userDetailsInfo}
            </DialogDescription>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t.name}</Label>
                  <Input
                    value={selectedUser.name}
                    onChange={(e) => setSelectedUser({ ...selectedUser, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{t.email}</Label>
                  <Input
                    value={selectedUser.email}
                    onChange={(e) => setSelectedUser({ ...selectedUser, email: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{t.phone}</Label>
                  <Input
                    value={selectedUser.phone}
                    onChange={(e) => setSelectedUser({ ...selectedUser, phone: e.target.value })}
                  />
                </div>
                {selectedUser.credits !== undefined && (
                  <div>
                    <Label>{t.credits}</Label>
                    <Input
                      type="number"
                      value={selectedUser.credits}
                      onChange={(e) => setSelectedUser({ ...selectedUser, credits: Number(e.target.value) })}
                    />
                  </div>
                )}
                {selectedUser.status && (
                  <div>
                    <Label>{t.status}</Label>
                    <Select
                      value={selectedUser.status}
                      onValueChange={(value) => setSelectedUser({ ...selectedUser, status: value })}
                    >
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">{t.pending}</SelectItem>
                        <SelectItem value="approved">{t.approved}</SelectItem>
                        <SelectItem value="rejected">{t.rejected}</SelectItem>
                        <SelectItem value="suspended">{t.suspended}</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                )}
                {selectedUser.location && (
                  <div>
                    <Label>{t.location}</Label>
                    <Input
                      value={selectedUser.location}
                      onChange={(e) => setSelectedUser({ ...selectedUser, location: e.target.value })}
                    />
                  </div>
                )}
              </div>

              {selectedUser.education && (
                <div>
                  <Label>{t.education}</Label>
                  <Input
                    value={selectedUser.education}
                    onChange={(e) => setSelectedUser({ ...selectedUser, education: e.target.value })}
                  />
                </div>
              )}

              {selectedUser.subjects && (
                <div>
                  <Label>{t.subjects}</Label>
                  <Input
                    value={selectedUser.subjects}
                    onChange={(e) => setSelectedUser({ ...selectedUser, subjects: e.target.value })}
                  />
                </div>
              )}

              {selectedUser.reason && (
                <div>
                  <Label>{t.helpReason}</Label>
                  <Textarea
                    value={selectedUser.reason}
                    onChange={(e) => setSelectedUser({ ...selectedUser, reason: e.target.value })}
                    rows={3}
                  />
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialog(false)} className="font-[Noto_Serif_Bengali]">
              {t.cancel}
            </Button>
            <Button onClick={handleSaveUserEdit} className="font-[Noto_Serif_Bengali]">
              <Save className="w-4 h-4 mr-2" />
              {t.saveBtn}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Notice Creation Dialog */}
      <Dialog open={noticeDialog} onOpenChange={setNoticeDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="font-[Noto_Serif_Bengali]">নতুন নোটিশ তৈরি করুন</DialogTitle>
            <DialogDescription className="font-[Noto_Serif_Bengali]">
              হেডার ব্যানার বা পপআপ আকারে নোটিশ পাঠান
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>নোটিশ শিরোনাম</Label>
              <Input
                value={noticeTitle}
                onChange={(e) => setNoticeTitle(e.target.value)}
                placeholder="গুরুত্বপূর্ণ ঘোষণা"
              />
            </div>

            <div>
              <Label>নোটিশ বার্তা</Label>
              <Textarea
                value={noticeMessage}
                onChange={(e) => setNoticeMessage(e.target.value)}
                placeholder="আপনার বার্তা লিখুন..."
                rows={4}
              />
            </div>

            <div>
              <Label>নোটিশ টাইপ</Label>
              <Select value={noticeType} onValueChange={(value: any) => setNoticeType(value)}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="header">🔝 হেডার ব্যানার (Breaking News)</SelectItem>
                  <SelectItem value="popup">🔔 পপআপ</SelectItem>
                  <SelectItem value="both">🔥 দুটোই</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setNoticeDialog(false)} className="font-[Noto_Serif_Bengali]">
              বাতিল
            </Button>
            <Button onClick={handleCreateNotice} className="font-[Noto_Serif_Bengali]">
              <Send className="w-4 h-4 mr-2" />
              প্রকাশ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Plan Dialog */}
      <Dialog open={planDialog} onOpenChange={setPlanDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="font-[Noto_Serif_Bengali]">{selectedPlan?.id ? 'প্ল্যান এডিট করুন' : 'নতুন প্ল্যান তৈরি করুন'}</DialogTitle>
            <DialogDescription className="font-[Noto_Serif_Bengali]">
              সাবস্ক্রিপশন প্ল��যানের সব তথ্য নিচে দিন
            </DialogDescription>
          </DialogHeader>

          {selectedPlan && (
            <div className="space-y-4 py-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>প্ল্যান নাম</Label>
                  <Input
                    value={selectedPlan.name}
                    onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })}
                    placeholder="প্রিমিয়াম"
                  />
                </div>
                <div>
                  <Label>মূল্য (টাকা)</Label>
                  <Input
                    type="number"
                    value={selectedPlan.price}
                    onChange={(e) => setSelectedPlan({ ...selectedPlan, price: Number(e.target.value) })}
                    placeholder="1500"
                  />
                </div>
                <div>
                  <Label>ক্রেডিট</Label>
                  <Input
                    type="number"
                    value={selectedPlan.credits}
                    onChange={(e) => setSelectedPlan({ ...selectedPlan, credits: Number(e.target.value) })}
                    placeholder="200"
                  />
                </div>
                <div>
                  <Label>সময়কাল</Label>
                  <Input
                    value={selectedPlan.duration}
                    onChange={(e) => setSelectedPlan({ ...selectedPlan, duration: e.target.value })}
                    placeholder="৩ মাস"
                  />
                </div>
              </div>

              <div>
                <Label>কার জন্য?</Label>
                <Select
                  value={selectedPlan.forRole}
                  onValueChange={(value) => setSelectedPlan({ ...selectedPlan, forRole: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="guardian">অভিভাবক</SelectItem>
                    <SelectItem value="teacher">শিক্ষক</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>বৈশিষ্ট্য (প্রতি লাইনে একটি)</Label>
                <Textarea
                  value={selectedPlan.features.join('\n')}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, features: e.target.value.split('\n') })}
                  rows={4}
                  placeholder="২০টি টিউশন পোস্ট&#10;প্রায়োরিটি সাপোর্ট&#10;ফ্রি ক্রেডিট বোনাস"
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedPlan.popular}
                    onCheckedChange={(checked) => setSelectedPlan({ ...selectedPlan, popular: !!checked })}
                  />
                  <Label>জনপ্রিয় প্ল্যান</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Checkbox
                    checked={selectedPlan.active}
                    onCheckedChange={(checked) => setSelectedPlan({ ...selectedPlan, active: !!checked })}
                  />
                  <Label>সক্রিয়</Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setPlanDialog(false)}>
              বাতিল
            </Button>
            <Button onClick={handleSavePlan}>
              <Save className="w-4 h-4 mr-2" />
              সেভ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Content Dialog */}
      <Dialog open={contentDialog} onOpenChange={setContentDialog}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {selectedContent?.id ? 'কন্টেন্ট এডিট করুন' : `নতুন ${selectedContent?.type === 'video' ? 'ভিডিও' : 'ব্লগ'} তৈরি করুন`}
            </DialogTitle>
            <DialogDescription>
              {selectedContent?.type === 'video' ? 'ভিডিও কন্টেন্টের তথ্য দিন' : 'ব্লগ পোস্টের তথ্য দিন'}
            </DialogDescription>
          </DialogHeader>

          {selectedContent && (
            <div className="space-y-4 py-4">
              <div>
                <Label>শিরোনাম</Label>
                <Input
                  value={selectedContent.title}
                  onChange={(e) => setSelectedContent({ ...selectedContent, title: e.target.value })}
                  placeholder="কন্টেন্টের শিরোনাম"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>ক্যাটাগরি</Label>
                  <Input
                    value={selectedContent.category}
                    onChange={(e) => setSelectedContent({ ...selectedContent, category: e.target.value })}
                    placeholder="শিক্ষা"
                  />
                </div>
                <div>
                  <Label>স্ট্যাটাস</Label>
                  <Select
                    value={selectedContent.status}
                    onValueChange={(value) => setSelectedContent({ ...selectedContent, status: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="draft">খসড়া</SelectItem>
                      <SelectItem value="published">প্রকাশিত</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              {selectedContent.type === 'blog' ? (
                <>
                  <div>
                    <Label>সংক্ষিপ্ত বিবরণ</Label>
                    <Textarea
                      value={selectedContent.excerpt || ''}
                      onChange={(e) => setSelectedContent({ ...selectedContent, excerpt: e.target.value })}
                      rows={3}
                      placeholder="ব্লগের সংক্ষিপ্ত বিবরণ..."
                    />
                  </div>
                  <div>
                    <Label>ইমেজ URL</Label>
                    <Input
                      value={selectedContent.image || ''}
                      onChange={(e) => setSelectedContent({ ...selectedContent, image: e.target.value })}
                      placeholder="https://..."
                    />
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <Label>ভিডিও URL</Label>
                    <Input
                      value={selectedContent.videoUrl || ''}
                      onChange={(e) => setSelectedContent({ ...selectedContent, videoUrl: e.target.value })}
                      placeholder="https://youtube.com/..."
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label>থাম্বনেইল URL</Label>
                      <Input
                        value={selectedContent.thumbnail || ''}
                        onChange={(e) => setSelectedContent({ ...selectedContent, thumbnail: e.target.value })}
                        placeholder="https://..."
                      />
                    </div>
                    <div>
                      <Label>সময়কাল</Label>
                      <Input
                        value={selectedContent.duration || ''}
                        onChange={(e) => setSelectedContent({ ...selectedContent, duration: e.target.value })}
                        placeholder="5:30"
                      />
                    </div>
                  </div>
                </>
              )}

              <div>
                <Label>ট্যাগ (কমা দিয়ে আলাদা করুন)</Label>
                <Input
                  value={selectedContent.tags?.join(', ') || ''}
                  onChange={(e) => setSelectedContent({ ...selectedContent, tags: e.target.value.split(',').map(t => t.trim()) })}
                  placeholder="প্রযুক্তি, শিক্ষা, টিপস"
                />
              </div>

              <div className="flex items-center gap-2">
                <Checkbox
                  checked={selectedContent.featured}
                  onCheckedChange={(checked) => setSelectedContent({ ...selectedContent, featured: !!checked })}
                />
                <Label>ফিচার করুন</Label>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setContentDialog(false)}>
              বাতিল
            </Button>
            <Button onClick={() => {
              if (selectedContent) {
                if (selectedContent.id) {
                  setContentItems(contentItems.map(c => c.id === selectedContent.id ? selectedContent : c));
                  toast.success('কন্টেন্ট আপডেট করা হয়েছে!');
                } else {
                  setContentItems([...contentItems, { ...selectedContent, id: Date.now(), author: 'Admin', date: new Date().toISOString().split('T')[0], views: 0, likes: 0, comments: 0 }]);
                  toast.success('নতুন কন্টেন্ট তৈরি করা হয়েছে!');
                }
                setContentDialog(false);
              }
            }}>
              <Save className="w-4 h-4 mr-2" />
              সেভ করুন
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
