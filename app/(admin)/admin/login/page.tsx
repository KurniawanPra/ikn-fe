'use client';

import { Suspense, useState } from 'react';
import type { FormEvent } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import Icon from '@/components/Icon';
import { useAuth } from '@/components/AuthProvider';
import { adminCredentials } from '@/lib/auth';

function AdminLoginForm() {
  const router = useRouter();
  const params = useSearchParams();
  const { loginAdmin } = useAuth();
  const [show, setShow] = useState(false);
  const [error, setError] = useState('');

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') || '');
    const password = String(form.get('password') || '');

    const acc = loginAdmin(email, password);
    if (!acc) {
      setError('Email atau kata sandi salah.');
      return;
    }
    const next = params.get('next');
    router.push(next && next.startsWith('/admin') ? next : '/admin');
  }

  return (
    <div className="admin-auth-card">
      <div className="admin-auth-brand">
        <Image src="/img/rubin-logo.png" alt="PT IKN" width={40} height={40} />
        <div>
          <strong>PT IKN Back-office</strong>
          <span>Masuk untuk mengelola situs & transaksi</span>
        </div>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        {error && (
          <p className="form-error" role="alert">
            <Icon name="close" size={16} /> {error}
          </p>
        )}
        <div className="admin-form-row">
          <label className="field-label" htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required defaultValue="admin@ptikn.com" />
        </div>
        <div className="admin-form-row">
          <label className="field-label" htmlFor="pw">Kata sandi</label>
          <div style={{ position: 'relative' }}>
            <input id="pw" name="password" type={show ? 'text' : 'password'} required defaultValue="password" />
            <button
              type="button"
              onClick={() => setShow((v) => !v)}
              className="link"
              style={{ position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)', fontSize: '0.78rem' }}
            >
              {show ? 'Sembunyikan' : 'Lihat'}
            </button>
          </div>
        </div>
        <button type="submit" className="btn btn-solid btn-block">
          Masuk <Icon name="arrow" />
        </button>

        <div className="auth-demo">
          <span className="field-label">Akun demo admin</span>
          <ul>
            {adminCredentials.map((a) => (
              <li key={a.email}>
                <code>{a.email}</code> · <code>password</code> — Admin
              </li>
            ))}
          </ul>
        </div>
      </form>
    </div>
  );
}

export default function AdminLogin() {
  return (
    <Suspense fallback={<p className="form-note">Memuat…</p>}>
      <AdminLoginForm />
    </Suspense>
  );
}
