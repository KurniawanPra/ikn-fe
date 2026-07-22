'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import EmptyState from '@/components/EmptyState';
import { useCart } from '@/components/CartProvider';
import { useAuth } from '@/components/AuthProvider';
import { useTransactions } from '@/components/TransactionProvider';
import { shippingMethods, bankAccounts } from '@/lib/commerce';
import { formatIDR } from '@/lib/format';
import type { Order } from '@/lib/types';

const ADMIN_FEE = 5000;

function firstOrThrow<T>(items: readonly T[], message: string): T {
  const first = items[0];
  if (!first) throw new Error(message);
  return first;
}

const DEFAULT_SHIPPING = firstOrThrow(
  shippingMethods,
  'Minimal satu metode pengiriman harus tersedia.'
);

export default function CheckoutPage() {
  const { items, subtotal, count, clear, ready } = useCart();
  const { customer } = useAuth();
  const { createOrder } = useTransactions();
  const [ship, setShip] = useState(DEFAULT_SHIPPING.id);
  const [placed, setPlaced] = useState<{ number: string; total: number } | null>(null);

  const shipping = shippingMethods.find((s) => s.id === ship) ?? DEFAULT_SHIPPING;
  const total = subtotal + shipping.amount + ADMIN_FEE;

  function placeOrder(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const now = new Date();
    const number = `IKN-${now.toISOString().slice(0, 10).replace(/-/g, '')}-${Math.floor(Math.random() * 90000 + 10000)}`;
    const activeBank = bankAccounts.find((bank) => bank.active) ?? bankAccounts[0];
    const recipient = String(form.get('recipient') || customer?.name || 'Customer');
    const email = String(form.get('email') || customer?.email || 'customer@example.test');
    const company = String(form.get('company') || customer?.company || recipient);
    const order: Order = {
      number,
      date: now.toISOString(),
      customer: {
        id: customer?.id || 'guest',
        name: company,
        email,
        pic: recipient,
      },
      items: items.map((item) => ({ ...item, price: item.price || 0 })),
      subtotal,
      shipping: shipping.amount,
      adminFee: ADMIN_FEE,
      total,
      status: 'awaiting_payment',
      payment: 'unpaid',
      bank: activeBank?.id || '',
      shippingMethod: shipping.id,
      address: {
        label: 'Alamat checkout',
        recipient,
        phone: String(form.get('phone') || ''),
        line: String(form.get('address') || ''),
      },
      trackingNo: null,
      proofUploaded: false,
      dueAt: new Date(now.getTime() + 2 * 24 * 60 * 60 * 1000).toISOString(),
      timeline: [{ status: 'awaiting_payment', at: now.toISOString() }],
    };

    createOrder(order);
    setPlaced({ number, total });
    clear();
  }

  if (ready && items.length === 0 && !placed) {
    return (
      <>
        <section className="pagehead commerce-head">
          <div className="container">
            <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Checkout' }]} />
            <h1 className="display pagehead-title">Checkout.</h1>
          </div>
        </section>
        <section className="section-tight">
          <div className="container">
            <EmptyState icon="drop" title="Tidak ada yang di-checkout" body="Keranjang Anda kosong." action={{ href: '/catalog', label: 'Lihat katalog' }} />
          </div>
        </section>
      </>
    );
  }

  if (placed) {
    const active = bankAccounts.filter((b) => b.active);
    return (
      <>
        <section className="pagehead commerce-head">
          <div className="container">
            <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Checkout' }, { label: 'Selesai' }]} />
          </div>
        </section>
        <section className="section-tight" style={{ paddingTop: 0 }}>
          <div className="container">
            <div className="co-done">
              <div className="vm-icon co-done-icon"><Icon name="check" size={40} /></div>
              <h1 className="h2">Pesanan dibuat</h1>
              <p className="co-done-num">No. Pesanan: <strong>{placed.number}</strong></p>
              <p>Selesaikan pembayaran sebesar <strong>{formatIDR(placed.total)}</strong> ke salah satu rekening berikut, lalu unggah bukti transfer pada halaman pesanan.</p>

              <div className="co-banks">
                {active.map((b) => (
                  <div key={b.id} className="co-bank">
                    <span className="co-bank-name">{b.bank}</span>
                    <span className="co-bank-no">{b.number}</span>
                    <span className="co-bank-holder">a.n. {b.holder}</span>
                  </div>
                ))}
              </div>

              <div className="co-done-actions">
                <Link href="/dashboard/pesanan" className="btn btn-solid">Lihat pesanan saya <Icon name="arrow" /></Link>
                <Link href="/catalog" className="btn btn-line">Lanjut belanja</Link>
              </div>
              <p className="admin-note" style={{ marginTop: 24 }}>Mode dummy JSON — pesanan tersimpan lokal di browser ini.</p>
            </div>
          </div>
        </section>
      </>
    );
  }

  return (
    <>
      <section className="pagehead commerce-head">
        <div className="container">
          <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Keranjang', href: '/cart' }, { label: 'Checkout' }]} />
          <span className="label label-amber">/ Checkout</span>
          <h1 className="display pagehead-title">Selesaikan pesanan.</h1>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <form className="co-grid" onSubmit={placeOrder}>
            <div className="co-main">
              <div className="co-block">
                <h2 className="h3 pd-sec-title">Alamat pengiriman</h2>
                <div className="co-fields">
                  <label><span className="label">Nama penerima</span><input name="recipient" required defaultValue={customer?.name || ''} placeholder="Nama lengkap / PIC" /></label>
                  <label><span className="label">Perusahaan</span><input name="company" defaultValue={customer?.company || ''} placeholder="Nama perusahaan" /></label>
                  <label><span className="label">Telepon</span><input name="phone" required placeholder="+62 ..." /></label>
                  <label><span className="label">Email</span><input name="email" type="email" required defaultValue={customer?.email || ''} placeholder="email@perusahaan.com" /></label>
                  <label className="co-full"><span className="label">Alamat lengkap</span><textarea name="address" rows={3} required placeholder="Jalan, kota, provinsi, kode pos" /></label>
                </div>
              </div>

              <div className="co-block">
                <h2 className="h3 pd-sec-title">Metode pengiriman</h2>
                <div className="co-ship">
                  {shippingMethods.map((m) => (
                    <label key={m.id} className={`co-ship-opt ${ship === m.id ? 'is-active' : ''}`}>
                      <input type="radio" name="ship" value={m.id} checked={ship === m.id} onChange={() => setShip(m.id)} />
                      <span className="co-ship-label">{m.label}</span>
                      <span className="co-ship-price">{formatIDR(m.amount)}</span>
                    </label>
                  ))}
                </div>
              </div>

              <div className="co-block">
                <h2 className="h3 pd-sec-title">Pembayaran</h2>
                <p className="pd-quote-note">Transfer bank manual. Nomor rekening tujuan tampil setelah pesanan dibuat, dan bukti transfer diunggah dari halaman pesanan.</p>
              </div>
            </div>

            <aside className="summary">
              <h2 className="summary-title">Ringkasan pesanan</h2>
              <div className="co-items">
                {items.map((it) => (
                  <div key={it.slug} className="co-item">
                    <span className="co-item-name">{it.name} <small>×{it.qty}</small></span>
                    <span>{formatIDR((it.price || 0) * it.qty)}</span>
                  </div>
                ))}
              </div>
              <div className="summary-row"><span>Subtotal ({count})</span><span>{formatIDR(subtotal)}</span></div>
              <div className="summary-row"><span>Ongkir</span><span>{formatIDR(shipping.amount)}</span></div>
              <div className="summary-row"><span>Biaya admin</span><span>{formatIDR(ADMIN_FEE)}</span></div>
              <div className="summary-row summary-total"><span>Total</span><span>{formatIDR(total)}</span></div>
              <button type="submit" className="btn btn-solid btn-block" style={{ marginTop: 18 }}>
                Buat pesanan <Icon name="arrow" />
              </button>
            </aside>
          </form>
        </div>
      </section>
    </>
  );
}
