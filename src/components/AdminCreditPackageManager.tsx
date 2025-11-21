import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Textarea } from './ui/textarea';
import { 
  Plus, 
  Edit2, 
  Trash2, 
  Save, 
  X, 
  Crown,
  Zap,
  Star,
  Rocket,
  Gift,
  CheckCircle,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { toast } from 'sonner@2.0.3';
import { getAllPackages, initializeDefaultPackages } from '../utils/localStorageCredit';
import type { CreditPackage as CreditPackageType } from '../utils/creditSystem';

interface AdminCreditPackageManagerProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'ক্রেডিট প্যাকেজ ম্যানেজমেন্ট',
    subtitle: 'ক্রেডিট প্যাকেজ তৈরি, সম্পাদনা এবং মুছুন',
    addNewPackage: 'নতুন প্যাকেজ যোগ করুন',
    editPackage: 'প্যাকেজ সম্পাদনা করুন',
    deletePackage: 'প্যাকেজ মুছুন',
    packageName: 'প্যাকেজ নাম',
    credits: 'ক্রেডিট',
    bonusCredits: 'বোনাস ক্রেডিট',
    price: 'মূল্য (৳)',
    userType: 'ইউজার টাইপ',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    popular: 'জনপ্রিয়',
    features: 'ফিচার (প্রতি লাইনে একটি)',
    color: 'রঙ',
    icon: 'আইকন',
    active: 'সক্রিয়',
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল',
    delete: 'মুছুন',
    edit: 'সম্পাদনা',
    teacherPackages: 'শিক্ষক প্যাকেজ',
    guardianPackages: 'অভিভাবক প্যাকেজ',
    totalCredits: 'মোট ক্রেডিট',
    deleteConfirmation: 'আপনি কি নিশ্চিত যে আপনি এই প্যাকেজ মুছতে চান?',
    packageDeleted: 'প্যাকেজ মুছে ফেলা হয়েছে',
    packageSaved: 'প্যাকেজ সংরক্ষিত হয়েছে',
    errorSaving: 'সংরক্ষণে ত্রুটি',
    errorDeleting: 'মুছতে ত্রুটি',
    loading: 'লোড হচ্ছে...',
    noPackages: 'কোনো প্যাকেজ নেই',
    initializeDefaults: 'ডিফল্ট প্যাকেজ তৈরি করুন',
    initializing: 'তৈরি হচ্ছে...',
  },
  en: {
    title: 'Credit Package Management',
    subtitle: 'Create, edit, and delete credit packages',
    addNewPackage: 'Add New Package',
    editPackage: 'Edit Package',
    deletePackage: 'Delete Package',
    packageName: 'Package Name',
    credits: 'Credits',
    bonusCredits: 'Bonus Credits',
    price: 'Price (৳)',
    userType: 'User Type',
    teacher: 'Teacher',
    guardian: 'Guardian',
    popular: 'Popular',
    features: 'Features (one per line)',
    color: 'Color',
    icon: 'Icon',
    active: 'Active',
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    teacherPackages: 'Teacher Packages',
    guardianPackages: 'Guardian Packages',
    totalCredits: 'Total Credits',
    deleteConfirmation: 'Are you sure you want to delete this package?',
    packageDeleted: 'Package deleted',
    packageSaved: 'Package saved',
    errorSaving: 'Error saving',
    errorDeleting: 'Error deleting',
    loading: 'Loading...',
    noPackages: 'No packages',
    initializeDefaults: 'Initialize Default Packages',
    initializing: 'Initializing...',
  },
};

const colorOptions = [
  { value: 'blue', label: 'Blue', class: 'bg-blue-500' },
  { value: 'purple', label: 'Purple', class: 'bg-purple-500' },
  { value: 'green', label: 'Green', class: 'bg-green-500' },
  { value: 'orange', label: 'Orange', class: 'bg-orange-500' },
  { value: 'teal', label: 'Teal', class: 'bg-teal-500' },
];

const iconOptions = [
  { value: 'zap', label: 'Zap', icon: Zap },
  { value: 'crown', label: 'Crown', icon: Crown },
  { value: 'star', label: 'Star', icon: Star },
  { value: 'rocket', label: 'Rocket', icon: Rocket },
  { value: 'gift', label: 'Gift', icon: Gift },
];

export function AdminCreditPackageManager({ language }: AdminCreditPackageManagerProps) {
  const t = content[language];
  
  const [packages, setPackages] = useState<CreditPackageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [editingPackage, setEditingPackage] = useState<CreditPackageType | null>(null);
  const [deletingPackage, setDeletingPackage] = useState<CreditPackageType | null>(null);
  const [saving, setSaving] = useState(false);
  const [initializing, setInitializing] = useState(false);
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    credits: 0,
    bonusCredits: 0,
    price: 0,
    userType: 'teacher' as 'teacher' | 'guardian',
    popular: false,
    features: '',
    color: 'blue',
    icon: 'zap',
    active: true,
  });
  
  useEffect(() => {
    fetchPackages();
  }, []);
  
  const fetchPackages = () => {
    setLoading(true);
    try {
      // Load from localStorage
      const allPackages = getAllPackages();
      setPackages(allPackages as any);
    } catch (error) {
      console.error('Error fetching packages:', error);
      toast.error(t.errorSaving);
    } finally {
      setLoading(false);
    }
  };
  
  const handleInitializeDefaults = () => {
    setInitializing(true);
    try {
      initializeDefaultPackages();
      toast.success(language === 'bn' ? 'ডিফল্ট প্যাকেজ তৈরি হয়েছে' : 'Default packages created');
      fetchPackages();
    } catch (error) {
      console.error('Error initializing packages:', error);
      toast.error(t.errorSaving);
    } finally {
      setInitializing(false);
    }
  };
  
  const handleAddNew = () => {
    setEditingPackage(null);
    setFormData({
      name: '',
      credits: 0,
      bonusCredits: 0,
      price: 0,
      userType: 'teacher',
      popular: false,
      features: '',
      color: 'blue',
      icon: 'zap',
      active: true,
    });
    setShowEditDialog(true);
  };
  
  const handleEdit = (pkg: CreditPackage) => {
    setEditingPackage(pkg);
    setFormData({
      name: pkg.name,
      credits: pkg.credits,
      bonusCredits: pkg.bonusCredits,
      price: pkg.price,
      userType: pkg.userType,
      popular: pkg.popular,
      features: pkg.features.join('\n'),
      color: pkg.color,
      icon: pkg.icon,
      active: pkg.active,
    });
    setShowEditDialog(true);
  };
  
  const handleSave = async () => {
    setSaving(true);
    try {
      const url = editingPackage
        ? `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/credit-packages/${editingPackage.id}`
        : `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/credit-packages/create`;
      
      const method = editingPackage ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          ...formData,
          features: formData.features.split('\n').filter(f => f.trim()),
        }),
      });
      
      if (response.ok) {
        toast.success(t.packageSaved);
        setShowEditDialog(false);
        await fetchPackages();
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error('Error saving package:', error);
      toast.error(t.errorSaving);
    } finally {
      setSaving(false);
    }
  };
  
  const handleDelete = async () => {
    if (!deletingPackage) return;
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/credit-packages/${deletingPackage.id}`,
        {
          method: 'DELETE',
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      if (response.ok) {
        toast.success(t.packageDeleted);
        setShowDeleteDialog(false);
        setDeletingPackage(null);
        await fetchPackages();
      } else {
        throw new Error('Delete failed');
      }
    } catch (error) {
      console.error('Error deleting package:', error);
      toast.error(t.errorDeleting);
    }
  };
  
  const teacherPackages = packages.filter(p => p.userType === 'teacher');
  const guardianPackages = packages.filter(p => p.userType === 'guardian');
  
  const getIconComponent = (iconName: string) => {
    const option = iconOptions.find(o => o.value === iconName);
    return option ? option.icon : Zap;
  };
  
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
        <span className="ml-3 text-gray-600">{t.loading}</span>
      </div>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>
        <div className="flex gap-2">
          {packages.length === 0 && (
            <Button
              onClick={handleInitializeDefaults}
              disabled={initializing}
              variant="outline"
            >
              {initializing ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.initializing}
                </>
              ) : (
                <>
                  <Gift className="w-4 h-4 mr-2" />
                  {t.initializeDefaults}
                </>
              )}
            </Button>
          )}
          <Button onClick={handleAddNew}>
            <Plus className="w-4 h-4 mr-2" />
            {t.addNewPackage}
          </Button>
        </div>
      </div>
      
      {/* Teacher Packages */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          {t.teacherPackages}
          <Badge variant="outline">{teacherPackages.length}</Badge>
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {teacherPackages.map((pkg) => {
            const Icon = getIconComponent(pkg.icon);
            const bonusCredits = pkg.bonus || 0;
            return (
              <Card key={pkg.id} className="p-6 relative">
                {pkg.popular && (
                  <Badge className="absolute top-4 right-4 bg-purple-600">
                    <Crown className="w-3 h-3 mr-1" />
                    {t.popular}
                  </Badge>
                )}
                
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${pkg.color}-500 to-${pkg.color}-600 flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h4>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.credits}:</span>
                    <span className="font-semibold">{pkg.credits}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.bonusCredits}:</span>
                    <span className="font-semibold text-green-600">+{bonusCredits}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="font-semibold">{t.totalCredits}:</span>
                    <span className="font-bold">{pkg.credits + bonusCredits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.price}:</span>
                    <span className="text-xl font-bold text-gray-900">৳{pkg.price}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEdit(pkg)}
                  >
                    <Edit2 className="w-3 h-3 mr-1" />
                    {t.edit}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setDeletingPackage(pkg);
                      setShowDeleteDialog(true);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        
        {teacherPackages.length === 0 && (
          <Card className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">{t.noPackages}</p>
          </Card>
        )}
      </div>
      
      {/* Guardian Packages */}
      <div>
        <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
          {t.guardianPackages}
          <Badge variant="outline">{guardianPackages.length}</Badge>
        </h3>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {guardianPackages.map((pkg) => {
            const Icon = getIconComponent(pkg.icon);
            const bonusCredits = pkg.bonus || 0;
            return (
              <Card key={pkg.id} className="p-6 relative">
                {pkg.popular && (
                  <Badge className="absolute top-4 right-4 bg-purple-600">
                    <Crown className="w-3 h-3 mr-1" />
                    {t.popular}
                  </Badge>
                )}
                
                <div className={`w-12 h-12 rounded-lg bg-gradient-to-br from-${pkg.color}-500 to-${pkg.color}-600 flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                
                <h4 className="text-lg font-bold text-gray-900 mb-2">{pkg.name}</h4>
                
                <div className="space-y-2 mb-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.credits}:</span>
                    <span className="font-semibold">{pkg.credits}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">{t.bonusCredits}:</span>
                    <span className="font-semibold text-green-600">+{bonusCredits}</span>
                  </div>
                  <div className="flex justify-between text-sm border-t pt-2">
                    <span className="font-semibold">{t.totalCredits}:</span>
                    <span className="font-bold">{pkg.credits + bonusCredits}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.price}:</span>
                    <span className="text-xl font-bold text-gray-900">৳{pkg.price}</span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="flex-1"
                    onClick={() => handleEdit(pkg)}
                  >
                    <Edit2 className="w-3 h-3 mr-1" />
                    {t.edit}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-red-600 hover:bg-red-50"
                    onClick={() => {
                      setDeletingPackage(pkg);
                      setShowDeleteDialog(true);
                    }}
                  >
                    <Trash2 className="w-3 h-3" />
                  </Button>
                </div>
              </Card>
            );
          })}
        </div>
        
        {guardianPackages.length === 0 && (
          <Card className="p-12 text-center">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-2" />
            <p className="text-gray-600">{t.noPackages}</p>
          </Card>
        )}
      </div>
      
      {/* Edit/Create Dialog */}
      <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingPackage ? t.editPackage : t.addNewPackage}
            </DialogTitle>
            <DialogDescription>
              {editingPackage 
                ? 'প্যাকেজের তথ্য সম্পাদনা করুন' 
                : 'নতুন ক্রেডিট প্যাকেজ তৈরি করতে নিচের ফর্ম পূরণ করুন'}
            </DialogDescription>
          </DialogHeader>
          
          <div className="space-y-4 py-4">
            <div>
              <Label>{t.packageName}</Label>
              <Input
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="e.g., Premium Package"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label>{t.credits}</Label>
                <Input
                  type="number"
                  value={formData.credits}
                  onChange={(e) => setFormData({ ...formData, credits: parseInt(e.target.value) || 0 })}
                />
              </div>
              <div>
                <Label>{t.bonusCredits}</Label>
                <Input
                  type="number"
                  value={formData.bonusCredits}
                  onChange={(e) => setFormData({ ...formData, bonusCredits: parseInt(e.target.value) || 0 })}
                />
              </div>
            </div>
            
            <div>
              <Label>{t.price}</Label>
              <Input
                type="number"
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseInt(e.target.value) || 0 })}
              />
            </div>
            
            <div>
              <Label>{t.userType}</Label>
              <div className="flex gap-2 mt-2">
                <Button
                  type="button"
                  variant={formData.userType === 'teacher' ? 'default' : 'outline'}
                  onClick={() => setFormData({ ...formData, userType: 'teacher' })}
                >
                  {t.teacher}
                </Button>
                <Button
                  type="button"
                  variant={formData.userType === 'guardian' ? 'default' : 'outline'}
                  onClick={() => setFormData({ ...formData, userType: 'guardian' })}
                >
                  {t.guardian}
                </Button>
              </div>
            </div>
            
            <div>
              <Label>{t.color}</Label>
              <div className="flex gap-2 mt-2">
                {colorOptions.map((color) => (
                  <button
                    key={color.value}
                    type="button"
                    className={`w-10 h-10 rounded-full ${color.class} ${
                      formData.color === color.value ? 'ring-4 ring-offset-2 ring-blue-500' : ''
                    }`}
                    onClick={() => setFormData({ ...formData, color: color.value })}
                  />
                ))}
              </div>
            </div>
            
            <div>
              <Label>{t.icon}</Label>
              <div className="flex gap-2 mt-2">
                {iconOptions.map((iconOpt) => {
                  const IconComp = iconOpt.icon;
                  return (
                    <Button
                      key={iconOpt.value}
                      type="button"
                      variant={formData.icon === iconOpt.value ? 'default' : 'outline'}
                      size="sm"
                      onClick={() => setFormData({ ...formData, icon: iconOpt.value })}
                    >
                      <IconComp className="w-4 h-4 mr-1" />
                      {iconOpt.label}
                    </Button>
                  );
                })}
              </div>
            </div>
            
            <div>
              <Label>{t.features}</Label>
              <Textarea
                value={formData.features}
                onChange={(e) => setFormData({ ...formData, features: e.target.value })}
                placeholder="টিউশনে আবেদন করুন&#10;সীমাহীন মেসেজিং&#10;প্রায়োরিটি সাপোর্ট"
                rows={5}
              />
            </div>
            
            <div className="flex items-center gap-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.popular}
                  onChange={(e) => setFormData({ ...formData, popular: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>{t.popular}</span>
              </label>
              
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={formData.active}
                  onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                  className="w-4 h-4"
                />
                <span>{t.active}</span>
              </label>
            </div>
          </div>
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowEditDialog(false)}>
              <X className="w-4 h-4 mr-2" />
              {t.cancel}
            </Button>
            <Button onClick={handleSave} disabled={saving}>
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {language === 'bn' ? 'সংরক্ষণ হচ্ছে...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4 mr-2" />
                  {t.save}
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      
      {/* Delete Confirmation Dialog */}
      <Dialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{t.deletePackage}</DialogTitle>
            <DialogDescription>{t.deleteConfirmation}</DialogDescription>
          </DialogHeader>
          
          {deletingPackage && (
            <Card className="p-4 bg-red-50 border-red-200">
              <p className="font-semibold text-gray-900">{deletingPackage.name}</p>
              <p className="text-sm text-gray-600">
                {deletingPackage.credits + (deletingPackage.bonus || 0)} {t.credits} - ৳{deletingPackage.price}
              </p>
            </Card>
          )}
          
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDeleteDialog(false)}>
              {t.cancel}
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
            >
              <Trash2 className="w-4 h-4 mr-2" />
              {t.delete}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
