export type CamperForm = 'alcove' | 'integrated' | 'panel_van' | 'semi_integrated';
export type Engine = 'diesel' | 'petrol' | 'hybrid' | 'electric';
export type Transmission = 'automatic' | 'manual';

export interface GalleryItem {
  id: string;
  camperId: string;
  thumb: string;
  original: string;
  order: number;
}

export interface Review {
  id: string;
  camperId: string;
  reviewer_name: string;
  reviewer_rating: number;
  comment: string;
  createdAt: string;
}

export interface BookingResponse {
  message: string;
}

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description?: string;
  form: CamperForm;
  engine: Engine;
  transmission: Transmission;
  length: string; width: string; height: string;
  tank: string; consumption: string;
  amenities: string[];
  coverImage: string;
  totalReviews: number;
}

export interface CamperDetail extends Camper {
  gallery: GalleryItem[];
}

export interface CampersResponse {
  total: number;
  items: Camper[];
}

export interface CamperFilters {
  location?: string;
  form?: CamperForm;
  engine?: Engine;
  transmission?: Transmission;
}
