import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { 
  DollarSign,
  TrendingUp,
  CreditCard,
  Users,
  Download,
  Filter,
  Calendar,
  Eye,
  CheckCircle,
  XCircle,
  AlertCircle,
  BarChart3
} from 'lucide-react';
import {
  getAllPayments,
  getPaymentStats,
  updatePaymentStatus,
  formatPaymentMethod,
  formatPaymentPurpose,
  formatPaymentStatus,
  getPaymentStatusColor,
  Payment
} from '../utils/paymentHandler';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface AdminPaymentDashboardProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'পেমেন্ট ম্যানেজমেন্ট',
    subtitle: 'সকল পেমেন্ট ও লেনদেন ব্যবস্থাপনা',
    overview: 'ওভারভিউ',
    allPayments: 'সব পেমেন্ট',
    statistics: 'পরিসংখ্যান',
    totalRevenue: 'মোট আয়',
    totalPayments: 'মোট পেমেন্ট',
    successRate: 'সফলতার হার',
    averageAmount: 'গড় পরিমাণ',
    byPurpose: 'উদ্দেশ্য অনুযায়ী',
    byMethod: 'পদ্ধতি অনুযায়ী',
    recentPayments: 'সাম্প্রতিক পেমেন্ট',
    period: 'সময়কাল',
    last7Days: 'শেষ ৭ দিন',
    last30Days: 'শেষ ৩০ দিন',
    last90Days: 'শেষ ৯০ দিন',
    filterPurpose: 'উদ্দেশ্য ফিল্টার',
    allPurposes: 'সব উদ্দেশ্য',
    creditPurchase: 'ক্রেডিট ক্রয়',
    donation: 'দান',
    subscription: 'সাবস্ক্রিপশন',
    tuitionPayment: 'টিউশন পেমেন্ট',
    loading: 'লোড হচ্ছে...',
    noData: 'কোনো ডেটা নেই',
    updateStatus: 'স্ট্যাটাস আপডেট',
    viewDetails: 'বিস্তারিত',
    exportData: 'ডেটা এক্সপোর্ট',
    user: 'ইউজার',
    amount: 'পরিমাণ',
    method: 'পদ্ধতি',
    purpose: 'উদ্দেশ্য',
    status: 'স্ট্যাটাস',
    date: 'তারিখ',
    actions: 'অ্যাকশন',
    dailyTrend: 'দৈনিক প্রবণতা',
  },
  en: {
    title: 'Payment Management',
    subtitle: 'Manage all payments and transactions',
    overview: 'Overview',
    allPayments: 'All Payments',
    statistics: 'Statistics',
    totalRevenue: 'Total Revenue',
    totalPayments: 'Total Payments',
    successRate: 'Success Rate',
    averageAmount: 'Average Amount',
    byPurpose: 'By Purpose',
    byMethod: 'By Method',
    recentPayments: 'Recent Payments',
    period: 'Period',
    last7Days: 'Last 7 Days',
    last30Days: 'Last 30 Days',
    last90Days: 'Last 90 Days',
    filterPurpose: 'Filter Purpose',
    allPurposes: 'All Purposes',
    creditPurchase: 'Credit Purchase',
    donation: 'Donation',
    subscription: 'Subscription',
    tuitionPayment: 'Tuition Payment',
    loading: 'Loading...',
    noData: 'No Data',
    updateStatus: 'Update Status',
    viewDetails: 'View Details',
    exportData: 'Export Data',
    user: 'User',
    amount: 'Amount',
    method: 'Method',
    purpose: 'Purpose',
    status: 'Status',
    date: 'Date',
    actions: 'Actions',
    dailyTrend: 'Daily Trend',
  }
};

export function AdminPaymentDashboard({ language }: AdminPaymentDashboardProps) {
  const t = content[language];
  const [payments, setPayments] = useState<Payment[]>([]);
  const [stats, setStats] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [period, setPeriod] = useState('30');
  const [purposeFilter, setPurposeFilter] = useState('all');

  useEffect(() => {
    loadData();
  }, [period, purposeFilter]);

  const loadData = async () => {
    try {
      setLoading(true);

      // Load payments
      const paymentsResult = await getAllPayments({
        limit: 100,
        purpose: purposeFilter !== 'all' ? purposeFilter : undefined
      });

      if (paymentsResult.success) {
        setPayments(paymentsResult.payments || []);
      }

      // Load statistics
      const statsResult = await getPaymentStats(parseInt(period));
      if (statsResult.success) {
        setStats(statsResult.stats);
      }
    } catch (error) {
      console.error('Load payment data error:', error);
      toast.error(language === 'bn' ? 'ডেটা লোড করতে ব্যর্থ' : 'Failed to load data');
    } finally {
      setLoading(false);
    }
  };

  const handleStatusUpdate = async (paymentId: string, newStatus: string) => {
    try {
      const result = await updatePaymentStatus(
        paymentId, 
        newStatus as 'pending' | 'completed' | 'failed' | 'refunded'
      );

      if (result.success) {
        toast.success(language === 'bn' ? 'স্ট্যাটাস আপডেট হয়েছে' : 'Status updated');
        loadData();
      } else {
        toast.error(language === 'bn' ? 'আপডেট ব্যর্থ' : 'Update failed');
      }
    } catch (error) {
      console.error('Update status error:', error);
      toast.error(language === 'bn' ? 'ত্রুটি ঘটেছে' : 'An error occurred');
    }
  };

  if (loading && !stats) {
    return (
      <Card className="p-12">
        <div className="text-center text-gray-500">
          <BarChart3 className="w-16 h-16 mx-auto mb-4 opacity-50 animate-pulse" />
          <p className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>{t.loading}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h1>
          <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.subtitle}
          </p>
        </div>

        <div className="flex gap-3">
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="7">{t.last7Days}</SelectItem>
              <SelectItem value="30">{t.last30Days}</SelectItem>
              <SelectItem value="90">{t.last90Days}</SelectItem>
            </SelectContent>
          </Select>

          <Button variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {t.exportData}
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      {stats && (
        <div className="grid md:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-emerald-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{t.totalRevenue}</p>
              <p className={`text-3xl text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                ৳{stats.totalAmount.toLocaleString()}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center">
                  <CreditCard className="w-6 h-6 text-white" />
                </div>
                <BarChart3 className="w-5 h-5 text-blue-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{t.totalPayments}</p>
              <p className={`text-3xl text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {stats.totalPayments}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-white" />
                </div>
                <TrendingUp className="w-5 h-5 text-purple-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{t.successRate}</p>
              <p className={`text-3xl text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {stats.successRate.toFixed(1)}%
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <Users className="w-5 h-5 text-orange-600" />
              </div>
              <p className="text-sm text-gray-600 mb-1">{t.averageAmount}</p>
              <p className={`text-3xl text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                ৳{stats.averageAmount.toFixed(0)}
              </p>
            </Card>
          </motion.div>
        </div>
      )}

      {/* Tabs */}
      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList>
          <TabsTrigger value="overview">{t.overview}</TabsTrigger>
          <TabsTrigger value="payments">{t.allPayments}</TabsTrigger>
          <TabsTrigger value="statistics">{t.statistics}</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          {/* By Purpose & Method */}
          <div className="grid md:grid-cols-2 gap-6">
            <Card className="p-6">
              <h3 className={`text-lg text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.byPurpose}
              </h3>
              <div className="space-y-3">
                {stats && Object.entries(stats.byPurpose || {}).map(([purpose, data]: [string, any]) => (
                  <div key={purpose} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className={`text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {formatPaymentPurpose(purpose, language)}
                    </span>
                    <div className="text-right">
                      <p className={`text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        ৳{data.amount?.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">{data.count} পেমেন্ট</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            <Card className="p-6">
              <h3 className={`text-lg text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.byMethod}
              </h3>
              <div className="space-y-3">
                {stats && Object.entries(stats.byMethod || {}).map(([method, count]: [string, any]) => (
                  <div key={method} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className={`text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {formatPaymentMethod(method, language)}
                    </span>
                    <Badge variant="outline">{count}</Badge>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Daily Trend */}
          {stats && stats.dailyTrend && stats.dailyTrend.length > 0 && (
            <Card className="p-6">
              <h3 className={`text-lg text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.dailyTrend}
              </h3>
              <div className="space-y-2">
                {stats.dailyTrend.map((day: any) => (
                  <div key={day.date} className="flex items-center gap-4">
                    <span className="text-sm text-gray-600 w-24">
                      {new Date(day.date).toLocaleDateString('bn-BD', { month: 'short', day: 'numeric' })}
                    </span>
                    <div className="flex-1 bg-gray-200 rounded-full h-8 relative overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-emerald-500 to-teal-600 h-full rounded-full flex items-center justify-end pr-2"
                        style={{ width: `${(day.amount / stats.totalAmount) * 100}%` }}
                      >
                        <span className="text-xs text-white font-medium">
                          ৳{day.amount.toLocaleString()}
                        </span>
                      </div>
                    </div>
                    <span className="text-sm text-gray-600 w-16 text-right">{day.count}</span>
                  </div>
                ))}
              </div>
            </Card>
          )}
        </TabsContent>

        {/* All Payments Tab */}
        <TabsContent value="payments" className="space-y-4">
          {/* Filter */}
          <Card className="p-4">
            <div className="flex items-center gap-4">
              <Filter className="w-5 h-5 text-gray-500" />
              <Select value={purposeFilter} onValueChange={setPurposeFilter}>
                <SelectTrigger className="w-64">
                  <SelectValue placeholder={t.filterPurpose} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">{t.allPurposes}</SelectItem>
                  <SelectItem value="credit_purchase">{t.creditPurchase}</SelectItem>
                  <SelectItem value="donation">{t.donation}</SelectItem>
                  <SelectItem value="subscription">{t.subscription}</SelectItem>
                  <SelectItem value="tuition_payment">{t.tuitionPayment}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </Card>

          {/* Payments List */}
          <div className="space-y-3">
            {payments.map((payment) => (
              <Card key={payment.id} className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 grid grid-cols-6 gap-4">
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t.amount}</p>
                      <p className={`text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        ৳{payment.amount.toLocaleString()}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t.method}</p>
                      <p className={`text-sm text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {formatPaymentMethod(payment.paymentMethod, language)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t.purpose}</p>
                      <p className={`text-sm text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {formatPaymentPurpose(payment.purpose, language)}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t.status}</p>
                      <Badge className={getPaymentStatusColor(payment.status)}>
                        {formatPaymentStatus(payment.status, language)}
                      </Badge>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 mb-1">{t.date}</p>
                      <p className="text-sm text-gray-700">
                        {new Date(payment.createdAt).toLocaleDateString('bn-BD')}
                      </p>
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button variant="outline" size="sm">
                        <Eye className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </TabsContent>

        {/* Statistics Tab */}
        <TabsContent value="statistics">
          <Card className="p-6">
            <p className={`text-center text-gray-500 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.noData}
            </p>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
