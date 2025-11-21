import { Download } from 'lucide-react';
import { Button } from './ui/button';
import { toast } from 'sonner@2.0.3';

interface Payment {
  id: number;
  student: string;
  guardian: string;
  guardianPhone?: string;
  amount: number;
  month: string;
  status: 'paid' | 'pending';
  date: string;
}

interface PaymentInvoiceGeneratorProps {
  payment: Payment;
  teacherName: string;
  language: 'bn' | 'en';
}

export function PaymentInvoiceGenerator({ payment, teacherName, language }: PaymentInvoiceGeneratorProps) {
  const generateInvoice = () => {
    const invoiceContent = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                TALENT TUTOR
           টিউশন পেমেন্ট রসিদ / PAYMENT RECEIPT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

রসিদ নম্বর / Invoice No: INV-${payment.id}-${Date.now()}
তারিখ / Date: ${new Date().toLocaleDateString('bn-BD', { 
  year: 'numeric', 
  month: 'long', 
  day: 'numeric' 
})}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
পেমেন্ট তথ্য / PAYMENT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

শিক্ষক / Teacher: ${teacherName}
ছাত্র/ছাত্রী / Student: ${payment.student}
অভিভাবক / Guardian: ${payment.guardian}
${payment.guardianPhone ? `মোবাইল / Mobile: ${payment.guardianPhone}\n` : ''}
মাস / Month: ${payment.month}
পেমেন্ট তারিখ / Payment Date: ${payment.date}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
পরিমাণ বিবরণী / AMOUNT DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

টিউশন ফি / Tuition Fee:              ৳${payment.amount.toLocaleString()}
প্ল্যাটফর্ম ফি (১০%) / Platform Fee:   -৳${(payment.amount * 0.1).toLocaleString()}
                                      ─────────────
নিট পরিমাণ / Net Amount:              ৳${(payment.amount * 0.9).toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
স্ট্যাটাস / STATUS: ${payment.status === 'paid' ? '✓ PAID / পরিশোধিত' : '⏳ PENDING / বকেয়া'}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

এই রসিদটি স্বয়ংক্রিয়ভাবে তৈরি হয়েছে এবং স্বাক্ষরের প্রয়োজন নেই।
This receipt is auto-generated and does not require signature.

Talent Tutor Platform
ওয়েবসাইট / Website: www.talenttutor.com
ইমেইল / Email: support@talenttutor.com

ধন্যবাদ / Thank you!
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    const blob = new Blob([invoiceContent], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Invoice-${payment.student.replace(/\s+/g, '-')}-${payment.month}.txt`;
    a.click();
    URL.revokeObjectURL(url);

    toast.success(
      language === 'bn' ? 'রসিদ ডাউনলোড সম্পন্ন!' : 'Invoice downloaded!',
      {
        description: language === 'bn' 
          ? `${payment.student} এর রসিদ সংরক্ষিত হয়েছে` 
          : `Invoice for ${payment.student} saved`
      }
    );
  };

  return (
    <Button
      size="sm"
      variant="ghost"
      onClick={generateInvoice}
      className="text-xs"
    >
      <Download className="w-3 h-3 mr-1" />
      {language === 'bn' ? 'রসিদ' : 'Receipt'}
    </Button>
  );
}
