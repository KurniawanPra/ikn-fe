'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import ThemeToggle from '@/components/ThemeToggle';
import LangToggle from '@/components/LangToggle';
import { useLang } from '@/components/LanguageProvider';
import { navTree, t } from '@/lib/i18n';
import Icon from '@/components/Icon';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState(null); // dropdown terbuka di mobile
  const pathname = usePathname();
  const { lang } = useLang();

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
    <header className={`nav ${scrolled ? 'is-scrolled' : ''} ${open ? 'is-open' : ''}`}>
      <div className="nav-inner container">
        <Link href="/" className="nav-brand" aria-label="PT Industri Karet Nusantara">
          <Image src="/img/rubin-logo.png" alt="Rubin Logo" width={40} height={40} priority />
          <span className="nav-brand-meta">
            <span>Industri Karet</span>
            <span>Nusantara</span>
          </span>
        </Link>

        <nav className="nav-links" aria-label="Navigasi utama">
          {items.map((item) => {
            const active =
              item.href === '/'
                ? pathname === '/'
                : pathname.startsWith(item.href.split('#')[0]);
            const hasChildren = item.children && item.children.length > 0;

            if (!hasChildren) {
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  className={`nav-link ${active ? 'is-active' : ''}`}
                >
                  {item.label}
                </Link>
              );
            }

            return (
              <div
                key={item.label}
                className={`nav-item-drop ${openGroup === item.label ? 'is-open' : ''}`}
              >
                <Link
                  href={item.href}
                  className={`nav-link nav-link-parent ${active ? 'is-active' : ''}`}
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
                  <Icon name="arrowDown" size={13} className="nav-caret" />
                </Link>

                <div className="nav-dropdown" role="menu">
                  <div className="nav-dropdown-inner">
                    {item.children.map((child) => (
                      <Link
                        key={child.href}
                        href={child.href}
                        className="nav-drop-link"
                        role="menuitem"
                      >
                        <span className="nav-drop-label">{child.label}</span>
                        {child.desc && (
                          <span className="nav-drop-desc">{child.desc}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </nav>

        <div className="nav-actions">
          <LangToggle />
          <ThemeToggle />
          <Link href="/login" className="nav-cta">
            {ui.login}
          </Link>
        </div>

        <button
          className="nav-toggle"
          aria-label={ui.menu}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
        >
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
