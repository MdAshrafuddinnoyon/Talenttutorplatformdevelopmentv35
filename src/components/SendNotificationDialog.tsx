import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Mail, MessageSquare, Bell, Send, Loader2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface SendNotificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  userId?: string;
  userName?: string;
  userEmail?: string;
  userPhone?: string;
  language: 'bn' | 'en';
  onSuccess?: () => void;
}

const content = {
  bn: {
    title: 'নোটিফিকেশন পাঠান',
    description: 'ইউজারকে SMS/Email নোটিফিকেশন পাঠান',
    recipient: 'প্রাপক',
    notificationType: 'নোটিফিকেশন টাইপ',
    channel: 'চ্যানেল',
    subject: 'বিষয়',
    message: 'বার্তা',
    send: 'পাঠান',
    cancel: 'বাতিল',
    sending: 'পাঠানো হচ্ছে...',
    success: 'নোটিফিকেশন সফলভাবে পাঠানো হয়েছে',
    error: 'নোটিফিকেশন পাঠাতে ব্যর্থ',
    
    types: {
      profile_approved: 'প্রোফাইল অনুমোদিত',
      profile_needs_update: 'প্রোফাইল আপডেট প্রয়োজন',
      application_status: 'আবেদনের স্ট্যাটাস',
      general: 'সাধারণ'
    },
    
    channels: {
      email: 'ইমেইল',
      sms: 'SMS',
      both: 'উভয়'
    },
    
    placeholders: {
      subject: 'নোটিফিকেশনের বিষয় লিখুন',
      message: 'আপনার বার্তা লিখুন...'
    }
  },
  en: {
    title: 'Send Notification',
    description: 'Send SMS/Email notification to user',
    recipient: 'Recipient',
    notificationType: 'Notification Type',
    channel: 'Channel',
    subject: 'Subject',
    message: 'Message',
    send: 'Send',
    cancel: 'Cancel',
    sending: 'Sending...',
    success: 'Notification sent successfully',
    error: 'Failed to send notification',
    
    types: {
      profile_approved: 'Profile Approved',
      profile_needs_update: 'Profile Needs Update',
      application_status: 'Application Status',
      general: 'General'
    },
    
    channels: {
      email: 'Email',
      sms: 'SMS',
      both: 'Both'
    },
    
    placeholders: {
      subject: 'Enter notification subject',
      message: 'Write your message...'
    }
  }
};

export function SendNotificationDialog({
  open,
  onOpenChange,
  userId,
  userName,
  userEmail,
  userPhone,
  language,
  onSuccess
}: SendNotificationDialogProps) {
  const t = content[language];
  
  const [notificationType, setNotificationType] = useState('general');
  const [channel, setChannel] = useState('both');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);
  
  const handleSend = async () => {
    if (!userId) {
      toast.error(language === 'bn' ? 'ইউজার ID প্রয়োজন' : 'User ID required');
      return;
    }
    
    if (!subject || !message) {
      toast.error(language === 'bn' ? 'সব ফিল্ড পূরণ করুন' : 'Fill all fields');
      return;
    }
    
    setIsSending(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/notifications/send`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            userId,
            type: notificationType,
            channel,
            subject,
            message,
            data: {
              sentBy: 'admin',
              sentAt: new Date().toISOString()
            }
          }),
        }
      );
      
      if (response.ok) {
        toast.success(t.success);
        
        // Reset form
        setNotificationType('general');
        setChannel('both');
        setSubject('');
        setMessage('');
        
        onOpenChange(false);
        onSuccess?.();
      } else {
        throw new Error('Send failed');
      }
    } catch (error) {
      console.error('Send notification error:', error);
      toast.error(t.error);
    } finally {
      setIsSending(false);
    }
  };
  
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Bell className="w-5 h-5 text-blue-600" />
            {t.title}
          </DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>
        
        <div className="space-y-4 mt-4">
          {/* Recipient Info */}
          {userName && (
            <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
              <Label className="text-sm font-medium text-blue-900 mb-2 block">
                {t.recipient}
              </Label>
              <div className="space-y-1">
                <p className="font-medium text-blue-900">{userName}</p>
                {userEmail && (
                  <p className="text-sm text-blue-700 flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {userEmail}
                  </p>
                )}
                {userPhone && (
                  <p className="text-sm text-blue-700 flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    {userPhone}
                  </p>
                )}
              </div>
            </div>
          )}
          
          {/* Notification Type */}
          <div>
            <Label>{t.notificationType}</Label>
            <Select value={notificationType} onValueChange={setNotificationType}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="general">{t.types.general}</SelectItem>
                <SelectItem value="profile_approved">{t.types.profile_approved}</SelectItem>
                <SelectItem value="profile_needs_update">{t.types.profile_needs_update}</SelectItem>
                <SelectItem value="application_status">{t.types.application_status}</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Channel */}
          <div>
            <Label>{t.channel}</Label>
            <Select value={channel} onValueChange={setChannel}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="both">
                  <div className="flex items-center gap-2">
                    <Bell className="w-4 h-4" />
                    {t.channels.both}
                  </div>
                </SelectItem>
                <SelectItem value="email">
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4" />
                    {t.channels.email}
                  </div>
                </SelectItem>
                <SelectItem value="sms">
                  <div className="flex items-center gap-2">
                    <MessageSquare className="w-4 h-4" />
                    {t.channels.sms}
                  </div>
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          {/* Subject */}
          <div>
            <Label>{t.subject}</Label>
            <Input
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              placeholder={t.placeholders.subject}
            />
          </div>
          
          {/* Message */}
          <div>
            <Label>{t.message}</Label>
            <Textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder={t.placeholders.message}
              rows={6}
            />
          </div>
          
          {/* Actions */}
          <div className="flex gap-3 pt-4">
            <Button
              onClick={handleSend}
              disabled={isSending}
              className="flex-1"
            >
              {isSending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t.sending}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {t.send}
                </>
              )}
            </Button>
            <Button
              onClick={() => onOpenChange(false)}
              disabled={isSending}
              variant="outline"
            >
              {t.cancel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
