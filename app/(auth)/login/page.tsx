'use client';

import { Suspense, useState } from 'react';
import type { FormEvent } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Icon from '@/components/Icon';
import { useAuth } from '@/components/AuthProvider';
import { adminCredentials, customerCredentials } from '@/lib/auth';
import styles from './page.module.css';

type AuthMode = 'login' | 'registration';

function AuthCard() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginAdmin, loginCustomer } = useAuth();
  const [mode, setMode] = useState<AuthMode>('login');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [requestSent, setRequestSent] = useState(false);

  function changeMode(nextMode: AuthMode) {
    setMode(nextMode);
    setError('');
    setRequestSent(false);
  }

  function handleLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError('');

    const form = new FormData(event.currentTarget);
    const email = String(form.get('email') || '');
    const password = String(form.get('password') || '');
    const account = loginAdmin(email, password) ?? loginCustomer(email, password);

    if (!account) {
      setError('Email atau kata sandi tidak sesuai.');
      return;
    }

    const requestedPath = searchParams.get('redirect') || searchParams.get('next');
    if (account.role === 'admin') {
      const destination = requestedPath?.startsWith('/admin') ? requestedPath : '/admin';
      router.replace(destination);
      return;
    }

    const destination = requestedPath && (requestedPath.startsWith('/') && !requestedPath.startsWith('//'))
      ? requestedPath
      : '/dashboard';
    router.replace(destination);
  }

  function handleRegistration(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setRequestSent(true);
  }

  const redirectParam = searchParams.get('redirect') || searchParams.get('next');

  return (
    <section className={styles.card} aria-labelledby="auth-title">
      <div className={styles.brand}>
        <Link href="/" aria-label="Kembali ke beranda PT IKN">
          <Image src="/img/rubin-logo.png" alt="PT IKN" width={48} height={48} priority />
        </Link>
        <div>
          <strong>PT Industri Karet Nusantara</strong>
          <span>Portal akun</span>
        </div>
      </div>

      <div className={styles.heading}>
        <span className={styles.eyebrow}>{mode === 'login' ? 'Akses akun' : 'Akun baru'}</span>
        <h1 id="auth-title">{mode === 'login' ? 'Login' : 'Request Registration'}</h1>
        <p>
          {mode === 'login'
            ? 'Gunakan akun Anda. Sistem akan mengarahkan admin dan customer ke dashboard masing-masing.'
            : 'Kirim data perusahaan Anda. Tim PT IKN akan meninjau permintaan dan menghubungi Anda.'}
        </p>
      </div>

      {mode === 'login' ? (
        <form className={styles.form} onSubmit={handleLogin}>
          {redirectParam && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 14px',
              background: 'var(--amber-tint)',
              border: '1px solid var(--amber)',
              borderRadius: 10,
              color: '#70451c',
              fontSize: '0.84rem',
              marginBottom: 16
            }}>
              <Icon name="shieldCheck" size={18} />
              <span>Silakan login sebagai customer untuk melanjutkan pemesanan.</span>
            </div>
          )}

          {error && <p className={styles.error} role="alert"><Icon name="close" size={16} /> {error}</p>}

          <label className={styles.field}>
            <span>Email</span>
            <input name="email" type="email" autoComplete="email" required placeholder="nama@perusahaan.com" />
          </label>

          <label className={styles.field}>
            <span>Kata sandi</span>
            <span className={styles.passwordField}>
              <input
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="current-password"
                required
                placeholder="Masukkan kata sandi"
              />
              <button type="button" onClick={() => setShowPassword((visible) => !visible)}>
                {showPassword ? 'Sembunyikan' : 'Lihat'}
              </button>
            </span>
          </label>

          <button type="submit" className={styles.primaryButton}>
            Login <Icon name="arrow" size={18} />
          </button>

          <div className={styles.demo}>
            <span>Akun demo</span>
            <code>{customerCredentials[0]?.email} · password</code>
            <code>{adminCredentials[0]?.email} · password</code>
          </div>
        </form>
      ) : requestSent ? (
        <div className={styles.success} role="status">
          <Icon name="check" size={28} />
          <h2>Permintaan terkirim</h2>
          <p>Tim PT IKN akan meninjau data registrasi Anda dan menghubungi kontak yang dicantumkan.</p>
        </div>
      ) : (
        <form className={styles.form} onSubmit={handleRegistration}>
          <label className={styles.field}>
            <span>Nama lengkap</span>
            <input name="name" type="text" autoComplete="name" required placeholder="Nama penanggung jawab" />
          </label>
          <label className={styles.field}>
            <span>Nama perusahaan</span>
            <input name="company" type="text" autoComplete="organization" required placeholder="PT Nama Perusahaan" />
          </label>
          <label className={styles.field}>
            <span>Email perusahaan</span>
            <input name="email" type="email" autoComplete="email" required placeholder="nama@perusahaan.com" />
          </label>
          <label className={styles.field}>
            <span>Nomor telepon</span>
            <input name="phone" type="tel" autoComplete="tel" required placeholder="+62" />
          </label>
          <label className={styles.field}>
            <span>Kebutuhan</span>
            <textarea name="message" rows={3} placeholder="Ceritakan kebutuhan produk atau kerja sama Anda." />
          </label>
          <button type="submit" className={styles.primaryButton}>
            Kirim permintaan <Icon name="arrow" size={18} />
          </button>
        </form>
      )}

      <p className={styles.modeSwitch}>
        {mode === 'login' ? 'Belum punya akun?' : 'Sudah punya akun?'}{' '}
        <button type="button" onClick={() => changeMode(mode === 'login' ? 'registration' : 'login')}>
          {mode === 'login' ? 'Request Registration' : 'Kembali ke Login'}
        </button>
      </p>
    </section>
  );
}

export default function LoginPage() {
  return (
    <main className={styles.page}>
      <Suspense fallback={<p className={styles.loading}>Memuat…</p>}>
        <AuthCard />
      </Suspense>
    </main>
  );
}
