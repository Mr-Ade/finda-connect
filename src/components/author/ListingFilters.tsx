import { useState } from "react";

interface ListingFiltersProps {
  listingsCount: number;
}

export const ListingFilters = ({ listingsCount }: ListingFiltersProps) => {
  const [selectedFilter, setSelectedFilter] = useState("all");

  const filters = [
    { id: "all", label: "All" },
    { id: "places", label: "Places" },
    { id: "property", label: "Property" },
    { id: "cars", label: "Cars" },
    { id: "hotels", label: "Hotels" },
    { id: "jobs", label: "Jobs" }
  ];

  return (
    <div className="bg-white rounded-lg p-6 mb-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <h5 className="font-semibold text-lg m-0">
          You have total <span className="text-primary px-2">{listingsCount}</span> Listings
        </h5>
        
        <div className="flex flex-wrap gap-4">
          {filters.map((filter) => (
            <label key={filter.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="rounded border-gray-300 text-primary focus:ring-primary"
                checked={selectedFilter === filter.id}
                onChange={() => setSelectedFilter(filter.id)}
              />
              <span>{filter.label}</span>
            </label>
          ))}
        </div>
      </div>
    </div>
  );
};