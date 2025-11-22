import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Slider } from '../components/ui/slider';
import { Checkbox } from '../components/ui/checkbox';
import { Separator } from '../components/ui/separator';
import { CardAvatar } from '../components/ui/profile-avatar';
import { 
  ArrowLeft, 
  Search, 
  MapPin, 
  Star, 
  Verified, 
  Heart, 
  DollarSign,
  Clock,
  TrendingUp,
  Award,
  MessageSquare,
  Video,
  CheckCircle,
  Filter,
  BookOpen,
  Calendar,
  Target,
  Zap,
  GraduationCap,
  SlidersHorizontal,
  X
} from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { ChatDialog } from '../components/ChatDialog';
import { VideoMeetingDialog } from '../components/VideoMeetingDialog';
import { HiringAgreementDialog } from '../components/HiringAgreementDialog';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';
import { LoadMoreButton } from '../components/LoadMoreButton';
import { BangladeshLocationSelector } from '../components/BangladeshLocationSelector';
import { AIMatchmaker } from '../components/AIMatchmaker';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { teachersDatabase, type Teacher } from '../utils/teachersData';
import { mockConversations, mockUserCredits } from '../utils/upworkFeatures';
import { canContactUser, getActionErrorMessage, type UserRole, type User } from '../utils/authGuard';
import { subjectCategories, allSubjects as subjectsFromData } from '../utils/subjectsData';
import { mediums, mediumLabels } from '../utils/mediumData';
import { getLocationById } from '../utils/bangladeshLocations';
import { teachersAPI } from '../utils/databaseService';
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger, SheetFooter, SheetClose } from '../components/ui/sheet';

interface FindTeachersPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  userRole?: 'guardian' | 'teacher' | 'student' | 'donor' | 'admin' | null;
  currentUser?: User | null;
  isAuthenticated?: boolean;
  onLogin?: (type: UserRole) => void;
  onLogout?: () => void;
  onSelectTeacher?: (teacherId: string) => void;
}

const content = {
  bn: {
    title: 'শিক্ষক খুঁজুন',
    subtitle: 'যোগ্য এবং যাচাইকৃত শিক্ষক খুঁজে পান',
    backToHome: 'হোমে ফিরুন',
    search: 'শিক্ষক খুঁজুন...',
    filters: 'ফিল্টার',
    clearFilters: 'ফিল্টার রিসেট',
    medium: 'মিডিয়াম',
    allMediums: 'সকল মিডিয়াম',
    subject: 'বিষয়',
    allSubjects: 'সকল বিষয়',
    class: 'শ্রেণী',
    allClasses: 'সকল শ্রেণী',
    location: 'এলাকা',
    allLocations: 'সকল এলাকা',
    hourlyRate: 'ঘণ্টা প্রতি রেট',
    verified: 'শুধু যাচাইকৃত',
    topRated: 'শুধু শীর্ষ রেটেড',
    viewProfile: 'প্রোফাইল দেখুন',
    sendProposal: 'প্রস্তাব পাঠান',
    saveTeacher: 'সংরক্ষণ',
    teachersFound: 'জন শিক্ষক',
    perHour: '/ঘণ্টা',
    jobSuccess: 'জব সাকসেস',
    totalJobs: 'মোট চাকরি',
    earned: 'আয়',
    responseTime: 'রেসপন্স টাইম',
    online: 'অনলাইন',
    availability: 'প্রাপ্যতা',
    available: 'Available',
    busy: 'Busy',
    offline: 'Offline',
    sortBy: 'সাজান',
    recommended: 'প্রস্তাবিত',
    highestRated: 'সর্বোচ্চ রেটেড',
    mostReviews: 'সবচেয়ে বেশি রিভিউ',
    lowestRate: 'সর্বনিম্ন রেট',
    highestRate: 'সর্বোচ্চ রেট',
    startChat: 'চ্যাট শুরু করুন',
    scheduleVideo: 'ভিডিও মিটিং',
    sendHiring: 'হায়ারিং এগ্রিমেন্ট',
    applyFilters: 'ফিল্টার প্রয়োগ করুন',
  },
  en: {
    title: 'Find Teachers',
    subtitle: 'Find Qualified and Verified Teachers',
    backToHome: 'Back to Home',
    search: 'Search teachers...',
    filters: 'Filters',
    clearFilters: 'Clear Filters',
    medium: 'Medium',
    allMediums: 'All Mediums',
    subject: 'Subject',
    allSubjects: 'All Subjects',
    class: 'Class',
    allClasses: 'All Classes',
    location: 'Location',
    allLocations: 'All Locations',
    hourlyRate: 'Hourly Rate',
    verified: 'Verified Only',
    topRated: 'Top Rated Only',
    viewProfile: 'View Profile',
    sendProposal: 'Send Proposal',
    saveTeacher: 'Save',
    teachersFound: 'teachers',
    perHour: '/hour',
    jobSuccess: 'Job Success',
    totalJobs: 'Total Jobs',
    earned: 'Earned',
    responseTime: 'Response Time',
    online: 'Online',
    availability: 'Availability',
    available: 'Available',
    busy: 'Busy',
    offline: 'Offline',
    sortBy: 'Sort By',
    recommended: 'Recommended',
    highestRated: 'Highest Rated',
    mostReviews: 'Most Reviews',
    lowestRate: 'Lowest Rate',
    startChat: 'Start Chat',
    scheduleVideo: 'Video Meeting',
    sendHiring: 'Hiring Agreement',
    highestRate: 'Highest Rate',
    applyFilters: 'Apply Filters',
  },
};

export function FindTeachersPage({ 
  language, 
  setLanguage, 
  setPage, 
  announcement,
  userRole,
  currentUser,
  isAuthenticated,
  onLogin,
  onLogout,
  onSelectTeacher 
}: FindTeachersPageProps) {
  const t = content[language];
  
  const [teachers, setTeachers] = useState<Teacher[]>(teachersDatabase);
  const [originalTeachers, setOriginalTeachers] = useState<Teacher[]>(teachersDatabase);
  const [isLoadingTeachers, setIsLoadingTeachers] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedMedium, setSelectedMedium] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<{
    division?: string;
    district?: string;
    area?: string;
  }>({});
  const [hourlyRateRange, setHourlyRateRange] = useState([0, 1500]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [topRatedOnly, setTopRatedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [savedTeachers, setSavedTeachers] = useState<string[]>([]);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);
  
  // Pagination states
  const [displayCount, setDisplayCount] = useState(12); // Show 12 initially
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const ITEMS_PER_PAGE = 12;
  
  // Dialog states
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  const [isVideoMeetingOpen, setIsVideoMeetingOpen] = useState(false);
  const [isHiringOpen, setIsHiringOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState<Teacher | null>(null);
  
  // Mock current user (guardian)
  const currentUserId = 'guardian-001';
  const currentUserCredits = mockUserCredits[currentUserId]?.currentBalance || 85;

  // Fetch teachers from database
  useEffect(() => {
    const fetchTeachers = async () => {
      setIsLoadingTeachers(true);
      try {
        const dbTeachers = await teachersAPI.getAll();
        if (dbTeachers && dbTeachers.length > 0) {
          // Convert database teachers to app format
          const formattedTeachers = dbTeachers.map((t: any) => ({
            id: t.id,
            name: t.name,
            photo: t.photo || '/placeholder-avatar.png',
            subjects: t.subjects || [],
            classes: t.classes || [],
            location: t.location?.district || 'Dhaka',
            hourlyRate: t.hourlyRate || 500,
            rating: t.rating || 4.5,
            totalReviews: t.totalReviews || 0,
            experience: t.experience || '1 year',
            education: t.education || '',
            verified: t.verified || false,
            topRated: t.rating >= 4.5,
            medium: t.medium || ['Bangla Medium'],
            bio: t.bio || '',
            responseTime: '< 1 hour'
          }));
          setTeachers(formattedTeachers);
          setOriginalTeachers(formattedTeachers);
        } else {
          // Fallback to static data
          setTeachers(teachersDatabase);
          setOriginalTeachers(teachersDatabase);
        }
      } catch (error) {
        console.info('Using fallback teacher data (database not yet configured):', error);
        setTeachers(teachersDatabase);
        setOriginalTeachers(teachersDatabase);
      } finally {
        setIsLoadingTeachers(false);
      }
    };

    fetchTeachers();
  }, []);

  // Extract unique values for filters
  const allSubjects = Array.from(new Set(teachers.flatMap(t => t.subjects)));
  const allClasses = Array.from(new Set(teachers.flatMap(t => t.classes)));
  const allLocations = Array.from(new Set(teachers.map(t => t.location)));

  // Filter teachers
  const filteredTeachers = teachers.filter(teacher => {
    // Search query
    if (searchQuery && !teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !teacher.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !teacher.subjects.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()))) {
      return false;
    }
    
    // Subject filter
    if (selectedSubject && selectedSubject !== 'all' && !teacher.subjects.includes(selectedSubject)) return false;
    
    // Class filter
    if (selectedClass && selectedClass !== 'all' && !teacher.classes.includes(selectedClass)) return false;
    
    // Location filter - now checks division, district, area
    if (selectedLocation.area) {
      const areaLocation = getLocationById(selectedLocation.area);
      if (areaLocation && !teacher.location.includes(areaLocation.nameBn) && !teacher.location.includes(areaLocation.name)) {
        return false;
      }
    } else if (selectedLocation.district) {
      const districtLocation = getLocationById(selectedLocation.district);
      if (districtLocation && !teacher.location.includes(districtLocation.nameBn) && !teacher.location.includes(districtLocation.name)) {
        return false;
      }
    } else if (selectedLocation.division) {
      const divisionLocation = getLocationById(selectedLocation.division);
      if (divisionLocation && !teacher.location.includes(divisionLocation.nameBn) && !teacher.location.includes(divisionLocation.name)) {
        return false;
      }
    }
    
    // Hourly rate filter
    if (teacher.hourlyRate.min > hourlyRateRange[1] || teacher.hourlyRate.max < hourlyRateRange[0]) {
      return false;
    }
    
    // Verified filter
    if (verifiedOnly && !teacher.verified) return false;
    
    // Top rated filter
    if (topRatedOnly && !teacher.topRated) return false;
    
    return true;
  });

  // Sort teachers
  const sortedTeachers = [...filteredTeachers].sort((a, b) => {
    switch (sortBy) {
      case 'highestRated':
        return b.rating - a.rating;
      case 'mostReviews':
        return b.totalReviews - a.totalReviews;
      case 'lowestRate':
        return a.hourlyRate.min - b.hourlyRate.min;
      case 'highestRate':
        return b.hourlyRate.min - a.hourlyRate.min;
      default: // recommended
        return (b.topRated ? 1 : 0) - (a.topRated ? 1 : 0) || b.jobSuccess - a.jobSuccess;
    }
  });

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedMedium('all');
    setSelectedSubject('all');
    setSelectedClass('all');
    setSelectedLocation({});
    setHourlyRateRange([0, 1500]);
    setVerifiedOnly(false);
    setTopRatedOnly(false);
    setSortBy('recommended');
    setTeachers(originalTeachers);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    
    // Simulate loading delay
    setTimeout(() => {
      setDisplayCount(prev => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 800);
  };

  const handleSaveTeacher = (teacherId: string) => {
    if (savedTeachers.includes(teacherId)) {
      setSavedTeachers(savedTeachers.filter(id => id !== teacherId));
      toast.success('শিক্ষক সংরক্ষণ তালিকা থেকে সরানো হয়েছে');
    } else {
      setSavedTeachers([...savedTeachers, teacherId]);
      toast.success('শিক্ষক সংরক্ষণ করা হয়েছে');
    }
  };

  const handleViewProfile = (teacherId: string) => {
    // Anyone can view teacher profiles (no auth required)
    if (onSelectTeacher) {
      onSelectTeacher(teacherId);
    } else {
      setPage('teacher-profile-view');
    }
  };

  /**
   * Handle contact/chat with authentication guard
   */
  const handleStartChat = (teacher: Teacher) => {
    // Check if user can contact teacher
    const permission = canContactUser(userRole, 'teacher', currentUser || null);
    
    if (!permission.allowed) {
      const errorMessage = getActionErrorMessage(permission.reason!, language);
      toast.error(errorMessage);
      
      // If not authenticated, show login dialog
      if (permission.reason === 'auth_required') {
        setShowAuthDialog(true);
      } else if (permission.reason === 'profile_incomplete') {
        // Navigate to profile completion
        if (userRole === 'guardian') {
          setPage('guardian-profile');
        } else if (userRole === 'teacher') {
          setPage('teacher-profile');
        }
      } else if (permission.reason === 'insufficient_credits') {
        // Navigate to credit purchase
        setPage('credit-purchase');
      }
      
      return;
    }
    
    // Permission granted - open chat
    setSelectedTeacher(teacher);
    setIsChatOpen(true);
  };

  /**
   * Handle video meeting with authentication guard
   */
  const handleScheduleVideo = (teacher: Teacher) => {
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
    
    setSelectedTeacher(teacher);
    setIsVideoMeetingOpen(true);
  };

  /**
   * Handle hiring agreement with authentication guard
   */
  const handleSendHiring = (teacher: Teacher) => {
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
    
    setSelectedTeacher(teacher);
    setIsHiringOpen(true);
  };

  const handleSendMessage = (message: string) => {
    console.log('Message sent:', message);
    // In real app, this would send to backend
  };

  const handleVideoScheduled = (meetingData: any) => {
    console.log('Video meeting scheduled:', meetingData);
    // In real app, this would create meeting in backend
    toast.success(language === 'bn' 
      ? `ভিডিও মিটিং শিডিউল হয়েছে! ২০ ক্রেডিট কাটা হয়েছে।`
      : `Video meeting scheduled! 20 credits deducted.`
    );
  };

  const handleAgreementSent = (agreementData: any) => {
    console.log('Hiring agreement sent:', agreementData);
    // In real app, this would send to backend
    toast.success(language === 'bn'
      ? 'হায়ারিং এগ্রিমেন্ট সফলভাবে পাঠানো হয়েছে!'
      : 'Hiring agreement sent successfully!'
    );
  };

  const getAvailabilityColor = (availability: string) => {
    switch (availability) {
      case 'available':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'busy':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'offline':
        return 'text-gray-600 bg-gray-50 border-gray-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const getAvailabilityText = (availability: string) => {
    switch (availability) {
      case 'available':
        return t.available;
      case 'busy':
        return t.busy;
      case 'offline':
        return t.offline;
      default:
        return t.offline;
    }
  };

  const handleAIMatchFound = (matches: Teacher[]) => {
    if (matches.length > 0) {
      setTeachers(matches);
      toast.success(language === 'bn' ? 'AI আপনার জন্য শিক্ষক খুঁজে পেয়েছে!' : 'AI found teachers for you!');
    } else {
      // Reset if cleared
      setTeachers(originalTeachers);
    }
  };

  const FilterContent = () => (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-3 lg:hidden">
        <h3 className={`text-gray-900 flex items-center gap-2 text-base font-semibold ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.filters}
        </h3>
        <Button
          variant="ghost"
          size="sm"
          onClick={handleClearFilters}
          className={`text-teal-600 hover:text-teal-700 text-xs px-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
        >
          {t.clearFilters}
        </Button>
      </div>

      {/* Location Filter - Bangladesh Location Selector */}
      <div>
        <label className={`text-sm font-medium text-gray-700 mb-2 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.location}
        </label>
        <BangladeshLocationSelector
          value={selectedLocation}
          onChange={(location) => setSelectedLocation({
            division: location.division,
            district: location.district,
            area: location.area
          })}
          showSearch={true}
          showAreaLevel={true}
          language={language}
          compact={true}
        />
      </div>

      {/* Medium Filter */}
      <div>
        <label className={`text-sm font-medium text-gray-700 mb-2 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.medium}
        </label>
        <Select value={selectedMedium || 'all'} onValueChange={(value) => setSelectedMedium(value || 'all')}>
          <SelectTrigger className={`w-full bg-white/50 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            <SelectValue placeholder={t.allMediums} />
          </SelectTrigger>
          <SelectContent className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
            <SelectItem value="all">{t.allMediums}</SelectItem>
            {mediums.map(medium => (
              <SelectItem key={medium.id} value={medium.id}>
                {medium.icon} {language === 'bn' ? medium.name.bn : medium.name.en}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Subject Filter - Enhanced with Categories */}
      <div>
        <label className={`text-sm font-medium text-gray-700 mb-2 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.subject}
        </label>
        <Select value={selectedSubject || 'all'} onValueChange={(value) => setSelectedSubject(value || 'all')}>
          <SelectTrigger className={`w-full bg-white/50 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            <SelectValue placeholder={t.allSubjects} />
          </SelectTrigger>
          <SelectContent className={`${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''} max-h-[400px]`}>
            <SelectItem value="all">{t.allSubjects}</SelectItem>
            
            {/* Subject Categories */}
            {subjectCategories.map((category) => {
              const categorySubjects = subjectsFromData.filter(s => s.category === category.id);
              if (categorySubjects.length === 0) return null;
              
              return (
                <div key={category.id}>
                  <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50">
                    {language === 'bn' ? category.name_bn : category.name_en}
                  </div>
                  {categorySubjects.map(subject => (
                    <SelectItem key={subject.id} value={subject.id}>
                      {language === 'bn' ? subject.name_bn : subject.name_en}
                    </SelectItem>
                  ))}
                </div>
              );
            })}
          </SelectContent>
        </Select>
      </div>

      {/* Class Filter */}
      <div>
        <label className={`text-sm font-medium text-gray-700 mb-2 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.class}
        </label>
        <Select value={selectedClass || 'all'} onValueChange={(value) => setSelectedClass(value || 'all')}>
          <SelectTrigger className={`w-full bg-white/50 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            <SelectValue placeholder={t.allClasses} />
          </SelectTrigger>
          <SelectContent className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
            <SelectItem value="all">{t.allClasses}</SelectItem>
            {allClasses.map(cls => (
              <SelectItem key={cls} value={cls}>{cls}</SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Separator />

      {/* Hourly Rate Range */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          {t.hourlyRate}
        </label>
        <div className="space-y-3">
          <Slider
            min={0}
            max={1500}
            step={50}
            value={hourlyRateRange}
            onValueChange={setHourlyRateRange}
            className="py-2"
          />
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>৳{hourlyRateRange[0].toLocaleString()}</span>
            <span>৳{hourlyRateRange[1].toLocaleString()}</span>
          </div>
        </div>
      </div>

      <Separator />

      {/* Preferences */}
      <div>
        <label className="text-sm font-medium text-gray-700 mb-3 block">
          পছন্দসমূহ
        </label>
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Checkbox
              id="verified"
              checked={verifiedOnly}
              onCheckedChange={(checked) => setVerifiedOnly(checked as boolean)}
            />
            <label htmlFor="verified" className="text-sm text-gray-700 cursor-pointer flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              {t.verified}
            </label>
          </div>

          <div className="flex items-center gap-2">
            <Checkbox
              id="topRated"
              checked={topRatedOnly}
              onCheckedChange={(checked) => setTopRatedOnly(checked as boolean)}
            />
            <label htmlFor="topRated" className="text-sm text-gray-700 cursor-pointer flex items-center gap-2">
              <Award className="w-4 h-4 text-yellow-600" />
              {t.topRated}
            </label>
          </div>
        </div>
      </div>

      <Button className="w-full lg:hidden mt-4" onClick={() => setIsMobileFiltersOpen(false)}>
        {t.applyFilters}
      </Button>
    </div>
  );

  return (
    <div className="min-h-screen">
      <Header
        language={language}
        setLanguage={setLanguage}
        setPage={setPage}
        announcement={announcement}
        onLogin={onLogin}
        currentUser={currentUser}
        onLogout={onLogout}
      />

      {/* Hero Section with Glass Effect */}
      <div className="relative overflow-hidden bg-gradient-to-r from-emerald-600 via-teal-600 to-cyan-600 text-white py-12 sm:py-16">
        {/* Background Decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-20 -right-20 w-80 h-80 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute -bottom-20 -left-20 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl"></div>
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0icmdiYSgyNTUsIDI1NSwgMjU1LCAwLjA1KSIgc3Ryb2tlLXdpZHRoPSIxIi8+PC9wYXR0ZXJuPjwvZGVmcz48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJ1cmwoI2dyaWQpIi8+PC9zdmc+')] opacity-20"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setPage('home')}
              className={`text-white hover:bg-white/20 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {language === 'bn' ? 'হোমে ফিরুন' : 'Back to Home'}
            </Button>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className={`text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.title}
              </h1>
              <p className={`text-lg md:text-xl text-teal-50 mb-8 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.subtitle}
              </p>

              {/* Stats Cards - Matching BrowseTuitionsPage Style */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl shadow-lg hover:bg-white/20 transition-colors">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{teachersDatabase.length}+</div>
                    <div className={`text-xs text-teal-100 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{language === 'bn' ? 'যোগ্য শিক্ষক' : 'Qualified Teachers'}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl shadow-lg hover:bg-white/20 transition-colors">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Verified className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{teachersDatabase.filter(t => t.verified).length}+</div>
                    <div className={`text-xs text-teal-100 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{language === 'bn' ? 'যাচাইকৃত' : 'Verified'}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl shadow-lg hover:bg-white/20 transition-colors">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Award className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{language === 'bn' ? '৯৫%' : '95%'}</div>
                    <div className={`text-xs text-teal-100 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{language === 'bn' ? 'সাফল্যের হার' : 'Success Rate'}</div>
                  </div>
                </div>
              </div>

              {/* Search Bar - Matching BrowseTuitionsPage Style */}
              <div className="flex flex-col sm:flex-row gap-3 max-w-2xl bg-white/95 backdrop-blur-xl p-2 rounded-xl shadow-2xl">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={t.search}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`pl-10 h-12 bg-transparent border-0 focus-visible:ring-0 text-base text-gray-900 placeholder:text-gray-500 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                  />
                </div>
                <div className="flex gap-2">
                  <Sheet open={isMobileFiltersOpen} onOpenChange={setIsMobileFiltersOpen}>
                    <SheetTrigger asChild>
                      <Button variant="outline" className="lg:hidden h-12 px-4 border-slate-200 rounded-lg hover:bg-slate-50">
                        <Filter className="w-5 h-5 text-slate-600" />
                      </Button>
                    </SheetTrigger>
                    <SheetContent side="left" className="w-[300px] sm:w-[400px] overflow-y-auto">
                      <SheetHeader>
                        <SheetTitle>{t.filters}</SheetTitle>
                      </SheetHeader>
                      <div className="py-4">
                        <FilterContent />
                      </div>
                    </SheetContent>
                  </Sheet>
                  
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className={`w-[140px] sm:w-[180px] h-12 border-0 bg-slate-100 hover:bg-slate-200 rounded-lg text-slate-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      <div className="flex items-center gap-2 truncate">
                        <SlidersHorizontal className="w-4 h-4" />
                        <SelectValue placeholder={t.sortBy} />
                      </div>
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="recommended">{t.recommended}</SelectItem>
                      <SelectItem value="highestRated">{t.highestRated}</SelectItem>
                      <SelectItem value="mostReviews">{t.mostReviews}</SelectItem>
                      <SelectItem value="lowestRate">{t.lowestRate}</SelectItem>
                      <SelectItem value="highestRate">{t.highestRate}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 pb-20">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters - Desktop */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-24">
              <Card className="p-6 bg-white/60 backdrop-blur-xl border-white/60 shadow-lg shadow-emerald-100/10 rounded-2xl">
                <div className="flex items-center justify-between mb-6">
                  <h3 className={`font-semibold text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {t.filters}
                  </h3>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={handleClearFilters}
                    className="text-emerald-600 h-8 px-2 hover:bg-emerald-50"
                  >
                    {t.clearFilters}
                  </Button>
                </div>
                <FilterContent />
              </Card>
            </div>
          </div>

          {/* Teacher Grid */}
          <div className="flex-1">
            {/* AI Matchmaker */}
            <AIMatchmaker 
              teachers={teachers} 
              onMatchFound={handleAIMatchFound} 
              language={language} 
            />

            <div className="flex items-center justify-between mb-6 mt-8">
              <h2 className={`text-xl font-bold text-slate-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {sortedTeachers.length} {t.teachersFound}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              <AnimatePresence mode="popLayout">
                {sortedTeachers.slice(0, displayCount).map((teacher, index) => (
                  <motion.div
                    key={teacher.id}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                  >
                    <Card className="group h-full flex flex-col bg-white/70 backdrop-blur-md border-white/60 shadow-lg hover:shadow-xl hover:shadow-emerald-100/40 transition-all duration-300 hover:-translate-y-1 rounded-2xl overflow-hidden">
                      <div className="p-5 flex-1">
                        {/* Header */}
                        <div className="flex items-start gap-4 mb-4">
                          <div className="relative shrink-0">
                            <CardAvatar 
                              src={teacher.photo} 
                              alt={teacher.name}
                              fallback={teacher.name.charAt(0)}
                              className="w-16 h-16 ring-4 ring-white shadow-md"
                              verified={teacher.verified}
                            />
                            <div className={`absolute -bottom-2 left-1/2 -translate-x-1/2 px-2 py-0.5 rounded-full text-[10px] font-medium border ${getAvailabilityColor(teacher.availability || 'offline')}`}>
                              {getAvailabilityText(teacher.availability || 'offline')}
                            </div>
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between gap-2">
                              <h3 className={`font-bold text-lg text-slate-900 truncate ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                {teacher.name}
                              </h3>
                              <Button
                                variant="ghost"
                                size="icon"
                                className={`h-8 w-8 rounded-full ${savedTeachers.includes(teacher.id) ? 'text-rose-500 bg-rose-50' : 'text-slate-400 hover:text-rose-500 hover:bg-rose-50'}`}
                                onClick={() => handleSaveTeacher(teacher.id)}
                              >
                                <Heart className={`w-5 h-5 ${savedTeachers.includes(teacher.id) ? 'fill-current' : ''}`} />
                              </Button>
                            </div>
                            <p className={`text-sm text-slate-500 mb-1 truncate ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                              {teacher.title}
                            </p>
                            <div className="flex items-center gap-2 text-sm text-amber-500 font-medium">
                              <Star className="w-4 h-4 fill-current" />
                              {teacher.rating} <span className="text-slate-400 font-normal">({teacher.totalReviews})</span>
                              {teacher.topRated && (
                                <Badge variant="secondary" className="h-5 bg-amber-100 text-amber-700 border-amber-200 text-[10px] px-1.5">
                                  Top Rated
                                </Badge>
                              )}
                            </div>
                          </div>
                        </div>

                        {/* Details */}
                        <div className="space-y-3 mb-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <MapPin className="w-4 h-4 text-emerald-500" />
                            <span className="truncate">{teacher.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <DollarSign className="w-4 h-4 text-emerald-500" />
                            <span>৳{teacher.hourlyRate.min} - ৳{teacher.hourlyRate.max} {t.perHour}</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {teacher.subjects.slice(0, 3).map((subject, i) => (
                              <Badge key={i} variant="outline" className="bg-white/50 border-slate-200 text-slate-600 font-normal">
                                {subject}
                              </Badge>
                            ))}
                            {teacher.subjects.length > 3 && (
                              <Badge variant="outline" className="bg-white/50 border-slate-200 text-slate-500 font-normal">
                                +{teacher.subjects.length - 3}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="p-4 border-t border-slate-100 bg-white/30 flex items-center gap-2">
                        <Button 
                          className="flex-1 bg-emerald-600 hover:bg-emerald-700 text-white shadow-md shadow-emerald-500/20"
                          onClick={() => handleViewProfile(teacher.id)}
                        >
                          {t.viewProfile}
                        </Button>
                        <Button 
                          variant="outline"
                          size="icon"
                          className="shrink-0 border-slate-200 hover:bg-white hover:text-emerald-600"
                          onClick={() => handleStartChat(teacher)}
                        >
                          <MessageSquare className="w-4 h-4" />
                        </Button>
                      </div>
                    </Card>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>

            {/* Load More */}
            {sortedTeachers.length > displayCount && (
              <div className="mt-10 text-center">
                <LoadMoreButton 
                  onClick={handleLoadMore} 
                  isLoading={isLoadingMore}
                  language={language}
                  label={language === 'bn' ? 'আরো দেখুন' : 'Load More'}
                />
              </div>
            )}
          </div>
        </div>
      </div>

      <Footer language={language} setPage={setPage} />
      
      {/* Dialogs */}
      <ChatDialog 
        open={isChatOpen} 
        onOpenChange={setIsChatOpen}
        teacher={selectedTeacher}
        currentUser={currentUser}
        onSendMessage={handleSendMessage}
      />
      
      <VideoMeetingDialog
        open={isVideoMeetingOpen}
        onOpenChange={setIsVideoMeetingOpen}
        teacher={selectedTeacher}
        onSchedule={handleVideoScheduled}
        language={language}
      />
      
      <HiringAgreementDialog
        open={isHiringOpen}
        onOpenChange={setIsHiringOpen}
        teacher={selectedTeacher}
        currentUser={currentUser}
        onSendAgreement={handleAgreementSent}
        language={language}
      />
      
      <UnifiedAuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        language={language}
        onLogin={onLogin}
      />
    </div>
  );
}