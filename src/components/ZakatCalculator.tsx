import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Calculator, Info, DollarSign, TrendingUp, Wallet, Home, Coins, Diamond } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ZakatCalculatorProps {
  language?: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'যাকাত ক্যালকুলেটর',
    subtitle: 'আপনার যাকাতের পরিমাণ হিসাব করুন',
    cash: 'নগদ অর্থ',
    bankBalance: 'ব্যাংক ব্যালেন্স',
    gold: 'স্বর্ণ (গ্রাম)',
    silver: 'রৌপ্য (গ্রাম)',
    property: 'সম্পত্তির মূল্য',
    business: 'ব্যবসায়িক মূলধন',
    investments: 'বিনিয়োগ',
    debts: 'দেনা/ঋণ',
    calculate: 'হিসাব করুন',
    reset: 'রিসেট',
    totalAssets: 'মোট সম্পদ',
    nisabAmount: 'নিসাব (৭.৫ তোলা স্বর্ণ)',
    zakatPayable: 'প্রদেয় যাকাত (২.৫%)',
    eligible: 'আপনি যাকাত প্রদানের যোগ্য',
    notEligible: 'আপনার সম্পদ নিসাবের নিচে',
    donate: 'দান করুন',
    notes: 'নোট',
    note1: 'যাকাত শুধুমাত্র সেই সম্পদের উপর প্রযোজ্য যা এক বছর আপনার কাছে আছে',
    note2: 'বর্তমান বাজার মূল্য অনুযায়ী স্বর্ণ/রৌপ্যের মূল্য হিসাব করুন',
    note3: 'নিত্য প্রয়োজনীয় জিনিস (বাড়ি, গাড়ি) যাকাতের আওতায় পড়ে না',
  },
  en: {
    title: 'Zakat Calculator',
    subtitle: 'Calculate your Zakat amount',
    cash: 'Cash in Hand',
    bankBalance: 'Bank Balance',
    gold: 'Gold (grams)',
    silver: 'Silver (grams)',
    property: 'Property Value',
    business: 'Business Capital',
    investments: 'Investments',
    debts: 'Debts/Loans',
    calculate: 'Calculate',
    reset: 'Reset',
    totalAssets: 'Total Assets',
    nisabAmount: 'Nisab (7.5 tola gold)',
    zakatPayable: 'Zakat Payable (2.5%)',
    eligible: 'You are eligible to pay Zakat',
    notEligible: 'Your assets are below Nisab',
    donate: 'Donate Now',
    notes: 'Notes',
    note1: 'Zakat applies only to assets held for one lunar year',
    note2: 'Calculate gold/silver at current market prices',
    note3: 'Personal necessities (home, car) are not included',
  },
};

export function ZakatCalculator({ language = 'bn' }: ZakatCalculatorProps) {
  const t = content[language];
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    cash: '',
    bankBalance: '',
    gold: '',
    silver: '',
    property: '',
    business: '',
    investments: '',
    debts: '',
  });
  const [result, setResult] = useState<{
    totalAssets: number;
    totalDebts: number;
    netAssets: number;
    nisab: number;
    zakatAmount: number;
    isEligible: boolean;
  } | null>(null);

  // Current gold price per gram (approximate - BDT)
  const goldPricePerGram = 7500;
  const silverPricePerGram = 100;
  // Nisab: 87.48 grams of gold or 612.36 grams of silver
  const nisabInGold = 87.48;
  const nisabAmount = nisabInGold * goldPricePerGram;

  const handleCalculate = () => {
    const cash = parseFloat(formData.cash) || 0;
    const bankBalance = parseFloat(formData.bankBalance) || 0;
    const goldValue = (parseFloat(formData.gold) || 0) * goldPricePerGram;
    const silverValue = (parseFloat(formData.silver) || 0) * silverPricePerGram;
    const property = parseFloat(formData.property) || 0;
    const business = parseFloat(formData.business) || 0;
    const investments = parseFloat(formData.investments) || 0;
    const debts = parseFloat(formData.debts) || 0;

    const totalAssets = cash + bankBalance + goldValue + silverValue + property + business + investments;
    const netAssets = totalAssets - debts;
    const isEligible = netAssets >= nisabAmount;
    const zakatAmount = isEligible ? netAssets * 0.025 : 0;

    setResult({
      totalAssets,
      totalDebts: debts,
      netAssets,
      nisab: nisabAmount,
      zakatAmount,
      isEligible,
    });
  };

  const handleReset = () => {
    setFormData({
      cash: '',
      bankBalance: '',
      gold: '',
      silver: '',
      property: '',
      business: '',
      investments: '',
      debts: '',
    });
    setResult(null);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Calculator className="w-4 h-4" />
          {t.title}
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <Calculator className="w-6 h-6 text-emerald-600" />
            {t.title}
          </DialogTitle>
          <DialogDescription>{t.subtitle}</DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-2 gap-6 mt-6">
          {/* Input Section */}
          <div className="space-y-4">
            <Card className="p-4 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
              <div className="flex items-start gap-3">
                <Info className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
                <div className="text-sm text-gray-700">
                  <p className="font-medium text-emerald-900 mb-1">নিসাব: ৳{nisabAmount.toLocaleString()}</p>
                  <p className="text-xs text-gray-600">
                    ৮৭.৪৮ গ্রাম স্বর্ণ (৭.৫ তোলা) এর মূল্য
                  </p>
                </div>
              </div>
            </Card>

            <div className="space-y-3">
              <div>
                <Label className="flex items-center gap-2">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  {t.cash}
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.cash}
                  onChange={(e) => setFormData({ ...formData, cash: e.target.value })}
                />
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Wallet className="w-4 h-4 text-blue-600" />
                  {t.bankBalance}
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.bankBalance}
                  onChange={(e) => setFormData({ ...formData, bankBalance: e.target.value })}
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label className="flex items-center gap-2">
                    <Diamond className="w-4 h-4 text-yellow-600" />
                    {t.gold}
                  </Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.gold}
                    onChange={(e) => setFormData({ ...formData, gold: e.target.value })}
                  />
                </div>
                <div>
                  <Label className="flex items-center gap-2">
                    <Coins className="w-4 h-4 text-gray-400" />
                    {t.silver}
                  </Label>
                  <Input
                    type="number"
                    placeholder="0"
                    value={formData.silver}
                    onChange={(e) => setFormData({ ...formData, silver: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <Home className="w-4 h-4 text-purple-600" />
                  {t.property}
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.property}
                  onChange={(e) => setFormData({ ...formData, property: e.target.value })}
                />
              </div>

              <div>
                <Label className="flex items-center gap-2">
                  <TrendingUp className="w-4 h-4 text-orange-600" />
                  {t.business}
                </Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.business}
                  onChange={(e) => setFormData({ ...formData, business: e.target.value })}
                />
              </div>

              <div>
                <Label>{t.investments}</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.investments}
                  onChange={(e) => setFormData({ ...formData, investments: e.target.value })}
                />
              </div>

              <div>
                <Label className="text-red-600">{t.debts}</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={formData.debts}
                  onChange={(e) => setFormData({ ...formData, debts: e.target.value })}
                />
              </div>
            </div>

            <div className="flex gap-3">
              <Button
                onClick={handleCalculate}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-teal-600"
              >
                <Calculator className="w-4 h-4 mr-2" />
                {t.calculate}
              </Button>
              <Button variant="outline" onClick={handleReset}>
                {t.reset}
              </Button>
            </div>
          </div>

          {/* Result Section */}
          <div>
            {result ? (
              <div className="space-y-4">
                <Card className="p-6 bg-gradient-to-br from-gray-50 to-gray-100">
                  <h3 className="font-semibold text-lg mb-4">হিসাব</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.totalAssets}:</span>
                      <span className="font-semibold">৳{result.totalAssets.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">{t.debts}:</span>
                      <span className="font-semibold text-red-600">-৳{result.totalDebts.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between">
                      <span className="text-gray-900 font-medium">নেট সম্পদ:</span>
                      <span className="font-bold">৳{result.netAssets.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600">{t.nisabAmount}:</span>
                      <span>৳{result.nisab.toLocaleString()}</span>
                    </div>
                  </div>
                </Card>

                {result.isEligible ? (
                  <Card className="p-6 bg-gradient-to-br from-emerald-500 to-teal-500 text-white">
                    <div className="text-center">
                      <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Calculator className="w-8 h-8" />
                      </div>
                      <p className="text-emerald-100 mb-2">{t.zakatPayable}</p>
                      <h2 className="text-4xl font-bold mb-4">
                        ৳{result.zakatAmount.toLocaleString()}
                      </h2>
                      <Badge className="bg-white/20 text-white border-0 mb-4">
                        {t.eligible}
                      </Badge>
                      <Button
                        className="w-full bg-white text-emerald-600 hover:bg-gray-100"
                        onClick={() => {
                          setOpen(false);
                          toast.success('দান পেজে যাচ্ছেন...');
                        }}
                      >
                        {t.donate}
                      </Button>
                    </div>
                  </Card>
                ) : (
                  <Card className="p-6 bg-gradient-to-br from-gray-500 to-gray-600 text-white text-center">
                    <Info className="w-12 h-12 mx-auto mb-3 opacity-80" />
                    <p className="text-lg">{t.notEligible}</p>
                    <p className="text-sm text-gray-200 mt-2">
                      আরও ৳{(result.nisab - result.netAssets).toLocaleString()} প্রয়োজন
                    </p>
                  </Card>
                )}

                {/* Notes */}
                <Card className="p-4 bg-blue-50 border-blue-200">
                  <h4 className="font-medium text-blue-900 mb-2">{t.notes}:</h4>
                  <ul className="space-y-1 text-xs text-blue-800">
                    <li>• {t.note1}</li>
                    <li>• {t.note2}</li>
                    <li>• {t.note3}</li>
                  </ul>
                </Card>
              </div>
            ) : (
              <Card className="p-12 text-center border-2 border-dashed">
                <Calculator className="w-16 h-16 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600">তথ্য পূরণ করে হিসাব করুন</p>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
