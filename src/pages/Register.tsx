import { ChangeEvent, FormEvent, useState } from "react";
import bgIMG from "../assets/libraryImgBG.jpeg";
import apiCall from "../config/ApiConfig";
import RegisterUser from "../models/RegisterReqModel";
import { Link, useNavigate } from "react-router-dom";
import { AxiosError } from "../models/AxiosError";

export default function Register() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();
  const [registerReq, setRegisterReq] = useState<RegisterUser>({
    username: "",
    password: "",
    role: "User",
  });
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setRegisterReq((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);
    try {
      await apiCall.post("/register", registerReq);
      setRegisterReq({ username: "", password: "", role: "User" });
      navigate("/");
    } catch (err) {
      const customError = err as AxiosError;
      if (customError.response) setError(customError.response.data.detail);
      else if (customError.request)
        console.error("No response received:", customError.request);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex  flex-col bg-gray-100"
      style={{
        backgroundImage: `url(${bgIMG})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <nav className="bg-[#264653] h-16 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-2xl font-[Lato] font-bold">
          Library Management System
        </h1>
      </nav>
      <div className="flex-1 flex items-center justify-center ">
        <div className="w-full max-w-md p-8 space-y-6 bg-white shadow-md rounded-2xl bg-gradient-to-b from-slate-200 to-gray-100">
          <h2 className="text-3xl font-[Lato] font-semibold text-center text-gray-700">
            Register
          </h2>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label
                htmlFor="username"
                className="block font-[Delius] text-sm font-bold text-gray-600"
              >
                Username
              </label>
              <input
                type="text"
                name="username"
                value={registerReq.username}
                onChange={handleChange}
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
                name="password"
                value={registerReq.password}
                onChange={handleChange}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>
            <div>
              <label className="block font-[Delius] text-sm font-medium text-gray-600">
                Role
              </label>
              <div className="mt-2 flex items-center">
                <label className="flex items-center font-[Delius] mr-4">
                  <input
                    type="radio"
                    name="role"
                    value="Admin"
                    checked={registerReq.role === "Admin"}
                    onChange={handleChange}
                    className="mr-2 "
                  />
                  Admin
                </label>
                <label className="flex items-center font-[Delius]">
                  <input
                    type="radio"
                    name="role"
                    value="User"
                    checked={registerReq.role === "User"}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  User
                </label>
              </div>
            </div>
            {error && (
              <p className="text-red-500 text-sm text-center">{error}</p>
            )}
            <button
              disabled={loading}
              type="submit"
              className="group w-full relative inline-flex h-12 items-center justify-center overflow-hidden rounded-2xl bg-neutral-950 px-6 font-medium text-neutral-50"
            >
              <span className="absolute h-0 w-full rounded-full bg-blue-500 transition-all duration-300 group-hover:h-56 group-hover:w-full"></span>
              <span className="relative">
                {loading ? "Registering..." : "Register"}
              </span>
            </button>
            <p className="text-sm justify-center items-end text-center">
              Already Registered?{" "}
              <Link className="text-blue-400" to={"/login"}>
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}
