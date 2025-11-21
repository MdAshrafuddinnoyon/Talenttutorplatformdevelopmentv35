import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { DynamicCMS } from '../components/DynamicCMS';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { 
  FileText, 
  Folder, 
  Tag, 
  Settings,
  BookOpen,
  ArrowLeft
} from 'lucide-react';

interface BlogManagementPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'ব্লগ ম্যানেজমেন্ট সিস্টেম',
    subtitle: 'WordPress-স্টাইল CMS দিয়ে আপনার ব্লগ পোস্ট পরিচালনা করুন',
    cms: 'CMS Dashboard',
    sampleData: 'Sample Data',
    description: 'সম্পূর্ণ ফিচার সহ ব্লগ ম্যানেজমেন্ট - পোস্ট, ক্যাটাগরি, ট্যাগ, SEO এবং আরও অনেক কিছু',
  },
  en: {
    title: 'Blog Management System',
    subtitle: 'Manage your blog posts with WordPress-style CMS',
    cms: 'CMS Dashboard',
    sampleData: 'Sample Data',
    description: 'Full-featured blog management - Posts, Categories, Tags, SEO and more',
  },
};

export function BlogManagementPage({ language, setLanguage, setPage, announcement, onLogin }: BlogManagementPageProps) {
  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-blue-50 to-teal-50">
      <Header 
        language={language} 
        setLanguage={setLanguage} 
        setPage={setPage}
        announcement={announcement}
        onLogin={onLogin}
      />

      <div className="container mx-auto px-4 py-8">
        {/* Back Button */}
        <button
          onClick={() => setPage('admin')}
          className="mb-4 flex items-center gap-2 text-gray-600 hover:text-gray-900 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>{language === 'bn' ? 'অ্যাডমিন ড্যাশবোর্ড' : 'Admin Dashboard'}</span>
        </button>

        {/* Page Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-3">
              <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-500 rounded-2xl flex items-center justify-center shadow-lg">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-4xl text-gray-900 mb-2">
                  {t.title}
                </h1>
                <p className="text-lg text-gray-600">
                  {t.subtitle}
                </p>
              </div>
            </div>
          </div>

          {/* Info Cards */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <Card className="p-4 bg-gradient-to-br from-green-50 to-emerald-50 border-green-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-[#10B981] rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Posts</p>
                  <p className="text-xl text-gray-900">∞</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-teal-600 rounded-lg flex items-center justify-center">
                  <Folder className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Categories</p>
                  <p className="text-xl text-gray-900">∞</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-emerald-500 rounded-lg flex items-center justify-center">
                  <Tag className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">Tags</p>
                  <p className="text-xl text-gray-900">∞</p>
                </div>
              </div>
            </Card>

            <Card className="p-4 bg-gradient-to-br from-amber-50 to-yellow-50 border-amber-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-500 rounded-lg flex items-center justify-center">
                  <Settings className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">SEO Ready</p>
                  <Badge className="bg-green-500">Active</Badge>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* Info Tip */}
        <Card className="mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 bg-[#10B981] rounded-lg flex items-center justify-center flex-shrink-0">
              <FileText className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1">
              <h3 className="text-gray-900 mb-1">
                <strong>💡 {language === 'bn' ? 'কিভাবে ব্যবহার করবেন' : 'How to Use'}</strong>
              </h3>
              <p className="text-sm text-gray-700">
                {language === 'bn' 
                  ? 'এখানে আপনি সম্পূর্ণ WordPress-style CMS ব্যবহার করে ব্লগ পোস্ট তৈরি, সম্পাদনা এবং প্রকাশ করতে পারবেন। পোস্ট "Published" এবং "Featured" mark করলে সেগুলো BlogPage এবং HomePage এ স্বয়ংক্রিয়ভাবে দেখা যাবে।'
                  : 'Here you can create, edit and publish blog posts using a complete WordPress-style CMS. Posts marked as "Published" and "Featured" will automatically appear on BlogPage and HomePage.'
                }
              </p>
            </div>
          </div>
        </Card>

        {/* Main Content */}
        <Card className="p-6 shadow-xl border-2 border-green-100">
          <DynamicCMS />
        </Card>

        {/* Quick Links */}
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-transparent hover:border-blue-300"
            onClick={() => setPage('blog')}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-[#10B981] rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg text-gray-900">
                {language === 'bn' ? 'Blog Page দেখুন' : 'View Blog Page'}
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              {language === 'bn' 
                ? 'সব published blog posts দেখুন এবং filter করুন'
                : 'View and filter all published blog posts'
              }
            </p>
          </Card>

          <Card 
            className="p-6 cursor-pointer hover:shadow-lg transition-shadow bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-transparent hover:border-emerald-300"
            onClick={() => setPage('home')}
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 bg-teal-600 rounded-xl flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-lg text-gray-900">
                {language === 'bn' ? 'HomePage Featured' : 'HomePage Featured'}
              </h3>
            </div>
            <p className="text-sm text-gray-600">
              {language === 'bn'
                ? 'Featured blog posts carousel দেখুন homepage এ'
                : 'View featured blog posts carousel on homepage'
              }
            </p>
          </Card>
        </div>
      </div>

      <Footer language={language} setPage={setPage} />
    </div>
  );
}
