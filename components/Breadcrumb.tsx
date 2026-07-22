import Link from 'next/link';
import styles from '@/components/Breadcrumb.module.css';

// Breadcrumb sederhana. items: [{ label, href? }]
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items = [] }: { items?: BreadcrumbItem[] }) {
  return (
    <nav className={styles.crumb} aria-label="Breadcrumb">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className={styles.item}>
            {it.href && !last ? (
              <Link href={it.href}>{it.label}</Link>
            ) : (
              <span aria-current={last ? 'page' : undefined}>{it.label}</span>
            )}
            {!last && <span className={styles.separator}>/</span>}
          </span>
        );
      })}
    </nav>
  );
}
