import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, MapPin, Star, Award, BookOpen, Users, MessageSquare, Video, Share2, Heart, Briefcase, Home, Calendar, Phone, Mail } from 'lucide-react';
import { ReviewsSection } from '../components/ReviewsSection';
import { toast } from 'sonner@2.0.3';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';
import { canContactUser, getActionErrorMessage, type User, type UserRole } from '../utils/authGuard';
import { TalentTutorLogo } from '../components/TalentTutorLogo';

interface GuardianProfilePageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  guardianId?: string;
  userRole?: 'guardian' | 'teacher' | null;
  currentUser?: User | null;
  isAuthenticated?: boolean;
  onLogin?: (type: UserRole) => void;
}

const content = {
  bn: {
    backToSearch: 'ফিরে যান',
    verified: 'যাচাইকৃত',
    children: 'সন্তান',
    rating: 'রেটিং',
    reviews: 'রিভিউ',
    activePosts: 'সক্রিয় পোস্ট',
    contact: 'যোগাযোগ করুন',
    message: 'মেসেজ পাঠান',
    videoCall: 'ভিডিও কল',
    saveProfile: 'সেভ করুন',
    share: 'শেয়ার করুন',
    about: 'সম্পর্কে',
    occupation: 'পেশা',
    childrenInfo: 'সন্তানদের তথ্য',
    requirements: 'প্রয়োজনীয় টিউটর',
    class: 'শ্রেণী',
    subjects: 'বিষয়সমূহ',
    preferredTime: 'পছন্দের সময়',
    budget: 'বাজেট',
    perMonth: '/মাস',
    location: 'ঠিকানা',
    contactInfo: 'যোগাযোগ তথ্য',
    previousPosts: 'পূর্ববর্তী পোস্ট',
    viewPost: 'পোস্ট দেখুন',
  },
  en: {
    backToSearch: 'Back',
    verified: 'Verified',
    children: 'Children',
    rating: 'Rating',
    reviews: 'Reviews',
    activePosts: 'Active Posts',
    contact: 'Contact',
    message: 'Send Message',
    videoCall: 'Video Call',
    saveProfile: 'Save',
    share: 'Share',
    about: 'About',
    occupation: 'Occupation',
    childrenInfo: 'Children Information',
    requirements: 'Tutor Requirements',
    class: 'Class',
    subjects: 'Subjects',
    preferredTime: 'Preferred Time',
    budget: 'Budget',
    perMonth: '/month',
    location: 'Location',
    contactInfo: 'Contact Information',
    previousPosts: 'Previous Posts',
    viewPost: 'View Post',
  },
};

// Mock guardian database
const guardiansDatabase: Record<string, any> = {
  '1': {
    id: '1',
    name: 'জনাব আব্দুর রহমান',
    title: 'ব্যবসায়ী',
    photo: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&q=80',
    rating: 4.7,
    reviews: 12,
    verified: true,
    location: 'গুলশান, ঢাকা',
    occupation: 'ব্যবসায়ী',
    about: 'দুই সন্তানের পিতা। শিক্ষার মান নিশ্চিত করতে প্রতিশ্রুতিবদ্ধ। যোগ্য এবং দায়িত্বশীল শিক্ষক খুঁজছি।',
    children: [
      {
        name: 'রাশেদ রহমান',
        class: 'ক্লাস ৯',
        school: 'আদর্শ বিদ্যালয়',
        subjects: ['গণিত', 'পদার্থবিজ্ঞান'],
      },
      {
        name: 'সাবিহা রহমান',
        class: 'ক্লাস ৭',
        school: 'মডেল স্কুল',
        subjects: ['ইংরেজি', 'বিজ্ঞান'],
      },
    ],
    requirements: [
      {
        for: 'রাশেদ রহমান',
        subjects: ['গণিত', 'পদার্থবিজ্ঞান'],
        preferredTime: 'সন্ধ্যা ৬-৮টা',
        budget: '৮,০০০-১০,০০০',
      },
      {
        for: 'সাবিহা রহমান',
        subjects: ['ইংরেজি', 'বিজ্ঞান'],
        preferredTime: 'বিকাল ৪-৬টা',
        budget: '৬,০০০-৮,০০০',
      },
    ],
    activePosts: 2,
    phone: '+৮৮০ ১৭১২-৯৮৭৬৫৪',
    email: 'rahman@example.com',
  },
  '2': {
    id: '2',
    name: 'মিসেস ফারিহা আহমেদ',
    title: 'শিক্ষিকা',
    photo: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&q=80',
    rating: 4.9,
    reviews: 8,
    verified: true,
    location: 'ধানমন্ডি, ঢাকা',
    occupation: 'শিক্ষিকা',
    about: 'একজন শিক্ষিকা হিসাবে আমি শিক্ষার গুরুত্ব বুঝি। আমার এক সন্তানের জন্য বিশেষজ্ঞ টিউটর খুঁজছি।',
    children: [
      {
        name: 'তাহমিদ আহমেদ',
        class: 'একাদশ শ্রেণী',
        school: 'নটর ডেম কলেজ',
        subjects: ['উচ্চতর গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন'],
      },
    ],
    requirements: [
      {
        for: 'তাহমিদ আহমেদ',
        subjects: ['উচ্চতর গণিত', 'পদার্থবিজ্ঞান'],
        preferredTime: 'সন্ধ্যা ৭-৯টা',
        budget: '১২,০০০-১৫,০০০',
      },
    ],
    activePosts: 1,
    phone: '+৮৮০ ১৮১২-৩৪৫৬৭৮',
    email: 'fariha@example.com',
  },
  '3': {
    id: '3',
    name: 'ইঞ্জিনিয়ার কামরুল হাসান',
    title: 'সফটওয়্যার ইঞ্জিনিয়ার',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&q=80',
    rating: 4.8,
    reviews: 15,
    verified: true,
    location: 'বনানী, ঢাকা',
    occupation: 'সফটওয়্যার ইঞ্জিনিয়ার',
    about: 'তিন সন্তানের পিতা। প্রযুক্তিবিদ হিসাবে আমি জানি শিক্ষা কতটা গুরুত্বপূর্ণ। আমার সন্তানদের জন্য সেরা শিক্ষক খুঁজছি।',
    children: [
      {
        name: 'সাফা হাসান',
        class: 'ক্লাস ১০',
        school: 'ভিকারুননিসা নূন স্কুল',
        subjects: ['গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন'],
      },
      {
        name: 'সামি হাসান',
        class: 'ক্লাস ৮',
        school: 'সেন্ট জোসেফ স্কুল',
        subjects: ['ইংরেজি', 'গণিত'],
      },
      {
        name: 'সারা হাসান',
        class: 'ক্লাস ৬',
        school: 'সেন্ট জোসেফ স্কুল',
        subjects: ['সব বিষয়'],
      },
    ],
    requirements: [
      {
        for: 'সাফা হাসান',
        subjects: ['গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন'],
        preferredTime: 'সন্ধ্যা ৬-৮টা',
        budget: '১০,০০০-১২,০০০',
      },
      {
        for: 'সামি ও সারা',
        subjects: ['ইংরেজি', 'গণিত'],
        preferredTime: 'বিকাল ৪-৬টা',
        budget: '৮,০০০-১০,০০০',
      },
    ],
    activePosts: 3,
    phone: '+৮৮০ ১৭১৮-৯৮৭৬৫৪',
    email: 'kamrul@example.com',
  },
};

export function GuardianProfilePage({ language, setLanguage, setPage, guardianId, userRole, currentUser, isAuthenticated, onLogin }: GuardianProfilePageProps) {
  const t = content[language];
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  // Get guardian data based on guardianId or use default
  const guardian = guardianId && guardiansDatabase[guardianId] 
    ? guardiansDatabase[guardianId] 
    : guardiansDatabase['1'];
  
  // Handle contact guardian
  const handleContactGuardian = () => {
    const permission = canContactUser(
      currentUser?.role || null,
      'guardian' as UserRole,
      currentUser || null
    );
    
    if (!permission.allowed) {
      const errorMessage = getActionErrorMessage(permission.reason!, language);
      toast.error(errorMessage);
      
      if (permission.reason === 'auth_required') {
        setShowAuthDialog(true);
      } else if (permission.reason === 'profile_incomplete') {
        setPage(currentUser?.role === 'teacher' ? 'teacher-profile' : 'home');
      } else if (permission.reason === 'insufficient_credits') {
        setPage('credit-purchase');
      }
      
      return;
    }
    
    // Contact allowed - proceed
    toast.success(language === 'bn' ? 'মেসেজ পাঠানো হচ্ছে...' : 'Sending message...');
    setPage('messages');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      {/* Header */}
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
              <Button variant="ghost" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                {t.share}
              </Button>
              <Button variant="outline" onClick={() => setPage('browse-tuitions')}>
                <ArrowLeft className="w-4 h-4 mr-2" />
                {t.backToSearch}
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          {/* Left Column - Profile Card */}
          <div className="lg:col-span-1">
            <Card className="p-6 lg:p-8 lg:sticky lg:top-24">
              {/* Photo */}
              <div className="relative mb-6">
                <img 
                  src={guardian.photo} 
                  alt={guardian.name}
                  className="w-full aspect-square object-cover rounded-2xl shadow-lg"
                />
                {guardian.verified && (
                  <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full flex items-center gap-1 shadow-lg">
                    <Award className="w-4 h-4" />
                    <span className="text-sm">{t.verified}</span>
                  </div>
                )}
              </div>

              {/* Name & Title */}
              <h2 className="text-gray-900 mb-2">{guardian.name}</h2>
              <p className="text-teal-600 mb-4">{guardian.title}</p>

              {/* Location */}
              <div className="flex items-center gap-2 text-gray-600 mb-6">
                <MapPin className="w-4 h-4" />
                <span>{guardian.location}</span>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="bg-gradient-to-br from-blue-50 to-cyan-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Users className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-gray-600">{t.children}</span>
                  </div>
                  <div className="text-2xl font-bold text-blue-700">{guardian.children.length}</div>
                </div>
                <div className="bg-gradient-to-br from-teal-50 to-emerald-50 p-4 rounded-xl">
                  <div className="flex items-center gap-2 mb-1">
                    <Briefcase className="w-4 h-4 text-teal-600" />
                    <span className="text-sm text-gray-600">{t.activePosts}</span>
                  </div>
                  <div className="text-2xl font-bold text-teal-700">{guardian.activePosts}</div>
                </div>
              </div>

              {/* Rating */}
              <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-4 rounded-xl mb-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                      <span className="text-2xl font-bold text-gray-900">{guardian.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600">{guardian.reviews} {t.reviews}</div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="space-y-3">
                <Button 
                  className="w-full bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700 text-white shadow-md"
                  size="lg"
                  onClick={handleContactGuardian}
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  {t.message}
                </Button>
                <Button 
                  variant="outline" 
                  className="w-full border-teal-600 text-teal-700 hover:bg-teal-50"
                  size="lg"
                  onClick={handleContactGuardian}
                >
                  <Video className="w-4 h-4 mr-2" />
                  {t.videoCall}
                </Button>
                <Button 
                  variant="ghost" 
                  className="w-full hover:bg-gray-100"
                >
                  <Heart className="w-4 h-4 mr-2" />
                  {t.saveProfile}
                </Button>
              </div>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* About */}
            <Card className="p-8">
              <h3 className="text-gray-900 mb-4">{t.about}</h3>
              <p className="text-gray-600 leading-relaxed">{guardian.about}</p>
            </Card>

            {/* Occupation */}
            <Card className="p-8">
              <h3 className="text-gray-900 mb-4">{t.occupation}</h3>
              <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
                <Briefcase className="w-5 h-5 text-teal-600" />
                <span className="text-gray-900">{guardian.occupation}</span>
              </div>
            </Card>

            {/* Children Information */}
            <Card className="p-8">
              <h3 className="text-gray-900 mb-4">{t.childrenInfo}</h3>
              <div className="space-y-4">
                {guardian.children.map((child: any) => (
                  <div key={child.name} className="p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-100">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h4 className="text-gray-900 mb-1">{child.name}</h4>
                        <p className="text-sm text-gray-600">{child.school}</p>
                      </div>
                      <Badge className="bg-blue-600">{child.class}</Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {Array.isArray(child.subjects) && child.subjects.map((subject: string, i: number) => (
                        <Badge key={i} variant="outline" className="border-blue-300 text-blue-700">
                          <BookOpen className="w-3 h-3 mr-1" />
                          {subject}
                        </Badge>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Tutor Requirements */}
            <Card className="p-8">
              <h3 className="text-gray-900 mb-4">{t.requirements}</h3>
              <div className="space-y-4">
                {guardian.requirements.map((req: any) => (
                  <div key={req.for} className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 rounded-lg border border-teal-100">
                    <h4 className="text-gray-900 mb-3">For: {req.for}</h4>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{t.subjects}</p>
                        <div className="flex flex-wrap gap-2">
                          {req.subjects.map((subject: string, i: number) => (
                            <Badge key={i} className="bg-teal-600">
                              {subject}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600 mb-1">{t.preferredTime}</p>
                        <div className="flex items-center gap-2 text-gray-900">
                          <Calendar className="w-4 h-4 text-teal-600" />
                          {req.preferredTime}
                        </div>
                      </div>
                      <div className="md:col-span-2">
                        <p className="text-sm text-gray-600 mb-1">{t.budget}</p>
                        <div className="text-xl font-bold text-teal-700">
                          ৳ {req.budget}{t.perMonth}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Contact Information */}
            <Card className="p-8 bg-gradient-to-br from-gray-50 to-teal-50 border-2 border-teal-200">
              <h3 className="text-gray-900 mb-4">{t.contactInfo}</h3>
              <div className="space-y-3">
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <Phone className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-900">{guardian.phone}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <Mail className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-900">{guardian.email}</span>
                </div>
                <div className="flex items-center gap-3 p-3 bg-white rounded-lg">
                  <MapPin className="w-5 h-5 text-teal-600" />
                  <span className="text-gray-900">{guardian.location}</span>
                </div>
              </div>
            </Card>

            {/* Reviews Section */}
            <ReviewsSection
              reviews={[
                {
                  id: '1',
                  userId: 'teacher-1',
                  userName: 'মোঃ করিম উদ্দিন',
                  userAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&q=80',
                  rating: 5,
                  comment: 'খুবই ভালো অভিভাবক। সময়মতো পেমেন্ট করেন এবং সন্তানের পড়াশোনায় খুব আগ্রহী। কাজ করতে আরামদায়ক পরিবেশ।',
                  date: new Date('2025-01-15'),
                  verified: true,
                  helpful: 12,
                  subject: 'গণিত শিক্ষক',
                },
                {
                  id: '2',
                  userId: 'teacher-2',
                  userName: 'সাবিনা আক্তার',
                  userAvatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&q=80',
                  rating: 4,
                  comment: 'সন্তানদের যত্নশীল অভিভাবক। নিয়মিত প্রগ্রেস জানতে চান এবং শিক্ষকের মতামত গুরুত্ব দেন।',
                  date: new Date('2025-01-02'),
                  verified: true,
                  helpful: 8,
                  subject: 'ইংরেজি শিক্ষক',
                },
              ]}
              averageRating={4.5}
              totalReviews={2}
              canReview={false}
            />
          </div>
        </div>
      </div>

      {/* Authentication Dialog */}
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
