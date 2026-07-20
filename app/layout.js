import './globals.css';
import './pages.css';
import '@/components/chrome.css';
import { Poppins, IBM_Plex_Mono } from 'next/font/google';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import PageTransition from '@/components/PageTransition';
import { LanguageProvider } from '@/components/LanguageProvider';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-poppins',
});

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  display: 'swap',
  variable: '--font-mono-plex',
});

export const metadata = {
  title: {
    default: 'PT Industri Karet Nusantara — Hilir Karet Berkualitas',
    template: '%s · PT IKN',
  },
  description:
    'PT Industri Karet Nusantara (PT IKN) adalah perusahaan hilir karet berpengalaman sejak 1965, memproduksi Resiprene 35 dan aneka barang karet dari Medan, Sumatera Utara.',
  keywords: ['karet', 'rubber', 'Resiprene', 'PT IKN', 'Medan', 'hilir karet'],
};

export default function RootLayout({ children }) {
  return (
    <html lang="id" className={`${poppins.variable} ${plexMono.variable}`}>
      <head>
        {/* Anti-flash: pasang tema tersimpan sebelum paint pertama */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(!t){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);var l=localStorage.getItem('lang')||'id';document.documentElement.setAttribute('lang',l);}catch(e){}})();`,
          }}
        />
      </head>
      <body>
        <LanguageProvider>
          <Navbar />
          <main>
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </LanguageProvider>
      </body>
    </html>
  );
}
