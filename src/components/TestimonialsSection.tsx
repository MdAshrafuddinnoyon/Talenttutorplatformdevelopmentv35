import { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Star, Globe2, Facebook, ChevronLeft, ChevronRight, TrendingUp, MessageSquare } from 'lucide-react';
import { ListAvatar } from './ui/profile-avatar';
import {
  getFeaturedReviews,
  getReviewStats,
  getReviewSourceIcon,
  getReviewSourceName,
  getReviewerTypeLabel,
  getReviewerTypeColor,
  type Review
} from '../utils/reviewsData';

interface TestimonialsSectionProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'ব্যবহারকারীদের রিভিউ',
    subtitle: 'আমাদের প্ল্যাটফর্ম ব্যবহারকারীদের প্রকৃত অভিজ্ঞতা',
    totalReviews: 'মোট রিভিউ',
    averageRating: 'গড় রেটিং',
    verified: 'যাচাইকৃত',
    reviewSources: 'রিভিউ সোর্স',
    platform: 'প্ল্যাটফর্ম',
    google: 'Google',
    facebook: 'Facebook',
    viewAll: 'সব রিভিউ দেখুন',
    basedOn: 'ভিত্তি করে',
    reviews: 'রিভিউ',
    outOf: '/৫',
    excellent: 'অসাধারণ',
    posted: 'পোস্ট করেছেন',
    ago: 'আগে'
  },
  en: {
    title: 'User Reviews',
    subtitle: 'Genuine experiences from our platform users',
    totalReviews: 'Total Reviews',
    averageRating: 'Average Rating',
    verified: 'Verified',
    reviewSources: 'Review Sources',
    platform: 'Platform',
    google: 'Google',
    facebook: 'Facebook',
    viewAll: 'View All Reviews',
    basedOn: 'Based on',
    reviews: 'reviews',
    outOf: '/5',
    excellent: 'Excellent',
    posted: 'Posted by',
    ago: 'ago'
  }
};

export function TestimonialsSection({ language }: TestimonialsSectionProps) {
  const t = content[language];
  const [currentPage, setCurrentPage] = useState(0);
  
  // Get reviews data
  const featuredReviews = getFeaturedReviews(9); // Show 9 reviews total, 3 per page
  const stats = getReviewStats();
  
  // Pagination
  const reviewsPerPage = 3;
  const totalPages = Math.ceil(featuredReviews.length / reviewsPerPage);
  const currentReviews = featuredReviews.slice(
    currentPage * reviewsPerPage,
    (currentPage + 1) * reviewsPerPage
  );

  const handlePrev = () => {
    setCurrentPage((prev) => (prev === 0 ? totalPages - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => (prev === totalPages - 1 ? 0 : prev + 1));
  };

  const getTimeAgo = (date: Date): string => {
    const days = Math.floor((new Date().getTime() - new Date(date).getTime()) / (1000 * 60 * 60 * 24));
    if (days === 0) return language === 'bn' ? 'আজ' : 'Today';
    if (days === 1) return language === 'bn' ? '১ দিন আগে' : '1 day ago';
    if (days < 30) return language === 'bn' ? `${days} দিন আগে` : `${days} days ago`;
    const months = Math.floor(days / 30);
    if (months === 1) return language === 'bn' ? '১ মাস আগে' : '1 month ago';
    return language === 'bn' ? `${months} মাস আগে` : `${months} months ago`;
  };

  return (
    <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(16,185,129,0.3),transparent_50%),radial-gradient(circle_at_70%_80%,rgba(6,182,212,0.3),transparent_50%)]"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header Section - Google Style */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-white px-6 py-3 rounded-full shadow-md border border-gray-200 mb-6">
            <MessageSquare className="w-5 h-5 text-emerald-600" />
            <span className={`text-emerald-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.reviewSources}
            </span>
            <div className="flex items-center gap-2 ml-2 pl-2 border-l border-gray-300">
              <span className="text-lg">⭐</span>
              <span className="text-sm text-gray-600">{t.platform}</span>
              <span className="text-lg">🔍</span>
              <span className="text-sm text-gray-600">Google</span>
              <span className="text-lg">👍</span>
              <span className="text-sm text-gray-600">Facebook</span>
            </div>
          </div>

          <h2 className={`text-3xl sm:text-4xl text-gray-900 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.title}
          </h2>
          <p className={`text-gray-600 max-w-2xl mx-auto text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.subtitle}
          </p>
        </div>

        {/* Stats Card - Google Review Style */}
        <Card className="max-w-5xl mx-auto mb-12 p-8 bg-white shadow-lg border-2 border-gray-100">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Overall Rating */}
            <div className="text-center md:border-r border-gray-200">
              <div className="flex items-center justify-center gap-2 mb-3">
                <span className="text-5xl text-gray-900">{stats.averageRating}</span>
                <Star className="w-10 h-10 fill-yellow-400 text-yellow-400" />
              </div>
              <div className="flex items-center justify-center gap-1 mb-2">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`w-6 h-6 ${
                      i < Math.round(stats.averageRating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                ))}
              </div>
              <p className={`text-gray-600 text-sm ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.basedOn} <span className="font-semibold">{stats.total}</span> {t.reviews}
              </p>
            </div>

            {/* Rating Distribution */}
            <div className="space-y-2">
              {[5, 4, 3, 2, 1].map((rating) => {
                const count = stats.distribution[rating] || 0;
                const percentage = stats.total > 0 ? (count / stats.total) * 100 : 0;
                
                return (
                  <div key={rating} className="flex items-center gap-3">
                    <span className="text-sm text-gray-700 w-6">{rating}</span>
                    <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                    <div className="flex-1 bg-gray-200 rounded-full h-2.5 overflow-hidden">
                      <div
                        className="bg-gradient-to-r from-yellow-400 to-yellow-500 h-full rounded-full transition-all duration-500"
                        style={{ width: `${percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
                  </div>
                );
              })}
            </div>

            {/* Sources */}
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-emerald-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <span className="text-xl">⭐</span>
                  <span className={`text-sm text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {t.platform}
                  </span>
                </div>
                <Badge className="bg-emerald-600">
                  {stats.bySource.platform}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Globe2 className="w-5 h-5 text-blue-600" />
                  <span className={`text-sm text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    Google
                  </span>
                </div>
                <Badge className="bg-blue-600">
                  {stats.bySource.google}
                </Badge>
              </div>
              
              <div className="flex items-center justify-between p-3 bg-indigo-50 rounded-lg">
                <div className="flex items-center gap-2">
                  <Facebook className="w-5 h-5 text-indigo-600" />
                  <span className={`text-sm text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    Facebook
                  </span>
                </div>
                <Badge className="bg-indigo-600">
                  {stats.bySource.facebook}
                </Badge>
              </div>
            </div>
          </div>
        </Card>

        {/* Reviews Grid - Google Style Cards */}
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {currentReviews.map((review) => {
              const typeColor = getReviewerTypeColor(review.reviewerType);
              
              return (
                <Card
                  key={review.id}
                  className="p-6 hover:shadow-xl transition-all duration-300 bg-white border border-gray-200 hover:border-emerald-200"
                >
                  {/* Header */}
                  <div className="flex items-start gap-3 mb-4">
                    <ListAvatar
                      src={review.reviewerImage}
                      alt={review.reviewerName}
                      fallback={review.reviewerName.charAt(0)}
                      size="lg"
                      className="ring-2 ring-gray-100"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className={`text-gray-900 mb-1 truncate ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                        {review.reviewerName}
                      </h4>
                      <div className="flex items-center gap-2 flex-wrap">
                        <Badge
                          variant="outline"
                          className={`text-xs bg-${typeColor}-50 text-${typeColor}-700 border-${typeColor}-200`}
                        >
                          {getReviewerTypeLabel(review.reviewerType, language)}
                        </Badge>
                        {review.verified && (
                          <Badge variant="outline" className="text-xs bg-blue-50 text-blue-700 border-blue-200">
                            ✓ {t.verified}
                          </Badge>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Rating & Source */}
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-1">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                    <div className="flex items-center gap-1 text-xs text-gray-500">
                      <span>{getReviewSourceIcon(review.source)}</span>
                      <span>{getReviewSourceName(review.source, language)}</span>
                    </div>
                  </div>

                  {/* Review Title */}
                  {review.title && (
                    <h5 className={`mb-2 text-gray-800 line-clamp-1 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      "{review.title}"
                    </h5>
                  )}

                  {/* Review Text */}
                  <p className={`text-gray-700 text-sm leading-relaxed line-clamp-4 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {review.text}
                  </p>

                  {/* Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                    <div className="text-xs text-gray-500">
                      {review.reviewerLocation && (
                        <span>{review.reviewerLocation}</span>
                      )}
                    </div>
                    <div className={`text-xs text-gray-500 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                      {getTimeAgo(review.date)}
                    </div>
                  </div>
                </Card>
              );
            })}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-center gap-6">
              <Button
                onClick={handlePrev}
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>

              {/* Page Indicators */}
              <div className="flex gap-2">
                {Array.from({ length: totalPages }).map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrentPage(i)}
                    className={`h-2.5 rounded-full transition-all duration-300 ${
                      i === currentPage
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-500 w-12'
                        : 'bg-gray-300 w-2.5 hover:bg-gray-400'
                    }`}
                    aria-label={`Go to page ${i + 1}`}
                  />
                ))}
              </div>

              <Button
                onClick={handleNext}
                variant="outline"
                size="icon"
                className="w-12 h-12 rounded-full border-2 border-gray-200 hover:border-emerald-300 hover:bg-emerald-50"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
