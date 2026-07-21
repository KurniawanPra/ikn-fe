// ================= i18n =================
// Dua bahasa: Indonesia (id) & English (en).
// Kamus ini menampung teks "chrome" situs (navbar, dropdown, hero, footer, CTA)
// plus struktur navigasi bertingkat (mega-dropdown) yang dipakai Navbar.

import type { Lang } from '@/lib/types';

export interface NavChild {
  label: string;
  href: string;
  desc?: string;
}

export interface NavNode {
  label: string;
  href: string;
  children?: NavChild[];
}

export interface UIStrings {
  login: string;
  themeDark: string;
  themeLight: string;
  menu: string;
  heroTitle: string[];
  heroSub: string;
}

export const languages: { code: Lang; label: string; name: string }[] = [
  { code: 'id', label: 'ID', name: 'Indonesia' },
  { code: 'en', label: 'EN', name: 'English' },
];

export const defaultLang: Lang = 'id';

// Struktur navigasi dengan dropdown.
// `children` -> tampil sebagai panel hover. `desc` -> subteks kecil di dropdown.
export const navTree: Record<Lang, NavNode[]> = {
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
        { label: 'Katalog Produk', href: '/catalog', desc: 'Belanja & lihat semua produk' },
        { label: 'Resiprene 35', href: '/produk#resiprene-35', desc: 'Cyclised natural rubber' },
        { label: 'Aneka Barang Karet', href: '/produk#barang-karet', desc: 'Rubber article products' },
        { label: 'Unduhan', href: '/unduhan', desc: 'Brosur produk (PDF)' },
      ],
    },
    {
      label: 'Media',
      href: '/berita',
      children: [
        { label: 'Berita Terbaru', href: '/berita', desc: 'Kabar & rilis terkini' },
        { label: 'Galeri', href: '/galeri', desc: 'Foto & video' },
      ],
    },
    {
      label: 'Keberlanjutan',
      href: '/keberlanjutan',
      children: [
        { label: 'Lingkungan, Sosial, Tata Kelola', href: '/keberlanjutan', desc: 'Komitmen ESG kami' },
        { label: 'Sertifikat', href: '/keberlanjutan/sertifikat', desc: 'ISO 37001 & REACH' },
        { label: 'Pelanggan Kami', href: '/keberlanjutan/pelanggan', desc: 'Mitra lintas industri' },
        { label: 'REACH Compliance', href: '/keberlanjutan/reach', desc: 'Kepatuhan pasar Eropa' },
        { label: 'Whistle Blowing System', href: '/keberlanjutan/whistleblowing', desc: 'Kanal pelaporan aman' },
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
        { label: 'Product Catalog', href: '/catalog', desc: 'Shop & browse all products' },
        { label: 'Resiprene 35', href: '/produk#resiprene-35', desc: 'Cyclised natural rubber' },
        { label: 'Rubber Articles', href: '/produk#barang-karet', desc: 'Rubber article products' },
        { label: 'Downloads', href: '/unduhan', desc: 'Product brochures (PDF)' },
      ],
    },
    {
      label: 'Media',
      href: '/berita',
      children: [
        { label: 'Latest News', href: '/berita', desc: 'Recent updates & releases' },
        { label: 'Gallery', href: '/galeri', desc: 'Photos & videos' },
      ],
    },
    {
      label: 'Sustainability',
      href: '/keberlanjutan',
      children: [
        { label: 'Environment, Social, Governance', href: '/keberlanjutan', desc: 'Our ESG commitment' },
        { label: 'Certificates', href: '/keberlanjutan/sertifikat', desc: 'ISO 37001 & REACH' },
        { label: 'Our Customers', href: '/keberlanjutan/pelanggan', desc: 'Partners across industries' },
        { label: 'REACH Compliance', href: '/keberlanjutan/reach', desc: 'EU market compliance' },
        { label: 'Whistle Blowing System', href: '/keberlanjutan/whistleblowing', desc: 'Secure reporting channel' },
      ],
    },
    { label: 'Contact', href: '/kontak' },
  ],
};

// Teks UI umum.
export const t: Record<Lang, UIStrings> = {
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
