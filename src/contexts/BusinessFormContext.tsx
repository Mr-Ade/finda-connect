import { createContext, useContext, useState } from "react";
import { BusinessFormData } from "@/types/business";

interface BusinessFormContextType {
  formData: BusinessFormData;
  updateFormData: (section: keyof BusinessFormData, data: any) => void;
  isSubmitting: boolean;
  setIsSubmitting: (value: boolean) => void;
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
  latitude: 0,
  longitude: 0,
  phone: "",
  email: "",
  website: "",
  workingHours: [],
  menuItems: [],
  amenities: [],
};

const BusinessFormContext = createContext<BusinessFormContextType | undefined>(undefined);

export const BusinessFormProvider = ({ children }: { children: React.ReactNode }) => {
  const [formData, setFormData] = useState<BusinessFormData>(defaultFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const updateFormData = (section: keyof BusinessFormData, data: any) => {
    setFormData(prev => ({
      ...prev,
      [section]: data
    }));
  };

  return (
    <BusinessFormContext.Provider value={{ 
      formData, 
      updateFormData, 
      isSubmitting, 
      setIsSubmitting 
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