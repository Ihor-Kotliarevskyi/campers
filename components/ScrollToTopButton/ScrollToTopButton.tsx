'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/Icon/Icon';

export default function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 500);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Scroll to top"
      className="fixed bottom-8 right-8 w-14 h-14 flex items-center justify-center bg-transparent border border-[var(--gray-light)] rounded-full text-[var(--main)] cursor-pointer outline-none transition-opacity hover:opacity-70"
    >
      <Icon id="chevron-up" size={20} />
    </button>
  );
}
