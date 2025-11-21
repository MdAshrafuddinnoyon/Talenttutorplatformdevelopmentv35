import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { ScrollArea } from './ui/scroll-area';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { 
  Briefcase,
  MapPin,
  DollarSign,
  BookOpen,
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Send,
  RefreshCw,
  Search,
  Filter,
  User,
  Phone,
  CreditCard,
  AlertCircle,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface Job {
  id: string;
  title: string;
  subject: string;
  class: string;
  location: string;
  salary: number;
  schedule: string;
  guardianId: string;
  guardianName: string;
  guardianPhone: string;
  postedDate: string;
  status: 'open' | 'closed';
  description?: string;
}

interface Application {
  id: string;
  jobId: string;
  jobTitle: string;
  subject: string;
  class: string;
  location: string;
  salary: number;
  guardianName: string;
  guardianPhone: string;
  teacherId: string;
  teacherName: string;
  coverLetter: string;
  appliedDate: string;
  status: 'pending' | 'shortlisted' | 'hired' | 'rejected';
  guardianResponse?: string;
  interviewDate?: string;
}

interface TeacherJobApplicationManagerProps {
  language: 'bn' | 'en';
  currentUser: any;
  onCreditPurchase: () => void;
}

const content = {
  bn: {
    title: 'নতুন টিউশন',
    myApplications: 'আমার আবেদন',
    availableJobs: 'উপলব্ধ টিউশন',
    noJobs: 'কোনো টিউশন নেই',
    noJobsDesc: 'এই মুহূর্তে কোনো টিউশন উপলব্ধ নেই',
    applyNow: 'আবেদন করুন',
    viewDetails: 'বিস্তারিত',
    applied: 'আবেদিত',
    creditCost: 'ক্রেডিট খরচ',
    perApplication: 'প্রতি আবেদন',
    insufficientCredits: 'পর্যাপ্ত ক্রেডিট নেই',
    buyCredits: 'ক্রেডিট কিনুন',
    applyForJob: 'টিউশনে আবেদন',
    coverLetter: 'কভার লেটার',
    coverLetterPlaceholder: 'আপনার যোগ্যতা এবং অভিজ্ঞতা সম্পর্কে লিখুন...',
    submit: 'জমা দিন',
    cancel: 'বাতিল',
    applicationSuccess: 'আবেদন সফল হয়েছে!',
    applicationSuccessDesc: '২ ক্রেডিট কেটে নেওয়া হয়েছে',
    refresh: 'রিফ্রেশ',
    search: 'খুঁজুন...',
    all: 'সকল',
    pending: 'বিবেচনাধীন',
    shortlisted: 'শর্টলিস্টেড',
    hired: 'নিয়োগপ্রাপ্ত',
    rejected: 'প্রত্যাখ্যাত',
    noApplications: 'কোনো আবেদন নেই',
    noApplicationsDesc: 'আপনি এখনো কোনো টিউশনে আবেদন করেননি',
    appliedOn: 'আবেদনের তারিখ',
    status: 'অবস্থা',
    guardianResponse: 'অভিভাবকের প্রতিক্রিয়া',
    interviewScheduled: 'ইন্টারভিউ নির্ধারিত',
    totalApplications: 'মোট আবেদন',
    waitingResponse: 'অভিভাবকের সাড়ার জন্য অপেক্ষা করুন',
    congratulations: 'অভিনন্দন! আপনাকে নিয়োগ দেওয়া হয়েছে',
    shortlistedMsg: 'আপনি শর্টলিস্টেড হয়েছেন',
    rejectedMsg: 'দুঃখিত, আপনার আবেদন প্রত্যাখ্যাত হয়েছে',
  },
  en: {
    title: 'New Tuitions',
    myApplications: 'My Applications',
    availableJobs: 'Available Tuitions',
    noJobs: 'No Jobs',
    noJobsDesc: 'No tuitions available at the moment',
    applyNow: 'Apply Now',
    viewDetails: 'Details',
    applied: 'Applied',
    creditCost: 'Credit Cost',
    perApplication: 'per application',
    insufficientCredits: 'Insufficient credits',
    buyCredits: 'Buy Credits',
    applyForJob: 'Apply for Tuition',
    coverLetter: 'Cover Letter',
    coverLetterPlaceholder: 'Write about your qualifications and experience...',
    submit: 'Submit',
    cancel: 'Cancel',
    applicationSuccess: 'Application submitted!',
    applicationSuccessDesc: '2 credits deducted',
    refresh: 'Refresh',
    search: 'Search...',
    all: 'All',
    pending: 'Pending',
    shortlisted: 'Shortlisted',
    hired: 'Hired',
    rejected: 'Rejected',
    noApplications: 'No Applications',
    noApplicationsDesc: "You haven't applied for any tuitions yet",
    appliedOn: 'Applied On',
    status: 'Status',
    guardianResponse: 'Guardian Response',
    interviewScheduled: 'Interview Scheduled',
    totalApplications: 'Total Applications',
    waitingResponse: 'Waiting for guardian response',
    congratulations: 'Congratulations! You have been hired',
    shortlistedMsg: 'You have been shortlisted',
    rejectedMsg: 'Sorry, your application was rejected',
  },
};

export function TeacherJobApplicationManager({ language, currentUser, onCreditPurchase }: TeacherJobApplicationManagerProps) {
  const t = content[language];
  const [activeTab, setActiveTab] = useState<'available' | 'applications'>('available');
  const [jobs, setJobs] = useState<Job[]>([]);
  const [applications, setApplications] = useState<Application[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'shortlisted' | 'hired' | 'rejected'>('all');
  const [selectedJob, setSelectedJob] = useState<Job | null>(null);
  const [showApplyDialog, setShowApplyDialog] = useState(false);
  const [coverLetter, setCoverLetter] = useState('');
  const [isApplying, setIsApplying] = useState(false);
  const [credits, setCredits] = useState(50);

  const loadJobs = () => {
    // Load tuition posts from localStorage
    const allPosts = JSON.parse(localStorage.getItem('tuitionPosts') || '[]');
    const openJobs = allPosts.filter((post: any) => post.status === 'open');
    setJobs(openJobs);
  };

  const loadApplications = () => {
    // Load teacher's applications from localStorage
    const allApplications = JSON.parse(localStorage.getItem('tuitionApplications') || '[]');
    const myApplications = allApplications.filter((app: Application) => app.teacherId === currentUser?.id);
    setApplications(myApplications);
  };

  const loadCredits = () => {
    // Load teacher's credits
    const savedCredits = localStorage.getItem(`credits_${currentUser?.id}`);
    if (savedCredits) {
      setCredits(parseInt(savedCredits));
    }
  };

  useEffect(() => {
    loadJobs();
    loadApplications();
    loadCredits();

    // Refresh every 15 seconds
    const interval = setInterval(() => {
      loadJobs();
      loadApplications();
      loadCredits();
    }, 15000);

    return () => clearInterval(interval);
  }, [currentUser]);

  const handleApply = (job: Job) => {
    if (credits < 2) {
      toast.error(t.insufficientCredits, {
        description: language === 'bn' ? 'ক্রেডিট কিনুন' : 'Buy credits',
        action: {
          label: t.buyCredits,
          onClick: onCreditPurchase,
        },
      });
      return;
    }

    setSelectedJob(job);
    setShowApplyDialog(true);
    setCoverLetter('');
  };

  const submitApplication = async () => {
    if (!selectedJob || !coverLetter.trim()) {
      toast.error(language === 'bn' ? 'কভার লেটার লিখুন' : 'Please write a cover letter');
      return;
    }

    setIsApplying(true);

    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Create application
      const application: Application = {
        id: `APP-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        jobId: selectedJob.id,
        jobTitle: selectedJob.title,
        subject: selectedJob.subject,
        class: selectedJob.class,
        location: selectedJob.location,
        salary: selectedJob.salary,
        guardianName: selectedJob.guardianName,
        guardianPhone: selectedJob.guardianPhone,
        teacherId: currentUser.id,
        teacherName: currentUser.name,
        coverLetter: coverLetter,
        appliedDate: new Date().toISOString(),
        status: 'pending',
      };

      // Save to localStorage
      const allApplications = JSON.parse(localStorage.getItem('tuitionApplications') || '[]');
      allApplications.push(application);
      localStorage.setItem('tuitionApplications', JSON.stringify(allApplications));

      // Deduct credits
      const newCredits = credits - 2;
      setCredits(newCredits);
      localStorage.setItem(`credits_${currentUser.id}`, newCredits.toString());

      // Send notification to guardian
      const notifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      notifications.push({
        id: `notif-${Date.now()}`,
        type: 'new_application',
        title: language === 'bn' ? 'নতুন আবেদন' : 'New Application',
        message: language === 'bn'
          ? `${currentUser.name} আপনার টিউশনে আবেদন করেছেন`
          : `${currentUser.name} applied for your tuition`,
        userId: selectedJob.guardianId,
        timestamp: new Date().toISOString(),
        read: false,
        link: '/guardian-dashboard?tab=applications',
      });
      localStorage.setItem('notifications', JSON.stringify(notifications));

      toast.success(t.applicationSuccess, {
        description: t.applicationSuccessDesc,
      });

      setShowApplyDialog(false);
      loadApplications();
      loadCredits();

    } catch (error) {
      toast.error(language === 'bn' ? 'আবেদন জমা দিতে সমস্যা হয়েছে' : 'Failed to submit application');
    } finally {
      setIsApplying(false);
    }
  };

  const isJobApplied = (jobId: string) => {
    return applications.some(app => app.jobId === jobId);
  };

  const filteredApplications = applications.filter(app => {
    const matchesFilter = filterStatus === 'all' || app.status === filterStatus;
    const matchesSearch = searchTerm === '' ||
      app.jobTitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
      app.subject.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const stats = {
    total: applications.length,
    pending: applications.filter(a => a.status === 'pending').length,
    shortlisted: applications.filter(a => a.status === 'shortlisted').length,
    hired: applications.filter(a => a.status === 'hired').length,
    rejected: applications.filter(a => a.status === 'rejected').length,
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500 text-white"><Clock className="w-3 h-3 mr-1" />{t.pending}</Badge>;
      case 'shortlisted':
        return <Badge className="bg-blue-500 text-white"><Eye className="w-3 h-3 mr-1" />{t.shortlisted}</Badge>;
      case 'hired':
        return <Badge className="bg-green-500 text-white"><CheckCircle className="w-3 h-3 mr-1" />{t.hired}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500 text-white"><XCircle className="w-3 h-3 mr-1" />{t.rejected}</Badge>;
      default:
        return null;
    }
  };

  const getStatusMessage = (status: string) => {
    switch (status) {
      case 'pending':
        return { text: t.waitingResponse, color: 'text-yellow-700 bg-yellow-50 border-yellow-200' };
      case 'shortlisted':
        return { text: t.shortlistedMsg, color: 'text-blue-700 bg-blue-50 border-blue-200' };
      case 'hired':
        return { text: t.congratulations, color: 'text-green-700 bg-green-50 border-green-200' };
      case 'rejected':
        return { text: t.rejectedMsg, color: 'text-red-700 bg-red-50 border-red-200' };
      default:
        return { text: '', color: '' };
    }
  };

  return (
    <div className="space-y-6">
      <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as any)}>
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger value="available" className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
              {t.availableJobs} ({jobs.length})
            </TabsTrigger>
            <TabsTrigger value="applications" className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
              {t.myApplications} ({stats.total})
            </TabsTrigger>
          </TabsList>

          <Button 
            onClick={() => { loadJobs(); loadApplications(); loadCredits(); }} 
            variant="outline" 
            size="sm"
            className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            {t.refresh}
          </Button>
        </div>

        {/* Available Jobs Tab */}
        <TabsContent value="available" className="space-y-4">
          <ScrollArea className="h-[600px] pr-4">
            {jobs.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className={`text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.noJobs}
                </h3>
                <p className={`text-gray-500 text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.noJobsDesc}
                </p>
              </div>
            ) : (
              <div className="grid gap-4">
                {jobs.map((job, index) => {
                  const applied = isJobApplied(job.id);
                  return (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className={`p-4 hover:shadow-md transition-shadow ${applied ? 'bg-gray-50 border-gray-300' : ''}`}>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <h3 className={`text-lg text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                              {job.title}
                            </h3>
                            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-3 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-4 h-4" />
                                <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                  {job.subject}
                                </span>
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                  {job.class}
                                </span>
                              </span>
                              <span className="flex items-center gap-1">
                                <MapPin className="w-4 h-4" />
                                <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                  {job.location}
                                </span>
                              </span>
                              <span className="flex items-center gap-1">
                                <DollarSign className="w-4 h-4" />
                                <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                  {job.salary}/মাস
                                </span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-4 h-4" />
                                <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                  {job.schedule}
                                </span>
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-4 h-4" />
                                <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                  {job.guardianName}
                                </span>
                              </span>
                            </div>
                            {job.description && (
                              <p className={`text-sm text-gray-600 mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                                {job.description}
                              </p>
                            )}
                            <div className="flex items-center gap-2 text-xs text-gray-500">
                              <Clock className="w-3 h-3" />
                              <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                {new Date(job.postedDate).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                              </span>
                            </div>
                          </div>
                          <div className="ml-4">
                            {applied ? (
                              <Badge variant="outline" className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                <CheckCircle className="w-3 h-3 mr-1" />
                                {t.applied}
                              </Badge>
                            ) : (
                              <Button
                                onClick={() => handleApply(job)}
                                className={`bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                              >
                                <Send className="w-4 h-4 mr-2" />
                                {t.applyNow}
                              </Button>
                            )}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </TabsContent>

        {/* My Applications Tab */}
        <TabsContent value="applications" className="space-y-4">
          {/* Stats Cards */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-4">
            <Card className="p-3 bg-gradient-to-br from-blue-50 to-indigo-50 border-blue-200">
              <div className="text-center">
                <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.totalApplications}
                </p>
                <p className="text-2xl text-gray-900 mt-1">{stats.total}</p>
              </div>
            </Card>
            <Card className="p-3 bg-gradient-to-br from-yellow-50 to-amber-50 border-yellow-200">
              <div className="text-center">
                <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.pending}
                </p>
                <p className="text-2xl text-gray-900 mt-1">{stats.pending}</p>
              </div>
            </Card>
            <Card className="p-3 bg-gradient-to-br from-blue-50 to-cyan-50 border-blue-200">
              <div className="text-center">
                <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.shortlisted}
                </p>
                <p className="text-2xl text-gray-900 mt-1">{stats.shortlisted}</p>
              </div>
            </Card>
            <Card className="p-3 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="text-center">
                <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.hired}
                </p>
                <p className="text-2xl text-gray-900 mt-1">{stats.hired}</p>
              </div>
            </Card>
            <Card className="p-3 bg-gradient-to-br from-red-50 to-pink-50 border-red-200">
              <div className="text-center">
                <p className={`text-sm text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.rejected}
                </p>
                <p className="text-2xl text-gray-900 mt-1">{stats.rejected}</p>
              </div>
            </Card>
          </div>

          {/* Filter */}
          <div className="flex gap-2 mb-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={t.search}
                className={`pl-10 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
              />
            </div>
            <div className="flex gap-2">
              {(['all', 'pending', 'shortlisted', 'hired', 'rejected'] as const).map(status => (
                <Button
                  key={status}
                  onClick={() => setFilterStatus(status)}
                  variant={filterStatus === status ? 'default' : 'outline'}
                  size="sm"
                  className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
                >
                  {t[status]}
                </Button>
              ))}
            </div>
          </div>

          {/* Applications List */}
          <ScrollArea className="h-[500px] pr-4">
            {filteredApplications.length === 0 ? (
              <div className="text-center py-12">
                <Briefcase className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className={`text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.noApplications}
                </h3>
                <p className={`text-gray-500 text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.noApplicationsDesc}
                </p>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredApplications.map((app, index) => {
                  const statusMsg = getStatusMessage(app.status);
                  return (
                    <motion.div
                      key={app.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                    >
                      <Card className="p-4 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className={`text-lg text-gray-900 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                              {app.jobTitle}
                            </h3>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <span className="flex items-center gap-1">
                                <BookOpen className="w-3 h-3" />
                                <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                  {app.subject}
                                </span>
                              </span>
                              <span className="flex items-center gap-1">
                                <User className="w-3 h-3" />
                                <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                                  {app.class}
                                </span>
                              </span>
                              <span className="flex items-center gap-1">
                                <Calendar className="w-3 h-3" />
                                {new Date(app.appliedDate).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                              </span>
                            </div>
                          </div>
                          {getStatusBadge(app.status)}
                        </div>

                        {/* Status Message */}
                        <div className={`p-3 rounded-lg border ${statusMsg.color} mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                          {statusMsg.text}
                        </div>

                        {/* Guardian Response */}
                        {app.guardianResponse && (
                          <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-3">
                            <p className={`text-sm text-blue-800 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                              {t.guardianResponse}:
                            </p>
                            <p className={`text-sm text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                              {app.guardianResponse}
                            </p>
                          </div>
                        )}

                        {/* Interview Date */}
                        {app.interviewDate && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                            <p className={`text-sm text-green-800 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                              {t.interviewScheduled}: {new Date(app.interviewDate).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                            </p>
                          </div>
                        )}
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            )}
          </ScrollArea>
        </TabsContent>
      </Tabs>

      {/* Apply Dialog */}
      <Dialog open={showApplyDialog} onOpenChange={setShowApplyDialog}>
        <DialogContent className={`max-w-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-emerald-600" />
              {t.applyForJob}
            </DialogTitle>
            <DialogDescription className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
              {selectedJob?.title}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 py-4">
            {/* Cost Info */}
            <div className="flex items-center justify-between p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <span className={`text-sm text-purple-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.creditCost}:
              </span>
              <span className={`text-lg text-purple-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                2 {language === 'bn' ? 'ক্রেডিট' : 'Credits'}
              </span>
            </div>

            {/* Cover Letter */}
            <div>
              <Label className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                {t.coverLetter} *
              </Label>
              <Textarea
                value={coverLetter}
                onChange={(e) => setCoverLetter(e.target.value)}
                placeholder={t.coverLetterPlaceholder}
                className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
                rows={6}
              />
              <p className={`text-xs text-gray-500 mt-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {language === 'bn'
                  ? 'আপনার শিক্ষাগত যোগ্যতা, অভিজ্ঞতা এবং কেন আপনি এই টিউশনের জন্য উপযুক্ত তা বিস্তারিত লিখুন'
                  : 'Describe your qualifications, experience, and why you are suitable for this tuition'
                }
              </p>
            </div>

            {credits < 2 && (
              <div className="flex items-center gap-2 p-3 bg-red-50 border border-red-200 rounded-lg">
                <AlertCircle className="w-4 h-4 text-red-600" />
                <span className={`text-sm text-red-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.insufficientCredits}
                </span>
              </div>
            )}
          </div>

          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setShowApplyDialog(false)}
              disabled={isApplying}
              className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
            >
              {t.cancel}
            </Button>
            <Button
              onClick={submitApplication}
              disabled={isApplying || credits < 2}
              className={`bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
            >
              {isApplying ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  {language === 'bn' ? 'জমা দেওয়া হচ্ছে...' : 'Submitting...'}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {t.submit}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
