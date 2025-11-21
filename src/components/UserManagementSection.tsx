import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Search, Filter, CheckCircle, XCircle, Edit, Trash2, CreditCard,
  Mail, Phone, User, Users, Award, Clock, MapPin, Calendar, DollarSign,
  Shield, Ban, Unlock, Eye, MoreVertical, Download, RefreshCw, Wallet
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface UserManagementSectionProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'ব্যবহারকারী ব্যবস্থাপনা',
    search: 'খুঁজুন',
    searchPlaceholder: 'ফোন, ইমেইল বা নাম দিয়ে খুঁজুন...',
    filterByType: 'ধরন অনুসারে ফিল্টার',
    allUsers: 'সব',
    teachers: 'শিক্ষক',
    guardians: 'অভিভাবক',
    students: 'ছাত্র',
    donors: 'দাতা',
    refresh: 'রিফ্রেশ',
    bulkActions: 'বাল্ক অ্যাকশন',
    verify: 'ভেরিফাই',
    delete: 'মুছুন',
    selected: 'নির্বাচিত',
    name: 'নাম',
    contact: 'যোগাযোগ',
    type: 'ধরন',
    credits: 'ক্রেডিট',
    status: 'স্ট্যাটাস',
    actions: 'অ্যাকশন',
    verified: 'ভেরিফাইড',
    pending: 'পেন্ডিং',
    notVerified: 'ভেরিফাইড নয়',
    edit: 'এডিট',
    allocateCredits: 'ক্রেডিট বরাদ্দ',
    viewDetails: 'বিস্তারিত',
    editUser: 'ইউজার এডিট',
    creditAllocation: 'ক্রেডিট বরাদ্দ',
    verifyUser: 'ইউজার ভেরিফাই',
    deleteUser: 'ইউজার মুছুন',
    email: 'ইমেইল',
    phone: 'ফোন',
    location: 'ঠিকানা',
    joinDate: 'যোগদান',
    save: 'সংরক্ষণ',
    cancel: 'বাতিল',
    amount: 'পরিমাণ',
    reason: 'কারণ',
    allocate: 'বরাদ্দ করুন',
    verificationNotes: 'ভেরিফিকেশন নোট',
    verifyAction: 'ভেরিফাই করুন',
    rejectAction: 'প্রত্যাখ্যান',
    deleteConfirm: 'আপনি কি নিশ্চিত এই ইউজার মুছতে চান?',
    yes: 'হ্যাঁ',
    no: 'না',
    loading: 'লোড হচ্ছে...',
    noResults: 'কোন ফলাফল নেই',
    documentsNotSufficient: 'ডকুমেন্ট যথেষ্ট নয়',
    adminAllocation: 'অ্যাডমিন বরাদ্দ',
  },
  en: {
    title: 'User Management',
    search: 'Search',
    searchPlaceholder: 'Search by phone, email or name...',
    filterByType: 'Filter by Type',
    allUsers: 'All',
    teachers: 'Teachers',
    guardians: 'Guardians',
    students: 'Students',
    donors: 'Donors',
    refresh: 'Refresh',
    bulkActions: 'Bulk Actions',
    verify: 'Verify',
    delete: 'Delete',
    selected: 'Selected',
    name: 'Name',
    contact: 'Contact',
    type: 'Type',
    credits: 'Credits',
    status: 'Status',
    actions: 'Actions',
    verified: 'Verified',
    pending: 'Pending',
    notVerified: 'Not Verified',
    edit: 'Edit',
    allocateCredits: 'Allocate Credits',
    viewDetails: 'View Details',
    editUser: 'Edit User',
    creditAllocation: 'Credit Allocation',
    verifyUser: 'Verify User',
    deleteUser: 'Delete User',
    email: 'Email',
    phone: 'Phone',
    location: 'Location',
    joinDate: 'Join Date',
    save: 'Save',
    cancel: 'Cancel',
    amount: 'Amount',
    reason: 'Reason',
    allocate: 'Allocate',
    verificationNotes: 'Verification Notes',
    verifyAction: 'Verify',
    rejectAction: 'Reject',
    deleteConfirm: 'Are you sure you want to delete this user?',
    yes: 'Yes',
    no: 'No',
    loading: 'Loading...',
    noResults: 'No results found',
    documentsNotSufficient: 'Documents not sufficient',
    adminAllocation: 'Admin Allocation',
  }
};

export function UserManagementSection({ language }: UserManagementSectionProps) {
  const t = content[language];
  const [searchQuery, setSearchQuery] = useState('');
  const [userTypeFilter, setUserTypeFilter] = useState('all');
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  
  // Dialogs
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [creditDialogOpen, setCreditDialogOpen] = useState(false);
  const [verifyDialogOpen, setVerifyDialogOpen] = useState(false);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  
  // Form states
  const [editForm, setEditForm] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
  });
  const [creditForm, setCreditForm] = useState({
    amount: 0,
    reason: '',
  });
  const [verifyForm, setVerifyForm] = useState({
    verified: true,
    notes: '',
  });

  const fetchUsers = async () => {
    if (!searchQuery.trim() && userTypeFilter === 'all') {
      // Don't fetch all users without filter for performance
      return;
    }
    
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/users/search`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            query: searchQuery,
            userType: userTypeFilter
          })
        }
      );
      
      const data = await response.json();
      if (data.success) {
        setUsers(data.users || []);
      } else {
        toast.error('ইউজার লোড করতে সমস্যা হয়েছে');
      }
    } catch (error) {
      console.error('Fetch users error:', error);
      toast.error('ইউজার লোড করতে ব্যর্থ হয়েছে');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = () => {
    if (searchQuery.trim() || userTypeFilter !== 'all') {
      fetchUsers();
    } else {
      toast.info('অনুগ্রহ করে search query বা filter নির্বাচন করুন');
    }
  };

  const handleEditUser = async () => {
    if (!selectedUser) return;
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/user/${selectedUser.id}`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify(editForm)
        }
      );
      
      const data = await response.json();
      if (data.success) {
        toast.success('ইউজার আপডেট করা হয়েছে!');
        setEditDialogOpen(false);
        fetchUsers();
      } else {
        toast.error('ইউজার আপডেট করতে ব্যর্থ');
      }
    } catch (error) {
      console.error('Edit user error:', error);
      toast.error('ইউজার আপডেট করতে সমস্যা হয়েছে');
    }
  };

  const handleAllocateCredits = async () => {
    if (!selectedUser || !creditForm.amount) return;
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/user/${selectedUser.id}/credits`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            credits: creditForm.amount,
            reason: creditForm.reason || t.adminAllocation
          })
        }
      );
      
      const data = await response.json();
      if (data.success) {
        toast.success(`${creditForm.amount} ক্রেডিট বরাদ্দ করা হয়েছে!`);
        setCreditDialogOpen(false);
        setCreditForm({ amount: 0, reason: '' });
        fetchUsers();
      } else {
        toast.error('ক্রেডিট বরাদ্দ করতে ব্যর্থ');
      }
    } catch (error) {
      console.error('Allocate credits error:', error);
      toast.error('ক্রেডিট বরাদ্দ করতে সমস্যা হয়েছে');
    }
  };

  const handleVerifyUser = async (verified: boolean) => {
    if (!selectedUser) return;
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/user/${selectedUser.id}/verify`,
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            verified,
            verificationNotes: verifyForm.notes,
            verifiedBy: 'Admin'
          })
        }
      );
      
      const data = await response.json();
      if (data.success) {
        toast.success(verified ? 'ইউজার ভেরিফাই করা হয়েছে!' : 'ইউজার প্রত্যাখ্যান করা হয়েছে!');
        setVerifyDialogOpen(false);
        setVerifyForm({ verified: true, notes: '' });
        fetchUsers();
      } else {
        toast.error('ভেরিফিকেশন আপডেট করতে ব্যর্থ');
      }
    } catch (error) {
      console.error('Verify user error:', error);
      toast.error('ভেরিফিকেশন আপডেট করতে সমস্যা হয়েছে');
    }
  };

  const handleDeleteUser = async () => {
    if (!selectedUser) return;
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/user/${selectedUser.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`
          }
        }
      );
      
      const data = await response.json();
      if (data.success) {
        toast.success('ইউজার মুছে ফেলা হয়েছে!');
        setDeleteDialogOpen(false);
        setSelectedUser(null);
        fetchUsers();
      } else {
        toast.error('ইউজার মুছতে ব্যর্থ');
      }
    } catch (error) {
      console.error('Delete user error:', error);
      toast.error('ইউজার মুছতে সমস্যা হয়েছে');
    }
  };

  const handleBulkAction = async (action: 'verify' | 'delete') => {
    if (selectedUsers.length === 0) {
      toast.error('অনুগ্রহ করে ইউজার নির্বাচন করুন');
      return;
    }
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/users/bulk-action`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`
          },
          body: JSON.stringify({
            action,
            userIds: selectedUsers
          })
        }
      );
      
      const data = await response.json();
      if (data.success) {
        const successCount = data.results.filter((r: any) => r.success).length;
        toast.success(`${successCount} ইউজার ${action === 'verify' ? 'ভেরিফাই' : 'মুছে ফেলা'} হয়েছে!`);
        setSelectedUsers([]);
        fetchUsers();
      } else {
        toast.error('বাল্ক অ্যাকশন ব্যর্থ হয়েছে');
      }
    } catch (error) {
      console.error('Bulk action error:', error);
      toast.error('বাল্ক অ্যাকশন করতে সমস্যা হয়েছে');
    }
  };

  const getUserTypeLabel = (userId: string) => {
    if (userId.startsWith('teacher-')) return t.teachers;
    if (userId.startsWith('guardian-')) return t.guardians;
    if (userId.startsWith('student-')) return t.students;
    if (userId.startsWith('donor-')) return t.donors;
    return '-';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl text-gray-900">{t.title}</h2>
          <p className="text-sm text-gray-500">সব ইউজার সার্চ, ভেরিফাই এবং ম্যানেজ করুন</p>
        </div>
        <Button onClick={fetchUsers} variant="outline">
          <RefreshCw className="w-4 h-4 mr-2" />
          {t.refresh}
        </Button>
      </div>

      {/* Search and Filter */}
      <Card className="p-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="flex gap-2">
              <Input
                placeholder={t.searchPlaceholder}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
                className="flex-1"
              />
              <Button onClick={handleSearch}>
                <Search className="w-4 h-4 mr-2" />
                {t.search}
              </Button>
            </div>
          </div>
          
          <Select value={userTypeFilter} onValueChange={setUserTypeFilter}>
            <SelectTrigger className="w-48">
              <SelectValue placeholder={t.filterByType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allUsers}</SelectItem>
              <SelectItem value="teacher">{t.teachers}</SelectItem>
              <SelectItem value="guardian">{t.guardians}</SelectItem>
              <SelectItem value="student">{t.students}</SelectItem>
              <SelectItem value="donor">{t.donors}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Bulk Actions */}
      {selectedUsers.length > 0 && (
        <Card className="p-4 bg-purple-50 border-purple-200">
          <div className="flex items-center justify-between">
            <p className="text-sm text-gray-700">
              {selectedUsers.length} {t.selected}
            </p>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => handleBulkAction('verify')}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                {t.verify}
              </Button>
              <Button
                size="sm"
                variant="outline"
                className="text-red-600 border-red-300 hover:bg-red-50"
                onClick={() => handleBulkAction('delete')}
              >
                <Trash2 className="w-4 h-4 mr-2" />
                {t.delete}
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Results */}
      <Card>
        <div className="p-6">
          {loading ? (
            <div className="text-center py-12">
              <div className="w-16 h-16 border-4 border-purple-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
              <p className="text-gray-600">{t.loading}</p>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              <Users className="w-16 h-16 mx-auto mb-4 opacity-50" />
              <p>{searchQuery || userTypeFilter !== 'all' ? t.noResults : 'সার্চ করুন অথবা ফিল্টার করুন'}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-12">
                      <Checkbox
                        checked={selectedUsers.length === users.length}
                        onCheckedChange={(checked) => {
                          if (checked) {
                            setSelectedUsers(users.map(u => u.id));
                          } else {
                            setSelectedUsers([]);
                          }
                        }}
                      />
                    </TableHead>
                    <TableHead>{t.name}</TableHead>
                    <TableHead>{t.contact}</TableHead>
                    <TableHead>{t.type}</TableHead>
                    <TableHead>{t.credits}</TableHead>
                    <TableHead>{t.status}</TableHead>
                    <TableHead className="text-right">{t.actions}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell>
                        <Checkbox
                          checked={selectedUsers.includes(user.id)}
                          onCheckedChange={(checked) => {
                            if (checked) {
                              setSelectedUsers([...selectedUsers, user.id]);
                            } else {
                              setSelectedUsers(selectedUsers.filter(id => id !== user.id));
                            }
                          }}
                        />
                      </TableCell>
                      <TableCell>
                        <div>
                          <p className="font-medium text-gray-900">{user.name}</p>
                          <p className="text-xs text-gray-500">{user.location}</p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="text-sm">
                          <p className="flex items-center gap-1">
                            <Mail className="w-3 h-3" />
                            {user.email}
                          </p>
                          <p className="flex items-center gap-1 text-gray-500">
                            <Phone className="w-3 h-3" />
                            {user.phone}
                          </p>
                        </div>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">{getUserTypeLabel(user.id)}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge className="bg-blue-500">{user.credits || 0}</Badge>
                      </TableCell>
                      <TableCell>
                        {user.verified ? (
                          <Badge className="bg-green-500">
                            <CheckCircle className="w-3 h-3 mr-1" />
                            {t.verified}
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="border-orange-500 text-orange-600">
                            <Clock className="w-3 h-3 mr-1" />
                            {t.pending}
                          </Badge>
                        )}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-end gap-1">
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedUser(user);
                              setEditForm({
                                name: user.name,
                                email: user.email,
                                phone: user.phone,
                                location: user.location || '',
                              });
                              setEditDialogOpen(true);
                            }}
                            title={t.edit}
                          >
                            <Edit className="w-4 h-4" />
                          </Button>
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => {
                              setSelectedUser(user);
                              setCreditDialogOpen(true);
                            }}
                            title={t.allocateCredits}
                          >
                            <Wallet className="w-4 h-4" />
                          </Button>
                          
                          {!user.verified && (
                            <Button
                              size="sm"
                              variant="ghost"
                              className="text-green-600"
                              onClick={() => {
                                setSelectedUser(user);
                                setVerifyDialogOpen(true);
                              }}
                              title={t.verify}
                            >
                              <CheckCircle className="w-4 h-4" />
                            </Button>
                          )}
                          
                          <Button
                            size="sm"
                            variant="ghost"
                            className="text-red-600"
                            onClick={() => {
                              setSelectedUser(user);
                              setDeleteDialogOpen(true);
                            }}
                            title={t.delete}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
      </Card>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.editUser}</DialogTitle>
            <DialogDescription>ইউজার তথ্য পরিবর্তন করুন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t.name}</Label>
              <Input
                value={editForm.name}
                onChange={(e) => setEditForm({ ...editForm, name: e.target.value })}
              />
            </div>
            <div>
              <Label>{t.email}</Label>
              <Input
                value={editForm.email}
                onChange={(e) => setEditForm({ ...editForm, email: e.target.value })}
              />
            </div>
            <div>
              <Label>{t.phone}</Label>
              <Input
                value={editForm.phone}
                onChange={(e) => setEditForm({ ...editForm, phone: e.target.value })}
              />
            </div>
            <div>
              <Label>{t.location}</Label>
              <Input
                value={editForm.location}
                onChange={(e) => setEditForm({ ...editForm, location: e.target.value })}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setEditDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleEditUser}>
              {t.save}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Credit Allocation Dialog */}
      <Dialog open={creditDialogOpen} onOpenChange={setCreditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.creditAllocation}</DialogTitle>
            <DialogDescription>ইউজারকে ক্রেডিট দিন বা কেটে নিন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t.amount}</Label>
              <Input
                type="number"
                value={creditForm.amount}
                onChange={(e) => setCreditForm({ ...creditForm, amount: parseInt(e.target.value) || 0 })}
                placeholder="100"
              />
              <p className="text-xs text-gray-500 mt-1">মাইনাস (-) দিয়ে ক্রেডিট কাটা যাবে</p>
            </div>
            <div>
              <Label>{t.reason}</Label>
              <Input
                value={creditForm.reason}
                onChange={(e) => setCreditForm({ ...creditForm, reason: e.target.value })}
                placeholder={t.adminAllocation}
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setCreditDialogOpen(false)}>
              {t.cancel}
            </Button>
            <Button onClick={handleAllocateCredits}>
              {t.allocate}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Verify Dialog */}
      <Dialog open={verifyDialogOpen} onOpenChange={setVerifyDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.verifyUser}</DialogTitle>
            <DialogDescription>ইউজারকে ভেরিফাইড করুন</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <Label>{t.verificationNotes}</Label>
              <Input
                value={verifyForm.notes}
                onChange={(e) => setVerifyForm({ ...verifyForm, notes: e.target.value })}
                placeholder="Documents verified successfully"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              variant="outline"
              className="text-red-600 border-red-300"
              onClick={() => handleVerifyUser(false)}
            >
              {t.rejectAction}
            </Button>
            <Button onClick={() => handleVerifyUser(true)}>
              <CheckCircle className="w-4 h-4 mr-2" />
              {t.verifyAction}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.deleteUser}</DialogTitle>
            <DialogDescription>এই কাজটি ফিরিয়ে আনা যাবে না</DialogDescription>
          </DialogHeader>
          <p className="text-gray-600">{t.deleteConfirm}</p>
          <DialogFooter>
            <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
              {t.no}
            </Button>
            <Button variant="destructive" onClick={handleDeleteUser}>
              {t.yes}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
