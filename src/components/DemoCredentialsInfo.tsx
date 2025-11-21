import { Info } from 'lucide-react';
import { Alert, AlertDescription } from './ui/alert';

interface DemoCredentialsInfoProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'ডেমো লগইন তথ্য',
    description: 'নিম্নলিখিত ডেমো অ্যাকাউন্ট ব্যবহার করে লগইন করুন:',
    admin: 'অ্যাডমিন',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    student: 'ছাত্র',
    zakatDonor: 'যাকাত দাতা',
    materialDonor: 'উপকরণ দাতা',
  },
  en: {
    title: 'Demo Login Credentials',
    description: 'Use the following demo accounts to login:',
    admin: 'Admin',
    teacher: 'Teacher',
    guardian: 'Guardian',
    student: 'Student',
    zakatDonor: 'Zakat Donor',
    materialDonor: 'Material Donor',
  }
};

const demoAccounts = [
  { role: 'admin', email: 'admin@talenttutor.com', password: 'Admin@2025' },
  { role: 'teacher', email: 'teacher1@talenttutor.com', password: 'Teacher@2025' },
  { role: 'guardian', email: 'guardian1@talenttutor.com', password: 'Guardian@2025' },
  { role: 'student', email: 'student1@talenttutor.com', password: 'Student@2025' },
  { role: 'zakatDonor', email: 'zakatdonor1@talenttutor.com', password: 'Donor@2025' },
  { role: 'materialDonor', email: 'materialdonor1@talenttutor.com', password: 'Donor@2025' },
];

export function DemoCredentialsInfo({ language }: DemoCredentialsInfoProps) {
  const t = content[language];

  // Only show in development
  if (import.meta.env.PROD) {
    return null;
  }

  return (
    <Alert className="mb-6 bg-blue-50 border-blue-200">
      <Info className="h-5 w-5 text-blue-600" />
      <AlertDescription className="ml-2">
        <div className="space-y-3">
          <div>
            <p className="font-semibold text-blue-900 mb-2">{t.title}</p>
            <p className="text-sm text-blue-800 mb-3">{t.description}</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
            {demoAccounts.map(account => (
              <div key={account.role} className="bg-white p-3 rounded-md border border-blue-100">
                <div className="font-semibold text-blue-900 mb-1">
                  {t[account.role as keyof typeof t]}
                </div>
                <div className="text-xs text-gray-600 space-y-1">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Email:</span>
                    <code className="bg-gray-100 px-1 rounded">{account.email}</code>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Password:</span>
                    <code className="bg-gray-100 px-1 rounded">{account.password}</code>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </AlertDescription>
    </Alert>
  );
}
