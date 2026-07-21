import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import { brochures } from '@/lib/admin-data';

export const metadata = {
  title: 'Unduhan',
  description: 'Brosur produk dan dokumen PT Industri Karet Nusantara.',
};

export default function Unduhan() {
  const items = brochures.filter((b) => b.published);
  return (
    <>
      <section className="pagehead commerce-head">
        <div className="container">
          <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Unduhan' }]} />
          <span className="label label-amber">/ Unduhan</span>
          <h1 className="display pagehead-title">Brosur & dokumen.</h1>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="download-grid">
            {items.map((b, i) => (
              <Reveal key={b.id} className="download-card" delay={i * 80}>
                <div className="download-icon"><Icon name="quote" size={30} strokeWidth={1.2} /></div>
                <div className="download-meta">
                  <h3 className="h3">{b.title}</h3>
                  <span className="download-size">PDF · {b.size}</span>
                </div>
                <span className="btn btn-line btn-sm download-cta">
                  Unduh <Icon name="arrowDown" />
                </span>
                <p className="download-note">Berkas dari arsip — dihubungkan setelah backend & storage aktif.</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
