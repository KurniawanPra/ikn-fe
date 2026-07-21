import Icon from '@/components/Icon';
import { AdminPageHead, DataTable, AdminCard } from '@/components/admin/AdminPage';
import { salesByMonth } from '@/lib/admin-data';
import { orders, orderStatus, paymentStatus } from '@/lib/commerce';
import { formatIDR, formatDate } from '@/lib/format';

export const metadata = { title: 'Laporan Penjualan' };

export default function AdminSalesReport() {
  // Pendapatan dihitung dari order yang sudah dibayar sampai selesai.
  const paidOrders = orders.filter((o) => ['paid'].includes(o.payment));
  const gross = paidOrders.reduce((n, o) => n + o.total, 0);
  const unitsSold = paidOrders.reduce((n, o) => n + o.items.reduce((m, i) => m + i.qty, 0), 0);
  const max = Math.max(...salesByMonth.map((m) => m.total));

  const columns = [
    { key: 'number', label: 'No. Order', render: (o) => <span className="mono">{o.number}</span> },
    { key: 'customer', label: 'Customer', render: (o) => o.customer.name },
    { key: 'date', label: 'Tanggal', render: (o) => formatDate(o.date) },
    { key: 'total', label: 'Total', align: 'right', render: (o) => formatIDR(o.total) },
    { key: 'payment', label: 'Pembayaran', render: (o) => paymentStatus[o.payment].id },
    { key: 'status', label: 'Status', render: (o) => orderStatus[o.status].id },
  ];

  return (
    <div>
      <AdminPageHead title="Laporan Penjualan" desc="Rekap transaksi dan penjualan. Ekspor CSV/PDF (mock)." action={{ label: 'Ekspor CSV', icon: 'arrowDown' }} />

      <div className="admin-stats">
        <div className="stat-card"><span className="stat-value">{formatIDR(gross)}</span><span className="stat-label">Penjualan dibayar</span></div>
        <div className="stat-card"><span className="stat-value">{paidOrders.length}</span><span className="stat-label">Order dibayar</span></div>
        <div className="stat-card"><span className="stat-value">{unitsSold}</span><span className="stat-label">Unit terjual</span></div>
        <div className="stat-card"><span className="stat-value">{orders.length}</span><span className="stat-label">Total order</span></div>
      </div>

      <div style={{ marginBottom: 22 }}>
        <AdminCard title="Tren penjualan (Rp juta)">
          <div className="bars">
            {salesByMonth.map((m) => (
              <div key={m.month} className="bar-col">
                <span className="bar-val">{m.total}</span>
                <span className="bar-fill" style={{ height: `${Math.round((m.total / max) * 100)}%` }} />
                <span className="bar-label">{m.month}</span>
              </div>
            ))}
          </div>
        </AdminCard>
      </div>

      <DataTable columns={columns} rows={orders} rowKey="number" empty="Belum ada transaksi." />
    </div>
  );
}
