import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, RowActions } from '@/components/admin/AdminPage';
import { menuItems } from '@/lib/admin-data';

export const metadata = { title: 'Menu' };

export default function AdminNavigation() {
  const byId = Object.fromEntries(menuItems.map((m) => [m.id, m]));
  const rows = menuItems
    .slice()
    .sort((a, b) => (a.parent || '').localeCompare(b.parent || '') || a.order - b.order);

  const columns = [
    {
      key: 'label',
      label: 'Label',
      render: (m) => (m.parent ? <span style={{ paddingLeft: 18, color: 'var(--ink-soft)' }}>↳ {m.label}</span> : <strong>{m.label}</strong>),
    },
    { key: 'url', label: 'URL', render: (m) => <span className="mono">{m.url}</span> },
    { key: 'parent', label: 'Induk', render: (m) => (m.parent ? byId[m.parent]?.label : '—') },
    { key: 'order', label: 'Urutan', align: 'right' },
    {
      key: 'active',
      label: 'Status',
      render: (m) => <StatusBadge label={m.active ? 'Tampil' : 'Sembunyi'} tone={m.active ? 'ok' : 'bad'} small />,
    },
    { key: 'act', label: 'Aksi', render: () => <RowActions /> },
  ];

  return (
    <div>
      <AdminPageHead title="Menu" desc="Atur struktur menu navigasi situs (induk & anak)." action={{ label: 'Tambah menu', icon: 'plus' }} />
      <DataTable columns={columns} rows={rows} empty="Belum ada menu." />
    </div>
  );
}
