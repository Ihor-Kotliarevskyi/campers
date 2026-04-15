'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header style={{ background: 'var(--color-white)', borderBottom: '1px solid var(--color-border)' }}>
      <div
        style={{
          maxWidth: 1440,
          margin: '0 auto',
          padding: '20px 64px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link href="/" style={{ textDecoration: 'none' }}>
          <span style={{ fontWeight: 700, color: 'var(--color-text-main)', fontSize: 20 }}>
            Travel
          </span>
          <span style={{ fontWeight: 400, color: 'var(--color-text-main)', fontSize: 20 }}>
            Trucks
          </span>
        </Link>

        <nav style={{ display: 'flex', gap: 40 }}>
          <Link
            href="/"
            style={{
              textDecoration: 'none',
              fontSize: 16,
              fontWeight: 500,
              color: pathname === '/' ? 'var(--color-text-main)' : 'var(--color-text-secondary)',
            }}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            style={{
              textDecoration: 'none',
              fontSize: 16,
              fontWeight: 500,
              color: pathname.startsWith('/catalog') ? 'var(--color-text-main)' : 'var(--color-text-secondary)',
            }}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
