
import { useLocation, useNavigate } from "react-router-dom";
import { Home, Map, User, Plus } from "lucide-react";
import { cn } from "@/lib/utils";

export function MobileNav() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path: string) => location.pathname === path;
  
  const navItems = [
    {
      icon: Home,
      label: "Home",
      path: "/",
    },
    {
      icon: Map,
      label: "My Trips",
      path: "/trips",
    },
    {
      icon: User,
      label: "Profile",
      path: "/profile",
    },
  ];
  
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 md:hidden bg-white border-t border-gray-200 pb-safe">
      <div className="grid grid-cols-3 h-16">
        {navItems.map((item) => (
          <button
            key={item.path}
            onClick={() => navigate(item.path)}
            className={cn(
              "flex flex-col items-center justify-center text-xs font-medium",
              isActive(item.path) 
                ? "text-turquoise-600" 
                : "text-gray-500 hover:text-gray-900"
            )}
          >
            <item.icon className="h-5 w-5 mb-1" />
            <span>{item.label}</span>
          </button>
        ))}
      </div>
      
      <button
        onClick={() => navigate("/new-trip")}
        className="absolute -top-6 left-1/2 -translate-x-1/2 w-12 h-12 rounded-full bg-turquoise-500 text-white flex items-center justify-center shadow-lg"
      >
        <Plus className="h-6 w-6" />
      </button>
    </div>
  );
}
