'use client';

import { useEffect, useState } from 'react';
import Icon from './Icon';

// Toggle tema terang/gelap. Menyimpan pilihan di localStorage
// dan menyetel atribut data-theme pada <html>.
export default function ThemeToggle() {
  const [theme, setTheme] = useState(null);

  // Baca tema yang sudah dipasang oleh skrip anti-flash saat mount.
  useEffect(() => {
    const current =
      document.documentElement.getAttribute('data-theme') || 'light';
    setTheme(current);
  }, []);

  const toggle = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
  };

  const isDark = theme === 'dark';

  return (
    <button
      className="nav-theme"
      onClick={toggle}
      aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
      title={isDark ? 'Mode terang' : 'Mode gelap'}
    >
      {/* Tampilkan ikon lawan tema aktif; fallback ke matahari sebelum mount */}
      <Icon name={isDark ? 'sun' : 'moon'} size={18} />
    </button>
  );
}
