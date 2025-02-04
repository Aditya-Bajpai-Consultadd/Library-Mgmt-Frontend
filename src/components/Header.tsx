import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Header = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-[#264653] text-white p-4 flex justify-between items-center shadow-md">
      <h1 className="text-2xl font-[Lato] font-bold">
        Library Management System
      </h1>
      <button
        onClick={handleLogout}
        className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
      >
        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-200 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
          <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
        </span>
        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-200 ease-in-out delay-50 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
        <span className="relative font-[Delius] w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
          Logout
        </span>
      </button>
    </nav>
  );
};
export default Header;
