import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
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
  Mail,
  MessageSquare,
  BookOpen,
  RefreshCw,
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
  itemCondition: string;
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
  donorResponse?: string;
  donorContact?: {
    phone: string;
    email: string;
  };
}

interface StudentRequestManagerProps {
  language: 'bn' | 'en';
  currentUser: any;
}

const content = {
  bn: {
    title: 'আমার অনুরোধসমূহ',
    subtitle: 'আপনার সকল বই অনুরোধ এখানে দেখুন',
    all: 'সকল',
    pending: 'বিবেচনাধীন',
    approved: 'অনুমোদিত',
    rejected: 'প্রত্যাখ্যাত',
    noRequests: 'কোনো অনুরোধ নেই',
    noRequestsDesc: 'আপনি এখনও কোনো বই অনুরোধ করেননি',
    viewDetails: 'বিস্তারিত',
    requestedOn: 'অনুরোধের তারিখ',
    status: 'অবস্থা',
    donor: 'দাতা',
    book: 'বই',
    class: 'শ্রেণী',
    subject: 'বিষয়',
    condition: 'অবস্থা',
    message: 'বার্তা',
    donorResponse: 'দাতার প্রতিক্রিয়া',
    contactDonor: 'দাতার সাথে যোগাযোগ',
    phone: 'ফোন',
    email: 'ইমেইল',
    refresh: 'রিফ্রেশ',
    waitingApproval: 'দাতার অনুমোদনের জন্য অপেক্ষা করুন',
    approved_text: 'অভিনন্দন! দাতা আপনার অনুরোধ অনুমোদন করেছেন',
    rejected_text: 'দুঃখিত, দাতা আপনার অনুরোধ প্রত্যাখ্যান করেছেন',
    totalRequests: 'মোট অনুরোধ',
    pendingCount: 'বিবেচনাধীন',
    approvedCount: 'অনুমোদিত',
    rejectedCount: 'প্রত্যাখ্যাত',
  },
  en: {
    title: 'My Requests',
    subtitle: 'View all your book requests here',
    all: 'All',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    noRequests: 'No Requests',
    noRequestsDesc: "You haven't made any book requests yet",
    viewDetails: 'Details',
    requestedOn: 'Requested On',
    status: 'Status',
    donor: 'Donor',
    book: 'Book',
    class: 'Class',
    subject: 'Subject',
    condition: 'Condition',
    message: 'Message',
    donorResponse: 'Donor Response',
    contactDonor: 'Contact Donor',
    phone: 'Phone',
    email: 'Email',
    refresh: 'Refresh',
    waitingApproval: 'Waiting for donor approval',
    approved_text: 'Congratulations! Donor approved your request',
    rejected_text: 'Sorry, donor rejected your request',
    totalRequests: 'Total Requests',
    pendingCount: 'Pending',
    approvedCount: 'Approved',
    rejectedCount: 'Rejected',
  },
};

const conditionLabels = {
  bn: {
    new: 'নতুন',
    'like-new': 'নতুনের মতো',
    good: 'ভালো',
    fair: 'মোটামুটি',
  },
  en: {
    new: 'New',
    'like-new': 'Like New',
    good: 'Good',
    fair: 'Fair',
  },
};

export function StudentRequestManager({ language, currentUser }: StudentRequestManagerProps) {
  const t = content[language];
  const [requests, setRequests] = useState<Request[]>([]);
  const [activeTab, setActiveTab] = useState('all');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);

  const loadRequests = () => {
    const allRequests = JSON.parse(localStorage.getItem('bookRequests') || '[]');
    const userRequests = allRequests.filter((req: Request) => req.studentId === currentUser?.id);
    setRequests(userRequests);
  };

  useEffect(() => {
    loadRequests();
    
    // Refresh every 10 seconds to catch updates
    const interval = setInterval(loadRequests, 10000);
    return () => clearInterval(interval);
  }, [currentUser]);

  const filteredRequests = requests.filter(req => {
    if (activeTab === 'all') return true;
    return req.status === activeTab;
  });

  const stats = {
    total: requests.length,
    pending: requests.filter(r => r.status === 'pending').length,
    approved: requests.filter(r => r.status === 'approved').length,
    rejected: requests.filter(r => r.status === 'rejected').length,
  };

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

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: t.waitingApproval, color: 'text-yellow-700 bg-yellow-50 border-yellow-200' };
      case 'approved':
        return { text: t.approved_text, color: 'text-green-700 bg-green-50 border-green-200' };
      case 'rejected':
        return { text: t.rejected_text, color: 'text-red-700 bg-red-50 border-red-200' };
      default:
        return { text: '', color: '' };
    }
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

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
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
                  {filteredRequests.map((request, index) => {
                    const statusMsg = getStatusMessage(request.status);
                    return (
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
                            <div className="flex-1">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className={`text-gray-900 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                    {request.itemTitle}
                                  </h4>
                                  <div className="flex items-center gap-3 text-sm text-gray-600">
                                    <span className="flex items-center gap-1">
                                      <User className="w-3 h-3" />
                                      <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                        {request.donorName}
                                      </span>
                                    </span>
                                    <span className="flex items-center gap-1">
                                      <Calendar className="w-3 h-3" />
                                      {new Date(request.requestDate).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                                    </span>
                                  </div>
                                </div>
                                {getStatusBadge(request.status)}
                              </div>

                              {/* Status Message */}
                              <div className={`p-3 rounded-lg border ${statusMsg.color} mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                {statusMsg.text}
                              </div>

                              {/* Donor Contact (if approved) */}
                              {request.status === 'approved' && request.donorContact && (
                                <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-3">
                                  <p className={`text-sm text-green-800 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                    {t.contactDonor}:
                                  </p>
                                  <div className="flex items-center gap-4 text-sm">
                                    <span className="flex items-center gap-1">
                                      <Phone className="w-3 h-3" />
                                      {request.donorContact.phone}
                                    </span>
                                    {request.donorContact.email && (
                                      <span className="flex items-center gap-1">
                                        <Mail className="w-3 h-3" />
                                        {request.donorContact.email}
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}

                              {/* Donor Response */}
                              {request.donorResponse && (
                                <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                                  <p className={`text-sm text-gray-700 mb-1 flex items-center gap-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                    <MessageSquare className="w-3 h-3" />
                                    {t.donorResponse}:
                                  </p>
                                  <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                    {request.donorResponse}
                                  </p>
                                </div>
                              )}
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </AnimatePresence>
          </ScrollArea>
        </Tabs>
      </Card>
    </div>
  );
}
