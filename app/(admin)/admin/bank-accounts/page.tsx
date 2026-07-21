import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, RowActions, type Column } from '@/components/admin/AdminPage';
import { bankAccounts } from '@/lib/commerce';

export const metadata = { title: 'Akun Bank' };

export default function AdminBankAccounts() {
  const columns: Column<(typeof bankAccounts)[number]>[] = [
    { key: 'bank', label: 'Bank' },
    { key: 'number', label: 'Nomor rekening', render: (b) => <span className="mono">{b.number}</span> },
    { key: 'holder', label: 'Atas nama' },
    {
      key: 'active',
      label: 'Status',
      render: (b) => <StatusBadge label={b.active ? 'Aktif' : 'Nonaktif'} tone={b.active ? 'ok' : 'bad'} small />,
    },
    { key: 'act', label: 'Aksi', render: () => <RowActions /> },
  ];

  return (
    <div>
      <AdminPageHead title="Akun Bank" desc="Rekening tujuan transfer yang ditampilkan saat checkout." action={{ label: 'Tambah rekening', icon: 'plus' }} />
      <DataTable columns={columns} rows={bankAccounts} empty="Belum ada rekening." />
    </div>
  );
}
