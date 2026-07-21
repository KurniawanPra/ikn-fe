import StatusBadge from '@/components/StatusBadge';
import { AdminPageHead, DataTable, RowActions, type Column } from '@/components/admin/AdminPage';
import { wbsReports, wbsStatusLabels } from '@/lib/admin-data';
import { formatDate } from '@/lib/format';

export const metadata = { title: 'Whistle Blowing' };

export default function AdminWhistleblowing() {
  const columns: Column<(typeof wbsReports)[number]>[] = [
    { key: 'code', label: 'Kode', render: (w) => <span className="mono">{w.code}</span> },
    { key: 'subject', label: 'Perihal' },
    { key: 'date', label: 'Tanggal', render: (w) => formatDate(w.date) },
    { key: 'anonymous', label: 'Pelapor', render: (w) => (w.anonymous ? 'Anonim' : 'Teridentifikasi') },
    {
      key: 'status',
      label: 'Status',
      render: (w) => {
        const s = wbsStatusLabels[w.status] || wbsStatusLabels.new;
        return <StatusBadge label={s.id} tone={s.tone} small />;
      },
    },
    { key: 'act', label: 'Aksi', render: () => <RowActions actions={['Tinjau', 'Tutup']} /> },
  ];

  return (
    <div>
      <AdminPageHead title="Whistle Blowing" desc="Laporan pelanggaran — akses terbatas dan dijaga kerahasiaannya." />
      <p className="admin-note" style={{ marginBottom: 16 }}>Identitas pelapor anonim tidak boleh diungkap. Hanya tim WBS berwenang yang dapat mengakses detail.</p>
      <DataTable columns={columns} rows={wbsReports} empty="Belum ada laporan." />
    </div>
  );
}
