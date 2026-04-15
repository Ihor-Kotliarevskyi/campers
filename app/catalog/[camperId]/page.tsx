import { fetchCamperById } from '@/lib/api';
import Icon from '@/components/Icon/Icon';
import CamperGallery from '@/components/CamperGallery/CamperGallery';
import CamperFeatures from '@/components/CamperFeatures/CamperFeatures';
import CamperReviews from '@/components/CamperReviews/CamperReviews';
import BookingForm from '@/components/BookingForm/BookingForm';
import styles from './page.module.css';

export default async function CamperDetailPage({
  params,
}: {
  params: Promise<{ camperId: string }>;
}) {
  const { camperId } = await params;
  const camper = await fetchCamperById(camperId);

  return (
    <div className={styles.page}>
      <section className={styles.topSection}>
        <div className={styles.gallery}>
          <CamperGallery gallery={camper.gallery} />
        </div>

        <div className={styles.info}>
          <h1 className={styles.name}>{camper.name}</h1>

          <div className={styles.metaRow}>
            <span className={styles.rating}>
              <Icon id="star-filled" size={16} color="var(--color-accent)" />
              {camper.rating} ({camper.reviews.length} Reviews)
            </span>
            <span className={styles.location}>
              <Icon id="map" size={16} color="var(--color-text-secondary)" />
              {camper.location}
            </span>
          </div>

          <p className={styles.price}>€{camper.price.toLocaleString()}</p>
          <p className={styles.description}>{camper.description}</p>

          <CamperFeatures camper={camper} />
        </div>
      </section>

      <section className={styles.bottomSection}>
        <div className={styles.reviews}>
          <CamperReviews reviews={camper.reviews} />
        </div>
        <div className={styles.booking}>
          <BookingForm camperId={camper.id} />
        </div>
      </section>
    </div>
  );
}
