import axios from 'axios';
import { CampersResponse, CamperDetail, CamperFilters, Review, BookingResponse } from '@/types/camper';

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || 'https://campers-api.goit.study',
});

export const fetchCampers = async (
  page: number,
  filters: CamperFilters = {},
  perPage = 4
): Promise<CampersResponse> => {
  const cleanFilters = Object.fromEntries(
    Object.entries(filters).filter(([, v]) => v !== undefined && v !== '')
  );
  const { data } = await api.get<{ total: number; campers: CampersResponse['items'] }>(
    '/campers',
    { params: { page, perPage, ...cleanFilters } }
  );
  return { total: data.total, items: data.campers };
};

export const fetchCamperById = async (camperId: string): Promise<CamperDetail> => {
  const { data } = await api.get<CamperDetail>(`/campers/${camperId}`);
  return data;
};

export const fetchCamperReviews = async (camperId: string): Promise<Review[]> => {
  const { data } = await api.get<Review[]>(`/campers/${camperId}/reviews`);
  return data;
};

export const submitBooking = async (
  camperId: string,
  payload: { name: string; email: string }
): Promise<BookingResponse> => {
  const { data } = await api.post<BookingResponse>(
    `/campers/${camperId}/booking-requests`,
    payload
  );
  return data;
};
