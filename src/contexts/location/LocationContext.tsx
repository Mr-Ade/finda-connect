import { createContext, useContext } from "react";
import { useLocationDetection } from "./useLocationDetection";
import type { LocationContextType } from "./types";

const LocationContext = createContext<LocationContextType | undefined>(undefined);

export function LocationProvider({ children }: { children: React.ReactNode }) {
  const { locationData, setCity } = useLocationDetection();

  return (
    <LocationContext.Provider 
      value={{ 
        ...locationData,
        setCity
      }}
    >
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