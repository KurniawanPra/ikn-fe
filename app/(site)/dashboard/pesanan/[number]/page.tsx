import CustomerOrderDetail from '@/components/customer/CustomerOrderDetail';
import { orders } from '@/lib/commerce';

export function generateStaticParams() {
  return orders.map((order) => ({ number: order.number }));
}

export function generateMetadata({ params }: { params: { number: string } }) {
  return { title: `Pesanan ${params.number}` };
}

export default function CustomerOrderDetailPage({ params }: { params: { number: string } }) {
  return <CustomerOrderDetail number={params.number} />;
}
