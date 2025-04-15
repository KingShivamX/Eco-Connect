import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-eco-green-900 text-black rounded-t-3xl shadow-lg mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo and Description */}
          <div className="flex flex-col space-y-3">
            <Link to="/" className="flex items-center space-x-2 mb-2 hover:opacity-90 transition-opacity">
              <span className="text-3xl font-extrabold tracking-tight text-black">🌿 EcoConnect</span>
            </Link>
            <p className="text-black text-sm leading-relaxed">
              Connecting eco-conscious individuals and communities for a greener tomorrow.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-black">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-black hover:text-black transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/posts" className="text-black hover:text-black transition-colors">
                  Posts
                </Link>
              </li>
              <li>
                <Link to="/events" className="text-black hover:text-black transition-colors">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/profile" className="text-black hover:text-black transition-colors">
                  My Profile
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-black">Categories</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/posts?category=recycling" className="text-black hover:text-black transition-colors">
                  Recycling
                </Link>
              </li>
              <li>
                <Link to="/posts?category=energy" className="text-black hover:text-black transition-colors">
                  Energy
                </Link>
              </li>
              <li>
                <Link to="/posts?category=conservation" className="text-black hover:text-black transition-colors">
                  Conservation
                </Link>
              </li>
              <li>
                <Link to="/posts?category=sustainable-living" className="text-black hover:text-black transition-colors">
                  Sustainable Living
                </Link>
              </li>
              <li>
                <Link to="/posts?category=gardening" className="text-black hover:text-black transition-colors">
                  Gardening
                </Link>
              </li>
            </ul>
          </div>

          {/* Environmental quotes */}
          <div className="col-span-1">
            <h3 className="text-lg font-semibold mb-4 text-black">Eco Inspiration</h3>
            <blockquote className="italic text-black text-sm border-l-4 border-white pl-4">
              "The Earth does not belong to us: we belong to the Earth."
              <footer className="mt-1 text-black">— Marlee Matlin</footer>
            </blockquote>
            <blockquote className="italic text-black text-sm border-l-4 border-white pl-4 mt-4">
              "We won't have a society if we destroy the environment."
              <footer className="mt-1 text-black">— Margaret Mead</footer>
            </blockquote>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white text-center text-black text-sm">
          <p>&copy; {new Date().getFullYear()} EcoConnect. All rights reserved.</p>
          <p className="mt-2">Made with 💚 for a greener planet</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
