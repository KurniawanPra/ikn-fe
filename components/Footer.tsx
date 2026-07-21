import Link from 'next/link';
import Icon from '@/components/Icon';
import { nav, company, contact, locations } from '@/lib/site';

export default function Footer() {
  const year = new Date().getFullYear();
  const primaryLocation = locations[0];
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-lead">
            <span className="label label-amber">/ {company.location}</span>
            <p className="footer-headline">
              Karet hilir Nusantara,<br />diproses untuk dunia.
            </p>
            <Link href="/kontak" className="btn btn-amber">
              Mulai percakapan <Icon name="arrow" />
            </Link>
          </div>

          <div className="footer-cols">
            <div className="footer-col">
              <span className="label">Navigasi</span>
              <ul>
                {nav.map((item) => (
                  <li key={item.href}>
                    <Link href={item.href}>{item.label}</Link>
                  </li>
                ))}
              </ul>
            </div>

            <div className="footer-col">
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

            <div className="footer-col">
              <span className="label">Ikuti</span>
              <ul>
                {contact.social.map((s) => (
                  <li key={s.label}>
                    <a href={s.href} target="_blank" rel="noreferrer">
                      {s.label} <span className="footer-handle">{s.handle}</span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-base">
          <span className="footer-wordmark">IKN</span>
          <div className="footer-fine">
            <span>© {year} {company.name}</span>
            <span>Anak perusahaan {company.parent}</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
