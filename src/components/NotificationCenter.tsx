import { useState, useEffect } from 'react';
import { 
  Bell, 
  Check, 
  X, 
  ExternalLink, 
  MessageCircle, 
  CreditCard, 
  Heart, 
  Briefcase, 
  UserCheck, 
  Book, 
  AlertCircle, 
  CheckCircle2, 
  Star,
  Video,
  FileText,
  Calendar,
  DollarSign,
  Gift,
  Settings,
  Trash2,
  CheckCheck,
} from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from './ui/dropdown-menu';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Notification {
  id: string;
  type: 
    | 'job_applied' 
    | 'job_accepted' 
    | 'donation_received' 
    | 'credit_added' 
    | 'message_received' 
    | 'application_status' 
    | 'review_received' 
    | 'book_donated' 
    | 'verification' 
    | 'payment' 
    | 'contact_approved'
    | 'meeting_request'
    | 'meeting_scheduled'
    | 'meeting_reminder'
    | 'meeting_cancelled'
    | 'agreement_received'
    | 'agreement_approved'
    | 'agreement_rejected'
    | 'contract_signed'
    | 'payment_due'
    | 'payment_received'
    | 'system_alert'
    | 'subscription_expiry';
  title: string;
  message: string;
  timestamp: Date;
  read: boolean;
  link?: string;
  priority?: 'low' | 'medium' | 'high';
  actionable?: boolean;
  actions?: {
    label: string;
    action: () => void;
    variant?: 'default' | 'destructive' | 'outline';
  }[];
  targetUser?: 'teacher' | 'guardian' | 'student' | 'donor' | 'admin' | 'all';
}

interface NotificationCenterProps {
  setPage?: (page: string) => void;
  language?: 'bn' | 'en';
  userRole?: 'teacher' | 'guardian' | 'student' | 'donor' | 'admin' | null;
  userId?: string;
}

const content = {
  bn: {
    notifications: 'নোটিফিকেশন',
    markAllRead: 'সব পড়া হয়েছে',
    noNotifications: 'কোনো নোটিফিকেশন নেই',
    viewAll: 'সব দেখুন',
    justNow: 'এইমাত্র',
    minutesAgo: 'মিনিট আগে',
    hoursAgo: 'ঘন্টা আগে',
    daysAgo: 'দিন আগে',
    delete: 'ডিলিট',
    new: 'নতুন',
    all: 'সব',
    unread: 'না পড়া',
    meetings: 'মিটিং',
    agreements: 'চুক্তি',
    payments: 'পেমেন্ট',
    clearAll: 'সব মুছে ফেলুন',
    settings: 'সেটিংস',
    approve: 'অনুমোদন',
    reject: 'প্রত্যাখ্যান',
    view: 'দেখুন',
    accept: 'গ্রহণ',
    decline: 'বাতিল',
  },
  en: {
    notifications: 'Notifications',
    markAllRead: 'Mark all as read',
    noNotifications: 'No notifications',
    viewAll: 'View All',
    justNow: 'Just now',
    minutesAgo: 'minutes ago',
    hoursAgo: 'hours ago',
    daysAgo: 'days ago',
    delete: 'Delete',
    new: 'New',
    all: 'All',
    unread: 'Unread',
    meetings: 'Meetings',
    agreements: 'Agreements',
    payments: 'Payments',
    clearAll: 'Clear All',
    settings: 'Settings',
    approve: 'Approve',
    reject: 'Reject',
    view: 'View',
    accept: 'Accept',
    decline: 'Decline',
  },
};

// Generate user-specific notifications based on role
const generateNotifications = (userRole: string | null | undefined, language: 'bn' | 'en'): Notification[] => {
  const teacherNotifications: Notification[] = [
    {
      id: 't1',
      type: 'meeting_request',
      title: language === 'bn' ? 'মিটিং রিকুয়েস্ট' : 'Meeting Request',
      message: language === 'bn' 
        ? 'রহিমা খাতুন একটি ভিডিও মিটিং এর জন্য অনুরোধ করেছেন - আগামীকাল ৫:০০ PM'
        : 'Rahima Khatun requested a video meeting - Tomorrow at 5:00 PM',
      timestamp: new Date(Date.now() - 1000 * 60 * 10),
      read: false,
      priority: 'high',
      targetUser: 'teacher',
      actionable: true,
      actions: [
        {
          label: language === 'bn' ? 'গ্রহণ' : 'Accept',
          action: () => toast.success(language === 'bn' ? 'মিটিং নিশ্চিত হয়েছে' : 'Meeting confirmed'),
          variant: 'default',
        },
        {
          label: language === 'bn' ? 'বাতিল' : 'Decline',
          action: () => toast.error(language === 'bn' ? 'মিটিং প্রত্যাখ্যাত' : 'Meeting declined'),
          variant: 'destructive',
        },
      ],
    },
    {
      id: 't2',
      type: 'agreement_received',
      title: language === 'bn' ? 'নতুন হায়ারিং এগ্রিমেন্ট' : 'New Hiring Agreement',
      message: language === 'bn'
        ? 'আলিফা বেগম আপনাকে একটি চুক্তি পাঠিয়েছেন - গণিত টিউশন, ৳৫,০০০/মাস'
        : 'Alifa Begum sent you an agreement - Math Tuition, ৳5,000/month',
      timestamp: new Date(Date.now() - 1000 * 60 * 45),
      read: false,
      priority: 'high',
      targetUser: 'teacher',
      actionable: true,
      actions: [
        {
          label: language === 'bn' ? 'অনুমোদন' : 'Approve',
          action: () => toast.success(language === 'bn' ? 'চুক্তি অনুমোদিত' : 'Agreement approved'),
          variant: 'default',
        },
        {
          label: language === 'bn' ? 'দেখুন' : 'View',
          action: () => toast.info(language === 'bn' ? 'চুক্তি খুলছে...' : 'Opening agreement...'),
          variant: 'outline',
        },
      ],
    },
    {
      id: 't3',
      type: 'payment_received',
      title: language === 'bn' ? 'পেমেন্ট পেয়েছেন' : 'Payment Received',
      message: language === 'bn'
        ? 'আপনি ৳৪,৫০০ পেমেন্ট পেয়েছেন (প্রথম ৬ মাস ফ্রি - ০% ফি)'
        : 'You received ৳4,500 payment (First 6 months free - 0% fee)',
      timestamp: new Date(Date.now() - 1000 * 60 * 180),
      read: false,
      priority: 'medium',
      targetUser: 'teacher',
      link: 'teacher-dashboard',
    },
    {
      id: 't4',
      type: 'subscription_expiry',
      title: language === 'bn' ? 'ফ্রি পিরিয়ড শেষ হতে চলেছে' : 'Free Period Ending',
      message: language === 'bn'
        ? 'আপনার ৬ মাসের ফ্রি পিরিয়ড ১৫ দিনে শেষ হবে। এরপর ১০% প্ল্যাটফর্ম ফি প্রযোজ্য হবে।'
        : 'Your 6-month free period ends in 15 days. 10% platform fee will apply after.',
      timestamp: new Date(Date.now() - 1000 * 60 * 300),
      read: false,
      priority: 'high',
      targetUser: 'teacher',
      link: 'subscription',
    },
  ];

  const guardianNotifications: Notification[] = [
    {
      id: 'g1',
      type: 'job_applied',
      title: language === 'bn' ? 'নতুন আবেদন' : 'New Application',
      message: language === 'bn' 
        ? 'আহমেদ হোসেন আপনার গণিত টিউশন জবে আবেদন করেছেন (রেটিং: ৪.৮⭐)'
        : 'Ahmed Hossain applied to your Math tuition job (Rating: 4.8⭐)',
      timestamp: new Date(Date.now() - 1000 * 60 * 20),
      read: false,
      link: 'guardian-dashboard',
      priority: 'high',
      targetUser: 'guardian',
    },
    {
      id: 'g2',
      type: 'meeting_scheduled',
      title: language === 'bn' ? 'মিটিং নিশ্চিত' : 'Meeting Confirmed',
      message: language === 'bn'
        ? 'করিম স্যার আপনার মিটিং রিকুয়েস্ট গ্রহণ করেছেন - আজ রাত ৮:০০ PM'
        : 'Karim Sir accepted your meeting request - Today at 8:00 PM',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: false,
      priority: 'high',
      targetUser: 'guardian',
      link: 'guardian-dashboard',
    },
    {
      id: 'g3',
      type: 'agreement_approved',
      title: language === 'bn' ? 'চুক্তি অনুমোদিত' : 'Agreement Approved',
      message: language === 'bn'
        ? 'সালেহ আহমেদ আপনার চুক্তি অনুমোদন করেছেন। টিউশন শুরু করতে পারেন!'
        : 'Saleh Ahmed approved your agreement. Tuition can start!',
      timestamp: new Date(Date.now() - 1000 * 60 * 90),
      read: false,
      link: 'guardian-dashboard',
      priority: 'high',
      targetUser: 'guardian',
    },
    {
      id: 'g4',
      type: 'payment_due',
      title: language === 'bn' ? 'পেমেন্ট রিমাইন্ডার' : 'Payment Reminder',
      message: language === 'bn'
        ? 'করিম স্যারের ৳৫,০০০ পেমেন্ট আগামীকাল বকেয়া'
        : '৳5,000 payment to Karim Sir is due tomorrow',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      read: false,
      priority: 'high',
      targetUser: 'guardian',
      actionable: true,
      actions: [
        {
          label: language === 'bn' ? 'পরিশোধ করুন' : 'Pay Now',
          action: () => toast.success(language === 'bn' ? 'পেমেন্ট পেজে যাচ্ছেন...' : 'Redirecting to payment...'),
          variant: 'default',
        },
      ],
    },
  ];

  const studentNotifications: Notification[] = [
    {
      id: 's1',
      type: 'donation_received',
      title: language === 'bn' ? 'সাহায্য অনুমোদিত' : 'Help Approved',
      message: language === 'bn'
        ? 'আপনার টিউশন সাহায্যের আবেদন অনুমোদিত হয়েছে! একজন শিক্ষক শীঘ্রই যোগাযোগ করবেন।'
        : 'Your tuition help request has been approved! A teacher will contact you soon.',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      priority: 'high',
      targetUser: 'student',
      link: 'student-dashboard',
    },
    {
      id: 's2',
      type: 'book_donated',
      title: language === 'bn' ? 'বই প্রাপ্ত' : 'Books Received',
      message: language === 'bn'
        ? 'আপনার জন্য ৫টি পাঠ্যবই donation library তে পাঠানো হয়েছে'
        : '5 textbooks have been sent to you from the donation library',
      timestamp: new Date(Date.now() - 1000 * 60 * 120),
      read: false,
      priority: 'medium',
      targetUser: 'student',
      link: 'donation-library',
    },
  ];

  const donorNotifications: Notification[] = [
    {
      id: 'd1',
      type: 'donation_received',
      title: language === 'bn' ? 'দান সফল' : 'Donation Successful',
      message: language === 'bn'
        ? 'আপনার ৳২,০০০ দান সফলভাবে গৃহীত হয়েছে। ২ জন ছাত্রকে সাহায্য করা হবে।'
        : 'Your ৳2,000 donation was successfully received. 2 students will be helped.',
      timestamp: new Date(Date.now() - 1000 * 60 * 15),
      read: false,
      priority: 'high',
      targetUser: 'donor',
      link: 'donor-dashboard',
    },
    {
      id: 'd2',
      type: 'system_alert',
      title: language === 'bn' ? 'প্রভাব রিপোর্ট' : 'Impact Report',
      message: language === 'bn'
        ? 'এই মাসে আপনার দানে ৫ জন ছাত্র সাহায্য পেয়েছে। বিস্তারিত দেখুন।'
        : 'Your donations helped 5 students this month. View details.',
      timestamp: new Date(Date.now() - 1000 * 60 * 240),
      read: false,
      priority: 'medium',
      targetUser: 'donor',
      link: 'donor-dashboard',
    },
  ];

  const adminNotifications: Notification[] = [
    {
      id: 'a1',
      type: 'system_alert',
      title: language === 'bn' ? 'নতুন সাহায্যের আবেদন' : 'New Help Request',
      message: language === 'bn'
        ? '৩টি নতুন ছাত্র সাহায্যের আবেদন পর্যালোচনার জন্য অপেক্ষমাণ'
        : '3 new student help requests are pending review',
      timestamp: new Date(Date.now() - 1000 * 60 * 5),
      read: false,
      priority: 'high',
      targetUser: 'admin',
      link: 'admin-dashboard',
    },
    {
      id: 'a2',
      type: 'verification',
      title: language === 'bn' ? 'যাচাইকরণ অনুরোধ' : 'Verification Request',
      message: language === 'bn'
        ? '১২ জন শিক্ষক প্রোফাইল যাচাইকরণের জন্য অপেক্ষা করছেন'
        : '12 teachers are waiting for profile verification',
      timestamp: new Date(Date.now() - 1000 * 60 * 30),
      read: false,
      priority: 'high',
      targetUser: 'admin',
      link: 'admin-dashboard',
    },
    {
      id: 'a3',
      type: 'payment',
      title: language === 'bn' ? 'পেমেন্ট সমস্যা' : 'Payment Issue',
      message: language === 'bn'
        ? '২টি পেমেন্ট ডিসপিউট সমাধানের প্রয়োজন'
        : '2 payment disputes need resolution',
      timestamp: new Date(Date.now() - 1000 * 60 * 60),
      read: false,
      priority: 'high',
      targetUser: 'admin',
      link: 'admin-dashboard',
    },
  ];

  // Return user-specific notifications
  switch (userRole) {
    case 'teacher':
      return teacherNotifications;
    case 'guardian':
      return guardianNotifications;
    case 'student':
      return studentNotifications;
    case 'donor':
      return donorNotifications;
    case 'admin':
      return adminNotifications;
    default:
      return [];
  }
};

export function NotificationCenter({ setPage, language = 'bn', userRole, userId }: NotificationCenterProps) {
  const t = content[language];
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('all');
  
  // Load user-specific notifications on mount or when userRole changes
  useEffect(() => {
    if (userRole) {
      const userNotifications = generateNotifications(userRole, language);
      setNotifications(userNotifications);
    }
  }, [userRole, language]);

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => n.id === id ? { ...n, read: true } : n)
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev =>
      prev.map(n => ({ ...n, read: true }))
    );
    toast.success(language === 'bn' ? 'সব নোটিফিকেশন পড়া হয়েছে চিহ্নিত' : 'All notifications marked as read');
  };

  const deleteNotification = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setNotifications(prev => prev.filter(n => n.id !== id));
    toast.success(language === 'bn' ? 'নোটিফিকেশন মুছে ফেলা হয়েছে' : 'Notification deleted');
  };

  const clearAll = () => {
    setNotifications([]);
    toast.success(language === 'bn' ? 'সব নোটিফিকেশন মুছে ফেলা হয়েছে' : 'All notifications cleared');
  };

  const getTimeAgo = (timestamp: Date) => {
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - timestamp.getTime()) / 1000);
    
    if (diffInSeconds < 60) return t.justNow;
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} ${t.minutesAgo}`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} ${t.hoursAgo}`;
    return `${Math.floor(diffInSeconds / 86400)} ${t.daysAgo}`;
  };

  const getIcon = (type: Notification['type']) => {
    const iconMap = {
      job_applied: Briefcase,
      job_accepted: CheckCircle2,
      donation_received: Heart,
      credit_added: CreditCard,
      message_received: MessageCircle,
      application_status: FileText,
      review_received: Star,
      book_donated: Book,
      verification: UserCheck,
      payment: DollarSign,
      contact_approved: CheckCircle2,
      meeting_request: Video,
      meeting_scheduled: Calendar,
      meeting_reminder: AlertCircle,
      meeting_cancelled: X,
      agreement_received: FileText,
      agreement_approved: CheckCircle2,
      agreement_rejected: X,
      contract_signed: FileText,
      payment_due: AlertCircle,
      payment_received: DollarSign,
      system_alert: AlertCircle,
      subscription_expiry: AlertCircle,
    };
    
    const Icon = iconMap[type] || Bell;
    return <Icon className="w-5 h-5" />;
  };

  const getPriorityColor = (priority?: string) => {
    switch (priority) {
      case 'high':
        return 'text-red-600 bg-red-50';
      case 'medium':
        return 'text-orange-600 bg-orange-50';
      default:
        return 'text-blue-600 bg-blue-50';
    }
  };

  const filterNotifications = (notifications: Notification[]) => {
    switch (activeTab) {
      case 'unread':
        return notifications.filter(n => !n.read);
      case 'meetings':
        return notifications.filter(n => 
          n.type.includes('meeting') || n.type.includes('video')
        );
      case 'agreements':
        return notifications.filter(n => 
          n.type.includes('agreement') || n.type.includes('contract')
        );
      case 'payments':
        return notifications.filter(n => 
          n.type.includes('payment') || n.type === 'credit_added'
        );
      default:
        return notifications;
    }
  };

  const filteredNotifications = filterNotifications(notifications);

  const handleNotificationClick = (notification: Notification) => {
    markAsRead(notification.id);
    if (notification.link && setPage) {
      // Simply navigate - authentication guard will handle access control
      setPage(notification.link);
      setIsOpen(false);
    }
  };

  // Don't show notification center if user is not logged in
  if (!userRole) {
    return null;
  }

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="sm" className="relative h-8 w-8 p-0">
          <Bell className="h-3.5 w-3.5" />
          {unreadCount > 0 && (
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[9px] text-white"
            >
              {unreadCount > 9 ? '9+' : unreadCount}
            </motion.span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[400px] p-0">
        <div className="flex items-center justify-between p-4 border-b">
          <h3 className="font-semibold">{t.notifications}</h3>
          <div className="flex items-center gap-2">
            {unreadCount > 0 && (
              <Button variant="ghost" size="sm" onClick={markAllAsRead}>
                <CheckCheck className="w-4 h-4 mr-1" />
                {t.markAllRead}
              </Button>
            )}
            {notifications.length > 0 && (
              <Button variant="ghost" size="sm" onClick={clearAll}>
                <Trash2 className="w-4 h-4 mr-1" />
                {t.clearAll}
              </Button>
            )}
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="w-full grid grid-cols-5 rounded-none border-b">
            <TabsTrigger value="all" className="text-xs">
              {t.all}
              {notifications.length > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs">
                  {notifications.length}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="unread" className="text-xs">
              {t.unread}
              {unreadCount > 0 && (
                <Badge variant="secondary" className="ml-1 h-5 w-5 rounded-full p-0 text-xs bg-red-100 text-red-700">
                  {unreadCount}
                </Badge>
              )}
            </TabsTrigger>
            <TabsTrigger value="meetings" className="text-xs">
              <Video className="w-3 h-3" />
            </TabsTrigger>
            <TabsTrigger value="agreements" className="text-xs">
              <FileText className="w-3 h-3" />
            </TabsTrigger>
            <TabsTrigger value="payments" className="text-xs">
              <DollarSign className="w-3 h-3" />
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="m-0">
            <ScrollArea className="h-[500px]">
              {filteredNotifications.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-12 text-gray-500">
                  <Bell className="w-12 h-12 mb-3 opacity-30" />
                  <p>{t.noNotifications}</p>
                </div>
              ) : (
                <div className="divide-y">
                  <AnimatePresence>
                    {filteredNotifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        transition={{ duration: 0.2 }}
                        onClick={() => handleNotificationClick(notification)}
                        className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${
                          !notification.read ? 'bg-blue-50/30' : ''
                        }`}
                      >
                        <div className="flex gap-3">
                          <div className={`p-2 rounded-full ${getPriorityColor(notification.priority)} shrink-0`}>
                            {getIcon(notification.type)}
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className={`text-sm ${!notification.read ? 'font-semibold' : 'font-medium'}`}>
                                {notification.title}
                                {!notification.read && (
                                  <Badge variant="secondary" className="ml-2 text-xs bg-blue-500 text-white">
                                    {t.new}
                                  </Badge>
                                )}
                              </h4>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="h-6 w-6 p-0 shrink-0"
                                onClick={(e) => deleteNotification(notification.id, e)}
                              >
                                <X className="w-3 h-3" />
                              </Button>
                            </div>
                            <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                            <div className="flex items-center justify-between">
                              <p className="text-xs text-gray-400">{getTimeAgo(notification.timestamp)}</p>
                              {notification.link && (
                                <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                                  <ExternalLink className="w-3 h-3 mr-1" />
                                  {t.view}
                                </Button>
                              )}
                            </div>
                            {/* Action Buttons */}
                            {notification.actionable && notification.actions && (
                              <div className="flex gap-2 mt-3">
                                {notification.actions.map((action, idx) => (
                                  <Button
                                    key={idx}
                                    size="sm"
                                    variant={action.variant || 'default'}
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      action.action();
                                      markAsRead(notification.id);
                                    }}
                                    className="text-xs"
                                  >
                                    {action.label}
                                  </Button>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>

        {filteredNotifications.length > 0 && (
          <>
            <DropdownMenuSeparator className="m-0" />
            <DropdownMenuItem
              className="justify-center py-3 text-center cursor-pointer hover:bg-gray-50"
              onClick={() => {
                setPage?.('notifications');
                setIsOpen(false);
              }}
            >
              {t.viewAll}
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
