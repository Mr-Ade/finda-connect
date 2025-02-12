
export interface SearchFilters {
  searchTerm: string;
  category: string;
  priceRange: number[];
  city?: string;
  state?: string;
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
}

export interface MapMarker {
  id: string;
  latitude: number;
  longitude: number;
  title: string;
}
