import { Outlet, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import Navbar from '../components/common/Navbar';
import Footer from '../components/common/Footer';

const MainLayout = () => {
  const { isAuthenticated, loading } = useAuth();
  const [mounted, setMounted] = useState(false);
  
  useEffect(() => {
    setMounted(true);
    // Add cursor glow effect
    const cursor = document.createElement('div');
    cursor.classList.add('cursor-glow');
    document.body.appendChild(cursor);
    
    const moveCursor = (e) => {
      cursor.style.left = `${e.clientX}px`;
      cursor.style.top = `${e.clientY}px`;
    };
    
    document.addEventListener('mousemove', moveCursor);
    
    return () => {
      document.removeEventListener('mousemove', moveCursor);
      if (cursor.parentNode) {
        document.body.removeChild(cursor);
      }
    };
  }, []);
  
  // Show loading indicator with a colorful animation while checking authentication
  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen animated-gradient">
        <div className="blob bg-white/20 w-24 h-24 flex items-center justify-center p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-b-4 border-white"></div>
        </div>
        <p className="mt-4 text-white font-bold text-xl animate-pulse">Loading...</p>
      </div>
    );
  }
  
  // Redirect to login if not authenticated
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }
  
  return (
    <div className={`flex flex-col min-h-screen ${mounted ? 'opacity-100' : 'opacity-0'}`} 
         style={{ transition: 'opacity 0.5s ease-in-out', background: 'linear-gradient(-45deg, #4ade80, #22c55e, #86efac, #a3e635, #d9f99d)', backgroundSize: '400% 400%', animation: 'gradient 15s ease infinite' }}>
      <div className="shine w-full h-full absolute pointer-events-none"></div>
      <Navbar />
      <main className="flex-grow max-w-5xl w-full mx-auto px-4 py-10 md:py-14 text-black relative z-10">
        <div className="bg-white/90 backdrop-blur-sm rounded-3xl shadow-2xl p-6 md:p-10 min-h-[60vh] transition-all duration-500 animate-fade-in-up">
          <Outlet />
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout;
