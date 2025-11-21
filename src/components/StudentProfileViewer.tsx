import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Avatar, AvatarImage, AvatarFallback } from './ui/avatar';
import { ScrollArea } from './ui/scroll-area';
import {
  Heart,
  GraduationCap,
  Book,
  DollarSign,
  MapPin,
  Calendar,
  FileText,
  User,
  Phone,
  Home,
  Users,
  Award,
  Target,
  Download,
  Eye,
  Gift,
  CheckCircle,
  BookOpen,
  Star,
  TrendingUp,
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface StudentProfileViewerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  application: {
    id: string;
    studentName: string;
    studentPhoto?: string;
    class: string;
    school: string;
    age?: number;
    applicationType: 'scholarship' | 'materials' | 'tuition';
    
    // For scholarship
    amount?: number;
    purpose?: string;
    monthlyIncome?: number;
    familyMembers?: number;
    
    // For materials
    itemsNeeded?: string;
    quantity?: string;
    subject?: string;
    
    // Common
    coverLetter: string;
    documents: string[] | number;
    submittedDate: string;
    urgency?: 'high' | 'medium' | 'low';
    
    // Additional info
    guardianName?: string;
    guardianPhone?: string;
    address?: string;
    currentGrade?: string;
    aspirations?: string;
    achievements?: string[];
  };
  donorType: 'zakat' | 'materials';
  language: 'bn' | 'en';
  onDonate: (applicationId: string, applicationType: string) => void;
}

const content = {
  bn: {
    studentProfile: 'ছাত্র প্রোফাইল',
    overview: 'সংক্ষিপ্ত',
    about: 'সম্পর্কে',
    documents: 'ডকুমেন্ট',
    personalInfo: 'ব্যক্তিগত তথ্য',
    applicationInfo: 'আবেদনের তথ্য',
    familyInfo: 'পরিবারের তথ্য',
    educationInfo: 'শিক্ষা তথ্য',
    name: 'নাম',
    class: 'ক্লাস',
    age: 'বয়স',
    school: 'স্কুল',
    address: 'ঠিকানা',
    guardian: 'অভিভাবক',
    phone: 'ফোন',
    monthlyIncome: 'মাসিক আয়',
    familyMembers: 'পরিবারের সদস্য',
    applicationType: 'আবেদনের ধরন',
    amountNeeded: 'প্রয়োজনীয় পরিমাণ',
    purpose: 'উদ্দেশ্য',
    itemsNeeded: 'প্রয়োজনীয় জিনিস',
    quantity: 'পরিমাণ',
    subject: 'বিষয়',
    submittedOn: 'জমা দেওয়া হয়েছে',
    urgency: 'জরুরী অবস্থা',
    high: 'অত্যন্ত জরুরি',
    medium: 'মাঝারি',
    low: 'কম',
    currentGrade: 'বর্তমান গ্রেড',
    aspirations: 'ভবিষ্যৎ লক্ষ্য',
    achievements: 'অর্জন',
    viewDocument: 'ডকুমেন্ট দেখুন',
    downloadAll: 'সব ডাউনলোড করুন',
    verified: 'যাচাইকৃত',
    donate: 'দান করুন',
    close: 'বন্ধ করুন',
    theirStory: 'তাদের গল্প',
    whyTheyNeed: 'কেন তাদের প্রয়োজন',
    helpThisStudent: 'এই ছাত্রকে সাহায্য করুন',
    verifiedDocuments: 'যাচাইকৃত ডকুমেন্ট',
    adminApproved: 'এডমিন দ্বারা অনুমোদিত',
    joinedOn: 'যোগদান',
    backToList: 'তালিকায় ফিরুন',
  },
  en: {
    studentProfile: 'Student Profile',
    overview: 'Overview',
    about: 'About',
    documents: 'Documents',
    personalInfo: 'Personal Information',
    applicationInfo: 'Application Information',
    familyInfo: 'Family Information',
    educationInfo: 'Education Information',
    name: 'Name',
    class: 'Class',
    age: 'Age',
    school: 'School',
    address: 'Address',
    guardian: 'Guardian',
    phone: 'Phone',
    monthlyIncome: 'Monthly Income',
    familyMembers: 'Family Members',
    applicationType: 'Application Type',
    amountNeeded: 'Amount Needed',
    purpose: 'Purpose',
    itemsNeeded: 'Items Needed',
    quantity: 'Quantity',
    subject: 'Subject',
    submittedOn: 'Submitted On',
    urgency: 'Urgency',
    high: 'High',
    medium: 'Medium',
    low: 'Low',
    currentGrade: 'Current Grade',
    aspirations: 'Aspirations',
    achievements: 'Achievements',
    viewDocument: 'View Document',
    downloadAll: 'Download All',
    verified: 'Verified',
    donate: 'Donate',
    close: 'Close',
    theirStory: 'Their Story',
    whyTheyNeed: 'Why They Need Help',
    helpThisStudent: 'Help This Student',
    verifiedDocuments: 'Verified Documents',
    adminApproved: 'Admin Approved',
    joinedOn: 'Joined',
    backToList: 'Back to List',
  },
};

export function StudentProfileViewer({
  open,
  onOpenChange,
  application,
  donorType,
  language,
  onDonate,
}: StudentProfileViewerProps) {
  const t = content[language];
  const [activeTab, setActiveTab] = useState('overview');

  // Generate mock documents if number is provided
  const documents = Array.isArray(application.documents)
    ? application.documents
    : Array.from({ length: application.documents || 0 }, (_, i) => 
        `ডকুমেন্ট ${i + 1}`
      );

  const handleDonateClick = () => {
    onDonate(application.id, application.applicationType);
  };

  const getApplicationTypeBadge = () => {
    switch (application.applicationType) {
      case 'scholarship':
        return { icon: DollarSign, text: language === 'bn' ? 'বৃত্তি' : 'Scholarship', color: 'emerald' };
      case 'materials':
        return { icon: Book, text: language === 'bn' ? 'বই ও উপকরণ' : 'Books & Materials', color: 'blue' };
      case 'tuition':
        return { icon: GraduationCap, text: language === 'bn' ? 'টিউশন' : 'Tuition', color: 'purple' };
      default:
        return { icon: Book, text: '', color: 'gray' };
    }
  };

  const appType = getApplicationTypeBadge();

  if (!open) return null;

  return (
    <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 overflow-y-auto">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.95 }}
        className="bg-white rounded-2xl shadow-2xl w-full max-w-5xl my-8"
      >
        {/* Hero Header */}
        <div className="relative bg-gradient-to-br from-teal-500 via-emerald-500 to-green-500 rounded-t-2xl p-8 text-white overflow-hidden">
          {/* Decorative Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full -mr-32 -mt-32" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full -ml-48 -mb-48" />
          </div>

          <div className="relative z-10">
            {/* Close Button */}
            <button
              onClick={() => onOpenChange(false)}
              className="absolute top-0 right-0 p-2 hover:bg-white/20 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              {/* Avatar */}
              <div className="relative">
                <Avatar className="w-32 h-32 border-4 border-white shadow-2xl">
                  <AvatarImage src={application.studentPhoto} alt={application.studentName} />
                  <AvatarFallback className="text-4xl bg-gradient-to-br from-teal-600 to-emerald-600 text-white">
                    {application.studentName.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="absolute -bottom-2 -right-2 bg-white rounded-full p-2 shadow-lg">
                  <CheckCircle className="w-6 h-6 text-emerald-500" />
                </div>
              </div>

              {/* Student Info */}
              <div className="flex-1 space-y-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{application.studentName}</h1>
                  <div className="flex flex-wrap gap-2">
                    <Badge className={`bg-white/20 backdrop-blur-sm text-white border-white/30`}>
                      <appType.icon className="w-4 h-4 mr-1" />
                      {appType.text}
                    </Badge>
                    <Badge className="bg-white/20 backdrop-blur-sm text-white border-white/30">
                      <CheckCircle className="w-4 h-4 mr-1" />
                      {t.adminApproved}
                    </Badge>
                    {application.urgency && (
                      <Badge className={`bg-white/20 backdrop-blur-sm text-white border-white/30`}>
                        {application.urgency === 'high' && '🔴'}
                        {application.urgency === 'medium' && '🟡'}
                        {application.urgency === 'low' && '🟢'}
                        {' '}
                        {t[application.urgency]}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                    <GraduationCap className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/70">{t.class}</p>
                      <p className="font-medium">{application.class}</p>
                    </div>
                  </div>
                  
                  {application.age && (
                    <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2">
                      <User className="w-5 h-5 flex-shrink-0" />
                      <div>
                        <p className="text-xs text-white/70">{t.age}</p>
                        <p className="font-medium">{application.age} {language === 'bn' ? 'বছর' : 'years'}</p>
                      </div>
                    </div>
                  )}
                  
                  <div className="flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-lg px-3 py-2 sm:col-span-2 lg:col-span-1">
                    <Calendar className="w-5 h-5 flex-shrink-0" />
                    <div>
                      <p className="text-xs text-white/70">{t.submittedOn}</p>
                      <p className="font-medium">{application.submittedDate}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Content Tabs */}
        <div className="p-6 md:p-8">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3 bg-gray-100">
              <TabsTrigger value="overview" className="gap-2">
                <Eye className="w-4 h-4" />
                <span className="hidden sm:inline">{t.overview}</span>
              </TabsTrigger>
              <TabsTrigger value="about" className="gap-2">
                <Heart className="w-4 h-4" />
                <span className="hidden sm:inline">{t.about}</span>
              </TabsTrigger>
              <TabsTrigger value="documents" className="gap-2">
                <FileText className="w-4 h-4" />
                <span className="hidden sm:inline">{t.documents}</span>
                {documents.length > 0 && (
                  <Badge variant="secondary" className="ml-1">{documents.length}</Badge>
                )}
              </TabsTrigger>
            </TabsList>

            {/* Overview Tab */}
            <TabsContent value="overview" className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                {/* Personal Info */}
                <Card className="p-6 border-l-4 border-l-teal-500">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <User className="w-5 h-5 text-teal-600" />
                    {t.personalInfo}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">{t.name}</span>
                      <span className="font-medium">{application.studentName}</span>
                    </div>
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">{t.class}</span>
                      <span className="font-medium">{application.class}</span>
                    </div>
                    {application.age && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">{t.age}</span>
                        <span className="font-medium">{application.age} {language === 'bn' ? 'বছর' : 'years'}</span>
                      </div>
                    )}
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">{t.school}</span>
                      <span className="font-medium">{application.school}</span>
                    </div>
                    {application.address && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">{t.address}</span>
                        <span className="font-medium text-right">{application.address}</span>
                      </div>
                    )}
                  </div>
                </Card>

                {/* Application Info */}
                <Card className="p-6 border-l-4 border-l-emerald-500">
                  <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                    <FileText className="w-5 h-5 text-emerald-600" />
                    {t.applicationInfo}
                  </h3>
                  <div className="space-y-3">
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">{t.applicationType}</span>
                      <Badge className={`bg-${appType.color}-100 text-${appType.color}-700`}>
                        {appType.text}
                      </Badge>
                    </div>
                    
                    {application.applicationType === 'scholarship' && donorType === 'zakat' && application.amount && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">{t.amountNeeded}</span>
                        <span className="font-bold text-emerald-600">৳{application.amount.toLocaleString()}</span>
                      </div>
                    )}
                    
                    {application.applicationType === 'materials' && (
                      <>
                        {application.itemsNeeded && (
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">{t.itemsNeeded}</span>
                            <span className="font-medium">{application.itemsNeeded}</span>
                          </div>
                        )}
                        {application.quantity && (
                          <div className="flex justify-between py-2 border-b">
                            <span className="text-gray-600">{t.quantity}</span>
                            <span className="font-medium">{application.quantity}</span>
                          </div>
                        )}
                      </>
                    )}
                    
                    {application.subject && (
                      <div className="flex justify-between py-2 border-b">
                        <span className="text-gray-600">{t.subject}</span>
                        <span className="font-medium">{application.subject}</span>
                      </div>
                    )}
                    
                    <div className="flex justify-between py-2 border-b">
                      <span className="text-gray-600">{t.submittedOn}</span>
                      <span className="font-medium">{application.submittedDate}</span>
                    </div>
                  </div>
                </Card>

                {/* Family Info */}
                {(application.guardianName || application.monthlyIncome || application.familyMembers) && donorType === 'zakat' && (
                  <Card className="p-6 border-l-4 border-l-blue-500">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Users className="w-5 h-5 text-blue-600" />
                      {t.familyInfo}
                    </h3>
                    <div className="space-y-3">
                      {application.guardianName && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">{t.guardian}</span>
                          <span className="font-medium">{application.guardianName}</span>
                        </div>
                      )}
                      {application.guardianPhone && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">{t.phone}</span>
                          <span className="font-medium">{application.guardianPhone}</span>
                        </div>
                      )}
                      {application.monthlyIncome && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">{t.monthlyIncome}</span>
                          <span className="font-medium">৳{application.monthlyIncome.toLocaleString()}</span>
                        </div>
                      )}
                      {application.familyMembers && (
                        <div className="flex justify-between py-2 border-b">
                          <span className="text-gray-600">{t.familyMembers}</span>
                          <span className="font-medium">{application.familyMembers} {language === 'bn' ? 'জন' : 'members'}</span>
                        </div>
                      )}
                    </div>
                  </Card>
                )}

                {/* Education & Aspirations */}
                {(application.currentGrade || application.aspirations || application.achievements) && (
                  <Card className="p-6 border-l-4 border-l-purple-500">
                    <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                      <Target className="w-5 h-5 text-purple-600" />
                      {t.educationInfo}
                    </h3>
                    <div className="space-y-3">
                      {application.currentGrade && (
                        <div className="py-2 border-b">
                          <span className="text-gray-600 block mb-1">{t.currentGrade}</span>
                          <span className="font-medium">{application.currentGrade}</span>
                        </div>
                      )}
                      {application.aspirations && (
                        <div className="py-2 border-b">
                          <span className="text-gray-600 block mb-1">{t.aspirations}</span>
                          <p className="text-sm">{application.aspirations}</p>
                        </div>
                      )}
                      {application.achievements && application.achievements.length > 0 && (
                        <div className="py-2">
                          <span className="text-gray-600 block mb-2">{t.achievements}</span>
                          <ul className="space-y-1">
                            {application.achievements.map((achievement, index) => (
                              <li key={index} className="flex items-start gap-2 text-sm">
                                <Star className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>{achievement}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </Card>
                )}
              </div>
            </TabsContent>

            {/* About Tab */}
            <TabsContent value="about">
              <Card className="p-6">
                <h3 className="font-semibold text-lg mb-4 flex items-center gap-2">
                  <Heart className="w-5 h-5 text-rose-600" />
                  {t.theirStory}
                </h3>
                <div className="prose prose-sm max-w-none">
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">
                    {application.coverLetter}
                  </p>
                </div>
              </Card>
            </TabsContent>

            {/* Documents Tab */}
            <TabsContent value="documents">
              <Card className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-semibold text-lg flex items-center gap-2">
                    <FileText className="w-5 h-5 text-blue-600" />
                    {t.verifiedDocuments}
                  </h3>
                  {documents.length > 0 && (
                    <Button variant="outline" size="sm">
                      <Download className="w-4 h-4 mr-2" />
                      {t.downloadAll}
                    </Button>
                  )}
                </div>
                
                {documents.length > 0 ? (
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {documents.map((doc, index) => (
                      <div
                        key={index}
                        className="border rounded-lg p-4 hover:border-teal-500 hover:shadow-md transition-all cursor-pointer group"
                      >
                        <div className="flex items-center gap-3">
                          <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center group-hover:bg-teal-500 transition-colors">
                            <FileText className="w-6 h-6 text-teal-600 group-hover:text-white" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{doc}</p>
                            <p className="text-xs text-gray-500">{language === 'bn' ? 'যাচাইকৃত' : 'Verified'}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <FileText className="w-12 h-12 mx-auto mb-3 text-gray-300" />
                    <p>{language === 'bn' ? 'কোন ডকুমেন্ট নেই' : 'No documents available'}</p>
                  </div>
                )}
              </Card>
            </TabsContent>
          </Tabs>

          {/* Footer Actions */}
          <div className="flex flex-col sm:flex-row gap-3 mt-6 pt-6 border-t">
            <Button
              variant="outline"
              className="flex-1"
              onClick={() => onOpenChange(false)}
            >
              {t.close}
            </Button>
            <Button
              className={`flex-1 ${
                donorType === 'zakat'
                  ? 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700'
                  : 'bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700'
              }`}
              onClick={handleDonateClick}
            >
              <Gift className="w-5 h-5 mr-2" />
              {t.helpThisStudent}
            </Button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
