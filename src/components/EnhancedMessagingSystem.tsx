import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { ScrollArea } from './ui/scroll-area';
import { 
  Send, 
  Users,
  Mail,
  MessageSquare,
  Bell,
  Target,
  Filter,
  Search,
  Calendar,
  Clock,
  CheckCircle,
  Eye,
  Trash2,
  Archive,
  Star,
  RefreshCw,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: string;
  title: string;
  content: string;
  recipientType: 'all' | 'teachers' | 'guardians' | 'students' | 'donors' | 'custom';
  recipientCount: number;
  status: 'draft' | 'scheduled' | 'sent';
  sentDate?: string;
  scheduledDate?: string;
  createdDate: string;
  openRate?: number;
  clickRate?: number;
  priority: 'low' | 'normal' | 'high';
  tags: string[];
}

interface MessageTemplate {
  id: string;
  name: string;
  title: string;
  content: string;
  category: string;
}

interface EnhancedMessagingSystemProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'মেসেজিং সিস্টেম',
    subtitle: 'ইউজারদের সাথে যোগাযোগ ও নোটিফিকেশন',
    composeMessage: 'নতুন বার্তা লিখুন',
    messages: 'বার্তা',
    templates: 'টেম্পলেট',
    statistics: 'পরিসংখ্যান',
    messageTitle: 'বার্তার শিরোনাম',
    messageContent: 'বার্তার বিষয়বস্তু',
    recipients: 'প্রাপক',
    allUsers: 'সব ইউজার',
    teachers: 'শিক্ষক',
    guardians: 'অভিভাবক',
    students: 'ছাত্র',
    donors: 'দাতা',
    customSelection: 'কাস্টম নির্বাচন',
    priority: 'অগ্রাধিকার',
    low: 'কম',
    normal: 'সাধারণ',
    high: 'উচ্চ',
    sendNow: 'এখনই পাঠান',
    schedule: 'শিডিউল করুন',
    saveDraft: 'খসড়া সংরক্ষণ',
    cancel: 'বাতিল',
    sent: 'পাঠানো',
    draft: 'খসড়া',
    scheduled: 'শিডিউলড',
    sentDate: 'পাঠানোর তারিখ',
    recipientCount: 'প্রাপক সংখ্যা',
    openRate: 'খোলার হার',
    clickRate: 'ক্লিক হার',
    view: 'দেখুন',
    edit: 'সম্পাদনা',
    delete: 'মুছুন',
    archive: 'আর্কাইভ',
    totalSent: 'মোট পাঠানো',
    avgOpenRate: 'গড় খোলার হার',
    totalRecipients: 'মোট প্রাপক',
    thisMonth: 'এই মাসে',
    search: 'খুঁজুন...',
    filter: 'ফিল্টার',
    refresh: 'রিফ্রেশ',
    selectTemplate: 'টেম্পলেট নির্বাচন করুন',
    useTemplate: 'ব্যবহার করুন',
    messageSent: 'বার্তা পাঠানো হয়েছে!',
    draftSaved: 'খসড়া সংরক্ষিত হয়েছে!',
    messageScheduled: 'বার্তা শিডিউল করা হয়েছে!',
    messageDeleted: 'বার্তা মুছে ফেলা হয়েছে!',
    tags: 'ট্যাগ',
    addTag: 'ট্যাগ যোগ করুন',
  },
  en: {
    title: 'Messaging System',
    subtitle: 'User Communication & Notifications',
    composeMessage: 'Compose New Message',
    messages: 'Messages',
    templates: 'Templates',
    statistics: 'Statistics',
    messageTitle: 'Message Title',
    messageContent: 'Message Content',
    recipients: 'Recipients',
    allUsers: 'All Users',
    teachers: 'Teachers',
    guardians: 'Guardians',
    students: 'Students',
    donors: 'Donors',
    customSelection: 'Custom Selection',
    priority: 'Priority',
    low: 'Low',
    normal: 'Normal',
    high: 'High',
    sendNow: 'Send Now',
    schedule: 'Schedule',
    saveDraft: 'Save Draft',
    cancel: 'Cancel',
    sent: 'Sent',
    draft: 'Draft',
    scheduled: 'Scheduled',
    sentDate: 'Sent Date',
    recipientCount: 'Recipient Count',
    openRate: 'Open Rate',
    clickRate: 'Click Rate',
    view: 'View',
    edit: 'Edit',
    delete: 'Delete',
    archive: 'Archive',
    totalSent: 'Total Sent',
    avgOpenRate: 'Avg Open Rate',
    totalRecipients: 'Total Recipients',
    thisMonth: 'This Month',
    search: 'Search...',
    filter: 'Filter',
    refresh: 'Refresh',
    selectTemplate: 'Select Template',
    useTemplate: 'Use Template',
    messageSent: 'Message sent!',
    draftSaved: 'Draft saved!',
    messageScheduled: 'Message scheduled!',
    messageDeleted: 'Message deleted!',
    tags: 'Tags',
    addTag: 'Add Tag',
  },
};

export function EnhancedMessagingSystem({ language }: EnhancedMessagingSystemProps) {
  const t = content[language];

  // Sample data
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'M001',
      title: 'ঈদ মোবারক অভিনন্দন',
      content: 'সবাইকে ঈদ মোবারক! Talent Tutor পরিবারের পক্ষ থেকে শুভেচ্ছা।',
      recipientType: 'all',
      recipientCount: 450,
      status: 'sent',
      sentDate: '2025-11-05',
      createdDate: '2025-11-04',
      openRate: 78.5,
      clickRate: 23.2,
      priority: 'high',
      tags: ['Announcement', 'Holiday'],
    },
    {
      id: 'M002',
      title: 'নতুন ফিচার আপডেট',
      content: 'আমরা নতুন AI ম্যাচিং সিস্টেম চালু করেছি...',
      recipientType: 'teachers',
      recipientCount: 125,
      status: 'sent',
      sentDate: '2025-11-08',
      createdDate: '2025-11-07',
      openRate: 65.3,
      clickRate: 18.7,
      priority: 'normal',
      tags: ['Feature', 'Teachers'],
    },
    {
      id: 'M003',
      title: 'সাপ্তাহিক টিপস',
      content: 'এই সপ্তাহের শীর্ষ টিপস...',
      recipientType: 'guardians',
      recipientCount: 200,
      status: 'scheduled',
      scheduledDate: '2025-11-12',
      createdDate: '2025-11-09',
      priority: 'normal',
      tags: ['Tips', 'Guardians'],
    },
  ]);

  const [templates, setTemplates] = useState<MessageTemplate[]>([
    {
      id: 'T001',
      name: 'স্বাগত বার্তা',
      title: 'Talent Tutor এ স্বাগতম!',
      content: 'প্রিয় {name},\n\nTalent Tutor পরিবারে আপনাকে স্বাগতম! আমরা আপনাকে সেরা টিউশন সেবা প্রদানে প্রতিশ্রুতিবদ্ধ...',
      category: 'Welcome',
    },
    {
      id: 'T002',
      name: 'ক্রেডিট ক্রয় ধন্যবাদ',
      title: 'ক্রেডিট ক্রয়ের জন্য ধন্যবাদ!',
      content: 'প্রিয় {name},\n\n{credits} ক্রেডিট ক্রয়ের জন্য ধন্যবাদ! আপনার লেনদেন সফল হয়েছে...',
      category: 'Transaction',
    },
    {
      id: 'T003',
      name: 'আবেদন অনুমোদন',
      title: 'আপনার আবেদন অনুমোদিত হয়েছে!',
      content: 'প্রিয় {name},\n\nঅভিনন্দন! আপনার {type} আবেদন অনুমোদন করা হয়েছে...',
      category: 'Approval',
    },
  ]);

  const [showComposeDialog, setShowComposeDialog] = useState(false);
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [showTemplateDialog, setShowTemplateDialog] = useState(false);
  
  // Form state
  const [messageTitle, setMessageTitle] = useState('');
  const [messageContent, setMessageContent] = useState('');
  const [recipientType, setRecipientType] = useState<Message['recipientType']>('all');
  const [priority, setPriority] = useState<Message['priority']>('normal');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');

  // Filter state
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'sent' | 'draft' | 'scheduled'>('all');

  // Calculate statistics
  const stats = {
    totalSent: messages.filter(m => m.status === 'sent').length,
    avgOpenRate: messages.filter(m => m.openRate).reduce((sum, m) => sum + (m.openRate || 0), 0) / Math.max(messages.filter(m => m.openRate).length, 1),
    totalRecipients: messages.reduce((sum, m) => sum + m.recipientCount, 0),
    thisMonth: messages.filter(m => m.status === 'sent' && m.sentDate?.startsWith('2025-11')).length,
  };

  const getRecipientCount = (type: Message['recipientType']): number => {
    const counts = {
      all: 450,
      teachers: 125,
      guardians: 200,
      students: 80,
      donors: 45,
      custom: 0,
    };
    return counts[type];
  };

  const handleComposeNew = () => {
    setMessageTitle('');
    setMessageContent('');
    setRecipientType('all');
    setPriority('normal');
    setTags([]);
    setSelectedMessage(null);
    setShowComposeDialog(true);
  };

  const handleUseTemplate = (template: MessageTemplate) => {
    setMessageTitle(template.title);
    setMessageContent(template.content);
    setShowTemplateDialog(false);
    toast.success('টেম্পলেট লোড করা হয়েছে!');
  };

  const handleSendNow = () => {
    if (!messageTitle || !messageContent) {
      toast.error('শিরোনাম এবং বিষয়বস্তু উভয়ই আবশ্যক!');
      return;
    }

    const newMessage: Message = {
      id: `M${String(messages.length + 1).padStart(3, '0')}`,
      title: messageTitle,
      content: messageContent,
      recipientType,
      recipientCount: getRecipientCount(recipientType),
      status: 'sent',
      sentDate: new Date().toISOString().split('T')[0],
      createdDate: new Date().toISOString().split('T')[0],
      openRate: 0,
      clickRate: 0,
      priority,
      tags,
    };

    setMessages([newMessage, ...messages]);
    toast.success(`${newMessage.recipientCount} জন ইউজারকে বার্তা পাঠানো হয়েছে!`);
    setShowComposeDialog(false);
  };

  const handleSaveDraft = () => {
    if (!messageTitle) {
      toast.error('শিরোনাম আবশ্যক!');
      return;
    }

    const newMessage: Message = {
      id: `M${String(messages.length + 1).padStart(3, '0')}`,
      title: messageTitle,
      content: messageContent,
      recipientType,
      recipientCount: getRecipientCount(recipientType),
      status: 'draft',
      createdDate: new Date().toISOString().split('T')[0],
      priority,
      tags,
    };

    setMessages([newMessage, ...messages]);
    toast.success(t.draftSaved);
    setShowComposeDialog(false);
  };

  const handleDeleteMessage = (messageId: string) => {
    if (confirm('আপনি কি নিশ্চিত এই বার্তা মুছে ফেলতে চান?')) {
      setMessages(messages.filter(m => m.id !== messageId));
      toast.success(t.messageDeleted);
    }
  };

  const handleAddTag = () => {
    if (newTag && !tags.includes(newTag)) {
      setTags([...tags, newTag]);
      setNewTag('');
    }
  };

  const handleRemoveTag = (tag: string) => {
    setTags(tags.filter(t => t !== tag));
  };

  const filteredMessages = messages.filter(message => {
    const matchesSearch = message.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         message.content.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || message.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const getStatusColor = (status: Message['status']) => {
    switch (status) {
      case 'sent': return 'bg-green-600';
      case 'scheduled': return 'bg-blue-600';
      case 'draft': return 'bg-gray-400';
      default: return 'bg-gray-500';
    }
  };

  const getPriorityColor = (priority: Message['priority']) => {
    switch (priority) {
      case 'high': return 'bg-red-600';
      case 'normal': return 'bg-blue-600';
      case 'low': return 'bg-gray-400';
      default: return 'bg-gray-500';
    }
  };

  const getRecipientTypeText = (type: Message['recipientType']) => {
    const texts = {
      all: 'সব ইউজার',
      teachers: '👨‍🏫 শিক্ষক',
      guardians: '👨‍👩‍👧 অভিভাবক',
      students: '🎓 ছাত্র',
      donors: '💝 দাতা',
      custom: '🎯 কাস্টম',
    };
    return texts[type];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl mb-2">{t.title}</h1>
        <p className="text-purple-100">{t.subtitle}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.totalSent}</p>
              <p className="text-3xl font-bold text-green-700">{stats.totalSent}</p>
              <p className="text-xs text-green-600 mt-1">
                <Send className="w-3 h-3 inline mr-1" />
                {t.thisMonth}: {stats.thisMonth}
              </p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <Mail className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.avgOpenRate}</p>
              <p className="text-3xl font-bold text-blue-700">{stats.avgOpenRate.toFixed(1)}%</p>
              <p className="text-xs text-blue-600 mt-1">
                <Eye className="w-3 h-3 inline mr-1" />
                খোলার হার
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Eye className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.totalRecipients}</p>
              <p className="text-3xl font-bold text-purple-700">{stats.totalRecipients}</p>
              <p className="text-xs text-purple-600 mt-1">
                <Users className="w-3 h-3 inline mr-1" />
                মোট প্রাপক
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <Users className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">শিডিউলড</p>
              <p className="text-3xl font-bold text-orange-700">{messages.filter(m => m.status === 'scheduled').length}</p>
              <p className="text-xs text-orange-600 mt-1">
                <Calendar className="w-3 h-3 inline mr-1" />
                পরবর্তী বার্তা
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
              <Calendar className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Actions and Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4 justify-between">
          <div className="flex gap-2">
            <Button onClick={handleComposeNew} className="bg-gradient-to-r from-purple-600 to-pink-600">
              <MessageSquare className="w-4 h-4 mr-2" />
              {t.composeMessage}
            </Button>
            <Button variant="outline" onClick={() => setShowTemplateDialog(true)}>
              <Archive className="w-4 h-4 mr-2" />
              {t.templates}
            </Button>
          </div>

          <div className="flex gap-2">
            <div className="relative flex-1 md:w-[300px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={t.search}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={statusFilter} onValueChange={(value: any) => setStatusFilter(value)}>
              <SelectTrigger className="w-[150px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder={t.filter} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব</SelectItem>
                <SelectItem value="sent">পাঠানো</SelectItem>
                <SelectItem value="scheduled">শিডিউলড</SelectItem>
                <SelectItem value="draft">খসড়া</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Messages List */}
      <Card>
        <ScrollArea className="h-[500px]">
          <div className="p-4 space-y-3">
            {filteredMessages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Card className="p-6 hover:shadow-lg transition-shadow">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold">{message.title}</h3>
                        <Badge className={getStatusColor(message.status)}>
                          {message.status === 'sent' ? t.sent :
                           message.status === 'scheduled' ? t.scheduled :
                           t.draft}
                        </Badge>
                        <Badge className={getPriorityColor(message.priority)} variant="outline">
                          {message.priority === 'high' ? '🔴 ' + t.high :
                           message.priority === 'low' ? '🔵 ' + t.low :
                           '🟡 ' + t.normal}
                        </Badge>
                      </div>

                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{message.content}</p>

                      <div className="flex flex-wrap items-center gap-4 text-sm">
                        <div className="flex items-center gap-1 text-gray-600">
                          <Target className="w-4 h-4" />
                          <span>{getRecipientTypeText(message.recipientType)}</span>
                        </div>
                        <div className="flex items-center gap-1 text-gray-600">
                          <Users className="w-4 h-4" />
                          <span>{message.recipientCount} প্রাপক</span>
                        </div>
                        {message.sentDate && (
                          <div className="flex items-center gap-1 text-gray-600">
                            <Calendar className="w-4 h-4" />
                            <span>{message.sentDate}</span>
                          </div>
                        )}
                        {message.openRate !== undefined && (
                          <div className="flex items-center gap-1 text-green-600">
                            <Eye className="w-4 h-4" />
                            <span>{message.openRate.toFixed(1)}% খোলা</span>
                          </div>
                        )}
                      </div>

                      {message.tags.length > 0 && (
                        <div className="flex gap-2 mt-3">
                          {message.tags.map((tag, index) => (
                            <Badge key={index} variant="secondary" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                        </div>
                      )}
                    </div>

                    <div className="flex gap-2 ml-4">
                      <Button size="sm" variant="outline">
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDeleteMessage(message.id)}
                      >
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}

            {filteredMessages.length === 0 && (
              <div className="text-center py-12 text-gray-500">
                <MessageSquare className="w-12 h-12 mx-auto mb-3 opacity-50" />
                <p>কোনো বার্তা পাওয়া যায়নি</p>
              </div>
            )}
          </div>
        </ScrollArea>
      </Card>

      {/* Compose Message Dialog */}
      <Dialog open={showComposeDialog} onOpenChange={setShowComposeDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.composeMessage}</DialogTitle>
            <DialogDescription>
              ইউজারদের সাথে যোগাযোগ করুন
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>{t.messageTitle} *</Label>
              <Input
                value={messageTitle}
                onChange={(e) => setMessageTitle(e.target.value)}
                placeholder="বার্তার শিরোনাম লিখুন..."
              />
            </div>

            <div>
              <Label>{t.messageContent} *</Label>
              <Textarea
                value={messageContent}
                onChange={(e) => setMessageContent(e.target.value)}
                placeholder="বার্তার বিষয়বস্তু লিখুন..."
                rows={8}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t.recipients}</Label>
                <Select value={recipientType} onValueChange={(value: any) => setRecipientType(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">সব ইউজার ({getRecipientCount('all')})</SelectItem>
                    <SelectItem value="teachers">শিক্ষক ({getRecipientCount('teachers')})</SelectItem>
                    <SelectItem value="guardians">অভিভাবক ({getRecipientCount('guardians')})</SelectItem>
                    <SelectItem value="students">ছাত্র ({getRecipientCount('students')})</SelectItem>
                    <SelectItem value="donors">দাতা ({getRecipientCount('donors')})</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{t.priority}</Label>
                <Select value={priority} onValueChange={(value: any) => setPriority(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">কম</SelectItem>
                    <SelectItem value="normal">সাধারণ</SelectItem>
                    <SelectItem value="high">উচ্চ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label>{t.tags}</Label>
              <div className="flex gap-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="ট্যাগ লিখুন..."
                  onKeyPress={(e) => e.key === 'Enter' && handleAddTag()}
                />
                <Button onClick={handleAddTag} variant="outline">
                  যোগ করুন
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag, index) => (
                  <Badge key={index} variant="secondary" className="cursor-pointer" onClick={() => handleRemoveTag(tag)}>
                    {tag} ✕
                  </Badge>
                ))}
              </div>
            </div>

            <Card className="p-4 bg-blue-50 border-blue-200">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">প্রাপক সংখ্যা</p>
                  <p className="text-2xl font-bold text-blue-600">{getRecipientCount(recipientType)}</p>
                </div>
                <Button variant="outline" onClick={() => setShowTemplateDialog(true)}>
                  <Archive className="w-4 h-4 mr-2" />
                  টেম্পলেট ব্যবহার করুন
                </Button>
              </div>
            </Card>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowComposeDialog(false)}>
              {t.cancel}
            </Button>
            <Button variant="outline" onClick={handleSaveDraft}>
              {t.saveDraft}
            </Button>
            <Button onClick={handleSendNow} className="bg-gradient-to-r from-purple-600 to-pink-600">
              <Send className="w-4 h-4 mr-2" />
              {t.sendNow}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Template Selection Dialog */}
      <Dialog open={showTemplateDialog} onOpenChange={setShowTemplateDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{t.selectTemplate}</DialogTitle>
            <DialogDescription>
              প্রস্তুত টেম্পলেট থেকে নির্বাচন করুন
            </DialogDescription>
          </DialogHeader>

          <ScrollArea className="h-[400px]">
            <div className="space-y-3">
              {templates.map((template) => (
                <Card
                  key={template.id}
                  className="p-4 cursor-pointer hover:bg-purple-50 transition-colors"
                  onClick={() => handleUseTemplate(template)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold mb-1">{template.name}</h3>
                      <Badge variant="outline" className="mb-2">{template.category}</Badge>
                      <p className="text-sm text-gray-600 line-clamp-2">{template.content}</p>
                    </div>
                    <Button size="sm" variant="outline">
                      {t.useTemplate}
                    </Button>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTemplateDialog(false)}>
              {t.cancel}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
