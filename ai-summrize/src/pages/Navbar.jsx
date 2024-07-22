import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import { toast } from "react-toastify";

export const Navbar = ({ toggleSidebar }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userid");
    localStorage.removeItem("username");
    navigate("/");
    toast.success("Logout successfully");
  };

  const isLoggedIn = !!localStorage.getItem("token");
  const username = localStorage.getItem("username");

  return (
    <nav className="bg-[#FFFFFF] shadow-md border-b border-black sticky lg:relative w-full top-0 left-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            {isLoggedIn ? (
              <div className="flex items-center hover:none absolute lg:relative top-0 right-3">
                <img src="nlogo.png" alt="" className="w-14  " />
                <span className="font-bold text-xl text-black hidden md:block">
                  𝓦𝓮𝓫 𝓢𝓬𝓻𝓪𝓹𝓮𝓻
                </span>
              </div>
            ) : (
              <Link to="/" className="flex items-center hover:none">
                <img src="nlogo.png" alt="" className="w-14" />
                <span className="font-bold text-xl text-black">
                  𝓦𝓮𝓫 𝓢𝓬𝓻𝓪𝓹𝓮𝓻
                </span>
              </Link>
            )}
          </div>
          <div className="hidden md:flex items-center space-x-4">
            {isLoggedIn && (
              <>
                <img src="logomen.png" alt="" className="w-8" />
                <span className="font-bold text-xl text-black">{username}</span>
              </>
            )}
            {isLoggedIn ? (
              // <button
              //   onClick={handleLogout}
              //   className="text-black hover:bg-green-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
              // >
              //   <LogOut className="h-5 w-5 mr-1" />
              //   Logout
              // </button>
              null
            ) : (
              <Link
                to="/"
                className="text-black hover:animate-pulse hover:text-black px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
              >
                <LogIn className="h-5 w-5 mr-1" />
                <span className="ml-1">Login</span>
              </Link>
            )}
          </div>
          {/* <div className="md:hidden absolute">
            <MenuButton onClick={toggleSidebar} />
          </div> */}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
