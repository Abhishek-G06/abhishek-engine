import { createContext, useContext, useState, useCallback, useEffect, ReactNode } from "react";
import translations, { Language } from "./translations";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
  isTransitioning: boolean;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const getInitialLanguage = (): Language => {
  const stored = localStorage.getItem("portfolio-language");
  if (stored && ["en", "ja", "es", "de"].includes(stored)) {
    return stored as Language;
  }
  return "en";
};

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<Language>(getInitialLanguage);

  const [isTransitioning, setIsTransitioning] = useState(false);

  const setLanguage = useCallback((lang: Language) => {
    if (lang === language) return;
    setIsTransitioning(true);
    setTimeout(() => {
      setLanguageState(lang);
      localStorage.setItem("portfolio-language", lang);
      document.documentElement.lang = lang;
      setTimeout(() => setIsTransitioning(false), 150);
    }, 150);
  }, [language]);

  // Set initial lang attribute
  useEffect(() => {
    document.documentElement.lang = language;
  }, []);

  const t = useCallback(
    (key: string): string => {
      return translations[language][key] || translations.en[key] || key;
    },
    [language]
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t, isTransitioning }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};
