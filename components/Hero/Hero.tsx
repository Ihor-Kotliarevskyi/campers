import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="w-full bg-cover bg-center min-h-[calc(100vh-72px)] flex"
      style={{
        backgroundImage: `image-set(url('/images/hero.jpg') 1x, url('/images/hero@2x.jpg') 2x)`,
      }}
    >
      <div className="max-w-[1440px] mx-auto flex-1 flex items-end pl-16 pb-[80px]">
        <div className="flex flex-col w-fit">
          <h1 className="m-0 font-semibold text-[48px] leading-[0.66667] text-[var(--inputs)]">
            Campers of your dreams
          </h1>
          <p className="mt-4 mb-0 font-semibold text-[24px] leading-[1.33333] text-[var(--inputs)]">
            You can find everything you want in our catalog
          </p>
          <Link
            href="/catalog"
            className="mt-10 inline-flex items-center justify-center bg-[var(--button)] text-white no-underline transition-colors hover:bg-[var(--button-hover)] font-medium text-base leading-[1.5] tracking-[-0.01em] rounded-[200px] w-[173px] h-[56px]"
          >
            View Now
          </Link>
        </div>
      </div>
    </section>
  );
}
