import Link from 'next/link';

export default function Hero() {
  return (
    <section
      className="w-full min-h-[calc(100vh-61px)] bg-cover bg-center flex items-end p-16"
      style={{
        backgroundImage: `image-set(url('/images/hero.jpg') 1x, url('/images/hero@2x.jpg') 2x)`,
      }}
    >
      <div className="flex flex-col gap-4 max-w-[500px]">
        <h1 className="text-5xl font-semibold text-white leading-tight m-0">Campers of your dreams</h1>
        <p className="text-base text-white m-0 leading-relaxed">You can find everything you want in our catalog</p>
        <Link
          href="/catalog"
          className="inline-flex items-center justify-center px-10 py-4 bg-[var(--button)] text-white rounded-full text-base font-medium no-underline w-fit transition-colors hover:bg-[var(--button-hover)]"
        >
          View Now
        </Link>
      </div>
    </section>
  );
}
