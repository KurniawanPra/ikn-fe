'use client';

import { useEffect, useMemo, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react';
import StatusBadge from '@/components/StatusBadge';
import Icon from '@/components/Icon';
import {
  AdminPageHead,
  DataTable,
  RowActions,
  type Column,
} from '@/components/admin/AdminPage';
import { categories, getCategory, products as catalogProducts, stockLabels } from '@/lib/catalog';
import { formatIDR } from '@/lib/format';
import type { PriceMode, Product, StockStatus } from '@/lib/types';

type ProductStatus = 'active' | 'inactive';
type AdminProduct = Product & { status: ProductStatus };
type ModalState =
  | { type: 'add' }
  | { type: 'edit'; product: AdminProduct }
  | { type: 'detail'; product: AdminProduct }
  | { type: 'deactivate'; product: AdminProduct }
  | null;

interface ProductFormState {
  code: string;
  name: string;
  nameEn: string;
  category: string;
  kind: string;
  priceMode: PriceMode;
  price: string;
  unit: string;
  stock: string;
  stockStatus: StockStatus;
  summary: string;
  summaryEn: string;
}

const STORAGE_KEY = 'ikn_admin_products_v1';

const emptyForm: ProductFormState = {
  code: '',
  name: '',
  nameEn: '',
  category: categories[0]?.slug || '',
  kind: '',
  priceMode: 'fixed',
  price: '',
  unit: 'kg',
  stock: '0',
  stockStatus: 'in_stock',
  summary: '',
  summaryEn: '',
};

function initialProducts(): AdminProduct[] {
  return catalogProducts.map((product) => ({ ...product, status: 'active' }));
}

function formFromProduct(product: AdminProduct): ProductFormState {
  return {
    code: product.code,
    name: product.name,
    nameEn: product.nameEn,
    category: product.category,
    kind: product.kind,
    priceMode: product.priceMode,
    price: product.price === null ? '' : String(product.price),
    unit: product.unit,
    stock: String(product.stock ?? 0),
    stockStatus: product.stockStatus,
    summary: product.summary,
    summaryEn: product.summaryEn || '',
  };
}

function slugify(value: string): string {
  return value
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

function isStoredProduct(value: unknown): value is AdminProduct {
  if (!value || typeof value !== 'object') return false;
  const product = value as Partial<AdminProduct>;
  return (
    typeof product.slug === 'string' &&
    typeof product.code === 'string' &&
    typeof product.name === 'string' &&
    (product.status === 'active' || product.status === 'inactive')
  );
}

function ProductModal({
  title,
  children,
  onClose,
  size = 'large',
}: {
  title: string;
  children: ReactNode;
  onClose: () => void;
  size?: 'small' | 'large';
}) {
  function closeFromBackdrop(event: MouseEvent<HTMLDivElement>) {
    if (event.target === event.currentTarget) onClose();
  }

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') onClose();
    }
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, [onClose]);

  return (
    <div className="admin-modal-backdrop" onMouseDown={closeFromBackdrop}>
      <section
        className={`admin-modal admin-modal-${size}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="product-modal-title"
      >
        <header className="admin-modal-head">
          <h2 id="product-modal-title">{title}</h2>
          <button type="button" className="admin-modal-close" onClick={onClose} aria-label="Tutup">
            <Icon name="close" size={18} />
          </button>
        </header>
        {children}
      </section>
    </div>
  );
}

export default function ProductManager() {
  const [items, setItems] = useState<AdminProduct[]>(initialProducts);
  const [hydrated, setHydrated] = useState(false);
  const [modal, setModal] = useState<ModalState>(null);
  const [form, setForm] = useState<ProductFormState>(emptyForm);
  const [formError, setFormError] = useState('');
  const [query, setQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | ProductStatus>('all');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    try {
      const saved = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]') as unknown;
      if (Array.isArray(saved)) {
        const valid = saved.filter(isStoredProduct);
        if (valid.length > 0) setItems(valid);
      }
    } catch {
      // Data katalog bawaan tetap dipakai bila penyimpanan lokal rusak/tidak tersedia.
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [hydrated, items]);

  useEffect(() => {
    if (!notice) return;
    const timer = window.setTimeout(() => setNotice(''), 3000);
    return () => window.clearTimeout(timer);
  }, [notice]);

  const visibleItems = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return items.filter((product) => {
      const matchesStatus = statusFilter === 'all' || product.status === statusFilter;
      const matchesQuery =
        !normalizedQuery ||
        [product.code, product.name, product.nameEn, product.kind]
          .join(' ')
          .toLowerCase()
          .includes(normalizedQuery);
      return matchesStatus && matchesQuery;
    });
  }, [items, query, statusFilter]);

  function closeModal() {
    setModal(null);
    setFormError('');
  }

  function openAdd() {
    setForm(emptyForm);
    setFormError('');
    setModal({ type: 'add' });
  }

  function openEdit(product: AdminProduct) {
    setForm(formFromProduct(product));
    setFormError('');
    setModal({ type: 'edit', product });
  }

  function updateField<K extends keyof ProductFormState>(key: K, value: ProductFormState[K]) {
    setForm((current) => ({ ...current, [key]: value }));
  }

  function submitProduct(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const editing = modal?.type === 'edit' ? modal.product : null;
    const duplicateCode = items.some(
      (product) => product.code.toLowerCase() === form.code.trim().toLowerCase() && product.slug !== editing?.slug,
    );
    if (duplicateCode) {
      setFormError('Kode produk sudah digunakan. Gunakan kode lain.');
      return;
    }

    const baseSlug = slugify(form.name) || slugify(form.code) || 'produk';
    let slug = editing?.slug || baseSlug;
    if (!editing) {
      let suffix = 2;
      while (items.some((product) => product.slug === slug)) {
        slug = `${baseSlug}-${suffix}`;
        suffix += 1;
      }
    }

    const nextProduct: AdminProduct = {
      ...(editing || {
        slug,
        aliases: [],
        image: '/img/produksi-karet-1.webp',
        rating: 0,
        reviewCount: 0,
        highlights: [],
        specs: [],
        applications: [],
        solubility: [],
        status: 'active' as const,
      }),
      slug,
      code: form.code.trim().toUpperCase(),
      name: form.name.trim(),
      nameEn: form.nameEn.trim(),
      category: form.category,
      kind: form.kind.trim(),
      priceMode: form.priceMode,
      price: form.priceMode === 'fixed' ? Number(form.price) : null,
      unit: form.unit.trim(),
      stock: Math.max(0, Number(form.stock)),
      stockStatus: form.stockStatus,
      summary: form.summary.trim(),
      summaryEn: form.summaryEn.trim(),
    };

    setItems((current) =>
      editing
        ? current.map((product) => (product.slug === editing.slug ? nextProduct : product))
        : [nextProduct, ...current],
    );
    setNotice(editing ? 'Perubahan produk berhasil disimpan.' : 'Produk baru berhasil ditambahkan.');
    closeModal();
  }

  function deactivateProduct(product: AdminProduct) {
    setItems((current) =>
      current.map((item) => (item.slug === product.slug ? { ...item, status: 'inactive' } : item)),
    );
    setNotice(`${product.name} dinonaktifkan. Data tetap tersimpan.`);
    closeModal();
  }

  function activateProduct(product: AdminProduct) {
    setItems((current) =>
      current.map((item) => (item.slug === product.slug ? { ...item, status: 'active' } : item)),
    );
    setNotice(`${product.name} diaktifkan kembali.`);
  }

  const columns: Column<AdminProduct>[] = [
    { key: 'code', label: 'Kode', render: (product) => <span className="mono">{product.code}</span> },
    { key: 'name', label: 'Nama' },
    { key: 'category', label: 'Kategori', render: (product) => getCategory(product.category)?.name || '—' },
    {
      key: 'price',
      label: 'Harga',
      align: 'right',
      render: (product) =>
        product.priceMode === 'fixed' ? `${formatIDR(product.price)}/${product.unit}` : 'Penawaran',
    },
    {
      key: 'stock',
      label: 'Stok',
      render: (product) => {
        const stock = stockLabels[product.stockStatus] || stockLabels.out_of_stock;
        return <StatusBadge label={stock.id} tone={stock.tone} small />;
      },
    },
    {
      key: 'status',
      label: 'Status',
      render: (product) => (
        <StatusBadge
          label={product.status === 'active' ? 'Aktif' : 'Nonaktif'}
          tone={product.status === 'active' ? 'ok' : 'bad'}
          small
        />
      ),
    },
    {
      key: 'act',
      label: 'Aksi',
      render: (product) => (
        <RowActions
          actions={[
            { label: 'Detail', onClick: () => setModal({ type: 'detail', product }) },
            { label: 'Edit', onClick: () => openEdit(product) },
            product.status === 'active'
              ? { label: 'Nonaktifkan', tone: 'danger', onClick: () => setModal({ type: 'deactivate', product }) }
              : { label: 'Aktifkan', tone: 'success', onClick: () => activateProduct(product) },
          ]}
        />
      ),
    },
  ];

  const editingProduct = modal?.type === 'edit' ? modal.product : null;
  const showForm = modal?.type === 'add' || modal?.type === 'edit';

  return (
    <div>
      <AdminPageHead
        title="Produk"
        desc="Kelola katalog produk hilir karet tanpa menghapus riwayat data."
        action={{ label: 'Tambah produk', icon: 'plus', onClick: openAdd }}
      />

      {notice && <div className="admin-toast" role="status">{notice}</div>}

      <div className="admin-toolbar">
        <label className="admin-search">
          <span className="sr-only">Cari produk</span>
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Cari kode atau nama produk"
          />
        </label>
        <label className="admin-filter">
          <span>Status</span>
          <select
            value={statusFilter}
            onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)}
          >
            <option value="all">Semua</option>
            <option value="active">Aktif</option>
            <option value="inactive">Nonaktif</option>
          </select>
        </label>
        <span className="admin-result-count">{visibleItems.length} produk</span>
      </div>

      <DataTable columns={columns} rows={visibleItems} rowKey="slug" empty="Produk tidak ditemukan." />

      {showForm && (
        <ProductModal title={editingProduct ? 'Edit produk' : 'Tambah produk'} onClose={closeModal}>
          <form className="admin-form" onSubmit={submitProduct}>
            {formError && <p className="admin-form-error" role="alert">{formError}</p>}
            <div className="admin-form-row">
              <label>
                <span className="field-label">Kode produk</span>
                <input
                  value={form.code}
                  onChange={(event) => updateField('code', event.target.value)}
                  placeholder="Contoh: RSP-35"
                  required
                />
              </label>
              <label>
                <span className="field-label">Kategori</span>
                <select
                  value={form.category}
                  onChange={(event) => updateField('category', event.target.value)}
                  required
                >
                  {categories.map((category) => (
                    <option key={category.slug} value={category.slug}>{category.name}</option>
                  ))}
                </select>
              </label>
            </div>
            <div className="admin-form-row">
              <label>
                <span className="field-label">Nama produk</span>
                <input value={form.name} onChange={(event) => updateField('name', event.target.value)} required />
              </label>
              <label>
                <span className="field-label">Nama produk (EN)</span>
                <input value={form.nameEn} onChange={(event) => updateField('nameEn', event.target.value)} />
              </label>
            </div>
            <label>
              <span className="field-label">Jenis / material</span>
              <input value={form.kind} onChange={(event) => updateField('kind', event.target.value)} required />
            </label>
            <div className="admin-form-row admin-form-row-3">
              <label>
                <span className="field-label">Mode harga</span>
                <select
                  value={form.priceMode}
                  onChange={(event) => updateField('priceMode', event.target.value as PriceMode)}
                >
                  <option value="fixed">Harga tetap</option>
                  <option value="quote">Hubungi marketing</option>
                </select>
              </label>
              <label>
                <span className="field-label">Harga (IDR)</span>
                <input
                  type="number"
                  min="0"
                  value={form.price}
                  onChange={(event) => updateField('price', event.target.value)}
                  disabled={form.priceMode === 'quote'}
                  required={form.priceMode === 'fixed'}
                />
              </label>
              <label>
                <span className="field-label">Satuan</span>
                <input value={form.unit} onChange={(event) => updateField('unit', event.target.value)} required />
              </label>
            </div>
            <div className="admin-form-row">
              <label>
                <span className="field-label">Jumlah stok</span>
                <input
                  type="number"
                  min="0"
                  value={form.stock}
                  onChange={(event) => updateField('stock', event.target.value)}
                  required
                />
              </label>
              <label>
                <span className="field-label">Status stok</span>
                <select
                  value={form.stockStatus}
                  onChange={(event) => updateField('stockStatus', event.target.value as StockStatus)}
                >
                  <option value="in_stock">Tersedia</option>
                  <option value="made_to_order">Pre-order</option>
                  <option value="out_of_stock">Stok habis</option>
                </select>
              </label>
            </div>
            <div className="admin-form-row">
              <label>
                <span className="field-label">Ringkasan</span>
                <textarea rows={4} value={form.summary} onChange={(event) => updateField('summary', event.target.value)} required />
              </label>
              <label>
                <span className="field-label">Ringkasan (EN)</span>
                <textarea rows={4} value={form.summaryEn} onChange={(event) => updateField('summaryEn', event.target.value)} />
              </label>
            </div>
            <footer className="admin-modal-actions">
              <button type="button" className="btn btn-line btn-sm" onClick={closeModal}>Batal</button>
              <button type="submit" className="btn btn-solid btn-sm">
                <Icon name="check" size={16} /> {editingProduct ? 'Simpan perubahan' : 'Tambah produk'}
              </button>
            </footer>
          </form>
        </ProductModal>
      )}

      {modal?.type === 'detail' && (
        <ProductModal title="Detail produk" onClose={closeModal}>
          <div className="admin-product-detail">
            <div className="admin-product-detail-head">
              <div>
                <span className="mono">{modal.product.code}</span>
                <h3>{modal.product.name}</h3>
                {modal.product.nameEn && <p>{modal.product.nameEn}</p>}
              </div>
              <StatusBadge
                label={modal.product.status === 'active' ? 'Aktif' : 'Nonaktif'}
                tone={modal.product.status === 'active' ? 'ok' : 'bad'}
              />
            </div>
            <dl className="admin-product-facts">
              <div><dt>Kategori</dt><dd>{getCategory(modal.product.category)?.name || '—'}</dd></div>
              <div><dt>Jenis</dt><dd>{modal.product.kind}</dd></div>
              <div><dt>Harga</dt><dd>{modal.product.priceMode === 'fixed' ? `${formatIDR(modal.product.price)}/${modal.product.unit}` : 'Hubungi marketing'}</dd></div>
              <div><dt>Stok</dt><dd>{modal.product.stock ?? 0} {modal.product.unit}</dd></div>
              <div><dt>Status stok</dt><dd>{stockLabels[modal.product.stockStatus].id}</dd></div>
              <div><dt>Slug</dt><dd className="mono">{modal.product.slug}</dd></div>
            </dl>
            <div className="admin-product-summary">
              <h4>Ringkasan</h4>
              <p>{modal.product.summary || 'Belum ada ringkasan.'}</p>
            </div>
            <footer className="admin-modal-actions">
              <button type="button" className="btn btn-line btn-sm" onClick={closeModal}>Tutup</button>
              <button type="button" className="btn btn-solid btn-sm" onClick={() => openEdit(modal.product)}>Edit produk</button>
            </footer>
          </div>
        </ProductModal>
      )}

      {modal?.type === 'deactivate' && (
        <ProductModal title="Konfirmasi nonaktif" onClose={closeModal} size="small">
          <div className="admin-confirm">
            <div className="admin-confirm-icon"><Icon name="cancelCircle" size={24} /></div>
            <p>Nonaktifkan <strong>{modal.product.name}</strong>?</p>
            <p className="admin-confirm-note">
              Produk tidak akan tampil pada katalog aktif, tetapi seluruh data dan riwayatnya tetap tersimpan serta dapat diaktifkan kembali.
            </p>
            <footer className="admin-modal-actions">
              <button type="button" className="btn btn-line btn-sm" onClick={closeModal}>Batal</button>
              <button type="button" className="btn btn-danger btn-sm" onClick={() => deactivateProduct(modal.product)}>
                Ya, nonaktifkan
              </button>
            </footer>
          </div>
        </ProductModal>
      )}
    </div>
  );
}
