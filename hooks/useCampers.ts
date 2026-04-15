'use client';

import { useInfiniteQuery } from '@tanstack/react-query';
import { fetchCampers } from '@/lib/api';
import { CamperFilters } from '@/types/camper';

export const useCampers = (filters: CamperFilters) => {
  return useInfiniteQuery({
    queryKey: ['campers', filters],
    queryFn: ({ pageParam = 1 }) => fetchCampers(pageParam, filters),
    initialPageParam: 1,
    getNextPageParam: (lastPage, allPages) => {
      const loaded = allPages.reduce((acc, p) => acc + p.items.length, 0);
      return loaded < lastPage.total ? allPages.length + 1 : undefined;
    },
  });
};