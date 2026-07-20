import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Marquee from '@/components/Marquee';
import Icon from '@/components/Icon';
import HeroTitle from '@/components/HeroTitle';
import HeroSubtitle from '@/components/HeroSubtitle';
import HeroSlider from '@/components/HeroSlider';
import VideoGallery from '@/components/VideoGallery';
import { company, stats, capabilities, products, videos } from '@/lib/site';

export default function Home() {
  return (
    <>
      {/* HERO */}
      <section className="hero hero-video-section">
        {/* Slider foto sebagai latar hero */}
        <HeroSlider />

        <div className="container hero-content">
          <div className="hero-meta">
            <span className="label label-green">/ Sejak {company.since}</span>
            <span className="label">Anak usaha {company.parent}</span>
            <span className="label">{company.location}</span>
          </div>

          <HeroTitle />

          <div className="hero-foot">
            <HeroSubtitle />
            <div className="hero-actions">
              <Link href="/produk" className="btn btn-solid">
                Lihat produk <Icon name="arrow" />
              </Link>
              <Link href="/tentang" className="btn btn-line">
                Profil perusahaan
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Marquee />

      {/* STATS — baris data */}
      <section className="section-tight">
        <div className="container">
          <div className="datarow">
            {stats.map((s, i) => (
              <Reveal key={s.label} className="datacell" delay={i * 70}>
                <span className="index">{String(i + 1).padStart(2, '0')}</span>
                <div className="datacell-num">
                  {s.value}
                  <span className="datacell-unit">{s.unit}</span>
                </div>
                <p className="datacell-label">{s.label}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <hr className="rule container-rule" />

      {/* KAPABILITAS */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <span className="label label-amber">/ Kenapa IKN</span>
            <Reveal as="h2" className="h2 sec-head-title">
              Tiga hal yang membuat produk kami konsisten dari batch ke batch.
            </Reveal>
          </div>

          <div className="cap-list">
            {capabilities.map((c, i) => (
              <Reveal key={c.title} className="cap-row" delay={i * 90}>
                <span className="cap-idx index">0{i + 1}</span>
                <div className="cap-icon">
                  <Icon name={c.icon} size={30} strokeWidth={1.3} />
                </div>
                <h3 className="h3 cap-title">{c.title}</h3>
                <p className="cap-body">{c.body}</p>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PRODUK */}
      <section className="section prod-section">
        <div className="container">
          <div className="sec-head sec-head-split">
            <div>
              <span className="label label-amber">/ Lini produk</span>
              <Reveal as="h2" className="h2 sec-head-title">
                Dua produk andalan.
              </Reveal>
            </div>
            <Link href="/produk" className="link">
              Semua produk <Icon name="arrow" />
            </Link>
          </div>

          <div className="prod-preview">
            {products.map((p, i) => (
              <Reveal key={p.slug} className="prod-preview-card" delay={i * 100}>
                <div className="prod-preview-top">
                  <span className="prod-code">{p.code}</span>
                  <Icon name="drop" size={22} strokeWidth={1.3} />
                </div>
                <h3 className="prod-preview-name">{p.name}</h3>
                <span className="prod-preview-kind">{p.kind}</span>
                <p className="prod-preview-sum">{p.summary}</p>
                <Link href="/produk" className="link prod-preview-link">
                  Spesifikasi <Icon name="arrow" />
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* GALERI VIDEO */}
      <section className="section">
        <div className="container">
          <div className="sec-head">
            <span className="label label-amber">/ Galeri video</span>
            <Reveal as="h2" className="h2 sec-head-title">
              Lihat proses dan profil kami.
            </Reveal>
          </div>
          <VideoGallery videos={videos} />
        </div>
      </section>

      {/* CTA */}
      <section className="cta">
        <div className="container cta-inner">
          <span className="label label-amber">/ Mari bekerja sama</span>
          <Reveal as="h2" className="h2 cta-title">
            Punya kebutuhan produk karet? Ceritakan pada kami.
          </Reveal>
          <Link href="/kontak" className="btn btn-amber cta-btn">
            Hubungi kami <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
