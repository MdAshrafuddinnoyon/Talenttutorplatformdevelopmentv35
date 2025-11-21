import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Bell, 
  X, 
  Check, 
  Heart, 
  DollarSign, 
  AlertCircle, 
  Info,
  CheckCircle,
  XCircle,
  AlertTriangle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { notificationApi } from '../utils/apiClient';

interface RealtimeNotificationSystemProps {
  userId: string;
  userRole: string;
  onNotificationClick?: (notification: any) => void;
}

interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  link?: string;
  priority: 'low' | 'normal' | 'high' | 'urgent';
  read: boolean;
  createdAt: string;
  readAt?: string;
}

export function RealtimeNotificationSystem({ 
  userId, 
  userRole,
  onNotificationClick 
}: RealtimeNotificationSystemProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showPanel, setShowPanel] = useState(false);
  const [loading, setLoading] = useState(false);

  // Fetch notifications
  const fetchNotifications = async () => {
    try {
      const response = await notificationApi.getUserNotifications(userId);
      if (response.success && response.data?.notifications) {
        setNotifications(response.data.notifications);
        setUnreadCount(response.data.notifications.filter((n: Notification) => !n.read).length);
      }
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  // Mark notification as read
  const markAsRead = async (notificationId: string) => {
    try {
      const response = await notificationApi.markAsRead(notificationId);
      if (response.success) {
        setNotifications(prev =>
          prev.map(n => n.id === notificationId ? { ...n, read: true } : n)
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      }
    } catch (error) {
      console.error('Failed to mark as read:', error);
    }
  };

  // Mark all as read
  const markAllAsRead = async () => {
    setLoading(true);
    try {
      const response = await notificationApi.markAllAsRead(userId);
      if (response.success) {
        setNotifications(prev => prev.map(n => ({ ...n, read: true })));
        setUnreadCount(0);
        toast.success('All notifications marked as read');
      }
    } catch (error) {
      console.error('Failed to mark all as read:', error);
      toast.error('Failed to mark all as read');
    } finally {
      setLoading(false);
    }
  };

  // Handle notification click
  const handleNotificationClick = (notification: Notification) => {
    if (!notification.read) {
      markAsRead(notification.id);
    }
    if (onNotificationClick) {
      onNotificationClick(notification);
    }
    if (notification.link) {
      // Navigate to link (implement navigation logic)
      console.log('Navigate to:', notification.link);
    }
  };

  // Fetch notifications on mount and set up polling
  useEffect(() => {
    fetchNotifications();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    
    return () => clearInterval(interval);
  }, [userId]);

  // Get icon based on notification type
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'error':
        return <XCircle className="w-5 h-5 text-red-600" />;
      case 'warning':
        return <AlertTriangle className="w-5 h-5 text-yellow-600" />;
      case 'donation':
        return <Heart className="w-5 h-5 text-rose-600" />;
      case 'payment':
        return <DollarSign className="w-5 h-5 text-emerald-600" />;
      default:
        return <Info className="w-5 h-5 text-blue-600" />;
    }
  };

  // Get background color based on notification type
  const getNotificationBg = (type: string) => {
    switch (type) {
      case 'success':
        return 'bg-green-50 border-green-200';
      case 'error':
        return 'bg-red-50 border-red-200';
      case 'warning':
        return 'bg-yellow-50 border-yellow-200';
      case 'donation':
        return 'bg-rose-50 border-rose-200';
      case 'payment':
        return 'bg-emerald-50 border-emerald-200';
      default:
        return 'bg-blue-50 border-blue-200';
    }
  };

  // Format time ago
  const timeAgo = (date: string) => {
    const seconds = Math.floor((new Date().getTime() - new Date(date).getTime()) / 1000);
    
    if (seconds < 60) return 'এখনই';
    if (seconds < 3600) return `${Math.floor(seconds / 60)} মিনিট আগে`;
    if (seconds < 86400) return `${Math.floor(seconds / 3600)} ঘন্টা আগে`;
    return `${Math.floor(seconds / 86400)} দিন আগে`;
  };

  return (
    <div className="relative">
      {/* Notification Bell Button */}
      <Button
        variant="ghost"
        size="icon"
        className="relative"
        onClick={() => setShowPanel(!showPanel)}
      >
        <Bell className="w-5 h-5" />
        {unreadCount > 0 && (
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="absolute -top-1 -right-1 w-5 h-5 bg-red-600 text-white rounded-full flex items-center justify-center text-xs"
          >
            {unreadCount > 9 ? '9+' : unreadCount}
          </motion.div>
        )}
      </Button>

      {/* Notification Panel */}
      <AnimatePresence>
        {showPanel && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="absolute right-0 top-12 w-96 z-50"
          >
            <Card className="shadow-xl border-2">
              {/* Header */}
              <div className="p-4 border-b bg-gradient-to-r from-blue-500 to-purple-600">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bell className="w-5 h-5 text-white" />
                    <h3 className="text-white">নোটিফিকেশন</h3>
                    {unreadCount > 0 && (
                      <Badge className="bg-white/20 text-white border-0">
                        {unreadCount} নতুন
                      </Badge>
                    )}
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white hover:bg-white/10"
                    onClick={() => setShowPanel(false)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                </div>
                
                {unreadCount > 0 && (
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-white hover:bg-white/10 mt-2 w-full"
                    onClick={markAllAsRead}
                    disabled={loading}
                  >
                    <Check className="w-4 h-4 mr-2" />
                    সব পঠিত হিসেবে চিহ্নিত করুন
                  </Button>
                )}
              </div>

              {/* Notifications List */}
              <ScrollArea className="h-[500px]">
                {notifications.length === 0 ? (
                  <div className="flex flex-col items-center justify-center py-12 text-gray-400">
                    <Bell className="w-12 h-12 mb-2 opacity-50" />
                    <p>কোনো নোটিফিকেশন নেই</p>
                  </div>
                ) : (
                  <div className="p-2 space-y-2">
                    {notifications.map((notification) => (
                      <motion.div
                        key={notification.id}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        whileHover={{ scale: 1.02 }}
                      >
                        <Card
                          className={`p-4 cursor-pointer transition-all ${
                            getNotificationBg(notification.type)
                          } ${!notification.read ? 'border-2' : 'opacity-70'}`}
                          onClick={() => handleNotificationClick(notification)}
                        >
                          <div className="flex items-start gap-3">
                            <div className="flex-shrink-0">
                              {getNotificationIcon(notification.type)}
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-start justify-between gap-2 mb-1">
                                <h4 className="text-sm text-gray-900 line-clamp-1">
                                  {notification.title}
                                </h4>
                                {!notification.read && (
                                  <div className="w-2 h-2 bg-blue-600 rounded-full flex-shrink-0 mt-1" />
                                )}
                              </div>
                              <p className="text-xs text-gray-600 line-clamp-2 mb-2">
                                {notification.message}
                              </p>
                              <div className="flex items-center justify-between">
                                <span className="text-xs text-gray-500">
                                  {timeAgo(notification.createdAt)}
                                </span>
                                {notification.priority === 'high' || notification.priority === 'urgent' ? (
                                  <Badge 
                                    variant="outline" 
                                    className={
                                      notification.priority === 'urgent'
                                        ? 'border-red-600 text-red-600'
                                        : 'border-orange-600 text-orange-600'
                                    }
                                  >
                                    {notification.priority === 'urgent' ? 'জরুরি' : 'গুরুত্বপূর্ণ'}
                                  </Badge>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                )}
              </ScrollArea>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Click outside to close */}
      {showPanel && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setShowPanel(false)}
        />
      )}
    </div>
  );
}
