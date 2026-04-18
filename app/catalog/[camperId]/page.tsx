import type { Metadata } from 'next';
import { fetchCamperById, fetchCamperReviews } from '@/lib/api';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ camperId: string }>;
}): Promise<Metadata> {
  const { camperId } = await params;
  const camper = await fetchCamperById(camperId);
  return {
    title: `${camper.name} — TravelTrucks`,
    description: camper.description,
  };
}
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
    <div className="max-w-[1440px] mx-auto px-16 pt-16 flex flex-col gap-[88px]">
      <section className="grid grid-cols-2 gap-6">
        <CamperGallery gallery={camper.gallery} />

        <div className="flex flex-col gap-6 min-w-0">
          <div className="max-h-[300px] bg-[var(--inputs)] rounded-[16px] p-6">
            <div className="flex justify-between items-center mb-2">
              <h1 className="text-2xl font-semibold leading-[1.33333] text-[var(--main)] m-0">
                {camper.name}
              </h1>
              <p className="text-2xl font-semibold leading-[1.33333] text-[var(--main)] m-0">
                €{camper.price.toLocaleString()}
              </p>
            </div>
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center gap-2 text-base font-normal leading-normal text-[var(--main)]">
                <Icon id="star-filled" size={16} color="var(--rating)" />
                {camper.rating} ({reviews.length} Reviews)
              </span>
              <span className="flex items-center gap-2 text-base font-normal leading-normal text-[var(--main)]">
                <Icon id="map" size={16} color="var(--gray)" />
                {camper.location}
              </span>
            </div>
            <p className="text-base font-normal leading-normal text-[var(--text)] m-0 h-[120px] overflow-y-auto">
              {camper.description}
            </p>
          </div>

          <CamperFeatures camper={camper} />
        </div>
      </section>
      <div className="flex flex-col gap-6 pb-16">
        <h2 className="text-2xl font-semibold leading-[1.33333] text-[var(--main)] m-0">
          Reviews
        </h2>
        <div className="grid grid-cols-2 gap-6 items-start">
          <CamperReviews reviews={reviews} />
          <BookingForm camperId={camper.id} />
        </div>
      </div>
    </div>
  );
}
