import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center space-y-6 p-8">
        <h1 className="text-4xl font-bold text-gray-900">404 - Page Not Found</h1>
        <p className="text-lg text-gray-600">
          The page you are looking for does not exist.
        </p>
        <Button 
          onClick={() => navigate("/")}
          className="bg-primary hover:bg-primary/90"
        >
          Go Back Home
        </Button>
      </div>
    </div>
  );
};

export default NotFound;