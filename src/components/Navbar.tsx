
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, MapPin, User, ChevronDown } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useIsMobile } from "@/hooks/use-mobile";
import { AuthModal } from "./AuthModal";

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

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
            </div>
            
            <div className="flex items-center gap-3">
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
              </div>
            </SheetContent>
          </Sheet>
        )}
      </div>

      <AuthModal open={showAuthModal} onOpenChange={setShowAuthModal} />
    </nav>
  );
}
