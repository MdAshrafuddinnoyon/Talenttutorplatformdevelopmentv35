import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { ScrollArea } from './ui/scroll-area';
import { 
  Eye, 
  RefreshCw, 
  CheckCircle,
  XCircle,
  Clock,
  Download,
  FileText,
  GraduationCap,
  User,
  Phone,
  MapPin,
  AlertCircle,
  MessageSquare,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { getApiUrl, getApiHeaders } from '../utils/apiConfig';
import { handleFetchError } from '../utils/errorHandler';

interface AdminStudentProfileManagerProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'ছাত্র প্রোফাইল ম্যানেজমেন্ট',
    subtitle: 'ছাত্রদের প্রোফাইল যাচাই এবং অনুমোদন করুন',
    
    tabs: {
      pending: 'পর্যালোচনাধীন',
      approved: 'অনুমোদিত',
      needsUpdate: 'আপডেট প্রয়োজন',
      all: 'সব',
    },
    
    table: {
      studentName: 'ছাত্রের নাম',
      class: 'শ্রেণী',
      school: 'স্কুল',
      submittedDate: 'জমা তারিখ',
      status: 'স্ট্যাটাস',
      actions: 'অ্যাকশন',
    },
    
    status: {
      pending_approval: 'পর্যালোচনাধীন',
      approved: 'অনুমোদিত',
      needs_update: 'আপডেট প্রয়োজন',
      incomplete: 'অসম্পূর্ণ',
    },
    
    actions: {
      viewDetails: 'বিস্তারিত দেখুন',
      approve: 'অনুমোদন করুন',
      requestUpdate: 'আপডেট চাই',
      refresh: 'রিফ্রেশ',
    },
    
    profileDetails: 'প্রোফাইল বিস্তারিত',
    personalInfo: 'ব্যক্তিগত তথ্য',
    educationalInfo: 'শিক্ষাগত তথ্য',
    familyInfo: 'পারিবারিক তথ্য',
    documents: 'ডকুমেন্ট',
    additionalInfo: 'অতিরিক্ত তথ্য',
    
    // Personal
    fullName: 'পূর্ণ নাম',
    dateOfBirth: 'জন্ম তারিখ',
    gender: 'লিঙ্গ',
    phone: 'মোবাইল',
    email: 'ইমেইল',
    address: 'ঠিকানা',
    district: 'জেলা',
    
    // Educational
    currentClass: 'বর্তমান শ্রেণী',
    school: 'স্কুল/কলেজ',
    rollNumber: 'রোল নম্বর',
    studentId: 'ছাত্র আইডি',
    medium: 'শিক্ষার মাধ্যম',
    version: 'ভার্সন',
    
    // Family
    fatherName: 'পিতার নাম',
    motherName: 'মাতার নাম',
    guardianName: 'অভিভাবকের নাম',
    guardianPhone: 'অভিভাবকের মোবাইল',
    guardianNID: 'অভিভাবকের NID',
    monthlyIncome: 'মাসিক আয়',
    familyMembers: 'পরিবারের সদস্য',
    
    // Documents
    studentIdCard: 'ছাত্র আইডি কার্ড',
    schoolCertificate: 'স্কুল সার্টিফিকেট',
    birthCertificate: 'জন্ম নিবন্ধন',
    guardianNIDCopy: 'অভিভাবকের NID কপি',
    studentPhoto: 'ছাত্রের ছবি',
    familyPhoto: 'পারিবারিক ছবি',
    
    // Additional
    whyNeedHelp: 'কেন সাহায্য প্রয়োজন',
    educationalGoals: 'শিক্ষা লক্ষ্য',
    specialCircumstances: 'বিশেষ পরিস্থিতি',
    
    // Admin actions
    adminComment: 'এডমিন মন্তব্য',
    adminCommentPlaceholder: 'ছাত্রের জন্য মন্তব্য বা নির্দেশনা লিখুন...',
    approveProfile: 'প্রোফাইল অনুমোদন করুন',
    requestChanges: 'পরিবর্তন চাই',
    approving: 'অনুমোদন হচ্ছে...',
    requesting: 'পাঠানো হচ্ছে...',
    
    messages: {
      successApproved: 'প্রোফাইল সফলভাবে অনুমোদিত হয়েছে',
      successRequested: 'আপডেট অনুরোধ পাঠানো হয়েছে',
      errorApproving: 'অনুমোদন করতে সমস্যা হয়েছে',
      errorRequesting: 'অনুরোধ পাঠাতে সমস্যা হয়েছে',
      loadError: 'প্রোফাইল লোড করতে সমস্যা হয়েছে',
      addComment: 'মন্তব্য যোগ করুন',
    },
    
    noProfiles: 'কোন প্রোফাইল নেই',
    loadingProfiles: 'প্রোফাইল লোড হচ্ছে...',
  },
  en: {
    title: 'Student Profile Management',
    subtitle: 'Review and approve student profiles',
    
    tabs: {
      pending: 'Pending Review',
      approved: 'Approved',
      needsUpdate: 'Needs Update',
      all: 'All',
    },
    
    table: {
      studentName: 'Student Name',
      class: 'Class',
      school: 'School',
      submittedDate: 'Submitted Date',
      status: 'Status',
      actions: 'Actions',
    },
    
    status: {
      pending_approval: 'Pending Review',
      approved: 'Approved',
      needs_update: 'Needs Update',
      incomplete: 'Incomplete',
    },
    
    actions: {
      viewDetails: 'View Details',
      approve: 'Approve',
      requestUpdate: 'Request Update',
      refresh: 'Refresh',
    },
    
    profileDetails: 'Profile Details',
    personalInfo: 'Personal Information',
    educationalInfo: 'Educational Information',
    familyInfo: 'Family Information',
    documents: 'Documents',
    additionalInfo: 'Additional Information',
    
    fullName: 'Full Name',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    phone: 'Mobile',
    email: 'Email',
    address: 'Address',
    district: 'District',
    
    currentClass: 'Current Class',
    school: 'School/College',
    rollNumber: 'Roll Number',
    studentId: 'Student ID',
    medium: 'Medium',
    version: 'Version',
    
    fatherName: "Father's Name",
    motherName: "Mother's Name",
    guardianName: "Guardian's Name",
    guardianPhone: "Guardian's Mobile",
    guardianNID: "Guardian's NID",
    monthlyIncome: 'Monthly Income',
    familyMembers: 'Family Members',
    
    studentIdCard: 'Student ID Card',
    schoolCertificate: 'School Certificate',
    birthCertificate: 'Birth Certificate',
    guardianNIDCopy: "Guardian's NID Copy",
    studentPhoto: 'Student Photo',
    familyPhoto: 'Family Photo',
    
    whyNeedHelp: 'Why Need Help',
    educationalGoals: 'Educational Goals',
    specialCircumstances: 'Special Circumstances',
    
    adminComment: 'Admin Comment',
    adminCommentPlaceholder: 'Write comments or instructions for student...',
    approveProfile: 'Approve Profile',
    requestChanges: 'Request Changes',
    approving: 'Approving...',
    requesting: 'Requesting...',
    
    messages: {
      successApproved: 'Profile approved successfully',
      successRequested: 'Update request sent',
      errorApproving: 'Error approving profile',
      errorRequesting: 'Error sending request',
      loadError: 'Error loading profiles',
      addComment: 'Add comment',
    },
    
    noProfiles: 'No profiles found',
    loadingProfiles: 'Loading profiles...',
  }
};

export function AdminStudentProfileManager({ language }: AdminStudentProfileManagerProps) {
  const t = content[language];
  
  const [profiles, setProfiles] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState<any>(null);
  const [showProfileDialog, setShowProfileDialog] = useState(false);
  const [activeTab, setActiveTab] = useState('pending');
  const [adminComment, setAdminComment] = useState('');
  const [isApproving, setIsApproving] = useState(false);
  const [isRequesting, setIsRequesting] = useState(false);
  
  const loadProfiles = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(
        getApiUrl('student-profiles'),
        {
          headers: getApiHeaders(),
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setProfiles(data.profiles || []);
        
        // Show warning if database not initialized
        if (data.warning) {
          console.warn(data.warning);
        }
      } else {
        const errorData = await response.json().catch(() => ({}));
        if (errorData.warning) {
          console.warn('Database not initialized:', errorData.warning);
          setProfiles([]); // Set empty array
        } else {
          toast.error(t.messages.loadError);
        }
      }
    } catch (error) {
      // Silent fail with proper error handling
      setProfiles([]);
      handleFetchError(error, 'Student profiles loading');
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadProfiles();
  }, []);
  
  const handleApproveProfile = async () => {
    if (!selectedProfile) return;
    
    setIsApproving(true);
    
    try {
      const response = await fetch(
        getApiUrl(`student-profile/${selectedProfile.studentId}/status`),
        {
          method: 'PUT',
          headers: getApiHeaders(),
          body: JSON.stringify({
            status: 'approved',
            adminNotes: adminComment,
            reviewedBy: 'admin',
          }),
        }
      );
      
      if (response.ok) {
        // Send approval notification
        try {
          await fetch(
            getApiUrl(`student-profile/${selectedProfile.studentId}/notify-approval`),
            {
              method: 'POST',
              headers: getApiHeaders(),
              body: JSON.stringify({
                adminNotes: adminComment,
              }),
            }
          );
        } catch (notifyError) {
          console.error('Notification error:', notifyError);
          // Don't fail if notification fails
        }
        
        toast.success(t.messages.successApproved);
        setShowProfileDialog(false);
        setAdminComment('');
        loadProfiles();
      } else {
        throw new Error('Approval failed');
      }
    } catch (error) {
      console.error('Approve profile error:', error);
      toast.error(t.messages.errorApproving);
    } finally {
      setIsApproving(false);
    }
  };
  
  const handleRequestUpdate = async () => {
    if (!selectedProfile || !adminComment) {
      toast.error(t.messages.addComment);
      return;
    }
    
    setIsRequesting(true);
    
    try {
      const response = await fetch(
        getApiUrl(`student-profile/${selectedProfile.studentId}/status`),
        {
          method: 'PUT',
          headers: getApiHeaders(),
          body: JSON.stringify({
            status: 'needs_update',
            adminNotes: adminComment,
            reviewedBy: 'admin',
          }),
        }
      );
      
      if (response.ok) {
        // Send update notification
        try {
          await fetch(
            getApiUrl(`student-profile/${selectedProfile.studentId}/notify-update-needed`),
            {
              method: 'POST',
              headers: getApiHeaders(),
              body: JSON.stringify({
                adminNotes: adminComment,
              }),
            }
          );
        } catch (notifyError) {
          console.error('Notification error:', notifyError);
          // Don't fail if notification fails
        }
        
        toast.success(t.messages.successRequested);
        setShowProfileDialog(false);
        setAdminComment('');
        loadProfiles();
      } else {
        throw new Error('Request failed');
      }
    } catch (error) {
      console.error('Request update error:', error);
      toast.error(t.messages.errorRequesting);
    } finally {
      setIsRequesting(false);
    }
  };
  
  const filteredProfiles = profiles.filter(profile => {
    if (activeTab === 'all') return true;
    if (activeTab === 'pending') return profile.status === 'pending_approval';
    if (activeTab === 'approved') return profile.status === 'approved';
    if (activeTab === 'needsUpdate') return profile.status === 'needs_update';
    return true;
  });
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending_approval':
        return <Badge className="bg-blue-500">{t.status.pending_approval}</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">{t.status.approved}</Badge>;
      case 'needs_update':
        return <Badge className="bg-orange-500">{t.status.needs_update}</Badge>;
      default:
        return <Badge className="bg-gray-500">{t.status.incomplete}</Badge>;
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>
        <Button onClick={loadProfiles} disabled={isLoading}>
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {t.actions.refresh}
        </Button>
      </div>
      
      {/* Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="pending">
            {t.tabs.pending}
            {profiles.filter(p => p.status === 'pending_approval').length > 0 && (
              <Badge className="ml-2 bg-blue-500">
                {profiles.filter(p => p.status === 'pending_approval').length}
              </Badge>
            )}
          </TabsTrigger>
          <TabsTrigger value="approved">{t.tabs.approved}</TabsTrigger>
          <TabsTrigger value="needsUpdate">{t.tabs.needsUpdate}</TabsTrigger>
          <TabsTrigger value="all">{t.tabs.all}</TabsTrigger>
        </TabsList>
        
        <TabsContent value={activeTab} className="mt-6">
          <Card>
            {isLoading ? (
              <div className="p-12 text-center text-gray-500">
                <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3" />
                {t.loadingProfiles}
              </div>
            ) : filteredProfiles.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                <User className="w-12 h-12 mx-auto mb-3 text-gray-400" />
                <p>{t.noProfiles}</p>
              </div>
            ) : (
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>{t.table.studentName}</TableHead>
                    <TableHead>{t.table.class}</TableHead>
                    <TableHead>{t.table.school}</TableHead>
                    <TableHead>{t.table.submittedDate}</TableHead>
                    <TableHead>{t.table.status}</TableHead>
                    <TableHead>{t.table.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredProfiles.map((profile) => (
                    <TableRow key={profile.id}>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                            <GraduationCap className="w-5 h-5 text-white" />
                          </div>
                          <div>
                            <div className="font-medium">{profile.formData?.fullName || 'N/A'}</div>
                            <div className="text-sm text-gray-500">{profile.formData?.phone || 'N/A'}</div>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{profile.formData?.currentClass || 'N/A'}</TableCell>
                      <TableCell>{profile.formData?.school || 'N/A'}</TableCell>
                      <TableCell>
                        {profile.submittedAt 
                          ? new Date(profile.submittedAt).toLocaleDateString('bn-BD')
                          : 'N/A'}
                      </TableCell>
                      <TableCell>{getStatusBadge(profile.status)}</TableCell>
                      <TableCell>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedProfile(profile);
                            setShowProfileDialog(true);
                          }}
                        >
                          <Eye className="w-4 h-4 mr-1" />
                          {t.actions.viewDetails}
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            )}
          </Card>
        </TabsContent>
      </Tabs>
      
      {/* Profile Details Dialog */}
      <Dialog open={showProfileDialog} onOpenChange={setShowProfileDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center justify-between">
              <span>{t.profileDetails}</span>
              {selectedProfile && getStatusBadge(selectedProfile.status)}
            </DialogTitle>
          </DialogHeader>
          
          {selectedProfile && (
            <div className="space-y-6 mt-4">
              {/* Personal Info */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-blue-600" />
                  {t.personalInfo}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">{t.fullName}</Label>
                    <p className="font-medium">{selectedProfile.formData?.fullName || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.dateOfBirth}</Label>
                    <p className="font-medium">{selectedProfile.formData?.dateOfBirth || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.gender}</Label>
                    <p className="font-medium">{selectedProfile.formData?.gender || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.phone}</Label>
                    <p className="font-medium">{selectedProfile.formData?.phone || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.district}</Label>
                    <p className="font-medium">{selectedProfile.formData?.district || 'N/A'}</p>
                  </div>
                  <div className="md:col-span-2">
                    <Label className="text-gray-600">{t.address}</Label>
                    <p className="font-medium">{selectedProfile.formData?.address || 'N/A'}</p>
                  </div>
                </div>
              </Card>
              
              {/* Educational Info */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5 text-purple-600" />
                  {t.educationalInfo}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">{t.currentClass}</Label>
                    <p className="font-medium">{selectedProfile.formData?.currentClass || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.school}</Label>
                    <p className="font-medium">{selectedProfile.formData?.school || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.rollNumber}</Label>
                    <p className="font-medium">{selectedProfile.formData?.rollNumber || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.medium}</Label>
                    <p className="font-medium">{selectedProfile.formData?.medium || 'N/A'}</p>
                  </div>
                </div>
              </Card>
              
              {/* Family Info */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5 text-teal-600" />
                  {t.familyInfo}
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label className="text-gray-600">{t.fatherName}</Label>
                    <p className="font-medium">{selectedProfile.formData?.fatherName || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.motherName}</Label>
                    <p className="font-medium">{selectedProfile.formData?.motherName || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.guardianName}</Label>
                    <p className="font-medium">{selectedProfile.formData?.guardianName || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.guardianPhone}</Label>
                    <p className="font-medium">{selectedProfile.formData?.guardianPhone || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.guardianNID}</Label>
                    <p className="font-medium">{selectedProfile.formData?.guardianNID || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-gray-600">{t.monthlyIncome}</Label>
                    <p className="font-medium">
                      {selectedProfile.formData?.monthlyIncome 
                        ? `৳ ${selectedProfile.formData.monthlyIncome}`
                        : 'N/A'}
                    </p>
                  </div>
                </div>
              </Card>
              
              {/* Documents */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                  <FileText className="w-5 h-5 text-orange-600" />
                  {t.documents}
                </h3>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(selectedProfile.documents || {}).map(([key, value]) => {
                    if (!value) return null;
                    return (
                      <div key={key} className="relative aspect-video rounded-lg overflow-hidden border-2 border-gray-200">
                        {(value as string).startsWith('data:image') ? (
                          <img src={value as string} alt={key} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <FileText className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white p-1 text-xs text-center">
                          {key}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Card>
              
              {/* Additional Info */}
              <Card className="p-6">
                <h3 className="text-lg font-semibold mb-4">{t.additionalInfo}</h3>
                <div className="space-y-4">
                  <div>
                    <Label className="text-gray-600">{t.whyNeedHelp}</Label>
                    <p className="mt-1">{selectedProfile.formData?.whyNeedHelp || 'N/A'}</p>
                  </div>
                  {selectedProfile.formData?.educationalGoals && (
                    <div>
                      <Label className="text-gray-600">{t.educationalGoals}</Label>
                      <p className="mt-1">{selectedProfile.formData.educationalGoals}</p>
                    </div>
                  )}
                </div>
              </Card>
              
              {/* Admin Actions */}
              {selectedProfile.status === 'pending_approval' && (
                <Card className="p-6 bg-blue-50 border-blue-200">
                  <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                    <MessageSquare className="w-5 h-5" />
                    {t.adminComment}
                  </h3>
                  <Textarea
                    value={adminComment}
                    onChange={(e) => setAdminComment(e.target.value)}
                    placeholder={t.adminCommentPlaceholder}
                    rows={4}
                    className="mb-4"
                  />
                  <div className="flex gap-3">
                    <Button
                      onClick={handleApproveProfile}
                      disabled={isApproving || isRequesting}
                      className="flex-1 bg-green-600 hover:bg-green-700"
                    >
                      <CheckCircle className="w-4 h-4 mr-2" />
                      {isApproving ? t.approving : t.approveProfile}
                    </Button>
                    <Button
                      onClick={handleRequestUpdate}
                      disabled={isApproving || isRequesting}
                      variant="outline"
                      className="flex-1"
                    >
                      <AlertCircle className="w-4 h-4 mr-2" />
                      {isRequesting ? t.requesting : t.requestChanges}
                    </Button>
                  </div>
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
