import { Button } from './ui/button';
import { Card } from './ui/card';
import { Download, Share2, CheckCircle2, Award, Heart } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { copyToClipboard } from '../utils/clipboard';

interface DonationCertificateProps {
  donorName: string;
  donationAmount: number;
  donationType: string;
  donationDate: string;
  receiptNumber: string;
  studentsHelped?: number;
}

export function DonationCertificate({
  donorName,
  donationAmount,
  donationType,
  donationDate,
  receiptNumber,
  studentsHelped = 1,
}: DonationCertificateProps) {
  
  const handleDownloadCertificate = () => {
    // Create certificate HTML
    const certificateHTML = `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+Bengali:wght@300;400;600;700&display=swap');
          
          body {
            font-family: 'Noto Serif Bengali', serif;
            margin: 0;
            padding: 40px;
            background: linear-gradient(135deg, #fdf2f8 0%, #fce7f3 100%);
          }
          
          .certificate {
            max-width: 800px;
            margin: 0 auto;
            background: white;
            padding: 60px;
            border: 8px solid #e11d48;
            border-radius: 20px;
            box-shadow: 0 20px 60px rgba(0,0,0,0.1);
            position: relative;
          }
          
          .certificate::before {
            content: '';
            position: absolute;
            top: 20px;
            left: 20px;
            right: 20px;
            bottom: 20px;
            border: 2px solid #fda4af;
            border-radius: 10px;
          }
          
          .header {
            text-align: center;
            margin-bottom: 40px;
            position: relative;
          }
          
          .logo {
            width: 80px;
            height: 80px;
            background: linear-gradient(135deg, #e11d48, #ec4899);
            border-radius: 50%;
            margin: 0 auto 20px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 40px;
          }
          
          .title {
            font-size: 36px;
            font-weight: 700;
            color: #e11d48;
            margin: 10px 0;
          }
          
          .subtitle {
            font-size: 20px;
            color: #64748b;
            margin: 10px 0;
          }
          
          .content {
            text-align: center;
            margin: 40px 0;
            line-height: 2;
          }
          
          .donor-name {
            font-size: 32px;
            font-weight: 700;
            color: #1e293b;
            border-bottom: 3px solid #e11d48;
            display: inline-block;
            padding: 10px 40px;
            margin: 20px 0;
          }
          
          .donation-info {
            background: linear-gradient(135deg, #fdf2f8, #fce7f3);
            padding: 30px;
            border-radius: 15px;
            margin: 30px 0;
            border: 2px solid #fda4af;
          }
          
          .amount {
            font-size: 48px;
            font-weight: 700;
            color: #e11d48;
            margin: 20px 0;
          }
          
          .details {
            display: grid;
            grid-template-columns: 1fr 1fr;
            gap: 20px;
            margin: 30px 0;
            text-align: left;
          }
          
          .detail-item {
            background: white;
            padding: 15px 20px;
            border-radius: 10px;
            border-left: 4px solid #e11d48;
          }
          
          .detail-label {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 5px;
          }
          
          .detail-value {
            font-size: 18px;
            font-weight: 600;
            color: #1e293b;
          }
          
          .footer {
            margin-top: 50px;
            text-align: center;
            padding-top: 30px;
            border-top: 2px solid #fda4af;
          }
          
          .signature {
            margin-top: 40px;
            display: flex;
            justify-content: space-around;
          }
          
          .signature-line {
            width: 200px;
            border-top: 2px solid #1e293b;
            padding-top: 10px;
            text-align: center;
          }
          
          .watermark {
            position: absolute;
            top: 50%;
            left: 50%;
            transform: translate(-50%, -50%) rotate(-45deg);
            font-size: 100px;
            color: rgba(225, 29, 72, 0.05);
            font-weight: 700;
            pointer-events: none;
            z-index: 0;
          }
          
          .badge {
            position: absolute;
            top: 40px;
            right: 40px;
            background: linear-gradient(135deg, #fbbf24, #f59e0b);
            color: white;
            padding: 10px 20px;
            border-radius: 50px;
            font-weight: 600;
            box-shadow: 0 4px 15px rgba(251, 191, 36, 0.4);
          }
          
          @media print {
            body {
              background: white;
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="certificate">
          <div class="watermark">VERIFIED</div>
          <div class="badge">⭐ সম্মানিত দাতা</div>
          
          <div class="header">
            <div class="logo">❤️</div>
            <h1 class="title">দান সার্টিফিকেট</h1>
            <p class="subtitle">Talent Tutor Foundation</p>
            <p class="subtitle" style="font-size: 16px; color: #64748b;">
              মানবতার সেবায় নিয়োজিত
            </p>
          </div>
          
          <div class="content">
            <p style="font-size: 20px; color: #64748b;">
              এই সার্টিফিকেট প্রদান করা হলো
            </p>
            
            <div class="donor-name">${donorName}</div>
            
            <p style="font-size: 18px; color: #64748b; margin: 30px 0;">
              অসহায় শিক্ষার্থীদের সাহায্যার্থে উদার হৃদয়ে দান করার জন্য
            </p>
            
            <div class="donation-info">
              <div class="amount">৳ ${donationAmount.toLocaleString()}</div>
              <p style="font-size: 18px; color: #64748b;">
                ${donationType} হিসেবে দান করেছেন
              </p>
              <p style="font-size: 16px; color: #64748b; margin-top: 20px;">
                🎓 এই দানের মাধ্যমে <strong style="color: #e11d48;">${studentsHelped} জন শিক্ষার্থী</strong> উপকৃত হবে
              </p>
            </div>
            
            <div class="details">
              <div class="detail-item">
                <div class="detail-label">রসিদ নম্বর</div>
                <div class="detail-value">#${receiptNumber}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">তারিখ</div>
                <div class="detail-value">${donationDate}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">দানের ধরন</div>
                <div class="detail-value">${donationType}</div>
              </div>
              <div class="detail-item">
                <div class="detail-label">ট্যাক্স সুবিধা (২৫%)</div>
                <div class="detail-value">৳ ${(donationAmount * 0.25).toLocaleString()}</div>
              </div>
            </div>
            
            <p style="font-size: 16px; color: #64748b; margin-top: 30px; line-height: 1.8;">
              আপনার এই মহৎ দান অসহায় শিক্ষার্থীদের জীবনে আলো জ্বালাবে এবং 
              তাদের স্বপ্ন পূরণের পথ সুগম করবে। আল্লাহ আপনার এই দানকে কবুল করুন 
              এবং আপনাকে উত্তম প্রতিদান দান করুন।
            </p>
          </div>
          
          <div class="footer">
            <p style="font-size: 14px; color: #64748b;">
              এই সার্টিফিকেটটি Talent Tutor Foundation কর্তৃক প্রদত্ত একটি সরকারী দলিল
            </p>
            
            <div class="signature">
              <div class="signature-line">
                <p style="font-weight: 600; color: #1e293b;">চেয়ারম্যান</p>
                <p style="font-size: 14px; color: #64748b;">Talent Tutor Foundation</p>
              </div>
              <div class="signature-line">
                <p style="font-weight: 600; color: #1e293b;">প্রধান নির্বাহী</p>
                <p style="font-size: 14px; color: #64748b;">Web Search BD</p>
              </div>
            </div>
            
            <p style="margin-top: 30px; font-size: 12px; color: #94a3b8;">
              Developed by Web Search BD • www.talent-tutor.com
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create a blob and download
    const blob = new Blob([certificateHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `দান-সার্টিফিকেট-${receiptNumber}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('সার্টিফিকেট ডাউনলোড হচ্ছে!');
  };

  const handleShareCertificate = async () => {
    const shareText = `আমি Talent Tutor Foundation এ ৳${donationAmount.toLocaleString()} টাকা দান করেছি এবং ${studentsHelped} জন শিক্ষার্থীকে সাহায্য করেছি। আপনিও অংশ নিন!`;
    
    try {
      if (navigator.share && navigator.canShare) {
        const shareData = {
          title: 'দান সার্টিফিকেট',
          text: shareText,
          url: window.location.href,
        };
        
        if (navigator.canShare(shareData)) {
          await navigator.share(shareData);
          toast.success('শেয়ার করা হয়েছে!');
          return;
        }
      }
      
      // Fallback: Copy to clipboard
      const success = await copyToClipboard(shareText);
      if (success) {
        toast.success('শেয়ার লিংক কপি হয়েছে!');
      } else {
        toast.error('কপি করতে ব্যর্থ');
      }
    } catch (err) {
      // User cancelled share or share failed
      if (err instanceof Error && err.name === 'AbortError') {
        return; // User cancelled, do nothing
      }
      
      // Fallback on error
      console.warn('Share failed:', err);
      const success = await copyToClipboard(shareText);
      if (success) {
        toast.success('শেয়ার লিংক কপি হয়েছে!');
      } else {
        toast.error('কপি করতে ব্যর্থ');
      }
    }
  };

  return (
    <Card className="p-8 bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200">
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-gradient-to-br from-rose-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <Award className="w-10 h-10 text-white" />
        </div>
        <h3 className="text-2xl font-bold text-gray-900 mb-2">দান সার্টিফিকেট</h3>
        <p className="text-gray-600">আপনার মহৎ দানের জন্য ধন্যবাদ!</p>
      </div>

      <div className="bg-white p-6 rounded-lg border-2 border-rose-200 mb-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-sm text-gray-600">দাতার নাম</p>
            <p className="text-lg font-semibold text-gray-900">{donorName}</p>
          </div>
          <Badge className="bg-rose-600">
            <Heart className="w-3 h-3 mr-1 fill-white" />
            সম্মানিত দাতা
          </Badge>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">দানের পরিমাণ</p>
            <p className="text-2xl font-bold text-rose-700">৳ {donationAmount.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">রসিদ নম্বর</p>
            <p className="text-lg font-semibold text-gray-900">#{receiptNumber}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <p className="text-sm text-gray-600">দানের ধরন</p>
            <p className="text-lg text-gray-900">{donationType}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">তারিখ</p>
            <p className="text-lg text-gray-900">{donationDate}</p>
          </div>
        </div>

        <div className="bg-green-50 border-2 border-green-200 rounded-lg p-4">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <p className="font-semibold text-green-900">প্রভাব</p>
          </div>
          <p className="text-sm text-green-700">
            🎓 এই দানের মাধ্যমে <strong>{studentsHelped} জন শিক্ষার্থী</strong> উপকৃত হবে
          </p>
          <p className="text-sm text-green-700 mt-1">
            💰 সম্ভাব্য ট্যাক্স সাশ্রয়: <strong>৳ {(donationAmount * 0.25).toLocaleString()}</strong> (২৫%)
          </p>
        </div>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={handleDownloadCertificate}
          className="flex-1 bg-gradient-to-r from-rose-600 to-pink-600 hover:from-rose-700 hover:to-pink-700"
        >
          <Download className="w-4 h-4 mr-2" />
          সার্টিফিকেট ডাউনলোড
        </Button>
        <Button
          onClick={handleShareCertificate}
          variant="outline"
          className="flex-1 border-rose-200 text-rose-700 hover:bg-rose-50"
        >
          <Share2 className="w-4 h-4 mr-2" />
          শেয়ার করুন
        </Button>
      </div>

      <p className="text-center text-sm text-gray-500 mt-4">
        Developed by <strong>Web Search BD</strong>
      </p>
    </Card>
  );
}

function Badge({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium text-white ${className}`}>
      {children}
    </span>
  );
}
