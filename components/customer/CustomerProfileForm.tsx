'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Icon from '@/components/Icon';
import { useAuth } from '@/components/AuthProvider';
import { getCustomerProfile } from '@/lib/auth';

export default function CustomerProfileForm() {
  const { customer } = useAuth();
  const [saved, setSaved] = useState(false);
  if (!customer) return null;
  const profile = getCustomerProfile(customer.id);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaved(true);
    window.setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      <div className="acct-section-head"><div><h2 className="h3">Profil PIC</h2><p className="form-note">Data kontak utama untuk komunikasi pesanan.</p></div></div>
      <form className="form acct-form" onSubmit={handleSubmit}>
        <div className="co-fields">
          <label><span className="label">Nama lengkap</span><input name="name" defaultValue={profile?.name ?? customer.name} required /></label>
          <label><span className="label">Jabatan</span><input name="position" defaultValue={profile?.position ?? ''} /></label>
          <label><span className="label">Email</span><input name="email" type="email" defaultValue={profile?.email ?? customer.email} required /></label>
          <label><span className="label">Telepon</span><input name="phone" defaultValue={profile?.phone ?? ''} required /></label>
        </div>
        <button type="submit" className="btn btn-solid">{saved ? <>Tersimpan <Icon name="check" /></> : <>Simpan perubahan <Icon name="arrow" /></>}</button>
        <p className="form-note">Mode demo: perubahan belum disimpan permanen tanpa backend.</p>
      </form>
    </div>
  );
}
