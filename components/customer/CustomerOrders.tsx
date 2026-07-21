'use client';

import { useMemo, useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import EmptyState from '@/components/EmptyState';
import StatusBadge from '@/components/StatusBadge';
import { useAuth } from '@/components/AuthProvider';
import { getOrdersByCustomer, orderStatus, paymentStatus } from '@/lib/commerce';
import { formatDate, formatIDR } from '@/lib/format';

export default function CustomerOrders() {
  const { customer } = useAuth();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState('all');
  const customerOrders = customer ? getOrdersByCustomer(customer.id) : [];
  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();
    return customerOrders.filter((order) => {
      const matchesQuery = !normalized || order.number.toLowerCase().includes(normalized) || order.items.some((item) => item.name.toLowerCase().includes(normalized));
      const matchesFilter = filter === 'all' || order.status === filter || (filter === 'payment' && ['unpaid', 'rejected'].includes(order.payment));
      return matchesQuery && matchesFilter;
    });
  }, [customerOrders, filter, query]);

  if (!customer) return null;

  return (
    <div>
      <div className="acct-section-head">
        <div><h2 className="h3">Pesanan saya</h2><p className="form-note">Hanya pesanan milik {customer.company} yang ditampilkan.</p></div>
        <span className="cat-count">{customerOrders.length} pesanan</span>
      </div>

      <div className="acct-order-tools">
        <label className="cat-search">
          <Icon name="compass" size={17} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Cari nomor atau produk" aria-label="Cari pesanan" />
        </label>
        <select className="cat-sort" value={filter} onChange={(event) => setFilter(event.target.value)} aria-label="Filter status pesanan">
          <option value="all">Semua status</option>
          <option value="payment">Perlu pembayaran</option>
          <option value="processing">Diproses</option>
          <option value="packing">Dikemas</option>
          <option value="shipped">Dikirim</option>
          <option value="completed">Selesai</option>
          <option value="cancelled">Dibatalkan</option>
        </select>
      </div>

      {filtered.length === 0 ? (
        <EmptyState title="Pesanan tidak ditemukan" body="Ubah kata kunci atau filter, atau mulai pesanan baru dari katalog." action={{ href: '/catalog', label: 'Lihat katalog' }} />
      ) : (
        <div className="acct-order-list">
          {filtered.map((order) => {
            const status = orderStatus[order.status];
            const payment = paymentStatus[order.payment];
            return (
              <Link key={order.number} href={`/dashboard/pesanan/${order.number}`} className="acct-order-card">
                <div className="acct-order-card-top">
                  <div><span className="acct-order-no">{order.number}</span><span className="acct-order-date">{formatDate(order.date)}</span></div>
                  <div className="acct-order-badges"><StatusBadge label={status.id} tone={status.tone} small /><StatusBadge label={payment.id} tone={payment.tone} small /></div>
                </div>
                <div className="acct-order-card-body">
                  <span className="acct-order-items">{order.items.map((item) => `${item.name} ×${item.qty}`).join(', ')}</span>
                  <span className="acct-order-total">{formatIDR(order.total)}</span>
                </div>
                <span className="acct-order-more">Lihat detail & lacak <Icon name="arrow" size={15} /></span>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
