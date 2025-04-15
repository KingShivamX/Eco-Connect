import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Link } from 'react-router-dom';

const AuthLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-eco-green-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-green-600"></div>
      </div>
    );
  }
  
  // Redirect to home if already authenticated
  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  
  return (
    <div className="min-h-screen bg-gradient-to-br from-eco-green-50 to-eco-green-100 flex flex-col">
      {/* Logo header */}
      <header className="container mx-auto py-8 px-4">
        <Link to="/" className="flex items-center space-x-2 hover:opacity-90 transition-opacity">
          <span className="text-3xl font-extrabold tracking-tight text-eco-green-700">🌿 EcoConnect</span>
        </Link>
      </header>
      
      {/* Auth form container */}
      <main className="flex-grow max-w-xl w-full mx-auto px-4 py-10 md:py-16 text-black">
        <div className="w-full max-w-md p-8 mx-auto bg-white/90 rounded-3xl shadow-lg border border-eco-green-100">
          <Outlet />
        </div>
      </main>
      
      {/* Simple footer */}
      <footer className="bg-eco-green-900 text-white py-4 rounded-t-2xl shadow-inner mt-10">
        <div className="container mx-auto px-4 text-center text-eco-green-100 text-sm">
          <p>&copy; {new Date().getFullYear()} EcoConnect &mdash; Connecting eco-conscious minds</p>
        </div>
      </footer>
    </div>
  );
};

export default AuthLayout;
