import { AdminUserManagementTab } from '../components/AdminUserManagementTab';
import { Button } from '../components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

interface AdminUserManagementPageProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
}

export function AdminUserManagementPage({ language, setPage }: AdminUserManagementPageProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top Navigation */}
      <div className="bg-white border-b shadow-sm sticky top-0 z-10">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage('admin-dashboard')}
                className="flex items-center gap-2"
              >
                <ArrowLeft className="w-4 h-4" />
                অ্যাডমিন ড্যাশবোর্ডে ফিরুন
              </Button>
              
              <div className="h-6 w-px bg-gray-300"></div>
              
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setPage('home')}
                className="flex items-center gap-2"
              >
                <Home className="w-4 h-4" />
                হোম
              </Button>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="text-right">
                <p className="text-sm font-medium text-gray-900">অ্যাডমিন প্যানেল</p>
                <p className="text-xs text-gray-500">ব্যবহারকারী ব্যবস্থাপনা</p>
              </div>
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#10B981] to-[#059669] flex items-center justify-center text-white font-bold">
                A
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <AdminUserManagementTab language={language} />
      </div>
      
      {/* Footer Info */}
      <div className="bg-white border-t mt-12">
        <div className="container mx-auto px-4 py-6 text-center text-sm text-gray-600">
          <p>Talent Tutor Admin Panel • Developed by <strong>Web Search BD</strong></p>
          <p className="text-xs text-gray-400 mt-1">সব ডাটা সুরক্ষিত • নিরাপদ ব্যবস্থাপনা</p>
        </div>
      </div>
    </div>
  );
}
