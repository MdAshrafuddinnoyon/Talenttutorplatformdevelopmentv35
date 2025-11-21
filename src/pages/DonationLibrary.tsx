import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Badge } from '../components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../components/ui/select';
import { Separator } from '../components/ui/separator';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '../components/ui/dialog';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { 
  ArrowLeft, 
  Book, 
  Search, 
  Heart, 
  MapPin, 
  User, 
  CheckCircle, 
  Upload, 
  BookOpen, 
  Shirt, 
  Filter, 
  TrendingUp, 
  Users,
  Package,
  Send,
  Sparkles,
  Tag,
  Crown,
  Shield,
  Award,
  Star,
  Zap,
  FileText,
} from 'lucide-react';
import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';
import { LoadMoreButton } from '../components/LoadMoreButton';
import { BangladeshLocationSelector } from '../components/BangladeshLocationSelector';
import { toast } from 'sonner@2.0.3';
import { subjectCategories, allSubjects as subjectsFromData } from '../utils/subjectsData';

interface DonationLibraryProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  currentUser?: any;
  setCurrentUser?: (user: any) => void;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'দান লাইব্রেরি',
    subtitle: 'অসহায় শিক্ষার্থীদের জন্য বই ও শিক্ষা উপকরণ - সম্পূর্ণ বিনামূল্যে',
    backToHome: 'হোমে ফিরুন',
    findTeachers: 'শিক্ষক খুঁজুন',
    searchPlaceholder: 'বই, ইউনিফর্ম বা শিক্ষা উপকরণ খুঁজুন...',
    filters: 'ফিল্টার',
    clearFilters: 'ফিল্টার রিসেট',
    loginRequired: 'অনুদান গ্রহণের জন্য শিক্ষার্থী হিসেবে লগইন করুন',
    loginButton: 'লগইন করুন',
    
    // Filters
    category: 'ক্যাটাগরি',
    allCategories: 'সকল ক্যাটাগরি',
    location: 'এলাকা',
    allLocations: 'সকল এলাকা',
    condition: 'অবস্থা',
    allConditions: 'সকল অবস্থা',
    class: 'শ্রেণী',
    allClasses: 'সকল শ্রেণী',
    
    // Categories
    books: 'বই',
    uniforms: 'ইউনিফর্ম',
    stationery: 'স্টেশনারি',
    engineering: 'ইঞ্জিনিয়ারিং বই',
    medical: 'মেডিকেল বই',
    religious: 'ধর্মীয় বই',
    ielts: 'IELTS/TOEFL বই',
    olevel: 'O/A Level বই',
    
    // Conditions
    new: 'নতুন',
    likeNew: 'প্রায় নতুন',
    excellent: 'চমৎকার',
    good: 'ভালো',
    fair: 'মোটামুটি',
    
    // Actions
    request: 'অনুরোধ করুন',
    requested: 'অনুরোধ করা হয়েছে',
    donate: 'দান করুন',
    receiveItems: 'অনুদান গ্রহণ করুন',
    
    // Details
    free: 'বিনামূল্যে',
    available: 'পাওয়া যাচ্ছে',
    donatedBy: 'দাতা',
    subject: 'বিষয়',
    size: 'সাইজ',
    description: 'বর্ণনা',
    
    // Stats
    showing: 'দেখাচ্ছ���',
    of: 'এর মধ্যে',
    items: 'আইটেম',
    itemsFound: 'টি আইটেম পাওয়া গেছে',
    totalDonations: '১,২৫০+ দানকৃত আইটেম',
    activeDonors: '৫০০+ সক্রিয় দ��তা',
    helpedStudents: '৮০০+ উপকৃত শিক্ষার্থী',
    
    // Empty state
    noResults: 'কোনো আইটেম পাওয়া যায়নি',
    tryDifferentFilters: 'ভিন্ন ফিল্টার ব্যবহার করুন',
    
    // Success
    requestSuccess: 'অনুরোধ সফল হয়েছে! দাতা শীঘ্রই আপনার সাথে যোগাযোগ করবে।',
    
    // Donation dialog
    donateTitle: 'নতুন দান করুন',
    donateDesc: 'বই বা শিক্ষা উপকরণ দান করুন',
    itemName: 'আইটেমের নাম',
    itemNamePlaceholder: 'যেমন: ক্লাস ৮ বিজ্ঞান বই',
    yourLocation: 'আপনার এলাকা',
    locationPlaceholder: 'যেমন: ধানমন্ডি, ঢাকা',
    uploadPhoto: 'ছবি আপলোড করুন',
    clickToUpload: 'ক্লিক করে ছবি আপলোড করুন',
    submit: 'জমা দ��ন',
    cancel: 'বাতিল',
    
    // Status
    verified: 'যাচাইকৃত দাতা',
    trustedDonor: 'বিশ্বস্ত দাতা',
    featured: 'ফিচারড',
    urgent: 'জরুরি',
    
    // Donor Badges
    bronzeDonor: 'ব্রোঞ্জ দাতা',
    silverDonor: 'সিলভার দাতা',
    goldDonor: 'গোল্ড দাতা',
    diamondDonor: 'ডায়মন্ড দাতা',
    topDonor: 'শীর্ষ দাতা',
  },
  en: {
    title: 'Donation Library',
    subtitle: 'Books & Educational Materials for Underprivileged Students - Completely Free',
    backToHome: 'Back to Home',
    searchPlaceholder: 'Search books, uniforms or educational materials...',
    filters: 'Filters',
    clearFilters: 'Clear Filters',
    
    category: 'Category',
    allCategories: 'All Categories',
    location: 'Location',
    allLocations: 'All Locations',
    condition: 'Condition',
    allConditions: 'All Conditions',
    class: 'Class',
    allClasses: 'All Classes',
    
    books: 'Books',
    uniforms: 'Uniforms',
    stationery: 'Stationery',
    engineering: 'Engineering Books',
    medical: 'Medical Books',
    religious: 'Religious Books',
    ielts: 'IELTS/TOEFL Books',
    olevel: 'O/A Level Books',
    
    new: 'New',
    likeNew: 'Like New',
    excellent: 'Excellent',
    good: 'Good',
    fair: 'Fair',
    
    request: 'Request',
    requested: 'Requested',
    donate: 'Donate',
    
    free: 'Free',
    available: 'Available',
    donatedBy: 'Donated by',
    subject: 'Subject',
    size: 'Size',
    description: 'Description',
    
    showing: 'Showing',
    of: 'of',
    items: 'items',
    itemsFound: 'items found',
    totalDonations: '1,250+ Donated Items',
    activeDonors: '500+ Active Donors',
    helpedStudents: '800+ Helped Students',
    
    noResults: 'No items found',
    tryDifferentFilters: 'Try different filters',
    
    requestSuccess: 'Request successful! Donor will contact you soon.',
    
    donateTitle: 'Donate New Item',
    donateDesc: 'Donate books or educational materials',
    itemName: 'Item Name',
    itemNamePlaceholder: 'e.g., Class 8 Science Book',
    yourLocation: 'Your Location',
    locationPlaceholder: 'e.g., Dhanmondi, Dhaka',
    uploadPhoto: 'Upload Photo',
    clickToUpload: 'Click to upload photo',
    submit: 'Submit',
    cancel: 'Cancel',
    findTeachers: 'Find Teachers',
    loginRequired: 'Login as a student to receive donations',
    loginButton: 'Login',
    receiveItems: 'Receive Donations',
    
    verified: 'Verified Donor',
    trustedDonor: 'Trusted Donor',
    featured: 'Featured',
    urgent: 'Urgent',
    
    bronzeDonor: 'Bronze Donor',
    silverDonor: 'Silver Donor',
    goldDonor: 'Gold Donor',
    diamondDonor: 'Diamond Donor',
    topDonor: 'Top Donor',
  },
};

// Helper function to get donor badge info
const getDonorBadge = (donationCount: number, verified: boolean) => {
  if (donationCount >= 50) {
    return { level: 'diamond', icon: Crown, color: 'from-cyan-400 via-teal-500 to-emerald-600', textColor: 'text-teal-600', bgColor: 'bg-gradient-to-r from-cyan-100 to-emerald-100' };
  } else if (donationCount >= 25) {
    return { level: 'gold', icon: Award, color: 'from-amber-400 to-yellow-500', textColor: 'text-amber-600', bgColor: 'bg-gradient-to-r from-amber-100 to-yellow-100' };
  } else if (donationCount >= 10) {
    return { level: 'silver', icon: Shield, color: 'from-gray-400 to-gray-600', textColor: 'text-gray-600', bgColor: 'bg-gradient-to-r from-gray-100 to-gray-200' };
  } else if (donationCount >= 5) {
    return { level: 'bronze', icon: Star, color: 'from-amber-400 to-rose-500', textColor: 'text-amber-600', bgColor: 'bg-gradient-to-r from-amber-100 to-rose-100' };
  }
  return null;
};

// Sample donation items data with enhanced donor info
const donationItems = [
  {
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
    description: 'ক্লাস ৮ এর সম্পূর্ণ বিজ্ঞান বই সেট। সব বই খুব ভালো অবস্থায়। লেখা নেই। রঙিন ছবি সহ।',
    photo: 'https://images.unsplash.com/photo-1512820790803-83ca734da794?w=400&q=80',
    featured: true,
    verified: true,
    urgent: false,
    available: true,
    topDonor: true,
  },
  {
    id: 2,
    title: 'স্কুল ইউনিফর্ম (মেয়েদের)',
    category: 'uniforms',
    condition: 'likeNew',
    location: 'গুলশান, ঢাকা',
    donorName: 'ফাতিমা বেগম',
    donorRating: 5.0,
    donorDonationCount: 42,
    class: 'ক্লাস ৬-৮',
    size: 'M',
    description: 'মেয়েদের জন্য সাদা শার্ট ও নীল স্কার্ট। প্রায় নতুন অবস্থায়। মাত্র ২ মাস ব্যবহার করা।',
    photo: 'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=400&q=80',
    featured: false,
    verified: true,
    urgent: true,
    available: true,
    topDonor: true,
  },
  {
    id: 3,
    title: 'SSC গণিত গাইড (সম্পূর্ণ সলভড)',
    category: 'books',
    condition: 'good',
    location: 'মিরপুর, ঢাকা',
    donorName: 'সাদিয়া আক্তার',
    donorRating: 4.8,
    donorDonationCount: 28,
    class: 'SSC',
    subject: 'গণিত',
    description: 'SSC গণিতের সম্পূর্ণ গাইড। সব অঙ্ক solve করা আছে। খুব useful হবে। ক্রিয়েটিভ প্রশ্ন সহ।',
    photo: 'https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=400&q=80',
    featured: false,
    verified: true,
    urgent: false,
    available: true,
    topDonor: true,
  },
  {
    id: 4,
    title: 'ইংরেজি গ্রামার বই (প্রাইমারি)',
    category: 'books',
    condition: 'excellent',
    location: 'উত্তরা, ঢাকা',
    donorName: 'রাকিব হাসান',
    donorRating: 4.7,
    donorDonationCount: 15,
    class: 'ক্লাস ১-৫',
    subject: 'ইংরেজি',
    description: 'ছোট বাচ্চাদের জন্য ইংরেজি গ্রামার বই। ছবি সহ সহজ ভাষায়। শেখার জন্য আদর্শ।',
    photo: 'https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&q=80',
    featured: true,
    verified: true,
    urgent: false,
    available: true,
    topDonor: false,
  },
  {
    id: 5,
    title: 'স্কুল ব্যাগ (নতুন)',
    category: 'stationery',
    condition: 'new',
    location: 'বনানী, ঢাকা',
    donorName: 'নাসরিন সুলতানা',
    donorRating: 5.0,
    donorDonationCount: 55,
    class: 'সব ক্লাস',
    size: 'L',
    description: 'একদম নতুন স্কুল ব্যাগ। কখনো ব্যবহার করা হয়নি। ভালো quality। পানি নিরোধক।',
    photo: 'https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&q=80',
    featured: false,
    verified: true,
    urgent: true,
    available: true,
    topDonor: true,
  },
  {
    id: 6,
    title: 'বাংলা ব্যাকরণ ও নির্মিতি (সম্পূর্ণ)',
    category: 'books',
    condition: 'excellent',
    location: 'মোহাম্মদপুর, ঢাকা',
    donorName: 'তানভীর আহমেদ',
    donorRating: 4.9,
    donorDonationCount: 8,
    class: 'ক্লাস ৯-১০',
    subject: 'বাংলা',
    description: 'বোর্ড বই। খুব ভালো অবস��থায়। সব পেজ আছে। হাইলাইট করা নেই।',
    photo: 'https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=400&q=80',
    featured: false,
    verified: true,
    urgent: false,
    available: true,
    topDonor: false,
  },
  // Engineering Books
  {
    id: 9,
    title: 'Engineering Mathematics (Advanced Calculus)',
    category: 'engineering',
    condition: 'excellent',
    location: 'ধানমন্ডি, ঢাকা',
    donorName: 'ইঞ্জি. করিম',
    donorRating: 4.9,
    donorDonationCount: 15,
    class: 'Engineering',
    subject: 'Mathematics',
    description: 'ইঞ্জিনিয়ারিং ম্যাথমেটিক্স বই। Calculus, Differential Equations সহ। প্রায় নতুন।',
    photo: 'https://images.unsplash.com/photo-1509228468518-180dd4864904?w=400&q=80',
    featured: false,
    verified: true,
    urgent: false,
    available: true,
    topDonor: false,
  },
  // Medical Books
  {
    id: 10,
    title: 'Human Anatomy & Physiology (MBBS)',
    category: 'medical',
    condition: 'good',
    location: 'মিরপুর, ঢাকা',
    donorName: 'ডা. সাবিনা',
    donorRating: 5.0,
    donorDonationCount: 22,
    class: 'MBBS',
    subject: 'Anatomy',
    description: 'MBBS 1st year এর Anatomy বই। রঙিন ছবি সহ। সব চ্যাপ্টার আছে।',
    photo: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=400&q=80',
    featured: false,
    verified: true,
    urgent: false,
    available: true,
    topDonor: true,
  },
  // Religious Books
  {
    id: 11,
    title: 'তাজবীদ সহ কুরআন শিক্ষা',
    category: 'religious',
    condition: 'likeNew',
    location: 'উত্তরা, ঢাকা',
    donorName: 'হাফিজ আহমেদ',
    donorRating: 4.8,
    donorDonationCount: 35,
    class: 'সব ক্লাস',
    subject: 'কুরআন',
    description: 'তাজবীদ সহ কুরআন শিক্ষার বই। শুদ্ধ উচ্চারণ সহ। প্রায় নতুন অবস্থায়।',
    photo: 'https://images.unsplash.com/photo-1584828082928-68b07f6a8cf9?w=400&q=80',
    featured: true,
    verified: true,
    urgent: false,
    available: true,
    topDonor: true,
  },
  // IELTS Books
  {
    id: 12,
    title: 'Cambridge IELTS Practice Tests (12-15)',
    category: 'ielts',
    condition: 'excellent',
    location: 'গুলশান, ঢাকা',
    donorName: 'নাবিলা খান',
    donorRating: 4.9,
    donorDonationCount: 18,
    class: 'IELTS Prep',
    subject: 'English',
    description: 'IELTS এর অরিজিনাল কেমব্রিজ প্র্যাকটিস টেস্ট বই 12-15। সব CD আছে।',
    photo: 'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&q=80',
    featured: false,
    verified: true,
    urgent: true,
    available: true,
    topDonor: false,
  },
  // O/A Level Books
  {
    id: 13,
    title: 'Cambridge O Level Physics Textbook',
    category: 'olevel',
    condition: 'good',
    location: 'বনানী, ঢাকা',
    donorName: 'রিয়াদ হোসেন',
    donorRating: 4.7,
    donorDonationCount: 12,
    class: 'O Level',
    subject: 'Physics',
    description: 'O Level Physics এর সম্পূর্ণ বই। সব চ্যাপ্টার আছে। নোট সহ।',
    photo: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=400&q=80',
    featured: false,
    verified: true,
    urgent: false,
    available: true,
    topDonor: false,
  },
];

export function DonationLibrary({ language, setLanguage, setPage, announcement, currentUser, setCurrentUser, onLogin }: DonationLibraryProps) {
  const t = content[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedCondition, setSelectedCondition] = useState<string>('all');
  const [selectedLocation, setSelectedLocation] = useState<{
    division?: string;
    district?: string;
    area?: string;
  }>({});
  const [selectedClass, setSelectedClass] = useState<string>('all');
  const [selectedSubject, setSelectedSubject] = useState<string>('all');
  const [requestedItems, setRequestedItems] = useState<number[]>([]);
  const [isDonateDialogOpen, setIsDonateDialogOpen] = useState(false);
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const [selectedItem, setSelectedItem] = useState<any>(null);
  const [showDetailDialog, setShowDetailDialog] = useState(false);
  
  // Pagination states
  const [displayCount, setDisplayCount] = useState(12);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const ITEMS_PER_PAGE = 12;
  
  const isStudent = currentUser?.role === 'student';

  // Filter options
  const categories = [
    { value: 'books', label: t.books },
    { value: 'uniforms', label: t.uniforms },
    { value: 'stationery', label: t.stationery },
    { value: 'engineering', label: t.engineering },
    { value: 'medical', label: t.medical },
    { value: 'religious', label: t.religious },
    { value: 'ielts', label: t.ielts },
    { value: 'olevel', label: t.olevel },
  ];

  const conditions = [
    { value: 'new', label: t.new },
    { value: 'likeNew', label: t.likeNew },
    { value: 'excellent', label: t.excellent },
    { value: 'good', label: t.good },
    { value: 'fair', label: t.fair },
  ];

  const allLocations = ['ধানমন্ডি, ঢাকা', 'গুলশান, ঢাকা', 'মিরপুর, ঢাকা', 'উত্তরা, ঢাকা', 'বনানী, ঢাকা', 'মোহাম্মদপুর, ঢাকা'];
  const allClasses = ['ক্লাস ১-৫', 'ক্লাস ৬-৮', 'ক্লাস ৮', 'ক্লাস ৯-১০', 'SSC', 'সব ক্লাস'];

  // Filter items
  const filteredItems = donationItems.filter(item => {
    if (searchQuery && !item.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
        !item.description.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    if (selectedCategory !== 'all' && item.category !== selectedCategory) {
      return false;
    }
    if (selectedCondition !== 'all' && item.condition !== selectedCondition) {
      return false;
    }
    
    // Location filter (using Bangladesh Location Selector)
    if (selectedLocation.division || selectedLocation.district || selectedLocation.area) {
      const locationString = item.location.toLowerCase();
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
    
    if (selectedClass !== 'all' && item.class !== selectedClass) {
      return false;
    }
    
    // Subject filter
    if (selectedSubject !== 'all' && item.subject && item.subject !== selectedSubject) {
      return false;
    }
    
    return true;
  });

  const handleRequest = (itemId: number) => {
    // Check if user is logged in
    if (!currentUser) {
      setShowLoginDialog(true);
      toast.error(t.loginRequired);
      return;
    }
    
    // Check if user is student
    if (currentUser.role !== 'student') {
      toast.error(language === 'bn' ? 'শুধুমাত্র শিক্ষার্থীরা অনুরোধ পাঠাতে পারবেন' : 'Only students can send requests');
      return;
    }
    
    if (requestedItems.includes(itemId)) {
      toast.info(language === 'bn' ? 'আপনি ইতিমধ্যে অনুরোধ করেছেন' : 'Already requested');
      return;
    }
    
    setRequestedItems([...requestedItems, itemId]);
    toast.success(t.requestSuccess);
  };

  const clearAllFilters = () => {
    setSearchQuery('');
    setSelectedCategory('all');
    setSelectedCondition('all');
    setSelectedLocation({});
    setSelectedClass('all');
    setSelectedSubject('all');
  };
  
  const handleItemClick = (item: any) => {
    // Navigate to single book page
    setPage(`book-detail-${item.id}`);
  };

  const handleLoadMore = () => {
    setIsLoadingMore(true);
    setTimeout(() => {
      setDisplayCount(prev => prev + ITEMS_PER_PAGE);
      setIsLoadingMore(false);
    }, 800);
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'books':
        return BookOpen;
      case 'uniforms':
        return Shirt;
      case 'stationery':
        return Package;
      default:
        return Book;
    }
  };

  const getConditionColor = (condition: string) => {
    switch (condition) {
      case 'new':
        return 'bg-emerald-100 text-emerald-800 border-emerald-200';
      case 'likeNew':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'excellent':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'good':
        return 'bg-cyan-100 text-cyan-800 border-cyan-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 via-cyan-50 to-blue-50">
      <Header
        language={language}
        setLanguage={setLanguage}
        setPage={setPage}
        announcement={announcement}
        onLogin={onLogin}
      />

      {/* Hero Section - Simple like FindTeachersPage */}
      <div className="bg-gradient-to-r from-teal-600 via-emerald-600 to-cyan-600 text-white py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl">
            <Button
              variant="ghost"
              onClick={() => setPage('home')}
              className="text-white hover:bg-white/20 mb-4"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              {t.backToHome}
            </Button>
            
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h1 className="text-white mb-2">{t.title}</h1>
              <p className="text-xl text-white/90 mb-6">{t.subtitle}</p>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mb-6">
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Package className="w-5 h-5" />
                  <span>{t.totalDonations}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Users className="w-5 h-5" />
                  <span>{t.activeDonors}</span>
                </div>
                <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full">
                  <Sparkles className="w-5 h-5" />
                  <span>{t.helpedStudents}</span>
                </div>
              </div>

              {/* Search Bar */}
              <div className="flex flex-col md:flex-row gap-3">
                <div className="relative flex-1">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    type="text"
                    placeholder={t.searchPlaceholder}
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="pl-12 h-12 bg-white/95 backdrop-blur-sm border-0 shadow-lg text-gray-900 placeholder:text-gray-500"
                  />
                </div>
                <Button
                  size="lg"
                  onClick={() => setPage('find-teachers')}
                  className="bg-white text-teal-600 hover:bg-white/90 shadow-lg px-6 h-12"
                >
                  <User className="w-5 h-5 mr-2" />
                  {t.findTeachers}
                </Button>
                <Button
                  size="lg"
                  onClick={() => setPage('donation')}
                  className="bg-gradient-to-r from-pink-500 to-rose-500 hover:from-pink-600 hover:to-rose-600 text-white shadow-lg px-6 h-12"
                >
                  <Heart className="w-5 h-5 mr-2" />
                  {t.donate}
                </Button>
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar - Filters - Like FindTeachersPage */}
          <div className="lg:col-span-1">
            <Card className="p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="flex items-center gap-2 text-gray-900">
                  <Filter className="w-5 h-5 text-teal-600" />
                  {t.filters}
                </h3>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  onClick={clearAllFilters}
                  className="text-pink-600 hover:text-pink-700 hover:bg-pink-50"
                >
                  {t.clearFilters}
                </Button>
              </div>

              <div className="space-y-4">
                {/* Category Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {t.category}
                  </label>
                  <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t.allCategories} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t.allCategories}</SelectItem>
                      {categories.map(cat => (
                        <SelectItem key={cat.value} value={cat.value}>{cat.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Condition Filter */}
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    {t.condition}
                  </label>
                  <Select value={selectedCondition} onValueChange={setSelectedCondition}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={t.allConditions} />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">{t.allConditions}</SelectItem>
                      {conditions.map(cond => (
                        <SelectItem key={cond.value} value={cond.value}>{cond.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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

                <Separator />

                {/* Class Filter */}
                <div>
                  <label className={`text-sm font-medium text-gray-700 mb-2 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {t.class}
                  </label>
                  <Select value={selectedClass} onValueChange={setSelectedClass}>
                    <SelectTrigger className={`w-full ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
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

                {/* Subject Filter */}
                <div>
                  <label className={`text-sm font-medium text-gray-700 mb-2 block ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {language === 'bn' ? 'বিষয়' : 'Subject'}
                  </label>
                  <Select value={selectedSubject} onValueChange={setSelectedSubject}>
                    <SelectTrigger className={`w-full ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      <SelectValue placeholder={language === 'bn' ? 'সকল বিষয়' : 'All Subjects'} />
                    </SelectTrigger>
                    <SelectContent className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                      <SelectItem value="all">{language === 'bn' ? 'সকল বিষয়' : 'All Subjects'}</SelectItem>
                      {subjectsFromData.map(subject => (
                        <SelectItem key={subject.id} value={subject.name_en}>
                          {language === 'bn' ? subject.name_bn : subject.name_en}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>
          </div>

          {/* Main Content - Items */}
          <div className="lg:col-span-3">
            <div className="mb-6">
              <div className="text-gray-700">
                <span className="font-bold text-2xl text-teal-600">{filteredItems.length}</span> {t.itemsFound}
              </div>
            </div>

            {filteredItems.length === 0 ? (
              <Card className="p-12 text-center">
                <div className="max-w-md mx-auto">
                  <div className="w-20 h-20 bg-gradient-to-br from-teal-100 to-cyan-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search className="w-10 h-10 text-teal-600" />
                  </div>
                  <h3 className="text-gray-900 mb-2">{t.noResults}</h3>
                  <p className="text-gray-600 mb-4">{t.tryDifferentFilters}</p>
                  <Button onClick={clearAllFilters} variant="outline" className="border-teal-600 text-teal-600 hover:bg-teal-50">
                    {t.clearFilters}
                  </Button>
                </div>
              </Card>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredItems.slice(0, displayCount).map((item, index) => {
                  const CategoryIcon = getCategoryIcon(item.category);
                  const donorBadge = getDonorBadge(item.donorDonationCount, item.verified);
                  
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card 
                        className="overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-500 border-2 border-gray-100 hover:border-emerald-200 bg-white"
                      >
                        {/* Modern Shop Card Layout */}
                        <div className="relative aspect-square overflow-hidden bg-gray-100" onClick={() => handleItemClick(item)}>
                          <img
                            src={item.photo}
                            alt={item.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                          />
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                          
                          {/* Badges */}
                          <div className="absolute top-3 left-3 flex flex-col gap-2">
                            {item.featured && (
                              <Badge className="bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-0 shadow-lg">
                                <Sparkles className="w-3 h-3 mr-1" />
                                {t.featured}
                              </Badge>
                            )}
                            {item.urgent && (
                              <Badge className="bg-gradient-to-r from-rose-500 to-pink-600 text-white border-0 shadow-lg animate-pulse">
                                <Zap className="w-3 h-3 mr-1" />
                                {t.urgent}
                              </Badge>
                            )}
                          </div>

                          {/* Free Badge */}
                          <div className="absolute top-3 right-3">
                            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 shadow-lg text-lg px-4 py-2">
                              {t.free}
                            </Badge>
                          </div>
                        </div>

                        {/* Card Content */}
                        <div className="p-6"  onClick={() => handleItemClick(item)}>

                          {/* Badges Row */}
                          <div className="flex flex-wrap items-center gap-2 mb-3">
                            {item.verified && (
                              <Badge variant="outline" className="border-emerald-500 text-emerald-700 bg-emerald-50">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {t.verified}
                              </Badge>
                            )}
                            
                            {/* Donor Level Badge */}
                            {donorBadge && (
                              <Badge className={`${donorBadge.bgColor} ${donorBadge.textColor} border-0`}>
                                <donorBadge.icon className="w-3 h-3 mr-1" />
                                {donorBadge.level === 'diamond' && t.diamondDonor}
                                {donorBadge.level === 'gold' && t.goldDonor}
                                {donorBadge.level === 'silver' && t.silverDonor}
                                {donorBadge.level === 'bronze' && t.bronzeDonor}
                              </Badge>
                            )}
                          </div>

                          {/* Title */}
                          <h3 className={`text-lg text-gray-900 mb-2 group-hover:text-emerald-600 transition-colors line-clamp-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                            {item.title}
                          </h3>

                          {/* Description */}
                          <p className={`text-sm text-gray-600 mb-4 leading-relaxed line-clamp-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                            {item.description}
                          </p>

                          {/* Meta Info */}
                          <div className="flex flex-wrap items-center gap-2 mb-4 text-xs text-gray-600">
                            <div className={`flex items-center gap-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                              <Tag className="w-3 h-3 text-emerald-600" />
                              {item.class}
                            </div>
                            <span className="text-gray-300">•</span>
                            <div className={`flex items-center gap-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                              <MapPin className="w-3 h-3 text-red-500" />
                              {item.location}
                            </div>
                            <span className="text-gray-300">•</span>
                            <Badge className={`${getConditionColor(item.condition)} border text-xs ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                              {conditions.find(c => c.value === item.condition)?.label}
                            </Badge>
                          </div>

                          {/* Separator */}
                          <Separator className="my-4" />

                          {/* Footer - Donor Info */}
                          <div className="flex items-center justify-between mb-4">
                            <div className="flex items-center gap-2">
                              <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center text-white shadow-md">
                                {item.donorName.charAt(0)}
                              </div>
                              <div>
                                <div className={`text-xs text-gray-500 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.donatedBy}</div>
                                <div className={`text-sm text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{item.donorName}</div>
                              </div>
                            </div>
                            <div className="flex items-center gap-1 text-sm">
                              <Star className="w-4 h-4 fill-amber-400 text-amber-400" />
                              <span className="text-gray-900">{item.donorRating}</span>
                            </div>
                          </div>

                          {/* Action Button */}
                          {requestedItems.includes(item.id) ? (
                            <Button 
                              disabled 
                              className={`w-full bg-gray-100 text-gray-500 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                              onClick={(e) => e.stopPropagation()}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              {t.requested}
                            </Button>
                          ) : (
                            <Button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleRequest(item.id);
                              }}
                              className={`w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 text-white shadow-lg hover:shadow-xl transition-all hover:scale-105 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                            >
                              <Send className="w-4 h-4 mr-2" />
                              {t.request}
                            </Button>
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  );
                  })}
                </div>
                
                {/* Load More Button */}
                {filteredItems.length > displayCount && (
                  <LoadMoreButton
                    onClick={handleLoadMore}
                    loading={isLoadingMore}
                    hasMore={filteredItems.length > displayCount}
                    language={language}
                    totalShown={Math.min(displayCount, filteredItems.length)}
                    totalAvailable={filteredItems.length}
                  />
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Donate Dialog */}
      <Dialog open={isDonateDialogOpen} onOpenChange={setIsDonateDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{t.donateTitle}</DialogTitle>
            <DialogDescription>{t.donateDesc}</DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            <div>
              <Label>{t.itemName}</Label>
              <Input placeholder={t.itemNamePlaceholder} />
            </div>

            <div>
              <Label>{t.category}</Label>
              <div className="grid grid-cols-3 gap-2 mt-2">
                {categories.map((cat) => (
                  <Button key={cat.value} variant="outline" size="sm">
                    {cat.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>{t.condition}</Label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {conditions.slice(0, 4).map((cond) => (
                  <Button key={cond.value} variant="outline" size="sm">
                    {cond.label}
                  </Button>
                ))}
              </div>
            </div>

            <div>
              <Label>{t.yourLocation}</Label>
              <Input placeholder={t.locationPlaceholder} />
            </div>

            <div>
              <Label>{t.description}</Label>
              <Textarea rows={3} placeholder="আইটেমের বিস্তারিত বর্ণনা..." />
            </div>

            <div>
              <Label>{t.uploadPhoto}</Label>
              <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center hover:border-teal-500 transition-colors cursor-pointer">
                <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                <p className="text-sm text-gray-600">{t.clickToUpload}</p>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-end gap-3">
            <Button variant="outline" onClick={() => setIsDonateDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button 
              onClick={() => {
                toast.success(language === 'bn' ? 'দান সফল হয়েছে! ধন্যবাদ!' : 'Donation successful! Thank you!');
                setIsDonateDialogOpen(false);
              }}
              className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
            >
              {t.submit}
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Auth Dialog - Student Login Required */}
      <UnifiedAuthDialog
        open={showLoginDialog}
        onOpenChange={setShowLoginDialog}
        language={language}
        onLogin={(userType, userData) => {
          if (setCurrentUser) {
            setCurrentUser({ type: userType, role: userType, ...userData });
          }
          setShowLoginDialog(false);
          if (userType === 'student') {
            toast.success(language === 'bn' ? 'সফলভাবে লগইন হয়েছে! এখন আপনি অনুদান গ্রহণ করতে পারবেন।' : 'Successfully logged in! You can now request donations.');
          } else {
            toast.info(language === 'bn' ? 'দান লাইব্রেরি থেকে অনুরোধ করতে শিক্ষার্থী হিসেবে লগইন করুন।' : 'Login as a student to request items from the donation library.');
          }
        }}
        initialMode="register"
      />

      {/* Item Detail Dialog */}
      <Dialog open={showDetailDialog} onOpenChange={setShowDetailDialog}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl">{selectedItem?.title}</DialogTitle>
            <DialogDescription>
              {language === 'bn' ? 'সম্পূর্ণ বিবরণ' : 'Complete Details'}
            </DialogDescription>
          </DialogHeader>
          
          {selectedItem && (
            <div className="space-y-6">
              {/* Image */}
              <div className="aspect-video rounded-lg overflow-hidden bg-gray-100">
                <img 
                  src={selectedItem.photo} 
                  alt={selectedItem.title}
                  className="w-full h-full object-cover"
                />
              </div>
              
              {/* Badges */}
              <div className="flex flex-wrap gap-2">
                {selectedItem.featured && (
                  <Badge className="bg-gradient-to-r from-purple-500 to-pink-500">
                    <Sparkles className="w-3 h-3 mr-1" />
                    {language === 'bn' ? 'ফিচার্ড' : 'Featured'}
                  </Badge>
                )}
                {selectedItem.urgent && (
                  <Badge className="bg-gradient-to-r from-red-500 to-orange-500">
                    <Zap className="w-3 h-3 mr-1" />
                    {language === 'bn' ? 'জরুরি' : 'Urgent'}
                  </Badge>
                )}
                {selectedItem.verified && (
                  <Badge className="bg-gradient-to-r from-green-500 to-emerald-500">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {language === 'bn' ? 'যাচাইকৃত' : 'Verified'}
                  </Badge>
                )}
                <Badge className={getConditionColor(selectedItem.condition)}>
                  {conditions.find(c => c.value === selectedItem.condition)?.label}
                </Badge>
              </div>
              
              {/* Details Grid */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4">
                  <div className="text-sm text-gray-600 mb-1">{t.category}</div>
                  <div className="font-medium flex items-center gap-2">
                    {(() => {
                      const Icon = getCategoryIcon(selectedItem.category);
                      return <Icon className="w-5 h-5 text-teal-600" />;
                    })()}
                    {categories.find(c => c.value === selectedItem.category)?.label}
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="text-sm text-gray-600 mb-1">{t.location}</div>
                  <div className="font-medium flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-teal-600" />
                    {selectedItem.location}
                  </div>
                </Card>
                
                <Card className="p-4">
                  <div className="text-sm text-gray-600 mb-1">{t.class}</div>
                  <div className="font-medium flex items-center gap-2">
                    <Book className="w-5 h-5 text-teal-600" />
                    {selectedItem.class}
                  </div>
                </Card>
                
                {selectedItem.subject && (
                  <Card className="p-4">
                    <div className="text-sm text-gray-600 mb-1">{t.subject}</div>
                    <div className="font-medium">{selectedItem.subject}</div>
                  </Card>
                )}
                
                {selectedItem.size && (
                  <Card className="p-4">
                    <div className="text-sm text-gray-600 mb-1">{t.size}</div>
                    <div className="font-medium">{selectedItem.size}</div>
                  </Card>
                )}
              </div>
              
              {/* Description */}
              <Card className="p-4">
                <h4 className="font-semibold mb-2 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-teal-600" />
                  {t.description}
                </h4>
                <p className="text-gray-700 leading-relaxed">{selectedItem.description}</p>
              </Card>
              
              {/* Donor Info */}
              <Card className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 border-teal-200">
                <h4 className="font-semibold mb-3 flex items-center gap-2">
                  <User className="w-5 h-5 text-teal-600" />
                  {t.donatedBy}
                </h4>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-medium text-lg">{selectedItem.donorName}</div>
                    <div className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                      {selectedItem.donorRating} • {selectedItem.donorDonationCount} {language === 'bn' ? 'টি দান' : 'donations'}
                    </div>
                  </div>
                  {(() => {
                    const badge = getDonorBadge(selectedItem.donorDonationCount, selectedItem.verified);
                    if (badge) {
                      const BadgeIcon = badge.icon;
                      return (
                        <div className={`${badge.bgColor} px-3 py-2 rounded-lg border-2 border-current ${badge.textColor}`}>
                          <BadgeIcon className="w-6 h-6" />
                        </div>
                      );
                    }
                    return null;
                  })()}
                </div>
              </Card>
              
              {/* Actions */}
              <div className="flex gap-3">
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRequest(selectedItem.id);
                  }}
                  disabled={requestedItems.includes(selectedItem.id)}
                  className="flex-1 bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 h-12"
                >
                  {requestedItems.includes(selectedItem.id) ? (
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
            </div>
          )}
        </DialogContent>
      </Dialog>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
