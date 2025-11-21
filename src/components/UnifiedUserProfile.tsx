import { useState, useEffect, useRef } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar } from './ui/avatar';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { ScrollArea } from './ui/scroll-area';
import { 
  User, Mail, Phone, MapPin, Calendar, Award, Star, 
  CheckCircle, XCircle, Clock, Edit, Share2, Download,
  Briefcase, GraduationCap, Heart, Shield, TrendingUp,
  FileText, Video, MessageSquare, Settings, Camera,
  Wallet, CreditCard, History, Target, BookOpen,
  Upload, Play, Pause, ChevronLeft, ChevronRight,
  ThumbsUp, Quote, Globe2, Users
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Review {
  id: number;
  guardianName: string;
  guardianAvatar?: string;
  rating: number;
  comment: string;
  date: string;
  subject?: string;
  duration?: string;
}

interface ProfileData {
  id: string;
  name: string;
  email: string;
  phone: string;
  avatar?: string;
  location: string;
  joinDate: string;
  bio: string;
  verified: boolean;
  profileCompletion: number;
  
  // Common stats
  rating: number;
  credits: number;
  completedJobs: number;
  activeJobs: number;
  
  // Teacher specific
  subjects?: string[];
  mediums?: string[];
  education?: string;
  experience?: string;
  totalEarnings?: number;
  responseTime?: string;
  
  // Guardian specific
  totalSpent?: number;
  children?: number;
  
  // Video interview
  videoInterviewUrl?: string;
  
  // Reviews
  reviews: Review[];
  
  // Documents
  documents?: string[];
}

interface UnifiedUserProfileProps {
  userType: 'teacher' | 'guardian';
  language: 'bn' | 'en';
  profileData: ProfileData;
  isOwnProfile?: boolean;
  onUpdateProfile?: (data: Partial<ProfileData>) => void;
  setPage?: (page: string) => void;
}

const content = {
  bn: {
    overview: 'সংক্ষিপ্ত',
    about: 'পরিচিতি',
    reviews: 'রিভিউসমূহ',
    videoInterview: 'ভিডিও ইন্টারভিউ',
    documents: 'নথিপত্র',
    editProfile: 'প্রোফাইল এডিট',
    uploadVideo: 'ভিডিও আপলোড',
    share: 'শেয়ার',
    download: 'ডাউনলোড',
    verified: 'ভেরিফাইড ✓',
    pending: 'অপেক্ষমাণ',
    notVerified: 'ভেরিফাইড নয়',
    joinedOn: 'যোগদান',
    rating: 'রেটিং',
    totalEarnings: 'মোট আয়',
    totalSpent: 'মোট ব্যয়',
    credits: 'ক্রেডিট',
    activeJobs: 'সক্রিয় কাজ',
    completedJobs: 'সম্পন্ন কাজ',
    subjects: 'বিষয়সমূহ',
    education: 'শিক্ষাগত যোগ্যতা',
    experience: 'অভিজ্ঞতা',
    location: 'ঠিকানা',
    bio: 'সংক্ষিপ্ত বিবরণ',
    profileCompletion: 'প্রোফাইল সম্পূর্ণতা',
    viewDashboard: 'ড্যাশবোর্ড দেখুন',
    sendMessage: 'বার্তা পাঠান',
    hireNow: 'এখনই নিয়োগ দিন',
    responseTime: 'রেসপন্স টাইম',
    statistics: 'পরিসংখ্যান',
    noReviews: 'এখনও কোন রিভিউ নেই',
    clientReviews: 'ক্লায়েন্ট রিভিউ',
    reviewsCount: 'রিভিউ',
    uploadVideoInterview: 'ভিডিও ইন্টারভিউ আপলোড করুন',
    videoUrl: 'ভিডিও URL',
    videoUrlPlaceholder: 'YouTube বা অন্য ভিডিও লিঙ্ক দিন...',
    save: 'সংরক্ষণ',
    cancel: 'বাতিল',
    noVideoYet: 'এখনও কোন ভিডিও ইন্টারভিউ নেই',
    uploadYourVideo: 'আপনার ভিডিও ইন্টারভিউ আপলোড করুন',
    children: 'সন্তান',
    previous: 'আগের',
    next: 'পরের',
    helpfulReview: 'সহায়ক রিভিউ',
  },
  en: {
    overview: 'Overview',
    about: 'About',
    reviews: 'Reviews',
    videoInterview: 'Video Interview',
    documents: 'Documents',
    editProfile: 'Edit Profile',
    uploadVideo: 'Upload Video',
    share: 'Share',
    download: 'Download',
    verified: 'Verified ✓',
    pending: 'Pending',
    notVerified: 'Not Verified',
    joinedOn: 'Joined',
    rating: 'Rating',
    totalEarnings: 'Total Earnings',
    totalSpent: 'Total Spent',
    credits: 'Credits',
    activeJobs: 'Active Jobs',
    completedJobs: 'Completed Jobs',
    subjects: 'Subjects',
    education: 'Education',
    experience: 'Experience',
    location: 'Location',
    bio: 'Bio',
    profileCompletion: 'Profile Completion',
    viewDashboard: 'View Dashboard',
    sendMessage: 'Send Message',
    hireNow: 'Hire Now',
    responseTime: 'Response Time',
    statistics: 'Statistics',
    noReviews: 'No reviews yet',
    clientReviews: 'Client Reviews',
    reviewsCount: 'Reviews',
    uploadVideoInterview: 'Upload Video Interview',
    videoUrl: 'Video URL',
    videoUrlPlaceholder: 'Enter YouTube or video link...',
    save: 'Save',
    cancel: 'Cancel',
    noVideoYet: 'No video interview yet',
    uploadYourVideo: 'Upload your video interview',
    children: 'Children',
    previous: 'Previous',
    next: 'Next',
    helpfulReview: 'Helpful review',
  }
};

export function UnifiedUserProfile({ 
  userType, 
  language, 
  profileData, 
  isOwnProfile = false,
  onUpdateProfile,
  setPage
}: UnifiedUserProfileProps) {
  const t = content[language];
  const [activeTab, setActiveTab] = useState('overview');
  const [currentReviewIndex, setCurrentReviewIndex] = useState(0);
  const [videoDialogOpen, setVideoDialogOpen] = useState(false);
  const [videoUrl, setVideoUrl] = useState(profileData.videoInterviewUrl || '');
  const reviewsScrollRef = useRef<HTMLDivElement>(null);

  // Auto scroll reviews
  const nextReview = () => {
    if (currentReviewIndex < profileData.reviews.length - 1) {
      setCurrentReviewIndex(currentReviewIndex + 1);
    } else {
      setCurrentReviewIndex(0); // Loop back
    }
  };

  const prevReview = () => {
    if (currentReviewIndex > 0) {
      setCurrentReviewIndex(currentReviewIndex - 1);
    } else {
      setCurrentReviewIndex(profileData.reviews.length - 1); // Loop to end
    }
  };

  const handleVideoUpload = () => {
    if (!videoUrl.trim()) {
      toast.error(language === 'bn' ? 'ভিডিও URL প্রদান করুন' : 'Please provide video URL');
      return;
    }
    
    if (onUpdateProfile) {
      onUpdateProfile({ videoInterviewUrl: videoUrl });
      toast.success(language === 'bn' ? 'ভিডিও আপলোড সফল হয়েছে!' : 'Video uploaded successfully!');
      setVideoDialogOpen(false);
    }
  };

  const getVerificationBadge = () => {
    if (profileData.verified) {
      return (
        <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white border-0">
          <CheckCircle className="w-3 h-3 mr-1" />
          {t.verified}
        </Badge>
      );
    }
    return (
      <Badge variant="outline" className="text-amber-600 border-amber-600">
        <Clock className="w-3 h-3 mr-1" />
        {t.pending}
      </Badge>
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Card */}
        <Card className="p-4 md:p-8 mb-6 bg-gradient-to-r from-emerald-600 to-teal-600 text-white border-0 shadow-xl">
          <div className="flex flex-col md:flex-row gap-4 md:gap-6 items-center md:items-start">
            {/* Avatar */}
            <div className="relative flex-shrink-0">
              <Avatar className="w-24 h-24 md:w-32 md:h-32 border-4 border-white shadow-2xl">
                {profileData.avatar ? (
                  <img src={profileData.avatar} alt={profileData.name} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                    <User className="w-12 h-12 md:w-16 md:h-16 text-white" />
                  </div>
                )}
              </Avatar>
              {profileData.verified && (
                <div className="absolute -bottom-2 -right-2 bg-green-500 rounded-full p-1.5 md:p-2 border-2 md:border-4 border-white">
                  <Shield className="w-4 h-4 md:w-5 md:h-5 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div className="flex-1 w-full">
              <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 md:gap-3 mb-3 md:mb-2">
                <h1 className="text-xl md:text-3xl font-bold text-center md:text-left">{profileData.name}</h1>
                {getVerificationBadge()}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2 md:gap-3 text-xs md:text-sm mb-4">
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Mail className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  <span className="truncate">{profileData.email}</span>
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Phone className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  {profileData.phone}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <MapPin className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  {profileData.location}
                </div>
                <div className="flex items-center justify-center md:justify-start gap-2">
                  <Calendar className="w-3 h-3 md:w-4 md:h-4 flex-shrink-0" />
                  {t.joinedOn}: {profileData.joinDate}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap justify-center md:justify-start gap-2">
                {isOwnProfile ? (
                  <>
                    <Button 
                      onClick={() => setPage && setPage(`${userType}-dashboard`)}
                      className="bg-white text-emerald-600 hover:bg-gray-100 text-xs md:text-sm"
                    >
                      <TrendingUp className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      {t.viewDashboard}
                    </Button>
                    <Button 
                      variant="outline" 
                      className="bg-white/10 text-white border-white hover:bg-white/20 text-xs md:text-sm"
                      onClick={() => {/* Edit profile logic */}}
                    >
                      <Edit className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      {t.editProfile}
                    </Button>
                  </>
                ) : (
                  <>
                    <Button className="bg-white text-emerald-600 hover:bg-gray-100 text-xs md:text-sm">
                      <MessageSquare className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                      {t.sendMessage}
                    </Button>
                    {userType === 'teacher' && (
                      <Button variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20 text-xs md:text-sm">
                        <Briefcase className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                        {t.hireNow}
                      </Button>
                    )}
                  </>
                )}
                <Button variant="outline" className="bg-white/10 text-white border-white hover:bg-white/20 text-xs md:text-sm">
                  <Share2 className="w-3 h-3 md:w-4 md:h-4 mr-1 md:mr-2" />
                  {t.share}
                </Button>
              </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 md:grid-cols-1 md:gap-4 text-center md:text-left w-full md:w-auto">
              <div className="bg-white/10 p-3 rounded-lg md:bg-transparent md:p-0">
                <div className="flex items-center justify-center md:justify-start gap-1 text-xl md:text-2xl font-bold">
                  <Star className="w-5 h-5 md:w-6 md:h-6 fill-yellow-300 text-yellow-300" />
                  {profileData.rating.toFixed(1)}
                </div>
                <div className="text-xs md:text-sm opacity-90">{t.rating}</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg md:bg-transparent md:p-0">
                <div className="text-xl md:text-2xl font-bold">{profileData.credits}</div>
                <div className="text-xs md:text-sm opacity-90">{t.credits}</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg md:bg-transparent md:p-0">
                <div className="text-xl md:text-2xl font-bold">{profileData.completedJobs}</div>
                <div className="text-xs md:text-sm opacity-90">{t.completedJobs}</div>
              </div>
              <div className="bg-white/10 p-3 rounded-lg md:bg-transparent md:p-0">
                <div className="text-xl md:text-2xl font-bold">
                  {userType === 'teacher' 
                    ? `৳${profileData.totalEarnings?.toLocaleString()}` 
                    : `৳${profileData.totalSpent?.toLocaleString()}`
                  }
                </div>
                <div className="text-sm opacity-90">
                  {userType === 'teacher' ? t.totalEarnings : t.totalSpent}
                </div>
              </div>
            </div>
          </div>

          {/* Profile Completion */}
          <div className="mt-6">
            <div className="flex justify-between items-center mb-2 text-sm">
              <span>{t.profileCompletion}</span>
              <span className="font-bold">{profileData.profileCompletion}%</span>
            </div>
            <Progress value={profileData.profileCompletion} className="h-2 bg-white/20" />
          </div>
        </Card>

        {/* Tabs Section */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2 md:grid-cols-4 bg-white shadow-md">
            <TabsTrigger value="overview" className="text-xs md:text-sm">{t.overview}</TabsTrigger>
            <TabsTrigger value="reviews" className="text-xs md:text-sm">
              <span className="hidden md:inline">{t.reviews} ({profileData.reviews.length})</span>
              <span className="md:hidden">{t.reviews}</span>
            </TabsTrigger>
            <TabsTrigger value="video" className="text-xs md:text-sm">
              <Video className="w-3 h-3 md:w-4 md:h-4 md:mr-2" />
              <span className="hidden md:inline">{t.videoInterview}</span>
            </TabsTrigger>
            <TabsTrigger value="documents" className="text-xs md:text-sm">{t.documents}</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview">
            <div className="grid md:grid-cols-3 gap-6">
              {/* About Section */}
              <Card className="md:col-span-2 p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-emerald-600" />
                  {t.about}
                </h3>
                <p className="text-gray-700 mb-6 leading-relaxed">{profileData.bio}</p>

                {userType === 'teacher' && (
                  <div className="space-y-4">
                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <GraduationCap className="w-4 h-4" />
                        {t.education}
                      </div>
                      <p className="font-medium">{profileData.education}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Award className="w-4 h-4" />
                        {t.experience}
                      </div>
                      <p className="font-medium">{profileData.experience}</p>
                    </div>

                    <div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <BookOpen className="w-4 h-4" />
                        {t.subjects}
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {profileData.subjects?.map((subject, idx) => (
                          <Badge key={idx} variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {profileData.mediums && profileData.mediums.length > 0 && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Globe2 className="w-4 h-4" />
                          {language === 'bn' ? 'মিডিয়াম' : 'Medium'}
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {profileData.mediums.map((medium, idx) => (
                            <Badge key={idx} variant="outline" className="bg-teal-50 text-teal-700 border-teal-200">
                              {medium}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    )}

                    {profileData.responseTime && (
                      <div>
                        <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                          <Clock className="w-4 h-4" />
                          {t.responseTime}
                        </div>
                        <p className="font-medium">{profileData.responseTime}</p>
                      </div>
                    )}
                  </div>
                )}

                {userType === 'guardian' && profileData.children && (
                  <div>
                    <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                      <Users className="w-4 h-4" />
                      {t.children}
                    </div>
                    <p className="font-medium">{profileData.children}</p>
                  </div>
                )}
              </Card>

              {/* Statistics Card */}
              <Card className="p-6">
                <h3 className="text-xl font-bold mb-4 flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-emerald-600" />
                  {t.statistics}
                </h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                    <span className="text-sm text-gray-600">{t.activeJobs}</span>
                    <span className="text-2xl font-bold text-emerald-600">{profileData.activeJobs}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg">
                    <span className="text-sm text-gray-600">{t.completedJobs}</span>
                    <span className="text-2xl font-bold text-blue-600">{profileData.completedJobs}</span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                    <span className="text-sm text-gray-600">{t.rating}</span>
                    <span className="text-2xl font-bold text-purple-600 flex items-center gap-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      {profileData.rating.toFixed(1)}
                    </span>
                  </div>
                  <div className="flex justify-between items-center p-3 bg-gradient-to-r from-amber-50 to-orange-50 rounded-lg">
                    <span className="text-sm text-gray-600">{t.credits}</span>
                    <span className="text-2xl font-bold text-amber-600">{profileData.credits}</span>
                  </div>
                </div>
              </Card>
            </div>
          </TabsContent>

          {/* Reviews Tab - Upwork Style Scrollable */}
          <TabsContent value="reviews">
            <Card className="p-4 md:p-6">
              <div className="flex items-center justify-between mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
                  <Quote className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                  <span className="hidden sm:inline">{t.clientReviews}</span>
                  <span className="sm:hidden">{t.reviews}</span>
                </h3>
                <Badge variant="outline" className="text-sm md:text-lg px-2 md:px-4 py-1 md:py-2">
                  {profileData.reviews.length} {t.reviewsCount}
                </Badge>
              </div>

              {profileData.reviews.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <MessageSquare className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                  <p>{t.noReviews}</p>
                </div>
              ) : (
                <div className="space-y-4">
                  {/* Current Review Display - Upwork Style */}
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentReviewIndex}
                      initial={{ opacity: 0, x: 100 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -100 }}
                      transition={{ duration: 0.3 }}
                      className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-xl p-4 md:p-6 border-2 border-emerald-200"
                    >
                      <div className="flex items-start gap-3 md:gap-4 mb-3 md:mb-4">
                        <Avatar className="w-10 h-10 md:w-12 md:h-12 border-2 border-emerald-300 flex-shrink-0">
                          {profileData.reviews[currentReviewIndex].guardianAvatar ? (
                            <img 
                              src={profileData.reviews[currentReviewIndex].guardianAvatar} 
                              alt={profileData.reviews[currentReviewIndex].guardianName} 
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
                              <User className="w-5 h-5 md:w-6 md:h-6 text-white" />
                            </div>
                          )}
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <h4 className="font-bold text-gray-900 text-sm md:text-base truncate">
                            {profileData.reviews[currentReviewIndex].guardianName}
                          </h4>
                          <div className="flex flex-wrap items-center gap-1 md:gap-2 mt-1">
                            <div className="flex items-center">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`w-3 h-3 md:w-4 md:h-4 ${
                                    i < profileData.reviews[currentReviewIndex].rating
                                      ? 'fill-yellow-400 text-yellow-400'
                                      : 'text-gray-300'
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-xs md:text-sm text-gray-600">
                              {profileData.reviews[currentReviewIndex].rating.toFixed(1)}
                            </span>
                            <span className="text-xs text-gray-400">•</span>
                            <span className="text-xs md:text-sm text-gray-600">
                              {profileData.reviews[currentReviewIndex].date}
                            </span>
                          </div>
                        </div>
                      </div>

                      {profileData.reviews[currentReviewIndex].subject && (
                        <Badge className="mb-3 bg-emerald-100 text-emerald-700 border-emerald-300 text-xs md:text-sm">
                          {profileData.reviews[currentReviewIndex].subject}
                          {profileData.reviews[currentReviewIndex].duration && 
                            ` • ${profileData.reviews[currentReviewIndex].duration}`
                          }
                        </Badge>
                      )}

                      <p className="text-gray-700 leading-relaxed text-sm md:text-base">
                        "{profileData.reviews[currentReviewIndex].comment}"
                      </p>

                      <div className="flex items-center gap-2 mt-3 md:mt-4 text-xs md:text-sm text-gray-500">
                        <ThumbsUp className="w-3 h-3 md:w-4 md:h-4" />
                        <span>{t.helpfulReview}</span>
                      </div>
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Controls */}
                  {profileData.reviews.length > 1 && (
                    <div className="flex items-center justify-between mt-4 md:mt-6 gap-2">
                      <Button
                        variant="outline"
                        onClick={prevReview}
                        size="sm"
                        className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
                      >
                        <ChevronLeft className="w-3 h-3 md:w-4 md:h-4" />
                        <span className="hidden sm:inline">{t.previous}</span>
                      </Button>

                      <div className="flex items-center gap-1.5 md:gap-2">
                        {profileData.reviews.map((_, idx) => (
                          <button
                            key={idx}
                            onClick={() => setCurrentReviewIndex(idx)}
                            className={`w-1.5 h-1.5 md:w-2 md:h-2 rounded-full transition-all ${
                              idx === currentReviewIndex
                                ? 'bg-emerald-600 w-6 md:w-8'
                                : 'bg-gray-300 hover:bg-gray-400'
                            }`}
                          />
                        ))}
                      </div>

                      <Button
                        variant="outline"
                        onClick={nextReview}
                        size="sm"
                        className="flex items-center gap-1 md:gap-2 text-xs md:text-sm"
                      >
                        <span className="hidden sm:inline">{t.next}</span>
                        <ChevronRight className="w-3 h-3 md:w-4 md:h-4" />
                      </Button>
                    </div>
                  )}

                  {/* All Reviews List - Scrollable */}
                  <div className="mt-6 md:mt-8">
                    <h4 className="font-bold mb-3 md:mb-4 text-gray-700 text-sm md:text-base">
                      {language === 'bn' ? 'সব রিভিউ' : 'All Reviews'}
                    </h4>
                    <ScrollArea className="h-64 md:h-96 pr-2 md:pr-4">
                      <div className="space-y-3 md:space-y-4">
                        {profileData.reviews.map((review, idx) => (
                          <motion.div
                            key={review.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: idx * 0.1 }}
                            className="bg-white rounded-lg p-3 md:p-4 border border-gray-200 hover:border-emerald-300 transition-all cursor-pointer"
                            onClick={() => setCurrentReviewIndex(idx)}
                          >
                            <div className="flex items-start gap-2 md:gap-3">
                              <Avatar className="w-8 h-8 md:w-10 md:h-10 flex-shrink-0">
                                {review.guardianAvatar ? (
                                  <img src={review.guardianAvatar} alt={review.guardianName} className="w-full h-full object-cover" />
                                ) : (
                                  <div className="w-full h-full bg-gradient-to-br from-blue-400 to-indigo-400 flex items-center justify-center">
                                    <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
                                  </div>
                                )}
                              </Avatar>
                              <div className="flex-1 min-w-0">
                                <div className="flex items-center justify-between mb-1 gap-2">
                                  <h5 className="font-semibold text-xs md:text-sm truncate">{review.guardianName}</h5>
                                  <div className="flex items-center gap-1 flex-shrink-0">
                                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                                    <span className="text-xs md:text-sm font-medium">{review.rating.toFixed(1)}</span>
                                  </div>
                                </div>
                                <p className="text-xs text-gray-500 mb-1 md:mb-2">{review.date}</p>
                                <p className="text-xs md:text-sm text-gray-700 line-clamp-2">{review.comment}</p>
                              </div>
                            </div>
                          </motion.div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Video Interview Tab */}
          <TabsContent value="video">
            <Card className="p-4 md:p-6">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 md:mb-6">
                <h3 className="text-lg md:text-xl font-bold flex items-center gap-2">
                  <Video className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                  {t.videoInterview}
                </h3>
                {isOwnProfile && (
                  <Button onClick={() => setVideoDialogOpen(true)} className="bg-emerald-600 hover:bg-emerald-700 text-xs md:text-sm w-full sm:w-auto">
                    <Upload className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                    {t.uploadVideo}
                  </Button>
                )}
              </div>

              {profileData.videoInterviewUrl ? (
                <div className="aspect-video bg-black rounded-lg overflow-hidden">
                  <iframe
                    src={profileData.videoInterviewUrl}
                    className="w-full h-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <div className="aspect-video bg-gradient-to-br from-gray-100 to-gray-200 rounded-lg flex flex-col items-center justify-center text-gray-500 p-4">
                  <Video className="w-12 h-12 md:w-16 md:h-16 mb-3 md:mb-4 text-gray-400" />
                  <p className="text-sm md:text-lg font-medium mb-2 text-center">{t.noVideoYet}</p>
                  {isOwnProfile && (
                    <Button 
                      variant="outline" 
                      onClick={() => setVideoDialogOpen(true)}
                      className="mt-3 md:mt-4 text-xs md:text-sm"
                    >
                      <Upload className="w-3 h-3 md:w-4 md:h-4 mr-2" />
                      {t.uploadYourVideo}
                    </Button>
                  )}
                </div>
              )}
            </Card>
          </TabsContent>

          {/* Documents Tab */}
          <TabsContent value="documents">
            <Card className="p-4 md:p-6">
              <h3 className="text-lg md:text-xl font-bold mb-4 md:mb-6 flex items-center gap-2">
                <FileText className="w-4 h-4 md:w-5 md:h-5 text-emerald-600" />
                {t.documents}
              </h3>
              
              {profileData.documents && profileData.documents.length > 0 ? (
                <div className="grid gap-3 md:grid-cols-2 md:gap-4">
                  {profileData.documents.map((doc, idx) => (
                    <div key={idx} className="flex items-center gap-2 md:gap-3 p-3 md:p-4 bg-gray-50 rounded-lg border border-gray-200 hover:border-emerald-300 transition-all">
                      <FileText className="w-6 h-6 md:w-8 md:h-8 text-emerald-600 flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <p className="font-medium text-xs md:text-sm truncate">{doc}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="flex-shrink-0">
                        <Download className="w-3 h-3 md:w-4 md:h-4" />
                      </Button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 md:py-12 text-gray-500">
                  <FileText className="w-12 h-12 md:w-16 md:h-16 mx-auto mb-3 md:mb-4 text-gray-300" />
                  <p className="text-sm md:text-base">
                    {language === 'bn' ? 'এখনো কোন ডকুমেন্ট আপলোড করা হয়নি' : 'No documents uploaded yet'}
                  </p>
                </div>
              )}
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Video Upload Dialog */}
      <Dialog open={videoDialogOpen} onOpenChange={setVideoDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.uploadVideoInterview}</DialogTitle>
            <DialogDescription>আপনার ভিডিও ইন্টারভিউ আপলোড করুন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <Label htmlFor="videoUrl">{t.videoUrl}</Label>
              <Input
                id="videoUrl"
                value={videoUrl}
                onChange={(e) => setVideoUrl(e.target.value)}
                placeholder={t.videoUrlPlaceholder}
                className="mt-2"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setVideoDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleVideoUpload} className="bg-emerald-600 hover:bg-emerald-700">
              {t.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
