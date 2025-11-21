import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogFooter } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Alert, AlertDescription } from './ui/alert';
import { ScrollArea } from './ui/scroll-area';
import { Textarea } from './ui/textarea';
import {
  Send, Plus, Edit, Trash2, Copy, Eye, Calendar, 
  Mail, Users, TrendingUp, Clock, CheckCircle, XCircle,
  PlayCircle, PauseCircle, AlertCircle, FileText, Filter,
  Download, RefreshCw, Search, BarChart3, Target
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Campaign {
  id: string;
  name: string;
  subject: string;
  previewText: string;
  content: string;
  recipients: string[];
  recipientFilter: 'all' | 'active' | 'tagged';
  scheduledFor: string | null;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'paused';
  createdAt: string;
  updatedAt: string;
  sentAt: string | null;
  stats: {
    sent: number;
    delivered: number;
    opened: number;
    clicked: number;
    bounced: number;
    unsubscribed: number;
  };
}

interface NewsletterCampaignsProps {
  language: 'bn' | 'en';
}

const translations = {
  bn: {
    title: 'ক্যাম্পেইন ম্যানেজমেন্ট',
    campaigns: 'ক্যাম্পেইন',
    createCampaign: 'নতুন ক্যাম্পেইন',
    editCampaign: 'ক্যাম্পেইন সম্পাদনা',
    campaignName: 'ক্যাম্পেইনের নাম',
    emailSubject: 'ইমেইল বিষয়',
    previewText: 'প্রিভিউ টেক্সট',
    emailContent: 'ইমেইল কন্টেন্ট',
    recipients: 'প্রাপক',
    allSubscribers: 'সব সাবস্ক্রাইবার',
    activeOnly: 'শুধু সক্রিয়',
    taggedSubscribers: 'ট্যাগ করা সাবস্ক্রাইবার',
    schedule: 'সময়সূচী',
    sendNow: 'এখনই পাঠান',
    scheduleLater: 'পরে পাঠান',
    scheduleDate: 'তারিখ নির্বাচন করুন',
    status: 'স্ট্যাটাস',
    draft: 'খসড়া',
    scheduled: 'নির্ধারিত',
    sending: 'পাঠানো হচ্ছে',
    sent: 'পাঠানো হয়েছে',
    paused: 'বিরতি',
    actions: 'অ্যাকশন',
    edit: 'সম্পাদনা',
    delete: 'মুছে ফেলুন',
    duplicate: 'ডুপ্লিকেট',
    send: 'পাঠান',
    sendTest: 'টেস্ট পাঠান',
    testEmail: 'টেস্ট ইমেইল',
    view: 'দেখুন',
    stats: 'পরিসংখ্যান',
    totalSent: 'মোট পাঠানো',
    delivered: 'ডেলিভার',
    opened: 'খোলা হয়েছে',
    clicked: 'ক্লিক করা হয়েছে',
    bounced: 'বাউন্স',
    unsubscribed: 'আনসাবস্ক্রাইব',
    openRate: 'ওপেন রেট',
    clickRate: 'ক্লিক রেট',
    searchPlaceholder: 'ক্যাম্পেইন খুঁজুন...',
    filterByStatus: 'স্ট্যাটাস অনুযায়ী ফিল্টার',
    all: 'সব',
    createdAt: 'তৈরির তারিখ',
    sentAt: 'পাঠানোর তারিখ',
    noCampaigns: 'কোনো ক্যাম্পেইন নেই',
    cancel: 'বাতিল',
    save: 'সংরক্ষণ',
    create: 'তৈরি করুন',
    update: 'আপডেট',
    loading: 'লোড হচ্ছে...',
    deleteConfirm: 'আপনি কি নিশ্চিত আপনি এই ক্যাম্পেইন মুছে ফেলতে চান?',
    deleteSuccess: 'ক্যাম্পেইন সফলভাবে মুছে ফেলা হয়েছে',
    createSuccess: 'ক্যাম্পেইন সফলভাবে তৈরি হয়েছে',
    updateSuccess: 'ক্যাম্পেইন সফলভাবে আপডেট হয়েছে',
    sendSuccess: 'ক্যাম্পেইন সফলভাবে পাঠানো হয়েছে',
    testSendSuccess: 'টেস্ট ইমেইল পাঠানো হয়েছে',
    duplicateSuccess: 'ক্যাম্পেইন ডুপ্লিকেট করা হয়েছে',
    error: 'একটি ত্রুটি ঘটেছে',
    campaignDetails: 'ক্যাম্পেইন বিবরণ',
    basicInfo: 'মৌলিক তথ্য',
    contentSettings: 'কন্টেন্ট সেটিংস',
    recipientSettings: 'প্রাপক সেটিংস',
    scheduleSettings: 'সময়সূচী সেটিংস',
    preview: 'প্রিভিউ',
    close: 'বন্ধ করুন',
    totalCampaigns: 'মোট ক্যাম্পেইন',
    activeCampaigns: 'সক্রিয় ক্যাম্পেইন',
    draftCampaigns: 'খসড়া ক্যাম্পেইন',
    refresh: 'রিফ্রেশ',
  },
  en: {
    title: 'Campaign Management',
    campaigns: 'Campaigns',
    createCampaign: 'New Campaign',
    editCampaign: 'Edit Campaign',
    campaignName: 'Campaign Name',
    emailSubject: 'Email Subject',
    previewText: 'Preview Text',
    emailContent: 'Email Content',
    recipients: 'Recipients',
    allSubscribers: 'All Subscribers',
    activeOnly: 'Active Only',
    taggedSubscribers: 'Tagged Subscribers',
    schedule: 'Schedule',
    sendNow: 'Send Now',
    scheduleLater: 'Schedule Later',
    scheduleDate: 'Select Date',
    status: 'Status',
    draft: 'Draft',
    scheduled: 'Scheduled',
    sending: 'Sending',
    sent: 'Sent',
    paused: 'Paused',
    actions: 'Actions',
    edit: 'Edit',
    delete: 'Delete',
    duplicate: 'Duplicate',
    send: 'Send',
    sendTest: 'Send Test',
    testEmail: 'Test Email',
    view: 'View',
    stats: 'Stats',
    totalSent: 'Total Sent',
    delivered: 'Delivered',
    opened: 'Opened',
    clicked: 'Clicked',
    bounced: 'Bounced',
    unsubscribed: 'Unsubscribed',
    openRate: 'Open Rate',
    clickRate: 'Click Rate',
    searchPlaceholder: 'Search campaigns...',
    filterByStatus: 'Filter by Status',
    all: 'All',
    createdAt: 'Created At',
    sentAt: 'Sent At',
    noCampaigns: 'No campaigns found',
    cancel: 'Cancel',
    save: 'Save',
    create: 'Create',
    update: 'Update',
    loading: 'Loading...',
    deleteConfirm: 'Are you sure you want to delete this campaign?',
    deleteSuccess: 'Campaign deleted successfully',
    createSuccess: 'Campaign created successfully',
    updateSuccess: 'Campaign updated successfully',
    sendSuccess: 'Campaign sent successfully',
    testSendSuccess: 'Test email sent',
    duplicateSuccess: 'Campaign duplicated',
    error: 'An error occurred',
    campaignDetails: 'Campaign Details',
    basicInfo: 'Basic Info',
    contentSettings: 'Content Settings',
    recipientSettings: 'Recipient Settings',
    scheduleSettings: 'Schedule Settings',
    preview: 'Preview',
    close: 'Close',
    totalCampaigns: 'Total Campaigns',
    activeCampaigns: 'Active Campaigns',
    draftCampaigns: 'Draft Campaigns',
    refresh: 'Refresh',
  }
};

export function NewsletterCampaigns({ language = 'bn' }: NewsletterCampaignsProps) {
  const t = translations[language];
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [showDialog, setShowDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [selectedCampaign, setSelectedCampaign] = useState<Campaign | null>(null);
  const [editMode, setEditMode] = useState(false);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    subject: '',
    previewText: '',
    content: '',
    recipientFilter: 'active' as 'all' | 'active' | 'tagged',
    recipients: [] as string[],
    scheduledFor: null as string | null,
  });

  const [testEmail, setTestEmail] = useState('');

  useEffect(() => {
    loadCampaigns();
  }, []);

  const loadCampaigns = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/newsletter/campaigns`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setCampaigns(data.campaigns || []);
      } else {
        // Use empty data if API not available
        console.log('Newsletter campaigns API not available, starting with empty list');
        setCampaigns([]);
      }
    } catch (error) {
      // Use empty data if API not available
      console.log('Newsletter campaigns API not available, starting with empty list');
      setCampaigns([]);
    } finally {
      setLoading(false);
    }
  };

  const createOrUpdateCampaign = async () => {
    if (!formData.name || !formData.subject || !formData.content) {
      toast.error(language === 'bn' ? 'সব প্রয়োজনীয় ফিল্ড পূরণ করুন' : 'Please fill all required fields');
      return;
    }

    try {
      const url = editMode && selectedCampaign
        ? `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/newsletter/campaigns/${selectedCampaign.id}`
        : `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/newsletter/campaigns`;

      const response = await fetch(url, {
        method: editMode ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast.success(editMode ? t.updateSuccess : t.createSuccess);
        setShowDialog(false);
        resetForm();
        loadCampaigns();
      } else {
        const error = await response.json();
        toast.error(error.error || t.error);
      }
    } catch (error) {
      console.error('Failed to save campaign:', error);
      toast.error(t.error);
    }
  };

  const deleteCampaign = async (id: string) => {
    if (!confirm(t.deleteConfirm)) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/newsletter/campaigns/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        toast.success(t.deleteSuccess);
        loadCampaigns();
      } else {
        toast.error(t.error);
      }
    } catch (error) {
      console.error('Failed to delete campaign:', error);
      toast.error(t.error);
    }
  };

  const duplicateCampaign = async (id: string) => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/newsletter/campaigns/${id}/duplicate`,
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        toast.success(t.duplicateSuccess);
        loadCampaigns();
      } else {
        toast.error(t.error);
      }
    } catch (error) {
      console.error('Failed to duplicate campaign:', error);
      toast.error(t.error);
    }
  };

  const sendCampaign = async (id: string) => {
    if (!confirm(language === 'bn' ? 'আপনি কি এই ক্যাম্পেইন পাঠাতে চান?' : 'Are you sure you want to send this campaign?')) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/newsletter/campaigns/${id}/send`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ isTest: false }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || t.sendSuccess);
        loadCampaigns();
      } else {
        toast.error(t.error);
      }
    } catch (error) {
      console.error('Failed to send campaign:', error);
      toast.error(t.error);
    }
  };

  const sendTestEmail = async () => {
    if (!testEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(testEmail)) {
      toast.error(language === 'bn' ? 'সঠিক ইমেইল লিখুন' : 'Please enter a valid email');
      return;
    }

    if (!selectedCampaign) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/newsletter/campaigns/${selectedCampaign.id}/send`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({ 
            isTest: true, 
            testEmail 
          }),
        }
      );

      if (response.ok) {
        const data = await response.json();
        toast.success(data.message || t.testSendSuccess);
        setShowTestDialog(false);
        setTestEmail('');
      } else {
        toast.error(t.error);
      }
    } catch (error) {
      console.error('Failed to send test email:', error);
      toast.error(t.error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      subject: '',
      previewText: '',
      content: '',
      recipientFilter: 'active',
      recipients: [],
      scheduledFor: null,
    });
    setEditMode(false);
    setSelectedCampaign(null);
  };

  const openEditDialog = (campaign: Campaign) => {
    setFormData({
      name: campaign.name,
      subject: campaign.subject,
      previewText: campaign.previewText,
      content: campaign.content,
      recipientFilter: campaign.recipientFilter,
      recipients: campaign.recipients,
      scheduledFor: campaign.scheduledFor,
    });
    setSelectedCampaign(campaign);
    setEditMode(true);
    setShowDialog(true);
  };

  const filteredCampaigns = campaigns.filter(campaign => {
    const matchesSearch = searchQuery === '' ||
      campaign.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      campaign.subject.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || campaign.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status: string) => {
    const variants: Record<string, { variant: any; icon: any }> = {
      draft: { variant: 'secondary' as const, icon: FileText },
      scheduled: { variant: 'default' as const, icon: Clock },
      sending: { variant: 'default' as const, icon: PlayCircle },
      sent: { variant: 'default' as const, icon: CheckCircle },
      paused: { variant: 'secondary' as const, icon: PauseCircle },
    };
    
    const config = variants[status] || variants.draft;
    const Icon = config.icon;
    
    return (
      <Badge variant={config.variant} className="gap-1">
        <Icon className="h-3 w-3" />
        {t[status as keyof typeof t]}
      </Badge>
    );
  };

  const stats = {
    total: campaigns.length,
    active: campaigns.filter(c => c.status === 'sent' || c.status === 'sending').length,
    draft: campaigns.filter(c => c.status === 'draft').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Target className="h-6 w-6 text-purple-600" />
            {t.title}
          </h2>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t.totalCampaigns}</p>
              <h3 className="mt-2">{stats.total}</h3>
            </div>
            <Mail className="h-8 w-8 text-purple-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t.activeCampaigns}</p>
              <h3 className="mt-2">{stats.active}</h3>
            </div>
            <CheckCircle className="h-8 w-8 text-green-600" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-muted-foreground">{t.draftCampaigns}</p>
              <h3 className="mt-2">{stats.draft}</h3>
            </div>
            <FileText className="h-8 w-8 text-gray-600" />
          </div>
        </Card>
      </div>

      {/* Action Bar */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
          
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-full md:w-48">
              <SelectValue placeholder={t.filterByStatus} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.all}</SelectItem>
              <SelectItem value="draft">{t.draft}</SelectItem>
              <SelectItem value="scheduled">{t.scheduled}</SelectItem>
              <SelectItem value="sent">{t.sent}</SelectItem>
            </SelectContent>
          </Select>

          <div className="flex gap-2">
            <Button 
              onClick={() => {
                resetForm();
                setShowDialog(true);
              }} 
              className="gap-2"
            >
              <Plus className="h-4 w-4" />
              {t.createCampaign}
            </Button>
            <Button variant="outline" onClick={loadCampaigns} size="icon">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </Card>

      {/* Campaigns Table */}
      <Card>
        <ScrollArea className="h-[500px]">
          {loading ? (
            <div className="flex items-center justify-center h-64">
              <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
            </div>
          ) : filteredCampaigns.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
              <Target className="h-12 w-12 mb-3 opacity-50" />
              <p>{t.noCampaigns}</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>{t.campaignName}</TableHead>
                  <TableHead>{t.subject}</TableHead>
                  <TableHead>{t.status}</TableHead>
                  <TableHead>{t.stats}</TableHead>
                  <TableHead>{t.createdAt}</TableHead>
                  <TableHead>{t.actions}</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredCampaigns.map((campaign) => (
                  <TableRow key={campaign.id}>
                    <TableCell className="font-medium">{campaign.name}</TableCell>
                    <TableCell className="max-w-xs truncate">{campaign.subject}</TableCell>
                    <TableCell>{getStatusBadge(campaign.status)}</TableCell>
                    <TableCell>
                      {campaign.status === 'sent' && (
                        <div className="text-sm">
                          <div>📧 {campaign.stats.sent}</div>
                          <div className="text-muted-foreground">
                            {campaign.stats.delivered > 0 
                              ? `${((campaign.stats.opened / campaign.stats.delivered) * 100).toFixed(1)}% ${t.openRate}`
                              : '-'}
                          </div>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      {new Date(campaign.createdAt).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                    </TableCell>
                    <TableCell>
                      <div className="flex gap-2">
                        {campaign.status === 'draft' && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => openEditDialog(campaign)}
                              title={t.edit}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedCampaign(campaign);
                                setShowTestDialog(true);
                              }}
                              title={t.sendTest}
                            >
                              <Mail className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => sendCampaign(campaign.id)}
                              title={t.send}
                            >
                              <Send className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => {
                            setSelectedCampaign(campaign);
                            setShowDetailsDialog(true);
                          }}
                          title={t.view}
                        >
                          <Eye className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => duplicateCampaign(campaign.id)}
                          title={t.duplicate}
                        >
                          <Copy className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => deleteCampaign(campaign.id)}
                          title={t.delete}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </ScrollArea>
      </Card>

      {/* Create/Edit Dialog */}
      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{editMode ? t.editCampaign : t.createCampaign}</DialogTitle>
            <DialogDescription>
              {language === 'bn' 
                ? 'ক্যাম্পেইনের বিস্তারিত তথ্য পূরণ করুন'
                : 'Fill in the campaign details below'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>{t.campaignName}</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder={t.campaignName}
              />
            </div>

            <div>
              <Label>{t.emailSubject}</Label>
              <Input
                value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                placeholder={t.emailSubject}
              />
            </div>

            <div>
              <Label>{t.previewText}</Label>
              <Input
                value={formData.previewText}
                onChange={(e) => setFormData({ ...formData, previewText: e.target.value })}
                placeholder={t.previewText}
              />
            </div>

            <div>
              <Label>{t.emailContent}</Label>
              <Textarea
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                placeholder={t.emailContent}
                rows={10}
              />
            </div>

            <div>
              <Label>{t.recipients}</Label>
              <Select 
                value={formData.recipientFilter} 
                onValueChange={(value) => setFormData({ ...formData, recipientFilter: value as any })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allSubscribers}</SelectItem>
                  <SelectItem value="active">{t.activeOnly}</SelectItem>
                  <SelectItem value="tagged">{t.taggedSubscribers}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              {t.cancel}
            </Button>
            <Button onClick={createOrUpdateCampaign}>
              {editMode ? t.update : t.create}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{t.campaignDetails}</DialogTitle>
            <DialogDescription>
              {language === 'bn' 
                ? 'ক্যাম্পেইনের সম্পূর্ণ তথ্য এবং পরিসংখ্যান দেখুন'
                : 'View complete campaign information and statistics'}
            </DialogDescription>
          </DialogHeader>

          {selectedCampaign && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground">{t.campaignName}</p>
                  <p className="font-medium">{selectedCampaign.name}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">{t.status}</p>
                  <div className="mt-1">{getStatusBadge(selectedCampaign.status)}</div>
                </div>
              </div>

              <div>
                <p className="text-sm text-muted-foreground">{t.emailSubject}</p>
                <p className="font-medium">{selectedCampaign.subject}</p>
              </div>

              {selectedCampaign.previewText && (
                <div>
                  <p className="text-sm text-muted-foreground">{t.previewText}</p>
                  <p>{selectedCampaign.previewText}</p>
                </div>
              )}

              <div>
                <p className="text-sm text-muted-foreground mb-2">{t.emailContent}</p>
                <Card className="p-4 bg-gray-50 max-h-64 overflow-y-auto">
                  <div className="whitespace-pre-wrap">{selectedCampaign.content}</div>
                </Card>
              </div>

              {selectedCampaign.status === 'sent' && (
                <div>
                  <p className="text-sm text-muted-foreground mb-3">{t.stats}</p>
                  <div className="grid grid-cols-3 gap-4">
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">{t.totalSent}</p>
                      <p className="text-2xl font-bold">{selectedCampaign.stats.sent}</p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">{t.opened}</p>
                      <p className="text-2xl font-bold">{selectedCampaign.stats.opened}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedCampaign.stats.delivered > 0 
                          ? `${((selectedCampaign.stats.opened / selectedCampaign.stats.delivered) * 100).toFixed(1)}%`
                          : '-'}
                      </p>
                    </Card>
                    <Card className="p-4">
                      <p className="text-sm text-muted-foreground">{t.clicked}</p>
                      <p className="text-2xl font-bold">{selectedCampaign.stats.clicked}</p>
                      <p className="text-xs text-muted-foreground">
                        {selectedCampaign.stats.delivered > 0 
                          ? `${((selectedCampaign.stats.clicked / selectedCampaign.stats.delivered) * 100).toFixed(1)}%`
                          : '-'}
                      </p>
                    </Card>
                  </div>
                </div>
              )}
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>
              {t.close}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Test Email Dialog */}
      <Dialog open={showTestDialog} onOpenChange={setShowTestDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.sendTest}</DialogTitle>
            <DialogDescription>
              {language === 'bn' 
                ? 'টেস্ট ইমেইল পাঠানোর জন্য একটি ইমেইল ঠিকানা লিখুন'
                : 'Enter an email address to send a test email'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>{t.testEmail}</Label>
              <Input
                type="email"
                value={testEmail}
                onChange={(e) => setTestEmail(e.target.value)}
                placeholder="example@email.com"
              />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowTestDialog(false)}>
              {t.cancel}
            </Button>
            <Button onClick={sendTestEmail}>
              <Send className="h-4 w-4 mr-2" />
              {t.send}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
