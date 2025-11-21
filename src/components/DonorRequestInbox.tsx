import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
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
  Send,
  ThumbsUp,
  ThumbsDown,
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

interface DonorRequestInboxProps {
  language: 'bn' | 'en';
  currentUser: any;
}

const content = {
  bn: {
    title: 'প্রাপ্ত অনুরোধসমূহ',
    subtitle: 'ছাত্রদের কাছ থেকে প্রাপ্ত সকল অনুরোধ',
    all: 'সকল',
    pending: 'বিবেচনাধীন',
    approved: 'অনুমোদিত',
    rejected: 'প্রত্যাখ্যাত',
    noRequests: 'কোনো অনুরোধ নেই',
    noRequestsDesc: 'এখনও কোনো ছাত্র আপনার কাছে অনুরোধ পাঠায়নি',
    viewDetails: 'বিস্তারিত',
    requestedOn: 'অনুরোধের তারিখ',
    status: 'অবস্থা',
    student: 'ছাত্র',
    book: 'বই',
    class: 'শ্রেণী',
    subject: 'বিষয়',
    condition: 'অবস্থা',
    studentMessage: 'ছাত্রের বার্তা',
    studentInfo: 'ছাত্রের তথ্য',
    phone: 'ফোন',
    address: 'ঠিকানা',
    refresh: 'রিফ্রেশ',
    approve: 'অনুমোদন করুন',
    reject: 'প্রত্যাখ্যান করুন',
    approveRequest: 'অনুরোধ অনুমোদন করুন',
    rejectRequest: 'অনুরোধ প্রত্যাখ্যান করুন',
    yourResponse: 'আপনার প্রতিক্রিয়া',
    responsePlaceholder: 'ছাত্রের জন্য একটি বার্তা লিখুন...',
    yourContact: 'আপনার যোগাযোগ তথ্য',
    yourPhone: 'আপনার ফোন',
    yourEmail: 'আপনার ইমেইল (ঐচ্ছিক)',
    cancel: 'বাতিল',
    confirmApprove: 'অনুমোদন নিশ্চিত করুন',
    confirmReject: 'প্রত্যাখ্যান নিশ্চিত করুন',
    approveSuccess: 'অনুরোধ অনুমোদন করা হয়েছে!',
    rejectSuccess: 'অনুরোধ প্রত্যাখ্যান করা হয়েছে',
    approveDesc: 'ছাত্র আপনার যোগাযোগ তথ্য পাবে',
    rejectDesc: 'ছাত্র অবহিত করা হবে',
    totalRequests: 'মোট অনুরোধ',
    pendingCount: 'বিবেচনাধীন',
    approvedCount: 'অনুমোদিত',
    rejectedCount: 'প্রত্যাখ্যাত',
    fillPhone: 'আপনার ফোন নম্বর দিন',
  },
  en: {
    title: 'Received Requests',
    subtitle: 'All requests from students',
    all: 'All',
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    noRequests: 'No Requests',
    noRequestsDesc: 'No students have requested yet',
    viewDetails: 'Details',
    requestedOn: 'Requested On',
    status: 'Status',
    student: 'Student',
    book: 'Book',
    class: 'Class',
    subject: 'Subject',
    condition: 'Condition',
    studentMessage: 'Student Message',
    studentInfo: 'Student Information',
    phone: 'Phone',
    address: 'Address',
    refresh: 'Refresh',
    approve: 'Approve',
    reject: 'Reject',
    approveRequest: 'Approve Request',
    rejectRequest: 'Reject Request',
    yourResponse: 'Your Response',
    responsePlaceholder: 'Write a message for the student...',
    yourContact: 'Your Contact Information',
    yourPhone: 'Your Phone',
    yourEmail: 'Your Email (Optional)',
    cancel: 'Cancel',
    confirmApprove: 'Confirm Approval',
    confirmReject: 'Confirm Rejection',
    approveSuccess: 'Request approved!',
    rejectSuccess: 'Request rejected',
    approveDesc: 'Student will receive your contact info',
    rejectDesc: 'Student will be notified',
    totalRequests: 'Total Requests',
    pendingCount: 'Pending',
    approvedCount: 'Approved',
    rejectedCount: 'Rejected',
    fillPhone: 'Please provide your phone number',
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

export function DonorRequestInbox({ language, currentUser }: DonorRequestInboxProps) {
  const t = content[language];
  const [requests, setRequests] = useState<Request[]>([]);
  const [activeTab, setActiveTab] = useState('pending');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const [actionType, setActionType] = useState<'approve' | 'reject' | null>(null);
  const [response, setResponse] = useState('');
  const [contactPhone, setContactPhone] = useState(currentUser?.phone || '');
  const [contactEmail, setContactEmail] = useState(currentUser?.email || '');

  const loadRequests = () => {
    const donorInbox = JSON.parse(localStorage.getItem('donorInbox') || '{}');
    const donorId = currentUser?.id || 'donor-' + currentUser?.name?.toLowerCase().replace(/\s+/g, '-');
    const userRequests = donorInbox[donorId] || [];
    setRequests(userRequests);
  };

  useEffect(() => {
    loadRequests();
    
    // Refresh every 10 seconds to catch new requests
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

  const handleAction = (request: Request, action: 'approve' | 'reject') => {
    setSelectedRequest(request);
    setActionType(action);
    setResponse('');
  };

  const confirmAction = () => {
    if (!selectedRequest || !actionType) return;

    if (actionType === 'approve' && !contactPhone) {
      toast.error(t.fillPhone);
      return;
    }

    // Update request status
    const updatedRequest = {
      ...selectedRequest,
      status: actionType === 'approve' ? 'approved' : 'rejected',
      updatedDate: new Date().toISOString(),
      donorResponse: response || undefined,
      donorContact: actionType === 'approve' ? {
        phone: contactPhone,
        email: contactEmail,
      } : undefined,
    };

    // Update in localStorage
    const allRequests = JSON.parse(localStorage.getItem('bookRequests') || '[]');
    const requestIndex = allRequests.findIndex((r: Request) => r.id === selectedRequest.id);
    if (requestIndex !== -1) {
      allRequests[requestIndex] = updatedRequest;
      localStorage.setItem('bookRequests', JSON.stringify(allRequests));
    }

    // Update in donor inbox
    const donorInbox = JSON.parse(localStorage.getItem('donorInbox') || '{}');
    const donorId = currentUser?.id || 'donor-' + currentUser?.name?.toLowerCase().replace(/\s+/g, '-');
    if (donorInbox[donorId]) {
      const inboxIndex = donorInbox[donorId].findIndex((r: Request) => r.id === selectedRequest.id);
      if (inboxIndex !== -1) {
        donorInbox[donorId][inboxIndex] = updatedRequest;
        localStorage.setItem('donorInbox', JSON.stringify(donorInbox));
      }
    }

    // Send notification to student
    const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
    notifications.push({
      id: `notif-${Date.now()}`,
      type: actionType === 'approve' ? 'request_approved' : 'request_rejected',
      title: language === 'bn' 
        ? (actionType === 'approve' ? 'অনুরোধ অনুমোদিত' : 'অনুরোধ প্রত্যাখ্যাত')
        : (actionType === 'approve' ? 'Request Approved' : 'Request Rejected'),
      message: language === 'bn' 
        ? `${currentUser.name} আপনার "${selectedRequest.itemTitle}" বইয়ের অনুরোধ ${actionType === 'approve' ? 'অনুমোদন' : 'প্রত্যাখ্যান'} করেছেন`
        : `${currentUser.name} has ${actionType === 'approve' ? 'approved' : 'rejected'} your request for "${selectedRequest.itemTitle}"`,
      userId: selectedRequest.studentId,
      timestamp: new Date().toISOString(),
      read: false,
      link: '/student-dashboard?tab=requests',
    });
    localStorage.setItem('notifications', JSON.stringify(notifications));

    toast.success(
      actionType === 'approve' ? t.approveSuccess : t.rejectSuccess,
      {
        description: actionType === 'approve' ? t.approveDesc : t.rejectDesc,
      }
    );

    setSelectedRequest(null);
    setActionType(null);
    loadRequests();
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
                          <div className="flex-1">
                            <div className="flex items-start justify-between mb-3">
                              <div>
                                <h4 className={`text-gray-900 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                  {request.itemTitle}
                                </h4>
                                <div className="flex items-center gap-3 text-sm text-gray-600">
                                  <span className="flex items-center gap-1">
                                    <User className="w-3 h-3" />
                                    <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                      {request.studentName}
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

                            {/* Student Information */}
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                              <p className={`text-sm text-blue-800 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                {t.studentInfo}:
                              </p>
                              <div className="space-y-1 text-sm text-gray-700">
                                <p className="flex items-center gap-2">
                                  <Phone className="w-3 h-3" />
                                  <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>{request.studentPhone}</span>
                                </p>
                                <p className="flex items-start gap-2">
                                  <MapPin className="w-3 h-3 mt-0.5" />
                                  <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>{request.studentAddress}</span>
                                </p>
                              </div>
                            </div>

                            {/* Student Message */}
                            {request.message && (
                              <div className="bg-gray-50 border border-gray-200 rounded-lg p-3 mb-3">
                                <p className={`text-sm text-gray-700 mb-1 flex items-center gap-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                  <MessageSquare className="w-3 h-3" />
                                  {t.studentMessage}:
                                </p>
                                <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                  {request.message}
                                </p>
                              </div>
                            )}

                            {/* Action Buttons */}
                            {request.status === 'pending' && (
                              <div className="flex gap-2">
                                <Button
                                  onClick={() => handleAction(request, 'approve')}
                                  className={`flex-1 bg-green-600 hover:bg-green-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                                >
                                  <ThumbsUp className="w-4 h-4 mr-2" />
                                  {t.approve}
                                </Button>
                                <Button
                                  onClick={() => handleAction(request, 'reject')}
                                  variant="outline"
                                  className={`flex-1 text-red-600 border-red-300 hover:bg-red-50 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                                >
                                  <ThumbsDown className="w-4 h-4 mr-2" />
                                  {t.reject}
                                </Button>
                              </div>
                            )}
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

      {/* Action Dialog */}
      <Dialog open={!!selectedRequest && !!actionType} onOpenChange={() => { setSelectedRequest(null); setActionType(null); }}>
        <DialogContent className={`max-w-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              {actionType === 'approve' ? (
                <><ThumbsUp className="w-5 h-5 text-green-600" />{t.approveRequest}</>
              ) : (
                <><ThumbsDown className="w-5 h-5 text-red-600" />{t.rejectRequest}</>
              )}
            </DialogTitle>
            <DialogDescription className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
              {selectedRequest?.itemTitle}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Contact Info (only for approve) */}
            {actionType === 'approve' && (
              <div className="space-y-3">
                <div>
                  <Label className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                    {t.yourPhone} *
                  </Label>
                  <Input
                    value={contactPhone}
                    onChange={(e) => setContactPhone(e.target.value)}
                    placeholder="01xxxxxxxxx"
                    type="tel"
                  />
                </div>
                <div>
                  <Label className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                    {t.yourEmail}
                  </Label>
                  <Input
                    value={contactEmail}
                    onChange={(e) => setContactEmail(e.target.value)}
                    placeholder="email@example.com"
                    type="email"
                  />
                </div>
              </div>
            )}

            {/* Response Message */}
            <div>
              <Label className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                {t.yourResponse}
              </Label>
              <Textarea
                value={response}
                onChange={(e) => setResponse(e.target.value)}
                placeholder={t.responsePlaceholder}
                className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
                rows={4}
              />
            </div>
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => { setSelectedRequest(null); setActionType(null); }}
              className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
            >
              {t.cancel}
            </Button>
            <Button
              onClick={confirmAction}
              className={actionType === 'approve' 
                ? `bg-green-600 hover:bg-green-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}` 
                : `bg-red-600 hover:bg-red-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`
              }
            >
              {actionType === 'approve' ? t.confirmApprove : t.confirmReject}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
