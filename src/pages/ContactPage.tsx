import { useState } from 'react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Textarea } from '../components/ui/textarea';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import {
  Mail,
  Phone,
  MapPin,
  Clock,
  Send,
  MessageSquare,
  Headphones,
  CheckCircle,
  ArrowLeft,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ContactPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  userRole: 'teacher' | 'guardian' | 'student' | 'donor' | 'admin' | null;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'যোগাযোগ করুন',
    subtitle: 'আমরা আপনার সেবায় সর্বদা প্রস্তুত',
    getInTouch: 'আমাদের সাথে যোগাযোগ করুন',
    contactInfo: 'যোগাযোগের তথ্য',
    
    // Form
    name: 'আপনার নাম',
    namePlaceholder: 'পূর্ণ নাম লিখুন',
    email: 'ইমেইল',
    emailPlaceholder: 'your@email.com',
    phone: 'ফোন নম্বর',
    phonePlaceholder: '+৮৮০ 1XXX-XXXXXX',
    subject: 'বিষয়',
    subjectPlaceholder: 'কি বিষয়ে জানতে চান?',
    message: 'বার্তা',
    messagePlaceholder: 'আপনার বার্তা লিখুন...',
    send: 'পাঠান',
    sending: 'পাঠানো হচ্ছে...',
    
    // Contact Info
    address: 'ঠিকানা',
    addressDetail: 'Web Search BD\nঢাকা, বাংলাদেশ',
    emailAddress: 'ইমেইল',
    emailDetail: 'support@talenttutor.com\ninfo@talenttutor.com',
    phoneNumber: 'ফোন',
    phoneDetail: '+৮৮০ 1XXX-XXXXXX\n+৮৮০ 1XXX-YYYYYY',
    workingHours: 'কর্মঘণ্টা',
    workingHoursDetail: 'শনি - বৃহস্পতি: ৯:০০ AM - ৬:০০ PM\nশুক্রবার: বন্ধ',
    
    // Quick Contact
    quickContact: 'দ্রুত যোগাযোগ',
    supportChat: 'সাপোর্ট চ্যাট',
    supportChatDesc: 'তাৎক্ষণিক সাহায্যের জন্য',
    createTicket: 'টিকেট তৈরি করুন',
    createTicketDesc: 'সমস্যা রিপোর্ট করুন',
    callUs: 'কল করুন',
    callUsDesc: 'সরাসরি কথা বলুন',
    
    // Success
    successTitle: 'বার্তা পাঠানো সফল!',
    successMessage: 'আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব। ধন্যবাদ!',
    
    backToHome: 'হোমে ফিরুন',
  },
  en: {
    title: 'Contact Us',
    subtitle: 'We\'re here to help you',
    getInTouch: 'Get in Touch',
    contactInfo: 'Contact Information',
    
    name: 'Your Name',
    namePlaceholder: 'Enter your full name',
    email: 'Email',
    emailPlaceholder: 'your@email.com',
    phone: 'Phone Number',
    phonePlaceholder: '+880 1XXX-XXXXXX',
    subject: 'Subject',
    subjectPlaceholder: 'What can we help you with?',
    message: 'Message',
    messagePlaceholder: 'Write your message here...',
    send: 'Send Message',
    sending: 'Sending...',
    
    address: 'Address',
    addressDetail: 'Web Search BD\nDhaka, Bangladesh',
    emailAddress: 'Email',
    emailDetail: 'support@talenttutor.com\ninfo@talenttutor.com',
    phoneNumber: 'Phone',
    phoneDetail: '+880 1XXX-XXXXXX\n+880 1XXX-YYYYYY',
    workingHours: 'Working Hours',
    workingHoursDetail: 'Saturday - Thursday: 9:00 AM - 6:00 PM\nFriday: Closed',
    
    quickContact: 'Quick Contact',
    supportChat: 'Support Chat',
    supportChatDesc: 'Get instant help',
    createTicket: 'Create Ticket',
    createTicketDesc: 'Report an issue',
    callUs: 'Call Us',
    callUsDesc: 'Speak directly',
    
    successTitle: 'Message sent successfully!',
    successMessage: 'We will contact you soon. Thank you!',
    
    backToHome: 'Back to Home',
  },
};

export function ContactPage({ language, setLanguage, setPage, userRole, announcement, onLogin }: ContactPageProps) {
  const t = content[language];
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    console.log('Contact form submitted:', formData);
    
    toast.success(t.successMessage);
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
    
    setIsSubmitting(false);
  };

  const contactMethods = [
    {
      icon: Mail,
      title: t.emailAddress,
      detail: t.emailDetail,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100',
    },
    {
      icon: Phone,
      title: t.phoneNumber,
      detail: t.phoneDetail,
      color: 'text-green-600',
      bgColor: 'bg-green-100',
    },
    {
      icon: MapPin,
      title: t.address,
      detail: t.addressDetail,
      color: 'text-red-600',
      bgColor: 'bg-red-100',
    },
    {
      icon: Clock,
      title: t.workingHours,
      detail: t.workingHoursDetail,
      color: 'text-teal-600',
      bgColor: 'bg-teal-100',
    },
  ];

  const quickContactOptions = [
    {
      icon: MessageSquare,
      title: t.supportChat,
      description: t.supportChatDesc,
      color: 'from-blue-500 to-cyan-500',
      action: () => {/* Open chat */},
    },
    {
      icon: Headphones,
      title: t.createTicket,
      description: t.createTicketDesc,
      color: 'from-emerald-500 to-teal-500',
      action: () => setPage('help-center'),
    },
    {
      icon: Phone,
      title: t.callUs,
      description: t.callUsDesc,
      color: 'from-green-500 to-emerald-500',
      action: () => window.open('tel:+8801XXXXXXXX'),
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-teal-50">
      <Header
        language={language}
        setLanguage={setLanguage}
        setPage={setPage}
        userRole={userRole}
        announcement={announcement}
        onLogin={onLogin}
      />

      <div className="container mx-auto px-4 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <Button 
            variant="ghost" 
            onClick={() => setPage('home')}
            className="mb-6"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t.backToHome}
          </Button>
          
          <h1 className="text-gray-900 mb-4">{t.title}</h1>
          <p className="text-xl text-gray-600">{t.subtitle}</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card className="p-8">
              <h2 className="text-2xl text-gray-900 mb-6">{t.getInTouch}</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>{t.name}</Label>
                    <Input
                      required
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder={t.namePlaceholder}
                    />
                  </div>
                  
                  <div>
                    <Label>{t.email}</Label>
                    <Input
                      required
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder={t.emailPlaceholder}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <Label>{t.phone}</Label>
                    <Input
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder={t.phonePlaceholder}
                    />
                  </div>
                  
                  <div>
                    <Label>{t.subject}</Label>
                    <Input
                      required
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder={t.subjectPlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <Label>{t.message}</Label>
                  <Textarea
                    required
                    rows={6}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder={t.messagePlaceholder}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
                  size="lg"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      {t.sending}
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      {t.send}
                    </>
                  )}
                </Button>
              </form>
            </Card>
          </div>

          {/* Contact Info Sidebar */}
          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-6">{t.contactInfo}</h3>
              
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <div key={index} className="flex items-start gap-4">
                    <div className={`w-12 h-12 ${method.bgColor} rounded-lg flex items-center justify-center flex-shrink-0`}>
                      <method.icon className={`w-6 h-6 ${method.color}`} />
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-1">{method.title}</h4>
                      <p className="text-sm text-gray-600 whitespace-pre-line">{method.detail}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>

            {/* Quick Contact Options */}
            <Card className="p-6">
              <h3 className="text-lg text-gray-900 mb-6">{t.quickContact}</h3>
              
              <div className="space-y-3">
                {quickContactOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={option.action}
                    className="w-full p-4 rounded-lg bg-gradient-to-r hover:shadow-md transition-all text-left"
                    style={{
                      background: `linear-gradient(135deg, ${
                        option.color.includes('blue') ? '#3B82F6, #06B6D4' :
                        option.color.includes('emerald') ? '#10B981, #059669' :
                        '#10B981, #059669'
                      })`,
                    }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                        <option.icon className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h4 className="font-medium text-white">{option.title}</h4>
                        <p className="text-xs text-white/80">{option.description}</p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </Card>
          </div>
        </div>

        {/* Map Section (Placeholder) */}
        <Card className="p-8 bg-gradient-to-br from-teal-50 to-emerald-50">
          <div className="text-center">
            <MapPin className="w-12 h-12 text-teal-600 mx-auto mb-4" />
            <h3 className="text-xl text-gray-900 mb-2">আমাদের অফিস</h3>
            <p className="text-gray-600 mb-4">ঢাকা, বাংলাদেশ</p>
            <div className="h-64 bg-gray-200 rounded-lg flex items-center justify-center">
              <span className="text-gray-500">Map will be displayed here</span>
            </div>
          </div>
        </Card>
      </div>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
