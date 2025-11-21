import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Lock, Eye, EyeOff, CheckCircle, Loader2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner@2.0.3';
import * as authService from '../utils/authService';

interface ResetPasswordPageProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
}

export function ResetPasswordPage({ language, setPage }: ResetPasswordPageProps) {
  
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const content = {
    bn: {
      title: 'নতুন পাসওয়ার্ড সেট করুন',
      description: 'আপনার অ্যাকাউন্টের জন্য একটি নতুন পাসওয়ার্ড তৈরি করুন',
      password: 'নতুন পাসওয়ার্ড',
      passwordPlaceholder: 'নতুন পাসওয়ার্ড লিখুন',
      confirmPassword: 'পাসওয়ার্ড নিশ্চিত করুন',
      confirmPasswordPlaceholder: 'পাসওয়ার্ড আবার লিখুন',
      resetButton: 'পাসওয়ার্ড রিসেট করুন',
      resetting: 'রিসেট করা হচ্ছে...',
      successTitle: 'সফল হয়েছে!',
      successMessage: 'আপনার পাসওয়ার্ড সফলভাবে রিসেট হয়েছে',
      backToLogin: 'লগইন পেজে ফিরে যান',
      errorInvalidLink: 'রিসেট লিঙ্ক সঠিক নয় বা মেয়াদ শেষ হয়ে গেছে',
      errorPasswordMismatch: 'পাসওয়ার্ড মিলছে না',
      errorPasswordLength: 'পাসওয়ার্ড কমপক্ষে ৬ অক্ষরের হতে হবে'
    },
    en: {
      title: 'Set New Password',
      description: 'Create a new password for your account',
      password: 'New Password',
      passwordPlaceholder: 'Enter new password',
      confirmPassword: 'Confirm Password',
      confirmPasswordPlaceholder: 'Re-enter password',
      resetButton: 'Reset Password',
      resetting: 'Resetting...',
      successTitle: 'Success!',
      successMessage: 'Your password has been reset successfully',
      backToLogin: 'Back to Login',
      errorInvalidLink: 'Invalid or expired reset link',
      errorPasswordMismatch: 'Passwords do not match',
      errorPasswordLength: 'Password must be at least 6 characters long'
    }
  };

  const t = content[language];

  useEffect(() => {
    // Check if we have the reset token in URL
    const urlParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = urlParams.get('access_token');
    const type = urlParams.get('type');
    
    if (!accessToken || type !== 'recovery') {
      console.log('No valid reset token found in URL');
      // Don't redirect immediately - user might have manually navigated here
    }
  }, []);

  const handleResetPassword = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!password || !confirmPassword) {
      toast.error(language === 'bn' ? 'সব ফিল্ড পূরণ করুন' : 'Please fill all fields');
      return;
    }

    if (password.length < 6) {
      toast.error(t.errorPasswordLength);
      return;
    }

    if (password !== confirmPassword) {
      toast.error(t.errorPasswordMismatch);
      return;
    }

    setIsLoading(true);

    try {
      const result = await authService.updatePasswordWithToken(password);

      if (result.success) {
        setIsSuccess(true);
        toast.success(
          language === 'bn' 
            ? 'পাসওয়ার্ড সফলভাবে রিসেট হয়েছে' 
            : 'Password reset successfully'
        );
        
        // Redirect to home page after 3 seconds
        setTimeout(() => setPage('home'), 3000);
      } else {
        toast.error(
          language === 'bn' 
            ? result.error || 'পাসওয়ার্ড রিসেট ব্যর্থ' 
            : result.error || 'Password reset failed'
        );
      }
    } catch (error) {
      console.error('Reset password error:', error);
      toast.error(
        language === 'bn' 
          ? 'সমস্যা হয়েছে, আবার চেষ্টা করুন' 
          : 'Something went wrong, please try again'
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-purple-50 p-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="max-w-md w-full"
        >
          <Card className="border-2 shadow-xl">
            <CardHeader className="text-center space-y-4">
              <div className="flex justify-center">
                <div className="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center shadow-lg">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
              </div>
              <CardTitle className="text-2xl">{t.successTitle}</CardTitle>
              <CardDescription className="text-base">
                {t.successMessage}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Button 
                onClick={() => setPage('home')} 
                className="w-full h-12 bg-gradient-to-r from-teal-500 to-teal-600 hover:from-teal-600 hover:to-teal-700"
              >
                {t.backToLogin}
              </Button>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 via-white to-purple-50 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full"
      >
        <Card className="border-2 shadow-xl">
          <CardHeader className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                <Lock className="w-8 h-8 text-white" />
              </div>
            </div>
            <CardTitle className="text-2xl">{t.title}</CardTitle>
            <CardDescription>{t.description}</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleResetPassword} className="space-y-4">
              {/* New Password */}
              <div>
                <Label htmlFor="password" className="text-sm mb-2 block">
                  {t.password}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder={t.passwordPlaceholder}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <Label htmlFor="confirmPassword" className="text-sm mb-2 block">
                  {t.confirmPassword}
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type={showConfirmPassword ? 'text' : 'password'}
                    placeholder={t.confirmPasswordPlaceholder}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 pr-10 h-12 border-2"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              {/* Reset Button */}
              <Button 
                type="submit" 
                disabled={isLoading}
                className="w-full h-12 bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 disabled:opacity-50"
              >
                {isLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    {t.resetting}
                  </>
                ) : (
                  t.resetButton
                )}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
