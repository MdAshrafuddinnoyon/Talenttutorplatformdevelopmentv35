import { UnifiedUserProfile } from '../components/UnifiedUserProfile';
import { Header } from '../components/Header';

interface TeacherProfileProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  currentUser?: any;
  onLogin?: (type: any, userData: any) => void;
  onLogout?: () => void;
}

// Mock teacher data - in real app, this would come from backend
const mockTeacherData = {
  id: 'teacher-demo-001',
  name: 'মোঃ করিম উদ্দিন',
  email: 'karim@example.com',
  phone: '01712345678',
  location: 'ঢাকা, বাংলাদেশ',
  joinDate: '২০২৫-১০-১৫',
  bio: 'আমি একজন অভিজ্ঞ গণিত ও পদার্থবিজ্ঞান শিক্ষক। ১০ বছরের শিক্ষকতার অভিজ্ঞতা রয়েছে। আমি বিশ্বাস করি প্রতিটি শিক্ষার্থীর নিজস্ব শেখার ধরন আছে এবং আমি সেই অনুযায়ী শিক্ষা প্রদান করি।',
  verified: true,
  profileCompletion: 95,
  rating: 4.8,
  credits: 50,
  completedJobs: 35,
  activeJobs: 5,
  totalEarnings: 125000,
  responseTime: 'প্রায় ২ ঘণ্টা',
  subjects: ['গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন'],
  mediums: ['বাংলা মিডিয়াম', 'ইংলিশ মিডিয়াম'],
  education: 'বিএসসি (পদার্থবিজ্ঞান) - ঢাকা বিশ্ববিদ্যালয়, এমএসসি (ফলিত পদার্থবিজ্ঞান) - বুয়েট',
  experience: '১০ বছরের শিক্ষকতা অভিজ্ঞতা, বিভিন্ন নামী শিক্ষা প্রতিষ্ঠানে কাজ করেছি',
  videoInterviewUrl: 'https://www.youtube.com/embed/dQw4w9WgXcQ',
  reviews: [
    {
      id: 1,
      guardianName: 'মিসেস রহিমা খাতুন',
      rating: 5.0,
      comment: 'অসাধারণ শিক্ষক! আমার ছেলে তার কাছে পড়ে পরীক্ষায় A+ পেয়েছে। তিনি খুবই ধৈর্যশীল এবং বিষয়গুলো সহজভাবে বুঝিয়ে দেন।',
      date: '২০২৫-১০-২৮',
      subject: 'গণিত',
      duration: '৬ মাস'
    },
    {
      id: 2,
      guardianName: 'জনাব সালাম মিয়া',
      rating: 4.5,
      comment: 'খুব ভালো শিক্ষক। সময়মতো ক্লাস নেন এবং নিয়মিত অগ্রগতি রিপোর্ট দেন। আমার মেয়ে তার শেখানো পদ্ধতি খুব পছন্দ করে।',
      date: '২০২৫-১০-২০',
      subject: 'পদার্থবিজ্ঞান',
      duration: '৪ মাস'
    },
    {
      id: 3,
      guardianName: 'মিসেস নাহিদা আক্তার',
      rating: 5.0,
      comment: 'আমি অত্যন্ত সন্তুষ্ট। তার শেখানোর পদ্ধতি অত্যন্ত কার্যকর। আমার ছেলে এখন গণিতে অনেক আত্মবিশ্বাসী।',
      date: '২০২৫-১০-১২',
      subject: 'গণিত',
      duration: '৩ মাস'
    },
    {
      id: 4,
      guardianName: 'জনাব করিম হোসেন',
      rating: 4.8,
      comment: 'দক্ষ এবং পেশাদার শিক্ষক। ক্লাসের জন্য সবসময় প্রস্তুত থাকেন এবং কঠিন বিষয়গুলো সহজভাবে ব্যাখ্যা করেন।',
      date: '২০২৫-১০-০৫',
      subject: 'রসায়ন',
      duration: '২ মাস'
    }
  ],
  documents: ['NID.pdf', 'BSc_Certificate.pdf', 'MSc_Certificate.pdf', 'Experience_Letter.pdf']
};

export function TeacherProfile({ 
  language, 
  setLanguage, 
  setPage, 
  currentUser, 
  onLogin, 
  onLogout 
}: TeacherProfileProps) {
  const handleUpdateProfile = (data: any) => {
    console.log('Updating teacher profile:', data);
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
          userType="teacher"
          language={language}
          profileData={mockTeacherData}
          isOwnProfile={true}
          onUpdateProfile={handleUpdateProfile}
          setPage={setPage}
        />
      </div>
    </div>
  );
}
