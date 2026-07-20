'use client';

import { useLang } from '@/components/LanguageProvider';
import { t } from '@/lib/i18n';

// Judul hero yang mengikuti bahasa aktif. Kata kedua diberi aksen (italic hijau).
export default function HeroTitle() {
  const { lang } = useLang();
  const lines = (t[lang] || t.id).heroTitle;

  return (
    <h1 className="display hero-title">
      {lines.map((line, i) => (
        <span key={i}>
          {i === 1 ? <span className="hero-title-em">{line}</span> : line}
          {i < lines.length - 1 && <br />}
        </span>
      ))}
    </h1>
  );
}
