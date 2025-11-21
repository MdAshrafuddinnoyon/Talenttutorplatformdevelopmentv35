import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar } from './ui/avatar';
import { 
  User, Mail, Phone, MapPin, Calendar, Award, Star, 
  CheckCircle, XCircle, Clock, Edit, Share2, Download,
  Briefcase, GraduationCap, Heart, Shield, TrendingUp,
  FileText, Video, MessageSquare, Settings, Camera,
  Wallet, CreditCard, History, Target, BookOpen
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface ModernUserProfileProps {
  userId: string;
  userType: 'teacher' | 'guardian' | 'student' | 'donor';
  language: 'bn' | 'en';
  setPage: (page: string) => void;
  isOwnProfile?: boolean;
}

const content = {
  bn: {
    overview: 'সংক্ষিপ্ত',
    about: 'পরিচিতি',
    activity: 'কার্যক্রম',
    reviews: 'রিভিউ',
    documents: 'নথিপত্র',
    editProfile: 'প্রোফাইল এডিট',
    share: 'শেয়ার',
    download: 'ডাউনলোড',
    verified: 'ভেরিফাইড',
    pending: 'অপেক্ষমাণ',
    notVerified: 'ভেরিফাইড নয়',
    joinedOn: 'যোগদান',
    rating: 'রেটিং',
    totalEarnings: 'মোট আয়',
    totalSpent: 'মোট ব্যয়',
    totalDonations: 'মোট দান',
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
    donate: 'দান করুন',
    responseTime: 'রেসপন্স টাইম',
    availability: 'সময়সূচী',
    badges: 'ব্যাজ',
    statistics: 'পরিসংখ্যান',
    recentActivity: 'সাম্প্রতিক কার্যক্রম',
  },
  en: {
    overview: 'Overview',
    about: 'About',
    activity: 'Activity',
    reviews: 'Reviews',
    documents: 'Documents',
    editProfile: 'Edit Profile',
    share: 'Share',
    download: 'Download',
    verified: 'Verified',
    pending: 'Pending',
    notVerified: 'Not Verified',
    joinedOn: 'Joined',
    rating: 'Rating',
    totalEarnings: 'Total Earnings',
    totalSpent: 'Total Spent',
    totalDonations: 'Total Donations',
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
    donate: 'Donate',
    responseTime: 'Response Time',
    availability: 'Availability',
    badges: 'Badges',
    statistics: 'Statistics',
    recentActivity: 'Recent Activity',
  }
};

export function ModernUserProfile({ userId, userType, language, setPage, isOwnProfile = false }: ModernUserProfileProps) {
  const t = content[language];
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchUserData();
  }, [userId]);

  const fetchUserData = async () => {
    setLoading(true);
    try {
      // Mock data for now - replace with actual API call
      const mockData = {
        id: userId,
        name: 'জনাব করিম',
        email: 'karim@example.com',
        phone: '01712345678',
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent('জনাব করিম')}&background=6366f1&color=fff&size=200`,
        coverImage: 'https://images.unsplash.com/photo-1557683316-973673baf926?w=1200',
        verified: true,
        joinDate: '2024-01-15',
        rating: 4.8,
        reviewsCount: 45,
        location: 'ঢাকা, বাংলাদেশ',
        bio: 'একজন অভিজ্ঞ শিক্ষক যিনি গণিত এবং পদার্থবিজ্ঞানে বিশেষজ্ঞ। ১০+ বছরের শিক্ষাদানের অভিজ্ঞতা।',
        subjects: ['গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন'],
        education: 'বিএসসি (সম্মান) - ঢাকা বিশ্ববিদ্যালয়',
        experience: '১০ বছর',
        credits: 150,
        totalEarnings: 45000,
        totalSpent: 12000,
        totalDonations: 25000,
        activeJobs: 5,
        completedJobs: 78,
        profileCompletion: 95,
        responseTime: '২ ঘন্টা',
        availability: 'সপ্তাহে ৫ দিন',
        badges: [
          { name: 'Top Rated', icon: Star, color: 'text-yellow-500' },
          { name: 'Verified', icon: CheckCircle, color: 'text-blue-500' },
          { name: 'Expert', icon: Award, color: 'text-purple-500' },
        ],
        stats: [
          { label: 'মোট ছাত্র', value: 120 },
          { label: 'সফলতার হার', value: '95%' },
          { label: 'পুনরায় নিয়োগ', value: '85%' },
        ],
        recentActivity: [
          { action: 'নতুন রিভিউ পেয়েছেন', time: '২ ঘন্টা আগে', icon: Star },
          { action: 'প্রোফাইল আপডেট করেছেন', time: '১ দিন আগে', icon: Edit },
          { action: 'নতুন কাজ সম্পন্ন করেছেন', time: '৩ দিন আগে', icon: CheckCircle },
        ],
      };
      
      setUserData(mockData);
    } catch (error) {
      console.error('Error fetching user data:', error);
      toast.error('প্রোফাইল লোড করতে সমস্যা হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = () => {
    const url = `${window.location.origin}/${userType}-profile/${userId}`;
    navigator.clipboard.writeText(url);
    toast.success('প্রোফাইল লিংক কপি হয়েছে!');
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">প্রোফাইল লোড হচ্ছে...</p>
        </div>
      </div>
    );
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <XCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
          <h2 className="text-2xl text-gray-900 mb-2">প্রোফাইল পাওয়া যায়নি</h2>
          <p className="text-gray-600 mb-4">দুঃখিত, এই প্রোফাইলটি খুঁজে পাওয়া যায়নি।</p>
          <Button onClick={() => setPage('home')}>হোমে ফিরুন</Button>
        </Card>
      </div>
    );
  }

  const getDashboardPage = () => {
    switch (userType) {
      case 'teacher': return 'teacher-dashboard';
      case 'guardian': return 'guardian-dashboard';
      case 'student': return 'student-dashboard';
      case 'donor': return 'donor-dashboard';
      default: return 'home';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-purple-50">
      {/* Cover Image */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-purple-600 via-pink-500 to-red-500 overflow-hidden">
        {userData.coverImage && (
          <img 
            src={userData.coverImage} 
            alt="Cover" 
            className="w-full h-full object-cover opacity-50"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
        
        {/* Cover Actions */}
        <div className="absolute top-4 right-4 flex gap-2">
          {isOwnProfile && (
            <Button 
              variant="outline" 
              size="sm"
              className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
              onClick={() => setPage('settings')}
            >
              <Camera className="w-4 h-4 mr-2" />
              কভার পরিবর্তন
            </Button>
          )}
          <Button 
            variant="outline" 
            size="sm"
            className="bg-white/20 backdrop-blur-sm border-white/30 text-white hover:bg-white/30"
            onClick={handleShare}
          >
            <Share2 className="w-4 h-4 mr-2" />
            {t.share}
          </Button>
        </div>
      </div>

      {/* Profile Header */}
      <div className="container mx-auto px-4 -mt-20 relative z-10">
        <Card className="p-6 shadow-2xl border-2 border-white">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Avatar Section */}
            <div className="flex-shrink-0">
              <div className="relative">
                <Avatar className="w-32 h-32 md:w-40 md:h-40 border-4 border-white shadow-xl">
                  <img src={userData.avatar} alt={userData.name} className="w-full h-full object-cover" />
                </Avatar>
                {userData.verified && (
                  <div className="absolute bottom-2 right-2 w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center border-4 border-white shadow-lg">
                    <CheckCircle className="w-6 h-6 text-white" />
                  </div>
                )}
                {isOwnProfile && (
                  <Button
                    size="sm"
                    className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2"
                    onClick={() => setPage('settings')}
                  >
                    <Camera className="w-4 h-4" />
                  </Button>
                )}
              </div>
            </div>

            {/* Info Section */}
            <div className="flex-1 min-w-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h1 className="text-3xl text-gray-900">
                      {userData.name}
                    </h1>
                    {userData.verified ? (
                      <Badge className="bg-blue-500">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {t.verified}
                      </Badge>
                    ) : (
                      <Badge variant="outline" className="border-orange-500 text-orange-600">
                        <Clock className="w-3 h-3 mr-1" />
                        {t.pending}
                      </Badge>
                    )}
                  </div>
                  
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-3">
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4" />
                      {userData.location}
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {t.joinedOn}: {new Date(userData.joinDate).toLocaleDateString('bn-BD')}
                    </div>
                    {userData.rating && (
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span>{userData.rating}</span>
                        <span className="text-gray-400">({userData.reviewsCount} রিভিউ)</span>
                      </div>
                    )}
                  </div>

                  {/* Badges */}
                  <div className="flex flex-wrap gap-2 mb-3">
                    {userData.badges.map((badge: any, index: number) => (
                      <div 
                        key={index}
                        className="flex items-center gap-1 px-3 py-1 bg-gray-100 rounded-full text-sm"
                      >
                        <badge.icon className={`w-4 h-4 ${badge.color}`} />
                        <span className="text-gray-700">{badge.name}</span>
                      </div>
                    ))}
                  </div>

                  {/* Profile Completion */}
                  {isOwnProfile && (
                    <div className="mt-3">
                      <div className="flex items-center justify-between text-sm mb-1">
                        <span className="text-gray-600">{t.profileCompletion}</span>
                        <span className="font-semibold text-purple-600">{userData.profileCompletion}%</span>
                      </div>
                      <Progress value={userData.profileCompletion} className="h-2" />
                    </div>
                  )}
                </div>

                {/* Action Buttons */}
                <div className="flex flex-wrap gap-2">
                  {isOwnProfile ? (
                    <>
                      <Button onClick={() => setPage(getDashboardPage())}>
                        <Briefcase className="w-4 h-4 mr-2" />
                        {t.viewDashboard}
                      </Button>
                      <Button variant="outline" onClick={() => setPage('settings')}>
                        <Edit className="w-4 h-4 mr-2" />
                        {t.editProfile}
                      </Button>
                    </>
                  ) : (
                    <>
                      <Button>
                        <MessageSquare className="w-4 h-4 mr-2" />
                        {t.sendMessage}
                      </Button>
                      {userType === 'teacher' && (
                        <Button variant="outline">
                          <Briefcase className="w-4 h-4 mr-2" />
                          {t.hireNow}
                        </Button>
                      )}
                      {userType === 'donor' && (
                        <Button variant="outline">
                          <Heart className="w-4 h-4 mr-2" />
                          {t.donate}
                        </Button>
                      )}
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 mt-6 pt-6 border-t">
            {userType === 'teacher' && (
              <>
                <StatCard icon={Wallet} label={t.totalEarnings} value={`৳${userData.totalEarnings?.toLocaleString()}`} color="text-green-500" />
                <StatCard icon={CreditCard} label={t.credits} value={userData.credits} color="text-blue-500" />
                <StatCard icon={Briefcase} label={t.activeJobs} value={userData.activeJobs} color="text-purple-500" />
                <StatCard icon={CheckCircle} label={t.completedJobs} value={userData.completedJobs} color="text-emerald-500" />
                <StatCard icon={Clock} label={t.responseTime} value={userData.responseTime} color="text-orange-500" />
                <StatCard icon={Star} label={t.rating} value={userData.rating} color="text-yellow-500" />
              </>
            )}
            {userType === 'guardian' && (
              <>
                <StatCard icon={Wallet} label={t.totalSpent} value={`৳${userData.totalSpent?.toLocaleString()}`} color="text-red-500" />
                <StatCard icon={CreditCard} label={t.credits} value={userData.credits} color="text-blue-500" />
                <StatCard icon={Briefcase} label={t.activeJobs} value={userData.activeJobs} color="text-purple-500" />
                <StatCard icon={CheckCircle} label={t.completedJobs} value={userData.completedJobs} color="text-emerald-500" />
              </>
            )}
            {userType === 'donor' && (
              <>
                <StatCard icon={Heart} label={t.totalDonations} value={`৳${userData.totalDonations?.toLocaleString()}`} color="text-red-500" />
                <StatCard icon={TrendingUp} label="দান সংখ্যা" value={userData.donationsCount || 0} color="text-green-500" />
                <StatCard icon={Award} label="স্তর" value={userData.tier || 'Bronze'} color="text-yellow-500" />
              </>
            )}
          </div>
        </Card>

        {/* Main Content Tabs */}
        <Card className="mt-6 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab}>
            <TabsList className="grid w-full grid-cols-4 mb-6">
              <TabsTrigger value="overview">{t.overview}</TabsTrigger>
              <TabsTrigger value="about">{t.about}</TabsTrigger>
              <TabsTrigger value="activity">{t.activity}</TabsTrigger>
              <TabsTrigger value="reviews">{t.reviews}</TabsTrigger>
            </TabsList>

            <TabsContent value="overview">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Bio */}
                <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50">
                  <h3 className="text-lg text-gray-900 mb-3 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-purple-500" />
                    {t.bio}
                  </h3>
                  <p className="text-gray-700 leading-relaxed">{userData.bio}</p>
                </Card>

                {/* Statistics */}
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-cyan-50">
                  <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5 text-blue-500" />
                    {t.statistics}
                  </h3>
                  <div className="space-y-3">
                    {userData.stats.map((stat: any, index: number) => (
                      <div key={index} className="flex justify-between items-center">
                        <span className="text-gray-600">{stat.label}</span>
                        <span className="text-lg text-gray-900">{stat.value}</span>
                      </div>
                    ))}
                  </div>
                </Card>

                {/* Recent Activity */}
                <Card className="p-6 md:col-span-2 bg-gradient-to-br from-emerald-50 to-teal-50">
                  <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
                    <History className="w-5 h-5 text-emerald-500" />
                    {t.recentActivity}
                  </h3>
                  <div className="space-y-3">
                    {userData.recentActivity.map((activity: any, index: number) => (
                      <div key={index} className="flex items-center gap-3 p-3 bg-white rounded-lg">
                        <div className="w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center">
                          <activity.icon className="w-5 h-5 text-emerald-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm text-gray-900">{activity.action}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="about">
              <div className="space-y-6">
                <InfoRow icon={BookOpen} label={t.subjects} value={userData.subjects?.join(', ')} />
                <InfoRow icon={GraduationCap} label={t.education} value={userData.education} />
                <InfoRow icon={Briefcase} label={t.experience} value={userData.experience} />
                <InfoRow icon={MapPin} label={t.location} value={userData.location} />
                <InfoRow icon={Mail} label="ইমেইল" value={userData.email} />
                <InfoRow icon={Phone} label="ফোন" value={userData.phone} />
                <InfoRow icon={Clock} label={t.availability} value={userData.availability} />
              </div>
            </TabsContent>

            <TabsContent value="activity">
              <div className="text-center py-12 text-gray-500">
                <History className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>বিস্তারিত কার্যক্রম শীঘ্রই আসছে</p>
              </div>
            </TabsContent>

            <TabsContent value="reviews">
              <div className="text-center py-12 text-gray-500">
                <Star className="w-16 h-16 mx-auto mb-4 opacity-50" />
                <p>রিভিউ সিস্টেম শীঘ্রই আসছে</p>
              </div>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}

function StatCard({ icon: Icon, label, value, color }: any) {
  return (
    <div className="text-center">
      <Icon className={`w-6 h-6 mx-auto mb-2 ${color}`} />
      <p className="text-2xl text-gray-900 mb-1">{value}</p>
      <p className="text-xs text-gray-500">{label}</p>
    </div>
  );
}

function InfoRow({ icon: Icon, label, value }: any) {
  return (
    <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-lg">
      <div className="w-10 h-10 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
        <Icon className="w-5 h-5 text-purple-600" />
      </div>
      <div className="flex-1">
        <p className="text-sm text-gray-500 mb-1">{label}</p>
        <p className="text-gray-900">{value || 'তথ্য নেই'}</p>
      </div>
    </div>
  );
}
