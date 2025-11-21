import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Checkbox } from './ui/checkbox';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { FileText, DollarSign, Calendar, Clock, AlertTriangle, CheckCircle2, PenTool } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';

interface HiringAgreementDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacherName: string;
  teacherId: string;
  guardianId: string;
  studentName?: string;
  subjects?: string[];
  medium?: string;
  studentClass?: string;
  language: 'bn' | 'en';
  onSendAgreement: (agreementData: {
    rate: number;
    rateType: 'perHour' | 'perSession' | 'perMonth';
    schedule: string;
    duration: string;
    startDate: Date;
    specialTerms?: string;
  }) => void;
}

const content = {
  bn: {
    title: 'হায়ারিং এগ্রিমেন্ট পাঠান',
    description: 'শিক্ষক নিয়োগের জন্য একটি চুক্তি তৈরি করুন',
    studentInfo: 'ছাত্র/ছাত্রীর তথ্য',
    studentName: 'ছাত্র/ছাত্রীর নাম',
    subjects: 'বিষয়সমূহ',
    rate: 'বেতন',
    rateType: 'বেতনের ধরন',
    perHour: 'প্রতি ঘণ্টা',
    perSession: 'প্রতি সেশন',
    schedule: 'সিডিউল',
    schedulePlaceholder: 'উদাহরণ: সপ্তাহে ৩ দিন (রবি, মঙ্গল, বৃহস্পতি) সন্ধ্যা ৫-৭টা',
    duration: 'সময়কাল',
    selectDuration: 'সময়কাল নির্বাচন করুন',
    months: 'মাস',
    startDate: 'শুরুর তারিখ',
    specialTerms: 'বিশেষ শর্তাবলী (ঐচ্ছিক)',
    specialTermsPlaceholder: 'কোনো বিশেষ শর্ত বা নির্দেশনা থাকলে লিখুন...',
    termsConditions: 'শর্তাবলী',
    agreeTerms: 'আমি শর্তাবলী পড়েছি এবং সম্মত',
    sendAgreement: 'এগ্রিমেন্ট পাঠান',
    cancel: 'বাতিল',
    terms: [
      'পেমেন্ট প্রতি মাসের ১ তারিখে দিতে হবে',
      'চুক্তি বাতিল করতে ১৫ দিন আগে নোটিশ দিতে হবে',
      'অভিভাবক-শিক্ষক উভয়েই চুক্তিতে স্বাক্ষর করবেন',
      'কোনো বিরোধ হলে প্ল্যাটফর্মের মধ্যস্থতায় সমাধান হবে',
    ],
    warning: 'গুরুত্বপূর্ণ',
    warningMessage: 'এটি একটি আইনী বাধ্যতামূলক চুক্তি। দয়া করে সাবধানে পড়ুন।',
  },
  en: {
    title: 'Send Hiring Agreement',
    description: 'Create a contract for hiring the teacher',
    studentInfo: 'Student Information',
    studentName: 'Student Name',
    subjects: 'Subjects',
    rate: 'Rate',
    rateType: 'Rate Type',
    perHour: 'Per Hour',
    perSession: 'Per Session',
    schedule: 'Schedule',
    schedulePlaceholder: 'Example: 3 days a week (Sun, Tue, Thu) 5-7 PM',
    duration: 'Duration',
    selectDuration: 'Select Duration',
    months: 'months',
    startDate: 'Start Date',
    specialTerms: 'Special Terms (Optional)',
    specialTermsPlaceholder: 'Any special conditions or instructions...',
    termsConditions: 'Terms & Conditions',
    agreeTerms: 'I have read and agree to the terms',
    sendAgreement: 'Send Agreement',
    cancel: 'Cancel',
    terms: [
      'Payment due on 1st of every month',
      '15 days notice required to cancel contract',
      'Both guardian and teacher must sign the contract',
      'Disputes will be resolved through platform mediation',
    ],
    warning: 'Important',
    warningMessage: 'This is a legally binding contract. Please read carefully.',
  },
};

export function HiringAgreementDialog({
  open,
  onOpenChange,
  teacherName,
  teacherId,
  guardianId,
  studentName: initialStudentName = '',
  subjects: initialSubjects = [],
  medium,
  studentClass,
  language,
  onSendAgreement,
}: HiringAgreementDialogProps) {
  const t = content[language];
  const [studentName, setStudentName] = useState(initialStudentName);
  const [subjects, setSubjects] = useState(initialSubjects.join(', '));
  const [rate, setRate] = useState<number>(5000);
  const [rateType, setRateType] = useState<'perHour' | 'perSession' | 'perMonth'>('perHour');
  const [schedule, setSchedule] = useState('');
  const [duration, setDuration] = useState<string>('6');
  const [startDate, setStartDate] = useState<string>('');
  const [specialTerms, setSpecialTerms] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  const handleSend = () => {
    if (!studentName || !subjects || !rate || !schedule || !duration || !startDate || !agreedToTerms) {
      toast.error(language === 'bn' ? 'সব তথ্য পূরণ করুন এবং শর্তাবলী সম্মত হন' : 'Fill all fields and agree to terms');
      return;
    }

    const agreementData = {
      rate,
      rateType,
      schedule,
      duration: `${duration} ${t.months}`,
      startDate: new Date(startDate),
      specialTerms: specialTerms || undefined,
    };

    onSendAgreement(agreementData);

    toast.success(language === 'bn'
      ? 'হায়ারিং এগ্রিমেন্ট পাঠানো হয়েছে!'
      : 'Hiring agreement sent successfully!'
    );

    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <FileText className="w-6 h-6 text-purple-600" />
            {t.title}
          </DialogTitle>
          <DialogDescription>
            {t.description}: <span className="font-semibold">{teacherName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Warning */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-yellow-50 border-l-4 border-yellow-400 flex items-start gap-3"
          >
            <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5 shrink-0" />
            <div>
              <p className="text-yellow-900 mb-1">{t.warning}</p>
              <p className="text-sm text-yellow-800">{t.warningMessage}</p>
            </div>
          </motion.div>

          {/* Student Info */}
          <div className="space-y-4 p-4 bg-gradient-to-r from-blue-50 to-cyan-50 rounded-lg border border-blue-200">
            <h3 className="flex items-center gap-2">
              <PenTool className="w-5 h-5 text-blue-600" />
              {t.studentInfo}
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label>{t.studentName}</Label>
                <Input
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  placeholder={t.studentName}
                />
              </div>
              <div>
                <Label>{t.subjects}</Label>
                <Input
                  value={subjects}
                  onChange={(e) => setSubjects(e.target.value)}
                  placeholder="গণিত, পদার্থবিজ্ঞান"
                />
              </div>
            </div>
          </div>

          {/* Rate & Schedule */}
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4" />
                  {t.rate}
                </Label>
                <Input
                  type="number"
                  value={rate}
                  onChange={(e) => setRate(parseInt(e.target.value) || 0)}
                  placeholder="5000"
                />
              </div>

              <div>
                <Label>{t.rateType}</Label>
                <Select value={rateType} onValueChange={(val: any) => setRateType(val)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="perHour">{t.perHour}</SelectItem>
                    <SelectItem value="perSession">{t.perSession}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <Label className="flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {t.schedule}
                </Label>
                <Textarea
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  placeholder={t.schedulePlaceholder}
                  rows={3}
                />
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {t.duration}
                </Label>
                <Select value={duration} onValueChange={setDuration}>
                  <SelectTrigger>
                    <SelectValue placeholder={t.selectDuration} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="3">3 {t.months}</SelectItem>
                    <SelectItem value="6">6 {t.months}</SelectItem>
                    <SelectItem value="12">12 {t.months}</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label>{t.startDate}</Label>
                <Input
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>
            </div>
          </div>

          {/* Special Terms */}
          <div>
            <Label>{t.specialTerms}</Label>
            <Textarea
              value={specialTerms}
              onChange={(e) => setSpecialTerms(e.target.value)}
              placeholder={t.specialTermsPlaceholder}
              rows={2}
            />
          </div>

          {/* Terms & Conditions */}
          <div className="p-4 bg-gray-50 rounded-lg space-y-3">
            <h4 className="flex items-center gap-2">
              <FileText className="w-5 h-5" />
              {t.termsConditions}
            </h4>
            <ul className="space-y-2">
              {t.terms.map((term) => (
                <li key={term} className="flex items-start gap-2 text-sm text-gray-700">
                  <CheckCircle2 className="w-4 h-4 text-green-600 mt-0.5 shrink-0" />
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Agreement Checkbox */}
          <div className="flex items-start gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
            <Checkbox
              id="agree-terms"
              checked={agreedToTerms}
              onCheckedChange={(checked) => setAgreedToTerms(checked as boolean)}
            />
            <Label htmlFor="agree-terms" className="cursor-pointer">
              {t.agreeTerms}
            </Label>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.cancel}
          </Button>
          <Button
            onClick={handleSend}
            disabled={!agreedToTerms || !studentName || !subjects || !schedule || !startDate}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          >
            <FileText className="w-4 h-4 mr-2" />
            {t.sendAgreement}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
