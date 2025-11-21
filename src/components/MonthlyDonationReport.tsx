import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Download, 
  TrendingUp, 
  TrendingDown,
  Calendar,
  DollarSign,
  Users,
  Book,
  Award,
  Heart,
  Target,
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface MonthlyDonationReportProps {
  month: string;
  year: string;
  totalDonations: number;
  donationsCount: number;
  studentsHelped: number;
  booksdonated: number;
  monthlyGoal?: number;
  previousMonthTotal?: number;
}

export function MonthlyDonationReport({
  month,
  year,
  totalDonations,
  donationsCount,
  studentsHelped,
  booksdonated,
  monthlyGoal = 10000,
  previousMonthTotal = 0,
}: MonthlyDonationReportProps) {
  
  const progressPercentage = (totalDonations / monthlyGoal) * 100;
  const growthPercentage = previousMonthTotal > 0 
    ? ((totalDonations - previousMonthTotal) / previousMonthTotal) * 100 
    : 0;
  const isGrowthPositive = growthPercentage >= 0;

  const handleDownloadReport = () => {
    const reportHTML = `
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
            background: #f8fafc;
          }
          
          .report {
            max-width: 900px;
            margin: 0 auto;
            background: white;
            border-radius: 15px;
            overflow: hidden;
            box-shadow: 0 10px 40px rgba(0,0,0,0.1);
          }
          
          .header {
            background: linear-gradient(135deg, #e11d48, #ec4899);
            color: white;
            padding: 40px;
            text-align: center;
          }
          
          .header h1 {
            font-size: 32px;
            margin: 0 0 10px 0;
          }
          
          .header p {
            font-size: 18px;
            margin: 0;
            opacity: 0.9;
          }
          
          .content {
            padding: 40px;
          }
          
          .stats-grid {
            display: grid;
            grid-template-columns: repeat(2, 1fr);
            gap: 20px;
            margin-bottom: 30px;
          }
          
          .stat-card {
            background: #f8fafc;
            padding: 25px;
            border-radius: 12px;
            border-left: 4px solid #e11d48;
          }
          
          .stat-label {
            font-size: 14px;
            color: #64748b;
            margin-bottom: 8px;
          }
          
          .stat-value {
            font-size: 32px;
            font-weight: 700;
            color: #1e293b;
          }
          
          .progress-section {
            background: linear-gradient(135deg, #fdf2f8, #fce7f3);
            padding: 30px;
            border-radius: 12px;
            margin: 30px 0;
            border: 2px solid #fda4af;
          }
          
          .progress-bar {
            background: #e5e7eb;
            height: 24px;
            border-radius: 12px;
            overflow: hidden;
            margin: 15px 0;
          }
          
          .progress-fill {
            background: linear-gradient(90deg, #e11d48, #ec4899);
            height: 100%;
            border-radius: 12px;
            transition: width 0.5s ease;
          }
          
          .highlights {
            background: #f0fdf4;
            border: 2px solid #86efac;
            border-radius: 12px;
            padding: 25px;
            margin: 30px 0;
          }
          
          .highlights h3 {
            color: #166534;
            margin-top: 0;
          }
          
          .highlights ul {
            margin: 0;
            padding-left: 25px;
            color: #15803d;
          }
          
          .highlights li {
            margin: 10px 0;
          }
          
          .footer {
            text-align: center;
            padding: 30px;
            background: #f8fafc;
            border-top: 2px solid #e2e8f0;
            color: #64748b;
          }
          
          @media print {
            body {
              padding: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="report">
          <div class="header">
            <h1>মাসিক দান রিপোর্ট</h1>
            <p>${month} ${year}</p>
            <p style="margin-top: 10px; font-size: 14px;">Talent Tutor Foundation</p>
          </div>
          
          <div class="content">
            <h2 style="color: #1e293b; margin-top: 0;">সংক্ষিপ্ত বিবরণ</h2>
            
            <div class="stats-grid">
              <div class="stat-card">
                <div class="stat-label">💰 মোট দান</div>
                <div class="stat-value">৳ ${totalDonations.toLocaleString()}</div>
              </div>
              
              <div class="stat-card">
                <div class="stat-label">📊 দানের সংখ্যা</div>
                <div class="stat-value">${donationsCount}</div>
              </div>
              
              <div class="stat-card">
                <div class="stat-label">🎓 উপকৃত ছাত্র</div>
                <div class="stat-value">${studentsHelped} জন</div>
              </div>
              
              <div class="stat-card">
                <div class="stat-label">📚 দান করা বই</div>
                <div class="stat-value">${booksdonated}টি</div>
              </div>
            </div>
            
            <div class="progress-section">
              <h3 style="margin-top: 0; color: #e11d48;">মাসিক লক্ষ্য অর্জন</h3>
              <div style="display: flex; justify-content: space-between; margin-bottom: 10px;">
                <span style="color: #64748b;">অর্জিত: ৳${totalDonations.toLocaleString()}</span>
                <span style="color: #64748b;">লক্ষ্য: ৳${monthlyGoal.toLocaleString()}</span>
              </div>
              <div class="progress-bar">
                <div class="progress-fill" style="width: ${Math.min(progressPercentage, 100)}%"></div>
              </div>
              <p style="text-align: center; margin-top: 15px; color: #e11d48; font-weight: 600;">
                ${progressPercentage.toFixed(1)}% সম্পন্ন
              </p>
            </div>
            
            ${growthPercentage !== 0 ? `
              <div style="background: ${isGrowthPositive ? '#f0fdf4' : '#fef2f2'}; 
                          border: 2px solid ${isGrowthPositive ? '#86efac' : '#fca5a5'}; 
                          border-radius: 12px; padding: 20px; margin: 20px 0;">
                <h3 style="color: ${isGrowthPositive ? '#166534' : '#991b1b'}; margin-top: 0;">
                  ${isGrowthPositive ? '📈' : '📉'} 
                  গত মাসের তুলনায় ${isGrowthPositive ? 'বৃদ্ধি' : 'হ্রাস'}
                </h3>
                <p style="color: ${isGrowthPositive ? '#15803d' : '#991b1b'}; font-size: 24px; font-weight: 700; margin: 0;">
                  ${Math.abs(growthPercentage).toFixed(1)}%
                </p>
              </div>
            ` : ''}
            
            <div class="highlights">
              <h3>✨ মূল বিষয়সমূহ</h3>
              <ul>
                <li>আপনার দান ${studentsHelped} জন শিক্ষার্থীর জীবন পরিবর্তন করেছে</li>
                <li>মোট ${booksdonated}টি বই দান করে শিক্ষার প্রসার ঘটিয়েছেন</li>
                <li>গড়ে প্রতিটি দান ৳${(totalDonations / donationsCount).toLocaleString()} টাকা</li>
                <li>ট্যাক্স সুবিধা: ৳${(totalDonations * 0.25).toLocaleString()} (২৫%)</li>
              </ul>
            </div>
            
            <div style="background: #fef3c7; border: 2px solid #fbbf24; border-radius: 12px; padding: 20px; margin: 20px 0;">
              <h3 style="color: #92400e; margin-top: 0;">🏆 আপনার প্রভাব</h3>
              <p style="color: #78350f; margin: 0; line-height: 1.8;">
                আপনার উদার দানের ফলে ${studentsHelped} জন মেধাবী কিন্তু অসহায় শিক্ষার্থী তাদের শিক্ষা 
                চালিয়ে যেতে পারছে। তারা তাদের স্বপ্ন পূরণের পথে এগিয়ে যাচ্ছে শুধুমাত্র আপনার সাহায্যের কারণে।
                আল্লাহ আপনার এই নেক আমল কবুল করুন এবং আপনাকে উত্তম প্রতিদান দান করুন।
              </p>
            </div>
          </div>
          
          <div class="footer">
            <p style="margin: 0;">রিপোর্ট তৈরির তারিখ: ${new Date().toLocaleDateString('bn-BD')}</p>
            <p style="margin: 10px 0 0 0; font-size: 12px;">
              Developed by <strong>Web Search BD</strong> • www.talent-tutor.com
            </p>
          </div>
        </div>
      </body>
      </html>
    `;

    // Create and download
    const blob = new Blob([reportHTML], { type: 'text/html' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `মাসিক-দান-রিপোর্ট-${month}-${year}.html`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    toast.success('রিপোর্ট ডাউনলোড হচ্ছে!');
  };

  return (
    <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-2 border-purple-200">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h3 className="text-2xl font-bold text-gray-900 mb-1">মাসিক রিপোর্ট</h3>
          <p className="text-gray-600 flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            {month} {year}
          </p>
        </div>
        <Button
          onClick={handleDownloadReport}
          className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
        >
          <Download className="w-4 h-4 mr-2" />
          ডাউনলোড
        </Button>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        <div className="bg-white p-4 rounded-lg border-2 border-rose-200">
          <DollarSign className="w-8 h-8 text-rose-600 mb-2" />
          <div className="text-2xl font-bold text-gray-900">৳{(totalDonations / 1000).toFixed(0)}K</div>
          <div className="text-sm text-gray-600">মোট দান</div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-blue-200">
          <Heart className="w-8 h-8 text-blue-600 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{donationsCount}</div>
          <div className="text-sm text-gray-600">দান সংখ্যা</div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-green-200">
          <Users className="w-8 h-8 text-green-600 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{studentsHelped}</div>
          <div className="text-sm text-gray-600">ছাত্র উপকৃত</div>
        </div>

        <div className="bg-white p-4 rounded-lg border-2 border-purple-200">
          <Book className="w-8 h-8 text-purple-600 mb-2" />
          <div className="text-2xl font-bold text-gray-900">{booksdonated}</div>
          <div className="text-sm text-gray-600">বই দান</div>
        </div>
      </div>

      {/* Monthly Goal Progress */}
      <div className="bg-white p-6 rounded-lg border-2 border-purple-200 mb-6">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Target className="w-5 h-5 text-purple-600" />
            <h4 className="font-semibold text-gray-900">মাসিক লক্ষ্য</h4>
          </div>
          <span className="text-sm text-gray-600">
            ৳{totalDonations.toLocaleString()} / ৳{monthlyGoal.toLocaleString()}
          </span>
        </div>
        <Progress value={progressPercentage} className="h-3 mb-2" />
        <p className="text-center text-purple-700 font-semibold">
          {progressPercentage.toFixed(1)}% সম্পন্ন
        </p>
      </div>

      {/* Growth Indicator */}
      {previousMonthTotal > 0 && (
        <div className={`p-4 rounded-lg border-2 mb-6 ${
          isGrowthPositive 
            ? 'bg-green-50 border-green-200' 
            : 'bg-red-50 border-red-200'
        }`}>
          <div className="flex items-center gap-3">
            {isGrowthPositive ? (
              <TrendingUp className="w-6 h-6 text-green-600" />
            ) : (
              <TrendingDown className="w-6 h-6 text-red-600" />
            )}
            <div>
              <p className={`font-semibold ${isGrowthPositive ? 'text-green-900' : 'text-red-900'}`}>
                গত মাসের তুলনায় {Math.abs(growthPercentage).toFixed(1)}% {isGrowthPositive ? 'বৃদ্ধি' : 'হ্রাস'}
              </p>
              <p className={`text-sm ${isGrowthPositive ? 'text-green-700' : 'text-red-700'}`}>
                পূর্ববর্তী মাস: ৳{previousMonthTotal.toLocaleString()}
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Impact Summary */}
      <div className="bg-gradient-to-r from-yellow-50 to-orange-50 p-6 rounded-lg border-2 border-yellow-200">
        <div className="flex items-start gap-3">
          <Award className="w-8 h-8 text-yellow-600 flex-shrink-0" />
          <div>
            <h4 className="font-semibold text-gray-900 mb-2">আপনার প্রভাব</h4>
            <ul className="text-sm text-gray-700 space-y-1">
              <li>✅ {studentsHelped} জন শিক্ষার্থীর জীবন পরিবর্তন করেছেন</li>
              <li>✅ {booksdonated}টি বই দান করে শিক্ষার প্রসার ঘটিয়েছেন</li>
              <li>✅ গড়ে প্রতিটি দান ৳{(totalDonations / donationsCount).toLocaleString()} টাকা</li>
              <li>✅ সম্ভাব্য ট্যাক্স সুবিধা: ৳{(totalDonations * 0.25).toLocaleString()}</li>
            </ul>
          </div>
        </div>
      </div>
    </Card>
  );
}
