import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { 
  Package, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Eye, 
  Calendar,
  User,
  MapPin,
  Phone,
  MessageSquare,
  RefreshCw,
  Search,
  Download,
  TrendingUp,
  BookOpen,
  Users,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Request {
  id: string;
  itemId: string;
  itemTitle: string;
  itemPhoto: string;
  itemClass: string;
  itemSubject: string;
  studentId: string;
  studentName: string;
  studentPhone: string;
  studentAddress: string;
  message: string;
  donorId: string;
  donorName: string;
  status: 'pending' | 'approved' | 'rejected';
  requestDate: string;
  updatedDate: string;
}

interface AdminDonationRequestManagerProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'দান অনুরোধ পরিচালনা',
    subtitle: 'সকল বই দান অনুরোধ মনিটরিং',
    all: 'সকল',
    pending: 'বিবেচনাধীন',
    approved: 'অনুমোদিত',
    rejected: 'প্রত্যাখ্যাত',
    noRequests: 'কোনো অনুরোধ নেই',
    noRequestsDesc: 'এখনও কোনো দান অনুরোধ নেই',
    search: 'খুঁজুন...',
    requestedOn: 'অনুরোধের তারিখ',
    student: 'ছাত্র',
    donor: 'দাতা',
    book: 'বই',
    class: 'শ্রেণী',
    phone: 'ফোন',
    address: 'ঠিকানা',
    studentMessage: 'ছাত্রের বার্তা',
    refresh: 'রিফ্রেশ',
    exportData: 'ডাটা এক্সপোর্ট',
    totalRequests: 'মোট অনুরোধ',
    pendingCount: 'বিবেচনাধীন',
    approvedCount: 'অনুমোদিত',
    rejectedCount: 'প্রত্যাখ্যাত',
    successRate: 'সফলতার হার',
    viewDetails: 'বিস্তারিত',
    statistics: 'পরিসংখ্যান',
    recentActivity: 'সাম্প্রতিক কার্যকলাপ',
  },
  en: {
    title: 'Donation Request Management',
    subtitle: 'Monitor all book donation requests',
    all: 'All',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    noRequests: 'No Requests',
    noRequestsDesc: 'No donation requests yet',
    search: 'Search...',
    requestedOn: 'Requested On',
    student: 'Student',
    donor: 'Donor',
    book: 'Book',
    class: 'Class',
    phone: 'Phone',
    address: 'Address',
    studentMessage: 'Student Message',
    refresh: 'Refresh',
    exportData: 'Export Data',
    totalRequests: 'Total Requests',
    pendingCount: 'Pending',
    approvedCount: 'Approved',
    rejectedCount: 'Rejected',
    successRate: 'Success Rate',
    viewDetails: 'Details',
    statistics: 'Statistics',
    recentActivity: 'Recent Activity',
  },
};

export function AdminDonationRequestManager({ language }: AdminDonationRequestManagerProps) {
  const t = content[language];
  const [requests, setRequests] = useState<Request[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');

  const loadRequests = () => {
    const allRequests = JSON.parse(localStorage.getItem('bookRequests') || '[]');
    setRequests(allRequests);
  };

  useEffect(() => {
    loadRequests();
    
    // Refresh every 10 seconds
    const interval = setInterval(loadRequests, 10000);
    return () => clearInterval(interval);
  }, []);

  const filteredRequests = requests.filter(req => {
    const matchesTab = activeTab === 'all' || req.status === activeTab;
    const matchesSearch = searchTerm === '' || 
      req.studentName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.donorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      req.itemTitle.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };

  const successRate = stats.total > 0 
    ? Math.round((stats.approved / (stats.approved + stats.rejected || 1)) * 100) 
    : 0;

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500 text-white"><Clock className="w-3 h-3 mr-1" />{t.pending}</Badge>;
      case 'approved':
        return <Badge className="bg-green-500 text-white"><CheckCircle className="w-3 h-3 mr-1" />{t.approved}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 text-white"><XCircle className="w-3 h-3 mr-1" />{t.rejected}</Badge>;
      default:
        return null;
    }
  };

  const exportData = () => {
    const dataStr = JSON.stringify(filteredRequests, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `donation-requests-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    toast.success(language === 'bn' ? 'ডাটা এক্সপোর্ট সম্পন্ন' : 'Data exported successfully');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className={`text-2xl text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-gray-600 mt-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.subtitle}
          </p>
        </div>
        <div className="flex gap-2">
          <Button 
            onClick={exportData} 
            variant="outline" 
            size="sm"
            className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
          >
            <Download className="w-4 h-4 mr-2" />
            {t.exportData}
          </Button>
          <Button 
            onClick={loadRequests} 
            variant="outline" 
            size="sm"
            className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {t.refresh}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.totalRequests}
              </p>
              <p className="text-2xl text-gray-900 mt-1">{stats.total}</p>
            </div>
            <Package className="w-8 h-8 text-blue-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.pendingCount}
              </p>
              <p className="text-2xl text-gray-900 mt-1">{stats.pending}</p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.approvedCount}
              </p>
              <p className="text-2xl text-gray-900 mt-1">{stats.approved}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.rejectedCount}
              </p>
              <p className="text-2xl text-gray-900 mt-1">{stats.rejected}</p>
            </div>
            <XCircle className="w-8 h-8 text-red-600" />
          </div>
        </Card>

        <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.successRate}
              </p>
              <p className="text-2xl text-gray-900 mt-1">{successRate}%</p>
            </div>
            <TrendingUp className="w-8 h-8 text-purple-600" />
          </div>
        </Card>
      </div>

      {/* Search Bar */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
        <Input
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder={t.search}
          className={`pl-10 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
        />
      </div>

      {/* Requests List */}
      <Card className="p-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4 mb-6">
            <TabsTrigger value="all" className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
              {t.all} ({stats.total})
            </TabsTrigger>
            <TabsTrigger value="pending" className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
              {t.pending} ({stats.pending})
            </TabsTrigger>
            <TabsTrigger value="approved" className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
              {t.approved} ({stats.approved})
            </TabsTrigger>
            <TabsTrigger value="rejected" className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
              {t.rejected} ({stats.rejected})
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[500px] pr-4">
            <AnimatePresence mode="wait">
              {filteredRequests.length === 0 ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="text-center py-12"
                >
                  <Package className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <h3 className={`text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {t.noRequests}
                  </h3>
                  <p className={`text-gray-500 text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {t.noRequestsDesc}
                  </p>
                </motion.div>
              ) : (
                <div className="space-y-4">
                  {filteredRequests.map((request, index) => (
                    <motion.div
                      key={request.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start gap-4">
                          {/* Book Image */}
                          <img
                            src={request.itemPhoto}
                            alt={request.itemTitle}
                            className="w-20 h-20 rounded-lg object-cover"
                          />

                          {/* Request Details */}
                          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className={`text-gray-900 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                    {request.itemTitle}
                                  </h4>
                                  <div className="flex items-center gap-2 text-sm text-gray-600">
                                    <BookOpen className="w-3 h-3" />
                                    <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                      {t.class}: {request.itemClass}
                                    </span>
                                  </div>
                                </div>
                                {getStatusBadge(request.status)}
                              </div>

                              <div className="space-y-1 text-sm text-gray-600">
                                <p className="flex items-center gap-2">
                                  <User className="w-3 h-3" />
                                  <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                    {t.student}: {request.studentName}
                                  </span>
                                </p>
                                <p className="flex items-center gap-2">
                                  <Phone className="w-3 h-3" />
                                  {request.studentPhone}
                                </p>
                                <p className="flex items-center gap-2">
                                  <Calendar className="w-3 h-3" />
                                  {new Date(request.requestDate).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                                </p>
                              </div>
                            </div>

                            <div>
                              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-lg p-3">
                                <p className={`text-sm text-blue-800 mb-1 flex items-center gap-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                  <Users className="w-3 h-3" />
                                  {t.donor}: {request.donorName}
                                </p>
                                {request.message && (
                                  <>
                                    <p className={`text-xs text-gray-600 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                      {t.studentMessage}:
                                    </p>
                                    <p className={`text-xs text-gray-700 line-clamp-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                      {request.message}
                                    </p>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </Tabs>
      </Card>
    </div>
  );
}
