import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import { Skeleton } from './ui/skeleton';
import { GraduationCap, MapPin, FileText, Eye, Heart, AlertCircle, TrendingUp } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { donorApi } from '../utils/apiClient';

interface Application {
  id: string;
  studentName: string;
  applicationType: string;
  class?: string;
  school?: string;
  address?: string;
  reason?: string;
  amountNeeded?: string;
  status: string;
  appliedDate: string;
  approvedDate?: string;
  monthlyIncome?: string;
  familyMembers?: string;
}

interface DonorApplicationsListProps {
  donorId: string;
  language: 'bn' | 'en';
  onViewProfile: (application: Application) => void;
  onDonate: (application: Application) => void;
}

const content = {
  bn: {
    title: 'সাহায্যের আবেদন',
    subtitle: 'আপনার দাতা টাইপ অনুযায়ী ফিল্টার করা',
    loading: 'লোড হচ্ছে...',
    noApplications: 'এই মুহূর্তে কোনো আবেদন নেই',
    noApplicationsDesc: 'নতুন আবেদন এলে এখানে দেখাবে',
    viewProfile: 'প্রোফাইল দেখুন',
    donate: 'দান করুন',
    urgent: 'জরুরি',
    moderate: 'মাঝারি',
    low: 'স্বাভাবিক',
    class: 'শ্রেণী',
    school: 'স্কুল',
    location: 'এলাকা',
    needed: 'প্রয়োজন',
    reason: 'কারণ',
    applied: 'আবেদন করা হয়েছে',
    zakatHelp: 'যাকাত সাহায্য',
    educationMaterials: 'শিক্ষা উপকরণ',
    familyIncome: 'পারিবারিক আয়',
    familyMembers: 'পরিবারের সদস্য',
    month: 'মাস',
    members: 'জন',
    errorLoading: 'আবেদন লোড করতে সমস্যা হয়েছে',
  },
  en: {
    title: 'Help Requests',
    subtitle: 'Filtered by your donor type',
    loading: 'Loading...',
    noApplications: 'No applications at the moment',
    noApplicationsDesc: 'New applications will appear here',
    viewProfile: 'View Profile',
    donate: 'Donate',
    urgent: 'Urgent',
    moderate: 'Moderate',
    low: 'Normal',
    class: 'Class',
    school: 'School',
    location: 'Location',
    needed: 'Needed',
    reason: 'Reason',
    applied: 'Applied on',
    zakatHelp: 'Zakat Help',
    educationMaterials: 'Education Materials',
    familyIncome: 'Family Income',
    familyMembers: 'Family Members',
    month: 'month',
    members: 'members',
    errorLoading: 'Error loading applications',
  },
};

export function DonorApplicationsList({
  donorId,
  language,
  onViewProfile,
  onDonate,
}: DonorApplicationsListProps) {
  const t = content[language];
  const [applications, setApplications] = useState<Application[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchApplications();
  }, [donorId]);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await donorApi.getAvailableApplications(donorId);

      if (response.success && response.data) {
        setApplications(response.data.applications || []);
      } else {
        setError(response.error || t.errorLoading);
        toast.error(response.error || t.errorLoading);
      }
    } catch (err) {
      console.error('❌ Error fetching donor applications:');
      console.error('Error details:', err);
      console.error('Donor ID:', donorId);
      setError(t.errorLoading);
      // Don't show toast - just show error state in UI
      // toast.error(t.errorLoading);
    } finally {
      setLoading(false);
    }
  };

  const getUrgencyBadge = (monthlyIncome: string) => {
    const income = parseInt(monthlyIncome || '10000');
    if (income < 5000) return { label: t.urgent, color: 'bg-red-500' };
    if (income < 10000) return { label: t.moderate, color: 'bg-orange-500' };
    return { label: t.low, color: 'bg-blue-500' };
  };

  const getApplicationTypeLabel = (type: string) => {
    if (type === 'যাকাত সাহায্য' || type === 'scholarship') return t.zakatHelp;
    if (type === 'শিক্ষা উপকরণ' || type === 'materials') return t.educationMaterials;
    return type;
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <Skeleton className="h-8 w-48" />
            <Skeleton className="h-4 w-64 mt-2" />
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-64" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <h3 className="text-xl mb-2">{t.errorLoading}</h3>
        <p className="text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchApplications}>Try Again</Button>
      </Card>
    );
  }

  if (applications.length === 0) {
    return (
      <Card className="p-12 text-center">
        <GraduationCap className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-2xl mb-2">{t.noApplications}</h3>
        <p className="text-muted-foreground">{t.noApplicationsDesc}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl">{t.title}</h2>
          <p className="text-sm text-muted-foreground">{t.subtitle}</p>
        </div>
        <Badge variant="secondary" className="text-lg px-4 py-2">
          {applications.length} {language === 'bn' ? 'টি আবেদন' : 'applications'}
        </Badge>
      </div>

      {/* Applications Grid */}
      <div className="grid gap-6 md:grid-cols-2">
        {applications.map((application, index) => {
          const urgency = getUrgencyBadge(application.monthlyIncome || '10000');

          return (
            <motion.div
              key={application.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/50">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl">{application.studentName}</h3>
                      <Badge className={urgency.color}>{urgency.label}</Badge>
                    </div>
                    <Badge variant="outline" className="mt-1">
                      {getApplicationTypeLabel(application.applicationType)}
                    </Badge>
                  </div>
                </div>

                {/* Student Info */}
                <div className="space-y-2 mb-4 text-sm">
                  {application.class && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span>{application.class}</span>
                    </div>
                  )}
                  {application.school && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <FileText className="h-4 w-4" />
                      <span className="line-clamp-1">{application.school}</span>
                    </div>
                  )}
                  {application.address && (
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span className="line-clamp-1">{application.address}</span>
                    </div>
                  )}
                </div>

                {/* Financial Info */}
                <div className="grid grid-cols-2 gap-4 mb-4 p-3 bg-muted/50 rounded-lg">
                  {application.amountNeeded && (
                    <div>
                      <p className="text-xs text-muted-foreground">{t.needed}</p>
                      <p className="font-semibold text-primary">৳{application.amountNeeded}</p>
                    </div>
                  )}
                  {application.monthlyIncome && (
                    <div>
                      <p className="text-xs text-muted-foreground">{t.familyIncome}</p>
                      <p className="font-semibold">
                        ৳{application.monthlyIncome}/{t.month}
                      </p>
                    </div>
                  )}
                </div>

                {/* Reason */}
                {application.reason && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-1">{t.reason}:</p>
                    <p className="text-sm line-clamp-2 bg-muted/30 p-2 rounded">
                      {application.reason}
                    </p>
                  </div>
                )}

                {/* Applied Date */}
                <p className="text-xs text-muted-foreground mb-4">
                  {t.applied}:{' '}
                  {new Date(application.appliedDate).toLocaleDateString(
                    language === 'bn' ? 'bn-BD' : 'en-US'
                  )}
                </p>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    className="flex-1"
                    onClick={() => onViewProfile(application)}
                  >
                    <Eye className="h-4 w-4 mr-2" />
                    {t.viewProfile}
                  </Button>
                  <Button
                    className="flex-1 bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700"
                    onClick={() => onDonate(application)}
                  >
                    <Heart className="h-4 w-4 mr-2" />
                    {t.donate}
                  </Button>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
