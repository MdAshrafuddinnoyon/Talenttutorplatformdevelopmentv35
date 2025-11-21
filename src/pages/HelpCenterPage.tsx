import { useState } from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { TicketSystem } from '../components/TicketSystem';
import { VisitorSupportChat } from '../components/VisitorSupportChat';
import { UnifiedAuthDialog } from '../components/UnifiedAuthDialog';
import { 
  HelpCircle, 
  Search, 
  BookOpen, 
  MessageCircle, 
  Phone,
  Mail,
  FileText,
  CreditCard,
  Shield,
  Users,
  Briefcase,
  Heart,
  ChevronRight,
  Lock
} from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card } from '../components/ui/card';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '../components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { toast } from 'sonner@2.0.3';

interface HelpCenterPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  currentUser?: any;
  setCurrentUser?: (user: any) => void;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

export function HelpCenterPage({ language, setLanguage, setPage, announcement, currentUser, setCurrentUser, onLogin }: HelpCenterPageProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [isTicketDialogOpen, setIsTicketDialogOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [showAuthDialog, setShowAuthDialog] = useState(false);

  const categories = [
    {
      id: 'getting-started',
      title: 'শুরু করুন',
      icon: <BookOpen className="w-6 h-6" />,
      color: 'bg-emerald-500',
      count: 8
    },
    {
      id: 'jobs',
      title: 'জব ও আবেদন',
      icon: <Briefcase className="w-6 h-6" />,
      color: 'bg-blue-500',
      count: 12
    },
    {
      id: 'payments',
      title: 'পেমেন্ট ও ক্রেডিট',
      icon: <CreditCard className="w-6 h-6" />,
      color: 'bg-teal-500',
      count: 10
    },
    {
      id: 'donation',
      title: 'দান ব্যবস্থা',
      icon: <Heart className="w-6 h-6" />,
      color: 'bg-pink-500',
      count: 6
    },
    {
      id: 'account',
      title: 'অ্যাকাউন্ট ও নিরাপত্তা',
      icon: <Shield className="w-6 h-6" />,
      color: 'bg-teal-500',
      count: 9
    },
    {
      id: 'messaging',
      title: 'মেসেজিং',
      icon: <MessageCircle className="w-6 h-6" />,
      color: 'bg-teal-500',
      count: 5
    },
  ];

  const faqs = {
    'getting-started': [
      {
        question: 'Talent Tutor কি?',
        answer: 'Talent Tutor হলো একটি টিউশন মার্কেটপ্লেস প্ল্যাটফর্ম যা শিক্ষক, অভিভাবক এবং শিক্ষার্থীদের সংযুক্ত করে। এখানে যাকাত/দান ব্যবস্থাও রয়েছে যা অসহায় শিক্ষার্থীদের সাহায্য করে।'
      },
      {
        question: 'কিভাবে নিবন্ধন করব?',
        answer: 'হোম পেজের উপরে "নিবন্ধন" বাটনে ক্লিক করুন। আপনার ধরন (শিক্ষক/অভিভাবক/শিক্ষার্থী) নির্বাচন করে প্রয়োজনীয় তথ্য পূরণ করুন।'
      },
      {
        question: 'ফ্রি ক্রেডিট কি?',
        answer: 'নতুন শিক্ষকরা ৫০টি এবং অভিভাবকরা ১০০টি ফ্রি ক্রেডিট পান। এই ক্রেডিট দিয়ে আপনি জবে আবেদন করতে বা জব পোস্ট করতে পারবেন।'
      },
      {
        question: 'প্রোফাইল কিভাবে সম্পন্ন করব?',
        answer: 'ড্যাশবোর্ডে গিয়ে "প্রোফাইল" মেনুতে ক্লিক করুন। আপনার শিক্ষাগত যোগ্যতা, অভিজ্ঞতা, ছবি এবং অন্যান্য তথ্য যোগ করুন। সম্পূর্ণ প্রোফাইল আপনার সফলতার সম্ভাবনা বাড়ায়।'
      },
    ],
    'jobs': [
      {
        question: 'কিভাবে জবে আবেদন করব? (শিক্ষক)',
        answer: 'জব খুঁজুন → পছন্দের জব নির্বাচন করুন → "আবেদন করুন" বাটনে ক্লিক করুন → কভার লেটার লিখুন → জমা দিন। প্রতি আবেদনে ১ ক্রেডিট খরচ হয়।'
      },
      {
        question: 'কিভাবে জব পোস্ট করব? (অভিভাবক)',
        answer: 'ড্যাশবোর্ড → "নতুন জব পোস্ট করুন" → বিষয়, শ্রেণী, বেতন, সময়সূচী ইত্যাদি তথ্য দিন → পোস্ট করুন। প্রতি পোস্টে ৫ ক্রেডিট খরচ হয়।'
      },
      {
        question: 'আবেদনের স্ট্যাটাস কিভাবে দেখব?',
        answer: 'ড্যাশবোর্ডের "আমার আবেদন" সেকশনে সব আবেদনের স্ট্যাটাস দেখতে পারবেন। স্ট্যাটাস: পেন্ডিং, গৃহীত, প্রত্যাখ্যাত।'
      },
      {
        question: 'জব বাতিল করতে পারব?',
        answer: 'হ্যাঁ, অভিভাবকর��� যেকোনো সময় জব বাতিল করতে পারবেন। তবে ইতিমধ্যে আবেদনকারীদের জানানো উচিত।'
      },
    ],
    'payments': [
      {
        question: 'পেমেন্ট পদ্ধতি কি কি?',
        answer: 'আমরা বিকাশ, নগদ, রকেট এবং SSL Commerce এর মাধ্যমে ক্রেডিট কার্ড/ডেবিট কার্ড গ্রহণ করি।'
      },
      {
        question: 'ক্রেডিট কিভাবে কিনব?',
        answer: 'ড্যাশবোর্ড → "ক্রেডিট" → পছন্দের প্যাকেজ নির্বাচন করুন → পেমেন্ট মেথড বেছে নিন → পেমেন্ট সম্পন্ন করুন।'
      },
      {
        question: 'রিফান্ড পলিসি কি?',
        answer: 'ক্রেডিট কেনার পর রিফান্ড দেওয়া হয় না। তবে টেকনিক্যাল সমস্যার ক্ষেত্রে সাপোর্টে যোগাযোগ করুন।'
      },
      {
        question: 'শিক্ষকরা কিভাবে পেমেন্ট পাবেন?',
        answer: 'অভিভাবকরা সরাসরি শিক্ষকদের পেমেন্ট করবেন। প্ল্যাটফর্ম শুধু সংযোগ করে দেয়।'
      },
    ],
    'donation': [
      {
        question: 'দান কিভাবে করব?',
        answer: 'হোম পেজ → "দান করুন" বাটন → দানের পরিমাণ লিখুন → পেমেন্ট মেথড নির্বাচন করুন → দান সম্পন্ন করুন।'
      },
      {
        question: 'দান কোথায় যায়?',
        answer: 'সব দান অসহায় শিক্ষার্থীদের টিউশন ফি, বই এবং স্টেশনারি কিনতে ব্যবহৃত হয়। সম্পূর্ণ স্বচ্ছতার সাথে ব্যবহার করা হয়।'
      },
      {
        question: 'দান সার্টিফিকেট পাব?',
        answer: 'হ্যাঁ, প্রতিটি দানের জন্য ডিজিটাল সার্টিফিকেট পাবেন যা ডাউনলোড করতে পারবেন।'
      },
      {
        question: 'বই কিভাবে দান করব?',
        answer: 'লাইব্রেরি পেজ → "বই দান করুন" → বইর তথ্য দিন → পিকআপ/ডেলিভারি ব্যবস্থা করুন।'
      },
    ],
    'account': [
      {
        question: 'পাসওয়ার্ড ভুলে গেলে?',
        answer: 'লগইন পেজ → "পাসওয়ার্ড ভুলে গেছেন?" → ইমেইল দিন → রিসেট লিঙ্ক পাবেন → নতুন পাসওয়ার্ড সেট করুন।'
      },
      {
        question: 'একাউন্ট ভেরিফাই কিভাবে করব?',
        answer: 'নিবন্ধনের পর ইমেইলে ভেরিফিকেশন লিঙ্ক যাবে। ক্লিক করে একাউন্ট ভেরিফাই করুন। ফোন নম্বর ভেরিফাই করতে OTP পাবেন।'
      },
      {
        question: 'প্রোফাইল কিভাবে ডিলিট করব?',
        answer: 'সেটিংস → "একাউন্ট মুছে ফেলুন" → নিশ্চিতকরণ → একাউন্ট স্থায়ীভাবে মুছে যাবে। এই কাজটি পূর্বাবস্থায় ফেরানো যাবে না।'
      },
      {
        question: 'দুই-ফ্যাক্টর অথেন্টিকেশন কি?',
        answer: '2FA একটি অতিরিক্ত নিরাপত্তা স্তর। লগইনের সময় পাসওয়ার্ডের পাশাপাশি একটি কোড প্রয়োজন হয়। সেটিংস থেকে চালু করতে পারবেন।'
      },
    ],
    'messaging': [
      {
        question: 'কিভাবে মেসেজ পাঠাব?',
        answer: 'ড্যাশবোর্ড → "মেসেজ" → কথোপকথন নির্বাচন করুন → বার্তা লিখুন → পাঠান। শুধু আবেদিত জব বা গৃহীত শিক্ষকদের সাথে চ্যাট করতে পারবেন।'
      },
      {
        question: 'ফাইল শেয়ার করতে পারব?',
        answer: 'হ্যাঁ, চ্যাটে ইমেজ এবং ডকুমেন্ট শেয়ার করতে পারবেন। ম্যাক্সিমাম ফাইল সাইজ ১০ MB।'
      },
      {
        question: 'স্প্যাম মেসেজ এলে কি করব?',
        answer: 'মেসেজের উপর রিপোর্ট বাটন আছে। স্প্যাম বা অপ্রাসঙ্গিক মেসেজ রিপোর্ট করুন। আমরা দ্রুত ব্যবস্থা নেব।'
      },
    ],
  };

  const filteredFAQs = Object.entries(faqs).reduce((acc, [category, questions]) => {
    const filtered = questions.filter(
      faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category] = filtered;
    }
    return acc;
  }, {} as typeof faqs);

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-emerald-50 via-white to-teal-50">
      <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} onLogin={onLogin} />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl mb-4 flex items-center justify-center gap-3">
            <HelpCircle className="w-10 h-10 text-emerald-600" />
            সাহায্য কেন্দ্র
          </h1>
          <p className="text-gray-600 mb-6">আপনার প্রশ্নের উত্তর খুঁজুন অথবা আমাদের সাথে যোগাযোগ করুন</p>
          
          {/* Search */}
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                placeholder="প্রশ্ন খুঁজুন..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 h-14 text-lg"
              />
            </div>
          </div>
        </div>

        {/* Categories */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {categories.map(category => (
            <Card
              key={category.id}
              className="p-6 text-center hover:shadow-lg transition-all cursor-pointer group"
            >
              <div className={`${category.color} w-12 h-12 rounded-lg flex items-center justify-center mx-auto mb-3 text-white group-hover:scale-110 transition-transform`}>
                {category.icon}
              </div>
              <h3 className="text-sm mb-1">{category.title}</h3>
              <p className="text-xs text-gray-500">{category.count} টি প্রশ্ন</p>
            </Card>
          ))}
        </div>

        {/* FAQs */}
        <div className="max-w-4xl mx-auto mb-12">
          <h2 className="text-2xl mb-6">সচরাচর জিজ্ঞাসা (FAQ)</h2>
          
          <Tabs defaultValue="getting-started" className="w-full">
            <TabsList className="w-full justify-start mb-6 flex-wrap h-auto">
              {categories.map(category => (
                <TabsTrigger key={category.id} value={category.id} className="gap-2">
                  {category.title}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(filteredFAQs).map(([categoryId, questions]) => (
              <TabsContent key={categoryId} value={categoryId}>
                <Accordion type="single" collapsible className="w-full">
                  {questions.map((faq, idx) => (
                    <AccordionItem key={idx} value={`item-${idx}`}>
                      <AccordionTrigger className="text-left">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Contact Cards */}
        <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <MessageCircle className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="mb-2">লাইভ চ্যাট</h3>
            <p className="text-sm text-gray-600 mb-4">আমাদের সাপোর্ট টিমের সাথে সরাসরি কথা বলুন</p>
            <Button 
              onClick={() => setIsChatOpen(true)}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
            >
              চ্যাট শুরু করুন
            </Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <FileText className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="mb-2">টিকেট তৈরি করুন</h3>
            <p className="text-sm text-gray-600 mb-4">সমস্যা রিপোর্ট করুন এবং ট্র্যাক করুন</p>
            <Button 
              onClick={() => {
                if (!currentUser) {
                  toast.error('অনুগ্রহ করে প্রথমে লগইন করুন');
                  setShowAuthDialog(true);
                } else {
                  setIsTicketDialogOpen(true);
                }
              }}
              className="w-full bg-gradient-to-r from-blue-600 to-teal-600 hover:from-blue-700 hover:to-teal-700"
            >
              টিকেট তৈরি করুন
            </Button>
          </Card>

          <Card className="p-6 text-center hover:shadow-lg transition-shadow">
            <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Phone className="w-6 h-6 text-teal-600" />
            </div>
            <h3 className="mb-2">ফোন সাপোর্ট</h3>
            <p className="text-sm text-gray-600 mb-4">
              Official: +৮৮০১৫৮১৮৫৫২৩৮<br/>
              Hotline: +৮৮০৯৬৯৬৫৪০৭৩০
            </p>
            <Button variant="outline" className="w-full">
              কল করুন
            </Button>
          </Card>
        </div>

        {/* Platform Guidelines */}
        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-2xl mb-6">প্ল্যাটফর্ম গাইডলাইন ও নীতিমালা</h2>
          <div className="grid md:grid-cols-2 gap-4">
            {[
              { title: 'গোপনীয়তা নীতিমালা', page: 'privacy-policy', icon: Shield },
              { title: 'সাপোর্ট সিস্টেম', page: 'support-system', icon: MessageCircle },
              { title: 'নিরাপত্তা টিপস', page: 'security-tips', icon: Lock },
              { title: 'কমিউনিটি গাইডলাইন', page: 'community-guidelines', icon: Users },
              { title: 'প্ল্যাটফর্ম ব্যবহার গাইড', page: 'platform-usage-guide', icon: BookOpen },
              { title: 'শিক্ষকদের জন্য নির্দেশনা', page: 'teacher-guidelines', icon: Users },
              { title: 'অভিভাবকদের জন্য নির্দেশনা', page: 'guardian-guidelines', icon: Heart },
              { title: 'ছাত্রদের জন্য নির্দেশনা', page: 'student-guidelines', icon: BookOpen },
              { title: 'দানকারীদের জন্য নির্দেশনা', page: 'donor-guidelines', icon: Heart },
              { title: 'ব্যবহারের শর্তাবলী', page: 'terms', icon: FileText },
            ].map((item, idx) => (
              <Card
                key={idx}
                className="p-4 hover:shadow-md transition-shadow cursor-pointer group"
                onClick={() => setPage(item.page)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <item.icon className="w-5 h-5 text-emerald-600" />
                    <span className="group-hover:text-emerald-600 transition-colors">
                      {item.title}
                    </span>
                  </div>
                  <ChevronRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-600 transition-colors" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </main>

      <Footer language={language} setPage={setPage} />
      
      {/* Ticket System Dialog */}
      <TicketSystem
        open={isTicketDialogOpen}
        onOpenChange={setIsTicketDialogOpen}
        language={language}
      />

      {/* Support Chat Dialog */}
      <VisitorSupportChat
        open={isChatOpen}
        onOpenChange={setIsChatOpen}
        language={language}
      />

      {/* Auth Dialog */}
      <UnifiedAuthDialog
        open={showAuthDialog}
        onOpenChange={setShowAuthDialog}
        language={language}
        onLogin={(userType, userData) => {
          if (setCurrentUser) {
            setCurrentUser({ type: userType, ...userData });
          }
          setShowAuthDialog(false);
          toast.success('সফলভাবে লগইন হয়েছে!');
          // Now open ticket dialog after login
          setIsTicketDialogOpen(true);
        }}
        initialMode="register"
      />
    </div>
  );
}
