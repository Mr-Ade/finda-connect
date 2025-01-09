import { Link } from "react-router-dom";

export const Logo = () => {
  return (
    <Link to="/" className="flex items-center">
      <img 
        src="/lovable-uploads/4d0af716-aad5-4a66-a3db-4a158a8037a8.png" 
        alt="Finda Logo" 
        className="h-8"
      />
    </Link>
  );
};