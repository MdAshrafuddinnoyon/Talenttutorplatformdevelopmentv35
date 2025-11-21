import { Button } from './ui/button';
import { Loader2, ChevronDown } from 'lucide-react';
import { motion } from 'motion/react';

interface LoadMoreButtonProps {
  onClick: () => void;
  loading?: boolean;
  hasMore?: boolean;
  language: 'bn' | 'en';
  totalShown?: number;
  totalAvailable?: number;
}

const content = {
  bn: {
    loadMore: 'আরও লোড করুন',
    loading: 'লোড হচ্ছে...',
    noMore: 'আর কোনো আইটেম নেই',
    showing: 'দেখানো হচ্ছে',
    of: 'এর মধ্যে',
  },
  en: {
    loadMore: 'Load More',
    loading: 'Loading...',
    noMore: 'No more items',
    showing: 'Showing',
    of: 'of',
  }
};

export function LoadMoreButton({
  onClick,
  loading = false,
  hasMore = true,
  language,
  totalShown,
  totalAvailable
}: LoadMoreButtonProps) {
  const t = content[language];

  if (!hasMore) {
    return (
      <div className="text-center py-8">
        <div className="inline-flex flex-col items-center gap-2">
          <div className="w-16 h-16 rounded-full bg-gradient-to-br from-emerald-100 to-teal-100 flex items-center justify-center">
            <CheckCircle className="w-8 h-8 text-emerald-600" />
          </div>
          <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.noMore}
          </p>
          {totalShown && totalAvailable && (
            <p className={`text-sm text-gray-500 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.showing} {totalShown} {t.of} {totalAvailable}
            </p>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="text-center py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        {totalShown && totalAvailable && (
          <p className={`text-sm text-gray-600 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {t.showing} <span className="font-semibold text-emerald-600">{totalShown}</span> {t.of} <span className="font-semibold">{totalAvailable}</span>
          </p>
        )}
        
        <Button
          onClick={onClick}
          disabled={loading}
          size="lg"
          className={`bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-600 hover:to-teal-700 shadow-lg hover:shadow-xl transition-all px-8 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}
        >
          {loading ? (
            <>
              <Loader2 className="w-5 h-5 mr-2 animate-spin" />
              {t.loading}
            </>
          ) : (
            <>
              <ChevronDown className="w-5 h-5 mr-2 animate-bounce" />
              {t.loadMore}
            </>
          )}
        </Button>
      </motion.div>
    </div>
  );
}

// Import missing icon
import { CheckCircle } from 'lucide-react';
