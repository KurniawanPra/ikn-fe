import { trackingSteps, orderStatus } from '@/lib/commerce';
import { formatDateTime } from '@/lib/format';
import type { Order, OrderStatusKey } from '@/lib/types';

// Stepper pelacakan pesanan. Menandai tahap tercapai berdasarkan timeline.
export default function OrderTracking({ order }: { order: Order }) {
  if (order.status === 'cancelled') {
    return <div className="admin-note" style={{ background: 'rgba(178,60,50,0.12)', color: '#b23c32' }}>Pesanan dibatalkan.</div>;
  }

  const doneMap = new Map((order.timeline || []).map((t) => [t.status, t.at]));
  const currentIdx = trackingSteps.indexOf(order.status);

  return (
    <ol className="track">
      {trackingSteps.map((s, i) => {
        const reached = i <= currentIdx;
        const at = doneMap.get(s);
        return (
          <li key={s} className={`track-step ${reached ? 'is-done' : ''} ${i === currentIdx ? 'is-current' : ''}`}>
            <span className="track-dot" />
            <div className="track-body">
              <span className="track-label">{orderStatus[s].id}</span>
              {at && <span className="track-at">{formatDateTime(at)}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
