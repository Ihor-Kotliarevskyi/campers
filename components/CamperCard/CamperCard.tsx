import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon/Icon';
import type { IconId } from '@/components/Icon/Icon';
import { Camper } from '@/types/camper';

const FORM_LABELS: Record<string, string> = {
  alcove: 'Alcove',
  panel_van: 'Panel Van',
  integrated: 'Integrated',
  semi_integrated: 'Semi Integrated',
};

export default function CamperCard({ camper }: { camper: Camper }) {
  const { id, name, price, rating, location, description, form, engine, transmission, totalReviews, coverImage } = camper;

  const badges = [
    { icon: 'gas-pump', label: engine.charAt(0).toUpperCase() + engine.slice(1) },
    { icon: transmission === 'automatic' ? 'automatic' : 'manual', label: transmission.charAt(0).toUpperCase() + transmission.slice(1) },
    { icon: 'van', label: FORM_LABELS[form] ?? form },
  ] as { icon: IconId; label: string }[];

  return (
    <article className="flex gap-6 bg-[var(--inputs)] rounded-[16px] p-6 h-[312px] w-full overflow-hidden">
      <div className="relative h-full aspect-square shrink-0 rounded-[8px] overflow-hidden">
        {coverImage && (
          <Image src={coverImage} alt={name} fill className="object-cover" />
        )}
      </div>

      <div className="flex flex-col flex-1 gap-6 min-w-0 overflow-hidden">
        <div className="flex flex-col gap-2">
          <div className="flex items-start gap-8 min-w-0">
            <h2 className="m-0 min-w-0 flex-1 truncate text-2xl font-semibold leading-[1.33333] text-[var(--main)]">
              {name}
            </h2>
            <span className="shrink-0 whitespace-nowrap text-2xl font-semibold leading-[1.33333] text-[var(--main)]">
              €{price.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-2 text-base font-normal leading-normal text-[var(--main)]">
              <Icon id="star-filled" size={16} color="var(--rating)" />
              {rating} ({totalReviews} Reviews)
            </span>
            <span className="flex items-center gap-2 text-base font-normal leading-normal text-[var(--main)]">
              <Icon id="map" size={16} color="var(--gray)" />
              {location}
            </span>
          </div>
        </div>

        <p className="m-0 truncate text-base font-normal leading-normal text-[var(--text)]">
          {description}
        </p>

        <div className="flex flex-wrap gap-2">
          {badges.map(({ icon, label }) => (
            <span
              key={icon}
              className="inline-flex items-center gap-2 h-12 px-[18px] py-3 rounded-full bg-[var(--badges)] mix-blend-multiply text-base font-medium text-[var(--main)] whitespace-nowrap"
            >
              <Icon id={icon} size={20} />
              {label}
            </span>
          ))}
        </div>

        <Link
          href={`/catalog/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center w-auto max-w-[172px] h-14 px-[60px] py-4 rounded-full bg-[var(--button)] text-base font-medium leading-normal text-white no-underline whitespace-nowrap transition-colors hover:bg-[var(--button-hover)]"
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
