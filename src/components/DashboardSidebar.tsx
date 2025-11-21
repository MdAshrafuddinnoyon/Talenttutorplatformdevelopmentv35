import { Button } from './ui/button';
import { CardAvatar } from './ui/profile-avatar';
import { Home, Users, MessageSquare, Bell, Wallet, User, LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface DashboardSidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  tabs: Array<{ id: string; label: string; icon: any }>;
  userInfo?: {
    name: string;
    role: string;
    avatar?: string;
  };
  onLogout?: () => void;
}

export function DashboardSidebar({ 
  activeTab, 
  setActiveTab, 
  tabs, 
  userInfo,
  onLogout 
}: DashboardSidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const SidebarContent = () => (
    <>
      {/* User Info */}
      {userInfo && (
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <CardAvatar 
              src={userInfo.avatar}
              alt={userInfo.name}
              fallback={userInfo.name.charAt(0)}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{userInfo.name}</p>
              <p className="text-xs text-gray-500 truncate">{userInfo.role}</p>
            </div>
          </div>
        </div>
      )}

      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          return (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                setIsMobileMenuOpen(false);
              }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                activeTab === tab.id
                  ? 'bg-emerald-600 text-white shadow-lg'
                  : 'text-gray-700 hover:bg-gray-100'
              }`}
            >
              <Icon className="w-5 h-5 flex-shrink-0" />
              <span className="text-sm font-medium">{tab.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Logout */}
      {onLogout && (
        <div className="p-4 border-t border-gray-200 mt-auto">
          <Button
            variant="outline"
            className="w-full justify-start text-red-600 border-red-200 hover:bg-red-50"
            onClick={onLogout}
            className="font-[Noto_Serif_Bengali]"
          >
            <LogOut className="w-5 h-5 mr-3" />
            <span>লগআউট</span>
          </Button>
        </div>
      )}
    </>
  );

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-0 left-0 right-0 z-40 bg-white border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">TT</span>
            </div>
            <span className="font-bold text-gray-900">Talent Tutor</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </Button>
        </div>
      </div>

      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex lg:flex-col h-screen w-64 bg-white border-r border-gray-200 sticky top-0">
        <div className="p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold">TT</span>
            </div>
            <span className="font-bold text-gray-900">Talent Tutor</span>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto">
          <SidebarContent />
        </div>
      </aside>

      {/* Mobile Sidebar */}
      {isMobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 z-30 bg-black bg-opacity-50" onClick={() => setIsMobileMenuOpen(false)}>
          <aside 
            className="absolute left-0 top-0 bottom-0 w-64 bg-white shadow-xl flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="h-16" /> {/* Spacer for mobile header */}
            <div className="flex-1 overflow-y-auto">
              <SidebarContent />
            </div>
          </aside>
        </div>
      )}

      {/* Spacer for mobile header */}
      <div className="lg:hidden h-16" />
    </>
  );
}
