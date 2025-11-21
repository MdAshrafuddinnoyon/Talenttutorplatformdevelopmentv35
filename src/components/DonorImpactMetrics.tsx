import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Skeleton } from './ui/skeleton';
import { Heart, Users, TrendingUp, Gift, AlertCircle } from 'lucide-react';
import { motion } from 'motion/react';
import { donorApi } from '../utils/apiClient';
import { Button } from './ui/button';

interface DonorImpactMetricsProps {
  donorId: string;
  language: 'bn' | 'en';
}

const content = {
  bn: {
    totalDonated: 'মোট দান',
    studentsHelped: 'উপকৃত ছাত্র',
    donationsCount: 'দানের সংখ্যা',
    itemsDonated: 'দান করা আইটেম',
    loadingMetrics: 'মেট্রিক্স লোড হচ্ছে...',
    errorLoading: 'মেট্রিক্স লোড করতে সমস্যা হয়েছে',
    tryAgain: 'আবার চেষ্টা করুন',
    yourImpact: 'আপনার প্রভাব',
  },
  en: {
    totalDonated: 'Total Donated',
    studentsHelped: 'Students Helped',
    donationsCount: 'Donations Made',
    itemsDonated: 'Items Donated',
    loadingMetrics: 'Loading metrics...',
    errorLoading: 'Error loading metrics',
    tryAgain: 'Try Again',
    yourImpact: 'Your Impact',
  },
};

export function DonorImpactMetrics({ donorId, language }: DonorImpactMetricsProps) {
  const t = content[language];
  const [metrics, setMetrics] = useState({
    totalDonated: 0,
    studentsHelped: 0,
    donationsCount: 0,
    itemsDonated: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchMetrics();
  }, [donorId]);

  const fetchMetrics = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await donorApi.getImpact(donorId);

      if (response.success && response.data) {
        setMetrics(response.data.impact || {
          totalDonated: 0,
          studentsHelped: 0,
          donationsCount: 0,
          itemsDonated: 0,
        });
      } else {
        setError(response.error || t.errorLoading);
      }
    } catch (err) {
      console.error('Error fetching metrics:', err);
      setError(t.errorLoading);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {[1, 2, 3, 4].map((i) => (
          <Skeleton key={i} className="h-32" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <h3 className="text-xl mb-2">{t.errorLoading}</h3>
        <p className="text-sm text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchMetrics} variant="outline">
          {t.tryAgain}
        </Button>
      </Card>
    );
  }

  const stats = [
    {
      label: t.totalDonated,
      value: `৳${metrics.totalDonated.toLocaleString()}`,
      icon: Heart,
      color: 'from-emerald-500 to-teal-600',
      bgColor: 'bg-emerald-500/10',
    },
    {
      label: t.studentsHelped,
      value: metrics.studentsHelped.toString(),
      icon: Users,
      color: 'from-blue-500 to-cyan-600',
      bgColor: 'bg-blue-500/10',
    },
    {
      label: t.donationsCount,
      value: metrics.donationsCount.toString(),
      icon: TrendingUp,
      color: 'from-purple-500 to-pink-600',
      bgColor: 'bg-purple-500/10',
    },
    {
      label: t.itemsDonated,
      value: metrics.itemsDonated.toString(),
      icon: Gift,
      color: 'from-orange-500 to-red-600',
      bgColor: 'bg-orange-500/10',
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1 }}
        >
          <Card className="p-6 hover:shadow-lg transition-all duration-300">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-3 rounded-lg ${stat.bgColor}`}>
                <stat.icon className={`h-6 w-6 bg-gradient-to-br ${stat.color} bg-clip-text text-transparent`} />
              </div>
            </div>
            <div>
              <p className="text-sm text-muted-foreground mb-1">{stat.label}</p>
              <p className="text-3xl">{stat.value}</p>
            </div>
          </Card>
        </motion.div>
      ))}
    </div>
  );
}
