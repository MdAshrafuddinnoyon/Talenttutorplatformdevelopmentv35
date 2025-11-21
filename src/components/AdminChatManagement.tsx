import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Avatar } from './ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Textarea } from './ui/textarea';
import {
  MessageSquare, Search, Filter, Send, User, Users,
  GraduationCap, Clock, CheckCircle, AlertCircle,
  MoreVertical, Eye, Trash2, Ban, CheckCheck, Heart
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface ChatMessage {
  id: string;
  senderId: string;
  senderName: string;
  senderType: 'teacher' | 'guardian' | 'student' | 'donor';
  recipientId?: string;
  recipientName?: string;
  message: string;
  timestamp: string;
  status: 'pending' | 'read' | 'replied';
  category: 'support' | 'chat' | 'ticket';
}

interface AdminChatManagementProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: '💬 চ্যাট ও টিকেট ব্যবস্থাপনা',
    subtitle: 'সব যোগাযোগ এক জায়গায়',
    allMessages: 'সব মেসেজ',
    supportTickets: 'সাপোর্ট টিকেট',
    teacherGuardianChats: 'শিক্ষক-অভিভাবক চ্যাট',
    pendingMessages: 'পেন্ডিং',
    repliedMessages: 'রিপ্লাই করা',
    search: 'খুঁজুন',
    searchPlaceholder: 'নাম বা বার্তায় খুঁজুন...',
    filterByType: 'ধরন',
    all: 'সব',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    student: 'ছাত্র',
    donor: 'দাতা',
    reply: 'রিপ্লাই',
    viewConversation: 'কথোপকথন দেখুন',
    delete: 'মুছুন',
    markAsRead: 'পড়া হয়েছে',
    pending: 'পেন্ডিং',
    replied: 'রিপ্লাই করা',
    read: 'পড়া হয়েছে',
    sendReply: 'রিপ্লাই পাঠান',
    yourReply: 'আপনার রিপ্লাই',
    replyPlaceholder: 'রিপ্লাই লিখুন...',
    send: 'পাঠান',
    cancel: 'বাতিল',
    noMessages: 'কোন মেসেজ নেই',
    from: 'প্রেরক',
    to: 'প্রাপক',
    message: 'বার্তা',
    time: 'সময়',
    status: 'স্ট্যাটাস',
    actions: 'অ্যাকশন',
    totalMessages: 'মোট মেসেজ',
    pendingCount: 'পেন্ডিং',
    repliedCount: 'রিপ্লাই করা',
    supportCategory: 'সাপোর্ট',
    chatCategory: 'চ্যাট',
    ticketCategory: 'টিকেট',
    replySent: 'রিপ্লাই পাঠানো হয়েছে',
    messageDeleted: 'মেসেজ মুছে ফেলা হয়েছে',
    markedAsRead: 'পড়া হয়েছে হিসেবে চিহ্নিত',
  },
  en: {
    title: '💬 Chat & Ticket Management',
    subtitle: 'All communications in one place',
    allMessages: 'All Messages',
    supportTickets: 'Support Tickets',
    teacherGuardianChats: 'Teacher-Guardian Chats',
    pendingMessages: 'Pending',
    repliedMessages: 'Replied',
    search: 'Search',
    searchPlaceholder: 'Search by name or message...',
    filterByType: 'Type',
    all: 'All',
    teacher: 'Teacher',
    guardian: 'Guardian',
    student: 'Student',
    donor: 'Donor',
    reply: 'Reply',
    viewConversation: 'View Conversation',
    delete: 'Delete',
    markAsRead: 'Mark as Read',
    pending: 'Pending',
    replied: 'Replied',
    read: 'Read',
    sendReply: 'Send Reply',
    yourReply: 'Your Reply',
    replyPlaceholder: 'Type your reply...',
    send: 'Send',
    cancel: 'Cancel',
    noMessages: 'No messages',
    from: 'From',
    to: 'To',
    message: 'Message',
    time: 'Time',
    status: 'Status',
    actions: 'Actions',
    totalMessages: 'Total Messages',
    pendingCount: 'Pending',
    repliedCount: 'Replied',
    supportCategory: 'Support',
    chatCategory: 'Chat',
    ticketCategory: 'Ticket',
    replySent: 'Reply sent',
    messageDeleted: 'Message deleted',
    markedAsRead: 'Marked as read',
  }
};

// Mock data
const mockMessages: ChatMessage[] = [
  {
    id: '1',
    senderId: '101',
    senderName: 'মোঃ করিম উদ্দিন',
    senderType: 'teacher',
    message: 'আমি কিভাবে আমার প্রোফাইল ভেরিফাই করব?',
    timestamp: '২০২৫-১১-০২ ১০:৩০',
    status: 'pending',
    category: 'support',
  },
  {
    id: '2',
    senderId: '102',
    senderName: 'মিসেস রহিমা খাতুন',
    senderType: 'guardian',
    recipientId: '101',
    recipientName: 'মোঃ করিম উদ্দিন',
    message: 'আগামীকাল কি ক্লাস নিতে পারবেন?',
    timestamp: '২০২৫-১১-০২ ১১:১৫',
    status: 'read',
    category: 'chat',
  },
  {
    id: '3',
    senderId: '103',
    senderName: 'সাকিব হাসান',
    senderType: 'student',
    message: 'আমার আবেদনের অবস্থা কি? আমি ৩ দিন ধরে অপেক্ষা করছি।',
    timestamp: '২০২৫-১১-০২ ০৯:৪৫',
    status: 'pending',
    category: 'ticket',
  },
  {
    id: '4',
    senderId: '104',
    senderName: 'জনাব আলী আহমেদ',
    senderType: 'donor',
    message: 'আমার দানের রসিদ কোথায় পাব?',
    timestamp: '২০২৫-১১-০২ ১২:০০',
    status: 'replied',
    category: 'support',
  },
];

export function AdminChatManagement({ language }: AdminChatManagementProps) {
  const t = content[language];
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [activeTab, setActiveTab] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState<ChatMessage | null>(null);
  const [replyDialog, setReplyDialog] = useState(false);
  const [replyText, setReplyText] = useState('');

  // Filter messages
  const filteredMessages = messages.filter(msg => {
    const matchesSearch = 
      msg.senderName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      msg.message.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesType = typeFilter === 'all' || msg.senderType === typeFilter;
    
    const matchesTab = 
      activeTab === 'all' ||
      (activeTab === 'support' && msg.category === 'support') ||
      (activeTab === 'chats' && msg.category === 'chat') ||
      (activeTab === 'pending' && msg.status === 'pending') ||
      (activeTab === 'replied' && msg.status === 'replied');
    
    return matchesSearch && matchesType && matchesTab;
  });

  // Statistics
  const stats = {
    total: messages.length,
    pending: messages.filter(m => m.status === 'pending').length,
    replied: messages.filter(m => m.status === 'replied').length,
    support: messages.filter(m => m.category === 'support').length,
    chats: messages.filter(m => m.category === 'chat').length,
  };

  const getUserTypeIcon = (type: string) => {
    switch (type) {
      case 'teacher': return <GraduationCap className="w-4 h-4 text-blue-600" />;
      case 'guardian': return <Users className="w-4 h-4 text-teal-600" />;
      case 'student': return <User className="w-4 h-4 text-green-600" />;
      case 'donor': return <Heart className="w-4 h-4 text-rose-600" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getStatusBadge = (status: string) => {
    const badges = {
      pending: { label: t.pending, className: 'bg-amber-100 text-amber-700 border-amber-300' },
      read: { label: t.read, className: 'bg-blue-100 text-blue-700 border-blue-300' },
      replied: { label: t.replied, className: 'bg-green-100 text-green-700 border-green-300' },
    };
    const badge = badges[status as keyof typeof badges];
    return (
      <Badge variant="outline" className={badge.className}>
        {badge.label}
      </Badge>
    );
  };

  const getCategoryBadge = (category: string) => {
    const badges = {
      support: { label: t.supportCategory, className: 'bg-teal-50 text-teal-700' },
      chat: { label: t.chatCategory, className: 'bg-blue-50 text-blue-700' },
      ticket: { label: t.ticketCategory, className: 'bg-orange-50 text-orange-700' },
    };
    const badge = badges[category as keyof typeof badges];
    return <Badge className={badge.className}>{badge.label}</Badge>;
  };

  const handleSendReply = () => {
    if (!replyText.trim() || !selectedMessage) {
      toast.error(language === 'bn' ? 'রিপ্লাই লিখুন' : 'Write a reply');
      return;
    }

    setMessages(messages.map(msg => 
      msg.id === selectedMessage.id 
        ? { ...msg, status: 'replied' as const }
        : msg
    ));

    toast.success(t.replySent);
    setReplyDialog(false);
    setReplyText('');
    setSelectedMessage(null);
  };

  const handleMarkAsRead = (msgId: string) => {
    setMessages(messages.map(msg => 
      msg.id === msgId 
        ? { ...msg, status: 'read' as const }
        : msg
    ));
    toast.success(t.markedAsRead);
  };

  const handleDelete = (msgId: string) => {
    setMessages(messages.filter(msg => msg.id !== msgId));
    toast.success(t.messageDeleted);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white rounded-xl p-8 shadow-lg">
        <h2 className="text-3xl font-bold mb-2">{t.title}</h2>
        <p className="text-teal-100">{t.subtitle}</p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <Card className="p-4 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <div className="text-sm text-gray-600 mb-1">{t.totalMessages}</div>
          <div className="text-2xl font-bold text-blue-600">{stats.total}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-amber-50 to-amber-100 border-amber-200">
          <div className="text-sm text-gray-600 mb-1">{t.pendingCount}</div>
          <div className="text-2xl font-bold text-amber-600">{stats.pending}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <div className="text-sm text-gray-600 mb-1">{t.repliedCount}</div>
          <div className="text-2xl font-bold text-green-600">{stats.replied}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-teal-50 to-teal-100 border-teal-200">
          <div className="text-sm text-gray-600 mb-1">{t.supportCategory}</div>
          <div className="text-2xl font-bold text-teal-600">{stats.support}</div>
        </Card>
        <Card className="p-4 bg-gradient-to-br from-cyan-50 to-cyan-100 border-cyan-200">
          <div className="text-sm text-gray-600 mb-1">{t.chatCategory}</div>
          <div className="text-2xl font-bold text-cyan-600">{stats.chats}</div>
        </Card>
      </div>

      {/* Main Content */}
      <Card className="p-6">
        {/* Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-6">
          <TabsList className="grid w-full grid-cols-5 bg-gray-100">
            <TabsTrigger value="all">{t.allMessages}</TabsTrigger>
            <TabsTrigger value="support">{t.supportTickets}</TabsTrigger>
            <TabsTrigger value="chats">{t.teacherGuardianChats}</TabsTrigger>
            <TabsTrigger value="pending">
              {t.pendingMessages}
              {stats.pending > 0 && (
                <Badge className="ml-2 bg-amber-500 text-white">{stats.pending}</Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="replied">{t.repliedMessages}</TabsTrigger>
          </TabsList>
        </Tabs>

        {/* Filters */}
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
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500"
          >
            <option value="all">{t.all}</option>
            <option value="teacher">{t.teacher}</option>
            <option value="guardian">{t.guardian}</option>
            <option value="student">{t.student}</option>
            <option value="donor">{t.donor}</option>
          </select>
        </div>

        {/* Messages List */}
        <ScrollArea className="h-[600px]">
          <div className="space-y-3">
            {filteredMessages.length === 0 ? (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>{t.noMessages}</p>
              </div>
            ) : (
              filteredMessages.map((msg) => (
                <motion.div
                  key={msg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white border border-gray-200 rounded-lg p-4 hover:border-teal-300 hover:shadow-md transition-all"
                >
                  <div className="flex items-start gap-4">
                    {/* Avatar */}
                    <Avatar className="w-12 h-12 flex-shrink-0">
                      <div className="w-full h-full bg-gradient-to-br from-teal-400 to-pink-400 flex items-center justify-center">
                        {getUserTypeIcon(msg.senderType)}
                      </div>
                    </Avatar>

                    {/* Content */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <div className="flex items-center gap-2 mb-1">
                            <h4 className="font-semibold text-gray-900">{msg.senderName}</h4>
                            {getUserTypeIcon(msg.senderType)}
                            {getCategoryBadge(msg.category)}
                          </div>
                          {msg.recipientName && (
                            <div className="flex items-center gap-1 text-sm text-gray-600">
                              <span className="text-xs">{t.to}:</span>
                              <span className="font-medium">{msg.recipientName}</span>
                            </div>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          {getStatusBadge(msg.status)}
                        </div>
                      </div>

                      <p className="text-gray-700 mb-3">{msg.message}</p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2 text-sm text-gray-500">
                          <Clock className="w-3 h-3" />
                          <span>{msg.timestamp}</span>
                        </div>

                        <div className="flex items-center gap-2">
                          {msg.status === 'pending' && (
                            <>
                              <Button
                                size="sm"
                                onClick={() => {
                                  setSelectedMessage(msg);
                                  setReplyDialog(true);
                                }}
                                className="bg-teal-600 hover:bg-teal-700"
                              >
                                <Send className="w-3 h-3 mr-1" />
                                {t.reply}
                              </Button>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => handleMarkAsRead(msg.id)}
                              >
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {t.markAsRead}
                              </Button>
                            </>
                          )}
                          {msg.status === 'replied' && (
                            <Badge className="bg-green-100 text-green-700">
                              <CheckCheck className="w-3 h-3 mr-1" />
                              {t.replied}
                            </Badge>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => handleDelete(msg.id)}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-3 h-3" />
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

      {/* Reply Dialog */}
      <Dialog open={replyDialog} onOpenChange={setReplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.sendReply}</DialogTitle>
            <DialogDescription>মূল বার্তার উত্তর দিন</DialogDescription>
          </DialogHeader>
          {selectedMessage && (
            <div className="space-y-4 py-4">
              {/* Original Message */}
              <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
                <div className="flex items-center gap-2 mb-2">
                  <strong>{selectedMessage.senderName}</strong>
                  {getUserTypeIcon(selectedMessage.senderType)}
                </div>
                <p className="text-gray-700">{selectedMessage.message}</p>
                <p className="text-xs text-gray-500 mt-2">{selectedMessage.timestamp}</p>
              </div>

              {/* Reply Input */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  {t.yourReply}
                </label>
                <Textarea
                  value={replyText}
                  onChange={(e) => setReplyText(e.target.value)}
                  placeholder={t.replyPlaceholder}
                  rows={6}
                  className="w-full"
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setReplyDialog(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleSendReply} className="bg-teal-600 hover:bg-teal-700">
              <Send className="w-4 h-4 mr-2" />
              {t.send}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
