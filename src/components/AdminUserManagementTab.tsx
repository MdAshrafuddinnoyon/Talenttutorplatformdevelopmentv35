import { UserManagementSection } from './UserManagementSection';

interface AdminUserManagementTabProps {
  language: 'bn' | 'en';
}

export function AdminUserManagementTab({ language }: AdminUserManagementTabProps) {
  return (
    <div className="space-y-6">
      {/* Page Title */}
      <div className="bg-gradient-to-r from-emerald-600 to-teal-600 rounded-2xl p-8 text-white">
        <h1 className="text-3xl mb-2">👥 ব্যবহারকারী ব্যবস্থাপনা</h1>
        <p className="text-emerald-100">
          সব ইউজার সার্চ, ভেরিফাই, ম্যানেজ এবং মনিটর করুন
        </p>
        
        {/* Quick Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-xs text-purple-200">মোট ইউজার</p>
            <p className="text-2xl font-bold mt-1">1,234</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-xs text-purple-200">যাচাইকৃত</p>
            <p className="text-2xl font-bold mt-1">987</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-xs text-purple-200">পেন্ডিং</p>
            <p className="text-2xl font-bold mt-1">247</p>
          </div>
          <div className="bg-white/10 backdrop-blur rounded-xl p-4">
            <p className="text-xs text-purple-200">আজকের নতুন</p>
            <p className="text-2xl font-bold mt-1">12</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <UserManagementSection language={language} />
      
      {/* Help Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
        <h3 className="text-lg font-semibold text-blue-900 mb-2">💡 সাহায্য</h3>
        <ul className="space-y-2 text-sm text-blue-800">
          <li>• <strong>সার্চ:</strong> ফোন নম্বর, ইমেইল অথবা নাম দিয়ে খুঁজুন</li>
          <li>• <strong>ফিল্টার:</strong> নির্দিষ্ট ইউজার টাইপ (শিক্ষক/অভিভাবক/ছাত্র/দাতা) নির্বাচন করুন</li>
          <li>• <strong>ভেরিফাই:</strong> ডকুমেন্ট যাচাই করে green checkmark এ ক্লিক করুন</li>
          <li>• <strong>ক্রেডিট:</strong> Wallet আইকন ক্লিক করে ক্রেডিট যোগ/বিয়োগ করুন (মাইনাস - দিয়ে কাটা যাবে)</li>
          <li>• <strong>বাল্ক অ্যাকশন:</strong> একাধিক ইউজার নির্বাচন করে একসাথে ভেরিফাই/মুছুন</li>
        </ul>
      </div>
    </div>
  );
}
