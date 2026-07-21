'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Icon from '@/components/Icon';
import { useAuth } from '@/components/AuthProvider';
import { getCustomerProfile } from '@/lib/auth';
import type { CustomerAddress } from '@/lib/types';

export default function CustomerAddresses() {
  const { customer } = useAuth();
  const profile = customer ? getCustomerProfile(customer.id) : null;
  const [addresses, setAddresses] = useState<CustomerAddress[]>(() => profile?.addresses ?? []);
  const [showForm, setShowForm] = useState(false);
  if (!customer) return null;

  function addAddress(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!customer) return;
    const data = new FormData(event.currentTarget);
    const isFirst = addresses.length === 0;
    setAddresses((current) => [
      ...current,
      {
        id: `address-${Date.now()}`,
        label: String(data.get('label') || 'Alamat'),
        recipient: String(data.get('recipient') || customer.name),
        phone: String(data.get('phone') || ''),
        line: String(data.get('line') || ''),
        primary: isFirst,
      },
    ]);
    event.currentTarget.reset();
    setShowForm(false);
  }

  function setPrimary(id: string) {
    setAddresses((current) => current.map((address) => ({ ...address, primary: address.id === id })));
  }

  function removeAddress(id: string) {
    setAddresses((current) => {
      const next = current.filter((address) => address.id !== id);
      if (next.length > 0 && !next.some((address) => address.primary)) {
        const first = next[0];
        return next.map((address) => ({ ...address, primary: address.id === first?.id }));
      }
      return next;
    });
  }

  return (
    <div>
      <div className="acct-section-head">
        <div><h2 className="h3">Alamat pengiriman</h2><p className="form-note">Pilih alamat utama yang digunakan saat checkout.</p></div>
        <button type="button" className="btn btn-line btn-sm" onClick={() => setShowForm((value) => !value)}><Icon name={showForm ? 'close' : 'plus'} size={17} /> {showForm ? 'Batal' : 'Tambah alamat'}</button>
      </div>

      {showForm && (
        <form className="form acct-form address-form" onSubmit={addAddress}>
          <div className="co-fields">
            <label><span className="label">Label alamat</span><input name="label" placeholder="Gudang / Kantor" required /></label>
            <label><span className="label">Nama penerima</span><input name="recipient" defaultValue={customer.name} required /></label>
            <label className="co-full"><span className="label">Telepon</span><input name="phone" required /></label>
            <label className="co-full"><span className="label">Alamat lengkap</span><textarea name="line" rows={3} required /></label>
          </div>
          <button type="submit" className="btn btn-solid">Simpan alamat <Icon name="arrow" /></button>
        </form>
      )}

      <div className="address-grid">
        {addresses.map((address) => (
          <article key={address.id} className={`address-card ${address.primary ? 'is-primary' : ''}`}>
            <div className="address-card-head"><h3>{address.label}</h3>{address.primary && <span className="badge badge-ok badge-sm">Utama</span>}</div>
            <p><strong>{address.recipient}</strong><br />{address.phone}<br />{address.line}</p>
            <div className="address-actions">
              {!address.primary && <button type="button" className="link" onClick={() => setPrimary(address.id)}>Jadikan utama</button>}
              <button type="button" className="link address-remove" onClick={() => removeAddress(address.id)}>Hapus</button>
            </div>
          </article>
        ))}
      </div>
      {addresses.length === 0 && <p className="form-note">Belum ada alamat. Tambahkan alamat untuk mempermudah checkout.</p>}
      <p className="form-note">Mode demo: perubahan alamat akan kembali seperti semula setelah halaman dimuat ulang.</p>
    </div>
  );
}
