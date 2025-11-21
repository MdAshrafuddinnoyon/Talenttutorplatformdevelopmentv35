import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  Users,
  TrendingUp,
  TrendingDown,
  Search,
  Filter,
  Download,
  RefreshCw,
  Loader2,
  ArrowUpRight,
  ArrowDownRight,
  Activity,
  Zap,
  CreditCard,
  DollarSign,
  Calendar,
  User,
} from 'lucide-react';
import { LineChart, Line, AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import { getApiUrl, getApiHeaders } from '../utils/apiConfig';

interface CreditUsageReportsProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'ক্রেডিট ব্যবহার রিপোর্ট',
    subtitle: 'ব্যবহারকারীদের খরচের প্যাটার্ন এবং ট্রেন্ড',
    totalUsers: 'মোট ব্যবহারকারী',
    activeUsers: 'সক্রিয় ব্যবহারকারী',
    avgSpending: 'গড় খরচ',
    totalSpent: 'মোট খরচ',
    userSpending: 'ব্যবহারকারী খরচ',
    spendingTrends: 'খরচের ট্রেন্ড',
    topSpenders: 'সর্বোচ্চ খরচকারী',
    recentActivity: 'সাম্প্রতিক কার্যক্রম',
    userName: 'ব্যবহারকারী নাম',
    userType: 'ইউজার টাইপ',
    credits: 'ক্রেডিট',
    spent: 'খরচ',
    balance: 'ব্যালেন্স',
    lastActive: 'শেষ সক্রিয়',
    search: 'অনুসন্ধান',
    filter: 'ফিল্টার',
    export: 'এক্সপোর্ট',
    refresh: 'রিফ্রেশ',
    all: 'সব',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    loading: 'লোড হচ্ছে...',
    noData: 'কোন ডাটা নেই',
    thisWeek: 'এই সপ্তাহ',
    thisMonth: 'এই মাস',
    usage: 'ব্যবহার',
    purchases: 'ক্রয়',
    action: 'কার্যক্রম',
    amount: 'পরিমাণ',
    date: 'তারিখ',
  },
  en: {
    title: 'Credit Usage Reports',
    subtitle: 'User spending patterns and trends',
    totalUsers: 'Total Users',
    activeUsers: 'Active Users',
    avgSpending: 'Avg Spending',
    totalSpent: 'Total Spent',
    userSpending: 'User Spending',
    spendingTrends: 'Spending Trends',
    topSpenders: 'Top Spenders',
    recentActivity: 'Recent Activity',
    userName: 'User Name',
    userType: 'User Type',
    credits: 'Credits',
    spent: 'Spent',
    balance: 'Balance',
    lastActive: 'Last Active',
    search: 'Search',
    filter: 'Filter',
    export: 'Export',
    refresh: 'Refresh',
    all: 'All',
    teacher: 'Teacher',
    guardian: 'Guardian',
    loading: 'Loading...',
    noData: 'No data',
    thisWeek: 'This Week',
    thisMonth: 'This Month',
    usage: 'Usage',
    purchases: 'Purchases',
    action: 'Action',
    amount: 'Amount',
    date: 'Date',
  },
};

// Mock data
const mockUsers = [
  { 
    id: 1, 
    name: 'সাবিনা আক্তার', 
    userType: 'teacher', 
    credits: 45, 
    spent: 155, 
    balance: 45,
    lastActive: '২ ঘন্টা আগে',
    totalPurchased: 200,
    avgMonthlySpend: 50,
  },
  { 
    id: 2, 
    name: 'মিসেস খান', 
    userType: 'guardian', 
    credits: 85, 
    spent: 215, 
    balance: 85,
    lastActive: '১ দিন আগে',
    totalPurchased: 300,
    avgMonthlySpend: 70,
  },
  { 
    id: 3, 
    name: 'মোঃ করিম', 
    userType: 'teacher', 
    credits: 25, 
    spent: 75, 
    balance: 25,
    lastActive: '৫ ঘন্টা আগে',
    totalPurchased: 100,
    avgMonthlySpend: 25,
  },
  { 
    id: 4, 
    name: 'জনাব আলম', 
    userType: 'guardian', 
    credits: 120, 
    spent: 180, 
    balance: 120,
    lastActive: '৩ ঘন্টা আগে',
    totalPurchased: 300,
    avgMonthlySpend: 60,
  },
];

const mockTrendData = [
  { week: 'সপ্তাহ ১', spent: 450, purchased: 800 },
  { week: 'সপ্তাহ ২', spent: 520, purchased: 600 },
  { week: 'সপ্তাহ ৩', spent: 480, purchased: 700 },
  { week: 'সপ্তাহ ৪', spent: 625, purchased: 900 },
];

const mockActivity = [
  { id: 1, user: 'সাবিনা আক্তার', action: 'টিউশনে আবেদন', amount: -10, date: '২ ঘন্টা আগে', type: 'usage' },
  { id: 2, user: 'মিসেস খান', action: 'প্রিমিয়াম প্যাক ক্রয়', amount: +200, date: '৫ ঘন্টা আগে', type: 'purchase' },
  { id: 3, user: 'মোঃ করিম', action: 'টিউশনে আবেদন', amount: -10, date: '১ দিন আগে', type: 'usage' },
  { id: 4, user: 'জনাব আলম', action: 'টিউশন পোস্ট', amount: -20, date: '১ দিন আগে', type: 'usage' },
  { id: 5, user: 'সাবিনা আক্তার', action: 'স্টার্টার প্যাক ক্রয়', amount: +40, date: '২ দিন আগে', type: 'purchase' },
];

export function CreditUsageReports({ language }: CreditUsageReportsProps) {
  const t = content[language];
  
  const [loading, setLoading] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  
  const [users, setUsers] = useState(mockUsers);
  const [trendData, setTrendData] = useState(mockTrendData);
  const [activity, setActivity] = useState(mockActivity);
  
  const [stats, setStats] = useState({
    totalUsers: 485,
    activeUsers: 342,
    avgSpending: 156,
    totalSpent: 75600,
  });
  
  const handleRefresh = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        getApiUrl('analytics/credit-usage'),
        {
          headers: getApiHeaders(),
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        if (data.users) setUsers(data.users);
        if (data.stats) setStats(data.stats);
        if (data.trendData) setTrendData(data.trendData);
        if (data.activity) setActivity(data.activity);
        toast.success(language === 'bn' ? 'ডাটা আপডেট হয়েছে' : 'Data updated');
      }
    } catch (error) {
      console.error('Error fetching usage reports:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleExport = () => {
    const exportData = {
      stats,
      users,
      trendData,
      activity,
      exportedAt: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `credit_usage_report_${Date.now()}.json`;
    link.click();
    
    toast.success(language === 'bn' ? 'রিপোর্ট এক্সপোর্ট হয়েছে' : 'Report exported');
  };
  
  const filteredUsers = users.filter(user => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = userTypeFilter === 'all' || user.userType === userTypeFilter;
    return matchesSearch && matchesFilter;
  });
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleRefresh} disabled={loading}>
            {loading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : (
              <RefreshCw className="w-4 h-4 mr-2" />
            )}
            {t.refresh}
          </Button>
          <Button onClick={handleExport}>
            <Download className="w-4 h-4 mr-2" />
            {t.export}
          </Button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.totalUsers}</p>
              <h3 className="text-3xl font-bold text-gray-900">{stats.totalUsers}</h3>
              <div className="flex items-center gap-1 mt-2">
                <Users className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-600 font-semibold">{t.activeUsers}: {stats.activeUsers}</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center">
              <Users className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.totalSpent}</p>
              <h3 className="text-3xl font-bold text-gray-900">৳{stats.totalSpent.toLocaleString()}</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-semibold">+15% {t.thisMonth}</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.avgSpending}</p>
              <h3 className="text-3xl font-bold text-gray-900">৳{stats.avgSpending}</h3>
              <div className="flex items-center gap-1 mt-2">
                <Activity className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-600 font-semibold">Per user</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center">
              <Zap className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.activeUsers}</p>
              <h3 className="text-3xl font-bold text-gray-900">{stats.activeUsers}</h3>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUpRight className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-semibold">70.5% active</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center">
              <Activity className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Spending Trends */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.spendingTrends}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Area type="monotone" dataKey="spent" stackId="1" stroke="#ef4444" fill="#fee2e2" name={t.spent} />
              <Area type="monotone" dataKey="purchased" stackId="2" stroke="#10b981" fill="#d1fae5" name={t.purchases} />
            </AreaChart>
          </ResponsiveContainer>
        </Card>
        
        {/* Usage vs Purchases */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.usage} vs {t.purchases}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={trendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="week" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="spent" fill="#f59e0b" name={t.usage} />
              <Bar dataKey="purchased" fill="#3b82f6" name={t.purchases} />
            </BarChart>
          </ResponsiveContainer>
        </Card>
      </div>
      
      {/* Filters */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder={t.search}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
            <SelectTrigger className="w-full md:w-48">
              <Filter className="w-4 h-4 mr-2" />
              <SelectValue placeholder={t.filter} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.all}</SelectItem>
              <SelectItem value="teacher">{t.teacher}</SelectItem>
              <SelectItem value="guardian">{t.guardian}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>
      
      {/* Top Spenders Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.topSpenders}</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.userName}</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.userType}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">{t.balance}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">{t.spent}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Total Purchased</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.lastActive}</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers
                .sort((a, b) => b.spent - a.spent)
                .map((user) => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <User className="w-4 h-4 text-gray-400" />
                        <span className="font-medium">{user.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={user.userType === 'teacher' ? 'default' : 'secondary'}>
                        {user.userType === 'teacher' ? t.teacher : t.guardian}
                      </Badge>
                    </td>
                    <td className="text-right py-3 px-4 font-semibold text-green-600">
                      {user.balance} {t.credits}
                    </td>
                    <td className="text-right py-3 px-4 font-semibold text-red-600">
                      {user.spent} {t.credits}
                    </td>
                    <td className="text-right py-3 px-4 font-semibold text-blue-600">
                      {user.totalPurchased} {t.credits}
                    </td>
                    <td className="py-3 px-4 text-gray-600 text-sm">
                      {user.lastActive}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
      
      {/* Recent Activity */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.recentActivity}</h3>
        <div className="space-y-3">
          {activity.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  item.type === 'purchase' ? 'bg-green-100' : 'bg-red-100'
                }`}>
                  {item.type === 'purchase' ? (
                    <ArrowUpRight className="w-5 h-5 text-green-600" />
                  ) : (
                    <ArrowDownRight className="w-5 h-5 text-red-600" />
                  )}
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item.user}</p>
                  <p className="text-sm text-gray-600">{item.action}</p>
                </div>
              </div>
              <div className="text-right">
                <p className={`font-semibold ${item.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {item.amount > 0 ? '+' : ''}{item.amount} {t.credits}
                </p>
                <p className="text-xs text-gray-500">{item.date}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}
