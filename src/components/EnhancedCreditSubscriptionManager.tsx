import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Switch } from './ui/switch';
import { ScrollArea } from './ui/scroll-area';
import { 
  Wallet, 
  CreditCard, 
  TrendingUp,
  TrendingDown,
  DollarSign,
  Users,
  Activity,
  Crown,
  Zap,
  Gift,
  Package,
  Plus,
  Edit2,
  Trash2,
  Eye,
  RefreshCw,
  Download,
  BarChart3,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Award,
  Target,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface SubscriptionPlan {
  id: string;
  name: string;
  credits: number;
  bonusCredits: number;
  price: number;
  duration: string;
  features: string[];
  userType: 'teacher' | 'guardian' | 'both';
  active: boolean;
  popular: boolean;
  color: string;
  icon: string;
  subscribers: number;
  revenue: number;
  conversionRate: number;
}

interface CreditTransaction {
  id: string;
  userId: string;
  userName: string;
  userType: 'teacher' | 'guardian';
  type: 'purchase' | 'deduction' | 'bonus' | 'refund';
  amount: number;
  balanceBefore: number;
  balanceAfter: number;
  packageName?: string;
  reason: string;
  timestamp: string;
  status: 'completed' | 'pending' | 'failed';
}

interface UserCreditInfo {
  userId: string;
  userName: string;
  userType: 'teacher' | 'guardian';
  currentCredits: number;
  totalPurchased: number;
  totalSpent: number;
  lastPurchase?: string;
  subscriptionStatus: 'active' | 'expired' | 'none';
  subscriptionPlan?: string;
}

interface EnhancedCreditSubscriptionManagerProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'ক্রেডিট ও সাবস্ক্রিপশন ম্যানেজমেন্ট',
    subtitle: 'রিয়েল টাইম ক্রেডিট সিস্টেম ও প্ল্যান পরিচালনা',
    plans: 'সাবস্ক্রিপশন প্ল্যান',
    transactions: 'লেনদেন',
    userCredits: 'ইউজার ক্রেডিট',
    analytics: 'বিশ্লেষণ',
    totalRevenue: 'মোট আয়',
    activeSubscribers: 'সক্রিয় সাবস্ক্রাইবার',
    totalTransactions: 'মোট লেনদেন',
    avgCreditsPerUser: 'গড় ক্রেডিট/ইউজার',
    createPlan: 'নতুন প্ল্যান তৈরি করুন',
    editPlan: 'প্ল্যান সম্পাদনা',
    deletePlan: 'প্ল্যান মুছুন',
    planName: 'প্ল্যান নাম',
    credits: 'ক্রেডিট',
    bonusCredits: 'বোনাস ক্রেডিট',
    price: 'মূল্য (৳)',
    duration: 'মেয়াদ',
    userType: 'ইউজার টাইপ',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    both: 'উভয়',
    popular: 'জনপ্রিয়',
    active: 'সক্রিয়',
    features: 'ফিচার (প্রতি লাইনে একটি)',
    color: 'রঙ',
    subscribers: 'সাবস্ক্রাইবার',
    revenue: 'আয়',
    save: 'সংরক্ষণ',
    cancel: 'বাতিল',
    delete: 'মুছুন',
    edit: 'সম্পাদনা',
    view: 'দেখুন',
    refresh: 'রিফ্রেশ',
    export: 'এক্সপোর্ট',
    name: 'নাম',
    currentCredits: 'বর্তমান ক্রেডিট',
    totalPurchased: 'মোট ক্রয়',
    totalSpent: 'মোট ব্যয়',
    lastPurchase: 'শেষ ক্রয়',
    status: 'স্ট্যাটাস',
    actions: 'অ্যাকশন',
    addCredits: 'ক্রেডিট যোগ করুন',
    deductCredits: 'ক্রেডিট কাটুন',
    viewHistory: 'ইতিহাস দেখুন',
    transactionType: 'লেনদেনের ধরন',
    amount: 'পরিমাণ',
    balanceBefore: 'পূর্বের ব্যালেন্স',
    balanceAfter: 'পরবর্তী ব্যালেন্স',
    reason: 'কারণ',
    timestamp: 'সময়',
    completed: 'সম্পন্ন',
    pending: 'অপেক্ষমাণ',
    failed: 'ব্যর্থ',
    purchase: 'ক্রয়',
    deduction: 'কাটা',
    bonus: 'বোনাস',
    refund: 'ফেরত',
    manualAdjustment: 'ম্যানুয়াল সমন্বয়',
    enterAmount: 'পরিমাণ লিখুন',
    enterReason: 'কারণ লিখুন',
    confirm: 'নিশ্চিত করুন',
  },
  en: {
    title: 'Credit & Subscription Management',
    subtitle: 'Real-time Credit System & Plan Administration',
    plans: 'Subscription Plans',
    transactions: 'Transactions',
    userCredits: 'User Credits',
    analytics: 'Analytics',
    totalRevenue: 'Total Revenue',
    activeSubscribers: 'Active Subscribers',
    totalTransactions: 'Total Transactions',
    avgCreditsPerUser: 'Avg Credits/User',
    createPlan: 'Create New Plan',
    editPlan: 'Edit Plan',
    deletePlan: 'Delete Plan',
    planName: 'Plan Name',
    credits: 'Credits',
    bonusCredits: 'Bonus Credits',
    price: 'Price (৳)',
    duration: 'Duration',
    userType: 'User Type',
    teacher: 'Teacher',
    guardian: 'Guardian',
    both: 'Both',
    popular: 'Popular',
    active: 'Active',
    features: 'Features (one per line)',
    color: 'Color',
    subscribers: 'Subscribers',
    revenue: 'Revenue',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    view: 'View',
    refresh: 'Refresh',
    export: 'Export',
    name: 'Name',
    currentCredits: 'Current Credits',
    totalPurchased: 'Total Purchased',
    totalSpent: 'Total Spent',
    lastPurchase: 'Last Purchase',
    status: 'Status',
    actions: 'Actions',
    addCredits: 'Add Credits',
    deductCredits: 'Deduct Credits',
    viewHistory: 'View History',
    transactionType: 'Transaction Type',
    amount: 'Amount',
    balanceBefore: 'Balance Before',
    balanceAfter: 'Balance After',
    reason: 'Reason',
    timestamp: 'Timestamp',
    completed: 'Completed',
    pending: 'Pending',
    failed: 'Failed',
    purchase: 'Purchase',
    deduction: 'Deduction',
    bonus: 'Bonus',
    refund: 'Refund',
    manualAdjustment: 'Manual Adjustment',
    enterAmount: 'Enter Amount',
    enterReason: 'Enter Reason',
    confirm: 'Confirm',
  },
};

export function EnhancedCreditSubscriptionManager({ language }: EnhancedCreditSubscriptionManagerProps) {
  const t = content[language];

  // Sample data - would come from backend in production
  const [plans, setPlans] = useState<SubscriptionPlan[]>([
    {
      id: 'P001',
      name: 'বেসিক',
      credits: 50,
      bonusCredits: 0,
      price: 500,
      duration: '১ মাস',
      features: ['৫টি টিউশন পোস্ট', 'সীমিত সাপোর্ট', 'বেসিক প্রোফাইল'],
      userType: 'guardian',
      active: true,
      popular: false,
      color: 'blue',
      icon: 'package',
      subscribers: 45,
      revenue: 22500,
      conversionRate: 12.5,
    },
    {
      id: 'P002',
      name: 'প্রিমিয়াম',
      credits: 200,
      bonusCredits: 50,
      price: 1500,
      duration: '৩ মাস',
      features: ['২০টি টিউশন পোস্ট', 'প্রায়োরিটি সাপোর্ট', 'ফ্রি ক্রেডিট বোনাস', 'প্রো প্রোফাইল'],
      userType: 'guardian',
      active: true,
      popular: true,
      color: 'purple',
      icon: 'crown',
      subscribers: 78,
      revenue: 117000,
      conversionRate: 28.3,
    },
    {
      id: 'P003',
      name: 'টিচার প্রো',
      credits: 300,
      bonusCredits: 100,
      price: 2000,
      duration: '৬ মাস',
      features: ['আনলিমিটেড আবেদন', 'প্রিমিয়াম ব্যাজ', 'টপ লিস্টিং', 'ডেডিকেটেড সাপোর্ট'],
      userType: 'teacher',
      active: true,
      popular: false,
      color: 'green',
      icon: 'zap',
      subscribers: 32,
      revenue: 64000,
      conversionRate: 18.7,
    },
  ]);

  const [transactions, setTransactions] = useState<CreditTransaction[]>([
    {
      id: 'T001',
      userId: 'U001',
      userName: 'করিম উদ্দিন',
      userType: 'teacher',
      type: 'purchase',
      amount: 300,
      balanceBefore: 50,
      balanceAfter: 350,
      packageName: 'টিচার প্রো',
      reason: 'প্যাকেজ ক্রয়',
      timestamp: '2025-11-09 14:30',
      status: 'completed',
    },
    {
      id: 'T002',
      userId: 'U002',
      userName: 'ফাতিমা খাতুন',
      userType: 'guardian',
      type: 'deduction',
      amount: -20,
      balanceBefore: 150,
      balanceAfter: 130,
      reason: 'টিউশন পোস্ট প্রকাশ',
      timestamp: '2025-11-09 12:15',
      status: 'completed',
    },
    {
      id: 'T003',
      userId: 'U003',
      userName: 'রহিম আহমেদ',
      userType: 'guardian',
      type: 'bonus',
      amount: 50,
      balanceBefore: 200,
      balanceAfter: 250,
      reason: 'প্রিমিয়াম প্যাকেজ বোনাস',
      timestamp: '2025-11-08 16:45',
      status: 'completed',
    },
  ]);

  const [userCredits, setUserCredits] = useState<UserCreditInfo[]>([
    {
      userId: 'U001',
      userName: 'করিম উদ্দিন',
      userType: 'teacher',
      currentCredits: 350,
      totalPurchased: 600,
      totalSpent: 250,
      lastPurchase: '2025-11-09',
      subscriptionStatus: 'active',
      subscriptionPlan: 'টিচার প্রো',
    },
    {
      userId: 'U002',
      userName: 'ফাতিমা খাতুন',
      userType: 'guardian',
      currentCredits: 130,
      totalPurchased: 200,
      totalSpent: 70,
      lastPurchase: '2025-10-25',
      subscriptionStatus: 'active',
      subscriptionPlan: 'বেসিক',
    },
    {
      userId: 'U003',
      userName: 'রহিম আহমেদ',
      userType: 'guardian',
      currentCredits: 250,
      totalPurchased: 450,
      totalSpent: 200,
      lastPurchase: '2025-11-08',
      subscriptionStatus: 'active',
      subscriptionPlan: 'প্রিমিয়াম',
    },
  ]);

  const [activeTab, setActiveTab] = useState('plans');
  const [selectedPlan, setSelectedPlan] = useState<SubscriptionPlan | null>(null);
  const [showPlanDialog, setShowPlanDialog] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [showCreditDialog, setShowCreditDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<UserCreditInfo | null>(null);
  const [creditAction, setCreditAction] = useState<'add' | 'deduct'>('add');
  const [creditAmount, setCreditAmount] = useState('');
  const [creditReason, setCreditReason] = useState('');

  // Calculate statistics
  const stats = {
    totalRevenue: plans.reduce((sum, p) => sum + p.revenue, 0),
    activeSubscribers: plans.reduce((sum, p) => sum + p.subscribers, 0),
    totalTransactions: transactions.length,
    avgCreditsPerUser: Math.round(userCredits.reduce((sum, u) => sum + u.currentCredits, 0) / Math.max(userCredits.length, 1)),
    totalCreditsInCirculation: userCredits.reduce((sum, u) => sum + u.currentCredits, 0),
    totalCreditsSold: userCredits.reduce((sum, u) => sum + u.totalPurchased, 0),
  };

  const handleCreatePlan = () => {
    setSelectedPlan({
      id: '',
      name: '',
      credits: 0,
      bonusCredits: 0,
      price: 0,
      duration: '১ মাস',
      features: [],
      userType: 'both',
      active: true,
      popular: false,
      color: 'blue',
      icon: 'package',
      subscribers: 0,
      revenue: 0,
      conversionRate: 0,
    });
    setIsEditMode(false);
    setShowPlanDialog(true);
  };

  const handleEditPlan = (plan: SubscriptionPlan) => {
    setSelectedPlan({ ...plan });
    setIsEditMode(true);
    setShowPlanDialog(true);
  };

  const handleSavePlan = () => {
    if (!selectedPlan) return;

    if (isEditMode) {
      setPlans(plans.map(p => p.id === selectedPlan.id ? selectedPlan : p));
      toast.success('প্ল্যান আপডেট করা হয়েছে!');
    } else {
      const newPlan = { ...selectedPlan, id: `P${String(plans.length + 1).padStart(3, '0')}` };
      setPlans([...plans, newPlan]);
      toast.success('নতুন প্ল্যান তৈরি করা হয়েছে!');
    }

    setShowPlanDialog(false);
    setSelectedPlan(null);
  };

  const handleDeletePlan = (planId: string) => {
    if (confirm('আপনি কি নিশ্চিত এই প্ল্যান মুছে ফেলতে চান?')) {
      setPlans(plans.filter(p => p.id !== planId));
      toast.success('প্ল্যান মুছে ফেলা হয়েছে!');
    }
  };

  const handleTogglePlan = (planId: string) => {
    setPlans(plans.map(p => p.id === planId ? { ...p, active: !p.active } : p));
    toast.success('প্ল্যান স্ট্যাটাস আপডেট করা হয়েছে!');
  };

  const handleCreditAdjustment = (user: UserCreditInfo, action: 'add' | 'deduct') => {
    setSelectedUser(user);
    setCreditAction(action);
    setCreditAmount('');
    setCreditReason('');
    setShowCreditDialog(true);
  };

  const handleConfirmCreditAdjustment = () => {
    if (!selectedUser || !creditAmount || !creditReason) {
      toast.error('সব ফিল্ড পূরণ করুন!');
      return;
    }

    const amount = parseInt(creditAmount);
    const adjustedAmount = creditAction === 'add' ? amount : -amount;
    const newBalance = selectedUser.currentCredits + adjustedAmount;

    // Update user credits
    setUserCredits(userCredits.map(u =>
      u.userId === selectedUser.userId
        ? { ...u, currentCredits: newBalance }
        : u
    ));

    // Add transaction record
    const newTransaction: CreditTransaction = {
      id: `T${String(transactions.length + 1).padStart(3, '0')}`,
      userId: selectedUser.userId,
      userName: selectedUser.userName,
      userType: selectedUser.userType,
      type: creditAction === 'add' ? 'bonus' : 'deduction',
      amount: adjustedAmount,
      balanceBefore: selectedUser.currentCredits,
      balanceAfter: newBalance,
      reason: creditReason,
      timestamp: new Date().toLocaleString('bn-BD'),
      status: 'completed',
    };

    setTransactions([newTransaction, ...transactions]);

    toast.success(`${selectedUser.userName} এর জন্য ${Math.abs(adjustedAmount)} ক্রেডিট ${creditAction === 'add' ? 'যোগ' : 'কাটা'} হয়েছে!`);
    setShowCreditDialog(false);
    setSelectedUser(null);
  };

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'crown': return <Crown className="w-5 h-5" />;
      case 'zap': return <Zap className="w-5 h-5" />;
      case 'star': return <Star className="w-5 h-5" />;
      case 'gift': return <Gift className="w-5 h-5" />;
      default: return <Package className="w-5 h-5" />;
    }
  };

  const getColorClasses = (color: string) => {
    switch (color) {
      case 'purple': return 'from-purple-600 to-pink-600';
      case 'green': return 'from-green-600 to-emerald-600';
      case 'orange': return 'from-orange-600 to-red-600';
      default: return 'from-blue-600 to-cyan-600';
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl mb-2">{t.title}</h1>
        <p className="text-blue-100">{t.subtitle}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.totalRevenue}</p>
              <p className="text-3xl font-bold text-green-700">৳{(stats.totalRevenue / 1000).toFixed(0)}k</p>
              <p className="text-xs text-green-600 mt-1">
                <TrendingUp className="w-3 h-3 inline mr-1" />
                +22% এই মাসে
              </p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.activeSubscribers}</p>
              <p className="text-3xl font-bold text-blue-700">{stats.activeSubscribers}</p>
              <p className="text-xs text-blue-600 mt-1">
                <Users className="w-3 h-3 inline mr-1" />
                সক্রিয় সাবস্ক্রিপশন
              </p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <Crown className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.totalTransactions}</p>
              <p className="text-3xl font-bold text-purple-700">{stats.totalTransactions}</p>
              <p className="text-xs text-purple-600 mt-1">
                <Activity className="w-3 h-3 inline mr-1" />
                আজকে ৮টি নতুন
              </p>
            </div>
            <div className="w-12 h-12 bg-purple-600 rounded-full flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600">{t.avgCreditsPerUser}</p>
              <p className="text-3xl font-bold text-orange-700">{stats.avgCreditsPerUser}</p>
              <p className="text-xs text-orange-600 mt-1">
                <Wallet className="w-3 h-3 inline mr-1" />
                গড় ব্যালেন্স
              </p>
            </div>
            <div className="w-12 h-12 bg-orange-600 rounded-full flex items-center justify-center">
              <Wallet className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="plans">
            <Crown className="w-4 h-4 mr-2" />
            {t.plans}
          </TabsTrigger>
          <TabsTrigger value="userCredits">
            <Wallet className="w-4 h-4 mr-2" />
            {t.userCredits}
          </TabsTrigger>
          <TabsTrigger value="transactions">
            <Activity className="w-4 h-4 mr-2" />
            {t.transactions}
          </TabsTrigger>
          <TabsTrigger value="analytics">
            <BarChart3 className="w-4 h-4 mr-2" />
            {t.analytics}
          </TabsTrigger>
        </TabsList>

        {/* Subscription Plans Tab */}
        <TabsContent value="plans" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">সাবস্ক্রিপশন প্ল্যান</h2>
            <Button onClick={handleCreatePlan} className="bg-gradient-to-r from-blue-600 to-purple-600">
              <Plus className="w-4 h-4 mr-2" />
              {t.createPlan}
            </Button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plans.map((plan) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
              >
                <Card className={`relative overflow-hidden ${plan.popular ? 'border-2 border-yellow-400' : ''}`}>
                  {plan.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-yellow-400 to-orange-400 text-white px-3 py-1 text-xs font-semibold rounded-bl-lg">
                      <Star className="w-3 h-3 inline mr-1" />
                      জনপ্রিয়
                    </div>
                  )}
                  
                  <div className={`bg-gradient-to-r ${getColorClasses(plan.color)} p-6 text-white`}>
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                        {getIconComponent(plan.icon)}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold">{plan.name}</h3>
                        <p className="text-xs opacity-90">{plan.duration}</p>
                      </div>
                    </div>
                    <div className="flex items-baseline gap-2">
                      <span className="text-4xl font-bold">৳{plan.price}</span>
                      <span className="text-sm opacity-75">/ {plan.duration}</span>
                    </div>
                  </div>

                  <div className="p-6 space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-2xl font-bold text-blue-600">{plan.credits + plan.bonusCredits}</p>
                        <p className="text-xs text-gray-500">
                          {plan.credits} + {plan.bonusCredits} বোনাস
                        </p>
                      </div>
                      <Badge className="bg-blue-600">{plan.userType === 'teacher' ? 'শিক্ষক' : plan.userType === 'guardian' ? 'অভিভাবক' : 'সবার জন্য'}</Badge>
                    </div>

                    <div className="space-y-2">
                      {plan.features.slice(0, 4).map((feature, index) => (
                        <div key={index} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-green-600 flex-shrink-0" />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </div>

                    <div className="pt-4 border-t flex items-center justify-between text-sm">
                      <div>
                        <p className="text-gray-600">সাবস্ক্রাইবার</p>
                        <p className="font-semibold">{plan.subscribers}</p>
                      </div>
                      <div>
                        <p className="text-gray-600">আয়</p>
                        <p className="font-semibold text-green-600">৳{plan.revenue.toLocaleString()}</p>
                      </div>
                    </div>

                    <div className="flex gap-2 pt-4">
                      <Button variant="outline" size="sm" className="flex-1" onClick={() => handleTogglePlan(plan.id)}>
                        {plan.active ? 'সক্রিয়' : 'নিষ্ক্রিয়'}
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleEditPlan(plan)}>
                        <Edit2 className="w-4 h-4" />
                      </Button>
                      <Button variant="outline" size="sm" onClick={() => handleDeletePlan(plan.id)}>
                        <Trash2 className="w-4 h-4 text-red-600" />
                      </Button>
                    </div>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>
        </TabsContent>

        {/* User Credits Tab */}
        <TabsContent value="userCredits" className="space-y-4">
          <Card>
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.name}</TableHead>
                    <TableHead>{t.userType}</TableHead>
                    <TableHead>{t.currentCredits}</TableHead>
                    <TableHead>{t.totalPurchased}</TableHead>
                    <TableHead>{t.totalSpent}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead>{t.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {userCredits.map((user) => (
                    <TableRow key={user.userId}>
                      <TableCell>
                        <div>
                          <p className="font-medium">{user.userName}</p>
                          <p className="text-xs text-gray-500">{user.userId}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline" className={user.userType === 'teacher' ? 'border-blue-500 text-blue-700' : 'border-purple-500 text-purple-700'}>
                          {user.userType === 'teacher' ? '👨‍🏫 শিক্ষক' : '👨‍👩‍👧 অভিভাবক'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Wallet className="w-4 h-4 text-green-600" />
                          <span className="font-semibold text-green-600">{user.currentCredits}</span>
                        </div>
                      </TableCell>
                      <TableCell className="text-blue-600">{user.totalPurchased}</TableCell>
                      <TableCell className="text-orange-600">{user.totalSpent}</TableCell>
                      <TableCell>
                        <Badge className={user.subscriptionStatus === 'active' ? 'bg-green-600' : 'bg-gray-400'}>
                          {user.subscriptionStatus === 'active' ? 'সক্রিয়' : user.subscriptionStatus === 'expired' ? 'মেয়াদ শেষ' : 'নেই'}
                        </Badge>
                        {user.subscriptionPlan && (
                          <p className="text-xs text-gray-600 mt-1">{user.subscriptionPlan}</p>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCreditAdjustment(user, 'add')}
                            className="text-green-600 border-green-600 hover:bg-green-50"
                          >
                            <Plus className="w-4 h-4" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleCreditAdjustment(user, 'deduct')}
                            className="text-red-600 border-red-600 hover:bg-red-50"
                          >
                            <TrendingDown className="w-4 h-4" />
                          </Button>
                          <Button size="sm" variant="outline">
                            <Eye className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* Transactions Tab */}
        <TabsContent value="transactions" className="space-y-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">সাম্প্রতিক লেনদেন</h2>
            <div className="flex gap-2">
              <Button variant="outline">
                <RefreshCw className="w-4 h-4 mr-2" />
                {t.refresh}
              </Button>
              <Button variant="outline">
                <Download className="w-4 h-4 mr-2" />
                {t.export}
              </Button>
            </div>
          </div>

          <Card>
            <ScrollArea className="h-[500px]">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.timestamp}</TableHead>
                    <TableHead>{t.name}</TableHead>
                    <TableHead>{t.transactionType}</TableHead>
                    <TableHead>{t.amount}</TableHead>
                    <TableHead>{t.balanceBefore}</TableHead>
                    <TableHead>{t.balanceAfter}</TableHead>
                    <TableHead>{t.reason}</TableHead>
                    <TableHead>{t.status}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {transactions.map((tx) => (
                    <TableRow key={tx.id}>
                      <TableCell className="text-sm">
                        <Clock className="w-3 h-3 inline mr-1 text-gray-400" />
                        {tx.timestamp}
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium">{tx.userName}</p>
                          <Badge variant="outline" className="text-xs">
                            {tx.userType === 'teacher' ? 'শিক্ষক' : 'অভিভাবক'}
                          </Badge>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge
                          className={
                            tx.type === 'purchase' ? 'bg-blue-600' :
                            tx.type === 'bonus' ? 'bg-green-600' :
                            tx.type === 'refund' ? 'bg-purple-600' :
                            'bg-red-600'
                          }
                        >
                          {tx.type === 'purchase' ? '💳 ক্রয়' :
                           tx.type === 'bonus' ? '🎁 বোনাস' :
                           tx.type === 'refund' ? '↩️ ফেরত' :
                           '➖ কাটা'}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <span className={`font-semibold ${tx.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {tx.amount > 0 ? '+' : ''}{tx.amount}
                        </span>
                      </TableCell>
                      <TableCell className="text-gray-600">{tx.balanceBefore}</TableCell>
                      <TableCell className="font-semibold text-blue-600">{tx.balanceAfter}</TableCell>
                      <TableCell className="text-sm text-gray-600">{tx.reason}</TableCell>
                      <TableCell>
                        <Badge
                          className={
                            tx.status === 'completed' ? 'bg-green-600' :
                            tx.status === 'pending' ? 'bg-orange-500' :
                            'bg-red-600'
                          }
                        >
                          {tx.status === 'completed' ? '✓ সম্পন্ন' :
                           tx.status === 'pending' ? '⏳ অপেক্ষমাণ' :
                           '✗ ব্যর্থ'}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </ScrollArea>
          </Card>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="p-6">
              <h3 className="text-sm text-gray-600 mb-2">মোট ক্রেডিট প্রচলন</h3>
              <p className="text-3xl font-bold text-blue-600">{stats.totalCreditsInCirculation.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">সকল ইউজারের ব্যালেন্স</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm text-gray-600 mb-2">মোট বিক্রীত ক্রেডিট</h3>
              <p className="text-3xl font-bold text-green-600">{stats.totalCreditsSold.toLocaleString()}</p>
              <p className="text-xs text-gray-500 mt-1">সর্বমোট ক্রয়কৃত</p>
            </Card>

            <Card className="p-6">
              <h3 className="text-sm text-gray-600 mb-2">ক্রেডিট ব্যবহারের হার</h3>
              <p className="text-3xl font-bold text-purple-600">
                {((stats.totalCreditsInCirculation / Math.max(stats.totalCreditsSold, 1)) * 100).toFixed(1)}%
              </p>
              <p className="text-xs text-gray-500 mt-1">অবশিষ্ট ব্যালেন্স</p>
            </Card>
          </div>

          <Card className="p-6">
            <h3 className="text-lg font-semibold mb-4">প্ল্যান পারফরম্যান্স</h3>
            <div className="space-y-4">
              {plans.map((plan) => (
                <div key={plan.id} className="flex items-center gap-4">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium">{plan.name}</span>
                      <span className="text-sm text-gray-600">{plan.subscribers} সাবস্ক্রাইবার</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div
                        className={`bg-gradient-to-r ${getColorClasses(plan.color)} h-2 rounded-full transition-all`}
                        style={{ width: `${(plan.subscribers / Math.max(stats.activeSubscribers, 1)) * 100}%` }}
                      />
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold text-green-600">৳{plan.revenue.toLocaleString()}</p>
                    <p className="text-xs text-gray-500">{plan.conversionRate}% কনভার্সন</p>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Plan Dialog */}
      <Dialog open={showPlanDialog} onOpenChange={setShowPlanDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>{isEditMode ? t.editPlan : t.createPlan}</DialogTitle>
            <DialogDescription>
              সাবস্ক্রিপশন প্ল্যানের বিস্তারিত তথ্য দিন
            </DialogDescription>
          </DialogHeader>

          {selectedPlan && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t.planName}</Label>
                  <Input
                    value={selectedPlan.name}
                    onChange={(e) => setSelectedPlan({ ...selectedPlan, name: e.target.value })}
                  />
                </div>
                <div>
                  <Label>{t.duration}</Label>
                  <Select
                    value={selectedPlan.duration}
                    onValueChange={(value) => setSelectedPlan({ ...selectedPlan, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="১ মাস">১ মাস</SelectItem>
                      <SelectItem value="৩ মাস">৩ মাস</SelectItem>
                      <SelectItem value="৬ মাস">৬ মাস</SelectItem>
                      <SelectItem value="১ বছর">১ বছর</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <Label>{t.credits}</Label>
                  <Input
                    type="number"
                    value={selectedPlan.credits}
                    onChange={(e) => setSelectedPlan({ ...selectedPlan, credits: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>{t.bonusCredits}</Label>
                  <Input
                    type="number"
                    value={selectedPlan.bonusCredits}
                    onChange={(e) => setSelectedPlan({ ...selectedPlan, bonusCredits: parseInt(e.target.value) || 0 })}
                  />
                </div>
                <div>
                  <Label>{t.price}</Label>
                  <Input
                    type="number"
                    value={selectedPlan.price}
                    onChange={(e) => setSelectedPlan({ ...selectedPlan, price: parseInt(e.target.value) || 0 })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>{t.userType}</Label>
                  <Select
                    value={selectedPlan.userType}
                    onValueChange={(value: any) => setSelectedPlan({ ...selectedPlan, userType: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="teacher">শিক্ষক</SelectItem>
                      <SelectItem value="guardian">অভিভাবক</SelectItem>
                      <SelectItem value="both">উভয়</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>{t.color}</Label>
                  <Select
                    value={selectedPlan.color}
                    onValueChange={(value) => setSelectedPlan({ ...selectedPlan, color: value })}
                  >
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="blue">নীল</SelectItem>
                      <SelectItem value="purple">বেগুনি</SelectItem>
                      <SelectItem value="green">সবুজ</SelectItem>
                      <SelectItem value="orange">কমলা</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label>{t.features}</Label>
                <Textarea
                  value={selectedPlan.features.join('\n')}
                  onChange={(e) => setSelectedPlan({ ...selectedPlan, features: e.target.value.split('\n').filter(f => f.trim()) })}
                  placeholder="প্রতি লাইনে একটি ফিচার লিখুন"
                  rows={5}
                />
              </div>

              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Switch
                    checked={selectedPlan.active}
                    onCheckedChange={(checked) => setSelectedPlan({ ...selectedPlan, active: checked })}
                  />
                  <Label>{t.active}</Label>
                </div>
                <div className="flex items-center gap-2">
                  <Switch
                    checked={selectedPlan.popular}
                    onCheckedChange={(checked) => setSelectedPlan({ ...selectedPlan, popular: checked })}
                  />
                  <Label>{t.popular}</Label>
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPlanDialog(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleSavePlan} className="bg-gradient-to-r from-blue-600 to-purple-600">
              {t.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Credit Adjustment Dialog */}
      <Dialog open={showCreditDialog} onOpenChange={setShowCreditDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {creditAction === 'add' ? t.addCredits : t.deductCredits}
            </DialogTitle>
            <DialogDescription>
              {selectedUser?.userName} ({selectedUser?.currentCredits} ক্রেডিট)
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <Label>{t.enterAmount}</Label>
              <Input
                type="number"
                value={creditAmount}
                onChange={(e) => setCreditAmount(e.target.value)}
                placeholder="পরিমাণ লিখুন..."
              />
            </div>

            <div>
              <Label>{t.enterReason}</Label>
              <Textarea
                value={creditReason}
                onChange={(e) => setCreditReason(e.target.value)}
                placeholder="কারণ লিখুন..."
                rows={3}
              />
            </div>

            {creditAmount && selectedUser && (
              <Card className={`p-4 ${creditAction === 'add' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm text-gray-600">বর্তমান ব্যালেন্স</p>
                    <p className="text-2xl font-bold">{selectedUser.currentCredits}</p>
                  </div>
                  <div className="text-3xl">{creditAction === 'add' ? '+' : '-'}</div>
                  <div>
                    <p className="text-sm text-gray-600">সমন্বয়</p>
                    <p className="text-2xl font-bold">{creditAmount}</p>
                  </div>
                  <div className="text-3xl">=</div>
                  <div>
                    <p className="text-sm text-gray-600">নতুন ব্যালেন্স</p>
                    <p className={`text-2xl font-bold ${creditAction === 'add' ? 'text-green-600' : 'text-red-600'}`}>
                      {creditAction === 'add' 
                        ? selectedUser.currentCredits + parseInt(creditAmount) 
                        : selectedUser.currentCredits - parseInt(creditAmount)}
                    </p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreditDialog(false)}>
              {t.cancel}
            </Button>
            <Button
              onClick={handleConfirmCreditAdjustment}
              className={creditAction === 'add' ? 'bg-green-600 hover:bg-green-700' : 'bg-red-600 hover:bg-red-700'}
            >
              <CheckCircle className="w-4 h-4 mr-2" />
              {t.confirm}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
