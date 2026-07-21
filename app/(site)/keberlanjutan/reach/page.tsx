import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata = {
  title: 'REACH Compliance',
  description: 'Kepatuhan produk PT Industri Karet Nusantara terhadap regulasi REACH Uni Eropa.',
};

export default function Reach() {
  return (
    <>
      <section className="pagehead commerce-head">
        <div className="container">
          <Breadcrumb items={[{ label: 'Beranda', href: '/' }, { label: 'Keberlanjutan', href: '/keberlanjutan' }, { label: 'REACH Compliance' }]} />
          <span className="label label-amber">/ REACH Compliance</span>
          <h1 className="display pagehead-title">Aman untuk pasar Eropa.</h1>
        </div>
      </section>

      <section className="section-tight">
        <div className="container about-grid">
          <div className="about-body">
            <span className="label label-green">/ Ringkasan</span>
            <h2 className="h2" style={{ margin: '16px 0 22px', maxWidth: '18ch' }}>
              Terdaftar REACH untuk ekspor ke Uni Eropa.
            </h2>
            <p>
              REACH (Registration, Evaluation, Authorisation and Restriction of
              Chemicals) adalah regulasi Uni Eropa untuk memastikan keamanan bahan
              kimia. Produk Resiprene PT Industri Karet Nusantara telah memenuhi
              persyaratan registrasi REACH.
            </p>
            <p>
              Kepatuhan ini memperkuat posisi produk kami di pasar ekspor Eropa,
              khususnya untuk aplikasi coating dan cat marine.
            </p>
            <a href="/downloads/reach-certificate.pdf" className="btn btn-solid" target="_blank" rel="noreferrer" style={{ marginTop: 12 }}>
              Sertifikat REACH <Icon name="arrow" />
            </a>
          </div>
          <Reveal className="about-visual">
            <span className="label">/ EU REACH</span>
            <span className="about-visual-mark">REACH</span>
          </Reveal>
        </div>
      </section>
    </>
  );
}
