import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { 
  DollarSign, 
  BookOpen, 
  GraduationCap,
  Upload,
  FileText,
  Image as ImageIcon,
  CheckCircle2,
  AlertCircle,
  Loader2,
  X,
  Info,
  Heart,
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface StudentApplicationFormProps {
  language: 'bn' | 'en';
  currentUser: any; // Student user
  onSuccess: () => void;
  onClose: () => void;
}

const content = {
  bn: {
    title: 'সাহায্যের জন্য আবেদন',
    subtitle: 'আপনার প্রয়োজনীয় সাহায্যের ধরন নির্বাচন করুন',
    
    // Application Types
    applicationType: 'আবেদনের ধরন',
    scholarship: 'বৃত্তি / আর্থিক সাহায্য',
    scholarshipDesc: 'টিউশন ফি, পরীক্ষা ফি, ইত্যাদি',
    materials: 'বই ও শিক্ষা উপকরণ',
    materialsDesc: 'বই, খাতা, কলম, ইত্যাদি',
    tuition: 'টিউশন সহায়তা',
    tuitionDesc: 'বিনামূল্যে শিক্ষক খুঁজে পান',
    
    // Common Fields
    title_label: 'আবেদনের শিরোনাম',
    titlePlaceholder: 'যেমন: ক্লাস ১০ পরীক্ষার ফি প্রয়োজন',
    description: 'বিস্তারিত বর্ণনা',
    descriptionPlaceholder: 'আপনার পরিস্থিতি এবং কেন সাহায্য প্রয়োজন তা বিস্তারিত লিখুন...',
    
    // Scholarship Fields
    amount: 'প্রয়োজনীয় পরিমাণ (টাকা)',
    amountPlaceholder: 'যেমন: ৫০০০',
    purpose: 'উদ্দেশ্য',
    purposePlaceholder: 'যেমন: পরীক্ষার ফি, বই কেনা',
    urgency: 'জরুরি মাত্রা',
    urgencyLow: 'কম জরুরি',
    urgencyMedium: 'মাঝারি',
    urgencyHigh: 'অত্যন্ত জরুরি',
    
    // Materials Fields
    itemsNeeded: 'প্রয়োজনীয় আইটেম',
    itemsPlaceholder: 'যেমন: ক্লাস ১০ বিজ্ঞান বই, খাতা, কলম',
    quantity: 'পরিমাণ / সংখ্যা',
    quantityPlaceholder: 'যেমন: ৩টি বই, ১০টি খাতা',
    subject: 'বিষয়',
    subjectPlaceholder: 'যেমন: গণিত, বিজ্ঞান, ইংরেজি',
    
    // Tuition Fields
    subjects: 'কোন বিষয়ে টিউশন প্রয়োজন?',
    subjectsPlaceholder: 'যেমন: গণিত, পদার্থবিদ্যা',
    preferredDays: 'সাপ্তাহে কতদিন?',
    sessionDuration: 'প্রতি সেশন সময়',
    freeOrPaid: 'ধরন',
    free: 'বিনামূল্যে (দাতব্য)',
    paid: 'সামান্য পারিশ্রমিক',
    
    // Cover Letter
    coverLetter: 'আপনার গল্প শেয়ার করুন',
    coverLetterLabel: 'কভার লেটার / আবেদন পত্র',
    coverLetterPlaceholder: 'আপনার পরিবার সম্পর্কে, পড়াশোনার লক্ষ্য, কেন সাহায্য প্রয়োজন - সব কিছু বিস্তারিত লিখুন...',
    coverLetterHelper: 'এটি দাতাদের আপনার পরিস্থিতি বুঝতে সাহায্য করবে',
    
    // Documents
    documents: 'প্রয়োজনীয় ডকুমেন্ট',
    uploadDocs: 'ডকুমেন্ট আপলোড করুন',
    studentId: 'ছাত্র আইডি কার্ড',
    incomeProof: 'আয়ের প্রমাণপত্র',
    schoolCert: 'স্কুল সার্টিফিকেট',
    familyPhoto: 'পারিবারিক ছবি (ঐচ্ছিক)',
    uploadPhotos: 'ছবি আপলোড করুন',
    clickToUpload: 'ক্লিক করে আপলোড করুন',
    docsHelper: 'আপনার আবেদন দ্রুত অনুমোদিত হওয়ার জন্য সব ডকুমেন্ট যুক্ত করুন',
    
    // Verification
    verification: 'যাচাইকরণ',
    verifyInfo: 'আমি নিশ্চিত করছি যে',
    verifyItem1: '✓ সব তথ্য সত্য এবং সঠিক',
    verifyItem2: '✓ সব ডকুমেন্ট আসল',
    verifyItem3: '✓ আমি সত্যিই সাহায্য প্রয়োজন',
    agreeTerms: 'আমি শর্তাবলী মেনে নিচ্ছি',
    
    // Actions
    submit: 'আবেদন জমা দিন',
    submitting: 'জমা হচ্ছে...',
    cancel: 'বাতিল',
    back: 'পেছনে',
    next: 'পরবর্তী',
    
    // Messages
    successMessage: 'আপনার আবেদন সফলভাবে জমা হয়েছে!',
    successDesc: 'আমরা শীঘ্রই আপনার আবেদন যাচাই করব এবং সঠিক দাতাদের কাছে পাঠাব।',
    errorMessage: 'আবেদন জমা দিতে সমস্যা হয়েছে',
    
    // Info Boxes
    scholarshipInfo: 'আর্থিক সাহায্য সরাসরি আপনার স্কুল / পরীক্ষা কেন্দ্রে পাঠানো হবে',
    materialsInfo: 'অনুমোদনের পর আপনার ঠিকানায় বই ও উপকরণ পাঠানো হবে',
    tuitionInfo: 'আমরা আপনার জন্য একজন যোগ্য শিক্ষক খুঁজে দেব',
    
    // Steps
    step1: 'ধাপ ১: ধরন নির্বাচন',
    step2: 'ধাপ ২: বিস্তারিত তথ্য',
    step3: 'ধাপ ৩: ডকুমেন্ট',
    step4: 'ধাপ ৪: যাচাইকরণ',
  },
  en: {
    title: 'Apply for Assistance',
    subtitle: 'Select the type of help you need',
    
    applicationType: 'Application Type',
    scholarship: 'Scholarship / Financial Aid',
    scholarshipDesc: 'Tuition fees, exam fees, etc.',
    materials: 'Books & Educational Materials',
    materialsDesc: 'Books, notebooks, pens, etc.',
    tuition: 'Tuition Assistance',
    tuitionDesc: 'Find a teacher for free',
    
    title_label: 'Application Title',
    titlePlaceholder: 'e.g., Need help with Class 10 exam fees',
    description: 'Detailed Description',
    descriptionPlaceholder: 'Explain your situation and why you need help...',
    
    amount: 'Amount Needed (BDT)',
    amountPlaceholder: 'e.g., 5000',
    purpose: 'Purpose',
    purposePlaceholder: 'e.g., Exam fees, Buy books',
    urgency: 'Urgency Level',
    urgencyLow: 'Low',
    urgencyMedium: 'Medium',
    urgencyHigh: 'Very Urgent',
    
    itemsNeeded: 'Items Needed',
    itemsPlaceholder: 'e.g., Class 10 Science book, notebooks, pens',
    quantity: 'Quantity / Amount',
    quantityPlaceholder: 'e.g., 3 books, 10 notebooks',
    subject: 'Subject',
    subjectPlaceholder: 'e.g., Math, Science, English',
    
    subjects: 'Which subjects do you need tuition for?',
    subjectsPlaceholder: 'e.g., Math, Physics',
    preferredDays: 'Days per week',
    sessionDuration: 'Session duration',
    freeOrPaid: 'Type',
    free: 'Free (Charity)',
    paid: 'Small fee',
    
    coverLetter: 'Share Your Story',
    coverLetterLabel: 'Cover Letter / Application Letter',
    coverLetterPlaceholder: 'Write about your family, education goals, why you need help...',
    coverLetterHelper: 'This will help donors understand your situation',
    
    documents: 'Required Documents',
    uploadDocs: 'Upload Documents',
    studentId: 'Student ID Card',
    incomeProof: 'Income Certificate',
    schoolCert: 'School Certificate',
    familyPhoto: 'Family Photo (Optional)',
    uploadPhotos: 'Upload Photos',
    clickToUpload: 'Click to upload',
    docsHelper: 'Upload all documents to get your application approved faster',
    
    verification: 'Verification',
    verifyInfo: 'I confirm that',
    verifyItem1: '✓ All information is true and accurate',
    verifyItem2: '✓ All documents are genuine',
    verifyItem3: '✓ I really need help',
    agreeTerms: 'I agree to the terms and conditions',
    
    submit: 'Submit Application',
    submitting: 'Submitting...',
    cancel: 'Cancel',
    back: 'Back',
    next: 'Next',
    
    successMessage: 'Application submitted successfully!',
    successDesc: 'We will review your application soon and route it to the right donors.',
    errorMessage: 'Error submitting application',
    
    scholarshipInfo: 'Financial aid will be sent directly to your school/exam center',
    materialsInfo: 'After approval, books and materials will be sent to your address',
    tuitionInfo: 'We will find a qualified teacher for you',
    
    step1: 'Step 1: Select Type',
    step2: 'Step 2: Details',
    step3: 'Step 3: Documents',
    step4: 'Step 4: Verification',
  }
};

type ApplicationType = 'scholarship' | 'materials' | 'tuition';

export function StudentApplicationForm({ language, currentUser, onSuccess, onClose }: StudentApplicationFormProps) {
  const t = content[language];
  
  // Multi-step state
  const [currentStep, setCurrentStep] = useState(1);
  
  // Application type
  const [applicationType, setApplicationType] = useState<ApplicationType | null>(null);
  
  // Form data
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    amount: '',
    purpose: '',
    urgency: 'medium',
    itemsNeeded: '',
    quantity: '',
    subject: '',
    subjects: '',
    preferredDays: '',
    sessionDuration: '',
    freeOrPaid: 'free',
    coverLetter: '',
  });
  
  // Documents
  const [uploadedDocs, setUploadedDocs] = useState<string[]>([]);
  const [isUploadingDoc, setIsUploadingDoc] = useState(false);
  
  // Verification
  const [agreeTerms, setAgreeTerms] = useState(false);
  
  // Submission
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handleDocUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    if (uploadedDocs.length + files.length > 5) {
      toast.error(language === 'bn' ? 'সর্বোচ্চ ৫টি ডকুমেন্ট' : 'Maximum 5 documents');
      return;
    }
    
    setIsUploadingDoc(true);
    
    try {
      const newDocs: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name}: ${language === 'bn' ? 'ফাইল সাইজ ৫MB এর বেশি' : 'File size exceeds 5MB'}`);
          continue;
        }
        
        const reader = new FileReader();
        const docData = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        
        newDocs.push(docData);
      }
      
      setUploadedDocs(prev => [...prev, ...newDocs]);
      toast.success(language === 'bn' ? `${newDocs.length}টি ডকুমেন্ট আপলোড হয়েছে` : `${newDocs.length} document(s) uploaded`);
    } catch (error) {
      console.error('Document upload error:', error);
      toast.error(language === 'bn' ? 'ডকুমেন্ট আপলোড করতে সমস্যা' : 'Error uploading documents');
    } finally {
      setIsUploadingDoc(false);
    }
  };
  
  const handleRemoveDoc = (index: number) => {
    setUploadedDocs(prev => prev.filter((_, i) => i !== index));
  };
  
  const validateStep = (step: number): boolean => {
    if (step === 1) {
      if (!applicationType) {
        toast.error(language === 'bn' ? 'আবেদনের ধরন নির্বাচন করুন' : 'Select application type');
        return false;
      }
      return true;
    }
    
    if (step === 2) {
      if (!formData.title || !formData.description) {
        toast.error(language === 'bn' ? 'শিরোনাম ও বিস্তারিত লিখুন' : 'Enter title and description');
        return false;
      }
      
      if (applicationType === 'scholarship' && !formData.amount) {
        toast.error(language === 'bn' ? 'পরিমাণ লিখুন' : 'Enter amount');
        return false;
      }
      
      if (applicationType === 'materials' && !formData.itemsNeeded) {
        toast.error(language === 'bn' ? 'প্রয়োজনীয় আইটেম লিখুন' : 'Enter items needed');
        return false;
      }
      
      if (applicationType === 'tuition' && !formData.subjects) {
        toast.error(language === 'bn' ? 'বিষয় লিখুন' : 'Enter subjects');
        return false;
      }
      
      if (!formData.coverLetter || formData.coverLetter.length < 50) {
        toast.error(language === 'bn' ? 'কভার লেটার কমপক্ষে ৫০ অক্ষর লিখুন' : 'Cover letter must be at least 50 characters');
        return false;
      }
      
      return true;
    }
    
    if (step === 3) {
      if (uploadedDocs.length === 0) {
        toast.error(language === 'bn' ? 'অন্তত একটি ডকুমেন্ট আপলোড করুন' : 'Upload at least one document');
        return false;
      }
      return true;
    }
    
    if (step === 4) {
      if (!agreeTerms) {
        toast.error(language === 'bn' ? 'শর্তাবলী মেনে নিন' : 'Accept terms and conditions');
        return false;
      }
      return true;
    }
    
    return true;
  };
  
  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };
  
  const handleBack = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  const handleSubmit = async () => {
    if (!validateStep(4)) return;
    
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/application/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          studentId: currentUser?.id || null,
          studentName: currentUser?.name || formData.title,
          class: currentUser?.class || 'N/A',
          school: currentUser?.school || 'N/A',
          applicationType,
          amount: applicationType === 'scholarship' ? parseInt(formData.amount) : null,
          itemsNeeded: applicationType === 'materials' ? formData.itemsNeeded : null,
          quantity: applicationType === 'materials' ? formData.quantity : null,
          subject: formData.subject || formData.subjects,
          purpose: formData.purpose,
          urgency: formData.urgency,
          coverLetter: formData.coverLetter,
          documents: uploadedDocs.length,
        }),
      });
      
      if (response.ok) {
        toast.success(t.successMessage);
        onSuccess();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Application submission error:', error);
      toast.error(t.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const applicationTypes = [
    {
      id: 'scholarship' as ApplicationType,
      name: t.scholarship,
      desc: t.scholarshipDesc,
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      info: t.scholarshipInfo,
    },
    {
      id: 'materials' as ApplicationType,
      name: t.materials,
      desc: t.materialsDesc,
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      info: t.materialsInfo,
    },
    {
      id: 'tuition' as ApplicationType,
      name: t.tuition,
      desc: t.tuitionDesc,
      icon: GraduationCap,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-50',
      borderColor: 'border-purple-200',
      info: t.tuitionInfo,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="text-center">
        <h2 className="text-2xl text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Progress Steps */}
      <div className="flex items-center justify-between max-w-2xl mx-auto">
        {[1, 2, 3, 4].map((step) => (
          <div key={step} className="flex items-center flex-1">
            <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
              currentStep >= step
                ? 'bg-gradient-to-br from-emerald-500 to-teal-600 text-white'
                : 'bg-gray-200 text-gray-500'
            }`}>
              {currentStep > step ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : (
                <span>{step}</span>
              )}
            </div>
            {step < 4 && (
              <div className={`flex-1 h-1 mx-2 ${
                currentStep > step ? 'bg-emerald-500' : 'bg-gray-200'
              }`} />
            )}
          </div>
        ))}
      </div>

      {/* Step Content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="space-y-6"
        >
          {/* Step 1: Application Type Selection */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <div className="grid md:grid-cols-3 gap-4">
                {applicationTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = applicationType === type.id;
                  
                  return (
                    <motion.div
                      key={type.id}
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className={`p-6 cursor-pointer transition-all ${
                          isSelected
                            ? `border-4 ${type.borderColor} shadow-xl ${type.bgColor}`
                            : 'border-2 border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => setApplicationType(type.id)}
                      >
                        <div className={`w-14 h-14 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center mb-4 shadow-lg mx-auto`}>
                          <Icon className="w-7 h-7 text-white" />
                        </div>
                        <h3 className="text-center text-gray-900 mb-2">{type.name}</h3>
                        <p className="text-sm text-center text-gray-600 mb-4">{type.desc}</p>
                        
                        {isSelected && (
                          <div className={`${type.bgColor} border ${type.borderColor} rounded-lg p-3`}>
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                              <p className="text-xs text-gray-700">{type.info}</p>
                            </div>
                          </div>
                        )}
                        
                        <div className="mt-4 flex items-center justify-center">
                          <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                            isSelected ? 'border-emerald-500 bg-emerald-500' : 'border-gray-300'
                          }`}>
                            {isSelected && <div className="w-2 h-2 bg-white rounded-full" />}
                          </div>
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Step 2: Details & Cover Letter */}
          {currentStep === 2 && applicationType && (
            <div className="space-y-4 max-w-2xl mx-auto">
              {/* Common Fields */}
              <div>
                <Label>{t.title_label} *</Label>
                <Input
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder={t.titlePlaceholder}
                  required
                />
              </div>
              
              <div>
                <Label>{t.description} *</Label>
                <Textarea
                  value={formData.description}
                  onChange={(e) => handleInputChange('description', e.target.value)}
                  placeholder={t.descriptionPlaceholder}
                  rows={4}
                  required
                />
              </div>

              {/* Type-specific Fields */}
              {applicationType === 'scholarship' && (
                <>
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>{t.amount} *</Label>
                      <Input
                        type="number"
                        value={formData.amount}
                        onChange={(e) => handleInputChange('amount', e.target.value)}
                        placeholder={t.amountPlaceholder}
                        required
                      />
                    </div>
                    <div>
                      <Label>{t.purpose}</Label>
                      <Input
                        value={formData.purpose}
                        onChange={(e) => handleInputChange('purpose', e.target.value)}
                        placeholder={t.purposePlaceholder}
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>{t.urgency}</Label>
                    <RadioGroup value={formData.urgency} onValueChange={(value) => handleInputChange('urgency', value)}>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="low" id="low" />
                          <Label htmlFor="low">{t.urgencyLow}</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="medium" id="medium" />
                          <Label htmlFor="medium">{t.urgencyMedium}</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="high" id="high" />
                          <Label htmlFor="high">{t.urgencyHigh}</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}

              {applicationType === 'materials' && (
                <>
                  <div>
                    <Label>{t.itemsNeeded} *</Label>
                    <Input
                      value={formData.itemsNeeded}
                      onChange={(e) => handleInputChange('itemsNeeded', e.target.value)}
                      placeholder={t.itemsPlaceholder}
                      required
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>{t.quantity}</Label>
                      <Input
                        value={formData.quantity}
                        onChange={(e) => handleInputChange('quantity', e.target.value)}
                        placeholder={t.quantityPlaceholder}
                      />
                    </div>
                    <div>
                      <Label>{t.subject}</Label>
                      <Input
                        value={formData.subject}
                        onChange={(e) => handleInputChange('subject', e.target.value)}
                        placeholder={t.subjectPlaceholder}
                      />
                    </div>
                  </div>
                </>
              )}

              {applicationType === 'tuition' && (
                <>
                  <div>
                    <Label>{t.subjects} *</Label>
                    <Input
                      value={formData.subjects}
                      onChange={(e) => handleInputChange('subjects', e.target.value)}
                      placeholder={t.subjectsPlaceholder}
                      required
                    />
                  </div>
                  
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>{t.preferredDays}</Label>
                      <Select value={formData.preferredDays} onValueChange={(value) => handleInputChange('preferredDays', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'bn' ? 'নির্বাচন করুন' : 'Select'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="2">2 {language === 'bn' ? 'দিন' : 'days'}</SelectItem>
                          <SelectItem value="3">3 {language === 'bn' ? 'দিন' : 'days'}</SelectItem>
                          <SelectItem value="4">4 {language === 'bn' ? 'দিন' : 'days'}</SelectItem>
                          <SelectItem value="5">5 {language === 'bn' ? 'দিন' : 'days'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <Label>{t.sessionDuration}</Label>
                      <Select value={formData.sessionDuration} onValueChange={(value) => handleInputChange('sessionDuration', value)}>
                        <SelectTrigger>
                          <SelectValue placeholder={language === 'bn' ? 'নির্বাচন করুন' : 'Select'} />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1">1 {language === 'bn' ? 'ঘন্টা' : 'hour'}</SelectItem>
                          <SelectItem value="1.5">1.5 {language === 'bn' ? 'ঘন্টা' : 'hours'}</SelectItem>
                          <SelectItem value="2">2 {language === 'bn' ? 'ঘন্টা' : 'hours'}</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  
                  <div>
                    <Label>{t.freeOrPaid}</Label>
                    <RadioGroup value={formData.freeOrPaid} onValueChange={(value) => handleInputChange('freeOrPaid', value)}>
                      <div className="flex gap-4">
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="free" id="free" />
                          <Label htmlFor="free">{t.free}</Label>
                        </div>
                        <div className="flex items-center gap-2">
                          <RadioGroupItem value="paid" id="paid" />
                          <Label htmlFor="paid">{t.paid}</Label>
                        </div>
                      </div>
                    </RadioGroup>
                  </div>
                </>
              )}

              {/* Cover Letter */}
              <div className="pt-4 border-t">
                <div className="mb-2">
                  <Label className="flex items-center gap-2">
                    <Heart className="w-4 h-4 text-rose-600" />
                    {t.coverLetterLabel} *
                  </Label>
                  <p className="text-xs text-gray-500 mt-1">{t.coverLetterHelper}</p>
                </div>
                <Textarea
                  value={formData.coverLetter}
                  onChange={(e) => handleInputChange('coverLetter', e.target.value)}
                  placeholder={t.coverLetterPlaceholder}
                  rows={6}
                  required
                  className="resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {formData.coverLetter.length} / {language === 'bn' ? 'কমপক্ষে ৫০' : 'minimum 50'}
                </p>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {currentStep === 3 && (
            <div className="space-y-4 max-w-2xl mx-auto">
              <div className="bg-blue-50 border-2 border-blue-200 rounded-lg p-4">
                <div className="flex items-start gap-2">
                  <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
                  <p className="text-sm text-blue-800">{t.docsHelper}</p>
                </div>
              </div>
              
              {/* Upload Area */}
              <div>
                <input
                  type="file"
                  id="docUpload"
                  accept="image/*,.pdf"
                  multiple
                  onChange={handleDocUpload}
                  className="hidden"
                  disabled={isUploadingDoc || uploadedDocs.length >= 5}
                />
                <label htmlFor="docUpload">
                  <div className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                    uploadedDocs.length >= 5
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                      : 'border-teal-300 bg-teal-50 hover:border-teal-400 hover:bg-teal-100'
                  }`}>
                    {isUploadingDoc ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-10 h-10 text-teal-600 animate-spin" />
                        <p className="text-sm text-gray-600">
                          {language === 'bn' ? 'আপলোড হচ্ছে...' : 'Uploading...'}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-10 h-10 text-teal-600" />
                        <p className="text-gray-700">{t.clickToUpload}</p>
                        <p className="text-xs text-gray-500">
                          {language === 'bn' 
                            ? `${uploadedDocs.length}/5 টি ডকুমেন্ট` 
                            : `${uploadedDocs.length}/5 documents`}
                        </p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
              
              {/* Document Preview Grid */}
              {uploadedDocs.length > 0 && (
                <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                  {uploadedDocs.map((doc, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative group aspect-video rounded-lg overflow-hidden border-2 border-gray-200"
                    >
                      {doc.startsWith('data:image') ? (
                        <img src={doc} alt={`Document ${index + 1}`} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                          <FileText className="w-12 h-12 text-gray-400" />
                        </div>
                      )}
                      <button
                        type="button"
                        onClick={() => handleRemoveDoc(index)}
                        className="absolute top-2 right-2 w-7 h-7 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Step 4: Verification */}
          {currentStep === 4 && (
            <div className="space-y-6 max-w-2xl mx-auto">
              <div className="bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 rounded-lg p-6">
                <h3 className="text-lg text-gray-900 mb-4">{t.verification}</h3>
                <p className="text-gray-700 mb-4">{t.verifyInfo}:</p>
                <div className="space-y-2 text-gray-700">
                  <p>{t.verifyItem1}</p>
                  <p>{t.verifyItem2}</p>
                  <p>{t.verifyItem3}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 p-4 border-2 border-gray-200 rounded-lg">
                <input
                  type="checkbox"
                  id="agreeTerms"
                  checked={agreeTerms}
                  onChange={(e) => setAgreeTerms(e.target.checked)}
                  className="w-5 h-5 mt-1"
                />
                <label htmlFor="agreeTerms" className="text-gray-700 cursor-pointer">
                  <strong>{t.agreeTerms}</strong>
                </label>
              </div>
              
              {/* Summary */}
              <div className="bg-white border-2 border-gray-200 rounded-lg p-6">
                <h4 className="text-gray-900 mb-4">
                  {language === 'bn' ? '📋 আবেদন সারাংশ' : '📋 Application Summary'}
                </h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.applicationType}:</span>
                    <strong className="text-gray-900">
                      {applicationTypes.find(t => t.id === applicationType)?.name}
                    </strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.title_label}:</span>
                    <strong className="text-gray-900">{formData.title}</strong>
                  </div>
                  {applicationType === 'scholarship' && (
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.amount}:</span>
                      <strong className="text-gray-900">৳ {formData.amount}</strong>
                    </div>
                  )}
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t.documents}:</span>
                    <strong className="text-gray-900">{uploadedDocs.length} {language === 'bn' ? 'টি' : ''}</strong>
                  </div>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation Buttons */}
      <div className="flex items-center justify-between gap-4 pt-6 border-t max-w-2xl mx-auto">
        <div className="flex gap-2">
          {currentStep > 1 && (
            <Button
              variant="outline"
              onClick={handleBack}
              disabled={isSubmitting}
            >
              {t.back}
            </Button>
          )}
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
          >
            {t.cancel}
          </Button>
        </div>
        
        <div>
          {currentStep < 4 ? (
            <Button
              onClick={handleNext}
              className="btn-primary min-w-[120px]"
            >
              {t.next}
            </Button>
          ) : (
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting || !agreeTerms}
              className="btn-primary min-w-[160px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.submitting}
                </>
              ) : (
                <>
                  <CheckCircle2 className="w-4 h-4 mr-2" />
                  {t.submit}
                </>
              )}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}
