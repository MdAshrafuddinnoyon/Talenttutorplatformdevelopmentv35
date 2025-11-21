import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { 
  MapPin, 
  Wallet, 
  BookOpen, 
  Clock, 
  Users, 
  Calendar,
  GraduationCap,
  Home,
  CheckCircle,
  XCircle
} from 'lucide-react';

interface JobDetailsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  job: {
    id: number;
    title: string;
    subject: string;
    location: string;
    salary: string;
    applicants: number;
    matched?: boolean;
    studentClass?: string;
    gender?: string;
    schedule?: string;
    duration?: string;
    requirements?: string[];
    guardian?: {
      name: string;
      phone?: string;
      verified?: boolean;
    };
    postedDate?: string;
  };
  language: 'bn' | 'en';
  onApply: (jobId: number) => void;
  userCredits: number;
}

const content = {
  bn: {
    jobDetails: 'টিউশন বিস্তারিত',
    subject: 'বিষয়',
    location: 'অবস্থান',
    salary: 'বেতন',
    class: 'শ্রেণী',
    gender: 'লিঙ্গ',
    schedule: 'সময়সূচী',
    duration: 'সময়কাল',
    applicants: 'আবেদনকারী',
    requirements: 'প্রয়োজনীয়তা',
    guardianInfo: 'অভিভাবকের তথ্য',
    verified: 'যাচাইকৃত',
    postedOn: 'পোস্ট করা হয়েছে',
    applyNow: 'আবেদন করুন',
    credits: 'ক্রেডিট',
    close: 'বন্ধ করুন',
    male: 'পুরুষ',
    female: 'মহিলা',
    any: 'যেকোনো',
    perMonth: 'মাসিক',
  },
  en: {
    jobDetails: 'Job Details',
    subject: 'Subject',
    location: 'Location',
    salary: 'Salary',
    class: 'Class',
    gender: 'Gender',
    schedule: 'Schedule',
    duration: 'Duration',
    applicants: 'Applicants',
    requirements: 'Requirements',
    guardianInfo: 'Guardian Information',
    verified: 'Verified',
    postedOn: 'Posted on',
    applyNow: 'Apply Now',
    credits: 'Credits',
    close: 'Close',
    male: 'Male',
    female: 'Female',
    any: 'Any',
    perMonth: 'Per Month',
  },
};

export function JobDetailsDialog({
  open,
  onOpenChange,
  job,
  language,
  onApply,
  userCredits,
}: JobDetailsDialogProps) {
  const t = content[language];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <BookOpen className="w-6 h-6 text-emerald-600" />
            {t.jobDetails}
          </DialogTitle>
          <DialogDescription>
            {language === 'bn' 
              ? 'টিউশন পোস্টের সম্পূর্ণ বিস্তারিত তথ্য এবং আবেদনের জন্য প্রয়োজনীয়তা দেখুন।'
              : 'View complete details and requirements for this tuition post.'}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Job Title and Badge */}
          <div>
            <div className="flex items-start justify-between mb-2">
              <h2 className="text-2xl text-gray-900">{job.title}</h2>
              {job.matched && (
                <Badge className="bg-gradient-to-r from-emerald-600 to-teal-600 text-white">
                  ✨ আপনার জন্য উপযুক্ত
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-2 text-gray-600">
              <MapPin className="w-4 h-4" />
              <span>{job.location}</span>
            </div>
          </div>

          {/* Key Information Grid */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-600 rounded-lg flex items-center justify-center">
                  <Wallet className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.salary}</p>
                  <p className="text-lg text-emerald-700">{job.salary} {t.perMonth}</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">{t.subject}</p>
                  <p className="text-lg text-blue-700">{job.subject}</p>
                </div>
              </div>
            </Card>

            {job.studentClass && (
              <Card className="p-4 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-purple-600 rounded-lg flex items-center justify-center">
                    <GraduationCap className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t.class}</p>
                    <p className="text-lg text-purple-700">{job.studentClass}</p>
                  </div>
                </div>
              </Card>
            )}

            {job.schedule && (
              <Card className="p-4 bg-gradient-to-br from-orange-50 to-amber-50 border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-orange-600 rounded-lg flex items-center justify-center">
                    <Clock className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t.schedule}</p>
                    <p className="text-lg text-orange-700">{job.schedule}</p>
                  </div>
                </div>
              </Card>
            )}

            {job.gender && (
              <Card className="p-4 bg-gradient-to-br from-pink-50 to-rose-50 border-pink-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-pink-600 rounded-lg flex items-center justify-center">
                    <Users className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t.gender}</p>
                    <p className="text-lg text-pink-700">
                      {job.gender === 'male' ? t.male : job.gender === 'female' ? t.female : t.any}
                    </p>
                  </div>
                </div>
              </Card>
            )}

            {job.duration && (
              <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-600 rounded-lg flex items-center justify-center">
                    <Calendar className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">{t.duration}</p>
                    <p className="text-lg text-green-700">{job.duration}</p>
                  </div>
                </div>
              </Card>
            )}
          </div>

          {/* Requirements */}
          {job.requirements && job.requirements.length > 0 && (
            <Card className="p-6 bg-gray-50">
              <h3 className="text-lg text-gray-900 mb-3 flex items-center gap-2">
                <CheckCircle className="w-5 h-5 text-emerald-600" />
                {t.requirements}
              </h3>
              <ul className="space-y-2">
                {job.requirements.map((req, index) => (
                  <li key={index} className="flex items-start gap-2 text-gray-700">
                    <span className="text-emerald-600 mt-1">✓</span>
                    <span>{req}</span>
                  </li>
                ))}
              </ul>
            </Card>
          )}

          {/* Guardian Info */}
          {job.guardian && (
            <Card className="p-6 bg-gradient-to-br from-indigo-50 to-blue-50 border-indigo-200">
              <h3 className="text-lg text-gray-900 mb-3 flex items-center gap-2">
                <Home className="w-5 h-5 text-indigo-600" />
                {t.guardianInfo}
              </h3>
              <div className="flex items-center gap-2">
                <p className="text-gray-700">{job.guardian.name}</p>
                {job.guardian.verified && (
                  <Badge className="bg-green-600 text-white">
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {t.verified}
                  </Badge>
                )}
              </div>
            </Card>
          )}

          {/* Applicants Count */}
          <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 text-gray-600">
              <Users className="w-5 h-5" />
              <span>{job.applicants} {t.applicants}</span>
            </div>
            {job.postedDate && (
              <div className="flex items-center gap-2 text-gray-600">
                <Calendar className="w-5 h-5" />
                <span>{t.postedOn} {job.postedDate}</span>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3 pt-4 border-t">
            <Button
              onClick={() => {
                onApply(job.id);
                onOpenChange(false);
              }}
              disabled={userCredits < 2}
              className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-md"
            >
              {t.applyNow} (২ {t.credits})
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              variant="outline"
              className="border-gray-300"
            >
              {t.close}
            </Button>
          </div>

          {/* Low Credit Warning */}
          {userCredits < 2 && (
            <div className="flex items-center gap-2 p-4 bg-red-50 border border-red-200 rounded-lg">
              <XCircle className="w-5 h-5 text-red-600" />
              <p className="text-red-700 text-sm">
                পর্যাপ্ত ক্রেডিট নেই। আবেদন করতে ২ ক্রেডিট প্রয়োজন।
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}
