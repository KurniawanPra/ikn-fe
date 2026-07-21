'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/Icon';

const links = [
  { href: '/akun', label: 'Ringkasan', icon: 'target', exact: true },
  { href: '/akun/pesanan', label: 'Pesanan saya', icon: 'drop' },
  { href: '/akun/profil', label: 'Profil & alamat', icon: 'handshake' },
];

export default function AccountNav() {
  const pathname = usePathname();
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
      <Link href="/login" className="acct-nav-link acct-nav-out">
        <Icon name="arrow" size={17} /> Keluar
      </Link>
    </nav>
  );
}
