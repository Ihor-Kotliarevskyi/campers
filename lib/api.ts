import axios from 'axios';
import { CampersResponse, Camper, CamperFilters } from '@/types/camper';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
});

export const fetchCampers = async (
  page: number,
  filters: CamperFilters = {},
  limit = 4
): Promise<CampersResponse> => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v !== undefined && v !== '')
  );
  const { data } = await api.get<CampersResponse>('/campers', {
    params: { page, limit, ...cleanFilters },
  });
  return data;
};

export const fetchCamperById = async (camperId: string): Promise<Camper> => {
  const { data } = await api.get<Camper>(`/campers/${camperId}`);
  return data;
};

export const submitBooking = async (
  camperId: string,
  payload: { name: string; email: string; }
): Promise<{ success: boolean }> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      console.log(`Booking submitted for camper ${camperId}:`, payload);
      resolve({ success: true });
    }, 1000);
  });
};