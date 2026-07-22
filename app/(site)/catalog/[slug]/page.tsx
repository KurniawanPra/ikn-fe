import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import StatusBadge from '@/components/StatusBadge';
import StarRating from '@/components/StarRating';
import AddToCart from '@/components/AddToCart';
import ProductCard from '@/components/ProductCard';
import ProductDetailPrice from '@/components/ProductDetailPrice';
import { products, getProduct, getCategory, reviewsForProduct, stockLabels } from '@/lib/catalog';
import { formatDate } from '@/lib/format';

export function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const p = getProduct(params.slug);
  return p
    ? { title: p.name, description: p.summary }
    : { title: 'Produk' };
}

export default function ProductDetail({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  const category = getCategory(product.category);
  const stock = stockLabels[product.stockStatus] || stockLabels.out_of_stock;
  const reviews = reviewsForProduct(product.slug);
  const related = products.filter((p) => p.category === product.category && p.slug !== product.slug).slice(0, 4);
  const reviewCount = product.reviewCount ?? 0;
  const highlights = product.highlights ?? [];
  const specs = product.specs ?? [];
  const applications = product.applications ?? [];
  const solubility = product.solubility ?? [];

  return (
    <>
      <section className="pagehead commerce-head">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Katalog', href: '/catalog' },
              { label: category?.name || 'Produk', href: `/catalog/kategori/${product.category}` },
              { label: product.name },
            ]}
          />
        </div>
      </section>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="pd-grid">
            <div className="pd-media">
              {product.image ? (
                <Image src={product.image} alt={product.name} fill sizes="(max-width:900px) 100vw, 520px" style={{ objectFit: 'cover' }} priority />
              ) : (
                <span className="pd-drop"><Icon name="drop" size={90} strokeWidth={0.8} /></span>
              )}
              <span className="pd-code">{product.code}</span>
            </div>

            <div className="pd-info">
              <span className="pcard-kind">{product.kind}</span>
              <h1 className="pd-title">{product.name}</h1>

              <div className="pd-meta">
                <StatusBadge label={stock.id} tone={stock.tone} />
                {reviewCount > 0 && <StarRating value={product.rating} count={reviewCount} />}
              </div>

              <p className="pd-summary">{product.summary}</p>

              <ProductDetailPrice product={product} />

              {highlights.length > 0 && (
                <ul className="pd-highlights">
                  {highlights.map((h) => (
                    <li key={h}><Icon name="check" size={16} /> {h}</li>
                  ))}
                </ul>
              )}

              <AddToCart product={product} />
            </div>
          </div>

          {/* Spesifikasi & aplikasi */}
          <div className="pd-detail-grid">
            {specs.length > 0 && (
              <div>
                <h2 className="h3 pd-sec-title">Spesifikasi teknis</h2>
                <div className="spec-table">
                  {specs.map(([k, v]) => (
                    <div key={k} className="spec-row">
                      <span className="spec-key">{k}</span>
                      <span className="spec-val">{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <div>
              {applications.length > 0 && (
                <>
                  <h2 className="h3 pd-sec-title">Aplikasi</h2>
                  <ul className="pd-app-list">
                    {applications.map((a) => (
                      <li key={a}><Icon name="arrow" size={15} /> {a}</li>
                    ))}
                  </ul>
                </>
              )}

              {solubility.length > 0 && (
                <>
                  <h2 className="h3 pd-sec-title" style={{ marginTop: 30 }}>Kelarutan</h2>
                  <div className="spec-table">
                    {solubility.map(([k, v]) => (
                      <div key={k} className="spec-row">
                        <span className="spec-key">{k}</span>
                        <span className="spec-val">{v}</span>
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Ulasan */}
          <div className="pd-reviews">
            <h2 className="h3 pd-sec-title">Ulasan pelanggan</h2>
            {reviews.length === 0 ? (
              <p className="pd-quote-note">Belum ada ulasan untuk produk ini.</p>
            ) : (
              <div>
                {reviews.map((r) => (
                  <div key={r.id} className="review-item">
                    <div className="review-head">
                      <span className="review-author">{r.customer}</span>
                      <StarRating value={r.rating} />
                    </div>
                    <p>{r.body}</p>
                    <time className="review-date">{formatDate(r.date)}</time>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Terkait */}
          {related.length > 0 && (
            <div className="pd-related">
              <h2 className="h3 pd-sec-title">Produk terkait</h2>
              <div className="pgrid">
                {related.map((p) => (
                  <ProductCard key={p.slug} product={p} />
                ))}
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
