'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/components/Icon';
import { useAuth } from '@/components/AuthProvider';
import { customerCredentials } from '@/lib/auth';

export default function Login() {
  const router = useRouter();
  const params = useSearchParams();
  const { loginCustomer } = useAuth();
  const [error, setError] = useState('');
  const [show, setShow] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '');
    const password = String(form.get('password') || '');

    const acc = loginCustomer(email, password);
    if (!acc) {
      setError('Email atau kata sandi salah. Coba kredensial demo di bawah.');
      return;
    }
    const next = params.get('next');
    router.push(next && next.startsWith('/') ? next : '/akun');
  }

  const demo = customerCredentials[0];

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
            <form onSubmit={handleSubmit} className="form">
              {error && (
                <p className="form-error" role="alert">
                  <Icon name="close" size={16} /> {error}
                </p>
              )}
              <label>
                <span className="label">Email</span>
                <input
                  type="email"
                  name="email"
                  required
                  autoComplete="email"
                  placeholder="nama@email.com"
                  defaultValue={demo.email}
                />
              </label>
              <label>
                <span className="label">Kata sandi</span>
                <span className="input-wrap">
                  <input
                    type={show ? 'text' : 'password'}
                    name="password"
                    required
                    autoComplete="current-password"
                    placeholder="••••••••"
                    defaultValue="password"
                  />
                  <button
                    type="button"
                    className="input-reveal"
                    onClick={() => setShow((v) => !v)}
                    aria-label={show ? 'Sembunyikan kata sandi' : 'Lihat kata sandi'}
                  >
                    {show ? 'Sembunyikan' : 'Lihat'}
                  </button>
                </span>
              </label>
              <button type="submit" className="btn btn-solid">
                Masuk <Icon name="arrow" />
              </button>

              <div className="auth-demo">
                <span className="label">Akun demo customer</span>
                <ul>
                  {customerCredentials.map((c) => (
                    <li key={c.email}>
                      <code>{c.email}</code> · <code>password</code> — {c.company}
                    </li>
                  ))}
                </ul>
              </div>

              <p className="form-note">
                Belum punya akun?{' '}
                <Link href="/kontak" className="auth-link">
                  Hubungi tim kami
                </Link>
                . Login demo — sesi disimpan di browser, belum terhubung backend.
              </p>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
