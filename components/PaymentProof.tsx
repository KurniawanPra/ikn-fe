'use client';

import { useState } from 'react';
import Icon from '@/components/Icon';
import styles from '@/components/PaymentProof.module.css';

// Unggah bukti transfer (demo — hanya menampilkan nama berkas terpilih).
export default function PaymentProof({
  uploaded,
  onUploaded,
}: {
  uploaded?: boolean;
  onUploaded?: () => void;
}) {
  const [file, setFile] = useState<File | null>(null);
  const [done, setDone] = useState(Boolean(uploaded));

  if (done) {
    return (
      <div className={styles.done}>
        <Icon name="check" size={18} /> Bukti transfer sudah diunggah. Menunggu verifikasi admin.
      </div>
    );
  }

  return (
    <div className={styles.proof}>
      <p className={styles.note}>Unggah bukti transfer (JPG/PNG/PDF, maks. 2MB) untuk mempercepat verifikasi.</p>
      <label className={styles.dropzone}>
        <Icon name="arrowDown" size={22} />
        <span>{file ? file.name : 'Pilih berkas bukti transfer'}</span>
        <input type="file" accept="image/*,.pdf" hidden onChange={(e) => setFile(e.target.files?.[0] || null)} />
      </label>
      <button
        type="button"
        className="btn btn-solid btn-sm btn-block"
        disabled={!file}
        onClick={() => {
          setDone(true);
          onUploaded?.();
        }}
      >
        Kirim bukti <Icon name="arrow" />
      </button>
    </div>
  );
}
