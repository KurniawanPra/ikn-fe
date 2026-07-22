import type { Tone } from '@/lib/types';
import styles from '@/components/StatusBadge.module.css';

// Badge status dengan nada warna (ok/warn/info/bad). Dipakai order, payment, stok.
interface StatusBadgeProps {
  label: string;
  tone?: Tone;
  small?: boolean;
}

export default function StatusBadge({ label, tone = 'info', small = false }: StatusBadgeProps) {
  return (
    <span className={`${styles.badge} ${styles[tone]} ${small ? styles.small : ''}`}>
      {label}
    </span>
  );
}
