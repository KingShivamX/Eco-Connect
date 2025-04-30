import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
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
            <div key={event._id} className="relative bg-white rounded-lg shadow-md p-6 mb-6 border border-eco-green-100">
              <Link to={`/events/${event._id}`} className="block hover:underline">
                <h2 className="text-xl font-bold text-eco-green-800 mb-2">{event.title}</h2>
                <div className="flex items-center mb-2 text-sm text-gray-500">
                  <span>{new Date(event.date).toLocaleDateString()}</span>
                  <span className="mx-2">•</span>
                  <span>{event.location}</span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">{event.category}</span>
                </div>
                <p className="text-gray-700 mb-2 line-clamp-3">{event.description}</p>
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Events;
