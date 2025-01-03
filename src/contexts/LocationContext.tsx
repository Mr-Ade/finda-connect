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
    country: "",
    state: "",
    city: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    currency: "USD",
    language: navigator.language,
    coordinates: {
      latitude: null,
      longitude: null,
    },
    isLoading: true,
  });

  useEffect(() => {
    const detectLocation = async () => {
      try {
        // First try to get precise location using browser geolocation
        if ("geolocation" in navigator) {
          const position = await new Promise<GeolocationPosition>((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });

          const { latitude, longitude } = position.coords;
          
          // Use reverse geocoding to get location details
          const response = await fetch(
            `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=YOUR_API_KEY`
          );
          const data = await response.json();

          if (data.results && data.results[0]) {
            const result = data.results[0].components;
            
            setLocationData(prev => ({
              ...prev,
              country: result.country || "",
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
              await supabase
                .from('profiles')
                .update({
                  last_known_location: {
                    latitude,
                    longitude,
                    country: result.country,
                    state: result.state,
                    city: result.city,
                  }
                })
                .eq('id', session.user.id);
            }
          }
        } else {
          throw new Error("Geolocation is not supported");
        }
      } catch (error) {
        console.error("Error detecting location:", error);
        // Fallback to IP-based location
        try {
          const response = await fetch("https://ipapi.co/json/");
          const data = await response.json();
          
          setLocationData(prev => ({
            ...prev,
            country: data.country_name || "",
            state: data.region || "",
            city: data.city || "",
            coordinates: {
              latitude: data.latitude || null,
              longitude: data.longitude || null,
            },
            isLoading: false,
          }));
        } catch (fallbackError) {
          console.error("Error with fallback location detection:", fallbackError);
          toast({
            title: "Location Detection Failed",
            description: "Unable to detect your location. Using default settings.",
            variant: "destructive",
          });
          setLocationData(prev => ({ ...prev, isLoading: false }));
        }
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