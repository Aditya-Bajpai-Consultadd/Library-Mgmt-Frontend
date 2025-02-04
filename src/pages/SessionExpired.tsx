import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
const SessionExpired = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLoginRedirect = () => {
    logout();
    navigate("/login");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 text-center p-6">
      <h1 className="text-4xl font-bold text-red-600">Session Expired</h1>
      <p className="text-lg text-gray-600 mt-2">
        Your session has expired. Please log in again to continue.
      </p>
      <button
        onClick={handleLoginRedirect}
        className="relative inline-flex mt-3 items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-red-500 rounded-xl group"
      >
        <span className="absolute top-0 right-0 inline-block w-4 h-4 transition-all duration-200 ease-in-out bg-red-700 rounded group-hover:-mr-4 group-hover:-mt-4">
          <span className="absolute top-0 right-0 w-5 h-5 rotate-45 translate-x-1/2 -translate-y-1/2 bg-white"></span>
        </span>
        <span className="absolute bottom-0 left-0 w-full h-full transition-all duration-200 ease-in-out delay-50 -translate-x-full translate-y-full bg-red-600 rounded-2xl group-hover:mb-12 group-hover:translate-x-0"></span>
        <span className="relative font-[Delius] w-full text-left text-white transition-colors duration-200 ease-in-out group-hover:text-white">
          Login Again
        </span>
      </button>
    </div>
  );
};

export default SessionExpired;
