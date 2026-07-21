import Link from 'next/link';

// Breadcrumb sederhana. items: [{ label, href? }]
export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items = [] }: { items?: BreadcrumbItem[] }) {
  return (
    <nav className="crumb" aria-label="Breadcrumb">
      {items.map((it, i) => {
        const last = i === items.length - 1;
        return (
          <span key={i} className="crumb-item">
            {it.href && !last ? (
              <Link href={it.href}>{it.label}</Link>
            ) : (
              <span aria-current={last ? 'page' : undefined}>{it.label}</span>
            )}
            {!last && <span className="crumb-sep">/</span>}
          </span>
        );
      })}
    </nav>
  );
}
