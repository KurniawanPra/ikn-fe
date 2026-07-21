import { notFound } from 'next/navigation';
import Breadcrumb from '@/components/Breadcrumb';
import CatalogBrowser from '@/components/CatalogBrowser';
import { categories, products, getCategory } from '@/lib/catalog';

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export function generateMetadata({ params }) {
  const c = getCategory(params.slug);
  return c ? { title: `${c.name} — Katalog`, description: c.desc } : { title: 'Kategori' };
}

export default function CategoryPage({ params }) {
  const category = getCategory(params.slug);
  if (!category) notFound();

  return (
    <>
      <section className="pagehead commerce-head">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Katalog', href: '/catalog' },
              { label: category.name },
            ]}
          />
          <span className="label label-amber">/ Kategori</span>
          <h1 className="display pagehead-title">{category.name}</h1>
          <p className="lead" style={{ marginTop: 12, maxWidth: '48ch' }}>{category.desc}</p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <CatalogBrowser products={products} initialCategory={category.slug} />
        </div>
      </section>
    </>
  );
}
