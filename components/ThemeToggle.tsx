'use client';

import { useEffect, useState } from 'react';
import Icon from './Icon';
import styles from '@/components/Navbar.module.css';

// Toggle tema terang/gelap. Menyimpan pilihan di localStorage
// dan menyetel atribut data-theme pada <html>.
type Theme = 'light' | 'dark';

export default function ThemeToggle() {
  const [theme, setTheme] = useState<Theme | null>(null);

  // Baca tema yang sudah dipasang oleh skrip anti-flash saat mount.
  useEffect(() => {
    const stored = document.documentElement.getAttribute('data-theme');
    const current: Theme = stored === 'dark' ? 'dark' : 'light';
    setTheme(current);
  }, []);

  const toggle = () => {
    const next: Theme = theme === 'dark' ? 'light' : 'dark';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    try {
      localStorage.setItem('theme', next);
    } catch {}
  };

  const isDark = theme === 'dark';

  return (
    <button
      className={styles.theme}
      onClick={toggle}
      aria-label={isDark ? 'Aktifkan mode terang' : 'Aktifkan mode gelap'}
      title={isDark ? 'Mode terang' : 'Mode gelap'}
    >
      {/* Tampilkan ikon lawan tema aktif; fallback ke matahari sebelum mount */}
      <Icon name={isDark ? 'sun' : 'moon'} size={18} />
    </button>
  );
}
