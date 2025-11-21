import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { getTuitionPostById } from '../utils/tuitionData';
import { 
  Briefcase, 
  MapPin, 
  DollarSign, 
  Clock, 
  Calendar, 
  User, 
  Star,
  BookOpen,
  Users,
  CheckCircle,
  AlertCircle,
  Share2,
  Flag,
  Heart,
  Send,
  ArrowLeft,
  Verified,
  Award,
  Target,
  TrendingUp,
  Eye,
  Zap,
  MessageCircle,
  Video,
  FileText,
  Info,
  Sparkles
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { GradientButton } from '../components/ui/gradient-button';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { HeaderAvatar } from '../components/ui/profile-avatar';
import { Textarea } from '../components/ui/textarea';
import { Separator } from '../components/ui/separator';
import { Label } from '../components/ui/label';
import { Alert, AlertDescription } from '../components/ui/alert';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import { toast } from 'sonner@2.0.3';
import { ReviewsSection } from '../components/ReviewsSection';
import { motion } from 'motion/react';
import { copyToClipboard } from '../utils/clipboard';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';
import { canPerformAction, getActionErrorMessage, type User, type UserRole } from '../utils/authGuard';
import { handleApplyToTuition, handleApplyToTuitionBackend, showCreditActionToast } from '../utils/creditHandler';

interface JobDetailsPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onSelectGuardian?: (guardianId: string) => void;
  currentUser?: User | null;
  isAuthenticated?: boolean;
  onLogin?: (type: UserRole) => void;
}

const translations = {
  bn: {
    jobDetails: 'টিউশন বিস্তারিত',
    backToPosts: 'পোস্ট তালিকায় ফিরুন',
    salary: 'বেতন',
    location: 'স্থান',
    type: 'ধরণ',
    subjects: 'বিষয়সমূহ',
    grade: 'শ্রেণী',
    schedule: 'সময়সূচী',
    duration: 'সময়কাল',
    startDate: 'শুরুর তারিখ',
    mode: 'মাধ্যম',
    requirements: 'যোগ্যতা',
    preferences: 'পছন্দ',
    description: 'বিবরণ',
    applyNow: 'এখনই আবেদন করুন',
    applied: 'আবেদিত',
    saveJob: 'সংরক্ষণ',
    saved: 'সংরক্ষিত',
    shareJob: 'শেয়ার করুন',
    reportJob: 'রিপোর্ট করুন',
    aboutGuardian: 'অভিভাবক সম্পর্কে',
    memberSince: 'সদস্য থেকে',
    jobsPosted: 'পোস্টকৃত জব',
    rating: 'রেটিং',
    reviews: 'রিভিউ',
    coverLetter: 'কভার লেটার',
    coverLetterPlaceholder: 'আপনার যোগ্যতা এবং আগ্রহ সম্পর্কে লিখুন... (ন্যূনতম ১০০ শব্দ)',
    submitApplication: 'আবেদন জমা দিন',
    cancel: 'বাতিল',
    applicationSubmitted: 'আপনার আবেদন সফলভাবে জমা হয়েছে!',
    writeCoverLetter: 'অনুগ্রহ করে কভার লেটার লিখুন',
    jobSaved: 'জব সংরক্ষণ করা হয়েছে!',
    jobUnsaved: 'সংরক্ষণ থেকে সরানো হয়েছে',
    linkCopied: 'লিঙ্ক কপি করা হয়েছে!',
    postedOn: 'পোস্ট করা হয়েছে',
    applicants: 'জন আবেদনকারী',
    views: 'দর্শন',
    quickInfo: 'দ্রুত তথ্য',
    applyForJob: 'এই টিউশনে আবেদন করুন',
    applicationCost: 'আবেদন খরচ: ২ ক্রেডিট',
    contactGuardian: 'অভিভাবকের সাথে যোগাযোগ',
    sendMessage: 'মেসেজ পাঠান',
    scheduleVideo: 'ভিডিও মিটিং',
    viewProfile: 'প্রোফাইল দেখুন',
    similarJobs: 'অনুরূপ টিউশন',
    verified: 'যাচাইকৃত',
    urgent: 'জরুরি',
    featured: 'ফিচারড',
    perMonth: '/মাস',
    today: 'আজ',
    yesterday: 'গতকাল',
    daysAgo: 'দিন আগে',
  },
  en: {
    jobDetails: 'Tuition Details',
    backToPosts: 'Back to Posts',
    salary: 'Salary',
    location: 'Location',
    type: 'Type',
    subjects: 'Subjects',
    grade: 'Grade',
    schedule: 'Schedule',
    duration: 'Duration',
    startDate: 'Start Date',
    mode: 'Mode',
    requirements: 'Requirements',
    preferences: 'Preferences',
    description: 'Description',
    applyNow: 'Apply Now',
    applied: 'Applied',
    saveJob: 'Save Job',
    saved: 'Saved',
    shareJob: 'Share Job',
    reportJob: 'Report Job',
    aboutGuardian: 'About Guardian',
    memberSince: 'Member Since',
    jobsPosted: 'Jobs Posted',
    rating: 'Rating',
    reviews: 'Reviews',
    coverLetter: 'Cover Letter',
    coverLetterPlaceholder: 'Write about your qualifications and interest... (minimum 100 words)',
    submitApplication: 'Submit Application',
    cancel: 'Cancel',
    applicationSubmitted: 'Your application has been submitted successfully!',
    writeCoverLetter: 'Please write a cover letter',
    jobSaved: 'Job saved successfully!',
    jobUnsaved: 'Removed from saved jobs',
    linkCopied: 'Link copied!',
    postedOn: 'Posted on',
    applicants: 'applicants',
    views: 'views',
    quickInfo: 'Quick Info',
    applyForJob: 'Apply for this tuition',
    applicationCost: 'Application cost: 2 credits',
    contactGuardian: 'Contact Guardian',
    sendMessage: 'Send Message',
    scheduleVideo: 'Schedule Video',
    viewProfile: 'View Profile',
    similarJobs: 'Similar Jobs',
    verified: 'Verified',
    urgent: 'Urgent',
    featured: 'Featured',
    perMonth: '/month',
    today: 'Today',
    yesterday: 'Yesterday',
    daysAgo: 'days ago',
  },
};

export function JobDetailsPage({ language, setLanguage, setPage, announcement, onSelectGuardian, currentUser, isAuthenticated, onLogin }: JobDetailsPageProps) {
  const [coverLetter, setCoverLetter] = useState('');
  const [isApplied, setIsApplied] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [jobData, setJobData] = useState<any>(null);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const t = translations[language];

  // Load job data from localStorage
  useEffect(() => {
    const selectedJobId = localStorage.getItem('selectedJobId');
    if (selectedJobId) {
      const post = getTuitionPostById(selectedJobId);
      if (post) {
        setJobData({
          id: post.id,
          title: post.title,
          description: post.description,
          salary: `${post.budget.min}-${post.budget.max}`,
          location: post.location,
          type: post.type || 'Part-time',
          subjects: post.subjects,
          grade: post.studentClass,
          schedule: post.schedule,
          duration: post.duration,
          startDate: post.startDate || 'শীঘ্রই',
          mode: post.mode || 'অফলাইন',
          requirements: post.requirements || [
            'ন্যূনতম স্নাতক ডিগ্রি',
            'সংশ্লিষ্ট বিষয়ে ভালো দক্ষতা',
            '২+ বছরের টিউশন অভিজ্ঞতা',
          ],
          preferences: [
            post.preferences?.gender !== 'any' ? `${post.preferences.gender === 'male' ? 'পুরুষ' : 'মহিলা'} শিক্ষক অগ্রাধিকার` : '',
            post.preferences?.experience ? `অভিজ্ঞতা: ${post.preferences.experience}` : '',
            post.preferences?.qualification ? `যোগ্যতা: ${post.preferences.qualification}` : '',
          ].filter(p => p),
          postedDate: post.postedDate,
          applicants: post.applicants,
          views: post.views || 124,
          urgent: post.urgent,
          featured: post.featured,
          verified: post.verified,
          guardian: {
            id: post.parent.id || '1',
            name: post.parent.name,
            avatar: post.parent.avatar,
            rating: post.parent.rating,
            reviews: post.parent.reviews || 0,
            jobsPosted: post.parent.jobsPosted || post.parent.postsCount,
            memberSince: post.parent.memberSince || '২০২৪',
            verified: post.parent.verified,
          },
        });

        // Check if this job is already saved by the current user
        if (currentUser && currentUser.role === 'teacher') {
          const savedJobsKey = `saved_jobs_${currentUser.id}`;
          const savedJobs = JSON.parse(localStorage.getItem(savedJobsKey) || '[]');
          setIsSaved(savedJobs.includes(post.id));
        }

        // Check if already applied
        if (currentUser && currentUser.role === 'teacher') {
          const appliedJobsKey = `applied_jobs_${currentUser.id}`;
          const appliedJobs = JSON.parse(localStorage.getItem(appliedJobsKey) || '[]');
          setIsApplied(appliedJobs.includes(post.id));
        }
      }
    }
  }, [currentUser]);

  // Fallback job data
  const job = jobData || {
    id: '1',
    title: 'ক্লাস ১০ গণিত ও পদার্থবিজ্ঞান টিউটর',
    description: 'আমরা একজন অভিজ্ঞ শিক্ষক খুঁজছি যিনি ক্লাস ১০ এর গণিত এবং পদার্থবিজ্ঞান পড়াতে পারবেন। শিক্ষার্থী SSC 2026 পরীক্ষার প্রস্তুতি নিচ্ছে। শিক্ষককে নিয়মিত, পরিশ্রমী এবং ধৈর্যশীল হতে হবে। আমরা এমন কাউকে চাই যিনি শিক্ষার্থীকে ভালোভাবে বুঝিয়ে পড়াতে পারবেন।',
    salary: '১৫০০০-২০০০০',
    location: 'ধানমন্ডি, ঢাকা',
    type: 'Part-time',
    subjects: ['গণিত', 'পদার্থবিজ্ঞান'],
    grade: 'ক্লাস ১০',
    schedule: '৫ দিন/সপ্তাহ, ২ ঘণ্টা/দিন',
    duration: '৬ মাস',
    startDate: '১ নভেম্বর, ২০২৫',
    mode: 'অফলাইন',
    requirements: [
      'ন্যূনতম স্নাতক ডিগ্রি',
      'গণিত বা পদার্থবিজ্ঞানে ভালো দক্ষতা',
      '৩+ বছরের টিউশন অভিজ্ঞতা',
      'SSC/HSC লেভেল পড়ানোর অভিজ্ঞতা',
    ],
    preferences: [
      'পুরুষ শিক্ষক অগ্রাধিকার',
      'অভিজ্ঞতা: ৩+ বছর',
      'যোগ্যতা: বিশ্ববিদ্যালয় স্নাতক',
    ],
    postedDate: new Date(Date.now() - 1000 * 60 * 60 * 24 * 2),
    applicants: 12,
    views: 156,
    urgent: true,
    featured: true,
    verified: true,
    guardian: {
      id: '2',
      name: 'সাবিনা আক্তার',
      avatar: '',
      rating: 4.8,
      reviews: 8,
      jobsPosted: 5,
      memberSince: '২০২৩',
      verified: true,
    },
  };

  // Check authentication before showing apply dialog
  const handleApplyClick = () => {
    // Check if user can apply to tuition
    const permission = canPerformAction('apply_to_tuition', currentUser || null);
    
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
    
    // Check if user is a teacher
    if (currentUser?.role !== 'teacher') {
      const errorMsg = language === 'bn' 
        ? 'শুধুমাত্র শিক্ষকরা টিউশনে আবেদন করতে পারবেন' 
        : 'Only teachers can apply to tuitions';
      toast.error(errorMsg);
      return;
    }
    
    // All checks passed - show apply dialog
    setShowApplyDialog(true);
  };

  // Submit application after dialog is filled
  const handleSubmitApplication = async () => {
    if (coverLetter.trim().length < 50) {
      toast.error(language === 'bn' ? 'কভার লেটার ন্যূনতম ৫০ অক্ষর হতে হবে' : 'Cover letter must be at least 50 characters');
      return;
    }

    // Show loading state
    const loadingMsg = language === 'bn' ? 'প্রক্রিয়া করা হচ্ছে...' : 'Processing...';
    const loadingToast = toast.loading(loadingMsg);

    try {
      // Deduct credits for applying (using backend)
      const result = await handleApplyToTuitionBackend(currentUser || null, job.id, language);
      
      toast.dismiss(loadingToast);
      
      if (!result.success) {
        showCreditActionToast(result, language);
        
        // Handle different error scenarios
        if (result.errorCode === 'INSUFFICIENT_CREDITS') {
          setShowApplyDialog(false);
          setPage('credit-purchase');
        } else if (result.errorCode === 'PROFILE_INCOMPLETE') {
          setShowApplyDialog(false);
          setPage('teacher-profile');
        }
        
        return;
      }

      // Credit deduction successful
      setIsApplied(true);
      setShowApplyDialog(false);
      
      // Save applied job to localStorage for teacher dashboard
      if (currentUser) {
        const appliedJobsKey = `applied_jobs_${currentUser.id}`;
        const appliedJobs = JSON.parse(localStorage.getItem(appliedJobsKey) || '[]');
        
        const applicationData = {
          jobId: job.id,
          jobTitle: job.title,
          guardianName: job.guardian.name,
          location: job.location,
          salary: job.salary,
          subjects: job.subjects,
          coverLetter: coverLetter,
          appliedDate: new Date().toISOString(),
          status: 'pending',
          creditsUsed: Math.abs(result.transaction?.amount || 2),
        };
        
        appliedJobs.push(applicationData);
        localStorage.setItem(appliedJobsKey, JSON.stringify(appliedJobs));
        
        // Also track just the IDs for quick checking
        const appliedIdsKey = `applied_job_ids_${currentUser.id}`;
        const appliedIds = JSON.parse(localStorage.getItem(appliedIdsKey) || '[]');
        if (!appliedIds.includes(job.id)) {
          appliedIds.push(job.id);
          localStorage.setItem(appliedIdsKey, JSON.stringify(appliedIds));
        }
      }
      
      // Show success with credit info
      const successMsg = language === 'bn'
        ? `আবেদন সফল! ${Math.abs(result.transaction?.amount || 0)} ক্রেডিট ব্যবহার করা হয়েছে। অবশিষ্ট: ${result.transaction?.balance || 0} ক্রেডিট`
        : `Application successful! ${Math.abs(result.transaction?.amount || 0)} credits used. Remaining: ${result.transaction?.balance || 0} credits`;
      
      toast.success(successMsg, { duration: 5000 });

      // Update user credits in state (if available)
      if (currentUser && result.transaction) {
        currentUser.credits = result.transaction.balance;
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error(language === 'bn' ? 'একটি ত্রুটি ঘটেছে' : 'An error occurred');
      console.error('Submit application error:', error);
    }
  };

  const handleSave = () => {
    // Check if user is logged in
    if (!isAuthenticated || !currentUser) {
      toast.error(language === 'bn' ? 'সংরক্ষণ করতে লগইন করুন' : 'Login to save jobs');
      setShowAuthDialog(true);
      return;
    }

    // Only teachers can save jobs
    if (currentUser.role !== 'teacher') {
      toast.error(language === 'bn' ? 'শুধুমাত্র শিক্ষকরা টিউশন সংরক্ষণ করতে পারবেন' : 'Only teachers can save jobs');
      return;
    }

    // Get saved jobs from localStorage
    const savedJobsKey = `saved_jobs_${currentUser.id}`;
    const savedJobs = JSON.parse(localStorage.getItem(savedJobsKey) || '[]');
    
    if (isSaved) {
      // Remove from saved
      const filtered = savedJobs.filter((id: string) => id !== job.id);
      localStorage.setItem(savedJobsKey, JSON.stringify(filtered));
      setIsSaved(false);
      toast.success(t.jobUnsaved);
    } else {
      // Add to saved
      if (!savedJobs.includes(job.id)) {
        savedJobs.push(job.id);
        localStorage.setItem(savedJobsKey, JSON.stringify(savedJobs));
      }
      setIsSaved(true);
      toast.success(t.jobSaved);
    }
  };

  const [showShareMenu, setShowShareMenu] = useState(false);

  const handleShare = async () => {
    try {
      // Check if Web Share API is available and can share
      if (navigator.share && navigator.canShare) {
        const shareData = {
          title: job.title,
          text: `${job.title} - ৳${job.salary}/মাস - ${job.location}`,
          url: window.location.href,
        };
        
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          toast.success(language === 'bn' ? 'শেয়ার করা হয়েছে' : 'Shared successfully');
          return;
        }
      }
      
      // Fallback to custom share menu
      setShowShareMenu(true);
    } catch (error: any) {
      // User cancelled or error occurred
      if (error.name === 'AbortError') {
        // User cancelled, do nothing
        return;
      }
      
      // For other errors, show share menu fallback
      console.log('Share API error:', error.name);
      setShowShareMenu(true);
    }
  };

  const shareToSocial = (platform: string) => {
    const url = encodeURIComponent(window.location.href);
    const title = encodeURIComponent(job.title);
    const description = encodeURIComponent(`${job.title} - ৳${job.salary}/মাস - ${job.location}`);
    
    let shareUrl = '';
    
    switch (platform) {
      case 'facebook':
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${url}`;
        break;
      case 'whatsapp':
        shareUrl = `https://wa.me/?text=${description}%20${url}`;
        break;
      case 'linkedin':
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${url}`;
        break;
      case 'twitter':
        shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${description}`;
        break;
      case 'telegram':
        shareUrl = `https://t.me/share/url?url=${url}&text=${description}`;
        break;
      case 'email':
        shareUrl = `mailto:?subject=${title}&body=${description}%20${url}`;
        break;
      case 'copy':
        copyToClipboard(window.location.href);
        toast.success(t.linkCopied);
        setShowShareMenu(false);
        return;
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400');
      setShowShareMenu(false);
      toast.success(language === 'bn' ? 'শেয়ার মেনু খোলা হয়েছে' : 'Share window opened');
    }
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return t.today;
    if (diffInDays === 1) return t.yesterday;
    if (diffInDays < 7) return `${diffInDays} ${t.daysAgo}`;
    
    return date.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} onLogin={onLogin} />
      
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 via-cyan-600 to-teal-600 text-white py-8">
        <div className="container mx-auto px-4">
          <Button
            variant="ghost"
            onClick={() => setPage('tuition-posts')}
            className="text-white hover:bg-white/20 mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToPosts}
          </Button>
        </div>
      </div>

      <main className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Job Header Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <Card className="border-2">
                <CardContent className="p-6">
                  {/* Badges */}
                  <div className="flex flex-wrap items-center gap-2 mb-4">
                    {job.featured && (
                      <Badge className="bg-gradient-to-r from-yellow-500 to-orange-500 text-white">
                        <Award className="w-3 h-3 mr-1" />
                        {t.featured}
                      </Badge>
                    )}
                    {job.urgent && (
                      <Badge className="bg-gradient-to-r from-red-500 to-pink-500 text-white animate-pulse">
                        <Zap className="w-3 h-3 mr-1" />
                        {t.urgent}
                      </Badge>
                    )}
                    {job.verified && (
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200" variant="outline">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {t.verified}
                      </Badge>
                    )}
                    <Badge variant="outline">{job.type}</Badge>
                  </div>

                  {/* Title */}
                  <h1 className="text-3xl font-bold text-gray-900 mb-4">{job.title}</h1>

                  {/* Meta Info */}
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 mb-6">
                    <div className="flex items-center gap-2">
                      <Calendar className="w-4 h-4" />
                      <span>{t.postedOn} {formatDate(job.postedDate)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Users className="w-4 h-4" />
                      <span>{job.applicants} {t.applicants}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      <span>{job.views} {t.views}</span>
                    </div>
                  </div>

                  {/* Salary & Location */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                    <div className="flex items-center gap-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="p-2 bg-green-500 rounded-lg">
                        <DollarSign className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t.salary}</p>
                        <p className="text-xl font-bold text-green-700">৳{job.salary} {t.perMonth}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="p-2 bg-blue-500 rounded-lg">
                        <MapPin className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">{t.location}</p>
                        <p className="text-lg font-semibold text-blue-700">{job.location}</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-wrap gap-3">
                    {isApplied ? (
                      <Button size="lg" disabled className="bg-gray-400">
                        <CheckCircle className="w-5 h-5 mr-2" />
                        {t.applied}
                      </Button>
                    ) : (
                      <GradientButton 
                        variant="blue"
                        size="lg"
                        onClick={handleApplyClick}
                      >
                        <Send className="w-5 h-5" />
                        {t.applyNow}
                      </GradientButton>
                    )}
                    <Button 
                      size="lg" 
                      variant="outline"
                      onClick={handleSave}
                      className={isSaved ? 'border-red-500 text-red-500' : ''}
                    >
                      <Heart className={`w-5 h-5 mr-2 ${isSaved ? 'fill-red-500' : ''}`} />
                      {isSaved ? t.saved : t.saveJob}
                    </Button>
                    <Button size="lg" variant="outline" onClick={handleShare}>
                      <Share2 className="w-5 h-5 mr-2" />
                      {t.shareJob}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Description Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    {t.description}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-700 leading-relaxed whitespace-pre-line">
                    {job.description}
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            {/* Quick Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Info className="w-5 h-5" />
                    {t.quickInfo}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Subjects */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <BookOpen className="w-4 h-4 text-emerald-600" />
                        <span className="font-semibold text-gray-900">{t.subjects}</span>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {job.subjects.map((subject: string) => (
                          <Badge key={subject} variant="secondary" className="bg-emerald-50 text-emerald-700">
                            {subject}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Grade */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Target className="w-4 h-4 text-blue-600" />
                        <span className="font-semibold text-gray-900">{t.grade}</span>
                      </div>
                      <Badge className="bg-blue-100 text-blue-700 border-blue-200" variant="outline">
                        {job.grade}
                      </Badge>
                    </div>

                    {/* Schedule */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Clock className="w-4 h-4 text-green-600" />
                        <span className="font-semibold text-gray-900">{t.schedule}</span>
                      </div>
                      <p className="text-gray-700">{job.schedule}</p>
                    </div>

                    {/* Duration */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Calendar className="w-4 h-4 text-amber-600" />
                        <span className="font-semibold text-gray-900">{t.duration}</span>
                      </div>
                      <p className="text-gray-700">{job.duration}</p>
                    </div>

                    {/* Start Date */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Sparkles className="w-4 h-4 text-pink-600" />
                        <span className="font-semibold text-gray-900">{t.startDate}</span>
                      </div>
                      <p className="text-gray-700">{job.startDate}</p>
                    </div>

                    {/* Mode */}
                    <div>
                      <div className="flex items-center gap-2 mb-3">
                        <Video className="w-4 h-4 text-red-600" />
                        <span className="font-semibold text-gray-900">{t.mode}</span>
                      </div>
                      <Badge variant="outline">{job.mode}</Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>

            {/* Requirements Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    {t.requirements}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {job.requirements.map((req: string, index: number) => (
                      <li key={index} className="flex items-start gap-3">
                        <div className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <CheckCircle className="w-3 h-3 text-white" />
                        </div>
                        <span className="text-gray-700">{req}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </motion.div>

            {/* Preferences Card */}
            {job.preferences && job.preferences.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                      <Star className="w-5 h-5" />
                      {t.preferences}
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-3">
                      {job.preferences.map((pref: string, index: number) => (
                        <li key={index} className="flex items-start gap-3">
                          <div className="w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                            <Star className="w-3 h-3 text-white fill-white" />
                          </div>
                          <span className="text-gray-700">{pref}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </motion.div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Apply Card */}
            {!isApplied && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
              >
                <Card className="sticky top-4 border-2 border-blue-200 shadow-lg">
                  <CardContent className="p-6">
                    <div className="text-center mb-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-teal-500 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Send className="w-8 h-8 text-white" />
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{t.applyForJob}</h3>
                      <p className="text-sm text-gray-600 mb-4">{t.applicationCost}</p>
                      <GradientButton 
                        variant="blue"
                        className="w-full"
                        size="lg"
                        onClick={handleApplyClick}
                      >
                        {t.applyNow}
                      </GradientButton>
                    </div>

                    <Separator className="my-4" />

                    <Alert className="bg-blue-50 border-blue-200">
                      <Info className="w-4 h-4 text-blue-600" />
                      <AlertDescription className="text-sm text-blue-900">
                        {language === 'bn' 
                          ? 'আবেদন করার পর আপনি সরাসরি অভিভাবক��র সাথে যোগাযোগ করতে পারবেন।'
                          : 'After applying, you can directly contact the guardian.'
                        }
                      </AlertDescription>
                    </Alert>
                  </CardContent>
                </Card>
              </motion.div>
            )}

            {/* Guardian Card */}
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
            >
              <Card className="sticky top-4">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <User className="w-5 h-5" />
                    {t.aboutGuardian}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-start gap-4 mb-6">
                    <HeaderAvatar 
                      src={job.guardian.avatar}
                      alt={job.guardian.name}
                      fallback={job.guardian.name[0]}
                      verified={job.guardian.verified}
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4 className="font-semibold text-lg text-gray-900">{job.guardian.name}</h4>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-gray-600 mb-2">
                        <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                        <span className="font-semibold">{job.guardian.rating}</span>
                        <span>({job.guardian.reviews} {t.reviews})</span>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 mb-6">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t.memberSince}</span>
                      <span className="font-semibold">{job.guardian.memberSince}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">{t.jobsPosted}</span>
                      <span className="font-semibold">{job.guardian.jobsPosted}</span>
                    </div>
                  </div>

                  <Separator className="my-4" />

                  <div className="space-y-2">
                    <Button 
                      className="w-full" 
                      variant="outline"
                      onClick={() => {
                        if (onSelectGuardian) {
                          onSelectGuardian(job.guardian.id);
                        }
                        setPage('guardian-profile-view');
                      }}
                    >
                      <User className="w-4 h-4 mr-2" />
                      {t.viewProfile}
                    </Button>
                    <Button className="w-full" variant="outline">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      {t.sendMessage}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </main>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-2xl">{t.applyForJob}</DialogTitle>
            <DialogDescription>
              {job.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-6 py-4">
            {/* Job Summary */}
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <span className="text-gray-600">{t.salary}:</span>
                  <span className="font-semibold ml-2">৳{job.salary}</span>
                </div>
                <div>
                  <span className="text-gray-600">{t.location}:</span>
                  <span className="font-semibold ml-2">{job.location}</span>
                </div>
              </div>
            </div>

            {/* Cover Letter */}
            <div>
              <Label htmlFor="coverLetter" className="mb-2 block text-base">
                {t.coverLetter} *
              </Label>
              <Textarea
                id="coverLetter"
                rows={8}
                placeholder={t.coverLetterPlaceholder}
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                className="resize-none"
              />
              <p className="text-xs text-gray-500 mt-2">
                {coverLetter.length} অক্ষর (ন্যূনতম ৫০)
              </p>
            </div>

            {/* Info Alert */}
            <Alert className="bg-blue-50 border-blue-200">
              <Info className="w-4 h-4 text-blue-600" />
              <AlertDescription className="text-sm text-blue-900">
                {t.applicationCost}
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApplyDialog(false)}>
              {t.cancel}
            </Button>
            <GradientButton 
              variant="blue"
              onClick={handleSubmitApplication}
            >
              <Send className="w-4 h-4" />
              {t.submitApplication}
            </GradientButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Authentication Dialog */}
      <UnifiedAuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        language={language}
        onLogin={onLogin || (() => {})}
        initialMode="register"
      />

      {/* Share Menu Dialog */}
      <Dialog open={showShareMenu} onOpenChange={setShowShareMenu}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Share2 className="w-5 h-5" />
              {language === 'bn' ? 'শেয়ার করুন' : 'Share'}
            </DialogTitle>
            <DialogDescription>
              {language === 'bn' 
                ? 'আপনার পছন্দের প্ল্যাটফর্মে এই টিউশন পোস্ট শেয়ার করুন'
                : 'Share this tuition post on your preferred platform'}
            </DialogDescription>
          </DialogHeader>

          <div className="grid grid-cols-2 gap-3 py-4">
            {/* Facebook */}
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-500"
              onClick={() => shareToSocial('facebook')}
            >
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                </svg>
              </div>
              <span className="text-sm">Facebook</span>
            </Button>

            {/* WhatsApp */}
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-2 hover:bg-green-50 hover:border-green-500"
              onClick={() => shareToSocial('whatsapp')}
            >
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </div>
              <span className="text-sm">WhatsApp</span>
            </Button>

            {/* LinkedIn */}
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-700"
              onClick={() => shareToSocial('linkedin')}
            >
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </div>
              <span className="text-sm">LinkedIn</span>
            </Button>

            {/* Twitter */}
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-400"
              onClick={() => shareToSocial('twitter')}
            >
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
                </svg>
              </div>
              <span className="text-sm">Twitter</span>
            </Button>

            {/* Telegram */}
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-2 hover:bg-blue-50 hover:border-blue-500"
              onClick={() => shareToSocial('telegram')}
            >
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M11.944 0A12 12 0 0 0 0 12a12 12 0 0 0 12 12 12 12 0 0 0 12-12A12 12 0 0 0 12 0a12 12 0 0 0-.056 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 0 1 .171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.48.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z"/>
                </svg>
              </div>
              <span className="text-sm">Telegram</span>
            </Button>

            {/* Email */}
            <Button
              variant="outline"
              className="h-16 flex flex-col items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-500"
              onClick={() => shareToSocial('email')}
            >
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <span className="text-sm">Email</span>
            </Button>

            {/* Copy Link */}
            <Button
              variant="outline"
              className="h-16 col-span-2 flex items-center justify-center gap-2 hover:bg-gray-50 hover:border-gray-500"
              onClick={() => shareToSocial('copy')}
            >
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
              <span>{language === 'bn' ? 'লিংক কপি করুন' : 'Copy Link'}</span>
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
