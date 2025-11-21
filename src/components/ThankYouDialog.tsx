import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Heart, CheckCircle2, Users, BookOpen, Share2, Home, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { ReceiptDownloader } from './ReceiptDownloader';
import { toast } from 'sonner@2.0.3';

interface ThankYouDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  transactionData: {
    transactionId: string;
    amount: number;
    donorName: string;
    donationType: string;
    paymentMethod: string;
    timestamp: string;
    status: string;
  } | null;
  language: 'bn' | 'en';
  onGoHome?: () => void;
}

const content = {
  bn: {
    title: 'আপনার দানের জন্য ধন্যবাদ! 🙏',
    subtitle: 'আপনার দানটি সফলভাবে প্রক্রিয়া করা হয়েছে',
    yourImpact: 'আপনার প্রভাব',
    studentsHelped: 'জন ছাত্রকে সাহায্য করবে',
    booksProvided: 'টি বই প্রদান',
    mealsProvided: 'দিনের খাবার',
    whatHappensNext: 'এখন কী হবে',
    step1: 'আপনার দানটি যাচাই করা হচ্ছে',
    step2: 'উপযুক্ত ছাত্রছাত্রী নির্বাচন',
    step3: 'আপনি প্রভাব রিপোর্ট পাবেন',
    shareImpact: 'আপনার দানের কথা শেয়ার করুন',
    backToHome: 'হোমে ফিরুন',
    viewDonations: 'আমার দান সমূহ',
    taxInfo: 'এই দানটি করমুক্ত। রসিদ সংরক্ষণ করুন।',
    spreadWord: 'অন্যদেরও সাহায্য করতে উৎসাহিত করুন',
    receiptSection: 'আপনার রসিদ',
  },
  en: {
    title: 'Thank You for Your Donation! 🙏',
    subtitle: 'Your donation has been successfully processed',
    yourImpact: 'Your Impact',
    studentsHelped: 'students will be helped',
    booksProvided: 'books provided',
    mealsProvided: 'days of meals',
    whatHappensNext: 'What Happens Next',
    step1: 'Your donation is being verified',
    step2: 'Suitable students are selected',
    step3: 'You will receive impact reports',
    shareImpact: 'Share your donation',
    backToHome: 'Back to Home',
    viewDonations: 'My Donations',
    taxInfo: 'This donation is tax-deductible. Keep the receipt.',
    spreadWord: 'Encourage others to help too',
    receiptSection: 'Your Receipt',
  }
};

export function ThankYouDialog({
  open,
  onOpenChange,
  transactionData,
  language,
  onGoHome
}: ThankYouDialogProps) {
  const t = content[language];

  // Don't render if no transaction data
  if (!transactionData) {
    return null;
  }

  // Calculate impact based on donation amount
  const calculateImpact = () => {
    const amount = transactionData.amount;
    return {
      students: Math.floor(amount / 1000),
      books: Math.floor(amount / 200),
      meals: Math.floor(amount / 100),
    };
  };

  const impact = calculateImpact();

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader className="sr-only">
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>{t.subtitle}</DialogDescription>
        </DialogHeader>
        
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', duration: 0.6 }}
          className="flex flex-col items-center mb-6"
        >
          <div className="w-24 h-24 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center mb-4 shadow-xl">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2 }}
            >
              <CheckCircle2 className="w-12 h-12 text-white" />
            </motion.div>
          </div>
          <h2 className="text-3xl text-gray-900 mb-2 text-center">{t.title}</h2>
          <p className="text-gray-600 text-center">{t.subtitle}</p>
        </motion.div>

        {/* Impact Section */}
        <Card className="p-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-2 border-emerald-200 mb-6">
          <h3 className="text-lg text-gray-900 mb-4 flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-600" />
            {t.yourImpact}
          </h3>
          <div className="grid grid-cols-3 gap-4">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow">
                <Users className="w-6 h-6 text-emerald-600" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">{impact.students}</p>
              <p className="text-xs text-gray-600">{t.studentsHelped}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow">
                <BookOpen className="w-6 h-6 text-blue-600" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">{impact.books}</p>
              <p className="text-xs text-gray-600">{t.booksProvided}</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-center"
            >
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2 shadow">
                <Gift className="w-6 h-6 text-amber-600" />
              </div>
              <p className="text-2xl text-gray-900 mb-1">{impact.meals}</p>
              <p className="text-xs text-gray-600">{t.mealsProvided}</p>
            </motion.div>
          </div>
        </Card>

        {/* What Happens Next */}
        <Card className="p-6 mb-6">
          <h3 className="text-lg text-gray-900 mb-4">{t.whatHappensNext}</h3>
          <div className="space-y-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 bg-emerald-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-emerald-700 text-sm">1</span>
              </div>
              <div>
                <p className="text-gray-700">{t.step1}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.7 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 bg-teal-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-teal-700 text-sm">2</span>
              </div>
              <div>
                <p className="text-gray-700">{t.step2}</p>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.8 }}
              className="flex items-start gap-3"
            >
              <div className="w-8 h-8 bg-cyan-100 rounded-full flex items-center justify-center flex-shrink-0">
                <span className="text-cyan-700 text-sm">3</span>
              </div>
              <div>
                <p className="text-gray-700">{t.step3}</p>
              </div>
            </motion.div>
          </div>
        </Card>

        {/* Tax Info */}
        <div className="bg-amber-50 border-2 border-amber-200 rounded-lg p-4 mb-6">
          <p className="text-amber-800 text-sm text-center">
            📋 {t.taxInfo}
          </p>
        </div>

        {/* Receipt Section */}
        <div className="mb-6">
          <h3 className="text-lg text-gray-900 mb-4">{t.receiptSection}</h3>
          <ReceiptDownloader transactionData={transactionData} language={language} />
        </div>

        {/* Actions */}
        <div className="grid grid-cols-2 gap-4">
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              onGoHome?.();
            }}
            className="gap-2"
          >
            <Home className="w-4 h-4" />
            {t.backToHome}
          </Button>
          <Button
            onClick={async () => {
              const shareText = `আমি Talent Tutor এ ৳${transactionData.amount.toLocaleString('bn-BD')} দান করেছি! 🎓 আপনিও অসহায় শিক্ষার্থীদের সাহায্য করুন।`;
              
              try {
                if (navigator.share && navigator.canShare) {
                  const shareData = {
                    title: 'Talent Tutor Donation',
                    text: shareText,
                    url: window.location.href,
                  };
                  
                  if (navigator.canShare(shareData)) {
                    await navigator.share(shareData);
                    toast.success(language === 'bn' ? 'শেয়ার করা হয়েছে!' : 'Shared successfully!');
                    return;
                  }
                }
                
                // Fallback to clipboard
                await navigator.clipboard.writeText(shareText);
                toast.success(language === 'bn' ? 'টেক্সট কপি হয়েছে!' : 'Text copied!');
              } catch (error: any) {
                if (error.name === 'AbortError') {
                  return; // User cancelled
                }
                
                // Final fallback
                try {
                  await navigator.clipboard.writeText(shareText);
                  toast.success(language === 'bn' ? 'টেক্সট কপি হয়েছে!' : 'Text copied!');
                } catch (clipboardError) {
                  console.error('Share error:', error);
                }
              }
            }}
            className="gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          >
            <Share2 className="w-4 h-4" />
            {t.shareImpact}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
