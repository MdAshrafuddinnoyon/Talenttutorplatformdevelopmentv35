import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { Card } from '../components/ui/card';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../components/ui/tabs';
import { Input } from '../components/ui/input';
import { Button } from '../components/ui/button';
import { HelpCircle, Search, Users, BookOpen, CreditCard, Heart, Shield, MessageCircle } from 'lucide-react';
import { useState } from 'react';

interface FAQPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const faqs = {
  general: [
    {
      question: 'Talent Tutor কী?',
      answer: 'Talent Tutor হলো বাংলাদেশের প্রথম সম্পূর্ণ ডিজিটাল টিউশন মার্কেটপ্লেস যা শিক্ষক, অভিভাবক এবং শিক্ষার্থীদের একসাথে নিয়ে আসে। এটি Upwork-এর মতো কাজ করে এবং যাকাত/দান ব্যবস্থা অন্তর্ভুক্ত করে অসহায় শিক্ষার্থীদের সাহায্য করে।'
    },
    {
      question: 'কীভাবে নিবন্ধন করব?',
      answer: 'হোম পেজের উপরে "এখনই শুরু করুন" বাটনে ক্লিক করুন। আপনার ইমেইল/ফোন নম্বর দিয়ে রেজিস্টার করুন এবং আপনার ধরন (শিক্ষক/অভিভাবক/ছাত্র/দাতা) নির্বাচন করুন।'
    },
    {
      question: 'প্ল্যাটফর্মটি কি বিনামূল্যে?',
      answer: 'নতুন শিক্ষকরা ৫০টি ফ্রি ক্রেডিট এবং অভিভাবকরা ১০০টি ফ্রি ক্রেডিট পান। শিক্ষকদের প্রথম ৬ মাস সম্পূর্ণ ফ্রি, তারপর ১০% প্ল্যাটফর্ম চার্জ নেওয়া হয়।'
    },
    {
      question: 'আমি কীভাবে সাহায্য পেতে পারি?',
      answer: 'আপনি লাইভ চ্যাট, টিকেট সিস্টেম, বা ফোন সাপোর্ট (০১৫৮১৮৫৫২৩৮) এর মাধ্যমে সাহায্য পেতে পারেন। আমাদের সাপোর্ট টিম ২৪/৭ উপলব্ধ।'
    },
  ],
  teachers: [
    {
      question: 'শিক্ষক হিসেবে কীভাবে যোগ দেব?',
      answer: 'রেজিস্টার করুন → "শিক্ষক" নির্বাচন করুন → আপনার শিক্ষাগত যোগ্যতা, NID, সনদপত্র আপলোড করুন → ২৪-৪৮ ঘন্টার মধ্যে যাচাই হবে।'
    },
    {
      question: 'টিউশনে আবেদন করতে কত ক্রেডিট লাগে?',
      answer: 'প্রতি টিউশনে আবেদন করতে ১ ক্রেডিট খরচ হয়। নতুন শিক্ষকরা ৫০ ফ্রি ক্রেডিট পান।'
    },
    {
      question: 'প্রথম ৬ মাস ফ্রি মানে কী?',
      answer: 'নতুন শিক্ষকদের প্রথম ৬ মাস কোনো প্ল্যাটফর্ম চার্জ নেওয়া হয় না। ৬ মাস পরে মাসিক আয়ের ১০% প্ল্যাটফর্ম ফি কাটা হবে।'
    },
    {
      question: 'অভিভাবকরা কীভাবে পেমেন্ট করবেন?',
      answer: 'অভিভাবকরা সরাসরি শিক্ষকদের bKash/Nagad/Bank transfer এ পেমেন্ট করবেন। প্ল্যাটফর্ম শুধু সংযোগ করে দেয়।'
    },
    {
      question: 'প্রোফাইল কীভাবে আকর্ষণীয় করব?',
      answer: 'সম্পূর্ণ প্রোফাইল তৈরি করুন, পেশাদার ছবি আপলোড করুন, বিস্তারিত বায়ো লিখুন, সার্টিফিকেট যুক্ত করুন এবং পূর্ববর্তী শিক্ষার্থীদের রিভিউ নিন।'
    },
  ],
  guardians: [
    {
      question: 'কীভাবে টিউশন পোস্ট করব?',
      answer: 'ড্যাশবোর্ড → "নতুন পোস্ট করুন" → বিষয়, শ্রেণী, বেতন, স্থান, সময়সূচী দিন → পোস্ট করুন। প্রতি পোস্টে ৫ ক্রেডিট খরচ হয়।'
    },
    {
      question: 'শিক্ষক কীভাবে নির্বাচন করব?',
      answer: 'আবেদনকারীদের প্রোফাইল দেখুন → রিভিউ পড়ুন → শর্টলিস্ট করুন → ইন্টারভিউ করুন (অনলাইন/অফলাইন) → নিয়োগ দিন।'
    },
    {
      question: 'চুক্তিপত্র কী এবং কেন প্রয়োজন?',
      answer: 'চুক্তিপত্র হলো শিক্ষক ও অভিভাবকের মধ্যে একটি চুক্তি যা বেতন, সময়সূচী, শর্তাবলী নিশ্চিত করে। এটি PDF ডাউনলোড করা যায়।'
    },
    {
      question: 'ক্রেডিট কীভাবে কিনব?',
      answer: 'ড্যাশবোর্ড → "ক্রেডিট কিনুন" → প্যাকেজ নির্বাচন → bKash/Nagad/Card দিয়ে পেমেন্ট করুন।'
    },
  ],
  students: [
    {
      question: 'ছাত্র হিসেবে কী সুবিধা পাব?',
      answer: 'আপনি বিনামূল্যে টিউশন সাহায্যের জন্য আবেদন করতে পারবেন। অনুমোদিত হলে আপনি যোগ্য শিক্ষক, বই এবং স্টেশনারি পাবেন।'
    },
    {
      question: 'সাহায্যের আবেদন কীভাবে করব?',
      answer: 'ছাত্র ড্যাশবোর্ড → "সাহায্যের আবেদন" → ফর্ম পূরণ করুন (আয়ের সনদ, NID, ছবি) → জমা দিন → অ্যাডমিন পর্যালোচনা করবেন।'
    },
    {
      question: 'আবেদন অনুমোদিত হতে কত সময় লাগে?',
      answer: 'সাধারণত ৩-৫ কার্যদিবস। জরুরি ক্ষেত্রে ২৪ ঘন্টার মধ্যে।'
    },
    {
      question: 'আমার গল্প কীভাবে শেয়ার করব?',
      answer: 'ড্যাশবোর্ড → "আমার গল্প" → "গল্প শেয়ার করুন" → শিরোনাম, বিষয়বস্তু লিখুন, ভিডিও লিংক দিন (ঐচ্ছিক) → প্রকাশ করুন।'
    },
  ],
  donors: [
    {
      question: 'কীভাবে দান করব?',
      answer: 'হোম পেজ → "দান করুন" → পরিমাণ লিখুন → bKash/Nagad/Card নির্বাচন করুন → পেমেন্ট সম্পন্ন করুন → সার্টিফিকেট পাবেন।'
    },
    {
      question: 'আমার দান কোথায় যায়?',
      answer: 'সম্পূর্ণ স্বচ্ছতার সাথে আপনার দান অসহায় শিক্ষার্থীদের টিউশন ফি, বই, স্টেশনারি এবং শিক্ষা উপকরণ কিনতে ব্যবহৃত হয়।'
    },
    {
      question: 'যাকাত ক্যালকুলেটর কী?',
      answer: 'এটি একটি টুল যা আপনার সম্পদ অনুযায়ী যাকাতের পরিমাণ হিসাব করে। ড্যাশবোর্ডে "যাকাত ক্যালকুলেটর" ক্লিক করুন।'
    },
    {
      question: 'ট্যাক্স সার্টিফিকেট পাব কি?',
      answer: 'হ্যাঁ, প্রতিটি দানের জন্য ট্যাক্স সার্টিফিকেট পাবেন যা আয়কর রিটার্নে ব্যবহার করতে পারবেন।'
    },
    {
      question: 'দানের প্রভাব কীভাবে দেখব?',
      answer: 'দাতা ড্যাশবোর্ড → "প্রভাব রিপোর্ট" → আপনি যে শিক্ষার্থীদের সাহায্য করেছেন তাদের অগ্রগতি, বার্তা এবং সার্টিফিকেট দেখতে পারবেন।'
    },
  ],
  payment: [
    {
      question: 'কোন পেমেন্ট মেথড গ্রহণ করা হয়?',
      answer: 'আমরা bKash, Nagad, Rocket এবং SSL Commerce (ক্রেডিট/ডেবিট কার্ড) গ্রহণ করি।'
    },
    {
      question: 'পেমেন্ট কি নিরাপদ?',
      answer: 'হ্যাঁ, সব পেমেন্ট SSL এনক্রিপশন দিয়ে সুরক্ষিত। আমরা কোনো কার্ড তথ্য সংরক্ষণ করি না।'
    },
    {
      question: 'রিফান্ড পলিসি কী?',
      answer: 'ক্রেডিট কেনার পর রিফান্ড দেওয়া হয় না। তবে প্রযুক্তিগত সমস্যার ক্ষেত্রে ৭ দিনের মধ্যে সাপোর্টে যোগাযোগ করুন।'
    },
  ],
  security: [
    {
      question: 'আমার তথ্য কি নিরাপদ?',
      answer: 'হ্যাঁ, আমরা ব্যাংক-স্তরের এনক্রিপশন ব্যবহার করি। আপনার ব্যক্তিগত তথ্য কখনো তৃতীয় পক্ষের সাথে শেয়ার করা হয় না।'
    },
    {
      question: 'দুই-ফ্যাক্টর অথেন্টিকেশন (2FA) কী?',
      answer: '2FA একটি অতিরিক্ত নিরাপত্তা স্তর যা পাসওয়ার্ডের সাথে একটি OTP কোড প্রয়োজন করে। সেটিংস থেকে চালু করতে পারেন।'
    },
  ],
};

const categories = [
  { id: 'general', label: 'সাধারণ', icon: HelpCircle, color: 'text-blue-600' },
  { id: 'teachers', label: 'শিক্ষকদের জন্য', icon: Users, color: 'text-emerald-600' },
  { id: 'guardians', label: 'অভিভাবকদের জন্য', icon: BookOpen, color: 'text-teal-600' },
  { id: 'students', label: 'ছাত্রদের জন্য', icon: BookOpen, color: 'text-rose-600' },
  { id: 'donors', label: 'দাতাদের জন্য', icon: Heart, color: 'text-rose-600' },
  { id: 'payment', label: 'পেমেন্ট', icon: CreditCard, color: 'text-amber-600' },
  { id: 'security', label: 'নিরাপত্তা', icon: Shield, color: 'text-teal-600' },
];

export function FAQPage({ language, setLanguage, setPage, announcement, onLogin }: FAQPageProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredFAQs = Object.entries(faqs).reduce((acc, [category, questions]) => {
    const filtered = questions.filter(
      faq =>
        faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
    );
    if (filtered.length > 0) {
      acc[category as keyof typeof faqs] = filtered;
    }
    return acc;
  }, {} as typeof faqs);

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 via-white to-emerald-50">
      <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} onLogin={onLogin} />

      <div className="container mx-auto px-4 py-16">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-emerald-100 px-6 py-2 rounded-full mb-6">
            <HelpCircle className="w-5 h-5 text-emerald-600" />
            <span className="text-emerald-700">সাধারণ প্রশ্ন (FAQ)</span>
          </div>
          <h1 className="text-gray-900 mb-4">আপনার প্রশ্নের উত্তর পান</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Talent Tutor প্ল্যাটফর্ম সম্পর্কে সব প্রশ্নের উত্তর এক জায়গায়
          </p>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
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

        {/* Categories Grid */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4 mb-12">
          {categories.map((category) => (
            <Card
              key={category.id}
              className="p-4 text-center hover:shadow-lg transition-all cursor-pointer group"
            >
              <category.icon className={`w-8 h-8 mx-auto mb-2 ${category.color} group-hover:scale-110 transition-transform`} />
              <p className="text-sm">{category.label}</p>
              <p className="text-xs text-gray-500 mt-1">
                {faqs[category.id as keyof typeof faqs].length} প্রশ্ন
              </p>
            </Card>
          ))}
        </div>

        {/* FAQ Tabs */}
        <div className="max-w-5xl mx-auto">
          <Tabs defaultValue="general" className="w-full">
            <TabsList className="w-full justify-start mb-8 flex-wrap h-auto bg-gradient-to-r from-emerald-50 to-teal-50 p-3 rounded-xl border-2 border-emerald-100">
              {categories.map((category) => (
                <TabsTrigger 
                  key={category.id} 
                  value={category.id} 
                  className="gap-2 data-[state=active]:bg-white data-[state=active]:shadow-md transition-all"
                >
                  <category.icon className={`w-4 h-4 ${category.color}`} />
                  {category.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {Object.entries(searchQuery ? filteredFAQs : faqs).map(([categoryId, questions]) => (
              <TabsContent key={categoryId} value={categoryId}>
                <Accordion type="single" collapsible className="w-full space-y-4">
                  {questions.map((faq, idx) => (
                    <AccordionItem 
                      key={idx} 
                      value={`item-${idx}`} 
                      className="bg-white border-2 border-emerald-100 rounded-xl px-6 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
                    >
                      <AccordionTrigger className="text-left hover:no-underline group">
                        <div className="flex items-start gap-3">
                          <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                            <span className="text-white text-xs">{idx + 1}</span>
                          </div>
                          <span className="font-medium text-gray-900 group-hover:text-emerald-700 transition-colors">{faq.question}</span>
                        </div>
                      </AccordionTrigger>
                      <AccordionContent className="text-gray-700 leading-relaxed pt-2 pl-9">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </TabsContent>
            ))}
          </Tabs>
        </div>

        {/* Contact Support */}
        <Card className="mt-16 p-8 bg-gradient-to-r from-emerald-500 to-teal-500 text-white max-w-4xl mx-auto">
          <div className="text-center">
            <MessageCircle className="w-12 h-12 mx-auto mb-4 opacity-90" />
            <h2 className="text-white mb-3">আরো সাহায্য প্রয়োজন?</h2>
            <p className="text-emerald-100 mb-6">
              আপনার প্রশ্নের উত্তর খুঁজে পাননি? আমাদের সাপোর্ট টিম সাহায্য করতে প্রস্তুত
            </p>
            <div className="flex gap-4 justify-center flex-wrap">
              <Button 
                className="bg-white text-emerald-600 hover:bg-gray-100 hover:text-emerald-700"
                onClick={() => setPage('help-center')}
              >
                সাহায্য কেন্দ্র
              </Button>
              <Button 
                variant="outline" 
                className="border-white text-[rgb(0,0,0)] hover:bg-white hover:text-emerald-600 hover:border-white"
                onClick={() => {
                  const supportChat = document.getElementById('support-chat-widget');
                  if (supportChat) {
                    supportChat.click();
                  } else {
                    setPage('help-center');
                  }
                }}
              >
                লাইভ চ্যাট
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
