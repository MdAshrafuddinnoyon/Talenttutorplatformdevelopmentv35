import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Progress } from '../components/ui/progress';
import { 
  ArrowLeft, 
  MapPin, 
  Star, 
  Award, 
  BookOpen, 
  MessageSquare, 
  Video, 
  Share2, 
  Heart,
  TrendingUp,
  CheckCircle,
  DollarSign,
  Clock,
  Calendar,
  GraduationCap,
  CreditCard,
  Briefcase,
  Users,
  Globe,
  Mail,
  Phone,
  Verified
} from 'lucide-react';
import { getTeacherById } from '../utils/teachersData';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';
import { toast } from 'sonner@2.0.3';
import { canContactUser, getActionErrorMessage, type UserRole, type User } from '../utils/authGuard';
import { TalentTutorLogo } from '../components/TalentTutorLogo';

interface TeacherProfilePageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  teacherId?: string;
  userRole?: 'guardian' | 'teacher' | 'student' | 'donor' | 'admin' | null;
  currentUser?: User | null;
  isAuthenticated?: boolean;
  onLogin?: (type: UserRole) => void;
}

const content = {
  bn: {
    backToSearch: 'শিক্ষক খুঁজুন পেজে ফিরুন',
    verified: 'যাচাইকৃত',
    topRated: 'শীর্ষ রেটেড',
    perHour: '/ঘণ্টা',
    contact: 'যোগাযোগ',
    sendProposal: 'প্রস্তাব পাঠান',
    message: 'মেসেজ',
    saveProfile: 'সংরক্ষণ',
    share: 'শেয়ার',
    jobSuccess: 'জব সাকসেস',
    totalEarnings: 'মোট আয়',
    totalJobs: 'মোট চাকরি',
    completedJobs: 'সম্পন্ন',
    ongoingJobs: 'চলমান',
    responseTime: 'রেসপন্স টাইম',
    availability: 'প্রাপ্যতা',
    memberSince: 'সদস্য হয়েছেন',
    lastActive: 'শেষ সক্রিয়',
    overview: 'সারসংক্ষেপ',
    workHistory: 'কাজের ইতিহাস',
    portfolio: 'পোর্টফোলিও',
    reviews: 'রিভিউ',
    education: 'শিক্ষাগত যোগ্যতা',
    certifications: 'সার্টিফিকেশন',
    skills: 'দক্ষতা',
    subjects: 'বিষয়সমূহ',
    classes: 'শ্রেণী',
    languages: 'ভাষা',
    experience: 'অভিজ্ঞতা',
    years: 'বছর',
    bio: 'সম্পর্কে',
    teachingApproach: 'পড়ানোর পদ্ধতি',
    location: 'ঠিকানা',
    hourlyRate: 'ঘণ্টা প্রতি রেট',
    totalReviews: 'মোট রিভিউ',
    rating: 'রেটিং',
    viewAll: 'সব দেখুন',
    client: 'ক্লায়েন্ট',
    duration: 'সময়কাল',
    earnings: 'আয়',
    available: 'Available',
    busy: 'Busy',
    offline: 'Offline',
    videoIntro: 'ভিডিও পরিচিতি',
    contactInfo: 'যোগাযোগ তথ্য',
  },
  en: {
    backToSearch: 'Back to Find Teachers',
    verified: 'Verified',
    topRated: 'Top Rated',
    perHour: '/hour',
    contact: 'Contact',
    sendProposal: 'Send Proposal',
    message: 'Message',
    saveProfile: 'Save',
    share: 'Share',
    jobSuccess: 'Job Success',
    totalEarnings: 'Total Earnings',
    totalJobs: 'Total Jobs',
    completedJobs: 'Completed',
    ongoingJobs: 'Ongoing',
    responseTime: 'Response Time',
    availability: 'Availability',
    memberSince: 'Member Since',
    lastActive: 'Last Active',
    overview: 'Overview',
    workHistory: 'Work History',
    portfolio: 'Portfolio',
    reviews: 'Reviews',
    education: 'Education',
    certifications: 'Certifications',
    skills: 'Skills',
    subjects: 'Subjects',
    classes: 'Classes',
    languages: 'Languages',
    experience: 'Experience',
    years: 'years',
    bio: 'About',
    teachingApproach: 'Teaching Approach',
    location: 'Location',
    hourlyRate: 'Hourly Rate',
    totalReviews: 'Total Reviews',
    rating: 'Rating',
    viewAll: 'View All',
    client: 'Client',
    duration: 'Duration',
    earnings: 'Earnings',
    available: 'Available',
    busy: 'Busy',
    offline: 'Offline',
    videoIntro: 'Video Introduction',
    contactInfo: 'Contact Information',
  },
};

export function TeacherProfilePage({ 
  language, 
  setLanguage, 
  setPage, 
  teacherId,
  userRole,
  currentUser,
  isAuthenticated,
  onLogin
}: TeacherProfilePageProps) {
  const t = content[language];
  const [isSaved, setIsSaved] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  // Get teacher data
  const teacher = teacherId ? getTeacherById(teacherId) : getTeacherById('1');
  
  if (!teacher) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50 flex items-center justify-center">
        <Card className="p-8 text-center">
          <h3 className="text-gray-900 mb-4 font-[Noto_Serif_Bengali]">শিক্ষক পাওয়া যায়নি</h3>
          <Button onClick={() => setPage('find-teachers')} className="font-[Noto_Serif_Bengali]">
            শিক্ষক খুঁজুন
          </Button>
        </Card>
      </div>
    );
  }

  const handleSave = () => {
    setIsSaved(!isSaved);
    toast.success(isSaved ? 'সংরক্ষণ তালিকা থেকে সরানো হয়েছে' : 'সংরক্ষণ করা হয়েছে');
  };

  /**
   * Handle contact with authentication guard
   */
  const handleContactTeacher = () => {
    const permission = canContactUser(userRole, 'teacher', currentUser || null);
    
    if (!permission.allowed) {
      const errorMessage = getActionErrorMessage(permission.reason!, language);
      toast.error(errorMessage);
      
      if (permission.reason === 'auth_required') {
        setShowAuthDialog(true);
      } else if (permission.reason === 'profile_incomplete') {
        if (userRole === 'guardian') {
          setPage('guardian-profile');
        } else if (userRole === 'teacher') {
          setPage('teacher-profile');
        }
      } else if (permission.reason === 'insufficient_credits') {
        setPage('credit-purchase');
      }
      
      return;
    }
    
    // Permission granted - proceed with contact
    toast.success(language === 'bn' ? 'চ্যাট খোলা হচ্ছে...' : 'Opening chat...');
    // Here you would open the chat dialog
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'bg-green-500';
      case 'busy':
        return 'bg-yellow-500';
      default:
        return 'bg-gray-500';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return t.available;
      case 'busy':
        return t.busy;
      default:
        return t.offline;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      {/* Simple Header */}
      <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <TalentTutorLogo 
              size="md" 
              showText={true} 
              showSubtitle={false}
              onClick={() => setPage('home')}
              language={language}
            />
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="sm" onClick={handleSave}>
                <Heart className={`w-4 h-4 mr-2 ${isSaved ? 'fill-current text-red-600' : ''}`} />
                {t.saveProfile}
              </Button>
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                {t.share}
              </Button>
              <Button variant="outline" onClick={() => setPage('find-teachers')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToSearch}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Sidebar - Teacher Info Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 lg:sticky lg:top-24">
              {/* Photo */}
              <div className="relative mb-6">
                <img 
                  src={teacher.photo} 
                  alt={teacher.name}
                  className="w-full aspect-square object-cover rounded-2xl shadow-lg"
                />
                {teacher.verified && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <Verified className="w-4 h-4 fill-current" />
                    <span className="text-sm">{t.verified}</span>
                  </div>
                )}
                {teacher.topRated && (
                  <div className="absolute top-14 right-4 bg-yellow-500 text-white px-3 py-1.5 rounded-full flex items-center gap-1 shadow-lg">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">{t.topRated}</span>
                  </div>
                )}
                <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-3 rounded-lg shadow-lg">
                  <div className="flex items-center gap-2 mb-1">
                    <div className={`w-3 h-3 rounded-full ${getAvailabilityColor(teacher.availability)}`}></div>
                    <span className="text-sm font-medium">{getAvailabilityText(teacher.availability)}</span>
                  </div>
                  <div className="text-xs text-gray-600">{teacher.lastActive}</div>
                </div>
              </div>

              {/* Name & Title */}
              <h2 className="text-gray-900 mb-2">{teacher.name}</h2>
              <p className="text-teal-600 mb-4">{teacher.title}</p>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin className="w-4 h-4" />
                <span>{teacher.location}</span>
              </div>

              {/* Hourly Rate */}
              <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-4 rounded-xl mb-6 border-2 border-teal-200">
                <div className="text-sm text-gray-600 mb-1">{t.hourlyRate}</div>
                <div className="text-3xl font-bold text-teal-700">
                  ৳{teacher.hourlyRate.min}-৳{teacher.hourlyRate.max}
                </div>
                <div className="text-sm text-gray-600">{t.perHour}</div>
              </div>

              {/* Key Stats */}
              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm">{t.rating}</span>
                  </div>
                  <span className="font-bold text-gray-900">{teacher.rating}/5.0</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600">
                    <TrendingUp className="w-4 h-4 text-green-600" />
                    <span className="text-sm">{t.jobSuccess}</span>
                  </div>
                  <span className="font-bold text-green-600">{teacher.jobSuccess}%</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600">
                    <DollarSign className="w-4 h-4 text-teal-600" />
                    <span className="text-sm">{t.totalEarnings}</span>
                  </div>
                  <span className="font-bold text-teal-600">৳{teacher.totalEarnings.toLocaleString()}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600">
                    <CheckCircle className="w-4 h-4 text-blue-600" />
                    <span className="text-sm">{t.completedJobs}</span>
                  </div>
                  <span className="font-bold text-blue-600">{teacher.completedJobs}/{teacher.totalJobs}</span>
                </div>
                <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Clock className="w-4 h-4 text-[#10B981]" />
                    <span className="text-sm">{t.responseTime}</span>
                  </div>
                  <span className="font-bold text-[#10B981]">{teacher.responseTime}</span>
                </div>
              </div>

              {/* Member Since */}
              <div className="text-sm text-gray-600 mb-6 flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                {t.memberSince}: {teacher.memberSince}
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-md"
                  size="lg"
                  onClick={handleContactTeacher}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t.sendProposal}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-teal-600 text-teal-700 hover:bg-teal-50"
                  size="lg"
                  onClick={handleContactTeacher}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t.message}
                </Button>
              </div>
            </Card>
          </div>

          {/* Main Content - Tabs */}
          <div className="lg:col-span-2">
            <Card className="p-6 lg:p-8">
              <Tabs defaultValue="overview" className="w-full">
                <TabsList className="grid w-full grid-cols-4 mb-6">
                  <TabsTrigger value="overview">{t.overview}</TabsTrigger>
                  <TabsTrigger value="work">{t.workHistory}</TabsTrigger>
                  <TabsTrigger value="portfolio">{t.portfolio}</TabsTrigger>
                  <TabsTrigger value="reviews">{t.reviews}</TabsTrigger>
                </TabsList>

                {/* Overview Tab */}
                <TabsContent value="overview" className="space-y-6">
                  {/* Introduction Video */}
                  {teacher.videoUrl && (
                    <div>
                      <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                        <Video className="w-5 h-5 text-emerald-600" />
                        {t.videoIntro}
                      </h3>
                      <div className="aspect-video rounded-lg overflow-hidden bg-gray-100 shadow-lg">
                        <iframe
                          width="100%"
                          height="100%"
                          src={teacher.videoUrl.replace('watch?v=', 'embed/')}
                          title="Teacher Introduction Video"
                          frameBorder="0"
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        ></iframe>
                      </div>
                    </div>
                  )}

                  {/* Bio */}
                  <div>
                    <h3 className="text-gray-900 mb-3">{t.bio}</h3>
                    <p className="text-gray-700 leading-relaxed">{teacher.bio}</p>
                  </div>

                  {/* Skills */}
                  <div>
                    <h3 className="text-gray-900 mb-3">{t.skills}</h3>
                    <div className="flex flex-wrap gap-2">
                      {teacher.skills.map((skill) => (
                        <Badge 
                          key={skill} 
                          className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1"
                        >
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Subjects */}
                  <div>
                    <h3 className="text-gray-900 mb-3">{t.subjects}</h3>
                    <div className="flex flex-wrap gap-2">
                      {teacher.subjects.map((subject) => (
                        <Badge 
                          key={subject} 
                          variant="outline"
                          className="border-blue-300 text-blue-700 px-3 py-1"
                        >
                          <BookOpen className="w-3 h-3 mr-1" />
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Classes */}
                  <div>
                    <h3 className="text-gray-900 mb-3">{t.classes}</h3>
                    <div className="flex flex-wrap gap-2">
                      {teacher.classes.map((cls) => (
                        <Badge 
                          key={cls} 
                          variant="outline"
                          className="border-green-300 text-[#059669] px-3 py-1"
                        >
                          {cls}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Languages */}
                  <div>
                    <h3 className="text-gray-900 mb-3">{t.languages}</h3>
                    <div className="flex flex-wrap gap-2">
                      {teacher.languages.map((lang) => (
                        <Badge 
                          key={lang} 
                          variant="outline"
                          className="border-green-300 text-green-700 px-3 py-1"
                        >
                          <Globe className="w-3 h-3 mr-1" />
                          {lang}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  {/* Education */}
                  <div>
                    <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                      <GraduationCap className="w-5 h-5 text-teal-600" />
                      {t.education}
                    </h3>
                    <div className="space-y-3">
                      {teacher.education.map((edu) => (
                        <div key={`${edu.degree}-${edu.institution}`} className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg border border-green-100">
                          <h4 className="text-gray-900 mb-1">{edu.degree}</h4>
                          <p className="text-gray-600 text-sm">{edu.institution}</p>
                          <p className="text-gray-500 text-sm">{edu.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Certifications */}
                  <div>
                    <h3 className="text-gray-900 mb-3 flex items-center gap-2">
                      <Award className="w-5 h-5 text-yellow-600" />
                      {t.certifications}
                    </h3>
                    <div className="space-y-3">
                      {teacher.certifications.map((cert) => (
                        <div key={`${cert.name}-${cert.issuer}`} className="p-4 bg-gradient-to-r from-amber-50 to-yellow-50 rounded-lg border border-amber-100 relative">
                          <div className="absolute top-3 right-3 bg-[#10B981] text-white p-1 rounded-full shadow-md" title="যাচাইকৃত সার্টিফিকেট">
                            <Verified className="w-4 h-4 fill-current" />
                          </div>
                          <h4 className="text-gray-900 mb-1 pr-8">{cert.name}</h4>
                          <p className="text-gray-600 text-sm">{cert.issuer}</p>
                          <p className="text-gray-500 text-sm">{cert.year}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Experience */}
                  <div className="p-4 bg-gradient-to-br from-teal-50 to-emerald-50 rounded-xl border-2 border-teal-200">
                    <div className="flex items-center gap-3">
                      <Briefcase className="w-6 h-6 text-teal-600" />
                      <div>
                        <div className="font-bold text-2xl text-teal-700">{teacher.experience} {t.years}</div>
                        <div className="text-sm text-gray-600">{t.experience}</div>
                      </div>
                    </div>
                  </div>
                </TabsContent>

                {/* Work History Tab */}
                <TabsContent value="work" className="space-y-4">
                  <div className="mb-4">
                    <h3 className="text-gray-900">{t.workHistory}</h3>
                    <p className="text-gray-600">
                      {teacher.completedJobs} {t.completedJobs}, {teacher.ongoingJobs} {t.ongoingJobs}
                    </p>
                  </div>
                  {teacher.workHistory.map((work) => (
                    <Card key={`${work.title}-${work.company}`} className="p-6 bg-gradient-to-r from-gray-50 to-blue-50">
                      <div className="flex items-start justify-between mb-3">
                        <div className="flex-1">
                          <h4 className="text-gray-900 mb-1">{work.title}</h4>
                          <p className="text-sm text-gray-600">{t.client}: {work.client}</p>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-bold">{work.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 mb-3">{work.description}</p>
                      <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {work.duration}
                        </div>
                        <div className="flex items-center gap-1 text-teal-600 font-bold">
                          <DollarSign className="w-4 h-4" />
                          ৳{work.earnings.toLocaleString()}
                        </div>
                      </div>
                    </Card>
                  ))}
                </TabsContent>

                {/* Portfolio Tab */}
                <TabsContent value="portfolio" className="space-y-4">
                  <h3 className="text-gray-900 mb-4">{t.portfolio}</h3>
                  {teacher.portfolio.map((item) => (
                    <Card key={item.title} className="p-6 bg-gradient-to-r from-green-50 to-emerald-50">
                      <h4 className="text-gray-900 mb-2">{item.title}</h4>
                      <p className="text-gray-700">{item.description}</p>
                    </Card>
                  ))}
                  {teacher.portfolio.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      কোনো পোর্টফোলিও আইটেম যোগ করা হয়নি
                    </div>
                  )}
                </TabsContent>

                {/* Reviews Tab */}
                <TabsContent value="reviews" className="space-y-4">
                  <div className="mb-6">
                    <h3 className="text-gray-900 mb-2">{t.reviews}</h3>
                    <div className="flex items-center gap-4">
                      <div className="flex items-center gap-2">
                        <Star className="w-6 h-6 fill-yellow-400 text-yellow-400" />
                        <span className="text-3xl font-bold text-gray-900">{teacher.rating}</span>
                      </div>
                      <div className="text-gray-600">
                        {teacher.totalReviews} {t.totalReviews}
                      </div>
                    </div>
                    
                    {/* Rating Breakdown */}
                    <div className="mt-4 space-y-2">
                      {[5, 4, 3, 2, 1].map(stars => {
                        const percentage = stars === 5 ? 85 : stars === 4 ? 10 : 5;
                        return (
                          <div key={stars} className="flex items-center gap-3">
                            <div className="flex items-center gap-1 w-20">
                              <span className="text-sm text-gray-600">{stars}</span>
                              <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                            </div>
                            <Progress value={percentage} className="flex-1" />
                            <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  {teacher.testimonials.map((testimonial) => (
                    <Card key={`${testimonial.client}-${testimonial.date}`} className="p-6">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="text-gray-900">{testimonial.client}</h4>
                          <p className="text-sm text-gray-500">{testimonial.date}</p>
                        </div>
                        <div className="flex items-center gap-1 text-yellow-500">
                          <Star className="w-4 h-4 fill-current" />
                          <span className="font-bold">{testimonial.rating}</span>
                        </div>
                      </div>
                      <p className="text-gray-700 leading-relaxed">{testimonial.comment}</p>
                    </Card>
                  ))}
                </TabsContent>
              </Tabs>
            </Card>
          </div>
        </div>
      </div>

      {/* Auth Dialog */}
      <UnifiedAuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        language={language}
        onLogin={onLogin || (() => {})}
        initialMode="register"
      />
    </div>
  );
}
