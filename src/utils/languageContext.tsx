import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Language type definition
export type Language = 'en' | 'bn';

// Language Context Interface
interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Create the context
const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

// Language Provider Props
interface LanguageProviderProps {
  children: ReactNode;
  initialLanguage?: Language;
}

// Language Provider Component
export function LanguageProvider({ children, initialLanguage = 'en' }: LanguageProviderProps) {
  const [language, setLanguageState] = useState<Language>(() => {
    // Check localStorage for saved language preference
    const saved = localStorage.getItem('app_language');
    return (saved as Language) || initialLanguage;
  });

  // Save language preference to localStorage
  useEffect(() => {
    localStorage.setItem('app_language', language);
    
    // Update HTML lang attribute for font switching and accessibility
    document.documentElement.lang = language;
    document.body.lang = language;
  }, [language]);

  const setLanguage = (lang: Language) => {
    setLanguageState(lang);
  };

  // Simple translation function (basic version)
  const t = (key: string): string => {
    return key; // Components will use their own translation objects
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

// Custom hook to use language context
export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}

// Export Language type for use in other components
export default LanguageContext;
