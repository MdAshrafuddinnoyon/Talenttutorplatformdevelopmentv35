import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { GradientButton } from '../components/ui/gradient-button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from '../components/ui/dialog';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { RadioGroup, RadioGroupItem } from '../components/ui/radio-group';
import { Alert, AlertDescription } from '../components/ui/alert';
import { 
  ArrowLeft, 
  CreditCard, 
  Wallet, 
  Zap, 
  Star, 
  TrendingUp, 
  Shield, 
  CheckCircle, 
  Crown,
  Sparkles,
  Gift,
  Clock,
  DollarSign,
  Check,
  Info,
  Award,
  Target,
  Coins
} from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { toast } from 'sonner@2.0.3';

interface CreditPurchasePageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  userType?: 'teacher' | 'guardian';
  currentCredits?: number;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'ক্রেডিট ক্রয়',
    subtitle: 'আপনার প্রয়োজন অনুযায়ী ক্রেডিট প্যাকেজ বেছে নিন',
    backToHome: 'হোমে ফিরুন',
    backToDashboard: 'ড্যাশবোর্ডে ফিরুন',
    currentCredits: 'বর্তমান ক্রেডিট',
    credits: 'ক্রেডিট',
    choosePlan: 'প্যাকেজ নির্বাচন করুন',
    paymentMethod: 'পেমেন্ট পদ্ধতি',
    proceedPayment: 'পেমেন্ট করুন',
    mostPopular: 'সবচেয়ে জনপ্রিয়',
    bestValue: 'সর্বোত্তম মূল্য',
    recommended: 'প্রস্তাবিত',
    save: 'সাশ্রয়',
    features: 'সুবিধা',
    selectPlan: 'প্যাকেজ নির্বাচন করুন',
    selected: 'নির্বাচিত',
    buyNow: 'এখনই কিনুন',
    
    // Packages
    starter: 'স্টার্টার প্যাকেজ',
    basic: 'বেসিক প্যাকেজ',
    professional: 'প্রফেশনাল প্যাকেজ',
    premium: 'প্রিমিয়াম প্যাকেজ',
    enterprise: 'এন্টারপ্রাইজ প্যাকেজ',
    
    // Features
    applyJobs: 'টিউশনে আবেদন করুন',
    chatTeachers: 'শিক্ষকদের সাথে চ্যাট করুন',
    videoMeetings: 'ভিডিও মিটিং করুন',
    prioritySupport: 'অগ্রাধিকার সাপোর্ট',
    featuredProfile: 'ফিচারড প্রোফাইল',
    analytics: 'এনালিটিক্স ড্যাশবোর্ড',
    validityDays: 'দিন মেয়াদ',
    unlimited: 'সীমাহীন ব্যবহার',
    
    // Payment methods
    bkash: 'বিকাশ',
    nagad: 'নগদ',
    rocket: 'রকেট',
    card: 'ক্রেডিট/ডেবিট কার্ড',
    banking: 'নেট ব্যাংকিং',
    
    // Additional
    whyBuyCredits: 'কেন ক্রেডিট কিনবেন?',
    instantActivation: 'তাৎক্ষণিক সক্রিয়করণ',
    securePayment: 'নিরাপদ পেমেন্ট',
    refundPolicy: 'রিফান্ড পলিসি',
    support24x7: '২৪/৭ সাপোর্ট',
    
    // Form
    fullName: 'পূর্ণ নাম',
    email: 'ইমেইল',
    phone: 'ফোন নম্বর',
    transactionId: 'ট্রানজেকশন আইডি',
    paymentNumber: 'পেমেন্ট নম্বর',
    
    // Success
    purchaseSuccess: 'ক্রেডিট সফলভাবে ক্রয় হয়েছে!',
    purchaseSuccessDesc: 'আপনার একাউন্টে ক্রেডিট যোগ করা হয়েছে।',
    goToDashboard: 'ড্যাশবোর্ডে যান',
    cancel: 'বাতিল',
    confirmPurchase: 'ক্রয় নিশ্চিত করুন',
    packageDetails: 'প্যাকেজ বিস্তারিত',
    total: 'মোট',
    discount: 'ছাড়',
    youSave: 'আপনি সাশ্রয় করছেন',
    perCredit: '/ক্রেডিট',
    validity: 'মেয়াদ',
    days: 'দিন',
    choosePaymentMethod: 'পেমেন্ট পদ্ধতি নির্বাচন করুন',
  },
  en: {
    title: 'Purchase Credits',
    subtitle: 'Choose the credit package that fits your needs',
    backToHome: 'Back to Home',
    backToDashboard: 'Back to Dashboard',
    currentCredits: 'Current Credits',
    credits: 'Credits',
    choosePlan: 'Choose Plan',
    paymentMethod: 'Payment Method',
    proceedPayment: 'Proceed to Payment',
    mostPopular: 'Most Popular',
    bestValue: 'Best Value',
    recommended: 'Recommended',
    save: 'Save',
    features: 'Features',
    selectPlan: 'Select Plan',
    selected: 'Selected',
    buyNow: 'Buy Now',
    
    // Packages
    starter: 'Starter Package',
    basic: 'Basic Package',
    professional: 'Professional Package',
    premium: 'Premium Package',
    enterprise: 'Enterprise Package',
    
    // Features
    applyJobs: 'Apply to tuitions',
    chatTeachers: 'Chat with teachers',
    videoMeetings: 'Video meetings',
    prioritySupport: 'Priority support',
    featuredProfile: 'Featured profile',
    analytics: 'Analytics dashboard',
    validityDays: 'days validity',
    unlimited: 'Unlimited usage',
    
    // Payment methods
    bkash: 'bKash',
    nagad: 'Nagad',
    rocket: 'Rocket',
    card: 'Credit/Debit Card',
    banking: 'Net Banking',
    
    // Additional
    whyBuyCredits: 'Why Buy Credits?',
    instantActivation: 'Instant Activation',
    securePayment: 'Secure Payment',
    refundPolicy: 'Refund Policy',
    support24x7: '24/7 Support',
    
    // Form
    fullName: 'Full Name',
    email: 'Email',
    phone: 'Phone Number',
    transactionId: 'Transaction ID',
    paymentNumber: 'Payment Number',
    
    // Success
    purchaseSuccess: 'Credits Purchased Successfully!',
    purchaseSuccessDesc: 'Credits have been added to your account.',
    goToDashboard: 'Go to Dashboard',
    cancel: 'Cancel',
    confirmPurchase: 'Confirm Purchase',
    packageDetails: 'Package Details',
    total: 'Total',
    discount: 'Discount',
    youSave: 'You Save',
    perCredit: '/credit',
    validity: 'Validity',
    days: 'days',
    choosePaymentMethod: 'Choose Payment Method',
  },
};

const creditPackages = [
  {
    id: 'starter',
    nameKey: 'starter',
    credits: 50,
    price: 500,
    originalPrice: 600,
    discount: 17,
    icon: Zap,
    color: 'from-blue-500 to-cyan-500',
    features: ['applyJobs', 'chatTeachers'],
    validity: 30,
    popular: false,
    bestValue: false,
  },
  {
    id: 'basic',
    nameKey: 'basic',
    credits: 100,
    price: 900,
    originalPrice: 1200,
    discount: 25,
    icon: Star,
    color: 'from-emerald-500 to-teal-500',
    features: ['applyJobs', 'chatTeachers', 'videoMeetings'],
    validity: 60,
    popular: true,
    bestValue: false,
  },
  {
    id: 'professional',
    nameKey: 'professional',
    credits: 200,
    price: 1600,
    originalPrice: 2400,
    discount: 33,
    icon: TrendingUp,
    color: 'from-orange-500 to-red-500',
    features: ['applyJobs', 'chatTeachers', 'videoMeetings', 'prioritySupport'],
    validity: 90,
    popular: false,
    bestValue: false,
  },
  {
    id: 'premium',
    nameKey: 'premium',
    credits: 500,
    price: 3500,
    originalPrice: 6000,
    discount: 42,
    icon: Crown,
    color: 'from-amber-500 to-yellow-500',
    features: ['applyJobs', 'chatTeachers', 'videoMeetings', 'prioritySupport', 'featuredProfile', 'analytics'],
    validity: 180,
    popular: false,
    bestValue: true,
  },
  {
    id: 'enterprise',
    nameKey: 'enterprise',
    credits: 1000,
    price: 6000,
    originalPrice: 12000,
    discount: 50,
    icon: Sparkles,
    color: 'from-emerald-500 to-teal-500',
    features: ['unlimited', 'prioritySupport', 'featuredProfile', 'analytics'],
    validity: 365,
    popular: false,
    bestValue: false,
  },
];

const paymentMethods = [
  { id: 'bkash', nameKey: 'bkash', icon: Wallet, color: 'text-rose-600', bgColor: 'bg-rose-50' },
  { id: 'nagad', nameKey: 'nagad', icon: Wallet, color: 'text-amber-600', bgColor: 'bg-amber-50' },
  { id: 'rocket', nameKey: 'rocket', icon: Wallet, color: 'text-teal-600', bgColor: 'bg-teal-50' },
  { id: 'card', nameKey: 'card', icon: CreditCard, color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { id: 'banking', nameKey: 'banking', icon: Shield, color: 'text-[#10B981]', bgColor: 'bg-green-50' },
];

const benefits = [
  { icon: Clock, titleKey: 'instantActivation', color: 'text-blue-600', bgColor: 'bg-blue-50' },
  { icon: Shield, titleKey: 'securePayment', color: 'text-[#10B981]', bgColor: 'bg-green-50' },
  { icon: Gift, titleKey: 'refundPolicy', color: 'text-teal-600', bgColor: 'bg-teal-50' },
  { icon: CheckCircle, titleKey: 'support24x7', color: 'text-amber-600', bgColor: 'bg-amber-50' },
];

export function CreditPurchasePage({ 
  language, 
  setLanguage, 
  setPage, 
  userType = 'teacher',
  currentCredits = 0,
  onLogin,
  announcement 
}: CreditPurchasePageProps) {
  const t = content[language];
  const [selectedPackage, setSelectedPackage] = useState<string | null>(null);
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string>('bkash');
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);

  const handleSelectPackage = (packageId: string) => {
    setSelectedPackage(packageId);
    setShowPaymentDialog(true);
  };

  const handlePaymentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setShowPaymentDialog(false);
    
    // Simulate payment processing
    setTimeout(() => {
      setShowSuccessDialog(true);
      const pkg = creditPackages.find(p => p.id === selectedPackage);
      toast.success(`${t.purchaseSuccess} ${pkg?.credits} ${t.credits}`);
    }, 1000);
  };

  const selectedPkg = creditPackages.find(pkg => pkg.id === selectedPackage);

  return (
    <div className={`min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 ${language === 'bn' ? 'font-noto-serif-bengali' : 'font-libre'}`}>
      <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} onLogin={onLogin} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Button 
              variant="ghost" 
              onClick={() => setPage(userType === 'teacher' ? 'teacher-dashboard' : 'guardian-dashboard')}
              className="text-white hover:bg-white/20 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {userType ? t.backToDashboard : t.backToHome}
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Coins className="w-8 h-8" />
                </div>
                <div>
                  <h1 className="text-white mb-1">{t.title}</h1>
                  <p className="text-xl text-blue-100">{t.subtitle}</p>
                </div>
              </div>

              {/* Current Credits Display */}
              <div className="inline-flex items-center gap-3 bg-white/20 backdrop-blur-sm px-6 py-3 rounded-full">
                <Wallet className="w-5 h-5" />
                <span className="font-semibold">{t.currentCredits}:</span>
                <Badge className="bg-white text-blue-600 text-lg px-4 py-1">
                  {currentCredits} {t.credits}
                </Badge>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        {/* Benefits Section */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.whyBuyCredits}</h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
            {benefits.map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.titleKey}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                >
                  <Card className="text-center hover:shadow-lg transition-shadow">
                    <CardContent className="p-6">
                      <div className={`w-12 h-12 ${benefit.bgColor} rounded-full flex items-center justify-center mx-auto mb-3`}>
                        <Icon className={`w-6 h-6 ${benefit.color}`} />
                      </div>
                      <p className="font-semibold text-gray-900 text-sm">
                        {t[benefit.titleKey as keyof typeof t]}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </motion.div>

        {/* Credit Packages */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-2">{t.choosePlan}</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 max-w-7xl mx-auto">
            {creditPackages.map((pkg, index) => {
              const Icon = pkg.icon;
              return (
                <motion.div
                  key={pkg.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card 
                    className={`
                      relative h-full transition-all duration-300 group
                      ${pkg.popular 
                        ? 'border-4 border-emerald-500 shadow-2xl scale-105 z-10' 
                        : pkg.bestValue
                        ? 'border-4 border-amber-500 shadow-2xl'
                        : 'border-2 border-gray-200 hover:border-gray-300 hover:shadow-xl'
                      }
                    `}
                  >
                    {/* Badge */}
                    {pkg.popular && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white px-4 py-1.5 shadow-lg">
                          <Sparkles className="w-3 h-3 mr-1" />
                          {t.mostPopular}
                        </Badge>
                      </div>
                    )}
                    {pkg.bestValue && (
                      <div className="absolute -top-4 left-1/2 -translate-x-1/2 z-20">
                        <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-1.5 shadow-lg">
                          <Award className="w-3 h-3 mr-1" />
                          {t.bestValue}
                        </Badge>
                      </div>
                    )}

                    {/* Background Gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${pkg.color} opacity-0 group-hover:opacity-5 transition-opacity rounded-lg`}></div>

                    <CardContent className="p-6 relative">
                      {/* Icon */}
                      <div className={`
                        w-14 h-14 bg-gradient-to-br ${pkg.color} rounded-2xl 
                        flex items-center justify-center shadow-lg mb-4
                        group-hover:scale-110 group-hover:rotate-6 transition-all
                      `}>
                        <Icon className="w-7 h-7 text-white" />
                      </div>

                      {/* Package Name */}
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {t[pkg.nameKey as keyof typeof t]}
                      </h3>

                      {/* Credits */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2">
                          <span className={`text-4xl font-bold bg-gradient-to-r ${pkg.color} bg-clip-text text-transparent`}>
                            {pkg.credits}
                          </span>
                          <span className="text-gray-600">{t.credits}</span>
                        </div>
                      </div>

                      {/* Price */}
                      <div className="mb-4">
                        <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-3xl font-bold text-gray-900">
                            ৳{pkg.price.toLocaleString()}
                          </span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="line-through text-gray-400">
                            ৳{pkg.originalPrice.toLocaleString()}
                          </span>
                          <Badge variant="secondary" className="bg-green-100 text-green-700">
                            {pkg.discount}% {t.save}
                          </Badge>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">
                          ৳{(pkg.price / pkg.credits).toFixed(2)} {t.perCredit}
                        </p>
                      </div>

                      {/* Validity */}
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4 pb-4 border-b">
                        <Clock className="w-4 h-4" />
                        <span>{pkg.validity} {t.days} {t.validity}</span>
                      </div>

                      {/* Features */}
                      <div className="space-y-2 mb-6">
                        {pkg.features.map((feature) => (
                          <div key={feature} className="flex items-start gap-2">
                            <div className={`w-5 h-5 bg-gradient-to-br ${pkg.color} rounded-full flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <Check className="w-3 h-3 text-white" />
                            </div>
                            <span className="text-sm text-gray-700">
                              {t[feature as keyof typeof t]}
                            </span>
                          </div>
                        ))}
                      </div>

                      {/* CTA Button */}
                      <Button 
                        className={`
                          w-full shadow-md hover:shadow-lg transition-all
                          ${pkg.popular || pkg.bestValue
                            ? `bg-gradient-to-r ${pkg.color} text-white hover:opacity-90` 
                            : 'bg-gray-900 text-white hover:bg-gray-800'
                          }
                        `}
                        onClick={() => handleSelectPackage(pkg.id)}
                      >
                        {t.buyNow}
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Info Section */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
        >
          <Alert className="max-w-4xl mx-auto bg-blue-50 border-blue-200">
            <Info className="w-4 h-4 text-blue-600" />
            <AlertDescription className="text-blue-900">
              {language === 'bn' 
                ? 'ক্রেডিট ব্যবহার করে আপনি টিউশনে আবেদন করতে, শিক্ষকদের সাথে যোগাযোগ করতে এবং ভিডিও মিটিং করতে পারবেন। ক্রেডিট মেয়াদ শেষ হওয়ার আগে ব্যবহার করুন।'
                : 'Use credits to apply for tuitions, contact teachers, and schedule video meetings. Use credits before expiry.'
              }
            </AlertDescription>
          </Alert>
        </motion.div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.confirmPurchase}</DialogTitle>
            <DialogDescription>
              {t.choosePaymentMethod}
            </DialogDescription>
          </DialogHeader>

          {selectedPkg && (
            <form onSubmit={handlePaymentSubmit}>
              {/* Package Summary */}
              <div className="mb-6 p-4 bg-gray-50 rounded-lg">
                <h4 className="font-semibold text-gray-900 mb-3">{t.packageDetails}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t[selectedPkg.nameKey as keyof typeof t]}</span>
                    <span className="font-semibold">{selectedPkg.credits} {t.credits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.validity}</span>
                    <span>{selectedPkg.validity} {t.days}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t">
                    <span className="text-gray-600">{t.total}</span>
                    <span className="text-xl font-bold text-gray-900">৳{selectedPkg.price.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between text-green-600">
                    <span>{t.youSave}</span>
                    <span className="font-semibold">৳{(selectedPkg.originalPrice - selectedPkg.price).toLocaleString()}</span>
                  </div>
                </div>
              </div>

              {/* Payment Method Selection */}
              <div className="mb-6">
                <Label className="mb-3 block">{t.paymentMethod}</Label>
                <RadioGroup value={selectedPaymentMethod} onValueChange={setSelectedPaymentMethod}>
                  <div className="space-y-2">
                    {paymentMethods.map((method) => {
                      const Icon = method.icon;
                      return (
                        <div key={method.id} className="flex items-center">
                          <RadioGroupItem value={method.id} id={method.id} />
                          <Label
                            htmlFor={method.id}
                            className={`
                              ml-3 flex items-center gap-3 flex-1 p-3 rounded-lg cursor-pointer
                              ${selectedPaymentMethod === method.id ? method.bgColor : 'hover:bg-gray-50'}
                            `}
                          >
                            <Icon className={`w-5 h-5 ${method.color}`} />
                            <span>{t[method.nameKey as keyof typeof t]}</span>
                          </Label>
                        </div>
                      );
                    })}
                  </div>
                </RadioGroup>
              </div>

              {/* Payment Form Fields */}
              <div className="space-y-4 mb-6">
                <div>
                  <Label htmlFor="phone">{t.phone}</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="01XXXXXXXXX"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="transactionId">{t.transactionId}</Label>
                  <Input
                    id="transactionId"
                    placeholder="TRX123456789"
                    required
                  />
                </div>
              </div>

              <DialogFooter className="gap-2">
                <Button 
                  type="button"
                  variant="outline" 
                  onClick={() => setShowPaymentDialog(false)}
                >
                  {t.cancel}
                </Button>
                <GradientButton 
                  variant="blue"
                  type="submit"
                >
                  {t.proceedPayment} ৳{selectedPkg.price.toLocaleString()}
                </GradientButton>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="max-w-md text-center">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center">
              <CheckCircle className="w-10 h-10 text-green-600" />
            </div>
          </div>
          <DialogHeader>
            <DialogTitle className="text-2xl">{t.purchaseSuccess}</DialogTitle>
            <DialogDescription className="text-base">
              {t.purchaseSuccessDesc}
            </DialogDescription>
          </DialogHeader>
          {selectedPkg && (
            <div className="my-6 p-4 bg-gray-50 rounded-lg">
              <div className="text-4xl font-bold text-green-600 mb-2">
                +{selectedPkg.credits} {t.credits}
              </div>
              <div className="text-sm text-gray-600">
                {t.validity}: {selectedPkg.validity} {t.days}
              </div>
            </div>
          )}
          <DialogFooter>
            <Button 
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600"
              onClick={() => {
                setShowSuccessDialog(false);
                setPage(userType === 'teacher' ? 'teacher-dashboard' : 'guardian-dashboard');
              }}
            >
              {t.goToDashboard}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
