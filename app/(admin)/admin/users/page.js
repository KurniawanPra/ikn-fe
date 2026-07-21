import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, RowActions } from '@/components/admin/AdminPage';
import { adminUsers, roleLabels, permissionList } from '@/lib/admin-data';

export const metadata = { title: 'User & Role' };

const permMap = Object.fromEntries(permissionList);

export default function AdminUsers() {
  const columns = [
    { key: 'name', label: 'Nama' },
    { key: 'email', label: 'Email', render: (u) => <span className="mono">{u.email}</span> },
    { key: 'role', label: 'Peran', render: (u) => roleLabels[u.role] || u.role },
    {
      key: 'permissions',
      label: 'Hak akses',
      render: (u) =>
        u.role === 'super_admin'
          ? 'Semua modul'
          : (u.permissions || []).map((p) => permMap[p] || p).join(', ') || '—',
    },
    {
      key: 'active',
      label: 'Status',
      render: (u) => <StatusBadge label={u.active ? 'Aktif' : 'Nonaktif'} tone={u.active ? 'ok' : 'bad'} small />,
    },
    { key: 'act', label: 'Aksi', render: () => <RowActions /> },
  ];

  return (
    <div>
      <AdminPageHead title="User & Role" desc="Kelola akun internal dan hak akses per modul. Hanya Super Admin." action={{ label: 'Tambah user', icon: 'plus' }} />
      <DataTable columns={columns} rows={adminUsers} empty="Belum ada user." />
    </div>
  );
}
