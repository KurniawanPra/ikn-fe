'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import LangToggle from '@/components/LangToggle';
import CartButton from '@/components/CartButton';
import { useLang } from '@/components/LanguageProvider';
import { useAuth } from '@/components/AuthProvider';
import { navTree, t } from '@/lib/i18n';
import Icon from '@/components/Icon';
import styles from '@/components/Navbar.module.css';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null); // dropdown terbuka di mobile
  const pathname = usePathname();
  const { lang } = useLang();
  const { customer } = useAuth();

  const items = navTree[lang] || navTree.id;
  const ui = t[lang] || t.id;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
    setOpenGroup(null);
  }, [pathname]);

  return (
    <header className={`${styles.nav} ${scrolled ? styles.scrolled : ''} ${open ? styles.open : ''}`}>
      <div className={`${styles.inner} container`}>
        <Link href="/" className={styles.brand} aria-label="PT Industri Karet Nusantara">
          <Image src="/img/rubin-logo.png" alt="Rubin Logo" width={40} height={40} priority />
          <span className={styles.brandMeta}>
            <span>Industri Karet</span>
            <span>Nusantara</span>
          </span>
        </Link>

        <nav id="main-navigation" className={styles.links} aria-label="Navigasi utama">
          {items.map((item) => {
            const itemPath = item.href.split('#')[0] ?? item.href;
            const children = item.children ?? [];
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(itemPath);
            const hasChildren = children.length > 0;

            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`${styles.link} ${active ? styles.active : ''}`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                className={`${styles.itemDrop} ${openGroup === item.label ? styles.expanded : ''}`}
              >
                <Link
                  href={item.href}
                  className={`${styles.link} ${styles.linkParent} ${active ? styles.active : ''}`}
                  onClick={(e) => {
                    // Di mobile, klik pertama membuka panel alih-alih navigasi.
                    if (
                      window.matchMedia('(max-width: 900px)').matches &&
                      openGroup !== item.label
                    ) {
                      e.preventDefault();
                      setOpenGroup(item.label);
                    }
                  }}
                >
                  {item.label}
                  <Icon name="arrowDown" size={13} className={styles.caret} />
                </Link>

                <div className={styles.dropdown} role="menu">
                  <div className={styles.dropdownInner}>
                    {children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className={styles.dropLink}
                        role="menuitem"
                      >
                        <span className={styles.dropLabel}>{child.label}</span>
                        {child.desc && (
                          <span className={styles.dropDescription}>{child.desc}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}

          <div className={styles.actions}>
            <LangToggle />
            <ThemeToggle />
            <CartButton />
            <Link
              href={customer ? '/dashboard' : '/login'}
              className={styles.cta}
            >
              {customer ? customer.name.split(' ')[0] : ui.login}
            </Link>
          </div>
        </nav>

        <div className={styles.mobileActions}>
          <Link
            href={customer ? '/dashboard' : '/login'}
            className={styles.mobileLogin}
            onClick={() => setOpen(false)}
          >
            {customer ? customer.name.split(' ')[0] : ui.login}
          </Link>
          <button
            className={styles.toggle}
            aria-label={open ? 'Tutup menu' : ui.menu}
            aria-expanded={open}
            aria-controls="main-navigation"
            onClick={() => setOpen((v) => !v)}
          >
            <span />
            <span />
          </button>
        </div>
      </div>
    </header>
  );
}
