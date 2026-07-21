import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, RowActions } from '@/components/admin/AdminPage';
import { brochures } from '@/lib/admin-data';

export const metadata = { title: 'Brochure' };

export default function AdminBrochures() {
  const columns = [
    { key: 'title', label: 'Judul' },
    { key: 'file', label: 'Berkas', render: (b) => <span className="mono">{b.file}</span> },
    { key: 'size', label: 'Ukuran', align: 'right' },
    {
      key: 'published',
      label: 'Status',
      render: (b) => <StatusBadge label={b.published ? 'Tampil' : 'Draf'} tone={b.published ? 'ok' : 'warn'} small />,
    },
    { key: 'act', label: 'Aksi', render: () => <RowActions /> },
  ];

  return (
    <div>
      <AdminPageHead title="Brochure" desc="Kelola brosur produk yang dapat diunduh pengunjung." action={{ label: 'Unggah brosur', icon: 'plus' }} />
      <DataTable columns={columns} rows={brochures} empty="Belum ada brosur." />
    </div>
  );
}
