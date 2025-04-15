import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  
  // Show loading indicator while checking authentication
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-eco-green-50">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-eco-green-600"></div>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-eco-green-50 to-eco-green-100">
      <Navbar />
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-10 md:py-14 text-black">
        <div className="bg-white/90 rounded-3xl shadow-lg p-6 md:p-10 min-h-[60vh]">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
