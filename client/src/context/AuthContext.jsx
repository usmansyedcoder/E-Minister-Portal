import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  // 🔥 FIX: Use environment variable for API URL
  const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

  // Set axios default header
  if (token) {
    axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  }

  useEffect(() => {
    const loadUser = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await axios.get(`${API_URL}/auth/me`);
        setUser(res.data.user);
      } catch (error) {
        localStorage.removeItem("token");
        setToken(null);
        delete axios.defaults.headers.common["Authorization"];
        toast.error("Session expired. Please login again.");
      }
      setLoading(false);
    };

    loadUser();
  }, [token]);

  const login = async (email, password) => {
    try {
      const res = await axios.post(`${API_URL}/api/auth/login`, {
        email,
        password,
      });

      localStorage.setItem("token", res.data.token);
      setToken(res.data.token);
      axios.defaults.headers.common["Authorization"] =
        `Bearer ${res.data.token}`;
      setUser(res.data.user);
      toast.success("Login successful!");
      return { success: true };
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
      return { success: false, error: error.response?.data?.message };
    }
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
    delete axios.defaults.headers.common["Authorization"];
    toast.info("Logged out successfully");
  };

  const value = {
    user,
    login,
    logout,
    loading,
    isAuthenticated: !!user,
    isMinister: user?.role === "minister",
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
