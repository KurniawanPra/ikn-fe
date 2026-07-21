import Link from 'next/link';
import Icon from '@/components/Icon';
import StatusBadge from '@/components/StatusBadge';
import { orders, orderStatus, paymentStatus } from '@/lib/commerce';
import { formatIDR, formatDate } from '@/lib/format';

export const metadata = { title: 'Pesanan Saya' };

export default function OrdersPage() {
  return (
    <div>
      <div className="acct-section-head">
        <h2 className="h3">Pesanan saya</h2>
        <span className="cat-count">{orders.length} pesanan</span>
      </div>

      <div className="acct-order-list">
        {orders.map((o) => {
          const st = orderStatus[o.status];
          const pay = paymentStatus[o.payment];
          return (
            <Link key={o.number} href={`/akun/pesanan/${o.number}`} className="acct-order-card">
              <div className="acct-order-card-top">
                <div>
                  <span className="acct-order-no">{o.number}</span>
                  <span className="acct-order-date">{formatDate(o.date)}</span>
                </div>
                <div className="acct-order-badges">
                  <StatusBadge label={st.id} tone={st.tone} small />
                  <StatusBadge label={pay.id} tone={pay.tone} small />
                </div>
              </div>
              <div className="acct-order-card-body">
                <span className="acct-order-items">
                  {o.items.map((i) => `${i.name} ×${i.qty}`).join(', ')}
                </span>
                <span className="acct-order-total">{formatIDR(o.total)}</span>
              </div>
              <span className="acct-order-more">Lihat detail & lacak <Icon name="arrow" size={15} /></span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
