import Image from 'next/image';
import Reveal from '@/components/Reveal';
import VideoGallery from '@/components/VideoGallery';
import { galleryItems } from '@/lib/admin-data';
import { videos } from '@/lib/site';

export const metadata = {
  title: 'Galeri',
  description: 'Galeri foto dan video fasilitas produksi PT Industri Karet Nusantara.',
};

export default function Galeri() {
  const photos = galleryItems.filter((g) => g.published && g.type === 'image');

  return (
    <>
      <section className="pagehead">
        <div className="container pagehead-row">
          <div>
            <span className="label label-amber">/ Media — Galeri</span>
            <h1 className="display pagehead-title">Dari dekat.</h1>
          </div>
          <p className="lead">
            Cuplikan fasilitas produksi, bahan baku, dan proses hilirisasi karet
            di PT Industri Karet Nusantara.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <span className="label label-green">/ Foto</span>
          <div className="gallery-grid" style={{ marginTop: 20 }}>
            {photos.map((g, i) => (
              <Reveal key={g.id} className="gallery-cell" delay={i * 70}>
                <Image src={g.src} alt={g.title} fill sizes="(max-width:900px) 50vw, 380px" style={{ objectFit: 'cover' }} />
                <span className="gallery-cap">{g.title}</span>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="section-tight" style={{ paddingTop: 0 }}>
        <div className="container">
          <span className="label label-green">/ Video</span>
          <div style={{ marginTop: 20 }}>
            <VideoGallery videos={videos} />
          </div>
        </div>
      </section>
    </>
  );
}
