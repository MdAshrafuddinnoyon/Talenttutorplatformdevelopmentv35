import { Home, Search, PlusSquare, User, Menu } from 'lucide-react';
import { motion } from 'motion/react';

interface MobileNavProps {
  language: 'bn' | 'en';
  setPage: (page: string) => void;
  activePage: string;
  isAuthenticated: boolean;
  userRole?: string | null;
  onMenuClick: () => void;
}

export function MobileNav({ language, setPage, activePage, isAuthenticated, userRole, onMenuClick }: MobileNavProps) {
  const navItems = [
    {
      id: 'home',
      icon: Home,
      label: language === 'bn' ? 'হোম' : 'Home',
      onClick: () => setPage('home'),
    },
    {
      id: 'find-teachers',
      icon: Search,
      label: language === 'bn' ? 'খুঁজুন' : 'Search',
      onClick: () => setPage('find-teachers'),
    },
    {
      id: 'post-tuition',
      icon: PlusSquare,
      label: language === 'bn' ? 'পোস্ট' : 'Post',
      onClick: () => setPage('browse-tuitions'), // Or handle post dialog logic
      highlight: true
    },
    {
      id: 'dashboard',
      icon: User,
      label: language === 'bn' ? 'প্রোফাইল' : 'Profile',
      onClick: () => {
        if (isAuthenticated && userRole) {
          setPage(`${userRole}-dashboard`);
        } else {
          setPage('login');
        }
      },
    },
    {
      id: 'menu',
      icon: Menu,
      label: language === 'bn' ? 'মেনু' : 'Menu',
      onClick: onMenuClick,
    }
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-t border-gray-200/50 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] pb-safe-area lg:hidden">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => {
          const isActive = activePage === item.id || (item.id === 'dashboard' && activePage.includes('dashboard'));
          
          return (
            <button
              key={item.id}
              onClick={item.onClick}
              className="relative flex flex-col items-center justify-center w-full h-full gap-1"
            >
              {item.highlight ? (
                <div className="absolute -top-6 p-3 rounded-full bg-gradient-to-tr from-emerald-500 to-teal-400 shadow-lg shadow-emerald-500/30 transform transition-transform active:scale-95">
                  <item.icon className="w-6 h-6 text-white" />
                </div>
              ) : (
                <>
                  <div className={`relative p-1.5 rounded-xl transition-all duration-300 ${isActive ? 'bg-emerald-50 text-emerald-600' : 'text-gray-500'}`}>
                    <item.icon className={`w-5 h-5 ${isActive ? 'stroke-[2.5px]' : 'stroke-2'}`} />
                    {isActive && (
                      <motion.div
                        layoutId="mobile-nav-indicator"
                        className="absolute inset-0 border-2 border-emerald-100 rounded-xl"
                        transition={{ duration: 0.3 }}
                      />
                    )}
                  </div>
                  <span className={`text-[10px] font-medium ${isActive ? 'text-emerald-600' : 'text-gray-500'} ${language === 'bn' ? 'font-[Noto_Serif_Bengali]' : ''}`}>
                    {item.label}
                  </span>
                </>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
}