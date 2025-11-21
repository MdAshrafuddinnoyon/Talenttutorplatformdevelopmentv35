import { useState, useRef, useEffect } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { MessageCircle, X, Send, Bot, User as UserIcon, Paperclip, Image as ImageIcon, Ticket, AlertCircle, CheckCircle2, Clock, PhoneCall } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'support' | 'bot' | 'admin';
  timestamp: Date;
  status?: 'sent' | 'delivered' | 'read';
  attachment?: string;
}

interface SupportTicket {
  id: string;
  subject: string;
  category: string;
  priority: 'low' | 'medium' | 'high';
  status: 'open' | 'pending' | 'resolved' | 'closed';
  createdAt: Date;
  lastUpdated: Date;
  messages: number;
}

interface ContactRequest {
  id: string;
  teacherId: string;
  teacherName: string;
  status: 'pending' | 'approved' | 'rejected';
  requestedAt: Date;
  creditsDeducted: number;
}

interface SupportChatProps {
  userInfo: {
    name: string;
    email: string;
    role: 'teacher' | 'guardian' | 'student' | 'donor' | 'admin';
    userId: string;
    credits?: number;
  };
  language?: 'bn' | 'en';
}

const content = {
  bn: {
    supportChat: 'সাপোর্ট চ্যাট',
    online: 'অনলাইন',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    student: 'ছাত্র',
    donor: 'দাতা',
    admin: 'অ্যাডমিন',
    chat: 'চ্যাট',
    tickets: 'টিকেট',
    contactRequests: 'যোগাযোগ অনুরোধ',
    writeMessage: 'মেসেজ লিখুন...',
    quickReplies: 'দ্রুত উত্তর:',
    createTicket: 'টিকেট তৈরি করুন',
    ticketSubject: 'টিকেট বিষয়',
    ticketCategory: 'ক্যাটাগরি',
    ticketPriority: 'অগ্রাধিকার',
    description: 'বর্ণনা',
    submit: 'জমা দিন',
    cancel: 'বাতিল',
    technical: 'প্রযুক্তিগত সমস্যা',
    payment: 'পেমেন্ট সমস্যা',
    verification: 'যাচাইকরণ',
    tuition: 'টিউশন সম্পর্কিত',
    account: 'অ্যাকাউন্ট সমস্যা',
    other: 'অন্যান্য',
    low: 'কম',
    medium: 'মাঝারি',
    high: 'উচ্চ',
    open: 'খোলা',
    pending: 'বিবেচনাধীন',
    resolved: 'সমাধান',
    closed: 'বন্ধ',
    ticketCreated: 'টিকেট সফলভাবে তৈরি হয়েছে',
    viewTicket: 'টিকেট দেখুন',
    myTickets: 'আমার টিকেট',
    noTickets: 'কোনো টিকেট নেই',
    approved: 'অনুমোদিত',
    rejected: 'প্রত্যাখ্যান',
    requestContact: 'যোগাযোগ অনুরোধ',
    contactApproved: 'যোগাযোগ অনুমোদিত',
    creditsDeducted: 'ক্রেডিট কাটা হয়েছে',
  },
  en: {
    supportChat: 'Support Chat',
    online: 'Online',
    teacher: 'Teacher',
    guardian: 'Guardian',
    student: 'Student',
    donor: 'Donor',
    admin: 'Admin',
    chat: 'Chat',
    tickets: 'Tickets',
    contactRequests: 'Contact Requests',
    writeMessage: 'Write message...',
    quickReplies: 'Quick Replies:',
    createTicket: 'Create Ticket',
    ticketSubject: 'Ticket Subject',
    ticketCategory: 'Category',
    ticketPriority: 'Priority',
    description: 'Description',
    submit: 'Submit',
    cancel: 'Cancel',
    technical: 'Technical Issue',
    payment: 'Payment Issue',
    verification: 'Verification',
    tuition: 'Tuition Related',
    account: 'Account Issue',
    other: 'Other',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    open: 'Open',
    pending: 'Pending',
    resolved: 'Resolved',
    closed: 'Closed',
    ticketCreated: 'Ticket created successfully',
    viewTicket: 'View Ticket',
    myTickets: 'My Tickets',
    noTickets: 'No tickets',
    approved: 'Approved',
    rejected: 'Rejected',
    requestContact: 'Request Contact',
    contactApproved: 'Contact Approved',
    creditsDeducted: 'Credits Deducted',
  },
};

export function SupportChat({ userInfo, language = 'bn' }: SupportChatProps) {
  const t = content[language];
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('chat');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: language === 'bn' 
        ? `হ্যালো ${userInfo.name}! Talent Tutor সাপোর্ট টিমে স্বাগতম। আমি কিভাবে আপনাকে সাহায্য করতে পারি?`
        : `Hello ${userInfo.name}! Welcome to Talent Tutor support team. How can I help you?`,
      sender: 'bot',
      timestamp: new Date(),
      status: 'read',
    },
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [isCreateTicketOpen, setIsCreateTicketOpen] = useState(false);
  const [tickets, setTickets] = useState<SupportTicket[]>([]);
  const [contactRequests, setContactRequests] = useState<ContactRequest[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [ticketForm, setTicketForm] = useState({
    subject: '',
    category: '',
    priority: 'medium' as 'low' | 'medium' | 'high',
    description: '',
  });

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Auto-response system
  const getAutoResponse = (message: string): string | null => {
    const lowerMsg = message.toLowerCase();
    
    if (lowerMsg.includes('ক্রেডিট') || lowerMsg.includes('credit')) {
      return language === 'bn'
        ? `আপনার বর্তমান ক্রেডিট: ${userInfo.credits || 0}। ক্রেডিট কিনতে আপনার ড্যাশবোর্ডে যান।`
        : `Your current credits: ${userInfo.credits || 0}. Visit your dashboard to purchase credits.`;
    }
    
    if (lowerMsg.includes('পেমেন্ট') || lowerMsg.includes('payment')) {
      return language === 'bn'
        ? `আমরা bKash, Nagad, এবং SSL Commerce গ্রহণ করি। সব পেমেন্ট এনক্রিপ্টেড এবং নিরাপদ।`
        : `We accept bKash, Nagad, and SSL Commerce. All payments are encrypted and secure.`;
    }
    
    if (lowerMsg.includes('যাচাই') || lowerMsg.includes('verify')) {
      return language === 'bn'
        ? `যাচাইকরণের জন্য প্রয়োজন: NID, শিক্ষাগত সনদপত্র। প্রক্রিয়া ২৪-৪৮ ঘন্টা সময় নেয়।`
        : `For verification: NID, Educational certificates required. Process takes 24-48 hours.`;
    }
    
    if (lowerMsg.includes('টিকেট') || lowerMsg.includes('ticket')) {
      return language === 'bn'
        ? `টিকেট তৈরি করতে "টিকেট" ট্যাবে যান এবং "টিকেট তৈরি করুন" ক্লিক করুন।`
        : `To create a ticket, go to "Tickets" tab and click "Create Ticket".`;
    }
    
    if (lowerMsg.includes('সাহায্য') || lowerMsg.includes('help')) {
      return language === 'bn'
        ? `আমি সাহায্য করতে পারি:\n• ক্রেডিট সিস্টেম\n• পেমেন্ট\n• যাচাইকরণ\n• টিউশন\n• অ্যাকাউন্ট\n\nবিস্তারিত জানতে প্রশ্ন করুন বা টিকেট তৈরি করুন।`
        : `I can help with:\n• Credit System\n• Payments\n• Verification\n• Tuition\n• Account\n\nAsk your question or create a ticket.`;
    }
    
    return null;
  };

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage: Message = {
      id: messages.length + 1,
      text: inputMessage,
      sender: 'user',
      timestamp: new Date(),
      status: 'sent',
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');
    setIsTyping(true);

    setTimeout(() => {
      setIsTyping(false);
      const autoResponse = getAutoResponse(inputMessage);
      
      const responseMessage: Message = {
        id: messages.length + 2,
        text: autoResponse || (language === 'bn' 
          ? `ধন্যবাদ। আমাদের সাপোর্ট টিম শীঘ্রই উত্তর দেবে। গড় response time: ৫-১০ মিনিট।`
          : `Thank you. Our support team will respond shortly. Avg response time: 5-10 minutes.`),
        sender: autoResponse ? 'bot' : 'support',
        timestamp: new Date(),
        status: 'read',
      };

      setMessages(prev => [...prev, responseMessage]);
    }, 1500);
  };

  const handleCreateTicket = () => {
    if (!ticketForm.subject || !ticketForm.category || !ticketForm.description) {
      toast.error(language === 'bn' ? 'সব ফিল্ড পূরণ করুন' : 'Please fill all fields');
      return;
    }

    const newTicket: SupportTicket = {
      id: `TKT-${Date.now()}`,
      subject: ticketForm.subject,
      category: ticketForm.category,
      priority: ticketForm.priority,
      status: 'open',
      createdAt: new Date(),
      lastUpdated: new Date(),
      messages: 0,
    };

    setTickets([newTicket, ...tickets]);
    setIsCreateTicketOpen(false);
    setTicketForm({ subject: '', category: '', priority: 'medium', description: '' });
    toast.success(t.ticketCreated);
    setActiveTab('tickets');
  };

  const quickReplies = language === 'bn' 
    ? ['ক্রেডিট কিনতে চাই', 'পেমেন্ট সমস্যা', 'প্রোফাইল যাচাই', 'টিউশন খুঁজতে সাহায্য']
    : ['Buy Credits', 'Payment Issue', 'Profile Verification', 'Find Tuition Help'];

  const getRoleLabel = (role: string) => {
    const roles: Record<string, string> = {
      teacher: t.teacher,
      guardian: t.guardian,
      student: t.student,
      donor: t.donor,
      admin: t.admin,
    };
    return roles[role] || role;
  };

  const getPriorityColor = (priority: string) => {
    return priority === 'high' ? 'bg-red-100 text-red-800' :
           priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
           'bg-green-100 text-green-800';
  };

  const getStatusColor = (status: string) => {
    return status === 'open' ? 'bg-blue-100 text-blue-800' :
           status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
           status === 'resolved' ? 'bg-green-100 text-green-800' :
           'bg-gray-100 text-gray-800';
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <motion.div
        className="fixed bottom-6 right-6 z-50"
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      >
        <Button
          onClick={() => {
            setIsOpen(!isOpen);
            if (!isOpen) setUnreadCount(0);
          }}
          className="w-16 h-16 rounded-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-2xl relative"
          size="icon"
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div
                key="close"
                initial={{ rotate: -90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: 90, opacity: 0 }}
              >
                <X className="w-6 h-6" />
              </motion.div>
            ) : (
              <motion.div
                key="open"
                initial={{ rotate: 90, opacity: 0 }}
                animate={{ rotate: 0, opacity: 1 }}
                exit={{ rotate: -90, opacity: 0 }}
              >
                <MessageCircle className="w-6 h-6" />
              </motion.div>
            )}
          </AnimatePresence>
          
          {unreadCount > 0 && !isOpen && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-xs text-white"
            >
              {unreadCount}
            </motion.span>
          )}
        </Button>
      </motion.div>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 z-50 w-[450px] max-w-[calc(100vw-3rem)]"
          >
            <Card className="shadow-2xl border-0 overflow-hidden">
              {/* Header */}
              <div className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white p-4">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                      <MessageCircle className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-white">{t.supportChat}</h3>
                      <div className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                        <span className="text-xs text-emerald-100">{t.online}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* User Info */}
                <div className="bg-white/10 rounded-lg p-2 text-xs">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <UserIcon className="w-4 h-4" />
                      <span>{userInfo.name}</span>
                      <Badge className="bg-white/20 text-white border-0 text-xs">
                        {getRoleLabel(userInfo.role)}
                      </Badge>
                    </div>
                    {userInfo.credits !== undefined && (
                      <Badge className="bg-yellow-500 text-white text-xs">
                        {userInfo.credits} {language === 'bn' ? 'ক্রেডিট' : 'Credits'}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                <TabsList className="w-full grid grid-cols-3 bg-gray-100">
                  <TabsTrigger value="chat">{t.chat}</TabsTrigger>
                  <TabsTrigger value="tickets">
                    {t.tickets}
                    {tickets.length > 0 && (
                      <Badge className="ml-2 bg-red-500 text-white text-xs px-1.5">
                        {tickets.length}
                      </Badge>
                    )}
                  </TabsTrigger>
                  {userInfo.role === 'guardian' && (
                    <TabsTrigger value="contact">
                      {language === 'bn' ? 'যোগাযোগ' : 'Contact'}
                    </TabsTrigger>
                  )}
                </TabsList>

                {/* Chat Tab */}
                <TabsContent value="chat" className="mt-0">
                  <div className="h-96 overflow-y-auto p-4 bg-gray-50 space-y-4">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div className={`max-w-[80%]`}>
                          <div
                            className={`rounded-2xl px-4 py-2 ${
                              message.sender === 'user'
                                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white'
                                : message.sender === 'bot'
                                ? 'bg-blue-100 text-blue-900'
                                : message.sender === 'admin'
                                ? 'bg-purple-100 text-purple-900'
                                : 'bg-white text-gray-900 shadow-sm'
                            }`}
                          >
                            {(message.sender === 'bot' || message.sender === 'admin') && (
                              <div className="flex items-center gap-2 mb-1 text-xs opacity-75">
                                {message.sender === 'bot' ? <Bot className="w-3 h-3" /> : <UserIcon className="w-3 h-3" />}
                                <span>{message.sender === 'bot' ? 'Auto-reply Bot' : 'Admin Support'}</span>
                              </div>
                            )}
                            <p className="text-sm whitespace-pre-line">{message.text}</p>
                          </div>
                          <div className={`text-xs text-gray-500 mt-1 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
                            {message.timestamp.toLocaleTimeString(language === 'bn' ? 'bn-BD' : 'en-US', { hour: '2-digit', minute: '2-digit' })}
                            {message.sender === 'user' && message.status && (
                              <span className="ml-1">
                                {message.status === 'sent' && '✓'}
                                {message.status === 'delivered' && '✓✓'}
                                {message.status === 'read' && '✓✓'}
                              </span>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}

                    {isTyping && (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center gap-2 text-gray-500"
                      >
                        <div className="bg-white rounded-2xl px-4 py-3 shadow-sm">
                          <div className="flex gap-1">
                            {[0, 0.1, 0.2].map((delay, i) => (
                              <motion.span
                                key={i}
                                className="w-2 h-2 bg-gray-400 rounded-full"
                                animate={{ y: [0, -5, 0] }}
                                transition={{ repeat: Infinity, duration: 0.6, delay }}
                              />
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}

                    <div ref={messagesEndRef} />
                  </div>

                  {/* Quick Replies */}
                  {messages.length <= 2 && (
                    <div className="px-4 py-2 bg-white border-t border-gray-100">
                      <p className="text-xs text-gray-500 mb-2">{t.quickReplies}</p>
                      <div className="flex flex-wrap gap-2">
                        {quickReplies.map((reply) => (
                          <motion.button
                            key={reply}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            onClick={() => setInputMessage(reply)}
                            className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 px-3 py-1 rounded-full transition-colors"
                          >
                            {reply}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input */}
                  <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon" className="flex-shrink-0">
                        <Paperclip className="w-5 h-5 text-gray-500" />
                      </Button>
                      <Input
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        placeholder={t.writeMessage}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                        size="icon"
                      >
                        <Send className="w-5 h-5" />
                      </Button>
                    </div>
                  </div>
                </TabsContent>

                {/* Tickets Tab */}
                <TabsContent value="tickets" className="mt-0">
                  <div className="h-[450px] overflow-y-auto p-4 bg-gray-50">
                    <Button
                      onClick={() => setIsCreateTicketOpen(true)}
                      className="w-full mb-4 bg-gradient-to-r from-blue-600 to-cyan-600"
                    >
                      <Ticket className="w-4 h-4 mr-2" />
                      {t.createTicket}
                    </Button>

                    {tickets.length === 0 ? (
                      <div className="text-center py-12">
                        <Ticket className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600">{t.noTickets}</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {tickets.map((ticket) => (
                          <Card key={ticket.id} className="p-4 hover:shadow-md transition-shadow cursor-pointer">
                            <div className="flex items-start justify-between mb-2">
                              <div className="flex-1">
                                <h4 className="text-gray-900 mb-1">{ticket.subject}</h4>
                                <p className="text-xs text-gray-500">ID: {ticket.id}</p>
                              </div>
                              <Badge className={getStatusColor(ticket.status)}>
                                {ticket.status === 'open' ? t.open :
                                 ticket.status === 'pending' ? t.pending :
                                 ticket.status === 'resolved' ? t.resolved : t.closed}
                              </Badge>
                            </div>
                            <div className="flex items-center gap-2 flex-wrap">
                              <Badge variant="outline" className="text-xs">
                                {ticket.category}
                              </Badge>
                              <Badge className={`text-xs ${getPriorityColor(ticket.priority)}`}>
                                {ticket.priority === 'high' ? t.high :
                                 ticket.priority === 'medium' ? t.medium : t.low}
                              </Badge>
                              <span className="text-xs text-gray-500">
                                {ticket.createdAt.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                              </span>
                            </div>
                          </Card>
                        ))}
                      </div>
                    )}
                  </div>
                </TabsContent>

                {/* Contact Requests Tab (Guardian only) */}
                {userInfo.role === 'guardian' && (
                  <TabsContent value="contact" className="mt-0">
                    <div className="h-[450px] overflow-y-auto p-4 bg-gray-50">
                      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
                        <div className="flex items-start gap-3">
                          <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                          <div className="text-sm text-blue-900">
                            <p className="mb-1">
                              {language === 'bn' 
                                ? '১০ ক্রেডিট খরচ করে শিক্ষকের যোগাযোগ নম্বর পান।'
                                : 'Get teacher contact number for 10 credits.'}
                            </p>
                            <p className="text-xs text-blue-700">
                              {language === 'bn'
                                ? 'অনুরোধ অ্যাডমিন দ্বারা অনুমোদিত হতে হবে।'
                                : 'Request must be approved by admin.'}
                            </p>
                          </div>
                        </div>
                      </div>

                      {contactRequests.length === 0 ? (
                        <div className="text-center py-12">
                          <PhoneCall className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                          <p className="text-gray-600">
                            {language === 'bn' ? 'কোনো যোগাযোগ অনুরোধ নেই' : 'No contact requests'}
                          </p>
                        </div>
                      ) : (
                        <div className="space-y-3">
                          {contactRequests.map((request) => (
                            <Card key={request.id} className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <div>
                                  <h4 className="text-gray-900">{request.teacherName}</h4>
                                  <p className="text-xs text-gray-500">
                                    {request.requestedAt.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                                  </p>
                                </div>
                                <Badge className={
                                  request.status === 'approved' ? 'bg-green-100 text-green-800' :
                                  request.status === 'rejected' ? 'bg-red-100 text-red-800' :
                                  'bg-yellow-100 text-yellow-800'
                                }>
                                  {request.status === 'approved' ? t.approved :
                                   request.status === 'rejected' ? t.rejected : t.pending}
                                </Badge>
                              </div>
                              <p className="text-sm text-gray-600">
                                {t.creditsDeducted}: {request.creditsDeducted}
                              </p>
                            </Card>
                          ))}
                        </div>
                      )}
                    </div>
                  </TabsContent>
                )}
              </Tabs>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Create Ticket Dialog */}
      <Dialog open={isCreateTicketOpen} onOpenChange={setIsCreateTicketOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.createTicket}</DialogTitle>
            <DialogDescription>
              {language === 'bn' 
                ? 'আপনার সমস্যা বিস্তারিত বর্ণনা করুন' 
                : 'Describe your issue in detail'}
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 mt-4">
            <div>
              <Label>{t.ticketSubject}</Label>
              <Input
                value={ticketForm.subject}
                onChange={(e) => setTicketForm({ ...ticketForm, subject: e.target.value })}
                placeholder={language === 'bn' ? 'সংক্ষিপ্ত বিষয়' : 'Brief subject'}
              />
            </div>
            <div>
              <Label>{t.ticketCategory}</Label>
              <Select value={ticketForm.category} onValueChange={(v) => setTicketForm({ ...ticketForm, category: v })}>
                <SelectTrigger>
                  <SelectValue placeholder={language === 'bn' ? 'ক্যাটাগরি নির্বাচন করুন' : 'Select category'} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="technical">{t.technical}</SelectItem>
                  <SelectItem value="payment">{t.payment}</SelectItem>
                  <SelectItem value="verification">{t.verification}</SelectItem>
                  <SelectItem value="tuition">{t.tuition}</SelectItem>
                  <SelectItem value="account">{t.account}</SelectItem>
                  <SelectItem value="other">{t.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t.ticketPriority}</Label>
              <Select value={ticketForm.priority} onValueChange={(v) => setTicketForm({ ...ticketForm, priority: v as any })}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">{t.low}</SelectItem>
                  <SelectItem value="medium">{t.medium}</SelectItem>
                  <SelectItem value="high">{t.high}</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>{t.description}</Label>
              <Textarea
                rows={4}
                value={ticketForm.description}
                onChange={(e) => setTicketForm({ ...ticketForm, description: e.target.value })}
                placeholder={language === 'bn' ? 'আপনার সমস্যা বিস্তারিত লিখুন' : 'Describe your issue in detail'}
              />
            </div>
            <div className="flex gap-3">
              <Button onClick={handleCreateTicket} className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600">
                {t.submit}
              </Button>
              <Button onClick={() => setIsCreateTicketOpen(false)} variant="outline" className="flex-1">
                {t.cancel}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
