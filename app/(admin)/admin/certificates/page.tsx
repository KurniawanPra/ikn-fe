import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, RowActions, type Column } from '@/components/admin/AdminPage';
import { certificates } from '@/lib/admin-data';

export const metadata = { title: 'Certificate' };

export default function AdminCertificates() {
  const columns: Column<(typeof certificates)[number]>[] = [
    { key: 'name', label: 'Sertifikat' },
    { key: 'material', label: 'Materi/standar' },
    { key: 'file', label: 'Berkas', render: (c) => (c.file ? <span className="mono">{c.file}</span> : '—') },
    {
      key: 'published',
      label: 'Status',
      render: (c) => <StatusBadge label={c.published ? 'Tampil' : 'Draf'} tone={c.published ? 'ok' : 'warn'} small />,
    },
    { key: 'act', label: 'Aksi', render: () => <RowActions /> },
  ];

  return (
    <div>
      <AdminPageHead title="Certificate" desc="Kelola sertifikat & kepatuhan (ISO, REACH, dll)." action={{ label: 'Tambah sertifikat', icon: 'plus' }} />
      <DataTable columns={columns} rows={certificates} empty="Belum ada sertifikat." />
    </div>
  );
}
