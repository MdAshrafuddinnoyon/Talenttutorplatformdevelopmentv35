import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Bell, Check, Trash2, Filter, Search, Video, FileText, DollarSign } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Card } from '../components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';
import { toast } from 'sonner@2.0.3';
import { type User } from '../utils/authGuard';

interface Notification {
  id: string;
  type: 'job_applied' | 'job_accepted' | 'donation_received' | 'credit_added' | 'message_received' | 'application_status' | 'review_received' | 'book_donated' | 'video_meeting' | 'agreement_sent' | 'agreement_accepted' | 'credits_deducted';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
  priority?: 'high' | 'medium' | 'low';
}

interface NotificationsPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  currentUser?: User | null;
  onLogin?: (user: User) => void;
}

export function NotificationsPage({ language, setLanguage, setPage, announcement, currentUser, onLogin }: NotificationsPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [pendingNavigation, setPendingNavigation] = useState<string | null>(null);
  
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'job_applied',
      title: 'নতুন আবেদন',
      message: 'আহমেদ হোসেন আপনার "ক্লাস ১০ গণিত টিউশন - উত্তরা" জবে আবেদন করেছেন। তার প্রোফাইল দেখুন এবং সাক্ষাৎকার নির্ধারণ করুন।',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
      link: 'guardian-dashboard',
      priority: 'high'
    },
    {
      id: '2',
      type: 'job_accepted',
      title: 'আবেদন গৃহীত',
      message: 'শুভ! ফাতিমা খানম আপনার "ইংরেজি স্পোকেন কোর্স" জবের আবেদন গ্রহণ করেছে। এখন তাদের সাথে যোগাযোগ করুন।',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      read: false,
      link: 'teacher-dashboard',
      priority: 'high'
    },
    {
      id: '3',
      type: 'video_meeting',
      title: 'ভিডিও মিটিং নির্ধারিত',
      message: 'আহমেদ হোসেন এর সাথে ভিডিও মিটিং নির্ধারিত হয়েছে। তারিখ: ২ নভেম্বর ২০২৫, সময়: ১০:০০ AM। ২০ ক্রেডিট কেটে নেওয়া হয়েছে।',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      read: false,
      link: 'messages',
      priority: 'high'
    },
    {
      id: '4',
      type: 'agreement_sent',
      title: 'চুক্তি পাঠানো হয়েছে',
      message: 'আপনি আহমেদ হোসেন কে একটি টিউশন চুক্তি পাঠিয়েছেন। বিষয়: গণিত, পদার্থবিজ্ঞান। বেতন: ১৫০০০ টাকা/মাস। শিক্ষকের অনুমোদনের জন্য অপেক্ষা করুন।',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      read: false,
      link: 'messages',
      priority: 'high'
    },
    {
      id: '5',
      type: 'credits_deducted',
      title: 'ক্রেডিট কেটে নেওয়া হয়েছে',
      message: 'ভিডিও মিটিং নির্ধারণের জন্য আপনার একাউন্ট থেকে ২০ ক্রেডিট কেটে নেওয়া হয়েছে। বর্তমান ব্যালেন্স: ৮০ ক্রেডিট।',
      timestamp: new Date(Date.now() - 1000 * 60 * 25),
      read: true,
      link: 'subscription',
      priority: 'medium'
    },
    {
      id: '6',
      type: 'credit_added',
      title: 'ক্রেডিট যোগ হয়েছে',
      message: 'আপনার একাউন্টে ৫০ ক্রেডিট সফলভাবে যোগ হয়েছে। এখন নতুন জবে আবেদন করুন।',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      link: 'subscription',
      priority: 'medium'
    },
    {
      id: '7',
      type: 'donation_received',
      title: 'দান সফল',
      message: 'আপনার ৫০০ টাকার দান সফলভাবে প্রক্রিয়া করা হয়েছে। আপনার অবদানের জন্য ধন্যবাদ!',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: true,
      link: 'donation',
      priority: 'low'
    },
    {
      id: '8',
      type: 'message_received',
      title: 'নতুন বার্তা',
      message: 'রহিম উদ্দিন আপনাকে একটি বার্তা পাঠিয়েছে। তার প্রশ্নের উত্তর দিন।',
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
      read: true,
      priority: 'medium'
    },
    {
      id: '9',
      type: 'review_received',
      title: 'নতুন রিভিউ',
      message: 'সালমা খাতুন আপনাকে ৫ স্টার রিভিউ দিয়েছে! "অসাধারণ শিক্ষক, অনেক ধন্যবাদ!"',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      read: true,
      link: 'teacher-profile',
      priority: 'low'
    },
    {
      id: '10',
      type: 'book_donated',
      title: 'বই দান সফল',
      message: 'আপনার "উচ্চ মাধ্যমিক পদার্থবিজ্ঞান" বইটি লাইব্রেরিতে যুক্ত হয়েছে। একজন শিক্ষার্থী উপকৃত হবে।',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      read: true,
      link: 'library',
      priority: 'low'
    },
    {
      id: '11',
      type: 'application_status',
      title: 'আবেদন আপডেট',
      message: 'আপনার "পদার্থবিজ্ঞান HSC ব্যাচ" জবের আবেদন পর্যালোচনা করা হচ্ছে।',
      timestamp: new Date(Date.now() - 1000 * 60 * 240),
      read: true,
      link: 'teacher-dashboard',
      priority: 'medium'
    },
  ]);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
  };

  const deleteAllRead = () => {
    setNotifications(prev => prev.filter(n => !n.read));
  };

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    
    if (notification.link && setPage) {
      // Define public pages that don't require authentication
      const publicPages = [
        'home', 'about', 'find-teachers', 'for-teachers', 'for-guardians', 
        'donation', 'subscription', 'library', 'blog', 'contact', 'faq',
        'privacy-policy', 'terms', 'how-it-works', 'teacher-profile-view',
        'guardian-profile-view', 'job-details', 'browse-tuitions', 'tuition-posts'
      ];
      
      const isPublic = publicPages.includes(notification.link);
      
      if (isPublic) {
        // Public pages - navigate directly
        setPage(notification.link);
      } else {
        // Protected pages - check authentication
        if (currentUser) {
          // User is authenticated - navigate directly
          setPage(notification.link);
        } else {
          // User not authenticated - show auth dialog
          setPendingNavigation(notification.link);
          setShowAuthDialog(true);
          toast.error(
            language === 'bn'
              ? 'এই পেজে যেতে লগইন করুন'
              : 'Please login to access this page'
          );
        }
      }
    }
  };

  const handleLoginSuccess = (user: User) => {
    setShowAuthDialog(false);
    if (onLogin) {
      onLogin(user);
    }
    // Navigate to pending page after successful login
    if (pendingNavigation && setPage) {
      setPage(pendingNavigation);
      setPendingNavigation(null);
    }
    toast.success(
      language === 'bn' ? 'সফলভাবে লগইন হয়েছে!' : 'Successfully logged in!'
    );
  };

  const getNotificationIcon = (type: Notification['type']) => {
    switch (type) {
      case 'job_applied':
        return '📝';
      case 'job_accepted':
        return '✅';
      case 'donation_received':
        return '💝';
      case 'credit_added':
        return '💰';
      case 'message_received':
        return '💬';
      case 'application_status':
        return '📋';
      case 'review_received':
        return '⭐';
      case 'book_donated':
        return '📚';
      case 'video_meeting':
        return '📹';
      case 'agreement_sent':
        return '📄';
      case 'agreement_accepted':
        return '✅';
      case 'credits_deducted':
        return '💸';
      default:
        return '🔔';
    }
  };

  const formatTimestamp = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'এখনই';
    if (diffInMinutes < 60) return `${diffInMinutes} মিনিট আগে`;
    
    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24) return `${diffInHours} ঘণ্টা আগে`;
    
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays < 7) return `${diffInDays} দিন আগে`;
    
    return date.toLocaleDateString('bn-BD', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const getTypeLabel = (type: Notification['type']) => {
    const labels = {
      job_applied: 'জব আবেদন',
      job_accepted: 'জব গৃহীত',
      donation_received: 'দান',
      credit_added: 'ক্রেডিট',
      message_received: 'বার্তা',
      application_status: 'আবেদন স্ট্যাটাস',
      review_received: 'রিভিউ',
      book_donated: 'বই দান'
    };
    return labels[type];
  };

  const filteredNotifications = notifications
    .filter(n => {
      if (filterType !== 'all' && n.type !== filterType) return false;
      if (searchQuery && !n.title.toLowerCase().includes(searchQuery.toLowerCase()) && !n.message.toLowerCase().includes(searchQuery.toLowerCase())) return false;
      return true;
    });

  const unreadCount = notifications.filter(n => !n.read).length;
  const unreadNotifications = filteredNotifications.filter(n => !n.read);
  const readNotifications = filteredNotifications.filter(n => n.read);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} onLogin={onLogin} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl md:text-4xl mb-2 flex items-center gap-3">
                <Bell className="w-8 h-8 text-emerald-600" />
                সব বিজ্ঞপ্তি
              </h1>
              <p className="text-gray-600">
                {unreadCount > 0 ? (
                  <>আপনার <span className="text-emerald-600">{unreadCount}</span> টি নতুন বিজ্ঞপ্তি রয়েছে</>
                ) : (
                  'সব বিজ্ঞপ্তি পড়া হয়েছে'
                )}
              </p>
            </div>
            <div className="flex gap-2">
              {unreadCount > 0 && (
                <Button
                  variant="outline"
                  onClick={markAllAsRead}
                  className="gap-2"
                >
                  <Check className="w-4 h-4" />
                  সব পড়া হয়েছে
                </Button>
              )}
              {readNotifications.length > 0 && (
                <Button
                  variant="outline"
                  onClick={deleteAllRead}
                  className="gap-2 text-red-600 hover:text-red-700"
                >
                  <Trash2 className="w-4 h-4" />
                  পড়া মুছুন
                </Button>
              )}
            </div>
          </div>

          {/* Search and Filter */}
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="বিজ্ঞপ্তি খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select value={filterType || 'all'} onValueChange={(value) => setFilterType(value || 'all')}>
              <SelectTrigger className="w-full sm:w-48">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue placeholder="ধরন নির্বাচন করুন" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">সব ধরন</SelectItem>
                <SelectItem value="job_applied">জব আবেদন</SelectItem>
                <SelectItem value="job_accepted">জব গৃহীত</SelectItem>
                <SelectItem value="donation_received">দান</SelectItem>
                <SelectItem value="credit_added">ক্রেডিট</SelectItem>
                <SelectItem value="message_received">বার্তা</SelectItem>
                <SelectItem value="application_status">আবেদন স্ট্যাটাস</SelectItem>
                <SelectItem value="review_received">রিভিউ</SelectItem>
                <SelectItem value="book_donated">বই দান</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Notifications Tabs */}
        <Tabs defaultValue="all" className="w-full">
          <TabsList className="w-full justify-start mb-6">
            <TabsTrigger value="all" className="flex-1 sm:flex-none">
              সব ({filteredNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="unread" className="flex-1 sm:flex-none">
              না পড়া ({unreadNotifications.length})
            </TabsTrigger>
            <TabsTrigger value="read" className="flex-1 sm:flex-none">
              পড়া ({readNotifications.length})
            </TabsTrigger>
          </TabsList>

          {/* All Notifications */}
          <TabsContent value="all">
            {filteredNotifications.length === 0 ? (
              <Card className="p-12 text-center">
                <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl mb-2 text-gray-600">কোনো বিজ্ঞপ্তি নেই</h3>
                <p className="text-gray-500">এই মুহূর্তে কোনো বিজ্ঞপ্তি পাওয়া যায়নি</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {filteredNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={markAsRead}
                    onDelete={deleteNotification}
                    onClick={handleNotificationClick}
                    getIcon={getNotificationIcon}
                    formatTime={formatTimestamp}
                    getTypeLabel={getTypeLabel}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Unread Notifications */}
          <TabsContent value="unread">
            {unreadNotifications.length === 0 ? (
              <Card className="p-12 text-center">
                <Check className="w-16 h-16 mx-auto mb-4 text-emerald-300" />
                <h3 className="text-xl mb-2 text-gray-600">সব পড়া হয়েছে!</h3>
                <p className="text-gray-500">আপনি সব বিজ্ঞপ্তি দেখেছেন</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {unreadNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={markAsRead}
                    onDelete={deleteNotification}
                    onClick={handleNotificationClick}
                    getIcon={getNotificationIcon}
                    formatTime={formatTimestamp}
                    getTypeLabel={getTypeLabel}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          {/* Read Notifications */}
          <TabsContent value="read">
            {readNotifications.length === 0 ? (
              <Card className="p-12 text-center">
                <Bell className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl mb-2 text-gray-600">কোনো পড়া বিজ্ঞপ্তি নেই</h3>
                <p className="text-gray-500">আপনি এখনো কোনো বিজ্ঞপ্তি পড়েননি</p>
              </Card>
            ) : (
              <div className="space-y-3">
                {readNotifications.map(notification => (
                  <NotificationItem
                    key={notification.id}
                    notification={notification}
                    onRead={markAsRead}
                    onDelete={deleteNotification}
                    onClick={handleNotificationClick}
                    getIcon={getNotificationIcon}
                    formatTime={formatTimestamp}
                    getTypeLabel={getTypeLabel}
                  />
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </main>

      <Footer language={language} setPage={setPage} />

      {/* Modern Auth Dialog - Global authentication */}
      <UnifiedAuthDialog
        open={showAuthDialog}
        onOpenChange={(open) => {
          setShowAuthDialog(open);
          if (!open) setPendingNavigation(null);
        }}
        language={language}
        onLogin={(userType, userData) => {
          handleLoginSuccess(userType as any);
        }}
        initialMode="register"
      />
    </div>
  );
}

interface NotificationItemProps {
  notification: Notification;
  onRead: (id: string) => void;
  onDelete: (id: string, e: React.MouseEvent) => void;
  onClick: (notification: Notification) => void;
  getIcon: (type: Notification['type']) => string;
  formatTime: (date: Date) => string;
  getTypeLabel: (type: Notification['type']) => string;
}

function NotificationItem({ 
  notification, 
  onRead, 
  onDelete, 
  onClick, 
  getIcon, 
  formatTime,
  getTypeLabel 
}: NotificationItemProps) {
  const priorityColors = {
    high: 'border-l-red-500 bg-red-50/30',
    medium: 'border-l-amber-500 bg-amber-50/30',
    low: 'border-l-emerald-500 bg-emerald-50/30',
  };

  return (
    <Card
      onClick={() => onClick(notification)}
      className={`p-4 cursor-pointer hover:shadow-md transition-all border-l-4 ${
        notification.priority ? priorityColors[notification.priority] : 'border-l-gray-300'
      } ${!notification.read ? 'bg-blue-50/50' : ''} group`}
    >
      <div className="flex gap-4">
        {/* Icon */}
        <div className="text-3xl flex-shrink-0">
          {getIcon(notification.type)}
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className={`${!notification.read ? '' : ''}`}>
                  {notification.title}
                </h3>
                {!notification.read && (
                  <div className="w-2 h-2 bg-blue-600 rounded-full" />
                )}
              </div>
              <Badge variant="secondary" className="text-xs">
                {getTypeLabel(notification.type)}
              </Badge>
            </div>
            
            {/* Actions */}
            <div className="flex gap-1">
              {!notification.read && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={(e) => {
                    e.stopPropagation();
                    onRead(notification.id);
                  }}
                  title="পড়া হয়েছে চিহ্নিত করুন"
                >
                  <Check className="w-4 h-4" />
                </Button>
              )}
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 text-red-600 opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => onDelete(notification.id, e)}
                title="মুছে ফেলুন"
              >
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <p className="text-sm text-gray-700 mb-2 leading-relaxed">
            {notification.message}
          </p>

          <div className="flex items-center gap-3 text-xs text-gray-500">
            <span>{formatTime(notification.timestamp)}</span>
            {notification.priority && (
              <Badge 
                variant={notification.priority === 'high' ? 'destructive' : 'secondary'}
                className="text-xs px-2 py-0"
              >
                {notification.priority === 'high' ? 'জরুরি' : notification.priority === 'medium' ? 'মাঝারি' : 'সাধারণ'}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
