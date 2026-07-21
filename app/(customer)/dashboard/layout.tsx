import type { ReactNode } from 'react';
import CustomerShell from '@/components/customer/CustomerShell';

export const metadata = {
  title: { default: 'Dashboard Customer', template: '%s · Dashboard · PT IKN' },
  robots: { index: false, follow: false },
};

export default function CustomerDashboardLayout({ children }: { children: ReactNode }) {
  return <CustomerShell>{children}</CustomerShell>;
}
