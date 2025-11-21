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
import { Badge } from './ui/badge';
import { Send, DollarSign, Clock, Award, CheckCircle } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ApplyTuitionDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'bn' | 'en';
  tuitionTitle?: string;
  tuitionBudget?: string;
  tuitionPost?: {
    id: number;
    title: string;
    subject: string;
    class: string;
    medium?: string;
    location: string;
    salary: string;
    schedule: string;
    guardianName: string;
  };
  onSubmit?: () => void;
}

const content = {
  bn: {
    title: 'টিউশনের জন্য আবেদন করুন',
    description: 'আপনার প্রস্তাব এবং তথ্য দিয়ে এই টিউশনের জন্য আবেদন করুন',
    proposedRate: 'প্রস্তাবিত মাসিক হার',
    proposedRatePlaceholder: 'আপনার প্রস্তাবিত মাসিক পারিশ্রমিক লিখুন (৳)',
    coverLetter: 'কভার লেটার / পরিচিতি',
    coverLetterPlaceholder: 'নিজের সম্পর্কে লিখুন, কেন আপনি এই টিউশনের জন্য উপযুক্ত, আপনার অভিজ্ঞতা ইত্যাদি...',
    availability: 'আপনার প্রাপ্যতা',
    availabilityPlaceholder: 'উদাঃ সন্ধ্যা ৬টা - ৮টা, সপ্তাহে ৫ দিন',
    experience: 'অভিজ্ঞতার বছর',
    experiencePlaceholder: 'উদাঃ ৩',
    qualifications: 'যোগ্যতা',
    qualificationsPlaceholder: 'আপনার শিক্ষাগত যোগ্যতা লিখুন',
    cancel: 'বাতিল',
    apply: 'আবেদন করুন',
    applying: 'আবেদন জমা হচ্ছে...',
    success: 'আবেদন সফল! ২ ক্রেডিট কেটে নেওয়া হয়েছে।',
    fillRequired: 'সকল প্রয়োজনীয় ক্ষেত্র পূরণ করুন',
    applicationFee: 'আবেদন ফি: ২ ক্রেডিট',
    yourProposal: 'আপনার প্রস্তাব',
    tuitionDetails: 'টিউশনের বিবরণ',
    budget: 'বাজেট',
  },
  en: {
    title: 'Apply for Tuition',
    description: 'Submit your proposal and information for this tuition',
    proposedRate: 'Proposed Monthly Rate',
    proposedRatePlaceholder: 'Enter your proposed monthly fee (৳)',
    coverLetter: 'Cover Letter / Introduction',
    coverLetterPlaceholder: 'Write about yourself, why you are suitable for this tuition, your experience, etc...',
    availability: 'Your Availability',
    availabilityPlaceholder: 'e.g., Evening 6 PM - 8 PM, 5 days a week',
    experience: 'Years of Experience',
    experiencePlaceholder: 'e.g., 3',
    qualifications: 'Qualifications',
    qualificationsPlaceholder: 'Enter your educational qualifications',
    cancel: 'Cancel',
    apply: 'Apply Now',
    applying: 'Submitting Application...',
    success: 'Application submitted successfully! 2 credits deducted.',
    fillRequired: 'Please fill all required fields',
    applicationFee: 'Application Fee: 2 Credits',
    yourProposal: 'Your Proposal',
    tuitionDetails: 'Tuition Details',
    budget: 'Budget',
  },
};

export function ApplyTuitionDialog({ 
  open, 
  onOpenChange, 
  language,
  tuitionTitle = '',
  tuitionBudget = '',
  tuitionPost,
  onSubmit
}: ApplyTuitionDialogProps) {
  const t = content[language];
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Use tuitionPost data if available
  const displayTitle = tuitionPost?.title || tuitionTitle;
  const displayBudget = tuitionPost?.salary || tuitionBudget;
  
  // Form state
  const [proposedRate, setProposedRate] = useState('');
  const [coverLetter, setCoverLetter] = useState('');
  const [availability, setAvailability] = useState('');
  const [experience, setExperience] = useState('');
  const [qualifications, setQualifications] = useState('');

  const handleSubmit = async () => {
    // Validation
    if (!proposedRate || !coverLetter || !availability) {
      toast.error(t.fillRequired);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Call parent's onSubmit if provided
    if (onSubmit) {
      onSubmit();
    } else {
      toast.success(t.success);
    }
    
    setIsSubmitting(false);
    onOpenChange(false);
    
    // Reset form
    resetForm();
  };

  const resetForm = () => {
    setProposedRate('');
    setCoverLetter('');
    setAvailability('');
    setExperience('');
    setQualifications('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl flex items-center gap-2">
            <Send className="w-6 h-6 text-emerald-600" />
            {t.title}
          </DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Tuition Info */}
          {displayTitle && (
            <div className="bg-gradient-to-r from-emerald-50 to-teal-50 p-4 rounded-lg border border-emerald-200">
              <p className="text-sm text-gray-600 mb-1">{t.tuitionDetails}</p>
              <h4 className="font-semibold text-gray-900 mb-2">{displayTitle}</h4>
              {tuitionPost && (
                <div className="grid grid-cols-2 gap-2 text-sm mt-2">
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">📚 {tuitionPost.subject}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">🎓 {tuitionPost.class}</span>
                  </div>
                  {tuitionPost.medium && (
                    <div className="flex items-center gap-1">
                      <span className="text-gray-600">🌍 {tuitionPost.medium}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">📍 {tuitionPost.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <span className="text-gray-600">⏰ {tuitionPost.schedule}</span>
                  </div>
                </div>
              )}
              {displayBudget && (
                <div className="flex items-center gap-2 text-sm mt-2">
                  <DollarSign className="w-4 h-4 text-emerald-600" />
                  <span className="text-emerald-700 font-medium">{t.budget}: {displayBudget} টাকা/মাস</span>
                </div>
              )}
            </div>
          )}

          {/* Application Fee Notice */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-center gap-3">
            <Award className="w-5 h-5 text-blue-600 shrink-0" />
            <div className="text-sm text-blue-900">
              <span className="font-semibold">{t.applicationFee}</span>
              <p className="text-blue-700 mt-1">আপনার বর্তমান ব্যালেন্স থেকে আবেদন জমা দেওয়ার পর ২ ক্রেডিট কেটে নেওয়া হবে।</p>
            </div>
          </div>

          {/* Proposed Rate */}
          <div className="space-y-2">
            <Label htmlFor="rate">
              <DollarSign className="w-4 h-4 inline mr-1" />
              {t.proposedRate} *
            </Label>
            <Input
              id="rate"
              type="number"
              placeholder={t.proposedRatePlaceholder}
              value={proposedRate}
              onChange={(e) => setProposedRate(e.target.value)}
            />
          </div>

          {/* Cover Letter */}
          <div className="space-y-2">
            <Label htmlFor="cover">{t.coverLetter} *</Label>
            <Textarea
              id="cover"
              placeholder={t.coverLetterPlaceholder}
              value={coverLetter}
              onChange={(e) => setCoverLetter(e.target.value)}
              rows={6}
              className="resize-none"
            />
            <p className="text-xs text-gray-500">
              {coverLetter.length} / 1000 অক্ষর
            </p>
          </div>

          {/* Availability */}
          <div className="space-y-2">
            <Label htmlFor="availability">
              <Clock className="w-4 h-4 inline mr-1" />
              {t.availability} *
            </Label>
            <Input
              id="availability"
              placeholder={t.availabilityPlaceholder}
              value={availability}
              onChange={(e) => setAvailability(e.target.value)}
            />
          </div>

          {/* Experience and Qualifications */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="experience">{t.experience}</Label>
              <Input
                id="experience"
                type="number"
                placeholder={t.experiencePlaceholder}
                value={experience}
                onChange={(e) => setExperience(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="qualifications">{t.qualifications}</Label>
              <Input
                id="qualifications"
                placeholder={t.qualificationsPlaceholder}
                value={qualifications}
                onChange={(e) => setQualifications(e.target.value)}
              />
            </div>
          </div>

          {/* Success Indicators */}
          <div className="bg-emerald-50 border border-emerald-200 rounded-lg p-4">
            <div className="space-y-2 text-sm">
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>আপনার প্রোফাইল সম্পূর্ণ এবং যাচাইকৃত</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-800">
                <CheckCircle className="w-4 h-4 text-emerald-600" />
                <span>অভিভাবক আপনার আবেদন পাবেন এবং সরাসরি যোগাযোগ করতে পারবেন</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button 
            variant="outline" 
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            {t.cancel}
          </Button>
          <Button 
            onClick={handleSubmit} 
            disabled={isSubmitting}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          >
            <Send className="w-4 h-4 mr-2" />
            {isSubmitting ? t.applying : t.apply}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
