// ============================ COMMERCE (MOCK) ============================
// Status order & pembayaran (sesuai PRD §16), rekening bank, biaya tambahan,
// dan contoh order untuk halaman customer & admin. Semua data mock.

// ---- Status order ----
export const orderStatus = {
  awaiting_payment: { id: 'Menunggu Pembayaran', en: 'Awaiting Payment', tone: 'warn' },
  awaiting_verification: { id: 'Menunggu Verifikasi', en: 'Awaiting Verification', tone: 'warn' },
  processing: { id: 'Diproses', en: 'Processing', tone: 'info' },
  packing: { id: 'Dikemas', en: 'Packing', tone: 'info' },
  shipped: { id: 'Dikirim', en: 'Shipped', tone: 'info' },
  delivered: { id: 'Diterima', en: 'Delivered', tone: 'ok' },
  completed: { id: 'Selesai', en: 'Completed', tone: 'ok' },
  cancelled: { id: 'Dibatalkan', en: 'Cancelled', tone: 'bad' },
};

// ---- Status pembayaran ----
export const paymentStatus = {
  unpaid: { id: 'Belum Dibayar', en: 'Unpaid', tone: 'warn' },
  awaiting_confirmation: { id: 'Menunggu Konfirmasi', en: 'Awaiting Confirmation', tone: 'warn' },
  paid: { id: 'Dibayar', en: 'Paid', tone: 'ok' },
  rejected: { id: 'Ditolak', en: 'Rejected', tone: 'bad' },
  expired: { id: 'Kedaluwarsa', en: 'Expired', tone: 'bad' },
};

// Urutan tahap untuk stepper tracking
export const trackingSteps = [
  'awaiting_payment',
  'awaiting_verification',
  'processing',
  'packing',
  'shipped',
  'delivered',
  'completed',
];

// ---- Rekening bank tujuan (mock — dikonfigurasi Admin) ----
export const bankAccounts = [
  { id: 'bca', bank: 'Bank BCA', number: '0123456789', holder: 'PT Industri Karet Nusantara', active: true },
  { id: 'mandiri', bank: 'Bank Mandiri', number: '1060099887766', holder: 'PT Industri Karet Nusantara', active: true },
  { id: 'bni', bank: 'Bank BNI', number: '0987654321', holder: 'PT Industri Karet Nusantara', active: false },
];

// ---- Biaya tambahan (mock) ----
export const additionalFees = [
  { id: 'ship-medan', label: 'Ongkir Medan & sekitar', type: 'shipping', amount: 25000, active: true },
  { id: 'ship-sumut', label: 'Ongkir Sumatera Utara', type: 'shipping', amount: 55000, active: true },
  { id: 'ship-luar', label: 'Ongkir luar Sumatera', type: 'shipping', amount: 150000, active: true },
  { id: 'admin-fee', label: 'Biaya administrasi', type: 'admin', amount: 5000, active: true },
];

export const shippingMethods = [
  { id: 'ship-medan', label: 'Reguler Medan (1–2 hari)', amount: 25000 },
  { id: 'ship-sumut', label: 'Reguler Sumatera Utara (2–4 hari)', amount: 55000 },
  { id: 'ship-luar', label: 'Kargo luar Sumatera (4–9 hari)', amount: 150000 },
];

// ---- Contoh order (mock) untuk history & admin ----
export const orders = [
  {
    number: 'IKN-20260710-00042',
    date: '2026-07-10T09:24:00',
    customer: { name: 'Coating Solutions Co.', email: 'buyer@coatingsolutions.co.id', pic: 'Andi Wijaya' },
    items: [
      { slug: 'resiprene-35', name: 'Resiprene 35', code: 'RSP-35', qty: 100, unit: 'kg', price: 185000 },
    ],
    subtotal: 18500000,
    shipping: 150000,
    adminFee: 5000,
    total: 18655000,
    status: 'processing',
    payment: 'paid',
    bank: 'bca',
    shippingMethod: 'ship-luar',
    address: {
      label: 'Gudang Utama',
      recipient: 'Andi Wijaya',
      phone: '+62 812 1111 2222',
      line: 'Kawasan Industri Pulogadung Blok C2, Jakarta Timur 13920',
    },
    trackingNo: 'JNE-8890021',
    proofUploaded: true,
    timeline: [
      { status: 'awaiting_payment', at: '2026-07-10T09:24:00' },
      { status: 'awaiting_verification', at: '2026-07-10T14:02:00' },
      { status: 'processing', at: '2026-07-11T08:15:00' },
    ],
  },
  {
    number: 'IKN-20260712-00051',
    date: '2026-07-12T16:40:00',
    customer: { name: 'PT Maritim Warna', email: 'po@maritimwarna.com', pic: 'Sari Dewi' },
    items: [
      { slug: 'resiprene-35', name: 'Resiprene 35', code: 'RSP-35', qty: 50, unit: 'kg', price: 185000 },
    ],
    subtotal: 9250000,
    shipping: 55000,
    adminFee: 5000,
    total: 9310000,
    status: 'awaiting_verification',
    payment: 'awaiting_confirmation',
    bank: 'mandiri',
    shippingMethod: 'ship-sumut',
    address: {
      label: 'Kantor',
      recipient: 'Sari Dewi',
      phone: '+62 813 3333 4444',
      line: 'Jl. Pelabuhan No. 12, Belawan, Medan 20411',
    },
    trackingNo: null,
    proofUploaded: true,
    timeline: [
      { status: 'awaiting_payment', at: '2026-07-12T16:40:00' },
      { status: 'awaiting_verification', at: '2026-07-12T18:10:00' },
    ],
  },
  {
    number: 'IKN-20260715-00058',
    date: '2026-07-15T11:05:00',
    customer: { name: 'Coating Solutions Co.', email: 'buyer@coatingsolutions.co.id', pic: 'Andi Wijaya' },
    items: [
      { slug: 'resiprene-35', name: 'Resiprene 35', code: 'RSP-35', qty: 25, unit: 'kg', price: 185000 },
    ],
    subtotal: 4625000,
    shipping: 150000,
    adminFee: 5000,
    total: 4780000,
    status: 'awaiting_payment',
    payment: 'unpaid',
    bank: 'bca',
    shippingMethod: 'ship-luar',
    address: {
      label: 'Gudang Utama',
      recipient: 'Andi Wijaya',
      phone: '+62 812 1111 2222',
      line: 'Kawasan Industri Pulogadung Blok C2, Jakarta Timur 13920',
    },
    trackingNo: null,
    proofUploaded: false,
    dueAt: '2026-07-17T11:05:00',
    timeline: [{ status: 'awaiting_payment', at: '2026-07-15T11:05:00' }],
  },
  {
    number: 'IKN-20260628-00019',
    date: '2026-06-28T10:00:00',
    customer: { name: 'Coating Solutions Co.', email: 'buyer@coatingsolutions.co.id', pic: 'Andi Wijaya' },
    items: [
      { slug: 'resiprene-35', name: 'Resiprene 35', code: 'RSP-35', qty: 200, unit: 'kg', price: 185000 },
    ],
    subtotal: 37000000,
    shipping: 150000,
    adminFee: 5000,
    total: 37155000,
    status: 'completed',
    payment: 'paid',
    bank: 'bca',
    shippingMethod: 'ship-luar',
    address: {
      label: 'Gudang Utama',
      recipient: 'Andi Wijaya',
      phone: '+62 812 1111 2222',
      line: 'Kawasan Industri Pulogadung Blok C2, Jakarta Timur 13920',
    },
    trackingNo: 'JNE-8712004',
    proofUploaded: true,
    reviewed: true,
    timeline: [
      { status: 'awaiting_payment', at: '2026-06-28T10:00:00' },
      { status: 'awaiting_verification', at: '2026-06-28T13:00:00' },
      { status: 'processing', at: '2026-06-29T09:00:00' },
      { status: 'packing', at: '2026-06-29T15:00:00' },
      { status: 'shipped', at: '2026-06-30T10:00:00' },
      { status: 'delivered', at: '2026-07-03T14:00:00' },
      { status: 'completed', at: '2026-07-04T09:00:00' },
    ],
  },
];

export function getOrder(number: string) {
  return orders.find((o) => o.number === number) || null;
}

export function bankById(id: string) {
  return bankAccounts.find((b) => b.id === id) || null;
}

export function shippingById(id: string) {
  return shippingMethods.find((s) => s.id === id) || null;
}
