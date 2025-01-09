import { useState, useEffect } from "react";
import { MapPin, ChevronDown } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useLocation } from "@/contexts/LocationContext";
import { supabase } from "@/integrations/supabase/client";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface LocationInputProps {
  className?: string;
}

interface State {
  id: string;
  name: string;
  code: string;
}

interface City {
  id: string;
  name: string;
  state_id: string;
  ad_count: number;
}

export const LocationInput = ({ className = "h-12" }: LocationInputProps) => {
  const [open, setOpen] = useState(false);
  const [states, setStates] = useState<State[]>([]);
  const [cities, setCities] = useState<City[]>([]);
  const [selectedState, setSelectedState] = useState<State | null>(null);
  const [selectedLocation, setSelectedLocation] = useState("");
  const { setCity, setState } = useLocation();

  useEffect(() => {
    const fetchStates = async () => {
      const { data, error } = await supabase
        .from('states')
        .select('*')
        .order('name');
      
      if (error) {
        console.error('Error fetching states:', error);
        return;
      }
      
      setStates(data);
    };

    fetchStates();
  }, []);

  useEffect(() => {
    const fetchCities = async (stateId: string) => {
      const { data, error } = await supabase
        .from('cities')
        .select('*')
        .eq('state_id', stateId)
        .order('name');
      
      if (error) {
        console.error('Error fetching cities:', error);
        return;
      }
      
      setCities(data);
    };

    if (selectedState) {
      fetchCities(selectedState.id);
    }
  }, [selectedState]);

  const handleStateSelect = (state: State) => {
    setSelectedState(state);
    setState(state.name);
    setSelectedLocation(state.name);
  };

  const handleCitySelect = (city: City) => {
    setCity(city.name);
    setSelectedLocation(`${city.name}, ${selectedState?.name}`);
    setOpen(false);
  };

  return (
    <div className="relative flex-1">
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className={`w-full justify-between ${className}`}
          >
            <div className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-gray-400" />
              {selectedLocation || "Select location..."}
            </div>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[400px] p-0" align="start">
          <Command>
            <CommandInput placeholder="Search states and cities..." />
            <CommandList>
              <CommandEmpty>No location found.</CommandEmpty>
              <ScrollArea className="h-[300px]">
                {!selectedState ? (
                  <CommandGroup heading="States">
                    {states.map((state) => (
                      <CommandItem
                        key={state.id}
                        value={state.name}
                        onSelect={() => handleStateSelect(state)}
                      >
                        {state.name}
                      </CommandItem>
                    ))}
                  </CommandGroup>
                ) : (
                  <CommandGroup heading={`Cities in ${selectedState.name}`}>
                    <CommandItem
                      value="back"
                      onSelect={() => setSelectedState(null)}
                      className="font-medium text-blue-600"
                    >
                      ← Back to States
                    </CommandItem>
                    {cities.map((city) => (
                      <CommandItem
                        key={city.id}
                        value={city.name}
                        onSelect={() => handleCitySelect(city)}
                      >
                        <div className="flex justify-between w-full">
                          <span>{city.name}</span>
                          <span className="text-gray-400 text-sm">
                            {city.ad_count.toLocaleString()} ads
                          </span>
                        </div>
                      </CommandItem>
                    ))}
                  </CommandGroup>
                )}
              </ScrollArea>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};