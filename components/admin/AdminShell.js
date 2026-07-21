'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/components/AuthProvider';
import { roleLabels } from '@/lib/admin-data';

// Grup menu admin (mengacu 21 modul Sheet Admin pada PRD).
const groups = [
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
    items: [{ href: '/admin/users', label: 'User & Role', icon: 'handshake' }],
  },
];

export default function AdminShell({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [collapsed, setCollapsed] = useState(false);
  const [expandedGroups, setExpandedGroups] = useState({});
  const { admin, ready, logoutAdmin } = useAuth();

  const isLoginPage = pathname === '/admin/login';

  // Guard: jika belum login & bukan halaman login, arahkan ke login.
  useEffect(() => {
    if (ready && !admin && !isLoginPage) {
      router.replace('/admin/login');
    }
  }, [ready, admin, isLoginPage, router]);

  // Halaman login admin tidak memakai shell.
  if (isLoginPage) return <div className="admin-auth-wrap">{children}</div>;

  // Tahan render konten admin sampai sesi terverifikasi.
  if (!ready || !admin) {
    return (
      <div className="admin-auth-wrap">
        <p className="admin-note">Memuat sesi…</p>
      </div>
    );
  }

  const initials = admin.name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
    .toUpperCase();

  function handleLogout() {
    logoutAdmin();
    router.replace('/admin/login');
  }

  return (
    <div className={`admin ${open ? 'is-open' : ''} ${collapsed ? 'is-collapsed' : ''}`}>
      <aside className="admin-side">
        <div className="admin-brand">
          <Image src="/img/rubin-logo.png" alt="PT IKN" width={34} height={34} />
          <div>
            <strong>PT IKN</strong>
            <span>Back-office</span>
          </div>
        </div>

        <nav className="admin-nav" aria-label="Navigasi admin">
          {groups.map((g) => {
            const isCollapsible = g.title !== 'Utama';
            const isExpanded = !isCollapsible || expandedGroups[g.title];
            
            return (
              <div key={g.title} className={`admin-nav-group ${isExpanded ? 'is-expanded' : ''}`}>
                {isCollapsible ? (
                  <button 
                    type="button" 
                    className="admin-nav-title-btn"
                    onClick={() => setExpandedGroups(prev => ({ ...prev, [g.title]: !prev[g.title] }))}
                  >
                    <span>{g.title}</span>
                    <Icon name="arrow" size={10} className="admin-nav-caret" />
                  </button>
                ) : (
                  <span className="admin-nav-title">{g.title}</span>
                )}
                
                <div className="admin-nav-items">
                  {g.items.map((it) => {
                    const active =
                      it.href === '/admin'
                        ? pathname === '/admin'
                        : pathname.startsWith(it.href);
                    return (
                      <Link
                        key={it.href}
                        href={it.href}
                        className={`admin-nav-link ${active ? 'is-active' : ''}`}
                        onClick={() => setOpen(false)}
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

        <button type="button" className="admin-logout" onClick={handleLogout}>
          <Icon name="arrow" size={16} /> <span>Keluar</span>
        </button>
      </aside>

      <div className="admin-main">
        <header className="admin-top">
          <button
            className="admin-burger"
            aria-label="Menu"
            aria-expanded={open || !collapsed}
            onClick={() => {
              if (typeof window !== 'undefined' && window.innerWidth <= 1000) {
                setOpen((v) => !v);
              } else {
                setCollapsed((v) => !v);
              }
            }}
          >
            <span /><span /><span />
          </button>
          <div className="admin-top-actions">
            <ThemeToggle />
            <Link href="/" className="admin-top-link">Lihat situs</Link>
            <span className="admin-user">
              <span className="admin-user-avatar">{initials}</span>
              <span className="admin-user-meta">
                <strong>{admin.name}</strong>
                <small>{roleLabels[admin.role]}</small>
              </span>
            </span>
          </div>
        </header>

        <div className="admin-content">{children}</div>
      </div>

      <button
        className="admin-scrim"
        aria-hidden={!open}
        tabIndex={-1}
        onClick={() => setOpen(false)}
      />
    </div>
  );
}
