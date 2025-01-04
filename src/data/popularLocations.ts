export interface LocationData {
  id: string;
  name: string;
  image: string;
  businesses: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// Keeping fallback data in case of API errors
export const POPULAR_LOCATIONS: LocationData[] = [
  { 
    id: '1',
    name: "Lagos",
    image: "https://images.unsplash.com/photo-1587659901518-7020d4413085",
    businesses: 2345,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '2',
    name: "Abuja",
    image: "https://images.unsplash.com/photo-1472224371017-08207f84aaae",
    businesses: 1987,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '3',
    name: "Port Harcourt",
    image: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb",
    businesses: 1456,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '4',
    name: "Ibadan",
    image: "https://images.unsplash.com/photo-1496568816309-51d7c20e3b21",
    businesses: 1234,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '5',
    name: "Kano",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5",
    businesses: 987,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '6',
    name: "Enugu",
    image: "https://images.unsplash.com/photo-1499092346589-b9b6be3e94b2",
    businesses: 876,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '7',
    name: "Calabar",
    image: "https://images.unsplash.com/photo-1506158669146-619067262a00",
    businesses: 765,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '8',
    name: "Warri",
    image: "https://images.unsplash.com/photo-1504893524553-b855bce32c67",
    businesses: 654,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '9',
    name: "Benin City",
    image: "https://images.unsplash.com/photo-1533587851505-d119e13fa0d7",
    businesses: 543,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  },
  {
    id: '10',
    name: "Owerri",
    image: "https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b",
    businesses: 432,
    is_active: true,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString()
  }
];
