'use client';

import Link from 'next/link';
import Image from 'next/image';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import EmptyState from '@/components/EmptyState';
import { useCart } from '@/components/CartProvider';
import { formatIDR } from '@/lib/format';

export default function CartPage() {
  const { items, updateQty, remove, subtotal, count, ready } = useCart();

  return (
    <>
      <section className="pagehead commerce-head">
        <div className="container">
          <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Keranjang' }]} />
          <span className="label label-amber">/ Keranjang</span>
          <h1 className="display pagehead-title">Keranjang belanja.</h1>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          {ready && items.length === 0 ? (
            <EmptyState
              icon="drop"
              title="Keranjang masih kosong"
              body="Jelajahi katalog produk hilir karet kami dan tambahkan produk ke keranjang."
              action={{ href: '/catalog', label: 'Lihat katalog' }}
            />
          ) : (
            <div className="cart-grid">
              <div className="cart-items">
                {items.map((it) => (
                  <div key={it.slug} className="cart-row">
                    <Link href={`/catalog/${it.slug}`} className="cart-thumb">
                      {it.image ? (
                        <Image src={it.image} alt={it.name} fill sizes="88px" style={{ objectFit: 'cover' }} />
                      ) : (
                        <Icon name="drop" size={28} />
                      )}
                    </Link>
                    <div className="cart-info">
                      <span className="pcard-kind">{it.code}</span>
                      <h3 className="cart-name">
                        <Link href={`/catalog/${it.slug}`}>{it.name}</Link>
                      </h3>
                      <span className="cart-unit-price">{formatIDR(it.price)}/{it.unit}</span>
                    </div>
                    <div className="qty-ctl qty-ctl-sm">
                      <button type="button" onClick={() => updateQty(it.slug, it.qty - 1)} aria-label="Kurangi">−</button>
                      <input
                        type="number"
                        min={1}
                        value={it.qty}
                        onChange={(e) => updateQty(it.slug, Number(e.target.value) || 1)}
                        aria-label={`Jumlah ${it.name}`}
                      />
                      <button type="button" onClick={() => updateQty(it.slug, it.qty + 1)} aria-label="Tambah">+</button>
                    </div>
                    <span className="cart-line-total">{formatIDR((it.price || 0) * it.qty)}</span>
                    <button type="button" className="cart-remove" onClick={() => remove(it.slug)} aria-label={`Hapus ${it.name}`}>
                      <Icon name="close" size={18} />
                    </button>
                  </div>
                ))}
              </div>

              <aside className="summary">
                <h2 className="summary-title">Ringkasan</h2>
                <div className="summary-row">
                  <span>Subtotal ({count} item)</span>
                  <span>{formatIDR(subtotal)}</span>
                </div>
                <div className="summary-row summary-muted">
                  <span>Ongkir & biaya</span>
                  <span>Dihitung saat checkout</span>
                </div>
                <div className="summary-row summary-total">
                  <span>Estimasi total</span>
                  <span>{formatIDR(subtotal)}</span>
                </div>
                <Link href="/checkout" className="btn btn-solid btn-block" style={{ marginTop: 18 }}>
                  Lanjut ke checkout <Icon name="arrow" />
                </Link>
                <Link href="/catalog" className="link" style={{ marginTop: 16, justifyContent: 'center' }}>
                  Lanjut belanja
                </Link>
              </aside>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
