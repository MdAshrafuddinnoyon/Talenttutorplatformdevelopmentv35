import { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Input } from '../components/ui/input';
import { Checkbox } from '../components/ui/checkbox';
import { Slider } from '../components/ui/slider';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { ListAvatar } from '../components/ui/profile-avatar';
import {
  MapPin,
  BookOpen,
  DollarSign,
  Clock,
  Users,
  Star,
  TrendingUp,
  Filter,
  Search,
  Sparkles,
  Calendar,
  ArrowLeft,
  Send,
  CheckCircle,
  GraduationCap,
  Award,
  Zap,
  Verified,
  Target,
  Heart,
  Eye,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';
import { LoadMoreButton } from '../components/LoadMoreButton';
import { BangladeshLocationSelector } from '../components/BangladeshLocationSelector';
import { toast } from 'sonner@2.0.3';
import { canPerformAction, getActionErrorMessage, type UserRole, type User } from '../utils/authGuard';
import { subjectCategories, allSubjects as subjectsFromData } from '../utils/subjectsData';
import { mediums, mediumLabels } from '../utils/mediumData';
import { getLocationById } from '../utils/bangladeshLocations';
import { tuitionPostsAPI } from '../utils/databaseService';

interface BrowseTuitionsPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  userRole: 'teacher' | 'guardian' | 'student' | 'donor' | 'admin' | null;
  currentUser?: User | null;
  isAuthenticated?: boolean;
  onLogin?: (type: UserRole) => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
}

const content = {
  bn: {
    title: 'নতুন টিউশন খুঁজুন',
    subtitle: 'আপনার জন্য উপযুক্ত টিউশন খুঁজে নিন',
    search: 'বিষয়, এলাকা, বা ক্লাস খুঁজুন...',
    filters: 'ফিল্টার',
    clearFilters: 'ফিল্টার রিসেট',
    location: 'এলাকা',
    subject: 'বিষয়',
    class: 'ক্লাস',
    medium: 'মাধ্যম',
    salary: 'বেতন পরিসীমা',
    preferences: 'পছন্দসই',
    verifiedOnly: 'শুধু যাচাইকৃত',
    urgentOnly: 'শুধু জরুরী',
    premiumOnly: 'শুধু প্রিমিয়াম',
    matchedOnly: 'শুধু মিলে যাওয়া',
    applyNow: 'আবেদন করুন',
    viewDetails: 'বিস্তারিত',
    applied: 'আবেদিত',
    applicants: 'আবেদনকারী',
    postedBy: 'পোস্ট করেছেন',
    salary_label: 'বেতন',
    posted: 'পোস্ট করা হয়েছে',
    noResults: 'কোনো টিউশন পাওয়া যায়নি',
    tryDifferentFilters: 'ভিন্ন ফিল্টার ব্যবহার করুন',
    backToHome: 'হোমে ফিরুন',
    backToDashboard: 'ড্যাশবোর্ডে ফিরুন',
    tuitionsFound: 'টি টিউশন পাওয়া গেছে',
    matchedForYou: 'আপনার জন্য উপযুক্ত',
    creditCost: '২ ক্রেডিট',
    sortBy: 'সাজান',
    recommended: 'প্রস্তাবিত',
    newest: 'নতুন আগে',
    highestSalary: 'সর্বোচ্চ বেতন',
    lowestSalary: 'সর্বনিম্ন বেতন',
    mostApplicants: 'বেশি আবেদনকারী',
    perMonth: '/মাস',
    activeTuitions: 'সক্রিয় টিউশন',
    todayPosted: 'আজ পোস্ট হয়েছে',
    matchedJobs: 'মিলে যাওয়া চাকরি',
    saved: 'সংরক্ষিত!',
    unsaved: 'সংরক্ষণ থেকে সরানো',
    applicationSent: 'আবেদন সফল! ২ ক্রেডিট কেটে নেওয়া হয়েছে।',
    posts: 'পোস্ট',
    rating: 'রেটিং',
    views: 'দর্শন',
  },
  en: {
    title: 'Find New Tuitions',
    subtitle: 'Discover tuitions that match your expertise',
    search: 'Search by subject, location, or class...',
    filters: 'Filters',
    clearFilters: 'Clear Filters',
    location: 'Location',
    subject: 'Subject',
    class: 'Class',
    medium: 'Medium',
    salary: 'Salary Range',
    preferences: 'Preferences',
    verifiedOnly: 'Verified Only',
    urgentOnly: 'Urgent Only',
    premiumOnly: 'Premium Only',
    matchedOnly: 'Matched Only',
    applyNow: 'Apply Now',
    viewDetails: 'View Details',
    applied: 'Applied',
    applicants: 'Applicants',
    postedBy: 'Posted By',
    salary_label: 'Salary',
    posted: 'Posted',
    noResults: 'No tuitions found',
    tryDifferentFilters: 'Try different filters',
    backToHome: 'Back to Home',
    backToDashboard: 'Back to Dashboard',
    tuitionsFound: 'tuitions found',
    matchedForYou: 'Matched for You',
    creditCost: '2 Credits',
    sortBy: 'Sort By',
    recommended: 'Recommended',
    newest: 'Newest',
    highestSalary: 'Highest Salary',
    lowestSalary: 'Lowest Salary',
    mostApplicants: 'Most Applicants',
    perMonth: '/month',
    activeTuitions: 'Active Tuitions',
    todayPosted: 'Posted Today',
    matchedJobs: 'Matched Jobs',
    saved: 'Saved!',
    unsaved: 'Removed from saved',
    applicationSent: 'Application sent! 2 credits deducted.',
    posts: 'Posts',
    rating: 'Rating',
    views: 'Views',
  },
};

// Available tuitions data
const availableTuitions = [
  {
    id: '1',
    title: 'গণিত শিক্ষক প্রয়োজন (ক্লাস ৮-১০)',
    guardian: { name: 'জনাব রহমান', rating: 4.8, verified: true, postsCount: 12, avatar: '' },
    subject: 'গণিত',
    subjects: ['গণিত'],
    class: 'ক্লাস ৮-১০',
    medium: 'বাংলা মাধ্যম',
    location: 'ধানমন্ডি, ঢাকা',
    salary: { min: 8000, max: 10000 },
    schedule: 'সপ্তাহে ৪ দিন (সন্ধ্যা ৫-৭)',
    postedDate: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
    applicants: 5,
    views: 45,
    verified: true,
    urgent: true,
    premium: false,
    featured: false,
    matched: true,
    description: 'আমার ছেলের জন্য একজন অভিজ্ঞ গণিত শিক্ষক দরকার। SSC পরীক্ষার্থী।',
  },
  {
    id: '2',
    title: 'ইংরেজি ও বিজ্ঞান টিউটর',
    guardian: { name: 'মিসেস সুমাইয়া', rating: 4.9, verified: true, postsCount: 8, avatar: '' },
    subject: 'ইংরেজি, বিজ্ঞান',
    subjects: ['ইংরেজি', 'বিজ্ঞান'],
    class: 'ক্লাস ৬-৭',
    medium: 'বাংলা মাধ্যম',
    location: 'গুলশান, ঢাকা',
    salary: { min: 6000, max: 8000 },
    schedule: 'সপ্তাহে ৩ দিন (বিকাল ৪-৬)',
    postedDate: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
    applicants: 12,
    views: 89,
    verified: true,
    urgent: false,
    premium: true,
    featured: true,
    matched: false,
    description: 'মেয়ের জন্য ইংরেজি এবং বিজ্ঞান বিষয়ে দক্ষ শিক্ষক চাই।',
  },
  {
    id: '3',
    title: 'পদার্থবিজ্ঞান শিক্ষক (HSC)',
    guardian: { name: 'জনাব করিম', rating: 5.0, verified: true, postsCount: 15, avatar: '' },
    subject: 'পদার্থবিজ্ঞান',
    subjects: ['পদার্থবিজ্ঞান'],
    class: 'HSC',
    medium: 'বাংলা মাধ্যম',
    location: 'মিরপুর, ঢাকা',
    salary: { min: 10000, max: 12000 },
    schedule: 'সপ্তাহে ৫ দিন (সন্ধ্যা ৬-৮)',
    postedDate: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
    applicants: 8,
    views: 120,
    verified: true,
    urgent: true,
    premium: true,
    featured: true,
    matched: true,
    description: 'HSC পরীক্ষার্থীর জন্য পদার্থবিজ্ঞানে expert শিক্ষক প্রয়োজন।',
  },
  {
    id: '4',
    title: 'Primary All Subjects',
    guardian: { name: 'মিসেস নাজমা', rating: 4.7, verified: true, postsCount: 5, avatar: '' },
    subject: 'সব বিষয়',
    subjects: ['সব বিষয়'],
    class: 'ক্লাস ৩',
    medium: 'ইংরেজি মাধ্যম',
    location: 'উত্তরা, ঢাকা',
    salary: { min: 5000, max: 7000 },
    schedule: 'সপ্তাহে ৬ দিন (বিকাল ৩-৫)',
    postedDate: new Date(Date.now() - 3 * 60 * 60 * 1000), // 3 hours ago
    applicants: 15,
    views: 156,
    verified: true,
    urgent: false,
    premium: false,
    featured: false,
    matched: true,
    description: 'ক্লাস ৩ এর বাচ্চার জন্য সব বিষয়ে পড়াতে পারেন এমন শিক্ষক চাই।',
  },
  {
    id: '5',
    title: 'O Level Math & Physics',
    guardian: { name: 'জনাব সাদিক', rating: 4.6, verified: true, postsCount: 20, avatar: '' },
    subject: 'Mathematics, Physics',
    subjects: ['Mathematics', 'Physics'],
    class: 'O Level',
    medium: 'ইংরেজি মাধ্যম',
    location: 'বনানী, ঢাকা',
    salary: { min: 12000, max: 15000 },
    schedule: 'সপ্তাহে ৪ দিন (সন্ধ্যা ৭-৯)',
    postedDate: new Date(Date.now() - 6 * 60 * 60 * 1000), // 6 hours ago
    applicants: 7,
    views: 98,
    verified: true,
    urgent: false,
    premium: true,
    featured: false,
    matched: false,
    description: 'O Level এর জন্য Math ও Physics এ expert শিক্ষক চাই।',
  },
];

export function BrowseTuitionsPage({ 
  language, 
  setLanguage, 
  userRole,
  currentUser,
  isAuthenticated,
  onLogin,
  setPage,
  announcement,
}: BrowseTuitionsPageProps) {
  const t = content[language];
  
  // Database integration
  const [tuitions, setTuitions] = useState(availableTuitions);
  const [isLoadingTuitions, setIsLoadingTuitions] = useState(false);
  
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedLocation, setSelectedLocation] = useState<{
    division?: string;
    district?: string;
    area?: string;
  }>({});
  const [selectedSubject, setSelectedSubject] = useState('all');
  const [selectedClass, setSelectedClass] = useState('all');
  const [selectedMedium, setSelectedMedium] = useState('all');
  const [salaryRange, setSalaryRange] = useState([0, 20000]);
  const [verifiedOnly, setVerifiedOnly] = useState(false);
  const [urgentOnly, setUrgentOnly] = useState(false);
  const [premiumOnly, setPremiumOnly] = useState(false);
  const [matchedOnly, setMatchedOnly] = useState(false);
  const [sortBy, setSortBy] = useState('recommended');
  const [appliedJobs, setAppliedJobs] = useState<string[]>([]);

  // Fetch tuitions from database
  useEffect(() => {
    const fetchTuitions = async () => {
      setIsLoadingTuitions(true);
      try {
        const dbTuitions = await tuitionPostsAPI.getAll({ status: 'open' });
        
        // Handle empty results gracefully (database might not be initialized)
        if (!dbTuitions || dbTuitions.length === 0) {
          console.log('No tuition posts found - using fallback data');
          setFilteredTuitions(allTuitions); // Use static fallback data
          setIsLoadingTuitions(false);
          return;
        }
        
        if (dbTuitions && dbTuitions.length > 0) {
          // Convert database tuitions to app format
          const formattedTuitions = dbTuitions.map((t: any) => ({
            id: t.id,
            title: t.title,
            guardian: {
              name: t.guardianName || 'Guardian',
              rating: 4.5,
              verified: true,
              postsCount: 1,
              avatar: ''
            },
            subject: t.subjects?.[0] || '',
            subjects: t.subjects || [],
            class: t.classes?.[0] || '',
            medium: t.medium || 'বাংলা মাধ্যম',
            location: t.location || 'Dhaka',
            salary: t.budget || { min: 5000, max: 10000 },
            schedule: 'সপ্তাহে ৩ দিন',
            postedDate: new Date(t.createdAt),
            applicants: t.applicants || 0,
            views: 0,
            verified: true,
            urgent: t.urgent || false,
            premium: false,
            featured: false,
            matched: false,
            description: t.description || ''
          }));
          setTuitions([...formattedTuitions, ...availableTuitions]);
        } else {
          setTuitions(availableTuitions);
        }
      } catch (error) {
        console.error('Error fetching tuitions:', error);
        setTuitions(availableTuitions);
      } finally {
        setIsLoadingTuitions(false);
      }
    };

    fetchTuitions();
  }, []);
  const [savedJobs, setSavedJobs] = useState<string[]>([]);
  const [showAuthDialog, setShowAuthDialog] = useState(false);
  
  // Pagination states
  const [displayCount, setDisplayCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const ITEMS_PER_PAGE = 12;

  // Handle Load More
  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 800);
  };

  // Filter tuitions
  const filteredTuitions = availableTuitions
    .filter(tuition => {
      // Search filter
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesSearch = 
          tuition.title.toLowerCase().includes(query) ||
          tuition.description.toLowerCase().includes(query) ||
          tuition.subject.toLowerCase().includes(query) ||
          tuition.location.toLowerCase().includes(query) ||
          tuition.class.toLowerCase().includes(query);
        if (!matchesSearch) return false;
      }

      // Location filter (using Bangladesh Location Selector)
      if (selectedLocation.division || selectedLocation.district || selectedLocation.area) {
        const locationString = tuition.location.toLowerCase();
        let matchesLocation = false;
        
        if (selectedLocation.area) {
          matchesLocation = locationString.includes(selectedLocation.area.toLowerCase());
        } else if (selectedLocation.district) {
          matchesLocation = locationString.includes(selectedLocation.district.toLowerCase());
        } else if (selectedLocation.division) {
          matchesLocation = locationString.includes(selectedLocation.division.toLowerCase());
        }
        
        if (!matchesLocation) return false;
      }

      // Subject filter
      if (selectedSubject !== 'all' && !tuition.subjects.includes(selectedSubject)) {
        return false;
      }

      // Class filter
      if (selectedClass !== 'all' && tuition.class !== selectedClass) {
        return false;
      }

      // Medium filter
      if (selectedMedium !== 'all') {
        const mediumData = mediums.find(m => m.id === selectedMedium);
        if (mediumData) {
          const mediumName = language === 'bn' ? mediumData.name.bn : mediumData.name.en;
          if (tuition.medium !== mediumName && !tuition.medium.includes(mediumName)) {
            return false;
          }
        }
      }

      // Salary filter
      if (tuition.salary.max < salaryRange[0] || tuition.salary.min > salaryRange[1]) {
        return false;
      }

      // Verified filter
      if (verifiedOnly && !tuition.verified) return false;

      // Urgent filter
      if (urgentOnly && !tuition.urgent) return false;

      // Premium filter
      if (premiumOnly && !tuition.premium) return false;

      // Matched filter
      if (matchedOnly && !tuition.matched) return false;

      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'newest':
          return b.postedDate.getTime() - a.postedDate.getTime();
        case 'highestSalary':
          return b.salary.max - a.salary.max;
        case 'lowestSalary':
          return a.salary.min - b.salary.min;
        case 'mostApplicants':
          return b.applicants - a.applicants;
        case 'recommended':
        default:
          return (b.matched ? 1 : 0) - (a.matched ? 1 : 0) || 
                 (b.featured ? 1 : 0) - (a.featured ? 1 : 0) ||
                 b.guardian.rating - a.guardian.rating;
      }
    });

  const getTimeAgo = (date: Date) => {
    const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
    if (seconds < 60) return language === 'bn' ? `${seconds} সেকেন্ড আগে` : `${seconds}s ago`;
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return language === 'bn' ? `${minutes} মিনিট আগে` : `${minutes}m ago`;
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return language === 'bn' ? `${hours} ঘণ্টা আগে` : `${hours}h ago`;
    const days = Math.floor(hours / 24);
    return language === 'bn' ? `${days} দিন আগে` : `${days}d ago`;
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setSelectedLocation({});
    setSelectedSubject('all');
    setSelectedClass('all');
    setSelectedMedium('all');
    setSalaryRange([0, 20000]);
    setVerifiedOnly(false);
    setUrgentOnly(false);
    setPremiumOnly(false);
    setMatchedOnly(false);
    setSortBy('recommended');
  };

  /**
   * Handle tuition application with authentication guard
   */
  const handleApplyNow = (e: React.MouseEvent, tuitionId: string) => {
    e.stopPropagation();
    
    // Check permission to apply
    const permission = canPerformAction('apply_to_tuition', currentUser || null);
    
    if (!permission.allowed) {
      const errorMessage = getActionErrorMessage(permission.reason!, language);
      toast.error(errorMessage);
      
      // Handle different error reasons
      if (permission.reason === 'auth_required') {
        setShowAuthDialog(true);
      } else if (permission.reason === 'profile_incomplete') {
        if (userRole === 'teacher') {
          setPage('teacher-profile');
        }
      } else if (permission.reason === 'insufficient_credits') {
        setPage('credit-purchase');
      }
      
      return;
    }
    
    // Check if user is teacher (only teachers can apply)
    if (userRole !== 'teacher') {
      const msg = language === 'bn' 
        ? 'শুধুমাত্র শিক্ষকরা টিউশনে আবেদন করতে পারবেন' 
        : 'Only teachers can apply to tuitions';
      toast.error(msg);
      return;
    }
    
    // Apply to tuition
    if (!appliedJobs.includes(tuitionId)) {
      setAppliedJobs([...appliedJobs, tuitionId]);
      toast.success(t.applicationSent);
    }
  };

  const handleSaveJob = (tuitionId: string) => {
    if (savedJobs.includes(tuitionId)) {
      setSavedJobs(savedJobs.filter(id => id !== tuitionId));
      toast.success(t.unsaved);
    } else {
      setSavedJobs([...savedJobs, tuitionId]);
      toast.success(t.saved);
    }
  };

  const handleViewDetails = (tuitionId: string) => {
    localStorage.setItem('selectedJobId', tuitionId);
    setPage('job-details');
  };

  const matchedCount = availableTuitions.filter(t => t.matched).length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      <Header
        language={language}
        setLanguage={setLanguage}
        setPage={setPage}
        announcement={announcement}
        onLogin={onLogin}
      />

      {/* Hero Section */}
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
              onClick={() => setPage(userRole === 'teacher' ? 'teacher-dashboard' : 'home')}
              className={`text-white hover:bg-white/20 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {userRole === 'teacher' ? t.backToDashboard : t.backToHome}
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

              {/* Stats Cards */}
              <div className="flex flex-wrap gap-4 mb-8">
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl shadow-lg hover:bg-white/20 transition-colors">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <TrendingUp className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">৫০০+</div>
                    <div className={`text-xs text-teal-100 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.activeTuitions}</div>
                  </div>
                </div>
                
                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl shadow-lg hover:bg-white/20 transition-colors">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Zap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">২০+</div>
                    <div className={`text-xs text-teal-100 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.todayPosted}</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 bg-white/10 backdrop-blur-md border border-white/20 px-5 py-3 rounded-xl shadow-lg hover:bg-white/20 transition-colors">
                  <div className="p-2 bg-white/20 rounded-lg">
                    <Target className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <div className="text-lg font-bold">{matchedCount}</div>
                    <div className={`text-xs text-teal-100 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.matchedJobs}</div>
                  </div>
                </div>
              </div>

              {/* Search Bar */}
              <div className="relative max-w-2xl">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400 z-10" />
                <Input
                  placeholder={t.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className={`pl-12 h-14 bg-white/95 backdrop-blur-xl border-0 shadow-2xl text-gray-900 placeholder:text-gray-500 rounded-xl focus-visible:ring-2 focus-visible:ring-teal-400 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Filters Sidebar */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-4">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-gray-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  {t.filters}
                </h3>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleClearFilters}
                  className="text-[#10B981] hover:text-[#059669]"
                >
                  {t.clearFilters}
                </Button>
              </div>

              <div className="space-y-6">
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

                {/* Subject Filter - Enhanced with Categories */}
                <div>
                  <label className={`text-sm font-medium text-gray-700 mb-2 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {t.subject}
                  </label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className={`w-full ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={`${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''} max-h-[400px]`}>
                      <SelectItem value="all">{language === 'bn' ? 'সকল বিষয়' : 'All Subjects'}</SelectItem>
                      
                      {/* Subject Categories */}
                      {subjectCategories.map((category) => {
                        const categorySubjects = subjectsFromData.filter(s => s.category === category.id);
                        if (categorySubjects.length === 0) return null;
                        
                        return (
                          <div key={category.id}>
                            <div className="px-2 py-1.5 text-xs font-semibold text-gray-500 bg-gray-50">
                              {language === 'bn' ? category.name_bn : category.name_en}
                            </div>
                            {categorySubjects.slice(0, 10).map(subject => (
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
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className={`w-full ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                      <SelectItem value="all">{language === 'bn' ? 'সকল ক্লাস' : 'All Classes'}</SelectItem>
                      <SelectItem value="ক্লাস ৩">ক্লাস ৩</SelectItem>
                      <SelectItem value="ক্লাস ৬-৭">ক্লাস ৬-৭</SelectItem>
                      <SelectItem value="ক্লাস ৮-১০">ক্লাস ৮-১০</SelectItem>
                      <SelectItem value="HSC">HSC</SelectItem>
                      <SelectItem value="O Level">O Level</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Medium Filter */}
                <div>
                  <label className={`text-sm font-medium text-gray-700 mb-2 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {t.medium}
                  </label>
                  <Select value={selectedMedium} onValueChange={setSelectedMedium}>
                    <SelectTrigger className={`w-full ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                      <SelectItem value="all">{language === 'bn' ? 'সকল মাধ্যম' : 'All Mediums'}</SelectItem>
                      {mediums.map(medium => (
                        <SelectItem key={medium.id} value={medium.id}>
                          {medium.icon} {language === 'bn' ? medium.name.bn : medium.name.en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Separator />

                {/* Salary Range */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    {t.salary}
                  </label>
                  <div className="space-y-3">
                    <Slider
                      min={0}
                      max={20000}
                      step={500}
                      value={salaryRange}
                      onValueChange={setSalaryRange}
                    />
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <span>৳{salaryRange[0].toLocaleString()}</span>
                      <span>৳{salaryRange[1].toLocaleString()}</span>
                    </div>
                  </div>
                </div>

                <Separator />

                {/* Preferences */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-3 block">
                    {t.preferences}
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
                        {t.verifiedOnly}
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="urgent"
                        checked={urgentOnly}
                        onCheckedChange={(checked) => setUrgentOnly(checked as boolean)}
                      />
                      <label htmlFor="urgent" className="text-sm text-gray-700 cursor-pointer flex items-center gap-2">
                        <Zap className="w-4 h-4 text-red-600" />
                        {t.urgentOnly}
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="premium"
                        checked={premiumOnly}
                        onCheckedChange={(checked) => setPremiumOnly(checked as boolean)}
                      />
                      <label htmlFor="premium" className="text-sm text-gray-700 cursor-pointer flex items-center gap-2">
                        <Award className="w-4 h-4 text-yellow-600" />
                        {t.premiumOnly}
                      </label>
                    </div>

                    <div className="flex items-center gap-2">
                      <Checkbox
                        id="matched"
                        checked={matchedOnly}
                        onCheckedChange={(checked) => setMatchedOnly(checked as boolean)}
                      />
                      <label htmlFor="matched" className="text-sm text-gray-700 cursor-pointer flex items-center gap-2">
                        <Target className="w-4 h-4 text-green-600" />
                        {t.matchedOnly}
                      </label>
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Header with count and sort */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-2">
                <h2 className="text-2xl font-bold text-gray-900">
                  {filteredTuitions.length} {t.tuitionsFound}
                </h2>
                {(verifiedOnly || urgentOnly || premiumOnly || matchedOnly || selectedLocation !== 'all') && (
                  <Badge variant="secondary">ফিল্টার সক্রিয়</Badge>
                )}
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:block">{t.sortBy}:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="recommended">{t.recommended}</SelectItem>
                    <SelectItem value="newest">{t.newest}</SelectItem>
                    <SelectItem value="highestSalary">{t.highestSalary}</SelectItem>
                    <SelectItem value="lowestSalary">{t.lowestSalary}</SelectItem>
                    <SelectItem value="mostApplicants">{t.mostApplicants}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Tuitions List */}
            {filteredTuitions.length === 0 ? (
              <Card className="p-12 text-center">
                <Search className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{t.noResults}</h3>
                <p className="text-gray-600 mb-4">{t.tryDifferentFilters}</p>
                <Button onClick={handleClearFilters} variant="outline">
                  {t.clearFilters}
                </Button>
              </Card>
            ) : (
              <>
                <div className="space-y-4">
                  {filteredTuitions.slice(0, displayCount).map((tuition, idx) => (
                  <motion.div
                    key={tuition.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <Card 
                      className={`
                        group hover:shadow-xl transition-all duration-300 cursor-pointer
                        ${tuition.featured ? 'border-2 border-amber-400 bg-gradient-to-r from-amber-50/50 to-yellow-50/50' : 'border hover:border-green-200'}
                        ${tuition.matched ? 'ring-2 ring-green-500 ring-offset-2' : ''}
                      `}
                      onClick={() => handleViewDetails(tuition.id)}
                    >
                      <CardContent className="p-6">
                        {/* Header */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-3 flex-wrap">
                              {tuition.matched && (
                                <Badge className="bg-gradient-to-r from-green-500 to-emerald-500 text-white">
                                  <Target className="w-3 h-3 mr-1" />
                                  {t.matchedForYou}
                                </Badge>
                              )}
                              {tuition.featured && (
                                <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                                  <Award className="w-3 h-3 mr-1" />
                                  প্রিমিয়াম
                                </Badge>
                              )}
                              {tuition.urgent && (
                                <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                                  <Zap className="w-3 h-3 mr-1" />
                                  জরুরি
                                </Badge>
                              )}
                              <span className="text-xs text-gray-500">{getTimeAgo(tuition.postedDate)}</span>
                            </div>

                            <h3 className="text-gray-900 mb-2 group-hover:text-[#10B981] transition-colors">
                              {tuition.title}
                            </h3>
                            <p className="text-gray-600 text-sm line-clamp-2 mb-3">
                              {tuition.description}
                            </p>

                            {/* Subjects */}
                            <div className="flex flex-wrap gap-2 mb-4">
                              {tuition.subjects.map((subject) => (
                                <Badge key={subject} variant="secondary" className="bg-teal-50 text-teal-700 border-teal-200">
                                  <BookOpen className="w-3 h-3 mr-1" />
                                  {subject}
                                </Badge>
                              ))}
                              <Badge variant="outline" className="border-gray-300 text-gray-600">
                                <GraduationCap className="w-3 h-3 mr-1" />
                                {tuition.class}
                              </Badge>
                            </div>

                            {/* Details Grid */}
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4">
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <MapPin className="w-4 h-4 text-gray-400" />
                                <span>{tuition.location}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm">
                                <DollarSign className="w-4 h-4 text-green-600" />
                                <span className="font-semibold text-green-700">
                                  ৳{tuition.salary.min.toLocaleString()}-{tuition.salary.max.toLocaleString()}
                                </span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span>{tuition.schedule.split(' ')[0]}</span>
                              </div>
                              <div className="flex items-center gap-2 text-sm text-gray-600">
                                <Calendar className="w-4 h-4 text-gray-400" />
                                <span>{tuition.medium}</span>
                              </div>
                            </div>
                          </div>

                          {/* Save Button */}
                          <Button 
                            variant="ghost" 
                            size="icon"
                            className="shrink-0"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleSaveJob(tuition.id);
                            }}
                          >
                            <Heart 
                              className={`w-5 h-5 transition-all ${
                                savedJobs.includes(tuition.id) 
                                  ? 'fill-red-500 text-red-500' 
                                  : 'text-gray-400 hover:text-red-500'
                              }`} 
                            />
                          </Button>
                        </div>

                        {/* Footer */}
                        <div className="flex items-center justify-between pt-4 border-t">
                          <div className="flex items-center gap-3">
                            <ListAvatar 
                              src={tuition.guardian.avatar}
                              alt={tuition.guardian.name}
                              fallback={tuition.guardian.name[0]}
                              verified={tuition.guardian.verified}
                            />
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium text-gray-900">{tuition.guardian.name}</span>
                              </div>
                              <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="flex items-center gap-1">
                                  <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
                                  {tuition.guardian.rating}
                                </span>
                                <span>{tuition.guardian.postsCount} {t.posts}</span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="hidden sm:flex items-center gap-3 text-xs text-gray-500">
                              <span className="flex items-center gap-1">
                                <Users className="w-4 h-4" />
                                {tuition.applicants}
                              </span>
                              <span className="flex items-center gap-1">
                                <Eye className="w-4 h-4" />
                                {tuition.views}
                              </span>
                            </div>

                            <div className="flex gap-2">
                              <Button 
                                variant="outline" 
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleViewDetails(tuition.id);
                                }}
                              >
                                {t.viewDetails}
                              </Button>
                              {appliedJobs.includes(tuition.id) ? (
                                <Button 
                                  size="sm"
                                  disabled
                                  className="bg-gray-400"
                                >
                                  <CheckCircle className="w-4 h-4 mr-1" />
                                  {t.applied}
                                </Button>
                              ) : (
                                <Button 
                                  size="sm"
                                  className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white hover:from-emerald-700 hover:to-teal-700"
                                  onClick={(e) => handleApplyNow(e, tuition.id)}
                                >
                                  <Send className="w-4 h-4 mr-1" />
                                  {t.applyNow}
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  ))}
                </div>
                
                {/* Load More Button */}
                {filteredTuitions.length > displayCount && (
                  <LoadMoreButton
                    onClick={handleLoadMore}
                    loading={isLoadingMore}
                    hasMore={filteredTuitions.length > displayCount}
                    language={language}
                    totalShown={Math.min(displayCount, filteredTuitions.length)}
                    totalAvailable={filteredTuitions.length}
                  />
                )}
              </>
            )}
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

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
