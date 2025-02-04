import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

interface ProtectedRouteProps {
  roleRequired?: "Admin" | "User";
  children: React.ReactNode;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({
  roleRequired,
  children,
}) => {
  const { username, role, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center text-lg">
        Loading...
      </div>
    );
  }

  if (!username) return <Navigate to="/" replace />;

  const cond1 = location.pathname === "/addBook" && role === "User";
  const cond2 = location.pathname === "/admin/borrowedBooks" && role === "User";
  const cond3 = roleRequired && role !== roleRequired;
  const cond4 = location.pathname === "/user/borrowedBooks" && role === "Admin";
  if (cond1 || cond2 || cond3 || cond4)
    return <Navigate to="/unauthorized" replace />;

  return <>{children}</>;
};
export default ProtectedRoute;
