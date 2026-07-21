import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, RowActions, type Column } from '@/components/admin/AdminPage';
import { newsItems } from '@/lib/admin-data';
import { formatDate } from '@/lib/format';

export const metadata = { title: 'News' };

export default function AdminNews() {
  const columns: Column<(typeof newsItems)[number]>[] = [
    { key: 'title', label: 'Judul' },
    { key: 'tag', label: 'Kategori' },
    { key: 'date', label: 'Tanggal', render: (n) => formatDate(n.date) },
    {
      key: 'published',
      label: 'Status',
      render: (n) => <StatusBadge label={n.published ? 'Terbit' : 'Draf'} tone={n.published ? 'ok' : 'warn'} small />,
    },
    { key: 'act', label: 'Aksi', render: () => <RowActions /> },
  ];

  return (
    <div>
      <AdminPageHead title="News" desc="Kelola berita dan artikel perusahaan." action={{ label: 'Tulis berita', icon: 'plus' }} />
      <DataTable columns={columns} rows={newsItems} rowKey="slug" empty="Belum ada berita." />
    </div>
  );
}
