'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Icon from '@/components/Icon/Icon';

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="bg-[var(--inputs)] border-b border-[var(--gray-light)]">
      <div className="relative max-w-[1440px] mx-auto pl-16 h-[72px] flex items-center">
        <Link href="/" className="no-underline" aria-label="TravelTrucks home">
          <Icon id="logo" width={136} height={16} />
        </Link>

        <nav className="absolute left-1/2 -translate-x-1/2 flex gap-8">
          <Link
            href="/"
            className={`no-underline text-base font-medium ${pathname === '/' ? 'text-[var(--grey-green)]' : 'text-[var(--main)]'}`}
          >
            Home
          </Link>
          <Link
            href="/catalog"
            className={`no-underline text-base font-medium ${pathname.startsWith('/catalog') ? 'text-[var(--grey-green)]' : 'text-[var(--main)]'}`}
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
