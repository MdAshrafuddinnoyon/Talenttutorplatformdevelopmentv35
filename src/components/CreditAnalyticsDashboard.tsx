import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import {
  TrendingUp,
  DollarSign,
  Users,
  Package,
  Star,
  Download,
  RefreshCw,
  Loader2,
  ArrowUp,
  ArrowDown,
  CreditCard,
  Wallet,
  ShoppingCart,
  Award,
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { toast } from 'sonner@2.0.3';
import { getApiUrl, getApiHeaders } from '../utils/apiConfig';

interface CreditAnalyticsDashboardProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'ক্রেডিট অ্যানালিটিক্স',
    subtitle: 'রেভিনিউ এবং জনপ্রিয় প্যাকেজ ট্র্যাকিং',
    totalRevenue: 'মোট রেভিনিউ',
    totalTransactions: 'মোট লেনদেন',
    activePackages: 'সক্রিয় প্যাকেজ',
    avgTransaction: 'গড় লেনদেন',
    revenueOverTime: 'সময়ের সাথে রেভিনিউ',
    popularPackages: 'জনপ্রিয় প্যাকেজ',
    packageDistribution: 'প্যাকেজ বিতরণ',
    topPerformers: 'সেরা পারফরমার',
    packageName: 'প্যাকেজ নাম',
    sales: 'বিক্রয়',
    revenue: 'রেভিনিউ',
    refresh: 'রিফ্রেশ',
    export: 'এক্সপোর্ট',
    loading: 'লোড হচ্ছে...',
    thisMonth: 'এই মাসে',
    lastMonth: 'গত মাসে',
    growth: 'বৃদ্ধি',
    decline: 'হ্রাস',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    conversionRate: 'কনভার্সন রেট',
    avgPurchaseValue: 'গড় ক্রয় মূল্য',
  },
  en: {
    title: 'Credit Analytics',
    subtitle: 'Revenue and popular packages tracking',
    totalRevenue: 'Total Revenue',
    totalTransactions: 'Total Transactions',
    activePackages: 'Active Packages',
    avgTransaction: 'Avg Transaction',
    revenueOverTime: 'Revenue Over Time',
    popularPackages: 'Popular Packages',
    packageDistribution: 'Package Distribution',
    topPerformers: 'Top Performers',
    packageName: 'Package Name',
    sales: 'Sales',
    revenue: 'Revenue',
    refresh: 'Refresh',
    export: 'Export',
    loading: 'Loading...',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    growth: 'Growth',
    decline: 'Decline',
    teacher: 'Teacher',
    guardian: 'Guardian',
    conversionRate: 'Conversion Rate',
    avgPurchaseValue: 'Avg Purchase Value',
  },
};

// Mock data for demonstration
const mockRevenueData = [
  { month: 'জানুয়ারি', revenue: 45000, transactions: 45 },
  { month: 'ফেব্রুয়ারি', revenue: 52000, transactions: 52 },
  { month: 'মার্চ', revenue: 48000, transactions: 48 },
  { month: 'এপ্রিল', revenue: 61000, transactions: 61 },
  { month: 'মে', revenue: 55000, transactions: 55 },
  { month: 'জুন', revenue: 67000, transactions: 67 },
];

const mockPackageData = [
  { name: 'স্টার্টার প্যাক', sales: 120, revenue: 24000, userType: 'teacher' },
  { name: 'প্রিমিয়াম প্যাক', sales: 85, revenue: 42500, userType: 'teacher' },
  { name: 'প্রফেশনাল প্যাক', sales: 45, revenue: 45000, userType: 'teacher' },
  { name: 'বেসিক প্যাক', sales: 95, revenue: 28500, userType: 'guardian' },
  { name: 'প্রিমিয়াম প্যাক', sales: 110, revenue: 110000, userType: 'guardian' },
  { name: 'এলিট প্যাক', sales: 30, revenue: 60000, userType: 'guardian' },
];

const COLORS = ['#10b981', '#3b82f6', '#8b5cf6', '#f59e0b', '#ef4444', '#06b6d4'];

export function CreditAnalyticsDashboard({ language }: CreditAnalyticsDashboardProps) {
  const t = content[language];
  
  const [loading, setLoading] = useState(false);
  const [stats, setStats] = useState({
    totalRevenue: 328000,
    totalTransactions: 485,
    activePackages: 6,
    avgTransaction: 676,
    growth: 12.5,
    conversionRate: 18.5,
  });
  
  const [revenueData, setRevenueData] = useState(mockRevenueData);
  const [packageData, setPackageData] = useState(mockPackageData);
  
  const handleRefresh = async () => {
    setLoading(true);
    try {
      // Fetch real data from backend
      const response = await fetch(
        getApiUrl('analytics/credit-analytics'),
        {
          headers: getApiHeaders(),
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        // Update stats with real data
        if (data.stats) {
          setStats(data.stats);
        }
        if (data.revenueData) {
          setRevenueData(data.revenueData);
        }
        if (data.packageData) {
          setPackageData(data.packageData);
        }
        toast.success(language === 'bn' ? 'ডাটা আপডেট হয়েছে' : 'Data updated');
      }
    } catch (error) {
      console.error('Error fetching analytics:', error);
    } finally {
      setLoading(false);
    }
  };
  
  const handleExport = () => {
    const exportData = {
      stats,
      revenueData,
      packageData,
      exportedAt: new Date().toISOString(),
    };
    
    const dataStr = JSON.stringify(exportData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(dataBlob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `credit_analytics_${Date.now()}.json`;
    link.click();
    
    toast.success(language === 'bn' ? 'ডাটা এক্সপোর্ট হয়েছে' : 'Data exported');
  };
  
  const pieData = packageData.map((pkg) => ({
    name: pkg.name,
    value: pkg.revenue,
  }));
  
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
        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.totalRevenue}</p>
              <h3 className="text-3xl font-bold text-gray-900">৳{stats.totalRevenue.toLocaleString()}</h3>
              <div className="flex items-center gap-1 mt-2">
                <ArrowUp className="w-4 h-4 text-green-600" />
                <span className="text-sm text-green-600 font-semibold">+{stats.growth}%</span>
                <span className="text-xs text-gray-500">{t.thisMonth}</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-green-500 rounded-xl flex items-center justify-center">
              <DollarSign className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.totalTransactions}</p>
              <h3 className="text-3xl font-bold text-gray-900">{stats.totalTransactions}</h3>
              <div className="flex items-center gap-1 mt-2">
                <ShoppingCart className="w-4 h-4 text-blue-600" />
                <span className="text-sm text-blue-600 font-semibold">{stats.activePackages} {t.activePackages}</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-blue-500 rounded-xl flex items-center justify-center">
              <CreditCard className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.avgTransaction}</p>
              <h3 className="text-3xl font-bold text-gray-900">৳{stats.avgTransaction}</h3>
              <div className="flex items-center gap-1 mt-2">
                <Wallet className="w-4 h-4 text-purple-600" />
                <span className="text-sm text-purple-600 font-semibold">{t.avgPurchaseValue}</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-purple-500 rounded-xl flex items-center justify-center">
              <Wallet className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>
        
        <Card className="p-6 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-600 mb-1">{t.conversionRate}</p>
              <h3 className="text-3xl font-bold text-gray-900">{stats.conversionRate}%</h3>
              <div className="flex items-center gap-1 mt-2">
                <TrendingUp className="w-4 h-4 text-orange-600" />
                <span className="text-sm text-orange-600 font-semibold">{t.growth}</span>
              </div>
            </div>
            <div className="w-14 h-14 bg-orange-500 rounded-xl flex items-center justify-center">
              <Award className="w-7 h-7 text-white" />
            </div>
          </div>
        </Card>
      </div>
      
      {/* Charts */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Over Time */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.revenueOverTime}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={revenueData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" strokeWidth={2} name={t.revenue} />
              <Line type="monotone" dataKey="transactions" stroke="#3b82f6" strokeWidth={2} name={t.totalTransactions} />
            </LineChart>
          </ResponsiveContainer>
        </Card>
        
        {/* Package Distribution */}
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.packageDistribution}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
      
      {/* Popular Packages Bar Chart */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.popularPackages}</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={packageData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="sales" fill="#3b82f6" name={t.sales} />
            <Bar dataKey="revenue" fill="#10b981" name={t.revenue} />
          </BarChart>
        </ResponsiveContainer>
      </Card>
      
      {/* Top Performers Table */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-6">{t.topPerformers}</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="text-left py-3 px-4 font-semibold text-gray-700">{t.packageName}</th>
                <th className="text-left py-3 px-4 font-semibold text-gray-700">User Type</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">{t.sales}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">{t.revenue}</th>
                <th className="text-right py-3 px-4 font-semibold text-gray-700">Avg Value</th>
              </tr>
            </thead>
            <tbody>
              {packageData
                .sort((a, b) => b.revenue - a.revenue)
                .map((pkg, index) => (
                  <tr key={index} className="border-b hover:bg-gray-50">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-4 h-4 text-yellow-500" />
                        <span className="font-medium">{pkg.name}</span>
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      <Badge variant={pkg.userType === 'teacher' ? 'default' : 'secondary'}>
                        {pkg.userType === 'teacher' ? t.teacher : t.guardian}
                      </Badge>
                    </td>
                    <td className="text-right py-3 px-4 font-semibold">{pkg.sales}</td>
                    <td className="text-right py-3 px-4 font-semibold text-green-600">
                      ৳{pkg.revenue.toLocaleString()}
                    </td>
                    <td className="text-right py-3 px-4 text-gray-600">
                      ৳{Math.round(pkg.revenue / pkg.sales)}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
