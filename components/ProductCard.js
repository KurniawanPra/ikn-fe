'use client';

import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import StatusBadge from '@/components/StatusBadge';
import StarRating from '@/components/StarRating';
import { useCart } from '@/components/CartProvider';
import { stockLabels } from '@/lib/catalog';
import { formatIDR } from '@/lib/format';

export default function ProductCard({ product }) {
  const { add } = useCart();
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
          {product.reviewCount > 0 && <StarRating value={product.rating} count={product.reviewCount} />}
        </div>

        <div className="pcard-foot">
          <span className="pcard-price">
            {product.priceMode === 'fixed'
              ? <>{formatIDR(product.price)}<small>/{product.unit}</small></>
              : <span className="pcard-quote">Hubungi marketing</span>}
          </span>

          {sellable ? (
            <button
              type="button"
              className="pcard-add"
              aria-label={`Tambah ${product.name} ke keranjang`}
              onClick={() => add(product, product.moq || 1)}
            >
              <Icon name="plus" size={18} />
            </button>
          ) : (
            <Link href={`/catalog/${product.slug}`} className="pcard-add pcard-add-view" aria-label="Lihat detail">
              <Icon name="arrow" size={18} />
            </Link>
          )}
        </div>
      </div>
    </article>
  );
}
