'use client';

import { useState } from 'react';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import type { Video } from '@/lib/site';

// Galeri video YouTube. Klik thumbnail -> memuat iframe (lazy, hemat bandwidth).
function VideoCard({ video, delay }: { video: Video; delay: number }) {
  const [playing, setPlaying] = useState(false);
  const thumb = `https://i.ytimg.com/vi/${video.id}/hqdefault.jpg`;

  return (
    <Reveal className="video-card" delay={delay}>
      <div className="video-frame">
        {playing ? (
          <iframe
            src={`https://www.youtube.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            allow="accelerated-motion; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="video-thumb"
            style={{ backgroundImage: `url(${thumb})` }}
            onClick={() => setPlaying(true)}
            aria-label={`Putar: ${video.title}`}
          >
            <span className="video-play">
              <Icon name="play" size={26} strokeWidth={1.6} />
            </span>
          </button>
        )}
      </div>
      <div className="video-meta">
        <span className="video-dot" aria-hidden="true" />
        <div>
          <h3 className="video-title">{video.title}</h3>
          <p className="video-desc">{video.desc}</p>
        </div>
      </div>
    </Reveal>
  );
}

export default function VideoGallery({ videos }: { videos: Video[] }) {
  return (
    <div className="video-grid">
      {videos.map((v, i) => (
        <VideoCard key={v.id} video={v} delay={i * 100} />
      ))}
    </div>
  );
}
