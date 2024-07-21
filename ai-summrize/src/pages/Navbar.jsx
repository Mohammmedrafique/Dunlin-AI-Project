// import { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import { Home, LogIn, LogOut, Menu, X } from "lucide-react";
// import { toast } from "react-toastify";

// export const Navbar = () => {
//   const navigate = useNavigate();
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("userid");
//     localStorage.removeItem("username");
//     navigate("/");
//     toast.success("Logout successfully");
//     setIsMenuOpen(false);
//   };

//   const isLoggedIn = !!localStorage.getItem("token");

//   const toggleMenu = () => {
//     setIsMenuOpen(!isMenuOpen);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//   };

//   const username = localStorage.getItem("username");

//   return (
//     <nav className="bg-[#FFFFFF] shadow-md border-b border-black">
//       <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
//         <div className="flex items-center justify-between h-16">
//           <div className="flex items-center">
//             {isLoggedIn ? (
//               <div className="flex items-center hover:none">
//                 <img src="nlogo.png" alt="" className="w-14" />
//                 <span className="font-bold text-xl text-black ">
//                   𝓦𝓮𝓫 𝓢𝓬𝓻𝓪𝓹𝓮𝓻
//                 </span>
//               </div>
//             ) : (
//               <NavLink to="/" onClick={closeMenu}>
//                 <div className="flex items-center hover:none">
//                   <img src="nlogo.png" alt="" className="w-14" />
//                   <span className="font-bold text-xl text-black">
//                     𝓦𝓮𝓫 𝓢𝓬𝓻𝓪𝓹𝓮𝓻
//                   </span>
//                 </div>
//               </NavLink>
//             )}
//           </div>
//           <div className="hidden md:block">
//             <div className="ml-10 flex items-center space-x-4">
//               {isLoggedIn && (
//                 <>
//                   <img src="logomen.png" alt="" className="w-8" />
//                   <span className="font-bold text-xl text-black">
//                     {username}
//                   </span>
//                 </>
//               )}
//               {isLoggedIn ? (
//                 <button
//                   onClick={handleLogout}
//                   className="text-black hover:bg-green-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
//                 >
//                   <LogOut className="h-5 w-5 mr-1" />
//                   Logout
//                 </button>
//               ) : (
//                 <NavLink
//                   to="/"
//                   icon={<LogIn className="h-5 w-5" />}
//                   onClick={closeMenu}
//                 >
//                   Login
//                 </NavLink>
//               )}
//             </div>
//           </div>
//           <div className="md:hidden">
//             <button
//               onClick={toggleMenu}
//               className="inline-flex items-center justify-center p-2 rounded-md text-black hover:text-black hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
//             >
//               {isMenuOpen ? (
//                 <X className="h-6 w-6" />
//               ) : (
//                 <Menu className="h-6 w-6" />
//               )}
//             </button>
//           </div>
//         </div>
//       </div>

//       {isMenuOpen && (
//         <div className="md:hidden">
//           <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
//             {isLoggedIn ? (
//               <MobileNavLink
//                 to="/home"
//                 icon={<Home className="h-5 w-5 mr-1" />}
//                 onClick={closeMenu}
//               >
//                 Home
//               </MobileNavLink>
//             ) : (
//               <MobileNavLink
//                 to="/"
//                 icon={<Home className="h-5 w-5 mr-1" />}
//                 onClick={closeMenu}
//               >
//                 Home
//               </MobileNavLink>
//             )}

//             {isLoggedIn ? (
//               <button
//                 onClick={handleLogout}
//                 className="text-black hover:bg-green-700 hover:text-black block px-3 py-2 rounded-md text-base font-medium w-full text-left flex items-center"
//               >
//                 <LogOut className="h-5 w-5 mr-1" />
//                 Logout
//               </button>
//             ) : (
//               <MobileNavLink
//                 to="/"
//                 icon={<LogIn className="h-5 w-5 mr-1" />}
//                 onClick={closeMenu}
//               >
//                 Login
//               </MobileNavLink>
//             )}
//           </div>
//         </div>
//       )}
//     </nav>
//   );
// };

// const NavLink = ({ to, children, icon, onClick }) => (
//   <Link
//     to={to}
//     className="text-black hover:animate-pulse hover:text-black px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
//     onClick={onClick}
//   >
//     {icon}
//     <span className="ml-1">{children}</span>
//   </Link>
// );

// const MobileNavLink = ({ to, children, icon, onClick }) => (
//   <Link
//     to={to}
//     className="text-black hover:animate-pulse hover:text-black block px-3 py-2 rounded-md text-base font-medium flex items-center"
//     onClick={onClick}
//   >
//     {icon}
//     <span className="ml-1">{children}</span>
//   </Link>
// );

// export default Navbar;
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { LogIn, LogOut } from "lucide-react";
import { toast } from "react-toastify";
import MenuButton from "./MenuButton"; // Make sure to import the MenuButton component

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
              <button
                onClick={handleLogout}
                className="text-black hover:bg-green-700 hover:text-black px-3 py-2 rounded-md text-sm font-medium flex items-center transition duration-150 ease-in-out"
              >
                <LogOut className="h-5 w-5 mr-1" />
                Logout
              </button>
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
