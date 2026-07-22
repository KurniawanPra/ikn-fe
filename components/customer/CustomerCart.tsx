'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/components/CartProvider';
import Icon from '@/components/Icon';
import { formatIDR } from '@/lib/format';
import styles from '@/components/customer/CustomerCart.module.css';

export default function CustomerCart() {
  const [isOpen, setIsOpen] = useState(false);
  const { items, count, subtotal, remove, updateQty, ready } = useCart();

  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setIsOpen(false);
    };

    document.body.style.overflow = 'hidden';
    document.addEventListener('keydown', closeOnEscape);

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  if (!ready) return null;

  return (
    <>
      <button 
        type="button" 
        className={styles.cartBtn} 
        onClick={() => setIsOpen(true)}
        aria-label={`Keranjang (${count} item)`}
      >
        <Icon name="bag" size={20} />
        {count > 0 && <span className={styles.badge}>{count > 9 ? '9+' : count}</span>}
      </button>

      {isOpen && createPortal(
        <div className={styles.overlay} onClick={() => setIsOpen(false)}>
          <div
            className={styles.drawer}
            role="dialog"
            aria-modal="true"
            aria-labelledby="customer-cart-title"
            onClick={(e) => e.stopPropagation()}
          >
            <div className={styles.header}>
              <h2 id="customer-cart-title" className="h3">Keranjang Anda</h2>
              <button type="button" onClick={() => setIsOpen(false)} className={styles.closeBtn} aria-label="Tutup keranjang">
                <Icon name="close" size={20} />
              </button>
            </div>
            
            <div className={styles.body}>
              {items.length === 0 ? (
                <div className={styles.empty}>
                  <Icon name="bag" size={48} strokeWidth={1} />
                  <p>Keranjang Anda kosong.</p>
                  <Link href="/catalog" onClick={() => setIsOpen(false)} className="btn btn-line">Belanja sekarang</Link>
                </div>
              ) : (
                <div className={styles.list}>
                  {items.map((item) => (
                    <div key={item.slug} className={styles.item}>
                      <div className={styles.thumb}>
                        {item.image ? (
                          <Image src={item.image} alt={item.name} fill sizes="60px" />
                        ) : (
                          <Icon name="image" size={24} />
                        )}
                      </div>
                      <div className={styles.info}>
                        <Link href={`/catalog/${item.slug}`} className={styles.name} onClick={() => setIsOpen(false)}>
                          {item.name}
                        </Link>
                        <div className={styles.price}>{formatIDR(item.price || 0)}</div>
                        <div className={styles.actions}>
                          <div className={styles.qtyCtl}>
                            <button type="button" onClick={() => updateQty(item.slug, item.qty - 1)}>-</button>
                            <input type="number" readOnly value={item.qty} />
                            <button type="button" onClick={() => updateQty(item.slug, item.qty + 1)}>+</button>
                          </div>
                          <button type="button" onClick={() => remove(item.slug)} className={styles.removeBtn}>
                            <Icon name="trash" size={16} />
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {items.length > 0 && (
              <div className={styles.footer}>
                <div className={styles.subtotal}>
                  <span>Subtotal</span>
                  <strong>{formatIDR(subtotal)}</strong>
                </div>
                <Link href="/checkout" className="btn btn-solid btn-full" onClick={() => setIsOpen(false)}>
                  Beli sekarang <Icon name="arrow" />
                </Link>
              </div>
            )}
          </div>
        </div>,
        document.body,
      )}
    </>
  );
}
