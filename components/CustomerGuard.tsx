'use client';

import { useEffect } from 'react';
import type { ReactNode } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { useAuth } from '@/components/AuthProvider';
import SessionLoader from '@/components/SessionLoader';

export default function CustomerGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { customer, admin, ready } = useAuth();

  useEffect(() => {
    if (!ready) return;
    if (admin) {
      router.replace('/admin');
      return;
    }
    if (!customer) {
      router.replace(`/login?next=${encodeURIComponent(pathname)}`);
    }
  }, [ready, customer, admin, pathname, router]);

  if (!ready || !customer || admin) {
    return <SessionLoader message="Memuat sesi customer..." portalName="Portal Customer" />;
  }

  return children;
}
