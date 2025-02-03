export type AmenityType = 
  | 'wifi'
  | 'parking' 
  | 'petFriendly'
  | 'airConditioned'
  | 'reservations'
  | 'wheelchairAccessible'
  | 'delivery'
  | 'takeout'
  | 'creditCards'
  | 'goodForKids'
  | 'outdoorSeating'
  | 'vegetarianOptions'
  | 'veganOptions'
  | 'happyHour'
  | 'tv'
  | 'catering'
  | 'moderateNoise'
  | 'goodForGroups'
  | 'driveThru'
  | 'alcohol'
  | 'staffWearsMasks';

export type Amenities = Record<AmenityType, boolean>;

export const DEFAULT_AMENITIES: Amenities = {
  wifi: false,
  parking: false,
  petFriendly: false,
  airConditioned: false,
  reservations: false,
  wheelchairAccessible: false,
  delivery: false,
  takeout: false,
  creditCards: false,
  goodForKids: false,
  outdoorSeating: false,
  vegetarianOptions: false,
  veganOptions: false,
  happyHour: false,
  tv: false,
  catering: false,
  moderateNoise: false,
  goodForGroups: false,
  driveThru: false,
  alcohol: false,
  staffWearsMasks: false
};

export const AMENITY_LABELS: Record<AmenityType, string> = {
  wifi: 'Free WiFi',
  parking: 'Parking Available',
  petFriendly: 'Pet Friendly',
  airConditioned: 'Air Conditioned',
  reservations: 'Takes Reservations',
  wheelchairAccessible: 'Wheelchair Accessible',
  delivery: 'Delivery',
  takeout: 'Takeout',
  creditCards: 'Accepts Credit Cards',
  goodForKids: 'Good for Kids',
  outdoorSeating: 'Outdoor Seating',
  vegetarianOptions: 'Vegetarian Options',
  veganOptions: 'Vegan Options',
  happyHour: 'Happy Hour',
  tv: 'TV',
  catering: 'Catering',
  moderateNoise: 'Moderate Noise',
  goodForGroups: 'Good for Groups',
  driveThru: 'Drive-Thru',
  alcohol: 'Serves Alcohol',
  staffWearsMasks: 'Staff Wears Masks'
};