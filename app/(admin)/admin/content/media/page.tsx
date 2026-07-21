import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, RowActions, type Column } from '@/components/admin/AdminPage';
import { galleryItems } from '@/lib/admin-data';

export const metadata = { title: 'Video & Gambar' };

export default function AdminMedia() {
  const columns: Column<(typeof galleryItems)[number]>[] = [
    { key: 'title', label: 'Judul' },
    { key: 'type', label: 'Tipe', render: (g) => (g.type === 'video' ? 'Video' : 'Gambar') },
    {
      key: 'src',
      label: 'Sumber',
      render: (g) => <span className="mono">{g.type === 'video' ? `youtu.be/${g.src}` : g.src}</span>,
    },
    {
      key: 'published',
      label: 'Status',
      render: (g) => <StatusBadge label={g.published ? 'Tampil' : 'Draf'} tone={g.published ? 'ok' : 'warn'} small />,
    },
    { key: 'act', label: 'Aksi', render: () => <RowActions /> },
  ];

  return (
    <div>
      <AdminPageHead title="Video & Gambar" desc="Kelola aset media yang tampil di beranda dan galeri." action={{ label: 'Unggah media', icon: 'plus' }} />
      <DataTable columns={columns} rows={galleryItems} empty="Belum ada media." />
    </div>
  );
}
