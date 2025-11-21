import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { ScrollArea } from './ui/scroll-area';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { 
  Eye, 
  RefreshCw, 
  MessageSquare, 
  Send, 
  Clock, 
  CheckCircle,
  AlertCircle,
  XCircle,
  Filter,
  User,
  Calendar,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { getApiUrl, getApiHeaders } from '../utils/apiConfig';
import { handleFetchError } from '../utils/errorHandler';

interface Ticket {
  id: string;
  subject: string;
  category: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  userId: string;
  userName: string;
  userRole: string;
  createdAt: string;
  updatedAt: string;
  messages?: Array<{
    id: string;
    text: string;
    sender: string;
    senderRole: string;
    createdAt: string;
  }>;
}

interface AdminTicketManagerProps {
  language: 'bn' | 'en';
}

const translations = {
  bn: {
    title: 'টিকেট ম্যানেজমেন্ট',
    allTickets: 'সব টিকেট',
    status: 'স্ট্যাটাস',
    all: 'সব',
    open: 'খোলা',
    inProgress: 'প্রসেসিং',
    resolved: 'সমাধান হয়েছে',
    closed: 'বন্ধ',
    filter: 'ফিল্টার',
    refresh: 'রিফ্রেশ',
    ticketId: 'টিকেট ID',
    subject: 'বিষয়',
    user: 'ইউজার',
    priority: 'অগ্রাধিকার',
    created: 'তৈরি',
    actions: 'অ্যাকশন',
    view: 'দেখুন',
    reply: 'উত্তর দিন',
    updateStatus: 'স্ট্যাটাস আপডেট',
    sendReply: 'উত্তর পাঠান',
    typeMessage: 'বার্তা লিখুন...',
    loading: 'লোড হচ্ছে...',
    noTickets: 'কোনো টিকেট নেই',
    ticketDetails: 'টিকেট বিস্তারিত',
    conversation: 'কথোপকথন',
    low: 'কম',
    medium: 'মাঝারি',
    high: 'উচ্চ',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    student: 'ছাত্র',
    donor: 'দাতা',
    admin: 'এডমিন',
  },
  en: {
    title: 'Ticket Management',
    allTickets: 'All Tickets',
    status: 'Status',
    all: 'All',
    open: 'Open',
    inProgress: 'In Progress',
    resolved: 'Resolved',
    closed: 'Closed',
    filter: 'Filter',
    refresh: 'Refresh',
    ticketId: 'Ticket ID',
    subject: 'Subject',
    user: 'User',
    priority: 'Priority',
    created: 'Created',
    actions: 'Actions',
    view: 'View',
    reply: 'Reply',
    updateStatus: 'Update Status',
    sendReply: 'Send Reply',
    typeMessage: 'Type message...',
    loading: 'Loading...',
    noTickets: 'No tickets',
    ticketDetails: 'Ticket Details',
    conversation: 'Conversation',
    low: 'Low',
    medium: 'Medium',
    high: 'High',
    teacher: 'Teacher',
    guardian: 'Guardian',
    student: 'Student',
    donor: 'Donor',
    admin: 'Admin',
  },
};

export function AdminTicketManager({ language }: AdminTicketManagerProps) {
  const t = translations[language];
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [showTicketDialog, setShowTicketDialog] = useState(false);
  const [replyMessage, setReplyMessage] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [userRoleFilter, setUserRoleFilter] = useState('all');

  const loadAllTickets = async () => {
    try {
      setIsLoading(true);
      let endpoint = 'tickets';
      
      const params = new URLSearchParams();
      if (statusFilter !== 'all') {
        params.append('status', statusFilter);
      }
      if (userRoleFilter !== 'all') {
        params.append('userRole', userRoleFilter);
      }
      
      if (params.toString()) {
        endpoint += '?' + params.toString();
      }

      const response = await fetch(getApiUrl(endpoint), {
        headers: getApiHeaders(),
      });

      const data = await response.json();
      if (data.success) {
        setTickets(data.tickets || []);
      } else {
        toast.error(data.error || 'Failed to load tickets');
      }
    } catch (error) {
      // Silent fail with proper error handling
      setTickets([]);
      handleFetchError(error, 'Admin tickets loading');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadAllTickets();
  }, [statusFilter, userRoleFilter]);

  const handleViewTicket = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    setShowTicketDialog(true);
  };

  const handleUpdateStatus = async (ticketId: string, status: string) => {
    try {
      const response = await fetch(
        getApiUrl(`tickets/${ticketId}`),
        {
          method: 'PUT',
          headers: getApiHeaders(),
          body: JSON.stringify({ status }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success(language === 'bn' ? 'স্ট্যাটাস আপডেট হয়েছে' : 'Status updated');
        loadAllTickets();
        if (selectedTicket?.id === ticketId) {
          setSelectedTicket(data.ticket);
        }
      } else {
        toast.error(data.error || 'Failed to update status');
      }
    } catch (error) {
      console.error('Update status error:', error);
      toast.error(language === 'bn' ? 'স্ট্যাটাস আপডেট করতে সমস্যা হয়েছে' : 'Failed to update status');
    }
  };

  const handleSendReply = async () => {
    if (!selectedTicket || !replyMessage.trim()) return;

    try {
      const response = await fetch(
        getApiUrl(`ticket/${selectedTicket.id}/reply`),
        {
          method: 'POST',
          headers: getApiHeaders(),
          body: JSON.stringify({
            userId: 'admin',
            userName: 'Admin',
            userRole: 'admin',
            message: replyMessage,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        toast.success(language === 'bn' ? 'উত্তর পাঠানো হয়েছে' : 'Reply sent');
        setSelectedTicket(data.ticket);
        setReplyMessage('');
        loadAllTickets();
      } else {
        toast.error(data.error || 'Failed to send reply');
      }
    } catch (error) {
      console.error('Send reply error:', error);
      toast.error(language === 'bn' ? 'উত্তর পাঠাতে সমস্যা হয়েছে' : 'Failed to send reply');
    }
  };

  const getStatusBadge = (status: string) => {
    const statusColors: Record<string, string> = {
      open: 'bg-blue-100 text-blue-700',
      'in-progress': 'bg-yellow-100 text-yellow-700',
      resolved: 'bg-green-100 text-green-700',
      closed: 'bg-gray-100 text-gray-700',
    };
    return statusColors[status] || statusColors.open;
  };

  const getPriorityBadge = (priority: string) => {
    const priorityColors: Record<string, string> = {
      low: 'bg-gray-100 text-gray-700',
      medium: 'bg-orange-100 text-orange-700',
      high: 'bg-red-100 text-red-700',
    };
    return priorityColors[priority] || priorityColors.medium;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'open':
        return <AlertCircle className="w-4 h-4" />;
      case 'in-progress':
        return <Clock className="w-4 h-4" />;
      case 'resolved':
        return <CheckCircle className="w-4 h-4" />;
      case 'closed':
        return <XCircle className="w-4 h-4" />;
      default:
        return <MessageSquare className="w-4 h-4" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return language === 'bn' ? 'এখনই' : 'Just now';
    if (diffInMinutes < 60) return `${diffInMinutes} ${language === 'bn' ? 'মিনিট আগে' : 'min ago'}`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ${language === 'bn' ? 'ঘণ্টা আগে' : 'hours ago'}`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} ${language === 'bn' ? 'দিন আগে' : 'days ago'}`;
    
    return date.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US');
  };

  const filteredTickets = tickets.filter(ticket => {
    if (statusFilter !== 'all' && ticket.status !== statusFilter) return false;
    if (userRoleFilter !== 'all' && ticket.userRole !== userRoleFilter) return false;
    return true;
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
          <p className="text-gray-600 mt-1">
            {language === 'bn' 
              ? `মোট ${filteredTickets.length} টি টিকেট` 
              : `Total ${filteredTickets.length} tickets`}
          </p>
        </div>
        <Button onClick={loadAllTickets} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {t.refresh}
        </Button>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <Label>{t.status}</Label>
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="open">{t.open}</SelectItem>
                <SelectItem value="in-progress">{t.inProgress}</SelectItem>
                <SelectItem value="resolved">{t.resolved}</SelectItem>
                <SelectItem value="closed">{t.closed}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label>{t.user} Role</Label>
            <Select value={userRoleFilter} onValueChange={setUserRoleFilter}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.all}</SelectItem>
                <SelectItem value="teacher">{t.teacher}</SelectItem>
                <SelectItem value="guardian">{t.guardian}</SelectItem>
                <SelectItem value="student">{t.student}</SelectItem>
                <SelectItem value="donor">{t.donor}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Tickets Table */}
      <Card>
        <ScrollArea className="h-[600px]">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>{t.ticketId}</TableHead>
                <TableHead>{t.subject}</TableHead>
                <TableHead>{t.user}</TableHead>
                <TableHead>{t.status}</TableHead>
                <TableHead>{t.priority}</TableHead>
                <TableHead>{t.created}</TableHead>
                <TableHead>{t.actions}</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <RefreshCw className="w-6 h-6 animate-spin mx-auto mb-2" />
                    <p className="text-gray-500">{t.loading}</p>
                  </TableCell>
                </TableRow>
              ) : filteredTickets.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <MessageSquare className="w-12 h-12 mx-auto mb-2 text-gray-400" />
                    <p className="text-gray-500">{t.noTickets}</p>
                  </TableCell>
                </TableRow>
              ) : (
                filteredTickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell className="font-mono text-sm">
                      #{ticket.id.substring(0, 8)}
                    </TableCell>
                    <TableCell>
                      <div className="max-w-xs">
                        <p className="font-medium text-gray-900 truncate">{ticket.subject}</p>
                        <p className="text-sm text-gray-500 truncate">{ticket.description}</p>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <div>
                          <p className="font-medium text-sm">{ticket.userName}</p>
                          <Badge variant="outline" className="text-xs">
                            {t[ticket.userRole as keyof typeof t] || ticket.userRole}
                          </Badge>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className={getStatusBadge(ticket.status)}>
                        {getStatusIcon(ticket.status)}
                        <span className="ml-1">{t[ticket.status.replace('-', '') as keyof typeof t] || ticket.status}</span>
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Badge className={getPriorityBadge(ticket.priority)}>
                        {t[ticket.priority as keyof typeof t] || ticket.priority}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1 text-sm text-gray-600">
                        <Calendar className="w-3 h-3" />
                        {formatDate(ticket.createdAt)}
                      </div>
                    </TableCell>
                    <TableCell>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleViewTicket(ticket)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {t.view}
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </ScrollArea>
      </Card>

      {/* Ticket Details Dialog */}
      <Dialog open={showTicketDialog} onOpenChange={setShowTicketDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.ticketDetails}</DialogTitle>
            <DialogDescription>
              Ticket ID: #{selectedTicket?.id.substring(0, 12)}
            </DialogDescription>
          </DialogHeader>

          {selectedTicket && (
            <div className="space-y-6">
              {/* Ticket Info */}
              <Card className="p-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">{t.subject}</Label>
                    <p className="font-semibold">{selectedTicket.subject}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.user}</Label>
                    <p className="font-semibold">
                      {selectedTicket.userName} ({selectedTicket.userRole})
                    </p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.status}</Label>
                    <div className="mt-1">
                      <Select
                        value={selectedTicket.status}
                        onValueChange={(value) => handleUpdateStatus(selectedTicket.id, value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="open">{t.open}</SelectItem>
                          <SelectItem value="in-progress">{t.inProgress}</SelectItem>
                          <SelectItem value="resolved">{t.resolved}</SelectItem>
                          <SelectItem value="closed">{t.closed}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.priority}</Label>
                    <Badge className={getPriorityBadge(selectedTicket.priority)}>
                      {t[selectedTicket.priority as keyof typeof t]}
                    </Badge>
                  </div>
                </div>
                <div className="mt-4">
                  <Label className="text-gray-600">Description</Label>
                  <p className="text-gray-900 mt-1">{selectedTicket.description}</p>
                </div>
              </Card>

              {/* Conversation */}
              <div>
                <Label className="text-lg">{t.conversation}</Label>
                <ScrollArea className="h-[300px] mt-2 border rounded-lg p-4 bg-gray-50">
                  <div className="space-y-4">
                    {/* Initial Message */}
                    <div className="flex gap-3">
                      <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white text-sm">
                        {selectedTicket.userName.charAt(0)}
                      </div>
                      <div className="flex-1">
                        <div className="bg-white rounded-lg p-3 shadow-sm">
                          <p className="text-sm font-semibold text-gray-900">{selectedTicket.userName}</p>
                          <p className="text-gray-700 mt-1">{selectedTicket.description}</p>
                          <p className="text-xs text-gray-500 mt-2">{formatDate(selectedTicket.createdAt)}</p>
                        </div>
                      </div>
                    </div>

                    {/* Responses */}
                    {selectedTicket.responses?.map((response: any) => (
                      <div key={response.id} className={`flex gap-3 ${response.userRole === 'admin' ? 'flex-row-reverse' : ''}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-sm ${
                          response.userRole === 'admin' ? 'bg-emerald-500' : 'bg-blue-500'
                        }`}>
                          {response.userName?.charAt(0) || 'U'}
                        </div>
                        <div className="flex-1">
                          <div className={`rounded-lg p-3 shadow-sm ${
                            response.userRole === 'admin' ? 'bg-emerald-50' : 'bg-white'
                          }`}>
                            <p className="text-sm font-semibold text-gray-900">{response.userName}</p>
                            <p className="text-gray-700 mt-1">{response.message}</p>
                            <p className="text-xs text-gray-500 mt-2">{formatDate(response.createdAt)}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </div>

              {/* Reply */}
              <div className="space-y-2">
                <Label>{t.reply}</Label>
                <Textarea
                  value={replyMessage}
                  onChange={(e) => setReplyMessage(e.target.value)}
                  placeholder={t.typeMessage}
                  rows={4}
                />
                <Button onClick={handleSendReply} disabled={!replyMessage.trim()}>
                  <Send className="w-4 h-4 mr-2" />
                  {t.sendReply}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
