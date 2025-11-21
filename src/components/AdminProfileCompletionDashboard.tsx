import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { 
  Users, 
  CheckCircle, 
  Clock,
  AlertCircle,
  TrendingUp,
  RefreshCw,
  BarChart3,
  PieChart
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';

interface AdminProfileCompletionDashboardProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'প্রোফাইল সম্পূর্ণতার সারসংক্ষেপ',
    totalProfiles: 'মোট প্রোফাইল',
    byStatus: 'স্ট্যাটাস অনুযায়ী',
    byCompletion: 'সম্পূর্ণতার অনুপাত',
    draft: 'খসড়া',
    pendingApproval: 'পর্যালোচনাধীন',
    approved: 'অনুমোদিত',
    needsUpdate: 'আপডেট প্রয়োজন',
    rejected: 'প্রত্যাখ্যাত',
    complete: 'সম্পূর্ণ (১০০%)',
    almostComplete: 'প্রায় সম্পূর্ণ (৮০-৯৯%)',
    partial: 'আংশিক (৫০-৭৯%)',
    minimal: 'ন্যূনতম (৫০% এর কম)',
    refresh: 'রিফ্রেশ',
    loading: 'লোড হচ্ছে...',
    error: 'ডেটা লোড করতে ব্যর্থ',
    profiles: 'প্রোফাইল'
  },
  en: {
    title: 'Profile Completion Summary',
    totalProfiles: 'Total Profiles',
    byStatus: 'By Status',
    byCompletion: 'By Completion',
    draft: 'Draft',
    pendingApproval: 'Pending Review',
    approved: 'Approved',
    needsUpdate: 'Needs Update',
    rejected: 'Rejected',
    complete: 'Complete (100%)',
    almostComplete: 'Almost Complete (80-99%)',
    partial: 'Partial (50-79%)',
    minimal: 'Minimal (<50%)',
    refresh: 'Refresh',
    loading: 'Loading...',
    error: 'Failed to load data',
    profiles: 'Profiles'
  }
};

export function AdminProfileCompletionDashboard({ language }: AdminProfileCompletionDashboardProps) {
  const t = content[language];
  
  const [summary, setSummary] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  
  const loadSummary = async () => {
    try {
      setIsLoading(true);
      
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/server/make-server-5b21d3ea/student-profiles/completion-summary`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );
      
      if (response.ok) {
        const data = await response.json();
        setSummary(data.summary);
      } else {
        toast.error(t.error);
      }
    } catch (error) {
      console.error('Load summary error:', error);
      toast.error(t.error);
    } finally {
      setIsLoading(false);
    }
  };
  
  useEffect(() => {
    loadSummary();
  }, []);
  
  if (isLoading && !summary) {
    return (
      <Card className="p-8 text-center">
        <RefreshCw className="w-8 h-8 animate-spin mx-auto mb-3 text-blue-500" />
        <p className="text-gray-600">{t.loading}</p>
      </Card>
    );
  }
  
  if (!summary) {
    return (
      <Card className="p-8 text-center">
        <AlertCircle className="w-12 h-12 mx-auto mb-3 text-gray-400" />
        <p className="text-gray-600">{t.error}</p>
        <Button onClick={loadSummary} className="mt-4">
          <RefreshCw className="w-4 h-4 mr-2" />
          {t.refresh}
        </Button>
      </Card>
    );
  }
  
  const statusData = [
    { label: t.draft, value: summary.byStatus.draft, color: 'bg-gray-500' },
    { label: t.pendingApproval, value: summary.byStatus.pending_approval, color: 'bg-blue-500' },
    { label: t.approved, value: summary.byStatus.approved, color: 'bg-green-500' },
    { label: t.needsUpdate, value: summary.byStatus.needs_update, color: 'bg-orange-500' },
    { label: t.rejected, value: summary.byStatus.rejected, color: 'bg-red-500' }
  ];
  
  const completionData = [
    { label: t.complete, value: summary.completionRanges.complete, color: 'bg-green-500', percentage: 100 },
    { label: t.almostComplete, value: summary.completionRanges.almostComplete, color: 'bg-blue-500', percentage: 90 },
    { label: t.partial, value: summary.completionRanges.partial, color: 'bg-yellow-500', percentage: 65 },
    { label: t.minimal, value: summary.completionRanges.minimal, color: 'bg-red-500', percentage: 25 }
  ];
  
  const getPercentage = (value: number) => {
    return summary.total > 0 ? Math.round((value / summary.total) * 100) : 0;
  };
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <BarChart3 className="w-8 h-8 text-blue-600" />
          <div>
            <h2 className="text-2xl font-bold text-gray-900">{t.title}</h2>
            <p className="text-gray-600">
              {t.totalProfiles}: {summary.total}
            </p>
          </div>
        </div>
        <Button onClick={loadSummary} disabled={isLoading} variant="outline">
          <RefreshCw className={`w-4 h-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          {t.refresh}
        </Button>
      </div>
      
      {/* Total Profiles Card */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center">
              <Users className="w-8 h-8 text-white" />
            </div>
            <div>
              <p className="text-gray-600 mb-1">{t.totalProfiles}</p>
              <p className="text-4xl font-bold text-blue-600">{summary.total}</p>
            </div>
          </div>
          <TrendingUp className="w-12 h-12 text-blue-400" />
        </div>
      </Card>
      
      {/* Status Breakdown */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <PieChart className="w-6 h-6 text-purple-600" />
          <h3 className="text-xl font-semibold">{t.byStatus}</h3>
        </div>
        
        <div className="space-y-4">
          {statusData.map((item, index) => (
            <div key={index}>
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  <div className={`w-3 h-3 rounded-full ${item.color}`}></div>
                  <span className="text-gray-700">{item.label}</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-bold text-gray-900">{item.value}</span>
                  <span className="text-sm text-gray-500">
                    ({getPercentage(item.value)}%)
                  </span>
                </div>
              </div>
              <Progress 
                value={getPercentage(item.value)} 
                className={`h-2 ${item.color}`}
              />
            </div>
          ))}
        </div>
      </Card>
      
      {/* Completion Ranges */}
      <Card className="p-6">
        <div className="flex items-center gap-3 mb-6">
          <CheckCircle className="w-6 h-6 text-green-600" />
          <h3 className="text-xl font-semibold">{t.byCompletion}</h3>
        </div>
        
        <div className="grid md:grid-cols-2 gap-4">
          {completionData.map((item, index) => (
            <Card key={index} className={`p-5 border-2 ${
              item.color === 'bg-green-500' ? 'border-green-200 bg-green-50' :
              item.color === 'bg-blue-500' ? 'border-blue-200 bg-blue-50' :
              item.color === 'bg-yellow-500' ? 'border-yellow-200 bg-yellow-50' :
              'border-red-200 bg-red-50'
            }`}>
              <div className="flex items-center justify-between mb-3">
                <h4 className="font-semibold text-gray-900">{item.label}</h4>
                <div className={`w-12 h-12 rounded-full ${item.color} flex items-center justify-center`}>
                  <span className="text-white font-bold">{item.value}</span>
                </div>
              </div>
              
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm text-gray-600">{t.profiles}</span>
                <span className="text-sm font-medium">
                  {getPercentage(item.value)}% {language === 'bn' ? 'এর' : 'of'} {t.totalProfiles}
                </span>
              </div>
              
              <Progress 
                value={item.percentage} 
                className={`h-3 ${item.color}`}
              />
              
              <div className="mt-2 text-xs text-gray-500 text-right">
                {item.percentage}% {language === 'bn' ? 'সম্পূর্ণ' : 'Complete'}
              </div>
            </Card>
          ))}
        </div>
      </Card>
      
      {/* Quick Stats */}
      <div className="grid md:grid-cols-4 gap-4">
        <Card className="p-5 bg-green-50 border-green-200">
          <div className="flex items-center gap-3 mb-2">
            <CheckCircle className="w-8 h-8 text-green-600" />
            <div>
              <p className="text-sm text-gray-600">{t.approved}</p>
              <p className="text-2xl font-bold text-green-700">{summary.byStatus.approved}</p>
            </div>
          </div>
          <Progress value={getPercentage(summary.byStatus.approved)} className="h-2 bg-green-500" />
        </Card>
        
        <Card className="p-5 bg-blue-50 border-blue-200">
          <div className="flex items-center gap-3 mb-2">
            <Clock className="w-8 h-8 text-blue-600" />
            <div>
              <p className="text-sm text-gray-600">{t.pendingApproval}</p>
              <p className="text-2xl font-bold text-blue-700">{summary.byStatus.pending_approval}</p>
            </div>
          </div>
          <Progress value={getPercentage(summary.byStatus.pending_approval)} className="h-2 bg-blue-500" />
        </Card>
        
        <Card className="p-5 bg-orange-50 border-orange-200">
          <div className="flex items-center gap-3 mb-2">
            <AlertCircle className="w-8 h-8 text-orange-600" />
            <div>
              <p className="text-sm text-gray-600">{t.needsUpdate}</p>
              <p className="text-2xl font-bold text-orange-700">{summary.byStatus.needs_update}</p>
            </div>
          </div>
          <Progress value={getPercentage(summary.byStatus.needs_update)} className="h-2 bg-orange-500" />
        </Card>
        
        <Card className="p-5 bg-gray-50 border-gray-200">
          <div className="flex items-center gap-3 mb-2">
            <Users className="w-8 h-8 text-gray-600" />
            <div>
              <p className="text-sm text-gray-600">{t.draft}</p>
              <p className="text-2xl font-bold text-gray-700">{summary.byStatus.draft}</p>
            </div>
          </div>
          <Progress value={getPercentage(summary.byStatus.draft)} className="h-2 bg-gray-500" />
        </Card>
      </div>
    </div>
  );
}
