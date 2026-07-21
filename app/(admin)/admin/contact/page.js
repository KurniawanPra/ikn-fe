import Icon from '@/components/Icon';
import { AdminPageHead, AdminCard } from '@/components/admin/AdminPage';

export const metadata = { title: 'Contact Us' };

export default function AdminContact() {
  return (
    <div>
      <AdminPageHead title="Contact Us" desc="Kelola informasi kontak dan lokasi perusahaan." />

      <div className="admin-grid-2">
        <AdminCard title="Kantor & Pabrik Barang Karet">
          <div className="admin-form">
            <label><span className="field-label">Alamat</span><textarea rows={3} defaultValue="Jl. Medan – Tanjung Morawa Km 9,5, Medan 20148, Sumatera Utara, Indonesia" /></label>
            <div className="admin-form-row">
              <label><span className="field-label">Telepon 1</span><input defaultValue="+62 61 786 7356" /></label>
              <label><span className="field-label">Telepon 2</span><input defaultValue="+62 811 648 0083" /></label>
            </div>
          </div>
        </AdminCard>

        <AdminCard title="Pabrik Resiprene">
          <div className="admin-form">
            <label><span className="field-label">Alamat</span><textarea rows={3} defaultValue="Sei Bamban Estate, Kec. Sei Bamban, Kab. Serdang Bedagai 20695, Sumatera Utara, Indonesia" /></label>
          </div>
        </AdminCard>
      </div>

      <AdminCard title="Email & lainnya">
        <div className="admin-form">
          <div className="admin-form-row">
            <label><span className="field-label">Email utama</span><input type="email" defaultValue="ikn@ptikn.com" /></label>
            <label><span className="field-label">Email alternatif</span><input type="email" defaultValue="gpihk_prpne@ikn.co.id" /></label>
          </div>
          <label><span className="field-label">Google Maps (embed URL)</span><input defaultValue="https://maps.google.com/?q=PT+Industri+Karet+Nusantara" /></label>
        </div>
        <button type="button" className="btn btn-solid btn-sm" style={{ marginTop: 16 }}>
          Simpan perubahan <Icon name="check" size={16} />
        </button>
      </AdminCard>
    </div>
  );
}
