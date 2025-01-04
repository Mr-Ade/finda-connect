export interface Coordinates {
  latitude: number | null;
  longitude: number | null;
}

export interface LocationData {
  country: string;
  state: string;
  city: string;
  timezone: string;
  currency: string;
  language: string;
  coordinates: Coordinates;
}

export interface LocationContextType extends LocationData {
  isLoading: boolean;
  setCity: (city: string) => void;
}