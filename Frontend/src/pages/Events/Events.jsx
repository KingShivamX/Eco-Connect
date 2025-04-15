import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiFetch } from '../../utils/api';

const Events = () => {
  const { currentUser } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);
        const res = await apiFetch('/api/events');
        const data = await res.json();
        if (res.ok) {
          setEvents(data.events || []);
        } else {
          setError(data.message || 'Failed to fetch events');
        }
      } catch (err) {
        setError('Failed to fetch events');
      } finally {
        setLoading(false);
      }
    };
    fetchEvents();
  }, []);

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-3xl font-bold text-eco-green-800">Eco Events</h1>
        <Link
          to="/events/create"
          className="bg-black hover:bg-gray-900 text-white px-4 py-2 rounded-lg font-medium shadow"
        >
          + New Event
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-eco-green-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-red-700 px-4 py-3 rounded mb-4">{error}</div>
      ) : events.length === 0 ? (
        <div className="text-gray-500 py-8 text-center">No events yet. Be the first to create one!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map(event => (
            <div key={event._id} className="relative group">
              <Link
                to={`/events/${event._id}`}
                className="block bg-white rounded-lg shadow hover:shadow-lg transition-shadow border border-eco-green-100 p-6"
              >
                <h2 className="text-xl font-semibold text-eco-green-800 mb-2 line-clamp-2">{event.title}</h2>
                <p className="text-gray-600 mb-4 line-clamp-3">{event.description?.substring(0, 180)}...</p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  <span className="capitalize">{event.category}</span>
                </div>
              </Link>
              {/* Delete button for organizer or admin */}
              {(event.organizer && currentUser && event.organizer._id === currentUser.id) || (currentUser && currentUser.role === 'admin') ? (
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    if (window.confirm('Are you sure you want to delete this event?')) {
                      const token = localStorage.getItem('eco_token');
                      await apiFetch(`/api/events/${event._id}`, {
                        method: 'DELETE',
                        headers: {
                          ...(token ? { Authorization: `Bearer ${token}` } : {})
                        }
                      });
                      // Refresh events
                      setEvents(events => events.filter(ev => ev._id !== event._id));
                    }
                  }}
                  className="absolute top-2 left-2 bg-red-600 hover:bg-red-800 text-white text-xs px-3 py-1 rounded shadow z-10"
                >
                  Delete
                </button>
              ) : null}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
