import Icon from '@/components/Icon';
import { AdminPageHead, AdminCard } from '@/components/admin/AdminPage';

export const metadata = { title: 'History' };

// Timeline sejarah perusahaan (mock). Editor konten singleton.
const milestones = [
  { year: '1965', text: 'PT Industri Karet Nusantara berdiri di Medan, Sumatera Utara.' },
  { year: '1980', text: 'Ekspansi lini produksi barang jadi karet untuk industri.' },
  { year: '1998', text: 'Mulai produksi Resiprene 35 sebagai resin hidrokarbon unggulan.' },
  { year: '2016', text: 'Sertifikasi ISO 37001 dan penguatan tata kelola.' },
  { year: '2024', text: 'Ekspor Resiprene 35 ke pasar Eropa, termasuk Jerman.' },
];

export default function AdminHistory() {
  return (
    <div>
      <AdminPageHead title="History" desc="Kelola tonggak sejarah perusahaan yang tampil di halaman Tentang." action={{ label: 'Tambah tonggak', icon: 'plus' }} />

      <AdminCard title="Tonggak sejarah">
        <div className="track">
          {milestones.map((m) => (
            <div key={m.year} className="admin-form-row" style={{ display: 'grid', gridTemplateColumns: '90px 1fr auto', gap: 14, alignItems: 'center', marginBottom: 12 }}>
              <input defaultValue={m.year} className="mono" />
              <input defaultValue={m.text} />
              <button type="button" className="row-act row-act-danger">Hapus</button>
            </div>
          ))}
        </div>
        <button type="button" className="btn btn-solid btn-sm" style={{ marginTop: 12 }}>
          Simpan perubahan <Icon name="check" size={16} />
        </button>
      </AdminCard>
    </div>
  );
}
