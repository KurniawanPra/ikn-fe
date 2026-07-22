'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AccountNav from '@/components/AccountNav';
import CustomerGuard from '@/components/CustomerGuard';
import ThemeToggle from '@/components/ThemeToggle';
import LangToggle from '@/components/LangToggle';
import CustomerCart from '@/components/customer/CustomerCart';
import SidebarToggle from '@/components/SidebarToggle';
import { useAuth } from '@/components/AuthProvider';
import { useLang } from '@/components/LanguageProvider';
import { t } from '@/lib/i18n';
import styles from '@/components/customer/CustomerShell.module.css';

function pageTitle(pathname: string): string {
  if (pathname === '/dashboard') return 'Dashboard';
  if (pathname === '/dashboard/katalog') return 'Katalog produk & Shop';
  if (pathname === '/dashboard/pesanan') return 'Pesanan saya';
  if (pathname.startsWith('/dashboard/pesanan/')) return 'Detail pesanan';
  if (pathname === '/dashboard/profil') return 'Profil customer';
  if (pathname === '/dashboard/perusahaan') return 'Profil perusahaan';
  if (pathname === '/dashboard/alamat') return 'Alamat pengiriman';
  return 'Portal customer';
}

export default function CustomerShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { customer } = useAuth();
  const { lang } = useLang();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    setMobileOpen(false);
    setUserMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1000px)');
    const syncViewport = () => setIsMobile(media.matches);
    syncViewport();
    media.addEventListener('change', syncViewport);

    const saved = window.localStorage.getItem('customer-sidebar-collapsed');
    if (saved !== null) setCollapsed(saved === 'true');

    return () => media.removeEventListener('change', syncViewport);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('customer-sidebar-collapsed', String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    if (!mobileOpen || !isMobile) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setMobileOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMobile, mobileOpen]);

  const ui = t[lang] || t.id;

  function toggleSidebar() {
    if (isMobile) setMobileOpen((value) => !value);
    else setCollapsed((value) => !value);
  }

  const initials = customer?.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? 'CU';

  return (
    <CustomerGuard>
      <div className={`${styles.portal} ${mobileOpen ? styles.open : ''} ${collapsed ? styles.collapsed : ''}`}>
        <aside className={styles.sidebar}>
          <div className={styles.sidebarHeader}>
            <Link href="/dashboard" className={styles.brand}>
              <Image src="/img/rubin-logo.png" alt="PT IKN" width={38} height={38} priority />
              <span className={styles.brandText}><strong>PT IKN</strong><small>Portal Customer</small></span>
            </Link>
            <SidebarToggle
              expanded={mobileOpen}
              onClick={() => setMobileOpen(false)}
              className={styles.drawerClose}
              closeLabel="Tutup menu dashboard"
            />
          </div>

          <AccountNav collapsed={collapsed && !isMobile} />
        </aside>

        <div className={styles.main}>
          <header className={styles.topbar}>
            <div className={styles.topbarInner}>
              <SidebarToggle
                expanded={isMobile ? mobileOpen : collapsed}
                onClick={toggleSidebar}
                openLabel="Buka menu dashboard"
                closeLabel={isMobile ? 'Tutup menu dashboard' : 'Ciutkan sidebar'}
              />
              <div className={styles.pageTitle}><small>Portal Customer</small><strong>{pageTitle(pathname)}</strong></div>
              <div className={styles.topActions}>
                <LangToggle />
                <ThemeToggle />
                <Link href="/" className={styles.siteLink}>{lang === 'en' ? 'View site' : 'Lihat situs'}</Link>
                <CustomerCart />
                
                <div className={styles.userMenuWrapper}>
                  <button 
                    type="button" 
                    className={styles.topUserBtn} 
                    onClick={() => setUserMenuOpen(!userMenuOpen)}
                    aria-expanded={userMenuOpen}
                  >
                    <span className={`${styles.avatar} ${styles.avatarSmall}`}>{initials}</span>
                    <span className={styles.topUserInfo}>
                      <strong>{customer?.name}</strong>
                      <small>{customer?.company}</small>
                    </span>
                  </button>

                  {userMenuOpen && (
                    <div className={styles.userDropdown}>
                      <div className={styles.dropdownHeader}>
                        <span className={styles.avatar}>{initials}</span>
                        <div className={styles.dropdownIdentity}>
                          <strong>{customer?.name}</strong>
                          <small>{customer?.company}</small>
                        </div>
                      </div>
                      <div className={styles.dropdownLinks}>
                        <Link href="/dashboard/profil" className={styles.dropdownItem}>{ui.navAccount.profile}</Link>
                        <Link href="/kontak" className={styles.dropdownItem}>Help</Link>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </header>

          <main className={styles.content}>{children}</main>
        </div>

        <button type="button" className={styles.scrim} aria-label="Tutup menu dashboard" onClick={() => setMobileOpen(false)} />
      </div>
    </CustomerGuard>
  );
}
