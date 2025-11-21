import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Star, Send, MessageSquare, Award } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { motion } from 'motion/react';

interface PlatformReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  language: 'bn' | 'en';
  userType: 'guardian' | 'teacher' | 'student' | 'donor';
  userName: string;
}

const content = {
  bn: {
    title: 'আপনার রিভিউ শেয়ার করুন',
    description: 'আপনার অভিজ্ঞতা শেয়ার করুন এবং অন্যদের সাহায্য করুন',
    ratingLabel: 'রেটিং দিন',
    selectRating: 'আপনার রেটিং নির্বাচন করুন (১-৫ স্টার)',
    titleLabel: 'রিভিউ শিরোনাম (ঐচ্ছিক)',
    titlePlaceholder: 'সংক্ষেপে আপনার অভিজ্ঞতা বর্ণনা করুন',
    reviewLabel: 'আপনার রিভিউ',
    reviewPlaceholder: 'Talent Tutor ব্যবহার করে আপনার অভিজ্ঞতা বিস্তারিত লিখুন...',
    cancel: 'বাতিল',
    submit: 'রিভিউ জমা দিন',
    submitting: 'জমা হচ্ছে...',
    successTitle: 'রিভিউ জমা হয়েছে!',
    successMessage: 'আপনার রিভিউ অ্যাডমিন যাচাইয়ের জন্য পাঠানো হয়েছে। অনুমোদনের পর ওয়েবসাইটে প্রদর্শিত হবে।',
    errorRequired: 'দয়া করে রেটিং এবং রিভিউ লিখুন',
    pendingNotice: 'আপনার রিভিউ অ্যাডমিন অনুমোদনের অপেক্ষায় রয়েছে',
    howToWrite: 'ভালো রিভিউ লেখার টিপস',
    tips: [
      'সৎ এবং বিস্তারিত হন',
      'নির্দিষ্ট বৈশিষ্ট্য উল্লেখ করুন',
      'ভদ্র ভাষা ব্যবহার করুন',
      'আপনার প্রকৃত অভিজ্ঞতা শেয়ার করুন'
    ]
  },
  en: {
    title: 'Share Your Review',
    description: 'Share your experience and help others',
    ratingLabel: 'Rate Your Experience',
    selectRating: 'Select your rating (1-5 stars)',
    titleLabel: 'Review Title (Optional)',
    titlePlaceholder: 'Briefly describe your experience',
    reviewLabel: 'Your Review',
    reviewPlaceholder: 'Write about your experience using Talent Tutor...',
    cancel: 'Cancel',
    submit: 'Submit Review',
    submitting: 'Submitting...',
    successTitle: 'Review Submitted!',
    successMessage: 'Your review has been sent for admin approval. It will appear on the website after approval.',
    errorRequired: 'Please provide rating and review text',
    pendingNotice: 'Your review is pending admin approval',
    howToWrite: 'Tips for Writing a Good Review',
    tips: [
      'Be honest and detailed',
      'Mention specific features',
      'Use respectful language',
      'Share your genuine experience'
    ]
  }
};

export function PlatformReviewDialog({
  open,
  onOpenChange,
  language,
  userType,
  userName
}: PlatformReviewDialogProps) {
  const t = content[language];
  const [rating, setRating] = useState<number>(0);
  const [hoveredRating, setHoveredRating] = useState<number>(0);
  const [title, setTitle] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (rating === 0 || reviewText.trim() === '') {
      toast.error(t.errorRequired);
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // In production: Save to database with status 'pending'
    const reviewData = {
      source: 'platform',
      reviewerType: userType,
      reviewerName: userName,
      rating,
      title: title.trim() || undefined,
      text: reviewText.trim(),
      date: new Date(),
      status: 'pending'
    };

    console.log('Review submitted:', reviewData);

    toast.success(t.successTitle, {
      description: t.successMessage,
      duration: 5000
    });

    setIsSubmitting(false);
    onOpenChange(false);
    
    // Reset form
    setRating(0);
    setTitle('');
    setReviewText('');
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-2xl">
            <MessageSquare className="w-6 h-6 text-emerald-600" />
            {t.title}
          </DialogTitle>
          <DialogDescription>{t.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6 py-4">
          {/* Rating Section */}
          <div className="space-y-3">
            <Label className="text-base">{t.ratingLabel}</Label>
            <p className="text-sm text-gray-600">{t.selectRating}</p>
            
            <div className="flex items-center gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <motion.button
                  key={star}
                  type="button"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-10 h-10 transition-all ${
                      star <= (hoveredRating || rating)
                        ? 'fill-yellow-400 text-yellow-400'
                        : 'text-gray-300'
                    }`}
                  />
                </motion.button>
              ))}
              {rating > 0 && (
                <span className={`ml-2 text-lg ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {rating === 5 && (language === 'bn' ? '🌟 অসাধারণ!' : '🌟 Excellent!')}
                  {rating === 4 && (language === 'bn' ? '😊 খুব ভালো!' : '😊 Very Good!')}
                  {rating === 3 && (language === 'bn' ? '👍 ভালো' : '👍 Good')}
                  {rating === 2 && (language === 'bn' ? '😐 মোটামুটি' : '😐 Fair')}
                  {rating === 1 && (language === 'bn' ? '😞 উন্নতি প্রয়োজন' : '😞 Needs Improvement')}
                </span>
              )}
            </div>
          </div>

          {/* Title (Optional) */}
          <div className="space-y-2">
            <Label htmlFor="review-title">{t.titleLabel}</Label>
            <Input
              id="review-title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder={t.titlePlaceholder}
              maxLength={100}
              className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
            />
          </div>

          {/* Review Text */}
          <div className="space-y-2">
            <Label htmlFor="review-text">{t.reviewLabel} *</Label>
            <Textarea
              id="review-text"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder={t.reviewPlaceholder}
              rows={6}
              maxLength={1000}
              className={language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>{reviewText.length}/1000</span>
            </div>
          </div>

          {/* Tips Section */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-blue-600" />
              <h4 className={`text-blue-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.howToWrite}
              </h4>
            </div>
            <ul className="space-y-2">
              {t.tips.map((tip, idx) => (
                <li key={idx} className={`text-sm text-blue-800 flex items-start gap-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  <span className="text-blue-600 mt-0.5">•</span>
                  {tip}
                </li>
              ))}
            </ul>
          </div>

          {/* Pending Notice */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <p className={`text-sm text-yellow-800 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              ℹ️ {t.pendingNotice}
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex justify-end gap-3 pt-4 border-t">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isSubmitting}
          >
            {t.cancel}
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={isSubmitting || rating === 0 || reviewText.trim() === ''}
            className="bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700"
          >
            {isSubmitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                {t.submitting}
              </>
            ) : (
              <>
                <Send className="w-4 h-4 mr-2" />
                {t.submit}
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
