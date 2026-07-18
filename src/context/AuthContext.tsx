"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface User {
  name: string;
  email: string;
  role: string;
  avatar: string;
}

interface AuthContextType {
  isLoggedIn: boolean;
  user: User | null;
  login: () => void;
  logout: () => void;
  toggleAuth: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);

  // Initialize status from localStorage if available (client side)
  useEffect(() => {
    const savedStatus = localStorage.getItem("skillforge_logged_in");
    if (savedStatus === "true") {
      setIsLoggedIn(true);
      setUser({
        name: "Rayhan Fardous",
        email: "rayhan.fardous@skillforge.ai",
        role: "Aspiring AI Engineer",
        avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
      });
    }
  }, []);

  const login = () => {
    setIsLoggedIn(true);
    const mockUser = {
      name: "Alex Mercer",
      email: "rayhan.fardous@skillforge.ai",
      role: "Aspiring AI Engineer",
      avatar: "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=150&h=150&q=80",
    };
    setUser(mockUser);
    localStorage.setItem("skillforge_logged_in", "true");
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
    localStorage.setItem("skillforge_logged_in", "false");
  };

  const toggleAuth = () => {
    if (isLoggedIn) {
      logout();
    } else {
      login();
    }
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, user, login, logout, toggleAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
