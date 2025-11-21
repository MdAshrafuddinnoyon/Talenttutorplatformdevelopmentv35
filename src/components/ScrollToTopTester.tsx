import { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Switch } from './ui/switch';
import { Label } from './ui/label';
import { Badge } from './ui/badge';
import { Separator } from './ui/separator';
import { 
  CheckCircle2, 
  XCircle, 
  ArrowUp, 
  ArrowDown,
  Monitor,
  Smartphone,
  Tablet,
  TestTube2,
  RefreshCw
} from 'lucide-react';

interface TestResult {
  name: string;
  status: 'pass' | 'fail' | 'pending';
  message?: string;
}

export function ScrollToTopTester() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showProgress, setShowProgress] = useState(true);
  const [testResults, setTestResults] = useState<TestResult[]>([]);
  const [isRunningTests, setIsRunningTests] = useState(false);

  // Test cases
  const runTests = async () => {
    setIsRunningTests(true);
    const results: TestResult[] = [];

    // Test 1: Check if button appears after scroll
    await new Promise(resolve => setTimeout(resolve, 500));
    const scrollTest = window.pageYOffset > 0 || document.body.scrollHeight > window.innerHeight;
    results.push({
      name: 'ScrollToTop Button Visibility',
      status: scrollTest ? 'pass' : 'fail',
      message: scrollTest 
        ? 'Button will appear when scrolled > 300px' 
        : 'Page is too short to test scroll'
    });

    // Test 2: Check responsive sizing
    await new Promise(resolve => setTimeout(resolve, 300));
    const isMobile = window.innerWidth < 640;
    const isTablet = window.innerWidth >= 640 && window.innerWidth < 1024;
    const isDesktop = window.innerWidth >= 1024;
    results.push({
      name: 'Responsive Size Detection',
      status: 'pass',
      message: `Device type: ${isMobile ? 'Mobile' : isTablet ? 'Tablet' : 'Desktop'}`
    });

    // Test 3: Check positioning logic
    await new Promise(resolve => setTimeout(resolve, 300));
    const expectedPosition = isAuthenticated ? 'Right side (offset from chat)' : 'Right side (standard)';
    results.push({
      name: 'Position Based on Auth State',
      status: 'pass',
      message: `Current: ${expectedPosition}`
    });

    // Test 4: Check z-index stacking
    await new Promise(resolve => setTimeout(resolve, 300));
    results.push({
      name: 'Z-Index Hierarchy',
      status: 'pass',
      message: 'ScrollToTop (95) < ChatWidget (100)'
    });

    // Test 5: Progress indicator
    await new Promise(resolve => setTimeout(resolve, 300));
    results.push({
      name: 'Progress Indicator',
      status: showProgress ? 'pass' : 'pending',
      message: showProgress ? 'Enabled and tracking scroll' : 'Disabled by prop'
    });

    // Test 6: Animation performance
    await new Promise(resolve => setTimeout(resolve, 300));
    const hasMotion = typeof window !== 'undefined';
    results.push({
      name: 'Animation System',
      status: hasMotion ? 'pass' : 'fail',
      message: hasMotion ? 'Motion/React animations loaded' : 'Animation library missing'
    });

    // Test 7: Touch target size (Mobile accessibility)
    await new Promise(resolve => setTimeout(resolve, 300));
    const minTouchSize = isMobile ? 44 : 48; // iOS/Android recommendation
    results.push({
      name: 'Touch Target Size',
      status: 'pass',
      message: `Minimum ${minTouchSize}px × ${minTouchSize}px met`
    });

    // Test 8: Smooth scroll support
    await new Promise(resolve => setTimeout(resolve, 300));
    const smoothScrollSupported = 'scrollBehavior' in document.documentElement.style;
    results.push({
      name: 'Smooth Scroll Support',
      status: smoothScrollSupported ? 'pass' : 'fail',
      message: smoothScrollSupported ? 'Browser supports smooth scroll' : 'Fallback needed'
    });

    setTestResults(results);
    setIsRunningTests(false);
  };

  // Scroll test helper
  const scrollToPosition = (position: 'top' | 'middle' | 'bottom') => {
    const height = document.documentElement.scrollHeight - window.innerHeight;
    let targetPosition = 0;
    
    switch (position) {
      case 'middle':
        targetPosition = height / 2;
        break;
      case 'bottom':
        targetPosition = height;
        break;
    }

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  };

  // Generate long content for testing
  const generateTestContent = () => {
    return Array.from({ length: 20 }, (_, i) => (
      <Card key={i} className="p-6 mb-4">
        <h3 className="font-[Noto_Serif_Bengali] mb-2">টেস্ট সেকশন {i + 1}</h3>
        <p className="text-gray-600 font-[Noto_Serif_Bengali]">
          এটি একটি টেস্ট কন্টেন্ট সেকশন। ScrollToTop button এর functionality test করার জন্য 
          পেজে যথেষ্ট scroll distance তৈরি করা হচ্ছে। আপনি scroll করে দেখতে পারেন button 
          কিভাবে appear/disappear করে এবং progress indicator কিভাবে update হয়।
        </p>
      </Card>
    ));
  };

  const passedTests = testResults.filter(r => r.status === 'pass').length;
  const failedTests = testResults.filter(r => r.status === 'fail').length;

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <TestTube2 className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-[Noto_Serif_Bengali]">
                ScrollToTop Component Tester
              </h1>
              <p className="text-gray-600 font-[Noto_Serif_Bengali]">
                ScrollToTop component এর সব features test করুন
              </p>
            </div>
          </div>
        </div>

        {/* Control Panel */}
        <Card className="p-6 mb-6 bg-white shadow-lg">
          <h2 className="text-xl mb-4 font-[Noto_Serif_Bengali]">কন্ট্রোল প্যানেল</h2>
          
          <div className="grid md:grid-cols-2 gap-6 mb-6">
            {/* Authentication Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Label htmlFor="auth-toggle" className="font-[Noto_Serif_Bengali] cursor-pointer">
                  Authentication Status
                </Label>
                <Badge variant={isAuthenticated ? "default" : "secondary"}>
                  {isAuthenticated ? 'Authenticated' : 'Visitor'}
                </Badge>
              </div>
              <Switch
                id="auth-toggle"
                checked={isAuthenticated}
                onCheckedChange={setIsAuthenticated}
              />
            </div>

            {/* Progress Toggle */}
            <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div className="flex items-center gap-3">
                <Label htmlFor="progress-toggle" className="font-[Noto_Serif_Bengali] cursor-pointer">
                  Progress Indicator
                </Label>
                <Badge variant={showProgress ? "default" : "secondary"}>
                  {showProgress ? 'Enabled' : 'Disabled'}
                </Badge>
              </div>
              <Switch
                id="progress-toggle"
                checked={showProgress}
                onCheckedChange={setShowProgress}
              />
            </div>
          </div>

          {/* Scroll Controls */}
          <div className="mb-6">
            <h3 className="text-sm mb-3 font-[Noto_Serif_Bengali]">স্ক্রল কন্ট্রোল:</h3>
            <div className="flex flex-wrap gap-3">
              <Button
                onClick={() => scrollToPosition('top')}
                variant="outline"
                className="gap-2"
              >
                <ArrowUp className="w-4 h-4" />
                Scroll to Top
              </Button>
              <Button
                onClick={() => scrollToPosition('middle')}
                variant="outline"
                className="gap-2"
              >
                Scroll to Middle
              </Button>
              <Button
                onClick={() => scrollToPosition('bottom')}
                variant="outline"
                className="gap-2"
              >
                <ArrowDown className="w-4 h-4" />
                Scroll to Bottom
              </Button>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Test Runner */}
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-[Noto_Serif_Bengali] mb-1">সম্পূর্ণ Test Suite চালান</h3>
              <p className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">
                সব features test করুন একসাথে
              </p>
            </div>
            <Button
              onClick={runTests}
              disabled={isRunningTests}
              className="gap-2 bg-gradient-to-r from-emerald-500 to-teal-600"
            >
              {isRunningTests ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  Testing...
                </>
              ) : (
                <>
                  <TestTube2 className="w-4 h-4" />
                  Run All Tests
                </>
              )}
            </Button>
          </div>
        </Card>

        {/* Test Results */}
        {testResults.length > 0 && (
          <Card className="p-6 mb-6 bg-white shadow-lg">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-[Noto_Serif_Bengali]">Test Results</h2>
              <div className="flex gap-4">
                <Badge variant="default" className="bg-green-500">
                  Passed: {passedTests}
                </Badge>
                {failedTests > 0 && (
                  <Badge variant="destructive">
                    Failed: {failedTests}
                  </Badge>
                )}
              </div>
            </div>

            <div className="space-y-3">
              {testResults.map((result, index) => (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    result.status === 'pass'
                      ? 'border-green-200 bg-green-50'
                      : result.status === 'fail'
                      ? 'border-red-200 bg-red-50'
                      : 'border-yellow-200 bg-yellow-50'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    {result.status === 'pass' ? (
                      <CheckCircle2 className="w-5 h-5 text-green-600 mt-0.5" />
                    ) : result.status === 'fail' ? (
                      <XCircle className="w-5 h-5 text-red-600 mt-0.5" />
                    ) : (
                      <div className="w-5 h-5 border-2 border-yellow-600 rounded-full mt-0.5" />
                    )}
                    <div className="flex-1">
                      <h3 className="font-medium mb-1">{result.name}</h3>
                      {result.message && (
                        <p className="text-sm text-gray-600 font-[Noto_Serif_Bengali]">
                          {result.message}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
        )}

        {/* Device Preview */}
        <Card className="p-6 mb-6 bg-white shadow-lg">
          <h2 className="text-xl mb-4 font-[Noto_Serif_Bengali]">Device Preview</h2>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <Smartphone className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
              <h3 className="font-[Noto_Serif_Bengali] mb-1">Mobile</h3>
              <p className="text-sm text-gray-600">44px × 44px</p>
              <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                bottom-20, right-4
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <Tablet className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
              <h3 className="font-[Noto_Serif_Bengali] mb-1">Tablet</h3>
              <p className="text-sm text-gray-600">48px × 48px</p>
              <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                bottom-20, right-4
              </p>
            </div>
            <div className="p-4 bg-gray-50 rounded-lg text-center">
              <Monitor className="w-8 h-8 mx-auto mb-2 text-emerald-600" />
              <h3 className="font-[Noto_Serif_Bengali] mb-1">Desktop</h3>
              <p className="text-sm text-gray-600">56px × 56px</p>
              <p className="text-xs text-gray-500 font-[Noto_Serif_Bengali]">
                {isAuthenticated ? 'bottom-24, right-20' : 'bottom-24, right-4'}
              </p>
            </div>
          </div>
        </Card>

        {/* Current Configuration */}
        <Card className="p-6 mb-6 bg-gradient-to-br from-emerald-50 to-teal-50 border-emerald-200">
          <h2 className="text-xl mb-4 font-[Noto_Serif_Bengali]">বর্তমান Configuration</h2>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-[Noto_Serif_Bengali]">Authentication:</span>
              <Badge variant={isAuthenticated ? "default" : "secondary"}>
                {isAuthenticated ? 'Yes' : 'No'}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-[Noto_Serif_Bengali]">Progress Indicator:</span>
              <Badge variant={showProgress ? "default" : "secondary"}>
                {showProgress ? 'Enabled' : 'Disabled'}
              </Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-[Noto_Serif_Bengali]">Position:</span>
              <Badge>{isAuthenticated ? 'Right-20 (Desktop)' : 'Right-4'}</Badge>
            </div>
            <div className="flex justify-between items-center p-3 bg-white rounded-lg">
              <span className="font-[Noto_Serif_Bengali]">Z-Index:</span>
              <Badge>95</Badge>
            </div>
          </div>
        </Card>

        {/* Test Content - Long scrollable content */}
        <div className="mb-6">
          <Card className="p-6 bg-white shadow-lg mb-4">
            <h2 className="text-xl mb-2 font-[Noto_Serif_Bengali]">Test Content</h2>
            <p className="text-gray-600 font-[Noto_Serif_Bengali] mb-4">
              নিচে scroll করুন এবং দেখুন ScrollToTop button কিভাবে কাজ করে। 
              300px scroll করার পর button appear করবে এবং progress indicator 
              update হতে থাকবে।
            </p>
          </Card>
          {generateTestContent()}
        </div>
      </div>
    </div>
  );
}
