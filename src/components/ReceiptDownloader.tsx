import { Button } from './ui/button';
import { Card } from './ui/card';
import { Download, Printer, Share2, Check } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { TalentTutorLogo } from './TalentTutorLogo';

interface ReceiptDownloaderProps {
  transactionData: {
    transactionId: string;
    amount: number;
    donorName: string;
    donationType: string;
    paymentMethod: string;
    timestamp: string;
    status: string;
  };
  language: 'bn' | 'en';
}

const content = {
  bn: {
    receipt: 'দান রসিদ',
    taxReceipt: 'ট্যাক্স রসিদ',
    download: 'ডাউনলোড করুন',
    print: 'প্রিন্ট করুন',
    share: 'শেয়ার করুন',
    transactionId: 'লেনদেন নম্বর',
    date: 'তারিখ',
    donorName: 'দাতার নাম',
    amount: 'পরিমাণ',
    donationType: 'দানের ধরন',
    paymentMethod: 'পেমেন্ট পদ্ধতি',
    status: 'স্ট্যাটাস',
    completed: 'সম্পন্ন',
    taxDeductible: 'এই দানটি করমুক্ত',
    thankYou: 'আপনার দানের জন্য ধন্যবাদ!',
    footer: 'Talent Tutor | যাকাত ও দান সেবা',
    address: 'ঢাকা, বাংলাদেশ',
    website: 'www.talenttutor.com',
  },
  en: {
    receipt: 'Donation Receipt',
    taxReceipt: 'Tax Receipt',
    download: 'Download',
    print: 'Print',
    share: 'Share',
    transactionId: 'Transaction ID',
    date: 'Date',
    donorName: 'Donor Name',
    amount: 'Amount',
    donationType: 'Donation Type',
    paymentMethod: 'Payment Method',
    status: 'Status',
    completed: 'Completed',
    taxDeductible: 'This donation is tax-deductible',
    thankYou: 'Thank you for your donation!',
    footer: 'Talent Tutor | Zakat & Donation Service',
    address: 'Dhaka, Bangladesh',
    website: 'www.talenttutor.com',
  }
};

export function ReceiptDownloader({ transactionData, language }: ReceiptDownloaderProps) {
  const t = content[language];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const handleDownload = () => {
    // Create receipt HTML
    const receiptHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>${t.receipt} - ${transactionData.transactionId}</title>
        <style>
          body {
            font-family: 'Arial', sans-serif;
            max-width: 800px;
            margin: 40px auto;
            padding: 40px;
            background: #f9fafb;
          }
          .receipt {
            background: white;
            padding: 40px;
            border-radius: 12px;
            box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          }
          .header {
            text-align: center;
            border-bottom: 3px solid #10b981;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          .logo {
            font-size: 24px;
            font-weight: bold;
            color: #10b981;
            margin-bottom: 10px;
          }
          .title {
            font-size: 28px;
            font-weight: bold;
            color: #1f2937;
            margin: 10px 0;
          }
          .info-row {
            display: flex;
            justify-content: space-between;
            padding: 15px 0;
            border-bottom: 1px solid #e5e7eb;
          }
          .info-label {
            color: #6b7280;
            font-weight: 600;
          }
          .info-value {
            color: #1f2937;
            font-weight: 500;
          }
          .amount-box {
            background: linear-gradient(135deg, #10b981 0%, #059669 100%);
            color: white;
            padding: 25px;
            border-radius: 8px;
            text-align: center;
            margin: 30px 0;
          }
          .amount-label {
            font-size: 14px;
            opacity: 0.9;
            margin-bottom: 5px;
          }
          .amount-value {
            font-size: 36px;
            font-weight: bold;
          }
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 2px solid #e5e7eb;
            color: #6b7280;
          }
          .tax-note {
            background: #fef3c7;
            border: 2px solid #fcd34d;
            padding: 15px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
            color: #92400e;
          }
          .thank-you {
            background: #d1fae5;
            border: 2px solid #10b981;
            padding: 20px;
            border-radius: 8px;
            margin: 20px 0;
            text-align: center;
            color: #065f46;
            font-size: 18px;
            font-weight: 600;
          }
          .status-badge {
            display: inline-block;
            background: #d1fae5;
            color: #065f46;
            padding: 6px 16px;
            border-radius: 20px;
            font-weight: 600;
            font-size: 14px;
          }
        </style>
      </head>
      <body>
        <div class="receipt">
          <div class="header">
            <div class="logo">🎓 Talent Tutor</div>
            <div class="title">${t.receipt}</div>
            <div class="subtitle">${t.taxReceipt}</div>
          </div>
          
          <div class="thank-you">${t.thankYou}</div>
          
          <div class="amount-box">
            <div class="amount-label">${t.amount}</div>
            <div class="amount-value">৳ ${transactionData.amount.toLocaleString('bn-BD')}</div>
          </div>
          
          <div class="info-row">
            <span class="info-label">${t.transactionId}:</span>
            <span class="info-value">${transactionData.transactionId}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">${t.date}:</span>
            <span class="info-value">${formatDate(transactionData.timestamp)}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">${t.donorName}:</span>
            <span class="info-value">${transactionData.donorName}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">${t.donationType}:</span>
            <span class="info-value">${transactionData.donationType}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">${t.paymentMethod}:</span>
            <span class="info-value">${transactionData.paymentMethod.toUpperCase()}</span>
          </div>
          
          <div class="info-row">
            <span class="info-label">${t.status}:</span>
            <span class="status-badge">✓ ${t.completed}</span>
          </div>
          
          <div class="tax-note">
            <strong>📋 ${t.taxDeductible}</strong>
          </div>
          
          <div class="footer">
            <div style="font-weight: 600; margin-bottom: 10px;">${t.footer}</div>
            <div>${t.address}</div>
            <div>${t.website}</div>
            <div style="margin-top: 10px; font-size: 12px;">
              Generated on ${formatDate(new Date().toISOString())}
            </div>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create and download
    const blob = new Blob([receiptHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Receipt_${transactionData.transactionId}.html`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success(language === 'bn' ? 'রসিদ ডাউনলোড হয়েছে!' : 'Receipt downloaded!');
  };

  const handlePrint = () => {
    window.print();
    toast.success(language === 'bn' ? 'প্রিন্ট উইন্ডো খোলা হয়েছে' : 'Print window opened');
  };

  const handleShare = async () => {
    const shareText = `আমি Talent Tutor এ ৳${transactionData.amount.toLocaleString('bn-BD')} দান করেছি। আপনিও অসহায় শিক্ষার্থীদের সাহায্য করুন!`;
    
    try {
      if (navigator.share && navigator.canShare) {
        const shareData = {
          title: t.receipt,
          text: shareText,
          url: window.location.href,
        };
        
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          toast.success(language === 'bn' ? 'শেয়ার করা হয়েছে!' : 'Shared successfully!');
          return;
        }
      }
      
      // Fallback: copy to clipboard
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
        toast.error(language === 'bn' ? 'শেয়ার করতে সমস্যা হয়েছে' : 'Failed to share');
      }
    }
  };

  return (
    <Card className="p-6 border-2 border-emerald-200">
      <div className="flex items-center justify-center mb-6">
        <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full flex items-center justify-center">
          <Check className="w-8 h-8 text-white" />
        </div>
      </div>

      <h3 className="text-center text-xl text-gray-900 mb-2">{t.receipt}</h3>
      <p className="text-center text-gray-600 mb-6">
        {t.transactionId}: <strong>{transactionData.transactionId}</strong>
      </p>

      <div className="bg-gradient-to-br from-emerald-50 to-teal-50 rounded-lg p-6 mb-6 text-center">
        <p className="text-sm text-gray-600 mb-2">{t.amount}</p>
        <p className="text-4xl text-gray-900">৳ {transactionData.amount.toLocaleString('bn-BD')}</p>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Button
          onClick={handleDownload}
          className="btn-primary flex-col h-auto py-4"
        >
          <Download className="w-5 h-5 mb-1" />
          <span className="text-xs">{t.download}</span>
        </Button>
        <Button
          onClick={handlePrint}
          variant="outline"
          className="flex-col h-auto py-4"
        >
          <Printer className="w-5 h-5 mb-1" />
          <span className="text-xs">{t.print}</span>
        </Button>
        <Button
          onClick={handleShare}
          variant="outline"
          className="flex-col h-auto py-4"
        >
          <Share2 className="w-5 h-5 mb-1" />
          <span className="text-xs">{t.share}</span>
        </Button>
      </div>
    </Card>
  );
}
