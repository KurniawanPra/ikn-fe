import Icon from '@/components/Icon';
import { AdminPageHead, AdminCard } from '@/components/admin/AdminPage';

export const metadata = { title: 'Vision & Mission' };

export default function AdminVisionMission() {
  return (
    <div>
      <AdminPageHead title="Vision & Mission" desc="Kelola visi dan misi dalam dua bahasa (ID/EN)." />

      <div className="admin-grid-2">
        <AdminCard title="Visi (Indonesia)">
          <div className="admin-form">
            <textarea rows={4} defaultValue="Menjadi perusahaan hilir karet terdepan yang memenuhi kebutuhan pelanggan melalui tata kelola yang kuat dan daya saing global." />
          </div>
        </AdminCard>
        <AdminCard title="Vision (English)">
          <div className="admin-form">
            <textarea rows={4} defaultValue="To be a leading downstream rubber industry company that fulfills customer needs through excellent corporate governance and strong global competitiveness." />
          </div>
        </AdminCard>
      </div>

      <div className="admin-grid-2">
        <AdminCard title="Misi (Indonesia)">
          <div className="admin-form">
            <textarea rows={7} defaultValue={`Memproduksi produk hilir karet bermutu tinggi.\nMembangun tata kelola perusahaan yang baik.\nMengembangkan SDM berlandaskan nilai AKHLAK.\nMembangun kemitraan strategis yang saling menguntungkan.\nMemanfaatkan dan mengembangkan teknologi.`} />
          </div>
        </AdminCard>
        <AdminCard title="Mission (English)">
          <div className="admin-form">
            <textarea rows={7} defaultValue={`Produce high-quality downstream rubber products.\nFoster sound corporate governance.\nDevelop human resources guided by AKHLAK values.\nEstablish mutually beneficial strategic partnerships.\nUtilize and develop technology in business processes.`} />
          </div>
        </AdminCard>
      </div>

      <button type="button" className="btn btn-solid btn-sm">
        Simpan perubahan <Icon name="check" size={16} />
      </button>
    </div>
  );
}
