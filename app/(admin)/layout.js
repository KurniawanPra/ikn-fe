import AdminShell from '@/components/admin/AdminShell';

export const metadata = {
  title: { default: 'Admin · PT IKN', template: '%s · Admin PT IKN' },
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }) {
  return <AdminShell>{children}</AdminShell>;
}
