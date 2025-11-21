import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  CreditCard, 
  Download, 
  Filter, 
  Search,
  Calendar,
  DollarSign,
  TrendingUp,
  Eye
} from 'lucide-react';
import { 
  getUserPayments, 
  formatPaymentMethod, 
  formatPaymentPurpose, 
  formatPaymentStatus,
  getPaymentStatusColor,
  Payment
} from '../utils/paymentHandler';
import { toast } from 'sonner@2.0.3';

interface PaymentHistorySectionProps {
  userId: string;
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'পেমেন্ট ইতিহাস',
    subtitle: 'আপনার সকল লেনদেন দেখুন',
    searchPlaceholder: 'খুঁজুন...',
    filterAll: 'সব',
    filterCompleted: 'সফল',
    filterPending: 'অপেক্ষমাণ',
    filterFailed: 'ব্যর্থ',
    noPayments: 'কোনো পেমেন্ট নেই',
    noPaymentsDesc: 'আপনার এখনো কোনো পেমেন্ট করা হয়নি',
    loadMore: 'আরো দেখুন',
    loading: 'লোড হচ্ছে...',
    amount: 'পরিমাণ',
    method: 'পদ্ধতি',
    purpose: 'উদ্দেশ্য',
    status: 'স্ট্যাটাস',
    date: 'তারিখ',
    transactionId: 'ট্রানজাকশন আইডি',
    viewDetails: 'বিস্তারিত',
    downloadReceipt: 'রসিদ ডাউনলোড',
    totalSpent: 'মোট খরচ',
    totalTransactions: 'মোট লেনদেন',
    successRate: 'সফলতার হার',
  },
  en: {
    title: 'Payment History',
    subtitle: 'View all your transactions',
    searchPlaceholder: 'Search...',
    filterAll: 'All',
    filterCompleted: 'Completed',
    filterPending: 'Pending',
    filterFailed: 'Failed',
    noPayments: 'No Payments',
    noPaymentsDesc: 'You haven\'t made any payments yet',
    loadMore: 'Load More',
    loading: 'Loading...',
    amount: 'Amount',
    method: 'Method',
    purpose: 'Purpose',
    status: 'Status',
    date: 'Date',
    transactionId: 'Transaction ID',
    viewDetails: 'View Details',
    downloadReceipt: 'Download Receipt',
    totalSpent: 'Total Spent',
    totalTransactions: 'Total Transactions',
    successRate: 'Success Rate',
  }
};

export function PaymentHistorySection({ userId, language }: PaymentHistorySectionProps) {
  const t = content[language];
  const [payments, setPayments] = useState<Payment[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [total, setTotal] = useState(0);
  const [offset, setOffset] = useState(0);
  const limit = 10;

  useEffect(() => {
    loadPayments();
  }, [userId]);

  const loadPayments = async (loadMore = false) => {
    try {
      setLoading(true);
      const currentOffset = loadMore ? offset : 0;
      
      const result = await getUserPayments(userId, { 
        limit, 
        offset: currentOffset 
      });

      if (result.success && result.payments) {
        if (loadMore) {
          setPayments(prev => [...prev, ...result.payments!]);
        } else {
          setPayments(result.payments);
        }
        setTotal(result.total || 0);
        setOffset(currentOffset + result.payments.length);
      } else {
        toast.error(language === 'bn' ? 'পেমেন্ট লোড করতে ব্যর্থ' : 'Failed to load payments');
      }
    } catch (error) {
      console.error('Load payments error:', error);
      toast.error(language === 'bn' ? 'ত্রুটি ঘটেছে' : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const filteredPayments = payments.filter(payment => {
    // Filter by status
    if (filter !== 'all' && payment.status !== filter) {
      return false;
    }

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      return (
        payment.transactionRef?.toLowerCase().includes(query) ||
        payment.description?.toLowerCase().includes(query) ||
        payment.purpose?.toLowerCase().includes(query)
      );
    }

    return true;
  });

  // Calculate statistics
  const stats = {
    totalSpent: payments
      .filter(p => p.status === 'completed')
      .reduce((sum, p) => sum + p.amount, 0),
    totalTransactions: payments.length,
    successRate: payments.length > 0
      ? (payments.filter(p => p.status === 'completed').length / payments.length) * 100
      : 0
  };

  if (loading && payments.length === 0) {
    return (
      <Card className="p-8">
        <div className="text-center text-gray-500">
          <CreditCard className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p>{t.loading}</p>
        </div>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className={`text-2xl text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.title}
        </h2>
        <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.subtitle}
        </p>
      </div>

      {/* Statistics */}
      <div className="grid md:grid-cols-3 gap-4">
        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-emerald-100 rounded-lg flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-emerald-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t.totalSpent}</p>
              <p className={`text-2xl text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                ৳{stats.totalSpent.toLocaleString()}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
              <CreditCard className="w-6 h-6 text-blue-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t.totalTransactions}</p>
              <p className={`text-2xl text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {stats.totalTransactions}
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-purple-600" />
            </div>
            <div>
              <p className="text-sm text-gray-600">{t.successRate}</p>
              <p className={`text-2xl text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {stats.successRate.toFixed(0)}%
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Filters and Search */}
      <Card className="p-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className={`w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            />
          </div>

          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              onClick={() => setFilter('all')}
              size="sm"
            >
              <Filter className="w-4 h-4 mr-2" />
              {t.filterAll}
            </Button>
            <Button
              variant={filter === 'completed' ? 'default' : 'outline'}
              onClick={() => setFilter('completed')}
              size="sm"
            >
              {t.filterCompleted}
            </Button>
            <Button
              variant={filter === 'pending' ? 'default' : 'outline'}
              onClick={() => setFilter('pending')}
              size="sm"
            >
              {t.filterPending}
            </Button>
            <Button
              variant={filter === 'failed' ? 'default' : 'outline'}
              onClick={() => setFilter('failed')}
              size="sm"
            >
              {t.filterFailed}
            </Button>
          </div>
        </div>
      </Card>

      {/* Payments List */}
      {filteredPayments.length === 0 ? (
        <Card className="p-12">
          <div className="text-center text-gray-500">
            <CreditCard className="w-16 h-16 mx-auto mb-4 opacity-50" />
            <p className={`text-lg mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.noPayments}
            </p>
            <p className={`text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.noPaymentsDesc}
            </p>
          </div>
        </Card>
      ) : (
        <div className="space-y-4">
          {filteredPayments.map((payment) => (
            <Card key={payment.id} className="p-6 hover:shadow-lg transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex-1">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center flex-shrink-0">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <p className={`text-lg text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          ৳{payment.amount.toLocaleString()}
                        </p>
                        <Badge className={getPaymentStatusColor(payment.status)}>
                          {formatPaymentStatus(payment.status, language)}
                        </Badge>
                      </div>
                      
                      <p className={`text-gray-700 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {formatPaymentPurpose(payment.purpose, language)}
                      </p>
                      
                      <div className={`flex flex-wrap gap-4 text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        <span className="flex items-center gap-1">
                          <CreditCard className="w-4 h-4" />
                          {formatPaymentMethod(payment.paymentMethod, language)}
                        </span>
                        <span className="flex items-center gap-1">
                          <Calendar className="w-4 h-4" />
                          {new Date(payment.createdAt).toLocaleDateString('bn-BD')}
                        </span>
                        <span className="text-xs text-gray-500">
                          ID: {payment.transactionRef}
                        </span>
                      </div>

                      {payment.description && (
                        <p className={`text-sm text-gray-600 mt-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          {payment.description}
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Eye className="w-4 h-4 mr-2" />
                    {t.viewDetails}
                  </Button>
                  {payment.status === 'completed' && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      {t.downloadReceipt}
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          ))}

          {/* Load More Button */}
          {offset < total && (
            <div className="text-center pt-4">
              <Button
                variant="outline"
                onClick={() => loadPayments(true)}
                disabled={loading}
              >
                {loading ? t.loading : t.loadMore}
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
