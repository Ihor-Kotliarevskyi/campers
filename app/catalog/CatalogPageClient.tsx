'use client';

import { useSearchParams } from 'next/navigation';
import { useCampers } from '@/hooks/useCampers';
import FiltersPanel from '@/components/FiltersPanel/FiltersPanel';
import CamperList from '@/components/CamperList/CamperList';
import LoadMoreButton from '@/components/LoadMoreButton/LoadMoreButton';

export default function CatalogPage() {
  const searchParams = useSearchParams();
  const filters = {
    location: searchParams.get('location') || undefined,
    form: searchParams.get('form') || undefined,
    engine: searchParams.get('engine') || undefined,
    transmission: searchParams.get('transmission') || undefined,
  };

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage } = useCampers(filters);
  const campers = data?.pages.flatMap(p => p.items) ?? [];

  return (
    <div className="layout">
      <FiltersPanel />
      <div>
        <CamperList campers={campers} />
        {hasNextPage && (
          <LoadMoreButton onClick={fetchNextPage} loading={isFetchingNextPage} />
        )}
      </div>
    </div>
  );
}