export interface City {
  id: number;
  wikiDataId: string;
  type: string;
  city: string;
  name: string;
  country: string;
  countryCode: string;
  region: string;
  regionCode: string;
  regionWdId: string;
  latitude: number;
  longitude: number;
  population: number;
}

export interface FilterParams {
  country?: string;
  region?: string;
  name?: string;
  population?: number | null;
}

export interface Links {
  rel: string;
  href: string;
}