import './globals.css';
import './shared.css';
import { LanguageProvider } from '@/components/LanguageProvider';
import { CartProvider } from '@/components/CartProvider';
import { AuthProvider } from '@/components/AuthProvider';
import { TransactionProvider } from '@/components/TransactionProvider';

export const metadata = {
  metadataBase: new URL('https://ikn.co.id'),
  title: {
    default: 'PT Industri Karet Nusantara — Hilir Karet Berkualitas',
    template: '%s · PT IKN',
  },
  description:
    'PT Industri Karet Nusantara (PT IKN) adalah perusahaan hilir karet berpengalaman sejak 1965, memproduksi Resiprene 35 dan aneka barang karet dari Medan, Sumatera Utara.',
  keywords: ['karet', 'rubber', 'Resiprene', 'PT IKN', 'Medan', 'hilir karet'],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
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
          <AuthProvider>
            <TransactionProvider>
              <CartProvider>{children}</CartProvider>
            </TransactionProvider>
          </AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
