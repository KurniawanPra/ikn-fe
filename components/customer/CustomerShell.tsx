'use client';

import { useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import AccountNav from '@/components/AccountNav';
import CustomerGuard from '@/components/CustomerGuard';
import ThemeToggle from '@/components/ThemeToggle';
import { useAuth } from '@/components/AuthProvider';

function pageTitle(pathname: string): string {
  if (pathname === '/dashboard') return 'Dashboard';
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
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const initials = customer?.name
    .split(' ')
    .map((part) => part[0])
    .slice(0, 2)
    .join('')
    .toUpperCase() ?? 'CU';

  return (
    <CustomerGuard>
      <div className={`customer-portal ${open ? 'is-open' : ''}`}>
        <aside className="customer-side">
          <Link href="/dashboard" className="customer-brand">
            <Image src="/img/rubin-logo.png" alt="PT IKN" width={38} height={38} priority />
            <span><strong>PT IKN</strong><small>Portal Customer</small></span>
          </Link>

          <div className="customer-identity">
            <span className="customer-avatar">{initials}</span>
            <span><strong>{customer?.name}</strong><small>{customer?.company}</small></span>
          </div>

          <AccountNav />
        </aside>

        <div className="customer-main">
          <header className="customer-topbar">
            <button type="button" className="customer-burger" aria-label="Buka menu dashboard" aria-expanded={open} onClick={() => setOpen((value) => !value)}>
              <span /><span /><span />
            </button>
            <div className="customer-page-title"><small>Portal Customer</small><strong>{pageTitle(pathname)}</strong></div>
            <div className="customer-top-actions">
              <ThemeToggle />
              <Link href="/" className="customer-site-link">Lihat situs</Link>
              <span className="customer-top-user"><span className="customer-avatar customer-avatar-sm">{initials}</span><strong>{customer?.name}</strong></span>
            </div>
          </header>

          <main className="customer-content">{children}</main>
        </div>

        <button type="button" className="customer-scrim" aria-label="Tutup menu dashboard" onClick={() => setOpen(false)} />
      </div>
    </CustomerGuard>
  );
}
