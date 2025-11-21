import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';
import { Badge } from './ui/badge';
import { X, Plus, DollarSign, Clock, MapPin, BookOpen, Users, Globe2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import type { User } from '../utils/authGuard';
import { mediums } from '../utils/mediumData';
import { ModernLocationPicker, type LocationData } from './ModernLocationPicker';
import { tuitionPostsAPI } from '../utils/databaseService';

interface PostTuitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'bn' | 'en';
  currentUser?: User | null;
  userRole?: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor' | null;
}

const content = {
  bn: {
    title: 'টিউশন পোস্ট করুন',
    description: 'আপনার প্রয়োজনীয় তথ্য দিয়ে একটি টিউশন পোস্ট তৈরি করুন',
    jobTitle: 'টিউশন শিরোনাম',
    jobTitlePlaceholder: 'উদাঃ ক্লাস ১০ - গণিত ও পদার্থবিজ্ঞানের শিক্ষক প্রয়োজন',
    description: 'বিস্তারিত বিবরণ',
    descriptionPlaceholder: 'আপনার প্রয়োজনীয়তা বিস্তারিত লিখুন...',
    subjects: 'বিষয়সমূহ',
    addSubject: 'বিষয় যোগ করুন',
    studentClass: 'ছাত্র/ছাত্রীর ক্লাস',
    selectClass: 'ক্লাস নির্বাচন করুন',
    medium: 'মিডিয়াম',
    selectMedium: 'মিডিয়াম নির্বাচন করুন',
    location: 'স্থান',
    locationPlaceholder: 'উদাঃ ধানমন্ডি, ঢাকা',
    budget: 'বাজেট (মাসিক)',
    minBudget: 'সর্বনিম্ন',
    maxBudget: 'সর্বোচ্চ',
    duration: 'সময়কাল',
    durationPlaceholder: 'উদাঃ ৬ মাস',
    schedule: 'সময়সূচী',
    schedulePlaceholder: 'উদাঃ ৫ দিন/সপ্তাহ, ২ ঘণ্টা/দিন',
    preferences: 'পছন্দসই',
    gender: 'লিঙ্গ',
    selectGender: 'লিঙ্গ নির্বাচন করুন',
    male: 'পুরুষ',
    female: 'মহিলা',
    any: 'যেকোনো',
    experience: 'অভিজ্ঞতা',
    experiencePlaceholder: 'উদাঃ ৩+ বছর',
    qualification: 'যোগ্যতা',
    qualificationPlaceholder: 'উদাঃ বিশ্ববিদ্যালয় স্নাতক',
    cancel: 'বাতিল',
    post: 'পোস্ট করুন',
    posting: 'পোস্ট হচ্ছে...',
    success: 'টিউশন পোস্ট সফলভাবে তৈরি হয়েছে!',
    fillRequired: 'সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন',
    urgent: 'জরুরি পোস্ট হিসেবে চিহ্নিত করুন',
    featured: 'বৈশিষ্ট্যযুক্ত পোস্ট করুন (অতিরিক্ত ২০ ক্রেডিট)',
    guardianOnly: 'শুধুমাত্র অভিভাবকরা টিউশন পোস্ট করতে পারবেন',
    unauthorizedAccess: 'অননুমোদিত প্রবেশ প্রচেষ্টা',
  },
  en: {
    title: 'Post a Tuition',
    description: 'Create a tuition post with your requirements',
    jobTitle: 'Tuition Title',
    jobTitlePlaceholder: 'e.g., Class 10 - Math and Physics Tutor Needed',
    description: 'Detailed Description',
    descriptionPlaceholder: 'Describe your requirements in detail...',
    subjects: 'Subjects',
    addSubject: 'Add Subject',
    studentClass: 'Student Class',
    selectClass: 'Select Class',
    medium: 'Medium',
    selectMedium: 'Select Medium',
    location: 'Location',
    locationPlaceholder: 'e.g., Dhanmondi, Dhaka',
    budget: 'Budget (Monthly)',
    minBudget: 'Minimum',
    maxBudget: 'Maximum',
    duration: 'Duration',
    durationPlaceholder: 'e.g., 6 months',
    schedule: 'Schedule',
    schedulePlaceholder: 'e.g., 5 days/week, 2 hours/day',
    preferences: 'Preferences',
    gender: 'Gender',
    selectGender: 'Select Gender',
    male: 'Male',
    female: 'Female',
    any: 'Any',
    experience: 'Experience',
    experiencePlaceholder: 'e.g., 3+ years',
    qualification: 'Qualification',
    qualificationPlaceholder: 'e.g., University Graduate',
    cancel: 'Cancel',
    post: 'Post',
    posting: 'Posting...',
    success: 'Tuition post created successfully!',
    fillRequired: 'Please fill all required fields',
    urgent: 'Mark as urgent',
    featured: 'Make it featured (20 credits extra)',
    guardianOnly: 'Only guardians can post tuitions',
    unauthorizedAccess: 'Unauthorized access attempt',
  },
};

export function PostTuitionDialog({ 
  open, 
  onOpenChange, 
  language,
  currentUser = null,
  userRole = null
}: PostTuitionDialogProps) {
  const t = content[language];
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Security check: Verify that only guardians can use this dialog
  // This is a second layer of security in addition to the button check
  if (open && userRole !== 'guardian') {
    toast.error(t.guardianOnly);
    console.warn('Unauthorized access attempt to PostTuitionDialog by role:', userRole);
    onOpenChange(false);
    return null;
  }
  
  // Form state
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [subjects, setSubjects] = useState<string[]>([]);
  const [newSubject, setNewSubject] = useState('');
  const [studentClass, setStudentClass] = useState('');
  const [medium, setMedium] = useState('');
  const [location, setLocation] = useState('');
  const [minBudget, setMinBudget] = useState('');
  const [maxBudget, setMaxBudget] = useState('');
  const [duration, setDuration] = useState('');
  const [schedule, setSchedule] = useState('');
  const [gender, setGender] = useState('any');
  const [experience, setExperience] = useState('');
  const [qualification, setQualification] = useState('');
  const [isUrgent, setIsUrgent] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [showLocationPicker, setShowLocationPicker] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState<LocationData | null>(null);

  const handleAddSubject = () => {
    if (newSubject.trim() && !subjects.includes(newSubject.trim())) {
      setSubjects([...subjects, newSubject.trim()]);
      setNewSubject('');
    }
  };

  const handleRemoveSubject = (subject: string) => {
    setSubjects(subjects.filter(s => s !== subject));
  };

  const handleSubmit = async () => {
    // Validation
    if (!title || !description || subjects.length === 0 || !studentClass || !medium || !location || !minBudget || !maxBudget || !schedule) {
      toast.error(t.fillRequired);
      return;
    }

    setIsSubmitting(true);

    try {
      // Create new tuition post
      const newPost = {
        id: `job-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
        title,
        subject: subjects.join(', '),
        class: studentClass,
        medium: medium,
        location,
        salary: parseInt(maxBudget),
        minSalary: parseInt(minBudget),
        schedule,
        duration: duration || '6 মাস',
        guardianId: currentUser?.id || 'guardian-unknown',
        guardianName: currentUser?.name || 'Unknown',
        guardianPhone: currentUser?.phone || '',
        postedDate: new Date().toISOString(),
        status: 'open',
        description: description,
        gender: gender,
        experience: experience,
        qualification: qualification,
        isUrgent: isUrgent,
        isFeatured: isFeatured,
        subjects: subjects,
      };

      // Save to database
      const savedPost = await tuitionPostsAPI.create({
        title: newPost.title,
        description: newPost.description,
        subjects: newPost.subjects,
        classes: [newPost.studentClass],
        medium: newPost.medium,
        location: newPost.location,
        budget: {
          min: newPost.minBudget,
          max: newPost.maxBudget
        },
        urgent: newPost.isUrgent,
        status: 'open',
        guardianId: currentUser?.id || 'guest',
        guardianName: currentUser?.name || 'Guardian',
        guardianPhone: currentUser?.phone || '',
        applicants: 0
      });

      if (savedPost) {
        // Also save to localStorage for backward compatibility
        const existingPosts = JSON.parse(localStorage.getItem('tuitionPosts') || '[]');
        existingPosts.push(newPost);
        localStorage.setItem('tuitionPosts', JSON.stringify(existingPosts));

        toast.success(t.success, {
          description: isUrgent 
            ? (language === 'bn' ? 'আপনার জরুরি পোস্ট হোম পেজে দেখা যাবে' : 'Your urgent post will appear on home page')
            : undefined
        });
        
        setIsSubmitting(false);
        onOpenChange(false);
        
        // Reset form
        resetForm();
      } else {
        throw new Error('Failed to save post');
      }
    } catch (error) {
      toast.error(language === 'bn' ? 'পোস্ট তৈরিতে সমস্যা হয়েছে' : 'Failed to create post');
      setIsSubmitting(false);
    }
  };

  const handleLocationSelect = (loc: LocationData) => {
    setSelectedLocation(loc);
    setLocation(loc.address);
    toast.success(language === 'bn' 
      ? `অবস্থান নির্বাচিত: ${loc.city || loc.address}`
      : `Location selected: ${loc.city || loc.address}`
    );
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setSubjects([]);
    setNewSubject('');
    setStudentClass('');
    setMedium('');
    setLocation('');
    setSelectedLocation(null);
    setMinBudget('');
    setMaxBudget('');
    setDuration('');
    setSchedule('');
    setGender('any');
    setExperience('');
    setQualification('');
    setIsUrgent(false);
    setIsFeatured(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">{t.jobTitle} *</Label>
            <Input
              id="title"
              placeholder={t.jobTitlePlaceholder}
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">{t.description} *</Label>
            <Textarea
              id="description"
              placeholder={t.descriptionPlaceholder}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              rows={4}
            />
          </div>

          {/* Subjects */}
          <div className="space-y-2">
            <Label>{t.subjects} *</Label>
            <div className="flex gap-2">
              <Input
                placeholder={t.addSubject}
                value={newSubject}
                onChange={(e) => setNewSubject(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleAddSubject()}
              />
              <Button type="button" onClick={handleAddSubject}>
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {subjects.map((subject) => (
                <Badge key={subject} variant="secondary" className="text-sm">
                  <BookOpen className="w-3 h-3 mr-1" />
                  {subject}
                  <button
                    onClick={() => handleRemoveSubject(subject)}
                    className="ml-2 hover:text-red-600"
                  >
                    <X className="w-3 h-3" />
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          {/* Grid Layout for Class, Medium, and Location */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>{t.studentClass} *</Label>
              <Select value={studentClass} onValueChange={setStudentClass}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectClass} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="ক্লাস ১">ক্লাস ১</SelectItem>
                  <SelectItem value="ক্লাস ২">ক্লাস ২</SelectItem>
                  <SelectItem value="ক্লাস ৩">ক্লাস ৩</SelectItem>
                  <SelectItem value="ক্লাস ৪">ক্লাস ৪</SelectItem>
                  <SelectItem value="ক্লাস ৫">ক্লাস ৫</SelectItem>
                  <SelectItem value="ক্লাস ৬">ক্লাস ৬</SelectItem>
                  <SelectItem value="ক্লাস ৭">ক্লাস ৭</SelectItem>
                  <SelectItem value="ক্লাস ৮">ক্লাস ৮</SelectItem>
                  <SelectItem value="ক্লাস ৯">ক্লাস ৯</SelectItem>
                  <SelectItem value="ক্লাস ১০">ক্লাস ১০</SelectItem>
                  <SelectItem value="HSC">HSC</SelectItem>
                  <SelectItem value="O Level">O Level</SelectItem>
                  <SelectItem value="A Level">A Level</SelectItem>
                  <SelectItem value="Adult Learning">Adult Learning</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>
                <Globe2 className="w-4 h-4 inline mr-1" />
                {t.medium} *
              </Label>
              <Select value={medium} onValueChange={setMedium}>
                <SelectTrigger>
                  <SelectValue placeholder={t.selectMedium} />
                </SelectTrigger>
                <SelectContent>
                  {mediums.map((m) => (
                    <SelectItem key={m.id} value={language === 'bn' ? m.name.bn : m.name.en}>
                      {m.icon} {language === 'bn' ? m.name.bn : m.name.en}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Location with Map */}
          <div className="space-y-2">
            <Label htmlFor="location">
              <MapPin className="w-4 h-4 inline mr-1" />
              {t.location} *
            </Label>
            <div className="space-y-2">
              <Button
                type="button"
                variant="outline"
                className="w-full justify-start text-left font-normal"
                onClick={() => setShowLocationPicker(true)}
              >
                <MapPin className="mr-2 h-4 w-4" />
                {selectedLocation 
                  ? (language === 'bn' 
                      ? `${selectedLocation.city || selectedLocation.address}` 
                      : `${selectedLocation.city || selectedLocation.address}`)
                  : (language === 'bn' ? 'মানচিত্রে অবস্থান নির্বাচন করুন' : 'Select location on map')
                }
              </Button>
              {selectedLocation && (
                <p className="text-xs text-gray-500 truncate">
                  {selectedLocation.address}
                </p>
              )}
              <Input
                id="location"
                placeholder={t.locationPlaceholder}
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2"
              />
            </div>
          </div>

          {/* Budget */}
          <div className="space-y-2">
            <Label>
              <DollarSign className="w-4 h-4 inline mr-1" />
              {t.budget}
            </Label>
            <div className="grid md:grid-cols-2 gap-4">
              <Input
                type="number"
                placeholder={t.minBudget}
                value={minBudget}
                onChange={(e) => setMinBudget(e.target.value)}
              />
              <Input
                type="number"
                placeholder={t.maxBudget}
                value={maxBudget}
                onChange={(e) => setMaxBudget(e.target.value)}
              />
            </div>
          </div>

          {/* Duration and Schedule */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="duration">
                <Clock className="w-4 h-4 inline mr-1" />
                {t.duration}
              </Label>
              <Input
                id="duration"
                placeholder={t.durationPlaceholder}
                value={duration}
                onChange={(e) => setDuration(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="schedule">{t.schedule} *</Label>
              <Input
                id="schedule"
                placeholder={t.schedulePlaceholder}
                value={schedule}
                onChange={(e) => setSchedule(e.target.value)}
              />
            </div>
          </div>

          {/* Preferences Section */}
          <div className="border-t pt-4">
            <h3 className="text-lg mb-4">{t.preferences}</h3>
            
            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label>
                  <Users className="w-4 h-4 inline mr-1" />
                  {t.gender}
                </Label>
                <Select value={gender} onValueChange={setGender}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t.any}</SelectItem>
                    <SelectItem value="male">{t.male}</SelectItem>
                    <SelectItem value="female">{t.female}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="experience">{t.experience}</Label>
                <Input
                  id="experience"
                  placeholder={t.experiencePlaceholder}
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="qualification">{t.qualification}</Label>
                <Input
                  id="qualification"
                  placeholder={t.qualificationPlaceholder}
                  value={qualification}
                  onChange={(e) => setQualification(e.target.value)}
                />
              </div>
            </div>
          </div>

          {/* Options */}
          <div className="space-y-2 border-t pt-4">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isUrgent}
                onChange={(e) => setIsUrgent(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">{t.urgent}</span>
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isFeatured}
                onChange={(e) => setIsFeatured(e.target.checked)}
                className="w-4 h-4"
              />
              <span className="text-sm">{t.featured}</span>
            </label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.cancel}
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-gradient-to-r from-blue-600 to-purple-600"
          >
            {isSubmitting ? t.posting : t.post}
          </Button>
        </DialogFooter>
      </DialogContent>

      {/* Modern Location Picker */}
      <ModernLocationPicker
        open={showLocationPicker}
        onOpenChange={setShowLocationPicker}
        onLocationSelect={handleLocationSelect}
        initialLocation={selectedLocation || undefined}
        language={language}
      />
    </Dialog>
  );
}
