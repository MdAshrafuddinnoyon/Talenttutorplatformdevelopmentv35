import { Card } from './ui/card';
import { ListAvatar } from './ui/profile-avatar';
import { Badge } from './ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  AlertCircle, 
  DollarSign, 
  BookOpen, 
  Star, 
  MessageCircle,
  Heart,
  Award,
  UserPlus,
  FileText,
  TrendingUp
} from 'lucide-react';
import { ScrollArea } from './ui/scroll-area';

interface Activity {
  id: string;
  type: 'job_applied' | 'job_accepted' | 'job_rejected' | 'payment_received' | 'payment_sent' | 'review_received' | 'message_received' | 'donation_made' | 'donation_received' | 'achievement' | 'new_user' | 'credit_added' | 'book_donated';
  title: string;
  description: string;
  timestamp: Date;
  user?: {
    name: string;
    avatar?: string;
  };
  metadata?: {
    amount?: number;
    rating?: number;
    subject?: string;
  };
}

interface ActivityFeedProps {
  activities: Activity[];
  maxHeight?: string;
}

export function ActivityFeed({ activities, maxHeight = '600px' }: ActivityFeedProps) {
  const getActivityIcon = (type: Activity['type']) => {
    const iconClass = "w-5 h-5";
    switch (type) {
      case 'job_applied':
        return <FileText className={`${iconClass} text-blue-600`} />;
      case 'job_accepted':
        return <CheckCircle className={`${iconClass} text-green-600`} />;
      case 'job_rejected':
        return <XCircle className={`${iconClass} text-red-600`} />;
      case 'payment_received':
        return <DollarSign className={`${iconClass} text-emerald-600`} />;
      case 'payment_sent':
        return <DollarSign className={`${iconClass} text-orange-600`} />;
      case 'review_received':
        return <Star className={`${iconClass} text-yellow-600`} />;
      case 'message_received':
        return <MessageCircle className={`${iconClass} text-teal-600`} />;
      case 'donation_made':
      case 'donation_received':
        return <Heart className={`${iconClass} text-pink-600`} />;
      case 'achievement':
        return <Award className={`${iconClass} text-blue-600`} />;
      case 'new_user':
        return <UserPlus className={`${iconClass} text-teal-600`} />;
      case 'credit_added':
        return <TrendingUp className={`${iconClass} text-cyan-600`} />;
      case 'book_donated':
        return <BookOpen className={`${iconClass} text-amber-600`} />;
      default:
        return <AlertCircle className={`${iconClass} text-gray-600`} />;
    }
  };

  const getActivityColor = (type: Activity['type']) => {
    switch (type) {
      case 'job_applied':
        return 'bg-blue-50 border-l-blue-600';
      case 'job_accepted':
        return 'bg-green-50 border-l-green-600';
      case 'job_rejected':
        return 'bg-red-50 border-l-red-600';
      case 'payment_received':
        return 'bg-emerald-50 border-l-emerald-600';
      case 'payment_sent':
        return 'bg-orange-50 border-l-orange-600';
      case 'review_received':
        return 'bg-yellow-50 border-l-yellow-600';
      case 'message_received':
        return 'bg-teal-50 border-l-teal-600';
      case 'donation_made':
      case 'donation_received':
        return 'bg-pink-50 border-l-pink-600';
      case 'achievement':
        return 'bg-blue-50 border-l-blue-600';
      case 'new_user':
        return 'bg-teal-50 border-l-teal-600';
      case 'credit_added':
        return 'bg-cyan-50 border-l-cyan-600';
      case 'book_donated':
        return 'bg-amber-50 border-l-amber-600';
      default:
        return 'bg-gray-50 border-l-gray-600';
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
    if (diffInDays === 1) return 'গতকাল';
    if (diffInDays < 7) return `${diffInDays} দিন আগে`;
    
    return date.toLocaleDateString('bn-BD', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const groupActivitiesByDate = (activities: Activity[]) => {
    const groups: { [key: string]: Activity[] } = {};
    
    activities.forEach(activity => {
      const date = activity.timestamp.toLocaleDateString('bn-BD', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
      
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(activity);
    });
    
    return groups;
  };

  const groupedActivities = groupActivitiesByDate(activities);

  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-emerald-600" />
          সাম্প্রতিক কার্যক্রম
        </h3>
        <Badge variant="secondary">{activities.length} টি</Badge>
      </div>

      <ScrollArea style={{ maxHeight }}>
        {activities.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <AlertCircle className="w-12 h-12 mx-auto mb-3 opacity-20" />
            <p>কোনো কার্যক্রম নেই</p>
          </div>
        ) : (
          <div className="space-y-6">
            {Object.entries(groupedActivities).map(([date, dateActivities]) => (
              <div key={date}>
                <div className="text-sm mb-3 text-gray-600 sticky top-0 bg-white py-1">
                  {date}
                </div>
                <div className="space-y-3 relative before:absolute before:left-6 before:top-0 before:bottom-0 before:w-px before:bg-gray-200">
                  {dateActivities.map((activity, idx) => (
                    <div
                      key={activity.id}
                      className={`relative pl-14 pb-3 ${
                        idx !== dateActivities.length - 1 ? '' : ''
                      }`}
                    >
                      {/* Timeline dot with icon */}
                      <div className="absolute left-3 top-0 w-6 h-6 rounded-full bg-white border-2 border-gray-200 flex items-center justify-center z-10">
                        {getActivityIcon(activity.type)}
                      </div>

                      {/* Activity card */}
                      <Card className={`p-4 border-l-4 ${getActivityColor(activity.type)} hover:shadow-md transition-shadow`}>
                        <div className="flex items-start gap-3">
                          {activity.user && (
                            <ListAvatar 
                              src={activity.user.avatar}
                              alt={activity.user.name}
                              fallback={activity.user.name.charAt(0)}
                            />
                          )}
                          
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2 mb-1">
                              <h4 className="text-sm">
                                {activity.title}
                              </h4>
                              <span className="text-xs text-gray-500 flex-shrink-0">
                                {formatTimestamp(activity.timestamp)}
                              </span>
                            </div>
                            
                            <p className="text-sm text-gray-600 mb-2">
                              {activity.description}
                            </p>

                            {/* Metadata */}
                            {activity.metadata && (
                              <div className="flex flex-wrap gap-2">
                                {activity.metadata.amount && (
                                  <Badge variant="secondary" className="text-xs gap-1">
                                    <DollarSign className="w-3 h-3" />
                                    ৳{activity.metadata.amount.toLocaleString('bn-BD')}
                                  </Badge>
                                )}
                                {activity.metadata.rating && (
                                  <Badge variant="secondary" className="text-xs gap-1">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    {activity.metadata.rating}
                                  </Badge>
                                )}
                                {activity.metadata.subject && (
                                  <Badge variant="outline" className="text-xs">
                                    {activity.metadata.subject}
                                  </Badge>
                                )}
                              </div>
                            )}
                          </div>
                        </div>
                      </Card>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </Card>
  );
}

// Sample data generator for testing
export const sampleActivities: Activity[] = [
  {
    id: '1',
    type: 'job_accepted',
    title: 'জব গৃহীত হয়েছে',
    description: 'ফাতিমা খানম আপনার "ইংরেজি স্পোকেন কোর্স" জবের আবেদন গ্রহণ করেছে',
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    user: {
      name: 'ফাতিমা খানম',
    },
    metadata: {
      subject: 'ইংরেজি'
    }
  },
  {
    id: '2',
    type: 'payment_received',
    title: 'পেমেন্ট পেয়েছেন',
    description: 'আপনার একাউন্টে ৫০০০ টাকা জমা হয়েছে',
    timestamp: new Date(Date.now() - 1000 * 60 * 60),
    metadata: {
      amount: 5000
    }
  },
  {
    id: '3',
    type: 'review_received',
    title: 'নতুন রিভিউ',
    description: 'সালমা খাতুন আপনাকে রিভিউ দিয়েছে',
    timestamp: new Date(Date.now() - 1000 * 60 * 120),
    user: {
      name: 'সালমা খাতুন',
    },
    metadata: {
      rating: 5
    }
  },
  {
    id: '4',
    type: 'job_applied',
    title: 'নতুন আবেদন',
    description: 'আহমেদ হোসেন আপনার জবে আবেদন করেছেন',
    timestamp: new Date(Date.now() - 1000 * 60 * 180),
    user: {
      name: 'আহমেদ হোসেন',
    },
    metadata: {
      subject: 'গণিত'
    }
  },
  {
    id: '5',
    type: 'donation_received',
    title: 'দান পেয়েছেন',
    description: 'একজন দাতা আপনার জন্য ১০০০ টাকা দান করেছে',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    metadata: {
      amount: 1000
    }
  },
  {
    id: '6',
    type: 'achievement',
    title: 'নতুন অর্জন',
    description: 'অভিনন্দন! আপনি "১০টি সফল টিউশন" ব্যাজ অর্জন করেছেন',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
  },
  {
    id: '7',
    type: 'credit_added',
    title: 'ক্রেডিট যোগ হয়েছে',
    description: 'আপনার একাউন্টে ৫০ ক্রেডিট যোগ হয়েছে',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 3),
  },
  {
    id: '8',
    type: 'book_donated',
    title: 'বই দান',
    description: 'আপনার "উচ্চ মাধ্যমিক পদার্থবিজ্ঞান" বইটি লাইব্রেরিতে যুক্ত হয়েছে',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5),
  },
];
