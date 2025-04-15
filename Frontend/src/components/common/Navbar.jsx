import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <nav className="bg-eco-green-900 text-black rounded-b-3xl shadow-lg mb-6">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
              <span className="text-3xl font-extrabold tracking-tight text-black">🌿 EcoConnect</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className="text-black hover:text-black font-medium transition-colors">
              Home
            </Link>
            <Link to="/posts" className="text-black hover:text-black font-medium transition-colors">
              Posts
            </Link>
            <Link to="/events" className="text-black hover:text-black font-medium transition-colors">
              Events
            </Link>
            {currentUser && (
              <div
                className="relative ml-4"
                onMouseEnter={() => setProfileMenuOpen(true)}
                onMouseLeave={() => setProfileMenuOpen(false)}
              >
                <button
                  className="flex items-center bg-eco-green-800 rounded-full px-3 py-1 hover:bg-eco-green-700 focus:outline-none shadow transition"
                  aria-haspopup="true"
                  aria-expanded={profileMenuOpen}
                >
                  <span className="mr-2 font-semibold text-black">{currentUser?.name}</span>
                  <span className="bg-eco-green-200 text-black rounded-full px-2 py-0.5 text-xs font-bold">
                    {currentUser?.ecoPoints || 0} pts
                  </span>
                  <svg className="ml-2 w-4 h-4 text-black transition-colors" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7"/></svg>
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-20">
                    <Link to="/profile" className="block px-4 py-2 text-sm text-black hover:bg-eco-green-50 rounded-t-xl">My Profile</Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-black hover:bg-eco-green-50 rounded-b-xl"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={toggleMobileMenu}
              className="mobile-menu-button p-2 focus:outline-none"
            >
              <svg
                className="h-6 w-6 fill-current text-black"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
              >
                {isMobileMenuOpen ? (
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M18.278 16.864a1 1 0 0 1-1.414 1.414l-4.829-4.828-4.828 4.828a1 1 0 0 1-1.414-1.414l4.828-4.829-4.828-4.828a1 1 0 0 1 1.414-1.414l4.829 4.828 4.828-4.828a1 1 0 1 1 1.414 1.414l-4.828 4.829 4.828 4.828z"
                  />
                ) : (
                  <path
                    fillRule="evenodd"
                    d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`md:hidden ${isMobileMenuOpen ? 'block' : 'hidden'}`}>
        <div className="px-4 pt-4 pb-6 space-y-2 bg-eco-green-800 rounded-b-3xl shadow-lg">
          <Link
            to="/"
            className="block px-4 py-2 rounded-lg text-black font-semibold hover:bg-eco-green-700 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Home
          </Link>
          <Link
            to="/posts"
            className="block px-4 py-2 rounded-lg text-black font-semibold hover:bg-eco-green-700 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Posts
          </Link>
          <Link
            to="/events"
            className="block px-4 py-2 rounded-lg text-black font-semibold hover:bg-eco-green-700 transition"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            Events
          </Link>
          {currentUser && (
            <>
              <Link
                to="/profile"
                className="block px-4 py-2 rounded-lg text-black font-semibold hover:bg-eco-green-700 transition"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Profile
              </Link>
              <button
                onClick={() => {
                  handleLogout();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full text-left block px-4 py-2 rounded-lg text-black font-semibold hover:bg-eco-green-700 transition"
              >
                Logout
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
