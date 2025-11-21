import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter, DialogDescription } from './ui/dialog';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  MessageSquare, Search, Send, User, Clock, CheckCircle, AlertCircle,
  Eye, Trash2, CheckCheck, Ticket, MessageCircle, HelpCircle,
  GraduationCap, Users, BookOpen, Heart, Filter, MoreVertical,
  Ban, Star, Archive, Reply, ExternalLink
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface SupportMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'teacher' | 'guardian' | 'student' | 'donor';
  senderEmail?: string;
  senderPhone?: string;
  subject?: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  source: 'chat' | 'ticket' | 'support-center';
  category: 'technical' | 'account' | 'payment' | 'general' | 'complaint';
  assignedTo?: string;
  replies?: {
    id: string;
    message: string;
    sender: 'admin' | 'user';
    timestamp: string;
  }[];
  attachments?: string[];
  tags?: string[];
}

interface UnifiedSupportSystemProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: '🎫 সমন্বিত সাপোর্ট সিস্টেম',
    subtitle: 'চ্যাট, টিকেট এবং সাপোর্ট - সব এক জায়গায়',
    allMessages: 'সব মেসেজ',
    pendingMessages: 'পেন্ডিং',
    inProgress: 'প্রক্রিয়াধীন',
    resolved: 'সমাধান হয়েছে',
    closed: 'বন্ধ',
    search: 'খুঁজুন',
    searchPlaceholder: 'নাম, ইমেইল বা মেসেজে খুঁজুন...',
    filterByType: 'ধরন',
    filterBySource: 'উৎস',
    filterByPriority: 'অগ্রাধিকার',
    all: 'সব',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    student: 'ছাত্র',
    donor: 'দাতা',
    chat: 'চ্যাট',
    ticket: 'টিকেট',
    supportCenter: 'সাপোর্ট সেন্টার',
    technical: 'টেকনিক্যাল',
    account: 'অ্যাকাউন্ট',
    payment: 'পেমেন্ট',
    general: 'সাধারণ',
    complaint: 'অভিযোগ',
    low: 'কম',
    medium: 'মাঝারি',
    high: 'উচ্চ',
    urgent: 'জরুরি',
    reply: 'রিপ্লাই',
    viewDetails: 'বিস্তারিত দেখুন',
    delete: 'মুছুন',
    markAsResolved: 'সমাধান হয়েছে',
    markAsClosed: 'বন্ধ করুন',
    assignToMe: 'আমাকে অ্যাসাইন করুন',
    pending: 'পেন্ডিং',
    from: 'প্রেরক',
    subject: 'বিষয়',
    message: 'বার্তা',
    time: 'সময়',
    status: 'স্ট্যাটাস',
    priority: 'অগ্রাধিকার',
    source: 'উৎস',
    category: 'ক্যাটাগরি',
    actions: 'অ্যাকশন',
    totalMessages: 'মোট মেসেজ',
    pendingCount: 'পেন্ডিং',
    resolvedCount: 'সমাধান হয়েছে',
    avgResponseTime: 'গড় রেসপন্স টাইম',
    sendReply: 'রিপ্লাই পাঠান',
    yourReply: 'আপনার রিপ্লাই',
    replyPlaceholder: 'রিপ্লাই লিখুন...',
    send: 'পাঠান',
    cancel: 'বাতিল',
    noMessages: 'কোন মেসেজ নেই',
    replySent: 'রিপ্লাই পাঠানো হয়েছে',
    messageDeleted: 'মেসেজ মুছে ফেলা হয়েছে',
    statusUpdated: 'স্ট্যাটাস আপডেট করা হয়েছে',
    conversation: 'কথোপকথন',
    details: 'বিবরণ',
    contactInfo: 'যোগাযোগের তথ্য',
    email: 'ইমেইল',
    phone: 'ফোন',
    userType: 'ইউজার ধরন',
    createdAt: 'তৈরি হয়েছে',
    lastUpdated: 'শেষ আপডেট',
    assignedAdmin: 'অ্যাসাইনড এডমিন',
    notAssigned: 'অ্যাসাইন করা হয়নি',
    changePriority: 'অগ্রাধিকার পরিবর্তন',
    changeStatus: 'স্ট্যাটাস পরিবর্তন',
    addTag: 'ট্যাগ যোগ করুন',
    archive: 'আর্কাইভ',
    export: 'এক্সপোর্ট',
    refresh: 'রিফ্রেশ',
  },
  en: {
    title: '🎫 Unified Support System',
    subtitle: 'Chat, Tickets & Support - All in One Place',
    allMessages: 'All Messages',
    pendingMessages: 'Pending',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
    search: 'Search',
    searchPlaceholder: 'Search by name, email or message...',
    filterByType: 'Type',
    filterBySource: 'Source',
    filterByPriority: 'Priority',
    all: 'All',
    teacher: 'Teacher',
    guardian: 'Guardian',
    student: 'Student',
    donor: 'Donor',
    chat: 'Chat',
    ticket: 'Ticket',
    supportCenter: 'Support Center',
    technical: 'Technical',
    account: 'Account',
    payment: 'Payment',
    general: 'General',
    complaint: 'Complaint',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
    reply: 'Reply',
    viewDetails: 'View Details',
    delete: 'Delete',
    markAsResolved: 'Mark as Resolved',
    markAsClosed: 'Close',
    assignToMe: 'Assign to Me',
    pending: 'Pending',
    from: 'From',
    subject: 'Subject',
    message: 'Message',
    time: 'Time',
    status: 'Status',
    priority: 'Priority',
    source: 'Source',
    category: 'Category',
    actions: 'Actions',
    totalMessages: 'Total Messages',
    pendingCount: 'Pending',
    resolvedCount: 'Resolved',
    avgResponseTime: 'Avg Response Time',
    sendReply: 'Send Reply',
    yourReply: 'Your Reply',
    replyPlaceholder: 'Write your reply...',
    send: 'Send',
    cancel: 'Cancel',
    noMessages: 'No messages',
    replySent: 'Reply sent',
    messageDeleted: 'Message deleted',
    statusUpdated: 'Status updated',
    conversation: 'Conversation',
    details: 'Details',
    contactInfo: 'Contact Info',
    email: 'Email',
    phone: 'Phone',
    userType: 'User Type',
    createdAt: 'Created At',
    lastUpdated: 'Last Updated',
    assignedAdmin: 'Assigned Admin',
    notAssigned: 'Not Assigned',
    changePriority: 'Change Priority',
    changeStatus: 'Change Status',
    addTag: 'Add Tag',
    archive: 'Archive',
    export: 'Export',
    refresh: 'Refresh',
  },
};

// Mock data - এটি পরে backend থেকে আসবে
const initialMessages: SupportMessage[] = [
  {
    id: '1',
    senderId: 't1',
    senderName: 'মোঃ করিম উদ্দিন',
    senderType: 'teacher',
    senderEmail: 'karim@example.com',
    senderPhone: '01712345678',
    subject: 'প্রোফাইল ভেরিফিকেশন সমস্যা',
    message: 'আমার প্রোফাইল ভেরিফাই হচ্ছে না। ডকুমেন্ট আপলোড করেছি কিন্তু এখনও pending আছে।',
    timestamp: '2025-11-02T10:30:00',
    status: 'pending',
    priority: 'high',
    source: 'ticket',
    category: 'account',
    replies: [],
  },
  {
    id: '2',
    senderId: 'g1',
    senderName: 'মিসেস খান',
    senderType: 'guardian',
    senderEmail: 'khan@example.com',
    senderPhone: '01812345679',
    subject: 'পেমেন্ট সমস্যা',
    message: 'bKash পেমেন্ট করেছি কিন্তু ক্রেডিট এখনও পাইনি।',
    timestamp: '2025-11-02T09:15:00',
    status: 'in-progress',
    priority: 'urgent',
    source: 'chat',
    category: 'payment',
    assignedTo: 'Admin 1',
    replies: [
      {
        id: 'r1',
        message: 'আপনার পেমেন্ট চেক করছি। ট্রানজেকশন আইডি দিন।',
        sender: 'admin',
        timestamp: '2025-11-02T09:20:00',
      },
    ],
  },
  {
    id: '3',
    senderId: 's1',
    senderName: 'রাফি আহমেদ',
    senderType: 'student',
    senderEmail: 'rafi@example.com',
    senderPhone: '01612345678',
    subject: 'সাহায্যের আবেদন স্ট্যাটাস',
    message: 'আমার সাহায্যের আবেদন কবে অনুমোদন হবে?',
    timestamp: '2025-11-02T08:45:00',
    status: 'resolved',
    priority: 'medium',
    source: 'support-center',
    category: 'general',
    assignedTo: 'Admin 2',
    replies: [
      {
        id: 'r2',
        message: 'আপনার আবেদন পর্যালোচনা করা হচ্ছে। ২-৩ দিনের মধ্যে জানানো হবে।',
        sender: 'admin',
        timestamp: '2025-11-02T09:00:00',
      },
      {
        id: 'r3',
        message: 'ধন্যবাদ',
        sender: 'user',
        timestamp: '2025-11-02T09:05:00',
      },
    ],
  },
];

export function UnifiedSupportSystem({ language }: UnifiedSupportSystemProps) {
  const t = content[language];
  
  const [messages, setMessages] = useState<SupportMessage[]>(initialMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterSource, setFilterSource] = useState<string>('all');
  const [filterPriority, setFilterPriority] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [selectedMessage, setSelectedMessage] = useState<SupportMessage | null>(null);
  const [replyText, setReplyText] = useState('');
  const [detailsOpen, setDetailsOpen] = useState(false);

  // Stats calculation
  const stats = {
    total: messages.length,
    pending: messages.filter(m => m.status === 'pending').length,
    inProgress: messages.filter(m => m.status === 'in-progress').length,
    resolved: messages.filter(m => m.status === 'resolved').length,
    closed: messages.filter(m => m.status === 'closed').length,
  };

  // Filter messages
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.senderEmail?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.subject?.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = filterType === 'all' || msg.senderType === filterType;
    const matchesSource = filterSource === 'all' || msg.source === filterSource;
    const matchesPriority = filterPriority === 'all' || msg.priority === filterPriority;
    const matchesStatus = filterStatus === 'all' || msg.status === filterStatus;

    return matchesSearch && matchesType && matchesSource && matchesPriority && matchesStatus;
  });

  // Get user type badge color
  const getUserTypeBadge = (type: string) => {
    const colors = {
      teacher: 'bg-purple-100 text-purple-700',
      guardian: 'bg-blue-100 text-blue-700',
      student: 'bg-green-100 text-green-700',
      donor: 'bg-orange-100 text-orange-700',
    };
    return colors[type as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  // Get priority badge color
  const getPriorityBadge = (priority: string) => {
    const colors = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-yellow-100 text-yellow-700',
      high: 'bg-orange-100 text-orange-700',
      urgent: 'bg-red-100 text-red-700',
    };
    return colors[priority as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  // Get status badge color
  const getStatusBadge = (status: string) => {
    const colors = {
      pending: 'bg-yellow-100 text-yellow-700',
      'in-progress': 'bg-blue-100 text-blue-700',
      resolved: 'bg-green-100 text-green-700',
      closed: 'bg-gray-100 text-gray-700',
    };
    return colors[status as keyof typeof colors] || 'bg-gray-100 text-gray-700';
  };

  // Get source icon
  const getSourceIcon = (source: string) => {
    const icons = {
      chat: MessageCircle,
      ticket: Ticket,
      'support-center': HelpCircle,
    };
    const Icon = icons[source as keyof typeof icons] || MessageSquare;
    return <Icon className="w-4 h-4" />;
  };

  // Handle reply
  const handleSendReply = () => {
    if (!selectedMessage || !replyText.trim()) {
      toast.error('রিপ্লাই লিখুন');
      return;
    }

    const newReply = {
      id: `r${Date.now()}`,
      message: replyText,
      sender: 'admin' as const,
      timestamp: new Date().toISOString(),
    };

    setMessages(messages.map(msg => 
      msg.id === selectedMessage.id
        ? {
            ...msg,
            replies: [...(msg.replies || []), newReply],
            status: 'in-progress' as const,
          }
        : msg
    ));

    setReplyText('');
    toast.success(t.replySent);
  };

  // Handle status change
  const handleStatusChange = (messageId: string, newStatus: SupportMessage['status']) => {
    setMessages(messages.map(msg =>
      msg.id === messageId ? { ...msg, status: newStatus } : msg
    ));
    toast.success(t.statusUpdated);
  };

  // Handle delete
  const handleDelete = (messageId: string) => {
    if (confirm('আপনি কি নিশ্চিত এই মেসেজ মুছে ফেলতে চান?')) {
      setMessages(messages.filter(msg => msg.id !== messageId));
      toast.success(t.messageDeleted);
      setDetailsOpen(false);
    }
  };

  // View details
  const handleViewDetails = (message: SupportMessage) => {
    setSelectedMessage(message);
    setDetailsOpen(true);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-lg flex items-center justify-center">
              <MessageSquare className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t.totalMessages}</p>
              <p className="text-2xl text-gray-900">{stats.total}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-yellow-50 border-yellow-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-yellow-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-yellow-700">{t.pendingCount}</p>
              <p className="text-2xl text-yellow-900">{stats.pending}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
              <AlertCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-blue-700">{t.inProgress}</p>
              <p className="text-2xl text-blue-900">{stats.inProgress}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-green-50 border-green-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-green-700">{t.resolvedCount}</p>
              <p className="text-2xl text-green-900">{stats.resolved}</p>
            </div>
          </div>
        </Card>

        <Card className="p-4 bg-gray-50 border-gray-200">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gray-500 rounded-lg flex items-center justify-center">
              <Archive className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-700">{t.closed}</p>
              <p className="text-2xl text-gray-900">{stats.closed}</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="grid md:grid-cols-5 gap-4">
          <div className="md:col-span-2">
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

          <Select value={filterType} onValueChange={setFilterType}>
            <SelectTrigger>
              <SelectValue placeholder={t.filterByType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.all}</SelectItem>
              <SelectItem value="teacher">{t.teacher}</SelectItem>
              <SelectItem value="guardian">{t.guardian}</SelectItem>
              <SelectItem value="student">{t.student}</SelectItem>
              <SelectItem value="donor">{t.donor}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterSource} onValueChange={setFilterSource}>
            <SelectTrigger>
              <SelectValue placeholder={t.filterBySource} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.all}</SelectItem>
              <SelectItem value="chat">{t.chat}</SelectItem>
              <SelectItem value="ticket">{t.ticket}</SelectItem>
              <SelectItem value="support-center">{t.supportCenter}</SelectItem>
            </SelectContent>
          </Select>

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger>
              <SelectValue placeholder={t.status} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.all}</SelectItem>
              <SelectItem value="pending">{t.pending}</SelectItem>
              <SelectItem value="in-progress">{t.inProgress}</SelectItem>
              <SelectItem value="resolved">{t.resolved}</SelectItem>
              <SelectItem value="closed">{t.closed}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Messages List */}
      <Card>
        <ScrollArea className="h-[600px]">
          <div className="divide-y">
            {filteredMessages.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p>{t.noMessages}</p>
              </div>
            ) : (
              filteredMessages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex items-start gap-4">
                    {/* User Icon */}
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                      message.senderType === 'teacher' ? 'bg-purple-100' :
                      message.senderType === 'guardian' ? 'bg-blue-100' :
                      message.senderType === 'student' ? 'bg-green-100' :
                      'bg-orange-100'
                    }`}>
                      <User className={`w-5 h-5 ${
                        message.senderType === 'teacher' ? 'text-purple-600' :
                        message.senderType === 'guardian' ? 'text-blue-600' :
                        message.senderType === 'student' ? 'text-green-600' :
                        'text-orange-600'
                      }`} />
                    </div>

                    {/* Message Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="text-gray-900">{message.senderName}</h4>
                            <Badge className={getUserTypeBadge(message.senderType)} variant="secondary">
                              {t[message.senderType as keyof typeof t]}
                            </Badge>
                            <div className="flex items-center gap-1 text-gray-500">
                              {getSourceIcon(message.source)}
                            </div>
                          </div>
                          {message.subject && (
                            <p className="text-sm text-gray-900 mb-1">{message.subject}</p>
                          )}
                          <p className="text-sm text-gray-600 line-clamp-2">{message.message}</p>
                        </div>

                        <div className="flex flex-col items-end gap-2 flex-shrink-0">
                          <Badge className={getPriorityBadge(message.priority)} variant="secondary">
                            {t[message.priority as keyof typeof t]}
                          </Badge>
                          <Badge className={getStatusBadge(message.status)} variant="secondary">
                            {t[message.status.replace('-', '') as keyof typeof t] || message.status}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4 text-xs text-gray-500">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {new Date(message.timestamp).toLocaleString('bn-BD')}
                          </span>
                          {message.replies && message.replies.length > 0 && (
                            <span className="flex items-center gap-1">
                              <Reply className="w-3 h-3" />
                              {message.replies.length} রিপ্লাই
                            </span>
                          )}
                        </div>

                        <div className="flex items-center gap-2">
                          <Button
                            onClick={() => handleViewDetails(message)}
                            variant="outline"
                            size="sm"
                          >
                            <Eye className="w-4 h-4 mr-1" />
                            {t.viewDetails}
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))
            )}
          </div>
        </ScrollArea>
      </Card>

      {/* Details Dialog */}
      <Dialog open={detailsOpen} onOpenChange={setDetailsOpen}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          {selectedMessage && (
            <>
              <DialogHeader>
                <DialogTitle className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    selectedMessage.senderType === 'teacher' ? 'bg-purple-100' :
                    selectedMessage.senderType === 'guardian' ? 'bg-blue-100' :
                    selectedMessage.senderType === 'student' ? 'bg-green-100' :
                    'bg-orange-100'
                  }`}>
                    <User className={`w-5 h-5 ${
                      selectedMessage.senderType === 'teacher' ? 'text-purple-600' :
                      selectedMessage.senderType === 'guardian' ? 'text-blue-600' :
                      selectedMessage.senderType === 'student' ? 'text-green-600' :
                      'text-orange-600'
                    }`} />
                  </div>
                  <div>
                    <h3>{selectedMessage.senderName}</h3>
                    <p className="text-sm text-gray-500">{selectedMessage.subject || 'No Subject'}</p>
                  </div>
                </DialogTitle>
                <DialogDescription>
                  {t.viewDetails}
                </DialogDescription>
              </DialogHeader>

              <div className="space-y-6 py-4">
                {/* Details Section */}
                <Card className="p-4 bg-gray-50">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t.email}</p>
                      <p className="text-sm text-gray-900">{selectedMessage.senderEmail || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t.phone}</p>
                      <p className="text-sm text-gray-900">{selectedMessage.senderPhone || 'N/A'}</p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t.source}</p>
                      <div className="flex items-center gap-2">
                        {getSourceIcon(selectedMessage.source)}
                        <span className="text-sm text-gray-900">{t[selectedMessage.source.replace('-', '') as keyof typeof t]}</span>
                      </div>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-1">{t.category}</p>
                      <p className="text-sm text-gray-900">{t[selectedMessage.category as keyof typeof t]}</p>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mt-4 pt-4 border-t">
                    <div>
                      <p className="text-sm text-gray-600 mb-2">{t.status}</p>
                      <Select
                        value={selectedMessage.status}
                        onValueChange={(value) => handleStatusChange(selectedMessage.id, value as SupportMessage['status'])}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="pending">{t.pending}</SelectItem>
                          <SelectItem value="in-progress">{t.inProgress}</SelectItem>
                          <SelectItem value="resolved">{t.resolved}</SelectItem>
                          <SelectItem value="closed">{t.closed}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">{t.priority}</p>
                      <Badge className={getPriorityBadge(selectedMessage.priority)} variant="secondary">
                        {t[selectedMessage.priority as keyof typeof t]}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-sm text-gray-600 mb-2">{t.assignedAdmin}</p>
                      <p className="text-sm text-gray-900">{selectedMessage.assignedTo || t.notAssigned}</p>
                    </div>
                  </div>
                </Card>

                {/* Original Message */}
                <div>
                  <h4 className="text-sm text-gray-900 mb-2">মূল বার্তা:</h4>
                  <Card className="p-4 bg-blue-50 border-blue-200">
                    <p className="text-sm text-gray-900 whitespace-pre-wrap">{selectedMessage.message}</p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(selectedMessage.timestamp).toLocaleString('bn-BD')}
                    </p>
                  </Card>
                </div>

                {/* Conversation */}
                {selectedMessage.replies && selectedMessage.replies.length > 0 && (
                  <div>
                    <h4 className="text-sm text-gray-900 mb-2">{t.conversation}:</h4>
                    <div className="space-y-3">
                      {selectedMessage.replies.map((reply) => (
                        <Card
                          key={reply.id}
                          className={`p-4 ${
                            reply.sender === 'admin'
                              ? 'bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200'
                              : 'bg-gray-50'
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              reply.sender === 'admin' ? 'bg-emerald-500' : 'bg-gray-400'
                            }`}>
                              <User className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1">
                              <p className="text-xs text-gray-600 mb-1">
                                {reply.sender === 'admin' ? 'Admin' : selectedMessage.senderName}
                              </p>
                              <p className="text-sm text-gray-900 whitespace-pre-wrap">{reply.message}</p>
                              <p className="text-xs text-gray-500 mt-2">
                                {new Date(reply.timestamp).toLocaleString('bn-BD')}
                              </p>
                            </div>
                          </div>
                        </Card>
                      ))}
                    </div>
                  </div>
                )}

                {/* Reply Box */}
                <div>
                  <h4 className="text-sm text-gray-900 mb-2">{t.sendReply}:</h4>
                  <Textarea
                    value={replyText}
                    onChange={(e) => setReplyText(e.target.value)}
                    placeholder={t.replyPlaceholder}
                    rows={4}
                    className="mb-2"
                  />
                  <div className="flex gap-2">
                    <Button
                      onClick={handleSendReply}
                      className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      {t.send}
                    </Button>
                  </div>
                </div>
              </div>

              <DialogFooter className="border-t pt-4">
                <Button variant="outline" onClick={() => setDetailsOpen(false)}>
                  {t.cancel}
                </Button>
                <Button
                  variant="destructive"
                  onClick={() => handleDelete(selectedMessage.id)}
                >
                  <Trash2 className="w-4 h-4 mr-2" />
                  {t.delete}
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
