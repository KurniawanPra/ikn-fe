import { AdminPageHead, DataTable, RowActions, type Column } from '@/components/admin/AdminPage';
import { categories, products } from '@/lib/catalog';

export const metadata = { title: 'Kategori Produk' };

export default function AdminProductCategories() {
  const rows = categories.map((c) => ({
    ...c,
    count: products.filter((p) => p.category === c.slug).length,
  }));

  const columns: Column<(typeof rows)[number]>[] = [
    { key: 'name', label: 'Nama kategori' },
    { key: 'slug', label: 'Slug', render: (c) => <span className="mono">{c.slug}</span> },
    { key: 'desc', label: 'Deskripsi' },
    { key: 'count', label: 'Produk', align: 'right' },
    { key: 'act', label: 'Aksi', render: () => <RowActions /> },
  ];

  return (
    <div>
      <AdminPageHead title="Kategori Produk" desc="Kelompokkan produk ke dalam kategori." action={{ label: 'Tambah kategori', icon: 'plus' }} />
      <DataTable columns={columns} rows={rows} rowKey="slug" empty="Belum ada kategori." />
    </div>
  );
}
