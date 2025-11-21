import { Card } from './ui/card';
import { Button } from './ui/button';
import { 
  Plus, 
  Search, 
  MessageCircle, 
  FileText, 
  DollarSign, 
  BookOpen, 
  Heart,
  Users,
  Calendar,
  Award,
  Settings,
  Bell,
  Download,
  Upload,
  Share2,
  TrendingUp
} from 'lucide-react';

interface QuickAction {
  id: string;
  label: string;
  icon: React.ReactNode;
  onClick: () => void;
  color: string;
  description?: string;
}

interface QuickActionsProps {
  userType: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor';
  onAction: (actionId: string) => void;
}

export function QuickActions({ userType, onAction }: QuickActionsProps) {
  const teacherActions: QuickAction[] = [
    {
      id: 'browse-jobs',
      label: 'জব খুঁজুন',
      icon: <Search className="w-5 h-5" />,
      onClick: () => onAction('browse-jobs'),
      color: 'bg-emerald-500 hover:bg-emerald-600',
      description: 'নতুন টিউশন জব ব্রাউজ করুন'
    },
    {
      id: 'buy-credits',
      label: 'ক্রেডিট কিনুন',
      icon: <DollarSign className="w-5 h-5" />,
      onClick: () => onAction('buy-credits'),
      color: 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600',
      description: 'নতুন ক্রেডিট ক্রয় করুন'
    },
    {
      id: 'view-applications',
      label: 'আবেদন দেখুন',
      icon: <FileText className="w-5 h-5" />,
      onClick: () => onAction('view-applications'),
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'আপনার সব আবেদন দেখুন'
    },
    {
      id: 'messages',
      label: 'বার্তা',
      icon: <MessageCircle className="w-5 h-5" />,
      onClick: () => onAction('messages'),
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'অভিভাবকদের সাথে চ্যাট করুন'
    },
    {
      id: 'earnings',
      label: 'আয় দেখুন',
      icon: <TrendingUp className="w-5 h-5" />,
      onClick: () => onAction('earnings'),
      color: 'bg-green-500 hover:bg-green-600',
      description: 'আপনার মাসিক আয়'
    },
    {
      id: 'schedule',
      label: 'সময়সূচী',
      icon: <Calendar className="w-5 h-5" />,
      onClick: () => onAction('schedule'),
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'ক্লাসের সময়সূচী দেখুন'
    },
    {
      id: 'profile',
      label: 'প্রোফাইল আপডেট',
      icon: <Settings className="w-5 h-5" />,
      onClick: () => onAction('profile'),
      color: 'bg-gray-500 hover:bg-gray-600',
      description: 'প্রোফাইল সম্পাদনা করুন'
    },
  ];

  const guardianActions: QuickAction[] = [
    {
      id: 'post-job',
      label: 'জব পোস্ট',
      icon: <Plus className="w-5 h-5" />,
      onClick: () => onAction('post-job'),
      color: 'bg-emerald-500 hover:bg-emerald-600',
      description: 'নতুন টিউশন জব পোস্ট করুন'
    },
    {
      id: 'find-teachers',
      label: 'শিক্ষক খুঁজুন',
      icon: <Search className="w-5 h-5" />,
      onClick: () => onAction('find-teachers'),
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'যোগ্য শিক্ষক খুঁজুন'
    },
    {
      id: 'buy-credits',
      label: 'ক্রেডিট কিনুন',
      icon: <DollarSign className="w-5 h-5" />,
      onClick: () => onAction('buy-credits'),
      color: 'bg-gradient-to-r from-amber-500 to-yellow-500 hover:from-amber-600 hover:to-yellow-600',
      description: 'নতুন ক্রেডিট ক্রয় করুন'
    },
    {
      id: 'view-applications',
      label: 'আবেদন পর্যালোচনা',
      icon: <FileText className="w-5 h-5" />,
      onClick: () => onAction('view-applications'),
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'শিক্ষকদের আবেদন দেখুন'
    },
    {
      id: 'messages',
      label: 'বার্তা',
      icon: <MessageCircle className="w-5 h-5" />,
      onClick: () => onAction('messages'),
      color: 'bg-pink-500 hover:bg-pink-600',
      description: 'শিক্ষকদের সাথে চ্যাট করুন'
    },
    {
      id: 'payments',
      label: 'পেমেন্ট',
      icon: <DollarSign className="w-5 h-5" />,
      onClick: () => onAction('payments'),
      color: 'bg-green-500 hover:bg-green-600',
      description: 'পেমেন্ট ইতিহাস দেখুন'
    },
    {
      id: 'buy-credits',
      label: 'ক্রেডিট কিনুন',
      icon: <TrendingUp className="w-5 h-5" />,
      onClick: () => onAction('buy-credits'),
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'আরও ক্রেডিট কিনুন'
    },
  ];

  const studentActions: QuickAction[] = [
    {
      id: 'apply-help',
      label: 'সাহায্য আবেদন',
      icon: <FileText className="w-5 h-5" />,
      onClick: () => onAction('apply-help'),
      color: 'bg-emerald-500 hover:bg-emerald-600',
      description: 'আর্থিক সাহায্যের জন্য আবেদন'
    },
    {
      id: 'library',
      label: 'লাইব্রেরি',
      icon: <BookOpen className="w-5 h-5" />,
      onClick: () => onAction('library'),
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'বই ব্রাউজ করুন'
    },
    {
      id: 'schedule',
      label: 'ক্লাসের সময়',
      icon: <Calendar className="w-5 h-5" />,
      onClick: () => onAction('schedule'),
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'ক্লাসের সময়সূচী দেখুন'
    },
    {
      id: 'progress',
      label: 'অগ্রগতি',
      icon: <TrendingUp className="w-5 h-5" />,
      onClick: () => onAction('progress'),
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'আপনার অগ্রগতি দেখুন'
    },
    {
      id: 'share-story',
      label: 'স্টোরি শেয়ার',
      icon: <Share2 className="w-5 h-5" />,
      onClick: () => onAction('share-story'),
      color: 'bg-pink-500 hover:bg-pink-600',
      description: 'সাফল্যের গল্প শেয়ার করুন'
    },
    {
      id: 'profile',
      label: 'প্রোফাইল',
      icon: <Settings className="w-5 h-5" />,
      onClick: () => onAction('profile'),
      color: 'bg-gray-500 hover:bg-gray-600',
      description: 'প্রোফাইল আপডেট করুন'
    },
  ];

  const adminActions: QuickAction[] = [
    {
      id: 'users',
      label: 'ইউজার ম্যানেজ',
      icon: <Users className="w-5 h-5" />,
      onClick: () => onAction('users'),
      color: 'bg-emerald-500 hover:bg-emerald-600',
      description: 'সব ইউজার দেখুন'
    },
    {
      id: 'jobs',
      label: 'জব ম্যানেজ',
      icon: <FileText className="w-5 h-5" />,
      onClick: () => onAction('jobs'),
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'সব জব পরিচালনা করুন'
    },
    {
      id: 'donations',
      label: 'দান পরিচালনা',
      icon: <Heart className="w-5 h-5" />,
      onClick: () => onAction('donations'),
      color: 'bg-pink-500 hover:bg-pink-600',
      description: 'দান ট্র্যাক করুন'
    },
    {
      id: 'reports',
      label: 'রিপোর্ট',
      icon: <TrendingUp className="w-5 h-5" />,
      onClick: () => onAction('reports'),
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'বিস্তারিত রিপোর্ট দেখুন'
    },
    {
      id: 'announcements',
      label: 'ঘোষণা',
      icon: <Bell className="w-5 h-5" />,
      onClick: () => onAction('announcements'),
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'নতুন ঘোষণা পোস্ট করুন'
    },
    {
      id: 'settings',
      label: 'সেটিংস',
      icon: <Settings className="w-5 h-5" />,
      onClick: () => onAction('settings'),
      color: 'bg-gray-500 hover:bg-gray-600',
      description: 'সিস্টেম সেটিংস'
    },
  ];

  const donorActions: QuickAction[] = [
    {
      id: 'donate',
      label: 'দান করুন',
      icon: <Heart className="w-5 h-5" />,
      onClick: () => onAction('donate'),
      color: 'bg-pink-500 hover:bg-pink-600',
      description: 'নতুন দান করুন'
    },
    {
      id: 'donate-books',
      label: 'বই দান',
      icon: <BookOpen className="w-5 h-5" />,
      onClick: () => onAction('donate-books'),
      color: 'bg-blue-500 hover:bg-blue-600',
      description: 'লাইব্রেরিতে বই দান করুন'
    },
    {
      id: 'view-impact',
      label: 'প্রভাব দেখুন',
      icon: <TrendingUp className="w-5 h-5" />,
      onClick: () => onAction('view-impact'),
      color: 'bg-emerald-500 hover:bg-emerald-600',
      description: 'আপনার দানের প্রভাব দেখুন'
    },
    {
      id: 'students',
      label: 'শিক্ষার্থীরা',
      icon: <Users className="w-5 h-5" />,
      onClick: () => onAction('students'),
      color: 'bg-purple-500 hover:bg-purple-600',
      description: 'সাহায্যপ্রাপ্ত শিক্ষার্থী দেখুন'
    },
    {
      id: 'certificate',
      label: 'সার্টিফিকেট',
      icon: <Award className="w-5 h-5" />,
      onClick: () => onAction('certificate'),
      color: 'bg-orange-500 hover:bg-orange-600',
      description: 'দান সার্টিফিকেট ডাউনলোড'
    },
    {
      id: 'share',
      label: 'শেয়ার করুন',
      icon: <Share2 className="w-5 h-5" />,
      onClick: () => onAction('share'),
      color: 'bg-teal-500 hover:bg-teal-600',
      description: 'সোশ্যাল মিডিয়ায় শেয়ার করুন'
    },
  ];

  const getActions = () => {
    switch (userType) {
      case 'teacher':
        return teacherActions;
      case 'guardian':
        return guardianActions;
      case 'student':
        return studentActions;
      case 'admin':
        return adminActions;
      case 'donor':
        return donorActions;
      default:
        return [];
    }
  };

  const actions = getActions();

  return (
    <Card className="p-6">
      <h3 className="mb-4 flex items-center gap-2">
        <TrendingUp className="w-5 h-5 text-emerald-600" />
        দ্রুত কার্যক্রম
      </h3>
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
        {actions.map((action) => (
          <Button
            key={action.id}
            onClick={action.onClick}
            className={`${action.color} text-white h-auto py-4 flex flex-col items-center gap-2 hover:shadow-lg transition-all group`}
          >
            <div className="group-hover:scale-110 transition-transform">
              {action.icon}
            </div>
            <span className="text-sm">{action.label}</span>
          </Button>
        ))}
      </div>
    </Card>
  );
}
