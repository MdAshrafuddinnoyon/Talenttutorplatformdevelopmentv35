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
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { handleFetchError } from '../utils/errorHandler';

interface TicketSystemProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'bn' | 'en';
  userId?: string;
  userName?: string;
  userRole?: string;
  embedded?: boolean;
}

const content = {
  bn: {
    title: 'নতুন টিকেট তৈরি করুন',
    subtitle: 'আপনার সমস্যা বা প্রশ্ন বর্ণনা করুন',
    category: 'ক্যাটাগরি',
    selectCategory: 'ক্যাটাগরি নির্বাচন করুন',
    priority: 'অগ্রাধিকার',
    selectPriority: 'অগ্রাধিকার নির্বাচন করুন',
    subject: 'বিষয়',
    subjectPlaceholder: 'সংক্ষেপে আপনার সমস্যা লিখুন',
    description: 'বিস্তারিত',
    descriptionPlaceholder: 'আপনার সমস্যার বিস্তারিত বর্ণনা দিন...',
    attachment: 'ফাইল সংযুক্ত করুন',
    attachmentDesc: 'স্ক্রিনশট বা অন্যান্য ফাইল (ঐচ্ছিক)',
    submit: 'টিকেট জমা দিন',
    cancel: 'বাতিল',
    
    // Categories
    technical: 'টেকনিক্যাল সমস্যা',
    account: 'অ্যাকাউন্ট সমস্যা',
    payment: 'পেমেন্ট সমস্যা',
    general: 'সাধারণ প্রশ্ন',
    feature: 'নতুন ফিচার অনুরোধ',
    other: 'অন্যান্য',
    
    // Priority
    low: 'নিম্ন',
    medium: 'মাধ্যম',
    high: 'উচ্চ',
    urgent: 'জরুরী',
    
    // Messages
    successTitle: 'টিকেট তৈরি সফল!',
    successMessage: 'আপনার টিকেট নম্বর: #{ticketNumber}। আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।',
    required: 'এই ফিল্ডটি আবশ্যক',
    
    // My Tickets
    myTickets: 'আমার টিকেট',
    myTicketsDesc: 'আপনার সব সাপোর্ট টিকেট দেখুন এবং পরিচালনা করুন',
    ticketNumber: 'টিকেট #',
    status: 'অবস্থা',
    open: 'খোলা',
    inProgress: 'প্রগতিশীল',
    resolved: 'সমাধান',
    closed: 'বন্ধ',
    createdAt: 'তৈরি হয়েছে',
    lastUpdate: 'শেষ আপডেট',
    noTickets: 'কোনো টিকেট নেই',
    createFirst: 'প্রথম টিকেট তৈরি করুন',
  },
  en: {
    title: 'Create New Ticket',
    subtitle: 'Describe your issue or question',
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
    submit: 'Submit Ticket',
    cancel: 'Cancel',
    
    technical: 'Technical Issue',
    account: 'Account Issue',
    payment: 'Payment Issue',
    general: 'General Question',
    feature: 'Feature Request',
    other: 'Other',
    
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    urgent: 'Urgent',
    
    successTitle: 'Ticket Created!',
    successMessage: 'Your ticket number is: #{ticketNumber}. We will contact you soon.',
    required: 'This field is required',
    
    myTickets: 'My Tickets',
    myTicketsDesc: 'View and manage all your support tickets',
    ticketNumber: 'Ticket #',
    status: 'Status',
    open: 'Open',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
    createdAt: 'Created',
    lastUpdate: 'Last Update',
    noTickets: 'No Tickets',
    createFirst: 'Create your first ticket',
  },
};

export function TicketSystem({ open, onOpenChange, language, userId = 'user-demo', userName = 'User', userRole = 'user', embedded = false }: TicketSystemProps) {
  const t = content[language];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    priority: '',
    subject: '',
    description: '',
  });
  const [showMyTickets, setShowMyTickets] = useState(false);
  const [tickets, setTickets] = useState<any[]>([]);
  const [selectedTicket, setSelectedTicket] = useState<any>(null);
  const [replyMessage, setReplyMessage] = useState('');

  const categories = [
    { value: 'technical', label: t.technical },
    { value: 'account', label: t.account },
    { value: 'payment', label: t.payment },
    { value: 'general', label: t.general },
    { value: 'feature', label: t.feature },
    { value: 'other', label: t.other },
  ];

  const priorities = [
    { value: 'low', label: t.low, color: 'bg-gray-500' },
    { value: 'medium', label: t.medium, color: 'bg-blue-500' },
    { value: 'high', label: t.high, color: 'bg-orange-500' },
    { value: 'urgent', label: t.urgent, color: 'bg-red-500' },
  ];

  // Load user tickets
  const loadTickets = async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/tickets/user/${userId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      const data = await response.json();
      if (data.success) {
        setTickets(data.tickets || []);
      }
    } catch (error) {
      // Silent fail with proper error handling
      setTickets([]);
      handleFetchError(error, 'User tickets loading');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (open && showMyTickets) {
      loadTickets();
    }
  }, [open, showMyTickets]);

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
        setShowMyTickets(true);
        loadTickets();
      } else {
        toast.error(data.error || 'টিকেট তৈরি করতে ব্যর্থ হয়েছে');
      }
    } catch (error) {
      console.error('Create ticket error:', error);
      toast.error('একটি ত্রুটি ঘটেছে');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReply = async (ticketId: string) => {
    if (!replyMessage.trim()) {
      toast.error('মেসেজ লিখুন');
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
        toast.success('রিপ্লাই পাঠানো হয়েছে');
        setReplyMessage('');
        setSelectedTicket(data.ticket);
        loadTickets();
      } else {
        toast.error(data.error || 'রিপ্লাই পাঠাতে ব্যর্থ হয়েছে');
      }
    } catch (error) {
      console.error('Reply error:', error);
      toast.error('একটি ত্রুটি ঘটেছে');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
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
        return <CheckCircle className="w-4 h-4" />;
      default:
        return <Ticket className="w-4 h-4" />;
    }
  };

  // Reset state when dialog closes
  const handleDialogChange = (open: boolean) => {
    if (!open) {
      setShowMyTickets(false);
      setSelectedTicket(null);
      setFormData({
        category: '',
        priority: '',
        subject: '',
        description: '',
      });
    }
    onOpenChange(open);
  };

  // Main content component
  const TicketContent = () => (
    <>
      {embedded && (
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold flex items-center gap-2">
              <Ticket className="w-5 h-5 text-teal-600" />
              {showMyTickets ? t.myTickets : t.title}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              {showMyTickets ? t.myTicketsDesc : t.subtitle}
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowMyTickets(!showMyTickets)}
          >
            {showMyTickets ? 'নতুন টিকেট' : t.myTickets}
          </Button>
        </div>
      )}
      
      {!embedded && (
        <DialogHeader>
          <div className="flex items-center justify-between">
            <div>
              <DialogTitle className="flex items-center gap-2">
                <Ticket className="w-5 h-5 text-teal-600" />
                {showMyTickets ? t.myTickets : t.title}
              </DialogTitle>
              <DialogDescription>
                {showMyTickets ? t.myTicketsDesc : t.subtitle}
              </DialogDescription>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowMyTickets(!showMyTickets)}
            >
              {showMyTickets ? 'নতুন টিকেট' : t.myTickets}
            </Button>
          </div>
        </DialogHeader>
      )}

        {selectedTicket ? (
          // Ticket Details View
          <div className="py-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setSelectedTicket(null)}
              className="mb-4"
            >
              ← ফিরে যান
            </Button>
            
            <Card className="p-6 mb-4">
              <div className="flex items-start justify-between mb-4">
                <div>
                  <h3 className="text-lg font-semibold mb-2">{selectedTicket.subject}</h3>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm text-gray-600">
                      #{selectedTicket.ticketNumber}
                    </span>
                    <Badge className={getStatusColor(selectedTicket.status)}>
                      {getStatusIcon(selectedTicket.status)}
                      <span className="ml-1">
                        {t[selectedTicket.status as keyof typeof t]}
                      </span>
                    </Badge>
                    <Badge variant="outline">
                      {categories.find(c => c.value === selectedTicket.category)?.label}
                    </Badge>
                  </div>
                </div>
              </div>
              
              <p className="text-gray-700 mb-4">{selectedTicket.description}</p>
              
              <div className="text-xs text-gray-500">
                {formatDate(selectedTicket.createdAt)}
              </div>
            </Card>

            {/* Responses */}
            <div className="space-y-3 mb-4">
              <h4 className="font-medium">রিপ্লাই ({selectedTicket.responses?.length || 0})</h4>
              <ScrollArea className="h-[300px] pr-4">
                {selectedTicket.responses?.map((response: any) => (
                  <Card key={response.id} className="p-4 mb-3">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 bg-gradient-to-br from-teal-400 to-emerald-500 rounded-full flex items-center justify-center text-white text-sm">
                        {response.userName?.charAt(0) || 'A'}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">{response.userName}</span>
                          {response.userRole === 'admin' && (
                            <Badge variant="outline" className="text-xs">Admin</Badge>
                          )}
                          <span className="text-xs text-gray-500">{formatDate(response.createdAt)}</span>
                        </div>
                        <p className="text-sm text-gray-700">{response.message}</p>
                      </div>
                    </div>
                  </Card>
                ))}
              </ScrollArea>
            </div>

            {/* Reply Box */}
            {selectedTicket.status !== 'closed' && (
              <div className="space-y-2">
                <Label>আপনার রিপ্লাই</Label>
                <div className="flex gap-2">
                  <Textarea
                    value={replyMessage}
                    onChange={(e) => setReplyMessage(e.target.value)}
                    placeholder="আপনার বার্তা লিখুন..."
                    rows={3}
                    className="flex-1"
                  />
                </div>
                <Button 
                  onClick={() => handleReply(selectedTicket.id)}
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600"
                >
                  <Send className="w-4 h-4 mr-2" />
                  রিপ্লাই পাঠান
                </Button>
              </div>
            )}
          </div>
        ) : showMyTickets ? (
          // My Tickets View
          <div className="space-y-4 py-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600">মোট {tickets.length}টি টিকেট</span>
              <Button variant="ghost" size="sm" onClick={loadTickets}>
                <RefreshCw className="w-4 h-4" />
              </Button>
            </div>
            
            {isLoading ? (
              <div className="text-center py-12">
                <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-gray-600">লোড হচ্ছে...</p>
              </div>
            ) : tickets.length === 0 ? (
              <div className="text-center py-12">
                <Ticket className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg text-gray-900 mb-2">{t.noTickets}</h3>
                <p className="text-gray-600 mb-4">{t.createFirst}</p>
                <Button onClick={() => setShowMyTickets(false)}>
                  {t.title}
                </Button>
              </div>
            ) : (
              tickets.map((ticket) => (
                <Card 
                  key={ticket.id} 
                  className="p-4 hover:shadow-lg transition-shadow cursor-pointer"
                  onClick={() => setSelectedTicket(ticket)}
                >
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-mono text-sm text-gray-600">
                          #{ticket.ticketNumber}
                        </span>
                        <Badge className={getStatusColor(ticket.status)}>
                          {getStatusIcon(ticket.status)}
                          <span className="ml-1">
                            {t[ticket.status as keyof typeof t]}
                          </span>
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
                        <Calendar className="w-3 h-3" />
                        <span>{formatDate(ticket.createdAt)}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <MessageSquare className="w-3 h-3" />
                        <span>{ticket.responses?.length || 0} responses</span>
                      </div>
                    </div>
                    <span>{t.lastUpdate}: {formatDate(ticket.updatedAt)}</span>
                  </div>
                </Card>
              ))
            )}
          </div>
        ) : (
          // Create Ticket Form
          <form onSubmit={handleSubmit} className="space-y-6 py-4">
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
              />
            </div>

            {/* Description */}
            <div>
              <Label>{t.description} *</Label>
              <Textarea
                required
                rows={6}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder={t.descriptionPlaceholder}
                className="resize-none"
              />
              <div className="text-xs text-gray-500 mt-1 text-right">
                {formData.description.length}/1000
              </div>
            </div>

            {/* Attachment */}
            <div>
              <Label>{t.attachment}</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-teal-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{t.attachmentDesc}</p>
                <p className="text-xs text-gray-500 mt-1">Max 5MB - JPG, PNG, PDF</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-end gap-3 pt-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
                disabled={isSubmitting}
              >
                {t.cancel}
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                    Submitting...
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
        )}
    </>
  );
  
  // Render based on mode
  if (embedded) {
    return (
      <div className="space-y-6">
        <TicketContent />
      </div>
    );
  }

  return (
    <Dialog open={open} onOpenChange={handleDialogChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <TicketContent />
      </DialogContent>
    </Dialog>
  );
}
