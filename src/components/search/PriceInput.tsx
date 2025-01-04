import { Input } from "@/components/ui/input";

interface PriceInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder: string;
  type?: string;
  className?: string;
}

export const PriceInput = ({
  value,
  onChange,
  placeholder,
  type = "number",
  className = "h-12"
}: PriceInputProps) => {
  return (
    <div className="relative flex-1">
      <Input
        placeholder={`${placeholder} (₦)`}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={className}
        type={type}
      />
    </div>
  );
};