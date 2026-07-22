'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon';
import EmptyState from '@/components/EmptyState';
import StatusBadge from '@/components/StatusBadge';
import { useAuth } from '@/components/AuthProvider';
import { useTransactions } from '@/components/TransactionProvider';
import { getProduct } from '@/lib/catalog';
import { getOrdersByCustomer, orderStatus, paymentStatus } from '@/lib/commerce';
import { formatDate, formatIDR } from '@/lib/format';
import type { IconName, Order } from '@/lib/types';
import styles from '@/components/customer/CustomerOrders.module.css';

type OrderTab = 'all' | 'to-pay' | 'verification' | 'to-ship' | 'to-receive' | 'completed' | 'cancelled';

interface OrderCardAction {
  label: string;
  href: string;
  icon: IconName;
  primary?: boolean;
}

const orderTabs: { id: OrderTab; label: string; icon: IconName }[] = [
  { id: 'all', label: 'Semua', icon: 'orders' },
  { id: 'to-pay', label: 'Perlu Bayar', icon: 'wallet' },
  { id: 'verification', label: 'Verifikasi', icon: 'shieldCheck' },
  { id: 'to-ship', label: 'Diproses', icon: 'package' },
  { id: 'to-receive', label: 'Dikirim', icon: 'truck' },
  { id: 'completed', label: 'Selesai', icon: 'checkCircle' },
  { id: 'cancelled', label: 'Dibatalkan', icon: 'cancelCircle' },
];

function matchesTab(order: Order, tab: OrderTab): boolean {
  switch (tab) {
    case 'to-pay':
      return order.status === 'awaiting_payment' && ['unpaid', 'rejected', 'expired'].includes(order.payment);
    case 'verification':
      return order.status === 'awaiting_verification' || order.payment === 'awaiting_confirmation';
    case 'to-ship':
      return order.status === 'processing' || order.status === 'packing';
    case 'to-receive':
      return order.status === 'shipped' || order.status === 'delivered';
    case 'completed':
      return order.status === 'completed';
    case 'cancelled':
      return order.status === 'cancelled';
    default:
      return true;
  }
}

function getOrderAction(order: Order): OrderCardAction {
  const detailHref = `/dashboard/pesanan/${order.number}`;
  const firstProductHref = order.items[0] ? `/catalog/${order.items[0].slug}` : '/catalog';

  switch (order.status) {
    case 'awaiting_payment':
      return { label: 'Bayar sekarang', href: `${detailHref}#payment`, icon: 'wallet', primary: true };
    case 'awaiting_verification':
      return { label: 'Lihat pembayaran', href: `${detailHref}#payment`, icon: 'shieldCheck' };
    case 'processing':
    case 'packing':
      return { label: 'Lihat proses', href: `${detailHref}#tracking`, icon: 'package' };
    case 'shipped':
      return { label: 'Lacak pengiriman', href: `${detailHref}#tracking`, icon: 'truck', primary: true };
    case 'delivered':
      return { label: 'Konfirmasi diterima', href: `${detailHref}#tracking`, icon: 'checkCircle', primary: true };
    case 'completed':
      return { label: 'Beli lagi', href: firstProductHref, icon: 'bag', primary: true };
    case 'cancelled':
      return { label: 'Pesan ulang', href: firstProductHref, icon: 'bag', primary: true };
    default:
      return { label: 'Lihat detail', href: detailHref, icon: 'arrow' };
  }
}

export default function CustomerOrders() {
  const { customer } = useAuth();
  const { orders } = useTransactions();
  const [query, setQuery] = useState('');
  const [activeTab, setActiveTab] = useState<OrderTab>('all');
  const customerOrders = useMemo(
    () => (customer ? getOrdersByCustomer(customer.id, orders) : []),
    [customer, orders],
  );
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return customerOrders.filter((order) => {
      const matchesQuery = !normalized
        || order.number.toLowerCase().includes(normalized)
        || order.items.some((item) => item.name.toLowerCase().includes(normalized));
      return matchesQuery && matchesTab(order, activeTab);
    });
  }, [activeTab, customerOrders, query]);

  const activeTabLabel = orderTabs.find((tab) => tab.id === activeTab)?.label ?? 'Semua';

  if (!customer) return null;

  return (
    <div>
      <div className="acct-section-head">
        <div>
          <h2 className={styles.heading}>Pesanan saya</h2>
          <p className={styles.intro}>Hanya pesanan milik {customer.company} yang ditampilkan.</p>
        </div>
        <span className={styles.orderCount}>{customerOrders.length} pesanan</span>
      </div>

      <div className={styles.tabs} role="tablist" aria-label="Status pesanan">
        {orderTabs.map((tab) => {
          const count = customerOrders.filter((order) => matchesTab(order, tab.id)).length;
          return (
            <button
              key={tab.id}
              id={`order-tab-${tab.id}`}
              type="button"
              role="tab"
              aria-selected={activeTab === tab.id}
              aria-controls="customer-order-list"
              className={`${styles.tab} ${activeTab === tab.id ? styles.active : ''}`}
              onClick={() => setActiveTab(tab.id)}
            >
              <span className={styles.tabIcon}><Icon name={tab.icon} size={21} strokeWidth={1.8} /></span>
              <span className={styles.tabLabel}>{tab.label}</span>
              {count > 0 && <span className={styles.count}>{count}</span>}
            </button>
          );
        })}
      </div>

      <div className={styles.searchRow}>
        <label className={`cat-search ${styles.search}`}>
          <Icon name="compass" size={20} strokeWidth={1.8} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nomor atau nama produk" aria-label="Cari pesanan" />
        </label>
      </div>

      <section id="customer-order-list" role="tabpanel" aria-labelledby={`order-tab-${activeTab}`}>
        {filtered.length === 0 ? (
          <EmptyState
            title="Pesanan tidak ditemukan"
            body={`Belum ada pesanan pada tab ${activeTabLabel}. Ubah pencarian atau mulai pesanan baru dari katalog.`}
            action={{ href: '/catalog', label: 'Lihat katalog' }}
          />
        ) : (
          <div className="acct-order-list">
            {filtered.map((order) => {
              const status = orderStatus[order.status];
              const payment = paymentStatus[order.payment];
              const detailHref = `/dashboard/pesanan/${order.number}`;
              const action = getOrderAction(order);

              return (
                <article key={order.number} className={`acct-order-card ${styles.orderCard}`}>
                  <div className={styles.orderHeader}>
                    <div>
                      <Link href={detailHref} className={styles.orderNumber}>{order.number}</Link>
                      <span className={styles.orderDate}>{formatDate(order.date)}</span>
                    </div>
                    <div className={styles.badges}>
                      <StatusBadge label={status.id} tone={status.tone} />
                      <StatusBadge label={payment.id} tone={payment.tone} />
                    </div>
                  </div>

                  <div className={styles.orderContent}>
                    <div className={styles.productList}>
                      {order.items.map((item) => {
                        const product = getProduct(item.slug);
                        return (
                          <div key={`${order.number}-${item.slug}`} className={styles.productItem}>
                            <span className={styles.productImage}>
                              {product?.image ? (
                                <Image src={product.image} alt={`Foto ${item.name}`} fill sizes="72px" />
                              ) : (
                                <Icon name="image" size={28} strokeWidth={1.6} />
                              )}
                            </span>
                            <span className={styles.productInfo}>
                              <strong>{item.name}</strong>
                              <span>{item.code} · {item.qty} {item.unit}</span>
                            </span>
                          </div>
                        );
                      })}
                    </div>

                    <span className={styles.totalBlock}>
                      <span>Total pesanan</span>
                      <strong>{formatIDR(order.total)}</strong>
                    </span>
                  </div>

                  <div className={styles.cardFooter}>
                    <Link href={detailHref} className={styles.more}>
                      Lihat detail pesanan <Icon name="arrow" size={18} strokeWidth={1.8} />
                    </Link>
                    <Link
                      href={action.href}
                      className={`${styles.actionButton} ${action.primary ? styles.actionPrimary : styles.actionSecondary}`}
                      aria-label={`${action.label} untuk pesanan ${order.number}`}
                    >
                      <Icon name={action.icon} size={19} strokeWidth={1.8} /> {action.label}
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
