import { trackingSteps, orderStatus } from '@/lib/commerce';
import { formatDateTime } from '@/lib/format';
import type { Order, OrderStatusKey } from '@/lib/types';
import styles from '@/components/OrderTracking.module.css';

// Stepper pelacakan pesanan. Menandai tahap tercapai berdasarkan timeline.
export default function OrderTracking({ order }: { order: Order }) {
  if (order.status === 'cancelled') {
    return <div className={styles.cancelled}>Pesanan dibatalkan.</div>;
  }

  const doneMap = new Map((order.timeline || []).map((t) => [t.status, t.at]));
  const currentIdx = trackingSteps.indexOf(order.status);

  return (
    <ol className={styles.track}>
      {trackingSteps.map((s, i) => {
        const reached = i <= currentIdx;
        const at = doneMap.get(s);
        return (
          <li key={s} className={`${styles.step} ${reached ? styles.done : ''} ${i === currentIdx ? styles.current : ''}`}>
            <span className={styles.dot} />
            <div className={styles.body}>
              <span className={styles.label}>{orderStatus[s].id}</span>
              {at && <span className={styles.at}>{formatDateTime(at)}</span>}
            </div>
          </li>
        );
      })}
    </ol>
  );
}
