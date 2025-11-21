import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Bell, Megaphone, AlertCircle, Info, CheckCircle, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface Notice {
  id: string;
  title: string;
  message: string;
  type: 'announcement' | 'alert' | 'info' | 'success';
  priority: 'high' | 'medium' | 'low';
  targetAudience: 'all' | 'teachers' | 'guardians' | 'students' | 'donors';
  createdAt: Date;
  expiresAt?: Date;
  isActive: boolean;
}

interface AdminNoticeViewerProps {
  language: 'bn' | 'en';
  userRole: 'teacher' | 'guardian' | 'student' | 'donor' | 'admin';
  compact?: boolean;
  maxItems?: number;
}

const translations = {
  bn: {
    notices: 'নোটিশ বোর্ড',
    noNotices: 'কোনো নোটিশ নেই',
    noNoticesDesc: 'এই মুহূর্তে কোনো সক্রিয় নোটিশ নেই',
    dismiss: 'বন্ধ করুন',
    viewAll: 'সব দেখুন',
  },
  en: {
    notices: 'Notice Board',
    noNotices: 'No Notices',
    noNoticesDesc: 'No active notices at the moment',
    dismiss: 'Dismiss',
    viewAll: 'View All',
  },
};

// Mock data - In production, this would come from backend/API
const mockNotices: Notice[] = [
  {
    id: '1',
    title: 'প্ল্যাটফর্ম আপডেট',
    message: 'নতুন ফিচার যুক্ত হয়েছে! এখন আপনি ভিডিও মিটিং সরাসরি শিডিউল করতে পারবেন। আরও তথ্যের জন্য সেটিংস দেখুন।',
    type: 'announcement',
    priority: 'medium',
    targetAudience: 'all',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isActive: true,
  },
  {
    id: '2',
    title: 'ক্রেডিট সিস্টেম আপডেট',
    message: 'নতুন ক্রেডিট প্যাকেজ যুক্ত হয়েছে। এখন ৫০% ছাড়ে ক্রেডিট কিনুন! সীমিত সময়ের জন্য।',
    type: 'info',
    priority: 'high',
    targetAudience: 'all',
    createdAt: new Date(Date.now() - 1000 * 60 * 30),
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    isActive: true,
  },
  {
    id: '3',
    title: 'মেইনটেনেন্স নোটিশ',
    message: 'আগামী রবিবার রাত ১১টা থেকে ১২টা পর্যন্ত সাইট মেইনটেনেন্সের জন্য বন্ধ থাকবে।',
    type: 'alert',
    priority: 'high',
    targetAudience: 'all',
    createdAt: new Date(Date.now() - 1000 * 60 * 60),
    isActive: true,
  },
  {
    id: '4',
    title: 'শিক্ষকদের জন্য বিশেষ অফার',
    message: 'নতুন শিক্ষকরা ১০০ ফ্রি ক্রেডিট পাবেন! এখনই রেজিস্ট্রেশন সম্পন্ন করুন।',
    type: 'success',
    priority: 'medium',
    targetAudience: 'teachers',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isActive: true,
  },
];

export function AdminNoticeViewer({ 
  language, 
  userRole, 
  compact = false,
  maxItems = 5,
}: AdminNoticeViewerProps) {
  const t = translations[language];
  const [notices, setNotices] = useState<Notice[]>(mockNotices);
  const [dismissedNotices, setDismissedNotices] = useState<string[]>([]);

  // Filter notices based on user role and active status
  const filteredNotices = notices.filter(
    (notice) =>
      notice.isActive &&
      !dismissedNotices.includes(notice.id) &&
      (notice.targetAudience === 'all' || notice.targetAudience === userRole + 's') &&
      (!notice.expiresAt || notice.expiresAt > new Date())
  ).slice(0, maxItems);

  const handleDismiss = (noticeId: string) => {
    setDismissedNotices((prev) => [...prev, noticeId]);
    // In production, save dismissed notices to localStorage or backend
    localStorage.setItem(
      `dismissed_notices_${userRole}`,
      JSON.stringify([...dismissedNotices, noticeId])
    );
  };

  useEffect(() => {
    // Load dismissed notices from localStorage
    const saved = localStorage.getItem(`dismissed_notices_${userRole}`);
    if (saved) {
      try {
        setDismissedNotices(JSON.parse(saved));
      } catch (error) {
        console.error('Failed to load dismissed notices:', error);
      }
    }
  }, [userRole]);

  const getNoticeIcon = (type: Notice['type']) => {
    switch (type) {
      case 'announcement':
        return <Megaphone className="w-5 h-5" />;
      case 'alert':
        return <AlertCircle className="w-5 h-5" />;
      case 'info':
        return <Info className="w-5 h-5" />;
      case 'success':
        return <CheckCircle className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNoticeColor = (type: Notice['type'], priority: Notice['priority']) => {
    if (priority === 'high') {
      return {
        bg: 'bg-red-50 border-red-200',
        icon: 'text-red-600',
        badge: 'bg-red-100 text-red-700 border-red-300',
      };
    }
    switch (type) {
      case 'announcement':
        return {
          bg: 'bg-blue-50 border-blue-200',
          icon: 'text-blue-600',
          badge: 'bg-blue-100 text-blue-700 border-blue-300',
        };
      case 'alert':
        return {
          bg: 'bg-amber-50 border-amber-200',
          icon: 'text-amber-600',
          badge: 'bg-amber-100 text-amber-700 border-amber-300',
        };
      case 'info':
        return {
          bg: 'bg-cyan-50 border-cyan-200',
          icon: 'text-cyan-600',
          badge: 'bg-cyan-100 text-cyan-700 border-cyan-300',
        };
      case 'success':
        return {
          bg: 'bg-emerald-50 border-emerald-200',
          icon: 'text-emerald-600',
          badge: 'bg-emerald-100 text-emerald-700 border-emerald-300',
        };
      default:
        return {
          bg: 'bg-gray-50 border-gray-200',
          icon: 'text-gray-600',
          badge: 'bg-gray-100 text-gray-700 border-gray-300',
        };
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffInMinutes < 1) return language === 'bn' ? 'এখনই' : 'Just now';
    if (diffInMinutes < 60)
      return language === 'bn' ? `${diffInMinutes} মিনিট আগে` : `${diffInMinutes} min ago`;

    const diffInHours = Math.floor(diffInMinutes / 60);
    if (diffInHours < 24)
      return language === 'bn' ? `${diffInHours} ঘণ্টা আগে` : `${diffInHours} hours ago`;

    const diffInDays = Math.floor(diffInHours / 24);
    return language === 'bn' ? `${diffInDays} দিন আগে` : `${diffInDays} days ago`;
  };

  if (filteredNotices.length === 0) {
    if (compact) return null;
    
    return (
      <Card className="p-8 text-center">
        <Bell className="w-12 h-12 mx-auto mb-3 text-gray-300" />
        <h3 className="text-gray-900 mb-1">{t.noNotices}</h3>
        <p className="text-sm text-gray-500">{t.noNoticesDesc}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-3">
      {!compact && (
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-emerald-600" />
          <h3 className="font-semibold text-gray-900">{t.notices}</h3>
          {filteredNotices.length > 0 && (
            <Badge variant="secondary" className="ml-auto">
              {filteredNotices.length}
            </Badge>
          )}
        </div>
      )}

      <AnimatePresence>
        {filteredNotices.map((notice) => {
          const colors = getNoticeColor(notice.type, notice.priority);
          return (
            <motion.div
              key={notice.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.2 }}
            >
              <Card className={`p-4 border-l-4 ${colors.bg} relative group`}>
                <button
                  onClick={() => handleDismiss(notice.id)}
                  className="absolute top-2 right-2 p-1 rounded-full hover:bg-white/50 opacity-0 group-hover:opacity-100 transition-opacity"
                  title={t.dismiss}
                >
                  <X className="w-4 h-4 text-gray-500" />
                </button>

                <div className="flex gap-3 pr-8">
                  <div className={`flex-shrink-0 ${colors.icon}`}>
                    {getNoticeIcon(notice.type)}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-semibold text-gray-900">{notice.title}</h4>
                      {notice.priority === 'high' && (
                        <Badge className={colors.badge} variant="outline">
                          {language === 'bn' ? 'জরুরি' : 'Urgent'}
                        </Badge>
                      )}
                    </div>
                    <p className="text-sm text-gray-700 mb-2 leading-relaxed">
                      {notice.message}
                    </p>
                    <p className="text-xs text-gray-500">{formatDate(notice.createdAt)}</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
