import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, RowActions } from '@/components/admin/AdminPage';
import { customers } from '@/lib/admin-data';
import { formatDate } from '@/lib/format';

export const metadata = { title: 'Customer' };

export default function AdminCustomers() {
  const columns = [
    { key: 'company', label: 'Perusahaan' },
    { key: 'pic', label: 'PIC' },
    { key: 'email', label: 'Email', render: (c) => <span className="mono">{c.email}</span> },
    { key: 'phone', label: 'Telepon' },
    { key: 'orders', label: 'Order', align: 'right' },
    { key: 'joined', label: 'Bergabung', render: (c) => formatDate(c.joined) },
    {
      key: 'status',
      label: 'Status',
      render: (c) => <StatusBadge label={c.status === 'active' ? 'Aktif' : 'Nonaktif'} tone={c.status === 'active' ? 'ok' : 'bad'} small />,
    },
    { key: 'act', label: 'Aksi', render: () => <RowActions actions={['Detail', 'Nonaktifkan']} /> },
  ];

  return (
    <div>
      <AdminPageHead title="Customer" desc="Daftar pelanggan terdaftar." />
      <DataTable columns={columns} rows={customers} empty="Belum ada customer." />
    </div>
  );
}
