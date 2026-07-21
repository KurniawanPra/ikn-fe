'use client';

import { useLang } from '@/components/LanguageProvider';
import { languages } from '@/lib/i18n';

// Switch bahasa: ID | EN (segmented pill).
export default function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className="nav-lang" role="group" aria-label="Bahasa / Language">
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`nav-lang-btn ${lang === l.code ? 'is-active' : ''}`}
          onClick={() => setLang(l.code)}
          aria-pressed={lang === l.code}
          title={l.name}
        >
          {l.label}
        </button>
      ))}
    </div>
  );
}
