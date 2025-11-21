import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Calendar } from './ui/calendar';
import {
  TrendingUp,
  TrendingDown,
  DollarSign,
  CreditCard,
  ArrowUpRight,
  ArrowDownRight,
  Download,
  Filter,
  Search,
  Calendar as CalendarIcon,
  MessageSquare,
  Video,
  FileText,
  Gift,
  Plus,
  Minus,
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface CreditTransaction {
  id: string;
  type: 'earned' | 'spent' | 'purchased' | 'refund' | 'bonus';
  amount: number;
  balanceAfter: number;
  description: string;
  category: 'chat' | 'video' | 'application' | 'contract' | 'purchase' | 'other';
  relatedTo?: {
    type: 'teacher' | 'guardian' | 'student';
    name: string;
  };
  date: Date;
  paymentMethod?: string;
  invoiceId?: string;
}

interface CreditHistorySectionProps {
  transactions: CreditTransaction[];
  currentBalance: number;
  language: 'bn' | 'en';
  onPurchaseCredits: () => void;
  onDownloadInvoice: (transactionId: string) => void;
}

const content = {
  bn: {
    title: 'ক্রেডিট হিস্টরি',
    currentBalance: 'বর্তমান ব্যালেন্স',
    totalEarned: 'মোট অর্জিত',
    totalSpent: 'মোট খরচ',
    totalPurchased: 'মোট ক্রয়',
    purchaseCredits: 'ক্রেডিট কিনুন',
    exportHistory: 'হিস্টরি ডাউনলোড করুন',
    filter: 'ফিল্টার',
    search: 'খুঁজুন',
    searchPlaceholder: 'বর্ণনা অনুসন্ধান করুন...',
    allTypes: 'সব ধরন',
    allCategories: 'সব বিভাগ',
    dateRange: 'তারিখ পরিসীমা',
    type: {
      earned: 'অর্জিত',
      spent: 'খরচ',
      purchased: 'ক্রয়',
      refund: 'ফেরত',
      bonus: 'বোনাস',
    },
    category: {
      chat: 'চ্যাট',
      video: 'ভিডিও মিটিং',
      application: 'আবেদন',
      contract: 'চুক্তি',
      purchase: 'ক্রয়',
      other: 'অন্যান্য',
    },
    date: 'তারিখ',
    description: 'বর্ণনা',
    amount: 'পরিমাণ',
    balance: 'ব্যালেন্স',
    downloadInvoice: 'ইনভয়েস ডাউনলোড',
    noTransactions: 'কোনো লেনদেন নেই',
    credits: 'ক্রেডিট',
    relatedTo: 'সম্পর্কিত',
    paymentMethod: 'পেমেন্ট মেথড',
    thisMonth: 'এই মাস',
    lastMonth: 'গত মাস',
    last3Months: 'গত ৩ মাস',
    thisYear: 'এই বছর',
    custom: 'কাস্টম',
    apply: 'প্রয়োগ করুন',
    reset: 'রিসেট',
  },
  en: {
    title: 'Credit History',
    currentBalance: 'Current Balance',
    totalEarned: 'Total Earned',
    totalSpent: 'Total Spent',
    totalPurchased: 'Total Purchased',
    purchaseCredits: 'Purchase Credits',
    exportHistory: 'Export History',
    filter: 'Filter',
    search: 'Search',
    searchPlaceholder: 'Search description...',
    allTypes: 'All Types',
    allCategories: 'All Categories',
    dateRange: 'Date Range',
    type: {
      earned: 'Earned',
      spent: 'Spent',
      purchased: 'Purchased',
      refund: 'Refund',
      bonus: 'Bonus',
    },
    category: {
      chat: 'Chat',
      video: 'Video Meeting',
      application: 'Application',
      contract: 'Contract',
      purchase: 'Purchase',
      other: 'Other',
    },
    date: 'Date',
    description: 'Description',
    amount: 'Amount',
    balance: 'Balance',
    downloadInvoice: 'Download Invoice',
    noTransactions: 'No transactions found',
    credits: 'credits',
    relatedTo: 'Related to',
    paymentMethod: 'Payment Method',
    thisMonth: 'This Month',
    lastMonth: 'Last Month',
    last3Months: 'Last 3 Months',
    thisYear: 'This Year',
    custom: 'Custom',
    apply: 'Apply',
    reset: 'Reset',
  },
};

export function CreditHistorySection({
  transactions,
  currentBalance,
  language,
  onPurchaseCredits,
  onDownloadInvoice,
}: CreditHistorySectionProps) {
  const t = content[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('all');
  const [showCalendar, setShowCalendar] = useState(false);

  // Calculate stats
  const totalEarned = transactions
    .filter((t) => t.type === 'earned' || t.type === 'purchased' || t.type === 'bonus')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalSpent = transactions
    .filter((t) => t.type === 'spent')
    .reduce((sum, t) => sum + t.amount, 0);

  const totalPurchased = transactions
    .filter((t) => t.type === 'purchased')
    .reduce((sum, t) => sum + t.amount, 0);

  // Filter transactions
  const filteredTransactions = transactions.filter((transaction) => {
    // Search filter
    if (searchQuery && !transaction.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }

    // Type filter
    if (filterType !== 'all' && transaction.type !== filterType) {
      return false;
    }

    // Category filter
    if (filterCategory !== 'all' && transaction.category !== filterCategory) {
      return false;
    }

    // Date filter
    if (dateRange !== 'all') {
      const now = new Date();
      const transactionDate = transaction.date;
      
      if (dateRange === 'thisMonth') {
        if (transactionDate.getMonth() !== now.getMonth() || transactionDate.getFullYear() !== now.getFullYear()) {
          return false;
        }
      } else if (dateRange === 'lastMonth') {
        const lastMonth = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        if (transactionDate.getMonth() !== lastMonth.getMonth() || transactionDate.getFullYear() !== lastMonth.getFullYear()) {
          return false;
        }
      } else if (dateRange === 'last3Months') {
        const threeMonthsAgo = new Date(now.getFullYear(), now.getMonth() - 3, now.getDate());
        if (transactionDate < threeMonthsAgo) {
          return false;
        }
      } else if (dateRange === 'thisYear') {
        if (transactionDate.getFullYear() !== now.getFullYear()) {
          return false;
        }
      }
    }

    return true;
  });

  const getTypeIcon = (type: CreditTransaction['type']) => {
    switch (type) {
      case 'earned':
        return <ArrowUpRight className="w-4 h-4 text-green-600" />;
      case 'spent':
        return <ArrowDownRight className="w-4 h-4 text-red-600" />;
      case 'purchased':
        return <Plus className="w-4 h-4 text-blue-600" />;
      case 'refund':
        return <ArrowUpRight className="w-4 h-4 text-purple-600" />;
      case 'bonus':
        return <Gift className="w-4 h-4 text-orange-600" />;
    }
  };

  const getTypeBadge = (type: CreditTransaction['type']) => {
    const variants: Record<CreditTransaction['type'], string> = {
      earned: 'bg-green-100 text-green-800',
      spent: 'bg-red-100 text-red-800',
      purchased: 'bg-blue-100 text-blue-800',
      refund: 'bg-purple-100 text-purple-800',
      bonus: 'bg-orange-100 text-orange-800',
    };
    return (
      <Badge className={`${variants[type]} border-0 flex items-center gap-1`}>
        {getTypeIcon(type)}
        {t.type[type]}
      </Badge>
    );
  };

  const getCategoryIcon = (category: CreditTransaction['category']) => {
    switch (category) {
      case 'chat':
        return <MessageSquare className="w-4 h-4" />;
      case 'video':
        return <Video className="w-4 h-4" />;
      case 'application':
        return <FileText className="w-4 h-4" />;
      case 'contract':
        return <FileText className="w-4 h-4" />;
      case 'purchase':
        return <CreditCard className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  const handleExportHistory = () => {
    // Create CSV export
    const csv = filteredTransactions.map((t) => ({
      Date: t.date.toLocaleDateString('bn-BD'),
      Type: t.type,
      Category: t.category,
      Description: t.description,
      Amount: t.amount,
      Balance: t.balanceAfter,
    }));

    toast.success(language === 'bn' ? 'হিস্টরি ডাউনলোড হচ্ছে...' : 'Downloading history...');
  };

  const handleResetFilters = () => {
    setSearchQuery('');
    setFilterType('all');
    setFilterCategory('all');
    setDateRange('all');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">{t.title}</h2>
          <p className="text-gray-600">
            {language === 'bn'
              ? 'আপনার সম্পূর্ণ ক্রেডিট লেনদেন ইতিহাস'
              : 'Your complete credit transaction history'}
          </p>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleExportHistory} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {t.exportHistory}
          </Button>
          <Button onClick={onPurchaseCredits} className="bg-purple-600 hover:bg-purple-700">
            <Plus className="w-4 h-4 mr-2" />
            {t.purchaseCredits}
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-6 bg-gradient-to-br from-purple-500 to-pink-500 text-white">
          <div className="flex items-center justify-between mb-2">
            <p className="text-white/90">{t.currentBalance}</p>
            <CreditCard className="w-5 h-5 text-white/80" />
          </div>
          <p className="text-3xl">{currentBalance.toLocaleString()}</p>
          <p className="text-sm text-white/80">{t.credits}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">{t.totalEarned}</p>
            <TrendingUp className="w-5 h-5 text-green-600" />
          </div>
          <p className="text-2xl text-green-600">+{totalEarned.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{t.credits}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">{t.totalSpent}</p>
            <TrendingDown className="w-5 h-5 text-red-600" />
          </div>
          <p className="text-2xl text-red-600">-{totalSpent.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{t.credits}</p>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600">{t.totalPurchased}</p>
            <DollarSign className="w-5 h-5 text-blue-600" />
          </div>
          <p className="text-2xl text-blue-600">{totalPurchased.toLocaleString()}</p>
          <p className="text-sm text-gray-500">{t.credits}</p>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-6">
        <div className="grid md:grid-cols-4 gap-4">
          <div>
            <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <Search className="w-4 h-4" />
              {t.search}
            </label>
            <Input
              placeholder={t.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <Filter className="w-4 h-4" />
              {t.filter}
            </label>
            <Select value={filterType} onValueChange={setFilterType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allTypes}</SelectItem>
                <SelectItem value="earned">{t.type.earned}</SelectItem>
                <SelectItem value="spent">{t.type.spent}</SelectItem>
                <SelectItem value="purchased">{t.type.purchased}</SelectItem>
                <SelectItem value="refund">{t.type.refund}</SelectItem>
                <SelectItem value="bonus">{t.type.bonus}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 block">&nbsp;</label>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allCategories}</SelectItem>
                <SelectItem value="chat">{t.category.chat}</SelectItem>
                <SelectItem value="video">{t.category.video}</SelectItem>
                <SelectItem value="application">{t.category.application}</SelectItem>
                <SelectItem value="contract">{t.category.contract}</SelectItem>
                <SelectItem value="purchase">{t.category.purchase}</SelectItem>
                <SelectItem value="other">{t.category.other}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div>
            <label className="text-sm text-gray-600 mb-2 flex items-center gap-2">
              <CalendarIcon className="w-4 h-4" />
              {t.dateRange}
            </label>
            <Select value={dateRange} onValueChange={setDateRange}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t.allTypes}</SelectItem>
                <SelectItem value="thisMonth">{t.thisMonth}</SelectItem>
                <SelectItem value="lastMonth">{t.lastMonth}</SelectItem>
                <SelectItem value="last3Months">{t.last3Months}</SelectItem>
                <SelectItem value="thisYear">{t.thisYear}</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {(searchQuery || filterType !== 'all' || filterCategory !== 'all' || dateRange !== 'all') && (
          <div className="mt-4 flex justify-end">
            <Button variant="outline" size="sm" onClick={handleResetFilters}>
              {t.reset}
            </Button>
          </div>
        )}
      </Card>

      {/* Transactions List */}
      <Card className="overflow-hidden">
        {filteredTransactions.length === 0 ? (
          <div className="p-12 text-center">
            <FileText className="w-12 h-12 mx-auto mb-4 text-gray-400" />
            <p className="text-gray-600">{t.noTransactions}</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 text-sm text-gray-600">{t.date}</th>
                  <th className="text-left p-4 text-sm text-gray-600">{t.type.earned}</th>
                  <th className="text-left p-4 text-sm text-gray-600">{t.description}</th>
                  <th className="text-right p-4 text-sm text-gray-600">{t.amount}</th>
                  <th className="text-right p-4 text-sm text-gray-600">{t.balance}</th>
                  <th className="text-right p-4 text-sm text-gray-600"></th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredTransactions.map((transaction) => (
                  <motion.tr
                    key={transaction.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="hover:bg-gray-50 transition-colors"
                  >
                    <td className="p-4 text-sm">
                      {transaction.date.toLocaleDateString('bn-BD', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                      })}
                    </td>
                    <td className="p-4">
                      {getTypeBadge(transaction.type)}
                    </td>
                    <td className="p-4">
                      <div className="flex items-start gap-2">
                        <div className="mt-0.5">
                          {getCategoryIcon(transaction.category)}
                        </div>
                        <div>
                          <p className="text-sm">{transaction.description}</p>
                          {transaction.relatedTo && (
                            <p className="text-xs text-gray-500 mt-1">
                              {t.relatedTo}: {transaction.relatedTo.name}
                            </p>
                          )}
                          {transaction.paymentMethod && (
                            <p className="text-xs text-gray-500 mt-1">
                              {t.paymentMethod}: {transaction.paymentMethod}
                            </p>
                          )}
                        </div>
                      </div>
                    </td>
                    <td className={`p-4 text-right text-sm font-semibold ${
                      transaction.type === 'spent' ? 'text-red-600' : 'text-green-600'
                    }`}>
                      {transaction.type === 'spent' ? '-' : '+'}
                      {transaction.amount.toLocaleString()}
                    </td>
                    <td className="p-4 text-right text-sm text-gray-600">
                      {transaction.balanceAfter.toLocaleString()}
                    </td>
                    <td className="p-4 text-right">
                      {transaction.invoiceId && (
                        <Button
                          size="sm"
                          variant="ghost"
                          onClick={() => onDownloadInvoice(transaction.id)}
                        >
                          <Download className="w-4 h-4" />
                        </Button>
                      )}
                    </td>
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Card>
    </div>
  );
}
