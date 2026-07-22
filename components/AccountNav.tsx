'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LanguageProvider';
import { t } from '@/lib/i18n';
import Icon from '@/components/Icon';
import type { IconName } from '@/lib/types';
import styles from '@/components/AccountNav.module.css';

export default function AccountNav({ collapsed = false }: { collapsed?: boolean }) {
  const pathname = usePathname();
  const router = useRouter();
  const { logoutCustomer } = useAuth();
  const { lang } = useLang();
  const [settingsOpen, setSettingsOpen] = useState(false);

  const ui = t[lang] || t.id;
  const n = ui.navAccount;

  const mainLinks: { href: string; label: string; icon: IconName; exact?: boolean }[] = [
    { href: '/dashboard', label: n.dashboard, icon: 'target', exact: true },
    { href: '/dashboard/katalog', label: n.shop, icon: 'flask', exact: true },
    { href: '/dashboard/pesanan', label: n.orders, icon: 'drop' },
  ];
  
  const settingLinks: { href: string; label: string; icon: IconName }[] = [
    { href: '/dashboard/profil', label: n.profile, icon: 'handshake' },
    { href: '/dashboard/perusahaan', label: n.company, icon: 'gear' },
    { href: '/dashboard/alamat', label: n.address, icon: 'pin' },
  ];

  useEffect(() => {
    if (settingLinks.some(link => pathname.startsWith(link.href))) {
      setSettingsOpen(true);
    }
  }, [pathname]);

  function handleLogout() {
    logoutCustomer();
    router.replace('/login');
  }

  return (
    <nav className={`${styles.nav} ${collapsed ? styles.collapsedNav : ''}`} aria-label="Navigasi akun">
      {mainLinks.map((link) => {
        const active = link.exact ? pathname === link.href : pathname.startsWith(link.href);
        return (
          <Link
            key={link.href}
            href={link.href}
            className={`${styles.link} ${active ? styles.active : ''}`}
            title={collapsed ? link.label : undefined}
          >
            <Icon name={link.icon} size={19} /> <span className={styles.linkLabel}>{link.label}</span>
          </Link>
        );
      })}

      <div className={styles.collapsible}>
        <button 
          type="button" 
          className={`${styles.link} ${styles.openBtn}`}
          onClick={() => setSettingsOpen(!settingsOpen)}
          aria-expanded={settingsOpen}
          title={collapsed ? n.settings : undefined}
        >
          <Icon name="gear" size={19} /> <span className={styles.linkLabel}>{n.settings}</span>
          <Icon name="chevronRight" size={16} className={styles.chevron} style={{ transform: settingsOpen ? 'rotate(90deg)' : 'none' }} />
        </button>
        <div className={`${styles.collapseBody} ${settingsOpen ? styles.open : ''}`}>
          {settingLinks.map((link) => {
            const active = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`${styles.subLink} ${active ? styles.active : ''}`}
                title={collapsed ? link.label : undefined}
              >
                <Icon name={link.icon} size={17} /> <span className={styles.linkLabel}>{link.label}</span>
              </Link>
            );
          })}
        </div>
      </div>

      <button type="button" className={`${styles.link} ${styles.logout}`} onClick={handleLogout} title={collapsed ? n.logout : undefined}>
        <Icon name="arrow" size={19} /> <span className={styles.linkLabel}>{n.logout}</span>
      </button>
    </nav>
  );
}
