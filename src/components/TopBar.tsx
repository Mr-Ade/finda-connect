import { Link } from "react-router-dom";

export const TopBar = () => {
  return (
    <div className="w-full bg-[#1A1F2C] py-2">
      <div className="container mx-auto px-4 flex justify-start items-center space-x-6">
        <Link to="/" className="text-gray-300 hover:text-white text-sm">
          Home
        </Link>
        <Link to="/pages" className="text-gray-300 hover:text-white text-sm">
          Pages
        </Link>
        <span className="text-red-500 text-sm">Contact Us</span>
      </div>
    </div>
  );
};