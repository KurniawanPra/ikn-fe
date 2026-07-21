import Breadcrumb from '@/components/Breadcrumb';
import AccountNav from '@/components/AccountNav';
import AccountGuard from '@/components/AccountGuard';

export const metadata = {
  title: { default: 'Akun Saya', template: '%s · Akun · PT IKN' },
};

export default function AccountLayout({ children }) {
  return (
    <AccountGuard>
      <section className="pagehead commerce-head">
        <div className="container">
          <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Akun' }]} />
          <span className="label label-amber">/ Akun Pelanggan</span>
          <h1 className="display pagehead-title">Akun saya.</h1>
        </div>
      </section>
      <section className="section-tight">
        <div className="container">
          <div className="acct-layout">
            <aside className="acct-side">
              <AccountNav />
            </aside>
            <div className="acct-main">{children}</div>
          </div>
        </div>
      </section>
    </AccountGuard>
  );
}
