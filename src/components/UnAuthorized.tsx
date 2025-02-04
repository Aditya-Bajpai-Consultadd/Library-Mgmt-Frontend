import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const UnAuthorized = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-6xl font-bold text-red-600">403</h1>
      <h2 className="text-2xl font-semibold text-gray-800 mt-4">
        Forbidden - Unauthorized Access
      </h2>
      <p className="text-lg text-gray-600 mt-2">
        You don’t have permission to view this page.
      </p>
      <button
        onClick={() => {
          logout();
          navigate("/");
        }}
        className="relative mt-3 rounded px-5 py-2.5 overflow-hidden group bg-blue-400  hover:bg-gradient-to-r hover:from-blue-400 hover:to-blue-300 text-white hover:ring-2 hover:ring-offset-2 hover:ring-blue-300 transition-all ease-out duration-200"
      >
        <span className="absolute right-0 w-8 h-32 -mt-12 transition-all duration-1000 transform translate-x-12 bg-white opacity-10 rotate-12 group-hover:-translate-x-40 ease"></span>
        <span className="relative">View Borrowed Books</span>
      </button>
    </div>
  );
};

export default UnAuthorized;
