import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Separator } from './ui/separator';
import {
  Heart,
  Mail,
  Phone,
  MessageCircle,
  ExternalLink,
  FileText,
  BookOpen,
  HelpCircle,
  Code,
  Github,
  Globe,
  Shield,
  Lock,
  Clock,
} from 'lucide-react';

interface DashboardFooterProps {
  userRole: 'teacher' | 'guardian' | 'student' | 'donor' | 'admin';
  language?: 'bn' | 'en';
}

const content = {
  bn: {
    developer: 'ডেভেলপার',
    support: 'সাপোর্ট',
    documentation: 'ডকুমেন্টেশন',
    quickLinks: 'দ্রুত লিংক',
    contactSupport: 'সাপোর্টে যোগাযোগ',
    viewDocs: 'ডকুমেন্টেশন দেখুন',
    developedWith: 'দিয়ে তৈরি',
    version: 'সংস্করণ',
    lastUpdated: 'সর্বশেষ আপডেট',
    privacyPolicy: 'গোপনীয়তা নীতি',
    termsOfService: 'সেবার শর্তাবলী',
    allRightsReserved: 'সর্বস্বত্ব সংরক্ষিত',
    helpCenter: 'সাহায্য কেন্দ্র',
    faq: 'সাধারণ প্রশ্ন',
    reportIssue: 'সমস্যা রিপোর্ট করুন',
    // Role-specific docs
    teacherGuide: 'শিক্ষক গাইড',
    guardianGuide: 'অভিভাবক গাইড',
    studentGuide: 'শিক্ষার্থী গাইড',
    donorGuide: 'দাতা গাইড',
    adminGuide: 'প্রশাসক গাইড',
    creditSystem: 'ক্রেডিট সিস্টেম',
    howToUse: 'কিভাবে ব্যবহার করবেন',
    bestPractices: 'সর্বোত্তম পদ্ধতি',
  },
  en: {
    developer: 'Developer',
    support: 'Support',
    documentation: 'Documentation',
    quickLinks: 'Quick Links',
    contactSupport: 'Contact Support',
    viewDocs: 'View Documentation',
    developedWith: 'Developed with',
    version: 'Version',
    lastUpdated: 'Last Updated',
    privacyPolicy: 'Privacy Policy',
    termsOfService: 'Terms of Service',
    allRightsReserved: 'All Rights Reserved',
    helpCenter: 'Help Center',
    faq: 'FAQ',
    reportIssue: 'Report Issue',
    teacherGuide: 'Teacher Guide',
    guardianGuide: 'Guardian Guide',
    studentGuide: 'Student Guide',
    donorGuide: 'Donor Guide',
    adminGuide: 'Admin Guide',
    creditSystem: 'Credit System',
    howToUse: 'How to Use',
    bestPractices: 'Best Practices',
  },
};

const roleSpecificDocs = {
  teacher: [
    { label: 'teacherGuide', icon: BookOpen, link: '#' },
    { label: 'creditSystem', icon: FileText, link: '#' },
    { label: 'howToUse', icon: HelpCircle, link: '#' },
    { label: 'bestPractices', icon: Shield, link: '#' },
  ],
  guardian: [
    { label: 'guardianGuide', icon: BookOpen, link: '#' },
    { label: 'creditSystem', icon: FileText, link: '#' },
    { label: 'howToUse', icon: HelpCircle, link: '#' },
    { label: 'bestPractices', icon: Shield, link: '#' },
  ],
  student: [
    { label: 'studentGuide', icon: BookOpen, link: '#' },
    { label: 'howToUse', icon: HelpCircle, link: '#' },
    { label: 'faq', icon: MessageCircle, link: '#' },
  ],
  donor: [
    { label: 'donorGuide', icon: BookOpen, link: '#' },
    { label: 'howToUse', icon: HelpCircle, link: '#' },
    { label: 'privacyPolicy', icon: Lock, link: '#' },
  ],
  admin: [
    { label: 'adminGuide', icon: BookOpen, link: '#' },
    { label: 'documentation', icon: FileText, link: '#' },
    { label: 'bestPractices', icon: Shield, link: '#' },
  ],
};

export function DashboardFooter({ userRole, language = 'bn' }: DashboardFooterProps) {
  const t = content[language];
  const docs = roleSpecificDocs[userRole];

  return (
    <footer className="mt-12 mb-6">
      <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100 border-gray-200">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Developer Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-600 to-teal-600 rounded-lg flex items-center justify-center">
                <Code className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">{t.developer}</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <p className="flex items-center gap-2">
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
                <span>{t.developedWith}</span>
                <Heart className="w-3 h-3 text-rose-500 fill-rose-500" />
              </p>
              <p className="font-medium text-emerald-700">Talent Tutor Team</p>
              <div className="flex items-center gap-2 text-xs">
                <Badge variant="outline" className="text-xs">
                  {t.version} 1.0.0
                </Badge>
                <Clock className="w-3 h-3" />
                <span>Nov 2025</span>
              </div>
            </div>
          </div>

          {/* Support Info */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">{t.support}</h4>
            </div>
            <div className="space-y-2 text-sm text-gray-600">
              <a
                href="mailto:support@talenttutor.com"
                className="flex items-center gap-2 hover:text-emerald-600 transition-colors"
              >
                <Mail className="w-3 h-3" />
                <span>support@talenttutor.com</span>
              </a>
              <a
                href="tel:+8801700000000"
                className="flex items-center gap-2 hover:text-emerald-600 transition-colors"
              >
                <Phone className="w-3 h-3" />
                <span>+880 1700-000000</span>
              </a>
              <Button
                variant="outline"
                size="sm"
                className="w-full mt-2 text-xs border-emerald-300 text-emerald-700 hover:bg-emerald-50"
              >
                <MessageCircle className="w-3 h-3 mr-1" />
                {t.contactSupport}
              </Button>
            </div>
          </div>

          {/* Role-Specific Documentation */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">{t.documentation}</h4>
            </div>
            <div className="space-y-1.5">
              {docs.map((doc) => {
                const Icon = doc.icon;
                return (
                  <a
                    key={doc.label}
                    href={doc.link}
                    className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors group"
                  >
                    <Icon className="w-3 h-3 group-hover:text-emerald-600" />
                    <span>{t[doc.label as keyof typeof t]}</span>
                    <ExternalLink className="w-2.5 h-2.5 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <div className="w-8 h-8 bg-gradient-to-br from-amber-600 to-orange-600 rounded-lg flex items-center justify-center">
                <HelpCircle className="w-4 h-4 text-white" />
              </div>
              <h4 className="font-semibold text-gray-900">{t.quickLinks}</h4>
            </div>
            <div className="space-y-1.5">
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors group"
              >
                <HelpCircle className="w-3 h-3 group-hover:text-emerald-600" />
                <span>{t.helpCenter}</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors group"
              >
                <MessageCircle className="w-3 h-3 group-hover:text-emerald-600" />
                <span>{t.faq}</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors group"
              >
                <Lock className="w-3 h-3 group-hover:text-emerald-600" />
                <span>{t.privacyPolicy}</span>
              </a>
              <a
                href="#"
                className="flex items-center gap-2 text-sm text-gray-600 hover:text-emerald-600 transition-colors group"
              >
                <Shield className="w-3 h-3 group-hover:text-emerald-600" />
                <span>{t.termsOfService}</span>
              </a>
            </div>
          </div>
        </div>

        <Separator className="my-6" />

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-gray-500">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-gradient-to-br from-emerald-600 to-teal-600 rounded flex items-center justify-center">
              <span className="text-white font-bold text-xs">TT</span>
            </div>
            <span>© 2025 Talent Tutor. {t.allRightsReserved}</span>
          </div>
          <div className="flex items-center gap-4">
            <a href="#" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
              <Globe className="w-3 h-3" />
              <span>Website</span>
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
              <Github className="w-3 h-3" />
              <span>GitHub</span>
            </a>
            <a href="#" className="hover:text-emerald-600 transition-colors flex items-center gap-1">
              <FileText className="w-3 h-3" />
              <span>{t.documentation}</span>
            </a>
          </div>
        </div>
      </Card>
    </footer>
  );
}
