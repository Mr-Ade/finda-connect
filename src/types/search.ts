
export interface SearchFilters {
  searchTerm: string;
  category: string;
  priceRange: number[];
  city?: string;
  state?: string;
  rating: number;
  openNow: boolean;
  sortBy: string;
  latitude?: number;
  longitude?: number;
}

export interface BusinessSearchResult {
  id: string;
  name: string;
  image: string;
  category: string;
  rating: number;
  reviewCount: number;
  location: string;
  latitude: number;
  longitude: number;
  isOpen: boolean;
  priceRange?: number;
  distance?: number;
}

export interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
}

export interface FilterChangeEvent {
  priceRange: number[];
  rating: number;
  openNow: boolean;
  sortBy: string;
}
