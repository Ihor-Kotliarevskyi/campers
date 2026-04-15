import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon/Icon';
import { Camper } from '@/types/camper';

const FORM_LABELS: Record<string, string> = {
  alcove: 'Alcove',
  panel_van: 'Panel Van',
  integrated: 'Integrated',
  semi_integrated: 'Semi Integrated',
};

export default function CamperCard({ camper }: { camper: Camper }) {
  const { id, name, price, rating, location, description, form, engine, transmission, totalReviews, coverImage } = camper;

  return (
    <article className="flex gap-6 bg-white border border-border rounded-[20px] p-6 w-full">
      <div className="relative w-[290px] h-[310px] shrink-0 rounded-[10px] overflow-hidden">
        {coverImage && (
          <Image
            src={coverImage}
            alt={name}
            fill
            sizes="290px"
            className="object-cover"
          />
        )}
      </div>

      <div className="flex flex-col flex-1 gap-2">
        <div className="flex justify-between items-start gap-4">
          <h2 className="text-2xl font-semibold text-text-main m-0">{name}</h2>
          <span className="text-2xl font-semibold text-text-main whitespace-nowrap">€{price.toLocaleString()}</span>
        </div>

        <div className="flex items-center gap-4 flex-wrap">
          <span className="flex items-center gap-1 text-base text-text-main">
            <Icon id="star-filled" size={16} color="var(--color-accent)" />
            {rating} ({totalReviews} Reviews)
          </span>
          <span className="flex items-center gap-1 text-base text-text-main">
            <Icon id="map" size={16} color="var(--color-text-secondary)" />
            {location}
          </span>
        </div>

        {description && (
          <p className="text-base text-text-secondary mt-1 leading-relaxed line-clamp-2">{description}</p>
        )}

        <div className="flex flex-wrap gap-2 mt-1">
          <span className="inline-flex items-center gap-[6px] px-[18px] py-2 bg-bg-gray rounded-full text-sm font-medium text-text-main">
            <Icon id="gas-pump" size={18} />
            {engine.charAt(0).toUpperCase() + engine.slice(1)}
          </span>
          <span className="inline-flex items-center gap-[6px] px-[18px] py-2 bg-bg-gray rounded-full text-sm font-medium text-text-main">
            <Icon id={transmission === 'automatic' ? 'automatic' : 'manual'} size={18} />
            {transmission.charAt(0).toUpperCase() + transmission.slice(1)}
          </span>
          <span className="inline-flex items-center gap-[6px] px-[18px] py-2 bg-bg-gray rounded-full text-sm font-medium text-text-main">
            <Icon id="van" size={18} />
            {FORM_LABELS[form] ?? form}
          </span>
        </div>

        <Link
          href={`/catalog/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center justify-center mt-auto px-10 py-[14px] bg-primary text-white rounded-full text-base font-medium no-underline w-fit transition-colors hover:bg-primary-hover"
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
