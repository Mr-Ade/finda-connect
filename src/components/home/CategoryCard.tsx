import { LucideIcon } from "lucide-react";

interface CategoryCardProps {
  name: string;
  Icon: LucideIcon;
  count: number;
  onClick: () => void;
}

export const CategoryCard = ({ name, Icon, count, onClick }: CategoryCardProps) => {
  return (
    <div
      onClick={onClick}
      className="group bg-white rounded-xl shadow-sm hover:shadow-md transition-all p-6 text-center cursor-pointer border border-gray-100 hover:border-primary hover:-translate-y-1"
    >
      <div className="inline-flex items-center justify-center w-16 h-16 mb-4 bg-primary/10 rounded-lg group-hover:bg-primary group-hover:text-white text-primary transition-colors">
        <Icon size={32} />
      </div>
      <h3 className="font-semibold mb-2">{name}</h3>
      <p className="text-sm text-gray-500">{count} Listings</p>
    </div>
  );
};