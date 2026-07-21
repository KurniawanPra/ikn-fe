import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import { newsItems } from '@/lib/admin-data';
import { formatDate } from '@/lib/format';

export const metadata = {
  title: 'Berita',
  description:
    'Kabar terbaru dari PT Industri Karet Nusantara — kegiatan, produk, dan perkembangan perusahaan.',
};

export default function Berita() {
  const published = newsItems.filter((n) => n.published);
  const [lead, ...rest] = published;

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
            <Link href={`/berita/${lead.slug}`} className="news-lead-media">
              {lead.thumb && (
                <Image src={lead.thumb} alt={lead.title} fill sizes="(max-width:900px) 100vw, 600px" style={{ objectFit: 'cover' }} />
              )}
              <span className="news-tag">{lead.tag}</span>
            </Link>
            <div className="news-lead-body">
              <span className="news-tag">Sorotan</span>
              <time className="news-date">{formatDate(lead.date)}</time>
              <h2 className="news-lead-title">
                <Link href={`/berita/${lead.slug}`}>{lead.title}</Link>
              </h2>
              <p>{lead.excerpt}</p>
              <Link href={`/berita/${lead.slug}`} className="link" style={{ marginTop: 14 }}>
                Baca selengkapnya <Icon name="arrow" />
              </Link>
            </div>
          </Reveal>

          <div className="news-list" style={{ marginTop: 'clamp(40px, 6vw, 72px)' }}>
            {rest.map((item, i) => (
              <Reveal key={item.slug} className="news-row" delay={i * 80}>
                <span className="news-row-date">{formatDate(item.date)}</span>
                <div>
                  <h3 className="news-row-title">
                    <Link href={`/berita/${item.slug}`}>{item.title}</Link>
                  </h3>
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
