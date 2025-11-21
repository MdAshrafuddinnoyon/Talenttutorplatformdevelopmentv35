import { motion } from 'motion/react';
import { Wrench, Clock, AlertCircle, Home, Mail, Phone } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { TalentTutorLogo } from '../components/TalentTutorLogo';

interface MaintenancePageProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
  estimatedTime?: string;
  message?: string;
}

const content = {
  bn: {
    title: 'সাইট রক্ষণাবেক্ষণ চলছে',
    subtitle: 'আমরা আপনার জন্য আরও ভালো সেবা নিয়ে শীঘ্রই ফিরে আসছি',
    description: 'আমরা বর্তমানে আমাদের প্ল্যাটফর্মে কিছু গুরুত্বপূর্ণ উন্নতি এবং রক্ষণাবেক্ষণের কাজ করছি। এই সময়ে সাইটটি সাময়িকভাবে বন্ধ রয়েছে।',
    expectedTime: 'প্রত্যাশিত সময়',
    defaultTime: 'শীঘ্রই',
    features: [
      'নতুন ফিচার যোগ করা হচ্ছে',
      'সিস্টেম পারফরম্যান্স উন্নত করা হচ্ছে',
      'নিরাপত্তা আপডেট করা হচ্ছে',
      'বাগ ফিক্স করা হচ্ছে'
    ],
    contactTitle: 'জরুরি যোগাযোগ',
    email: 'ইমেইল',
    phone: 'ফোন',
    thankYou: 'আপনার ধৈর্যের জন্য ধন্যবাদ!',
    backSoon: 'আমরা শীঘ্রই ফিরে আসছি',
    adminNote: 'আপনি একজন এডমিন হিসেবে লগইন আছেন। সাধারণ ব্যবহারকারীরা এই পেজ দেখছেন।',
    adminDashboard: 'এডমিন ড্যাশবোর্ড',
    disableMaintenance: 'মেইনটেনেন্স মোড বন্ধ করুন',
  },
  en: {
    title: 'Site Under Maintenance',
    subtitle: "We'll be back soon with better service for you",
    description: 'We are currently performing some important improvements and maintenance on our platform. The site is temporarily unavailable during this time.',
    expectedTime: 'Expected Time',
    defaultTime: 'Soon',
    features: [
      'Adding new features',
      'Improving system performance',
      'Updating security',
      'Fixing bugs'
    ],
    contactTitle: 'Emergency Contact',
    email: 'Email',
    phone: 'Phone',
    thankYou: 'Thank you for your patience!',
    backSoon: 'We will be back soon',
    adminNote: 'You are logged in as an admin. Regular users are seeing this page.',
    adminDashboard: 'Admin Dashboard',
    disableMaintenance: 'Disable Maintenance Mode',
  }
};

export function MaintenancePage({ language, setPage, estimatedTime, message }: MaintenancePageProps) {
  const t = content[language];
  
  // Check if user is admin
  const currentUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
  const isAdmin = currentUser?.role === 'admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 flex items-center justify-center p-4">
      <div className="w-full max-w-4xl">
        {/* Admin Notice */}
        {isAdmin && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-6"
          >
            <Card className="p-4 bg-amber-50 border-amber-200">
              <div className="flex items-center gap-3">
                <AlertCircle className="w-5 h-5 text-amber-600" />
                <div className="flex-1">
                  <p className="text-sm font-semibold text-amber-900 font-[Noto_Serif_Bengali]">
                    {t.adminNote}
                  </p>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={() => setPage('admin-dashboard')}
                    className="font-[Noto_Serif_Bengali]"
                  >
                    <Home className="w-4 h-4 mr-2" />
                    {t.adminDashboard}
                  </Button>
                </div>
              </div>
            </Card>
          </motion.div>
        )}

        {/* Main Content */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <Card className="p-8 md:p-12 shadow-2xl bg-white/80 backdrop-blur-sm">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 2, repeat: Infinity, repeatDelay: 3 }}
              >
                <TalentTutorLogo size="xl" showText={true} showSubtitle={false} />
              </motion.div>
            </div>

            {/* Icon Animation */}
            <div className="flex justify-center mb-6">
              <motion.div
                className="relative"
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              >
                <div className="w-24 h-24 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
                  <Wrench className="w-12 h-12 text-emerald-600" />
                </div>
              </motion.div>
            </div>

            {/* Title */}
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-4 font-[Noto_Serif_Bengali]"
            >
              {t.title}
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-lg text-center text-gray-600 mb-8 font-[Noto_Serif_Bengali]"
            >
              {t.subtitle}
            </motion.p>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center text-gray-700 mb-8 max-w-2xl mx-auto font-[Noto_Serif_Bengali]"
            >
              {message || t.description}
            </motion.p>

            {/* Estimated Time */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="flex items-center justify-center gap-3 mb-8 p-4 bg-emerald-50 rounded-lg border border-emerald-200"
            >
              <Clock className="w-5 h-5 text-emerald-600" />
              <div>
                <p className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">{t.expectedTime}:</p>
                <p className="font-semibold text-emerald-600 font-[Noto_Serif_Bengali]">
                  {estimatedTime || t.defaultTime}
                </p>
              </div>
            </motion.div>

            {/* Features List */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
              className="mb-8"
            >
              <h3 className="text-center font-semibold text-gray-900 mb-4 font-[Noto_Serif_Bengali]">
                {language === 'bn' ? 'আমরা যা করছি:' : 'What we are doing:'}
              </h3>
              <div className="grid md:grid-cols-2 gap-3 max-w-xl mx-auto">
                {t.features.map((feature, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.7 + index * 0.1 }}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg"
                  >
                    <div className="w-2 h-2 rounded-full bg-emerald-500" />
                    <span className="text-sm text-gray-700 font-[Noto_Serif_Bengali]">{feature}</span>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1 }}
              className="border-t pt-6"
            >
              <h3 className="text-center font-semibold text-gray-900 mb-4 font-[Noto_Serif_Bengali]">
                {t.contactTitle}
              </h3>
              <div className="flex flex-wrap justify-center gap-4">
                <div className="flex items-center gap-2 text-gray-600">
                  <Mail className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-[Noto_Serif_Bengali]">{t.email}:</span>
                  <a href="mailto:support@talenttutor.com" className="text-emerald-600 hover:underline">
                    support@talenttutor.com
                  </a>
                </div>
                <div className="flex items-center gap-2 text-gray-600">
                  <Phone className="w-4 h-4 text-emerald-600" />
                  <span className="text-sm font-[Noto_Serif_Bengali]">{t.phone}:</span>
                  <a href="tel:+8801234567890" className="text-emerald-600 hover:underline">
                    +880 1234-567890
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Thank You Message */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2 }}
              className="text-center mt-8"
            >
              <p className="text-lg font-semibold text-gray-900 mb-2 font-[Noto_Serif_Bengali]">
                {t.thankYou}
              </p>
              <p className="text-gray-600 font-[Noto_Serif_Bengali]">
                {t.backSoon}
              </p>
            </motion.div>

            {/* Loading Animation */}
            <motion.div
              className="flex justify-center gap-2 mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.4 }}
            >
              {[0, 1, 2].map((i) => (
                <motion.div
                  key={i}
                  className="w-3 h-3 bg-emerald-500 rounded-full"
                  animate={{
                    scale: [1, 1.5, 1],
                    opacity: [1, 0.5, 1]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    delay: i * 0.2
                  }}
                />
              ))}
            </motion.div>
          </Card>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="text-center mt-6 text-gray-600"
        >
          <p className="text-sm font-[Noto_Serif_Bengali]">
            © 2025 Talent Tutor. {language === 'bn' ? 'সর্বস্বত্ব সংরক্ষিত।' : 'All rights reserved.'}
          </p>
        </motion.div>
      </div>
    </div>
  );
}
