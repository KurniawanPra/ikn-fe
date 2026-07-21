import Link from 'next/link';
import Icon from '@/components/Icon';
import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, AdminCard } from '@/components/admin/AdminPage';
import { dashboardStats, salesByMonth } from '@/lib/admin-data';
import { orders, orderStatus } from '@/lib/commerce';
import { formatIDR, formatDate } from '@/lib/format';

export const metadata = { title: 'Dashboard' };

export default function AdminDashboard() {
  const max = Math.max(...salesByMonth.map((m) => m.total));
  const pending = orders.filter((o) => o.status === 'awaiting_verification');

  return (
    <div>
      <AdminPageHead title="Dashboard" desc="Ringkasan operasional PT IKN — data mock." />

      <div className="admin-stats">
        {dashboardStats.map((s) => (
          <div key={s.key} className="stat-card">
            <div className="stat-card-top">
              <span className="stat-icon"><Icon name={s.icon} size={20} /></span>
              <span className="stat-delta">{s.delta}</span>
            </div>
            <span className="stat-value">{s.value}</span>
            <span className="stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      <div className="admin-grid-2">
        <AdminCard title="Penjualan 6 bulan (Rp juta)">
          <div className="bars">
            {salesByMonth.map((m) => (
              <div key={m.month} className="bar-col">
                <span className="bar-val">{m.total}</span>
                <span className="bar-fill" style={{ height: `${Math.round((m.total / max) * 100)}%` }} />
                <span className="bar-label">{m.month}</span>
              </div>
            ))}
          </div>
        </AdminCard>

        <AdminCard
          title="Perlu verifikasi pembayaran"
          foot={<Link href="/admin/payments" className="link">Ke Payment <Icon name="arrow" size={15} /></Link>}
        >
          {pending.length === 0 ? (
            <p className="admin-note">Tidak ada yang menunggu verifikasi.</p>
          ) : (
            <div className="acct-order-list">
              {pending.map((o) => {
                const st = orderStatus[o.status];
                return (
                  <Link key={o.number} href={`/admin/orders/${o.number}`} className="acct-order-row">
                    <div>
                      <span className="acct-order-no">{o.number}</span>
                      <span className="acct-order-date">{formatDate(o.date)}</span>
                    </div>
                    <StatusBadge label={st.id} tone={st.tone} small />
                    <span className="acct-order-total">{formatIDR(o.total)}</span>
                    <Icon name="chevronRight" size={16} />
                  </Link>
                );
              })}
            </div>
          )}
        </AdminCard>
      </div>
    </div>
  );
}
