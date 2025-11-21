import { Button } from './ui/button';
import { Input } from './ui/input';
import { Facebook, Twitter, Youtube, Instagram, Mail, Phone, MapPin, Linkedin, Send, Heart, Sparkles } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import { TalentTutorLogo } from './TalentTutorLogo';

interface FooterProps {
  language: 'bn' | 'en';
  setPage?: (page: string) => void;
}

const content = {
  bn: {
    tagline: 'বাংলাদেশের প্রথম ডিজিটাল টিউশন মার্কেটপ্লেস',
    description: 'শিক্ষক ও অভিভাবকদের একটি বিশ্বস্ত প্ল্যাটফর্মে সংযুক্ত করছি',
    
    // Quick Links
    quickLinks: 'দ্রুত লিংক',
    aboutUs: 'আমাদের সম্পর্কে',
    pricing: 'সাবস্ক্রিপশন',
    blog: 'সফলতার গল্প ও ব্লগ',
    contactUs: 'যোগাযোগ করুন',
    
    // For Users
    forUsers: 'ব্যবহারকারীদের জন্য',
    forParents: 'অভিভাবকদের জন্য',
    forTeachers: 'শিক্ষকদের জন্য',
    forStudents: 'শিক্ষার্থীদের জন্য',
    findTeachers: 'শিক্ষক খুঁজুন',
    browseTuitions: 'টিউশন খুঁজুন',
    mapsLocation: 'মানচিত্র ও অবস্থান',
    
    // Support
    support: 'সহায়তা',
    helpCenter: 'সহায়তা কেন্দ্র',
    faq: 'সাধারণ প্রশ্ন',
    privacy: 'গোপনীয়তা নীতি',
    terms: 'শর্তাবলী',
    guidelines: 'নির্দেশিকা',
    
    // Legal
    legal: 'আইনি',
    
    // Contact
    contact: 'যোগাযোগ',
    address: 'ঢাকা, বাংলাদেশ',
    email: 'support@talenttutor.com',
    phone: '+৮৮০ ১৭০০-০০০০০০',
    hotline: '+৮৮০ ১৮০০-১১১১১১',
    
    // Newsletter
    newsletter: 'নিউজলেটার সাবস্ক্রাইব করুন',
    newsletterText: 'সর্বশেষ আপডেট, শিক্ষা টিপস এবং বিশেষ অফার পেতে সাবস্ক্রাইব করুন',
    emailPlaceholder: 'আপনার ইমেইল',
    subscribe: 'সাবস্ক্রাইব',
    
    // Social
    followUs: 'আমাদের ফলো করুন',
    
    // Bottom
    copyright: '© ২০২৫ Talent Tutor। সর্বস্বত্ব সংরক্ষিত।',
    developedBy: 'ডেভেলপড বাই',
    madeWith: 'দিয়ে তৈরি',
    in: 'এ',
    bangladesh: 'বাংলাদেশ',
  },
  en: {
    tagline: 'Bangladesh\'s First Digital Tuition Marketplace',
    description: 'Connecting teachers and parents on a trusted platform',
    
    quickLinks: 'Quick Links',
    aboutUs: 'About Us',
    pricing: 'Subscription',
    blog: 'Success Stories & Blog',
    contactUs: 'Contact Us',
    
    forUsers: 'For Users',
    forParents: 'For Parents',
    forTeachers: 'For Teachers',
    forStudents: 'For Students',
    findTeachers: 'Find Teachers',
    browseTuitions: 'Browse Tuitions',
    mapsLocation: 'Maps & Location',
    
    support: 'Support',
    helpCenter: 'Help Center',
    faq: 'FAQ',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    guidelines: 'Guidelines',
    
    legal: 'Legal',
    
    contact: 'Contact',
    address: 'Dhaka, Bangladesh',
    email: 'support@talenttutor.com',
    phone: '+880 1700-000000',
    hotline: '+880 1800-111111',
    
    newsletter: 'Subscribe to Newsletter',
    newsletterText: 'Get latest updates, education tips and special offers',
    emailPlaceholder: 'Your email',
    subscribe: 'Subscribe',
    
    followUs: 'Follow Us',
    
    copyright: '© 2025 Talent Tutor. All rights reserved.',
    developedBy: 'Developed By',
    madeWith: 'Made with',
    in: 'in',
    bangladesh: 'Bangladesh',
  },
};

export function Footer({ language, setPage }: FooterProps) {
  const t = content[language];
  const [email, setEmail] = useState('');
  const [isSubscribing, setIsSubscribing] = useState(false);

  const handleNavigate = (page: string) => {
    if (setPage) {
      setPage(page);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribe = async () => {
    if (!email) {
      toast.error(language === 'bn' ? 'ইমেইল ঠিকানা লিখুন' : 'Please enter email address');
      return;
    }
    
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error(language === 'bn' ? 'সঠিক ইমেইল ঠিকানা লিখুন' : 'Please enter valid email address');
      return;
    }

    setIsSubscribing(true);
    
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/newsletter/subscribe`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${publicAnonKey}`,
          },
          body: JSON.stringify({
            email: email,
            source: 'website-form',
          }),
        }
      );

      if (response.ok) {
        toast.success(language === 'bn' ? 'সাবস্ক্রিপশন সফল হয়েছে! আপনার ইনবক্স চেক করুন।' : 'Subscription successful! Check your inbox.');
        setEmail('');
      } else {
        const error = await response.json();
        toast.error(error.error || (language === 'bn' ? 'সাবস্ক্রিপশন ব্যর্থ হয়েছে' : 'Subscription failed'));
      }
    } catch (error) {
      console.error('Newsletter subscription error:', error);
      toast.error(language === 'bn' ? 'সাবস্ক্রিপশন ব্যর্থ হয়েছে' : 'Subscription failed');
    } finally {
      setIsSubscribing(false);
    }
  };

  const socialLinks = [
    { icon: Facebook, url: 'https://facebook.com/talenttutor', label: 'Facebook', color: 'hover:bg-blue-600' },
    { icon: Twitter, url: 'https://twitter.com/talenttutor', label: 'Twitter', color: 'hover:bg-sky-500' },
    { icon: Instagram, url: 'https://instagram.com/talenttutor', label: 'Instagram', color: 'hover:bg-pink-600' },
    { icon: Youtube, url: 'https://youtube.com/talenttutor', label: 'YouTube', color: 'hover:bg-red-600' },
    { icon: Linkedin, url: 'https://linkedin.com/company/talenttutor', label: 'LinkedIn', color: 'hover:bg-blue-700' },
  ];

  return (
    <footer className="relative bg-gradient-to-br from-gray-900 via-teal-900 to-emerald-900 text-white overflow-hidden">
      {/* Decorative Elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-cyan-500 to-blue-500 rounded-full blur-3xl" />
      </div>
      
      {/* Main Footer */}
      <div className="relative container mx-auto py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 mb-10 sm:mb-12">
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="mb-6">
              <div className="mb-4">
                <TalentTutorLogo 
                  size="lg"
                  showText={true}
                  showSubtitle={true}
                  language={language}
                  className="[&_span]:!text-emerald-400 [&_span]:!bg-gradient-to-r [&_span]:!from-emerald-400 [&_span]:!via-teal-400 [&_span]:!to-cyan-400 [&_p]:!text-gray-400"
                />
              </div>
              <p className={`text-base text-gray-300 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.tagline}</p>
              <p className={`text-base text-gray-400 mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.description}</p>
            </div>

            {/* Contact Info */}
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-teal-400 flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-base font-medium text-gray-200">Web Search BD</div>
                  <div className={`text-base text-gray-400 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.address}</div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <a href={`mailto:${t.email}`} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.email}
                </a>
              </div>
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-teal-400 flex-shrink-0" />
                <div className="text-base">
                  <div className={`text-gray-400 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.phone}</div>
                  <div className={`text-gray-500 text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>Hotline: {t.hotline}</div>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className={`font-semibold mb-4 text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.quickLinks}</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigate('about')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.aboutUs}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('subscription')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.pricing}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('blog')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.blog}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('contact')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.contactUs}
                </button>
              </li>
            </ul>
          </div>

          {/* For Users */}
          <div>
            <h3 className={`font-semibold mb-4 text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.forUsers}</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigate('for-guardians')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.forParents}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('for-teachers')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.forTeachers}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('find-teachers')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.findTeachers}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('browse-tuitions')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.browseTuitions}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('maps-location')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.mapsLocation}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('donation')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.forStudents}
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className={`font-semibold mb-4 text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.support}</h3>
            <ul className="space-y-2">
              <li>
                <button onClick={() => handleNavigate('help-center')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.helpCenter}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('faq')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.faq}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('privacy-policy')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.privacy}
                </button>
              </li>
              <li>
                <button onClick={() => handleNavigate('terms')} className={`text-base text-gray-400 hover:text-teal-400 transition-colors ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.terms}
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Newsletter Section */}
        <div className="border-t border-gray-700 pt-8 mb-8">
          <div className="max-w-2xl mx-auto text-center">
            <h3 className={`text-2xl font-semibold mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.newsletter}</h3>
            <p className={`text-base text-gray-400 mb-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>{t.newsletterText}</p>
            
            <div className="flex gap-2 max-w-md mx-auto">
              <Input
                type="email"
                placeholder={t.emailPlaceholder}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`bg-white/10 border-gray-600 text-white placeholder:text-gray-400 focus:bg-white/20 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
                onKeyPress={(e) => e.key === 'Enter' && handleSubscribe()}
              />
              <Button
                onClick={handleSubscribe}
                disabled={isSubscribing}
                className={`bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 px-6 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
              >
                {isSubscribing ? (
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                ) : (
                  <>
                    <Send className="w-4 h-4 mr-2" />
                    {t.subscribe}
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Social Media Links */}
        <div className="border-t border-white/10 pt-10">
          <div className="text-center">
            <h4 className={`text-xl font-semibold mb-6 bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.followUs}
            </h4>
            <div className="flex items-center justify-center gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group relative"
                  aria-label={social.label}
                >
                  <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full blur opacity-0 group-hover:opacity-75 transition-opacity" />
                  <div className={`relative w-12 h-12 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center hover:bg-white/20 transition-all hover:scale-110 border border-white/20 ${social.color}`}>
                    <social.icon className="w-5 h-5" />
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative border-t border-white/10 bg-gradient-to-r from-gray-900 via-teal-900/50 to-emerald-900/50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            {/* Copyright */}
            <div className="flex items-center gap-2 text-gray-400">
              <span className={`text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.copyright}
              </span>
            </div>
            
            {/* Developer Credit - Simplified */}
            <div className="flex items-center gap-2">
              <span className={`text-sm text-gray-400 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.developedBy}
              </span>
              <a 
                href="https://websearchbd.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="group relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-gradient-to-r from-emerald-500/20 to-teal-500/20 border border-emerald-500/30 hover:border-emerald-500/50 transition-all"
              >
                <div className="absolute inset-0 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full opacity-0 group-hover:opacity-10 transition-opacity" />
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span className="relative font-semibold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent">
                  WebSearchBD
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
