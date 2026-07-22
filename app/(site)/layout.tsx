import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import '@/app/pages.css';
import '@/components/commerce.css';

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Navbar />
      <main className="site-main">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
    </>
  );
}
