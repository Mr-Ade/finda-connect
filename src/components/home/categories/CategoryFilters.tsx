import { ShowMoreButton } from "../ShowMoreButton";

interface CategoryFiltersProps {
  showAll: boolean;
  onToggleShowAll: () => void;
}

export const CategoryFilters = ({ showAll, onToggleShowAll }: CategoryFiltersProps) => {
  return (
    <ShowMoreButton showAll={showAll} onClick={onToggleShowAll} />
  );
};