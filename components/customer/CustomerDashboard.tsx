'use client';

import Link from 'next/link';
import Icon from '@/components/Icon';
import EmptyState from '@/components/EmptyState';
import StatusBadge from '@/components/StatusBadge';
import { useAuth } from '@/components/AuthProvider';
import { useTransactions } from '@/components/TransactionProvider';
import { useLang } from '@/components/LanguageProvider';
import { t } from '@/lib/i18n';
import {
  getCustomerDashboardStats,
  getOrdersByCustomer,
  orderStatus,
} from '@/lib/commerce';
import { formatDate, formatIDR } from '@/lib/format';
import type { IconName } from '@/lib/types';

export default function CustomerDashboard() {
  const { customer } = useAuth();
  const { orders } = useTransactions();
  const { lang } = useLang();

  if (!customer) return null;

  const ui = t[lang] || t.id;
  const d = ui.dash;

  const quickActions: { href: string; label: string; body: string; icon: IconName }[] = [
    { href: '/catalog', label: d.quick.catalog, body: d.quick.catalogDesc, icon: 'flask' },
    { href: '/dashboard/pesanan', label: d.quick.orders, body: d.quick.ordersDesc, icon: 'drop' },
    { href: '/dashboard/alamat', label: d.quick.address, body: d.quick.addressDesc, icon: 'pin' },
    { href: '/dashboard/profil', label: d.quick.profile, body: d.quick.profileDesc, icon: 'handshake' },
  ];

  const customerOrders = getOrdersByCustomer(customer.id, orders);
  const stats = getCustomerDashboardStats(customer.id, orders);
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
          <span className="label label-amber">{d.title}</span>
          <h2 className="h2">{d.welcome} {customer.name.split(' ')[0]}.</h2>
          <p>{customer.company} · {d.subtitle}</p>
        </div>
        <Link href="/catalog" className="btn btn-solid">
          {d.shop} <Icon name="arrow" />
        </Link>
      </section>

      <section className="acct-stats" aria-label="Ringkasan pesanan">
        <div className="acct-stat"><span className="acct-stat-val">{stats.totalOrders}</span><span className="acct-stat-label">{d.stats.total}</span></div>
        <div className="acct-stat"><span className="acct-stat-val">{stats.awaitingPayment}</span><span className="acct-stat-label">{d.stats.unpaid}</span></div>
        <div className="acct-stat"><span className="acct-stat-val">{stats.inProgress}</span><span className="acct-stat-label">{d.stats.inProgress}</span></div>
        <div className="acct-stat"><span className="acct-stat-val">{stats.completed}</span><span className="acct-stat-label">{d.stats.completed}</span></div>
        <div className="acct-stat acct-stat-wide"><span className="acct-stat-val">{formatIDR(stats.transactionValue)}</span><span className="acct-stat-label">{d.stats.value}</span></div>
      </section>

      {alerts.length > 0 && (
        <section className="dash-alerts" aria-labelledby="customer-alert-title">
          <div className="acct-section-head">
            <h2 id="customer-alert-title" className="h3">{d.alerts.title}</h2>
          </div>
          {alerts.map((order) => {
            const needsPayment = ['unpaid', 'rejected'].includes(order.payment);
            const message = needsPayment
              ? d.alerts.unpaid.replace('{num}', order.number)
              : order.status === 'shipped'
                ? d.alerts.shipped.replace('{num}', order.number) + (order.trackingNo ? ` (${order.trackingNo})` : '')
                : d.alerts.reviewed.replace('{num}', order.number);
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
          <h2 className="h3">{d.recent.title}</h2>
          <Link href="/dashboard/pesanan" className="link">{d.recent.all} <Icon name="arrow" /></Link>
        </div>
        {recent.length === 0 ? (
          <EmptyState title={d.recent.emptyTitle} body={d.recent.emptyBody} action={{ href: '/catalog', label: d.recent.catalog }} />
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
        <div className="acct-section-head"><h2 className="h3">{d.quick.title}</h2></div>
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
