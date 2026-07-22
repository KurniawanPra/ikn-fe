import Link from 'next/link';
import Icon from '@/components/Icon';
import { nav, company, contact, locations } from '@/lib/site';
import styles from '@/components/Footer.module.css';

export default function Footer() {
  const year = new Date().getFullYear();
  const primaryLocation = locations[0];
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div className={styles.top}>
          <div>
            <span className="label label-amber">/ {company.location}</span>
            <p className={styles.headline}>
              Karet hilir Nusantara,<br />diproses untuk dunia.
            </p>
            <Link href="/kontak" className="btn btn-amber">
              Mulai percakapan <Icon name="arrow" />
            </Link>
          </div>

          <div className={styles.columns}>
            <div className={styles.column}>
              <span className="label">Navigasi</span>
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.column}>
              <span className="label">Kontak</span>
              <ul>
                {contact.emails.map((e) => (
                  <li key={e}>
                    <a href={`mailto:${e}`}>{e}</a>
                  </li>
                ))}
                {(primaryLocation?.phone ?? []).map((p) => (
                  <li key={p}>
                    <a href={`tel:${p.replace(/\s/g, '')}`}>{p}</a>
                  </li>
                ))}
              </ul>
            </div>

            <div className={styles.column}>
              <span className="label">Ikuti</span>
              <ul>
                {contact.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.label} <span className={styles.handle}>{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className={styles.base}>
          <span className={styles.wordmark}>IKN</span>
          <div className={styles.fine}>
            <span>© {year} {company.name}</span>
            <span>Anak perusahaan {company.parent}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
