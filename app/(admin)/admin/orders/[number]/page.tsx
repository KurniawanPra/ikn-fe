'use client';

import Link from 'next/link';
import Icon from '@/components/Icon';
import StatusBadge from '@/components/StatusBadge';
import OrderTracking from '@/components/OrderTracking';
import EmptyState from '@/components/EmptyState';
import { useTransactions } from '@/components/TransactionProvider';
import { AdminCard } from '@/components/admin/AdminPage';
import { bankById, getOrder, orderStatus, paymentStatus, shippingById } from '@/lib/commerce';
import { formatDate, formatIDR } from '@/lib/format';
import type { OrderStatusKey, PaymentStatusKey } from '@/lib/types';
import styles from './page.module.css';

const statusActions: Array<{
  label: string;
  status: OrderStatusKey;
  payment?: PaymentStatusKey;
}> = [
  { label: 'Verifikasi pembayaran', status: 'processing', payment: 'paid' },
  { label: 'Proses', status: 'processing' },
  { label: 'Kemas', status: 'packing' },
  { label: 'Kirim', status: 'shipped' },
  { label: 'Selesai', status: 'completed' },
];

export default function AdminOrderDetail({ params }: { params: { number: string } }) {
  const { orders, updateOrder } = useTransactions();
  const order = getOrder(params.number, orders);

  if (!order) {
    return (
      <EmptyState
        icon="close"
        title="Order tidak ditemukan"
        body="Transaksi tidak tersedia pada data dummy browser ini."
        action={{ href: '/admin/orders', label: 'Kembali ke order' }}
      />
    );
  }

  const status = orderStatus[order.status];
  const payment = paymentStatus[order.payment];
  const bank = bankById(order.bank);
  const shipping = shippingById(order.shippingMethod);

  function setStatus(nextStatus: OrderStatusKey, nextPayment?: PaymentStatusKey) {
    const at = new Date().toISOString();
    updateOrder(order!.number, {
      status: nextStatus,
      payment: nextPayment || order!.payment,
      trackingNo: nextStatus === 'shipped' ? order!.trackingNo || `DUMMY-${Date.now()}` : order!.trackingNo,
      timeline: [...order!.timeline, { status: nextStatus, at }],
    });
  }

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
        <div className={styles.badges}>
          <StatusBadge label={status.id} tone={status.tone} />
          <StatusBadge label={payment.id} tone={payment.tone} />
        </div>
      </div>

      <div className="admin-grid-2">
        <AdminCard title="Item pesanan">
          {order.items.map((item) => (
            <div key={item.slug} className={styles.item}>
              <span className={styles.itemName}>{item.name} <small>({item.code}) ×{item.qty} {item.unit}</small></span>
              <span>{formatIDR(item.price * item.qty)}</span>
            </div>
          ))}
          <div className={styles.summaryRow}><span>Subtotal</span><span>{formatIDR(order.subtotal)}</span></div>
          <div className={styles.summaryRow}><span>Ongkir {shipping ? `· ${shipping.label}` : ''}</span><span>{formatIDR(order.shipping)}</span></div>
          <div className={styles.summaryRow}><span>Biaya admin</span><span>{formatIDR(order.adminFee)}</span></div>
          <div className={`${styles.summaryRow} ${styles.total}`}><span>Total</span><span>{formatIDR(order.total)}</span></div>
        </AdminCard>

        <AdminCard title="Customer & pengiriman">
          <p className={styles.address}>
            <strong>{order.customer.name}</strong><br />
            PIC: {order.customer.pic}<br />
            {order.customer.email}
          </p>
          <hr style={{ border: 0, borderTop: '1px solid var(--line)', margin: '14px 0' }} />
          <p className={styles.address}>
            <strong>{order.address.recipient}</strong><br />
            {order.address.phone}<br />
            {order.address.line}
          </p>
          {order.trackingNo && <p className={styles.trackingNumber}>No. resi: <strong>{order.trackingNo}</strong></p>}
        </AdminCard>
      </div>

      <div className="admin-grid-2">
        <AdminCard title="Pembayaran">
          {bank && (
            <div className={styles.bank}>
              <span className={styles.bankName}>{bank.bank}</span>
              <span className={styles.bankNumber}>{bank.number}</span>
              <span className={styles.bankHolder}>a.n. {bank.holder}</span>
            </div>
          )}
          <p className="admin-note">
            Bukti transfer: {order.proofUploaded ? 'sudah diunggah customer' : 'belum diunggah'}.
          </p>
        </AdminCard>

        <AdminCard title="Lacak & aksi transaksi">
          <OrderTracking order={order} />
          <div className="row-actions" style={{ marginTop: 16, flexWrap: 'wrap' }}>
            {statusActions.map((action) => (
              <button
                key={action.label}
                type="button"
                className="row-act"
                onClick={() => setStatus(action.status, action.payment)}
              >
                {action.label}
              </button>
            ))}
            <button type="button" className="row-act row-act-danger" onClick={() => setStatus('cancelled', 'expired')}>
              Batalkan
            </button>
          </div>
        </AdminCard>
      </div>
    </div>
  );
}
