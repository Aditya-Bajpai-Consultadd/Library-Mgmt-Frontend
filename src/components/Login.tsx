import { useState, ChangeEvent, FormEvent } from "react";
import bgIMG from "../assets/libraryImgBG.jpeg";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import apiCall from "../config/ApiConfig";
import { AxiosError } from "../models/AxiosError";
export default function Login() {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const { login } = useAuth();
  const navigate = useNavigate();
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    try {
      const response = await apiCall.post("/login", { username, password });
      const token = response.data.access_token;
      if (!token) {
        console.log("No Token Received");
        throw new Error("No token received");
      }
      login(token);
      navigate("/home");
    } catch (err) {
      const customError = err as AxiosError;
      if (customError.response) {
        setError(customError.response.data.detail);
      }
    }
  };

  return (
    <div
      className="min-h-screen flex flex-col bg-gray-100"
      style={{
        backgroundImage: `url(${bgIMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav className="bg-[#264653] h-19 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-[Lato] font-bold">
          Library Management System
        </h1>
      </nav>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-2xl bg-gradient-to-b from-slate-200 to-gray-100">
          <h2 className="text-3xl font-[Lato] font-semibold text-center text-gray-700">
            Login
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block font-[Delius] text-sm font-medium text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setUsername(e.target.value)
                }
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block font-[Delius] text-sm font-medium text-gray-600"
              >
                Password
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setPassword(e.target.value)
                }
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            {error && <p className="text-red-500 text-center">{error}</p>}
            <button
              type="submit"
              className="group w-full rounded-2xl relative inline-flex h-12 items-center justify-center overflow-hidden  bg-neutral-950 px-6 font-medium text-neutral-50"
            >
              <span className="absolute h-0  rounded-full bg-blue-500 transition-all duration-300 group-hover:h-56 w-full group-hover:w-full"></span>
              <span className="relative w-full">Login</span>
            </button>
            <p className="text-sm justify-center items-end text-center">
              New here?{" "}
              <Link className="text-blue-400" to={"/register"}>
                Register
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
