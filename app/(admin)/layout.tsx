import AdminShell from '@/components/admin/AdminShell';
import type { ReactNode } from 'react';
import '@/components/admin.css';

export const metadata = {
  title: { default: 'Admin · PT IKN', template: '%s · Admin PT IKN' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: { children: ReactNode }) {
  return <AdminShell>{children}</AdminShell>;
}
