import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, RowActions, type Column } from '@/components/admin/AdminPage';
import { products, getCategory, stockLabels } from '@/lib/catalog';
import { formatIDR } from '@/lib/format';

export const metadata = { title: 'Produk' };

export default function AdminProducts() {
  const columns: Column<(typeof products)[number]>[] = [
    { key: 'code', label: 'Kode', render: (p) => <span className="mono">{p.code}</span> },
    { key: 'name', label: 'Nama' },
    { key: 'category', label: 'Kategori', render: (p) => getCategory(p.category)?.name || '—' },
    {
      key: 'price',
      label: 'Harga',
      align: 'right',
      render: (p) => (p.priceMode === 'fixed' ? `${formatIDR(p.price)}/${p.unit}` : 'Penawaran'),
    },
    {
      key: 'stock',
      label: 'Stok',
      render: (p) => {
        const s = stockLabels[p.stockStatus] || stockLabels.out_of_stock;
        return <StatusBadge label={s.id} tone={s.tone} small />;
      },
    },
    { key: 'act', label: 'Aksi', render: () => <RowActions /> },
  ];

  return (
    <div>
      <AdminPageHead title="Produk" desc="Kelola katalog produk hilir karet." action={{ label: 'Tambah produk', icon: 'plus' }} />
      <DataTable columns={columns} rows={products} rowKey="slug" empty="Belum ada produk." />
    </div>
  );
}
