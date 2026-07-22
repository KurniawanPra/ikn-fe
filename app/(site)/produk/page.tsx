import Link from 'next/link';
import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import { products } from '@/lib/catalog';

export const metadata = {
  title: 'Produk',
  description:
    'Produk hilir karet PT Industri Karet Nusantara — Resiprene 35 dan aneka barang karet industri.',
};

export default function Produk() {
  return (
    <>
      <section className="pagehead">
        <div className="container pagehead-row">
          <div>
            <span className="label label-amber">/ 02 — Produk</span>
            <h1 className="display pagehead-title">Karet hilir bernilai tambah.</h1>
          </div>
          <p className="lead">
            Dari karet alam Nusantara, kami menghadirkan produk hilir siap pakai
            untuk industri cat, otomotif, dan infrastruktur.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="prod-full">
            {products.map((p, i) => (
              <Reveal key={p.slug} id={p.slug} className="prod-item" delay={(i % 2) * 80}>
                <div className="prod-item-media">
                  <span className="prod-code">{p.code}</span>
                  <span className="prod-item-drop">
                    <Icon name="drop" size={72} strokeWidth={1} />
                  </span>
                </div>
                <div>
                  <span className="prod-item-kind">{p.kind}</span>
                  <h2 className="prod-item-name">{p.name}</h2>
                  <p className="prod-item-sum">{p.summary}</p>
                  {p.specs && p.specs.length > 0 && (
                    <div className="spec-table">
                      {p.specs.map(([key, value]) => (
                        <div key={key} className="spec-row">
                          <span className="spec-key">{key}</span>
                          <span className="spec-val">{value}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container cta-inner">
          <span className="label label-amber">/ Butuh spesifikasi teknis?</span>
          <h2 className="h2 cta-title">
            Tim kami bantu memilih grade dan formulasi yang tepat.
          </h2>
          <Link href="/kontak" className="btn btn-amber cta-btn">
            Hubungi kami <Icon name="arrow" />
          </Link>
        </div>
      </section>
    </>
  );
}
