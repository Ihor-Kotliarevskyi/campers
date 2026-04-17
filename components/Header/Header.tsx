'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-white border-b border-[var(--gray-light)]">
      <div className="max-w-[1440px] mx-auto px-16 py-5 flex items-center justify-between">
        <Link href="/" className="no-underline">
          <span className="font-bold text-[var(--main)] text-xl">Travel</span>
          <span className="font-normal text-[var(--main)] text-xl">Trucks</span>
        </Link>

        <nav className="flex gap-10">
          <Link
            href="/"
            className={`no-underline text-base font-medium ${pathname === '/' ? 'text-[var(--main)]' : 'text-[var(--text)]'}`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`no-underline text-base font-medium ${pathname.startsWith('/catalog') ? 'text-[var(--main)]' : 'text-[var(--text)]'}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
