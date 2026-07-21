import Breadcrumb from '@/components/Breadcrumb';
import CatalogBrowser from '@/components/CatalogBrowser';
import { products } from '@/lib/catalog';

export const metadata = {
  title: 'Katalog Produk',
  description:
    'Katalog produk hilir karet PT Industri Karet Nusantara — Resiprene 35 dan aneka barang karet industri.',
};

export default function CatalogPage() {
  return (
    <>
      <section className="pagehead commerce-head">
        <div className="container">
          <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Katalog' }]} />
          <span className="label label-amber">/ Katalog</span>
          <h1 className="display pagehead-title">Produk karet hilir.</h1>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <CatalogBrowser products={products} />
        </div>
      </section>
    </>
  );
}
