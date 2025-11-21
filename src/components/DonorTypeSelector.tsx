import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Label } from './ui/label';
import { 
  Heart, 
  DollarSign, 
  BookOpen, 
  CheckCircle2, 
  Info,
  Gift,
  Coins,
  Package
} from 'lucide-react';
import { motion } from 'motion/react';

interface DonorTypeSelectorProps {
  selectedType: 'zakat' | 'materials' | null;
  onSelect: (type: 'zakat' | 'materials') => void;
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'দাতার ধরন নির্বাচন করুন',
    subtitle: 'আপনি কোন ধরনের দান করতে চান?',
    zakatDonor: 'যাকাত প্রদানকারী',
    zakatDesc: 'অর্থ ও সব ধরনের সাহায্য প্রদান',
    materialsDonor: 'শিক্ষা উপকরণ দাতা',
    materialsDesc: 'শুধুমাত্র বই ও শিক্ষা উপকরণ প্রদান',
    zakatBenefits: 'সুবিধা:',
    zakatBenefit1: '✅ অর্থ প্রদান করতে পারবেন',
    zakatBenefit2: '✅ বই ও শিক্ষা উপকরণ দান',
    zakatBenefit3: '✅ ইউনিফর্ম ও স্টেশনারি',
    zakatBenefit4: '✅ সব ছাত্র আবেদন দেখতে পারবেন',
    zakatBenefit5: '✅ Financial transaction history',
    materialsBenefits: 'সুবিধা:',
    materialsBenefit1: '✅ বই দান করতে পারবেন',
    materialsBenefit2: '✅ শিক্ষা উপকরণ দান',
    materialsBenefit3: '✅ ইউনিফর্ম ও স্টেশনারি',
    materialsBenefit4: '✅ লাইব্রেরিতে অবদান',
    materialsBenefit5: '❌ আর্থিক লেনদেন নেই',
    continue: 'চালিয়ে যান',
    selectFirst: 'প্রথমে একটি ধরন নির্বাচন করুন',
    recommended: 'প্রস্তাবিত',
    popular: 'জনপ্রিয়',
    zakatInfo: 'যাকাত ফান্ড থেকে সম্পূর্ণ সাহায্য প্রদান',
    materialsInfo: 'শুধুমাত্র বই ও উপকরণ দান (কোন অর্থ নয়)',
  },
  en: {
    title: 'Select Donor Type',
    subtitle: 'What type of donation would you like to make?',
    zakatDonor: 'Zakat Donor',
    zakatDesc: 'Provide money and all types of assistance',
    materialsDonor: 'Educational Materials Donor',
    materialsDesc: 'Provide books and educational materials only',
    zakatBenefits: 'Benefits:',
    zakatBenefit1: '✅ Can donate money',
    zakatBenefit2: '✅ Donate books & materials',
    zakatBenefit3: '✅ Uniforms & stationery',
    zakatBenefit4: '✅ View all student applications',
    zakatBenefit5: '✅ Financial transaction history',
    materialsBenefits: 'Benefits:',
    materialsBenefit1: '✅ Can donate books',
    materialsBenefit2: '✅ Donate educational materials',
    materialsBenefit3: '✅ Uniforms & stationery',
    materialsBenefit4: '✅ Contribute to library',
    materialsBenefit5: '❌ No financial transactions',
    continue: 'Continue',
    selectFirst: 'Please select a donor type first',
    recommended: 'Recommended',
    popular: 'Popular',
    zakatInfo: 'Provide complete assistance from Zakat fund',
    materialsInfo: 'Donate books & materials only (no money)',
  }
};

export function DonorTypeSelector({ selectedType, onSelect, language }: DonorTypeSelectorProps) {
  const t = content[language];

  const donorTypes = [
    {
      id: 'zakat' as const,
      name: t.zakatDonor,
      description: t.zakatDesc,
      icon: DollarSign,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-50',
      borderColor: 'border-emerald-200',
      badge: t.recommended,
      badgeColor: 'bg-emerald-600',
      info: t.zakatInfo,
      benefits: [
        t.zakatBenefit1,
        t.zakatBenefit2,
        t.zakatBenefit3,
        t.zakatBenefit4,
        t.zakatBenefit5,
      ],
    },
    {
      id: 'materials' as const,
      name: t.materialsDonor,
      description: t.materialsDesc,
      icon: BookOpen,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-50',
      borderColor: 'border-blue-200',
      badge: t.popular,
      badgeColor: 'bg-blue-600',
      info: t.materialsInfo,
      benefits: [
        t.materialsBenefit1,
        t.materialsBenefit2,
        t.materialsBenefit3,
        t.materialsBenefit4,
        t.materialsBenefit5,
      ],
    },
  ];

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-2xl text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {donorTypes.map((type) => {
          const Icon = type.icon;
          const isSelected = selectedType === type.id;

          return (
            <motion.div
              key={type.id}
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Card
                className={`p-6 cursor-pointer transition-all ${
                  isSelected
                    ? `border-4 ${type.borderColor} shadow-xl ${type.bgColor}`
                    : 'border-2 border-gray-200 hover:border-gray-300'
                }`}
                onClick={() => onSelect(type.id)}
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-14 h-14 bg-gradient-to-br ${type.color} rounded-xl flex items-center justify-center shadow-lg`}>
                    <Icon className="w-7 h-7 text-white" />
                  </div>
                  {isSelected && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center"
                    >
                      <CheckCircle2 className="w-5 h-5 text-white" />
                    </motion.div>
                  )}
                </div>

                {/* Title & Badge */}
                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-lg text-gray-900">{type.name}</h3>
                    <Badge className={`${type.badgeColor} text-white text-xs`}>
                      {type.badge}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-600">{type.description}</p>
                </div>

                {/* Info Box */}
                <div className={`${type.bgColor} border ${type.borderColor} rounded-lg p-3 mb-4`}>
                  <div className="flex items-start gap-2">
                    <Info className="w-4 h-4 text-gray-600 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700">{type.info}</p>
                  </div>
                </div>

                {/* Benefits List */}
                <div className="space-y-2">
                  <p className="text-xs text-gray-900 mb-2">{t.zakatBenefits}</p>
                  {type.benefits.map((benefit, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <span className="text-xs text-gray-700">{benefit}</span>
                    </div>
                  ))}
                </div>

                {/* Selection Radio (visual only) */}
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex items-center gap-2">
                    <div
                      className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                        isSelected
                          ? 'border-emerald-500 bg-emerald-500'
                          : 'border-gray-300'
                      }`}
                    >
                      {isSelected && (
                        <div className="w-2 h-2 bg-white rounded-full" />
                      )}
                    </div>
                    <span className="text-sm text-gray-700">
                      {isSelected ? (
                        <span className="text-emerald-700">
                          {language === 'bn' ? '✓ নির্বাচিত' : '✓ Selected'}
                        </span>
                      ) : (
                        <span className="text-gray-500">
                          {language === 'bn' ? 'নির্বাচন করুন' : 'Select this'}
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Comparison Table (Optional) */}
      <Card className="p-6 bg-gradient-to-br from-gray-50 to-white border-2 border-gray-200">
        <h3 className="text-lg text-gray-900 mb-4 text-center">
          {language === 'bn' ? '📊 তুলনা সারণী' : '📊 Comparison Table'}
        </h3>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b-2 border-gray-200">
                <th className="text-left py-3 px-4 text-gray-700">
                  {language === 'bn' ? 'বৈশিষ্ট্য' : 'Feature'}
                </th>
                <th className="text-center py-3 px-4 text-emerald-700">
                  {language === 'bn' ? 'যাকাত' : 'Zakat'}
                </th>
                <th className="text-center py-3 px-4 text-blue-700">
                  {language === 'bn' ? 'উপকরণ' : 'Materials'}
                </th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">
                  {language === 'bn' ? 'অর্থ দান' : 'Money Donation'}
                </td>
                <td className="text-center py-3 px-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                </td>
                <td className="text-center py-3 px-4">
                  <span className="text-gray-400">✗</span>
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">
                  {language === 'bn' ? 'বই ও উপকরণ' : 'Books & Materials'}
                </td>
                <td className="text-center py-3 px-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                </td>
                <td className="text-center py-3 px-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mx-auto" />
                </td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-3 px-4 text-gray-700">
                  {language === 'bn' ? 'আর্থিক রিপোর্ট' : 'Financial Reports'}
                </td>
                <td className="text-center py-3 px-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                </td>
                <td className="text-center py-3 px-4">
                  <span className="text-gray-400">✗</span>
                </td>
              </tr>
              <tr>
                <td className="py-3 px-4 text-gray-700">
                  {language === 'bn' ? 'ছাত্র প্রোফাইল' : 'Student Profiles'}
                </td>
                <td className="text-center py-3 px-4">
                  <CheckCircle2 className="w-5 h-5 text-emerald-600 mx-auto" />
                </td>
                <td className="text-center py-3 px-4">
                  <CheckCircle2 className="w-5 h-5 text-blue-600 mx-auto" />
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
