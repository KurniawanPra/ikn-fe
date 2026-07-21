'use client';

import Link from 'next/link';
import { useCart } from '@/components/CartProvider';

// Ikon keranjang di navbar dengan badge jumlah item.
export default function CartButton() {
  const { count } = useCart();
  return (
    <Link href="/cart" className="nav-cart" aria-label={`Keranjang (${count} item)`}>
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="9" cy="20" r="1.4" />
        <circle cx="18" cy="20" r="1.4" />
        <path d="M2 3h3l2.2 12.4a1.5 1.5 0 0 0 1.5 1.2h8.4a1.5 1.5 0 0 0 1.5-1.2L21.5 7H6" />
      </svg>
      {count > 0 && <span className="nav-cart-badge">{count > 9 ? '9+' : count}</span>}
    </Link>
  );
}
