import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  CreditCard, 
  Smartphone, 
  Building2, 
  CheckCircle2, 
  ArrowLeft,
  Shield,
  Lock,
  Loader2
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';
import { processPayment } from '../utils/paymentHandler';

interface PaymentGatewayDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  amount: number;
  donorName?: string;
  donationType: string;
  onPaymentSuccess: (transactionData: any) => void;
  language: 'bn' | 'en';
  userId?: string;
  purpose?: 'credit_purchase' | 'donation' | 'subscription' | 'tuition_payment';
  metadata?: any;
}

const content = {
  bn: {
    title: 'পেমেন্ট সম্পন্ন করুন',
    subtitle: 'নিরাপদ পেমেন্ট গেটওয়ে',
    selectMethod: 'পেমেন্ট পদ্ধতি নির্বাচন করুন',
    cardPayment: 'কার্ড পেমেন্ট',
    mobileBanking: 'মোবাইল ব্যাংকিং',
    bankTransfer: 'ব্যাংক ট্রান্সফার',
    amount: 'পরিমাণ',
    processing: 'প্রসেসিং...',
    payNow: 'এখনই পে করুন',
    cancel: 'বাতিল',
    securePayment: 'সুরক্ষিত পেমেন্ট',
    sslProtected: 'SSL এনক্রিপশন সুরক্ষিত',
    allMethods: 'সকল পেমেন্ট মাধ্যম',
    bkash: 'বিকাশ',
    nagad: 'নগদ',
    rocket: 'রকেট',
    visa: 'ভিসা',
    mastercard: 'মাস্টারকার্ড',
    back: 'পেছনে',
  },
  en: {
    title: 'Complete Payment',
    subtitle: 'Secure Payment Gateway',
    selectMethod: 'Select Payment Method',
    cardPayment: 'Card Payment',
    mobileBanking: 'Mobile Banking',
    bankTransfer: 'Bank Transfer',
    amount: 'Amount',
    processing: 'Processing...',
    payNow: 'Pay Now',
    cancel: 'Cancel',
    securePayment: 'Secure Payment',
    sslProtected: 'SSL Encryption Protected',
    allMethods: 'All Payment Methods',
    bkash: 'bKash',
    nagad: 'Nagad',
    rocket: 'Rocket',
    visa: 'Visa',
    mastercard: 'Mastercard',
    back: 'Back',
  }
};

export function PaymentGatewayDialog({
  open,
  onOpenChange,
  amount,
  donorName,
  donationType,
  onPaymentSuccess,
  language,
  userId,
  purpose = 'donation',
  metadata = {}
}: PaymentGatewayDialogProps) {
  const t = content[language];
  const [selectedMethod, setSelectedMethod] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [processingStep, setProcessingStep] = useState(0);

  const paymentMethods = [
    {
      id: 'bkash',
      name: t.bkash,
      icon: Smartphone,
      color: 'from-pink-500 to-pink-600',
      bgColor: 'bg-pink-50',
    },
    {
      id: 'nagad',
      name: t.nagad,
      icon: Smartphone,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-50',
    },
    {
      id: 'rocket',
      name: t.rocket,
      icon: Smartphone,
      color: 'from-purple-500 to-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      id: 'card',
      name: t.cardPayment,
      icon: CreditCard,
      color: 'from-blue-500 to-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      id: 'bank',
      name: t.bankTransfer,
      icon: Building2,
      color: 'from-teal-500 to-teal-600',
      bgColor: 'bg-teal-50',
    },
  ];

  const handlePayment = async () => {
    if (!selectedMethod) {
      toast.error(language === 'bn' ? 'পেমেন্ট পদ্ধতি নির্বাচন করুন' : 'Select a payment method');
      return;
    }

    setIsProcessing(true);
    setProcessingStep(0);

    // Simulate payment processing with UI updates
    const steps = [
      { step: 0, message: language === 'bn' ? 'পেমেন্ট গেটওয়ে সংযোগ...' : 'Connecting to payment gateway...' },
      { step: 33, message: language === 'bn' ? 'লেনদেন যাচাই...' : 'Verifying transaction...' },
      { step: 66, message: language === 'bn' ? 'পেমেন্ট প্রসেস করা হচ্ছে...' : 'Processing payment...' },
      { step: 100, message: language === 'bn' ? 'সফল!' : 'Success!' },
    ];

    for (const { step, message } of steps) {
      await new Promise(resolve => setTimeout(resolve, 800));
      setProcessingStep(step);
      
      if (step < 100) {
        toast.loading(message);
      }
    }

    // Process payment through backend if userId provided
    if (userId) {
      const result = await processPayment({
        userId,
        amount,
        paymentMethod: selectedMethod as 'bkash' | 'nagad' | 'rocket' | 'card' | 'bank',
        purpose,
        description: `Payment for ${purpose}`,
        metadata: {
          ...metadata,
          donorName: donorName || 'Anonymous',
          donationType,
        }
      });

      if (result.success && result.payment) {
        const transactionData = {
          transactionId: result.payment.transactionRef,
          paymentId: result.payment.id,
          amount: result.payment.amount,
          donorName: donorName || 'Anonymous',
          donationType,
          paymentMethod: selectedMethod,
          timestamp: result.payment.createdAt,
          status: result.payment.status,
          donationId: result.payment.donationId
        };

        setTimeout(() => {
          setIsProcessing(false);
          toast.dismiss();
          toast.success(language === 'bn' ? '✅ পেমেন্ট সফল হয়েছে!' : '✅ Payment Successful!');
          onPaymentSuccess(transactionData);
          onOpenChange(false);
        }, 300);
      } else {
        setIsProcessing(false);
        toast.dismiss();
        toast.error(language === 'bn' ? '❌ পেমেন্ট ব্যর্থ হয়েছে!' : '❌ Payment Failed!');
      }
    } else {
      // Fallback for when userId is not provided
      const transactionData = {
        transactionId: `TXN${Date.now()}`,
        amount: amount,
        donorName: donorName || 'Anonymous',
        donationType,
        paymentMethod: selectedMethod,
        timestamp: new Date().toISOString(),
        status: 'completed',
      };

      setTimeout(() => {
        setIsProcessing(false);
        toast.dismiss();
        toast.success(language === 'bn' ? '✅ পেমেন্ট সফল হয়েছে!' : '✅ Payment Successful!');
        onPaymentSuccess(transactionData);
        onOpenChange(false);
      }, 300);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <div className="flex flex-col items-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center mb-3 shadow-lg">
              <Lock className="w-8 h-8 text-white" />
            </div>
            <DialogTitle className="text-2xl text-center">{t.title}</DialogTitle>
            <DialogDescription className="text-center flex items-center gap-2 mt-2">
              <Shield className="w-4 h-4 text-emerald-600" />
              <span>{t.sslProtected}</span>
            </DialogDescription>
          </div>
        </DialogHeader>

        {!isProcessing ? (
          <div className="space-y-6">
            {/* Amount Display */}
            <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200">
              <div className="text-center">
                <p className="text-sm text-gray-600 mb-2">{t.amount}</p>
                <p className="text-4xl text-gray-900">৳ {amount.toLocaleString('bn-BD')}</p>
                {donorName && (
                  <p className="text-sm text-gray-600 mt-2">দাতা: {donorName}</p>
                )}
              </div>
            </Card>

            {/* Payment Methods */}
            <div>
              <Label className="text-lg mb-4 block">{t.selectMethod}</Label>
              <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
                {paymentMethods.map((method) => {
                  const Icon = method.icon;
                  return (
                    <motion.div
                      key={method.id}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Card
                        className={`p-3 cursor-pointer transition-all ${
                          selectedMethod === method.id
                            ? 'border-2 border-emerald-500 shadow-lg'
                            : 'border-2 border-gray-200 hover:border-emerald-300'
                        } ${method.bgColor}`}
                        onClick={() => setSelectedMethod(method.id)}
                      >
                        <div className="flex flex-col items-center gap-2">
                          <div className={`w-10 h-10 bg-gradient-to-br ${method.color} rounded-lg flex items-center justify-center`}>
                            <Icon className="w-5 h-5 text-white" />
                          </div>
                          <p className="text-xs text-center">{method.name}</p>
                          {selectedMethod === method.id && (
                            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                          )}
                        </div>
                      </Card>
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4">
              <Button
                variant="outline"
                className="flex-1"
                onClick={() => onOpenChange(false)}
              >
                {t.cancel}
              </Button>
              <Button
                className="flex-1 btn-primary"
                onClick={handlePayment}
                disabled={!selectedMethod}
              >
                <Lock className="w-4 h-4 mr-2" />
                {t.payNow}
              </Button>
            </div>
          </div>
        ) : (
          <div className="py-12">
            <div className="text-center mb-6">
              <Loader2 className="w-16 h-16 animate-spin text-emerald-600 mx-auto mb-4" />
              <p className="text-lg text-gray-700">{t.processing}</p>
            </div>
            <Progress value={processingStep} className="h-2" />
            <p className="text-center text-sm text-gray-600 mt-4">
              {processingStep}% {language === 'bn' ? 'সম্পন্ন' : 'Complete'}
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}

function Label({ children, className }: { children: React.ReactNode; className?: string }) {
  return <label className={className}>{children}</label>;
}
