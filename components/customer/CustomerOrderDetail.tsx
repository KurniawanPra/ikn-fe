'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import EmptyState from '@/components/EmptyState';
import OrderTracking from '@/components/OrderTracking';
import PaymentProof from '@/components/PaymentProof';
import StatusBadge from '@/components/StatusBadge';
import { useAuth } from '@/components/AuthProvider';
import { useTransactions } from '@/components/TransactionProvider';
import {
  bankById,
  getOrderForCustomer,
  orderStatus,
  paymentStatus,
  shippingById,
} from '@/lib/commerce';
import { formatDate, formatIDR } from '@/lib/format';
import styles from './CustomerOrderDetail.module.css';

export default function CustomerOrderDetail({ number }: { number: string }) {
  const { customer } = useAuth();
  const { orders, updateOrder } = useTransactions();
  const order = customer ? getOrderForCustomer(number, customer.id, orders) : null;
  const [received, setReceived] = useState(false);
  const [reviewed, setReviewed] = useState(false);

  if (!customer) return null;
  if (!order) {
    return (
      <EmptyState
        icon="close"
        title="Pesanan tidak ditemukan"
        body="Pesanan tidak tersedia atau bukan milik akun Anda."
        action={{ href: '/dashboard/pesanan', label: 'Kembali ke pesanan' }}
      />
    );
  }

  const currentOrder = order;

  const status = orderStatus[order.status];
  const payment = paymentStatus[order.payment];
  const bank = bankById(order.bank);
  const shipping = shippingById(order.shippingMethod);
  const canConfirm = order.status === 'delivered' && !received;
  const canReview = (order.status === 'completed' || received) && !order.reviewed && !reviewed;

  function submitReview(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    updateOrder(currentOrder.number, { reviewed: true });
    setReviewed(true);
  }

  function confirmReceived() {
    const at = new Date().toISOString();
    updateOrder(currentOrder.number, {
      status: 'completed',
      timeline: [...currentOrder.timeline, { status: 'completed', at }],
    });
    setReceived(true);
  }

  function markProofUploaded() {
    const at = new Date().toISOString();
    updateOrder(currentOrder.number, {
      proofUploaded: true,
      status: 'awaiting_verification',
      payment: 'awaiting_confirmation',
      timeline: [...currentOrder.timeline, { status: 'awaiting_verification', at }],
    });
  }

  return (
    <div>
      <Link href="/dashboard/pesanan" className="link acct-back-link"><Icon name="chevronLeft" size={16} /> Kembali ke daftar</Link>

      <div className="acct-detail-head">
        <div><span className="acct-order-no">{order.number}</span><span className="acct-order-date">Dibuat {formatDate(order.date)}</span></div>
        <div className="acct-order-badges"><StatusBadge label={status.id} tone={status.tone} /><StatusBadge label={payment.id} tone={payment.tone} /></div>
      </div>

      <div className="acct-detail-grid">
        <div className="acct-detail-main">
          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Item pesanan</h2>
            <div className={styles.cardBody}>
              {order.items.map((item) => (
                <div key={item.slug} className="co-item"><span className="co-item-name">{item.name} <small>({item.code}) ×{item.qty} {item.unit}</small></span><span>{formatIDR(item.price * item.qty)}</span></div>
              ))}
              <div className="summary-row order-summary-first"><span>Subtotal</span><span>{formatIDR(order.subtotal)}</span></div>
              <div className="summary-row"><span>Ongkir {shipping ? `· ${shipping.label}` : ''}</span><span>{formatIDR(order.shipping)}</span></div>
              <div className="summary-row"><span>Biaya admin</span><span>{formatIDR(order.adminFee)}</span></div>
              <div className="summary-row summary-total"><span>Total</span><span>{formatIDR(order.total)}</span></div>
            </div>
          </section>

          <section id="tracking" className={styles.card}>
            <h2 className={styles.cardTitle}>Lacak pesanan</h2>
            <div className={styles.cardBody}>
              <OrderTracking order={order} />
              {order.trackingNo && <p className="acct-track-no">No. resi: <strong>{order.trackingNo}</strong></p>}
              {canConfirm && <button type="button" className="btn btn-solid btn-sm order-action" onClick={confirmReceived}>Konfirmasi barang diterima <Icon name="check" /></button>}
              {received && <p className="proof-done order-action"><Icon name="check" size={18} /> Penerimaan barang sudah dikonfirmasi.</p>}
            </div>
          </section>

          {order.payment === 'paid' && (
            <section className="invoice" aria-labelledby="invoice-title">
              <div className="invoice-top">
                <div><span className="invoice-brand">PT IKN</span><h2 id="invoice-title" className="h3">Invoice</h2></div>
                <div><span className="acct-order-no">INV-{order.number}</span><span className="acct-order-date">{formatDate(order.date)}</span></div>
              </div>
              <p><strong>Ditagihkan kepada:</strong><br />{order.customer.name}<br />PIC: {order.customer.pic}</p>
              <table className="invoice-table">
                <thead><tr><th>Produk</th><th>Qty</th><th className="num">Jumlah</th></tr></thead>
                <tbody>{order.items.map((item) => <tr key={item.slug}><td>{item.name}</td><td>{item.qty} {item.unit}</td><td className="num">{formatIDR(item.price * item.qty)}</td></tr>)}</tbody>
                <tfoot><tr><th colSpan={2}>Total</th><th className="num">{formatIDR(order.total)}</th></tr></tfoot>
              </table>
              <button type="button" className="btn btn-line btn-sm no-print" onClick={() => window.print()}>Cetak / simpan PDF <Icon name="arrowDown" /></button>
            </section>
          )}

          {(canReview || reviewed || order.reviewed) && (
            <section className={styles.card}>
              <h2 className={styles.cardTitle}>Ulasan produk</h2>
              <div className={styles.cardBody}>
                {reviewed || order.reviewed ? (
                  <p className="proof-done"><Icon name="check" size={18} /> Terima kasih, ulasan untuk pesanan ini sudah dikirim.</p>
                ) : (
                  <form className="form review-form" onSubmit={submitReview}>
                    <label><span className="label">Rating</span><select name="rating" className="cat-sort" defaultValue="5"><option value="5">5 — Sangat baik</option><option value="4">4 — Baik</option><option value="3">3 — Cukup</option><option value="2">2 — Kurang</option><option value="1">1 — Buruk</option></select></label>
                    <label><span className="label">Ulasan</span><textarea name="review" rows={4} required placeholder="Bagikan pengalaman Anda menggunakan produk PT IKN." /></label>
                    <button type="submit" className="btn btn-solid btn-sm">Kirim ulasan <Icon name="arrow" /></button>
                  </form>
                )}
              </div>
            </section>
          )}
        </div>

        <aside className="acct-detail-side">
          <section id="payment" className={styles.card}>
            <h2 className={styles.cardTitle}>Pembayaran</h2>
            <div className={styles.cardBody}>
              {bank && <div className="co-bank payment-bank"><span className="co-bank-name">{bank.bank}</span><span className="co-bank-no">{bank.number}</span><span className="co-bank-holder">a.n. {bank.holder}</span></div>}
              {order.payment === 'paid' ? <p className="proof-done"><Icon name="check" size={18} /> Pembayaran telah diverifikasi admin.</p> : <PaymentProof uploaded={Boolean(order.proofUploaded) && order.payment !== 'rejected'} onUploaded={markProofUploaded} />}
            </div>
          </section>

          <section className={styles.card}>
            <h2 className={styles.cardTitle}>Alamat pengiriman</h2>
            <div className={styles.cardBody}><p className="acct-addr"><strong>{order.address.label}</strong><br />{order.address.recipient}<br />{order.address.phone}<br />{order.address.line}</p></div>
          </section>
        </aside>
      </div>
    </div>
  );
}
