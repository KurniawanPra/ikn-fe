import Link from 'next/link';
import { notFound } from 'next/navigation';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';
import { newsItems, newsBySlug } from '@/lib/admin-data';
import { formatDate } from '@/lib/format';

// Isi lengkap artikel (dari arsip lama). Mock — dikelola Admin pada sistem baru.
const bodies: Record<string, string[]> = {
  'ekspor-resiprene-35-jerman-2024': [
    'Medan — Perusahaan produsen karet sintetis kembali menggelar acara syukuran dan pelepasan ekspor terakhir produk Resiprene 35 ke Jerman untuk tahun 2024. Acara yang berlangsung dengan penuh semangat ini menjadi momen refleksi atas pencapaian ekspor selama setahun terakhir sekaligus harapan baru untuk pertumbuhan yang lebih baik di tahun mendatang.',
    'Dalam acara ini, perwakilan manajemen perusahaan menyampaikan rasa syukur atas pencapaian ekspor yang lebih baik dibandingkan tahun sebelumnya. "Terima kasih, tahun ini telah menunjukkan peningkatan yang signifikan dibandingkan tahun lalu. Kami berharap tahun depan akan membawa hasil yang lebih baik lagi," ujar salah satu pimpinan perusahaan.',
    'Ekspor Resiprene 35, yang merupakan salah satu produk unggulan perusahaan, telah mengalami peningkatan permintaan, terutama dari negara tujuan utama seperti Jerman. Permintaan ini didorong oleh kebutuhan industri manufaktur di Eropa yang semakin berkembang, khususnya dalam sektor otomotif dan peralatan industri.',
    'Dengan prospek yang semakin menjanjikan, seluruh jajaran perusahaan berharap ekspor Resiprene 35 di tahun mendatang dapat mencatatkan pertumbuhan lebih tinggi.',
  ],
  'chemical-indonesia-2024': [
    'Jakarta — PT IKN turut serta dalam ajang Chemical Indonesia 2024, sebuah pameran bisnis-ke-bisnis (B2B) terkemuka yang berlangsung di JIExpo Kemayoran, Jakarta, dari 30 Juli hingga 1 Agustus 2024.',
    'Acara ini menjadi platform strategis bagi perusahaan-perusahaan di industri kimia, petrokimia, dan pengolahan untuk memamerkan inovasi, menjalin kemitraan bisnis, serta memperluas jangkauan pasar.',
    'Sebagai salah satu peserta, PT IKN menampilkan produk unggulannya termasuk Resiprene 35 dan menjajaki peluang kerja sama dengan berbagai mitra potensial dari dalam maupun luar negeri.',
  ],
  'ekspor-karet-sumut-naik': [
    'Gabungan Perusahaan Karet Indonesia Sumatera Utara (Gapkindo Sumut) menyatakan volume ekspor karet wilayah ini kembali menunjukkan peningkatan yang signifikan dengan mencatatkan sebanyak 26.042 ton pada September 2024.',
    'Sekretaris Eksekutif Gapkindo Sumut Edy Irwansyah menjelaskan volume ekspor karet tersebut meningkat jika dibandingkan bulan Agustus 2024 yang tercatat hanya 22.522 ton. "Volume ekspor karet meningkat 15,6 persen," ujarnya.',
    'Peningkatan ini didukung oleh permintaan global yang terus menguat, khususnya dari industri manufaktur dan otomotif di berbagai kawasan.',
  ],
};

export function generateStaticParams() {
  return newsItems.map((n) => ({ slug: n.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }) {
  const item = newsBySlug(params.slug);
  return { title: item ? item.title : 'Berita' };
}

export default function NewsDetail({ params }: { params: { slug: string } }) {
  const item = newsBySlug(params.slug);
  if (!item) notFound();

  const paras = bodies[item.slug] || [item.excerpt];
  const related = newsItems.filter((n) => n.slug !== item.slug).slice(0, 2);

  return (
    <>
      <section className="pagehead commerce-head">
        <div className="container">
          <Breadcrumb
            items={[
              { label: 'Beranda', href: '/' },
              { label: 'Berita', href: '/berita' },
              { label: item.title },
            ]}
          />
          <span className="label label-amber">/ {item.tag}</span>
          <h1 className="display pagehead-title" style={{ maxWidth: '22ch' }}>
            {item.title}
          </h1>
          <time className="news-date">{formatDate(item.date)}</time>
        </div>
      </section>

      <section className="section-tight">
        <div className="container article-wrap">
          <article className="article-body">
            {paras.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </article>

          <aside className="article-aside">
            <span className="label label-green">/ Berita lainnya</span>
            <div className="article-related">
              {related.map((r) => (
                <Link key={r.slug} href={`/berita/${r.slug}`} className="article-related-item">
                  <span className="news-row-tag">{r.tag}</span>
                  <h3>{r.title}</h3>
                  <time className="news-date">{formatDate(r.date)}</time>
                </Link>
              ))}
            </div>
            <Link href="/berita" className="link" style={{ marginTop: 20 }}>
              Semua berita <Icon name="arrow" />
            </Link>
          </aside>
        </div>
      </section>
    </>
  );
}
