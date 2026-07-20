'use client';

import { useState } from 'react';
import Link from 'next/link';
import Icon from '@/components/Icon';

export default function Login() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <>
      <section className="pagehead">
        <div className="container pagehead-row">
          <div>
            <span className="label label-amber">/ Akun — Login</span>
            <h1 className="display pagehead-title">Masuk ke akun.</h1>
          </div>
          <p className="lead">
            Masuk untuk mengakses portal mitra, dokumen produk, dan status
            pemesanan PT Industri Karet Nusantara.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="auth-wrap">
            {sent ? (
              <div className="form-success">
                <div className="vm-icon"><Icon name="check" size={38} /></div>
                <h3 className="h3">Berhasil masuk.</h3>
                <p>
                  Ini halaman demo — autentikasi belum terhubung ke backend.
                </p>
                <Link href="/" className="link" style={{ marginTop: 20 }}>
                  Kembali ke beranda <Icon name="arrow" />
                </Link>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="form">
                <label>
                  <span className="label">Email</span>
                  <input
                    type="email"
                    name="email"
                    required
                    placeholder="nama@email.com"
                  />
                </label>
                <label>
                  <span className="label">Kata sandi</span>
                  <input
                    type="password"
                    name="password"
                    required
                    placeholder="••••••••"
                  />
                </label>
                <button type="submit" className="btn btn-solid">
                  Masuk <Icon name="arrow" />
                </button>
                <p className="form-note">
                  Belum punya akun?{' '}
                  <Link href="/kontak" className="auth-link">
                    Hubungi tim kami
                  </Link>
                  . Formulir demo — belum terhubung ke backend.
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </>
  );
}
