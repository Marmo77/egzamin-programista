// src/components/Layout/Navbar.tsx
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { AppConstants } from "@/data/constants";
import { GraduationCap, Menu, Moon, Sun, X } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function Navbar() {
  const [theme, setTheme] = useState<"light" | "dark">("light");
  const themeColors = [
    {
      name: "light",
      bg: "#fff",
      text: "#000",
    },
    {
      name: "dark",
      bg: "#000",
      text: "#fff",
    },
  ];

  useEffect(() => {
    // Check for saved theme preference or default to light
    const savedTheme = localStorage.getItem("theme") as "light" | "dark" | null;

    const initialTheme = savedTheme || "light";
    setTheme(initialTheme);

    if (initialTheme === "dark") {
      document.documentElement.classList.add("dark");
    }
  }, []);

  const themeChangeNotification = (theme: string) => {
    const themeName = theme === "light" ? "jasny" : "ciemny";

    const themeColor = themeColors.find((t) => t.name === theme);

    toast.success("Zmieniono motyw na " + themeName + "!", {
      duration: 2000,
      richColors: false,
      position: "bottom-right",
      style: {
        background: themeColor?.bg,
        color: themeColor?.text,
        border: "1px solid " + themeColor?.bg,
      },
    });
  };

  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    localStorage.setItem("theme", newTheme);

    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }

    themeChangeNotification(newTheme);
  };

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleOpenMobileMenu = () => {
    setMobileMenuOpen(true);
  };
  const handleCloseMobileMenu = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 flex justify-center">
      <div className="flex h-16 w-6xl items-center justify-between max-lg:px-6 z-50">
        {/* Logo */}
        <div className="flex items-center gap-3 z-50">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <GraduationCap className="w-5 h-5 text-white" />
          </div>
          <Link to={"/"}>
            <h1 className="text-primary font-semibold hover:text-blue-600 transition-colors">
              {AppConstants.Website.Title}
            </h1>
          </Link>
          <Badge variant="secondary" className="hidden sm:inline-flex">
            v{AppConstants.Website.version}
          </Badge>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 z-50">
          <Link
            to={AppConstants.Navigation.Theory}
            className="text-primary/85 hover:text-primary transition-colors font-medium"
          >
            Teoria
          </Link>
          <Link
            to={AppConstants.Navigation.Practice}
            className="text-primary/90 hover:text-primary transition-colors font-medium"
          >
            Praktyka
          </Link>
        </nav>

        {/* Mobile Menu Overlay */}
        {mobileMenuOpen && (
          <>
            {/* Backdrop - positioned below navbar but above page content */}
            <div
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40 mt-16"
              onClick={handleCloseMobileMenu}
            />

            {/* Mobile Menu - positioned below navbar */}
            <nav className="fixed top-16 left-0 right-0 z-40 bg-background/95 backdrop-blur-md supports-[backdrop-filter]:bg-background/90 border-b border-gray-200 dark:border-gray-700 shadow-2xl animate-in slide-in-from-top-8 duration-300">
              <div className="px-6 py-8 space-y-8">
                {/* Navigation Links */}
                <div className="space-y-6">
                  <Link
                    to={AppConstants.Navigation.Theory}
                    className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 py-3 border-b border-gray-100 dark:border-gray-800"
                    onClick={handleCloseMobileMenu}
                  >
                    <span>Teoria</span>
                    <div className="w-2 h-2 bg-blue-600 rounded-full" />
                  </Link>

                  <Link
                    to={AppConstants.Navigation.Practice}
                    className="flex items-center justify-between text-lg font-semibold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition-all duration-200 py-3 border-b border-gray-100 dark:border-gray-800"
                    onClick={handleCloseMobileMenu}
                  >
                    <span>Praktyka</span>
                    <div className="w-2 h-2 bg-green-500 rounded-full" />
                  </Link>
                </div>

                {/* Mobile Actions */}
                <div className="space-y-4 pt-4 border-t border-gray-100 dark:border-gray-800">
                  {/* Theme Toggle for Mobile */}
                  <Button
                    variant="outline"
                    size="lg"
                    onClick={() => {
                      toggleTheme();
                      handleCloseMobileMenu();
                    }}
                    className="w-full justify-between py-6 text-base min-sm:hidden font-medium bg-background/50 backdrop-blur-sm"
                  >
                    <span>Zmień motyw</span>
                    {theme === "light" ? (
                      <Moon className="h-5 w-5" />
                    ) : (
                      <Sun className="h-5 w-5" />
                    )}
                  </Button>

                  {/* CTA Button for Mobile */}
                  <Link
                    to={AppConstants.Navigation.Theory}
                    className="block"
                    onClick={handleCloseMobileMenu}
                  >
                    <Button
                      size="lg"
                      className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 text-base font-semibold transition-all duration-200 hover:scale-105 shadow-lg"
                    >
                      Rozpocznij test
                    </Button>
                  </Link>
                </div>

                {/* Version Info */}
                <div className="text-center pt-4">
                  <Badge
                    variant="outline"
                    className="text-xs bg-background/50 backdrop-blur-sm"
                  >
                    v{AppConstants.Website.version}
                  </Badge>
                </div>
              </div>
            </nav>
          </>
        )}

        {/* Right side buttons */}
        <div className="flex items-center gap-2">
          {/* Theme Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTheme}
            className="hidden sm:inline-flex"
            aria-label="Toggle theme"
          >
            {theme === "light" ? (
              <Moon className="h-4 w-4" />
            ) : (
              <Sun className="h-4 w-4" />
            )}
          </Button>

          {/* CTA Button */}
          <Link
            to={AppConstants.Navigation.Theory}
            className="flex items-center max-sm:hidden"
          >
            <Button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium transition-all duration-200 hover:scale-105">
              Rozpocznij test
            </Button>
          </Link>

          {/* Mobile menu button */}
          <Button
            variant="ghost"
            size="sm"
            className="md:hidden"
            onClick={
              mobileMenuOpen ? handleCloseMobileMenu : handleOpenMobileMenu
            }
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>
    </header>
  );
}
