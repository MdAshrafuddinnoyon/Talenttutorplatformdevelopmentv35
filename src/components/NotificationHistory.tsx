import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { 
  Bell, 
  Mail, 
  MessageSquare, 
  CheckCircle, 
  Clock,
  AlertCircle,
  RefreshCw,
  X
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface NotificationHistoryProps {
  userId: string;
  language: 'bn' | 'en';
  limit?: number;
}

const content = {
  bn: {
    title: 'নোটিফিকেশন ইতিহাস',
    noNotifications: 'কোন নোটিফিকেশন নেই',
    loading: 'লোড হচ্ছে...',
    refresh: 'রিফ্রেশ',
    sent: 'পাঠানো হয়েছে',
    pending: 'অপেক্ষমাণ',
    failed: 'ব্যর্থ',
    email: 'ইমেইল',
    sms: 'SMS',
    both: 'উভয়',
    types: {
      profile_approved: 'প্রোফাইল অনুমোদিত',
      profile_needs_update: 'প্রোফাইল আপডেট প্রয়োজন',
      application_status: 'আবেদনের স্ট্যাটাস',
      general: 'সাধারণ'
    }
  },
  en: {
    title: 'Notification History',
    noNotifications: 'No notifications',
    loading: 'Loading...',
    refresh: 'Refresh',
    sent: 'Sent',
    pending: 'Pending',
    failed: 'Failed',
    email: 'Email',
    sms: 'SMS',
    both: 'Both',
    types: {
      profile_approved: 'Profile Approved',
      profile_needs_update: 'Profile Needs Update',
      application_status: 'Application Status',
      general: 'General'
    }
  }
};

export function NotificationHistory({ 
  userId, 
  language,
  limit = 50 
}: NotificationHistoryProps) {
  const t = content[language];
  
  const [notifications, setNotifications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  
  const loadNotifications = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/notifications/user/${userId}?limit=${limit}`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setNotifications(data.notifications || []);
      } else {
        toast.error(language === 'bn' ? 'নোটিফিকেশন লোড করতে ব্যর্থ' : 'Failed to load notifications');
      }
    } catch (error) {
      console.error('Load notifications error:', error);
      toast.error(language === 'bn' ? 'নোটিফিকেশন লোড করতে ব্যর্থ' : 'Failed to load notifications');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (userId) {
      loadNotifications();
    }
  }, [userId]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'sent':
        return (
          <Badge className="bg-green-500">
            <CheckCircle className="w-3 h-3 mr-1" />
            {t.sent}
          </Badge>
        );
      case 'pending':
        return (
          <Badge className="bg-yellow-500">
            <Clock className="w-3 h-3 mr-1" />
            {t.pending}
          </Badge>
        );
      case 'failed':
        return (
          <Badge className="bg-red-500">
            <X className="w-3 h-3 mr-1" />
            {t.failed}
          </Badge>
        );
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case 'email':
        return <Mail className="w-4 h-4 text-blue-600" />;
      case 'sms':
        return <MessageSquare className="w-4 h-4 text-green-600" />;
      case 'both':
        return <Bell className="w-4 h-4 text-purple-600" />;
      default:
        return <Bell className="w-4 h-4 text-gray-600" />;
    }
  };
  
  const getChannelLabel = (channel: string) => {
    switch (channel) {
      case 'email':
        return t.email;
      case 'sms':
        return t.sms;
      case 'both':
        return t.both;
      default:
        return channel;
    }
  };
  
  const getTypeLabel = (type: string) => {
    return t.types[type as keyof typeof t.types] || type;
  };
  
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <Bell className="w-6 h-6 text-blue-600" />
          <h3 className="text-xl font-semibold">{t.title}</h3>
          {notifications.length > 0 && (
            <Badge variant="outline">{notifications.length}</Badge>
          )}
        </div>
        <Button onClick={loadNotifications} disabled={isLoading} variant="outline" size="sm">
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {t.refresh}
        </Button>
      </div>
      
      <ScrollArea className="h-[500px] pr-4">
        {isLoading && notifications.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3" />
            <p>{t.loading}</p>
          </div>
        ) : notifications.length === 0 ? (
          <div className="py-12 text-center text-gray-500">
            <Bell className="w-12 h-12 mx-auto mb-3 text-gray-400" />
            <p>{t.noNotifications}</p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <Card 
                key={notification.id} 
                className={`p-4 hover:shadow-md transition-shadow ${
                  notification.status === 'sent' ? 'bg-white' : 'bg-gray-50'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="mt-1">
                    {getChannelIcon(notification.channel)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <h4 className="font-semibold text-gray-900 mb-1">
                          {notification.subject}
                        </h4>
                        <div className="flex items-center gap-2 flex-wrap">
                          <Badge variant="outline" className="text-xs">
                            {getTypeLabel(notification.type)}
                          </Badge>
                          <Badge variant="outline" className="text-xs">
                            {getChannelIcon(notification.channel)}
                            <span className="ml-1">{getChannelLabel(notification.channel)}</span>
                          </Badge>
                          {getStatusBadge(notification.status)}
                        </div>
                      </div>
                    </div>
                    
                    <p className="text-sm text-gray-600 whitespace-pre-wrap mb-3">
                      {notification.message}
                    </p>
                    
                    <div className="flex items-center justify-between text-xs text-gray-500">
                      <div className="flex items-center gap-4">
                        <span>
                          {language === 'bn' ? 'তৈরি' : 'Created'}: {new Date(notification.createdAt).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                        </span>
                        {notification.sentAt && (
                          <span>
                            {language === 'bn' ? 'পাঠানো' : 'Sent'}: {new Date(notification.sentAt).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                          </span>
                        )}
                      </div>
                    </div>
                    
                    {/* Additional data */}
                    {notification.data && Object.keys(notification.data).length > 0 && (
                      <div className="mt-3 p-3 bg-gray-50 rounded-lg">
                        <p className="text-xs font-medium text-gray-700 mb-2">
                          {language === 'bn' ? 'অতিরিক্ত তথ্য' : 'Additional Info'}:
                        </p>
                        <div className="space-y-1">
                          {Object.entries(notification.data).map(([key, value]) => (
                            <div key={key} className="text-xs text-gray-600">
                              <span className="font-medium">{key}:</span> {String(value)}
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}
