import { Button } from "@/components/ui/button";
import { useNavigate, Link } from "react-router-dom";

interface AuthButtonsProps {
  isAuthenticated: boolean;
  handleLogout: () => void;
}

export const AuthButtons = ({ isAuthenticated, handleLogout }: AuthButtonsProps) => {
  const navigate = useNavigate();

  if (isAuthenticated) {
    return (
      <>
        <Link to="/dashboard" className="text-gray-600 hover:text-primary">
          Dashboard
        </Link>
        <Link to="/profile" className="text-gray-600 hover:text-primary">
          Profile
        </Link>
        <Button onClick={handleLogout} variant="ghost" size="sm">
          Log out
        </Button>
      </>
    );
  }

  return (
    <>
      <Button variant="ghost" size="sm" onClick={() => navigate("/login")}>
        Log in
      </Button>
      <Button size="sm" onClick={() => navigate("/signup")}>
        Sign up
      </Button>
    </>
  );
};