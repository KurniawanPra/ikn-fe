'use client';

import { createContext, useContext, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { defaultLang } from '@/lib/i18n';
import type { Lang } from '@/lib/types';

interface LanguageContextValue {
  lang: Lang;
  setLang: (next: Lang) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: defaultLang,
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(defaultLang);

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
    if ((stored === 'id' || stored === 'en') && stored !== lang) setLangState(stored);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setLang = (next: Lang) => {
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
