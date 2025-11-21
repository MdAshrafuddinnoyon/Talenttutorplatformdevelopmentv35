/**
 * Credit System Tester Component
 * Test and verify credit system functionality
 */

import { useState, useEffect } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  CheckCircle, 
  XCircle, 
  Wallet, 
  RefreshCw,
  Package,
  Users,
  AlertCircle,
} from 'lucide-react';
import { 
  getAllPackages,
  getUserCredits,
  getOrCreateUserCredits,
  getCurrentBalance,
  applyToTuition,
  postTuition,
  hireTeacher,
  purchasePackage,
  getAllUsersWithCredits,
} from '../utils/localStorageCredit';
import { CREDIT_COSTS } from '../utils/creditSystem';

interface CreditSystemTesterProps {
  language: 'bn' | 'en';
}

const content = {
  bn: {
    title: 'ক্রেডিট সিস্টেম টেস্টার',
    subtitle: 'সিস্টেম কার্যকারিতা পরীক্ষা করুন',
    packages: 'প্যাকেজ',
    users: 'ইউজার',
    tests: 'টেস্ট',
    refresh: 'রিফ্রেশ',
    testAll: 'সব টেস্ট চালান',
    testResult: 'টেস্ট রেজাল্ট',
    passed: 'পাস',
    failed: 'ফেইল',
    packagesLoaded: 'প্যাকেজ লোড হয়েছে',
    teacherCredits: 'শিক্ষক ক্রেডিট',
    guardianCredits: 'অভিভাবক ক্রেডিট',
    applyTest: 'আবেদন টেস্ট',
    postTest: 'পোস্ট টেস্ট',
    hireTest: 'নিয়োগ টেস্ট',
    purchaseTest: 'ক্রয় টেস্ট',
  },
  en: {
    title: 'Credit System Tester',
    subtitle: 'Test system functionality',
    packages: 'Packages',
    users: 'Users',
    tests: 'Tests',
    refresh: 'Refresh',
    testAll: 'Run All Tests',
    testResult: 'Test Result',
    passed: 'Passed',
    failed: 'Failed',
    packagesLoaded: 'Packages Loaded',
    teacherCredits: 'Teacher Credits',
    guardianCredits: 'Guardian Credits',
    applyTest: 'Apply Test',
    postTest: 'Post Test',
    hireTest: 'Hire Test',
    purchaseTest: 'Purchase Test',
  },
};

export function CreditSystemTester({ language }: CreditSystemTesterProps) {
  const t = content[language];
  const [testResults, setTestResults] = useState<Record<string, boolean>>({});
  const [stats, setStats] = useState({
    packages: 0,
    users: 0,
    teacherBalance: 0,
    guardianBalance: 0,
  });

  const runTests = () => {
    const results: Record<string, boolean> = {};

    try {
      // Test 1: Load packages
      const packages = getAllPackages();
      results.packagesLoaded = packages.length > 0;
      
      // Test 2: Create teacher credits
      const teacherUser = getOrCreateUserCredits('test-teacher-001', 'teacher');
      results.teacherCreated = teacherUser.currentBalance === CREDIT_COSTS.TEACHER_SIGNUP_BONUS;
      
      // Test 3: Create guardian credits
      const guardianUser = getOrCreateUserCredits('test-guardian-001', 'guardian');
      results.guardianCreated = guardianUser.currentBalance === CREDIT_COSTS.GUARDIAN_SIGNUP_BONUS;
      
      // Test 4: Apply to tuition (teacher)
      try {
        const beforeBalance = getCurrentBalance('test-teacher-001');
        applyToTuition('test-teacher-001', 'test-tuition-1', language);
        const afterBalance = getCurrentBalance('test-teacher-001');
        results.applyToTuition = afterBalance === beforeBalance - CREDIT_COSTS.APPLY_TO_TUITION;
      } catch (error) {
        results.applyToTuition = false;
      }
      
      // Test 5: Post tuition (guardian)
      try {
        const beforeBalance = getCurrentBalance('test-guardian-001');
        postTuition('test-guardian-001', 'test-tuition-2', language);
        const afterBalance = getCurrentBalance('test-guardian-001');
        results.postTuition = afterBalance === beforeBalance - CREDIT_COSTS.POST_TUITION;
      } catch (error) {
        results.postTuition = false;
      }
      
      // Test 6: Hire teacher (guardian)
      try {
        const beforeBalance = getCurrentBalance('test-guardian-001');
        hireTeacher('test-guardian-001', 'test-teacher-001', 'test-tuition-3', language);
        const afterBalance = getCurrentBalance('test-guardian-001');
        results.hireTeacher = afterBalance === beforeBalance - CREDIT_COSTS.SEND_INVITATION;
      } catch (error) {
        results.hireTeacher = false;
      }
      
      // Test 7: Purchase package
      try {
        const teacherPackage = packages.find(p => p.userType === 'teacher' && !p.isFree);
        if (teacherPackage) {
          const beforeBalance = getCurrentBalance('test-teacher-001');
          purchasePackage('test-teacher-001', teacherPackage.id, language);
          const afterBalance = getCurrentBalance('test-teacher-001');
          const expectedIncrease = teacherPackage.credits + (teacherPackage.bonus || 0);
          results.purchasePackage = afterBalance === beforeBalance + expectedIncrease;
        } else {
          results.purchasePackage = false;
        }
      } catch (error) {
        results.purchasePackage = false;
      }

      setTestResults(results);
      updateStats();
    } catch (error) {
      console.error('Test error:', error);
    }
  };

  const updateStats = () => {
    try {
      const packages = getAllPackages();
      const users = getAllUsersWithCredits();
      const teacherBalance = getCurrentBalance('test-teacher-001');
      const guardianBalance = getCurrentBalance('test-guardian-001');

      setStats({
        packages: packages.length,
        users: users.length,
        teacherBalance,
        guardianBalance,
      });
    } catch (error) {
      console.error('Stats error:', error);
    }
  };

  useEffect(() => {
    updateStats();
  }, []);

  const passedTests = Object.values(testResults).filter(Boolean).length;
  const totalTests = Object.keys(testResults).length;

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-blue-50 to-indigo-50 border-2 border-blue-200">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900">{t.title}</h3>
            <p className="text-gray-600">{t.subtitle}</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={updateStats}>
              <RefreshCw className="w-4 h-4 mr-2" />
              {t.refresh}
            </Button>
            <Button size="sm" onClick={runTests} className="bg-blue-600">
              <CheckCircle className="w-4 h-4 mr-2" />
              {t.testAll}
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          <Card className="p-4 bg-white">
            <div className="flex items-center gap-2 mb-1">
              <Package className="w-4 h-4 text-blue-600" />
              <span className="text-sm text-gray-600">{t.packages}</span>
            </div>
            <div className="text-2xl font-bold">{stats.packages}</div>
          </Card>

          <Card className="p-4 bg-white">
            <div className="flex items-center gap-2 mb-1">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-sm text-gray-600">{t.users}</span>
            </div>
            <div className="text-2xl font-bold">{stats.users}</div>
          </Card>

          <Card className="p-4 bg-white">
            <div className="flex items-center gap-2 mb-1">
              <Wallet className="w-4 h-4 text-emerald-600" />
              <span className="text-sm text-gray-600">{t.teacherCredits}</span>
            </div>
            <div className="text-2xl font-bold">{stats.teacherBalance}</div>
          </Card>

          <Card className="p-4 bg-white">
            <div className="flex items-center gap-2 mb-1">
              <Wallet className="w-4 h-4 text-teal-600" />
              <span className="text-sm text-gray-600">{t.guardianCredits}</span>
            </div>
            <div className="text-2xl font-bold">{stats.guardianBalance}</div>
          </Card>
        </div>

        {/* Test Results */}
        {totalTests > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-gray-900">{t.testResult}</h4>
              <Badge className={passedTests === totalTests ? 'bg-green-600' : 'bg-yellow-600'}>
                {passedTests} / {totalTests} {t.passed}
              </Badge>
            </div>

            <div className="space-y-2">
              {Object.entries(testResults).map(([test, passed]) => (
                <div key={test} className="flex items-center justify-between p-3 bg-white rounded-lg">
                  <span className="text-sm text-gray-700">{test}</span>
                  {passed ? (
                    <CheckCircle className="w-5 h-5 text-green-600" />
                  ) : (
                    <XCircle className="w-5 h-5 text-red-600" />
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {totalTests === 0 && (
          <div className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-gray-400 mx-auto mb-3" />
            <p className="text-gray-600">
              {language === 'bn' 
                ? 'টেস্ট চালাতে "সব টেস্ট চালান" বাটন ক্লিক করুন'
                : 'Click "Run All Tests" button to start testing'
              }
            </p>
          </div>
        )}
      </Card>

      {/* Debug Info */}
      <Card className="p-4 bg-gray-50">
        <details>
          <summary className="cursor-pointer font-semibold text-gray-700 mb-2">
            Debug Information
          </summary>
          <pre className="text-xs bg-white p-3 rounded overflow-auto max-h-96">
            {JSON.stringify({ testResults, stats }, null, 2)}
          </pre>
        </details>
      </Card>
    </div>
  );
}
