'use client';

import { useAuth } from '@/components/AuthProvider';
import { formatIDR } from '@/lib/format';
import type { Product } from '@/lib/types';
import Icon from '@/components/Icon';

export default function ProductDetailPrice({ product }: { product: Product }) {
  const { customer } = useAuth();

  if (!customer) {
    return (
      <div className="pd-price" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: 'var(--amber)' }}>
        <Icon name="shieldCheck" size={20} />
        <span className="pcard-quote" style={{ fontSize: '1.05rem', color: 'var(--amber)', fontWeight: 600 }}>
          Harga tersedia setelah login
        </span>
      </div>
    );
  }

  return (
    <div className="pd-price">
      {product.priceMode === 'fixed' ? (
        <>{formatIDR(product.price)}<small>/{product.unit}</small></>
      ) : (
        <span className="pcard-quote">Harga berdasarkan penawaran</span>
      )}
    </div>
  );
}
