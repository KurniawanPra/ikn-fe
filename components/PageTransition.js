'use client';

import { useEffect, useRef, useState } from 'react';
import { usePathname } from 'next/navigation';

// Fade out halaman lama, lalu fade in halaman baru saat rute berganti.
export default function PageTransition({ children }) {
  const pathname = usePathname();
  const [display, setDisplay] = useState(children);
  const [stage, setStage] = useState('in'); // 'in' | 'out'
  const pendingPath = useRef(pathname);

  // Rute berubah -> mulai fade out.
  useEffect(() => {
    if (pathname === pendingPath.current) return;
    pendingPath.current = pathname;
    setStage('out');
  }, [pathname]);

  // Konten baru masuk selama fade out -> simpan untuk ditampilkan setelah transisi.
  const latestChildren = useRef(children);
  latestChildren.current = children;

  const swapToNew = () => {
    setDisplay(latestChildren.current);
    // Naikkan ke atas & tampilkan konten baru pada frame berikutnya.
    window.scrollTo({ top: 0 });
    requestAnimationFrame(() => setStage('in'));
  };

  // Fallback: kalau transitionend tak terpicu (mis. reduced-motion), tetap swap.
  useEffect(() => {
    if (stage !== 'out') return;
    const t = setTimeout(swapToNew, 360);
    return () => clearTimeout(t);
  }, [stage]);

  const handleEnd = (e) => {
    if (e.target !== e.currentTarget || e.propertyName !== 'opacity') return;
    if (stage === 'out') swapToNew();
  };

  return (
    <div
      className={`page-fade ${stage === 'out' ? 'is-out' : 'is-in'}`}
      onTransitionEnd={handleEnd}
    >
      {display}
    </div>
  );
}
