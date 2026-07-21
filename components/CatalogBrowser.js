'use client';

import { useMemo, useState } from 'react';
import Icon from '@/components/Icon';
import ProductCard from '@/components/ProductCard';
import EmptyState from '@/components/EmptyState';
import { categories } from '@/lib/catalog';

// Katalog interaktif: filter kategori, pencarian, dan urutan. Data dari props.
export default function CatalogBrowser({ products, initialCategory = 'all' }) {
  const [cat, setCat] = useState(initialCategory);
  const [q, setQ] = useState('');
  const [sort, setSort] = useState('featured');

  const filtered = useMemo(() => {
    let list = products.slice();
    if (cat !== 'all') list = list.filter((p) => p.category === cat);
    const query = q.trim().toLowerCase();
    if (query) {
      list = list.filter((p) =>
        [p.name, p.nameEn, p.code, p.kind, ...(p.aliases || [])]
          .join(' ')
          .toLowerCase()
          .includes(query)
      );
    }
    if (sort === 'price-asc') list.sort((a, b) => (a.price ?? Infinity) - (b.price ?? Infinity));
    else if (sort === 'price-desc') list.sort((a, b) => (b.price ?? -1) - (a.price ?? -1));
    else if (sort === 'name') list.sort((a, b) => a.name.localeCompare(b.name));
    return list;
  }, [products, cat, q, sort]);

  return (
    <div className="cat-layout">
      <aside className="cat-side">
        <div>
          <span className="cat-filter-title">Kategori</span>
          <ul className="cat-filter-list">
            <li>
              <button
                className={`cat-filter-btn ${cat === 'all' ? 'is-active' : ''}`}
                onClick={() => setCat('all')}
              >
                Semua produk
              </button>
            </li>
            {categories.map((c) => (
              <li key={c.slug}>
                <button
                  className={`cat-filter-btn ${cat === c.slug ? 'is-active' : ''}`}
                  onClick={() => setCat(c.slug)}
                >
                  {c.name}
                </button>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <span className="cat-filter-title">Cari</span>
          <div className="cat-search">
            <Icon name="compass" size={17} />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Nama atau kode produk"
              aria-label="Cari produk"
            />
          </div>
        </div>
      </aside>

      <div>
        <div className="cat-bar">
          <span className="cat-count">{filtered.length} produk</span>
          <select
            className="cat-sort"
            value={sort}
            onChange={(e) => setSort(e.target.value)}
            aria-label="Urutkan"
          >
            <option value="featured">Unggulan</option>
            <option value="name">Nama A–Z</option>
            <option value="price-asc">Harga termurah</option>
            <option value="price-desc">Harga tertinggi</option>
          </select>
        </div>

        {filtered.length === 0 ? (
          <EmptyState
            icon="compass"
            title="Tidak ada hasil"
            body="Coba kata kunci lain atau pilih kategori berbeda."
          />
        ) : (
          <div className="pgrid">
            {filtered.map((p) => (
              <ProductCard key={p.slug} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
