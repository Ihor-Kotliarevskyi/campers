import Icon from '@/components/Icon/Icon';
import { Review } from '@/types/camper';
import styles from './CamperReviews.module.css';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className={styles.stars}>
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          id={i < Math.round(rating) ? 'star-filled' : 'star-empty'}
          size={16}
          color={i < Math.round(rating) ? 'var(--color-accent)' : 'var(--color-border)'}
        />
      ))}
    </div>
  );
}

export default function CamperReviews({ reviews }: { reviews: Review[] }) {
  return (
    <section className={styles.section}>
      <h2 className={styles.heading}>Reviews</h2>
      <ul className={styles.list}>
        {reviews.map((review, index) => {
          const initial = review.reviewer_name.charAt(0).toUpperCase();
          return (
            <li key={index} className={styles.card}>
              <div className={styles.header}>
                <div className={styles.avatar}>{initial}</div>
                <div>
                  <p className={styles.name}>{review.reviewer_name}</p>
                  <StarRating rating={review.reviewer_rating} />
                </div>
              </div>
              <p className={styles.comment}>{review.comment}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
