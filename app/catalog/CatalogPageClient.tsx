'use client';

import { useSearchParams } from 'next/navigation';
import { useCampers } from '@/hooks/useCampers';
import FiltersPanel from '@/components/FiltersPanel/FiltersPanel';
import CamperList from '@/components/CamperList/CamperList';
import LoadMoreButton from '@/components/LoadMoreButton/LoadMoreButton';
import { CamperFilters, CamperForm, Engine, Transmission } from '@/types/camper';

export default function CatalogPageClient() {
  const searchParams = useSearchParams();
  const filters: CamperFilters = {
    location: searchParams.get('location') || undefined,
    form: (searchParams.get('form') || undefined) as CamperForm | undefined,
    engine: (searchParams.get('engine') || undefined) as Engine | undefined,
    transmission: (searchParams.get('transmission') || undefined) as Transmission | undefined,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCampers(filters);
  const campers = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <div className="flex gap-[65px] max-w-[1440px] mx-auto p-16 items-start">
      <FiltersPanel />
      <div className="flex-1 min-w-0 pb-16">
        <CamperList campers={campers} />
        {hasNextPage && (
          <LoadMoreButton onClick={fetchNextPage} loading={isFetchingNextPage} />
        )}
      </div>
    </div>
  );
}
