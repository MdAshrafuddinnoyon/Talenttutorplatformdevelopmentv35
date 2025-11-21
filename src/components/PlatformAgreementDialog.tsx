import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Checkbox } from './ui/checkbox';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { FileText, CheckCircle2, AlertTriangle, Calendar, DollarSign, Shield, Award } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface PlatformAgreementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'bn' | 'en';
  onAccept: () => void;
}

const content = {
  bn: {
    title: 'প্ল্যাটফর্ম এগ্রিমেন্ট',
    description: 'Talent Tutor প্ল্যাটফর্মে শিক্ষক হিসেবে যোগ দেওয়ার শর্তাবলী',
    welcomeTitle: 'স্বাগতম Talent Tutor প্ল্যাটফর্মে!',
    welcomeMessage: 'আপনি যে টিউশনে আবেদন করতে যাচ্ছেন তার জন্য প্রথমে আমাদের প্ল্যাটফর্ম এগ্রিমেন্ট পড়ুন এবং সম্মত হন।',
    keyBenefits: 'মূল সুবিধা',
    benefits: [
      '✅ প্রথম ৬ মাস সম্পূর্ণ ফ্রি - কোনো প্ল্যাটফর্ম চার্জ নেই',
      '✅ ৬ মাস পরে মাত্র ১০% প্ল্যাটফর্ম কমিশন',
      '✅ সরাসরি অভিভাবকদের সাথে যোগাযোগ',
      '✅ নিরাপদ পেমেন্ট সিস্টেম',
      '✅ প্রোফাইল প্রমোশন এবং ম্যাচিং',
    ],
    termsConditions: 'শর্তাবলী',
    terms: [
      {
        title: '১. প্ল্যাটফর্ম চার্জ',
        description: 'প্রথম ৬ মাস আপনার সব আয় সম্পূর্ণ ফ্রি। ৬ মাস পর আপনার প্রতিটি টিউশন থেকে মাত্র ১০% প্ল্যাটফর্ম কমিশন কাটা হবে।',
        icon: 'dollar',
      },
      {
        title: '২. টিউশন গ্রহণ',
        description: 'আপনি একাধিক টিউশন নিতে পারবেন। প্রতিটি টিউশনে আবেদন করতে ২ ক্রেডিট খরচ হবে।',
        icon: 'book',
      },
      {
        title: '৩. পেমেন্ট শিডিউল',
        description: 'অভিভাবক থেকে পেমেন্ট পাওয়ার পর প্ল্যাটফর্ম কমিশন কেটে নেওয়া হবে। পেমেন্ট প্রতি মাসের ১-৫ তারিখের মধ্যে করতে হবে।',
        icon: 'calendar',
      },
      {
        title: '৪. চুক্তি বাতিল',
        description: 'যে কোনো পক্ষ ১৫ দিন আগে নোটিশ দিয়ে চুক্তি বাতিল করতে পারবেন। চুক্তি বাতিলের সময় পর্যন্ত সব পেমেন্ট সম্পন্ন করতে হবে।',
        icon: 'alert',
      },
      {
        title: '৫. আচরণবিধি',
        description: 'শিক্ষক হিসেবে আপনাকে পেশাদার আচরণ বজায় রাখতে হবে। অভিভাবক ও ছাত্রদের সাথে সম্মানজনক ব্যবহার করতে হবে।',
        icon: 'shield',
      },
      {
        title: '৬. মান বজায় রাখা',
        description: 'নিয়মিত ক্লাস নিতে হবে এবং ছাত্রদের প্রগ্রেস রিপোর্ট আপডেট করতে হবে। ভালো রেটিং বজায় রাখলে আরও সুবিধা পাবেন।',
        icon: 'award',
      },
    ],
    importantNote: 'গুরুত্বপূর্ণ নোট',
    noteMessage: '৬ মাস পূর্ণ হওয়ার পর স্বয়ংক্রিয়ভাবে ১০% কমিশন সিস্টেম চালু হবে। আপনি যে কোনো সময় আপনার ড্যাশবোর্ডে চার্জের বিস্তারিত দেখতে পারবেন।',
    agreeCheckbox: 'আমি সব শর্তাবলী পড়েছি এবং সম্মত',
    accept: 'সম্মত এবং চালিয়ে যান',
    decline: 'অস্বীকার করুন',
    freeLabel: '৬ মাস ফ্রি',
    commissionLabel: 'তারপর ১০% কমিশন',
  },
  en: {
    title: 'Platform Agreement',
    description: 'Terms and conditions for joining Talent Tutor as a teacher',
    welcomeTitle: 'Welcome to Talent Tutor Platform!',
    welcomeMessage: 'Before applying to this tuition, please read and agree to our platform agreement.',
    keyBenefits: 'Key Benefits',
    benefits: [
      '✅ First 6 months completely free - no platform charges',
      '✅ Only 10% platform commission after 6 months',
      '✅ Direct communication with guardians',
      '✅ Secure payment system',
      '✅ Profile promotion and matching',
    ],
    termsConditions: 'Terms & Conditions',
    terms: [
      {
        title: '1. Platform Charges',
        description: 'First 6 months all your earnings are completely free. After 6 months, only 10% platform commission will be deducted from each tuition.',
        icon: 'dollar',
      },
      {
        title: '2. Taking Tuitions',
        description: 'You can take multiple tuitions. Each application costs 2 credits.',
        icon: 'book',
      },
      {
        title: '3. Payment Schedule',
        description: 'Platform commission will be deducted after receiving payment from guardian. Payment must be made between 1st-5th of every month.',
        icon: 'calendar',
      },
      {
        title: '4. Contract Cancellation',
        description: 'Either party can cancel the contract with 15 days notice. All payments must be completed until cancellation.',
        icon: 'alert',
      },
      {
        title: '5. Code of Conduct',
        description: 'As a teacher, you must maintain professional behavior. Treat guardians and students with respect.',
        icon: 'shield',
      },
      {
        title: '6. Maintaining Quality',
        description: 'Regular classes and student progress reports must be maintained. Good ratings will get you more benefits.',
        icon: 'award',
      },
    ],
    importantNote: 'Important Note',
    noteMessage: 'After 6 months, 10% commission system will automatically activate. You can see charge details anytime in your dashboard.',
    agreeCheckbox: 'I have read and agree to all terms and conditions',
    accept: 'Agree and Continue',
    decline: 'Decline',
    freeLabel: '6 Months Free',
    commissionLabel: 'Then 10% Commission',
  },
};

const iconMap = {
  dollar: DollarSign,
  calendar: Calendar,
  alert: AlertTriangle,
  shield: Shield,
  award: Award,
  book: FileText,
};

export function PlatformAgreementDialog({
  open,
  onOpenChange,
  language,
  onAccept,
}: PlatformAgreementDialogProps) {
  const t = content[language];
  const [agreed, setAgreed] = useState(false);

  const handleAccept = () => {
    if (!agreed) {
      toast.error(language === 'bn' ? 'অনুগ্রহ করে শর্তাবলী সম্মত হন' : 'Please agree to terms and conditions');
      return;
    }
    onAccept();
    toast.success(language === 'bn' ? 'প্ল্যাটফর্ম এগ্রিমেন্ট গৃহীত হয়েছে!' : 'Platform agreement accepted!');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <FileText className="w-6 h-6 text-emerald-600" />
            {t.title}
          </DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Welcome Message */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-6 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 rounded-lg"
          >
            <h3 className="text-emerald-900 mb-2 flex items-center gap-2">
              <Shield className="w-5 h-5" />
              {t.welcomeTitle}
            </h3>
            <p className="text-emerald-800">{t.welcomeMessage}</p>
          </motion.div>

          {/* Free Period Highlight */}
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border-2 border-green-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Badge className="bg-green-600 mb-1">{t.freeLabel}</Badge>
                  <p className="text-2xl text-green-700">০%</p>
                </div>
              </div>
              <p className="text-sm text-green-800">প্রথম ৬ মাস কোনো চার্জ নেই</p>
            </Card>

            <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-300">
              <div className="flex items-center gap-3 mb-2">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-white" />
                </div>
                <div>
                  <Badge className="bg-blue-600 mb-1">{t.commissionLabel}</Badge>
                  <p className="text-2xl text-blue-700">১০%</p>
                </div>
              </div>
              <p className="text-sm text-blue-800">৬ মাস পর শুধুমাত্র কমিশন</p>
            </Card>
          </div>

          {/* Key Benefits */}
          <div className="p-6 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg border border-purple-200">
            <h3 className="text-purple-900 mb-3 flex items-center gap-2">
              <Award className="w-5 h-5" />
              {t.keyBenefits}
            </h3>
            <ul className="space-y-2">
              {t.benefits.map((benefit, index) => (
                <li key={index} className="text-purple-800 flex items-start gap-2">
                  <span className="text-lg">{benefit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Terms & Conditions */}
          <div className="space-y-4">
            <h3 className="text-gray-900 flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t.termsConditions}
            </h3>

            <div className="space-y-3">
              {t.terms.map((term, index) => {
                const Icon = iconMap[term.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="p-4 bg-white border border-gray-200 rounded-lg hover:shadow-md transition-shadow"
                  >
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-emerald-600" />
                      </div>
                      <div className="flex-1">
                        <h4 className="text-gray-900 mb-1">{term.title}</h4>
                        <p className="text-sm text-gray-600">{term.description}</p>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Important Note */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg"
          >
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
              <div>
                <p className="text-yellow-900 mb-1">{t.importantNote}</p>
                <p className="text-sm text-yellow-800">{t.noteMessage}</p>
              </div>
            </div>
          </motion.div>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-3 p-4 bg-emerald-50 border-2 border-emerald-300 rounded-lg">
            <Checkbox
              id="agree-platform"
              checked={agreed}
              onCheckedChange={(checked) => setAgreed(checked as boolean)}
            />
            <Label htmlFor="agree-platform" className="cursor-pointer">
              <span className="text-emerald-900">{t.agreeCheckbox}</span>
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.decline}
          </Button>
          <Button
            onClick={handleAccept}
            disabled={!agreed}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          >
            <CheckCircle2 className="w-4 h-4 mr-2" />
            {t.accept}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function Card({ children, className = '' }: { children: React.ReactNode; className?: string }) {
  return <div className={`rounded-lg ${className}`}>{children}</div>;
}
