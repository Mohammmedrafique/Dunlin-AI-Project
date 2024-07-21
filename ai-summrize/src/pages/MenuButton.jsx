import React from "react";
import { Menu } from "lucide-react";

const MenuButton = ({ onClick }) => {
  return (
    <button
      onClick={onClick}
      className="md:hidden fixed top-3 left-4 z-30 p-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition-colors duration-300"
      aria-label="Toggle menu"
    >
      <Menu size={24} />
    </button>
  );
};

export default MenuButton;
