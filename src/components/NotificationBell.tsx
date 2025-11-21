import { useState, useEffect } from 'react';
import { Bell } from 'lucide-react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Popover, PopoverContent, PopoverTrigger } from './ui/popover';
import { ScrollArea } from './ui/scroll-area';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface Notification {
  id: string;
  type: 'job' | 'message' | 'payment' | 'system';
  title: string;
  message: string;
  link?: string;
  read: boolean;
  createdAt: string;
}

interface NotificationBellProps {
  userId: string;
  language?: 'bn' | 'en';
}

export function NotificationBell({ userId, language = 'bn' }: NotificationBellProps) {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  
  useEffect(() => {
    if (!userId) return;
    
    fetchNotifications();
    
    // Poll every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);
    return () => clearInterval(interval);
  }, [userId]);
  
  const fetchNotifications = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/notifications/${userId}`,
        {
          headers: { 'Authorization': `Bearer ${publicAnonKey}` },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
        setUnreadCount(data.notifications?.filter((n: Notification) => !n.read).length || 0);
      }
    } catch (error) {
      console.error('Fetch notifications error:', error);
    }
  };
  
  const markAsRead = async (notificationId: string) => {
    try {
      await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/notifications/${notificationId}/read`,
        {
          method: 'PUT',
          headers: { 'Authorization': `Bearer ${publicAnonKey}` },
        }
      );
      
      fetchNotifications();
    } catch (error) {
      console.error('Mark as read error:', error);
    }
  };
  
  const markAllAsRead = async () => {
    try {
      const unreadNotifications = notifications.filter(n => !n.read);
      await Promise.all(
        unreadNotifications.map(n => 
          fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/notifications/${n.id}/read`,
            {
              method: 'PUT',
              headers: { 'Authorization': `Bearer ${publicAnonKey}` },
            }
          )
        )
      );
      
      fetchNotifications();
    } catch (error) {
      console.error('Mark all as read error:', error);
    }
  };
  
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-red-500 text-white border-0">
              {unreadCount > 9 ? '9+' : unreadCount}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      
      <PopoverContent className="w-80" align="end">
        <div className="flex items-center justify-between mb-3">
          <h3 className="font-semibold">
            {language === 'bn' ? 'নোটিফিকেশন' : 'Notifications'}
          </h3>
          {unreadCount > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={markAllAsRead}
              className="text-xs h-7"
            >
              {language === 'bn' ? 'সব পড়া হয়েছে' : 'Mark all read'}
            </Button>
          )}
        </div>
        
        <ScrollArea className="h-96">
          {notifications.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Bell className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>{language === 'bn' ? 'কোন নোটিফিকেশন নেই' : 'No notifications'}</p>
            </div>
          ) : (
            <div className="space-y-2">
              {notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    notification.read 
                      ? 'bg-gray-50 hover:bg-gray-100' 
                      : 'bg-blue-50 hover:bg-blue-100'
                  }`}
                  onClick={() => {
                    markAsRead(notification.id);
                    if (notification.link) {
                      window.location.href = notification.link;
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <h4 className="font-semibold text-sm">{notification.title}</h4>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-1"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mt-1">{notification.message}</p>
                  <p className="text-xs text-gray-400 mt-1">
                    {new Date(notification.createdAt).toLocaleString(
                      language === 'bn' ? 'bn-BD' : 'en-US'
                    )}
                  </p>
                </div>
              ))}
            </div>
          )}
        </ScrollArea>
      </PopoverContent>
    </Popover>
  );
}
