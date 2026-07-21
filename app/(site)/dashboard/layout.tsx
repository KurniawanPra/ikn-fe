import type { ReactNode } from 'react';
import Breadcrumb from '@/components/Breadcrumb';
import AccountNav from '@/components/AccountNav';
import CustomerGuard from '@/components/CustomerGuard';

export const metadata = {
  title: { default: 'Dashboard Customer', template: '%s · Dashboard · PT IKN' },
  robots: { index: false, follow: false },
};

export default function CustomerDashboardLayout({ children }: { children: ReactNode }) {
  return (
    <CustomerGuard>
      <section className="pagehead commerce-head dashboard-head">
        <div className="container">
          <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Dashboard' }]} />
          <span className="label label-amber">/ Portal Customer</span>
          <h1 className="display pagehead-title">Dashboard.</h1>
        </div>
      </section>
      <section className="section-tight">
        <div className="container">
          <div className="acct-layout">
            <aside className="acct-side"><AccountNav /></aside>
            <div className="acct-main">{children}</div>
          </div>
        </div>
      </section>
    </CustomerGuard>
  );
}
