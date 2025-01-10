import { Link } from "react-router-dom";

export const NavigationLinks = () => {
  return (
    <>
      <Link to="/explore-listings" className="text-gray-600 hover:text-primary">
        Explore
      </Link>
      <Link to="/blog" className="text-gray-600 hover:text-primary">
        Blog
      </Link>
      <Link to="/shop" className="text-gray-600 hover:text-primary">
        Shop
      </Link>
    </>
  );
};