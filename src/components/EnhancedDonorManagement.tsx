import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { ScrollArea } from './ui/scroll-area';
import { 
  Heart, 
  BookOpen, 
  DollarSign, 
  Users,
  TrendingUp,
  Gift,
  Package,
  MapPin,
  Phone,
  Mail,
  Calendar,
  CheckCircle,
  XCircle,
  Clock,
  Eye,
  RefreshCw,
  Send,
  Download,
  Award,
  Target,
  Activity,
  Star,
  Crown,
  Filter,
  Search,
  Loader2,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Donor {
  id: string;
  name: string;
  email: string;
  phone: string;
  donorType: 'zakat' | 'materials';
  totalDonations: number;
  donationCount: number;
  lastDonation: string | null;
  address: string;
  isVerified: boolean;
  tier: 'Bronze' | 'Silver' | 'Gold' | 'Platinum';
  createdAt: string;
  status: 'active' | 'inactive';
}

interface DonationRequest {
  id: string;
  studentId: string;
  studentName: string;
  requestType: 'money' | 'books' | 'supplies';
  amount?: number;
  items?: string[];
  status: 'pending' | 'matched' | 'completed' | 'rejected';
  submittedDate: string;
  matchedDonorId?: string;
  matchedDonorName?: string;
}

interface EnhancedDonorManagementProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'দাতা ম্যানেজমেন্ট সিস্টেম',
    subtitle: 'যাকাত ও উপকরণ দাতা সমন্বয় ব্যবস্থাপনা',
    zakatDonors: 'যাকাত দাতা',
    materialDonors: 'উপকরণ দাতা',
    allDonors: 'সব দাতা',
    donationRequests: 'দান অনুরোধ',
    matchmaking: 'দাতা ম্যাচিং',
    analytics: 'বিশ্লেষণ',
    totalDonors: 'মোট দাতা',
    totalDonations: 'মোট দান',
    pendingRequests: 'অপেক্ষমাণ অনুরোধ',
    thisMonth: 'এই মাসে',
    name: 'নাম',
    email: 'ইমেইল',
    phone: 'ফোন',
    type: 'ধরন',
    totalGiven: 'মোট দান',
    donations: 'দান সংখ্যা',
    tier: 'স্তর',
    status: 'স্ট্যাটাস',
    actions: 'অ্যাকশন',
    view: 'দেখুন',
    verify: 'যাচাই',
    contact: 'যোগাযোগ',
    active: 'সক্রিয়',
    inactive: 'নিষ্ক্রিয়',
    verified: 'যাচাইকৃত',
    search: 'খুঁজুন...',
    filter: 'ফিল্টার',
    export: 'এক্সপোর্ট',
    refresh: 'রিফ্রেশ',
    sendMessage: 'বার্তা পাঠান',
    matchWithStudent: 'ছাত্রের সাথে ম্যাচ করুন',
    requestDetails: 'অনুরোধ বিস্তারিত',
    studentInfo: 'ছাত্র তথ্য',
    requestedAmount: 'অনুরোধিত পরিমাণ',
    requestedItems: 'অনুরোধিত আইটেম',
    submittedDate: 'জমা দেওয়ার তারিখ',
    selectDonor: 'দাতা নির্বাচন করুন',
    confirmMatch: 'ম্যাচ নিশ্চিত করুন',
    cancel: 'বাতিল',
    save: 'সংরক্ষণ',
    pending: 'অপেক্ষমাণ',
    matched: 'ম্যাচ হয়েছে',
    completed: 'সম্পন্ন',
    rejected: 'প্রত্যাখ্যাত',
    zakatFunds: 'যাকাত তহবিল',
    materialItems: 'উপকরণ সংখ্যা',
    impactReport: 'প্রভাব প্রতিবেদন',
    studentsHelped: 'সাহায্যপ্রাপ্ত ছাত্র',
    averageDonation: 'গড় দান',
    topDonors: 'শীর্ষ দাতা',
    recentActivity: 'সাম্প্রতিক কার্যকলাপ',
    loading: 'লোড হচ্ছে...',
    noDonors: 'কোন দাতা পাওয়া যায়নি',
  },
  en: {
    title: 'Donor Management System',
    subtitle: 'Coordinate Zakat & Material Donors',
    zakatDonors: 'Zakat Donors',
    materialDonors: 'Material Donors',
    allDonors: 'All Donors',
    donationRequests: 'Donation Requests',
    matchmaking: 'Donor Matching',
    analytics: 'Analytics',
    totalDonors: 'Total Donors',
    totalDonations: 'Total Donations',
    pendingRequests: 'Pending Requests',
    thisMonth: 'This Month',
    name: 'Name',
    email: 'Email',
    phone: 'Phone',
    type: 'Type',
    totalGiven: 'Total Given',
    donations: 'Donations',
    tier: 'Tier',
    status: 'Status',
    actions: 'Actions',
    view: 'View',
    verify: 'Verify',
    contact: 'Contact',
    active: 'Active',
    inactive: 'Inactive',
    verified: 'Verified',
    search: 'Search...',
    filter: 'Filter',
    export: 'Export',
    refresh: 'Refresh',
    sendMessage: 'Send Message',
    matchWithStudent: 'Match with Student',
    requestDetails: 'Request Details',
    studentInfo: 'Student Info',
    requestedAmount: 'Requested Amount',
    requestedItems: 'Requested Items',
    submittedDate: 'Submitted Date',
    selectDonor: 'Select Donor',
    confirmMatch: 'Confirm Match',
    cancel: 'Cancel',
    save: 'Save',
    pending: 'Pending',
    matched: 'Matched',
    completed: 'Completed',
    rejected: 'Rejected',
    zakatFunds: 'Zakat Funds',
    materialItems: 'Material Items',
    impactReport: 'Impact Report',
    studentsHelped: 'Students Helped',
    averageDonation: 'Average Donation',
    topDonors: 'Top Donors',
    recentActivity: 'Recent Activity',
    loading: 'Loading...',
    noDonors: 'No donors found',
  },
};

export function EnhancedDonorManagement({ language }: EnhancedDonorManagementProps) {
  const t = content[language];
  
  const [donors, setDonors] = useState<Donor[]>([]);
  const [requests, setRequests] = useState<DonationRequest[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<'all' | 'zakat' | 'materials'>('all');
  const [selectedDonor, setSelectedDonor] = useState<Donor | null>(null);
  const [selectedRequest, setSelectedRequest] = useState<DonationRequest | null>(null);
  const [showDonorDialog, setShowDonorDialog] = useState(false);
  const [showMatchDialog, setShowMatchDialog] = useState(false);
  const [messageDialog, setMessageDialog] = useState(false);
  const [messageText, setMessageText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch donors from backend
  useEffect(() => {
    fetchDonors();
    fetchRequests();
  }, []);

  const fetchDonors = async () => {
    try {
      setIsLoading(true);
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/donors`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch donors');
      }

      const data = await response.json();
      
      if (data.success && data.donors) {
        setDonors(data.donors);
      } else {
        toast.error(language === 'bn' ? 'দাতা লোড করতে সমস্যা হয়েছে' : 'Failed to load donors');
      }
    } catch (error) {
      console.error('Fetch donors error:', error);
      toast.error(language === 'bn' ? 'দাতা লোড করতে সমস্যা হয়েছে' : 'Failed to load donors');
    } finally {
      setIsLoading(false);
    }
  };

  const fetchRequests = async () => {
    try {
      // Fetch student applications with 'approved' status
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/student-applications?status=approved`;
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to fetch requests');
      }

      const data = await response.json();
      
      if (data.success && data.applications) {
        // Convert applications to donation requests format
        const formattedRequests = data.applications.map((app: any) => ({
          id: app.id,
          studentId: app.studentId,
          studentName: app.studentName,
          requestType: app.applicationType === 'scholarship' ? 'money' : 
                       app.applicationType === 'materials' ? 'books' : 'supplies',
          amount: app.requestedAmount || 0,
          items: app.requestedItems || [],
          status: app.status === 'approved' ? 'pending' : app.status,
          submittedDate: app.submittedDate,
          matchedDonorId: app.donorId,
          matchedDonorName: app.donorName
        }));
        
        setRequests(formattedRequests);
      }
    } catch (error) {
      console.error('Fetch requests error:', error);
    }
  };

  const handleRefresh = async () => {
    setIsRefreshing(true);
    await Promise.all([fetchDonors(), fetchRequests()]);
    setIsRefreshing(false);
    toast.success(language === 'bn' ? 'রিফ্রেশ সম্পন্ন' : 'Refreshed successfully');
  };

  // Filter donors
  const filteredDonors = donors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.phone.includes(searchTerm);
    const matchesType = filterType === 'all' || donor.donorType === filterType;
    const matchesTab = activeTab === 'all' || 
                      (activeTab === 'zakat' && donor.donorType === 'zakat') ||
                      (activeTab === 'materials' && donor.donorType === 'materials');
    return matchesSearch && matchesType && matchesTab;
  });

  // Statistics
  const stats = {
    totalDonors: donors.length,
    zakatDonors: donors.filter(d => d.donorType === 'zakat').length,
    materialDonors: donors.filter(d => d.donorType === 'materials').length,
    totalDonations: donors.reduce((sum, d) => sum + d.totalDonations, 0),
    pendingRequests: requests.filter(r => r.status === 'pending').length,
    completedRequests: requests.filter(r => r.status === 'completed').length,
    averageDonation: donors.reduce((sum, d) => sum + d.totalDonations, 0) / Math.max(donors.reduce((sum, d) => sum + d.donationCount, 0), 1),
  };

  const handleVerifyDonor = async (donorId: string) => {
    try {
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/donors/${donorId}/verify`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        throw new Error('Failed to verify donor');
      }

      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setDonors(donors.map(d => 
          d.id === donorId ? { ...d, isVerified: true } : d
        ));
        toast.success(language === 'bn' ? 'দাতা যাচাই করা হয়েছে!' : 'Donor verified successfully!');
      }
    } catch (error) {
      console.error('Verify donor error:', error);
      toast.error(language === 'bn' ? 'যাচাই করতে সমস্যা হয়েছে' : 'Failed to verify donor');
    }
  };

  const handleMatchRequest = (request: DonationRequest) => {
    setSelectedRequest(request);
    setShowMatchDialog(true);
  };

  const handleConfirmMatch = async (donorId: string) => {
    if (!selectedRequest) return;
    
    try {
      const donor = donors.find(d => d.id === donorId);
      if (!donor) return;

      const url = `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/donations/match`;
      
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          donorId,
          studentId: selectedRequest.studentId,
          requestId: selectedRequest.id,
          applicationId: selectedRequest.id
        })
      });

      if (!response.ok) {
        throw new Error('Failed to match donor');
      }

      const data = await response.json();
      
      if (data.success) {
        // Update local state
        setRequests(requests.map(r =>
          r.id === selectedRequest.id
            ? { ...r, status: 'matched', matchedDonorId: donorId, matchedDonorName: donor.name }
            : r
        ));

        toast.success(language === 'bn' 
          ? `${donor.name} এর সাথে ${selectedRequest.studentName} এর অনুরোধ ম্যাচ হয়েছে!`
          : `Matched ${donor.name} with ${selectedRequest.studentName}!`
        );
        
        setShowMatchDialog(false);
        setSelectedRequest(null);
      }
    } catch (error) {
      console.error('Match donor error:', error);
      toast.error(language === 'bn' ? 'ম্যাচ করতে সমস্যা হয়েছে' : 'Failed to match donor');
    }
  };

  const handleSendMessage = () => {
    if (!selectedDonor || !messageText) {
      toast.error(language === 'bn' ? 'দাতা এবং বার্তা উভয়ই প্রয়োজন!' : 'Both donor and message are required!');
      return;
    }

    // Backend API call would happen here
    toast.success(language === 'bn' ? `${selectedDonor.name} কে বার্তা পাঠানো হয়েছে!` : `Message sent to ${selectedDonor.name}!`);
    setMessageDialog(false);
    setMessageText('');
    setSelectedDonor(null);
  };

  const handleExport = () => {
    const dataStr = JSON.stringify(filteredDonors, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `donors-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    toast.success(language === 'bn' ? 'ডাটা এক্সপোর্ট সম্পন্ন' : 'Data exported successfully');
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'Platinum': return 'bg-purple-600';
      case 'Gold': return 'bg-yellow-500';
      case 'Silver': return 'bg-gray-400';
      case 'Bronze': return 'bg-orange-600';
      default: return 'bg-gray-500';
    }
  };

  const getTierIcon = (tier: string) => {
    switch (tier) {
      case 'Platinum': return <Crown className="w-4 h-4" />;
      case 'Gold': return <Award className="w-4 h-4" />;
      case 'Silver': return <Star className="w-4 h-4" />;
      case 'Bronze': return <Target className="w-4 h-4" />;
      default: return <Activity className="w-4 h-4" />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="w-8 h-8 animate-spin text-teal-600" />
        <span className="ml-3 text-gray-600">{t.loading}</span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-emerald-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl mb-2">{t.title}</h1>
        <p className="text-teal-100">{t.subtitle}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-teal-50 to-emerald-50 border-teal-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.totalDonors}</p>
              <p className="text-3xl text-teal-700">{stats.totalDonors}</p>
              <p className="text-xs text-teal-600 mt-1">
                <Heart className="w-3 h-3 inline mr-1" />
                {stats.zakatDonors} যাকাত, {stats.materialDonors} উপকরণ
              </p>
            </div>
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.totalDonations}</p>
              <p className="text-3xl text-green-700">৳{Math.round(stats.totalDonations / 1000)}k</p>
              <p className="text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                {t.thisMonth}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.pendingRequests}</p>
              <p className="text-3xl text-orange-700">{stats.pendingRequests}</p>
              <p className="text-xs text-orange-600 mt-1">
                <Clock className="w-3 h-3 inline mr-1" />
                অপেক্ষমাণ ম্যাচিং
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
              <Package className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.averageDonation}</p>
              <p className="text-3xl text-blue-700">৳{Math.round(stats.averageDonation)}</p>
              <p className="text-xs text-blue-600 mt-1">
                <Gift className="w-3 h-3 inline mr-1" />
                প্রতি দান
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Award className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="all">{t.allDonors}</TabsTrigger>
          <TabsTrigger value="zakat">
            <Heart className="w-4 h-4 mr-2" />
            {t.zakatDonors}
          </TabsTrigger>
          <TabsTrigger value="materials">
            <BookOpen className="w-4 h-4 mr-2" />
            {t.materialDonors}
          </TabsTrigger>
          <TabsTrigger value="requests">
            <Package className="w-4 h-4 mr-2" />
            {t.donationRequests}
          </TabsTrigger>
        </TabsList>

        {/* All/Zakat/Material Donors Tab Content */}
        {(activeTab === 'all' || activeTab === 'zakat' || activeTab === 'materials') && (
          <TabsContent value={activeTab} className="space-y-4">
            {/* Search and Filter */}
            <Card className="p-4">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      placeholder={t.search}
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-2">
                  <Select value={filterType} onValueChange={(value: any) => setFilterType(value)}>
                    <SelectTrigger className="w-[180px]">
                      <Filter className="w-4 h-4 mr-2" />
                      <SelectValue placeholder={t.filter} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">সব ধরন</SelectItem>
                      <SelectItem value="zakat">যাকাত দাতা</SelectItem>
                      <SelectItem value="materials">উপকরণ দাতা</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" onClick={handleRefresh} disabled={isRefreshing}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${isRefreshing ? 'animate-spin' : ''}`} />
                    {t.refresh}
                  </Button>
                  <Button variant="outline" onClick={handleExport}>
                    <Download className="w-4 h-4 mr-2" />
                    {t.export}
                  </Button>
                </div>
              </div>
            </Card>

            {/* Donors Table */}
            <Card>
              <ScrollArea className="h-[500px]">
                {filteredDonors.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                    <Users className="w-16 h-16 mb-4 text-gray-300" />
                    <p>{t.noDonors}</p>
                  </div>
                ) : (
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>{t.name}</TableHead>
                        <TableHead>{t.type}</TableHead>
                        <TableHead>{t.tier}</TableHead>
                        <TableHead>{t.totalGiven}</TableHead>
                        <TableHead>{t.donations}</TableHead>
                        <TableHead>{t.status}</TableHead>
                        <TableHead>{t.actions}</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {filteredDonors.map((donor) => (
                        <TableRow key={donor.id}>
                          <TableCell>
                            <div className="flex items-center gap-3">
                              <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${donor.donorType === 'zakat' ? 'bg-teal-600' : 'bg-purple-600'}`}>
                                {donor.donorType === 'zakat' ? <Heart className="w-5 h-5" /> : <BookOpen className="w-5 h-5" />}
                              </div>
                              <div>
                                <p className="font-medium">{donor.name}</p>
                                <div className="flex items-center gap-2 text-xs text-gray-500">
                                  <Mail className="w-3 h-3" />
                                  {donor.email}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline" className={donor.donorType === 'zakat' ? 'border-teal-500 text-teal-700' : 'border-purple-500 text-purple-700'}>
                              {donor.donorType === 'zakat' ? '💰 যাকাত' : '📚 উপকরণ'}
                            </Badge>
                          </TableCell>
                          <TableCell>
                            <Badge className={`${getTierColor(donor.tier)} text-white`}>
                              {getTierIcon(donor.tier)}
                              <span className="ml-1">{donor.tier}</span>
                            </Badge>
                          </TableCell>
                          <TableCell className="text-green-600">
                            ৳{donor.totalDonations.toLocaleString()}
                          </TableCell>
                          <TableCell>
                            <Badge variant="secondary">{donor.donationCount} বার</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <Badge className={donor.status === 'active' ? 'bg-green-600' : 'bg-gray-400'}>
                                {donor.status === 'active' ? t.active : t.inactive}
                              </Badge>
                              {donor.isVerified && (
                                <CheckCircle className="w-4 h-4 text-green-600" />
                              )}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex gap-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedDonor(donor);
                                  setShowDonorDialog(true);
                                }}
                              >
                                <Eye className="w-4 h-4" />
                              </Button>
                              {!donor.isVerified && (
                                <Button
                                  size="sm"
                                  variant="outline"
                                  onClick={() => handleVerifyDonor(donor.id)}
                                  className="text-green-600 border-green-600 hover:bg-green-50"
                                >
                                  <CheckCircle className="w-4 h-4" />
                                </Button>
                              )}
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => {
                                  setSelectedDonor(donor);
                                  setMessageDialog(true);
                                }}
                              >
                                <Send className="w-4 h-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                )}
              </ScrollArea>
            </Card>
          </TabsContent>
        )}

        {/* Donation Requests Tab */}
        <TabsContent value="requests" className="space-y-4">
          <Card>
            <ScrollArea className="h-[500px]">
              {requests.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Package className="w-16 h-16 mb-4 text-gray-300" />
                  <p>No requests found</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ছাত্রের নাম</TableHead>
                      <TableHead>অনুরোধের ধরন</TableHead>
                      <TableHead>বিবরণ</TableHead>
                      <TableHead>তারিখ</TableHead>
                      <TableHead>স্ট্যাটাস</TableHead>
                      <TableHead>অ্যাকশন</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {requests.map((request) => (
                      <TableRow key={request.id}>
                        <TableCell className="font-medium">{request.studentName}</TableCell>
                        <TableCell>
                          <Badge variant="outline">
                            {request.requestType === 'money' ? '💰 আর্থিক সাহায্য' : '📚 বই ও উপকরণ'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {request.amount && <span className="text-green-600">৳{request.amount.toLocaleString()}</span>}
                          {request.items && (
                            <div className="text-sm">
                              {request.items.slice(0, 2).join(', ')}
                              {request.items.length > 2 && ` +${request.items.length - 2} আরো`}
                            </div>
                          )}
                        </TableCell>
                        <TableCell className="text-sm text-gray-600">
                          <Calendar className="w-3 h-3 inline mr-1" />
                          {new Date(request.submittedDate).toLocaleDateString('bn-BD')}
                        </TableCell>
                        <TableCell>
                          <Badge
                            className={
                              request.status === 'completed' ? 'bg-green-600' :
                              request.status === 'matched' ? 'bg-blue-600' :
                              request.status === 'rejected' ? 'bg-red-600' :
                              'bg-orange-500'
                            }
                          >
                            {request.status === 'completed' ? t.completed :
                             request.status === 'matched' ? t.matched :
                             request.status === 'rejected' ? t.rejected :
                             t.pending}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {request.status === 'pending' && (
                            <Button
                              size="sm"
                              onClick={() => handleMatchRequest(request)}
                              className="bg-gradient-to-r from-teal-600 to-emerald-600"
                            >
                              <Users className="w-4 h-4 mr-1" />
                              {t.matchWithStudent}
                            </Button>
                          )}
                          {request.status === 'matched' && (
                            <div className="text-sm text-blue-600">
                              <Users className="w-3 h-3 inline mr-1" />
                              {request.matchedDonorName}
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </ScrollArea>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Donor Details Dialog */}
      <Dialog open={showDonorDialog} onOpenChange={setShowDonorDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>দাতার বিস্তারিত তথ্য</DialogTitle>
            <DialogDescription>
              {selectedDonor?.name} - {selectedDonor?.donorType === 'zakat' ? 'যাকাত দাতা' : 'উপকরণ দাতা'}
            </DialogDescription>
          </DialogHeader>

          {selectedDonor && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-xs text-gray-500">নাম</Label>
                  <p className="font-medium">{selectedDonor.name}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">ইমেইল</Label>
                  <p className="font-medium">{selectedDonor.email}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">ফোন</Label>
                  <p className="font-medium">{selectedDonor.phone}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">অবস্থান</Label>
                  <p className="font-medium">{selectedDonor.address}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">মোট দান</Label>
                  <p className="text-green-600">৳{selectedDonor.totalDonations.toLocaleString()}</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">দান সংখ্যা</Label>
                  <p className="font-medium">{selectedDonor.donationCount} বার</p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">শেষ দান</Label>
                  <p className="font-medium">
                    {selectedDonor.lastDonation ? new Date(selectedDonor.lastDonation).toLocaleDateString('bn-BD') : 'N/A'}
                  </p>
                </div>
                <div>
                  <Label className="text-xs text-gray-500">স্তর</Label>
                  <Badge className={`${getTierColor(selectedDonor.tier)} text-white`}>
                    {getTierIcon(selectedDonor.tier)}
                    <span className="ml-1">{selectedDonor.tier}</span>
                  </Badge>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Match Dialog */}
      <Dialog open={showMatchDialog} onOpenChange={setShowMatchDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.matchWithStudent}</DialogTitle>
            <DialogDescription>
              {selectedRequest?.studentName} এর সাথে দাতা ম্যাচ করুন
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>{t.selectDonor}</Label>
              <Select onValueChange={(value) => handleConfirmMatch(value)}>
                <SelectTrigger>
                  <SelectValue placeholder="দাতা নির্বাচন করুন" />
                </SelectTrigger>
                <SelectContent>
                  {donors.filter(d => d.status === 'active').map((donor) => (
                    <SelectItem key={donor.id} value={donor.id}>
                      {donor.name} - {donor.donorType === 'zakat' ? '💰 যাকাত' : '📚 উপকরণ'}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Message Dialog */}
      <Dialog open={messageDialog} onOpenChange={setMessageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.sendMessage}</DialogTitle>
            <DialogDescription>
              {selectedDonor?.name} কে বার্তা পাঠান
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>বার্তা</Label>
              <Textarea
                value={messageText}
                onChange={(e) => setMessageText(e.target.value)}
                placeholder="আপনার বার্তা লিখুন..."
                rows={5}
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setMessageDialog(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleSendMessage}>
              <Send className="w-4 h-4 mr-2" />
              {t.sendMessage}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
