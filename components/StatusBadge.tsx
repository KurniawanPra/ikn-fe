import type { Tone } from '@/lib/types';

// Badge status dengan nada warna (ok/warn/info/bad). Dipakai order, payment, stok.
interface StatusBadgeProps {
  label: string;
  tone?: Tone;
  small?: boolean;
}

export default function StatusBadge({ label, tone = 'info', small = false }: StatusBadgeProps) {
  return (
    <span className={`badge badge-${tone} ${small ? 'badge-sm' : ''}`}>
      {label}
    </span>
  );
}
