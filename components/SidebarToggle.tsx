'use client';

import styles from '@/components/SidebarToggle.module.css';

interface SidebarToggleProps {
  expanded: boolean;
  onClick: () => void;
  openLabel?: string;
  closeLabel?: string;
  className?: string;
}

export default function SidebarToggle({
  expanded,
  onClick,
  openLabel = 'Buka sidebar',
  closeLabel = 'Tutup sidebar',
  className = '',
}: SidebarToggleProps) {
  return (
    <button
      type="button"
      className={`${styles.toggle} ${expanded ? styles.expanded : ''} ${className}`}
      aria-label={expanded ? closeLabel : openLabel}
      aria-expanded={expanded}
      onClick={onClick}
    >
      <span />
      <span />
      <span />
    </button>
  );
}
