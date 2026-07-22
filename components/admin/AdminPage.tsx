import type { CSSProperties, Key, ReactNode } from 'react';
import Icon from '@/components/Icon';
import type { IconName } from '@/lib/types';

// Header standar tiap halaman admin: judul, deskripsi, dan tombol aksi opsional.
interface AdminPageHeadProps {
  title: string;
  desc?: string;
  action?: { label: string; icon?: IconName; onClick?: () => void };
}

export function AdminPageHead({ title, desc, action }: AdminPageHeadProps) {
  return (
    <div className="admin-head">
      <div>
        <h1 className="admin-title">{title}</h1>
        {desc && <p className="admin-desc">{desc}</p>}
      </div>
      {action && (
        <button type="button" className="btn btn-solid btn-sm" onClick={action.onClick}>
          <Icon name={action.icon || 'plus'} size={16} /> {action.label}
        </button>
      )}
    </div>
  );
}

// Tabel data generik. columns: [{ key, label, render?, align? }]
export interface Column<T> {
  key: string;
  label: string;
  align?: string;
  render?: (row: T, index: number) => ReactNode;
}

interface DataTableProps<T> {
  columns: Column<T>[];
  rows: T[];
  empty?: ReactNode;
  rowKey?: keyof T;
}

export function DataTable<T extends object>({
  columns,
  rows,
  empty = 'Belum ada data.',
  rowKey = 'id' as keyof T,
}: DataTableProps<T>) {
  if (!rows || rows.length === 0) {
    return <div className="admin-empty">{empty}</div>;
  }
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={c.align ? { textAlign: c.align as CSSProperties['textAlign'] } : undefined}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={(row[rowKey] as Key) ?? i}>
              {columns.map((c) => (
                <td key={c.key} style={c.align ? { textAlign: c.align as CSSProperties['textAlign'] } : undefined}>
                  {c.render
                    ? c.render(row, i)
                    : ((row as Record<string, unknown>)[c.key] as ReactNode)}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Aksi penghapusan permanen tidak disediakan. Gunakan status Nonaktif sebagai soft delete.
export interface RowAction {
  label: string;
  onClick?: () => void;
  tone?: 'default' | 'danger' | 'success';
  disabled?: boolean;
}

export function RowActions({
  actions = ['Detail', 'Edit', 'Nonaktifkan'],
}: {
  actions?: Array<string | RowAction>;
}) {
  return (
    <div className="row-actions">
      {actions.map((action) => {
        const item: RowAction = typeof action === 'string' ? { label: action } : action;
        const isDanger = item.tone === 'danger' || ['Nonaktifkan', 'Tolak'].includes(item.label);
        const isSuccess = item.tone === 'success' || item.label === 'Aktifkan';

        return (
          <button
            key={item.label}
            type="button"
            className={`row-act${isDanger ? ' row-act-danger' : ''}${isSuccess ? ' row-act-success' : ''}`}
            onClick={item.onClick}
            disabled={item.disabled}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}

// Kartu ringkas untuk modul konten (CMS) yang tidak berbentuk tabel.
interface AdminCardProps {
  title?: string;
  children: ReactNode;
  foot?: ReactNode;
  className?: string;
}

export function AdminCard({ title, children, foot, className = '' }: AdminCardProps) {
  return (
    <section className={`admin-card ${className}`.trim()}>
      {title && <h2 className="admin-card-title">{title}</h2>}
      <div className="admin-card-body">{children}</div>
      {foot && <div className="admin-card-foot">{foot}</div>}
    </section>
  );
}
