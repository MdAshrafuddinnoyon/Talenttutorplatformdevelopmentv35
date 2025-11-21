import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from './ui/dialog';
import { FileText, Download, Eye, Calendar, User, DollarSign, Clock, CheckCircle, XCircle, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { generateContractPDF, downloadPDF } from '../utils/pdfGenerator';

interface Contract {
  id: number;
  contractNumber: string;
  teacherName?: string;
  guardianName?: string;
  studentName: string;
  subject: string;
  rate: number;
  rateType: string;
  schedule: string;
  duration: string;
  startDate: string;
  endDate: string;
  status: 'active' | 'completed' | 'cancelled';
  createdDate: string;
  specialTerms?: string;
  platformCommission: number;
}

interface ContractManagementSectionProps {
  userRole: 'teacher' | 'guardian';
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'চুক্তিনামা ম্যানেজমেন্ট',
    subtitle: 'আপনার সব চুক্তির তথ্য এবং ডাউনলোড অপশন',
    noContracts: 'কোনো চুক্তি পাওয়া যায়নি',
    noContractsMessage: 'আপনার এখনও কোনো সক্রিয় চুক্তি নেই',
    contractNumber: 'চুক্তি নম্বর',
    teacher: 'শিক্ষক',
    guardian: 'অভিভাবক',
    student: 'ছাত্র/ছাত্রী',
    subject: 'বিষয়',
    rate: 'বেতন',
    schedule: 'সিডিউল',
    duration: 'সময়কাল',
    startDate: 'শুরুর তারিখ',
    endDate: 'শেষ তারিখ',
    status: 'স্ট্যাটাস',
    createdOn: 'তৈরির তারিখ',
    viewContract: 'চুক্তি দেখুন',
    downloadPDF: 'PDF ডাউনলোড',
    active: 'সক্রিয়',
    completed: 'সম্পন্ন',
    cancelled: 'বাতিল',
    contractDetails: 'চুক্তির বিস্তারিত',
    specialTerms: 'বিশেষ শর্তাবলী',
    platformCommission: 'প্ল্যাটফর্ম কমিশন',
    netAmount: 'নিট পরিমাণ',
    close: 'বন্ধ করুন',
    perMonth: 'প্রতি মাস',
    perHour: 'প্রতি ঘণ্টা',
    perSession: 'প্রতি সেশন',
    totalContracts: 'মোট চুক্তি',
    activeContracts: 'সক্রিয় চুক্তি',
  },
  en: {
    title: 'Contract Management',
    subtitle: 'All your contracts and download options',
    noContracts: 'No Contracts Found',
    noContractsMessage: 'You don\'t have any active contracts yet',
    contractNumber: 'Contract Number',
    teacher: 'Teacher',
    guardian: 'Guardian',
    student: 'Student',
    subject: 'Subject',
    rate: 'Rate',
    schedule: 'Schedule',
    duration: 'Duration',
    startDate: 'Start Date',
    endDate: 'End Date',
    status: 'Status',
    createdOn: 'Created On',
    viewContract: 'View Contract',
    downloadPDF: 'Download PDF',
    active: 'Active',
    completed: 'Completed',
    cancelled: 'Cancelled',
    contractDetails: 'Contract Details',
    specialTerms: 'Special Terms',
    platformCommission: 'Platform Commission',
    netAmount: 'Net Amount',
    close: 'Close',
    perMonth: 'Per Month',
    perHour: 'Per Hour',
    perSession: 'Per Session',
    totalContracts: 'Total Contracts',
    activeContracts: 'Active Contracts',
  },
};

// Mock contracts data
const mockContracts: Contract[] = [
  {
    id: 1,
    contractNumber: 'TT-2025-001',
    teacherName: 'মোঃ করিম উদ্দিন',
    guardianName: 'মিসেস রহিমা খাতুন',
    studentName: 'রাফি আহমেদ',
    subject: 'গণিত',
    rate: 8000,
    rateType: 'perMonth',
    schedule: 'সপ্তাহে ৪ দিন (রবি, মঙ্গল, বৃহস্পতি, শুক্র) সন্ধ্যা ৫-৭টা',
    duration: '6 মাস',
    startDate: '০১/০১/২০২৫',
    endDate: '৩০/০৬/২০২৫',
    status: 'active',
    createdDate: '২৮/১২/২০২৪',
    specialTerms: 'SSC পরীক্ষার বিশেষ প্রস্তুতি প্রদান করতে হবে। মাসিক প্রগ্রেস রিপোর্ট আবশ্যক।',
    platformCommission: 800,
  },
  {
    id: 2,
    contractNumber: 'TT-2025-002',
    teacherName: 'সাবিনা আক্তার',
    guardianName: 'জনাব করিম সাহেব',
    studentName: 'সামিয়া খান',
    subject: 'ইংরেজি',
    rate: 6000,
    rateType: 'perMonth',
    schedule: 'সপ্তাহে ৩ দিন (রবি, মঙ্গল, বৃহস্পতি) বিকাল ৪-৬টা',
    duration: '12 মাস',
    startDate: '০৫/০১/২০২৫',
    endDate: '০৫/০১/২০২৬',
    status: 'active',
    createdDate: '০২/০১/২০২৫',
    specialTerms: 'স্পোকেন ইংলিশ এবং গ্রামারে বিশেষ জোর দিতে হবে।',
    platformCommission: 600,
  },
  {
    id: 3,
    contractNumber: 'TT-2024-145',
    teacherName: 'রফিকুল ইসলাম',
    guardianName: 'মিসেস সাবিনা',
    studentName: 'তানভীর হাসান',
    subject: 'বিজ্ঞান',
    rate: 7000,
    rateType: 'perMonth',
    schedule: 'সপ্তাহে ৪ দিন (রবি, সোম, বুধ, বৃহস্পতি) সন্ধ্যা ৬-৮টা',
    duration: '6 মাস',
    startDate: '০১/০৯/২০২৪',
    endDate: '২৮/০২/২০২৫',
    status: 'completed',
    createdDate: '২৫/০৮/২০২৪',
    platformCommission: 700,
  },
];

export function ContractManagementSection({ userRole, language }: ContractManagementSectionProps) {
  const t = content[language];
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  // Filter contracts based on user role
  const contracts = mockContracts;

  const activeContracts = contracts.filter(c => c.status === 'active');

  const handleViewContract = (contract: Contract) => {
    setSelectedContract(contract);
    setIsDetailsOpen(true);
  };

  const handleDownloadPDF = async (contract: Contract) => {
    try {
      toast.loading(
        language === 'bn'
          ? `চুক্তি ${contract.contractNumber} এর PDF তৈরি হচ্ছে...`
          : `Generating PDF for contract ${contract.contractNumber}...`,
        { id: 'pdf-generation' }
      );

      // Generate PDF using professional PDF generator
      const pdfBlob = await generateContractPDF({
        contractNumber: contract.contractNumber,
        createdDate: contract.createdDate,
        status: contract.status,
        teacherName: contract.teacherName || 'N/A',
        guardianName: contract.guardianName || 'N/A',
        studentName: contract.studentName,
        subject: contract.subject,
        schedule: contract.schedule,
        duration: contract.duration,
        startDate: contract.startDate,
        endDate: contract.endDate,
        rate: contract.rate,
        rateType: contract.rateType,
        platformCommission: contract.platformCommission,
        specialTerms: contract.specialTerms,
      }, language);

      // Download the PDF
      const fileName = `Contract-${contract.contractNumber}-${contract.studentName.replace(/\s+/g, '-')}.pdf`;
      downloadPDF(pdfBlob, fileName);

      toast.success(
        language === 'bn'
          ? 'চুক্তি PDF সফলভাবে ডাউনলোড হয়েছে!'
          : 'Contract PDF downloaded successfully!',
        { id: 'pdf-generation' }
      );
    } catch (error) {
      console.error('PDF Generation Error:', error);
      toast.error(
        language === 'bn'
          ? 'PDF তৈরিতে সমস্যা হয়েছে। আবার চেষ্টা করুন।'
          : 'Failed to generate PDF. Please try again.',
        { id: 'pdf-generation' }
      );
    }
  };

  // Legacy text-based download (backup)
  const handleDownloadText = (contract: Contract) => {
    toast.success(
      language === 'bn'
        ? `চুক্তি ${contract.contractNumber} এর টেক্সট ফাইল ডাউনলোড হচ্ছে...`
        : `Downloading text file for contract ${contract.contractNumber}...`
    );
    
    // Create detailed contract document
    const netAmount = contract.rate - contract.platformCommission;
    const contractDocument = `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
                        TALENT TUTOR প্ল্যাটফর্ম
                           টিউশন চুক্তিনামা
                     TUITION AGREEMENT CONTRACT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

চুক্তি নম্বর / Contract Number: ${contract.contractNumber}
তৈরির তারিখ / Created Date: ${contract.createdDate}
চুক্তির স্ট্যাটাস / Contract Status: ${
  contract.status === 'active' ? 'সক্রিয় (Active)' :
  contract.status === 'completed' ? 'সম্পন্ন (Completed)' :
  'বাতিল (Cancelled)'
}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
পক্ষসমূহ / PARTIES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

১. শিক্ষক / Teacher:
   নাম / Name: ${contract.teacherName || 'N/A'}
   ভূমিকা / Role: টিউশন প্রদানকারী (Service Provider)

২. অভিভাবক / Guardian:
   নাম / Name: ${contract.guardianName || 'N/A'}
   ভূমিকা / Role: সেবা গ্রহীতা (Service Recipient)

৩. ছাত্র/ছাত্রী / Student:
   নাম / Name: ${contract.studentName}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
টিউশন বিবরণ / TUITION DETAILS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

বিষয় / Subject: ${contract.subject}

সময়সূচী / Schedule:
${contract.schedule}

সময়কাল / Duration: ${contract.duration}

শুরুর তারিখ / Start Date: ${contract.startDate}
শেষ তারিখ / End Date: ${contract.endDate}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
আর্থিক শর্তাবলী / FINANCIAL TERMS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

টিউশন ফি / Tuition Fee:                     ৳${contract.rate.toLocaleString()}
হার / Rate Type:                              ${getRateTypeText(contract.rateType)}

প্ল্যাটফর্ম কমিশন (১০%) / Platform Commission: ৳${contract.platformCommission.toLocaleString()}
শিক্ষকের নিট আয় / Teacher's Net Earnings:    ৳${netAmount.toLocaleString()}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
শর্তাবলী / TERMS AND CONDITIONS
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

১. পেমেন্ট শর্তাবলী:
   • মাসিক পেমেন্ট প্রতি মাসের ১-৭ তারিখের মধ্যে করতে হবে
   • পেমেন্ট Talent Tutor প্ল্যাটফর্মের মাধ্যমে করতে হবে
   • প্ল্যাটফর্ম ১০% সার্ভিস ফি কেটে রাখবে

২. ক্লাস পরিচালনা:
   • নির্ধারিত সময় অনুযায়ী ক্লাস নিতে হবে
   • কোনো ক্লাস মিস করলে পূর্বে জানাতে হবে
   • মেকআপ ক্লাসের ব্যবস্থা করতে হবে

৩. বাতিলকরণ নীতি:
   • চুক্তি বাতিল করতে ১৫ দিন আগে নোটিশ দিতে হবে
   • কোনো পক্ষ নীতিমালা লঙ্ঘন করলে চুক্তি বাতিল হতে পারে

৪. দায়িত্ব:
   • শিক্ষক মানসম্মত শিক্ষা প্রদান করবেন
   • অভিভাবক সময়মতো পেমেন্ট করবেন
   • উভয় পক্ষ প্ল্যাটফর্মের নীতিমালা মেনে চলবেন

${contract.specialTerms ? `
বিশেষ শর্তাবলী / Special Terms:
${contract.specialTerms}
` : ''}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
স্বাক্ষর / SIGNATURES
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

শিক্ষক / Teacher:
নাম: ${contract.teacherName || 'N/A'}
স্বাক্ষর: ________________
তারিখ: ${contract.createdDate}


অভিভাবক / Guardian:
নাম: ${contract.guardianName || 'N/A'}
স্বাক্ষর: ________________
তারিখ: ${contract.createdDate}


━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
এই চুক্তিনামা Talent Tutor প্ল্যাটফর্মের মাধ্যমে ইলেকট্রনিকভাবে তৈরি করা হয়েছে।
This contract is electronically generated via Talent Tutor Platform.

Talent Tutor Platform
Website: www.talenttutor.com
Support: support@talenttutor.com
Phone: +88 01712-345678
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`;

    // Create and download the file
    const blob = new Blob([contractDocument], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Contract-${contract.contractNumber}-${contract.studentName.replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    setTimeout(() => {
      toast.success(
        language === 'bn'
          ? 'চুক্তি সফলভাবে ডাউনলোড হয়েছে!'
          : 'Contract downloaded successfully!'
      );
    }, 500);
  };
  
  const getRateTypeText = (rateType: string) => {
    const rateTypes: Record<string, string> = {
      perMonth: 'প্রতি মাস',
      perHour: 'প্রতি ঘণ্টা',
      perSession: 'প্রতি সেশন',
    };
    return rateTypes[rateType] || rateType;
  };

  const getStatusBadge = (status: Contract['status']) => {
    const statusConfig = {
      active: { label: t.active, className: 'bg-green-600', icon: CheckCircle },
      completed: { label: t.completed, className: 'bg-blue-600', icon: CheckCircle },
      cancelled: { label: t.cancelled, className: 'bg-red-600', icon: XCircle },
    };

    const config = statusConfig[status];
    const Icon = config.icon;

    return (
      <Badge className={config.className}>
        <Icon className="w-3 h-3 mr-1" />
        {config.label}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-gray-900 mb-2">{t.title}</h2>
        <p className="text-gray-600">{t.subtitle}</p>
      </div>

      {/* Stats */}
      <div className="grid md:grid-cols-2 gap-4">
        <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 mb-1">{t.totalContracts}</p>
              <p className="text-3xl text-blue-700">{contracts.length}</p>
            </div>
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <FileText className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>

        <Card className="p-6 bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 mb-1">{t.activeContracts}</p>
              <p className="text-3xl text-green-700">{activeContracts.length}</p>
            </div>
            <div className="w-12 h-12 bg-green-600 rounded-full flex items-center justify-center">
              <CheckCircle className="w-6 h-6 text-white" />
            </div>
          </div>
        </Card>
      </div>

      {/* Contracts List */}
      {contracts.length === 0 ? (
        <Card className="p-12 text-center">
          <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FileText className="w-10 h-10 text-gray-400" />
          </div>
          <h3 className="text-gray-900 mb-2">{t.noContracts}</h3>
          <p className="text-gray-600">{t.noContractsMessage}</p>
        </Card>
      ) : (
        <div className="space-y-4">
          {contracts.map((contract, index) => (
            <motion.div
              key={contract.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-shadow border-2 border-transparent hover:border-emerald-200">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-emerald-100 to-teal-100 rounded-lg flex items-center justify-center shrink-0">
                      <FileText className="w-6 h-6 text-emerald-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="text-gray-900">{contract.contractNumber}</h3>
                        {getStatusBadge(contract.status)}
                      </div>
                      <p className="text-sm text-gray-600">
                        {userRole === 'teacher' ? t.guardian : t.teacher}:{' '}
                        <span className="text-gray-900">
                          {userRole === 'teacher' ? contract.guardianName : contract.teacherName}
                        </span>
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{t.createdOn}</p>
                    <p className="text-gray-900">{contract.createdDate}</p>
                  </div>
                </div>

                <div className="grid md:grid-cols-4 gap-4 mb-4 p-4 bg-gray-50 rounded-lg">
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{t.student}</p>
                    <p className="text-gray-900">{contract.studentName}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{t.subject}</p>
                    <p className="text-gray-900">{contract.subject}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{t.rate}</p>
                    <p className="text-green-600">
                      ৳{contract.rate.toLocaleString()} {getRateTypeText(contract.rateType)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500 mb-1">{t.duration}</p>
                    <p className="text-gray-900">{contract.duration}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 text-sm text-gray-600">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-4 h-4" />
                      {contract.startDate} - {contract.endDate}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handleViewContract(contract)}
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      {t.viewContract}
                    </Button>
                    <Button
                      size="sm"
                      className="bg-emerald-600 hover:bg-emerald-700"
                      onClick={() => handleDownloadPDF(contract)}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {t.downloadPDF}
                    </Button>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      )}

      {/* Contract Details Dialog */}
      <Dialog open={isDetailsOpen} onOpenChange={setIsDetailsOpen}>
        <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FileText className="w-5 h-5 text-emerald-600" />
              {t.contractDetails}
            </DialogTitle>
            <DialogDescription>
              {selectedContract?.contractNumber}
            </DialogDescription>
          </DialogHeader>

          {selectedContract && (
            <div className="space-y-6 py-4">
              {/* Status Banner */}
              <div className="p-4 bg-gradient-to-r from-emerald-50 to-teal-50 border-l-4 border-emerald-500 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-emerald-900 mb-1">চুক্তির স্ট্যাটাস</p>
                    <p className="text-sm text-emerald-700">তৈরি হয়েছে: {selectedContract.createdDate}</p>
                  </div>
                  {getStatusBadge(selectedContract.status)}
                </div>
              </div>

              {/* Parties Information */}
              <div className="grid md:grid-cols-2 gap-4">
                <Card className="p-4 bg-blue-50 border border-blue-200">
                  <div className="flex items-center gap-3">
                    <User className="w-10 h-10 text-blue-600" />
                    <div>
                      <p className="text-sm text-blue-600">{t.teacher}</p>
                      <p className="text-blue-900">{selectedContract.teacherName}</p>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 bg-purple-50 border border-purple-200">
                  <div className="flex items-center gap-3">
                    <User className="w-10 h-10 text-purple-600" />
                    <div>
                      <p className="text-sm text-purple-600">{t.guardian}</p>
                      <p className="text-purple-900">{selectedContract.guardianName}</p>
                    </div>
                  </div>
                </Card>
              </div>

              {/* Contract Details */}
              <div className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.student}</p>
                    <p className="text-gray-900">{selectedContract.studentName}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.subject}</p>
                    <p className="text-gray-900">{selectedContract.subject}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.rate}</p>
                    <p className="text-green-600 text-lg">
                      ৳{selectedContract.rate.toLocaleString()} {getRateTypeText(selectedContract.rateType)}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.platformCommission}</p>
                    <p className="text-red-600">- ৳{selectedContract.platformCommission.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.netAmount}</p>
                    <p className="text-gray-900">
                      ৳{(selectedContract.rate - selectedContract.platformCommission).toLocaleString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500 mb-1">{t.duration}</p>
                    <p className="text-gray-900">{selectedContract.duration}</p>
                  </div>
                </div>

                <div>
                  <p className="text-sm text-gray-500 mb-1">{t.schedule}</p>
                  <p className="text-gray-900">{selectedContract.schedule}</p>
                </div>

                <div className="flex items-center gap-4 text-sm">
                  <div>
                    <p className="text-gray-500">{t.startDate}</p>
                    <p className="text-gray-900">{selectedContract.startDate}</p>
                  </div>
                  <div className="w-px h-8 bg-gray-300"></div>
                  <div>
                    <p className="text-gray-500">{t.endDate}</p>
                    <p className="text-gray-900">{selectedContract.endDate}</p>
                  </div>
                </div>

                {selectedContract.specialTerms && (
                  <div>
                    <p className="text-sm text-gray-500 mb-2">{t.specialTerms}</p>
                    <div className="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded">
                      <p className="text-gray-700">{selectedContract.specialTerms}</p>
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDetailsOpen(false)}>
              {t.close}
            </Button>
            <Button
              className="bg-emerald-600 hover:bg-emerald-700"
              onClick={() => selectedContract && handleDownloadPDF(selectedContract)}
            >
              <Download className="w-4 h-4 mr-2" />
              {t.downloadPDF}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
