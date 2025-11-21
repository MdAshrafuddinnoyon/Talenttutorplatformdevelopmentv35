import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { RealtimeMessenger } from '../components/RealtimeMessenger';
import { VideoMeetingDialog } from '../components/VideoMeetingDialog';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Button } from '../components/ui/button';
import { Switch } from '../components/ui/switch';
import { Label } from '../components/ui/label';
import { Separator } from '../components/ui/separator';
import { 
  MessageSquare, 
  Video, 
  Bell, 
  Volume2, 
  VolumeX,
  Shield,
  Lock,
  Eye,
  Download,
  Trash2,
} from 'lucide-react';
import { notificationSound } from '../utils/notificationSound';
import { toast } from 'sonner@2.0.3';

interface MessagesPageProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
  setLanguage?: (lang: 'bn' | 'en') => void;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'মেসেজ',
    subtitle: 'আপনার সব কথোপকথন এক জায়গায়',
    settings: 'সেটিংস',
    notifications: 'নোটিফিকেশন সেটিংস',
    soundEnabled: 'সাউন্ড ইফেক্ট চালু করুন',
    soundDesc: 'নতুন মেসেজ আসলে সাউন্ড বাজবে',
    pushNotifications: 'পুশ নোটিফিকেশন',
    pushDesc: 'ব্রাউজার নোটিফিকেশন চালু করুন',
    privacy: 'গোপনীয়তা',
    readReceipts: 'রিড রিসিপ্ট',
    readReceiptsDesc: 'অন্যরা দেখতে পারবে আপনি মেসেজ পড়েছেন কিনা',
    onlineStatus: 'অনলাইন স্ট্যাটাস',
    onlineStatusDesc: 'আপনার অনলাইন স্ট্যাটাস দেখাবে',
    dataManagement: 'ডাটা ম্যানেজমেন্ট',
    exportChat: 'চ্যাট এক্সপোর্ট করুন',
    exportDesc: 'আপনার সব চ্যাট ডাউনলোড করুন',
    clearChat: 'চ্যাট মুছুন',
    clearDesc: 'সব চ্যাট হিস্ট্রি মুছে ফেলুন',
    export: 'এক্সপোর্ট',
    clear: 'মুছুন',
    security: 'নিরাপত্তা',
    encryption: 'এন্ড-টু-এন্ড এনক্রিপশন',
    encryptionDesc: 'আপনার সব মেসেজ এনক্রিপ্টেড',
    enableNotifications: 'নোটিফিকেশন চালু করুন',
    testSound: 'সাউন্ড টেস্ট করুন',
    soundTest: 'সাউন্ড টেস্ট',
    features: 'বৈশিষ্ট্য',
    realtimeChat: 'রিয়েল-টাইম চ্যাট',
    realtimeDesc: 'তাৎক্ষণিক মেসেজ আদান-প্রদান',
    videoCall: 'ভিডিও কল',
    videoCallDesc: 'HD কোয়ালিটি ভিডিও কল',
    fileSharing: 'ফাইল শেয়ারিং',
    fileSharingDesc: 'ছবি, ডকুমেন্ট শেয়ার করুন',
    typingIndicator: 'টাইপিং ইন্ডিকেটর',
    typingDesc: 'দেখুন কে টাইপ করছে',
    info: 'তথ্য',
    hiredOnly: '✅ শুধুমাত্র নিয়োগপ্রাপ্ত শিক্ষক/অভিভাবক চ্যাট করতে পারবেন',
    encrypted: '🔒 সব মেসেজ এনক্রিপ্টেড এবং নিরাপদ',
    realtime: '⚡ রিয়েল-টাইম মেসেজিং সিস্টেম',
    support: '💬 ২৪/৭ সাপোর্ট উপলব্ধ',
  },
  en: {
    title: 'Messages',
    subtitle: 'All your conversations in one place',
    settings: 'Settings',
    notifications: 'Notification Settings',
    soundEnabled: 'Enable Sound Effects',
    soundDesc: 'Play sound when new messages arrive',
    pushNotifications: 'Push Notifications',
    pushDesc: 'Enable browser notifications',
    privacy: 'Privacy',
    readReceipts: 'Read Receipts',
    readReceiptsDesc: 'Let others see when you read messages',
    onlineStatus: 'Online Status',
    onlineStatusDesc: 'Show your online status',
    dataManagement: 'Data Management',
    exportChat: 'Export Chat',
    exportDesc: 'Download all your chats',
    clearChat: 'Clear Chat',
    clearDesc: 'Delete all chat history',
    export: 'Export',
    clear: 'Clear',
    security: 'Security',
    encryption: 'End-to-End Encryption',
    encryptionDesc: 'All your messages are encrypted',
    enableNotifications: 'Enable Notifications',
    testSound: 'Test Sound',
    soundTest: 'Sound Test',
    features: 'Features',
    realtimeChat: 'Real-time Chat',
    realtimeDesc: 'Instant message exchange',
    videoCall: 'Video Call',
    videoCallDesc: 'HD quality video calls',
    fileSharing: 'File Sharing',
    fileSharingDesc: 'Share images, documents',
    typingIndicator: 'Typing Indicator',
    typingDesc: 'See who is typing',
    info: 'Information',
    hiredOnly: '✅ Only hired teachers/guardians can chat',
    encrypted: '🔒 All messages are encrypted and secure',
    realtime: '⚡ Real-time messaging system',
    support: '💬 24/7 support available',
  },
};

export function MessagesPage({ language, setPage, setLanguage, onLogin }: MessagesPageProps) {
  const t = content[language];
  
  // Mock current user (in real app, get from auth)
  const currentUser = {
    id: 'user-123',
    name: 'রহিম আহমেদ',
    photo: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&q=80',
    role: 'guardian' as const,
  };

  // Settings state
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [pushEnabled, setPushEnabled] = useState(false);
  const [readReceipts, setReadReceipts] = useState(true);
  const [onlineStatus, setOnlineStatus] = useState(true);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const [selectedConversationForCall, setSelectedConversationForCall] = useState<string | null>(null);

  // Request notification permission on mount
  useEffect(() => {
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }
  }, []);

  // Update sound settings
  useEffect(() => {
    notificationSound.setEnabled(soundEnabled);
  }, [soundEnabled]);

  const handleStartVideoCall = (conversationId: string) => {
    setSelectedConversationForCall(conversationId);
    setShowVideoDialog(true);
  };

  const handleStartAudioCall = (conversationId: string) => {
    toast.success(language === 'bn' ? 'অডিও কল শুরু হচ্ছে...' : 'Starting audio call...');
    // In real app: Start WebRTC audio call
  };

  const handleExportChat = () => {
    toast.success(language === 'bn' ? 'চ্যাট এক্সপোর্ট হচ্ছে...' : 'Exporting chat...');
    // In real app: Export chat data
  };

  const handleClearChat = () => {
    if (confirm(language === 'bn' ? 'সব চ্যাট মুছে ফেলবেন?' : 'Clear all chats?')) {
      toast.success(language === 'bn' ? 'চ্যাট মুছে ফেলা হয়েছে' : 'Chat cleared');
    }
  };

  const handleTestSound = () => {
    notificationSound.playMessageSound();
    toast.success(language === 'bn' ? 'সাউন্ড টেস্ট সফল!' : 'Sound test successful!');
  };

  const handleEnableNotifications = async () => {
    if ('Notification' in window) {
      const permission = await Notification.requestPermission();
      if (permission === 'granted') {
        setPushEnabled(true);
        toast.success(language === 'bn' ? 'নোটিফিকেশন চালু হয়েছে' : 'Notifications enabled');
      } else {
        toast.error(language === 'bn' ? 'নোটিফিকেশন অনুমতি দিন' : 'Please allow notifications');
      }
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header language={language} setPage={setPage} setLanguage={setLanguage} onLogin={onLogin} />
      
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl mb-2 flex items-center gap-3">
            <MessageSquare className="w-8 h-8 text-teal-600" />
            {t.title}
          </h1>
          <p className="text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-4 gap-6">
          {/* Main Messenger */}
          <div className="lg:col-span-3">
            <RealtimeMessenger
              currentUserId={currentUser.id}
              currentUserName={currentUser.name}
              currentUserPhoto={currentUser.photo}
              currentUserRole={currentUser.role}
              language={language}
              onStartVideoCall={handleStartVideoCall}
              onStartAudioCall={handleStartAudioCall}
            />
          </div>

          {/* Sidebar - Settings & Info */}
          <div className="lg:col-span-1 space-y-6">
            {/* Features */}
            <Card className="p-5">
              <h3 className="flex items-center gap-2 mb-4">
                <Video className="w-5 h-5 text-teal-600" />
                {t.features}
              </h3>
              <div className="space-y-3 text-sm">
                <div className="flex items-start gap-2">
                  <MessageSquare className="w-4 h-4 text-teal-600 mt-0.5" />
                  <div>
                    <p className="font-semibold">{t.realtimeChat}</p>
                    <p className="text-gray-600 text-xs">{t.realtimeDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Video className="w-4 h-4 text-teal-600 mt-0.5" />
                  <div>
                    <p className="font-semibold">{t.videoCall}</p>
                    <p className="text-gray-600 text-xs">{t.videoCallDesc}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Download className="w-4 h-4 text-teal-600 mt-0.5" />
                  <div>
                    <p className="font-semibold">{t.fileSharing}</p>
                    <p className="text-gray-600 text-xs">{t.fileSharingDesc}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Settings */}
            <Card className="p-5">
              <h3 className="flex items-center gap-2 mb-4">
                <Bell className="w-5 h-5 text-teal-600" />
                {t.notifications}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="flex items-center gap-2 cursor-pointer">
                      {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                      {t.soundEnabled}
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">{t.soundDesc}</p>
                  </div>
                  <Switch checked={soundEnabled} onCheckedChange={setSoundEnabled} />
                </div>

                {soundEnabled && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleTestSound}
                    className="w-full"
                  >
                    {t.testSound}
                  </Button>
                )}

                <Separator />

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="flex items-center gap-2">
                      <Bell className="w-4 h-4" />
                      {t.pushNotifications}
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">{t.pushDesc}</p>
                  </div>
                  <Switch 
                    checked={pushEnabled} 
                    onCheckedChange={(checked) => {
                      if (checked) {
                        handleEnableNotifications();
                      } else {
                        setPushEnabled(false);
                      }
                    }} 
                  />
                </div>
              </div>
            </Card>

            {/* Privacy */}
            <Card className="p-5">
              <h3 className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-teal-600" />
                {t.privacy}
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label className="flex items-center gap-2">
                      <Eye className="w-4 h-4" />
                      {t.readReceipts}
                    </Label>
                    <p className="text-xs text-gray-500 mt-1">{t.readReceiptsDesc}</p>
                  </div>
                  <Switch checked={readReceipts} onCheckedChange={setReadReceipts} />
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex-1">
                    <Label>{t.onlineStatus}</Label>
                    <p className="text-xs text-gray-500 mt-1">{t.onlineStatusDesc}</p>
                  </div>
                  <Switch checked={onlineStatus} onCheckedChange={setOnlineStatus} />
                </div>
              </div>
            </Card>

            {/* Security Info */}
            <Card className="p-5 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
              <h3 className="flex items-center gap-2 mb-3">
                <Lock className="w-5 h-5 text-green-600" />
                {t.security}
              </h3>
              <div className="space-y-2 text-sm">
                <div className="flex items-start gap-2 text-green-800">
                  <Lock className="w-4 h-4 mt-0.5 shrink-0" />
                  <div>
                    <p className="font-semibold">{t.encryption}</p>
                    <p className="text-xs">{t.encryptionDesc}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Important Info */}
            <Card className="p-5 bg-gradient-to-r from-teal-50 to-emerald-50 border-teal-200">
              <h3 className="flex items-center gap-2 mb-3">
                <MessageSquare className="w-5 h-5 text-teal-600" />
                {t.info}
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <p>{t.hiredOnly}</p>
                <p>{t.encrypted}</p>
                <p>{t.realtime}</p>
                <p>{t.support}</p>
              </div>
            </Card>

            {/* Data Management */}
            <Card className="p-5">
              <h3 className="mb-4">{t.dataManagement}</h3>
              <div className="space-y-3">
                <div>
                  <Label>{t.exportChat}</Label>
                  <p className="text-xs text-gray-500 mb-2">{t.exportDesc}</p>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={handleExportChat}
                    className="w-full"
                  >
                    <Download className="w-4 h-4 mr-2" />
                    {t.export}
                  </Button>
                </div>
                <Separator />
                <div>
                  <Label>{t.clearChat}</Label>
                  <p className="text-xs text-gray-500 mb-2">{t.clearDesc}</p>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={handleClearChat}
                    className="w-full"
                  >
                    <Trash2 className="w-4 h-4 mr-2" />
                    {t.clear}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Video Meeting Dialog */}
      <VideoMeetingDialog
        open={showVideoDialog}
        onOpenChange={setShowVideoDialog}
        language={language}
        onSchedule={(data) => {
          console.log('Video meeting scheduled:', data);
          toast.success(language === 'bn' ? 'মিটিং শিডিউল হয়েছে' : 'Meeting scheduled');
          setShowVideoDialog(false);
        }}
      />

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
