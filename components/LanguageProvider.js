'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import { defaultLang } from '@/lib/i18n';

const LanguageContext = createContext({
  lang: defaultLang,
  setLang: () => {},
});

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState(defaultLang);

  // Baca bahasa tersimpan saat mount (disetel juga oleh skrip anti-flash).
  useEffect(() => {
    const stored =
      document.documentElement.getAttribute('lang') ||
      (() => {
        try {
          return localStorage.getItem('lang');
        } catch {
          return null;
        }
      })();
    if (stored && stored !== lang) setLangState(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = (next) => {
    setLangState(next);
    document.documentElement.setAttribute('lang', next);
    try {
      localStorage.setItem('lang', next);
    } catch {}
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLang() {
  return useContext(LanguageContext);
}
