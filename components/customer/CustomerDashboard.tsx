'use client';

import Link from 'next/link';
import Icon from '@/components/Icon';
import EmptyState from '@/components/EmptyState';
import StatusBadge from '@/components/StatusBadge';
import { useAuth } from '@/components/AuthProvider';
import {
  getCustomerDashboardStats,
  getOrdersByCustomer,
  orderStatus,
} from '@/lib/commerce';
import { formatDate, formatIDR } from '@/lib/format';
import type { IconName } from '@/lib/types';

const quickActions: { href: string; label: string; body: string; icon: IconName }[] = [
  { href: '/catalog', label: 'Buka katalog', body: 'Cari produk dan mulai pemesanan.', icon: 'flask' },
  { href: '/dashboard/pesanan', label: 'Pesanan saya', body: 'Lihat pembayaran dan pengiriman.', icon: 'drop' },
  { href: '/dashboard/alamat', label: 'Kelola alamat', body: 'Atur tujuan pengiriman utama.', icon: 'pin' },
  { href: '/dashboard/profil', label: 'Perbarui profil', body: 'Pastikan data PIC selalu terbaru.', icon: 'handshake' },
];

export default function CustomerDashboard() {
  const { customer } = useAuth();
  if (!customer) return null;

  const customerOrders = getOrdersByCustomer(customer.id);
  const stats = getCustomerDashboardStats(customer.id);
  const recent = customerOrders.slice(0, 3);
  const alerts = customerOrders.filter(
    (order) =>
      ['unpaid', 'rejected'].includes(order.payment) ||
      order.status === 'shipped' ||
      (order.status === 'completed' && !order.reviewed)
  );

  return (
    <div className="customer-dashboard">
      <section className="dash-welcome">
        <div>
          <span className="label label-amber">Dashboard Customer</span>
          <h2 className="h2">Selamat datang, {customer.name.split(' ')[0]}.</h2>
          <p>{customer.company} · Semua aktivitas akun Anda tersedia di satu tempat.</p>
        </div>
        <Link href="/catalog" className="btn btn-solid">
          Belanja produk <Icon name="arrow" />
        </Link>
      </section>

      <section className="acct-stats" aria-label="Ringkasan pesanan">
        <div className="acct-stat"><span className="acct-stat-val">{stats.totalOrders}</span><span className="acct-stat-label">Total pesanan</span></div>
        <div className="acct-stat"><span className="acct-stat-val">{stats.awaitingPayment}</span><span className="acct-stat-label">Perlu pembayaran</span></div>
        <div className="acct-stat"><span className="acct-stat-val">{stats.inProgress}</span><span className="acct-stat-label">Sedang berjalan</span></div>
        <div className="acct-stat"><span className="acct-stat-val">{stats.completed}</span><span className="acct-stat-label">Selesai</span></div>
        <div className="acct-stat acct-stat-wide"><span className="acct-stat-val">{formatIDR(stats.transactionValue)}</span><span className="acct-stat-label">Nilai transaksi</span></div>
      </section>

      {alerts.length > 0 && (
        <section className="dash-alerts" aria-labelledby="customer-alert-title">
          <div className="acct-section-head">
            <h2 id="customer-alert-title" className="h3">Perlu perhatian</h2>
          </div>
          {alerts.map((order) => {
            const needsPayment = ['unpaid', 'rejected'].includes(order.payment);
            const message = needsPayment
              ? `Pembayaran ${order.number} perlu diselesaikan atau diperbarui.`
              : order.status === 'shipped'
                ? `Pesanan ${order.number} sedang dikirim${order.trackingNo ? ` dengan resi ${order.trackingNo}` : ''}.`
                : `Pesanan ${order.number} sudah selesai dan dapat diulas.`;
            return (
              <Link key={order.number} href={`/dashboard/pesanan/${order.number}`} className="dash-alert">
                <Icon name={needsPayment ? 'drop' : order.status === 'shipped' ? 'compass' : 'check'} size={19} />
                <span>{message}</span>
                <Icon name="chevronRight" size={17} />
              </Link>
            );
          })}
        </section>
      )}

      <section className="dash-block">
        <div className="acct-section-head">
          <h2 className="h3">Pesanan terbaru</h2>
          <Link href="/dashboard/pesanan" className="link">Semua pesanan <Icon name="arrow" /></Link>
        </div>
        {recent.length === 0 ? (
          <EmptyState title="Belum ada pesanan" body="Pesanan pertama Anda akan tampil di sini." action={{ href: '/catalog', label: 'Lihat katalog' }} />
        ) : (
          <div className="acct-order-list">
            {recent.map((order) => {
              const status = orderStatus[order.status];
              return (
                <Link key={order.number} href={`/dashboard/pesanan/${order.number}`} className="acct-order-row">
                  <div><span className="acct-order-no">{order.number}</span><span className="acct-order-date">{formatDate(order.date)}</span></div>
                  <StatusBadge label={status.id} tone={status.tone} small />
                  <span className="acct-order-total">{formatIDR(order.total)}</span>
                  <Icon name="chevronRight" size={18} />
                </Link>
              );
            })}
          </div>
        )}
      </section>

      <section className="dash-block">
        <div className="acct-section-head"><h2 className="h3">Akses cepat</h2></div>
        <div className="dash-quick-grid">
          {quickActions.map((action) => (
            <Link key={action.href} href={action.href} className="dash-quick-card">
              <Icon name={action.icon} size={22} />
              <span><strong>{action.label}</strong><small>{action.body}</small></span>
              <Icon name="chevronRight" size={17} />
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
