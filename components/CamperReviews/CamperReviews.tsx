import Icon from '@/components/Icon/Icon';
import { Review } from '@/types/camper';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {Array.from({ length: 5 }, (_, i) => (
        <Icon
          key={i}
          id={i < Math.round(rating) ? 'star-filled' : 'star-empty'}
          size={16}
          color={i < Math.round(rating) ? 'var(--rating)' : 'var(--gray-light)'}
        />
      ))}
    </div>
  );
}

export default function CamperReviews({ reviews }: { reviews: Review[] }) {
  return (
    <ul className="flex flex-col gap-6 list-none p-0 m-0">
      {reviews.map((review) => {
        const initial = review.reviewer_name.charAt(0).toUpperCase();
        return (
          <li key={review.id} className="bg-[var(--inputs)] rounded-[16px] p-4 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <div
                className="shrink-0 flex items-center justify-center rounded-[60px]"
                style={{ width: 60, height: 60, background: 'var(--white)', fontSize: 24, fontWeight: 600, lineHeight: 1.33333, color: 'var(--button)' }}
              >
                {initial}
              </div>
              <div className="flex flex-col gap-2">
                <p className="text-base font-semibold leading-normal text-[var(--main)] m-0">{review.reviewer_name}</p>
                <StarRating rating={review.reviewer_rating} />
              </div>
            </div>
            <p className="text-base font-normal leading-normal text-[var(--text)] m-0">{review.comment}</p>
          </li>
        );
      })}
    </ul>
  );
}
