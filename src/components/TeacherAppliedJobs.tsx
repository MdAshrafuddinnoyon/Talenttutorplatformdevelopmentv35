import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Send, 
  MapPin, 
  DollarSign, 
  BookOpen, 
  Calendar,
  Clock,
  CheckCircle,
  XCircle,
  Eye,
  Search,
  Filter,
  FileText
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { Input } from './ui/input';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';

interface TeacherAppliedJobsProps {
  language: 'bn' | 'en';
  currentUser: any;
  onViewJob: (jobId: string) => void;
}

export function TeacherAppliedJobs({ language, currentUser, onViewJob }: TeacherAppliedJobsProps) {
  const [appliedJobs, setAppliedJobs] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState<'all' | 'pending' | 'shortlisted' | 'rejected'>('all');
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showDetailsDialog, setShowDetailsDialog] = useState(false);

  const t = {
    bn: {
      title: 'আমার আবেদনসমূহ',
      noApplications: 'কোন আবেদন নেই',
      noApplicationsDesc: 'আপনি এখনো কোন টিউশনে আবেদন করেননি',
      viewDetails: 'বিস্তারিত দেখুন',
      appliedOn: 'আবেদনের তারিখ',
      status: 'অবস্থা',
      pending: 'অপেক্ষমাণ',
      shortlisted: 'শর্টলিস্টেড',
      rejected: 'প্রত্যাখ্যাত',
      accepted: 'গৃহীত',
      creditsUsed: 'ক্রেডিট ব্যবহৃত',
      coverLetter: 'কভার লেটার',
      perMonth: '/মাস',
      search: 'খুঁজুন...',
      all: 'সব',
      guardianName: 'অভিভাবক',
      viewJob: 'টিউশন দেখুন',
      applicationDetails: 'আবেদনের বিস্তারিত',
    },
    en: {
      title: 'My Applications',
      noApplications: 'No applications',
      noApplicationsDesc: 'You have not applied to any tuitions yet',
      viewDetails: 'View Details',
      appliedOn: 'Applied on',
      status: 'Status',
      pending: 'Pending',
      shortlisted: 'Shortlisted',
      rejected: 'Rejected',
      accepted: 'Accepted',
      creditsUsed: 'Credits used',
      coverLetter: 'Cover Letter',
      perMonth: '/month',
      search: 'Search...',
      all: 'All',
      guardianName: 'Guardian',
      viewJob: 'View Job',
      applicationDetails: 'Application Details',
    },
  };

  const content = t[language];

  useEffect(() => {
    loadAppliedJobs();
  }, [currentUser]);

  const loadAppliedJobs = () => {
    if (!currentUser) return;

    const appliedJobsKey = `applied_jobs_${currentUser.id}`;
    const applications = JSON.parse(localStorage.getItem(appliedJobsKey) || '[]');
    
    // Sort by most recent first
    applications.sort((a: any, b: any) => 
      new Date(b.appliedDate).getTime() - new Date(a.appliedDate).getTime()
    );

    setAppliedJobs(applications);
  };

  const getStatusBadge = (status: string) => {
    const statusConfig = {
      pending: { color: 'bg-yellow-100 text-yellow-700 border-yellow-300', label: content.pending },
      shortlisted: { color: 'bg-blue-100 text-blue-700 border-blue-300', label: content.shortlisted },
      rejected: { color: 'bg-red-100 text-red-700 border-red-300', label: content.rejected },
      accepted: { color: 'bg-green-100 text-green-700 border-green-300', label: content.accepted },
    };

    const config = statusConfig[status as keyof typeof statusConfig] || statusConfig.pending;
    return <Badge className={config.color}>{config.label}</Badge>;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'shortlisted':
      case 'accepted':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'rejected':
        return <XCircle className="w-5 h-5 text-red-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredApplications = appliedJobs.filter((app) => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const matchesSearch = 
        app.jobTitle.toLowerCase().includes(searchLower) ||
        app.location.toLowerCase().includes(searchLower) ||
        app.guardianName.toLowerCase().includes(searchLower);
      
      if (!matchesSearch) return false;
    }

    // Status filter
    if (filterStatus !== 'all') {
      return app.status === filterStatus;
    }

    return true;
  });

  const handleViewDetails = (application: any) => {
    setSelectedApplication(application);
    setShowDetailsDialog(true);
  };

  const handleViewJob = (jobId: string) => {
    localStorage.setItem('selectedJobId', jobId);
    onViewJob(jobId);
  };

  return (
    <>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Send className="w-5 h-5 text-blue-600" />
              {content.title}
              <Badge variant="secondary">{appliedJobs.length}</Badge>
            </CardTitle>
          </div>

          {appliedJobs.length > 0 && (
            <div className="flex flex-col sm:flex-row gap-3 mt-4">
              {/* Search */}
              <div className="flex-1 relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <Input
                  placeholder={content.search}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-9"
                />
              </div>

              {/* Filter */}
              <div className="flex gap-2 flex-wrap">
                <Button
                  size="sm"
                  variant={filterStatus === 'all' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('all')}
                >
                  {content.all}
                </Button>
                <Button
                  size="sm"
                  variant={filterStatus === 'pending' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('pending')}
                >
                  {content.pending}
                </Button>
                <Button
                  size="sm"
                  variant={filterStatus === 'shortlisted' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('shortlisted')}
                >
                  {content.shortlisted}
                </Button>
                <Button
                  size="sm"
                  variant={filterStatus === 'rejected' ? 'default' : 'outline'}
                  onClick={() => setFilterStatus('rejected')}
                >
                  {content.rejected}
                </Button>
              </div>
            </div>
          )}
        </CardHeader>

        <CardContent>
          {filteredApplications.length === 0 ? (
            <div className="text-center py-12">
              <Send className="w-16 h-16 mx-auto mb-4 text-gray-300" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                {content.noApplications}
              </h3>
              <p className="text-gray-600">{content.noApplicationsDesc}</p>
            </div>
          ) : (
            <div className="space-y-4">
              {filteredApplications.map((app, index) => (
                <Card key={index} className="border-2 hover:border-blue-300 transition-colors">
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        {/* Title and Status */}
                        <div className="flex items-start gap-3">
                          {getStatusIcon(app.status)}
                          <div className="flex-1">
                            <div className="flex items-start justify-between gap-2 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">
                                {app.jobTitle}
                              </h3>
                              {getStatusBadge(app.status)}
                            </div>
                          </div>
                        </div>

                        {/* Info Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 text-sm">
                          <div className="flex items-center gap-2 text-gray-700">
                            <MapPin className="w-4 h-4 text-blue-600" />
                            <span>{app.location}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <DollarSign className="w-4 h-4 text-green-600" />
                            <span className="font-semibold">৳{app.salary}{content.perMonth}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <BookOpen className="w-4 h-4 text-purple-600" />
                            <span>{app.subjects.join(', ')}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <Calendar className="w-4 h-4 text-orange-600" />
                            <span>{formatDate(app.appliedDate)}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <span className="font-medium">{content.guardianName}:</span>
                            <span>{app.guardianName}</span>
                          </div>
                          <div className="flex items-center gap-2 text-gray-700">
                            <span className="font-medium">{content.creditsUsed}:</span>
                            <span className="text-red-600 font-semibold">{app.creditsUsed}</span>
                          </div>
                        </div>
                      </div>

                      {/* Actions */}
                      <div className="flex flex-col gap-2">
                        <Button
                          size="sm"
                          variant="default"
                          onClick={() => handleViewDetails(app)}
                          className="gap-2"
                        >
                          <Eye className="w-4 h-4" />
                          {content.viewDetails}
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => handleViewJob(app.jobId)}
                          className="gap-2"
                        >
                          <FileText className="w-4 h-4" />
                          {content.viewJob}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Application Details Dialog */}
      <Dialog open={showDetailsDialog} onOpenChange={setShowDetailsDialog}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{content.applicationDetails}</DialogTitle>
            <DialogDescription>
              {selectedApplication?.jobTitle}
            </DialogDescription>
          </DialogHeader>

          {selectedApplication && (
            <div className="space-y-6">
              {/* Status */}
              <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3">
                  {getStatusIcon(selectedApplication.status)}
                  <div>
                    <p className="text-sm text-gray-600">{content.status}</p>
                    <div className="mt-1">{getStatusBadge(selectedApplication.status)}</div>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">{content.appliedOn}</p>
                  <p className="font-semibold">{formatDate(selectedApplication.appliedDate)}</p>
                </div>
              </div>

              {/* Job Details */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600 mb-1">Location</p>
                  <p className="font-semibold">{selectedApplication.location}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Salary</p>
                  <p className="font-semibold">৳{selectedApplication.salary}{content.perMonth}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">Subjects</p>
                  <p className="font-semibold">{selectedApplication.subjects.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 mb-1">{content.guardianName}</p>
                  <p className="font-semibold">{selectedApplication.guardianName}</p>
                </div>
              </div>

              {/* Cover Letter */}
              <div>
                <p className="text-sm font-semibold text-gray-900 mb-2">{content.coverLetter}</p>
                <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 max-h-64 overflow-y-auto">
                  <p className="text-gray-700 whitespace-pre-wrap">{selectedApplication.coverLetter}</p>
                </div>
              </div>

              {/* Credits Used */}
              <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-900">
                  {content.creditsUsed}: <span className="font-bold">{selectedApplication.creditsUsed}</span> credits
                </p>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}
