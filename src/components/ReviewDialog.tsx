import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Star } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'bn' | 'en';
  targetType: 'teacher' | 'guardian';
  targetName: string;
  targetId: string;
  onSubmit: (review: { rating: number; comment: string }) => void;
}

const content = {
  bn: {
    title: 'রিভিউ দিন',
    teacherReview: 'শিক্ষক সম্পর্কে মতামত',
    guardianReview: 'অভিভাবক সম্পর্কে মতামত',
    rating: 'রেটিং',
    selectRating: 'রেটিং নির্বাচন করুন',
    comment: 'মন্তব্য',
    commentPlaceholder: 'আপনার অভিজ্ঞতা শেয়ার করুন...',
    submit: 'রিভিউ জমা দিন',
    cancel: 'বাতিল',
    successMessage: 'রিভিউ সফলভাবে জমা হয়েছে!',
    ratingRequired: 'রেটিং নির্বাচন করুন',
    commentRequired: 'মন্তব্য লিখুন',
  },
  en: {
    title: 'Give Review',
    teacherReview: 'Review Teacher',
    guardianReview: 'Review Guardian',
    rating: 'Rating',
    selectRating: 'Select rating',
    comment: 'Comment',
    commentPlaceholder: 'Share your experience...',
    submit: 'Submit Review',
    cancel: 'Cancel',
    successMessage: 'Review submitted successfully!',
    ratingRequired: 'Please select a rating',
    commentRequired: 'Please write a comment',
  },
};

export function ReviewDialog({
  open,
  onOpenChange,
  language,
  targetType,
  targetName,
  targetId,
  onSubmit,
}: ReviewDialogProps) {
  const t = content[language];
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0) {
      toast.error(t.ratingRequired);
      return;
    }

    if (!comment.trim()) {
      toast.error(t.commentRequired);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));

    onSubmit({ rating, comment: comment.trim() });
    toast.success(t.successMessage);

    // Reset form
    setRating(0);
    setComment('');
    setIsSubmitting(false);
    onOpenChange(false);
  };

  const handleClose = () => {
    if (!isSubmitting) {
      setRating(0);
      setComment('');
      onOpenChange(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>{t.title}</DialogTitle>
          <DialogDescription>
            {targetType === 'teacher' ? t.teacherReview : t.guardianReview}: {targetName}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Rating Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-3">
              {t.rating}
            </label>
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((value) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => setRating(value)}
                  onMouseEnter={() => setHoveredRating(value)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none transition-transform hover:scale-110"
                >
                  <Star
                    className={`w-10 h-10 ${
                      value <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </button>
              ))}
              {rating > 0 && (
                <span className="ml-3 text-2xl font-bold text-gray-700">
                  {rating}.0
                </span>
              )}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              {t.comment}
            </label>
            <Textarea
              rows={5}
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder={t.commentPlaceholder}
              className="resize-none"
            />
            <div className="text-xs text-gray-500 mt-1 text-right">
              {comment.length}/500
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-3">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isSubmitting}
          >
            {t.cancel}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting}
            className="bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-700 hover:to-emerald-700"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                Submitting...
              </>
            ) : (
              t.submit
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
