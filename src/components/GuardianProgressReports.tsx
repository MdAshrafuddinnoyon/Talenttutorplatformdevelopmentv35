import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { FileText, Download } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface GuardianProgressReportsProps {
  language: 'bn' | 'en';
}

export function GuardianProgressReports({ language }: GuardianProgressReportsProps) {
  const t = language === 'bn' ? {
    progressReports: 'প্রগ্রেস রিপোর্ট',
    overallPerformance: 'সামগ্রিক পারফরম্যান্স',
    recentUpdates: 'সাম্প্রতিক আপডেট',
  } : {
    progressReports: 'Progress Reports',
    overallPerformance: 'Overall Performance',
    recentUpdates: 'Recent Updates',
  };

  // Load all progress reports from localStorage
  const allReports = JSON.parse(localStorage.getItem('progressReports') || '[]');
  
  // Group reports by student
  const reportsByStudent = allReports.reduce((acc: any, report: any) => {
    if (!acc[report.studentName]) {
      acc[report.studentName] = [];
    }
    acc[report.studentName].push(report);
    return acc;
  }, {});

  const handleDownloadAllReports = (studentName: string, reports: any[]) => {
    const sortedReports = reports.sort((a: any, b: any) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    const reportDetails = sortedReports.map((r: any, i: number) => `
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
রিপোর্ট #${sortedReports.length - i}
তারিখ: ${r.dateFormatted}
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ছাত্র/ছাত্রী: ${r.studentName}
বিষয়: ${r.subject} (${r.class})
শিক্ষক: ${r.teacherName}

অগ্রগতি: ${r.progress}%
পারফরম্যান্স: ${
  r.performance === 'excellent' ? 'অসাধারণ' :
  r.performance === 'good' ? 'ভালো' :
  r.performance === 'average' ? 'মধ্যম' : 'উন্নতি প্রয়োজন'
}

মন্তব্য:
${r.comments}
`).join('\n');
    
    const blob = new Blob([`
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
       TALENT TUTOR - প্রগ্রেস রিপোর্ট
          PROGRESS REPORT SUMMARY
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

ছাত্র/ছাত্রী: ${studentName}
মোট রিপোর্ট: ${sortedReports.length}
তৈরি হয়েছে: ${new Date().toLocaleString('bn-BD')}

${reportDetails}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Talent Tutor Platform
www.talenttutor.com
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
`], { type: 'text/plain;charset=utf-8' });
    
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `Progress-Report-${studentName.replace(/\s+/g, '-')}.txt`;
    a.click();
    URL.revokeObjectURL(url);
    
    toast.success('সব রিপোর্ট ডাউনলোড হচ্ছে!', {
      description: `${studentName} এর সকল রিপোর্ট সংরক্ষিত হয়েছে`
    });
  };

  // If no reports exist
  if (allReports.length === 0) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-gray-900">{t.progressReports}</h2>
          <Badge variant="outline" className="text-base">০ টি রিপোর্ট</Badge>
        </div>
        
        <Card className="p-12">
          <div className="text-center">
            <FileText className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-gray-900 mb-2">এখনও কোনো প্রগ্রেস রিপোর্ট নেই</h3>
            <p className="text-gray-600">
              আপনার সন্তানের শিক্ষক রিপোর্ট যোগ করলে তা এখানে প্রদর্শিত হবে
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-gray-900">{t.progressReports}</h2>
        <Badge variant="outline" className="text-base">
          {allReports.length} টি রিপোর্ট
        </Badge>
      </div>
      
      {Object.entries(reportsByStudent).map(([studentName, reports]: [string, any]) => {
        const sortedReports = reports.sort((a: any, b: any) => 
          new Date(b.date).getTime() - new Date(a.date).getTime()
        );
        const latestReport = sortedReports[0];
        
        return (
          <Card key={studentName} className="p-6 border-2 border-teal-100 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl text-gray-900 mb-1">{studentName}</h3>
                <p className="text-gray-600">
                  {latestReport.subject} • {latestReport.class} • শিক্ষক: {latestReport.teacherName}
                </p>
              </div>
              <Badge className="bg-teal-600">
                সর্বশেষ: {latestReport.dateFormatted}
              </Badge>
            </div>

            {/* Overall Progress */}
            <div className="mb-6 p-4 bg-gradient-to-r from-emerald-50 to-teal-50 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-gray-700 font-medium">{t.overallPerformance}</span>
                <span className="text-2xl font-bold text-teal-700">{latestReport.progress}%</span>
              </div>
              <Progress value={latestReport.progress} className="h-3" />
            </div>

            {/* Latest Report Performance */}
            <div className="mb-4 p-4 bg-white border-2 border-dashed border-teal-200 rounded-lg">
              <div className="flex items-center justify-between mb-3">
                <span className="font-medium text-gray-900">সর্বশেষ মূল্যায়ন</span>
                <Badge className={
                  latestReport.performance === 'excellent' ? 'bg-green-600' :
                  latestReport.performance === 'good' ? 'bg-blue-600' :
                  latestReport.performance === 'average' ? 'bg-yellow-600' :
                  'bg-orange-600'
                }>
                  {latestReport.performance === 'excellent' && 'অসাধারণ'}
                  {latestReport.performance === 'good' && 'ভালো'}
                  {latestReport.performance === 'average' && 'মধ্যম'}
                  {latestReport.performance === 'needs-improvement' && 'উন্নতি প্রয়োজন'}
                </Badge>
              </div>
              <p className="text-gray-700 bg-gray-50 p-3 rounded">{latestReport.comments}</p>
            </div>

            {/* All Reports Summary */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <h4 className="text-gray-900 font-medium">সকল রিপোর্ট ({sortedReports.length})</h4>
                <Button
                  size="sm"
                  variant="outline"
                  className="border-teal-300 text-teal-700 hover:bg-teal-50"
                  onClick={() => handleDownloadAllReports(studentName, sortedReports)}
                >
                  <Download className="w-4 h-4 mr-1" />
                  সব রিপোর্ট ডাউনলোড
                </Button>
              </div>
              
              {sortedReports.slice(1, 4).map((report: any) => (
                <div key={report.id} className="border-l-4 border-teal-300 pl-4 py-2 bg-gray-50 rounded">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-500">{report.dateFormatted}</span>
                    <Badge variant="outline" className="text-xs">
                      {report.progress}%
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-700 line-clamp-2">{report.comments}</p>
                </div>
              ))}
              
              {sortedReports.length > 4 && (
                <p className="text-sm text-center text-gray-500 pt-2">
                  আরও {sortedReports.length - 4} টি রিপোর্ট আছে
                </p>
              )}
            </div>
          </Card>
        );
      })}
    </div>
  );
}
