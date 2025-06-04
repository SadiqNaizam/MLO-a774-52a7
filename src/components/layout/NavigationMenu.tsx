import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom for navigation
import { Button } from '@/components/ui/button';
import { Menu, ShoppingCart, User, X, UtensilsCrossed } from 'lucide-react'; // Added UtensilsCrossed as a placeholder logo

interface NavigationMenuProps {
  cartItemCount?: number; // Optional: to display number of items in cart
}

const NavigationMenu: React.FC<NavigationMenuProps> = ({ cartItemCount = 0 }) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  console.log("Rendering NavigationMenu, mobileOpen:", isMobileMenuOpen);

  const toggleMobileMenu = () => {
    console.log("Toggling mobile menu");
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const navLinks = [
    { href: '/', label: 'Discover' },
    { href: '/orders', label: 'My Orders' },
    { href: '/profile', label: 'Profile' },
  ];

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center text-2xl font-bold text-orange-500">
            <UtensilsCrossed className="h-8 w-8 mr-2" />
            <span>FoodieApp</span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-gray-700 hover:text-orange-500 px-3 py-2 rounded-md text-sm font-medium"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Icons and Mobile Menu Button */}
          <div className="flex items-center">
            <Link to="/cart" className="relative mr-4">
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-6 w-6 text-gray-700 hover:text-orange-500" />
                {cartItemCount > 0 && (
                  <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                    {cartItemCount}
                  </span>
                )}
              </Button>
            </Link>
            <Link to="/profile" className="hidden md:block">
              <Button variant="ghost" size="icon" aria-label="User Profile">
                <User className="h-6 w-6 text-gray-700 hover:text-orange-500" />
              </Button>
            </Link>
            <div className="md:hidden">
              <Button variant="ghost" size="icon" onClick={toggleMobileMenu} aria-label="Open menu">
                {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white shadow-lg z-40">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                onClick={() => setIsMobileMenuOpen(false)} // Close menu on link click
                className="text-gray-700 hover:bg-orange-50 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                {link.label}
              </Link>
            ))}
            <Link
                to="/profile"
                onClick={() => setIsMobileMenuOpen(false)}
                className="text-gray-700 hover:bg-orange-50 hover:text-orange-500 block px-3 py-2 rounded-md text-base font-medium"
              >
                Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};
export default NavigationMenu;