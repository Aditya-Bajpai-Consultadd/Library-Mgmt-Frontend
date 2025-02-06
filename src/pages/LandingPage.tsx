import "./styles/Home.css";
import bgImage from "../assets/libraryImgBG.jpeg";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useEffect } from "react";

export default function LandingPage() {
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const checkLogin = () => {
      const token = localStorage.getItem("token");
      if (token) {
        logout();
      }
    };
    checkLogin();
  });

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{
        backgroundImage: `url(${bgImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav
        id="navBar"
        className="bg-[#264653]  text-white p-4 flex justify-between items-center shadow-md"
      >
        <h1 className="text-2xl font-[Lato] font-bold">
          Library Management System
        </h1>
        <div className="space-x-4"></div>
      </nav>
      <div className="flex-1  flex flex-col items-center justify-center text-center p-8 text-white">
        <h2 className="text-3xl font-[Lato] font-semibold mb-4">
          Welcome to the Library Management System
        </h2>
        <p className="text-lg font-[Delius] max-w-2xl">
          Our system helps manage book records, borrowing, and returns
          efficiently. Users can explore available books, borrow them, and
          return them seamlessly.
        </p>
        <div className="mt-6 space-x-4">
          <button
            onClick={() => navigate("/login")}
            className="relative h-12 overflow-hidden rounded bg-neutral-950 px-5 py-2.5 text-white transition-all duration-300 hover:bg-neutral-800 hover:ring-2 hover:ring-neutral-800 hover:ring-offset-2"
          >
            <span className="relative">Login</span>
          </button>
          <button
            onClick={() => navigate("/register")}
            className="group relative inline-flex h-12 items-center justify-center overflow-hidden rounded-md bg-neutral-950 px-6 font-medium text-neutral-200"
          >
            <span>Register</span>
            <div className="ml-1 transition group-hover:translate-x-1">
              <svg
                width="15"
                height="15"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
              >
                <path
                  d="M8.14645 3.14645C8.34171 2.95118 8.65829 2.95118 8.85355 3.14645L12.8536 7.14645C13.0488 7.34171 13.0488 7.65829 12.8536 7.85355L8.85355 11.8536C8.65829 12.0488 8.34171 12.0488 8.14645 11.8536C7.95118 11.6583 7.95118 11.3417 8.14645 11.1464L11.2929 8H2.5C2.22386 8 2 7.77614 2 7.5C2 7.22386 2.22386 7 2.5 7H11.2929L8.14645 3.85355C7.95118 3.65829 7.95118 3.34171 8.14645 3.14645Z"
                  fill="currentColor"
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
}
