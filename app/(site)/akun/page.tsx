import Link from 'next/link';
import Icon from '@/components/Icon';
import StatusBadge from '@/components/StatusBadge';
import { orders, orderStatus } from '@/lib/commerce';
import { formatIDR, formatDate } from '@/lib/format';

export const metadata = { title: 'Ringkasan' };

export default function AccountHome() {
  const recent = orders.slice(0, 3);
  const active = orders.filter((o) => !['completed', 'cancelled'].includes(o.status)).length;

  return (
    <div>
      <div className="acct-stats">
        <div className="acct-stat">
          <span className="acct-stat-val">{orders.length}</span>
          <span className="acct-stat-label">Total pesanan</span>
        </div>
        <div className="acct-stat">
          <span className="acct-stat-val">{active}</span>
          <span className="acct-stat-label">Sedang berjalan</span>
        </div>
        <div className="acct-stat">
          <span className="acct-stat-val">{formatIDR(orders.reduce((n, o) => n + o.total, 0))}</span>
          <span className="acct-stat-label">Nilai transaksi</span>
        </div>
      </div>

      <div className="acct-section-head">
        <h2 className="h3">Pesanan terbaru</h2>
        <Link href="/akun/pesanan" className="link">Semua pesanan <Icon name="arrow" /></Link>
      </div>

      <div className="acct-order-list">
        {recent.map((o) => {
          const st = orderStatus[o.status];
          return (
            <Link key={o.number} href={`/akun/pesanan/${o.number}`} className="acct-order-row">
              <div>
                <span className="acct-order-no">{o.number}</span>
                <span className="acct-order-date">{formatDate(o.date)}</span>
              </div>
              <StatusBadge label={st.id} tone={st.tone} small />
              <span className="acct-order-total">{formatIDR(o.total)}</span>
              <Icon name="chevronRight" size={18} />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
