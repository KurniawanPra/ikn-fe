import Reveal from '@/components/Reveal';
import Breadcrumb from '@/components/Breadcrumb';
import { customerLogos } from '@/lib/admin-data';

export const metadata = {
  title: 'Pelanggan Kami',
  description: 'Mitra dan pelanggan PT Industri Karet Nusantara di dalam dan luar negeri.',
};

export default function Pelanggan() {
  return (
    <>
      <section className="pagehead commerce-head">
        <div className="container">
          <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Keberlanjutan', href: '/keberlanjutan' }, { label: 'Pelanggan' }]} />
          <span className="label label-amber">/ Pelanggan Kami</span>
          <h1 className="display pagehead-title">Dipercaya lintas industri.</h1>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <p className="lead" style={{ maxWidth: '52ch', marginBottom: 36 }}>
            Produk Resiprene 35 dan barang karet kami digunakan oleh mitra di
            industri coating, marine, semen, dan kelapa sawit — di dalam maupun
            luar negeri.
          </p>
          <div className="logo-grid">
            {customerLogos.map((c, i) => (
              <Reveal key={c.id} className="logo-cell" delay={i * 60}>
                <span>{c.name}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
