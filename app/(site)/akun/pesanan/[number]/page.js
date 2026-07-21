import Link from 'next/link';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import StatusBadge from '@/components/StatusBadge';
import OrderTracking from '@/components/OrderTracking';
import PaymentProof from '@/components/PaymentProof';
import { orders, getOrder, orderStatus, paymentStatus, bankById, shippingById } from '@/lib/commerce';
import { formatIDR, formatDate } from '@/lib/format';

export function generateStaticParams() {
  return orders.map((o) => ({ number: o.number }));
}

export function generateMetadata({ params }) {
  return { title: `Pesanan ${params.number}` };
}

export default function OrderDetail({ params }) {
  const order = getOrder(params.number);
  if (!order) notFound();

  const st = orderStatus[order.status];
  const pay = paymentStatus[order.payment];
  const bank = bankById(order.bank);
  const ship = shippingById(order.shippingMethod);
  const needsProof = order.payment === 'unpaid' || order.payment === 'rejected' || (!order.proofUploaded && order.payment !== 'paid');

  return (
    <div>
      <Link href="/akun/pesanan" className="link" style={{ marginBottom: 18 }}>
        <Icon name="chevronLeft" size={16} /> Kembali ke daftar
      </Link>

      <div className="acct-detail-head">
        <div>
          <span className="acct-order-no">{order.number}</span>
          <span className="acct-order-date">Dibuat {formatDate(order.date)}</span>
        </div>
        <div className="acct-order-badges">
          <StatusBadge label={st.id} tone={st.tone} />
          <StatusBadge label={pay.id} tone={pay.tone} />
        </div>
      </div>

      <div className="acct-detail-grid">
        <div className="acct-detail-main">
          <section className="admin-card">
            <h2 className="admin-card-title">Item pesanan</h2>
            <div className="admin-card-body">
              {order.items.map((it) => (
                <div key={it.slug} className="co-item">
                  <span className="co-item-name">{it.name} <small>({it.code}) ×{it.qty} {it.unit}</small></span>
                  <span>{formatIDR(it.price * it.qty)}</span>
                </div>
              ))}
              <div className="summary-row" style={{ marginTop: 10 }}><span>Subtotal</span><span>{formatIDR(order.subtotal)}</span></div>
              <div className="summary-row"><span>Ongkir {ship ? `· ${ship.label}` : ''}</span><span>{formatIDR(order.shipping)}</span></div>
              <div className="summary-row"><span>Biaya admin</span><span>{formatIDR(order.adminFee)}</span></div>
              <div className="summary-row summary-total"><span>Total</span><span>{formatIDR(order.total)}</span></div>
            </div>
          </section>

          <section className="admin-card">
            <h2 className="admin-card-title">Lacak pesanan</h2>
            <div className="admin-card-body">
              <OrderTracking order={order} />
              {order.trackingNo && (
                <p className="acct-track-no">No. resi: <strong>{order.trackingNo}</strong></p>
              )}
            </div>
          </section>
        </div>

        <aside className="acct-detail-side">
          <section className="admin-card">
            <h2 className="admin-card-title">Pembayaran</h2>
            <div className="admin-card-body">
              {bank && (
                <div className="co-bank" style={{ marginBottom: 14 }}>
                  <span className="co-bank-name">{bank.bank}</span>
                  <span className="co-bank-no">{bank.number}</span>
                  <span className="co-bank-holder">a.n. {bank.holder}</span>
                </div>
              )}
              <PaymentProof uploaded={order.proofUploaded && !needsProof} />
            </div>
          </section>

          <section className="admin-card">
            <h2 className="admin-card-title">Alamat pengiriman</h2>
            <div className="admin-card-body">
              <p className="acct-addr">
                <strong>{order.address.recipient}</strong><br />
                {order.address.phone}<br />
                {order.address.line}
              </p>
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
