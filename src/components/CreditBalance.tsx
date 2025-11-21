import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Coins, Plus, TrendingUp, History, Gift, Sparkles, Check, Crown, Zap, Star } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { 
  getUserCredits, 
  getOrCreateUserCredits, 
  purchasePackage,
  formatCredits,
  getPackagesByUserType,
  type UserCreditData,
} from '../utils/localStorageCredit';
import { type CreditTransaction, type CreditPackage } from '../utils/creditSystem';

interface CreditBalanceProps {
  userId: string;
  userType: 'teacher' | 'guardian';
  language: 'bn' | 'en';
  showHistory?: boolean;
  compact?: boolean;
  setPage?: (page: string) => void;
}

const content = {
  bn: {
    credits: 'ক্রেডিট',
    balance: 'ব্যালেন্স',
    buyCredits: 'ক্রেডিট কিনুন',
    viewHistory: 'হিস্ট্রি দেখুন',
    creditHistory: 'ক্রেডিট হিস্ট্রি',
    earned: 'অর্জিত',
    spent: 'ব্যয়িত',
    purchased: 'ক্রয়কৃত',
    total: 'মোট',
    selectPackage: 'প্যাকেজ নির্বাচন করুন',
    confirmPurchase: 'ক্রয় নিশ্চিত করুন',
    cancel: 'বাতিল',
    proceedToPayment: 'পেমেন্টে যান',
    popular: 'জনপ্রিয়',
    bonus: 'বোনাস',
    packageDetails: 'প্যাকেজ বিস্তারিত',
    price: 'মূল্য',
    totalCredits: 'মোট ক্রেডিট',
    perCredit: 'প্রতি ক্রেডিট',
    noTransactions: 'এখনও কোনো লেনদেন নেই',
    recent: 'সাম্প্রতিক',
    close: 'বন্ধ করুন',
  },
  en: {
    credits: 'Credits',
    balance: 'Balance',
    buyCredits: 'Buy Credits',
    viewHistory: 'View History',
    creditHistory: 'Credit History',
    earned: 'Earned',
    spent: 'Spent',
    purchased: 'Purchased',
    total: 'Total',
    selectPackage: 'Select Package',
    confirmPurchase: 'Confirm Purchase',
    cancel: 'Cancel',
    proceedToPayment: 'Proceed to Payment',
    popular: 'Popular',
    bonus: 'Bonus',
    packageDetails: 'Package Details',
    price: 'Price',
    totalCredits: 'Total Credits',
    perCredit: 'Per Credit',
    noTransactions: 'No transactions yet',
    recent: 'Recent',
    close: 'Close',
  },
};

const iconMap: Record<string, any> = {
  Zap,
  Star,
  Crown,
  Gift,
};

export function CreditBalance({ 
  userId, 
  userType, 
  language, 
  showHistory = true, 
  compact = false,
  setPage 
}: CreditBalanceProps) {
  const [showBuyDialog, setShowBuyDialog] = useState(false);
  const [showHistoryDialog, setShowHistoryDialog] = useState(false);
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  const [showConfirmDialog, setShowConfirmDialog] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const t = content[language];

  // Get or create user credits with refresh mechanism
  const userCredits = getOrCreateUserCredits(userId, userType);
  const packages = getPackagesByUserType(userType);

  // Refresh credits when component mounts or userId changes
  useEffect(() => {
    setRefreshKey(prev => prev + 1);
  }, [userId]);

  const handleBuyCredits = () => {
    setShowBuyDialog(true);
  };

  const handleSelectPackage = (pkg: CreditPackage) => {
    setSelectedPackage(pkg);
    setShowBuyDialog(false);
    setShowConfirmDialog(true);
  };

  const handleConfirmPurchase = () => {
    if (!selectedPackage) return;

    try {
      const { totalCredits } = purchasePackage(userId, selectedPackage.id, language);
      
      // Refresh the component to show updated balance
      setRefreshKey(prev => prev + 1);
      
      toast.success(
        language === 'bn'
          ? `${selectedPackage.name} প্যাকেজ সফলভাবে ক্রয় হয়েছে! ${totalCredits} ক্রেডিট যোগ হয়েছে।`
          : `${selectedPackage.nameEn} package purchased! ${totalCredits} credits added.`,
        { duration: 5000 }
      );

      setShowConfirmDialog(false);
      setSelectedPackage(null);
      
      // Emit storage event for other components
      window.dispatchEvent(new Event('creditsUpdated'));
    } catch (error) {
      toast.error(
        language === 'bn' 
          ? 'প্যাকেজ ক্রয়ে সমস্যা হয়েছে। আবার চেষ্টা করুন।'
          : 'Failed to purchase package. Please try again.'
      );
    }
  };

  const getTransactionTypeLabel = (type: CreditTransaction['type']) => {
    if (language === 'bn') {
      const labels = {
        earned: 'অর্জিত',
        spent: 'ব্যয়িত',
        purchased: 'ক্রয়কৃত',
        bonus: 'বোনাস',
        admin_added: 'অ্যাডমিন যোগ',
        admin_deducted: 'অ্যাডমিন বাদ',
      };
      return labels[type] || type;
    } else {
      const labels = {
        earned: 'Earned',
        spent: 'Spent',
        purchased: 'Purchased',
        bonus: 'Bonus',
        admin_added: 'Admin Added',
        admin_deducted: 'Admin Deducted',
      };
      return labels[type] || type;
    }
  };

  const getTransactionColor = (type: CreditTransaction['type']) => {
    const colors = {
      earned: 'text-green-600 bg-green-50',
      spent: 'text-red-600 bg-red-50',
      purchased: 'text-blue-600 bg-blue-50',
      bonus: 'text-purple-600 bg-purple-50',
      admin_added: 'text-emerald-600 bg-emerald-50',
      admin_deducted: 'text-orange-600 bg-orange-50',
    };
    return colors[type] || 'text-gray-600 bg-gray-50';
  };

  if (compact) {
    return (
      <>
        <Card className="p-4 bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center">
                <Coins className="w-6 h-6 text-white" />
              </div>
              <div>
                <p className="text-sm text-white/80">{t.credits}</p>
                <p className="text-2xl font-bold">{userCredits.currentBalance}</p>
              </div>
            </div>
            <Button 
              size="sm" 
              onClick={handleBuyCredits}
              className="bg-white text-emerald-600 hover:bg-gray-100"
            >
              <Plus className="w-4 h-4 mr-1" />
              {t.buyCredits}
            </Button>
          </div>
        </Card>

        {/* Dialogs */}
        {renderBuyDialog()}
        {renderConfirmDialog()}
      </>
    );
  }

  function renderBuyDialog() {
    return (
      <Dialog open={showBuyDialog} onOpenChange={setShowBuyDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center gap-2">
              <Coins className="w-6 h-6 text-emerald-600" />
              {t.selectPackage}
            </DialogTitle>
            <DialogDescription>
              {language === 'bn' 
                ? 'আপনার প্রয়োজন অনুযায়ী সঠিক প্যাকেজ বেছে নিন'
                : 'Choose the right package for your needs'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-4">
            {packages.map((pkg, index) => {
              const Icon = iconMap[pkg.icon] || Zap;
              const totalCredits = pkg.credits + (pkg.bonus || 0);

              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`
                    p-6 relative cursor-pointer transition-all
                    ${pkg.popular 
                      ? 'border-2 border-emerald-500 shadow-lg' 
                      : 'border border-gray-200 hover:border-emerald-300'
                    }
                  `}
                  onClick={() => handleSelectPackage(pkg)}
                  >
                    {pkg.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {t.popular}
                        </Badge>
                      </div>
                    )}

                    <div className={`w-12 h-12 bg-gradient-to-br ${pkg.color} rounded-xl flex items-center justify-center mb-4`}>
                      <Icon className="w-6 h-6 text-white" />
                    </div>

                    <h3 className="text-xl font-bold mb-2">
                      {language === 'bn' ? pkg.name : pkg.nameEn}
                    </h3>

                    <div className="text-3xl font-bold text-emerald-600 mb-1">
                      ৳{pkg.price.toLocaleString()}
                    </div>
                    <p className="text-sm text-gray-600 mb-4">{pkg.perCredit}</p>

                    <div className="space-y-2 mb-4">
                      <div className="flex items-center justify-between">
                        <span className="text-sm text-gray-600">{t.credits}:</span>
                        <Badge variant="outline">{pkg.credits}</Badge>
                      </div>
                      {pkg.bonus && (
                        <div className="flex items-center justify-between">
                          <span className="text-sm text-gray-600">{t.bonus}:</span>
                          <Badge className="bg-purple-100 text-purple-700">+{pkg.bonus}</Badge>
                        </div>
                      )}
                      <div className="flex items-center justify-between pt-2 border-t">
                        <span className="text-sm font-semibold">{t.total}:</span>
                        <Badge className="bg-emerald-100 text-emerald-700">{totalCredits}</Badge>
                      </div>
                    </div>

                    <ul className="space-y-2 text-sm">
                      {(language === 'bn' ? pkg.features : pkg.featuresEn).slice(0, 4).map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-600 flex-shrink-0 mt-0.5" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    <Button 
                      className={`w-full mt-4 ${pkg.popular ? 'bg-gradient-to-r from-emerald-500 to-teal-500' : ''}`}
                      variant={pkg.popular ? 'default' : 'outline'}
                    >
                      {t.selectPackage}
                    </Button>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBuyDialog(false)}>
              {t.close}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  function renderConfirmDialog() {
    if (!selectedPackage) return null;

    const Icon = iconMap[selectedPackage.icon] || Zap;
    const totalCredits = selectedPackage.credits + (selectedPackage.bonus || 0);

    return (
      <Dialog open={showConfirmDialog} onOpenChange={setShowConfirmDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.confirmPurchase}</DialogTitle>
            <DialogDescription>
              {language === 'bn'
                ? 'আপনার প্যাকেজ নিশ্চিত করুন এবং পেমেন্টে এগিয়ে যান'
                : 'Confirm your package and proceed to payment'
              }
            </DialogDescription>
          </DialogHeader>

          <div className="py-4">
            <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200">
              <div className="flex items-center gap-4 mb-4">
                <div className={`w-14 h-14 bg-gradient-to-br ${selectedPackage.color} rounded-xl flex items-center justify-center`}>
                  <Icon className="w-7 h-7 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold">
                    {language === 'bn' ? selectedPackage.name : selectedPackage.nameEn}
                  </h3>
                  <p className="text-emerald-600">{totalCredits} {t.credits}</p>
                </div>
              </div>

              <div className="space-y-2 pt-4 border-t border-emerald-200">
                <div className="flex justify-between">
                  <span className="text-gray-600">{t.price}:</span>
                  <span className="text-2xl font-bold">৳{selectedPackage.price.toLocaleString()}</span>
                </div>
                {selectedPackage.bonus && (
                  <div className="flex justify-between text-purple-600">
                    <span>{t.bonus}:</span>
                    <span className="font-semibold">+{selectedPackage.bonus} {t.credits}</span>
                  </div>
                )}
              </div>
            </Card>
          </div>

          <DialogFooter className="flex-col sm:flex-row gap-2">
            <Button variant="outline" onClick={() => setShowConfirmDialog(false)} className="w-full sm:w-auto">
              {t.cancel}
            </Button>
            <Button onClick={handleConfirmPurchase} className="w-full sm:w-auto bg-gradient-to-r from-emerald-600 to-teal-600">
              {t.proceedToPayment}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  function renderHistoryDialog() {
    return (
      <Dialog open={showHistoryDialog} onOpenChange={setShowHistoryDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <History className="w-5 h-5 text-emerald-600" />
              {t.creditHistory}
            </DialogTitle>
          </DialogHeader>

          <div className="space-y-3 py-4">
            {userCredits.transactions.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <History className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                <p>{t.noTransactions}</p>
              </div>
            ) : (
              userCredits.transactions.map((txn) => (
                <Card key={txn.id} className="p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <Badge className={getTransactionColor(txn.type)}>
                          {getTransactionTypeLabel(txn.type)}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(txn.timestamp).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">
                        {language === 'bn' ? txn.description : txn.descriptionEn}
                      </p>
                      {txn.adminNote && (
                        <p className="text-xs text-gray-500 mt-1">Note: {txn.adminNote}</p>
                      )}
                    </div>
                    <div className="text-right ml-4">
                      <div className={`text-lg font-bold ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                        {txn.amount > 0 ? '+' : ''}{txn.amount}
                      </div>
                      <div className="text-xs text-gray-500">
                        {t.balance}: {txn.balance}
                      </div>
                    </div>
                  </div>
                </Card>
              ))
            )}
          </div>

          <DialogFooter>
            <Button onClick={() => setShowHistoryDialog(false)}>
              {t.close}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <>
      <Card className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <div className="w-14 h-14 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
              <Coins className="w-7 h-7 text-white" />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t.balance}</p>
              <p className="text-3xl font-bold text-gray-900">{userCredits.currentBalance}</p>
              <p className="text-sm text-emerald-600">{t.credits}</p>
            </div>
          </div>

          <Button 
            onClick={handleBuyCredits}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:opacity-90"
          >
            <Plus className="w-4 h-4 mr-2" />
            {t.buyCredits}
          </Button>
        </div>

        <div className="grid grid-cols-3 gap-4 pt-6 border-t">
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-green-600 mb-1">
              <TrendingUp className="w-4 h-4" />
              <span className="text-sm">{t.earned}</span>
            </div>
            <p className="text-xl font-bold">{userCredits.totalEarned}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-red-600 mb-1">
              <TrendingUp className="w-4 h-4 rotate-180" />
              <span className="text-sm">{t.spent}</span>
            </div>
            <p className="text-xl font-bold">{userCredits.totalSpent}</p>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center gap-1 text-blue-600 mb-1">
              <Gift className="w-4 h-4" />
              <span className="text-sm">{t.purchased}</span>
            </div>
            <p className="text-xl font-bold">{userCredits.totalPurchased}</p>
          </div>
        </div>

        {showHistory && userCredits.transactions.length > 0 && (
          <div className="mt-6 pt-6 border-t">
            <div className="flex items-center justify-between mb-4">
              <h4 className="font-semibold text-gray-700">{t.recent} {t.creditHistory}</h4>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={() => setShowHistoryDialog(true)}
                className="text-emerald-600 hover:text-emerald-700"
              >
                <History className="w-4 h-4 mr-1" />
                {t.viewHistory}
              </Button>
            </div>

            <div className="space-y-2">
              {userCredits.transactions.slice(0, 3).map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <p className="text-sm text-gray-700 mb-1">
                      {language === 'bn' ? txn.description : txn.descriptionEn}
                    </p>
                    <p className="text-xs text-gray-500">
                      {new Date(txn.timestamp).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                    </p>
                  </div>
                  <div className={`text-lg font-bold ${txn.amount > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    {txn.amount > 0 ? '+' : ''}{txn.amount}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </Card>

      {/* Dialogs */}
      {renderBuyDialog()}
      {renderConfirmDialog()}
      {renderHistoryDialog()}
    </>
  );
}
