
import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();

  // Check if user is already logged in from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem("travelai_user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would validate credentials against a backend
      if (email && password) {
        const userData: User = {
          id: "user_" + Math.random().toString(36).substring(2, 9),
          email,
          fullName: email.split('@')[0] // Use part of email as name for demo
        };
        
        setUser(userData);
        localStorage.setItem("travelai_user", JSON.stringify(userData));
        toast.success("Successfully logged in!");
        navigate("/trips");
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const signup = async (fullName: string, email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // In a real app, you would create a user account in your backend
      if (fullName && email && password) {
        const userData: User = {
          id: "user_" + Math.random().toString(36).substring(2, 9),
          email,
          fullName
        };
        
        setUser(userData);
        localStorage.setItem("travelai_user", JSON.stringify(userData));
        toast.success("Account created successfully!");
        navigate("/trips");
      } else {
        throw new Error("Please fill in all fields");
      }
    } catch (error) {
      toast.error("Signup failed: " + (error instanceof Error ? error.message : "Unknown error"));
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("travelai_user");
    toast.success("You have been logged out");
    navigate("/");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isLoading,
        isAuthenticated: !!user,
        login,
        signup,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
