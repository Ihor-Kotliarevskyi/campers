export type CamperForm = 'alcove' | 'fullyIntegrated' | 'panelTruck';
export type Engine = 'diesel' | 'petrol' | 'hybrid';
export type Transmission = 'automatic' | 'manual';

export interface Camper {
  id: string;
  name: string;
  price: number;
  rating: number;
  location: string;
  description: string;
  form: CamperForm;
  engine: Engine;
  transmission: Transmission;
  length: string; width: string; height: string;
  tank: string; consumption: string;
  AC: boolean; bathroom: boolean; kitchen: boolean;
  TV: boolean; radio: boolean; refrigerator: boolean;
  microwave: boolean; gas: boolean; water: boolean;
  gallery: { thumb: string; original: string }[];
  reviews: { reviewer_name: string; reviewer_rating: number; comment: string }[];
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