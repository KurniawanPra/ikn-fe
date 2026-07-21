'use client';

// Guard area customer. Jika belum login, arahkan ke /login?next=<path>.
// Sesi dummy — hanya localStorage, belum backend.
import { useEffect } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';

export default function AccountGuard({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const { customer, ready } = useAuth();

  useEffect(() => {
    if (ready && !customer) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, customer, pathname, router]);

  if (!ready || !customer) {
    return <p className="form-note">Memuat sesi…</p>;
  }

  return children;
}
