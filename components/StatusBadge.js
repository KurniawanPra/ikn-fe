// Badge status dengan nada warna (ok/warn/info/bad). Dipakai order, payment, stok.
export default function StatusBadge({ label, tone = 'info', small = false }) {
  return (
    <span className={`badge badge-${tone} ${small ? 'badge-sm' : ''}`}>
      {label}
    </span>
  );
}
