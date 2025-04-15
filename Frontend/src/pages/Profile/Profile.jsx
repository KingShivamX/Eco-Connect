import { useEffect, useState } from 'react';

import { useAuth } from '../../context/AuthContext';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const { token } = useAuth();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        setLoading(true);
        const res = await fetch('http://localhost:5000/api/auth/me', {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        });
        const data = await res.json();
        if (res.ok) {
          setUser(data);
        } else {
          setError(data.message || 'Failed to fetch profile');
        }
      } catch (err) {
        setError('Failed to fetch profile');
      } finally {
        setLoading(false);
      }
    };
    fetchProfile();
  }, [token]);

  if (loading) {
    return (
      <div className="flex justify-center py-16">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-eco-green-600"></div>
      </div>
    );
  }

  if (error) {
    return <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>;
  }

  if (!user) {
    return <div className="text-gray-500 py-8 text-center">User not found.</div>;
  }

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow-md p-8 border border-eco-green-100">
      <h1 className="text-3xl font-bold text-eco-green-800 mb-4">My Profile</h1>
      <div className="mb-6">
        <div className="text-lg font-semibold text-eco-green-700">{user.name}</div>
        <div className="text-gray-600">{user.email}</div>
      </div>
      <div className="mb-6">
        <span className="bg-eco-green-100 text-eco-green-800 px-3 py-1 rounded-full text-xs font-medium">
          Eco Points: {user.ecoPoints || 0}
        </span>
      </div>
      <div className="text-gray-700">
        <p>Member since: {user.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
      </div>
    </div>
  );
};

export default Profile;
