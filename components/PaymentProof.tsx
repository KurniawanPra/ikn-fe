'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';

// Unggah bukti transfer (demo — hanya menampilkan nama berkas terpilih).
export default function PaymentProof({ uploaded }: { uploaded?: boolean }) {
  const [file, setFile] = useState<File | null>(null);
  const [done, setDone] = useState(Boolean(uploaded));

  if (done) {
    return (
      <div className="proof-done">
        <Icon name="check" size={18} /> Bukti transfer sudah diunggah. Menunggu verifikasi admin.
      </div>
    );
  }

  return (
    <div className="proof">
      <p className="proof-note">Unggah bukti transfer (JPG/PNG/PDF, maks. 2MB) untuk mempercepat verifikasi.</p>
      <label className="proof-drop">
        <Icon name="arrowDown" size={22} />
        <span>{file ? file.name : 'Pilih berkas bukti transfer'}</span>
        <input type="file" accept="image/*,.pdf" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </label>
      <button type="button" className="btn btn-solid btn-sm btn-block" disabled={!file} onClick={() => setDone(true)}>
        Kirim bukti <Icon name="arrow" />
      </button>
    </div>
  );
}
