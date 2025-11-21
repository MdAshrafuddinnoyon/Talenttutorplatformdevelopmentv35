import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Avatar } from './ui/avatar';
import {
  Search, Filter, CheckCircle, XCircle, Edit, Trash2, CreditCard,
  Mail, Phone, User, Users, Award, Clock, MapPin, Calendar, DollarSign,
  Shield, Ban, Unlock, Eye, MoreVertical, Download, RefreshCw, Wallet,
  GraduationCap, Heart, UserCheck, FileText, AlertCircle, Star,
  Send, MessageSquare, Info, TrendingUp, Activity, Settings
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion, AnimatePresence } from 'motion/react';

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
  userType: 'teacher' | 'guardian' | 'student' | 'donor';
  avatar?: string;
  location: string;
  joinDate: string;
  verified: boolean;
  status: 'active' | 'pending' | 'suspended' | 'rejected';
  credits: number;
  totalEarnings?: number;
  totalSpent?: number;
  totalDonations?: number;
  completedJobs: number;
  activeJobs: number;
  rating: number;
  nid?: string;
  documents?: string[];
  subjects?: string[];
  education?: string;
  bio?: string;
  lastActive?: string;
}

interface ConsolidatedUserManagementProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: '👥 ব্যবহারকারী ব্যবস্থাপনা সিস্টেম',
    subtitle: 'সকল ব্যবহারকারী এক জায়গায়',
    search: 'খুঁজুন',
    searchPlaceholder: 'নাম, ইমেইল, ফোন দিয়ে খুঁজুন...',
    filterByType: 'ধরন',
    filterByStatus: 'স্ট্যাটাস',
    allUsers: 'সবাই',
    teachers: 'শিক্ষক',
    guardians: 'অভিভাবক',
    students: 'ছাত্র',
    donors: 'দাতা',
    active: 'সক্রিয়',
    pending: 'পেন্ডিং',
    suspended: 'স্থগিত',
    rejected: 'প্রত্যাখ্যাত',
    all: 'সব',
    refresh: 'রিফ্রেশ',
    exportData: 'ডাটা এক্সপোর্ট',
    bulkActions: 'বাল্ক অ্যাকশন',
    approve: 'অনুমোদন',
    reject: 'প্রত্যাখ্যান',
    delete: 'মুছুন',
    selected: 'নির্বাচিত',
    name: 'নাম',
    contact: 'যোগাযোগ',
    type: 'ধরন',
    credits: 'ক্রেডিট',
    status: 'স্ট্যাটাস',
    joined: 'যোগদান',
    actions: 'অ্যাকশন',
    verified: 'ভেরিফাইড',
    notVerified: 'ভেরিফাইড নয়',
    edit: 'এডিট',
    viewProfile: 'প্রোফাইল দেখুন',
    grantCredits: 'ক্রেডিট প্রদান',
    verifyUser: 'ভেরিফাই করুন',
    suspendUser: 'স্থগিত করুন',
    deleteUser: 'মুছুন',
    sendMessage: 'বার্তা পাঠান',
    
    // Dialog titles
    userDetails: 'ব্যবহারকারীর বিস্তারিত',
    editUser: 'ব্যবহারকারী এডিট',
    creditAllocation: 'ক্রেডিট বরাদ্দ',
    verifyUserTitle: 'ব্যবহারকারী ভেরিফিকেশন',
    deleteUserTitle: 'ব্যবহারকারী মুছুন',
    sendMessageTitle: 'বার্তা পাঠান',
    
    // Form fields
    email: 'ইমেইল',
    phone: 'ফোন',
    location: 'ঠিকানা',
    joinDate: 'যোগদানের তারিখ',
    bio: 'সংক্ষিপ্ত বিবরণ',
    education: 'শিক্ষাগত যোগ্যতা',
    subjects: 'বিষয়সমূহ',
    nid: 'এনআইডি',
    documents: 'নথিপত্র',
    amount: 'পরিমাণ',
    reason: 'কারণ',
    notes: 'নোট',
    message: 'বার্তা',
    
    // Actions
    save: 'সংরক্ষণ',
    cancel: 'বাতিল',
    confirm: 'নিশ্চিত করুন',
    allocate: 'বরাদ্দ করুন',
    verify: 'ভেরিফাই করুন',
    send: 'পাঠান',
    
    // Messages
    deleteConfirm: 'আপনি কি নিশ্চিত এই ব্যবহারকারীকে মুছতে চান?',
    deleteWarning: 'এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।',
    creditsAllocated: 'ক্রেডিট সফলভাবে বরাদ্দ হয়েছে',
    userVerified: 'ব্যবহারকারী সফলভাবে ভেরিফাই হয়েছে',
    userDeleted: 'ব্যবহারকারী মুছে ফেলা হয়েছে',
    messageSent: 'বার্তা পাঠানো হয়েছে',
    userUpdated: 'ব্যবহারকারী আপডেট হয়েছে',
    
    // Stats
    totalUsers: 'মোট ব্যবহারকারী',
    totalTeachers: 'মোট শিক্ষক',
    totalGuardians: 'মোট অভিভাবক',
    totalStudents: 'মোট ছাত্র',
    totalDonors: 'মোট দাতা',
    verifiedUsers: 'ভেরিফাইড',
    pendingUsers: 'পেন্ডিং',
    
    // Table
    noResults: 'কোন ফলাফল নেই',
    loading: 'লোড হচ্ছে...',
    
    // Profile view
    overview: 'সংক্ষিপ্ত',
    statistics: 'পরিসংখ্যান',
    rating: 'রেটিং',
    completedJobs: 'সম্পন্ন কাজ',
    activeJobs: 'সক্রিয় কাজ',
    totalEarnings: 'মোট আয়',
    totalSpent: 'মোট ব্যয়',
    totalDonations: 'মোট দান',
    lastActive: 'শেষ সক্রিয়',
    documentsProvided: 'প্রদত্ত নথি',
    viewDocument: 'দেখুন',
    downloadDocument: 'ডাউনলোড',
  },
  en: {
    title: '👥 User Management System',
    subtitle: 'All users in one place',
    search: 'Search',
    searchPlaceholder: 'Search by name, email, phone...',
    filterByType: 'Type',
    filterByStatus: 'Status',
    allUsers: 'All',
    teachers: 'Teachers',
    guardians: 'Guardians',
    students: 'Students',
    donors: 'Donors',
    active: 'Active',
    pending: 'Pending',
    suspended: 'Suspended',
    rejected: 'Rejected',
    all: 'All',
    refresh: 'Refresh',
    exportData: 'Export Data',
    bulkActions: 'Bulk Actions',
    approve: 'Approve',
    reject: 'Reject',
    delete: 'Delete',
    selected: 'Selected',
    name: 'Name',
    contact: 'Contact',
    type: 'Type',
    credits: 'Credits',
    status: 'Status',
    joined: 'Joined',
    actions: 'Actions',
    verified: 'Verified',
    notVerified: 'Not Verified',
    edit: 'Edit',
    viewProfile: 'View Profile',
    grantCredits: 'Grant Credits',
    verifyUser: 'Verify',
    suspendUser: 'Suspend',
    deleteUser: 'Delete',
    sendMessage: 'Send Message',
    
    userDetails: 'User Details',
    editUser: 'Edit User',
    creditAllocation: 'Credit Allocation',
    verifyUserTitle: 'Verify User',
    deleteUserTitle: 'Delete User',
    sendMessageTitle: 'Send Message',
    
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    joinDate: 'Join Date',
    bio: 'Bio',
    education: 'Education',
    subjects: 'Subjects',
    nid: 'NID',
    documents: 'Documents',
    amount: 'Amount',
    reason: 'Reason',
    notes: 'Notes',
    message: 'Message',
    
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    allocate: 'Allocate',
    verify: 'Verify',
    send: 'Send',
    
    deleteConfirm: 'Are you sure you want to delete this user?',
    deleteWarning: 'This action cannot be undone.',
    creditsAllocated: 'Credits allocated successfully',
    userVerified: 'User verified successfully',
    userDeleted: 'User deleted',
    messageSent: 'Message sent',
    userUpdated: 'User updated',
    
    totalUsers: 'Total Users',
    totalTeachers: 'Total Teachers',
    totalGuardians: 'Total Guardians',
    totalStudents: 'Total Students',
    totalDonors: 'Total Donors',
    verifiedUsers: 'Verified',
    pendingUsers: 'Pending',
    
    noResults: 'No results found',
    loading: 'Loading...',
    
    overview: 'Overview',
    statistics: 'Statistics',
    rating: 'Rating',
    completedJobs: 'Completed Jobs',
    activeJobs: 'Active Jobs',
    totalEarnings: 'Total Earnings',
    totalSpent: 'Total Spent',
    totalDonations: 'Total Donations',
    lastActive: 'Last Active',
    documentsProvided: 'Documents Provided',
    viewDocument: 'View',
    downloadDocument: 'Download',
  }
};

// Mock data - replace with real API calls
const generateMockUsers = (): UserData[] => {
  return [
    {
      id: '1',
      name: 'মোঃ করিম উদ্দিন',
      email: 'karim@example.com',
      phone: '01712345678',
      userType: 'teacher',
      location: 'ঢাকা',
      joinDate: '2025-10-15',
      verified: true,
      status: 'active',
      credits: 50,
      totalEarnings: 25000,
      completedJobs: 15,
      activeJobs: 3,
      rating: 4.8,
      subjects: ['গণিত', 'পদার্থবিজ্ঞান'],
      education: 'বিএসসি - ঢাকা বিশ্ববিদ্যালয়',
      nid: '1234567890',
      documents: ['nid.pdf', 'degree.pdf'],
      lastActive: '২ ঘণ্টা আগে',
    },
    {
      id: '2',
      name: 'মিসেস রহিমা খাতুন',
      email: 'rahima@example.com',
      phone: '01823456789',
      userType: 'guardian',
      location: 'চট্টগ্রাম',
      joinDate: '2025-10-20',
      verified: true,
      status: 'active',
      credits: 100,
      totalSpent: 12000,
      completedJobs: 8,
      activeJobs: 2,
      rating: 4.9,
      lastActive: '১ ঘণ্টা আগে',
    },
    {
      id: '3',
      name: 'সাকিব হাসান',
      email: 'sakib@example.com',
      phone: '01934567890',
      userType: 'student',
      location: 'সিলেট',
      joinDate: '2025-10-25',
      verified: false,
      status: 'pending',
      credits: 0,
      completedJobs: 0,
      activeJobs: 0,
      rating: 0,
      documents: ['application.pdf'],
      lastActive: '৫ মিনিট আগে',
    },
    {
      id: '4',
      name: 'জনাব আলী আহমেদ',
      email: 'ali@example.com',
      phone: '01745678901',
      userType: 'donor',
      location: 'রাজশাহী',
      joinDate: '2025-09-10',
      verified: true,
      status: 'active',
      credits: 200,
      totalDonations: 50000,
      completedJobs: 0,
      activeJobs: 0,
      rating: 5.0,
      lastActive: '১০ মিনিট আগে',
    },
  ];
};

export function ConsolidatedUserManagement({ language }: ConsolidatedUserManagementProps) {
  const t = content[language];
  const [users, setUsers] = useState<UserData[]>(generateMockUsers());
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData | null>(null);
  
  // Dialogs
  const [viewDialog, setViewDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [creditDialog, setCreditDialog] = useState(false);
  const [verifyDialog, setVerifyDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [messageDialog, setMessageDialog] = useState(false);
  
  // Form states
  const [creditAmount, setCreditAmount] = useState('');
  const [creditReason, setCreditReason] = useState('');
  const [verificationNotes, setVerificationNotes] = useState('');
  const [messageText, setMessageText] = useState('');

  // Filter users
  const filteredUsers = users.filter(user => {
    const matchesSearch = 
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.phone.includes(searchQuery);
    
    const matchesType = typeFilter === 'all' || user.userType === typeFilter;
    const matchesStatus = statusFilter === 'all' || user.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  // Statistics
  const stats = {
    total: users.length,
    teachers: users.filter(u => u.userType === 'teacher').length,
    guardians: users.filter(u => u.userType === 'guardian').length,
    students: users.filter(u => u.userType === 'student').length,
    donors: users.filter(u => u.userType === 'donor').length,
    verified: users.filter(u => u.verified).length,
    pending: users.filter(u => u.status === 'pending').length,
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'teacher': return <GraduationCap className="w-4 h-4" />;
      case 'guardian': return <Users className="w-4 h-4" />;
      case 'student': return <UserCheck className="w-4 h-4" />;
      case 'donor': return <Heart className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getUserTypeBadge = (type: string) => {
    const badges = {
      teacher: { label: t.teachers, color: 'bg-blue-100 text-blue-700 border-blue-300' },
      guardian: { label: t.guardians, color: 'bg-purple-100 text-purple-700 border-purple-300' },
      student: { label: t.students, color: 'bg-green-100 text-green-700 border-green-300' },
      donor: { label: t.donors, color: 'bg-rose-100 text-rose-700 border-rose-300' },
    };
    const badge = badges[type as keyof typeof badges];
    return (
      <Badge variant="outline" className={badge.color}>
        {getUserTypeIcon(type)}
        <span className="ml-1">{badge.label.slice(0, -1)}</span>
      </Badge>
    );
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      active: { label: t.active, color: 'bg-green-500 text-white' },
      pending: { label: t.pending, color: 'bg-amber-500 text-white' },
      suspended: { label: t.suspended, color: 'bg-red-500 text-white' },
      rejected: { label: t.rejected, color: 'bg-gray-500 text-white' },
    };
    const badge = badges[status as keyof typeof badges];
    return <Badge className={badge.color}>{badge.label}</Badge>;
  };

  const handleGrantCredits = () => {
    if (!selectedUser || !creditAmount) {
      toast.error(language === 'bn' ? 'সব তথ্য পূরণ করুন' : 'Fill all fields');
      return;
    }
    
    setUsers(users.map(u => 
      u.id === selectedUser.id 
        ? { ...u, credits: u.credits + parseInt(creditAmount) }
        : u
    ));
    
    toast.success(t.creditsAllocated);
    setCreditDialog(false);
    setCreditAmount('');
    setCreditReason('');
  };

  const handleVerifyUser = () => {
    if (!selectedUser) return;
    
    setUsers(users.map(u => 
      u.id === selectedUser.id 
        ? { ...u, verified: true, status: 'active' }
        : u
    ));
    
    toast.success(t.userVerified);
    setVerifyDialog(false);
    setVerificationNotes('');
  };

  const handleDeleteUser = () => {
    if (!selectedUser) return;
    
    setUsers(users.filter(u => u.id !== selectedUser.id));
    toast.success(t.userDeleted);
    setDeleteDialog(false);
  };

  const handleSendMessage = () => {
    if (!messageText.trim()) {
      toast.error(language === 'bn' ? 'বার্তা লিখুন' : 'Write a message');
      return;
    }
    
    toast.success(t.messageSent);
    setMessageDialog(false);
    setMessageText('');
  };

  const toggleUserSelection = (userId: string) => {
    setSelectedUsers(prev =>
      prev.includes(userId)
        ? prev.filter(id => id !== userId)
        : [...prev, userId]
    );
  };

  const toggleAllUsers = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map(u => u.id));
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
        <p className="text-emerald-100">{t.subtitle}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-sm text-gray-600 mb-1">{t.totalUsers}</div>
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-100 border-blue-300">
          <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
            <GraduationCap className="w-3 h-3" /> {t.teachers}
          </div>
          <div className="text-2xl font-bold text-blue-700">{stats.teachers}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
            <Users className="w-3 h-3" /> {t.guardians}
          </div>
          <div className="text-2xl font-bold text-purple-600">{stats.guardians}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
            <UserCheck className="w-3 h-3" /> {t.students}
          </div>
          <div className="text-2xl font-bold text-green-600">{stats.students}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-rose-50 to-rose-100 border-rose-200">
          <div className="text-sm text-gray-600 mb-1 flex items-center gap-1">
            <Heart className="w-3 h-3" /> {t.donors}
          </div>
          <div className="text-2xl font-bold text-rose-600">{stats.donors}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-emerald-50 to-emerald-100 border-emerald-200">
          <div className="text-sm text-gray-600 mb-1">{t.verifiedUsers}</div>
          <div className="text-2xl font-bold text-emerald-600">{stats.verified}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <div className="text-sm text-gray-600 mb-1">{t.pendingUsers}</div>
          <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
        </Card>
      </div>

      {/* Filters and Actions */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          {/* Search */}
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="pl-10"
              />
            </div>
          </div>

          {/* Type Filter */}
          <Select value={typeFilter} onValueChange={setTypeFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allUsers}</SelectItem>
              <SelectItem value="teacher">{t.teachers}</SelectItem>
              <SelectItem value="guardian">{t.guardians}</SelectItem>
              <SelectItem value="student">{t.students}</SelectItem>
              <SelectItem value="donor">{t.donors}</SelectItem>
            </SelectContent>
          </Select>

          {/* Status Filter */}
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.all}</SelectItem>
              <SelectItem value="active">{t.active}</SelectItem>
              <SelectItem value="pending">{t.pending}</SelectItem>
              <SelectItem value="suspended">{t.suspended}</SelectItem>
              <SelectItem value="rejected">{t.rejected}</SelectItem>
            </SelectContent>
          </Select>

          {/* Actions */}
          <Button variant="outline" onClick={() => setUsers(generateMockUsers())}>
            <RefreshCw className="w-4 h-4 mr-2" />
            {t.refresh}
          </Button>
          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {t.exportData}
          </Button>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="mb-4 p-3 bg-emerald-50 rounded-lg border border-emerald-200 flex items-center justify-between">
            <span className="text-sm text-emerald-700">
              {selectedUsers.length} {t.selected}
            </span>
            <div className="flex gap-2">
              <Button size="sm" variant="outline" className="text-green-600 border-green-600">
                <CheckCircle className="w-4 h-4 mr-1" />
                {t.approve}
              </Button>
              <Button size="sm" variant="outline" className="text-amber-600 border-amber-600">
                <XCircle className="w-4 h-4 mr-1" />
                {t.reject}
              </Button>
              <Button size="sm" variant="outline" className="text-red-600 border-red-600">
                <Trash2 className="w-4 h-4 mr-1" />
                {t.delete}
              </Button>
            </div>
          </div>
        )}

        {/* Users Table */}
        <div className="border rounded-lg overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50">
                <TableHead className="w-12">
                  <Checkbox
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onCheckedChange={toggleAllUsers}
                  />
                </TableHead>
                <TableHead>{t.name}</TableHead>
                <TableHead>{t.contact}</TableHead>
                <TableHead>{t.type}</TableHead>
                <TableHead>{t.credits}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.joined}</TableHead>
                <TableHead className="text-right">{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredUsers.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-12 text-gray-500">
                    {t.noResults}
                  </TableCell>
                </TableRow>
              ) : (
                filteredUsers.map((user) => (
                  <TableRow key={user.id} className="hover:bg-gray-50">
                    <TableCell>
                      <Checkbox
                        checked={selectedUsers.includes(user.id)}
                        onCheckedChange={() => toggleUserSelection(user.id)}
                      />
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10">
                          {user.avatar ? (
                            <img src={user.avatar} alt={user.name} className="w-full h-full object-cover" />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center">
                              <User className="w-5 h-5 text-white" />
                            </div>
                          )}
                        </Avatar>
                        <div>
                          <div className="font-medium flex items-center gap-2">
                            {user.name}
                            {user.verified && (
                              <Shield className="w-3 h-3 text-green-600" />
                            )}
                          </div>
                          <div className="text-xs text-gray-500">{user.location}</div>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Mail className="w-3 h-3" />
                          {user.email}
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Phone className="w-3 h-3" />
                          {user.phone}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      {getUserTypeBadge(user.userType)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 font-medium text-emerald-600">
                        <Wallet className="w-4 h-4" />
                        {user.credits}
                      </div>
                    </TableCell>
                    <TableCell>
                      {getStatusBadge(user.status)}
                      {user.verified && (
                        <div className="mt-1">
                          <Badge variant="outline" className="text-xs bg-green-50 text-green-700 border-green-300">
                            <CheckCircle className="w-2 h-2 mr-1" />
                            {t.verified}
                          </Badge>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="text-sm text-gray-600">{user.joinDate}</div>
                      {user.lastActive && (
                        <div className="text-xs text-gray-400">{user.lastActive}</div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end gap-1">
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedUser(user);
                            setViewDialog(true);
                          }}
                        >
                          <Eye className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedUser(user);
                            setCreditDialog(true);
                          }}
                        >
                          <CreditCard className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedUser(user);
                            setVerifyDialog(true);
                          }}
                        >
                          <Shield className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => {
                            setSelectedUser(user);
                            setMessageDialog(true);
                          }}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="ghost"
                          className="text-red-600 hover:text-red-700"
                          onClick={() => {
                            setSelectedUser(user);
                            setDeleteDialog(true);
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </Card>

      {/* View User Dialog */}
      <Dialog open={viewDialog} onOpenChange={setViewDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.userDetails}</DialogTitle>
            <DialogDescription>
              ইউজারের সম্পূর্ণ তথ্য এবং কার্যকলাপ দেখুন
            </DialogDescription>
          </DialogHeader>
          {selectedUser && (
            <div className="space-y-6 py-4">
              {/* User Header */}
              <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                <Avatar className="w-20 h-20">
                  {selectedUser.avatar ? (
                    <img src={selectedUser.avatar} alt={selectedUser.name} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-emerald-400 to-teal-400 flex items-center justify-center">
                      <User className="w-10 h-10 text-white" />
                    </div>
                  )}
                </Avatar>
                <div className="flex-1">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    {selectedUser.name}
                    {selectedUser.verified && <Shield className="w-5 h-5 text-green-600" />}
                  </h3>
                  <div className="flex items-center gap-2 mt-1">
                    {getUserTypeBadge(selectedUser.userType)}
                    {getStatusBadge(selectedUser.status)}
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-1 text-2xl font-bold text-emerald-600">
                    <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                    {selectedUser.rating.toFixed(1)}
                  </div>
                  <div className="text-sm text-gray-600">{t.rating}</div>
                </div>
              </div>

              {/* Statistics Grid */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <div className="text-sm text-gray-600 mb-1">{t.credits}</div>
                  <div className="text-2xl font-bold text-blue-600">{selectedUser.credits}</div>
                </Card>
                <Card className="p-4 bg-green-50 border-green-200">
                  <div className="text-sm text-gray-600 mb-1">{t.completedJobs}</div>
                  <div className="text-2xl font-bold text-green-600">{selectedUser.completedJobs}</div>
                </Card>
                <Card className="p-4 bg-purple-50 border-purple-200">
                  <div className="text-sm text-gray-600 mb-1">{t.activeJobs}</div>
                  <div className="text-2xl font-bold text-purple-600">{selectedUser.activeJobs}</div>
                </Card>
                <Card className="p-4 bg-amber-50 border-amber-200">
                  <div className="text-sm text-gray-600 mb-1">
                    {selectedUser.userType === 'teacher' ? t.totalEarnings : 
                     selectedUser.userType === 'guardian' ? t.totalSpent : 
                     selectedUser.userType === 'donor' ? t.totalDonations : 'Total'}
                  </div>
                  <div className="text-2xl font-bold text-amber-600">
                    ৳{(selectedUser.totalEarnings || selectedUser.totalSpent || selectedUser.totalDonations || 0).toLocaleString()}
                  </div>
                </Card>
              </div>

              {/* Details */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-gray-600">{t.email}</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <span>{selectedUser.email}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-600">{t.phone}</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <span>{selectedUser.phone}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-600">{t.location}</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <MapPin className="w-4 h-4 text-gray-400" />
                    <span>{selectedUser.location}</span>
                  </div>
                </div>
                <div>
                  <Label className="text-gray-600">{t.joinDate}</Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Calendar className="w-4 h-4 text-gray-400" />
                    <span>{selectedUser.joinDate}</span>
                  </div>
                </div>
              </div>

              {/* Teacher specific */}
              {selectedUser.userType === 'teacher' && (
                <>
                  {selectedUser.education && (
                    <div>
                      <Label className="text-gray-600">{t.education}</Label>
                      <p className="mt-1">{selectedUser.education}</p>
                    </div>
                  )}
                  {selectedUser.subjects && selectedUser.subjects.length > 0 && (
                    <div>
                      <Label className="text-gray-600">{t.subjects}</Label>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedUser.subjects.map((subject, idx) => (
                          <Badge key={idx} variant="outline" className="bg-blue-50 text-blue-700">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}

              {/* Documents */}
              {selectedUser.documents && selectedUser.documents.length > 0 && (
                <div>
                  <Label className="text-gray-600">{t.documentsProvided}</Label>
                  <div className="grid md:grid-cols-2 gap-2 mt-2">
                    {selectedUser.documents.map((doc, idx) => (
                      <div key={idx} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border">
                        <div className="flex items-center gap-2">
                          <FileText className="w-4 h-4 text-emerald-600" />
                          <span className="text-sm">{doc}</span>
                        </div>
                        <Button size="sm" variant="ghost">
                          <Download className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Credit Allocation Dialog */}
      <Dialog open={creditDialog} onOpenChange={setCreditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.creditAllocation}</DialogTitle>
            <DialogDescription>ইউজারকে ক্রেডিট দিন বা কেটে নিন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="creditAmount">{t.amount}</Label>
              <Input
                id="creditAmount"
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                placeholder="0"
                className="mt-2"
              />
            </div>
            <div>
              <Label htmlFor="creditReason">{t.reason}</Label>
              <Textarea
                id="creditReason"
                value={creditReason}
                onChange={(e) => setCreditReason(e.target.value)}
                placeholder={language === 'bn' ? 'কারণ লিখুন...' : 'Enter reason...'}
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreditDialog(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleGrantCredits} className="bg-emerald-600 hover:bg-emerald-700">
              <CreditCard className="w-4 h-4 mr-2" />
              {t.allocate}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verification Dialog */}
      <Dialog open={verifyDialog} onOpenChange={setVerifyDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.verifyUserTitle}</DialogTitle>
            <DialogDescription>ইউজারকে ভেরিফাইড হিসেবে চিহ্নিত করুন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedUser && (
              <div className="p-4 bg-emerald-50 rounded-lg border border-emerald-200">
                <p className="font-medium">{selectedUser.name}</p>
                <p className="text-sm text-gray-600">{selectedUser.email}</p>
              </div>
            )}
            <div>
              <Label htmlFor="verificationNotes">{t.notes}</Label>
              <Textarea
                id="verificationNotes"
                value={verificationNotes}
                onChange={(e) => setVerificationNotes(e.target.value)}
                placeholder={language === 'bn' ? 'ভেরিফিকেশন নোট লিখুন...' : 'Enter verification notes...'}
                className="mt-2"
                rows={3}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVerifyDialog(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleVerifyUser} className="bg-green-600 hover:bg-green-700">
              <Shield className="w-4 h-4 mr-2" />
              {t.verify}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={deleteDialog} onOpenChange={setDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.deleteUserTitle}</DialogTitle>
            <DialogDescription>{t.deleteWarning}</DialogDescription>
          </DialogHeader>
          <div className="py-4">
            {selectedUser && (
              <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                <p className="font-medium text-red-900">{selectedUser.name}</p>
                <p className="text-sm text-red-700">{selectedUser.email}</p>
              </div>
            )}
            <p className="mt-4 text-gray-700">{t.deleteConfirm}</p>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialog(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleDeleteUser} className="bg-red-600 hover:bg-red-700">
              <Trash2 className="w-4 h-4 mr-2" />
              {t.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Send Message Dialog */}
      <Dialog open={messageDialog} onOpenChange={setMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.sendMessageTitle}</DialogTitle>
            <DialogDescription>ইউজারকে একটি বার্তা পাঠান</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            {selectedUser && (
              <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <p className="font-medium">{selectedUser.name}</p>
                <p className="text-sm text-gray-600">{selectedUser.email}</p>
              </div>
            )}
            <div>
              <Label htmlFor="messageText">{t.message}</Label>
              <Textarea
                id="messageText"
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder={language === 'bn' ? 'বার্তা লিখুন...' : 'Type your message...'}
                className="mt-2"
                rows={5}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageDialog(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
              <Send className="w-4 h-4 mr-2" />
              {t.send}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
