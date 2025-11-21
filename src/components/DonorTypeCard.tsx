import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { DollarSign, BookOpen, CheckCircle2, Settings } from 'lucide-react';

interface DonorTypeCardProps {
  donorType: 'zakat' | 'materials';
  language: 'bn' | 'en';
  onChangeType?: () => void;
}

const content = {
  bn: {
    yourDonorType: 'আপনার দাতার ধরন',
    zakatDonor: 'যাকাত প্রদানকারী',
    materialsDonor: 'শিক্ষা উপকরণ দাতা',
    zakatDesc: 'আপনি অর্থ এবং সব ধরনের সাহায্য প্রদান করতে পারেন',
    materialsDesc: 'আপনি শুধুমাত্র বই ও শিক্ষা উপকরণ দান করেন',
    benefits: 'সুবিধা সমূহ:',
    zakatBenefits: [
      '💰 অর্থ দান করার সুবিধা',
      '📚 বই ও উপকরণ দান',
      '👔 ইউনিফর্ম ও স্টেশনারি',
      '📊 আর্থিক রিপোর্ট ও ট্যাক্স সুবিধা',
      '👥 সব ছাত্র আবেদন দেখার অ্যাক্সেস',
    ],
    materialsBenefits: [
      '📚 বই ও শিক্ষা উপকরণ দান',
      '📖 লাইব্রেরিতে অবদান',
      '✏️ স্টেশনারি সরবরাহ',
      '🎒 স্কুল ব্যাগ ও উপকরণ',
      '🚫 কোন আর্থিক লেনদেন নেই',
    ],
    changeType: 'ধরন পরিবর্তন করুন',
  },
  en: {
    yourDonorType: 'Your Donor Type',
    zakatDonor: 'Zakat Donor',
    materialsDonor: 'Materials Donor',
    zakatDesc: 'You can provide money and all types of assistance',
    materialsDesc: 'You donate only books and educational materials',
    benefits: 'Benefits:',
    zakatBenefits: [
      '💰 Money donation facility',
      '📚 Books & materials donation',
      '👔 Uniforms & stationery',
      '📊 Financial reports & tax benefits',
      '👥 Access to all student applications',
    ],
    materialsBenefits: [
      '📚 Books & materials donation',
      '📖 Library contribution',
      '✏️ Stationery supply',
      '🎒 School bags & materials',
      '🚫 No financial transactions',
    ],
    changeType: 'Change Type',
  }
};

export function DonorTypeCard({ donorType, language, onChangeType }: DonorTypeCardProps) {
  const t = content[language];
  const isZakat = donorType === 'zakat';

  return (
    <Card className={`p-6 border-2 ${
      isZakat 
        ? 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-teal-50' 
        : 'border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50'
    }`}>
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${
            isZakat 
              ? 'bg-gradient-to-br from-emerald-500 to-teal-600' 
              : 'bg-gradient-to-br from-blue-500 to-cyan-600'
          }`}>
            {isZakat ? (
              <DollarSign className="w-6 h-6 text-white" />
            ) : (
              <BookOpen className="w-6 h-6 text-white" />
            )}
          </div>
          <div>
            <p className="text-xs text-gray-600 mb-1">{t.yourDonorType}</p>
            <h3 className="text-lg text-gray-900">
              {isZakat ? t.zakatDonor : t.materialsDonor}
            </h3>
          </div>
        </div>
        <Badge className={isZakat ? 'bg-emerald-600 text-white' : 'bg-blue-600 text-white'}>
          <CheckCircle2 className="w-3 h-3 mr-1" />
          {language === 'bn' ? 'সক্রিয়' : 'Active'}
        </Badge>
      </div>

      <p className="text-sm text-gray-700 mb-4">
        {isZakat ? t.zakatDesc : t.materialsDesc}
      </p>

      <div className="space-y-2 mb-4">
        <p className="text-xs text-gray-900">{t.benefits}</p>
        <div className="space-y-1">
          {(isZakat ? t.zakatBenefits : t.materialsBenefits).map((benefit, idx) => (
            <div key={idx} className="flex items-start gap-2">
              <span className="text-xs text-gray-700">{benefit}</span>
            </div>
          ))}
        </div>
      </div>

      {onChangeType && (
        <Button
          variant="outline"
          size="sm"
          onClick={onChangeType}
          className="w-full"
        >
          <Settings className="w-4 h-4 mr-2" />
          {t.changeType}
        </Button>
      )}
    </Card>
  );
}
