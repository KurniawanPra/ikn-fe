'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import Icon from '@/components/Icon';
import { useAuth } from '@/components/AuthProvider';
import type { IconName } from '@/lib/types';

const links: { href: string; label: string; icon: IconName; exact?: boolean }[] = [
  { href: '/dashboard', label: 'Dashboard', icon: 'target', exact: true },
  { href: '/dashboard/pesanan', label: 'Pesanan saya', icon: 'drop' },
  { href: '/dashboard/profil', label: 'Profil', icon: 'handshake' },
  { href: '/dashboard/perusahaan', label: 'Perusahaan', icon: 'gear' },
  { href: '/dashboard/alamat', label: 'Alamat', icon: 'pin' },
  { href: '/catalog', label: 'Kembali ke katalog', icon: 'flask' },
];

export default function AccountNav() {
  const pathname = usePathname();
  const router = useRouter();
  const { logoutCustomer } = useAuth();

  function handleLogout() {
    logoutCustomer();
    router.replace('/login');
  }

  return (
    <nav className="acct-nav" aria-label="Menu akun">
      {links.map((l) => {
        const active = l.exact ? pathname === l.href : pathname.startsWith(l.href);
        return (
          <Link key={l.href} href={l.href} className={`acct-nav-link ${active ? 'is-active' : ''}`}>
            <Icon name={l.icon} size={17} /> {l.label}
          </Link>
        );
      })}
      <button type="button" className="acct-nav-link acct-nav-out" onClick={handleLogout}>
        <Icon name="arrow" size={17} /> Keluar
      </button>
    </nav>
  );
}
