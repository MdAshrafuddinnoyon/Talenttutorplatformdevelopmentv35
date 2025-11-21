import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ScrollArea } from './ui/scroll-area';
import {
  BarChart3, TrendingUp, Users, Mail, Eye, MousePointerClick,
  AlertCircle, CheckCircle, XCircle, Calendar, Download,
  RefreshCw, Target, Award
} from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { projectId, publicAnonKey } from '../utils/supabase/info';
import {
  LineChart, Line, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer
} from 'recharts';

interface NewsletterAnalyticsProps {
  language: 'bn' | 'en';
}

interface Analytics {
  overview: {
    totalSubscribers: number;
    activeSubscribers: number;
    totalCampaigns: number;
    campaignsSent: number;
    totalEmailsSent: number;
    averageOpenRate: string;
    averageClickRate: string;
    bounceRate: string;
  };
  monthlyGrowth: Array<{
    month: string;
    count: number;
  }>;
  topCampaigns: Array<{
    id: string;
    name: string;
    openRate: string;
    clickRate: string;
    sent: number;
  }>;
}

const translations = {
  bn: {
    title: 'নিউজলেটার অ্যানালিটিক্স',
    overview: 'সংক্ষিপ্ত বিবরণ',
    performance: 'পারফরম্যান্স',
    topCampaigns: 'শীর্ষ ক্যাম্পেইন',
    subscriberGrowth: 'সাবস্ক্রাইবার বৃদ্ধি',
    totalSubscribers: 'মোট সাবস্ক্রাইবার',
    activeSubscribers: 'সক্রিয় সাবস্ক্রাইবার',
    totalCampaigns: 'মোট ক্যাম্পেইন',
    campaignsSent: 'পাঠানো ক্যাম্পেইন',
    totalEmailsSent: 'মোট ইমেইল পাঠানো',
    averageOpenRate: 'গড় ওপেন রেট',
    averageClickRate: 'গড় ক্লিক রেট',
    bounceRate: 'বাউন্স রেট',
    openRate: 'ওপেন রেট',
    clickRate: 'ক্লিক রেট',
    sent: 'পাঠানো',
    loading: 'লোড হচ্ছে...',
    refresh: 'রিফ্রেশ',
    exportReport: 'রিপোর্ট এক্সপোর্ট',
    noData: 'কোনো ডেটা নেই',
    last6Months: 'গত ৬ মাস',
    campaignName: 'ক্যাম্পেইনের নাম',
    emailsSent: 'ইমেইল পাঠানো',
    performance: 'পারফরম্যান্স',
  },
  en: {
    title: 'Newsletter Analytics',
    overview: 'Overview',
    performance: 'Performance',
    topCampaigns: 'Top Campaigns',
    subscriberGrowth: 'Subscriber Growth',
    totalSubscribers: 'Total Subscribers',
    activeSubscribers: 'Active Subscribers',
    totalCampaigns: 'Total Campaigns',
    campaignsSent: 'Campaigns Sent',
    totalEmailsSent: 'Total Emails Sent',
    averageOpenRate: 'Average Open Rate',
    averageClickRate: 'Average Click Rate',
    bounceRate: 'Bounce Rate',
    openRate: 'Open Rate',
    clickRate: 'Click Rate',
    sent: 'Sent',
    loading: 'Loading...',
    refresh: 'Refresh',
    exportReport: 'Export Report',
    noData: 'No data available',
    last6Months: 'Last 6 Months',
    campaignName: 'Campaign Name',
    emailsSent: 'Emails Sent',
    performance: 'Performance',
  }
};

const COLORS = ['#8b5cf6', '#3b82f6', '#10b981', '#f59e0b', '#ef4444', '#ec4899'];

export function NewsletterAnalytics({ language = 'bn' }: NewsletterAnalyticsProps) {
  const t = translations[language];
  const [analytics, setAnalytics] = useState<Analytics | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-5b21d3ea/newsletter/analytics`,
        {
          headers: {
            'Authorization': `Bearer ${publicAnonKey}`,
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.analytics);
      } else {
        // Use default empty analytics if API not available
        console.log('Newsletter analytics API not available, using default data');
        setAnalytics({
          overview: {
            totalSubscribers: 0,
            activeSubscribers: 0,
            totalCampaigns: 0,
            campaignsSent: 0,
            totalEmailsSent: 0,
            averageOpenRate: '0%',
            averageClickRate: '0%',
            bounceRate: '0%',
          },
          monthlyGrowth: [],
          topCampaigns: [],
        });
      }
    } catch (error) {
      // Use default empty analytics if API not available
      console.log('Newsletter analytics API not available, using default data');
      setAnalytics({
        overview: {
          totalSubscribers: 0,
          activeSubscribers: 0,
          totalCampaigns: 0,
          campaignsSent: 0,
          totalEmailsSent: 0,
          averageOpenRate: '0%',
          averageClickRate: '0%',
          bounceRate: '0%',
        },
        monthlyGrowth: [],
        topCampaigns: [],
      });
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
    if (!analytics) return;

    const reportData = {
      overview: analytics.overview,
      topCampaigns: analytics.topCampaigns,
      generatedAt: new Date().toISOString(),
    };

    const blob = new Blob([JSON.stringify(reportData, null, 2)], { type: 'application/json' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `newsletter-analytics-${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    toast.success(language === 'bn' ? 'রিপোর্ট এক্সপোর্ট করা হয়েছে' : 'Report exported');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-96">
        <RefreshCw className="h-8 w-8 animate-spin text-purple-600" />
      </div>
    );
  }

  if (!analytics) {
    return (
      <div className="flex flex-col items-center justify-center h-96 text-muted-foreground">
        <BarChart3 className="h-12 w-12 mb-3 opacity-50" />
        <p>{t.noData}</p>
      </div>
    );
  }

  const overview = analytics.overview;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="flex items-center gap-2">
            <BarChart3 className="h-6 w-6 text-purple-600" />
            {t.title}
          </h2>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={exportReport} className="gap-2">
            <Download className="h-4 w-4" />
            {t.exportReport}
          </Button>
          <Button variant="outline" onClick={loadAnalytics} size="icon">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.totalSubscribers}</p>
                <h3 className="mt-2">{overview.totalSubscribers}</h3>
                <p className="text-xs text-green-600 mt-1">
                  {overview.activeSubscribers} {language === 'bn' ? 'সক্রিয়' : 'active'}
                </p>
              </div>
              <Users className="h-8 w-8 text-purple-600" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.campaignsSent}</p>
                <h3 className="mt-2">{overview.campaignsSent}</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  {language === 'bn' ? 'মোট' : 'of'} {overview.totalCampaigns}
                </p>
              </div>
              <Target className="h-8 w-8 text-blue-600" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.averageOpenRate}</p>
                <h3 className="mt-2">{overview.averageOpenRate}%</h3>
                <p className="text-xs text-green-600 mt-1">
                  {overview.averageClickRate}% {language === 'bn' ? 'ক্লিক রেট' : 'CTR'}
                </p>
              </div>
              <Eye className="h-8 w-8 text-green-600" />
            </div>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{t.totalEmailsSent}</p>
                <h3 className="mt-2">{overview.totalEmailsSent.toLocaleString()}</h3>
                <p className="text-xs text-orange-600 mt-1">
                  {overview.bounceRate}% {language === 'bn' ? 'বাউন্স' : 'bounce'}
                </p>
              </div>
              <Mail className="h-8 w-8 text-orange-600" />
            </div>
          </Card>
        </motion.div>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Subscriber Growth Chart */}
        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-purple-600" />
            {t.subscriberGrowth}
          </h3>
          <p className="text-sm text-muted-foreground mb-4">{t.last6Months}</p>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={analytics.monthlyGrowth}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="month" 
                tick={{ fontSize: 12 }}
              />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#8b5cf6" />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Top Campaigns */}
        <Card className="p-6">
          <h3 className="mb-4 flex items-center gap-2">
            <Award className="h-5 w-5 text-purple-600" />
            {t.topCampaigns}
          </h3>
          <ScrollArea className="h-[300px]">
            <div className="space-y-3">
              {analytics.topCampaigns.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-8">
                  {t.noData}
                </p>
              ) : (
                analytics.topCampaigns.map((campaign, index) => (
                  <motion.div
                    key={campaign.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                  >
                    <Card className="p-4">
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline">{index + 1}</Badge>
                            <p className="font-medium truncate">{campaign.name}</p>
                          </div>
                          <p className="text-xs text-muted-foreground mt-1">
                            {campaign.sent.toLocaleString()} {t.sent}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-4 mt-3">
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">{t.openRate}</span>
                            <span className="text-xs font-medium">{campaign.openRate}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-green-600 rounded-full"
                              style={{ width: `${campaign.openRate}%` }}
                            />
                          </div>
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-xs text-muted-foreground">{t.clickRate}</span>
                            <span className="text-xs font-medium">{campaign.clickRate}%</span>
                          </div>
                          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-600 rounded-full"
                              style={{ width: `${campaign.clickRate}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                ))
              )}
            </div>
          </ScrollArea>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card className="p-6">
        <h3 className="mb-4 flex items-center gap-2">
          <BarChart3 className="h-5 w-5 text-purple-600" />
          {t.performance}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-3">
              <Eye className="h-10 w-10 text-green-600" />
            </div>
            <p className="text-3xl font-bold">{overview.averageOpenRate}%</p>
            <p className="text-sm text-muted-foreground mt-1">{t.averageOpenRate}</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-blue-100 mb-3">
              <MousePointerClick className="h-10 w-10 text-blue-600" />
            </div>
            <p className="text-3xl font-bold">{overview.averageClickRate}%</p>
            <p className="text-sm text-muted-foreground mt-1">{t.averageClickRate}</p>
          </div>
          
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-orange-100 mb-3">
              <AlertCircle className="h-10 w-10 text-orange-600" />
            </div>
            <p className="text-3xl font-bold">{overview.bounceRate}%</p>
            <p className="text-sm text-muted-foreground mt-1">{t.bounceRate}</p>
          </div>
        </div>
      </Card>

      {/* Industry Benchmarks Info */}
      <Card className="p-6 bg-purple-50 border-purple-200">
        <div className="flex items-start gap-3">
          <CheckCircle className="h-5 w-5 text-purple-600 mt-0.5" />
          <div>
            <h4 className="font-medium text-purple-900 mb-2">
              {language === 'bn' ? 'ইন্ডাস্ট্রি বেঞ্চমার্ক' : 'Industry Benchmarks'}
            </h4>
            <p className="text-sm text-purple-700">
              {language === 'bn' 
                ? 'শিক্ষা খাতের জন্য গড় ওপেন রেট ২১-২৫% এবং ক্লিক রেট ২-৩%। আপনার পারফরম্যান্স দেখুন এবং উন্নতি করুন!'
                : 'Average open rate for education sector is 21-25% and click rate is 2-3%. Compare your performance and improve!'
              }
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
