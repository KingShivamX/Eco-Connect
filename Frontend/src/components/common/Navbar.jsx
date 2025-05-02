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
    <nav className="text-black rounded-b-3xl shadow-lg mb-6 relative overflow-hidden" style={{ background: 'linear-gradient(120deg, #4ade80 0%, #22c55e 50%, #a3e635 100%)' }}>
      <div className="shine absolute inset-0 pointer-events-none z-0"></div>
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="flex justify-between items-center h-16">
          {/* Logo and brand name */}
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-all duration-300 transform hover:scale-105">
              <span className="text-3xl font-extrabold tracking-tight text-black float">🌿 EcoConnect</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8 animate-fade-in-up">
            <Link to="/" className="text-black font-medium transform transition-all duration-300 hover:translate-y-[-2px] relative after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              Home
            </Link>
            <Link to="/posts" className="text-black font-medium transform transition-all duration-300 hover:translate-y-[-2px] relative after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              Posts
            </Link>
            <Link to="/events" className="text-black font-medium transform transition-all duration-300 hover:translate-y-[-2px] relative after:absolute after:w-0 after:h-[2px] after:bottom-[-4px] after:left-0 after:bg-white after:transition-all after:duration-300 hover:after:w-full">
              Events
            </Link>
            {currentUser && (
              <div
                className="relative ml-4"
                onClick={() => setProfileMenuOpen(!profileMenuOpen)}
              >
                <button
                  className="flex items-center bg-eco-green-500 rounded-full px-4 py-2 hover:bg-eco-green-400 focus:outline-none shadow-md transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-lg btn-glow relative z-30"
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
                  <div className="fixed right-auto mt-2 w-48 bg-white rounded-xl shadow-xl py-2 z-[9999] animate-fade-in border-2 border-eco-green-200" style={{position: 'absolute', top: '100%'}}>
                    <Link to="/profile" className="block px-4 py-2 text-sm text-black hover:bg-eco-green-50 rounded-t-xl transition-all duration-300 hover:pl-6">My Profile</Link>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 text-sm text-black hover:bg-eco-green-50 rounded-b-xl transition-all duration-300 hover:pl-6"
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
