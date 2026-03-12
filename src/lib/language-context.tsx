import { createContext, useContext, useEffect, useMemo, useState, ReactNode } from 'react';
import { Language, DEFAULT_LANGUAGE } from './i18n';

interface LanguageContextValue {
  language: Language;
  setLanguage: (next: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  useEffect(() => {
    const stored = localStorage.getItem('app-language') as Language | null;
    if (stored === 'pt' || stored === 'en') {
      setLanguage(stored);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('app-language', language);
  }, [language]);

  const value = useMemo(() => ({ language, setLanguage }), [language]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within LanguageProvider');
  }
  return context;
}
