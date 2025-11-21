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
import { Checkbox } from './ui/checkbox';
import { Switch } from './ui/switch';
import { Textarea } from './ui/textarea';
import {
  Mail, Search, Download, UserPlus, Trash2, Filter, TrendingUp,
  Calendar, Users, Eye, Send, RefreshCw, AlertCircle, CheckCircle,
  XCircle, BarChart3, Database, FileDown, Star, Clock, Tag
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { NewsletterCampaigns } from './NewsletterCampaigns';
import { NewsletterAnalytics } from './NewsletterAnalytics';
import { EmailServiceIntegration } from './EmailServiceIntegration';

interface Subscriber {
  id: string;
  email: string;
  name?: string;
  phone?: string;
  source: string;
  status: 'active' | 'unsubscribed' | 'bounced';
  subscribedAt: string;
  tags: string[];
  interests?: string[];
}

interface NewsletterStats {
  totalSubscribers: number;
  activeSubscribers: number;
  newThisMonth: number;
  unsubscribedRate: number;
  topSources: { source: string; count: number }[];
}

interface NewsletterManagementProps {
  language: 'bn' | 'en';
}

const translations = {
  bn: {
    title: 'নিউজলেটার ম্যানেজমেন্ট',
    overview: 'সংক্ষিপ্ত বিবরণ',
    subscribers: 'সাবস্ক্রাইবার',
    settings: 'সেটিংস',
    totalSubscribers: 'মোট সাবস্ক্রাইবার',
    activeSubscribers: 'সক্রিয় সাবস্ক্রাইবার',
    newThisMonth: 'এই মাসে নতুন',
    unsubscribeRate: 'আনসাবস্ক্রাইব রেট',
    addSubscriber: 'সাবস্ক্রাইবার যোগ করুন',
    searchPlaceholder: 'ইমেইল বা নাম খুঁজুন...',
    filterByStatus: 'স্ট্যাটাস অনুযায়ী ফিল্টার',
    filterBySource: 'সোর্স অনুযায়ী ফিল্টার',
    exportData: 'ডেটা এক্সপোর্ট করুন',
    refreshData: 'রিফ্রেশ করুন',
    email: 'ইমেইল',
    name: 'নাম',
    phone: 'ফোন',
    source: 'সোর্স',
    status: 'স্ট্যাটাস',
    subscribedAt: 'সাবস্ক্রাইব করেছেন',
    actions: 'অ্যাকশন',
    active: 'সক্রিয়',
    unsubscribed: 'আনসাবস্ক্রাইব',
    bounced: 'বাউন্স',
    all: 'সব',
    view: 'দেখুন',
    delete: 'মুছে ফেলুন',
    tags: 'ট্যাগ',
    interests: 'আগ্রহ',
    addNewSubscriber: 'নতুন সাবস্ক্রাইবার যোগ করুন',
    enterEmail: 'ইমেইল লিখুন',
    enterName: 'নাম লিখুন (ঐচ্ছিক)',
    enterPhone: 'ফোন লিখুন (ঐচ্ছিক)',
    selectSource: 'সোর্স নির্বাচন করুন',
    websiteForm: 'ওয়েবসাইট ফর্ম',
    manualEntry: 'ম্যানুয়াল এন্ট্রি',
    import: 'ইম্পোর্ট',
    socialMedia: 'সোশ্যাল মিডিয়া',
    event: 'ইভেন্ট',
    referral: 'রেফারেল',
    cancel: 'বাতিল',
    add: 'যোগ করুন',
    loading: 'লোড হচ্ছে...',
    noSubscribers: 'কোনো সাবস্ক্রাইবার নেই',
    deleteConfirm: 'আপনি কি নিশ্চিত আপনি এই সাবস্ক্রাইবারকে মুছে ফেলতে চান?',
    deleteSuccess: 'সাবস্ক্রাইবার সফলভাবে মুছে ফেলা হয়েছে',
    addSuccess: 'সাবস্ক্রাইবার সফলভাবে যোগ করা হয়েছে',
    exportSuccess: 'ডেটা সফলভাবে এক্সপোর্ট করা হয়েছে',
    error: 'একটি ত্রুটি ঘটেছে',
    topSources: 'শীর্ষ সোর্স',
    subscriberDetails: 'সাবস্ক্রাইবার বিবরণ',
    subscriberInfo: 'সাবস্ক্রাইবার তথ্য',
    close: 'বন্ধ করুন',
    subscriptionDate: 'সাবস্ক্রিপশন তারিখ',
    noTags: 'কোনো ট্যাগ নেই',
    noInterests: 'কোনো আগ্রহ নেই',
    // Settings
    newsletterSettings: 'নিউজলেটার সেটিংস',
    generalSettings: 'সাধারণ সেটিংস',
    emailSettings: 'ইমেইল সেটিংস',
    senderName: 'প্রেরকের নাম',
    senderEmail: 'প্রেরকের ইমেইল',
    replyToEmail: 'উত্তর পাঠানোর ইমেইল',
    companyName: 'কোম্পানির নাম',
    companyAddress: 'কোম্পানির ঠিকানা',
    welcomeEmail: 'স্বাগত ইমেইল',
    welcomeEmailSubject: 'স্বাগত ইমেইল বিষয়',
    welcomeEmailBody: 'স্বাগত ইমেইল বডি',
    enableWelcomeEmail: 'স্বাগত ইমেইল সক্ষম করুন',
    enableDoubleOptIn: 'ডাবল অপ্ট-ইন সক্ষম করুন',
    doubleOptInDesc: 'সাবস্ক্রাইবারদের তাদের ইমেইল নিশ্চিত করতে হবে',
    autoResponder: 'অটো-রেসপন্ডার',
    enableAutoResponder: 'অটো-রেসপন্ডার সক্ষম করুন',
    frequency: 'ইমেইল ফ্রিকোয়েন্সি',
    daily: 'দৈনিক',
    weekly: 'সাপ্তাহিক',
    monthly: 'মাসিক',
    saveSettings: 'সেটিংস সংরক্ষণ করুন',
    settingsSaved: 'সেটিংস সফলভাবে সংরক্ষিত হয়েছে',
    unsubscribeFooter: 'আনসাবস্ক্রাইব ফুটার টেক্সট',
    defaultTags: 'ডিফল্ট ট্যাগ',
    enterTags: 'কমা দিয়ে আলাদা করে ট্যাগ লিখুন',
  },
  en: {
    title: 'Newsletter Management',
    overview: 'Overview',
    subscribers: 'Subscribers',
    settings: 'Settings',
    totalSubscribers: 'Total Subscribers',
    activeSubscribers: 'Active Subscribers',
    newThisMonth: 'New This Month',
    unsubscribeRate: 'Unsubscribe Rate',
    addSubscriber: 'Add Subscriber',
    searchPlaceholder: 'Search by email or name...',
    filterByStatus: 'Filter by Status',
    filterBySource: 'Filter by Source',
    exportData: 'Export Data',
    refreshData: 'Refresh',
    email: 'Email',
    name: 'Name',
    phone: 'Phone',
    source: 'Source',
    status: 'Status',
    subscribedAt: 'Subscribed At',
    actions: 'Actions',
    active: 'Active',
    unsubscribed: 'Unsubscribed',
    bounced: 'Bounced',
    all: 'All',
    view: 'View',
    delete: 'Delete',
    tags: 'Tags',
    interests: 'Interests',
    addNewSubscriber: 'Add New Subscriber',
    enterEmail: 'Enter Email',
    enterName: 'Enter Name (optional)',
    enterPhone: 'Enter Phone (optional)',
    selectSource: 'Select Source',
    websiteForm: 'Website Form',
    manualEntry: 'Manual Entry',
    import: 'Import',
    socialMedia: 'Social Media',
    event: 'Event',
    referral: 'Referral',
    cancel: 'Cancel',
    add: 'Add',
    loading: 'Loading...',
    noSubscribers: 'No subscribers found',
    deleteConfirm: 'Are you sure you want to delete this subscriber?',
    deleteSuccess: 'Subscriber deleted successfully',
    addSuccess: 'Subscriber added successfully',
    exportSuccess: 'Data exported successfully',
    error: 'An error occurred',
    topSources: 'Top Sources',
    subscriberDetails: 'Subscriber Details',
    subscriberInfo: 'Subscriber Information',
    close: 'Close',
    subscriptionDate: 'Subscription Date',
    noTags: 'No tags',
    noInterests: 'No interests',
    // Settings
    newsletterSettings: 'Newsletter Settings',
    generalSettings: 'General Settings',
    emailSettings: 'Email Settings',
    senderName: 'Sender Name',
    senderEmail: 'Sender Email',
    replyToEmail: 'Reply-To Email',
    companyName: 'Company Name',
    companyAddress: 'Company Address',
    welcomeEmail: 'Welcome Email',
    welcomeEmailSubject: 'Welcome Email Subject',
    welcomeEmailBody: 'Welcome Email Body',
    enableWelcomeEmail: 'Enable Welcome Email',
    enableDoubleOptIn: 'Enable Double Opt-In',
    doubleOptInDesc: 'Subscribers must confirm their email address',
    autoResponder: 'Auto-Responder',
    enableAutoResponder: 'Enable Auto-Responder',
    frequency: 'Email Frequency',
    daily: 'Daily',
    weekly: 'Weekly',
    monthly: 'Monthly',
    saveSettings: 'Save Settings',
    settingsSaved: 'Settings saved successfully',
    unsubscribeFooter: 'Unsubscribe Footer Text',
    defaultTags: 'Default Tags',
    enterTags: 'Enter tags separated by commas',
  }
};

export function NewsletterManagement({ language = 'bn' }: NewsletterManagementProps) {
  const t = translations[language];
  const [subscribers, setSubscribers] = useState<Subscriber[]>([]);
  const [stats, setStats] = useState<NewsletterStats>({
    totalSubscribers: 0,
    activeSubscribers: 0,
    newThisMonth: 0,
    unsubscribedRate: 0,
    topSources: []
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);
  const [selectedSubscriber, setSelectedSubscriber] = useState<Subscriber | null>(null);
  const [selectedSubscribers, setSelectedSubscribers] = useState<Set<string>>(new Set());

  // Form state
  const [newEmail, setNewEmail] = useState('');
  const [newName, setNewName] = useState('');
  const [newPhone, setNewPhone] = useState('');
  const [newSource, setNewSource] = useState('manual-entry');

  // Settings state
  const [settings, setSettings] = useState({
    senderName: 'Talent Tutor',
    senderEmail: 'newsletter@talenttutor.com',
    replyToEmail: 'support@talenttutor.com',
    companyName: 'Talent Tutor',
    companyAddress: 'Dhaka, Bangladesh',
    welcomeEmailSubject: 'Welcome to Talent Tutor Newsletter!',
    welcomeEmailBody: 'Thank you for subscribing to our newsletter. You will receive the latest updates and offers.',
    enableWelcomeEmail: true,
    enableDoubleOptIn: false,
    enableAutoResponder: false,
    frequency: 'weekly',
    unsubscribeFooter: 'You are receiving this email because you subscribed to our newsletter.',
    defaultTags: 'general,newsletter',
  });
  const [savingSettings, setSavingSettings] = useState(false);

  useEffect(() => {
    loadSubscribers();
    loadSettings();
  }, []);

  const loadSettings = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/newsletter/settings`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        if (data.settings) {
          setSettings(data.settings);
        }
      } else {
        // Silently use default settings if API not available
        console.log('Newsletter settings API not available, using defaults');
      }
    } catch (error) {
      // Silently use default settings if API not available
      console.log('Newsletter settings API not available, using defaults');
    }
  };

  const saveSettings = async () => {
    setSavingSettings(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/newsletter/settings`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify(settings),
        }
      );

      if (response.ok) {
        toast.success(t.settingsSaved);
      } else {
        toast.error(t.error);
      }
    } catch (error) {
      console.error('Failed to save settings:', error);
      toast.error(t.error);
    } finally {
      setSavingSettings(false);
    }
  };

  const loadSubscribers = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/newsletter/subscribers`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setSubscribers(data.subscribers || []);
        calculateStats(data.subscribers || []);
      } else {
        // Use empty data if API not available
        console.log('Newsletter subscribers API not available, starting with empty list');
        setSubscribers([]);
        calculateStats([]);
      }
    } catch (error) {
      // Use empty data if API not available
      console.log('Newsletter subscribers API not available, starting with empty list');
      setSubscribers([]);
      calculateStats([]);
    } finally {
      setLoading(false);
    }
  };

  const calculateStats = (subs: Subscriber[]) => {
    const total = subs.length;
    const active = subs.filter(s => s.status === 'active').length;
    const unsubscribed = subs.filter(s => s.status === 'unsubscribed').length;
    
    // Count new subscribers this month
    const now = new Date();
    const firstDayOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const newThisMonth = subs.filter(s => {
      const subDate = new Date(s.subscribedAt);
      return subDate >= firstDayOfMonth;
    }).length;

    // Calculate unsubscribe rate
    const unsubscribedRate = total > 0 ? (unsubscribed / total) * 100 : 0;

    // Top sources
    const sourceCounts = subs.reduce((acc, s) => {
      acc[s.source] = (acc[s.source] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topSources = Object.entries(sourceCounts)
      .map(([source, count]) => ({ source, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);

    setStats({
      totalSubscribers: total,
      activeSubscribers: active,
      newThisMonth,
      unsubscribedRate,
      topSources
    });
  };

  const addSubscriber = async () => {
    if (!newEmail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(newEmail)) {
      toast.error(language === 'bn' ? 'সঠিক ইমেইল লিখুন' : 'Please enter a valid email');
      return;
    }

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/newsletter/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email: newEmail,
            name: newName || undefined,
            phone: newPhone || undefined,
            source: newSource,
          }),
        }
      );

      if (response.ok) {
        toast.success(t.addSuccess);
        setShowAddDialog(false);
        setNewEmail('');
        setNewName('');
        setNewPhone('');
        setNewSource('manual-entry');
        loadSubscribers();
      } else {
        const error = await response.json();
        toast.error(error.error || t.error);
      }
    } catch (error) {
      console.error('Failed to add subscriber:', error);
      toast.error(t.error);
    }
  };

  const deleteSubscriber = async (id: string) => {
    if (!confirm(t.deleteConfirm)) return;

    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/newsletter/subscriber/${id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        toast.success(t.deleteSuccess);
        loadSubscribers();
      } else {
        toast.error(t.error);
      }
    } catch (error) {
      console.error('Failed to delete subscriber:', error);
      toast.error(t.error);
    }
  };

  const exportSubscribers = () => {
    const csvContent = [
      ['Email', 'Name', 'Phone', 'Source', 'Status', 'Subscribed At', 'Tags'].join(','),
      ...filteredSubscribers.map(s => [
        s.email,
        s.name || '',
        s.phone || '',
        s.source,
        s.status,
        new Date(s.subscribedAt).toLocaleDateString(),
        s.tags.join(';')
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `subscribers_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast.success(t.exportSuccess);
  };

  const filteredSubscribers = subscribers.filter(sub => {
    const matchesSearch = searchQuery === '' ||
      sub.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (sub.name && sub.name.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesStatus = statusFilter === 'all' || sub.status === statusFilter;
    const matchesSource = sourceFilter === 'all' || sub.source === sourceFilter;

    return matchesSearch && matchesStatus && matchesSource;
  });

  const uniqueSources = Array.from(new Set(subscribers.map(s => s.source)));

  const getStatusBadge = (status: string) => {
    const variants = {
      active: 'default' as const,
      unsubscribed: 'secondary' as const,
      bounced: 'destructive' as const,
    };
    return <Badge variant={variants[status as keyof typeof variants]}>{t[status as keyof typeof t]}</Badge>;
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <Mail className="h-6 w-6 text-purple-600" />
            {t.title}
          </h2>
        </div>
      </div>

      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="subscribers">{t.subscribers}</TabsTrigger>
          <TabsTrigger value="campaigns">{language === 'bn' ? 'ক্যাম্পেইন' : 'Campaigns'}</TabsTrigger>
          <TabsTrigger value="analytics">{language === 'bn' ? 'অ্যানালিটিক্স' : 'Analytics'}</TabsTrigger>
          <TabsTrigger value="email-service">{language === 'bn' ? 'ইমেইল সার্ভিস' : 'Email Service'}</TabsTrigger>
          <TabsTrigger value="settings">{t.settings}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* Stats Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.totalSubscribers}</p>
                    <h3 className="mt-2">{stats.totalSubscribers}</h3>
                  </div>
                  <Users className="h-8 w-8 text-purple-600" />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.activeSubscribers}</p>
                    <h3 className="mt-2">{stats.activeSubscribers}</h3>
                  </div>
                  <CheckCircle className="h-8 w-8 text-green-600" />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.newThisMonth}</p>
                    <h3 className="mt-2">+{stats.newThisMonth}</h3>
                  </div>
                  <TrendingUp className="h-8 w-8 text-blue-600" />
                </div>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-muted-foreground">{t.unsubscribeRate}</p>
                    <h3 className="mt-2">{stats.unsubscribedRate.toFixed(1)}%</h3>
                  </div>
                  <BarChart3 className="h-8 w-8 text-orange-600" />
                </div>
              </Card>
            </motion.div>
          </div>

          {/* Top Sources */}
          <Card className="p-6">
            <h3 className="mb-4 flex items-center gap-2">
              <Star className="h-5 w-5 text-purple-600" />
              {t.topSources}
            </h3>
            <div className="space-y-3">
              {stats.topSources.map((item, index) => (
                <div key={index} className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Badge variant="outline">{index + 1}</Badge>
                    <span className="capitalize">{item.source.replace('-', ' ')}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-32 h-2 bg-gray-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-purple-600 rounded-full"
                        style={{ width: `${(item.count / stats.totalSubscribers) * 100}%` }}
                      />
                    </div>
                    <span>{item.count}</span>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>

        {/* Subscribers Tab */}
        <TabsContent value="subscribers" className="space-y-4">
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
                  <SelectItem value="active">{t.active}</SelectItem>
                  <SelectItem value="unsubscribed">{t.unsubscribed}</SelectItem>
                  <SelectItem value="bounced">{t.bounced}</SelectItem>
                </SelectContent>
              </Select>

              <Select value={sourceFilter} onValueChange={setSourceFilter}>
                <SelectTrigger className="w-full md:w-48">
                  <SelectValue placeholder={t.filterBySource} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.all}</SelectItem>
                  {uniqueSources.map(source => (
                    <SelectItem key={source} value={source}>
                      {source.replace('-', ' ')}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <div className="flex gap-2">
                <Button onClick={() => setShowAddDialog(true)} className="gap-2">
                  <UserPlus className="h-4 w-4" />
                  {t.addSubscriber}
                </Button>
                <Button variant="outline" onClick={exportSubscribers} className="gap-2">
                  <Download className="h-4 w-4" />
                  {t.exportData}
                </Button>
                <Button variant="outline" onClick={loadSubscribers} size="icon">
                  <RefreshCw className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </Card>

          {/* Subscribers Table */}
          <Card>
            <ScrollArea className="h-[500px]">
              {loading ? (
                <div className="flex items-center justify-center h-64">
                  <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
                </div>
              ) : filteredSubscribers.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-64 text-muted-foreground">
                  <Mail className="h-12 w-12 mb-3 opacity-50" />
                  <p>{t.noSubscribers}</p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-12">
                        <Checkbox
                          checked={selectedSubscribers.size === filteredSubscribers.length}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedSubscribers(new Set(filteredSubscribers.map(s => s.id)));
                            } else {
                              setSelectedSubscribers(new Set());
                            }
                          }}
                        />
                      </TableHead>
                      <TableHead>{t.email}</TableHead>
                      <TableHead>{t.name}</TableHead>
                      <TableHead>{t.source}</TableHead>
                      <TableHead>{t.status}</TableHead>
                      <TableHead>{t.subscribedAt}</TableHead>
                      <TableHead>{t.actions}</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredSubscribers.map((subscriber) => (
                      <TableRow key={subscriber.id}>
                        <TableCell>
                          <Checkbox
                            checked={selectedSubscribers.has(subscriber.id)}
                            onCheckedChange={(checked) => {
                              const newSelected = new Set(selectedSubscribers);
                              if (checked) {
                                newSelected.add(subscriber.id);
                              } else {
                                newSelected.delete(subscriber.id);
                              }
                              setSelectedSubscribers(newSelected);
                            }}
                          />
                        </TableCell>
                        <TableCell className="font-medium">{subscriber.email}</TableCell>
                        <TableCell>{subscriber.name || '-'}</TableCell>
                        <TableCell>
                          <Badge variant="outline" className="capitalize">
                            {subscriber.source.replace('-', ' ')}
                          </Badge>
                        </TableCell>
                        <TableCell>{getStatusBadge(subscriber.status)}</TableCell>
                        <TableCell>
                          {new Date(subscriber.subscribedAt).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => {
                                setSelectedSubscriber(subscriber);
                                setShowDetailsDialog(true);
                              }}
                            >
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              onClick={() => deleteSubscriber(subscriber.id)}
                            >
                              <Trash2 className="h-4 w-4 text-red-600" />
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
        </TabsContent>

        {/* Campaigns Tab */}
        <TabsContent value="campaigns" className="space-y-6">
          <NewsletterCampaigns language={language} />
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-6">
          <NewsletterAnalytics language={language} />
        </TabsContent>

        {/* Email Service Tab */}
        <TabsContent value="email-service" className="space-y-6">
          <EmailServiceIntegration language={language} />
        </TabsContent>

        {/* Settings Tab */}
        <TabsContent value="settings" className="space-y-6">
          <Card className="p-6">
            <h3 className="mb-6 flex items-center gap-2">
              <Mail className="h-5 w-5 text-purple-600" />
              {t.generalSettings}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <Label htmlFor="senderName">{t.senderName}</Label>
                <Input
                  id="senderName"
                  value={settings.senderName}
                  onChange={(e) => setSettings({ ...settings, senderName: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="senderEmail">{t.senderEmail}</Label>
                <Input
                  id="senderEmail"
                  type="email"
                  value={settings.senderEmail}
                  onChange={(e) => setSettings({ ...settings, senderEmail: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="replyToEmail">{t.replyToEmail}</Label>
                <Input
                  id="replyToEmail"
                  type="email"
                  value={settings.replyToEmail}
                  onChange={(e) => setSettings({ ...settings, replyToEmail: e.target.value })}
                />
              </div>

              <div>
                <Label htmlFor="companyName">{t.companyName}</Label>
                <Input
                  id="companyName"
                  value={settings.companyName}
                  onChange={(e) => setSettings({ ...settings, companyName: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="companyAddress">{t.companyAddress}</Label>
                <Input
                  id="companyAddress"
                  value={settings.companyAddress}
                  onChange={(e) => setSettings({ ...settings, companyAddress: e.target.value })}
                />
              </div>

              <div className="md:col-span-2">
                <Label htmlFor="defaultTags">{t.defaultTags}</Label>
                <Input
                  id="defaultTags"
                  placeholder={t.enterTags}
                  value={settings.defaultTags}
                  onChange={(e) => setSettings({ ...settings, defaultTags: e.target.value })}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-6 flex items-center gap-2">
              <Send className="h-5 w-5 text-purple-600" />
              {t.welcomeEmail}
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t.enableWelcomeEmail}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' 
                      ? 'নতুন সাবস্ক্রাইবারদের স্বাগত ইমেইল পাঠান' 
                      : 'Send welcome email to new subscribers'}
                  </p>
                </div>
                <Switch
                  checked={settings.enableWelcomeEmail}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableWelcomeEmail: checked })}
                />
              </div>

              <div>
                <Label htmlFor="welcomeEmailSubject">{t.welcomeEmailSubject}</Label>
                <Input
                  id="welcomeEmailSubject"
                  value={settings.welcomeEmailSubject}
                  onChange={(e) => setSettings({ ...settings, welcomeEmailSubject: e.target.value })}
                  disabled={!settings.enableWelcomeEmail}
                />
              </div>

              <div>
                <Label htmlFor="welcomeEmailBody">{t.welcomeEmailBody}</Label>
                <Textarea
                  id="welcomeEmailBody"
                  value={settings.welcomeEmailBody}
                  onChange={(e) => setSettings({ ...settings, welcomeEmailBody: e.target.value })}
                  disabled={!settings.enableWelcomeEmail}
                  rows={5}
                />
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="mb-6 flex items-center gap-2">
              <CheckCircle className="h-5 w-5 text-purple-600" />
              {t.autoResponder}
            </h3>
            
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <Label>{t.enableDoubleOptIn}</Label>
                  <p className="text-sm text-muted-foreground">{t.doubleOptInDesc}</p>
                </div>
                <Switch
                  checked={settings.enableDoubleOptIn}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableDoubleOptIn: checked })}
                />
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <Label>{t.enableAutoResponder}</Label>
                  <p className="text-sm text-muted-foreground">
                    {language === 'bn' 
                      ? 'স্বয়ংক্রিয় উত্তর সক্ষম করুন' 
                      : 'Enable automatic responses'}
                  </p>
                </div>
                <Switch
                  checked={settings.enableAutoResponder}
                  onCheckedChange={(checked) => setSettings({ ...settings, enableAutoResponder: checked })}
                />
              </div>

              <div>
                <Label htmlFor="frequency">{t.frequency}</Label>
                <Select 
                  value={settings.frequency} 
                  onValueChange={(value) => setSettings({ ...settings, frequency: value })}
                >
                  <SelectTrigger id="frequency">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="daily">{t.daily}</SelectItem>
                    <SelectItem value="weekly">{t.weekly}</SelectItem>
                    <SelectItem value="monthly">{t.monthly}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="unsubscribeFooter">{t.unsubscribeFooter}</Label>
                <Textarea
                  id="unsubscribeFooter"
                  value={settings.unsubscribeFooter}
                  onChange={(e) => setSettings({ ...settings, unsubscribeFooter: e.target.value })}
                  rows={3}
                />
              </div>
            </div>
          </Card>

          <div className="flex justify-end">
            <Button 
              onClick={saveSettings} 
              disabled={savingSettings}
              className="gap-2"
              size="lg"
            >
              {savingSettings ? (
                <RefreshCw className="h-4 w-4 animate-spin" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              {t.saveSettings}
            </Button>
          </div>
        </TabsContent>
      </Tabs>

      {/* Add Subscriber Dialog */}
      <Dialog open={showAddDialog} onOpenChange={setShowAddDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.addNewSubscriber}</DialogTitle>
            <DialogDescription>
              {language === 'bn' 
                ? 'নতুন সাবস্ক্রাইবারের তথ্য লিখুন' 
                : 'Enter new subscriber information'}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="email">{t.email} *</Label>
              <Input
                id="email"
                type="email"
                placeholder={t.enterEmail}
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="name">{t.name}</Label>
              <Input
                id="name"
                placeholder={t.enterName}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="phone">{t.phone}</Label>
              <Input
                id="phone"
                placeholder={t.enterPhone}
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
              />
            </div>

            <div>
              <Label htmlFor="source">{t.source}</Label>
              <Select value={newSource} onValueChange={setNewSource}>
                <SelectTrigger id="source">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="website-form">{t.websiteForm}</SelectItem>
                  <SelectItem value="manual-entry">{t.manualEntry}</SelectItem>
                  <SelectItem value="import">{t.import}</SelectItem>
                  <SelectItem value="social-media">{t.socialMedia}</SelectItem>
                  <SelectItem value="event">{t.event}</SelectItem>
                  <SelectItem value="referral">{t.referral}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowAddDialog(false)}>
              {t.cancel}
            </Button>
            <Button onClick={addSubscriber}>
              {t.add}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Subscriber Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.subscriberDetails}</DialogTitle>
          </DialogHeader>

          {selectedSubscriber && (
            <div className="space-y-4 py-4">
              <div className="space-y-3">
                <div>
                  <Label className="text-muted-foreground">{t.email}</Label>
                  <p className="font-medium">{selectedSubscriber.email}</p>
                </div>

                {selectedSubscriber.name && (
                  <div>
                    <Label className="text-muted-foreground">{t.name}</Label>
                    <p className="font-medium">{selectedSubscriber.name}</p>
                  </div>
                )}

                {selectedSubscriber.phone && (
                  <div>
                    <Label className="text-muted-foreground">{t.phone}</Label>
                    <p className="font-medium">{selectedSubscriber.phone}</p>
                  </div>
                )}

                <div>
                  <Label className="text-muted-foreground">{t.source}</Label>
                  <p className="font-medium capitalize">{selectedSubscriber.source.replace('-', ' ')}</p>
                </div>

                <div>
                  <Label className="text-muted-foreground">{t.status}</Label>
                  <div className="mt-1">{getStatusBadge(selectedSubscriber.status)}</div>
                </div>

                <div>
                  <Label className="text-muted-foreground">{t.subscriptionDate}</Label>
                  <p className="font-medium">
                    {new Date(selectedSubscriber.subscribedAt).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                  </p>
                </div>

                {selectedSubscriber.tags.length > 0 && (
                  <div>
                    <Label className="text-muted-foreground">{t.tags}</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedSubscriber.tags.map((tag, i) => (
                        <Badge key={i} variant="secondary">
                          <Tag className="h-3 w-3 mr-1" />
                          {tag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {selectedSubscriber.interests && selectedSubscriber.interests.length > 0 && (
                  <div>
                    <Label className="text-muted-foreground">{t.interests}</Label>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {selectedSubscriber.interests.map((interest, i) => (
                        <Badge key={i} variant="outline">{interest}</Badge>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button onClick={() => setShowDetailsDialog(false)}>
              {t.close}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
