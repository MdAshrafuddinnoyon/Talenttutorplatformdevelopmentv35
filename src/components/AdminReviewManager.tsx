import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import {
  CheckCircle, XCircle, Clock, Star, Search, Filter,
  MessageSquare, TrendingUp, BarChart3, Globe2, Facebook,
  Eye, Trash2, RefreshCw
} from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { ListAvatar } from './ui/profile-avatar';
import {
  type Review,
  type ReviewSource,
  type ReviewerType,
  mockReviews,
  getReviewSourceIcon,
  getReviewSourceName,
  getReviewerTypeLabel,
  getReviewerTypeColor,
  getReviewStats,
  calculateAverageRating
} from '../utils/reviewsData';

interface AdminReviewManagerProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'রিভিউ ম্যানেজমেন্ট',
    subtitle: 'সব রিভিউ পরিচালনা ও অনুমোদন করুন',
    tabs: {
      pending: 'অপেক্ষমাণ',
      approved: 'অনুমোদিত',
      rejected: 'প্রত্যাখ্যাত',
      all: 'সব রিভিউ',
      stats: 'পরিসংখ্যান',
      external: 'বাহ্যিক সংযোগ'
    },
    search: 'রিভিউ খুঁজুন...',
    filterBySource: 'সোর্স দ্বারা ফিল্টার',
    filterByType: 'টাইপ দ্বারা ফিল্টার',
    allSources: 'সব সোর্স',
    allTypes: 'সব টাইপ',
    approve: 'অনুমোদন',
    reject: 'প্রত্যাখ্যান',
    delete: 'মুছুন',
    view: 'দেখুন',
    rating: 'রেটিং',
    source: 'সোর্স',
    type: 'টাইপ',
    date: 'তারিখ',
    status: 'অবস্থা',
    actions: 'অ্যাকশন',
    noReviews: 'কোনো রিভিউ নেই',
    confirmApprove: 'এই রিভিউ অনুমোদন করবেন?',
    confirmReject: 'এই রিভিউ প্রত্যাখ্যান করবেন?',
    confirmDelete: 'এই রিভিউ মুছে ফেলবেন?',
    rejectReason: 'প্রত্যাখ্যানের কারণ (ঐচ্ছিক)',
    approved: 'অনুমোদিত',
    rejected: 'প্রত্যাখ্যাত',
    deleted: 'মুছে ফেলা হয়েছে',
    stats: {
      total: 'মোট রিভিউ',
      average: 'গড় রেটিং',
      pending: 'অপেক্ষমাণ',
      approved: 'অনুমোদিত',
      platform: 'প্ল্যাটফর্ম',
      google: 'গুগল',
      facebook: 'ফেসবুক'
    }
  },
  en: {
    title: 'Review Management',
    subtitle: 'Manage and approve all reviews',
    tabs: {
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      all: 'All Reviews',
      stats: 'Statistics',
      external: 'External Connections'
    },
    search: 'Search reviews...',
    filterBySource: 'Filter by Source',
    filterByType: 'Filter by Type',
    allSources: 'All Sources',
    allTypes: 'All Types',
    approve: 'Approve',
    reject: 'Reject',
    delete: 'Delete',
    view: 'View',
    rating: 'Rating',
    source: 'Source',
    type: 'Type',
    date: 'Date',
    status: 'Status',
    actions: 'Actions',
    noReviews: 'No reviews found',
    confirmApprove: 'Approve this review?',
    confirmReject: 'Reject this review?',
    confirmDelete: 'Delete this review?',
    rejectReason: 'Rejection Reason (Optional)',
    approved: 'Approved',
    rejected: 'Rejected',
    deleted: 'Deleted',
    stats: {
      total: 'Total Reviews',
      average: 'Average Rating',
      pending: 'Pending',
      approved: 'Approved',
      platform: 'Platform',
      google: 'Google',
      facebook: 'Facebook'
    }
  }
};

export function AdminReviewManager({ language }: AdminReviewManagerProps) {
  const t = content[language];
  const [reviews, setReviews] = useState<Review[]>(mockReviews);
  const [searchQuery, setSearchQuery] = useState('');
  const [sourceFilter, setSourceFilter] = useState<ReviewSource | 'all'>('all');
  const [typeFilter, setTypeFilter] = useState<ReviewerType | 'all'>('all');

  const stats = getReviewStats();

  // Filter reviews
  const filteredReviews = reviews.filter(review => {
    const matchesSearch = searchQuery === '' ||
      review.reviewerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      review.text.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesSource = sourceFilter === 'all' || review.source === sourceFilter;
    const matchesType = typeFilter === 'all' || review.reviewerType === typeFilter;

    return matchesSearch && matchesSource && matchesType;
  });

  const handleApprove = (reviewId: string) => {
    setReviews(reviews.map(r =>
      r.id === reviewId
        ? { ...r, status: 'approved', approvedBy: 'admin-001', approvedAt: new Date() }
        : r
    ));
    toast.success(t.approved);
  };

  const handleReject = (reviewId: string, reason?: string) => {
    setReviews(reviews.map(r =>
      r.id === reviewId
        ? { ...r, status: 'rejected', rejectedReason: reason }
        : r
    ));
    toast.error(t.rejected);
  };

  const handleDelete = (reviewId: string) => {
    setReviews(reviews.filter(r => r.id !== reviewId));
    toast.success(t.deleted);
  };

  const ReviewCard = ({ review }: { review: Review }) => {
    const typeColor = getReviewerTypeColor(review.reviewerType);
    
    return (
      <Card className="p-6 hover:shadow-lg transition-shadow">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-start gap-4">
            <ListAvatar
              src={review.reviewerImage}
              alt={review.reviewerName}
              fallback={review.reviewerName.charAt(0)}
              size="lg"
            />
            <div>
              <h4 className={`text-gray-900 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {review.reviewerName}
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                <Badge variant="outline" className={`bg-${typeColor}-50 text-${typeColor}-700 border-${typeColor}-200`}>
                  {getReviewerTypeLabel(review.reviewerType, language)}
                </Badge>
                <Badge variant="outline">
                  {getReviewSourceIcon(review.source)} {getReviewSourceName(review.source, language)}
                </Badge>
                {review.verified && (
                  <Badge variant="outline" className="bg-blue-50 text-blue-700">
                    ✓ Verified
                  </Badge>
                )}
              </div>
              {review.reviewerLocation && (
                <p className="text-sm text-gray-500 mt-1">{review.reviewerLocation}</p>
              )}
            </div>
          </div>

          <div className="text-right">
            <div className="flex items-center gap-1 mb-1">
              {Array.from({ length: review.rating }).map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-xs text-gray-500">
              {new Date(review.date).toLocaleDateString(language === 'bn' ? 'bn-BD' : 'en-US')}
            </p>
          </div>
        </div>

        {review.title && (
          <h5 className={`mb-2 text-gray-800 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {review.title}
          </h5>
        )}

        <p className={`text-gray-700 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {review.text}
        </p>

        <div className="flex items-center justify-between pt-4 border-t">
          <div className="flex items-center gap-2">
            {review.status === 'pending' && (
              <Badge className="bg-yellow-100 text-yellow-800">
                <Clock className="w-3 h-3 mr-1" />
                {t.tabs.pending}
              </Badge>
            )}
            {review.status === 'approved' && (
              <Badge className="bg-green-100 text-green-800">
                <CheckCircle className="w-3 h-3 mr-1" />
                {t.tabs.approved}
              </Badge>
            )}
            {review.status === 'rejected' && (
              <Badge className="bg-red-100 text-red-800">
                <XCircle className="w-3 h-3 mr-1" />
                {t.tabs.rejected}
              </Badge>
            )}
          </div>

          <div className="flex items-center gap-2">
            {review.status === 'pending' && (
              <>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleApprove(review.id)}
                  className="text-green-600 border-green-200 hover:bg-green-50"
                >
                  <CheckCircle className="w-4 h-4 mr-1" />
                  {t.approve}
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => handleReject(review.id)}
                  className="text-red-600 border-red-200 hover:bg-red-50"
                >
                  <XCircle className="w-4 h-4 mr-1" />
                  {t.reject}
                </Button>
              </>
            )}
            <Button
              size="sm"
              variant="ghost"
              onClick={() => handleDelete(review.id)}
              className="text-gray-600 hover:text-red-600"
            >
              <Trash2 className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </Card>
    );
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className={`text-2xl text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.title}
        </h2>
        <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.subtitle}
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm text-gray-600 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.stats.total}
              </p>
              <p className="text-2xl text-gray-900">{stats.total}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-emerald-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm text-gray-600 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.stats.average}
              </p>
              <div className="flex items-center gap-1">
                <p className="text-2xl text-gray-900">{stats.averageRating}</p>
                <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
              </div>
            </div>
            <TrendingUp className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm text-gray-600 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.stats.pending}
              </p>
              <p className="text-2xl text-gray-900">
                {reviews.filter(r => r.status === 'pending').length}
              </p>
            </div>
            <Clock className="w-8 h-8 text-yellow-600" />
          </div>
        </Card>

        <Card className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <p className={`text-sm text-gray-600 mb-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.stats.approved}
              </p>
              <p className="text-2xl text-gray-900">
                {reviews.filter(r => r.status === 'approved').length}
              </p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </Card>
      </div>

      {/* Filters */}
      <Card className="p-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder={t.search}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>

          <Select value={sourceFilter} onValueChange={(value: any) => setSourceFilter(value)}>
            <SelectTrigger>
              <SelectValue placeholder={t.filterBySource} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allSources}</SelectItem>
              <SelectItem value="platform">⭐ {language === 'bn' ? 'প্ল্যাটফর্ম' : 'Platform'}</SelectItem>
              <SelectItem value="google">🔍 Google</SelectItem>
              <SelectItem value="facebook">👍 Facebook</SelectItem>
            </SelectContent>
          </Select>

          <Select value={typeFilter} onValueChange={(value: any) => setTypeFilter(value)}>
            <SelectTrigger>
              <SelectValue placeholder={t.filterByType} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t.allTypes}</SelectItem>
              <SelectItem value="guardian">{getReviewerTypeLabel('guardian', language)}</SelectItem>
              <SelectItem value="teacher">{getReviewerTypeLabel('teacher', language)}</SelectItem>
              <SelectItem value="student">{getReviewerTypeLabel('student', language)}</SelectItem>
              <SelectItem value="donor">{getReviewerTypeLabel('donor', language)}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </Card>

      {/* Tabs */}
      <Tabs defaultValue="pending" className="space-y-6">
        <TabsList className="grid grid-cols-4 lg:grid-cols-6">
          <TabsTrigger value="pending">{t.tabs.pending}</TabsTrigger>
          <TabsTrigger value="approved">{t.tabs.approved}</TabsTrigger>
          <TabsTrigger value="rejected">{t.tabs.rejected}</TabsTrigger>
          <TabsTrigger value="all">{t.tabs.all}</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {filteredReviews.filter(r => r.status === 'pending').map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
          {filteredReviews.filter(r => r.status === 'pending').length === 0 && (
            <Card className="p-12 text-center">
              <Clock className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <p className={`text-gray-500 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.noReviews}
              </p>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {filteredReviews.filter(r => r.status === 'approved').map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {filteredReviews.filter(r => r.status === 'rejected').map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {filteredReviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  );
}
