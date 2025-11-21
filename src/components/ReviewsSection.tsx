import { useState } from 'react';
import { Star, ThumbsUp, Flag, MoreVertical, CheckCircle } from 'lucide-react';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { ListAvatar } from './ui/profile-avatar';
import { Badge } from './ui/badge';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from './ui/dialog';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  date: Date;
  verified: boolean;
  helpful: number;
  subject?: string;
}

interface ReviewsSectionProps {
  reviews: Review[];
  averageRating: number;
  totalReviews: number;
  canReview?: boolean;
  onSubmitReview?: (rating: number, comment: string) => void;
}

export function ReviewsSection({ 
  reviews, 
  averageRating, 
  totalReviews,
  canReview = false,
  onSubmitReview
}: ReviewsSectionProps) {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [sortBy, setSortBy] = useState<'recent' | 'highest' | 'lowest'>('recent');
  const [filterRating, setFilterRating] = useState<string>('all');
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map(star => {
    const count = reviews.filter(r => r.rating === star).length;
    const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0;
    return { star, count, percentage };
  });

  const handleSubmitReview = () => {
    if (rating > 0 && comment.trim() && onSubmitReview) {
      onSubmitReview(rating, comment);
      setRating(0);
      setComment('');
      setIsDialogOpen(false);
    }
  };

  const sortedReviews = [...reviews].sort((a, b) => {
    if (sortBy === 'recent') {
      return b.date.getTime() - a.date.getTime();
    } else if (sortBy === 'highest') {
      return b.rating - a.rating;
    } else {
      return a.rating - b.rating;
    }
  });

  const filteredReviews = filterRating === 'all' 
    ? sortedReviews 
    : sortedReviews.filter(r => r.rating === parseInt(filterRating));

  const formatDate = (date: Date) => {
    const now = new Date();
    const diffInDays = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60 * 24));
    
    if (diffInDays === 0) return 'আজ';
    if (diffInDays === 1) return 'গতকাল';
    if (diffInDays < 7) return `${diffInDays} দিন আগে`;
    if (diffInDays < 30) return `${Math.floor(diffInDays / 7)} সপ্তাহ আগে`;
    
    return date.toLocaleDateString('bn-BD', { year: 'numeric', month: 'long', day: 'numeric' });
  };

  return (
    <div className="space-y-6">
      {/* Rating Summary */}
      <Card className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          {/* Average Rating */}
          <div className="text-center md:text-left">
            <div className="flex items-end gap-3 justify-center md:justify-start mb-4">
              <span className="text-5xl">{averageRating.toFixed(1)}</span>
              <div className="pb-2">
                <div className="flex gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`w-5 h-5 ${
                        star <= averageRating
                          ? 'fill-yellow-400 text-yellow-400'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <p className="text-sm text-gray-600">{totalReviews} টি রিভিউ</p>
              </div>
            </div>
            
            {canReview && (
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full md:w-auto bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700">
                    <Star className="w-4 h-4 mr-2" />
                    রিভিউ লিখুন
                  </Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>আপনার রিভিউ লিখুন</DialogTitle>
                    <DialogDescription>
                      আপনার অভিজ্ঞতা শেয়ার করুন এবং অন্যদের সাহায্য করুন
                    </DialogDescription>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm mb-2">রেটিং</label>
                      <div className="flex gap-2">
                        {[1, 2, 3, 4, 5].map(star => (
                          <button
                            key={star}
                            onClick={() => setRating(star)}
                            onMouseEnter={() => setHoverRating(star)}
                            onMouseLeave={() => setHoverRating(0)}
                            className="transition-transform hover:scale-110"
                          >
                            <Star
                              className={`w-8 h-8 ${
                                star <= (hoverRating || rating)
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm mb-2">মন্তব্য</label>
                      <Textarea
                        placeholder="আপনার অভিজ্ঞতা শেয়ার করুন..."
                        value={comment}
                        onChange={(e) => setComment(e.target.value)}
                        rows={4}
                      />
                    </div>
                    <Button 
                      onClick={handleSubmitReview}
                      disabled={rating === 0 || !comment.trim()}
                      className="w-full bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
                    >
                      রিভিউ জমা দিন
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>
            )}
          </div>

          {/* Rating Distribution */}
          <div className="space-y-2">
            {ratingDistribution.map(({ star, count, percentage }) => (
              <div key={star} className="flex items-center gap-3">
                <span className="text-sm w-12">{star} স্টার</span>
                <Progress value={percentage} className="flex-1 h-2" />
                <span className="text-sm text-gray-600 w-12 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </Card>

      {/* Filters and Sort */}
      <div className="flex flex-col sm:flex-row gap-3 justify-between">
        <Select value={filterRating} onValueChange={setFilterRating}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="ফিল্টার করুন" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">সব রিভিউ</SelectItem>
            <SelectItem value="5">৫ স্টার</SelectItem>
            <SelectItem value="4">৪ স্টার</SelectItem>
            <SelectItem value="3">৩ স্টার</SelectItem>
            <SelectItem value="2">২ স্টার</SelectItem>
            <SelectItem value="1">১ স্টার</SelectItem>
          </SelectContent>
        </Select>

        <Select value={sortBy} onValueChange={(v) => setSortBy(v as any)}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="সাজান" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="recent">সাম্প্রতিক</SelectItem>
            <SelectItem value="highest">সর্বোচ্চ রেটিং</SelectItem>
            <SelectItem value="lowest">সর্বনিম্ন রেটিং</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.length === 0 ? (
          <Card className="p-12 text-center">
            <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
            <p className="text-gray-600">এই ফিল্টারে কোনো রিভিউ নেই</p>
          </Card>
        ) : (
          filteredReviews.map(review => (
            <Card key={review.id} className="p-4 hover:shadow-md transition-shadow">
              <div className="flex gap-4">
                <ListAvatar 
                  src={review.userAvatar}
                  alt={review.userName}
                  fallback={review.userName.charAt(0)}
                  verified={review.verified}
                />

                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h4>{review.userName}</h4>
                        {review.verified && (
                          <Badge variant="secondary" className="gap-1 text-xs">
                            <CheckCircle className="w-3 h-3" />
                            যাচাইকৃত
                          </Badge>
                        )}
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex gap-1">
                          {[1, 2, 3, 4, 5].map(star => (
                            <Star
                              key={star}
                              className={`w-4 h-4 ${
                                star <= review.rating
                                  ? 'fill-yellow-400 text-yellow-400'
                                  : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-500">•</span>
                        <span className="text-sm text-gray-500">{formatDate(review.date)}</span>
                      </div>
                    </div>

                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem>
                          <Flag className="w-4 h-4 mr-2" />
                          রিপোর্ট করুন
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>

                  {review.subject && (
                    <Badge variant="outline" className="mb-2">
                      {review.subject}
                    </Badge>
                  )}

                  <p className="text-sm text-gray-700 leading-relaxed mb-3">
                    {review.comment}
                  </p>

                  <Button variant="ghost" size="sm" className="gap-2 text-gray-600 hover:text-emerald-600">
                    <ThumbsUp className="w-4 h-4" />
                    সহায়ক ({review.helpful})
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}
