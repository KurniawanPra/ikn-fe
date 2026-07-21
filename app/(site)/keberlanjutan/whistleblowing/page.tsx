'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';

export default function Whistleblowing() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="pagehead commerce-head">
        <div className="container">
          <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Keberlanjutan', href: '/keberlanjutan' }, { label: 'Whistle Blowing System' }]} />
          <span className="label label-amber">/ Whistle Blowing System</span>
          <h1 className="display pagehead-title">Laporkan dengan aman.</h1>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="contact-grid">
            <div className="contact-left">
              <div className="contact-block">
                <span className="label label-green">/ Tentang WBS</span>
                <p style={{ marginTop: 12, maxWidth: '46ch' }}>
                  Whistle Blowing System (WBS) adalah kanal pelaporan dugaan
                  pelanggaran di lingkungan PT Industri Karet Nusantara. Identitas
                  pelapor dijaga kerahasiaannya sesuai kebijakan perusahaan.
                </p>
              </div>
              <div className="contact-block">
                <span className="label label-green">/ Yang dapat dilaporkan</span>
                <ul className="vm-list" style={{ marginTop: 12 }}>
                  {['Korupsi, suap, atau gratifikasi', 'Benturan kepentingan', 'Pelanggaran prosedur & keselamatan', 'Penyalahgunaan wewenang'].map((p, i) => (
                    <li key={p}><span className="index">0{i + 1}</span><span>{p}</span></li>
                  ))}
                </ul>
              </div>
              <div className="admin-note" style={{ maxWidth: '46ch' }}>
                Formulir demo — belum terhubung ke backend. Laporan resmi akan
                diproses melalui kanal aman yang dikelola perusahaan.
              </div>
            </div>

            <div className="contact-right">
              <span className="label label-amber">/ Kirim laporan</span>
              {sent ? (
                <div className="form-success" style={{ marginTop: 24 }}>
                  <div className="vm-icon"><Icon name="check" size={38} /></div>
                  <h3 className="h3">Laporan tercatat.</h3>
                  <p>Terima kasih. Laporan Anda akan ditinjau tim terkait secara rahasia.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form" style={{ marginTop: 24 }}>
                  <label>
                    <span className="label">Subjek laporan</span>
                    <input type="text" required placeholder="Ringkasan singkat" />
                  </label>
                  <label>
                    <span className="label">Kronologi</span>
                    <textarea rows={5} required placeholder="Jelaskan dugaan pelanggaran (waktu, tempat, pihak terkait)" />
                  </label>
                  <label className="wbs-anon">
                    <input type="checkbox" /> <span>Laporkan secara anonim</span>
                  </label>
                  <button type="submit" className="btn btn-solid">
                    Kirim laporan <Icon name="arrow" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
