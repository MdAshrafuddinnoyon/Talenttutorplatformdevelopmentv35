import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Bell, 
  CheckCircle, 
  AlertCircle, 
  Info,
  Mail,
  MessageSquare,
  X,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface StudentProfileNotificationsProps {
  studentId: string;
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'নোটিফিকেশন',
    noNotifications: 'কোন নোটিফিকেশন নেই',
    markAllRead: 'সব পড়া হয়েছে চিহ্নিত করুন',
    clear: 'মুছুন',
    profile_submitted: 'প্রোফাইল জমা',
    profile_approved: 'প্রোফাইল অনুমোদিত',
    profile_needs_update: 'আপডেট প্রয়োজন',
    loadingNotifications: 'লোড হচ্ছে...',
  },
  en: {
    title: 'Notifications',
    noNotifications: 'No notifications',
    markAllRead: 'Mark all as read',
    clear: 'Clear',
    profile_submitted: 'Profile Submitted',
    profile_approved: 'Profile Approved',
    profile_needs_update: 'Update Required',
    loadingNotifications: 'Loading...',
  }
};

export function StudentProfileNotifications({ 
  studentId, 
  language 
}: StudentProfileNotificationsProps) {
  const t = content[language];
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/notifications/user/${studentId}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      }
    } catch (error) {
      console.error('Load notifications error:', error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadNotifications();
    
    // Poll for new notifications every 30 seconds
    const interval = setInterval(loadNotifications, 30000);
    return () => clearInterval(interval);
  }, [studentId]);
  
  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'profile_submitted':
        return <Info className="w-5 h-5 text-blue-600" />;
      case 'profile_approved':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'profile_needs_update':
        return <AlertCircle className="w-5 h-5 text-orange-600" />;
      default:
        return <Bell className="w-5 h-5 text-gray-600" />;
    }
  };
  
  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'profile_submitted':
        return 'bg-blue-50 border-blue-200';
      case 'profile_approved':
        return 'bg-green-50 border-green-200';
      case 'profile_needs_update':
        return 'bg-orange-50 border-orange-200';
      default:
        return 'bg-gray-50 border-gray-200';
    }
  };

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          <Bell className="w-5 h-5" />
          {t.title}
        </h3>
        {notifications.length > 0 && (
          <Badge className="bg-blue-500">{notifications.length}</Badge>
        )}
      </div>
      
      {isLoading ? (
        <div className="text-center py-8 text-gray-500">
          <Bell className="w-8 h-8 animate-pulse mx-auto mb-2" />
          <p className="text-sm">{t.loadingNotifications}</p>
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          <Bell className="w-12 h-12 mx-auto mb-3 text-gray-400" />
          <p>{t.noNotifications}</p>
        </div>
      ) : (
        <ScrollArea className="h-96">
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`p-4 rounded-lg border ${getNotificationColor(notification.notificationType)}`}
              >
                <div className="flex items-start gap-3">
                  <div className="flex-shrink-0 mt-1">
                    {getNotificationIcon(notification.notificationType)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-medium text-sm">
                        {notification.subject}
                      </h4>
                      <Badge variant="outline" className="text-xs">
                        {t[notification.notificationType as keyof typeof t] || notification.notificationType}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-700 whitespace-pre-wrap">
                      {notification.message}
                    </p>
                    <p className="text-xs text-gray-500 mt-2">
                      {new Date(notification.sentAt).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
                    </p>
                    {notification.channels && (
                      <div className="flex gap-2 mt-2">
                        {notification.channels.email === 'sent' && (
                          <Badge variant="outline" className="text-xs">
                            <Mail className="w-3 h-3 mr-1" />
                            Email
                          </Badge>
                        )}
                        {notification.channels.sms === 'sent' && (
                          <Badge variant="outline" className="text-xs">
                            <MessageSquare className="w-3 h-3 mr-1" />
                            SMS
                          </Badge>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      )}
    </Card>
  );
}
