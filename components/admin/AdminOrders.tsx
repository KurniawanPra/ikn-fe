'use client';

import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import { useTransactions } from '@/components/TransactionProvider';
import { AdminPageHead, DataTable, type Column } from '@/components/admin/AdminPage';
import { orderStatus, paymentStatus } from '@/lib/commerce';
import { formatDate, formatIDR } from '@/lib/format';
import type { Order } from '@/lib/types';

export default function AdminOrders() {
  const { orders, ready } = useTransactions();
  const columns: Column<Order>[] = [
    {
      key: 'number',
      label: 'No. Order',
      render: (order) => (
        <Link href={`/admin/orders/${order.number}`} className="mono link">{order.number}</Link>
      ),
    },
    { key: 'customer', label: 'Customer', render: (order) => order.customer.name },
    { key: 'date', label: 'Tanggal', render: (order) => formatDate(order.date) },
    { key: 'total', label: 'Total', align: 'right', render: (order) => formatIDR(order.total) },
    {
      key: 'payment',
      label: 'Pembayaran',
      render: (order) => (
        <StatusBadge label={paymentStatus[order.payment].id} tone={paymentStatus[order.payment].tone} small />
      ),
    },
    {
      key: 'status',
      label: 'Status',
      render: (order) => (
        <StatusBadge label={orderStatus[order.status].id} tone={orderStatus[order.status].tone} small />
      ),
    },
  ];

  return (
    <div>
      <AdminPageHead title="Order" desc="Kelola transaksi yang tersimpan lokal di browser." />
      <DataTable
        columns={columns}
        rows={orders}
        rowKey="number"
        empty={ready ? 'Belum ada order.' : 'Memuat transaksi...'}
      />
    </div>
  );
}
