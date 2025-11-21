import { Button } from './ui/button';
import { GradientButton } from './ui/gradient-button';
import { Smartphone, Download, QrCode, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface AppDownloadSectionProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'যেকোনো জায়গা থেকে, যেকোনো সময়',
    subtitle: 'আমাদের মোবাইল অ্যাপ ডাউনলোড করুন',
    description: 'Talent Tutor মোবাইল অ্যাপ ডাউনলোড করে যেকোনো জায়গা থেকে শিক্ষক খুঁজুন, আবেদন করুন এবং আপনার টিউশন ম্যানেজ করুন।',
    downloadApk: 'APK ডাউনলোড করুন',
    googlePlay: 'Google Play-তে পাবেন',
    scanQr: 'QR কোড স্ক্যান করুন',
    features: [
      '✓ সহজ রেজিস্ট্রেশন এবং প্রোফাইল ম্যানেজমেন্ট',
      '✓ রিয়েল-টাইম নোটিফিকেশন',
      '✓ অনলাইন চ্যাট এবং ভিডিও কল',
      '✓ সিকিউর পেমেন্ট সিস্টেম',
      '✓ ডিজিটাল লাইব্রেরি অ্যাক্সেস',
      '✓ পরিবেশ শিক্ষা মডিউল',
    ],
  },
  en: {
    title: 'From Anywhere, Anytime',
    subtitle: 'Download Our Mobile App',
    description: 'Download the Talent Tutor mobile app to find teachers, apply, and manage your tuitions from anywhere.',
    downloadApk: 'Download APK',
    googlePlay: 'Get it on Google Play',
    scanQr: 'Scan QR Code',
    features: [
      '✓ Easy registration and profile management',
      '✓ Real-time notifications',
      '✓ Online chat and video call',
      '✓ Secure payment system',
      '✓ Digital library access',
      '✓ Eco-education module',
    ],
  },
};

export function AppDownloadSection({ language }: AppDownloadSectionProps) {
  const t = content[language];

  return (
    <section className="py-10 sm:py-14 lg:py-18 bg-gradient-to-br from-emerald-600 via-teal-600 to-cyan-700 text-white relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-white rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-3 sm:px-4 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-10 items-center">
          {/* Left Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/20 rounded-full mb-6">
              <Smartphone className="w-5 h-5" />
              <span>মোবাইল অ্যাপ</span>
            </div>

            <h2 className="text-white mb-4">
              {t.title}
            </h2>
            
            <h3 className="text-emerald-100 mb-6">
              {t.subtitle}
            </h3>

            <p className="text-emerald-50 mb-8">
              {t.description}
            </p>

            <div className="space-y-3 mb-8">
              {t.features.map((feature, index) => (
                <motion.div 
                  key={feature}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="flex items-center gap-3 text-emerald-50"
                >
                  <CheckCircle className="w-5 h-5 text-emerald-200 flex-shrink-0" />
                  <span>{feature.replace('✓ ', '')}</span>
                </motion.div>
              ))}
            </div>

            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50 hover:shadow-xl transition-all">
                <Download className="w-5 h-5 mr-2" />
                {t.downloadApk}
              </Button>
              <Button size="lg" variant="outline" className="border-2 border-white text-[rgb(13,13,13)] hover:bg-white hover:text-emerald-700 transition-all">
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.53,12.9 20.18,13.18L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
                </svg>
                Google Play
              </Button>
            </motion.div>
          </motion.div>

          {/* Right - App Preview & QR */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative"
          >
            <div className="bg-white rounded-2xl p-8 shadow-2xl">
              {/* Phone Mockup */}
              <div className="bg-gray-900 rounded-3xl p-4 shadow-xl mx-auto max-w-xs">
                <div className="bg-white rounded-2xl overflow-hidden">
                  <div className="bg-emerald-600 p-4 text-white">
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center text-emerald-600">
                          TT
                        </div>
                        <span>Talent Tutor</span>
                      </div>
                      <div className="w-8 h-8 bg-white/20 rounded-full"></div>
                    </div>
                    <div className="bg-white rounded-lg p-3 text-gray-800">
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-gray-500">🔍</span>
                        <span className="text-gray-400">শিক্ষক খুঁজুন...</span>
                      </div>
                    </div>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="bg-emerald-50 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-emerald-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-emerald-200 rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-emerald-100 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-teal-50 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-teal-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-teal-200 rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-teal-100 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                    <div className="bg-cyan-50 p-3 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 bg-cyan-200 rounded-full"></div>
                        <div className="flex-1">
                          <div className="h-3 bg-cyan-200 rounded w-3/4 mb-2"></div>
                          <div className="h-2 bg-cyan-100 rounded w-1/2"></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* QR Code */}
              <div className="mt-6 text-center">
                <div className="bg-gradient-to-br from-emerald-100 to-teal-100 w-32 h-32 mx-auto rounded-xl flex items-center justify-center mb-3 shadow-lg hover:scale-105 transition-transform">
                  <QrCode className="w-20 h-20 text-emerald-700" />
                </div>
                <p className="text-gray-700">{t.scanQr}</p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
