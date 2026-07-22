import CatalogBrowser from '@/components/CatalogBrowser';
import { products } from '@/lib/catalog';

export const metadata = {
  title: 'Katalog Produk & Shop',
  description: 'Beli produk karet industri PT IKN dengan harga khusus customer.',
};

export default function CustomerCatalogPage() {
  return (
    <div>
      <div style={{ marginBottom: 24 }}>
        <h1 style={{ fontSize: '1.5rem', fontWeight: 700, margin: '0 0 6px' }}>Katalog Produk & Pemesanan</h1>
        <p style={{ color: 'var(--ink-soft)', fontSize: '0.9rem', margin: 0 }}>
          Pilih produk industri hilir karet PT IKN, lihat harga khusus customer, stok real-time, dan lakukan pemesanan secara langsung.
        </p>
      </div>

      <CatalogBrowser products={products} />
    </div>
  );
}
