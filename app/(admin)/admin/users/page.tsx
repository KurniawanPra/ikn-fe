import StatusBadge from '@/components/StatusBadge';
import {
  AdminPageHead,
  DataTable,
  RowActions,
  type Column,
} from '@/components/admin/AdminPage';
import { adminUsers, roleLabels } from '@/lib/admin-data';

export const metadata = { title: 'Akun Admin' };

export default function AdminUsers() {
  const columns: Column<(typeof adminUsers)[number]>[] = [
    { key: 'name', label: 'Nama' },
    { key: 'email', label: 'Email', render: (user) => <span className="mono">{user.email}</span> },
    { key: 'role', label: 'Peran', render: (user) => roleLabels[user.role] },
    { key: 'permissions', label: 'Hak akses', render: () => 'Semua modul' },
    {
      key: 'active',
      label: 'Status',
      render: (user) => (
        <StatusBadge
          label={user.active ? 'Aktif' : 'Nonaktif'}
          tone={user.active ? 'ok' : 'bad'}
          small
        />
      ),
    },
    { key: 'act', label: 'Aksi', render: () => <RowActions actions={['Edit']} /> },
  ];

  return (
    <div>
      <AdminPageHead
        title="Akun Admin"
        desc="Satu akun admin mengelola katalog, transaksi, konten, dan konfigurasi situs."
      />
      <DataTable columns={columns} rows={adminUsers} empty="Akun admin belum tersedia." />
    </div>
  );
}
