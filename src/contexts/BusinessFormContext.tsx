import { createContext, useContext, useState } from "react";
import type { Amenities } from "@/types/amenities";
import type { Json } from "@/integrations/supabase/types";

interface WorkingHour {
  dayOfWeek: number;
  openTime: string;
  closeTime: string;
  isClosed: boolean;
}

interface MenuItem {
  name: string;
  description?: string;
  price: number;
  category?: string;
  imageUrl?: string;
}

export interface SocialLinks {
  facebook?: string;
  twitter?: string;
  instagram?: string;
  linkedin?: string;
}

export interface BusinessFormData {
  // Basic Info
  name: string;
  description: string;
  category: string;
  keywords: string[];
  
  // Location
  address: string;
  city: string;
  state: string;
  zipCode: string;
  latitude: number;
  longitude: number;
  phone: string;
  email: string;
  website: string;

  // Working Hours
  workingHours: WorkingHour[];

  // Menu Items
  menuItems: MenuItem[];

  // Amenities
  amenities: Partial<Amenities>;

  // Social Links
  socialLinks: SocialLinks;

  // Photos
  logo?: File;
  featuredImage?: File;
  galleryImages: File[];
}

interface BusinessFormContextType {
  formData: BusinessFormData;
  updateFormData: <K extends keyof BusinessFormData>(
    field: K,
    value: BusinessFormData[K]
  ) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
  validateForm: () => boolean;
}

const defaultFormData: BusinessFormData = {
  name: "",
  description: "",
  category: "",
  keywords: [],
  address: "",
  city: "",
  state: "",
  zipCode: "",
  latitude: 9.0820,
  longitude: 8.6753,
  phone: "",
  email: "",
  website: "",
  workingHours: [],
  menuItems: [],
  amenities: {},
  socialLinks: {},
  galleryImages: [],
};

const BusinessFormContext = createContext<BusinessFormContextType | undefined>(undefined);

export const BusinessFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<BusinessFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = <K extends keyof BusinessFormData>(
    field: K,
    value: BusinessFormData[K]
  ) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const validateForm = () => {
    // Basic validation
    if (!formData.name?.trim()) return false;
    if (!formData.description?.trim()) return false;
    if (formData.name.length < 3) return false;
    if (formData.description.length < 20) return false;
    
    // Add more validation as needed
    return true;
  };

  return (
    <BusinessFormContext.Provider value={{ 
      formData, 
      updateFormData, 
      isSubmitting, 
      setIsSubmitting,
      validateForm
    }}>
      {children}
    </BusinessFormContext.Provider>
  );
};

export const useBusinessForm = () => {
  const context = useContext(BusinessFormContext);
  if (!context) {
    throw new Error("useBusinessForm must be used within a BusinessFormProvider");
  }
  return context;
};