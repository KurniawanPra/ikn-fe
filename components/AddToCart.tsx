'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import { useCart } from '@/components/CartProvider';
import type { Product } from '@/lib/types';

// Kontrol qty + tombol tambah keranjang di halaman detail produk.
export default function AddToCart({ product }: { product: Product }) {
  const { add } = useCart();
  const [qty, setQty] = useState(product.moq || 1);
  const [added, setAdded] = useState(false);

  const sellable = product.priceMode === 'fixed' && product.stockStatus === 'in_stock';

  if (!sellable) {
    return (
      <div className="pd-buy">
        <p className="pd-quote-note">
          Produk ini dijual berdasarkan spesifikasi. Hubungi tim marketing kami
          untuk penawaran dan ketersediaan.
        </p>
        <Link href="/kontak" className="btn btn-solid btn-block">
          Minta penawaran <Icon name="arrow" />
        </Link>
      </div>
    );
  }

  function handleAdd() {
    add(product, qty);
    setAdded(true);
    setTimeout(() => setAdded(false), 2200);
  }

  return (
    <div className="pd-buy">
      <div className="qty-row">
        <span className="qty-label">Jumlah ({product.unit})</span>
        <div className="qty-ctl">
          <button type="button" onClick={() => setQty((v) => Math.max(product.moq || 1, v - 1))} aria-label="Kurangi">−</button>
          <input
            type="number"
            min={product.moq || 1}
            value={qty}
            onChange={(e) => setQty(Math.max(product.moq || 1, Number(e.target.value) || 1))}
            aria-label="Jumlah"
          />
          <button type="button" onClick={() => setQty((v) => v + 1)} aria-label="Tambah">+</button>
        </div>
      </div>
      {(product.moq ?? 0) > 1 && (
        <p className="qty-moq">Minimum order: {product.moq} {product.unit}</p>
      )}

      <div className="pd-buy-actions">
        <button type="button" className="btn btn-solid btn-block" onClick={handleAdd}>
          {added ? <>Ditambahkan <Icon name="check" /></> : <>Tambah ke keranjang <Icon name="plus" /></>}
        </button>
        <Link href="/cart" className="btn btn-line btn-block">
          Lihat keranjang <Icon name="arrow" />
        </Link>
      </div>
    </div>
  );
}
