import { Link, useNavigate } from "react-router-dom";
import { X, Home, LogOut, Menu } from "lucide-react";
import { toast } from "react-toastify";

const Sidebar = ({ isOpen, onClose, history, onSelectHistoryItem }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    navigate("/");
    toast.success("Logout successfully");
    onClose();
  };

  return (
    <div
      className={`bg-white  w-64 p-4 shadow-lg transition-all duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0 fixed md:static top-15 left-0 h-full z-20 flex flex-col`}
    >
        
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold">History</h2>
        <button
          onClick={onClose}
          className="md:hidden text-gray-500 hover:text-gray-700"
        >
          <X size={20} />
        </button>
      </div>
      <div className="flex-grow overflow-y-auto space-y-2 border-t border-black">
        {history.map((item) => (
          <div
            key={item._id}
            onClick={() => onSelectHistoryItem(item._id)}
            className="p-2 hover:bg-gray-100 rounded cursor-pointer transition-colors duration-200"
          >
            <p className="font-medium truncate">{item.input.slice(0, 30)}</p>
            <p className="text-sm text-gray-500">
              {new Date(item.timestamp).toLocaleString()}
            </p>
          </div>
        ))}
      </div>
      <div className=" space-y-2 lg:mb-16 mb-20 mt-auto border-t border-black">
        <Link
          to="/home"
          className="flex items-center p-2 mt-5 hover:bg-gray-100 rounded cursor-pointer transition-colors duration-200"
          onClick={onClose}
        >
          <Home size={20} className="mr-2" />
          Home
        </Link>
        <button
          onClick={handleLogout}
          className="flex items-center font-bold w-28 p-2 hover:bg-red-100 rounded cursor-pointer transition-colors duration-200 bg-green-700"
        >
          <LogOut size={20} className="mr-2" />
          Logout
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
