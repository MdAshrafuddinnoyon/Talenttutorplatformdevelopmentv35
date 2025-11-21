import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  Check, 
  Crown, 
  Zap, 
  Star, 
  Sparkles, 
  ArrowRight,
  TrendingUp,
  Shield,
  Rocket,
  Gift,
  Loader2,
  AlertCircle,
  CreditCard,
  Smartphone,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';
import { FAQSection } from '../components/FAQSection';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import { getAllPackages, purchasePackage } from '../utils/localStorageCredit';

interface SubscriptionPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  userType?: 'teacher' | 'guardian' | null;
  onLogin?: (userType: 'teacher' | 'guardian', userId: string) => void;
}

interface CreditPackage {
  id: string;
  name: string;
  credits: number;
  bonusCredits: number;
  price: number;
  userType: 'teacher' | 'guardian';
  popular: boolean;
  features: string[];
  color: string;
  icon: string;
}

const content = {
  bn: {
    title: 'ক্রেডিট প্যাকেজ',
    subtitle: 'আপনার প্রয়োজন অনুযায়ী সঠিক প্যাকেজ বেছে নিন',
    forTeachers: 'শিক্ষকদের জন্য',
    forGuardians: 'অভিভাবকদের জন্য',
    selectPlan: 'প্যাকেজ নির্বাচন করুন',
    popular: 'জনপ্রিয়',
    bestValue: 'সেরা মূল্য',
    credits: 'ক্রেডিট',
    bonus: 'বোনাস',
    total: 'মোট',
    perCredit: 'প্রতি ক্রেডিট',
    purchaseNow: 'এখনই কিনুন',
    loginRequired: 'কিনতে লগইন করুন',
    processing: 'প্রসেস হচ্ছে...',
    features: 'সুবিধাসমূহ',
    paymentMethods: 'পেমেন্ট পদ্ধতি',
    securePayment: 'নিরাপদ পেমেন্ট',
    instantActivation: 'তাৎক্ষণিক সক্রিয়',
    refundPolicy: 'রিফান্ড পলিসি',
    support247: '২৪/৭ সাপোর্ট',
    
    confirmPurchase: 'ক্রয় নিশ্চিত করুন',
    packageDetails: 'প্যাকেজ বিবরণ',
    paymentMethod: 'পেমেন্ট পদ্ধতি',
    selectPaymentMethod: 'পেমেন্ট পদ্ধতি নির্বাচন করুন',
    mobileBanking: 'মোবাইল ব্যাংকিং',
    cardPayment: 'কার্ড পেমেন্ট',
    proceedToPayment: 'পেমেন্টে যান',
    cancel: 'বাতিল',
    
    purchaseSuccess: 'ক্রেডিট সফলভাবে কিনেছেন!',
    purchaseError: 'ক্রয়ে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
    
    whyCredits: 'ক্রেডিট কেন প্রয়োজন?',
    creditsInfo: 'ক্রেডিট ব্যবহার করে আপনি টিউশনে আবেদন করতে বা টিউশন পোস্ট করতে পারবেন। প্রতিটি কার্যক্রমে নির্দিষ্ট সংখ্যক ক্রেডিট ব্যবহৃত হয়।',
    
    loadingPackages: 'প্যাকেজ লোড হচ্ছে...',
    noPackagesAvailable: 'কোনো প্যাকেজ পাওয়া যায়নি',
    initializingPackages: 'প্যাকেজ তৈরি হচ্ছে...',
    
    faqTitle: 'প্রায়শই জিজ্ঞাসিত প্রশ্ন (FAQ)',
    faqSubtitle: 'ক্রেডিট প্যাকেজ সম্পর্কে সাধারণ প্রশ্নের উত্তর পান',
  },
  en: {
    title: 'Credit Packages',
    subtitle: 'Choose the right package for your needs',
    forTeachers: 'For Teachers',
    forGuardians: 'For Guardians',
    selectPlan: 'Select Package',
    popular: 'Popular',
    bestValue: 'Best Value',
    credits: 'Credits',
    bonus: 'Bonus',
    total: 'Total',
    perCredit: 'per credit',
    purchaseNow: 'Purchase Now',
    loginRequired: 'Login to Purchase',
    processing: 'Processing...',
    features: 'Features',
    paymentMethods: 'Payment Methods',
    securePayment: 'Secure Payment',
    instantActivation: 'Instant Activation',
    refundPolicy: 'Refund Policy',
    support247: '24/7 Support',
    
    confirmPurchase: 'Confirm Purchase',
    packageDetails: 'Package Details',
    paymentMethod: 'Payment Method',
    selectPaymentMethod: 'Select Payment Method',
    mobileBanking: 'Mobile Banking',
    cardPayment: 'Card Payment',
    proceedToPayment: 'Proceed to Payment',
    cancel: 'Cancel',
    
    purchaseSuccess: 'Credits purchased successfully!',
    purchaseError: 'Purchase failed. Please try again.',
    
    whyCredits: 'Why Credits?',
    creditsInfo: 'Use credits to apply to tuitions or post tuitions. Each action uses a specific number of credits.',
    
    loadingPackages: 'Loading packages...',
    noPackagesAvailable: 'No packages available',
    initializingPackages: 'Initializing packages...',
    
    faqTitle: 'Frequently Asked Questions',
    faqSubtitle: 'Find answers to common questions about credit packages',
  },
};

export function SubscriptionPage({ 
  language, 
  setLanguage, 
  setPage, 
  announcement, 
  userType,
  onLogin 
}: SubscriptionPageProps) {
  const t = content[language];
  
  const [packages, setPackages] = useState<CreditPackage[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPackage, setSelectedPackage] = useState<CreditPackage | null>(null);
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [purchasing, setPurchasing] = useState(false);
  const [activeTab, setActiveTab] = useState<'teacher' | 'guardian'>('teacher');
  
  // Fetch packages from localStorage
  useEffect(() => {
    fetchPackages();
  }, []);
  
  const fetchPackages = () => {
    setLoading(true);
    try {
      // Load packages from localStorage
      const allPackages = getAllPackages();
      setPackages(allPackages);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast.error(language === 'bn' ? 'প্যাকেজ লোড করতে ব্যর্থ' : 'Failed to load packages');
    } finally {
      setLoading(false);
    }
  };
  
  const handlePurchase = (pkg: CreditPackage) => {
    if (!userType) {
      setShowAuthDialog(true);
      return;
    }
    
    setSelectedPackage(pkg);
    setShowPaymentDialog(true);
  };
  
  const confirmPurchase = async () => {
    if (!selectedPackage || !userType) return;
    
    setPurchasing(true);
    
    try {
      // Simulate payment processing
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Get current user from localStorage
      const currentUserStr = localStorage.getItem('currentUser');
      if (!currentUserStr) {
        throw new Error('User not authenticated');
      }
      
      const currentUser = JSON.parse(currentUserStr);
      
      // Purchase package using localStorage
      const { totalCredits } = purchasePackage(currentUser.id, selectedPackage.id, language);
      
      // Update user credits in localStorage
      const newCredits = (currentUser.credits || 0) + totalCredits;
      currentUser.credits = newCredits;
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
      
      toast.success(
        language === 'bn'
          ? `${totalCredits} ক্রেডিট সফলভাবে যোগ হয়েছে!`
          : `${totalCredits} credits added successfully!`
      );
      
      setShowPaymentDialog(false);
      setSelectedPackage(null);
      
      // Emit event for other components to refresh
      window.dispatchEvent(new Event('creditsUpdated'));
      
      // Navigate to dashboard
      setTimeout(() => {
        if (setPage) {
          setPage(`${userType}-dashboard`);
        }
      }, 1000);
    } catch (error) {
      console.error('Purchase error:', error);
      toast.error(t.purchaseError);
    } finally {
      setPurchasing(false);
    }
  };
  
  const getPackageIcon = (iconName: string) => {
    switch (iconName) {
      case 'zap': return Zap;
      case 'crown': return Crown;
      case 'rocket': return Rocket;
      case 'star': return Star;
      default: return Sparkles;
    }
  };
  
  const filteredPackages = packages.filter(pkg => pkg.userType === activeTab);
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-green-50">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        setPage={setPage} 
        announcement={announcement} 
      />
      
      <div className="container mx-auto px-4 py-12">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Badge className="mb-4 bg-gradient-to-r from-[#10B981] to-[#059669] text-white px-6 py-2">
            <Sparkles className="w-4 h-4 mr-2" />
            {t.selectPlan}
          </Badge>
          
          <h1>
            {t.title}
          </h1>
          
          <p className="text-gray-600 max-w-2xl mx-auto mt-4">
            {t.subtitle}
          </p>
        </motion.div>
        
        {/* User Type Tabs */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex bg-white rounded-full p-1 shadow-lg">
            <Button
              variant={activeTab === 'teacher' ? 'default' : 'ghost'}
              className={`rounded-full px-8 py-6 transition-all ${
                activeTab === 'teacher' 
                  ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('teacher')}
            >
              {t.forTeachers}
            </Button>
            <Button
              variant={activeTab === 'guardian' ? 'default' : 'ghost'}
              className={`rounded-full px-8 py-6 transition-all ${
                activeTab === 'guardian' 
                  ? 'bg-gradient-to-r from-[#10B981] to-[#059669] text-white shadow-lg' 
                  : 'text-gray-600 hover:text-gray-900'
              }`}
              onClick={() => setActiveTab('guardian')}
            >
              {t.forGuardians}
            </Button>
          </div>
        </div>
        
        {/* Loading State */}
        {loading && (
          <div className="text-center py-20">
            <Loader2 className="w-12 h-12 animate-spin text-[#10B981] mx-auto mb-4" />
            <p className="text-gray-600">{t.loadingPackages}</p>
          </div>
        )}
        
        {/* Packages Grid */}
        {!loading && filteredPackages.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto mb-16">
            {filteredPackages.map((pkg, index) => {
              const Icon = getPackageIcon(pkg.icon);
              
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`relative overflow-hidden ${
                    pkg.popular ? 'border-2 border-[#10B981] shadow-2xl scale-105' : 'border border-gray-200 shadow-lg'
                  } hover:shadow-2xl transition-all duration-300`}>
                    {/* Popular Badge */}
                    {pkg.popular && (
                      <div className="absolute top-0 right-0 bg-gradient-to-r from-amber-500 to-yellow-500 text-white px-6 py-2 font-semibold rounded-bl-2xl">
                        <Star className="w-4 h-4 inline mr-1" />
                        {t.popular}
                      </div>
                    )}
                    
                    <div className="p-8">
                      {/* Icon & Name */}
                      <div className="w-16 h-16 bg-gradient-to-br from-[#10B981] to-[#059669] rounded-2xl flex items-center justify-center mb-4 shadow-lg">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      
                      <h3>
                        {pkg.name}
                      </h3>
                      
                      {/* Credits */}
                      <div className="mb-6">
                        <div className="flex items-baseline gap-2 mb-2">
                          <span className="text-5xl font-bold text-gray-900">
                            {pkg.credits}
                          </span>
                          <span className="text-xl text-gray-600">
                            {t.credits}
                          </span>
                        </div>
                        
                        {pkg.bonusCredits > 0 && (
                          <div className="flex items-center gap-2 mb-2">
                            <Gift className="w-5 h-5 text-[#10B981]" />
                            <span className="text-[#10B981] font-semibold">
                              +{pkg.bonusCredits} {t.bonus}
                            </span>
                          </div>
                        )}
                        
                        <div className="text-sm text-gray-500">
                          {t.total}: {pkg.credits + pkg.bonusCredits} {t.credits}
                        </div>
                      </div>
                      
                      {/* Price */}
                      <div className="mb-6 pb-6 border-b">
                        <div className="flex items-baseline gap-2">
                          <span className="text-4xl font-bold text-gray-900">
                            ৳{pkg.price}
                          </span>
                          <span className="text-gray-500">
                            (৳{(pkg.price / (pkg.credits + pkg.bonusCredits)).toFixed(1)} {t.perCredit})
                          </span>
                        </div>
                      </div>
                      
                      {/* Features */}
                      <div className="space-y-3 mb-8">
                        {pkg.features.map((feature, idx) => (
                          <div key={idx} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-[#10B981] mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </div>
                        ))}
                      </div>
                      
                      {/* Purchase Button */}
                      <Button
                        className={`w-full py-6 font-semibold btn-primary shadow-lg`}
                        onClick={() => handlePurchase(pkg)}
                      >
                        {userType ? t.purchaseNow : t.loginRequired}
                        <ArrowRight className="w-5 h-5 ml-2" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        )}
        
        {/* No Packages */}
        {!loading && filteredPackages.length === 0 && (
          <div className="text-center py-20">
            <AlertCircle className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600">{t.noPackagesAvailable}</p>
          </div>
        )}
        
        {/* Trust Indicators */}
        <div className="grid md:grid-cols-4 gap-6 max-w-5xl mx-auto mb-16">
          <Card className="p-6 text-center bg-white/50 backdrop-blur-sm border-none shadow-lg">
            <Shield className="w-8 h-8 text-[#10B981] mx-auto mb-3" />
            <h4>{t.securePayment}</h4>
            <p className="text-sm text-gray-600">SSL Encrypted</p>
          </Card>
          
          <Card className="p-6 text-center bg-white/50 backdrop-blur-sm border-none shadow-lg">
            <Zap className="w-8 h-8 text-[#10B981] mx-auto mb-3" />
            <h4>{t.instantActivation}</h4>
            <p className="text-sm text-gray-600">Immediate access</p>
          </Card>
          
          <Card className="p-6 text-center bg-white/50 backdrop-blur-sm border-none shadow-lg">
            <TrendingUp className="w-8 h-8 text-[#10B981] mx-auto mb-3" />
            <h4>No Expiry</h4>
            <p className="text-sm text-gray-600">Use anytime</p>
          </Card>
          
          <Card className="p-6 text-center bg-white/50 backdrop-blur-sm border-none shadow-lg">
            <Sparkles className="w-8 h-8 text-[#10B981] mx-auto mb-3" />
            <h4>{t.support247}</h4>
            <p className="text-sm text-gray-600">Always here to help</p>
          </Card>
        </div>
        
        {/* Info Section */}
        <Card className="max-w-4xl mx-auto p-8 bg-gradient-to-br from-green-50 to-emerald-50 border-none shadow-xl mb-16">
          <div className="flex items-start gap-4">
            <div className="p-3 bg-white rounded-full">
              <AlertCircle className="w-6 h-6 text-[#10B981]" />
            </div>
            <div>
              <h3>{t.whyCredits}</h3>
              <p className="text-gray-700">{t.creditsInfo}</p>
            </div>
          </div>
        </Card>
        
        {/* FAQ Section */}
        <div className="max-w-4xl mx-auto">
          <FAQSection language={language} />
        </div>
      </div>
      
      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle><h2>{t.confirmPurchase}</h2></DialogTitle>
            <DialogDescription>{t.packageDetails}</DialogDescription>
          </DialogHeader>
          
          {selectedPackage && (
            <div className="space-y-6">
              <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-none">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-gray-700">{selectedPackage.name}</span>
                  <span className="font-bold text-gray-900">{selectedPackage.credits} {t.credits}</span>
                </div>
                
                {selectedPackage.bonusCredits > 0 && (
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-[#10B981]">{t.bonus}</span>
                    <span className="font-semibold text-[#10B981]">+{selectedPackage.bonusCredits}</span>
                  </div>
                )}
                
                <div className="border-t pt-2 mt-2">
                  <div className="flex justify-between items-center">
                    <span className="font-semibold">{t.total}</span>
                    <span className="text-2xl font-bold text-gray-900">
                      ৳{selectedPackage.price}
                    </span>
                  </div>
                </div>
              </Card>
              
              {/* Payment Method Selection */}
              <div>
                <label className="block font-medium text-gray-700 mb-3">
                  {t.selectPaymentMethod}
                </label>
                <div className="space-y-2">
                  <Card className="p-4 border-2 border-[#10B981] bg-green-50 cursor-pointer hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <Smartphone className="w-5 h-5 text-[#10B981]" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{t.mobileBanking}</div>
                        <div className="text-sm text-gray-600">bKash, Nagad, Rocket</div>
                      </div>
                    </div>
                  </Card>
                  
                  <Card className="p-4 border border-gray-200 cursor-pointer hover:shadow-md transition-all">
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-[#10B981]" />
                      <div className="flex-1">
                        <div className="font-semibold text-gray-900">{t.cardPayment}</div>
                        <div className="text-sm text-gray-600">Visa, Mastercard</div>
                      </div>
                    </div>
                  </Card>
                </div>
              </div>
              
              <div className="flex gap-3 pt-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={() => setShowPaymentDialog(false)}
                  disabled={purchasing}
                >
                  {t.cancel}
                </Button>
                <Button
                  className="flex-1 btn-primary"
                  onClick={confirmPurchase}
                  disabled={purchasing}
                >
                  {purchasing ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      {t.processing}
                    </>
                  ) : (
                    <>
                      {t.proceedToPayment}
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </>
                  )}
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
      
      {/* Auth Dialog */}
      <UnifiedAuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        language={language}
        onLogin={(userType, userData) => {
          setShowAuthDialog(false);
          if (onLogin) {
            onLogin(userType as 'teacher' | 'guardian', userData.id);
          }
        }}
        initialMode="login"
      />
      
      <Footer language={language} setPage={setPage} />
    </div>
  );
}
