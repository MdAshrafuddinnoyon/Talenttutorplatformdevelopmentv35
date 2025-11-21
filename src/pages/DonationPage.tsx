import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Badge } from '../components/ui/badge';
import { Progress } from '../components/ui/progress';
import { Checkbox } from '../components/ui/checkbox';
import { 
  Heart, 
  Book, 
  DollarSign, 
  Shirt, 
  ArrowLeft, 
  CheckCircle, 
  Users, 
  Target, 
  TrendingUp,
  Gift,
  Sparkles,
  Shield,
  Clock
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { PhysicalDonationForm } from '../components/PhysicalDonationForm';
import { PaymentGatewayDialog } from '../components/PaymentGatewayDialog';
import { ThankYouDialog } from '../components/ThankYouDialog';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface DonationPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  currentUser?: any;
  setCurrentUser?: (user: any) => void;
  onDonorLogin?: (donorData: any) => void;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'যাকাত ও দান করুন',
    subtitle: 'অসহায় শিক্ষার্থীদের স্বপ্ন পূরণে সাহায্য করুন',
    backToHome: 'হোমে ফিরুন',
    donationType: 'দানের ধরন নির্বাচন করুন',
    money: 'অর্থ',
    moneySubtitle: 'বৃত্তি ও আর্থিক সাহায্য',
    books: 'বই',
    booksSubtitle: 'শিক্ষা উপকরণ',
    uniform: 'ইউনিফর্ম',
    uniformSubtitle: 'পোশাক ও জুতা',
    stationery: 'স্টেশনারি',
    stationerySubtitle: 'খাতা ও লেখার উপকরণ',
    donateNow: 'এখনই দান করুন',
    amount: 'পরিমাণ',
    description: 'বিস্তারিত (ঐচ্ছিক)',
    yourName: 'আপনার নাম',
    email: 'ইমেইল',
    phone: 'মোবাইল নম্বর',
    address: 'ঠিকানা',
    anonymous: 'নাম গোপন রাখুন',
    currentCampaigns: 'চলমান ক্যাম্পেইন',
    raised: 'সংগৃহীত',
    goal: 'লক্ষ্য',
    recentDonations: 'সাম্প্রতিক দান',
    totalDonated: 'মোট দান',
    booksCollected: 'সংগৃহীত বই',
    studentsHelped: 'উপকৃত ছাত্র',
    success: 'আপনার দান সফলভাবে জমা হয়েছে! ধন্যবাদ।',
    proceedPayment: 'পেমেন্টে এগিয়ে যান',
    quickAmounts: 'দ্রুত নির্বাচন',
    whyDonate: 'কেন দান করবেন?',
    impactStory: 'আপনার দানের প্রভাব',
    trustBadge: 'বিশ্বস্ত ও নিরাপদ',
    taxBenefit: 'ট্যাক্স সুবিধা পাবেন',
    enterAmount: 'পরিমাণ লিখুন',
    fillAllFields: 'সব তথ্য পূরণ করুন',
  },
  en: {
    title: 'Donate Zakat & Charity',
    subtitle: 'Help underprivileged students achieve their dreams',
    backToHome: 'Back to Home',
    donationType: 'Select Donation Type',
    money: 'Money',
    moneySubtitle: 'Scholarship & Financial Aid',
    books: 'Books',
    booksSubtitle: 'Educational Materials',
    uniform: 'Uniform',
    uniformSubtitle: 'Clothing & Shoes',
    stationery: 'Stationery',
    stationerySubtitle: 'Notebooks & Supplies',
    donateNow: 'Donate Now',
    amount: 'Amount',
    description: 'Description (Optional)',
    yourName: 'Your Name',
    email: 'Email',
    phone: 'Phone Number',
    address: 'Address',
    anonymous: 'Keep Anonymous',
    currentCampaigns: 'Current Campaigns',
    raised: 'Raised',
    goal: 'Goal',
    recentDonations: 'Recent Donations',
    totalDonated: 'Total Donated',
    booksCollected: 'Books Collected',
    studentsHelped: 'Students Helped',
    success: 'Your donation has been submitted successfully! Thank you.',
    proceedPayment: 'Proceed to Payment',
    quickAmounts: 'Quick Select',
    whyDonate: 'Why Donate?',
    impactStory: 'Your Donation Impact',
    trustBadge: 'Trusted & Secure',
    taxBenefit: 'Tax Benefits Available',
    enterAmount: 'Enter Amount',
    fillAllFields: 'Fill All Fields',
  },
};

const campaigns = [
  {
    id: 1,
    title: 'অসহায় ছাত্রদের বই দিন',
    titleEn: 'Books for Underprivileged Students',
    description: 'দরিদ্র ছাত্রছাত্রীদের জন্য বিজ্ঞান ও গণিত বই সংগ্রহ',
    descriptionEn: 'Science and Math books for poor students',
    raised: 45000,
    goal: 100000,
    students: 50,
    urgency: 'high',
  },
  {
    id: 2,
    title: 'এতিম শিক্ষার্থীদের বৃত্তি',
    titleEn: 'Scholarships for Orphans',
    description: 'মেধাবী এতিম শিক্ষার্থীদের এক বছরের পড়াশোনার খরচ',
    descriptionEn: 'One year education expenses for talented orphans',
    raised: 280000,
    goal: 500000,
    students: 20,
    urgency: 'medium',
  },
  {
    id: 3,
    title: 'স্কুল ইউনিফর্ম প্রদান',
    titleEn: 'School Uniforms Distribution',
    description: 'অসহায় শিশুদের জন্য নতুন স্কুল ইউনিফর্ম',
    descriptionEn: 'New school uniforms for underprivileged children',
    raised: 75000,
    goal: 150000,
    students: 80,
    urgency: 'low',
  },
];

const recentDonations = [
  { name: 'জনাব রহিম উদ্দিন', amount: '৫,০০০ টাকা', type: 'অর্থ', time: '২ ঘন্টা আগে' },
  { name: 'Anonymous', amount: '১০টি বই', type: 'বই', time: '৫ ঘন্টা আগে' },
  { name: 'মিসেস সাবিনা', amount: '৩,০০০ টাকা', type: 'অর্থ', time: '১ দিন আগে' },
  { name: 'করিম সাহেব', amount: '৫টি ইউনিফর্ম', type: 'পোশাক', time: '২ দিন আগে' },
];

export function DonationPage({ language, setLanguage, setPage, announcement, currentUser, setCurrentUser, onDonorLogin, onLogin }: DonationPageProps) {
  const t = content[language];
  const [donationType, setDonationType] = useState('money');
  const [showSuccess, setShowSuccess] = useState(false);
  const [donationAmount, setDonationAmount] = useState('');
  
  // Form Data States
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [donorAddress, setDonorAddress] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [donationDescription, setDonationDescription] = useState('');
  
  // New Payment Gateway States
  const [showPaymentGateway, setShowPaymentGateway] = useState(false);
  const [showThankYou, setShowThankYou] = useState(false);
  const [transactionData, setTransactionData] = useState<any>(null);
  
  // Auth Dialog State
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  const isPhysicalDonation = donationType === 'books' || donationType === 'uniform' || donationType === 'stationery';
  
  const handleLoginRequired = () => {
    setShowAuthDialog(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (donationType === 'money') {
      if (!donationAmount || parseFloat(donationAmount) <= 0) {
        toast.error(t.enterAmount);
        return;
      }
    }
    
    if (!isAnonymous) {
      if (!donorName || !donorPhone) {
        toast.error(t.fillAllFields);
        return;
      }
    }
    
    // For money donation, show payment gateway
    if (donationType === 'money') {
      setShowPaymentGateway(true);
    }
  };

  const handlePaymentSuccess = (txnData: any) => {
    setTransactionData(txnData);
    setShowPaymentGateway(false);
    setShowThankYou(true);
    
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setDonationAmount('');
    setDonorName('');
    setDonorEmail('');
    setDonorPhone('');
    setDonorAddress('');
    setIsAnonymous(false);
    setDonationDescription('');
  };

  const handlePhysicalDonationSuccess = () => {
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 5000);
    toast.success(t.success);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} onLogin={onLogin} />

      <div className="container mx-auto px-4 py-8 lg:py-12">
        {/* Hero Section */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <Button 
            variant="outline" 
            onClick={() => setPage('home')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToHome}
          </Button>

          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md mb-6">
            <Heart className="w-5 h-5 text-rose-600" />
            <span className={`text-rose-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              মানবতার সেবায়
            </span>
          </div>
          
          <h1 className={`text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h1>
          <p className={`text-gray-600 text-lg max-w-2xl mx-auto ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.subtitle}
          </p>
        </motion.div>

        {/* Stats Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-8 text-center bg-gradient-to-br from-emerald-50 to-white border-2 border-emerald-200 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <DollarSign className="w-8 h-8 text-white" />
              </div>
              <div className={`text-3xl text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                ৳ ১২,৫০,০০০
              </div>
              <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.totalDonated}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-8 text-center bg-gradient-to-br from-teal-50 to-white border-2 border-teal-200 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Book className="w-8 h-8 text-white" />
              </div>
              <div className={`text-3xl text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                ২,৫৪০
              </div>
              <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.booksCollected}
              </p>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-8 text-center bg-gradient-to-br from-cyan-50 to-white border-2 border-cyan-200 hover:shadow-xl transition-all">
              <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className={`text-3xl text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                ৩৫০
              </div>
              <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.studentsHelped}
              </p>
            </Card>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Donation Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Donation Type Selector */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-8 shadow-xl border-2 border-gray-100">
                <h2 className={`text-gray-900 mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.donationType}
                </h2>
                
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <button
                    type="button"
                    onClick={() => setDonationType('money')}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      donationType === 'money'
                        ? 'bg-gradient-to-br from-emerald-500 to-teal-600 border-emerald-600 text-white shadow-lg scale-105'
                        : 'bg-white border-gray-200 hover:border-emerald-300 hover:shadow-md'
                    }`}
                  >
                    <DollarSign className={`w-10 h-10 mx-auto mb-3 ${donationType === 'money' ? 'text-white' : 'text-emerald-600'}`} />
                    <p className={`mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.money}</p>
                    <p className={`text-xs opacity-80 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.moneySubtitle}</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDonationType('books')}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      donationType === 'books'
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 border-blue-600 text-white shadow-lg scale-105'
                        : 'bg-white border-gray-200 hover:border-blue-300 hover:shadow-md'
                    }`}
                  >
                    <Book className={`w-10 h-10 mx-auto mb-3 ${donationType === 'books' ? 'text-white' : 'text-blue-600'}`} />
                    <p className={`mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.books}</p>
                    <p className={`text-xs opacity-80 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.booksSubtitle}</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDonationType('uniform')}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      donationType === 'uniform'
                        ? 'bg-gradient-to-br from-purple-500 to-pink-600 border-purple-600 text-white shadow-lg scale-105'
                        : 'bg-white border-gray-200 hover:border-purple-300 hover:shadow-md'
                    }`}
                  >
                    <Shirt className={`w-10 h-10 mx-auto mb-3 ${donationType === 'uniform' ? 'text-white' : 'text-purple-600'}`} />
                    <p className={`mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.uniform}</p>
                    <p className={`text-xs opacity-80 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.uniformSubtitle}</p>
                  </button>

                  <button
                    type="button"
                    onClick={() => setDonationType('stationery')}
                    className={`p-6 rounded-xl border-2 transition-all duration-300 ${
                      donationType === 'stationery'
                        ? 'bg-gradient-to-br from-orange-500 to-red-600 border-orange-600 text-white shadow-lg scale-105'
                        : 'bg-white border-gray-200 hover:border-orange-300 hover:shadow-md'
                    }`}
                  >
                    <div className={`text-4xl mx-auto mb-3`}>📝</div>
                    <p className={`mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.stationery}</p>
                    <p className={`text-xs opacity-80 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.stationerySubtitle}</p>
                  </button>
                </div>
              </Card>
            </motion.div>

            {/* Donation Form */}
            {!isPhysicalDonation ? (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <Card className="p-8 shadow-xl border-2 border-gray-100">
                  {showSuccess && (
                    <div className="mb-6 p-4 bg-green-50 border-2 border-green-200 rounded-lg flex items-center gap-3">
                      <CheckCircle className="w-6 h-6 text-green-600" />
                      <p className={`text-green-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {t.success}
                      </p>
                    </div>
                  )}

                  <form onSubmit={handleSubmit} className="space-y-6">
                    {/* Amount Input */}
                    <div>
                      <Label className={`text-lg mb-3 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {t.amount} (টাকা) *
                      </Label>
                      <Input 
                        type="number" 
                        placeholder="৫,০০০" 
                        required 
                        className={`text-lg py-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                        value={donationAmount}
                        onChange={(e) => setDonationAmount(e.target.value)}
                      />
                      <p className={`text-sm text-gray-500 mt-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {t.quickAmounts}:
                      </p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {[500, 1000, 2000, 5000, 10000].map((amt) => (
                          <Button 
                            key={amt} 
                            type="button" 
                            variant="outline" 
                            size="sm"
                            onClick={() => setDonationAmount(amt.toString())}
                            className={`hover:bg-emerald-50 hover:border-emerald-300 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                          >
                            ৳ {amt.toLocaleString()}
                          </Button>
                        ))}
                      </div>
                    </div>

                    {/* Description */}
                    <div>
                      <Label className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                        {t.description}
                      </Label>
                      <Textarea 
                        placeholder="আপনার দানের উদ্দেশ্য..." 
                        rows={3}
                        className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
                        value={donationDescription}
                        onChange={(e) => setDonationDescription(e.target.value)}
                      />
                    </div>

                    {/* Anonymous Checkbox */}
                    <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg border border-gray-200">
                      <Checkbox 
                        id="anonymous"
                        checked={isAnonymous}
                        onCheckedChange={(checked) => setIsAnonymous(checked as boolean)}
                      />
                      <label 
                        htmlFor="anonymous" 
                        className={`text-gray-700 cursor-pointer ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                      >
                        {t.anonymous}
                      </label>
                    </div>

                    {/* Donor Information - Only show if not anonymous */}
                    {!isAnonymous && (
                      <div className="space-y-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 rounded-lg border-2 border-blue-200">
                        <h3 className={`text-lg text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          আপনার তথ্য
                        </h3>
                        
                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                              {t.yourName} *
                            </Label>
                            <Input 
                              placeholder="নাম" 
                              required 
                              className={`py-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                              value={donorName}
                              onChange={(e) => setDonorName(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                              {t.phone} *
                            </Label>
                            <Input 
                              type="tel" 
                              placeholder="01700000000" 
                              required 
                              className="py-6"
                              value={donorPhone}
                              onChange={(e) => setDonorPhone(e.target.value)}
                            />
                          </div>
                        </div>

                        <div className="grid md:grid-cols-2 gap-4">
                          <div>
                            <Label className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                              {t.email}
                            </Label>
                            <Input 
                              type="email" 
                              placeholder="email@example.com" 
                              className="py-6"
                              value={donorEmail}
                              onChange={(e) => setDonorEmail(e.target.value)}
                            />
                          </div>
                          <div>
                            <Label className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                              {t.address}
                            </Label>
                            <Input 
                              placeholder="ঠিকানা" 
                              className={`py-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                              value={donorAddress}
                              onChange={(e) => setDonorAddress(e.target.value)}
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Submit Button */}
                    <Button 
                      type="submit" 
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white py-6 text-lg shadow-lg"
                      size="lg"
                    >
                      <Heart className="w-5 h-5 mr-2" />
                      {t.proceedPayment}
                    </Button>
                  </form>
                </Card>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.5 }}
              >
                <PhysicalDonationForm
                  language={language}
                  donationType={donationType as 'books' | 'uniform' | 'stationery'}
                  currentUser={currentUser}
                  onSuccess={handlePhysicalDonationSuccess}
                  onLoginRequired={handleLoginRequired}
                />
              </motion.div>
            )}

            {/* Trust Badges */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="grid md:grid-cols-3 gap-4">
                <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-200">
                  <div className="flex items-center gap-3">
                    <Shield className="w-8 h-8 text-green-600" />
                    <div>
                      <p className={`text-sm text-green-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {t.trustBadge}
                      </p>
                      <p className="text-xs text-green-700">256-bit Encryption</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
                  <div className="flex items-center gap-3">
                    <Target className="w-8 h-8 text-blue-600" />
                    <div>
                      <p className={`text-sm text-blue-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        100% স্বচ্ছতা
                      </p>
                      <p className="text-xs text-blue-700">Full Transparency</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
                  <div className="flex items-center gap-3">
                    <TrendingUp className="w-8 h-8 text-purple-600" />
                    <div>
                      <p className={`text-sm text-purple-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {t.taxBenefit}
                      </p>
                      <p className="text-xs text-purple-700">Get Tax Receipt</p>
                    </div>
                  </div>
                </Card>
              </div>
            </motion.div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Current Campaigns */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
            >
              <Card className="p-6 shadow-lg border-2 border-gray-100 sticky top-20">
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-emerald-600" />
                  <h3 className={`text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {t.currentCampaigns}
                  </h3>
                </div>
                
                <div className="space-y-4">
                  {campaigns.map((campaign) => (
                    <div 
                      key={campaign.id} 
                      className="border-b pb-4 last:border-0 last:pb-0 hover:bg-gray-50 p-3 rounded-lg transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <h4 className={`text-gray-900 flex-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          {language === 'bn' ? campaign.title : campaign.titleEn}
                        </h4>
                        {campaign.urgency === 'high' && (
                          <Badge className="bg-red-500">
                            <Clock className="w-3 h-3 mr-1" />
                            জরুরি
                          </Badge>
                        )}
                      </div>
                      
                      <p className={`text-gray-600 text-sm mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {language === 'bn' ? campaign.description : campaign.descriptionEn}
                      </p>
                      
                      <div className="mb-2">
                        <div className={`flex justify-between text-sm mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          <span className="text-gray-600">
                            {t.raised}: ৳{campaign.raised.toLocaleString()}
                          </span>
                          <span className="text-gray-600">
                            {t.goal}: ৳{campaign.goal.toLocaleString()}
                          </span>
                        </div>
                        <Progress value={(campaign.raised / campaign.goal) * 100} className="h-2" />
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <p className={`text-sm text-emerald-600 flex items-center gap-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          <Users className="w-4 h-4" />
                          {campaign.students} ছাত্র
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {Math.round((campaign.raised / campaign.goal) * 100)}%
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </Card>
            </motion.div>

            {/* Recent Donations */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.5 }}
            >
              <Card className="p-6 shadow-lg border-2 border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <Sparkles className="w-5 h-5 text-rose-600" />
                  <h3 className={`text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {t.recentDonations}
                  </h3>
                </div>
                
                <div className="space-y-3">
                  {recentDonations.map((donation, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.6 + (i * 0.1) }}
                      className="flex items-start gap-3 p-3 bg-gradient-to-r from-rose-50 to-pink-50 rounded-lg hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-10 bg-gradient-to-br from-rose-500 to-pink-600 rounded-full flex items-center justify-center flex-shrink-0">
                        <Heart className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className={`text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          {donation.name}
                        </p>
                        <p className={`text-gray-600 text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          {donation.amount} • {donation.type}
                        </p>
                        <p className={`text-gray-500 text-xs flex items-center gap-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          <Clock className="w-3 h-3" />
                          {donation.time}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Payment Gateway Dialog */}
      <PaymentGatewayDialog
        open={showPaymentGateway}
        onOpenChange={setShowPaymentGateway}
        amount={parseFloat(donationAmount) || 0}
        donorName={isAnonymous ? 'Anonymous' : donorName}
        donationType="donation"
        language={language}
        userId={currentUser?.id}
        purpose="donation"
        metadata={{
          donationType: donationType,
          isAnonymous,
          donorName: isAnonymous ? 'Anonymous' : donorName
        }}
        onPaymentSuccess={handlePaymentSuccess}
      />

      {/* Thank You Dialog */}
      <ThankYouDialog
        open={showThankYou}
        onOpenChange={setShowThankYou}
        transactionData={transactionData}
        language={language}
      />

      {/* Auth Dialog for Login/Register */}
      <UnifiedAuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        language={language}
        initialMode="register"
        onLogin={(type, userData) => {
          console.log('User logged in as:', type);
          onLogin?.(type as any, userData);
          setShowAuthDialog(false);
          toast.success(language === 'bn' ? 'সফলভাবে লগইন হয়েছে!' : 'Login successful!');
        }}
      />

      <Footer language={language} setLanguage={setLanguage} setPage={setPage} />
    </div>
  );
}
