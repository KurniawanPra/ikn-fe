import Reveal from '@/components/Reveal';
import Icon from '@/components/Icon';
import { company, sustainability } from '@/lib/site';

export const metadata = {
  title: 'Keberlanjutan',
  description:
    'Komitmen keberlanjutan PT Industri Karet Nusantara — lingkungan, sosial, dan tata kelola.',
};

export default function Keberlanjutan() {
  return (
    <>
      <section className="pagehead">
        <div className="container pagehead-row">
          <div>
            <span className="label label-amber">/ 05 — Keberlanjutan</span>
            <h1 className="display pagehead-title">Tumbuh bertanggung jawab.</h1>
          </div>
          <p className="lead">
            {company.name} mengelola karet Nusantara dengan memperhatikan
            keseimbangan lingkungan, sosial, dan tata kelola yang baik.
          </p>
        </div>
      </section>

      <section className="section-tight">
        <div className="container">
          <div className="sustain-grid">
            {sustainability.map((s, i) => (
              <Reveal key={s.id} id={s.id} className="vm-card" delay={i * 90}>
                <div className="vm-icon">
                  <Icon name={s.icon} size={34} strokeWidth={1.3} />
                </div>
                <h3 className="h3">{s.title}</h3>
                <p style={{ marginBottom: 18 }}>{s.body}</p>
                <ul className="vm-list">
                  {s.points.map((p, j) => (
                    <li key={p}>
                      <span className="index">0{j + 1}</span>
                      <span>{p}</span>
                    </li>
                  ))}
                </ul>
              </Reveal>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
