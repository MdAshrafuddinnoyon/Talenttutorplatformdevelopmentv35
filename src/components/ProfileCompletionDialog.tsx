import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  Upload, 
  X, 
  Plus, 
  CheckCircle, 
  AlertCircle,
  Award,
  GraduationCap,
  Briefcase,
  BookOpen,
  Star,
  FileText,
  Globe
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ProfileCompletionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'প্রোফাইল সম্পূর্ণ করুন',
    description: 'আপনার সম্পূর্ণ তথ্য যোগ করুন যাতে অভিভাবকরা সহজেই আপনাকে খুঁজে পান',
    profileCompletion: 'প্রোফাইল সম্পূর্ণতা',
    basicInfo: 'মূল তথ্য',
    education: 'শিক্ষাগত যোগ্যতা',
    experience: 'অভিজ্ঞতা',
    skillsCerts: 'স্কিল ও সার্টিফিকেট',
    subjects: 'বিষয় ও ক্লাস',
    
    // Basic Info
    profilePhoto: 'প্রোফাইল ফটো',
    uploadPhoto: 'ফটো আপলোড করুন',
    fullName: 'পূর্ণ নাম',
    title: 'শিরোনাম/পদবী',
    titlePlaceholder: 'যেমন: SSC/HSC গণিত বিশেষজ্ঞ',
    bio: 'সংক্ষিপ্ত পরিচিতি',
    bioPlaceholder: 'আপনার শিক্ষাদান অভিজ্ঞতা ও বিশেষত্ব সম্পর্কে লিখুন...',
    phone: 'ফোন নম্বর',
    email: 'ইমেইল',
    location: 'ঠিকানা',
    
    // Education
    addEducation: 'শিক্ষাগত যোগ্যতা যোগ করুন',
    degree: 'ডিগ্রি/সনদ',
    institution: 'প্রতিষ্ঠান',
    year: 'বছর',
    remove: 'সরান',
    
    // Experience
    addExperience: 'অভিজ্ঞতা যোগ করুন',
    jobTitle: 'পদবী',
    company: 'প্রতিষ্ঠান/স্কুল',
    duration: 'সময়কাল',
    description: 'বিবরণ',
    
    // Skills & Certifications
    skills: 'দক্ষতা (Skills)',
    addSkill: 'স্কিল যোগ করুন',
    skillPlaceholder: 'যেমন: গণিত, পদার্থবিজ্ঞান',
    certifications: 'সার্টিফিকেট',
    addCertification: 'সার্টিফিকেট যোগ করুন',
    certName: 'সার্টিফিকেটের নাম',
    issuer: 'প্রদানকারী',
    uploadCert: 'সার্টিফিকেট আপলোড করুন',
    verificationNote: 'আপলোড করা সার্টিফিকেট অ্যাডমিন দ্বারা যাচাই করা হবে',
    
    // Subjects & Classes
    teachingSubjects: 'পড়ানোর বিষয়',
    selectSubjects: 'বিষয় নির্বাচন করুন',
    teachingClasses: 'পড়ানোর ক্লাস',
    selectClasses: 'ক্লাস নির্বাচন করুন',
    hourlyRate: 'ঘণ্টা প্রতি রেট (৳)',
    minRate: 'সর্বনিম্ন',
    maxRate: 'সর্বোচ্চ',
    languages: 'ভাষা',
    selectLanguages: 'ভাষা নির্বাচন করুন',
    medium: 'শিক্ষার মাধ্যম',
    selectMedium: 'মাধ্যম নির্বাচন করুন',
    availability: 'প্রাপ্যতা স্ট্যাটাস',
    available: 'Available (পাওয়া যায়)',
    busy: 'Busy (ব্যস্ত)',
    offline: 'Offline (অফলাইন)',
    responseTime: 'রেসপন্স টাইম',
    videoIntro: 'ভিডিও পরিচিতি লিংক',
    videoIntroPlaceholder: 'YouTube/Vimeo লিংক',
    teachingApproach: 'পড়ানোর পদ্ধতি',
    teachingApproachPlaceholder: 'আপনার শিক্ষাদান পদ্ধতি সম্পর্কে লিখুন...',
    
    // Actions
    save: 'সংরক্ষণ করুন',
    cancel: 'বাতিল',
    next: 'পরবর্তী',
    previous: 'পূর্ববর্তী',
    
    // Messages
    incompleteFields: 'সব তথ্য পূরণ করুন',
    savedSuccess: 'প্রোফাইল সফলভাবে সংরক্ষণ করা হয়েছে!',
  },
  en: {
    title: 'Complete Your Profile',
    description: 'Add your complete information so guardians can easily find you',
    profileCompletion: 'Profile Completion',
    basicInfo: 'Basic Info',
    education: 'Education',
    experience: 'Experience',
    skillsCerts: 'Skills & Certifications',
    subjects: 'Subjects & Classes',
    
    profilePhoto: 'Profile Photo',
    uploadPhoto: 'Upload Photo',
    fullName: 'Full Name',
    title: 'Title/Position',
    titlePlaceholder: 'e.g., SSC/HSC Math Expert',
    bio: 'Short Bio',
    bioPlaceholder: 'Write about your teaching experience and expertise...',
    phone: 'Phone Number',
    email: 'Email',
    location: 'Location',
    
    addEducation: 'Add Education',
    degree: 'Degree/Certificate',
    institution: 'Institution',
    year: 'Year',
    remove: 'Remove',
    
    addExperience: 'Add Experience',
    jobTitle: 'Position',
    company: 'Institution/School',
    duration: 'Duration',
    description: 'Description',
    
    skills: 'Skills',
    addSkill: 'Add Skill',
    skillPlaceholder: 'e.g., Math, Physics',
    certifications: 'Certifications',
    addCertification: 'Add Certification',
    certName: 'Certificate Name',
    issuer: 'Issuer',
    uploadCert: 'Upload Certificate',
    verificationNote: 'Uploaded certificates will be verified by admin',
    
    teachingSubjects: 'Teaching Subjects',
    selectSubjects: 'Select Subjects',
    teachingClasses: 'Teaching Classes',
    selectClasses: 'Select Classes',
    hourlyRate: 'Hourly Rate (৳)',
    minRate: 'Minimum',
    maxRate: 'Maximum',
    languages: 'Languages',
    selectLanguages: 'Select Languages',
    medium: 'Medium of Instruction',
    selectMedium: 'Select Medium',
    availability: 'Availability Status',
    available: 'Available',
    busy: 'Busy',
    offline: 'Offline',
    responseTime: 'Response Time',
    videoIntro: 'Video Introduction Link',
    videoIntroPlaceholder: 'YouTube/Vimeo link',
    teachingApproach: 'Teaching Approach',
    teachingApproachPlaceholder: 'Describe your teaching methodology...',
    
    save: 'Save',
    cancel: 'Cancel',
    next: 'Next',
    previous: 'Previous',
    
    incompleteFields: 'Please fill all fields',
    savedSuccess: 'Profile saved successfully!',
  },
};

export function ProfileCompletionDialog({ 
  open, 
  onOpenChange, 
  language 
}: ProfileCompletionDialogProps) {
  const t = content[language];
  
  // State for form data
  const [profileData, setProfileData] = useState({
    name: '',
    title: '',
    bio: '',
    phone: '',
    email: '',
    location: '',
    hourlyRateMin: 500,
    hourlyRateMax: 1000,
    responseTime: '১ ঘণ্টার মধ্যে',
    availability: 'available' as 'available' | 'busy' | 'offline',
    videoIntro: '',
    teachingApproach: '',
  });
  
  const [educationList, setEducationList] = useState<Array<{
    degree: string;
    institution: string;
    year: string;
  }>>([]);
  
  const [experienceList, setExperienceList] = useState<Array<{
    title: string;
    company: string;
    duration: string;
    description: string;
  }>>([]);
  
  const [skills, setSkills] = useState<string[]>([]);
  const [newSkill, setNewSkill] = useState('');
  
  const [certifications, setCertifications] = useState<Array<{
    name: string;
    issuer: string;
    year: string;
    file?: File;
  }>>([]);
  
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [selectedClasses, setSelectedClasses] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedMedium, setSelectedMedium] = useState<string[]>([]);
  
  const [currentTab, setCurrentTab] = useState('basic');
  
  // Calculate profile completion
  const calculateCompletion = () => {
    let completed = 0;
    const total = 8;
    
    if (profileData.name) completed++;
    if (profileData.title) completed++;
    if (profileData.bio) completed++;
    if (educationList.length > 0) completed++;
    if (experienceList.length > 0) completed++;
    if (skills.length > 0) completed++;
    if (selectedSubjects.length > 0) completed++;
    if (selectedClasses.length > 0) completed++;
    if (profileData.location) completed++;
    
    return Math.round((completed / total) * 100);
  };
  
  const completionPercentage = calculateCompletion();
  
  // Available subjects and classes
  const availableSubjects = [
    'গণিত', 'পদার্থবিজ্ঞান', 'রসায়ন', 'জীববিজ্ঞান', 
    'ইংরেজি', 'বাংলা', 'ICT', 'উচ্চতর গণিত'
  ];
  
  const availableClasses = [
    'ক্লাস ১', 'ক্লাস ২', 'ক্লাস ৩', 'ক্লাস ৪', 'ক্লাস ৫',
    'ক্লাস ৬', 'ক্লাস ৭', 'ক্লাস ৮', 'ক্লাস ৯', 'ক্লাস ১০',
    'একাদশ', 'দ্বাদশ', 'HSC', 'SSC'
  ];
  
  const availableLanguages = ['বাংলা', 'English', 'হিন্দি', 'আরবি'];
  const availableMedium = ['বাংলা মাধ্যম', 'ইংরেজি মাধ্যম', 'Both'];
  const availableResponseTimes = [
    '১৫ মিনিটের মধ্যে',
    '৩০ মিনিটের মধ্যে', 
    '১ ঘণ্টার মধ্যে',
    '২ ঘণ্টার মধ্যে',
    '১২ ঘণ্টার মধ্যে',
    '২৪ ঘণ্টার মধ্যে'
  ];
  
  const handleAddEducation = () => {
    setEducationList([...educationList, { degree: '', institution: '', year: '' }]);
  };
  
  const handleRemoveEducation = (index: number) => {
    setEducationList(educationList.filter((_, i) => i !== index));
  };
  
  const handleAddExperience = () => {
    setExperienceList([...experienceList, { title: '', company: '', duration: '', description: '' }]);
  };
  
  const handleRemoveExperience = (index: number) => {
    setExperienceList(experienceList.filter((_, i) => i !== index));
  };
  
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };
  
  const handleRemoveSkill = (skill: string) => {
    setSkills(skills.filter(s => s !== skill));
  };
  
  const handleAddCertification = () => {
    setCertifications([...certifications, { name: '', issuer: '', year: '' }]);
  };
  
  const handleRemoveCertification = (index: number) => {
    setCertifications(certifications.filter((_, i) => i !== index));
  };
  
  const toggleSubject = (subject: string) => {
    if (selectedSubjects.includes(subject)) {
      setSelectedSubjects(selectedSubjects.filter(s => s !== subject));
    } else {
      setSelectedSubjects([...selectedSubjects, subject]);
    }
  };
  
  const toggleClass = (cls: string) => {
    if (selectedClasses.includes(cls)) {
      setSelectedClasses(selectedClasses.filter(c => c !== cls));
    } else {
      setSelectedClasses([...selectedClasses, cls]);
    }
  };
  
  const handleSave = () => {
    // Validate required fields
    if (!profileData.name || !profileData.title || !profileData.bio) {
      toast.error(t.incompleteFields);
      return;
    }
    
    // In real app, save to backend
    console.log('Saving profile:', {
      profileData,
      educationList,
      experienceList,
      skills,
      certifications,
      selectedSubjects,
      selectedClasses,
    });
    
    toast.success(t.savedSuccess);
    onOpenChange(false);
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl">{t.title}</DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>
        
        {/* Profile Completion Progress */}
        <Card className="p-4 bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
          <div className="flex items-center justify-between mb-2">
            <span className="font-medium text-gray-700">{t.profileCompletion}</span>
            <span className="font-bold text-teal-600">{completionPercentage}%</span>
          </div>
          <Progress value={completionPercentage} className="h-2" />
          {completionPercentage < 100 && (
            <p className="text-xs text-gray-600 mt-2 flex items-center gap-1">
              <AlertCircle className="w-3 h-3" />
              সম্পূর্ণ প্রোফাইল বেশি চাকরির সুযোগ বাড়ায়
            </p>
          )}
          {completionPercentage === 100 && (
            <p className="text-xs text-green-600 mt-2 flex items-center gap-1">
              <CheckCircle className="w-3 h-3" />
              প্রোফাইল সম্পূর্ণ! আপনি এখন অভিভাবকদের প্রস্তাব গ্রহণ করতে পারবেন।
            </p>
          )}
        </Card>
        
        <Tabs value={currentTab} onValueChange={setCurrentTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5">
            <TabsTrigger value="basic">{t.basicInfo}</TabsTrigger>
            <TabsTrigger value="education">{t.education}</TabsTrigger>
            <TabsTrigger value="experience">{t.experience}</TabsTrigger>
            <TabsTrigger value="skills">{t.skillsCerts}</TabsTrigger>
            <TabsTrigger value="subjects">{t.subjects}</TabsTrigger>
          </TabsList>
          
          {/* Basic Info Tab */}
          <TabsContent value="basic" className="space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <Label>{t.profilePhoto}</Label>
                <div className="flex items-center gap-4 mt-2">
                  <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center">
                    <Upload className="w-8 h-8 text-gray-400" />
                  </div>
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    {t.uploadPhoto}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label>{t.fullName}</Label>
                <Input
                  value={profileData.name}
                  onChange={(e) => setProfileData({ ...profileData, name: e.target.value })}
                  placeholder={t.fullName}
                />
              </div>
              
              <div>
                <Label>{t.title}</Label>
                <Input
                  value={profileData.title}
                  onChange={(e) => setProfileData({ ...profileData, title: e.target.value })}
                  placeholder={t.titlePlaceholder}
                />
              </div>
              
              <div className="md:col-span-2">
                <Label>{t.bio}</Label>
                <Textarea
                  rows={4}
                  value={profileData.bio}
                  onChange={(e) => setProfileData({ ...profileData, bio: e.target.value })}
                  placeholder={t.bioPlaceholder}
                />
              </div>
              
              <div>
                <Label>{t.phone}</Label>
                <Input
                  value={profileData.phone}
                  onChange={(e) => setProfileData({ ...profileData, phone: e.target.value })}
                  placeholder="+880 1XXX-XXXXXX"
                />
              </div>
              
              <div>
                <Label>{t.email}</Label>
                <Input
                  type="email"
                  value={profileData.email}
                  onChange={(e) => setProfileData({ ...profileData, email: e.target.value })}
                  placeholder="email@example.com"
                />
              </div>
              
              <div className="md:col-span-2">
                <Label>{t.location}</Label>
                <Input
                  value={profileData.location}
                  onChange={(e) => setProfileData({ ...profileData, location: e.target.value })}
                  placeholder="ধানমন্ডি, ঢাকা"
                />
              </div>
              
              <div>
                <Label>{t.availability}</Label>
                <div className="flex gap-2 mt-2">
                  <Button
                    type="button"
                    variant={profileData.availability === 'available' ? 'default' : 'outline'}
                    className={profileData.availability === 'available' ? 'bg-green-600 hover:bg-green-700' : ''}
                    onClick={() => setProfileData({ ...profileData, availability: 'available' })}
                  >
                    {t.available}
                  </Button>
                  <Button
                    type="button"
                    variant={profileData.availability === 'busy' ? 'default' : 'outline'}
                    className={profileData.availability === 'busy' ? 'bg-yellow-600 hover:bg-yellow-700' : ''}
                    onClick={() => setProfileData({ ...profileData, availability: 'busy' })}
                  >
                    {t.busy}
                  </Button>
                  <Button
                    type="button"
                    variant={profileData.availability === 'offline' ? 'default' : 'outline'}
                    className={profileData.availability === 'offline' ? 'bg-gray-600 hover:bg-gray-700' : ''}
                    onClick={() => setProfileData({ ...profileData, availability: 'offline' })}
                  >
                    {t.offline}
                  </Button>
                </div>
              </div>
              
              <div>
                <Label>{t.responseTime}</Label>
                <select
                  className="w-full px-3 py-2 border rounded-md"
                  value={profileData.responseTime}
                  onChange={(e) => setProfileData({ ...profileData, responseTime: e.target.value })}
                >
                  {availableResponseTimes.map((time) => (
                    <option key={time} value={time}>{time}</option>
                  ))}
                </select>
              </div>
              
              <div className="md:col-span-2">
                <Label>{t.videoIntro}</Label>
                <Input
                  value={profileData.videoIntro}
                  onChange={(e) => setProfileData({ ...profileData, videoIntro: e.target.value })}
                  placeholder={t.videoIntroPlaceholder}
                />
                <p className="text-xs text-gray-500 mt-1">
                  একটি সংক্ষিপ্ত পরিচিতি ভিডিও আপনার প্রোফাইলকে আরও আকর্ষণীয় করবে
                </p>
              </div>
              
              <div className="md:col-span-2">
                <Label>{t.teachingApproach}</Label>
                <Textarea
                  rows={3}
                  value={profileData.teachingApproach}
                  onChange={(e) => setProfileData({ ...profileData, teachingApproach: e.target.value })}
                  placeholder={t.teachingApproachPlaceholder}
                />
              </div>
            </div>
          </TabsContent>
          
          {/* Education Tab */}
          <TabsContent value="education" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-gray-900">
                <GraduationCap className="w-5 h-5 text-teal-600" />
                {t.education}
              </h3>
              <Button onClick={handleAddEducation} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                {t.addEducation}
              </Button>
            </div>
            
            {educationList.map((edu, index) => (
              <Card key={index} className="p-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-red-600"
                  onClick={() => handleRemoveEducation(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
                
                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <Label>{t.degree}</Label>
                    <Input
                      value={edu.degree}
                      onChange={(e) => {
                        const updated = [...educationList];
                        updated[index].degree = e.target.value;
                        setEducationList(updated);
                      }}
                      placeholder="ব.এ. (সম্মান)"
                    />
                  </div>
                  
                  <div>
                    <Label>{t.institution}</Label>
                    <Input
                      value={edu.institution}
                      onChange={(e) => {
                        const updated = [...educationList];
                        updated[index].institution = e.target.value;
                        setEducationList(updated);
                      }}
                      placeholder="ঢাকা বিশ্ববিদ্যালয়"
                    />
                  </div>
                  
                  <div>
                    <Label>{t.year}</Label>
                    <Input
                      value={edu.year}
                      onChange={(e) => {
                        const updated = [...educationList];
                        updated[index].year = e.target.value;
                        setEducationList(updated);
                      }}
                      placeholder="২০২০"
                    />
                  </div>
                </div>
              </Card>
            ))}
            
            {educationList.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <GraduationCap className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>কোনো শিক্ষাগত যোগ্যতা যোগ করা হয়নি</p>
              </div>
            )}
          </TabsContent>
          
          {/* Experience Tab */}
          <TabsContent value="experience" className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="flex items-center gap-2 text-gray-900">
                <Briefcase className="w-5 h-5 text-purple-600" />
                {t.experience}
              </h3>
              <Button onClick={handleAddExperience} size="sm">
                <Plus className="w-4 h-4 mr-2" />
                {t.addExperience}
              </Button>
            </div>
            
            {experienceList.map((exp, index) => (
              <Card key={index} className="p-4 relative">
                <Button
                  variant="ghost"
                  size="sm"
                  className="absolute top-2 right-2 text-red-600"
                  onClick={() => handleRemoveExperience(index)}
                >
                  <X className="w-4 h-4" />
                </Button>
                
                <div className="space-y-3">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>{t.jobTitle}</Label>
                      <Input
                        value={exp.title}
                        onChange={(e) => {
                          const updated = [...experienceList];
                          updated[index].title = e.target.value;
                          setExperienceList(updated);
                        }}
                        placeholder="গণিত শিক্ষক"
                      />
                    </div>
                    
                    <div>
                      <Label>{t.company}</Label>
                      <Input
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...experienceList];
                          updated[index].company = e.target.value;
                          setExperienceList(updated);
                        }}
                        placeholder="মডেল স্কুল"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <Label>{t.duration}</Label>
                    <Input
                      value={exp.duration}
                      onChange={(e) => {
                        const updated = [...experienceList];
                        updated[index].duration = e.target.value;
                        setExperienceList(updated);
                      }}
                      placeholder="২০১৮ - ২০২২"
                    />
                  </div>
                  
                  <div>
                    <Label>{t.description}</Label>
                    <Textarea
                      rows={2}
                      value={exp.description}
                      onChange={(e) => {
                        const updated = [...experienceList];
                        updated[index].description = e.target.value;
                        setExperienceList(updated);
                      }}
                      placeholder="কাজের বিবরণ..."
                    />
                  </div>
                </div>
              </Card>
            ))}
            
            {experienceList.length === 0 && (
              <div className="text-center py-8 text-gray-500">
                <Briefcase className="w-12 h-12 mx-auto mb-2 text-gray-300" />
                <p>কোনো অভিজ্ঞতা যোগ করা হয়নি</p>
              </div>
            )}
          </TabsContent>
          
          {/* Skills & Certifications Tab */}
          <TabsContent value="skills" className="space-y-6">
            {/* Skills Section */}
            <div>
              <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                <Star className="w-5 h-5 text-yellow-600" />
                {t.skills}
              </h3>
              <div className="flex gap-2 mb-3">
                <Input
                  value={newSkill}
                  onChange={(e) => setNewSkill(e.target.value)}
                  placeholder={t.skillPlaceholder}
                  onKeyPress={(e) => e.key === 'Enter' && handleAddSkill()}
                />
                <Button onClick={handleAddSkill} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  {t.addSkill}
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {skills.map((skill) => (
                  <Badge 
                    key={skill} 
                    className="bg-teal-600 hover:bg-teal-700 text-white px-3 py-1 cursor-pointer"
                    onClick={() => handleRemoveSkill(skill)}
                  >
                    {skill}
                    <X className="w-3 h-3 ml-2" />
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Certifications Section */}
            <div>
              <div className="flex items-center justify-between mb-3">
                <h3 className="flex items-center gap-2 text-gray-900">
                  <Award className="w-5 h-5 text-yellow-600" />
                  {t.certifications}
                </h3>
                <Button onClick={handleAddCertification} size="sm">
                  <Plus className="w-4 h-4 mr-2" />
                  {t.addCertification}
                </Button>
              </div>
              
              {certifications.map((cert, index) => (
                <Card key={index} className="p-4 mb-3 relative">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-2 right-2 text-red-600"
                    onClick={() => handleRemoveCertification(index)}
                  >
                    <X className="w-4 h-4" />
                  </Button>
                  
                  <div className="grid md:grid-cols-3 gap-4 mb-3">
                    <div>
                      <Label>{t.certName}</Label>
                      <Input
                        value={cert.name}
                        onChange={(e) => {
                          const updated = [...certifications];
                          updated[index].name = e.target.value;
                          setCertifications(updated);
                        }}
                        placeholder="B.Ed Certificate"
                      />
                    </div>
                    
                    <div>
                      <Label>{t.issuer}</Label>
                      <Input
                        value={cert.issuer}
                        onChange={(e) => {
                          const updated = [...certifications];
                          updated[index].issuer = e.target.value;
                          setCertifications(updated);
                        }}
                        placeholder="National University"
                      />
                    </div>
                    
                    <div>
                      <Label>{t.year}</Label>
                      <Input
                        value={cert.year}
                        onChange={(e) => {
                          const updated = [...certifications];
                          updated[index].year = e.target.value;
                          setCertifications(updated);
                        }}
                        placeholder="২০২০"
                      />
                    </div>
                  </div>
                  
                  <Button variant="outline" size="sm">
                    <Upload className="w-4 h-4 mr-2" />
                    {t.uploadCert}
                  </Button>
                </Card>
              ))}
              
              <div className="p-3 bg-blue-50 border-l-4 border-blue-400 rounded text-sm text-blue-800">
                <FileText className="w-4 h-4 inline mr-2" />
                {t.verificationNote}
              </div>
            </div>
          </TabsContent>
          
          {/* Subjects & Classes Tab */}
          <TabsContent value="subjects" className="space-y-6">
            {/* Subjects */}
            <div>
              <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                <BookOpen className="w-5 h-5 text-teal-600" />
                {t.teachingSubjects}
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableSubjects.map((subject) => (
                  <Badge
                    key={subject}
                    variant={selectedSubjects.includes(subject) ? 'default' : 'outline'}
                    className={`cursor-pointer px-4 py-2 ${
                      selectedSubjects.includes(subject)
                        ? 'bg-teal-600 hover:bg-teal-700 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => toggleSubject(subject)}
                  >
                    {subject}
                    {selectedSubjects.includes(subject) && (
                      <CheckCircle className="w-3 h-3 ml-2" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Classes */}
            <div>
              <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                <GraduationCap className="w-5 h-5 text-purple-600" />
                {t.teachingClasses}
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableClasses.map((cls) => (
                  <Badge
                    key={cls}
                    variant={selectedClasses.includes(cls) ? 'default' : 'outline'}
                    className={`cursor-pointer px-4 py-2 ${
                      selectedClasses.includes(cls)
                        ? 'bg-purple-600 hover:bg-purple-700 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => toggleClass(cls)}
                  >
                    {cls}
                    {selectedClasses.includes(cls) && (
                      <CheckCircle className="w-3 h-3 ml-2" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Hourly Rate */}
            <div>
              <h3 className="text-gray-900 mb-3">{t.hourlyRate}</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>{t.minRate}</Label>
                  <Input
                    type="number"
                    value={profileData.hourlyRateMin}
                    onChange={(e) => setProfileData({ 
                      ...profileData, 
                      hourlyRateMin: parseInt(e.target.value) || 0 
                    })}
                  />
                </div>
                <div>
                  <Label>{t.maxRate}</Label>
                  <Input
                    type="number"
                    value={profileData.hourlyRateMax}
                    onChange={(e) => setProfileData({ 
                      ...profileData, 
                      hourlyRateMax: parseInt(e.target.value) || 0 
                    })}
                  />
                </div>
              </div>
              <p className="text-sm text-gray-600 mt-2">
                ৳{profileData.hourlyRateMin} - ৳{profileData.hourlyRateMax} / ঘণ্টা
              </p>
            </div>
            
            {/* Languages */}
            <div>
              <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                <Globe className="w-5 h-5 text-indigo-600" />
                {t.languages}
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableLanguages.map((lang) => (
                  <Badge
                    key={lang}
                    variant={selectedLanguages.includes(lang) ? 'default' : 'outline'}
                    className={`cursor-pointer px-4 py-2 ${
                      selectedLanguages.includes(lang)
                        ? 'bg-indigo-600 hover:bg-indigo-700 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      if (selectedLanguages.includes(lang)) {
                        setSelectedLanguages(selectedLanguages.filter(l => l !== lang));
                      } else {
                        setSelectedLanguages([...selectedLanguages, lang]);
                      }
                    }}
                  >
                    {lang}
                    {selectedLanguages.includes(lang) && (
                      <CheckCircle className="w-3 h-3 ml-2" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
            
            {/* Medium */}
            <div>
              <h3 className="flex items-center gap-2 text-gray-900 mb-3">
                <BookOpen className="w-5 h-5 text-pink-600" />
                {t.medium}
              </h3>
              <div className="flex flex-wrap gap-2">
                {availableMedium.map((med) => (
                  <Badge
                    key={med}
                    variant={selectedMedium.includes(med) ? 'default' : 'outline'}
                    className={`cursor-pointer px-4 py-2 ${
                      selectedMedium.includes(med)
                        ? 'bg-pink-600 hover:bg-pink-700 text-white'
                        : 'hover:bg-gray-100'
                    }`}
                    onClick={() => {
                      if (selectedMedium.includes(med)) {
                        setSelectedMedium(selectedMedium.filter(m => m !== med));
                      } else {
                        setSelectedMedium([...selectedMedium, med]);
                      }
                    }}
                  >
                    {med}
                    {selectedMedium.includes(med) && (
                      <CheckCircle className="w-3 h-3 ml-2" />
                    )}
                  </Badge>
                ))}
              </div>
            </div>
          </TabsContent>
        </Tabs>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-between pt-4 border-t">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.cancel}
          </Button>
          <Button 
            onClick={handleSave}
            className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
          >
            <CheckCircle className="w-4 h-4 mr-2" />
            {t.save}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
