import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface LocationContextType {
  country: string;
  state: string;
  city: string;
  timezone: string;
  currency: string;
  language: string;
  coordinates: {
    latitude: number | null;
    longitude: number | null;
  };
  isLoading: boolean;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [locationData, setLocationData] = useState<LocationContextType>({
    country: "Nigeria", // Default to Nigeria
    state: "",
    city: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    currency: "NGN", // Set to Nigerian Naira
    language: navigator.language,
    coordinates: {
      latitude: 9.0820, // Nigeria's approximate center
      longitude: 8.6753
    },
    isLoading: true,
  });

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // First try to get precise location using browser geolocation
        if ("geolocation" in navigator) {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, {
              timeout: 5000,
              maximumAge: 0,
              enableHighAccuracy: true
            });
          });

          const { latitude, longitude } = position.coords;
          console.log("Got coordinates:", latitude, longitude);
          
          // Use reverse geocoding to get location details
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=155e6c1220b94de0a87f628b659b430b&countrycode=ng`
          );
          
          if (!response.ok) {
            throw new Error('Geocoding API request failed');
          }

          const data = await response.json();
          console.log("Geocoding response:", data);

          if (data.results && data.results[0]) {
            const result = data.results[0].components;
            console.log("Location components:", result);
            
            // Only update if the location is in Nigeria
            if (result.country === "Nigeria") {
              setLocationData(prev => ({
                ...prev,
                state: result.state || "",
                city: result.city || "",
                coordinates: {
                  latitude,
                  longitude,
                },
                isLoading: false,
              }));

              // Store location in user profile if authenticated
              const { data: { session } } = await supabase.auth.getSession();
              if (session?.user) {
                const { error } = await supabase
                  .from('profiles')
                  .update({
                    location_data: {
                      latitude,
                      longitude,
                      state: result.state,
                      city: result.city,
                    }
                  })
                  .eq('id', session.user.id);

                if (error) {
                  console.error("Error updating profile location:", error);
                }
              }
            }
          }
        }
      } catch (error) {
        console.error("Error detecting location:", error);
        setLocationData(prev => ({ ...prev, isLoading: false }));
        toast({
          title: "Location Detection Failed",
          description: "Using default location settings for Nigeria.",
          variant: "destructive",
        });
      }
    };

    detectLocation();
  }, [toast]);

  return (
    <LocationContext.Provider value={locationData}>
      {children}
    </LocationContext.Provider>
  );
}

export function useLocation() {
  const context = useContext(LocationContext);
  if (context === undefined) {
    throw new Error("useLocation must be used within a LocationProvider");
  }
  return context;
}