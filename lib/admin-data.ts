// ============================ ADMIN DATA (MOCK) ============================
// Data contoh untuk dashboard & modul manajemen admin. Semua mock, tanpa backend.

import type {
  AdminUser,
  Brochure,
  Certificate,
  Customer,
  CustomerLogo,
  DashboardStat,
  GalleryItem,
  MenuItem,
  NewsItem,
  Role,
  SalesPoint,
  WbsReport,
  WbsStatus,
  WbsStatusLabel,
} from '@/lib/types';

export const dashboardStats: DashboardStat[] = [
  {
    key: 'orders',
    label: 'Pesanan bulan ini',
    value: '58',
    delta: '+8%',
    icon: 'orders',
    comparison: 'Naik 4 pesanan dibanding Juni',
    detail: '42 sudah dibayar · 16 masih diproses',
    href: '/admin/orders',
    actionLabel: 'Buka daftar pesanan',
    tone: 'positive',
  },
  {
    key: 'revenue',
    label: 'Penjualan bulan ini',
    value: 'Rp214 jt',
    delta: '+4,4%',
    icon: 'trendUp',
    comparison: 'Naik Rp9 jt dibanding Juni',
    detail: '86% dari target bulanan Rp250 jt',
    href: '/admin/reports/sales',
    actionLabel: 'Buka laporan penjualan',
    tone: 'positive',
  },
  {
    key: 'customers',
    label: 'Customer aktif',
    value: '24',
    delta: '+3 baru',
    icon: 'users',
    comparison: '3 customer baru bulan ini',
    detail: '21 customer lama · 3 customer baru',
    href: '/admin/customers',
    actionLabel: 'Lihat daftar customer',
    tone: 'neutral',
  },
  {
    key: 'pending',
    label: 'Perlu verifikasi',
    value: '3',
    delta: 'Perlu tindakan',
    icon: 'paymentCheck',
    comparison: '3 bukti pembayaran menunggu',
    detail: 'Waktu tunggu paling lama 2 jam',
    href: '/admin/payments',
    actionLabel: 'Periksa pembayaran',
    tone: 'attention',
  },
];

const monthLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'Mei', 'Jun', 'Jul', 'Agu', 'Sep', 'Okt', 'Nov', 'Des'];
const salesSeries: Record<number, Array<[number, number]>> = {
  2024: [[112, 31], [118, 33], [126, 35], [121, 34], [135, 38], [142, 40], [149, 41], [145, 39], [158, 43], [166, 46], [172, 47], [181, 50]],
  2025: [[154, 42], [161, 44], [169, 46], [165, 45], [178, 49], [184, 50], [192, 52], [188, 51], [199, 54], [207, 56], [218, 59], [226, 61]],
  2026: [[136, 37], [142, 39], [168, 46], [155, 42], [190, 52], [205, 54], [214, 58], [221, 60], [228, 62], [236, 64], [244, 66], [252, 68]],
};

export const salesHistory: SalesPoint[] = Object.entries(salesSeries).flatMap(([year, points]) =>
  points.map(([total, orders], monthIndex) => ({
    month: monthLabels[monthIndex] ?? `Bulan ${monthIndex + 1}`,
    monthIndex,
    year: Number(year),
    total,
    orders,
  }))
);

export const salesByMonth: SalesPoint[] = salesHistory
  .filter((point) => point.year === 2026 && point.monthIndex <= 6)
  .slice(-6);

export const customers: Customer[] = [
  {
    id: 'c1',
    name: 'Coating Solutions Co.',
    email: 'buyer@coatingsolutions.co.id',
    pic: 'Andi Wijaya',
    phone: '+62 812 1111 2222',
    company: 'Coating Solutions Co.',
    orders: 3,
    status: 'active',
    joined: '2026-01-15',
  },
  {
    id: 'c2',
    name: 'PT Maritim Warna',
    email: 'po@maritimwarna.com',
    pic: 'Sari Dewi',
    phone: '+62 813 3333 4444',
    company: 'PT Maritim Warna',
    orders: 1,
    status: 'active',
    joined: '2026-03-22',
  },
  {
    id: 'c3',
    name: 'Bangun Kimia Industri',
    email: 'procurement@bangunkimia.co.id',
    pic: 'Rudi Hartono',
    phone: '+62 811 5555 6666',
    company: 'Bangun Kimia Industri',
    orders: 0,
    status: 'inactive',
    joined: '2026-06-01',
  },
];

// Satu akun admin mengelola katalog, transaksi, konten, dan konfigurasi.
export const adminUsers: AdminUser[] = [
  {
    id: 'u1',
    name: 'Admin PT IKN',
    email: 'admin@ptikn.com',
    role: 'admin',
    active: true,
    permissions: [
      'products', 'categories', 'orders', 'payments', 'customers', 'reports',
      'content', 'news', 'gallery', 'bank', 'fees', 'menu', 'users',
    ],
  },
];

export const roleLabels: Record<Role, string> = {
  admin: 'Admin',
  customer: 'Customer',
};

export const permissionList: [string, string][] = [
  ['products', 'Produk'],
  ['categories', 'Kategori'],
  ['orders', 'Order'],
  ['payments', 'Payment'],
  ['customers', 'Customer'],
  ['reports', 'Laporan'],
  ['content', 'Konten'],
  ['news', 'Berita'],
  ['gallery', 'Galeri'],
  ['bank', 'Rekening Bank'],
  ['fees', 'Biaya Tambahan'],
  ['menu', 'Menu'],
  ['users', 'Akun Admin'],
];

// News (dari arsip lama + placeholder)
export const newsItems: NewsItem[] = [
  {
    slug: 'ekspor-resiprene-35-jerman-2024',
    title: 'Acara Syukuran & Pelepasan Ekspor Terakhir Resiprene 35 ke Jerman',
    date: '2025-02-04',
    tag: 'Ekspor',
    published: true,
    thumb: '/img/produksi-karet-1.webp',
    excerpt:
      'Perusahaan menggelar syukuran dan pelepasan ekspor terakhir Resiprene 35 ke Jerman untuk 2024, sekaligus harapan pertumbuhan di tahun mendatang.',
  },
  {
    slug: 'chemical-indonesia-2024',
    title: 'PT IKN Berpartisipasi dalam Chemical Indonesia 2024',
    date: '2025-02-04',
    tag: 'Event',
    published: true,
    thumb: '/img/pabrik-2-1.png',
    excerpt:
      'PT IKN ikut serta dalam Chemical Indonesia 2024 di JIExpo Kemayoran, Jakarta, memamerkan inovasi produk industri kimia.',
  },
  {
    slug: 'ekspor-karet-sumut-naik',
    title: 'Ekspor Karet Sumut Naik 15,6 Persen pada September 2024',
    date: '2025-02-04',
    tag: 'Industri',
    published: true,
    thumb: '/img/karet-1-1-scaled.jpg',
    excerpt:
      'Gapkindo Sumut mencatat volume ekspor karet wilayah ini naik menjadi 26.042 ton pada September 2024, didukung permintaan global.',
  },
];

export const galleryItems: GalleryItem[] = [
  { id: 'g1', title: 'Proses produksi Resiprene 35', type: 'image', src: '/img/produksi-karet-1.webp', published: true },
  { id: 'g2', title: 'Fasilitas pabrik', type: 'image', src: '/img/pabrik-2-1.png', published: true },
  { id: 'g3', title: 'Bahan baku karet alam', type: 'image', src: '/img/karet-1-1-scaled.jpg', published: true },
  { id: 'g4', title: 'Company Profile 2025', type: 'video', src: 'FGJQW6l2hrk', published: true },
  { id: 'g5', title: 'Resiprene 35 — Profil Produk', type: 'video', src: 'dC0AVuie4s0', published: true },
];

export const certificates: Certificate[] = [
  {
    id: 'iso37001',
    name: 'ISO 37001:2016',
    material: 'Anti-Bribery Management System',
    desc: 'Sistem Manajemen Anti Penyuapan.',
    published: true,
  },
  {
    id: 'reach',
    name: 'REACH Registration Certificate',
    material: 'REACH Compliance (EU)',
    desc: 'Sertifikat registrasi REACH untuk produk Resiprene.',
    file: '/downloads/reach-certificate.pdf',
    published: true,
  },
];

export const customerLogos: CustomerLogo[] = [
  { id: 'cl1', name: 'Mitra Coating Eropa' },
  { id: 'cl2', name: 'Distributor Cat Marine' },
  { id: 'cl3', name: 'Industri Semen Nasional' },
  { id: 'cl4', name: 'Pabrik Kelapa Sawit' },
];

export const brochures: Brochure[] = [
  { id: 'br-resiprene', title: 'Brosur Resiprene 35', file: 'BROSUR RESIPRENE.pdf', size: '5,5 MB', published: true },
  { id: 'br-rubber', title: 'Brosur Rubber Articles', file: 'BROSUR RUBBER.pdf', size: '3,1 MB', published: true },
];

// Manajemen Menu (parent/child)
export const menuItems: MenuItem[] = [
  { id: 'm1', label: 'Home', url: '/', parent: null, order: 1, active: true },
  { id: 'm2', label: 'About Us', url: '/tentang', parent: null, order: 2, active: true },
  { id: 'm3', label: 'History', url: '/tentang#sejarah', parent: 'm2', order: 1, active: true },
  { id: 'm4', label: 'Vision & Mission', url: '/tentang#visi-misi', parent: 'm2', order: 2, active: true },
  { id: 'm5', label: 'Business', url: '/produk', parent: null, order: 3, active: true },
  { id: 'm6', label: 'Media', url: '/berita', parent: null, order: 4, active: true },
  { id: 'm7', label: 'Sustainability', url: '/keberlanjutan', parent: null, order: 5, active: true },
];

// Whistle Blowing System — laporan (rahasia, akses terbatas)
export const wbsReports: WbsReport[] = [
  { id: 'w1', code: 'WBS-2026-003', subject: 'Dugaan konflik kepentingan pengadaan', date: '2026-07-08', status: 'review', anonymous: true },
  { id: 'w2', code: 'WBS-2026-002', subject: 'Pelanggaran prosedur keselamatan', date: '2026-06-20', status: 'closed', anonymous: false },
  { id: 'w3', code: 'WBS-2026-001', subject: 'Laporan gratifikasi', date: '2026-05-11', status: 'closed', anonymous: true },
];

export const wbsStatusLabels: Record<WbsStatus, WbsStatusLabel> = {
  new: { id: 'Baru', tone: 'warn' },
  review: { id: 'Ditinjau', tone: 'info' },
  closed: { id: 'Selesai', tone: 'ok' },
};

export function newsBySlug(slug: string) {
  return newsItems.find((n) => n.slug === slug) || null;
}
