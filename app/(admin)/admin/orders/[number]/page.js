import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import StatusBadge from '@/components/StatusBadge';
import OrderTracking from '@/components/OrderTracking';
import { AdminCard } from '@/components/admin/AdminPage';
import { orders, getOrder, orderStatus, paymentStatus, bankById, shippingById } from '@/lib/commerce';
import { formatIDR, formatDate } from '@/lib/format';

export function generateStaticParams() {
  return orders.map((o) => ({ number: o.number }));
}

export function generateMetadata({ params }) {
  return { title: `Order ${params.number}` };
}

// Aksi status (mock, non-fungsional) sesuai alur order.
const statusActions = ['Verifikasi pembayaran', 'Proses', 'Kemas', 'Kirim', 'Selesai'];

export default function AdminOrderDetail({ params }) {
  const order = getOrder(params.number);
  if (!order) notFound();

  const st = orderStatus[order.status];
  const pay = paymentStatus[order.payment];
  const bank = bankById(order.bank);
  const ship = shippingById(order.shippingMethod);

  return (
    <div>
      <div className="admin-head">
        <div>
          <Link href="/admin/orders" className="link" style={{ marginBottom: 8 }}>
            <Icon name="chevronLeft" size={16} /> Semua order
          </Link>
          <h1 className="admin-title mono">{order.number}</h1>
          <p className="admin-desc">Dibuat {formatDate(order.date)}</p>
        </div>
        <div className="acct-order-badges">
          <StatusBadge label={st.id} tone={st.tone} />
          <StatusBadge label={pay.id} tone={pay.tone} />
        </div>
      </div>

      <div className="admin-grid-2">
        <AdminCard title="Item pesanan">
          {order.items.map((it) => (
            <div key={it.slug} className="co-item" style={{ marginBottom: 8 }}>
              <span className="co-item-name">{it.name} <small>({it.code}) ×{it.qty} {it.unit}</small></span>
              <span>{formatIDR(it.price * it.qty)}</span>
            </div>
          ))}
          <div className="summary-row"><span>Subtotal</span><span>{formatIDR(order.subtotal)}</span></div>
          <div className="summary-row"><span>Ongkir {ship ? `· ${ship.label}` : ''}</span><span>{formatIDR(order.shipping)}</span></div>
          <div className="summary-row"><span>Biaya admin</span><span>{formatIDR(order.adminFee)}</span></div>
          <div className="summary-row summary-total"><span>Total</span><span>{formatIDR(order.total)}</span></div>
        </AdminCard>

        <AdminCard title="Customer & pengiriman">
          <p className="acct-addr">
            <strong>{order.customer.name}</strong><br />
            PIC: {order.customer.pic}<br />
            {order.customer.email}
          </p>
          <hr style={{ border: 0, borderTop: '1px solid var(--line)', margin: '14px 0' }} />
          <p className="acct-addr">
            <strong>{order.address.recipient}</strong><br />
            {order.address.phone}<br />
            {order.address.line}
          </p>
          {order.trackingNo && <p className="acct-track-no">No. resi: <strong>{order.trackingNo}</strong></p>}
        </AdminCard>
      </div>

      <div className="admin-grid-2">
        <AdminCard title="Pembayaran">
          {bank && (
            <div className="co-bank" style={{ marginBottom: 12 }}>
              <span className="co-bank-name">{bank.bank}</span>
              <span className="co-bank-no">{bank.number}</span>
              <span className="co-bank-holder">a.n. {bank.holder}</span>
            </div>
          )}
          <p className="admin-note">
            Bukti transfer: {order.proofUploaded ? 'sudah diunggah customer' : 'belum diunggah'}.
          </p>
        </AdminCard>

        <AdminCard title="Lacak & aksi">
          <OrderTracking order={order} />
          <div className="row-actions" style={{ marginTop: 16, flexWrap: 'wrap' }}>
            {statusActions.map((a) => (
              <button key={a} type="button" className="row-act">{a}</button>
            ))}
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
