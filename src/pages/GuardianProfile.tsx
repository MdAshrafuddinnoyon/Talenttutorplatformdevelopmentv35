import { UnifiedUserProfile } from '../components/UnifiedUserProfile';
import { Header } from '../components/Header';

interface GuardianProfileProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  currentUser?: any;
  onLogin?: (type: any, userData: any) => void;
  onLogout?: () => void;
}

// Mock guardian data - in real app, this would come from backend
const mockGuardianData = {
  id: 'guardian-demo-001',
  name: 'মিসেস রহিমা খাতুন',
  email: 'rahima@example.com',
  phone: '01823456789',
  location: 'চট্টগ্রাম, বাংলাদেশ',
  joinDate: '২০২৫-১০-২০',
  bio: 'আমি একজন দায়িত্বশীল অভিভাবক। আমার দুই সন্তান আছে যারা ৮ম এবং ১০ম শ্রেণীতে পড়ে। আমি তাদের জন্য সেরা শিক্ষক খুঁজছি যারা তাদের একাডেমিক উন্নতিতে সাহায্য করবেন।',
  verified: true,
  profileCompletion: 90,
  rating: 4.9,
  credits: 100,
  completedJobs: 12,
  activeJobs: 2,
  totalSpent: 48000,
  children: 2,
  videoInterviewUrl: undefined, // Guardians can also add video intro
  reviews: [
    {
      id: 1,
      guardianName: 'মোঃ করিম উদ্দিন', // Teacher review for guardian
      rating: 5.0,
      comment: 'খুবই সহযোগিতাপূর্ণ অভিভাবক। সময়মতো পেমেন্ট করেন এবং শিক্ষার্থীর অগ্রগতিতে সক্রিয়ভাবে আগ্রহী। তার সাথে কাজ করে আনন্দ পেয়েছি।',
      date: '২০২৫-১০-২৫',
      subject: 'গণিত টিউশন',
      duration: '৬ মাস'
    },
    {
      id: 2,
      guardianName: 'ডঃ ফাতেমা বেগম',
      rating: 4.8,
      comment: 'পেশাদার এবং সম্মানজনক আচরণ। শিক্ষার্থীর প্রয়োজন সম্পর্কে স্পষ্ট ধারণা দিয়েছেন এবং নিয়মিত ফলোআপ করেন।',
      date: '২০২৫-১০-১৮',
      subject: 'ইংরেজি টিউশন',
      duration: '৪ মাস'
    },
    {
      id: 3,
      guardianName: 'জনাব আহমেদ সাহেব',
      rating: 5.0,
      comment: 'অসাধারণ অভিভাবক! খুবই সহযোগী এবং শিক্ষার্থীর উন্নতিতে প্রকৃত আগ্রহী। সুপারিশ করি।',
      date: '২০২৫-১০-১০',
      subject: 'বিজ্ঞান টিউশন',
      duration: '৩ মাস'
    }
  ],
  documents: ['NID.pdf']
};

export function GuardianProfile({ 
  language, 
  setLanguage, 
  setPage, 
  currentUser, 
  onLogin, 
  onLogout 
}: GuardianProfileProps) {
  const handleUpdateProfile = (data: any) => {
    console.log('Updating guardian profile:', data);
    // In real app, make API call to update profile
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        language={language}
        setLanguage={setLanguage}
        setPage={setPage}
        currentUser={currentUser}
        onLogin={onLogin}
        onLogout={onLogout}
      />
      <div className="pt-16">
        <UnifiedUserProfile
          userType="guardian"
          language={language}
          profileData={mockGuardianData}
          isOwnProfile={true}
          onUpdateProfile={handleUpdateProfile}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
