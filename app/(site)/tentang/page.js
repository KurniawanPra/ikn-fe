import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import { company, akhlak, misi, timeline } from '@/lib/site';

export const metadata = {
  title: 'Tentang',
  description:
    'Profil PT Industri Karet Nusantara — sejarah sejak 1965, visi, misi, dan nilai AKHLAK.',
};

export default function Tentang() {
  return (
    <>
      <section className="pagehead">
        <div className="container pagehead-row">
          <div>
            <span className="label label-amber">/ 01 — Tentang</span>
            <h1 className="display pagehead-title">
              Berpengalaman sejak {company.since}.
            </h1>
          </div>
          <p className="lead">
            {company.name} adalah perusahaan hilir karet yang mapan, anak
            perusahaan {company.parent}, berbasis di {company.location}.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container about-grid">
          <div className="about-body">
            <span className="label label-green">/ Profil</span>
            <h2 className="h2" style={{ margin: '16px 0 22px', maxWidth: '16ch' }}>
              Dari kebun karet Nusantara ke industri hilir.
            </h2>
            <p>
              Berdiri dan berkembang sejak {company.since}, IKN mengolah kekayaan
              karet alam Indonesia menjadi produk hilir bernilai tambah tinggi —
              mulai dari Resiprene 35 hingga beragam barang karet industri.
            </p>
            <p>
              Sebagai bagian dari {company.parent}, kami menjunjung tata kelola
              perusahaan yang baik serta terus berinovasi mengikuti kebutuhan
              pasar global.
            </p>
          </div>

          <Reveal className="about-visual">
            <span className="label">/ Est. {company.since}</span>
            <span className="about-visual-mark">IKN</span>
          </Reveal>
        </div>
      </section>

      <section className="section-tight" id="sejarah">
        <div className="container">
          <div className="sec-head">
            <span className="label label-amber">/ Perjalanan</span>
            <h2 className="h2 sec-head-title">Jejak singkat.</h2>
          </div>
          <div className="timeline">
            {timeline.map(([year, title, body], i) => (
              <Reveal key={title} className="tl-row" delay={i * 80}>
                <span className="tl-year">{year}</span>
                <div>
                  <h3 className="h3 tl-title">{title}</h3>
                  <p className="tl-body">{body}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="visi-misi">
        <div className="container">
          <div className="sec-head">
            <span className="label label-amber">/ Arah perusahaan</span>
            <h2 className="h2 sec-head-title">Visi &amp; Misi.</h2>
          </div>
          <div className="vm-grid">
            <Reveal className="vm-card">
              <span className="vm-card-tag">Visi</span>
              <p className="vm-vision">
                Menjadi perusahaan hilir karet terdepan yang memenuhi kebutuhan
                pelanggan melalui tata kelola yang kuat dan daya saing global.
              </p>
            </Reveal>
            <Reveal className="vm-card" delay={100}>
              <span className="vm-card-tag">Misi</span>
              <ol className="vm-list">
                {misi.map((m, i) => (
                  <li key={m}>
                    <span className="vm-num">{String(i + 1).padStart(2, '0')}</span>
                    <span>{m}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="section-tight" id="nilai" style={{ paddingTop: 0 }}>
        <div className="container">
          <div className="sec-head">
            <span className="label label-amber">/ Nilai inti</span>
            <h2 className="h2 sec-head-title">AKHLAK — cara kami bekerja.</h2>
          </div>
          <div className="akhlak-grid">
            {akhlak.map(([title, desc]) => (
              <Reveal key={title} className="akhlak-cell">
                <div className="akhlak-letter">{title.charAt(0)}</div>
                <h3 className="h3">{title}</h3>
                <p>{desc}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
