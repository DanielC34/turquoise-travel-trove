
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, User, ChevronDown, LogOut } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useIsMobile } from "@/hooks/use-mobile";
import { AuthModal } from "./AuthModal";
import { useAuthStore } from "@/stores/useAuthStore";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuthStore();

  const handleNavigate = (path: string) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-slate-200/80 px-4 py-3 md:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center">
          <button 
            onClick={() => handleNavigate("/")}
            className="flex items-center gap-2 font-semibold text-xl"
          >
            <MapPin className="h-5 w-5 text-turquoise-500" />
            <span className="bg-gradient-to-r from-turquoise-400 to-turquoise-600 bg-clip-text text-transparent">
              TravelAI
            </span>
          </button>
        </div>

        {!isMobile ? (
          <div className="flex items-center gap-8">
            <div className="flex items-center gap-6">
              <button 
                onClick={() => handleNavigate("/")}
                className="text-gray-600 hover:text-turquoise-500 transition-colors"
              >
                Home
              </button>
              {isAuthenticated && (
                <>
                  <button 
                    onClick={() => handleNavigate("/trips")}
                    className="text-gray-600 hover:text-turquoise-500 transition-colors"
                  >
                    My Trips
                  </button>
                  <button 
                    onClick={() => handleNavigate("/explore")}
                    className="text-gray-600 hover:text-turquoise-500 transition-colors"
                  >
                    Explore
                  </button>
                </>
              )}
            </div>
            
            <div className="flex items-center gap-3">
              {isAuthenticated ? (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                      <Avatar className="h-8 w-8 border border-turquoise-200">
                        <AvatarFallback className="bg-turquoise-50 text-turquoise-700">
                          {user?.fullName.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <div className="flex items-center justify-start gap-2 p-2">
                      <div className="flex flex-col space-y-1 leading-none">
                        <p className="font-medium">{user?.fullName}</p>
                        <p className="w-[200px] truncate text-sm text-muted-foreground">
                          {user?.email}
                        </p>
                      </div>
                    </div>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleNavigate("/trips")}>
                      <MapPin className="mr-2 h-4 w-4" />
                      <span>My Trips</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => handleNavigate("/explore")}>
                      <User className="mr-2 h-4 w-4" />
                      <span>Explore</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={logout}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="border-turquoise-200 text-turquoise-700 hover:bg-turquoise-50"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Log in
                  </Button>
                  <Button 
                    className="bg-turquoise-500 hover:bg-turquoise-600 text-white"
                    onClick={() => setShowAuthModal(true)}
                  >
                    Sign up
                  </Button>
                </>
              )}
            </div>
          </div>
        ) : (
          <Sheet open={isMenuOpen} onOpenChange={setIsMenuOpen}>
            <SheetTrigger asChild>
              <Button 
                variant="ghost" 
                size="icon" 
                aria-label="Toggle menu"
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="pt-10">
              <div className="flex flex-col gap-6">
                <button 
                  onClick={() => handleNavigate("/")}
                  className="flex items-center gap-2 text-lg font-medium"
                >
                  Home
                </button>
                
                {isAuthenticated ? (
                  <>
                    <button 
                      onClick={() => handleNavigate("/trips")}
                      className="flex items-center gap-2 text-lg font-medium"
                    >
                      My Trips
                    </button>
                    <button 
                      onClick={() => handleNavigate("/explore")}
                      className="flex items-center gap-2 text-lg font-medium"
                    >
                      Explore
                    </button>
                    <div className="h-px w-full bg-gray-100 my-2"></div>
                    <div className="flex items-center gap-3 px-1 py-2">
                      <Avatar className="h-9 w-9 border border-turquoise-200">
                        <AvatarFallback className="bg-turquoise-50 text-turquoise-700">
                          {user?.fullName.charAt(0) || "U"}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-medium">{user?.fullName}</span>
                        <span className="text-sm text-muted-foreground">{user?.email}</span>
                      </div>
                    </div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={() => {
                        logout();
                        setIsMenuOpen(false);
                      }}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Log out
                    </Button>
                  </>
                ) : (
                  <>
                    <div className="h-px w-full bg-gray-100 my-2"></div>
                    <Button 
                      variant="outline" 
                      className="w-full justify-center border-turquoise-200 text-turquoise-700 hover:bg-turquoise-50"
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      Log in
                    </Button>
                    <Button 
                      className="w-full justify-center bg-turquoise-500 hover:bg-turquoise-600 text-white"
                      onClick={() => {
                        setShowAuthModal(true);
                        setIsMenuOpen(false);
                      }}
                    >
                      Sign up
                    </Button>
                  </>
                )}
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </nav>
  );
}
