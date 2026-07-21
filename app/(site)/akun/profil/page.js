'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  }

  return (
    <div>
      <div className="acct-section-head">
        <h2 className="h3">Profil & alamat</h2>
      </div>

      <form className="form acct-form" onSubmit={handleSubmit}>
        <div className="co-fields">
          <label><span className="label">Nama lengkap</span><input defaultValue="Andi Wijaya" /></label>
          <label><span className="label">Perusahaan</span><input defaultValue="Coating Solutions Co." /></label>
          <label><span className="label">Email</span><input type="email" defaultValue="buyer@coatingsolutions.co.id" /></label>
          <label><span className="label">Telepon</span><input defaultValue="+62 812 1111 2222" /></label>
          <label className="co-full"><span className="label">Alamat utama</span><textarea rows={3} defaultValue="Kawasan Industri Pulogadung Blok C2, Jakarta Timur 13920" /></label>
        </div>
        <button type="submit" className="btn btn-solid">
          {saved ? <>Tersimpan <Icon name="check" /></> : <>Simpan perubahan <Icon name="arrow" /></>}
        </button>
        <p className="form-note">Demo — perubahan tidak disimpan permanen tanpa backend.</p>
      </form>
    </div>
  );
}
