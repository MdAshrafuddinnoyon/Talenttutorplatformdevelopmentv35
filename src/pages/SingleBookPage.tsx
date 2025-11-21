import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Separator } from '../components/ui/separator';
import { 
  ArrowLeft, 
  MapPin, 
  User, 
  Package,
  Star,
  Shield,
  Award,
  Crown,
  Send,
  Heart,
  Share2,
  AlertCircle,
  CheckCircle,
  BookOpen,
  Sparkles,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { BookRequestDialog } from '../components/BookRequestDialog';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';
import { toast } from 'sonner@2.0.3';

interface SingleBookPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  itemId: string;
  currentUser?: any;
  setCurrentUser?: (user: any) => void;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    backToLibrary: 'লাইব্রেরিতে ফিরুন',
    request: 'অনুরোধ করুন',
    requested: 'অনুরোধ করা হয়েছে',
    share: 'শেয়ার করুন',
    free: 'বিনামূল্যে',
    available: 'পাওয়া যাচ্ছে',
    condition: 'অবস্থা',
    location: 'এলাকা',
    class: 'শ্রেণী',
    subject: 'বিষয়',
    size: 'সাইজ',
    description: 'বিস্তারিত বর্ণনা',
    donorInfo: 'দাতার তথ্য',
    totalDonations: 'মোট দান',
    rating: 'রেটিং',
    verified: 'যাচাইকৃত',
    featured: 'ফিচারড',
    urgent: 'জরুরি',
    loginRequired: 'অনুরোধ পাঠাতে শিক্ষার্থী হিসেবে লগইন করুন',
    loginButton: 'লগইন করুন',
    onlyStudents: 'শুধুমাত্র শিক্ষার্থীরা অনুরোধ পাঠাতে পারবেন',
    similarItems: 'অনুরূপ আইটেম',
    viewAll: 'সব দেখুন',
    safetyTips: 'নিরাপত্তা টিপস',
    tip1: 'দাতার যাচাইকৃত ব্যাজ দেখুন',
    tip2: 'সর্বদা নিরাপদ স্থানে দেখা করুন',
    tip3: 'আইটেম সংগ্রহের আগে পরীক্ষা করুন',
    bronzeDonor: 'ব্রোঞ্জ দাতা',
    silverDonor: 'সিলভার দাতা',
    goldDonor: 'গোল্ড দাতা',
    diamondDonor: 'ডায়মন্ড দাতা',
    excellent: 'চমৎকার',
    good: 'ভালো',
    likeNew: 'প্রায় নতুন',
    new: 'নতুন',
    fair: 'মোটামুটি',
  },
  en: {
    backToLibrary: 'Back to Library',
    request: 'Request',
    requested: 'Requested',
    share: 'Share',
    free: 'Free',
    available: 'Available',
    condition: 'Condition',
    location: 'Location',
    class: 'Class',
    subject: 'Subject',
    size: 'Size',
    description: 'Description',
    donorInfo: 'Donor Information',
    totalDonations: 'Total Donations',
    rating: 'Rating',
    verified: 'Verified',
    featured: 'Featured',
    urgent: 'Urgent',
    loginRequired: 'Login as student to send request',
    loginButton: 'Login',
    onlyStudents: 'Only students can send requests',
    similarItems: 'Similar Items',
    viewAll: 'View All',
    safetyTips: 'Safety Tips',
    tip1: 'Check donor verified badge',
    tip2: 'Always meet in safe places',
    tip3: 'Inspect item before collection',
    bronzeDonor: 'Bronze Donor',
    silverDonor: 'Silver Donor',
    goldDonor: 'Gold Donor',
    diamondDonor: 'Diamond Donor',
    excellent: 'Excellent',
    good: 'Good',
    likeNew: 'Like New',
    new: 'New',
    fair: 'Fair',
  },
};

// Helper function to get donor badge info
const getDonorBadge = (donationCount: number) => {
  if (donationCount >= 50) {
    return { level: 'diamond', icon: Crown, color: 'from-cyan-400 via-teal-500 to-emerald-600', textColor: 'text-teal-600', label: 'diamondDonor' };
  } else if (donationCount >= 25) {
    return { level: 'gold', icon: Award, color: 'from-amber-400 to-yellow-500', textColor: 'text-amber-600', label: 'goldDonor' };
  } else if (donationCount >= 10) {
    return { level: 'silver', icon: Shield, color: 'from-gray-400 to-gray-600', textColor: 'text-gray-600', label: 'silverDonor' };
  } else if (donationCount >= 5) {
    return { level: 'bronze', icon: Star, color: 'from-amber-400 to-rose-500', textColor: 'text-amber-600', label: 'bronzeDonor' };
  }
  return null;
};

// Mock data - in real app, fetch from API
const mockItem = {
  id: 1,
  title: 'ক্লাস ৮ বিজ্ঞান বই (সম্পূর্ণ সেট)',
  category: 'books',
  condition: 'excellent',
  location: 'ধানমন্ডি, ঢাকা',
  donorName: 'আব্দুর রহমান',
  donorRating: 4.9,
  donorDonationCount: 65,
  class: 'ক্লাস ৮',
  subject: 'বিজ্ঞান',
  description: 'ক্লাস ৮ এর সম্পূর্ণ বিজ্ঞান বই সেট। সব বই খুব ভালো অবস্থায়। লেখা নেই। রঙিন ছবি সহ। NCTB বোর্ড বই এবং গাইড বই উভয়ই আছে। শিক্ষার্থীদের জন্য খুবই উপকারী হবে।',
  photo: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=800&q=80',
  featured: true,
  verified: true,
  urgent: false,
  available: true,
  topDonor: true,
};

export function SingleBookPage({ 
  language, 
  setLanguage, 
  setPage, 
  announcement, 
  itemId,
  currentUser,
  setCurrentUser,
  onLogin 
}: SingleBookPageProps) {
  const t = content[language];
  const [showRequestDialog, setShowRequestDialog] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [isRequested, setIsRequested] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);

  const item = mockItem; // In real app: fetch item by itemId
  const isStudent = currentUser?.role === 'student';
  const donorBadge = getDonorBadge(item.donorDonationCount);

  const handleRequestClick = () => {
    if (!currentUser) {
      setShowLoginDialog(true);
      return;
    }

    if (!isStudent) {
      toast.error(t.onlyStudents);
      return;
    }

    setShowRequestDialog(true);
  };

  const handleRequestSent = () => {
    setIsRequested(true);
  };

  const handleShare = async () => {
    try {
      // Try Web Share API first (only works on HTTPS and with user gesture)
      if (navigator.share && navigator.canShare) {
        const shareData = {
          title: item.title,
          text: `${language === 'bn' ? 'এই বিনামূল্যে আইটেমটি দেখুন' : 'Check out this free item'}: ${item.title}`,
          url: window.location.href,
        };
        
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          toast.success(language === 'bn' ? 'শেয়ার সফল হয়েছে' : 'Shared successfully');
          return;
        }
      }
      
      // Fallback to clipboard
      await navigator.clipboard.writeText(window.location.href);
      toast.success(language === 'bn' ? 'লিংক কপি করা হয়েছে' : 'Link copied to clipboard');
    } catch (error) {
      // If all fails, try manual clipboard copy
      try {
        const textArea = document.createElement('textarea');
        textArea.value = window.location.href;
        textArea.style.position = 'fixed';
        textArea.style.opacity = '0';
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast.success(language === 'bn' ? 'লিংক কপি করা হয়েছে' : 'Link copied to clipboard');
      } catch (fallbackError) {
        toast.error(language === 'bn' ? 'শেয়ার করতে সমস্যা হয়েছে' : 'Failed to share');
        console.error('Share error:', error);
      }
    }
  };

  const conditionLabels: any = {
    excellent: t.excellent,
    good: t.good,
    likeNew: t.likeNew,
    new: t.new,
    fair: t.fair,
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      <Header
        language={language}
        setLanguage={setLanguage}
        setPage={setPage}
        announcement={announcement}
        currentUser={currentUser}
        onLogin={onLogin}
      />

      {/* Back Button */}
      <div className="container mx-auto px-4 pt-24 pb-6">
        <Button
          variant="outline"
          onClick={() => setPage('donation-library')}
          className={`gap-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
        >
          <ArrowLeft className="w-4 h-4" />
          {t.backToLibrary}
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 pb-20">
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left: Image Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="overflow-hidden border-2 border-emerald-100">
              <div className="relative aspect-square bg-gray-100">
                <img
                  src={item.photo}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
                
                {/* Badges on Image */}
                <div className="absolute top-4 left-4 flex flex-col gap-2">
                  {item.featured && (
                    <Badge className="bg-gradient-to-r from-amber-500 to-orange-500 text-white border-0">
                      <Sparkles className="w-3 h-3 mr-1" />
                      {t.featured}
                    </Badge>
                  )}
                  {item.urgent && (
                    <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white border-0">
                      <AlertCircle className="w-3 h-3 mr-1" />
                      {t.urgent}
                    </Badge>
                  )}
                  {item.verified && (
                    <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0">
                      <Shield className="w-3 h-3 mr-1" />
                      {t.verified}
                    </Badge>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="absolute top-4 right-4 flex flex-col gap-2">
                  <Button
                    size="icon"
                    variant="outline"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white"
                    onClick={() => {
                      setIsFavorited(!isFavorited);
                      toast.success(language === 'bn' ? 'পছন্দের তালিকায় যোগ করা হয়েছে' : 'Added to favorites');
                    }}
                  >
                    <Heart className={`w-4 h-4 ${isFavorited ? 'fill-red-500 text-red-500' : ''}`} />
                  </Button>
                  <Button
                    size="icon"
                    variant="outline"
                    className="bg-white/90 backdrop-blur-sm hover:bg-white"
                    onClick={handleShare}
                  >
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            </Card>

            {/* Safety Tips */}
            <Card className="mt-6 p-6 bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
              <h3 className={`flex items-center gap-2 text-blue-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                <Shield className="w-5 h-5" />
                {t.safetyTips}
              </h3>
              <ul className={`space-y-2 text-sm text-blue-800 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{t.tip1}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{t.tip2}</span>
                </li>
                <li className="flex items-start gap-2">
                  <CheckCircle className="w-4 h-4 mt-0.5 flex-shrink-0" />
                  <span>{t.tip3}</span>
                </li>
              </ul>
            </Card>
          </motion.div>

          {/* Right: Details Section */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Card className="p-8">
              {/* Title and Price */}
              <div className="mb-6">
                <h1 className={`text-3xl text-gray-900 mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {item.title}
                </h1>
                <div className="flex items-center gap-3">
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white text-lg px-4 py-2">
                    {t.free}
                  </Badge>
                  <Badge variant="outline" className="text-emerald-600 border-emerald-300">
                    <CheckCircle className="w-4 h-4 mr-1" />
                    {t.available}
                  </Badge>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Item Details */}
              <div className="space-y-4 mb-6">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className={`text-sm text-gray-500 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {t.condition}
                    </p>
                    <p className={`text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {conditionLabels[item.condition]}
                    </p>
                  </div>
                  <div>
                    <p className={`text-sm text-gray-500 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {t.class}
                    </p>
                    <p className={`text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {item.class}
                    </p>
                  </div>
                  {item.subject && (
                    <div>
                      <p className={`text-sm text-gray-500 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {t.subject}
                      </p>
                      <p className={`text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {item.subject}
                      </p>
                    </div>
                  )}
                  <div>
                    <p className={`text-sm text-gray-500 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {t.location}
                    </p>
                    <p className={`text-gray-900 flex items-center gap-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      <MapPin className="w-4 h-4 text-emerald-600" />
                      {item.location}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-6" />

              {/* Description */}
              <div className="mb-6">
                <h3 className={`text-gray-900 mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.description}
                </h3>
                <p className={`text-gray-600 leading-relaxed ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {item.description}
                </p>
              </div>

              <Separator className="my-6" />

              {/* Donor Info */}
              <div className="mb-6">
                <h3 className={`text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.donorInfo}
                </h3>
                <div className="flex items-center gap-4 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white text-2xl">
                    {item.donorName.charAt(0)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className={`text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {item.donorName}
                      </h4>
                      {item.verified && (
                        <Badge variant="outline" className="text-emerald-600 border-emerald-300 text-xs">
                          <Shield className="w-3 h-3 mr-1" />
                          {t.verified}
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 text-sm text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span>{item.donorRating}</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <Package className="w-4 h-4" />
                        <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                          {item.donorDonationCount} {t.totalDonations}
                        </span>
                      </div>
                    </div>
                    {donorBadge && (
                      <Badge className={`mt-2 bg-gradient-to-r ${donorBadge.color} text-white border-0`}>
                        {React.createElement(donorBadge.icon, { className: 'w-3 h-3 mr-1' })}
                        {t[donorBadge.label as keyof typeof t]}
                      </Badge>
                    )}
                  </div>
                </div>
              </div>

              {/* Request Button */}
              <div className="space-y-3">
                {!currentUser && (
                  <div className={`p-4 bg-blue-50 border border-blue-200 rounded-lg text-sm text-blue-800 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    <AlertCircle className="w-4 h-4 inline mr-2" />
                    {t.loginRequired}
                  </div>
                )}
                
                <Button
                  onClick={handleRequestClick}
                  disabled={isRequested}
                  className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-lg py-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                >
                  {isRequested ? (
                    <>
                      <CheckCircle className="w-5 h-5 mr-2" />
                      {t.requested}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5 mr-2" />
                      {t.request}
                    </>
                  )}
                </Button>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>

      <Footer language={language} setPage={setPage} />

      {/* Request Dialog */}
      <BookRequestDialog
        isOpen={showRequestDialog}
        onClose={() => setShowRequestDialog(false)}
        item={item}
        currentUser={currentUser}
        language={language}
        onRequestSent={handleRequestSent}
      />

      {/* Login Dialog */}
      <UnifiedAuthDialog
        isOpen={showLoginDialog}
        onClose={() => setShowLoginDialog(false)}
        language={language}
        onLogin={onLogin}
        setCurrentUser={setCurrentUser}
      />
    </div>
  );
}
