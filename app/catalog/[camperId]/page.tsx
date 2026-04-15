import { fetchCamperById, fetchCamperReviews } from '@/lib/api';
import Icon from '@/components/Icon/Icon';
import CamperGallery from '@/components/CamperGallery/CamperGallery';
import CamperFeatures from '@/components/CamperFeatures/CamperFeatures';
import CamperReviews from '@/components/CamperReviews/CamperReviews';
import BookingForm from '@/components/BookingForm/BookingForm';

export default async function CamperDetailPage({
  params,
}: {
  params: Promise<{ camperId: string }>;
}) {
  const { camperId } = await params;
  const [camper, reviews] = await Promise.all([
    fetchCamperById(camperId),
    fetchCamperReviews(camperId),
  ]);

  return (
    <div className="max-w-[1440px] mx-auto p-16 flex flex-col gap-16">
      <section className="grid grid-cols-2 gap-12 items-start">
        <div className="min-w-0 overflow-hidden">
          <CamperGallery gallery={camper.gallery} />
        </div>

        <div className="flex flex-col gap-4 min-w-0">
          <h1 className="text-[32px] font-semibold text-text-main m-0">{camper.name}</h1>

          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1 text-base text-text-main">
              <Icon id="star-filled" size={16} color="var(--color-accent)" />
              {camper.rating} ({reviews.length} Reviews)
            </span>
            <span className="flex items-center gap-1 text-base text-text-main">
              <Icon id="map" size={16} color="var(--color-text-secondary)" />
              {camper.location}
            </span>
          </div>

          <p className="text-[28px] font-semibold text-text-main m-0">€{camper.price.toLocaleString()}</p>
          <p className="text-base text-text-secondary leading-relaxed m-0">{camper.description}</p>

          <CamperFeatures camper={camper} />
        </div>
      </section>

      <section className="grid grid-cols-2 gap-12 items-start pb-16">
        <div className="min-w-0">
          <CamperReviews reviews={reviews} />
        </div>
        <div className="min-w-0">
          <BookingForm camperId={camper.id} />
        </div>
      </section>
    </div>
  );
}
