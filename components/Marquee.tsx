import { marquee } from '@/lib/site';
import styles from '@/components/Marquee.module.css';

export default function Marquee() {
  // Digandakan agar loop mulus.
  const items = [...marquee, ...marquee];
  return (
    <div className={styles.marquee} aria-hidden="true">
      <div className={styles.track}>
        {items.map((word, i) => (
          <span key={i} className={styles.item}>
            {word}
            <span className={styles.dot}>◆</span>
          </span>
        ))}
      </div>
    </div>
  );
}
