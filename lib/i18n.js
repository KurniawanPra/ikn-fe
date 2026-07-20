// ================= i18n =================
// Dua bahasa: Indonesia (id) & English (en).
// Kamus ini menampung teks "chrome" situs (navbar, dropdown, hero, footer, CTA)
// plus struktur navigasi bertingkat (mega-dropdown) yang dipakai Navbar.

export const languages = [
  { code: 'id', label: 'ID', name: 'Indonesia' },
  { code: 'en', label: 'EN', name: 'English' },
];

export const defaultLang = 'id';

// Struktur navigasi dengan dropdown.
// `children` -> tampil sebagai panel hover. `desc` -> subteks kecil di dropdown.
export const navTree = {
  id: [
    { label: 'Beranda', href: '/' },
    {
      label: 'Tentang Kami',
      href: '/tentang',
      children: [
        { label: 'Sejarah', href: '/tentang#sejarah', desc: 'Perjalanan sejak 1965' },
        { label: 'Visi & Misi', href: '/tentang#visi-misi', desc: 'Arah dan tujuan kami' },
        { label: 'Nilai AKHLAK', href: '/tentang#nilai', desc: 'Cara kami bekerja' },
        { label: 'Hubungi Kami', href: '/kontak', desc: 'Lokasi & kontak' },
      ],
    },
    {
      label: 'Bisnis',
      href: '/produk',
      children: [
        { label: 'Resiprene 35', href: '/produk#resiprene-35', desc: 'Cyclised natural rubber' },
        { label: 'Aneka Barang Karet', href: '/produk#barang-karet', desc: 'Rubber article products' },
        { label: 'Semua Produk', href: '/produk', desc: 'Lini produk lengkap' },
      ],
    },
    {
      label: 'Media',
      href: '/berita',
      children: [
        { label: 'Berita Terbaru', href: '/berita', desc: 'Kabar & rilis terkini' },
        { label: 'Sorotan', href: '/berita#sorotan', desc: 'Berita utama' },
      ],
    },
    {
      label: 'Keberlanjutan',
      href: '/keberlanjutan',
      children: [
        { label: 'Lingkungan', href: '/keberlanjutan#lingkungan', desc: 'Praktik ramah lingkungan' },
        { label: 'Sosial', href: '/keberlanjutan#sosial', desc: 'Dampak bagi masyarakat' },
        { label: 'Tata Kelola', href: '/keberlanjutan#tata-kelola', desc: 'Good corporate governance' },
      ],
    },
    { label: 'Kontak', href: '/kontak' },
  ],
  en: [
    { label: 'Home', href: '/' },
    {
      label: 'About Us',
      href: '/tentang',
      children: [
        { label: 'History', href: '/tentang#sejarah', desc: 'Our journey since 1965' },
        { label: 'Vision & Mission', href: '/tentang#visi-misi', desc: 'Our direction and goals' },
        { label: 'AKHLAK Values', href: '/tentang#nilai', desc: 'How we work' },
        { label: 'Contact Us', href: '/kontak', desc: 'Locations & contact' },
      ],
    },
    {
      label: 'Business',
      href: '/produk',
      children: [
        { label: 'Resiprene 35', href: '/produk#resiprene-35', desc: 'Cyclised natural rubber' },
        { label: 'Rubber Articles', href: '/produk#barang-karet', desc: 'Rubber article products' },
        { label: 'All Products', href: '/produk', desc: 'Full product line' },
      ],
    },
    {
      label: 'Media',
      href: '/berita',
      children: [
        { label: 'Latest News', href: '/berita', desc: 'Recent updates & releases' },
        { label: 'Highlight', href: '/berita#sorotan', desc: 'Featured story' },
      ],
    },
    {
      label: 'Sustainability',
      href: '/keberlanjutan',
      children: [
        { label: 'Environment', href: '/keberlanjutan#lingkungan', desc: 'Eco-friendly practices' },
        { label: 'Social', href: '/keberlanjutan#sosial', desc: 'Community impact' },
        { label: 'Governance', href: '/keberlanjutan#tata-kelola', desc: 'Good corporate governance' },
      ],
    },
    { label: 'Contact', href: '/kontak' },
  ],
};

// Teks UI umum.
export const t = {
  id: {
    login: 'Login',
    themeDark: 'Mode gelap',
    themeLight: 'Mode terang',
    menu: 'Menu',
    heroTitle: ['Menghadirkan', 'Produk Karet Berkualitas', 'untuk Industri Global'],
    heroSub: 'PT Industri Karet Nusantara adalah perusahaan mapan yang berspesialisasi dalam produk hilir karet.',
  },
  en: {
    login: 'Login',
    themeDark: 'Dark mode',
    themeLight: 'Light mode',
    menu: 'Menu',
    heroTitle: ['Delivering', 'Quality Rubber Products', 'for Global Industries'],
    heroSub: 'PT Industri Karet Nusantara is a well-established company specializing in downstream rubber products.',
  },
};
