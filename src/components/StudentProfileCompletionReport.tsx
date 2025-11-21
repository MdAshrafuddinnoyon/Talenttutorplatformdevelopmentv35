import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  User, 
  GraduationCap, 
  Users,
  RefreshCw,
  Download,
  TrendingUp
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface StudentProfileCompletionReportProps {
  studentId: string;
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'প্রোফাইল সম্পূর্ণতার রিপোর্ট',
    overallCompletion: 'সামগ্রিক সম্পূর্ণতা',
    sectionsBreakdown: 'বিভাগ অনুযায়ী বিস্তারিত',
    personalInfo: 'ব্যক্তিগত তথ্য',
    educationalInfo: 'শিক্ষাগত তথ্য',
    familyInfo: 'পারিবারিক তথ্য',
    documents: 'ডকুমেন্ট',
    additionalInfo: 'অতিরিক্ত তথ্য',
    completed: 'সম্পন্ন',
    total: 'মোট',
    missingFields: 'অনুপস্থিত ফিল্ড',
    missingDocuments: 'অনুপস্থিত ডকুমেন্ট',
    status: 'স্ট্যাটাস',
    lastUpdated: 'শেষ আপডেট',
    submittedAt: 'জমা দেওয়ার সময়',
    reviewedAt: 'পর্যালোচনার সময়',
    adminNotes: 'এডমিন মন্তব্য',
    refresh: 'রিফ্রেশ',
    downloadReport: 'রিপোর্ট ডাউনলোড',
    loading: 'লোড হচ্ছে...',
    error: 'রিপোর্ট লোড করতে ব্যর্থ',
    noData: 'কোন ডেটা পাওয়া যায়নি',
    statusLabels: {
      draft: 'খসড়া',
      pending_approval: 'পর্যালোচনাধীন',
      approved: 'অনুমোদিত',
      needs_update: 'আপডেট প্রয়োজন',
      rejected: 'প্রত্যাখ্যাত'
    }
  },
  en: {
    title: 'Profile Completion Report',
    overallCompletion: 'Overall Completion',
    sectionsBreakdown: 'Sections Breakdown',
    personalInfo: 'Personal Information',
    educationalInfo: 'Educational Information',
    familyInfo: 'Family Information',
    documents: 'Documents',
    additionalInfo: 'Additional Information',
    completed: 'Completed',
    total: 'Total',
    missingFields: 'Missing Fields',
    missingDocuments: 'Missing Documents',
    status: 'Status',
    lastUpdated: 'Last Updated',
    submittedAt: 'Submitted At',
    reviewedAt: 'Reviewed At',
    adminNotes: 'Admin Notes',
    refresh: 'Refresh',
    downloadReport: 'Download Report',
    loading: 'Loading...',
    error: 'Failed to load report',
    noData: 'No data found',
    statusLabels: {
      draft: 'Draft',
      pending_approval: 'Pending Review',
      approved: 'Approved',
      needs_update: 'Needs Update',
      rejected: 'Rejected'
    }
  }
};

export function StudentProfileCompletionReport({ 
  studentId, 
  language 
}: StudentProfileCompletionReportProps) {
  const t = content[language];
  
  const [report, setReport] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const loadReport = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/student-profile/${studentId}/completion-report`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setReport(data.report);
      } else {
        toast.error(t.error);
      }
    } catch (error) {
      console.error('Load report error:', error);
      toast.error(t.error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    if (studentId) {
      loadReport();
    }
  }, [studentId]);
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'draft':
        return <Badge variant="outline" className="bg-gray-100">{t.statusLabels.draft}</Badge>;
      case 'pending_approval':
        return <Badge className="bg-blue-500">{t.statusLabels.pending_approval}</Badge>;
      case 'approved':
        return <Badge className="bg-green-500">{t.statusLabels.approved}</Badge>;
      case 'needs_update':
        return <Badge className="bg-orange-500">{t.statusLabels.needs_update}</Badge>;
      case 'rejected':
        return <Badge className="bg-red-500">{t.statusLabels.rejected}</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };
  
  const getSectionIcon = (section: string) => {
    switch (section) {
      case 'personal':
        return <User className="w-5 h-5 text-blue-600" />;
      case 'educational':
        return <GraduationCap className="w-5 h-5 text-purple-600" />;
      case 'family':
        return <Users className="w-5 h-5 text-teal-600" />;
      case 'documents':
        return <FileText className="w-5 h-5 text-orange-600" />;
      case 'additional':
        return <TrendingUp className="w-5 h-5 text-green-600" />;
      default:
        return <FileText className="w-5 h-5 text-gray-600" />;
    }
  };
  
  const getSectionTitle = (section: string) => {
    switch (section) {
      case 'personal':
        return t.personalInfo;
      case 'educational':
        return t.educationalInfo;
      case 'family':
        return t.familyInfo;
      case 'documents':
        return t.documents;
      case 'additional':
        return t.additionalInfo;
      default:
        return section;
    }
  };
  
  const getProgressColor = (percentage: number) => {
    if (percentage === 100) return 'bg-green-500';
    if (percentage >= 80) return 'bg-blue-500';
    if (percentage >= 50) return 'bg-yellow-500';
    return 'bg-red-500';
  };
  
  const downloadReport = () => {
    if (!report) return;
    
    const reportText = `
=== ${t.title} ===
${language === 'bn' ? 'ছাত্রের নাম' : 'Student Name'}: ${report.studentName}
${t.status}: ${report.status}
${t.overallCompletion}: ${report.overall.percentage}% (${report.overall.completed}/${report.overall.total})

=== ${t.sectionsBreakdown} ===

${Object.entries(report.sections).map(([key, section]: [string, any]) => `
${getSectionTitle(key)}: ${section.percentage}% (${section.completed}/${section.total})
${section.missingFields?.length > 0 ? `${t.missingFields}: ${section.missingFields.join(', ')}` : ''}
${section.missingDocuments?.length > 0 ? `${t.missingDocuments}: ${section.missingDocuments.join(', ')}` : ''}
`).join('\n')}

${t.lastUpdated}: ${report.lastUpdated ? new Date(report.lastUpdated).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US') : 'N/A'}
${report.submittedAt ? `${t.submittedAt}: ${new Date(report.submittedAt).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}` : ''}
${report.reviewedAt ? `${t.reviewedAt}: ${new Date(report.reviewedAt).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}` : ''}
${report.adminNotes ? `${t.adminNotes}: ${report.adminNotes}` : ''}
    `.trim();
    
    const blob = new Blob([reportText], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `profile-completion-report-${studentId}-${Date.now()}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success(language === 'bn' ? 'রিপোর্ট ডাউনলোড হয়েছে' : 'Report downloaded');
  };
  
  if (isLoading && !report) {
    return (
      <Card className="p-8 text-center">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-500" />
        <p className="text-gray-600">{t.loading}</p>
      </Card>
    );
  }
  
  if (!report) {
    return (
      <Card className="p-8 text-center">
        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p className="text-gray-600">{t.noData}</p>
      </Card>
    );
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
          <p className="text-gray-600">{report.studentName}</p>
        </div>
        <div className="flex gap-2">
          <Button onClick={loadReport} disabled={isLoading} variant="outline">
            <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
            {t.refresh}
          </Button>
          <Button onClick={downloadReport} variant="outline">
            <Download className="w-4 h-4 mr-2" />
            {t.downloadReport}
          </Button>
        </div>
      </div>
      
      {/* Overall Completion */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-lg font-semibold">{t.overallCompletion}</h3>
            <p className="text-sm text-gray-600">
              {t.completed}: {report.overall.completed} / {report.overall.total}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-right">
              <div className="text-3xl font-bold text-blue-600">
                {report.overall.percentage}%
              </div>
              {getStatusBadge(report.status)}
            </div>
          </div>
        </div>
        <Progress value={report.overall.percentage} className="h-4" />
      </Card>
      
      {/* Sections Breakdown */}
      <div>
        <h3 className="text-lg font-semibold mb-4">{t.sectionsBreakdown}</h3>
        <div className="grid md:grid-cols-2 gap-4">
          {Object.entries(report.sections).map(([key, section]: [string, any]) => (
            <Card key={key} className="p-5">
              <div className="flex items-start gap-3 mb-3">
                {getSectionIcon(key)}
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="font-semibold">{getSectionTitle(key)}</h4>
                    <span className={`font-bold text-lg ${
                      section.percentage === 100 ? 'text-green-600' :
                      section.percentage >= 80 ? 'text-blue-600' :
                      section.percentage >= 50 ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {section.percentage}%
                    </span>
                  </div>
                  <Progress 
                    value={section.percentage} 
                    className={`h-2 mb-3 ${getProgressColor(section.percentage)}`}
                  />
                  <p className="text-sm text-gray-600 mb-2">
                    {t.completed}: {section.completed} / {section.total}
                  </p>
                  
                  {/* Missing Fields */}
                  {section.missingFields?.length > 0 && (
                    <div className="mt-3 p-3 bg-red-50 rounded-lg border border-red-200">
                      <p className="text-sm font-medium text-red-800 mb-1">
                        {t.missingFields}:
                      </p>
                      <ul className="text-xs text-red-700 space-y-1">
                        {section.missingFields.map((field: string) => (
                          <li key={field} className="flex items-center gap-1">
                            <AlertCircle className="w-3 h-3" />
                            {field}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Missing Documents */}
                  {section.missingDocuments?.length > 0 && (
                    <div className="mt-3 p-3 bg-orange-50 rounded-lg border border-orange-200">
                      <p className="text-sm font-medium text-orange-800 mb-1">
                        {t.missingDocuments}:
                      </p>
                      <ul className="text-xs text-orange-700 space-y-1">
                        {section.missingDocuments.map((doc: string) => (
                          <li key={doc} className="flex items-center gap-1">
                            <FileText className="w-3 h-3" />
                            {doc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {/* Complete Section */}
                  {section.percentage === 100 && (
                    <div className="mt-3 p-3 bg-green-50 rounded-lg border border-green-200 flex items-center gap-2">
                      <CheckCircle className="w-4 h-4 text-green-600" />
                      <p className="text-sm font-medium text-green-800">
                        {language === 'bn' ? 'সম্পূর্ণ' : 'Complete'}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </Card>
          ))}
        </div>
      </div>
      
      {/* Timeline */}
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">
          {language === 'bn' ? 'টাইমলাইন' : 'Timeline'}
        </h3>
        <div className="space-y-3">
          {report.lastUpdated && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-24 text-gray-600">{t.lastUpdated}:</div>
              <div className="font-medium">
                {new Date(report.lastUpdated).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
              </div>
            </div>
          )}
          {report.submittedAt && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-24 text-gray-600">{t.submittedAt}:</div>
              <div className="font-medium">
                {new Date(report.submittedAt).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
              </div>
            </div>
          )}
          {report.reviewedAt && (
            <div className="flex items-center gap-3 text-sm">
              <div className="w-24 text-gray-600">{t.reviewedAt}:</div>
              <div className="font-medium">
                {new Date(report.reviewedAt).toLocaleString(language === 'bn' ? 'bn-BD' : 'en-US')}
              </div>
            </div>
          )}
        </div>
      </Card>
      
      {/* Admin Notes */}
      {report.adminNotes && (
        <Card className="p-6 bg-yellow-50 border-yellow-200">
          <h3 className="text-lg font-semibold mb-3 flex items-center gap-2">
            <AlertCircle className="w-5 h-5 text-yellow-600" />
            {t.adminNotes}
          </h3>
          <p className="text-gray-700 whitespace-pre-wrap">{report.adminNotes}</p>
        </Card>
      )}
    </div>
  );
}
