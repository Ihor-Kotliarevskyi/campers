import Image from 'next/image';
import Link from 'next/link';
import Icon from '@/components/Icon/Icon';
import { Camper } from '@/types/camper';
import styles from './CamperCard.module.css';

const FORM_LABELS: Record<string, string> = {
  alcove: 'Alcove',
  panelTruck: 'Panel Van',
  fullyIntegrated: 'Integrated',
  semiIntegrated: 'Semi Integrated',
};

export default function CamperCard({ camper }: { camper: Camper }) {
  const { id, name, price, rating, location, description, form, engine, transmission, reviews, gallery } = camper;
  const mainImage = gallery?.[0]?.thumb ?? gallery?.[0]?.original ?? '';

  return (
    <article className={styles.card}>
      <div className={styles.imageWrapper}>
        {mainImage && (
          <Image
            src={mainImage}
            alt={name}
            fill
            sizes="290px"
            className={styles.image}
          />
        )}
      </div>

      <div className={styles.body}>
        <div className={styles.titleRow}>
          <h2 className={styles.name}>{name}</h2>
          <span className={styles.price}>€{price.toLocaleString()}</span>
        </div>
        <div className={styles.metaRow}>
          <span className={styles.rating}>
            <Icon id="star-filled" size={16} color="var(--color-accent)" />
            {rating}({reviews.length} Reviews)
          </span>
          <span className={styles.location}>
            <Icon id="map" size={16} color="var(--color-text-secondary)" />
            {location}
          </span>
        </div>

        <p className={styles.description}>{description}</p>

        <div className={styles.tags}>
          <span className={styles.tag}>
            <Icon id="gas-pump" size={18} />
            {engine.charAt(0).toUpperCase() + engine.slice(1)}
          </span>
          <span className={styles.tag}>
            <Icon id={transmission === 'automatic' ? 'automatic' : 'manual'} size={18} />
            {transmission.charAt(0).toUpperCase() + transmission.slice(1)}
          </span>
          <span className={styles.tag}>
            <Icon id="van" size={18} />
            {FORM_LABELS[form] ?? form}
          </span>
        </div>

        <Link
          href={`/catalog/${id}`}
          target="_blank"
          rel="noopener noreferrer"
          className={styles.showMoreBtn}
        >
          Show more
        </Link>
      </div>
    </article>
  );
}
