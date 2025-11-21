import { ModernUserProfile } from '../components/ModernUserProfile';

interface DonorProfileProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
}

export function DonorProfile({ language, setPage }: DonorProfileProps) {
  // In real implementation, get userId from auth context
  const userId = 'donor-demo-001';
  
  return (
    <ModernUserProfile
      userId={userId}
      userType="donor"
      language={language}
      setPage={setPage}
      isOwnProfile={true}
    />
  );
}
