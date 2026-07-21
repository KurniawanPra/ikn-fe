import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, RowActions, type Column } from '@/components/admin/AdminPage';
import { additionalFees } from '@/lib/commerce';
import { formatIDR } from '@/lib/format';

export const metadata = { title: 'Tambahan Biaya' };

const typeLabels = { shipping: 'Ongkir', admin: 'Administrasi' };

export default function AdminAdditionalFees() {
  const columns: Column<(typeof additionalFees)[number]>[] = [
    { key: 'label', label: 'Nama biaya' },
    { key: 'type', label: 'Jenis', render: (f) => typeLabels[f.type] || f.type },
    { key: 'amount', label: 'Nominal', align: 'right', render: (f) => formatIDR(f.amount) },
    {
      key: 'active',
      label: 'Status',
      render: (f) => <StatusBadge label={f.active ? 'Aktif' : 'Nonaktif'} tone={f.active ? 'ok' : 'bad'} small />,
    },
    { key: 'act', label: 'Aksi', render: () => <RowActions /> },
  ];

  return (
    <div>
      <AdminPageHead title="Tambahan Biaya" desc="Ongkir dan biaya administrasi yang diterapkan pada checkout." action={{ label: 'Tambah biaya', icon: 'plus' }} />
      <DataTable columns={columns} rows={additionalFees} empty="Belum ada biaya." />
    </div>
  );
}
