import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, RowActions } from '@/components/admin/AdminPage';
import { orders, paymentStatus, bankById } from '@/lib/commerce';
import { formatIDR, formatDate } from '@/lib/format';

export const metadata = { title: 'Payment' };

export default function AdminPayments() {
  const columns = [
    {
      key: 'number',
      label: 'No. Order',
      render: (o) => <Link href={`/admin/orders/${o.number}`} className="mono link">{o.number}</Link>,
    },
    { key: 'customer', label: 'Customer', render: (o) => o.customer.name },
    { key: 'bank', label: 'Bank tujuan', render: (o) => bankById(o.bank)?.bank || '—' },
    { key: 'total', label: 'Nominal', align: 'right', render: (o) => formatIDR(o.total) },
    { key: 'proof', label: 'Bukti', render: (o) => (o.proofUploaded ? 'Ada' : 'Belum') },
    {
      key: 'payment',
      label: 'Status',
      render: (o) => <StatusBadge label={paymentStatus[o.payment].id} tone={paymentStatus[o.payment].tone} small />,
    },
    {
      key: 'act',
      label: 'Aksi',
      render: (o) =>
        o.payment === 'awaiting_confirmation' ? (
          <RowActions actions={['Verifikasi', 'Tolak']} />
        ) : (
          <RowActions actions={['Detail']} />
        ),
    },
  ];

  return (
    <div>
      <AdminPageHead title="Payment" desc="Verifikasi bukti transfer dan status pembayaran order." />
      <DataTable columns={columns} rows={orders} rowKey="number" empty="Belum ada pembayaran." />
    </div>
  );
}
