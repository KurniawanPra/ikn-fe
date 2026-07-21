'use client';

import { useLang } from '@/components/LanguageProvider';
import { t } from '@/lib/i18n';

export default function HeroSubtitle() {
  const { lang } = useLang();
  const sub = (t[lang] || t.id).heroSub;

  return (
    <p className="lead">
      {sub}
    </p>
  );
}
