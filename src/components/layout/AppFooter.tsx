import React from 'react';
import { Link } from 'react-router-dom';
import { Heart } from 'lucide-react'; // Doraemon theme accent

const AppFooter: React.FC = () => {
  console.log('AppFooter loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-100 border-t border-t-blue-300 text-gray-700">
      <div className="container mx-auto py-6 px-4 md:px-6 text-sm">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-center md:text-left">
            &copy; {currentYear} Doraemon Health. All rights reserved.
          </p>
          <nav className="flex gap-4 sm:gap-6">
            <Link to="/terms" className="hover:text-blue-600 hover:underline transition-colors">
              Terms of Service
            </Link>
            <Link to="/privacy" className="hover:text-blue-600 hover:underline transition-colors">
              Privacy Policy
            </Link>
          </nav>
          <div className="flex items-center gap-1 text-blue-500">
            <span>Made with</span>
            <Heart className="h-4 w-4 fill-current text-red-500" />
            <span>for better health</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default AppFooter;