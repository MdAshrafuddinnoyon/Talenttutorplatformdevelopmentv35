import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { Card } from './ui/card';
import { Smartphone, CreditCard, Building2, Heart, CheckCircle2 } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface DonorPaymentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  donationType?: string;
  studentName?: string;
}

export function DonorPaymentDialog({ 
  open, 
  onOpenChange,
  donationType = 'সাধারণ দান',
  studentName,
}: DonorPaymentDialogProps) {
  const [paymentMethod, setPaymentMethod] = useState<'bkash' | 'bank' | 'card'>('bkash');
  const [amount, setAmount] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);

  const [bkashData, setBkashData] = useState({
    phoneNumber: '',
    transactionId: '',
  });

  const [bankData, setBankData] = useState({
    accountName: '',
    accountNumber: '',
    bankName: '',
  });

  const [cardData, setCardData] = useState({
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardHolderName: '',
  });

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      toast.success(
        <div className="flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-green-600" />
          <div>
            <p className="font-semibold">পেমেন্ট সফল হয়েছে!</p>
            <p className="text-sm text-gray-600">পরিমাণ: ৳{amount}</p>
          </div>
        </div>
      );
      setIsProcessing(false);
      onOpenChange(false);
      
      // Reset form
      setAmount('');
      setBkashData({ phoneNumber: '', transactionId: '' });
      setBankData({ accountName: '', accountNumber: '', bankName: '' });
      setCardData({ cardNumber: '', expiryDate: '', cvv: '', cardHolderName: '' });
    }, 2000);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-rose-600 to-pink-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
              <Heart className="w-8 h-8 text-white fill-white" />
            </div>
            <DialogTitle className="text-2xl text-center">দান করুন</DialogTitle>
            <DialogDescription className="text-center">
              {studentName ? `${studentName} এর জন্য দান করুন` : donationType}
            </DialogDescription>
          </div>
        </DialogHeader>

        <form onSubmit={handlePayment} className="space-y-6">
          {/* Donation Amount */}
          <Card className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200">
            <Label className="text-lg mb-3 block">দানের পরিমাণ</Label>
            <Input
              type="number"
              placeholder="৳ পরিমাণ লিখুন"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="text-2xl h-14 text-center font-bold"
              required
              min="100"
            />
            <div className="grid grid-cols-4 gap-2 mt-4">
              {[500, 1000, 2000, 5000].map((amt) => (
                <Button
                  key={amt}
                  type="button"
                  variant="outline"
                  onClick={() => setAmount(amt.toString())}
                  className="hover:bg-rose-100"
                >
                  ৳{amt}
                </Button>
              ))}
            </div>
          </Card>

          {/* Payment Method Selection */}
          <div>
            <Label className="text-lg mb-3 block">পেমেন্ট পদ্ধতি</Label>
            <RadioGroup value={paymentMethod} onValueChange={(value: any) => setPaymentMethod(value)}>
              <div className="grid md:grid-cols-3 gap-4">
                {/* bKash */}
                <label
                  className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'bkash'
                      ? 'border-pink-500 bg-pink-50'
                      : 'border-gray-200 hover:border-pink-300'
                  }`}
                >
                  <RadioGroupItem value="bkash" className="sr-only" />
                  <Smartphone className={`w-8 h-8 mb-2 ${paymentMethod === 'bkash' ? 'text-pink-600' : 'text-gray-400'}`} />
                  <span className="font-semibold">bKash</span>
                  <span className="text-xs text-gray-500">মোবাইল ব্যাংকিং</span>
                </label>

                {/* Bank Transfer */}
                <label
                  className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'bank'
                      ? 'border-blue-500 bg-blue-50'
                      : 'border-gray-200 hover:border-blue-300'
                  }`}
                >
                  <RadioGroupItem value="bank" className="sr-only" />
                  <Building2 className={`w-8 h-8 mb-2 ${paymentMethod === 'bank' ? 'text-blue-600' : 'text-gray-400'}`} />
                  <span className="font-semibold">ব্যাংক</span>
                  <span className="text-xs text-gray-500">ব্যাংক ট্রান্সফার</span>
                </label>

                {/* Card Payment */}
                <label
                  className={`flex flex-col items-center p-4 border-2 rounded-xl cursor-pointer transition-all ${
                    paymentMethod === 'card'
                      ? 'border-purple-500 bg-purple-50'
                      : 'border-gray-200 hover:border-purple-300'
                  }`}
                >
                  <RadioGroupItem value="card" className="sr-only" />
                  <CreditCard className={`w-8 h-8 mb-2 ${paymentMethod === 'card' ? 'text-purple-600' : 'text-gray-400'}`} />
                  <span className="font-semibold">কার্ড</span>
                  <span className="text-xs text-gray-500">ক্রেডিট/ডেবিট</span>
                </label>
              </div>
            </RadioGroup>
          </div>

          {/* bKash Payment Form */}
          {paymentMethod === 'bkash' && (
            <Card className="p-6 bg-pink-50 border-2 border-pink-200">
              <div className="space-y-4">
                <div>
                  <Label>bKash নম্বর</Label>
                  <Input
                    type="tel"
                    placeholder="০১৭XXXXXXXXX"
                    value={bkashData.phoneNumber}
                    onChange={(e) => setBkashData({ ...bkashData, phoneNumber: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>ট্রানজেকশন আইডি</Label>
                  <Input
                    placeholder="যেমন: 8M7HX2Y3W4"
                    value={bkashData.transactionId}
                    onChange={(e) => setBkashData({ ...bkashData, transactionId: e.target.value })}
                    required
                  />
                  <p className="text-sm text-gray-600 mt-2">
                    * প্রথমে আমাদের bKash নম্বরে পেমেন্ট করুন: <strong>01711-XXXXXX</strong>
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Bank Transfer Form */}
          {paymentMethod === 'bank' && (
            <Card className="p-6 bg-blue-50 border-2 border-blue-200">
              <div className="space-y-4">
                <div className="bg-white p-4 rounded-lg mb-4">
                  <p className="text-sm font-semibold mb-2">আমাদের ব্যাংক বিবরণ:</p>
                  <div className="text-sm space-y-1 text-gray-700">
                    <p>ব্যাংক: ডাচ-বাংলা ব্যাংক</p>
                    <p>শাখা: ধানমন্ডি, ঢাকা</p>
                    <p>একাউন্ট নাম: Talent Tutor Foundation</p>
                    <p>একাউন্ট নম্বর: 123-456-78901</p>
                  </div>
                </div>

                <div>
                  <Label>আপনার নাম</Label>
                  <Input
                    placeholder="একাউন্ট হোল্ডারের নাম"
                    value={bankData.accountName}
                    onChange={(e) => setBankData({ ...bankData, accountName: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>একাউন্ট নম্বর</Label>
                  <Input
                    placeholder="আপনার একাউন্ট নম্বর"
                    value={bankData.accountNumber}
                    onChange={(e) => setBankData({ ...bankData, accountNumber: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label>ব্যাংক নাম</Label>
                  <Input
                    placeholder="যেমন: ডাচ-বাংলা ব্যাংক"
                    value={bankData.bankName}
                    onChange={(e) => setBankData({ ...bankData, bankName: e.target.value })}
                    required
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Card Payment Form */}
          {paymentMethod === 'card' && (
            <Card className="p-6 bg-purple-50 border-2 border-purple-200">
              <div className="space-y-4">
                <div>
                  <Label>কার্ড নম্বর</Label>
                  <Input
                    placeholder="1234 5678 9012 3456"
                    value={cardData.cardNumber}
                    onChange={(e) => setCardData({ ...cardData, cardNumber: e.target.value })}
                    maxLength={19}
                    required
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label>মেয়াদ শেষ (MM/YY)</Label>
                    <Input
                      placeholder="12/25"
                      value={cardData.expiryDate}
                      onChange={(e) => setCardData({ ...cardData, expiryDate: e.target.value })}
                      maxLength={5}
                      required
                    />
                  </div>
                  <div>
                    <Label>CVV</Label>
                    <Input
                      type="password"
                      placeholder="123"
                      value={cardData.cvv}
                      onChange={(e) => setCardData({ ...cardData, cvv: e.target.value })}
                      maxLength={3}
                      required
                    />
                  </div>
                </div>
                <div>
                  <Label>কার্ডহোল্ডারের নাম</Label>
                  <Input
                    placeholder="যেমন কার্ডে লেখা আছে"
                    value={cardData.cardHolderName}
                    onChange={(e) => setCardData({ ...cardData, cardHolderName: e.target.value })}
                    required
                  />
                </div>
              </div>
            </Card>
          )}

          {/* Tax Benefit Notice */}
          {amount && parseInt(amount) > 0 && (
            <Card className="p-4 bg-green-50 border-2 border-green-200">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                <div className="text-sm">
                  <p className="font-semibold text-green-900 mb-1">ট্যাক্স সুবিধা পাবেন!</p>
                  <p className="text-green-700">
                    আপনার ৳{amount} টাকা দানে সম্ভাব্য ট্যাক্স সাশ্রয়: ৳{(parseInt(amount) * 0.25).toLocaleString()} (২৫%)
                  </p>
                </div>
              </div>
            </Card>
          )}

          {/* Submit Button */}
          <div className="flex gap-3">
            <Button
              type="submit"
              className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700 shadow-md h-12"
              disabled={isProcessing || !amount}
            >
              {isProcessing ? (
                <>
                  <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  প্রক্রিয়াধীন...
                </>
              ) : (
                <>
                  <Heart className="w-5 h-5 mr-2" />
                  ৳{amount || '0'} দান করুন
                </>
              )}
            </Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => onOpenChange(false)}
              disabled={isProcessing}
            >
              বাতিল
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
