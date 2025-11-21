import { Globe } from 'lucide-react';
import { Button } from './ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from './ui/dropdown-menu';

interface LanguageSwitcherProps {
  language: 'bn' | 'en';
  setLanguage: (lang: 'bn' | 'en') => void;
  variant?: 'default' | 'header' | 'settings';
}

export function LanguageSwitcher({ language, setLanguage, variant = 'default' }: LanguageSwitcherProps) {
  const languages = [
    { code: 'en' as const, name: 'English', nativeName: 'English' },
    { code: 'bn' as const, name: 'Bengali', nativeName: 'বাংলা' },
  ];

  const currentLanguage = languages.find(lang => lang.code === language);

  if (variant === 'settings') {
    // For settings page - simple button list
    return (
      <div className="space-y-2">
        {languages.map((lang) => (
          <button
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`w-full text-left px-4 py-3 rounded-lg transition-all ${
              language === lang.code
                ? 'bg-gradient-to-r from-emerald-600 to-teal-600 text-white shadow-lg'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <div className="font-medium">{lang.name}</div>
                <div className="text-sm opacity-80">{lang.nativeName}</div>
              </div>
              {language === lang.code && (
                <div className="w-2 h-2 rounded-full bg-white"></div>
              )}
            </div>
          </button>
        ))}
      </div>
    );
  }

  // For header - dropdown menu
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          size="sm"
          className="hover:bg-white/10 transition-colors"
        >
          <Globe className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-48">
        {languages.map((lang) => (
          <DropdownMenuItem
            key={lang.code}
            onClick={() => setLanguage(lang.code)}
            className={`cursor-pointer ${
              language === lang.code ? 'bg-emerald-50 text-emerald-700' : ''
            }`}
          >
            <div className="flex items-center justify-between w-full">
              <div>
                <div className="font-medium">{lang.name}</div>
                <div className="text-xs text-gray-500">{lang.nativeName}</div>
              </div>
              {language === lang.code && (
                <div className="w-2 h-2 rounded-full bg-emerald-600"></div>
              )}
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
