
import { Navigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const { isAuthenticated, isLoading } = useAuth();

  // Show loading state
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-pulse text-turquoise-500">Loading...</div>
      </div>
    );
  }

  // Redirect if not authenticated
  if (!isAuthenticated) {
    toast.error("Please log in to access this page");
    return <Navigate to="/" replace />;
  }

  // Render children if authenticated
  return <>{children}</>;
};
