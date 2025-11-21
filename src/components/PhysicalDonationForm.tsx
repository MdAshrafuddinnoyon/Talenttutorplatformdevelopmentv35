import { useState } from 'react';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { 
  Book, 
  Shirt, 
  Package, 
  Upload, 
  CheckCircle,
  AlertCircle,
  Loader2,
  X,
  Image as ImageIcon,
  Camera,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { motion } from 'motion/react';

interface PhysicalDonationFormProps {
  language: 'bn' | 'en';
  donationType: 'books' | 'uniform' | 'stationery';
  currentUser?: any;
  onSuccess: () => void;
  onLoginRequired: () => void;
}

const content = {
  bn: {
    // Form Headers
    booksTitle: 'বই ও শিক্ষা উপকরণ দান',
    uniformTitle: 'ইউনিফর্ম ও পোশাক দান',
    stationeryTitle: 'স্টেশনারি দান',
    
    // Common Fields
    itemName: 'আইটেমের নাম',
    itemNamePlaceholder: 'যেমন: ক্লাস ৮ বিজ্ঞান বই',
    quantity: 'সংখ্যা',
    quantityPlaceholder: '১',
    condition: 'অবস্থা',
    selectCondition: 'অবস্থা নির্বাচন করুন',
    new: 'নতুন',
    likeNew: 'প্রায় নতুন',
    excellent: 'চমৎকার',
    good: 'ভালো',
    fair: 'মোটামুটি',
    description: 'বিস্তারিত',
    descriptionPlaceholder: 'আইটেম সম্পর্কে বিস্তারিত লিখুন...',
    
    // Book Specific
    subject: 'বিষয়',
    subjectPlaceholder: 'যেমন: গণিত, বিজ্ঞান',
    class: 'শ্রেণী',
    classPlaceholder: 'যেমন: ক্লাস ৮',
    
    // Uniform Specific
    size: 'সাইজ',
    selectSize: 'সাইজ নির্বাচন করুন',
    gender: 'লিঙ্গ',
    selectGender: 'লিঙ্গ নির্বাচন করুন',
    boys: 'ছেলেদের',
    girls: 'মেয়েদের',
    unisex: 'ইউনিসেক্স',
    
    // Stationery Specific
    itemType: 'আইটেমের ধরন',
    selectType: 'ধরন নির্বাচন করুন',
    notebooks: 'খাতা',
    pens: 'কলম',
    pencils: 'পেন্সিল',
    colors: 'রং',
    geometry: 'জ্যামিতি বক্স',
    calculator: 'ক্যালকুলেটর',
    other: 'অন্যান্য',
    
    // Donor Information
    donorInfo: 'দাতার তথ্য',
    yourName: 'আপনার নাম',
    namePlaceholder: 'পূর্ণ নাম লিখুন',
    email: 'ইমেইল',
    emailPlaceholder: 'example@email.com',
    phone: 'মোবাইল',
    phonePlaceholder: '০১৭১২৩৪৫৬৭৮',
    address: 'ঠিকানা',
    addressPlaceholder: 'এলাকা, শহর',
    
    // Photos
    uploadPhotos: 'ছবি আপলোড করুন (ঐচ্ছিক)',
    clickToUpload: 'ক্লিক করে ছবি আপলোড করুন',
    
    // Actions
    submit: 'দান জমা দিন',
    submitting: 'জমা হচ্ছে...',
    cancel: 'বাতিল',
    
    // Messages
    loginRequired: 'দান করতে আপনাকে রেজিস্ট্রেশন করতে হবে',
    loginButton: 'রেজিস্ট্রেশন করুন',
    successMessage: 'আপনার দান সফলভাবে জমা হয়েছে! এডমিন অনুমোদনের পরে লাইব্রেরিতে প্রদর্শিত হবে।',
    errorMessage: 'দান জমা দিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।',
    
    // Info
    approvalNote: '* আপনার দান এডমিন কর্তৃক যাচাই এবং অনুমোদিত হওয়ার পর লাইব্রেরিতে প্রদর্শিত হবে।',
    contactNote: 'কোনো শিক্ষার্থী আপনার দান গ্রহণ করতে চাইলে আমরা আপনার সাথে যোগাযোগ করব।',
  },
  en: {
    booksTitle: 'Donate Books & Materials',
    uniformTitle: 'Donate Uniform & Clothing',
    stationeryTitle: 'Donate Stationery',
    
    itemName: 'Item Name',
    itemNamePlaceholder: 'e.g., Class 8 Science Book',
    quantity: 'Quantity',
    quantityPlaceholder: '1',
    condition: 'Condition',
    selectCondition: 'Select Condition',
    new: 'New',
    likeNew: 'Like New',
    excellent: 'Excellent',
    good: 'Good',
    fair: 'Fair',
    description: 'Description',
    descriptionPlaceholder: 'Write details about the item...',
    
    subject: 'Subject',
    subjectPlaceholder: 'e.g., Math, Science',
    class: 'Class',
    classPlaceholder: 'e.g., Class 8',
    
    size: 'Size',
    selectSize: 'Select Size',
    gender: 'Gender',
    selectGender: 'Select Gender',
    boys: 'Boys',
    girls: 'Girls',
    unisex: 'Unisex',
    
    itemType: 'Item Type',
    selectType: 'Select Type',
    notebooks: 'Notebooks',
    pens: 'Pens',
    pencils: 'Pencils',
    colors: 'Colors',
    geometry: 'Geometry Box',
    calculator: 'Calculator',
    other: 'Other',
    
    donorInfo: 'Donor Information',
    yourName: 'Your Name',
    namePlaceholder: 'Enter full name',
    email: 'Email',
    emailPlaceholder: 'example@email.com',
    phone: 'Phone',
    phonePlaceholder: '01712345678',
    address: 'Address',
    addressPlaceholder: 'Area, City',
    
    uploadPhotos: 'Upload Photos (Optional)',
    clickToUpload: 'Click to upload photos',
    
    submit: 'Submit Donation',
    submitting: 'Submitting...',
    cancel: 'Cancel',
    
    loginRequired: 'You need to register to donate',
    loginButton: 'Register',
    successMessage: 'Your donation has been submitted successfully! It will be shown in the library after admin approval.',
    errorMessage: 'Error submitting donation. Please try again.',
    
    approvalNote: '* Your donation will be displayed in the library after admin verification and approval.',
    contactNote: 'We will contact you when a student wants to receive your donation.',
  },
};

export function PhysicalDonationForm({ 
  language, 
  donationType, 
  currentUser,
  onSuccess,
  onLoginRequired 
}: PhysicalDonationFormProps) {
  const t = content[language];
  
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: '1',
    condition: '',
    description: '',
    subject: '',
    class: '',
    size: '',
    gender: '',
    itemType: '',
    donorName: '',
    email: '',
    phone: '',
    address: '',
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [uploadedPhotos, setUploadedPhotos] = useState<string[]>([]);
  const [isUploadingPhoto, setIsUploadingPhoto] = useState(false);
  
  const getTitle = () => {
    switch (donationType) {
      case 'books':
        return t.booksTitle;
      case 'uniform':
        return t.uniformTitle;
      case 'stationery':
        return t.stationeryTitle;
      default:
        return t.booksTitle;
    }
  };
  
  const getIcon = () => {
    switch (donationType) {
      case 'books':
        return Book;
      case 'uniform':
        return Shirt;
      case 'stationery':
        return Package;
      default:
        return Book;
    }
  };
  
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };
  
  const handlePhotoUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;
    
    // Check total photos limit (max 5)
    if (uploadedPhotos.length + files.length > 5) {
      toast.error(language === 'bn' ? 'সর্বোচ্চ ৫টি ছবি আপলোড করতে পারবেন' : 'Maximum 5 photos allowed');
      return;
    }
    
    setIsUploadingPhoto(true);
    
    try {
      const newPhotos: string[] = [];
      
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        
        // Check file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
          toast.error(`${file.name}: ${language === 'bn' ? 'ফাইল সাইজ ৫MB এর বেশি' : 'File size exceeds 5MB'}`);
          continue;
        }
        
        // Check file type
        if (!file.type.startsWith('image/')) {
          toast.error(`${file.name}: ${language === 'bn' ? 'শুধুমাত্র ছবি আপলোড করুন' : 'Only images allowed'}`);
          continue;
        }
        
        // Convert to base64 for demo purposes
        // In production, upload to Supabase Storage
        const reader = new FileReader();
        const photoData = await new Promise<string>((resolve) => {
          reader.onloadend = () => resolve(reader.result as string);
          reader.readAsDataURL(file);
        });
        
        newPhotos.push(photoData);
      }
      
      setUploadedPhotos(prev => [...prev, ...newPhotos]);
      toast.success(language === 'bn' ? `${newPhotos.length}টি ছবি আপলোড হয়েছে` : `${newPhotos.length} photo(s) uploaded`);
    } catch (error) {
      console.error('Photo upload error:', error);
      toast.error(language === 'bn' ? 'ছবি আপলোড করতে সমস্যা হয়েছে' : 'Error uploading photos');
    } finally {
      setIsUploadingPhoto(false);
    }
  };
  
  const handleRemovePhoto = (index: number) => {
    setUploadedPhotos(prev => prev.filter((_, i) => i !== index));
    toast.success(language === 'bn' ? 'ছবি মুছে ফেলা হয়েছে' : 'Photo removed');
  };
  
  const validateForm = () => {
    if (!formData.itemName) {
      toast.error(language === 'bn' ? 'আইটেমের নাম দিন' : 'Enter item name');
      return false;
    }
    if (!formData.quantity) {
      toast.error(language === 'bn' ? 'সংখ্যা দিন' : 'Enter quantity');
      return false;
    }
    if (!formData.condition) {
      toast.error(language === 'bn' ? 'অবস্থা নির্বাচন করুন' : 'Select condition');
      return false;
    }
    if (!formData.donorName) {
      toast.error(language === 'bn' ? 'আপনার নাম দিন' : 'Enter your name');
      return false;
    }
    if (!formData.phone) {
      toast.error(language === 'bn' ? 'মোবাইল নম্বর দিন' : 'Enter phone number');
      return false;
    }
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Check if user is registered (has donor account)
    if (!currentUser || currentUser.role !== 'donor') {
      toast.error(t.loginRequired);
      onLoginRequired();
      return;
    }
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Submit to backend for admin approval
      const response = await fetch(`https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/physical-donations/submit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${publicAnonKey}`,
        },
        body: JSON.stringify({
          donationType,
          ...formData,
          photos: uploadedPhotos,
          donorId: currentUser.id,
          status: 'pending_approval',
          submittedAt: new Date().toISOString(),
        }),
      });
      
      if (response.ok) {
        toast.success(t.successMessage);
        setFormData({
          itemName: '',
          quantity: '1',
          condition: '',
          description: '',
          subject: '',
          class: '',
          size: '',
          gender: '',
          itemType: '',
          donorName: '',
          email: '',
          phone: '',
          address: '',
        });
        onSuccess();
      } else {
        throw new Error('Submission failed');
      }
    } catch (error) {
      console.error('Error submitting donation:', error);
      toast.error(t.errorMessage);
    } finally {
      setIsSubmitting(false);
    }
  };
  
  const Icon = getIcon();
  
  return (
    <Card className="p-6 max-w-2xl mx-auto">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-2">
          <div className="p-3 bg-gradient-to-br from-teal-500 to-cyan-500 rounded-lg">
            <Icon className="w-6 h-6 text-white" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900">{getTitle()}</h2>
        </div>
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
          <div className="flex items-start gap-2">
            <AlertCircle className="w-5 h-5 text-blue-600 mt-0.5" />
            <div className="text-sm text-blue-800">
              <p className="mb-1">{t.approvalNote}</p>
              <p>{t.contactNote}</p>
            </div>
          </div>
        </div>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Item Details Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
            {language === 'bn' ? 'দানের বিবরণ' : 'Donation Details'}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="itemName">{t.itemName} *</Label>
              <Input
                id="itemName"
                value={formData.itemName}
                onChange={(e) => handleInputChange('itemName', e.target.value)}
                placeholder={t.itemNamePlaceholder}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="quantity">{t.quantity} *</Label>
              <Input
                id="quantity"
                type="number"
                min="1"
                value={formData.quantity}
                onChange={(e) => handleInputChange('quantity', e.target.value)}
                placeholder={t.quantityPlaceholder}
                required
              />
            </div>
          </div>
          
          {/* Book Specific Fields */}
          {donationType === 'books' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="subject">{t.subject}</Label>
                <Input
                  id="subject"
                  value={formData.subject}
                  onChange={(e) => handleInputChange('subject', e.target.value)}
                  placeholder={t.subjectPlaceholder}
                />
              </div>
              
              <div>
                <Label htmlFor="class">{t.class}</Label>
                <Input
                  id="class"
                  value={formData.class}
                  onChange={(e) => handleInputChange('class', e.target.value)}
                  placeholder={t.classPlaceholder}
                />
              </div>
            </div>
          )}
          
          {/* Uniform Specific Fields */}
          {donationType === 'uniform' && (
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="size">{t.size}</Label>
                <Select value={formData.size} onValueChange={(value) => handleInputChange('size', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectSize} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="XS">XS</SelectItem>
                    <SelectItem value="S">S</SelectItem>
                    <SelectItem value="M">M</SelectItem>
                    <SelectItem value="L">L</SelectItem>
                    <SelectItem value="XL">XL</SelectItem>
                    <SelectItem value="XXL">XXL</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="gender">{t.gender}</Label>
                <Select value={formData.gender} onValueChange={(value) => handleInputChange('gender', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectGender} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="boys">{t.boys}</SelectItem>
                    <SelectItem value="girls">{t.girls}</SelectItem>
                    <SelectItem value="unisex">{t.unisex}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
          
          {/* Stationery Specific Fields */}
          {donationType === 'stationery' && (
            <div>
              <Label htmlFor="itemType">{t.itemType}</Label>
              <Select value={formData.itemType} onValueChange={(value) => handleInputChange('itemType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectType} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="notebooks">{t.notebooks}</SelectItem>
                  <SelectItem value="pens">{t.pens}</SelectItem>
                  <SelectItem value="pencils">{t.pencils}</SelectItem>
                  <SelectItem value="colors">{t.colors}</SelectItem>
                  <SelectItem value="geometry">{t.geometry}</SelectItem>
                  <SelectItem value="calculator">{t.calculator}</SelectItem>
                  <SelectItem value="other">{t.other}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          
          <div>
            <Label htmlFor="condition">{t.condition} *</Label>
            <Select value={formData.condition} onValueChange={(value) => handleInputChange('condition', value)} required>
              <SelectTrigger>
                <SelectValue placeholder={t.selectCondition} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="new">{t.new}</SelectItem>
                <SelectItem value="likeNew">{t.likeNew}</SelectItem>
                <SelectItem value="excellent">{t.excellent}</SelectItem>
                <SelectItem value="good">{t.good}</SelectItem>
                <SelectItem value="fair">{t.fair}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <div>
            <Label htmlFor="description">{t.description}</Label>
            <Textarea
              id="description"
              value={formData.description}
              onChange={(e) => handleInputChange('description', e.target.value)}
              placeholder={t.descriptionPlaceholder}
              rows={3}
            />
          </div>
          
          {/* Photo Upload Section */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <Camera className="w-4 h-4" />
              {t.uploadPhotos}
            </Label>
            <div className="space-y-3">
              {/* Upload Button */}
              <div className="relative">
                <input
                  type="file"
                  id="photoUpload"
                  accept="image/*"
                  multiple
                  onChange={handlePhotoUpload}
                  className="hidden"
                  disabled={isUploadingPhoto || uploadedPhotos.length >= 5}
                />
                <label htmlFor="photoUpload">
                  <div className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-all ${
                    uploadedPhotos.length >= 5
                      ? 'border-gray-200 bg-gray-50 cursor-not-allowed'
                      : 'border-teal-300 bg-teal-50 hover:border-teal-400 hover:bg-teal-100'
                  }`}>
                    {isUploadingPhoto ? (
                      <div className="flex flex-col items-center gap-2">
                        <Loader2 className="w-8 h-8 text-teal-600 animate-spin" />
                        <p className="text-sm text-gray-600">
                          {language === 'bn' ? 'আপলোড হচ্ছে...' : 'Uploading...'}
                        </p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center gap-2">
                        <Upload className="w-8 h-8 text-teal-600" />
                        <p className="text-sm text-gray-700">{t.clickToUpload}</p>
                        <p className="text-xs text-gray-500">
                          {language === 'bn' 
                            ? `${uploadedPhotos.length}/5 টি ছবি আপলোড হয়েছে` 
                            : `${uploadedPhotos.length}/5 photos uploaded`}
                        </p>
                      </div>
                    )}
                  </div>
                </label>
              </div>
              
              {/* Photo Preview Grid */}
              {uploadedPhotos.length > 0 && (
                <div className="grid grid-cols-3 gap-3">
                  {uploadedPhotos.map((photo, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      className="relative group aspect-square rounded-lg overflow-hidden border-2 border-gray-200"
                    >
                      <img
                        src={photo}
                        alt={`Photo ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                      <button
                        type="button"
                        onClick={() => handleRemovePhoto(index)}
                        className="absolute top-1 right-1 w-6 h-6 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <X className="w-4 h-4" />
                      </button>
                      <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white text-xs p-1 text-center opacity-0 group-hover:opacity-100 transition-opacity">
                        {language === 'bn' ? 'মুছে ফেলুন' : 'Remove'}
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
              
              {/* Helper Text */}
              <p className="text-xs text-gray-500 flex items-start gap-1">
                <AlertCircle className="w-3 h-3 mt-0.5 flex-shrink-0" />
                <span>
                  {language === 'bn' 
                    ? 'ছবি যুক্ত করলে আপনার দান দ্রুত অনুমোদিত হবে। সর্বোচ্চ ৫টি ছবি (প্রতিটি ৫MB এর কম)'
                    : 'Adding photos will help approve your donation faster. Max 5 photos (each under 5MB)'}
                </span>
              </p>
            </div>
          </div>
        </div>
        
        {/* Donor Information Section */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900 border-b pb-2">
            {t.donorInfo}
          </h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="donorName">{t.yourName} *</Label>
              <Input
                id="donorName"
                value={formData.donorName}
                onChange={(e) => handleInputChange('donorName', e.target.value)}
                placeholder={t.namePlaceholder}
                required
              />
            </div>
            
            <div>
              <Label htmlFor="phone">{t.phone} *</Label>
              <Input
                id="phone"
                value={formData.phone}
                onChange={(e) => handleInputChange('phone', e.target.value)}
                placeholder={t.phonePlaceholder}
                required
              />
            </div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <Label htmlFor="email">{t.email}</Label>
              <Input
                id="email"
                type="email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
                placeholder={t.emailPlaceholder}
              />
            </div>
            
            <div>
              <Label htmlFor="address">{t.address}</Label>
              <Input
                id="address"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                placeholder={t.addressPlaceholder}
              />
            </div>
          </div>
        </div>
        
        {/* Submit Button */}
        <div className="flex items-center justify-end gap-3 pt-4 border-t">
          <Button
            type="submit"
            disabled={isSubmitting}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 min-w-[160px]"
          >
            {isSubmitting ? (
              <>
                <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                {t.submitting}
              </>
            ) : (
              <>
                <CheckCircle className="w-4 h-4 mr-2" />
                {t.submit}
              </>
            )}
          </Button>
        </div>
      </form>
    </Card>
  );
}
