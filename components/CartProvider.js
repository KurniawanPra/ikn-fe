'use client';

// Keranjang belanja (mock, disimpan di localStorage). Belum terhubung backend.
import { createContext, useContext, useEffect, useState } from 'react';

const CartContext = createContext(null);
const KEY = 'ikn_cart';

export function CartProvider({ children }) {
  const [items, setItems] = useState([]); // { slug, name, code, price, unit, qty, image }
  const [ready, setReady] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY);
      if (raw) setItems(JSON.parse(raw));
    } catch {}
    setReady(true);
  }, []);

  useEffect(() => {
    if (!ready) return;
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {}
  }, [items, ready]);

  function add(product, qty = 1) {
    setItems((prev) => {
      const found = prev.find((i) => i.slug === product.slug);
      if (found) {
        return prev.map((i) =>
          i.slug === product.slug ? { ...i, qty: i.qty + qty } : i
        );
      }
      return [
        ...prev,
        {
          slug: product.slug,
          name: product.name,
          code: product.code,
          price: product.price,
          unit: product.unit,
          image: product.image,
          qty,
        },
      ];
    });
  }

  function updateQty(slug, qty) {
    setItems((prev) =>
      prev
        .map((i) => (i.slug === slug ? { ...i, qty: Math.max(1, qty) } : i))
        .filter((i) => i.qty > 0)
    );
  }

  function remove(slug) {
    setItems((prev) => prev.filter((i) => i.slug !== slug));
  }

  function clear() {
    setItems([]);
  }

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + (i.price || 0) * i.qty, 0);

  return (
    <CartContext.Provider
      value={{ items, add, updateQty, remove, clear, count, subtotal, ready }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    // Fallback aman jika dipakai di luar provider (mis. saat prerender)
    return {
      items: [],
      add: () => {},
      updateQty: () => {},
      remove: () => {},
      clear: () => {},
      count: 0,
      subtotal: 0,
      ready: false,
    };
  }
  return ctx;
}
