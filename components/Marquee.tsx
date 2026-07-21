import { marquee } from '@/lib/site';

export default function Marquee() {
  // Digandakan agar loop mulus.
  const items = [...marquee, ...marquee];
  return (
    <div className="marquee" aria-hidden="true">
      <div className="marquee-track">
        {items.map((word, i) => (
          <span key={i} className="marquee-item">
            {word}
            <span className="marquee-dot">◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
