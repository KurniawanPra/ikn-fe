import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import { certificates } from '@/lib/admin-data';

export const metadata = {
  title: 'Sertifikat',
  description: 'Sertifikasi dan kepatuhan PT Industri Karet Nusantara, termasuk ISO 37001:2016 dan REACH.',
};

export default function Sertifikat() {
  const items = certificates.filter((c) => c.published);
  return (
    <>
      <section className="pagehead commerce-head">
        <div className="container">
          <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Keberlanjutan', href: '/keberlanjutan' }, { label: 'Sertifikat' }]} />
          <span className="label label-amber">/ Sertifikat</span>
          <h1 className="display pagehead-title">Standar yang kami pegang.</h1>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="cert-list">
            {items.map((c, i) => (
              <Reveal key={c.id} className="cert-row" delay={i * 80}>
                <span className="index">{String(i + 1).padStart(2, '0')}</span>
                <div className="cert-body">
                  <h3 className="h3">{c.name}</h3>
                  <span className="cert-material">{c.material}</span>
                  <p>{c.desc}</p>
                </div>
                {c.file ? (
                  <a href={c.file} className="btn btn-line btn-sm" target="_blank" rel="noreferrer">
                    Lihat <Icon name="arrow" />
                  </a>
                ) : (
                  <span className="badge badge-ok">Terverifikasi</span>
                )}
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
