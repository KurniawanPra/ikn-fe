'use client';

import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import StatusBadge from '@/components/StatusBadge';
import StarRating from '@/components/StarRating';
import { useCart } from '@/components/CartProvider';
import { useAuth } from '@/components/AuthProvider';
import { stockLabels } from '@/lib/catalog';
import { formatIDR } from '@/lib/format';
import type { Product } from '@/lib/types';
import { useRouter } from 'next/navigation';

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  const { customer } = useAuth();
  const router = useRouter();
  const stock = stockLabels[product.stockStatus] || stockLabels.out_of_stock;
  const sellable = product.priceMode === 'fixed' && product.stockStatus === 'in_stock';

  return (
    <article className="pcard">
      <Link href={`/catalog/${product.slug}`} className="pcard-media">
        {product.image ? (
          <Image src={product.image} alt={product.name} fill sizes="(max-width:900px) 50vw, 300px" />
        ) : (
          <span className="pcard-drop"><Icon name="drop" size={48} strokeWidth={1} /></span>
        )}
        <span className="pcard-code">{product.code}</span>
      </Link>

      <div className="pcard-body">
        <span className="pcard-kind">{product.kind}</span>
        <h3 className="pcard-name">
          <Link href={`/catalog/${product.slug}`}>{product.name}</Link>
        </h3>

        <div className="pcard-meta">
          <StatusBadge label={stock.id} tone={stock.tone} small />
          {(product.reviewCount ?? 0) > 0 && <StarRating value={product.rating ?? 0} count={product.reviewCount} />}
        </div>

        <div className="pcard-foot">
          <span className="pcard-price">
            {customer ? (
              product.priceMode === 'fixed' ? (
                <>{formatIDR(product.price)}<small>/{product.unit}</small></>
              ) : (
                <span className="pcard-quote">Hubungi marketing</span>
              )
            ) : (
              <span className="pcard-quote" style={{ color: 'var(--amber)' }}>
                Harga tersedia setelah login
              </span>
            )}
          </span>

          {customer ? (
            sellable ? (
              <button
                type="button"
                className="pcard-add"
                aria-label={`Tambah ${product.name} ke keranjang`}
                onClick={(e) => {
                  e.preventDefault();
                  add(product, product.moq || 1);
                }}
              >
                <Icon name="plus" size={18} />
              </button>
            ) : (
              <Link href={`/catalog/${product.slug}`} className="pcard-add pcard-add-view" aria-label="Lihat detail">
                <Icon name="arrow" size={18} />
              </Link>
            )
          ) : (
            <Link
              href={`/login?redirect=${encodeURIComponent(`/catalog/${product.slug}`)}`}
              className="pcard-add pcard-add-login"
              aria-label="Login untuk memesan"
              title="Login untuk memesan"
              onClick={(e) => e.stopPropagation()}
            >
              <Icon name="arrow" size={18} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
