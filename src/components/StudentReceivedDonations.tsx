import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Skeleton } from './ui/skeleton';
import { ScrollArea } from './ui/scroll-area';
import { Heart, User, Calendar, MessageCircle, Download, AlertCircle, Gift } from 'lucide-react';
import { motion } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { studentApi } from '../utils/apiClient';

interface Donation {
  id: string;
  donorName: string;
  type: string;
  amount?: number;
  items?: string[];
  message?: string;
  date: string;
  receiptNumber?: string;
  anonymous: boolean;
}

interface StudentReceivedDonationsProps {
  studentId: string;
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'প্রাপ্ত দান',
    subtitle: 'আপনার জন্য আসা সব দান',
    loading: 'লোড হচ্ছে...',
    noDonations: 'এখনো কোনো দান পাননি',
    noDonationsDesc: 'দাতারা আপনার আবেদন দেখে সাহায্য করবেন',
    donatedBy: 'দাতা',
    anonymous: 'বেনামী দাতা',
    amount: 'পরিমাণ',
    items: 'আইটেম',
    message: 'বার্তা',
    receivedOn: 'প্রাপ্ত তারিখ',
    downloadReceipt: 'রসিদ ডাউনলোড',
    totalReceived: 'মোট প্রাপ্ত',
    donationsCount: 'দানের সংখ্যা',
    errorLoading: 'দান লোড করতে সমস্যা হয়েছে',
    tryAgain: 'আবার চেষ্টা করুন',
  },
  en: {
    title: 'Received Donations',
    subtitle: 'All donations you have received',
    loading: 'Loading...',
    noDonations: 'No donations received yet',
    noDonationsDesc: 'Donors will help you after reviewing your application',
    donatedBy: 'Donated by',
    anonymous: 'Anonymous Donor',
    amount: 'Amount',
    items: 'Items',
    message: 'Message',
    receivedOn: 'Received on',
    downloadReceipt: 'Download Receipt',
    totalReceived: 'Total Received',
    donationsCount: 'Total Donations',
    errorLoading: 'Error loading donations',
    tryAgain: 'Try Again',
  },
};

export function StudentReceivedDonations({ studentId, language }: StudentReceivedDonationsProps) {
  const t = content[language];
  const [donations, setDonations] = useState<Donation[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchDonations();
  }, [studentId]);

  const fetchDonations = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await studentApi.getReceivedDonations(studentId);

      if (response.success && response.data) {
        setDonations(response.data.donations || []);
      } else {
        setError(response.error || t.errorLoading);
        toast.error(response.error || t.errorLoading);
      }
    } catch (err) {
      console.error('Error fetching donations:', err);
      setError(t.errorLoading);
      toast.error(t.errorLoading);
    } finally {
      setLoading(false);
    }
  };

  const handleDownloadReceipt = (receiptNumber: string) => {
    toast.success(`${t.downloadReceipt}: ${receiptNumber}`);
  };

  const totalAmount = donations.reduce((sum, d) => sum + (d.amount || 0), 0);

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="grid gap-4 md:grid-cols-2">
          <Skeleton className="h-24" />
          <Skeleton className="h-24" />
        </div>
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <Skeleton key={i} className="h-32" />
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <Card className="p-8 text-center">
        <AlertCircle className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <h3 className="text-xl mb-2">{t.errorLoading}</h3>
        <p className="text-sm text-muted-foreground mb-4">{error}</p>
        <Button onClick={fetchDonations} variant="outline">
          {t.tryAgain}
        </Button>
      </Card>
    );
  }

  if (donations.length === 0) {
    return (
      <Card className="p-12 text-center">
        <Gift className="h-16 w-16 mx-auto text-muted-foreground mb-4 opacity-50" />
        <h3 className="text-2xl mb-2">{t.noDonations}</h3>
        <p className="text-muted-foreground">{t.noDonationsDesc}</p>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Stats */}
      <div>
        <h2 className="text-2xl mb-2">{t.title}</h2>
        <p className="text-sm text-muted-foreground mb-4">{t.subtitle}</p>

        {/* Summary Cards */}
        <div className="grid gap-4 md:grid-cols-2 mb-6">
          <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-teal-600/10 border-emerald-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t.totalReceived}</p>
                <p className="text-3xl">৳{totalAmount.toLocaleString()}</p>
              </div>
              <Heart className="h-12 w-12 text-emerald-500" />
            </div>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-500/10 to-cyan-600/10 border-blue-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground mb-1">{t.donationsCount}</p>
                <p className="text-3xl">{donations.length}</p>
              </div>
              <Gift className="h-12 w-12 text-blue-500" />
            </div>
          </Card>
        </div>
      </div>

      {/* Donations List */}
      <ScrollArea className="h-[600px] pr-4">
        <div className="space-y-4">
          {donations.map((donation, index) => (
            <motion.div
              key={donation.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300">
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-full">
                      {donation.anonymous ? (
                        <User className="h-5 w-5 text-white" />
                      ) : (
                        <Heart className="h-5 w-5 text-white" />
                      )}
                    </div>
                    <div>
                      <h3 className="text-lg">
                        {donation.anonymous ? t.anonymous : donation.donorName}
                      </h3>
                      <p className="text-sm text-muted-foreground">
                        {new Date(donation.date).toLocaleDateString(
                          language === 'bn' ? 'bn-BD' : 'en-US',
                          { year: 'numeric', month: 'long', day: 'numeric' }
                        )}
                      </p>
                    </div>
                  </div>

                  <Badge variant="secondary" className="ml-2">
                    {donation.type}
                  </Badge>
                </div>

                {/* Amount or Items */}
                {donation.amount && donation.amount > 0 && (
                  <div className="mb-4 p-4 bg-emerald-500/10 rounded-lg border border-emerald-200">
                    <p className="text-sm text-muted-foreground mb-1">{t.amount}</p>
                    <p className="text-2xl text-emerald-600">৳{donation.amount.toLocaleString()}</p>
                  </div>
                )}

                {donation.items && donation.items.length > 0 && (
                  <div className="mb-4">
                    <p className="text-sm text-muted-foreground mb-2">{t.items}:</p>
                    <div className="flex flex-wrap gap-2">
                      {donation.items.map((item, i) => (
                        <Badge key={i} variant="outline">
                          {item}
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Message */}
                {donation.message && (
                  <div className="mb-4 p-4 bg-muted/50 rounded-lg">
                    <div className="flex items-start gap-2">
                      <MessageCircle className="h-4 w-4 mt-1 text-muted-foreground" />
                      <div>
                        <p className="text-sm text-muted-foreground mb-1">{t.message}:</p>
                        <p className="text-sm italic">{donation.message}</p>
                      </div>
                    </div>
                  </div>
                )}

                {/* Actions */}
                {donation.receiptNumber && (
                  <div className="flex items-center justify-between pt-4 border-t">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{t.receivedOn}: {new Date(donation.date).toLocaleDateString()}</span>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleDownloadReceipt(donation.receiptNumber!)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      {t.downloadReceipt}
                    </Button>
                  </div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </ScrollArea>
    </div>
  );
}
