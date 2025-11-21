import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
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
  DollarSign,
  Users,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AdminStudentApplicationManagerProps {
  language: 'bn' | 'en';
}

export function AdminStudentApplicationManager({ language }: AdminStudentApplicationManagerProps) {
  const [applications, setApplications] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedApp, setSelectedApp] = useState<any>(null);
  const [showAppDialog, setShowAppDialog] = useState(false);
  const [statusFilter, setStatusFilter] = useState('all');
  const [adminComment, setAdminComment] = useState('');
  const [assignedTeacher, setAssignedTeacher] = useState({ id: '', name: '' });

  const loadApplications = async () => {
    try {
      setIsLoading(true);
      
      // Fetch both pending and approved applications
      const [pendingRes, approvedRes] = await Promise.all([
        fetch(
          `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/applications/pending`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        ),
        fetch(
          `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/applications/approved`,
          {
            headers: {
              'Authorization': `Bearer ${publicAnonKey}`,
            },
          }
        )
      ]);

      const [pendingData, approvedData] = await Promise.all([
        pendingRes.json(),
        approvedRes.json()
      ]);

      const allApplications = [
        ...(pendingData.success ? pendingData.applications : []),
        ...(approvedData.success ? approvedData.applications : [])
      ];

      setApplications(allApplications);
    } catch (error) {
      console.error('Load applications error:', error);
      toast.error('আবেদন লোড করতে সমস্যা হয়েছে');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadApplications();
  }, []);

  const handleViewApplication = (app: any) => {
    // Directly use the application data from the list
    setSelectedApp(app);
    setShowAppDialog(true);
    setAdminComment(app.adminNotes || '');
    setAssignedTeacher({ id: '', name: '' });
  };

  const handleUpdateStatus = async (status: 'approved' | 'rejected') => {
    if (!selectedApp) return;

    try {
      // Determine routing based on application type
      let routingInfo = {
        dashboards: [] as string[],
        notifications: [] as string[],
        message: '',
      };
      
      if (status === 'approved') {
        if (selectedApp.applicationType === 'scholarship') {
          routingInfo = {
            dashboards: ['zakat_donor'],
            notifications: ['all_zakat_donors'],
            message: 'নতুন বৃত্তি আবেদন পাওয়া গেছে',
          };
        } else if (selectedApp.applicationType === 'materials') {
          routingInfo = {
            dashboards: ['materials_donor', 'zakat_donor'],
            notifications: ['materials_donors', 'zakat_donors'],
            message: 'ছাত্রের বই ও উপকরণ প্রয়োজন',
          };
        } else if (selectedApp.applicationType === 'tuition') {
          routingInfo = {
            dashboards: ['admin'],
            notifications: ['admin'],
            message: 'উপযুক্ত শিক্ষক খুঁজে বের করুন',
          };
        }
      }
      
      // Use the correct endpoint based on status
      const endpoint = status === 'approved' 
        ? `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/application/${selectedApp.id}/approve`
        : `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/application/${selectedApp.id}/reject`;
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          adminNotes: adminComment,
          assignedTeacherId: assignedTeacher.id || null,
          assignedTeacherName: assignedTeacher.name || null,
          routingInfo: status === 'approved' ? routingInfo : null,
        }),
      });

      const data = await response.json();
      if (data.success) {
        if (status === 'approved') {
          // Show success with routing info
          let successMessage = 'আবেদন অনুমোদন করা হয়েছে! ';
          if (selectedApp.applicationType === 'scholarship') {
            successMessage += '✅ যাকাত দাতাদের কাছে পাঠানো হয়েছে';
          } else if (selectedApp.applicationType === 'materials') {
            successMessage += '✅ উপকরণ দাতা ও যাকাত দাতাদের কাছে পাঠানো হয়েছে';
          } else {
            successMessage += '✅ এডমিন ড্যাশবোর্ডে যোগ করা হয়েছে';
          }
          toast.success(successMessage);
        } else {
          toast.success('আবেদন প্রত্যাখ্যান করা হয়েছে');
        }
        setShowAppDialog(false);
        setSelectedApp(null);
        setAdminComment('');
        loadApplications();
      } else {
        toast.error(data.error || 'স্ট্যাটাস আপডেট করতে ব্যর্থ');
      }
    } catch (error) {
      console.error('Update status error:', error);
      toast.error('একটি ত্রুটি ঘটেছে');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('bn-BD', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const filteredApplications = applications.filter(app => {
    if (statusFilter === 'all') return true;
    return app.status === statusFilter;
  });

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">ছাত্র আবেদন ম্যানেজমেন্ট</h2>
        <div className="flex gap-2">
          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="স্ট্যাটাস ফিল্টার" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">সব আবেদন</SelectItem>
              <SelectItem value="pending">পেন্ডিং</SelectItem>
              <SelectItem value="approved">অনুমোদিত</SelectItem>
              <SelectItem value="rejected">প্রত্যাখ্যাত</SelectItem>
            </SelectContent>
          </Select>
          <Button onClick={loadApplications} variant="outline">
            <RefreshCw className="w-4 h-4 mr-2" />
            রিফ্রেশ
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-teal-500 rounded-lg flex items-center justify-center">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{applications.length}</p>
              <p className="text-sm text-gray-600">মোট আবেদন</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
              <Clock className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{applications.filter(a => a.status === 'pending').length}</p>
              <p className="text-sm text-gray-600">পেন্ডিং</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{applications.filter(a => a.status === 'approved').length}</p>
              <p className="text-sm text-gray-600">অনুমোদিত</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-red-500 rounded-lg flex items-center justify-center">
              <XCircle className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-2xl font-bold">{applications.filter(a => a.status === 'rejected').length}</p>
              <p className="text-sm text-gray-600">প্রত্যাখ্যাত</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Applications Table */}
      <Card>
        {isLoading ? (
          <div className="p-12 text-center">
            <div className="w-8 h-8 border-4 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
            <p className="text-gray-600">আবেদন লোড হচ্ছে...</p>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>আবেদনের তারিখ</TableHead>
                <TableHead>ছাত্রের নাম</TableHead>
                <TableHead>ক্লাস</TableHead>
                <TableHead>আবেদনের ধরন</TableHead>
                <TableHead>প্রয়োজনীয় পরিমাণ</TableHead>
                <TableHead>স্ট্যাটাস</TableHead>
                <TableHead>অ্যাকশন</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredApplications.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-gray-500">
                    কোনো আবেদন পাওয়া যায়নি
                  </TableCell>
                </TableRow>
              ) : (
                filteredApplications.map((app) => (
                  <TableRow key={app.id}>
                    <TableCell className="text-sm">{formatDate(app.submittedDate || app.appliedDate)}</TableCell>
                    <TableCell className="font-medium">{app.studentName}</TableCell>
                    <TableCell>{app.class || 'N/A'}</TableCell>
                    <TableCell>
                      <Badge variant="outline">
                        {app.applicationType === 'scholarship' ? '💰 বৃত্তি' :
                         app.applicationType === 'materials' ? '📚 বই ও উপকরণ' :
                         app.applicationType === 'tuition' ? '🎓 টিউশন' :
                         app.applicationType}
                      </Badge>
                    </TableCell>
                    <TableCell className="font-semibold">
                      {app.amount ? `৳${app.amount.toLocaleString()}` : 
                       app.itemsNeeded ? app.itemsNeeded : 'N/A'}
                    </TableCell>
                    <TableCell>
                      <Badge 
                        className={
                          app.status === 'approved' ? 'bg-green-600' :
                          app.status === 'pending' ? 'bg-orange-500' :
                          'bg-red-600'
                        }
                      >
                        {app.status === 'approved' ? 'অনুমোদিত' :
                         app.status === 'pending' ? 'পেন্ডিং' : 'প্রত্যাখ্যাত'}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => handleViewApplication(app)}
                      >
                        <Eye className="w-4 h-4 mr-1" />
                        বিস্তারিত
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </Card>

      {/* Application Details Dialog */}
      <Dialog open={showAppDialog} onOpenChange={setShowAppDialog}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>আবেদনের বিস্তারিত তথ্য</DialogTitle>
            <DialogDescription>
              আবেদনকারী: {selectedApp?.studentName}
            </DialogDescription>
          </DialogHeader>

          {selectedApp && (
            <div className="space-y-6">
              {/* Student Information */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <GraduationCap className="w-5 h-5" />
                  ছাত্র তথ্য
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500">ছাত্রের নাম</Label>
                    <p className="font-medium">{selectedApp.studentName}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">ক্লাস</Label>
                    <p className="font-medium">{selectedApp.class || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">স্কুল/কলেজ</Label>
                    <p className="font-medium">{selectedApp.school || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">আবেদনের ধরন</Label>
                    <Badge>{selectedApp.applicationType}</Badge>
                  </div>
                </div>
              </Card>

              {/* Guardian Information */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <User className="w-5 h-5" />
                  অভিভাবক তথ্য
                </h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500">অভিভাবকের নাম</Label>
                    <p className="font-medium">{selectedApp.guardianName || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">মোবাইল</Label>
                    <p className="font-medium flex items-center gap-1">
                      <Phone className="w-3 h-3" />
                      {selectedApp.phone || 'N/A'}
                    </p>
                  </div>
                  <div className="col-span-2">
                    <Label className="text-xs text-gray-500">ঠিকানা</Label>
                    <p className="font-medium flex items-center gap-1">
                      <MapPin className="w-3 h-3" />
                      {selectedApp.address || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">NID নম্বর</Label>
                    <p className="font-medium">{selectedApp.nidNumber || 'N/A'}</p>
                  </div>
                </div>
              </Card>

              {/* Financial Information */}
              <Card className="p-6">
                <h3 className="font-semibold mb-4 flex items-center gap-2">
                  <DollarSign className="w-5 h-5" />
                  আর্থিক তথ্য
                </h3>
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <Label className="text-xs text-gray-500">মাসিক আয়</Label>
                    <p className="font-medium">৳{selectedApp.monthlyIncome?.toLocaleString() || 'N/A'}</p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">পরিবারের সদস্য</Label>
                    <p className="font-medium flex items-center gap-1">
                      <Users className="w-3 h-3" />
                      {selectedApp.familyMembers || 'N/A'}
                    </p>
                  </div>
                  <div>
                    <Label className="text-xs text-gray-500">প্রয়োজনীয় পরিমাণ</Label>
                    <p className="font-medium text-green-600">
                      ৳{selectedApp.amountNeeded?.toLocaleString() || 'N/A'}
                    </p>
                  </div>
                </div>
              </Card>

              {/* Reason */}
              <Card className="p-6">
                <h3 className="font-semibold mb-2">সাহায্যের কারণ</h3>
                <p className="text-gray-700">{selectedApp.reason}</p>
              </Card>

              {/* Documents */}
              {selectedApp.documents && selectedApp.documents.length > 0 && (
                <Card className="p-6">
                  <h3 className="font-semibold mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5" />
                    ডকুমেন্ট
                  </h3>
                  <div className="space-y-2">
                    {selectedApp.documents.map((doc: string, index: number) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <span className="text-sm">{doc}</span>
                        <Button size="sm" variant="outline">
                          <Download className="w-4 h-4 mr-1" />
                          ডাউনলোড
                        </Button>
                      </div>
                    ))}
                  </div>
                </Card>
              )}

              {/* Admin Actions */}
              {selectedApp.status === 'pending' && (
                <Card className="p-6 bg-gradient-to-br from-blue-50 to-teal-50 border-2 border-blue-200">
                  <h3 className="font-semibold mb-4">Admin অ্যাকশন</h3>
                  
                  <div className="space-y-4">
                    <div>
                      <Label>মন্তব্য / নোট *</Label>
                      <Textarea
                        value={adminComment}
                        onChange={(e) => setAdminComment(e.target.value)}
                        placeholder="আবেদন সম্পর্কে আপনার মন্তব্য লিখুন..."
                        rows={3}
                        className="bg-white"
                      />
                    </div>

                    {selectedApp.applicationType === 'টিউশন সহায়তা' && (
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label>শিক্ষক নিয়োগ (ঐচ্ছিক)</Label>
                          <Input
                            value={assignedTeacher.name}
                            onChange={(e) => setAssignedTeacher({ ...assignedTeacher, name: e.target.value })}
                            placeholder="শিক্ষকের নাম"
                            className="bg-white"
                          />
                        </div>
                        <div>
                          <Label>শিক্ষক ID (ঐচ্ছিক)</Label>
                          <Input
                            value={assignedTeacher.id}
                            onChange={(e) => setAssignedTeacher({ ...assignedTeacher, id: e.target.value })}
                            placeholder="teacher-xxx"
                            className="bg-white"
                          />
                        </div>
                      </div>
                    )}

                    <div className="flex gap-3 pt-4">
                      <Button
                        onClick={() => handleUpdateStatus('approved')}
                        className="flex-1 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        অনুমোদন করুন
                      </Button>
                      <Button
                        onClick={() => handleUpdateStatus('rejected')}
                        variant="destructive"
                        className="flex-1"
                      >
                        <XCircle className="w-4 h-4 mr-2" />
                        প্রত্যাখ্যান করুন
                      </Button>
                    </div>
                  </div>
                </Card>
              )}

              {/* If already reviewed */}
              {selectedApp.status !== 'pending' && (
                <Card className={`p-6 ${selectedApp.status === 'approved' ? 'bg-green-50 border-green-200' : 'bg-red-50 border-red-200'}`}>
                  <h3 className="font-semibold mb-2">আবেদনের ফলাফল</h3>
                  <Badge className={selectedApp.status === 'approved' ? 'bg-green-600 mb-3' : 'bg-red-600 mb-3'}>
                    {selectedApp.status === 'approved' ? '✓ অনুমোদিত' : '✗ প্রত্যাখ্যাত'}
                  </Badge>
                  
                  {selectedApp.adminComment && (
                    <div className="mt-3">
                      <Label className="text-xs">Admin মন্তব্য:</Label>
                      <p className="text-sm text-gray-700 mt-1">{selectedApp.adminComment}</p>
                    </div>
                  )}
                  
                  {selectedApp.assignedTeacherName && (
                    <div className="mt-3">
                      <Label className="text-xs">নিয়োগকৃত শিক্ষক:</Label>
                      <p className="text-sm font-medium mt-1">{selectedApp.assignedTeacherName}</p>
                    </div>
                  )}
                  
                  {selectedApp.reviewedAt && (
                    <div className="mt-3 text-xs text-gray-500">
                      পর্যালোচনা: {formatDate(selectedApp.reviewedAt)}
                    </div>
                  )}
                </Card>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
