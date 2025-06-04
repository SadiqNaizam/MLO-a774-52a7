import React from 'react';
import { Link } from 'react-router-dom'; // Assuming react-router-dom
import { UtensilsCrossed, Facebook, Twitter, Instagram } from 'lucide-react'; // Placeholder logo and social icons

const Footer: React.FC = () => {
  console.log("Rendering Footer");
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200 mt-12">
      <div className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Column 1: Brand/Logo */}
          <div className="mb-6 md:mb-0">
            <Link to="/" className="flex items-center text-xl font-bold text-orange-500 mb-2">
              <UtensilsCrossed className="h-7 w-7 mr-2" />
              FoodieApp
            </Link>
            <p className="text-sm text-gray-500">
              Your favorite meals, delivered fast.
            </p>
          </div>

          {/* Column 2: Quick Links */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Quick Links
            </h3>
            <ul className="space-y-2">
              <li><Link to="/about" className="text-sm text-gray-600 hover:text-orange-500">About Us</Link></li>
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-orange-500">Contact</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-orange-500">FAQ</Link></li>
              <li><Link to="/careers" className="text-sm text-gray-600 hover:text-orange-500">Careers</Link></li>
            </ul>
          </div>

          {/* Column 3: Legal */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Legal
            </h3>
            <ul className="space-y-2">
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-orange-500">Terms of Service</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-orange-500">Privacy Policy</Link></li>
            </ul>
          </div>
          
          {/* Column 4: Social Media */}
          <div>
            <h3 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">
              Follow Us
            </h3>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-orange-500"><span className="sr-only">Facebook</span><Facebook className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500"><span className="sr-only">Twitter</span><Twitter className="h-5 w-5" /></a>
              <a href="#" className="text-gray-400 hover:text-orange-500"><span className="sr-only">Instagram</span><Instagram className="h-5 w-5" /></a>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 border-t border-gray-200 pt-8 text-center">
          <p className="text-sm text-gray-500">
            &copy; {currentYear} FoodieApp Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
export default Footer;