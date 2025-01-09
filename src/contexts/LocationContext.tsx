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
  setCity: (city: string) => void;
  setState: (state: string) => void;
}

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const { toast } = useToast();
  const [locationData, setLocationData] = useState({
    country: "Nigeria",
    state: "",
    city: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    currency: "NGN",
    language: navigator.language,
    coordinates: {
      latitude: 9.0820,  // Nigeria's approximate center
      longitude: 8.6753
    },
    isLoading: true,
  });

  const setCity = (city: string) => {
    setLocationData(prev => ({
      ...prev,
      city
    }));
  };

  const setState = (state: string) => {
    setLocationData(prev => ({
      ...prev,
      state
    }));
  };

  useEffect(() => {
    const detectLocation = async () => {
      try {
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
          
          // Set coordinates even if geocoding fails
          setLocationData(prev => ({
            ...prev,
            coordinates: {
              latitude,
              longitude,
            },
            isLoading: false,
          }));

          try {
            // Try to get location details from Supabase Edge Function
            const { data, error } = await supabase.functions.invoke('geocode', {
              body: { latitude, longitude }
            });

            if (error) {
              console.error("Geocoding error:", error);
              toast({
                title: "Location Detection Limited",
                description: "Using approximate location. Some features may be limited.",
                variant: "default"
              });
              return;
            }

            console.log("Geocoding response:", data);

            if (data.results && data.results[0]) {
              const components = data.results[0].address_components;
              let city = '';
              let state = '';

              // Safely extract city and state
              if (typeof components === 'object' && components !== null) {
                // Try to find city from various possible fields
                city = components.city || 
                       components.town || 
                       components.village || 
                       components.district || 
                       '';
                
                // Get state
                state = components.state || '';
              }

              console.log("Location components:", { city, state });
              
              if (data.results[0].formatted_address.includes("Nigeria")) {
                setLocationData(prev => ({
                  ...prev,
                  state: state || "",
                  city: city || "",
                  isLoading: false,
                }));

                // Update user profile if logged in
                const { data: { session } } = await supabase.auth.getSession();
                if (session?.user) {
                  const { error: updateError } = await supabase
                    .from('profiles')
                    .update({
                      location_data: {
                        latitude,
                        longitude,
                        state,
                        city,
                      }
                    })
                    .eq('id', session.user.id);

                  if (updateError) {
                    console.error("Error updating profile location:", updateError);
                  }
                }
              }
            }
          } catch (geocodingError) {
            console.error("Geocoding error:", geocodingError);
            toast({
              title: "Location Detection Limited",
              description: "Using approximate location. Some features may be limited.",
              variant: "default"
            });
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
    <LocationContext.Provider value={{ ...locationData, setCity, setState }}>
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
