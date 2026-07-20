'use client';

import { useEffect, useState, useCallback } from 'react';
import Icon from '@/components/Icon';

// Slider gambar latar hero — cross-fade otomatis antar foto.
const slides = [
  { src: '/img/karet-1-1-scaled.jpg', alt: 'Penyadapan getah karet alam' },
  { src: '/img/produksi-karet-1.webp', alt: 'Proses produksi hilir karet' },
  { src: '/img/pabrik-2-1.png', alt: 'Fasilitas pabrik PT IKN' },
];

const INTERVAL = 5000;

export default function HeroSlider() {
  const [active, setActive] = useState(0);

  const nextSlide = useCallback(() => {
    setActive((i) => (i + 1) % slides.length);
  }, []);

  const prevSlide = useCallback(() => {
    setActive((i) => (i - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    const id = setInterval(nextSlide, INTERVAL);
    return () => clearInterval(id);
  }, [nextSlide]);

  return (
    <div className="hero-slider">
      {slides.map((s, i) => (
        <div
          key={s.src}
          aria-hidden="true"
          className={`hero-slide ${i === active ? 'is-active' : ''}`}
          style={{ backgroundImage: `url(${s.src})` }}
        />
      ))}
      <span className="hero-video-scrim" aria-hidden="true" />
      
      <button className="hero-slider-arrow prev" onClick={prevSlide} aria-label="Sebelumnya">
        <Icon name="chevronLeft" />
      </button>
      <button className="hero-slider-arrow next" onClick={nextSlide} aria-label="Selanjutnya">
        <Icon name="chevronRight" />
      </button>

      <div className="hero-slider-dots">
        {slides.map((s, i) => (
          <button
            key={s.src}
            type="button"
            className={`hero-slider-dot ${i === active ? 'is-active' : ''}`}
            aria-label={s.alt}
            onClick={() => setActive(i)}
          />
        ))}
      </div>
    </div>
  );
}
