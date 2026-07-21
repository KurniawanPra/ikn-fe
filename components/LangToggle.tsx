'use client';

import { useLang } from '@/components/LanguageProvider';
import { languages } from '@/lib/i18n';
import styles from '@/components/Navbar.module.css';

// Switch bahasa: ID | EN (segmented pill).
export default function LangToggle() {
  const { lang, setLang } = useLang();

  return (
    <div className={styles.lang} role="group" aria-label="Bahasa / Language">
      {languages.map((l) => (
        <button
          key={l.code}
          type="button"
          className={`${styles.langButton} ${lang === l.code ? styles.controlActive : ''}`}
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
