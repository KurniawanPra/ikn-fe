import Link from 'next/link';
import Icon from '@/components/Icon';
import type { IconName } from '@/lib/types';

// State kosong / tanpa hasil. Dipakai catalog, cart, orders, admin tables.
interface EmptyStateProps {
  icon?: IconName;
  title?: string;
  body?: string;
  action?: { href: string; label: string };
}

export default function EmptyState({ icon = 'drop', title, body, action }: EmptyStateProps) {
  return (
    <div className="empty">
      <div className="empty-icon">
        <Icon name={icon} size={34} strokeWidth={1.3} />
      </div>
      {title && <h3 className="h3">{title}</h3>}
      {body && <p className="empty-body">{body}</p>}
      {action && (
        <Link href={action.href} className="btn btn-line" style={{ marginTop: 18 }}>
          {action.label} <Icon name="arrow" />
        </Link>
      )}
    </div>
  );
}
