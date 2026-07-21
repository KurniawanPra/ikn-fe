import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, RowActions } from '@/components/admin/AdminPage';
import { galleryItems } from '@/lib/admin-data';

export const metadata = { title: 'Gallery' };

export default function AdminGallery() {
  const images = galleryItems.filter((g) => g.type === 'image');

  const columns = [
    { key: 'title', label: 'Judul' },
    { key: 'src', label: 'Berkas', render: (g) => <span className="mono">{g.src}</span> },
    {
      key: 'published',
      label: 'Status',
      render: (g) => <StatusBadge label={g.published ? 'Tampil' : 'Draf'} tone={g.published ? 'ok' : 'warn'} small />,
    },
    { key: 'act', label: 'Aksi', render: () => <RowActions /> },
  ];

  return (
    <div>
      <AdminPageHead title="Gallery" desc="Kelola galeri foto kegiatan dan fasilitas." action={{ label: 'Unggah foto', icon: 'plus' }} />
      <DataTable columns={columns} rows={images} empty="Belum ada foto." />
    </div>
  );
}
