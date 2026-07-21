import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, type Column } from '@/components/admin/AdminPage';
import { orders, orderStatus, paymentStatus } from '@/lib/commerce';
import { formatIDR, formatDate } from '@/lib/format';

export const metadata = { title: 'Order' };

export default function AdminOrders() {
  const columns: Column<(typeof orders)[number]>[] = [
    {
      key: 'number',
      label: 'No. Order',
      render: (o) => (
        <Link href={`/admin/orders/${o.number}`} className="mono link">{o.number}</Link>
      ),
    },
    { key: 'customer', label: 'Customer', render: (o) => o.customer.name },
    { key: 'date', label: 'Tanggal', render: (o) => formatDate(o.date) },
    { key: 'total', label: 'Total', align: 'right', render: (o) => formatIDR(o.total) },
    {
      key: 'payment',
      label: 'Pembayaran',
      render: (o) => <StatusBadge label={paymentStatus[o.payment].id} tone={paymentStatus[o.payment].tone} small />,
    },
    {
      key: 'status',
      label: 'Status',
      render: (o) => <StatusBadge label={orderStatus[o.status].id} tone={orderStatus[o.status].tone} small />,
    },
  ];

  return (
    <div>
      <AdminPageHead title="Order" desc="Kelola dan pantau seluruh pesanan pelanggan." />
      <DataTable columns={columns} rows={orders} rowKey="number" empty="Belum ada order." />
    </div>
  );
}
