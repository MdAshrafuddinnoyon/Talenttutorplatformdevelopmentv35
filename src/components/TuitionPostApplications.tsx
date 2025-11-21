import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Avatar } from './ui/avatar';
import { Textarea } from './ui/textarea';
import { 
  User, 
  Mail, 
  Phone, 
  Star, 
  CheckCircle, 
  XCircle,
  Eye,
  MessageSquare,
  Award,
  BookOpen,
  Clock
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface TuitionPostApplicationsProps {
  postId: string;
  postTitle: string;
  language: 'bn' | 'en';
  onUpdate?: () => void;
}

const content = {
  bn: {
    title: 'আবেদনকারী শিক্ষক',
    subtitle: 'যারা আপনার টিউশন পোস্টে আবেদন করেছেন',
    noApplications: 'এখনও কোন আবেদন আসেনি',
    viewProfile: 'প্রোফাইল দেখুন',
    shortlist: 'শর্টলিস্ট',
    reject: 'প্রত্যাখ্যান',
    hire: 'নিয়োগ দিন',
    experience: 'অভিজ্ঞতা',
    subjects: 'বিষয়',
    rating: 'রেটিং',
    appliedOn: 'আবেদনের তারিখ',
    status: 'স্ট্যাটাস',
    pending: 'অপেক্ষমাণ',
    shortlisted: 'শর্টলিস্টেড',
    rejected: 'প্রত্যাখ্যাত',
    hired: 'নিয়োগপ্রাপ্ত',
    proposalNote: 'প্রস্তাবনা নোট',
    proposedFee: 'প্রস্তাবিত ফি',
    actionNote: 'মন্তব্য',
    actionNotePlaceholder: 'আপনার মন্তব্য লিখুন (ঐচ্ছিক)...',
    confirmShortlist: 'শর্টলিস্ট নিশ্চিত করুন',
    confirmReject: 'প্রত্যাখ্যান নিশ্চিত করুন',
    shortlisting: 'শর্টলিস্ট হচ্ছে...',
    rejecting: 'প্রত্যাখ্যান হচ্ছে...',
    successShortlisted: 'শিক্ষক শর্টলিস্ট করা হয়েছে',
    successRejected: 'আবেদন প্রত্যাখ্যান করা হয়েছে',
    errorUpdating: 'আপডেট করতে সমস্যা হয়েছে',
    loadingApplications: 'আবেদন লোড হচ্ছে...',
  },
  en: {
    title: 'Applicant Teachers',
    subtitle: 'Teachers who applied to your tuition post',
    noApplications: 'No applications yet',
    viewProfile: 'View Profile',
    shortlist: 'Shortlist',
    reject: 'Reject',
    hire: 'Hire',
    experience: 'Experience',
    subjects: 'Subjects',
    rating: 'Rating',
    appliedOn: 'Applied On',
    status: 'Status',
    pending: 'Pending',
    shortlisted: 'Shortlisted',
    rejected: 'Rejected',
    hired: 'Hired',
    proposalNote: 'Proposal Note',
    proposedFee: 'Proposed Fee',
    actionNote: 'Comment',
    actionNotePlaceholder: 'Write your comment (optional)...',
    confirmShortlist: 'Confirm Shortlist',
    confirmReject: 'Confirm Rejection',
    shortlisting: 'Shortlisting...',
    rejecting: 'Rejecting...',
    successShortlisted: 'Teacher shortlisted',
    successRejected: 'Application rejected',
    errorUpdating: 'Failed to update',
    loadingApplications: 'Loading applications...',
  }
};

export function TuitionPostApplications({ 
  postId, 
  postTitle,
  language,
  onUpdate 
}: TuitionPostApplicationsProps) {
  const t = content[language];
  
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApplication, setSelectedApplication] = useState<any>(null);
  const [showActionDialog, setShowActionDialog] = useState(false);
  const [actionType, setActionType] = useState<'shortlist' | 'reject'>('shortlist');
  const [actionNote, setActionNote] = useState('');
  const [isUpdating, setIsUpdating] = useState(false);
  
  const loadApplications = async () => {
    // Validate postId before fetching
    if (!postId || postId === 'undefined' || postId === 'null') {
      console.warn('Invalid postId, skipping applications fetch:', postId);
      setApplications([]);
      return;
    }

    try {
      setIsLoading(true);
      
      console.log('=== Fetching Applications ===');
      console.log('Post ID:', postId);
      console.log('Project ID:', projectId);
      
      const url = `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/tuition-posts/${postId}/applications`;
      console.log('Fetch URL:', url);
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${publicAnonKey}`,
        },
      });
      
      console.log('Response status:', response.status);
      console.log('Response ok:', response.ok);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Applications data:', data);
        
        if (data.success) {
          setApplications(data.applications || []);
          console.log('✅ Loaded', data.applications?.length || 0, 'applications');
        } else {
          console.error('API returned success=false:', data.error);
          setApplications([]);
        }
      } else {
        const errorText = await response.text();
        console.error('❌ Error response:', errorText);
        console.error('Status:', response.status, response.statusText);
        
        // Don't show toast for 404 - just empty state
        if (response.status !== 404) {
          toast.error(language === 'bn' ? 'আবেদন লোড করতে সমস্যা হয়েছে' : 'Failed to load applications');
        }
        setApplications([]);
      }
    } catch (error) {
      console.error('❌ Error fetching applications:');
      console.error('Error details:', error);
      console.error('Error message:', error instanceof Error ? error.message : String(error));
      console.error('Error stack:', error instanceof Error ? error.stack : 'No stack trace');
      
      // Don't show toast for network errors - might be offline
      // toast.error(language === 'bn' ? 'আবেদন লোড করতে সমস্যা হয়েছে' : 'Failed to load applications');
      setApplications([]);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (postId && postId !== 'undefined' && postId !== 'null') {
      loadApplications();
    } else {
      console.warn('Skipping loadApplications - invalid postId:', postId);
      setApplications([]);
    }
  }, [postId]);
  
  const handleAction = async () => {
    if (!selectedApplication) return;
    
    setIsUpdating(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/applications/${selectedApplication.id}/status`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            status: actionType === 'shortlist' ? 'shortlisted' : 'rejected',
            guardianNotes: actionNote,
          }),
        }
      );
      
      if (response.ok) {
        toast.success(actionType === 'shortlist' ? t.successShortlisted : t.successRejected);
        setShowActionDialog(false);
        setActionNote('');
        loadApplications();
        onUpdate?.();
      } else {
        throw new Error('Update failed');
      }
    } catch (error) {
      console.error('Action error:', error);
      toast.error(t.errorUpdating);
    } finally {
      setIsUpdating(false);
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge className="bg-yellow-500">{t.pending}</Badge>;
      case 'shortlisted':
        return <Badge className="bg-blue-500">{t.shortlisted}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">{t.rejected}</Badge>;
      case 'hired':
        return <Badge className="bg-green-500">{t.hired}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  if (isLoading) {
    return (
      <Card className="p-8 text-center">
        <Clock className="w-8 h-8 animate-spin mx-auto mb-3 text-teal-600" />
        <p className="text-gray-600">{t.loadingApplications}</p>
      </Card>
    );
  }
  
  if (applications.length === 0) {
    return (
      <Card className="p-8 text-center">
        <User className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p className="text-gray-600">{t.noApplications}</p>
      </Card>
    );
  }
  
  return (
    <>
      <Card className="p-6">
        <h3 className="text-xl font-semibold mb-4">{t.title}</h3>
        <p className="text-gray-600 mb-6">{t.subtitle}</p>
        
        <div className="space-y-4">
          {applications.map((application) => (
            <Card key={application.id} className="p-5 hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                {/* Avatar */}
                <div className="w-16 h-16 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-full flex items-center justify-center flex-shrink-0">
                  <User className="w-8 h-8 text-white" />
                </div>
                
                {/* Info */}
                <div className="flex-1">
                  <div className="flex items-start justify-between mb-2">
                    <div>
                      <h4 className="text-lg font-semibold">
                        {application.teacherInfo?.name || 'Unknown'}
                      </h4>
                      <div className="flex items-center gap-3 text-sm text-gray-600 mt-1">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-amber-500 fill-amber-500" />
                          {application.teacherInfo?.rating || 'N/A'}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {application.teacherInfo?.experience || 'N/A'}
                        </span>
                      </div>
                    </div>
                    {getStatusBadge(application.status)}
                  </div>
                  
                  {/* Teacher Details */}
                  <div className="space-y-2 mb-3">
                    {application.teacherInfo?.subjects && (
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="w-4 h-4 text-teal-600" />
                        <span className="text-gray-700">
                          {language === 'bn' ? 'বিষয়' : 'Subjects'}: {application.teacherInfo.subjects.join(', ')}
                        </span>
                      </div>
                    )}
                    {application.teacherInfo?.phone && (
                      <div className="flex items-center gap-2 text-sm">
                        <Phone className="w-4 h-4 text-teal-600" />
                        <span className="text-gray-700">{application.teacherInfo.phone}</span>
                      </div>
                    )}
                    {application.teacherInfo?.email && (
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="w-4 h-4 text-teal-600" />
                        <span className="text-gray-700">{application.teacherInfo.email}</span>
                      </div>
                    )}
                  </div>
                  
                  {/* Proposal */}
                  {application.proposalNote && (
                    <Card className="p-3 bg-gray-50 mb-3">
                      <p className="text-sm font-medium text-gray-700 mb-1">{t.proposalNote}:</p>
                      <p className="text-sm text-gray-600">{application.proposalNote}</p>
                    </Card>
                  )}
                  
                  {application.proposedFee && (
                    <p className="text-sm text-gray-700 mb-3">
                      {t.proposedFee}: <span className="font-semibold text-teal-600">৳{application.proposedFee}/মাস</span>
                    </p>
                  )}
                  
                  <p className="text-xs text-gray-500">
                    {t.appliedOn}: {new Date(application.appliedAt).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
                  </p>
                  
                  {/* Actions */}
                  {application.status === 'pending' && (
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => {
                          // TODO: Open teacher profile
                          toast.info(language === 'bn' ? 'প্রোফাইল দেখার ফিচার শীঘ্রই আসছে' : 'Profile view coming soon');
                        }}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        {t.viewProfile}
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => {
                          setSelectedApplication(application);
                          setActionType('shortlist');
                          setShowActionDialog(true);
                        }}
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        {t.shortlist}
                      </Button>
                      <Button
                        size="sm"
                        variant="destructive"
                        onClick={() => {
                          setSelectedApplication(application);
                          setActionType('reject');
                          setShowActionDialog(true);
                        }}
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        {t.reject}
                      </Button>
                    </div>
                  )}
                  
                  {application.status === 'shortlisted' && (
                    <div className="mt-4">
                      <Button
                        size="sm"
                        className="bg-teal-600 hover:bg-teal-700"
                        onClick={() => {
                          // TODO: Open hiring dialog
                          toast.info(language === 'bn' ? 'নিয়োগ দেওয়ার ফিচার শীঘ্রই আসছে' : 'Hiring feature coming soon');
                        }}
                      >
                        <Award className="w-4 h-4 mr-1" />
                        {t.hire}
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </Card>
      
      {/* Action Confirmation Dialog */}
      <Dialog open={showActionDialog} onOpenChange={setShowActionDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {actionType === 'shortlist' ? t.confirmShortlist : t.confirmReject}
            </DialogTitle>
            <DialogDescription>
              {selectedApplication?.teacherInfo?.name}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">{t.actionNote}</label>
              <Textarea
                value={actionNote}
                onChange={(e) => setActionNote(e.target.value)}
                placeholder={t.actionNotePlaceholder}
                rows={3}
              />
            </div>
            
            <div className="flex gap-3">
              <Button
                onClick={handleAction}
                disabled={isUpdating}
                className={actionType === 'shortlist' ? 'flex-1 bg-green-600 hover:bg-green-700' : 'flex-1 bg-red-600 hover:bg-red-700'}
              >
                {isUpdating ? (
                  actionType === 'shortlist' ? t.shortlisting : t.rejecting
                ) : (
                  actionType === 'shortlist' ? t.shortlist : t.reject
                )}
              </Button>
              <Button
                variant="outline"
                onClick={() => setShowActionDialog(false)}
                disabled={isUpdating}
              >
                {language === 'bn' ? 'বাতিল' : 'Cancel'}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
