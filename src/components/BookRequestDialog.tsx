import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Badge } from './ui/badge';
import { Send, MapPin, User, Phone, MessageSquare } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface BookRequestDialogProps {
  isOpen: boolean;
  onClose: () => void;
  item: any;
  currentUser: any;
  language: 'bn' | 'en';
  onRequestSent?: () => void;
}

const content = {
  bn: {
    title: 'বই অনুরোধ করুন',
    description: 'আপনার তথ্য দিয়ে অনুরোধ পাঠান। দাতা শীঘ্রই আপনার সাথে যোগাযোগ করবেন।',
    itemDetails: 'আইটেম বিবরণ',
    yourName: 'আপনার নাম',
    namePlaceholder: 'পূর্ণ নাম লিখুন',
    yourPhone: 'মোবাইল নম্বর',
    phonePlaceholder: '০১৭xxxxxxxx',
    yourAddress: 'আপনার সম্পূর্ণ ঠিকানা',
    addressPlaceholder: 'বাড়ি নং, রোড, এলাকা, জেলা',
    message: 'বার্তা (ঐচ্ছিক)',
    messagePlaceholder: 'দাতার জন্য কোনো বার্তা থাকলে লিখুন...',
    cancel: 'বাতিল',
    sendRequest: 'অনুরোধ পাঠান',
    sending: 'পাঠানো হচ্ছে...',
    requestSent: 'অনুরোধ সফলভাবে পাঠানো হয়েছে!',
    requestSentDesc: 'দাতা শীঘ্রই আপনার সাথে যোগাযোগ করবেন। আপনার ফোন চেক করুন।',
    fillAllFields: 'সব তথ্য পূরণ করুন',
    donorWillContact: 'দাতা অনুমোদনের পর আপনার সাথে যোগাযোগ করবেন',
  },
  en: {
    title: 'Request Book',
    description: 'Send your request with your details. Donor will contact you soon.',
    itemDetails: 'Item Details',
    yourName: 'Your Name',
    namePlaceholder: 'Enter full name',
    yourPhone: 'Mobile Number',
    phonePlaceholder: '01xxxxxxxxx',
    yourAddress: 'Your Complete Address',
    addressPlaceholder: 'House no, Road, Area, District',
    message: 'Message (Optional)',
    messagePlaceholder: 'Write a message for the donor...',
    cancel: 'Cancel',
    sendRequest: 'Send Request',
    sending: 'Sending...',
    requestSent: 'Request sent successfully!',
    requestSentDesc: 'Donor will contact you soon. Check your phone.',
    fillAllFields: 'Please fill all fields',
    donorWillContact: 'Donor will contact you after approval',
  },
};

export function BookRequestDialog({ isOpen, onClose, item, currentUser, language, onRequestSent }: BookRequestDialogProps) {
  const t = content[language];
  const [name, setName] = useState(currentUser?.name || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = async () => {
    if (!name || !phone || !address) {
      toast.error(t.fillAllFields);
      return;
    }

    setIsSending(true);

    try {
      // Simulate API call to send request to donor
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Generate unique request ID
      const requestId = `REQ-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const requestData = {
        id: requestId,
        itemId: item.id,
        itemTitle: item.title,
        itemPhoto: item.photo,
        itemClass: item.class,
        itemSubject: item.subject || '',
        itemCondition: item.condition,
        studentId: currentUser.id,
        studentName: name,
        studentPhone: phone,
        studentAddress: address,
        message: message,
        donorId: item.donorId || 'donor-' + item.donorName.toLowerCase().replace(/\s+/g, '-'),
        donorName: item.donorName,
        status: 'pending',
        requestDate: new Date().toISOString(),
        updatedDate: new Date().toISOString(),
      };

      // Save to localStorage for student tracking
      const existingRequests = JSON.parse(localStorage.getItem('bookRequests') || '[]');
      existingRequests.push(requestData);
      localStorage.setItem('bookRequests', JSON.stringify(existingRequests));

      // Save to donor's inbox
      const donorInbox = JSON.parse(localStorage.getItem('donorInbox') || '{}');
      if (!donorInbox[requestData.donorId]) {
        donorInbox[requestData.donorId] = [];
      }
      donorInbox[requestData.donorId].push(requestData);
      localStorage.setItem('donorInbox', JSON.stringify(donorInbox));

      // Trigger notifications
      const donorNotifications = JSON.parse(localStorage.getItem('notifications') || '[]');
      donorNotifications.push({
        id: `notif-${Date.now()}`,
        type: 'book_request',
        title: language === 'bn' ? 'নতুন বই অনুরোধ' : 'New Book Request',
        message: language === 'bn' 
          ? `${name} আপনার "${item.title}" বইটির জন্য অনুরোধ পাঠিয়েছেন`
          : `${name} has requested your book "${item.title}"`,
        userId: requestData.donorId,
        timestamp: new Date().toISOString(),
        read: false,
        link: '/donor-dashboard?tab=requests',
      });
      localStorage.setItem('notifications', JSON.stringify(donorNotifications));

      console.log('Request sent:', requestData);

      toast.success(t.requestSent, {
        description: t.requestSentDesc,
      });

      if (onRequestSent) {
        onRequestSent();
      }

      onClose();
    } catch (error) {
      toast.error(language === 'bn' ? 'অনুরোধ পাঠাতে সমস্যা হয়েছে' : 'Failed to send request');
    } finally {
      setIsSending(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className={`max-w-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Send className="w-5 h-5 text-emerald-600" />
            {t.title}
          </DialogTitle>
          <DialogDescription className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
            {t.description}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Item Details */}
          <div className="bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg p-4 border border-emerald-200">
            <h4 className={`text-sm text-gray-700 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.itemDetails}
            </h4>
            <div className="flex items-start gap-3">
              <img 
                src={item.photo} 
                alt={item.title} 
                className="w-16 h-16 rounded-lg object-cover"
              />
              <div className="flex-1">
                <h5 className={`text-gray-900 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {item.title}
                </h5>
                <div className="flex items-center gap-2 text-xs text-gray-600">
                  <User className="w-3 h-3" />
                  <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                    {item.donorName}
                  </span>
                  <MapPin className="w-3 h-3 ml-2" />
                  <span className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                    {item.location}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Student Information Form */}
          <div className="space-y-3">
            <div>
              <Label className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                {t.yourName} *
              </Label>
              <Input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder={t.namePlaceholder}
                className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
              />
            </div>

            <div>
              <Label className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                {t.yourPhone} *
              </Label>
              <Input
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                placeholder={t.phonePlaceholder}
                type="tel"
              />
            </div>

            <div>
              <Label className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                {t.yourAddress} *
              </Label>
              <Textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder={t.addressPlaceholder}
                className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
                rows={2}
              />
            </div>

            <div>
              <Label className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}>
                {t.message}
              </Label>
              <Textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder={t.messagePlaceholder}
                className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
                rows={5}
              />
              <p className={`text-xs text-gray-500 mt-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {language === 'bn' 
                  ? 'আপনার পরিস্থিতি এবং কেন এই বইটি প্রয়োজন তা বিস্তারিত লিখুন'
                  : 'Describe your situation and why you need this book in detail'
                }
              </p>
            </div>
          </div>

          {/* Info Badge */}
          <Badge variant="outline" className={`w-full justify-start gap-2 p-3 bg-blue-50 border-blue-200 text-blue-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            <MessageSquare className="w-4 h-4" />
            {t.donorWillContact}
          </Badge>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isSending}
            className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
          >
            {t.cancel}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSending}
            className={`bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
          >
            {isSending ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                {t.sending}
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {t.sendRequest}
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
