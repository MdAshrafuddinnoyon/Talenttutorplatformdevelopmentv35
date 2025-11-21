import { ModernUserProfile } from '../components/ModernUserProfile';
import { Header } from '../components/Header';

interface StudentProfileProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  currentUser?: any;
  onLogin?: (type: any, userData: any) => void;
  onLogout?: () => void;
}

export function StudentProfile({ 
  language, 
  setLanguage, 
  setPage, 
  currentUser, 
  onLogin, 
  onLogout 
}: StudentProfileProps) {
  // In real implementation, get userId from auth context
  const userId = currentUser?.id || 'student-demo-001';
  
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
        <ModernUserProfile
          userId={userId}
          userType="student"
          language={language}
          setPage={setPage}
          isOwnProfile={true}
        />
      </div>
    </div>
  );
}
