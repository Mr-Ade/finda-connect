import { useState, useEffect } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import type { LocationData } from './types';

interface UseLocationDetectionResult {
  locationData: LocationData & { isLoading: boolean };
  setCity: (city: string) => void;
}

export function useLocationDetection(): UseLocationDetectionResult {
  const { toast } = useToast();
  const [locationData, setLocationData] = useState<LocationData & { isLoading: boolean }>({
    country: "Nigeria",
    state: "",
    city: "",
    timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    currency: "NGN",
    language: navigator.language,
    coordinates: {
      latitude: 9.0820,
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

  return {
    locationData,
    setCity,
  };
}