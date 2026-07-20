import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import { news } from '@/lib/site';

export const metadata = {
  title: 'Berita',
  description:
    'Kabar terbaru dari PT Industri Karet Nusantara — kegiatan, produk, dan perkembangan perusahaan.',
};

export default function Berita() {
  const [lead, ...rest] = news;

  return (
    <>
      <section className="pagehead">
        <div className="container pagehead-row">
          <div>
            <span className="label label-amber">/ 03 — Berita</span>
            <h1 className="display pagehead-title">Kabar terbaru.</h1>
          </div>
          <p className="lead">
            Ikuti kegiatan, rilis produk, dan perkembangan terkini PT Industri
            Karet Nusantara.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <Reveal className="news-lead" id="sorotan">
            <div className="news-lead-media">
              <span className="news-tag">{lead.tag}</span>
            </div>
            <div className="news-lead-body">
              <span className="news-tag">Sorotan</span>
              <time className="news-date">{lead.date}</time>
              <h2 className="news-lead-title">{lead.title}</h2>
              <p>{lead.excerpt}</p>
            </div>
          </Reveal>

          <div className="news-list" style={{ marginTop: 'clamp(40px, 6vw, 72px)' }}>
            {rest.map((item, i) => (
              <Reveal key={item.slug} className="news-row" delay={i * 80}>
                <span className="news-row-date">{item.date}</span>
                <div>
                  <h3 className="news-row-title">{item.title}</h3>
                  <p className="news-row-ex">{item.excerpt}</p>
                </div>
                <span className="news-row-tag">{item.tag}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
