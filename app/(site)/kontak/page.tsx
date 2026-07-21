'use client';

import { useState } from 'react';
import type { FormEvent } from 'react';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import { locations, contact } from '@/lib/site';

export default function Kontak() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="pagehead">
        <div className="container pagehead-row">
          <div>
            <span className="label label-amber">/ 04 — Kontak</span>
            <h1 className="display pagehead-title">Mari terhubung.</h1>
          </div>
          <p className="lead">
            Punya pertanyaan seputar produk, kemitraan, atau kunjungan pabrik?
            Tim kami siap membantu.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="contact-grid">
            {/* Kiri: info */}
            <div className="contact-left">
              <div className="contact-block">
                <span className="label label-green">/ Lokasi</span>
              </div>
              {locations.map((loc, i) => (
                <div key={loc.name} className="contact-block">
                  <div className="contact-loc">
                    <span className="index">0{i + 1}</span>
                    <div>
                      <h3>{loc.name}</h3>
                      <p className="contact-loc-addr">{loc.address}</p>
                      {loc.phone.length > 0 && (
                        <div className="phone-row">
                          {loc.phone.map((p) => (
                            <a key={p} href={`tel:${p.replace(/\s/g, '')}`}>
                              {p}
                            </a>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              <div className="contact-block">
                <span className="label label-green">/ Email</span>
                <ul className="link-list" style={{ marginTop: 12 }}>
                  {contact.emails.map((mail) => (
                    <li key={mail}>
                      <a href={`mailto:${mail}`}>
                        {mail}
                        <span className="handle">Email</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="contact-block">
                <span className="label label-green">/ Media sosial</span>
                <ul className="link-list" style={{ marginTop: 12 }}>
                  {contact.social.map((s) => (
                    <li key={s.label}>
                      <a href={s.href} target="_blank" rel="noreferrer">
                        {s.label}
                        <span className="handle">{s.handle}</span>
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Kanan: form */}
            <div className="contact-right">
              <span className="label label-amber">/ Kirim pesan</span>
              {sent ? (
                <div className="form-success" style={{ marginTop: 24 }}>
                  <div className="vm-icon"><Icon name="check" size={38} /></div>
                  <h3 className="h3">Terima kasih.</h3>
                  <p>
                    Pesan kamu sudah tercatat. Tim kami akan menghubungi kamu
                    secepatnya.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="form" style={{ marginTop: 24 }}>
                  <label>
                    <span className="label">Nama</span>
                    <input type="text" name="nama" required placeholder="Nama lengkap" />
                  </label>
                  <label>
                    <span className="label">Email</span>
                    <input type="email" name="email" required placeholder="nama@email.com" />
                  </label>
                  <label>
                    <span className="label">Subjek</span>
                    <input type="text" name="subjek" placeholder="Perihal pesan" />
                  </label>
                  <label>
                    <span className="label">Pesan</span>
                    <textarea name="pesan" rows={4} required placeholder="Tulis pesan kamu di sini" />
                  </label>
                  <button type="submit" className="btn btn-solid">
                    Kirim pesan <Icon name="arrow" />
                  </button>
                  <p className="form-note">
                    Formulir demo — belum terhubung ke backend.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
