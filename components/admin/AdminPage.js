import Icon from '@/components/Icon';

// Header standar tiap halaman admin: judul, deskripsi, dan tombol aksi opsional.
export function AdminPageHead({ title, desc, action }) {
  return (
    <div className="admin-head">
      <div>
        <h1 className="admin-title">{title}</h1>
        {desc && <p className="admin-desc">{desc}</p>}
      </div>
      {action && (
        <button type="button" className="btn btn-solid btn-sm">
          <Icon name={action.icon || 'plus'} size={16} /> {action.label}
        </button>
      )}
    </div>
  );
}

// Tabel data generik. columns: [{ key, label, render? , align? }]
export function DataTable({ columns, rows, empty = 'Belum ada data.', rowKey = 'id' }) {
  if (!rows || rows.length === 0) {
    return <div className="admin-empty">{empty}</div>;
  }
  return (
    <div className="admin-table-wrap">
      <table className="admin-table">
        <thead>
          <tr>
            {columns.map((c) => (
              <th key={c.key} style={c.align ? { textAlign: c.align } : undefined}>
                {c.label}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={row[rowKey] ?? i}>
              {columns.map((c) => (
                <td key={c.key} style={c.align ? { textAlign: c.align } : undefined}>
                  {c.render ? c.render(row, i) : row[c.key]}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Baris aksi kecil pada tabel (Detail / Edit / Hapus) — mock, non-fungsional.
export function RowActions({ actions = ['Detail', 'Edit', 'Hapus'] }) {
  return (
    <div className="row-actions">
      {actions.map((a) => (
        <button
          key={a}
          type="button"
          className={`row-act ${a === 'Hapus' ? 'row-act-danger' : ''}`}
        >
          {a}
        </button>
      ))}
    </div>
  );
}

// Kartu ringkas untuk modul konten (CMS) yang tidak berbentuk tabel.
export function AdminCard({ title, children, foot }) {
  return (
    <section className="admin-card">
      {title && <h2 className="admin-card-title">{title}</h2>}
      <div className="admin-card-body">{children}</div>
      {foot && <div className="admin-card-foot">{foot}</div>}
    </section>
  );
}
