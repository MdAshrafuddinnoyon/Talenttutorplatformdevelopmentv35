import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from './ui/accordion';
import { Badge } from './ui/badge';
import { HelpCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface FAQSectionProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'প্রায়শ জিজ্ঞাসিত প্রশ্ন (FAQ)',
    subtitle: 'আপনার প্রশ্নের উত্তর এখানে পেতে পারেন',
    faqs: [
      {
        question: 'Talent Tutor কী এবং এটি কিভাবে কাজ করে?',
        answer: 'Talent Tutor হলো বাংলাদেশের প্রথম সম্পূর্ণ ডিজিটাল টিউশন মার্কেটপ্লেস যেখানে শিক্ষার্থী, অভিভাবক এবং শিক্ষকরা সংযুক্ত হতে পারেন। অভিভাবকরা টিউশন পোস্ট করেন, শিক্ষকরা আবেদন করেন এবং উভয়ে মেসেজের মাধ্যমে যোগাযোগ করে চূড়ান্ত সিদ্ধান্ত নেন।',
      },
      {
        question: 'রেজিস্ট্রেশন কি বিনামূল্যে?',
        answer: 'হ্যাঁ, অভিভাবক এবং শিক্ষক উভয়ের জন্য রেজিস্ট্রেশন সম্পূর্ণ বিনামূল্যে। শিক্ষকদের শুধুমাত্র টিউশনে আবেদন করার জন্য ক্রেডিট কিনতে হয়, যা খুবই সাশ্রয়ী।',
      },
      {
        question: 'শিক্ষকদের যাচাইকরণ প্রক্রিয়া কী?',
        answer: 'শিক্ষকদের ৩ স্তরের যাচাইকরণ প্রক্রিয়া রয়েছে: (১) জাতীয় পরিচয়পত্র (NID) যাচাই - ছবি/কপি সহ নম্বর যাচাই, (২) শিক্ষাগত সনদপত্র যাচাই - SSC/HSC/স্নাতক/স্নাতকোত্তর সার্টিফিকেট যাচাই, (৩) অভিজ্ঞতার সার্টিফিকেট যাচাই (যদি থাকে)। সব ডকুমেন্ট আমাদের টিম ম্যানুয়ালি যাচাই করে। এটি নিশ্চিত করে যে শুধুমাত্র যোগ্য এবং বিশ্বস্ত শিক্ষকরা প্ল্যাটফর্মে থাকেন।',
      },
      {
        question: 'ক্রেডিট সিস্টেম কিভাবে কাজ করে?',
        answer: 'শিক্ষকরা ক্রেডিট কিনে টিউশনে আবেদন করতে পারেন। প্রতিটি আবেদনে নির্দিষ্ট পরিমাণ ক্রেডিট কাটা হয়। বিভিন্ন প্যাকেজ পাওয়া যায় এবং অনলাইন পেমেন্টের মাধ্যমে সহজেই ক্রেডিট কেনা যায়।',
      },
      {
        question: 'পেমেন্ট কিভাবে করতে হয়?',
        answer: 'আমরা bKash, Nagad, রকেট এবং ক্রেডিট/ডেবিট কার্ড সহ সকল জনপ্রিয় পেমেন্ট মেথড গ্রহণ করি। সকল পেমেন্ট সম্পূর্ণ নিরাপদ এবং এনক্রিপ্টেড।',
      },
      {
        question: 'টিউশন শুরু করার পর কি সাপোর্ট পাওয়া যায়?',
        answer: 'হ্যাঁ, আমাদের কাস্টমার সাপোর্ট টিম ২৪/৭ উপলব্ধ। যেকোনো সমস্যা বা প্রশ্নের জন্য আপনি আমাদের সাথে যোগাযোগ করতে পারেন। এছাড়াও রেটিং এবং রিভিউ সিস্টেমের মাধ্যমে মান নিয়ন্ত্রণ করা হয়।',
      },
      {
        question: 'ডিজিটাল লাইব্রেরি এবং পরিবেশ শিক্ষা কী?',
        answer: 'ডিজিটাল লাইব্রেরিতে বিনামূল্যে বই, নোট এবং প্র্যাকটিস পেপার পাওয়া যায়। পরিবেশ শিক্ষা মডিউলে শিক্ষার্থীরা পরিবেশ সচেতনতা সম্পর্কে শিখতে পারে এবং কুইজ খেলে গ্রিন ব্যাজ অর্জন করতে পারে।',
      },
      {
        question: 'মোবাইল অ্যাপ কোথায় পাবো?',
        answer: 'Talent Tutor অ্যাপ Google Play Store এ পাওয়া যাচ্ছে। এছাড়াও আমাদের ওয়েবসাইট থেকে সরাসরি APK ডাউনলোড করতে পারেন। iOS অ্যাপ শীঘ্রই আসছে।',
      },
    ],
  },
  en: {
    title: 'Frequently Asked Questions (FAQ)',
    subtitle: 'Find answers to your questions here',
    faqs: [
      {
        question: 'What is Talent Tutor and how does it work?',
        answer: 'Talent Tutor is Bangladesh\'s first fully digital tuition marketplace where students, parents, and teachers can connect. Parents post tuitions, teachers apply, and both communicate through messages to make final decisions.',
      },
      {
        question: 'Is registration free?',
        answer: 'Yes, registration is completely free for both parents and teachers. Teachers only need to buy credits to apply for tuitions, which is very affordable.',
      },
      {
        question: 'What is the teacher verification process?',
        answer: 'Teachers undergo a 3-tier verification process: (1) National Identity Card (NID) verification - number verification with photo/copy, (2) Educational certificate verification - SSC/HSC/Bachelor/Masters certificates verification, (3) Experience certificate verification (if available). All documents are manually verified by our team. This ensures only qualified and trustworthy teachers are on the platform.',
      },
      {
        question: 'How does the credit system work?',
        answer: 'Teachers buy credits to apply for tuitions. A specific amount of credit is deducted for each application. Various packages are available and credits can be easily purchased through online payment.',
      },
      {
        question: 'How to make payments?',
        answer: 'We accept all popular payment methods including bKash, Nagad, Rocket, and credit/debit cards. All payments are completely secure and encrypted.',
      },
      {
        question: 'Is support available after starting tuition?',
        answer: 'Yes, our customer support team is available 24/7. You can contact us for any problems or questions. Quality is also controlled through the rating and review system.',
      },
      {
        question: 'What are Digital Library and Eco-education?',
        answer: 'The digital library provides free books, notes, and practice papers. In the eco-education module, students can learn about environmental awareness and earn green badges by playing quizzes.',
      },
      {
        question: 'Where can I get the mobile app?',
        answer: 'Talent Tutor app is available on Google Play Store. You can also download the APK directly from our website. iOS app coming soon.',
      },
    ],
  },
};

export function FAQSection({ language }: FAQSectionProps) {
  const t = content[language];

  return (
    <section className="py-10 sm:py-14 lg:py-18 bg-gradient-to-br from-white via-emerald-50/30 to-white relative overflow-hidden" id="faq">
      {/* Background decoration */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-emerald-200 rounded-full blur-3xl opacity-10"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-teal-200 rounded-full blur-3xl opacity-10"></div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-8 sm:mb-10"
        >
          <Badge className={`mb-4 px-4 py-1.5 bg-gradient-to-r from-emerald-100 to-teal-100 text-emerald-700 border-emerald-200 shadow-md text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            <HelpCircle className="w-3.5 h-3.5 mr-1.5" />
            {language === 'bn' ? 'সহায়তা' : 'Help'}
          </Badge>
          <h2 className={`text-2xl sm:text-3xl md:text-4xl text-gray-900 mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-sm sm:text-base md:text-lg text-gray-600 max-w-2xl mx-auto ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.subtitle}
          </p>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="max-w-3xl mx-auto"
        >
          <Accordion type="single" collapsible className="space-y-4">
            {t.faqs.map((faq, index) => (
              <motion.div
                key={faq.question}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <AccordionItem
                  value={`item-${index}`}
                  className="bg-white border-2 border-emerald-100 rounded-xl px-6 shadow-sm hover:shadow-lg hover:border-emerald-200 transition-all duration-300"
                >
                  <AccordionTrigger className="text-left hover:no-underline group">
                    <div className="flex items-start gap-3">
                      <div className="w-6 h-6 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1 group-hover:scale-110 transition-transform">
                        <span className="text-white text-xs">{index + 1}</span>
                      </div>
                      <span className={`text-gray-900 group-hover:text-emerald-700 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{faq.question}</span>
                    </div>
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className={`text-gray-600 pt-2 pl-9 leading-relaxed ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
