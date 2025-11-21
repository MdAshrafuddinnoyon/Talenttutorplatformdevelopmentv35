import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Calendar } from './ui/calendar';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Video, Calendar as CalendarIcon, Clock, CreditCard, AlertCircle, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { CREDIT_COSTS } from '../utils/creditSystem';

interface VideoMeetingDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  teacherName: string;
  teacherId: string;
  guardianId: string;
  language: 'bn' | 'en';
  teacherCredits: number;
  guardianCredits: number;
  onSchedule: (meetingData: {
    date: Date;
    time: string;
    duration: number;
    agenda: string;
  }) => void;
}

const content = {
  bn: {
    title: 'ভিডিও মিটিং শিডিউল করুন',
    description: 'শিক্ষকের সাথে ভিডিও মিটিং এর সময় নির্ধারণ করুন',
    selectDate: 'তারিখ নির্বাচন করুন',
    selectTime: 'সময় নির্বাচন করুন',
    duration: 'সময়কাল',
    minutes: 'মিনিট',
    agenda: 'এজেন্ডা',
    agendaPlaceholder: 'এই মিটিং এ কি আলোচনা হবে তা লিখুন...',
    creditCost: 'ক্রেডিট খরচ',
    perPerson: 'প্রতি ব্যক্তি',
    yourBalance: 'আপনার ব্যালেন্স',
    teacherBalance: 'শিক্ষকের ব্যালেন্স',
    credits: 'ক্রেডিট',
    insufficientCredits: 'অপর্যাপ্ত ক্রেডিট',
    sufficientCredits: 'পর্যাপ্ত ক্রেডিট',
    schedule: 'শিডিউল করুন',
    cancel: 'বাতিল',
    morning: 'সকাল',
    afternoon: 'দুপুর',
    evening: 'সন্ধ্যা',
    night: 'রাত',
    warning: 'সতর্কতা',
    bothPartiesNeedCredits: 'উভয় পক্ষের কাছে পর্যাপ্ত ক্রেডিট থাকতে হবে',
  },
  en: {
    title: 'Schedule Video Meeting',
    description: 'Schedule a video meeting with the teacher',
    selectDate: 'Select Date',
    selectTime: 'Select Time',
    duration: 'Duration',
    minutes: 'minutes',
    agenda: 'Agenda',
    agendaPlaceholder: 'What will be discussed in this meeting...',
    creditCost: 'Credit Cost',
    perPerson: 'per person',
    yourBalance: 'Your Balance',
    teacherBalance: 'Teacher Balance',
    credits: 'Credits',
    insufficientCredits: 'Insufficient Credits',
    sufficientCredits: 'Sufficient Credits',
    schedule: 'Schedule',
    cancel: 'Cancel',
    morning: 'Morning',
    afternoon: 'Afternoon',
    evening: 'Evening',
    night: 'Night',
    warning: 'Warning',
    bothPartiesNeedCredits: 'Both parties need sufficient credits',
  },
};

const timeSlots = {
  morning: ['08:00', '08:30', '09:00', '09:30', '10:00', '10:30', '11:00', '11:30'],
  afternoon: ['12:00', '12:30', '13:00', '13:30', '14:00', '14:30', '15:00', '15:30'],
  evening: ['16:00', '16:30', '17:00', '17:30', '18:00', '18:30', '19:00', '19:30'],
  night: ['20:00', '20:30', '21:00', '21:30', '22:00'],
};

export function VideoMeetingDialog({
  open,
  onOpenChange,
  teacherName,
  teacherId,
  guardianId,
  language,
  teacherCredits,
  guardianCredits,
  onSchedule,
}: VideoMeetingDialogProps) {
  const t = content[language];
  const [selectedDate, setSelectedDate] = useState<Date>();
  const [selectedTime, setSelectedTime] = useState<string>('');
  const [selectedTimeSlot, setSelectedTimeSlot] = useState<'morning' | 'afternoon' | 'evening' | 'night'>('morning');
  const [duration, setDuration] = useState<number>(30);
  const [agenda, setAgenda] = useState('');

  const creditCost = CREDIT_COSTS.VIDEO_MEETING_30MIN;
  const hasEnoughCredits = guardianCredits >= creditCost && teacherCredits >= creditCost;

  const handleSchedule = () => {
    if (!selectedDate || !selectedTime || !agenda.trim()) {
      toast.error(language === 'bn' ? 'সব তথ্য পূরণ করুন' : 'Please fill all fields');
      return;
    }

    if (!hasEnoughCredits) {
      toast.error(t.bothPartiesNeedCredits);
      return;
    }

    // Combine date and time
    const [hours, minutes] = selectedTime.split(':').map(Number);
    const meetingDate = new Date(selectedDate);
    meetingDate.setHours(hours, minutes, 0, 0);

    onSchedule({
      date: meetingDate,
      time: selectedTime,
      duration,
      agenda,
    });

    toast.success(language === 'bn' 
      ? `মিটিং শিডিউল হয়েছে! ${creditCost} ক্রেডিট কাটা হবে।`
      : `Meeting scheduled! ${creditCost} credits will be deducted.`
    );

    // Reset form
    setSelectedDate(undefined);
    setSelectedTime('');
    setAgenda('');
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Video className="w-6 h-6 text-teal-600" />
            {t.title}
          </DialogTitle>
          <DialogDescription>
            {t.description}: <span className="font-semibold">{teacherName}</span>
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Credit Info */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-gradient-to-br from-teal-50 to-cyan-50 rounded-lg border border-teal-200">
              <div className="flex items-center gap-2 mb-2">
                <CreditCard className="w-5 h-5 text-teal-600" />
                <span className="text-sm text-gray-600">{t.creditCost}</span>
              </div>
              <p className="text-2xl text-teal-600">
                {creditCost} <span className="text-sm">{t.credits}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">{t.perPerson}</p>
            </div>

            <div className={`p-4 rounded-lg border ${
              guardianCredits >= creditCost 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {guardianCredits >= creditCost ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span className="text-sm text-gray-600">{t.yourBalance}</span>
              </div>
              <p className={`text-2xl ${guardianCredits >= creditCost ? 'text-green-600' : 'text-red-600'}`}>
                {guardianCredits} <span className="text-sm">{t.credits}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {guardianCredits >= creditCost ? t.sufficientCredits : t.insufficientCredits}
              </p>
            </div>

            <div className={`p-4 rounded-lg border ${
              teacherCredits >= creditCost 
                ? 'bg-green-50 border-green-200' 
                : 'bg-red-50 border-red-200'
            }`}>
              <div className="flex items-center gap-2 mb-2">
                {teacherCredits >= creditCost ? (
                  <CheckCircle className="w-5 h-5 text-green-600" />
                ) : (
                  <AlertCircle className="w-5 h-5 text-red-600" />
                )}
                <span className="text-sm text-gray-600">{t.teacherBalance}</span>
              </div>
              <p className={`text-2xl ${teacherCredits >= creditCost ? 'text-green-600' : 'text-red-600'}`}>
                {teacherCredits} <span className="text-sm">{t.credits}</span>
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {teacherCredits >= creditCost ? t.sufficientCredits : t.insufficientCredits}
              </p>
            </div>
          </div>

          {!hasEnoughCredits && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg flex items-start gap-3"
            >
              <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-yellow-800 mb-1">{t.warning}</p>
                <p className="text-sm text-yellow-700">{t.bothPartiesNeedCredits}</p>
              </div>
            </motion.div>
          )}

          {/* Date Selection */}
          <div>
            <Label className="flex items-center gap-2 mb-2">
              <CalendarIcon className="w-4 h-4" />
              {t.selectDate}
            </Label>
            <Calendar
              mode="single"
              selected={selectedDate}
              onSelect={setSelectedDate}
              disabled={(date) => date < new Date() || date < new Date(Date.now() - 86400000)}
              className="rounded-md border"
            />
          </div>

          {/* Time Selection */}
          {selectedDate && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-3"
            >
              <Label className="flex items-center gap-2">
                <Clock className="w-4 h-4" />
                {t.selectTime}
              </Label>

              {/* Time Slot Tabs */}
              <div className="flex gap-2 flex-wrap">
                {(['morning', 'afternoon', 'evening', 'night'] as const).map((slot) => (
                  <Button
                    key={slot}
                    variant={selectedTimeSlot === slot ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => setSelectedTimeSlot(slot)}
                    className={selectedTimeSlot === slot ? 'bg-teal-600' : ''}
                  >
                    {t[slot]}
                  </Button>
                ))}
              </div>

              {/* Time Options */}
              <div className="grid grid-cols-4 gap-2">
                {timeSlots[selectedTimeSlot].map((time) => (
                  <Button
                    key={time}
                    variant={selectedTime === time ? 'default' : 'outline'}
                    onClick={() => setSelectedTime(time)}
                    className={selectedTime === time ? 'bg-teal-600' : ''}
                  >
                    {time}
                  </Button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Duration */}
          <div>
            <Label>{t.duration}</Label>
            <Select value={duration.toString()} onValueChange={(val) => setDuration(parseInt(val))}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="30">30 {t.minutes}</SelectItem>
                <SelectItem value="60">60 {t.minutes}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Agenda */}
          <div>
            <Label>{t.agenda}</Label>
            <Textarea
              value={agenda}
              onChange={(e) => setAgenda(e.target.value)}
              placeholder={t.agendaPlaceholder}
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            {t.cancel}
          </Button>
          <Button
            onClick={handleSchedule}
            disabled={!selectedDate || !selectedTime || !agenda.trim() || !hasEnoughCredits}
            className="bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700"
          >
            <Video className="w-4 h-4 mr-2" />
            {t.schedule}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
