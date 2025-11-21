import { Button } from './ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from './ui/dialog';
import { Card } from './ui/card';
import { Share2, Facebook, Twitter, Link2, MessageCircle, Download, Heart } from 'lucide-react';
import { toast } from 'sonner@2.0.3';
import { useState } from 'react';
import { copyToClipboard } from '../utils/clipboard';

interface DonationSocialShareProps {
  donorName: string;
  totalDonations: number;
  studentsHelped: number;
  booksdonated: number;
  trigger?: React.ReactNode;
}

export function DonationSocialShare({
  donorName,
  totalDonations,
  studentsHelped,
  booksdonated,
  trigger,
}: DonationSocialShareProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Different share text based on donor type (money vs books)
  const shareText = totalDonations > 0
    ? `আমি Talent Tutor Foundation এ ৳${totalDonations.toLocaleString()} টাকা দান করে ${studentsHelped} জন শিক্ষার্থীকে সাহায্য করেছি। আপনিও অংশ নিন এবং একজন শিক্ষার্থীর জীবন পরিবর্তন করুন!`
    : `আমি Talent Tutor Foundation এ ${booksdonated}টি বই দান করে ${studentsHelped} জন শিক্ষার্থীকে সাহায্য করেছি। আপনিও অংশ নিন এবং একজন শিক্ষার্থীর জীবন পরিবর্তন করুন!`;
  
  const shareUrl = 'https://talent-tutor.com/donation';

  const handleCopyLink = async () => {
    const success = await copyToClipboard(`${shareText}\n\n${shareUrl}`);
    if (success) {
      toast.success('লিংক কপি হয়েছে!');
    } else {
      toast.error('লিংক কপি করতে ব্যর্থ');
    }
  };

  const handleFacebookShare = () => {
    const fbUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}&quote=${encodeURIComponent(shareText)}`;
    window.open(fbUrl, '_blank', 'width=600,height=400');
  };

  const handleTwitterShare = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`;
    window.open(twitterUrl, '_blank', 'width=600,height=400');
  };

  const handleWhatsAppShare = () => {
    const waUrl = `https://wa.me/?text=${encodeURIComponent(`${shareText}\n\n${shareUrl}`)}`;
    window.open(waUrl, '_blank');
  };

  const handleDownloadImage = () => {
    // Create a shareable image
    const canvas = document.createElement('canvas');
    canvas.width = 1200;
    canvas.height = 630;
    const ctx = canvas.getContext('2d');

    if (!ctx) return;

    // Background gradient
    const gradient = ctx.createLinearGradient(0, 0, 1200, 630);
    gradient.addColorStop(0, '#e11d48');
    gradient.addColorStop(1, '#ec4899');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 1200, 630);

    // Add decorative elements
    ctx.fillStyle = 'rgba(255, 255, 255, 0.1)';
    ctx.beginPath();
    ctx.arc(100, 100, 150, 0, Math.PI * 2);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(1100, 530, 200, 0, Math.PI * 2);
    ctx.fill();

    // Main text
    ctx.fillStyle = '#ffffff';
    ctx.font = 'bold 48px "Noto Serif Bengali", Arial';
    ctx.textAlign = 'center';
    ctx.fillText('আমি দান করেছি ❤️', 600, 150);

    // Amount or Books
    ctx.font = 'bold 72px Arial';
    if (totalDonations > 0) {
      ctx.fillText(`৳ ${totalDonations.toLocaleString()}`, 600, 250);
    } else {
      ctx.fillText(`${booksdonated}টি বই 📚`, 600, 250);
    }

    // Impact stats
    ctx.font = '32px "Noto Serif Bengali", Arial';
    ctx.fillText(`${studentsHelped} জন শিক্ষার্থীকে সাহায্য করেছি`, 600, 350);
    
    if (totalDonations > 0 && booksdonated > 0) {
      ctx.fillText(`${booksdonated}টি বই দান করেছি`, 600, 400);
    }

    // Call to action
    ctx.font = 'bold 36px "Noto Serif Bengali", Arial';
    ctx.fillText('আপনিও অংশ নিন!', 600, 480);

    // Footer
    ctx.font = '24px Arial';
    ctx.fillText('Talent Tutor Foundation', 600, 560);
    ctx.font = '18px Arial';
    ctx.fillStyle = 'rgba(255, 255, 255, 0.8)';
    ctx.fillText('talent-tutor.com/donation', 600, 590);

    // Download
    canvas.toBlob((blob) => {
      if (blob) {
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = 'my-donation-impact.png';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
        toast.success('ইমেজ ডাউনলোড হচ্ছে!');
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="outline" className="border-rose-200 text-rose-700 hover:bg-rose-50">
            <Share2 className="w-4 h-4 mr-2" />
            শেয়ার করুন
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl text-center">আপনার প্রভাব শেয়ার করুন</DialogTitle>
          <DialogDescription className="text-center">
            আপনার দানের গল্প শেয়ার করে অন্যদের অনুপ্রাণিত করুন
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          {/* Preview Card */}
          <Card className="p-6 bg-gradient-to-br from-rose-50 to-pink-50 border-2 border-rose-200">
            <div className="text-center">
              <div className="w-20 h-20 bg-gradient-to-br from-rose-600 to-pink-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
                <Heart className="w-10 h-10 text-white fill-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">আমি দান করেছি</h3>
              {totalDonations > 0 ? (
                <div className="text-4xl font-bold text-rose-700 mb-4">৳ {totalDonations.toLocaleString()}</div>
              ) : (
                <div className="text-4xl font-bold text-blue-700 mb-4">{booksdonated}টি বই 📚</div>
              )}
              <div className="space-y-2 text-gray-700">
                <p className="text-lg">🎓 {studentsHelped} জন শিক্ষার্থীকে সাহায্য করেছি</p>
                {totalDonations > 0 && booksdonated > 0 && (
                  <p className="text-lg">📚 {booksdonated}টি বই দান করেছি</p>
                )}
                <p className="text-lg font-semibold mt-4">আপনিও অংশ নিন!</p>
              </div>
            </div>
          </Card>

          {/* Share Options */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">শেয়ার করুন:</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              <Button
                onClick={handleFacebookShare}
                className="bg-[#1877F2] hover:bg-[#166FE5] text-white"
              >
                <Facebook className="w-5 h-5 mr-2" />
                Facebook
              </Button>

              <Button
                onClick={handleTwitterShare}
                className="bg-[#1DA1F2] hover:bg-[#1a8cd8] text-white"
              >
                <Twitter className="w-5 h-5 mr-2" />
                Twitter
              </Button>

              <Button
                onClick={handleWhatsAppShare}
                className="bg-[#25D366] hover:bg-[#20bd5a] text-white"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                WhatsApp
              </Button>

              <Button
                onClick={handleCopyLink}
                variant="outline"
                className="border-gray-300"
              >
                <Link2 className="w-5 h-5 mr-2" />
                লিংক কপি
              </Button>
            </div>
          </div>

          {/* Download Image */}
          <div>
            <h4 className="font-semibold text-gray-900 mb-3">অথবা ইমেজ ডাউনলোড করুন:</h4>
            <Button
              onClick={handleDownloadImage}
              variant="outline"
              className="w-full border-rose-200 hover:bg-rose-50"
            >
              <Download className="w-5 h-5 mr-2" />
              শেয়ারযোগ্য ইমেজ ডাউনলোড করুন
            </Button>
          </div>

          {/* Message Preview */}
          <div className="bg-gray-50 p-4 rounded-lg border-2 border-gray-200">
            <p className="text-sm text-gray-600 mb-2 font-semibold">শেয়ার মেসেজ:</p>
            <p className="text-gray-700 italic">{shareText}</p>
          </div>

          {/* Motivation */}
          <Card className="p-4 bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200">
            <p className="text-sm text-green-800 text-center">
              💡 আপনার গল্প শেয়ার করে অন্যদের অনুপ্রাণিত করুন এবং আরও বেশি শিক্ষার্থীকে সাহায্য করতে উৎসাহিত করুন!
            </p>
          </Card>
        </div>
      </DialogContent>
    </Dialog>
  );
}
