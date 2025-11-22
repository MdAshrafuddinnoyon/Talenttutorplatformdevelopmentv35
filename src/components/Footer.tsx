import { Button } from './ui/button';
import { Input } from './ui/input';
import { Facebook, Twitter, Youtube, Instagram, Mail, Phone, MapPin, Linkedin, Send, Sparkles } from 'lucide-react';
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
    
    quickLinks: 'দ্রুত লিংক',
    aboutUs: 'আমাদের সম্পর্কে',
    pricing: 'সাবস্ক্রিপশন',
    blog: 'সফলতার গল্প ও ব্লগ',
    contactUs: 'যোগাযোগ করুন',
    
    forUsers: 'ব্যবহারকারীদের জন্য',
    forParents: 'অভিভাবকদের জন্য',
    forTeachers: 'শিক্ষকদের জন্য',
    findTeachers: 'শিক্ষক খুঁজুন',
    browseTuitions: 'টিউশন খুঁজুন',
    mapsLocation: 'মানচিত্র ও অবস্থান',
    
    support: 'সহায়তা',
    helpCenter: 'সহায়তা কেন্দ্র',
    faq: 'সাধারণ প্রশ্ন',
    privacy: 'গোপনীয়তা নীতি',
    terms: 'শর্তাবলী',
    
    contact: 'যোগাযোগ',
    address: 'ঢাকা, বাংলাদেশ',
    email: 'support@talenttutor.com',
    phone: '+৮৮০ ১৭০০-০০০০০০',
    hotline: '+৮৮০ ১৮০০-১১১১১১',
    
    newsletter: 'নিউজলেটার সাবস্ক্রাইব করুন',
    newsletterText: 'সর্বশেষ আপডেট, শিক্ষা টিপস এবং বিশেষ অফার পেতে সাবস্ক্রাইব করুন',
    emailPlaceholder: 'আপনার ইমেইল',
    subscribe: 'সাবস্ক্রাইব',
    
    followUs: 'আমাদের ফলো করুন',
    
    copyright: '© ২০২৫ Talent Tutor। সর্বস্বত্ব সংরক্ষিত।',
    developedBy: 'ডেভেলপড বাই',
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
    findTeachers: 'Find Teachers',
    browseTuitions: 'Browse Tuitions',
    mapsLocation: 'Maps & Location',
    
    support: 'Support',
    helpCenter: 'Help Center',
    faq: 'FAQ',
    privacy: 'Privacy Policy',
    terms: 'Terms of Service',
    
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
  }
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
      // Mock submission for pure frontend or handle via backend if connected
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // If connected to Supabase, we would use the real endpoint:
      /*
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/newsletter/subscribe`,
        { method: 'POST', headers: { ... }, body: ... }
      );
      */

      toast.success(language === 'bn' ? 'সাবস্ক্রিপশন সফল হয়েছে! আপনার ইনবক্স চেক করুন।' : 'Subscription successful! Check your inbox.');
      setEmail('');
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
    <footer className="relative bg-[#0f172a] text-white overflow-hidden pt-20 pb-10 font-sans">
      {/* Modern Abstract Background */}
      <div className="absolute inset-0 pointer-events-none">
         <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent"></div>
         <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 blur-[100px] rounded-full transform translate-x-1/3 -translate-y-1/3"></div>
         <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[100px] rounded-full transform -translate-x-1/3 translate-y-1/3"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="lg:col-span-4 space-y-6">
            <TalentTutorLogo 
              size="lg" 
              showText={true} 
              showSubtitle={false} 
              className="text-white [&_span]:text-emerald-400" 
            />
            <p className={`text-slate-400 leading-relaxed text-lg ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}>
              {t.description}
            </p>
            
            <div className="space-y-4 pt-4">
              <div className="flex items-start gap-3 text-slate-400 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Head Office</h5>
                  <p className={language === 'bn' ? 'font-noto-serif-bengali' : ''}>{t.address}</p>
                </div>
              </div>
              
              <div className="flex items-start gap-3 text-slate-400 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Email Us</h5>
                  <p className="hover:text-emerald-400 transition-colors">{t.email}</p>
                </div>
              </div>

              <div className="flex items-start gap-3 text-slate-400 group cursor-pointer">
                <div className="w-10 h-10 rounded-full bg-slate-800 flex items-center justify-center group-hover:bg-emerald-500/20 group-hover:text-emerald-400 transition-colors">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <h5 className="text-white font-medium">Call Support</h5>
                  <p className={language === 'bn' ? 'font-noto-serif-bengali' : ''}>{t.phone}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Links Columns */}
          <div className="lg:col-span-2">
            <h4 className={`text-lg font-bold text-white mb-6 ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}>{t.quickLinks}</h4>
            <ul className="space-y-3">
              {['about', 'subscription', 'blog', 'contact'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => handleNavigate(link)}
                    className={`text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-emerald-400 transition-colors"></span>
                    {link === 'about' ? t.aboutUs : link === 'subscription' ? t.pricing : link === 'blog' ? t.blog : t.contactUs}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-2">
            <h4 className={`text-lg font-bold text-white mb-6 ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}>{t.forUsers}</h4>
            <ul className="space-y-3">
              {['for-guardians', 'for-teachers', 'find-teachers', 'maps-location'].map((link) => (
                <li key={link}>
                  <button 
                    onClick={() => handleNavigate(link)}
                    className={`text-slate-400 hover:text-emerald-400 transition-colors flex items-center gap-2 group ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}
                  >
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-600 group-hover:bg-emerald-400 transition-colors"></span>
                    {link === 'for-guardians' ? t.forParents : link === 'for-teachers' ? t.forTeachers : link === 'find-teachers' ? t.findTeachers : t.mapsLocation}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="lg:col-span-4">
             <div className="bg-slate-800/50 rounded-2xl p-6 border border-slate-700/50 backdrop-blur-sm">
               <h4 className={`text-xl font-bold text-white mb-2 ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}>{t.newsletter}</h4>
               <p className={`text-slate-400 mb-6 ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}>{t.newsletterText}</p>
               
               <div className="space-y-3">
                 <Input
                   type="email"
                   placeholder={t.emailPlaceholder}
                   value={email}
                   onChange={(e) => setEmail(e.target.value)}
                   className={`bg-slate-900/80 border-slate-700 text-white placeholder:text-slate-500 focus:border-emerald-500 h-12 rounded-xl ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}
                 />
                 <Button 
                   onClick={handleSubscribe}
                   disabled={isSubscribing}
                   className={`w-full h-12 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold rounded-xl shadow-lg shadow-emerald-900/20 transition-all ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}
                 >
                   {isSubscribing ? '...' : t.subscribe}
                 </Button>
               </div>

               <div className="mt-8">
                  <p className={`text-sm text-slate-400 mb-4 font-medium uppercase tracking-wider ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}>{t.followUs}</p>
                  <div className="flex gap-3">
                    {socialLinks.map((social, idx) => (
                      <a
                        key={idx}
                        href={social.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-10 h-10 rounded-full bg-slate-700/50 flex items-center justify-center text-slate-300 hover:bg-emerald-500 hover:text-white transition-all hover:-translate-y-1"
                      >
                        <social.icon className="w-4 h-4" />
                      </a>
                    ))}
                  </div>
               </div>
             </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className={`text-slate-500 text-sm ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}>{t.copyright}</p>
          
          <div className="flex items-center gap-6">
            <button onClick={() => handleNavigate('privacy-policy')} className={`text-slate-500 hover:text-slate-300 text-sm transition-colors ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}>
              {t.privacy}
            </button>
            <button onClick={() => handleNavigate('terms')} className={`text-slate-500 hover:text-slate-300 text-sm transition-colors ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}>
              {t.terms}
            </button>
            
            <div className="w-[1px] h-4 bg-slate-700 mx-2 hidden md:block"></div>
            
            <div className="flex items-center gap-2">
              <span className={`text-slate-500 text-sm ${language === 'bn' ? 'font-noto-serif-bengali' : ''}`}>{t.developedBy}</span>
              <a 
                href="https://websearchbd.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-slate-800/50 border border-slate-700 hover:border-emerald-500/50 hover:bg-slate-800 transition-all group"
              >
                <Sparkles className="w-3 h-3 text-emerald-500" />
                <span className="text-sm font-bold bg-gradient-to-r from-emerald-400 to-teal-400 bg-clip-text text-transparent group-hover:from-emerald-300 group-hover:to-teal-300">WebSearchBD</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}