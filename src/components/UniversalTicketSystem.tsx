import { useState, useEffect } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Ticket, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  Upload,
  MessageSquare,
  User,
  Calendar,
  Send,
  RefreshCw,
  FileText,
  Search,
  Filter,
  XCircle,
  Plus,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { handleFetchError } from '../utils/errorHandler';

interface UniversalTicketSystemProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'bn' | 'en';
  userId: string;
  userName: string;
  userRole: 'teacher' | 'guardian' | 'student' | 'donor' | 'admin';
  embedded?: boolean;
}

const translations = {
  bn: {
    // Main titles
    title: 'সাপোর্ট টিকেট সিস্টেম',
    subtitle: 'আমাদের সাথে যোগাযোগ করুন',
    
    // Tabs
    myTickets: 'আমার টিকেট',
    createTicket: 'নতুন টিকেট',
    allTickets: 'সব টিকেট',
    
    // Form fields
    category: 'ক্যাটাগরি',
    selectCategory: 'ক্যাটাগরি নির্বাচন করুন',
    priority: 'অগ্রাধিকার',
    selectPriority: 'অগ্রাধিকার নির্বাচন করুন',
    subject: 'বিষয়',
    subjectPlaceholder: 'সংক্ষেপে আপনার সমস্যা লিখুন',
    description: 'বিস্তারিত বর্ণনা',
    descriptionPlaceholder: 'আপনার সমস্যার বিস্তারিত বর্ণনা দিন...',
    attachment: 'ফাইল সংযুক্ত করুন',
    attachmentDesc: 'স্ক্রিনশট বা অন্যান্য ফাইল (ঐচ্ছিক)',
    
    // Categories
    technical: 'টেকনিক্যাল সমস্যা',
    account: 'অ্যাকাউন্ট সমস্যা',
    payment: 'পেমেন্ট সমস্যা',
    credit: 'ক্রেডিট সমস্যা',
    tuition: 'টিউশন সংক্রান্ত',
    donation: 'দান সংক্রান্ত',
    contract: 'চুক্তি সংক্রান্ত',
    general: 'সাধারণ প্রশ্ন',
    feature: 'নতুন ফিচার অনুরোধ',
    bug: 'বাগ রিপোর্ট',
    other: 'অন্যান্য',
    
    // Priority
    low: 'নিম্ন',
    medium: 'মাধ্যম',
    high: 'উচ্চ',
    urgent: 'জরুরী',
    
    // Status
    status: 'অবস্থা',
    open: 'খোলা',
    inProgress: 'প্রগতিশীল',
    resolved: 'সমাধান',
    closed: 'বন্ধ',
    
    // Buttons
    submit: 'টিকেট জমা দিন',
    cancel: 'বাতিল',
    refresh: 'রিফ্রেশ',
    viewDetails: 'বিস্তারিত দেখুন',
    sendReply: 'রিপ্লাই পাঠান',
    backToList: 'তালিকায় ফিরুন',
    updateStatus: 'স্ট্যাটাস আপডেট',
    
    // Messages
    successTitle: 'টিকেট তৈরি সফল!',
    successMessage: 'আপনার টিকেট নম্বর: #{ticketNumber}। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
    required: 'এই ফিল্ডটি আবশ্যক',
    loading: 'লোড হচ্ছে...',
    noTickets: 'কোনো টিকেট নেই',
    createFirst: 'প্রথম টিকেট তৈরি করুন',
    replySent: 'রিপ্লাই পাঠানো হয়েছে',
    statusUpdated: 'স্ট্যাটাস আপডেট হয়েছে',
    
    // Ticket details
    ticketNumber: 'টিকেট নম্বর',
    createdAt: 'তৈরি হয়েছে',
    lastUpdate: 'শেষ আপডেট',
    responses: 'রিপ্লাই',
    yourReply: 'আপনার রিপ্লাই',
    typeMessage: 'আপনার বার্তা লিখুন...',
    
    // Filters
    filterByStatus: 'স্ট্যাটাস অনুযায়ী ফিল্টার',
    filterByCategory: 'ক্যাটাগরি অনুযায়ী ফিল্টার',
    all: 'সব',
    search: 'খুঁজুন...',
    
    // User roles
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    student: 'ছাত্র',
    donor: 'দাতা',
    admin: 'এডমিন',
    
    // Stats
    totalTickets: 'মোট টিকেট',
    openTickets: 'খোলা টিকেট',
    resolvedTickets: 'সমাধান করা টিকেট',
  },
  en: {
    // Main titles
    title: 'Support Ticket System',
    subtitle: 'Get in touch with us',
    
    // Tabs
    myTickets: 'My Tickets',
    createTicket: 'Create Ticket',
    allTickets: 'All Tickets',
    
    // Form fields
    category: 'Category',
    selectCategory: 'Select category',
    priority: 'Priority',
    selectPriority: 'Select priority',
    subject: 'Subject',
    subjectPlaceholder: 'Brief summary of your issue',
    description: 'Description',
    descriptionPlaceholder: 'Provide detailed description of your issue...',
    attachment: 'Attach File',
    attachmentDesc: 'Screenshots or other files (optional)',
    
    // Categories
    technical: 'Technical Issue',
    account: 'Account Issue',
    payment: 'Payment Issue',
    credit: 'Credit Issue',
    tuition: 'Tuition Related',
    donation: 'Donation Related',
    contract: 'Contract Related',
    general: 'General Question',
    feature: 'Feature Request',
    bug: 'Bug Report',
    other: 'Other',
    
    // Priority
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
    
    // Status
    status: 'Status',
    open: 'Open',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
    
    // Buttons
    submit: 'Submit Ticket',
    cancel: 'Cancel',
    refresh: 'Refresh',
    viewDetails: 'View Details',
    sendReply: 'Send Reply',
    backToList: 'Back to List',
    updateStatus: 'Update Status',
    
    // Messages
    successTitle: 'Ticket Created!',
    successMessage: 'Your ticket number is: #{ticketNumber}. We will contact you soon.',
    required: 'This field is required',
    loading: 'Loading...',
    noTickets: 'No Tickets',
    createFirst: 'Create your first ticket',
    replySent: 'Reply sent successfully',
    statusUpdated: 'Status updated successfully',
    
    // Ticket details
    ticketNumber: 'Ticket Number',
    createdAt: 'Created',
    lastUpdate: 'Last Update',
    responses: 'Responses',
    yourReply: 'Your Reply',
    typeMessage: 'Type your message...',
    
    // Filters
    filterByStatus: 'Filter by Status',
    filterByCategory: 'Filter by Category',
    all: 'All',
    search: 'Search...',
    
    // User roles
    teacher: 'Teacher',
    guardian: 'Guardian',
    student: 'Student',
    donor: 'Donor',
    admin: 'Admin',
    
    // Stats
    totalTickets: 'Total Tickets',
    openTickets: 'Open Tickets',
    resolvedTickets: 'Resolved Tickets',
  },
};

export function UniversalTicketSystem({ 
  open, 
  onOpenChange, 
  language, 
  userId, 
  userName, 
  userRole,
  embedded = false 
}: UniversalTicketSystemProps) {
  const t = translations[language];
  const [activeTab, setActiveTab] = useState('my-tickets');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  
  const [formData, setFormData] = useState({
    category: '',
    priority: '',
    subject: '',
    description: '',
  });

  const categories = [
    { value: 'technical', label: t.technical },
    { value: 'account', label: t.account },
    { value: 'payment', label: t.payment },
    { value: 'credit', label: t.credit },
    { value: 'tuition', label: t.tuition },
    { value: 'donation', label: t.donation },
    { value: 'contract', label: t.contract },
    { value: 'general', label: t.general },
    { value: 'feature', label: t.feature },
    { value: 'bug', label: t.bug },
    { value: 'other', label: t.other },
  ];

  const priorities = [
    { value: 'low', label: t.low, color: 'bg-gray-500' },
    { value: 'medium', label: t.medium, color: 'bg-blue-500' },
    { value: 'high', label: t.high, color: 'bg-orange-500' },
    { value: 'urgent', label: t.urgent, color: 'bg-red-500' },
  ];

  const statuses = [
    { value: 'all', label: t.all },
    { value: 'open', label: t.open },
    { value: 'inProgress', label: t.inProgress },
    { value: 'resolved', label: t.resolved },
    { value: 'closed', label: t.closed },
  ];

  // Load tickets
  const loadTickets = async () => {
    try {
      setIsLoading(true);
      const endpoint = userRole === 'admin' 
        ? `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/tickets`
        : `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/tickets/user/${userId}`;
      
      const response = await fetch(endpoint, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });

      const data = await response.json();
      if (data.success) {
        setTickets(data.tickets || []);
      }
    } catch (error) {
      // Silent fail with proper error handling
      setTickets([]);
      handleFetchError(error, 'Universal tickets loading');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      loadTickets();
    }
  }, [open, userId]);

  // Submit new ticket
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.category || !formData.priority || !formData.subject || !formData.description) {
      toast.error(t.required);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/ticket/create`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            userId,
            userName,
            userRole,
            category: formData.category,
            priority: formData.priority,
            subject: formData.subject,
            description: formData.description,
          }),
        }
      );

      const data = await response.json();
      
      if (data.success) {
        toast.success(t.successMessage.replace('{ticketNumber}', data.ticket.ticketNumber));
        
        // Reset form
        setFormData({
          category: '',
          priority: '',
          subject: '',
          description: '',
        });
        
        // Switch to my tickets view
        setActiveTab('my-tickets');
        loadTickets();
      } else {
        toast.error(data.error || (language === 'bn' ? 'টিকেট তৈরি করতে ব্যর্থ হয়েছে' : 'Failed to create ticket'));
      }
    } catch (error) {
      console.error('Create ticket error:', error);
      toast.error(language === 'bn' ? 'একটি ত্রুটি ঘটেছে' : 'An error occurred');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Send reply
  const handleReply = async (ticketId: string) => {
    if (!replyMessage.trim()) {
      toast.error(language === 'bn' ? 'মেসেজ লিখুন' : 'Please type a message');
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/ticket/${ticketId}/reply`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            userId,
            userName,
            userRole,
            message: replyMessage,
          }),
        }
      );

      const data = await response.json();
      
      if (data.success) {
        toast.success(t.replySent);
        setReplyMessage('');
        setSelectedTicket(data.ticket);
        loadTickets();
      } else {
        toast.error(data.error || (language === 'bn' ? 'রিপ্লাই পাঠাতে ব্যর্থ হয়েছে' : 'Failed to send reply'));
      }
    } catch (error) {
      console.error('Reply error:', error);
      toast.error(language === 'bn' ? 'একটি ত্রুটি ঘটেছে' : 'An error occurred');
    }
  };

  // Update ticket status (admin only)
  const handleUpdateStatus = async (ticketId: string, newStatus: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/tickets/${ticketId}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ status: newStatus }),
        }
      );

      const data = await response.json();
      
      if (data.success) {
        toast.success(t.statusUpdated);
        setSelectedTicket(data.ticket);
        loadTickets();
      } else {
        toast.error(data.error || (language === 'bn' ? 'স্ট্যাটাস আপডেট করতে ব্যর্থ হয়েছে' : 'Failed to update status'));
      }
    } catch (error) {
      console.error('Update status error:', error);
      toast.error(language === 'bn' ? 'একটি ত্রুটি ঘটেছে' : 'An error occurred');
    }
  };

  // Utility functions
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'open':
        return 'bg-green-100 text-green-800';
      case 'inProgress':
        return 'bg-blue-100 text-blue-800';
      case 'resolved':
        return 'bg-purple-100 text-purple-800';
      case 'closed':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4" />;
      case 'inProgress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'closed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <Ticket className="w-4 h-4" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'low':
        return 'bg-gray-100 text-gray-700';
      case 'medium':
        return 'bg-blue-100 text-blue-700';
      case 'high':
        return 'bg-orange-100 text-orange-700';
      case 'urgent':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  // Filter tickets
  const filteredTickets = tickets.filter(ticket => {
    if (statusFilter !== 'all' && ticket.status !== statusFilter) return false;
    if (categoryFilter !== 'all' && ticket.category !== categoryFilter) return false;
    if (searchQuery && !ticket.subject.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !ticket.description.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  // Stats
  const stats = {
    total: tickets.length,
    open: tickets.filter(t => t.status === 'open').length,
    resolved: tickets.filter(t => t.status === 'resolved').length,
  };

  // Render ticket details
  const renderTicketDetails = () => {
    if (!selectedTicket) return null;

    return (
      <div className="space-y-6">
        <Button 
          variant="ghost" 
          size="sm" 
          onClick={() => setSelectedTicket(null)}
          className="mb-4"
        >
          ← {t.backToList}
        </Button>
        
        {/* Ticket Header */}
        <Card className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h3 className="text-xl">{selectedTicket.subject}</h3>
                <Badge className={getStatusColor(selectedTicket.status)}>
                  {getStatusIcon(selectedTicket.status)}
                  <span className="ml-1">
                    {t[selectedTicket.status as keyof typeof t]}
                  </span>
                </Badge>
                <Badge className={getPriorityColor(selectedTicket.priority)}>
                  {priorities.find(p => p.value === selectedTicket.priority)?.label}
                </Badge>
              </div>
              
              <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                <div className="flex items-center gap-1">
                  <FileText className="w-4 h-4" />
                  <span className="font-mono">{selectedTicket.ticketNumber}</span>
                </div>
                <div className="flex items-center gap-1">
                  <User className="w-4 h-4" />
                  <span>{selectedTicket.userName} ({t[selectedTicket.userRole as keyof typeof t]})</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-4 h-4" />
                  <span>{formatDate(selectedTicket.createdAt)}</span>
                </div>
              </div>
              
              <Badge variant="outline">
                {categories.find(c => c.value === selectedTicket.category)?.label}
              </Badge>
            </div>
            
            {/* Admin status update */}
            {userRole === 'admin' && (
              <div className="w-48">
                <Label className="text-xs">{t.updateStatus}</Label>
                <Select
                  value={selectedTicket.status}
                  onValueChange={(value) => handleUpdateStatus(selectedTicket.id, value)}
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="open">{t.open}</SelectItem>
                    <SelectItem value="inProgress">{t.inProgress}</SelectItem>
                    <SelectItem value="resolved">{t.resolved}</SelectItem>
                    <SelectItem value="closed">{t.closed}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            )}
          </div>
          
          <div className="border-t pt-4">
            <p className="text-gray-700 whitespace-pre-wrap">{selectedTicket.description}</p>
          </div>
        </Card>

        {/* Responses */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h4 className="flex items-center gap-2">
              <MessageSquare className="w-5 h-5 text-teal-600" />
              {t.responses} ({selectedTicket.responses?.length || 0})
            </h4>
          </div>
          
          <ScrollArea className="h-[400px] border rounded-lg p-4 bg-gray-50">
            <div className="space-y-4">
              {selectedTicket.responses && selectedTicket.responses.length > 0 ? (
                selectedTicket.responses.map((response: any) => (
                  <Card 
                    key={response.id} 
                    className={`p-4 ${response.userRole === 'admin' ? 'bg-teal-50 border-teal-200' : 'bg-white'}`}
                  >
                    <div className="flex items-start gap-3">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white ${
                        response.userRole === 'admin' 
                          ? 'bg-gradient-to-br from-teal-500 to-emerald-600' 
                          : 'bg-gradient-to-br from-blue-500 to-indigo-600'
                      }`}>
                        {response.userName?.charAt(0) || 'U'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="font-medium">{response.userName}</span>
                          {response.userRole === 'admin' && (
                            <Badge variant="outline" className="text-xs bg-teal-100 border-teal-300">
                              {t.admin}
                            </Badge>
                          )}
                          <span className="text-xs text-gray-500">
                            {formatDate(response.createdAt)}
                          </span>
                        </div>
                        <p className="text-gray-700 whitespace-pre-wrap">{response.message}</p>
                      </div>
                    </div>
                  </Card>
                ))
              ) : (
                <div className="text-center py-8 text-gray-500">
                  <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                  <p>{language === 'bn' ? 'এখনো কোনো রিপ্লাই নেই' : 'No responses yet'}</p>
                </div>
              )}
            </div>
          </ScrollArea>
        </div>

        {/* Reply Box */}
        {selectedTicket.status !== 'closed' && (
          <Card className="p-4">
            <Label className="mb-2 block">{t.yourReply}</Label>
            <Textarea
              value={replyMessage}
              onChange={(e) => setReplyMessage(e.target.value)}
              placeholder={t.typeMessage}
              rows={4}
              className="mb-3"
            />
            <Button 
              onClick={() => handleReply(selectedTicket.id)}
              className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
              disabled={!replyMessage.trim()}
            >
              <Send className="w-4 h-4 mr-2" />
              {t.sendReply}
            </Button>
          </Card>
        )}
      </div>
    );
  };

  // Render tickets list
  const renderTicketsList = () => {
    return (
      <div className="space-y-4">
        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.totalTickets}</p>
                <p className="text-2xl font-bold text-blue-700">{stats.total}</p>
              </div>
              <Ticket className="w-8 h-8 text-blue-500" />
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.openTickets}</p>
                <p className="text-2xl font-bold text-green-700">{stats.open}</p>
              </div>
              <AlertCircle className="w-8 h-8 text-green-500" />
            </div>
          </Card>
          
          <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-gray-600">{t.resolvedTickets}</p>
                <p className="text-2xl font-bold text-purple-700">{stats.resolved}</p>
              </div>
              <CheckCircle className="w-8 h-8 text-purple-500" />
            </div>
          </Card>
        </div>

        {/* Filters */}
        <Card className="p-4">
          <div className="grid md:grid-cols-3 gap-4">
            <div>
              <Label className="text-xs mb-1">{t.search}</Label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t.search}
                  className="pl-9"
                />
              </div>
            </div>
            
            <div>
              <Label className="text-xs mb-1">{t.filterByStatus}</Label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {statuses.map(s => (
                    <SelectItem key={s.value} value={s.value}>{s.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div>
              <Label className="text-xs mb-1">{t.filterByCategory}</Label>
              <Select value={categoryFilter} onValueChange={setCategoryFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.all}</SelectItem>
                  {categories.map(c => (
                    <SelectItem key={c.value} value={c.value}>{c.label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </Card>

        {/* Tickets */}
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">
            {language === 'bn' 
              ? `${filteredTickets.length}টি টিকেট পাওয়া গেছে` 
              : `${filteredTickets.length} tickets found`}
          </span>
          <Button variant="ghost" size="sm" onClick={loadTickets} disabled={isLoading}>
            <RefreshCw className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`} />
          </Button>
        </div>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="w-12 h-12 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">{t.loading}</p>
          </div>
        ) : filteredTickets.length === 0 ? (
          <div className="text-center py-12">
            <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg text-gray-900 mb-2">{t.noTickets}</h3>
            <p className="text-gray-600 mb-4">{t.createFirst}</p>
            <Button onClick={() => setActiveTab('create')}>
              <Plus className="w-4 h-4 mr-2" />
              {t.createTicket}
            </Button>
          </div>
        ) : (
          <ScrollArea className="h-[500px]">
            <div className="space-y-3">
              {filteredTickets.map((ticket) => (
                <Card 
                  key={ticket.id} 
                  className="p-4 hover:shadow-lg transition-all cursor-pointer hover:border-teal-300"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-sm text-gray-600">
                          {ticket.ticketNumber}
                        </span>
                        <Badge className={getStatusColor(ticket.status)}>
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1">
                            {t[ticket.status as keyof typeof t]}
                          </span>
                        </Badge>
                        <Badge className={getPriorityColor(ticket.priority)}>
                          {priorities.find(p => p.value === ticket.priority)?.label}
                        </Badge>
                        <Badge variant="outline">
                          {categories.find(c => c.value === ticket.category)?.label}
                        </Badge>
                      </div>
                      <h4 className="font-medium text-gray-900 mb-1">
                        {ticket.subject}
                      </h4>
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {ticket.description}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-xs text-gray-500 pt-3 border-t">
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-1">
                        <User className="w-3 h-3" />
                        <span>{ticket.userName}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(ticket.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>{ticket.responses?.length || 0}</span>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </ScrollArea>
        )}
      </div>
    );
  };

  // Render create form
  const renderCreateForm = () => {
    return (
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          {/* Category */}
          <div>
            <Label>{t.category} *</Label>
            <Select
              value={formData.category}
              onValueChange={(value) => setFormData({ ...formData, category: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.selectCategory} />
              </SelectTrigger>
              <SelectContent>
                {categories.map((cat) => (
                  <SelectItem key={cat.value} value={cat.value}>
                    {cat.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Priority */}
          <div>
            <Label>{t.priority} *</Label>
            <Select
              value={formData.priority}
              onValueChange={(value) => setFormData({ ...formData, priority: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder={t.selectPriority} />
              </SelectTrigger>
              <SelectContent>
                {priorities.map((priority) => (
                  <SelectItem key={priority.value} value={priority.value}>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${priority.color}`} />
                      {priority.label}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Subject */}
        <div>
          <Label>{t.subject} *</Label>
          <Input
            required
            value={formData.subject}
            onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
            placeholder={t.subjectPlaceholder}
            maxLength={200}
          />
        </div>

        {/* Description */}
        <div>
          <Label>{t.description} *</Label>
          <Textarea
            required
            rows={8}
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            placeholder={t.descriptionPlaceholder}
            className="resize-none"
            maxLength={2000}
          />
          <div className="text-xs text-gray-500 mt-1 text-right">
            {formData.description.length}/2000
          </div>
        </div>

        {/* Attachment */}
        <div>
          <Label>{t.attachment}</Label>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
            <Upload className="w-10 h-10 text-gray-400 mx-auto mb-3" />
            <p className="text-sm text-gray-600 mb-1">{t.attachmentDesc}</p>
            <p className="text-xs text-gray-500">Max 10MB - JPG, PNG, PDF, DOC</p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button
            type="button"
            variant="outline"
            onClick={() => !embedded && onOpenChange(false)}
            disabled={isSubmitting}
          >
            {t.cancel}
          </Button>
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 min-w-[150px]"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                {language === 'bn' ? 'জমা দেওয়া হচ্ছে...' : 'Submitting...'}
              </>
            ) : (
              <>
                <Ticket className="w-4 h-4 mr-2" />
                {t.submit}
              </>
            )}
          </Button>
        </div>
      </form>
    );
  };

  // Main content
  const MainContent = () => {
    if (selectedTicket) {
      return renderTicketDetails();
    }

    return (
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2 mb-6">
          <TabsTrigger value="my-tickets">
            <Ticket className="w-4 h-4 mr-2" />
            {userRole === 'admin' ? t.allTickets : t.myTickets}
          </TabsTrigger>
          <TabsTrigger value="create">
            <Plus className="w-4 h-4 mr-2" />
            {t.createTicket}
          </TabsTrigger>
        </TabsList>

        <TabsContent value="my-tickets">
          {renderTicketsList()}
        </TabsContent>

        <TabsContent value="create">
          {renderCreateForm()}
        </TabsContent>
      </Tabs>
    );
  };

  // Render based on mode
  if (embedded) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl flex items-center gap-3">
              <Ticket className="w-7 h-7 text-teal-600" />
              {t.title}
            </h2>
            <p className="text-gray-600 mt-1">{t.subtitle}</p>
          </div>
        </div>
        <MainContent />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[95vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Ticket className="w-6 h-6 text-teal-600" />
            {t.title}
          </DialogTitle>
          <DialogDescription>{t.subtitle}</DialogDescription>
        </DialogHeader>
        <MainContent />
      </DialogContent>
    </Dialog>
  );
}
