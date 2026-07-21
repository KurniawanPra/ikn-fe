'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Icon from '@/components/Icon';
import { useAuth } from '@/components/AuthProvider';
import { getCustomerProfile } from '@/lib/auth';

export default function CustomerCompanyForm() {
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
      <div className="acct-section-head"><div><h2 className="h3">Profil perusahaan</h2><p className="form-note">Informasi legal dan kontak perusahaan untuk invoice.</p></div></div>
      <form className="form acct-form" onSubmit={handleSubmit}>
        <div className="co-fields">
          <label className="co-full"><span className="label">Nama perusahaan</span><input name="company" defaultValue={profile?.company ?? customer.company} required /></label>
          <label><span className="label">Email perusahaan</span><input name="companyEmail" type="email" defaultValue={profile?.companyEmail ?? customer.email} required /></label>
          <label><span className="label">Telepon perusahaan</span><input name="companyPhone" defaultValue={profile?.companyPhone ?? ''} /></label>
          <label className="co-full"><span className="label">NPWP</span><input name="taxId" defaultValue={profile?.taxId ?? ''} /></label>
        </div>
        <button type="submit" className="btn btn-solid">{saved ? <>Tersimpan <Icon name="check" /></> : <>Simpan perusahaan <Icon name="arrow" /></>}</button>
        <p className="form-note">Mode demo: perubahan belum disimpan permanen tanpa backend.</p>
      </form>
    </div>
  );
}
