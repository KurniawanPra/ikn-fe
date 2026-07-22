import Link from 'next/link';
import Icon from '@/components/Icon';
import StatusBadge from '@/components/StatusBadge';
import AdminSalesChart from '@/components/admin/AdminSalesChart';
import { AdminPageHead } from '@/components/admin/AdminPage';
import { dashboardStats } from '@/lib/admin-data';
import { orders, orderStatus } from '@/lib/commerce';
import { formatIDR, formatDate } from '@/lib/format';
import type { IconName, OrderStatusKey } from '@/lib/types';
import styles from './AdminDashboard.module.css';

export const metadata = { title: 'Dashboard' };

const pipeline: { label: string; statuses: OrderStatusKey[]; icon: IconName; href: string }[] = [
  { label: 'Perlu bayar', statuses: ['awaiting_payment'], icon: 'wallet', href: '/admin/orders' },
  { label: 'Verifikasi', statuses: ['awaiting_verification'], icon: 'shieldCheck', href: '/admin/payments' },
  { label: 'Diproses', statuses: ['processing', 'packing'], icon: 'package', href: '/admin/orders' },
  { label: 'Dikirim', statuses: ['shipped', 'delivered'], icon: 'truck', href: '/admin/orders' },
  { label: 'Selesai', statuses: ['completed'], icon: 'checkCircle', href: '/admin/orders' },
];

export default function AdminDashboard() {
  const pending = orders.filter((order) => order.status === 'awaiting_verification');
  const recentOrders = [...orders]
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
    .slice(0, 5);
  const largestPipelineCount = Math.max(
    ...pipeline.map((item) => orders.filter((order) => item.statuses.includes(order.status)).length),
    1
  );

  return (
    <div className={styles.dashboard}>
      <div className={styles.pageHeader}>
        <AdminPageHead
          title="Dashboard"
          desc="Ringkasan transaksi dan aktivitas operasional PT IKN untuk Juli 2026."
        />
        <span className={styles.updated}><Icon name="checkCircle" size={17} /> Diperbarui 22 Juli 2026 · 09.00 WIB</span>
      </div>

      <section className={styles.stats} aria-label="Ringkasan kinerja bulan ini">
        {dashboardStats.map((stat) => {
          const isPending = stat.key === 'pending' && pending.length > 0;
          return (
            <article
              key={stat.key}
              className={`${styles.statCard} ${
                isPending
                  ? styles.warningStatCard
                  : stat.tone === 'attention'
                  ? styles.attention
                  : ''
              }`}
            >
              <div className={styles.statHeading}>
                <Icon name={stat.icon} size={22} strokeWidth={1.7} />
                <span className={styles.statLabel}>{stat.label}</span>
              </div>
              <div className={styles.metricRow}>
                <strong className={styles.statValue}>{stat.value}</strong>
                <span className={styles.delta}>{stat.delta}</span>
              </div>
              <span className={styles.comparison}>{stat.comparison}</span>
              {stat.key === 'revenue' && (
                <span className={styles.progress} aria-label="86 persen dari target bulanan"><span style={{ width: '86%' }} /></span>
              )}
              <div className={styles.statFooter}>
                <span className={styles.statDetail}>{stat.detail}</span>
                <Link href={stat.href} className={styles.statLink}>{stat.actionLabel} <Icon name="arrow" size={16} /></Link>
              </div>
            </article>
          );
        })}
      </section>

      <div className={styles.analyticsGrid}>
        <AdminSalesChart />

        <section className={styles.pipelineCard} aria-labelledby="pipeline-title">
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.eyebrow}>Operasional</span>
              <h2 id="pipeline-title">Alur pesanan aktif</h2>
            </div>
            <Link href="/admin/orders" className={styles.textLink}>Semua order <Icon name="arrow" size={16} /></Link>
          </div>
          <p className={styles.sectionDesc}>Jumlah pesanan pada setiap tahap yang perlu dipantau admin.</p>
          <div className={styles.pipelineList}>
            {pipeline.map((item) => {
              const count = orders.filter((order) => item.statuses.includes(order.status)).length;
              return (
                <Link key={item.label} href={item.href} className={styles.pipelineRow}>
                  <span className={styles.pipelineIcon}><Icon name={item.icon} size={19} /></span>
                  <span className={styles.pipelineInfo}>
                    <span><strong>{item.label}</strong><b>{count}</b></span>
                    <span className={styles.pipelineTrack}><span style={{ width: `${Math.max(8, (count / largestPipelineCount) * 100)}%` }} /></span>
                  </span>
                </Link>
              );
            })}
          </div>
          <div className={styles.pipelineNote}>
            <Icon name="shieldCheck" size={19} />
            <span><strong>{pending.length} pembayaran</strong> sedang menunggu pemeriksaan bukti transfer.</span>
          </div>
        </section>
      </div>

      <div className={styles.operationsGrid}>
        <section
          className={`${styles.listCard} ${pending.length > 0 ? styles.warningCard : ''}`}
          aria-labelledby="verification-title"
        >
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.eyebrow}>Perlu tindakan</span>
              <h2 id="verification-title">Verifikasi pembayaran</h2>
            </div>
            <Link href="/admin/payments" className={styles.textLink}>Buka Payment <Icon name="arrow" size={16} /></Link>
          </div>
          <p className={styles.sectionDesc}>Periksa bukti transfer sebelum pesanan masuk ke tahap produksi.</p>
          <div className={styles.orderList}>
            {pending.map((order) => (
              <Link key={order.number} href={`/admin/orders/${order.number}`} className={styles.orderRow}>
                <span className={styles.orderMain}>
                  <strong>{order.number}</strong>
                  <small>{order.customer.name} · {formatDate(order.date)}</small>
                </span>
                <span className={styles.orderAmount}>{formatIDR(order.total)}</span>
                <StatusBadge label="Periksa bukti" tone="warn" />
                <Icon name="chevronRight" size={18} />
              </Link>
            ))}
          </div>
        </section>

        <section className={styles.listCard} aria-labelledby="recent-title">
          <div className={styles.sectionHead}>
            <div>
              <span className={styles.eyebrow}>Aktivitas terbaru</span>
              <h2 id="recent-title">Pesanan terbaru</h2>
            </div>
            <Link href="/admin/orders" className={styles.textLink}>Semua order <Icon name="arrow" size={16} /></Link>
          </div>
          <p className={styles.sectionDesc}>Lima transaksi terakhir dari seluruh customer.</p>
          <div className={styles.orderList}>
            {recentOrders.map((order) => {
              const status = orderStatus[order.status];
              return (
                <Link key={order.number} href={`/admin/orders/${order.number}`} className={styles.orderRow}>
                  <span className={styles.orderMain}>
                    <strong>{order.number}</strong>
                    <small>{order.customer.name} · {formatDate(order.date)}</small>
                  </span>
                  <span className={styles.orderAmount}>{formatIDR(order.total)}</span>
                  <StatusBadge label={status.id} tone={status.tone} />
                  <Icon name="chevronRight" size={18} />
                </Link>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
