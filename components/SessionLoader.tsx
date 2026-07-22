'use client';

import Image from 'next/image';
import styles from './SessionLoader.module.css';

interface SessionLoaderProps {
  message?: string;
  portalName?: string;
}

export default function SessionLoader({
  message = 'Memuat sesi...',
  portalName,
}: SessionLoaderProps) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <div className={styles.logoWrap}>
          <Image
            src="/img/rubin-logo.png"
            alt="PT IKN"
            width={44}
            height={44}
            priority
            className={styles.logo}
          />
          <div className={styles.spinner} />
        </div>
        <div className={styles.meta}>
          <strong>PT IKN</strong>
          {portalName && <span className={styles.portal}>{portalName}</span>}
          <p className={styles.message}>{message}</p>
        </div>
      </div>
    </div>
  );
}
