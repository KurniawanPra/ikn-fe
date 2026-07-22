'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import ThemeToggle from '@/components/ThemeToggle';
import LangToggle from '@/components/LangToggle';
import SidebarToggle from '@/components/SidebarToggle';
import SessionLoader from '@/components/SessionLoader';
import type { ReactNode } from 'react';
import { useAuth } from '@/components/AuthProvider';
import { roleLabels } from '@/lib/admin-data';
import type { IconName } from '@/lib/types';
import styles from '@/components/admin/AdminShell.module.css';

interface NavItem {
  href: string;
  label: string;
  icon: IconName;
}
interface NavGroup {
  title: string;
  items: NavItem[];
}

// Grup menu admin (mengacu 21 modul Sheet Admin pada PRD).
const groups: NavGroup[] = [
  {
    title: 'Utama',
    items: [{ href: '/admin', label: 'Dashboard', icon: 'target' }],
  },
  {
    title: 'Commerce',
    items: [
      { href: '/admin/orders', label: 'Order', icon: 'drop' },
      { href: '/admin/payments', label: 'Payment', icon: 'check' },
      { href: '/admin/products', label: 'Produk', icon: 'flask' },
      { href: '/admin/product-categories', label: 'Kategori Produk', icon: 'gear' },
      { href: '/admin/customers', label: 'Customer', icon: 'handshake' },
      { href: '/admin/bank-accounts', label: 'Akun Bank', icon: 'target' },
      { href: '/admin/additional-fees', label: 'Tambahan Biaya', icon: 'plus' },
      { href: '/admin/reports/sales', label: 'Laporan Penjualan', icon: 'compass' },
    ],
  },
  {
    title: 'Konten',
    items: [
      { href: '/admin/navigation', label: 'Menu', icon: 'compass' },
      { href: '/admin/content/media', label: 'Video & Gambar', icon: 'play' },
      { href: '/admin/news', label: 'News', icon: 'quote' },
      { href: '/admin/certificates', label: 'Certificate', icon: 'check' },
      { href: '/admin/history', label: 'History', icon: 'compass' },
      { href: '/admin/vision-mission', label: 'Vision & Mission', icon: 'target' },
      { href: '/admin/contact', label: 'Contact Us', icon: 'pin' },
      { href: '/admin/gallery', label: 'Gallery', icon: 'play' },
      { href: '/admin/brochures', label: 'Brochure', icon: 'quote' },
      { href: '/admin/whistleblowing', label: 'Whistle Blowing', icon: 'leaf' },
    ],
  },
  {
    title: 'Sistem',
    items: [{ href: '/admin/users', label: 'Akun Admin', icon: 'handshake' }],
  },
];

export default function AdminShell({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState<Record<string, boolean>>({});
  const { admin, customer, ready, logoutAdmin } = useAuth();

  const isLoginPage = pathname === '/admin/login';

  // Guard: jika belum login & bukan halaman login, arahkan ke login.
  useEffect(() => {
    if (ready && customer) {
      router.replace('/dashboard');
    } else if (ready && !admin && !isLoginPage) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, admin, customer, isLoginPage, router]);

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1000px)');
    const syncViewport = () => setIsMobile(media.matches);
    syncViewport();
    media.addEventListener('change', syncViewport);

    const saved = window.localStorage.getItem('admin-sidebar-collapsed');
    if (saved !== null) setCollapsed(saved === 'true');

    return () => media.removeEventListener('change', syncViewport);
  }, []);

  useEffect(() => {
    window.localStorage.setItem('admin-sidebar-collapsed', String(collapsed));
  }, [collapsed]);

  useEffect(() => {
    setOpen(false);
    const activeGroup = groups.find((group) => group.items.some((item) => item.href !== '/admin' && pathname.startsWith(item.href)));
    if (activeGroup) setExpandedGroups((current) => ({ ...current, [activeGroup.title]: true }));
  }, [pathname]);

  useEffect(() => {
    if (!open || !isMobile) return;
    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false);
    };
    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isMobile, open]);

  // Halaman login admin tidak memakai shell.
  if (isLoginPage && !customer) return <div className="admin-auth-wrap">{children}</div>;

  // Tahan render konten admin sampai sesi terverifikasi.
  if (!ready || !admin) {
    return <SessionLoader message="Memuat sesi admin..." portalName="Back-office Admin" />;
  }

  const initials = admin.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  function handleLogout() {
    logoutAdmin();
    router.replace('/login');
  }

  function toggleSidebar() {
    if (isMobile) setOpen((value) => !value);
    else setCollapsed((value) => !value);
  }

  return (
    <div className={`${styles.shell} ${open ? styles.open : ''} ${collapsed ? styles.collapsed : ''}`}>
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHeader}>
          <Link href="/admin" className={styles.brand}>
            <Image src="/img/rubin-logo.png" alt="PT IKN" width={34} height={34} />
            <div className={styles.brandText}>
              <strong>PT IKN</strong>
              <span>Back-office</span>
            </div>
          </Link>
          <SidebarToggle
            expanded={open}
            onClick={() => setOpen(false)}
            className={styles.drawerClose}
            closeLabel="Tutup menu admin"
          />
        </div>

        <nav className={styles.nav} aria-label="Navigasi admin">
          {groups.map((g) => {
            const isCollapsible = g.title !== 'Utama';
            const isExpanded = !isCollapsible || expandedGroups[g.title];
            
            return (
              <div key={g.title} className={`${styles.navGroup} ${isExpanded ? styles.expanded : ''}`}>
                {isCollapsible ? (
                  <button 
                    type="button" 
                    className={styles.groupButton}
                    onClick={() => setExpandedGroups(prev => ({ ...prev, [g.title]: !prev[g.title] }))}
                  >
                    <span>{g.title}</span>
                    <Icon name="arrow" size={10} className={styles.caret} />
                  </button>
                ) : (
                  <span className={styles.groupTitle}>{g.title}</span>
                )}
                
                <div className={styles.navItems}>
                  {g.items.map((it) => {
                    const active =
                      it.href === '/admin'
                        ? pathname === '/admin'
                        : pathname.startsWith(it.href);
                    return (
                      <Link
                        key={it.href}
                        href={it.href}
                        className={`${styles.navLink} ${active ? styles.active : ''}`}
                        onClick={() => setOpen(false)}
                        title={collapsed && !isMobile ? it.label : undefined}
                      >
                        <Icon name={it.icon} size={17} />
                        <span>{it.label}</span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </nav>

        <button type="button" className={styles.logout} onClick={handleLogout} title={collapsed && !isMobile ? 'Keluar' : undefined}>
          <Icon name="arrow" size={16} /> <span>Keluar</span>
        </button>
      </aside>

      <div className={styles.main}>
        <header className={styles.topbar}>
          <SidebarToggle
            expanded={isMobile ? open : collapsed}
            onClick={toggleSidebar}
            openLabel="Buka menu admin"
            closeLabel={isMobile ? 'Tutup menu admin' : 'Ciutkan sidebar admin'}
          />
          <div className={styles.topActions}>
            <LangToggle />
            <ThemeToggle />
            <Link href="/" className={styles.siteLink}>Lihat situs</Link>
            <span className={styles.user}>
              <span className={styles.avatar}>{initials}</span>
              <span className={styles.userMeta}>
                <strong>{admin.name}</strong>
                <small>{roleLabels[admin.role]}</small>
              </span>
            </span>
          </div>
        </header>

        <div className={styles.content}>{children}</div>
      </div>

      <button
        className={styles.scrim}
        type="button"
        aria-label="Tutup menu admin"
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
    </div>
  );
}
