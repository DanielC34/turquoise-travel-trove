
import { create } from 'zustand';
import { toast } from 'sonner';

interface User {
  id: string;
  email: string;
  fullName: string;
}

interface AuthState {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (fullName: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  initialize: () => void;
}

export const useAuthStore = create<AuthState>((set, get) => ({
  user: null,
  isLoading: true,
  isAuthenticated: false,
  
  initialize: () => {
    // Check if user is already logged in from localStorage
    const storedUser = localStorage.getItem("travelai_user");
    if (storedUser) {
      set({ user: JSON.parse(storedUser), isAuthenticated: true });
    }
    set({ isLoading: false });
  },
  
  login: async (email: string, password: string) => {
    set({ isLoading: true });
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
        
        set({ user: userData, isAuthenticated: true });
        localStorage.setItem("travelai_user", JSON.stringify(userData));
        toast.success("Successfully logged in!");
        return Promise.resolve();
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (error) {
      toast.error("Login failed: " + (error instanceof Error ? error.message : "Unknown error"));
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  signup: async (fullName: string, email: string, password: string) => {
    set({ isLoading: true });
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
        
        set({ user: userData, isAuthenticated: true });
        localStorage.setItem("travelai_user", JSON.stringify(userData));
        toast.success("Account created successfully!");
        return Promise.resolve();
      } else {
        throw new Error("Please fill in all fields");
      }
    } catch (error) {
      toast.error("Signup failed: " + (error instanceof Error ? error.message : "Unknown error"));
      return Promise.reject(error);
    } finally {
      set({ isLoading: false });
    }
  },
  
  logout: () => {
    set({ user: null, isAuthenticated: false });
    localStorage.removeItem("travelai_user");
    toast.success("You have been logged out");
  }
}));
