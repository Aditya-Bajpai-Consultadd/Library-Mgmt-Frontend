import React, { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import AuthContextType from "../models/AuthContextType";

interface DecodedToken {
  sub: string;
  role: "Admin" | "User";
}
export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [username, setUsername] = useState<string | null>(null);
  const [role, setRole] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: DecodedToken = jwtDecode(token);
        setUsername(decoded.sub);
        setRole(decoded.role);
      } catch (error) {
        console.error("Invalid token:", error);
        logout();
      }
    }
    setLoading(false);
  }, []);

  const login = (token: string) => {
    localStorage.setItem("token", token);
    try {
      const decoded: DecodedToken = jwtDecode(token);
      setUsername(decoded.sub);
      setRole(decoded.role);
    } catch (error) {
      console.error("Invalid token at login:", error);
      logout();
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setUsername(null);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ username, role, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};
