import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Calendar } from './ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import {
  Video,
  Calendar as CalendarIcon,
  Clock,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle,
  Plus,
  Eye,
  Mail,
  Download,
  Link as LinkIcon,
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { copyToClipboard } from '../utils/clipboard';

interface Meeting {
  id: string;
  type: 'scheduled' | 'completed' | 'cancelled' | 'missed';
  otherParty: {
    name: string;
    photo: string;
    role: 'teacher' | 'guardian';
  };
  subject: string;
  date: Date;
  duration: number; // in minutes
  meetingLink?: string;
  notes?: string;
  scheduledAt: Date;
  creditsDeducted: number;
}

interface MeetingScheduleSectionProps {
  meetings: Meeting[];
  userType: 'teacher' | 'guardian';
  language: 'bn' | 'en';
  onJoinMeeting: (meetingId: string) => void;
  onCancelMeeting: (meetingId: string) => void;
  onRescheduleMeeting: (meetingId: string) => void;
  onScheduleNew: () => void;
}

const content = {
  bn: {
    title: 'ভিডিও মিটিং শিডিউল',
    upcomingMeetings: 'আসন্ন মিটিং',
    pastMeetings: 'অতীত মিটিং',
    cancelledMeetings: 'বাতিল মিটিং',
    noMeetings: 'কোনো মিটিং নেই',
    scheduleNew: 'নতুন মিটিং শিডিউল করুন',
    meeting: 'মিটিং',
    with: 'সাথে',
    subject: 'বিষয়',
    date: 'তারিখ',
    time: 'সময়',
    duration: 'সময়কাল',
    minutes: 'মিনিট',
    status: 'স্ট্যাটাস',
    scheduled: 'নির্ধারিত',
    completed: 'সম্পন্ন',
    cancelled: 'বাতিল',
    missed: 'মিস',
    creditsUsed: 'ক্রেডিট ব্যয়',
    joinMeeting: 'মিটিং জয়েন করুন',
    cancelMeeting: 'মিটিং বাতিল করুন',
    rescheduleMeeting: 'পুনঃনির্ধারণ করুন',
    getMeetingLink: 'মিটিং লিংক পান',
    addToCalendar: 'ক্যালেন্ডারে যোগ করুন',
    sendReminder: 'রিমাইন্ডার পাঠান',
    notes: 'নোট',
    scheduledAt: 'শিডিউল করা হয়েছে',
    startsIn: 'শুরু হবে',
    days: 'দিন',
    hours: 'ঘণ্টা',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    today: 'আজ',
    tomorrow: 'আগামীকাল',
    thisWeek: 'এই সপ্তাহে',
    later: 'পরে',
  },
  en: {
    title: 'Video Meeting Schedule',
    upcomingMeetings: 'Upcoming Meetings',
    pastMeetings: 'Past Meetings',
    cancelledMeetings: 'Cancelled Meetings',
    noMeetings: 'No meetings found',
    scheduleNew: 'Schedule New Meeting',
    meeting: 'Meeting',
    with: 'with',
    subject: 'Subject',
    date: 'Date',
    time: 'Time',
    duration: 'Duration',
    minutes: 'minutes',
    status: 'Status',
    scheduled: 'Scheduled',
    completed: 'Completed',
    cancelled: 'Cancelled',
    missed: 'Missed',
    creditsUsed: 'Credits Used',
    joinMeeting: 'Join Meeting',
    cancelMeeting: 'Cancel Meeting',
    rescheduleMeeting: 'Reschedule',
    getMeetingLink: 'Get Meeting Link',
    addToCalendar: 'Add to Calendar',
    sendReminder: 'Send Reminder',
    notes: 'Notes',
    scheduledAt: 'Scheduled At',
    startsIn: 'Starts in',
    days: 'days',
    hours: 'hours',
    teacher: 'Teacher',
    guardian: 'Guardian',
    today: 'Today',
    tomorrow: 'Tomorrow',
    thisWeek: 'This Week',
    later: 'Later',
  },
};

export function MeetingScheduleSection({
  meetings,
  userType,
  language,
  onJoinMeeting,
  onCancelMeeting,
  onRescheduleMeeting,
  onScheduleNew,
}: MeetingScheduleSectionProps) {
  const t = content[language];
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());

  const getStatusBadge = (type: Meeting['type']) => {
    const variants: Record<Meeting['type'], { bg: string; text: string; icon: any }> = {
      scheduled: { bg: 'bg-blue-100', text: 'text-blue-800', icon: Clock },
      completed: { bg: 'bg-green-100', text: 'text-green-800', icon: CheckCircle2 },
      cancelled: { bg: 'bg-gray-100', text: 'text-gray-800', icon: XCircle },
      missed: { bg: 'bg-red-100', text: 'text-red-800', icon: AlertCircle },
    };
    const variant = variants[type];
    const Icon = variant.icon;
    return (
      <Badge className={`${variant.bg} ${variant.text} border-0 flex items-center gap-1`}>
        <Icon className="w-3 h-3" />
        {t[type]}
      </Badge>
    );
  };

  const getTimeUntilMeeting = (date: Date) => {
    const now = new Date();
    const diff = date.getTime() - now.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) {
      return `${days} ${t.days}`;
    } else if (hours > 0) {
      return `${hours} ${t.hours}`;
    } else {
      return t.today;
    }
  };

  const getMeetingGroup = (date: Date): 'today' | 'tomorrow' | 'thisWeek' | 'later' => {
    const now = new Date();
    const diffDays = Math.floor((date.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));

    if (diffDays === 0) return 'today';
    if (diffDays === 1) return 'tomorrow';
    if (diffDays <= 7) return 'thisWeek';
    return 'later';
  };

  const groupedMeetings = meetings
    .filter((m) => m.type === 'scheduled')
    .reduce((acc, meeting) => {
      const group = getMeetingGroup(meeting.date);
      if (!acc[group]) acc[group] = [];
      acc[group].push(meeting);
      return acc;
    }, {} as Record<string, Meeting[]>);

  const handleJoinMeeting = (meetingId: string) => {
    onJoinMeeting(meetingId);
    toast.success(language === 'bn' ? 'মিটিং রুমে প্রবেশ করছেন...' : 'Joining meeting room...');
  };

  const handleCancelMeeting = (meetingId: string) => {
    onCancelMeeting(meetingId);
    toast.success(language === 'bn' ? 'মিটিং বাতিল হয়েছে' : 'Meeting cancelled');
  };

  const handleGetMeetingLink = async (meeting: Meeting) => {
    if (meeting.meetingLink) {
      const success = await copyToClipboard(meeting.meetingLink);
      if (success) {
        toast.success(language === 'bn' ? 'লিংক কপি হয়েছে' : 'Link copied to clipboard');
      } else {
        toast.error(language === 'bn' ? 'লিংক কপি করতে ব্যর্থ' : 'Failed to copy link');
      }
    }
  };

  const handleAddToCalendar = (meeting: Meeting) => {
    // Generate .ics file for calendar
    const event = {
      title: `${t.meeting} - ${meeting.subject}`,
      description: `${t.with} ${meeting.otherParty.name}`,
      start: meeting.date,
      duration: meeting.duration,
    };
    toast.success(language === 'bn' ? 'ক্যালেন্ডারে যোগ হয়েছে' : 'Added to calendar');
  };

  const MeetingCard = ({ meeting }: { meeting: Meeting }) => {
    const isUpcoming = meeting.type === 'scheduled';
    const canJoin = isUpcoming && new Date().getTime() >= meeting.date.getTime() - 10 * 60 * 1000; // 10 minutes before

    return (
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <Card className="p-5 hover:shadow-lg transition-shadow">
          <div className="space-y-4">
            {/* Header */}
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <img
                    src={meeting.otherParty.photo}
                    alt={meeting.otherParty.name}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                  {isUpcoming && (
                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 rounded-full border-2 border-white" />
                  )}
                </div>
                <div>
                  <h3 className="font-semibold">{meeting.otherParty.name}</h3>
                  <p className="text-sm text-gray-600">
                    {meeting.otherParty.role === 'teacher' ? t.teacher : t.guardian}
                  </p>
                </div>
              </div>
              {getStatusBadge(meeting.type)}
            </div>

            {/* Meeting Details */}
            <div className="grid gap-3">
              <div className="flex items-center gap-2 text-sm">
                <Video className="w-4 h-4 text-purple-600" />
                <span>{t.subject}: {meeting.subject}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <CalendarIcon className="w-4 h-4 text-blue-600" />
                <span>{meeting.date.toLocaleDateString('bn-BD', { 
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-orange-600" />
                <span>{meeting.date.toLocaleTimeString('bn-BD', { 
                  hour: '2-digit',
                  minute: '2-digit'
                })} • {meeting.duration} {t.minutes}</span>
              </div>
            </div>

            {/* Time Until Meeting (for upcoming) */}
            {isUpcoming && (
              <div className="p-3 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-700">{t.startsIn}:</span>
                  <span className="font-semibold text-purple-700">
                    {getTimeUntilMeeting(meeting.date)}
                  </span>
                </div>
              </div>
            )}

            {/* Credits Info */}
            <div className="flex items-center justify-between text-sm p-2 bg-gray-50 rounded">
              <span className="text-gray-600">{t.creditsUsed}:</span>
              <Badge variant="secondary">
                {meeting.creditsDeducted} {language === 'bn' ? 'ক্রেডিট' : 'credits'}
              </Badge>
            </div>

            {/* Notes */}
            {meeting.notes && (
              <div className="text-sm">
                <p className="text-gray-600 mb-1">{t.notes}:</p>
                <p className="text-gray-700 p-2 bg-gray-50 rounded">{meeting.notes}</p>
              </div>
            )}

            {/* Actions */}
            <div className="flex flex-wrap gap-2 pt-2 border-t">
              {isUpcoming && canJoin && (
                <Button
                  size="sm"
                  onClick={() => handleJoinMeeting(meeting.id)}
                  className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                >
                  <Video className="w-4 h-4 mr-1" />
                  {t.joinMeeting}
                </Button>
              )}
              {isUpcoming && !canJoin && meeting.meetingLink && (
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleGetMeetingLink(meeting)}
                >
                  <LinkIcon className="w-4 h-4 mr-1" />
                  {t.getMeetingLink}
                </Button>
              )}
              {isUpcoming && (
                <>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleAddToCalendar(meeting)}
                  >
                    <Download className="w-4 h-4 mr-1" />
                    {t.addToCalendar}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onRescheduleMeeting(meeting.id)}
                  >
                    <CalendarIcon className="w-4 h-4 mr-1" />
                    {t.rescheduleMeeting}
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleCancelMeeting(meeting.id)}
                  >
                    <XCircle className="w-4 h-4 mr-1" />
                    {t.cancelMeeting}
                  </Button>
                </>
              )}
            </div>
          </div>
        </Card>
      </motion.div>
    );
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl mb-2">{t.title}</h2>
          <p className="text-gray-600">
            {language === 'bn'
              ? 'আপনার সব ভিডিও মিটিং এক জায়গায়'
              : 'All your video meetings in one place'}
          </p>
        </div>
        <Button onClick={onScheduleNew} className="bg-purple-600 hover:bg-purple-700">
          <Plus className="w-4 h-4 mr-2" />
          {t.scheduleNew}
        </Button>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Calendar */}
        <Card className="p-4 lg:col-span-1">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md"
          />
          <div className="mt-4 space-y-2">
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
              <span>{t.scheduled}</span>
            </div>
            <div className="flex items-center gap-2 text-sm">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>{t.completed}</span>
            </div>
          </div>
        </Card>

        {/* Meetings List */}
        <div className="lg:col-span-2 space-y-6">
          <Tabs defaultValue="upcoming" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="upcoming">
                {t.upcomingMeetings} ({meetings.filter(m => m.type === 'scheduled').length})
              </TabsTrigger>
              <TabsTrigger value="past">
                {t.pastMeetings} ({meetings.filter(m => m.type === 'completed').length})
              </TabsTrigger>
              <TabsTrigger value="cancelled">
                {t.cancelledMeetings} ({meetings.filter(m => m.type === 'cancelled' || m.type === 'missed').length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="upcoming" className="space-y-4 mt-6">
              {meetings.filter(m => m.type === 'scheduled').length === 0 ? (
                <Card className="p-12 text-center">
                  <Video className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">{t.noMeetings}</p>
                  <Button onClick={onScheduleNew} variant="outline" className="mt-4">
                    <Plus className="w-4 h-4 mr-2" />
                    {t.scheduleNew}
                  </Button>
                </Card>
              ) : (
                <>
                  {/* Group by time */}
                  {(Object.keys(groupedMeetings) as Array<keyof typeof groupedMeetings>).map((group) => (
                    <div key={group} className="space-y-3">
                      <h3 className="text-lg font-semibold text-gray-700">{t[group]}</h3>
                      <div className="space-y-3">
                        {groupedMeetings[group]?.map((meeting) => (
                          <MeetingCard key={meeting.id} meeting={meeting} />
                        ))}
                      </div>
                    </div>
                  ))}
                </>
              )}
            </TabsContent>

            <TabsContent value="past" className="space-y-4 mt-6">
              {meetings.filter(m => m.type === 'completed').length === 0 ? (
                <Card className="p-12 text-center">
                  <CheckCircle2 className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">{t.noMeetings}</p>
                </Card>
              ) : (
                meetings.filter(m => m.type === 'completed').map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))
              )}
            </TabsContent>

            <TabsContent value="cancelled" className="space-y-4 mt-6">
              {meetings.filter(m => m.type === 'cancelled' || m.type === 'missed').length === 0 ? (
                <Card className="p-12 text-center">
                  <XCircle className="w-12 h-12 mx-auto mb-4 text-gray-400" />
                  <p className="text-gray-600">{t.noMeetings}</p>
                </Card>
              ) : (
                meetings.filter(m => m.type === 'cancelled' || m.type === 'missed').map((meeting) => (
                  <MeetingCard key={meeting.id} meeting={meeting} />
                ))
              )}
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
}
