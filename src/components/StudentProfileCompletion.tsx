import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { 
  Upload, 
  X, 
  CheckCircle, 
  AlertCircle,
  GraduationCap,
  User,
  Phone,
  MapPin,
  Calendar,
  FileText,
  Image as ImageIcon,
  Loader2,
  Save,
  Send,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface StudentProfileCompletionProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'bn' | 'en';
  currentUser: any;
  onSuccess: () => void;
}

const content = {
  bn: {
    title: 'প্রোফাইল সম্পূর্ণ করুন',
    description: 'আপনার প্রোফাইল সম্পূর্ণ করুন যাতে এডমিন আপনার আবেদন অনুমোদন করতে পারেন',
    profileCompletion: 'প্রোফাইল সম্পূর্ণতা',
    
    // Personal Info
    personalInfo: 'ব্যক্তিগত তথ্য',
    profilePhoto: 'প্রোফাইল ফটো',
    uploadPhoto: 'ফটো আপলোড করুন',
    fullName: 'পূর্ণ নাম',
    namePlaceholder: 'আপনার সম্পূর্ণ নাম লিখুন',
    dateOfBirth: 'জন্ম তারিখ',
    gender: 'লিঙ্গ',
    male: 'পুরুষ',
    female: 'মহিলা',
    other: 'অন্যান্য',
    phone: 'মোবাইল নম্বর',
    phonePlaceholder: '০১৭xxxxxxxx',
    email: 'ইমেইল',
    emailPlaceholder: 'your@email.com',
    address: 'বাসার ঠিকানা',
    addressPlaceholder: 'সম্পূর্ণ ঠিকানা লিখুন',
    district: 'জেলা',
    districtPlaceholder: 'জেলা নির্বাচন করুন',
    
    // Educational Info
    educationalInfo: 'শিক্ষাগত তথ্য',
    currentClass: 'বর্তমান শ্রেণী',
    classPlaceholder: 'যেমন: ক্লাস ১০',
    school: 'স্কুল/কলেজের নাম',
    schoolPlaceholder: 'প্রতিষ্ঠানের সম্পূর্ণ নাম',
    rollNumber: 'রোল নম্বর',
    rollPlaceholder: 'আপনার রোল নম্বর',
    studentId: 'ছাত্র আইডি',
    studentIdPlaceholder: 'ছাত্র আইডি নম্বর',
    medium: 'শিক্ষার মাধ্যম',
    bangla: 'বাংলা',
    english: 'ইংরেজি',
    version: 'Version',
    nationalCurriculum: 'জাতীয় পাঠ্যক্রম',
    englishVersion: 'ইংরেজি ভার্সন',
    madrasah: 'মাদ্রাসা',
    
    // Family Info
    familyInfo: 'পারিবারিক তথ্য',
    fatherName: 'পিতার নাম',
    fatherOccupation: 'পিতার পেশা',
    motherName: 'মাতার নাম',
    motherOccupation: 'মাতার পেশা',
    guardianName: 'অভিভাবকের নাম',
    guardianRelation: 'সম্পর্ক',
    guardianPhone: 'অভিভাবকের মোবাইল',
    guardianNID: 'অভিভাবকের NID',
    guardianNIDPlaceholder: 'জাতীয় পরিচয়পত্র নম্বর',
    monthlyIncome: 'পরিবারের মাসিক আয়',
    incomePlaceholder: 'টাকা',
    familyMembers: 'পরিবারের সদস্য সংখ্যা',
    
    // Documents
    documents: 'প্রয়োজনীয় ডকুমেন্ট',
    uploadDocs: 'ডকুমেন্ট আপলোড করুন',
    studentIdCard: 'ছাত্র আইডি কার্ড',
    schoolCertificate: 'স্কুল সার্টিফিকেট',
    birthCertificate: 'জন্ম নিবন্ধন',
    guardianNIDCopy: 'অভিভাবকের NID কপি',
    familyPhoto: 'পারিবারিক ছবি',
    studentPhoto: 'ছাত্রের ছবি',
    incomeProof: 'আয়ের প্রমাণপত্র (ঐচ্ছিক)',
    clickToUpload: 'আপলোড করতে ক্লিক করুন',
    maxSize: 'সর্বোচ্চ ৫ MB',
    docsHelper: 'সব ডকুমেন্ট আপলোড করলে দ্রুত অনুমোদন পাবেন',
    
    // Additional Info
    additionalInfo: 'অতিরিক্ত তথ্য',
    whyNeedHelp: 'কেন সাহায্য প্রয়োজন?',
    whyNeedHelpPlaceholder: 'আপনার পরিস্থিতি বিস্তারিত লিখুন...',
    educationalGoals: 'শিক্ষা লক্ষ্য',
    educationalGoalsPlaceholder: 'ভবিষ্যতে কী হতে চান?',
    specialCircumstances: 'বিশেষ পরিস্থিতি',
    specialCircumstancesPlaceholder: 'যদি কোনো বিশেষ পরিস্থিতি থাকে তা লিখুন...',
    
    // Status
    profileStatus: 'প্রোফাইল স্ট্যাটাস',
    incomplete: 'অসম্পূর্ণ',
    completed: 'সম্পূর্ণ',
    underReview: 'পর্যালোচনাধীন',
    approved: 'অনুমোদিত',
    needsUpdate: 'আপডেট প্রয়োজন',
    
    // Actions
    saveDraft: 'ড্রাফট সেভ করুন',
    submitForReview: 'অনুমোদনের জন্য জমা দিন',
    saving: 'সেভ হচ্ছে...',
    submitting: 'জমা হচ্ছে...',
    cancel: 'বাতিল',
    
    // Messages
    successSaved: 'প্রোফাইল ড্রাফট সেভ হয়েছে',
    successSubmitted: 'প্রোফাইল সফলভাবে জমা হয়েছে! এডমিন শীঘ্রই অনুমোদন করবেন।',
    errorSaving: 'সেভ করতে সমস্যা হয়েছে',
    errorSubmitting: 'জমা দিতে সমস্যা হয়েছে',
    fillRequired: 'সব প্রয়োজনীয় ফিল্ড পূরণ করুন',
    uploadAllDocs: 'সব ডকুমেন্ট আপলোড করুন',
    
    // Completion note
    completionNote: 'প্রোফাইল সম্পূর্ণ করে অনুমোদন পেলেই আপনি সব ফিচার ব্যবহার করতে পারবেন',
    verificationNote: 'সব তথ্য ও ডকুমেন্ট যাচাই করা হবে',
  },
  en: {
    title: 'Complete Your Profile',
    description: 'Complete your profile so admin can verify your application',
    profileCompletion: 'Profile Completion',
    
    personalInfo: 'Personal Information',
    profilePhoto: 'Profile Photo',
    uploadPhoto: 'Upload Photo',
    fullName: 'Full Name',
    namePlaceholder: 'Enter your full name',
    dateOfBirth: 'Date of Birth',
    gender: 'Gender',
    male: 'Male',
    female: 'Female',
    other: 'Other',
    phone: 'Mobile Number',
    phonePlaceholder: '01XXXXXXXXX',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    address: 'Address',
    addressPlaceholder: 'Enter complete address',
    district: 'District',
    districtPlaceholder: 'Select district',
    
    educationalInfo: 'Educational Information',
    currentClass: 'Current Class',
    classPlaceholder: 'e.g., Class 10',
    school: 'School/College Name',
    schoolPlaceholder: 'Full institution name',
    rollNumber: 'Roll Number',
    rollPlaceholder: 'Your roll number',
    studentId: 'Student ID',
    studentIdPlaceholder: 'Student ID number',
    medium: 'Medium of Education',
    bangla: 'Bangla',
    english: 'English',
    version: 'Version',
    nationalCurriculum: 'National Curriculum',
    englishVersion: 'English Version',
    madrasah: 'Madrasah',
    
    familyInfo: 'Family Information',
    fatherName: "Father's Name",
    fatherOccupation: "Father's Occupation",
    motherName: "Mother's Name",
    motherOccupation: "Mother's Occupation",
    guardianName: "Guardian's Name",
    guardianRelation: 'Relation',
    guardianPhone: "Guardian's Mobile",
    guardianNID: "Guardian's NID",
    guardianNIDPlaceholder: 'National ID number',
    monthlyIncome: 'Family Monthly Income',
    incomePlaceholder: 'BDT',
    familyMembers: 'Number of Family Members',
    
    documents: 'Required Documents',
    uploadDocs: 'Upload Documents',
    studentIdCard: 'Student ID Card',
    schoolCertificate: 'School Certificate',
    birthCertificate: 'Birth Certificate',
    guardianNIDCopy: "Guardian's NID Copy",
    familyPhoto: 'Family Photo',
    studentPhoto: 'Student Photo',
    incomeProof: 'Income Proof (Optional)',
    clickToUpload: 'Click to upload',
    maxSize: 'Max 5 MB',
    docsHelper: 'Upload all documents for faster approval',
    
    additionalInfo: 'Additional Information',
    whyNeedHelp: 'Why do you need help?',
    whyNeedHelpPlaceholder: 'Explain your situation in detail...',
    educationalGoals: 'Educational Goals',
    educationalGoalsPlaceholder: 'What do you want to become?',
    specialCircumstances: 'Special Circumstances',
    specialCircumstancesPlaceholder: 'Write any special circumstances...',
    
    profileStatus: 'Profile Status',
    incomplete: 'Incomplete',
    completed: 'Completed',
    underReview: 'Under Review',
    approved: 'Approved',
    needsUpdate: 'Needs Update',
    
    saveDraft: 'Save Draft',
    submitForReview: 'Submit for Review',
    saving: 'Saving...',
    submitting: 'Submitting...',
    cancel: 'Cancel',
    
    successSaved: 'Profile draft saved',
    successSubmitted: 'Profile submitted successfully! Admin will verify soon.',
    errorSaving: 'Error saving profile',
    errorSubmitting: 'Error submitting profile',
    fillRequired: 'Fill all required fields',
    uploadAllDocs: 'Upload all required documents',
    
    completionNote: 'After completing and getting approval, you can use all features',
    verificationNote: 'All information and documents will be verified',
  }
};

export function StudentProfileCompletion({ 
  open, 
  onOpenChange, 
  language,
  currentUser,
  onSuccess,
}: StudentProfileCompletionProps) {
  const t = content[language];
  
  // Profile data
  const [profilePhoto, setProfilePhoto] = useState('');
  const [formData, setFormData] = useState({
    // Personal
    fullName: currentUser?.name || '',
    dateOfBirth: '',
    gender: '',
    phone: currentUser?.phone || '',
    email: currentUser?.email || '',
    address: '',
    district: '',
    
    // Educational
    currentClass: currentUser?.class || '',
    school: currentUser?.school || '',
    rollNumber: '',
    studentId: '',
    medium: '',
    version: '',
    
    // Family
    fatherName: '',
    fatherOccupation: '',
    motherName: '',
    motherOccupation: '',
    guardianName: '',
    guardianRelation: '',
    guardianPhone: '',
    guardianNID: '',
    monthlyIncome: '',
    familyMembers: '',
    
    // Additional
    whyNeedHelp: '',
    educationalGoals: '',
    specialCircumstances: '',
  });
  
  // Documents
  const [documents, setDocuments] = useState({
    studentIdCard: '',
    schoolCertificate: '',
    birthCertificate: '',
    guardianNIDCopy: '',
    familyPhoto: '',
    studentPhoto: '',
    incomeProof: '',
  });
  
  const [isUploading, setIsUploading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error(language === 'bn' ? 'ফাইল সাইজ ৫MB এর বেশি' : 'File size exceeds 5MB');
      return;
    }
    
    setIsUploading(true);
    
    try {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePhoto(reader.result as string);
        toast.success(language === 'bn' ? 'ফটো আপলোড হয়েছে' : 'Photo uploaded');
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Photo upload error:', error);
      toast.error(language === 'bn' ? 'ফটো আপলোড করতে সমস্যা' : 'Error uploading photo');
      setIsUploading(false);
    }
  };
  
  const handleDocumentUpload = async (docType: string, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    
    if (file.size > 5 * 1024 * 1024) {
      toast.error(language === 'bn' ? 'ফাইল সাইজ ৫MB এর বেশি' : 'File size exceeds 5MB');
      return;
    }
    
    setIsUploading(true);
    
    try {
      // Convert file to base64
      const reader = new FileReader();
      reader.onloadend = async () => {
        const base64Data = reader.result as string;
        
        // Upload to Supabase Storage via server
        try {
          const uploadResponse = await fetch(
            `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/student-profile/upload-document`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${publicAnonKey}`,
              },
              body: JSON.stringify({
                studentId: currentUser?.id,
                documentType: docType,
                fileData: base64Data,
                fileName: file.name,
                mimeType: file.type,
              }),
            }
          );
          
          if (uploadResponse.ok) {
            const uploadData = await uploadResponse.json();
            // Store the signed URL instead of base64
            setDocuments(prev => ({ ...prev, [docType]: uploadData.document.signedUrl }));
            toast.success(language === 'bn' ? 'ডকুমেন্ট আপলোড হয়েছে' : 'Document uploaded');
          } else {
            throw new Error('Upload to storage failed');
          }
        } catch (uploadError) {
          console.error('Storage upload error:', uploadError);
          // Fallback to base64 storage if Supabase Storage fails
          setDocuments(prev => ({ ...prev, [docType]: base64Data }));
          toast.success(language === 'bn' ? 'ডকুমেন্ট সংরক্ষিত (লোকাল)' : 'Document saved (local)');
        }
        
        setIsUploading(false);
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Document upload error:', error);
      toast.error(language === 'bn' ? 'ডকুমেন্ট আপলোড করতে সমস্যা' : 'Error uploading document');
      setIsUploading(false);
    }
  };
  
  const calculateCompletion = (): number => {
    let completed = 0;
    let total = 0;
    
    // Personal info (30%)
    const personalFields = ['fullName', 'dateOfBirth', 'gender', 'phone', 'address', 'district'];
    personalFields.forEach(field => {
      total++;
      if (formData[field as keyof typeof formData]) completed++;
    });
    
    // Educational info (20%)
    const educationalFields = ['currentClass', 'school', 'rollNumber', 'studentId', 'medium'];
    educationalFields.forEach(field => {
      total++;
      if (formData[field as keyof typeof formData]) completed++;
    });
    
    // Family info (20%)
    const familyFields = ['fatherName', 'motherName', 'guardianName', 'guardianPhone', 'guardianNID'];
    familyFields.forEach(field => {
      total++;
      if (formData[field as keyof typeof formData]) completed++;
    });
    
    // Documents (25%)
    const requiredDocs = ['studentIdCard', 'schoolCertificate', 'birthCertificate', 'guardianNIDCopy', 'studentPhoto'];
    requiredDocs.forEach(doc => {
      total++;
      if (documents[doc as keyof typeof documents]) completed++;
    });
    
    // Additional info (5%)
    if (formData.whyNeedHelp) completed++;
    total++;
    
    return Math.round((completed / total) * 100);
  };
  
  const validateProfile = (): boolean => {
    // Check required fields
    const requiredFields = [
      'fullName', 'dateOfBirth', 'gender', 'phone', 'address',
      'currentClass', 'school', 'medium',
      'fatherName', 'motherName', 'guardianName', 'guardianPhone', 'guardianNID',
      'whyNeedHelp',
    ];
    
    for (const field of requiredFields) {
      if (!formData[field as keyof typeof formData]) {
        toast.error(t.fillRequired);
        return false;
      }
    }
    
    // Check required documents
    const requiredDocs = ['studentIdCard', 'schoolCertificate', 'birthCertificate', 'guardianNIDCopy', 'studentPhoto'];
    for (const doc of requiredDocs) {
      if (!documents[doc as keyof typeof documents]) {
        toast.error(t.uploadAllDocs);
        return false;
      }
    }
    
    return true;
  };
  
  const handleSaveDraft = async () => {
    setIsSaving(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/student-profile/save-draft`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            studentId: currentUser?.id,
            profilePhoto,
            formData,
            documents,
            status: 'draft',
          }),
        }
      );
      
      if (response.ok) {
        toast.success(t.successSaved);
      } else {
        throw new Error('Save failed');
      }
    } catch (error) {
      console.error('Save draft error:', error);
      toast.error(t.errorSaving);
    } finally {
      setIsSaving(false);
    }
  };
  
  const handleSubmitForReview = async () => {
    if (!validateProfile()) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/student-profile/submit`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            studentId: currentUser?.id,
            studentName: formData.fullName,
            profilePhoto,
            formData,
            documents,
            status: 'pending_approval',
            submittedAt: new Date().toISOString(),
          }),
        }
      );
      
      if (response.ok) {
        toast.success(t.successSubmitted);
        onSuccess();
        onOpenChange(false);
      } else {
        throw new Error('Submit failed');
      }
    } catch (error) {
      console.error('Submit profile error:', error);
      toast.error(t.errorSubmitting);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const completionPercentage = calculateCompletion();
  
  const districts = ['ঢাকা', 'চট্টগ্রাম', 'রাজশাহী', 'খুলনা', 'বরিশাল', 'সিলেট', 'রংপুর', 'ময়মনসিংহ'];

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>
        
        {/* Completion Progress */}
        <Card className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-emerald-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">{t.profileCompletion}</span>
            <span className="font-bold text-emerald-600">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-3" />
          {completionPercentage < 100 && (
            <p className="text-xs text-emerald-700 mt-2">{t.completionNote}</p>
          )}
        </Card>
        
        <div className="space-y-6">
          {/* Personal Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-blue-600" />
              <h3 className="text-lg font-semibold">{t.personalInfo}</h3>
            </div>
            
            {/* Profile Photo */}
            <div className="mb-4">
              <Label>{t.profilePhoto}</Label>
              <div className="flex items-center gap-4 mt-2">
                {profilePhoto ? (
                  <div className="relative">
                    <img src={profilePhoto} alt="Profile" className="w-24 h-24 rounded-full object-cover border-2 border-gray-200" />
                    <button
                      onClick={() => setProfilePhoto('')}
                      className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                    <User className="w-12 h-12 text-gray-400" />
                  </div>
                )}
                <div>
                  <input
                    type="file"
                    id="profilePhoto"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                    disabled={isUploading}
                  />
                  <label htmlFor="profilePhoto">
                    <Button type="button" variant="outline" size="sm" disabled={isUploading} asChild>
                      <span>
                        {isUploading ? (
                          <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {language === 'bn' ? 'আপলোড হচ্ছে...' : 'Uploading...'}</>
                        ) : (
                          <><Upload className="w-4 h-4 mr-2" /> {t.uploadPhoto}</>
                        )}
                      </span>
                    </Button>
                  </label>
                  <p className="text-xs text-gray-500 mt-1">{t.maxSize}</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>{t.fullName} *</Label>
                <Input
                  value={formData.fullName}
                  onChange={(e) => handleInputChange('fullName', e.target.value)}
                  placeholder={t.namePlaceholder}
                  required
                />
              </div>
              <div>
                <Label>{t.dateOfBirth} *</Label>
                <Input
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleInputChange('dateOfBirth', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>{t.gender} *</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="male">{t.male}</SelectItem>
                    <SelectItem value="female">{t.female}</SelectItem>
                    <SelectItem value="other">{t.other}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t.phone} *</Label>
                <Input
                  value={formData.phone}
                  onChange={(e) => handleInputChange('phone', e.target.value)}
                  placeholder={t.phonePlaceholder}
                  required
                />
              </div>
              <div>
                <Label>{t.email}</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleInputChange('email', e.target.value)}
                  placeholder={t.emailPlaceholder}
                />
              </div>
              <div>
                <Label>{t.district} *</Label>
                <Select value={formData.district} onValueChange={(value) => handleInputChange('district', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.districtPlaceholder} />
                  </SelectTrigger>
                  <SelectContent>
                    {districts.map(district => (
                      <SelectItem key={district} value={district}>{district}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="md:col-span-2">
                <Label>{t.address} *</Label>
                <Textarea
                  value={formData.address}
                  onChange={(e) => handleInputChange('address', e.target.value)}
                  placeholder={t.addressPlaceholder}
                  rows={2}
                  required
                />
              </div>
            </div>
          </Card>
          
          {/* Educational Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="w-5 h-5 text-purple-600" />
              <h3 className="text-lg font-semibold">{t.educationalInfo}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>{t.currentClass} *</Label>
                <Input
                  value={formData.currentClass}
                  onChange={(e) => handleInputChange('currentClass', e.target.value)}
                  placeholder={t.classPlaceholder}
                  required
                />
              </div>
              <div>
                <Label>{t.school} *</Label>
                <Input
                  value={formData.school}
                  onChange={(e) => handleInputChange('school', e.target.value)}
                  placeholder={t.schoolPlaceholder}
                  required
                />
              </div>
              <div>
                <Label>{t.rollNumber}</Label>
                <Input
                  value={formData.rollNumber}
                  onChange={(e) => handleInputChange('rollNumber', e.target.value)}
                  placeholder={t.rollPlaceholder}
                />
              </div>
              <div>
                <Label>{t.studentId}</Label>
                <Input
                  value={formData.studentId}
                  onChange={(e) => handleInputChange('studentId', e.target.value)}
                  placeholder={t.studentIdPlaceholder}
                />
              </div>
              <div>
                <Label>{t.medium} *</Label>
                <Select value={formData.medium} onValueChange={(value) => handleInputChange('medium', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="bangla">{t.bangla}</SelectItem>
                    <SelectItem value="english">{t.english}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>{t.version}</Label>
                <Select value={formData.version} onValueChange={(value) => handleInputChange('version', value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="national">{t.nationalCurriculum}</SelectItem>
                    <SelectItem value="english_version">{t.englishVersion}</SelectItem>
                    <SelectItem value="madrasah">{t.madrasah}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </Card>
          
          {/* Family Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <User className="w-5 h-5 text-teal-600" />
              <h3 className="text-lg font-semibold">{t.familyInfo}</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>{t.fatherName} *</Label>
                <Input
                  value={formData.fatherName}
                  onChange={(e) => handleInputChange('fatherName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>{t.fatherOccupation}</Label>
                <Input
                  value={formData.fatherOccupation}
                  onChange={(e) => handleInputChange('fatherOccupation', e.target.value)}
                />
              </div>
              <div>
                <Label>{t.motherName} *</Label>
                <Input
                  value={formData.motherName}
                  onChange={(e) => handleInputChange('motherName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>{t.motherOccupation}</Label>
                <Input
                  value={formData.motherOccupation}
                  onChange={(e) => handleInputChange('motherOccupation', e.target.value)}
                />
              </div>
              <div>
                <Label>{t.guardianName} *</Label>
                <Input
                  value={formData.guardianName}
                  onChange={(e) => handleInputChange('guardianName', e.target.value)}
                  required
                />
              </div>
              <div>
                <Label>{t.guardianRelation}</Label>
                <Input
                  value={formData.guardianRelation}
                  onChange={(e) => handleInputChange('guardianRelation', e.target.value)}
                />
              </div>
              <div>
                <Label>{t.guardianPhone} *</Label>
                <Input
                  value={formData.guardianPhone}
                  onChange={(e) => handleInputChange('guardianPhone', e.target.value)}
                  placeholder={t.phonePlaceholder}
                  required
                />
              </div>
              <div>
                <Label>{t.guardianNID} *</Label>
                <Input
                  value={formData.guardianNID}
                  onChange={(e) => handleInputChange('guardianNID', e.target.value)}
                  placeholder={t.guardianNIDPlaceholder}
                  required
                />
              </div>
              <div>
                <Label>{t.monthlyIncome}</Label>
                <Input
                  type="number"
                  value={formData.monthlyIncome}
                  onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
                  placeholder={t.incomePlaceholder}
                />
              </div>
              <div>
                <Label>{t.familyMembers}</Label>
                <Input
                  type="number"
                  value={formData.familyMembers}
                  onChange={(e) => handleInputChange('familyMembers', e.target.value)}
                />
              </div>
            </div>
          </Card>
          
          {/* Documents */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-orange-600" />
              <h3 className="text-lg font-semibold">{t.documents}</h3>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
              <div className="flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-blue-600 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800">{t.docsHelper}</p>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4">
              {[
                { key: 'studentIdCard', label: t.studentIdCard, required: true },
                { key: 'schoolCertificate', label: t.schoolCertificate, required: true },
                { key: 'birthCertificate', label: t.birthCertificate, required: true },
                { key: 'guardianNIDCopy', label: t.guardianNIDCopy, required: true },
                { key: 'studentPhoto', label: t.studentPhoto, required: true },
                { key: 'familyPhoto', label: t.familyPhoto, required: false },
                { key: 'incomeProof', label: t.incomeProof, required: false },
              ].map(doc => (
                <div key={doc.key}>
                  <Label>{doc.label} {doc.required && '*'}</Label>
                  <div className="mt-2">
                    {documents[doc.key as keyof typeof documents] ? (
                      <div className="relative aspect-video rounded-lg overflow-hidden border-2 border-green-200">
                        {documents[doc.key as keyof typeof documents].startsWith('data:image') ? (
                          <img
                            src={documents[doc.key as keyof typeof documents]}
                            alt={doc.label}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-gray-100">
                            <FileText className="w-12 h-12 text-gray-400" />
                          </div>
                        )}
                        <button
                          onClick={() => setDocuments(prev => ({ ...prev, [doc.key]: '' }))}
                          className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center"
                        >
                          <X className="w-4 h-4" />
                        </button>
                        <div className="absolute bottom-0 left-0 right-0 bg-green-500/90 text-white p-1 text-xs text-center">
                          <CheckCircle className="w-3 h-3 inline mr-1" />
                          {language === 'bn' ? 'আপলোড সম্পূর্ণ' : 'Uploaded'}
                        </div>
                      </div>
                    ) : (
                      <>
                        <input
                          type="file"
                          id={doc.key}
                          accept="image/*,.pdf"
                          onChange={(e) => handleDocumentUpload(doc.key, e)}
                          className="hidden"
                          disabled={isUploading}
                        />
                        <label htmlFor={doc.key}>
                          <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center cursor-pointer hover:border-gray-400 transition-colors">
                            <Upload className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                            <p className="text-sm text-gray-600">{t.clickToUpload}</p>
                            <p className="text-xs text-gray-500 mt-1">{t.maxSize}</p>
                          </div>
                        </label>
                      </>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Card>
          
          {/* Additional Information */}
          <Card className="p-6">
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-rose-600" />
              <h3 className="text-lg font-semibold">{t.additionalInfo}</h3>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label>{t.whyNeedHelp} *</Label>
                <Textarea
                  value={formData.whyNeedHelp}
                  onChange={(e) => handleInputChange('whyNeedHelp', e.target.value)}
                  placeholder={t.whyNeedHelpPlaceholder}
                  rows={4}
                  required
                />
              </div>
              <div>
                <Label>{t.educationalGoals}</Label>
                <Textarea
                  value={formData.educationalGoals}
                  onChange={(e) => handleInputChange('educationalGoals', e.target.value)}
                  placeholder={t.educationalGoalsPlaceholder}
                  rows={3}
                />
              </div>
              <div>
                <Label>{t.specialCircumstances}</Label>
                <Textarea
                  value={formData.specialCircumstances}
                  onChange={(e) => handleInputChange('specialCircumstances', e.target.value)}
                  placeholder={t.specialCircumstancesPlaceholder}
                  rows={3}
                />
              </div>
            </div>
          </Card>
          
          {/* Verification Note */}
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-amber-600 mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-amber-900 mb-1">{language === 'bn' ? '⚠️ গুরুত্বপূর্ণ' : '⚠️ Important'}</p>
                <p className="text-sm text-amber-800">{t.verificationNote}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between gap-4 pt-6 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.cancel}
          </Button>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleSaveDraft}
              disabled={isSaving || isSubmitting}
            >
              {isSaving ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t.saving}</>
              ) : (
                <><Save className="w-4 h-4 mr-2" /> {t.saveDraft}</>
              )}
            </Button>
            
            <Button
              onClick={handleSubmitForReview}
              disabled={isSaving || isSubmitting || completionPercentage < 100}
              className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              {isSubmitting ? (
                <><Loader2 className="w-4 h-4 mr-2 animate-spin" /> {t.submitting}</>
              ) : (
                <><Send className="w-4 h-4 mr-2" /> {t.submitForReview}</>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
