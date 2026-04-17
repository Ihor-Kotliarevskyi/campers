import Icon from '@/components/Icon/Icon';
import { Review } from '@/types/camper';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
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
    <section className="flex flex-col">
      <h2 className="text-xl font-semibold text-[var(--main)] m-0 mb-8">Reviews</h2>
      <ul className="flex flex-col gap-6 list-none p-0 m-0">
        {reviews.map((review, index) => {
          const initial = review.reviewer_name.charAt(0).toUpperCase();
          return (
            <li key={index} className="bg-[var(--badges)] rounded-2xl p-6 flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <div className="w-11 h-11 rounded-full bg-[var(--grey-green)] text-white flex items-center justify-center text-lg font-bold shrink-0">
                  {initial}
                </div>
                <div>
                  <p className="text-base font-semibold text-[var(--main)] m-0 mb-1">{review.reviewer_name}</p>
                  <StarRating rating={review.reviewer_rating} />
                </div>
              </div>
              <p className="text-base text-[var(--main)] leading-relaxed m-0">{review.comment}</p>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
