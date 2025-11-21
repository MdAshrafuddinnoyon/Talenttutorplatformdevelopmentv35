import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { ArrowUp, ArrowDown, CheckCircle, XCircle, Info } from 'lucide-react';

interface ScrollPositionTesterProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'Scroll Position Test করুন',
    description: 'এই component টি page scroll behavior test করতে সাহায্য করবে',
    step1: 'ধাপ ১: নিচে Scroll করুন',
    step2: 'ধাপ ২: Page পরিবর্তন করুন',
    step3: 'ধাপ ৩: নতুন Page উপর থেকে শুরু হয়েছে কিনা দেখুন',
    scrollDown: 'নিচে Scroll করুন',
    currentScroll: 'বর্তমান Scroll Position',
    pixels: 'পিক্সেল',
    status: 'অবস্থা',
    atTop: 'একেবারে উপরে',
    scrolled: 'Scroll করা হয়েছে',
    instruction: 'এখন যেকোনো অন্য page এ যান এবং দেখুন নতুন page উপর থেকে শুরু হচ্ছে কিনা',
    howItWorks: 'কিভাবে কাজ করে',
    explanation: 'যখন আপনি page পরিবর্তন করবেন, automatic scroll position 0 হয়ে যাবে। এর মানে নতুন page সবসময় উপর থেকে শুরু হবে।',
    testSteps: 'Test করার ধাপ',
    stepA: '১. এই page এ scroll করুন',
    stepB: '২. Home/About/Blog যেকোনো page এ যান',
    stepC: '৩. নতুন page top থেকে শুরু হলে ✅',
    success: 'সফল',
    scrollToBottom: 'নিচে যান',
  },
  en: {
    title: 'Test Scroll Position',
    description: 'This component helps test page scroll behavior',
    step1: 'Step 1: Scroll Down',
    step2: 'Step 2: Change Page',
    step3: 'Step 3: Check if new page starts from top',
    scrollDown: 'Scroll Down',
    currentScroll: 'Current Scroll Position',
    pixels: 'pixels',
    status: 'Status',
    atTop: 'At Top',
    scrolled: 'Scrolled',
    instruction: 'Now navigate to any other page and check if it starts from top',
    howItWorks: 'How It Works',
    explanation: 'When you change pages, the scroll position automatically resets to 0. This means new pages always start from the top.',
    testSteps: 'Testing Steps',
    stepA: '1. Scroll on this page',
    stepB: '2. Navigate to Home/About/Blog',
    stepC: '3. If new page starts from top ✅',
    success: 'Success',
    scrollToBottom: 'Scroll to Bottom',
  }
};

export function ScrollPositionTester({ language }: ScrollPositionTesterProps) {
  const t = content[language];
  const [scrollY, setScrollY] = useState(0);

  // Update scroll position
  const updateScroll = () => {
    setScrollY(window.pageYOffset);
  };

  // Listen to scroll events
  if (typeof window !== 'undefined') {
    window.addEventListener('scroll', updateScroll);
  }

  const scrollToBottom = () => {
    window.scrollTo({
      top: document.body.scrollHeight,
      behavior: 'smooth'
    });
  };

  const isAtTop = scrollY < 50;

  return (
    <div className="space-y-6 py-8">
      {/* Header */}
      <Card className="p-6 bg-gradient-to-br from-purple-50 to-pink-50 border-purple-200">
        <div className="flex items-start gap-4">
          <div className="w-12 h-12 rounded-full bg-purple-600 flex items-center justify-center shrink-0">
            <Info className="w-6 h-6 text-white" />
          </div>
          <div className="flex-1">
            <h2 className={`text-2xl text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.title}
            </h2>
            <p className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.description}
            </p>
          </div>
        </div>
      </Card>

      {/* Current Scroll Status */}
      <Card className="p-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className={`text-lg text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.currentScroll}
              </h3>
              <Badge className={isAtTop ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'}>
                {isAtTop ? (
                  <>
                    <CheckCircle className="w-3 h-3 mr-1" />
                    {t.atTop}
                  </>
                ) : (
                  <>
                    <ArrowDown className="w-3 h-3 mr-1" />
                    {t.scrolled}
                  </>
                )}
              </Badge>
            </div>

            <div className="bg-gray-100 rounded-lg p-4 text-center">
              <div className="text-5xl font-mono text-gray-900 mb-2">
                {Math.round(scrollY)}
              </div>
              <div className={`text-gray-600 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                {t.pixels}
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <h3 className={`text-lg text-gray-900 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.testSteps}
            </h3>
            <div className="space-y-2">
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm shrink-0">
                  1
                </div>
                <p className={`text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.stepA}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-purple-600 text-white flex items-center justify-center text-sm shrink-0">
                  2
                </div>
                <p className={`text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.stepB}
                </p>
              </div>
              <div className="flex items-start gap-2">
                <div className="w-6 h-6 rounded-full bg-green-600 text-white flex items-center justify-center text-sm shrink-0">
                  ✓
                </div>
                <p className={`text-gray-700 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                  {t.stepC}
                </p>
              </div>
            </div>

            <Button
              onClick={scrollToBottom}
              className="w-full bg-purple-600 hover:bg-purple-700"
            >
              <ArrowDown className="w-4 h-4 mr-2" />
              {t.scrollToBottom}
            </Button>
          </div>
        </div>
      </Card>

      {/* How It Works */}
      <Card className="p-6 bg-blue-50 border-blue-200">
        <h3 className={`text-lg text-gray-900 mb-3 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.howItWorks}
        </h3>
        <p className={`text-gray-700 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
          {t.explanation}
        </p>
        <div className="bg-white rounded-lg p-4 font-mono text-sm">
          <code className="text-purple-600">
            useEffect(() => {`{`}<br />
            &nbsp;&nbsp;window.scrollTo({`{ top: 0, behavior: 'instant' }`});<br />
            {`}`}, [currentPage]);
          </code>
        </div>
      </Card>

      {/* Instruction */}
      {scrollY > 100 && (
        <Card className="p-6 bg-gradient-to-r from-green-50 to-emerald-50 border-green-200 animate-pulse">
          <div className="flex items-center gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 shrink-0" />
            <p className={`text-green-800 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
              {t.instruction}
            </p>
          </div>
        </Card>
      )}

      {/* Visual Scroll Indicator */}
      <div className="space-y-4">
        {[...Array(20)].map((_, i) => (
          <Card key={i} className="p-4">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-pink-500 flex items-center justify-center text-white">
                {i + 1}
              </div>
              <div className="flex-1">
                <h4 className="text-gray-900">
                  {language === 'bn' ? 'কন্টেন্ট ব্লক' : 'Content Block'} #{i + 1}
                </h4>
                <p className="text-sm text-gray-600">
                  {language === 'bn' 
                    ? 'নিচে scroll করতে থাকুন, তারপর অন্য page এ যান'
                    : 'Keep scrolling down, then navigate to another page'}
                </p>
              </div>
              {i === 19 && (
                <Badge className="bg-red-100 text-red-800">
                  <ArrowUp className="w-3 h-3 mr-1" />
                  {language === 'bn' ? 'শেষ' : 'End'}
                </Badge>
              )}
            </div>
          </Card>
        ))}
      </div>

      {/* Bottom Message */}
      <Card className="p-6 bg-gradient-to-r from-orange-50 to-yellow-50 border-orange-200">
        <div className="text-center">
          <h3 className={`text-xl text-gray-900 mb-2 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            🎉 {language === 'bn' ? 'আপনি একেবারে নিচে পৌঁছেছেন!' : "You've reached the bottom!"}
          </h3>
          <p className={`text-gray-700 mb-4 ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
            {language === 'bn' 
              ? 'এখন যেকোনো অন্য page এ navigate করুন এবং দেখুন সেটি উপর থেকে শুরু হয় কিনা!'
              : 'Now navigate to any other page and see if it starts from the top!'}
          </p>
          <Badge className="bg-green-100 text-green-800 text-lg px-4 py-2">
            <CheckCircle className="w-4 h-4 mr-2" />
            {t.success}
          </Badge>
        </div>
      </Card>
    </div>
  );
}
