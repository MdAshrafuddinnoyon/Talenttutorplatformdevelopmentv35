import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { ArrowLeft, Building2, Package, Gift, CheckCircle } from 'lucide-react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';

interface PartnerPageProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  setPage: (page: string) => void;
  announcement?: { title: string; message: string; type: string } | null;
  onLogin?: (type: 'teacher' | 'guardian' | 'student' | 'admin' | 'donor', userData?: any) => void;
}

const content = {
  bn: {
    title: 'আমাদের অংশীদার ও স্পন্সর',
    subtitle: 'যারা আমাদের সাথে শিক্ষার মান উন্নয়নে কাজ করছেন',
    backToHome: 'হোমে ফিরুন',
    stationeryPartners: 'স্টেশনারি পার্টনার',
    corporateSponsors: 'কর্পোরেট স্পন্সর',
    educationPartners: 'শিক্ষা প্রতিষ্ঠান',
    viewProducts: 'পণ্য দেখুন',
    requestDonation: 'দান অনুরোধ করুন',
    discountAvailable: 'ছাড় পাওয়া যাচ্ছে',
    totalDonated: 'মোট দান',
    productsAvailable: 'পণ্য পাওয়া যাচ্ছে',
    becomePartner: 'অংশীদার হন',
    becomePartnerDesc: 'আপনার প্রতিষ্ঠান কি শিক্ষার্থীদের সাহায্য করতে চায়?',
    applyNow: 'আবেদন করুন',
  },
  en: {
    title: 'Our Partners & Sponsors',
    subtitle: 'Those who are working with us to improve education quality',
    backToHome: 'Back to Home',
    stationeryPartners: 'Stationery Partners',
    corporateSponsors: 'Corporate Sponsors',
    educationPartners: 'Education Partners',
    viewProducts: 'View Products',
    requestDonation: 'Request Donation',
    discountAvailable: 'Discount Available',
    totalDonated: 'Total Donated',
    productsAvailable: 'Products Available',
    becomePartner: 'Become a Partner',
    becomePartnerDesc: 'Does your organization want to help students?',
    applyNow: 'Apply Now',
  },
};

const stationeryPartners = [
  {
    id: 1,
    name: 'বসুন্ধরা পেপার প্রোডাক্টস',
    logo: '🏢',
    description: 'খাতা, কাগজ এবং স্টেশনারি প্রোডাক্টস',
    donated: '৫০,০০০+ খাতা',
    discount: '২০-৩০%',
    products: ['খাতা', 'কাগজ', 'পেন্সিল', 'কলম'],
  },
  {
    id: 2,
    name: 'ফ্রেশ স্টেশনারি',
    logo: '📝',
    description: 'স্কুল স্টেশনারি ও শিক্ষা উপকরণ',
    donated: '৩০,০০০+ আইটেম',
    discount: '২৫%',
    products: ['স্কুল ব্যাগ', 'পেন্সিল বক্স', 'রং পেন্সিল', 'স্কেল'],
  },
  {
    id: 3,
    name: 'ন্যাভানা স্টেশনারি',
    logo: '✏️',
    description: 'প্রিমিয়াম স্টেশনারি প্রোডাক্ট',
    donated: '২০,০০০+ আইটেম',
    discount: '১৫-২০%',
    products: ['ডায়েরি', 'নোটবুক', 'ফাইল', 'ক্যালকুলেটর'],
  },
];

const corporateSponsors = [
  {
    id: 1,
    name: 'বাংলাদেশ ব্যাংক',
    logo: '🏦',
    description: 'CSR তহবিল থেকে শিক্ষার্থী বৃত্তি',
    donated: '৳ ১০,০০,০০০',
    students: 100,
  },
  {
    id: 2,
    name: 'গ্রামীণফোন',
    logo: '📱',
    description: 'ডিজিটাল শিক্ষা সহায়তা',
    donated: '৳ ৫,০০,০০০',
    students: 50,
  },
  {
    id: 3,
    name: 'রবি আজিয়াটা',
    logo: '🌐',
    description: 'ইন্টারনেট ও ডিজিটাল সাপোর্ট',
    donated: '৳ ৩,০০,০০০',
    students: 30,
  },
];

const educationPartners = [
  {
    id: 1,
    name: 'শিক্ষা মন্ত্রণালয়',
    logo: '🎓',
    description: 'সরকারি সহযোগিতা ও গাইডলাইন',
    support: 'নীতি সহায়তা',
  },
  {
    id: 2,
    name: 'ঢাকা বিশ্ববিদ্যালয়',
    logo: '🏛️',
    description: 'মেধাবী শিক্ষার্থী চিহ্নিতকরণ',
    support: 'শিক্ষক নেটওয়ার্ক',
  },
  {
    id: 3,
    name: 'BRAC শিক্ষা কর্মসূচি',
    logo: '📚',
    description: 'গ্রামীণ শিক্ষা বিস্তার',
    support: 'মাঠ পর্যায় সহায়তা',
  },
];

export function PartnerPage({ language, setLanguage, setPage, announcement, onLogin }: PartnerPageProps) {
  const t = content[language];

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50">
      {/* Header */}
      <Header language={language} setLanguage={setLanguage} setPage={setPage} announcement={announcement} onLogin={onLogin} />

      <div className="container mx-auto px-4 py-8">
        {/* Hero */}
        <div className="text-center mb-12">
          <h1 className="text-gray-900 mb-4">{t.title}</h1>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">{t.subtitle}</p>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="p-6 text-center">
            <Building2 className="w-10 h-10 text-emerald-600 mx-auto mb-3" />
            <div className="text-2xl text-gray-900 mb-1">২৫+</div>
            <p className="text-gray-600">অংশীদার</p>
          </Card>
          <Card className="p-6 text-center">
            <Package className="w-10 h-10 text-teal-600 mx-auto mb-3" />
            <div className="text-2xl text-gray-900 mb-1">১,২০,০০০+</div>
            <p className="text-gray-600">দানকৃত পণ্য</p>
          </Card>
          <Card className="p-6 text-center">
            <Gift className="w-10 h-10 text-cyan-600 mx-auto mb-3" />
            <div className="text-2xl text-gray-900 mb-1">৳ ২৫,০০,০০০</div>
            <p className="text-gray-600">মোট দান</p>
          </Card>
          <Card className="p-6 text-center">
            <CheckCircle className="w-10 h-10 text-green-600 mx-auto mb-3" />
            <div className="text-2xl text-gray-900 mb-1">৫০০+</div>
            <p className="text-gray-600">উপকৃত ছাত্র</p>
          </Card>
        </div>

        {/* Stationery Partners */}
        <div className="mb-12">
          <h2 className="text-gray-900 mb-6">{t.stationeryPartners}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {stationeryPartners.map((partner) => (
              <Card key={partner.id} className="p-6 hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{partner.logo}</div>
                <h3 className="text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="flex items-center justify-between p-2 bg-emerald-50 rounded">
                    <span className="text-sm text-gray-700">দান করেছে</span>
                    <span className="text-sm text-emerald-700">{partner.donated}</span>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-teal-50 rounded">
                    <span className="text-sm text-gray-700">ছাড়</span>
                    <Badge className="bg-teal-600">{partner.discount}</Badge>
                  </div>
                </div>
                <div className="flex flex-wrap gap-2 mb-4">
                  {partner.products.map((product, i) => (
                    <Badge key={i} variant="secondary">
                      {product}
                    </Badge>
                  ))}
                </div>
                <div className="grid grid-cols-2 gap-2">
                  <Button size="sm" variant="outline">
                    {t.viewProducts}
                  </Button>
                  <Button size="sm" className="bg-emerald-600">
                    অনুরোধ করুন
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Corporate Sponsors */}
        <div className="mb-12">
          <h2 className="text-gray-900 mb-6">{t.corporateSponsors}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {corporateSponsors.map((sponsor) => (
              <Card key={sponsor.id} className="p-6 hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{sponsor.logo}</div>
                <h3 className="text-gray-900 mb-2">{sponsor.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{sponsor.description}</p>
                <div className="space-y-2 mb-4">
                  <div className="p-3 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">মোট দান</div>
                    <div className="text-xl text-emerald-700">{sponsor.donated}</div>
                  </div>
                  <div className="p-3 bg-gradient-to-r from-teal-50 to-cyan-50 rounded-lg">
                    <div className="text-sm text-gray-600 mb-1">উপকৃত ছাত্র</div>
                    <div className="text-xl text-teal-700">{sponsor.students} জন</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Education Partners */}
        <div className="mb-12">
          <h2 className="text-gray-900 mb-6">{t.educationPartners}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {educationPartners.map((partner) => (
              <Card key={partner.id} className="p-6 hover:shadow-xl transition-shadow">
                <div className="text-5xl mb-4">{partner.logo}</div>
                <h3 className="text-gray-900 mb-2">{partner.name}</h3>
                <p className="text-gray-600 text-sm mb-4">{partner.description}</p>
                <div className="p-3 bg-cyan-50 rounded-lg">
                  <div className="text-sm text-gray-600 mb-1">সহযোগিতা</div>
                  <div className="text-cyan-700">{partner.support}</div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Become Partner CTA */}
        <Card className="p-8 bg-gradient-to-r from-emerald-600 to-teal-600 text-white text-center">
          <h2 className="text-white mb-4">{t.becomePartner}</h2>
          <p className="text-emerald-50 mb-6 max-w-2xl mx-auto">{t.becomePartnerDesc}</p>
          <div className="space-y-4">
            <div className="grid md:grid-cols-3 gap-4 text-left max-w-3xl mx-auto mb-6">
              <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 mb-2" />
                <h4 className="text-white mb-1">CSR সুবিধা</h4>
                <p className="text-emerald-100 text-sm">কর্পোরেট সামাজিক দায়বদ্ধতা পূরণ</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 mb-2" />
                <h4 className="text-white mb-1">ব্র্যান্ড প্রচার</h4>
                <p className="text-emerald-100 text-sm">হাজারো ইউজারের কাছে পৌঁছান</p>
              </div>
              <div className="bg-white/10 backdrop-blur p-4 rounded-lg">
                <CheckCircle className="w-6 h-6 mb-2" />
                <h4 className="text-white mb-1">সামাজিক প্রভাব</h4>
                <p className="text-emerald-100 text-sm">শিক্ষার্থীদের ভবিষ্যৎ গড়ুন</p>
              </div>
            </div>
            <Button size="lg" className="bg-white text-emerald-700 hover:bg-emerald-50">
              {t.applyNow}
            </Button>
          </div>
        </Card>
      </div>
      
      {/* Footer */}
      <Footer language={language} setPage={setPage} />
    </div>
  );
}
