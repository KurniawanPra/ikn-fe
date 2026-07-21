import { redirect } from 'next/navigation';

export default function LegacyOrderDetailPage({ params }: { params: { number: string } }) {
  redirect(`/dashboard/pesanan/${encodeURIComponent(params.number)}`);
}
