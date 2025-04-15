import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { apiFetch } from '../../utils/api';

const EventDetail = () => {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(`/api/events/${id}`);
        const data = await res.json();
        if (res.ok) {
          setEvent(data);
        } else {
          setError(data.message || 'Failed to fetch event');
        }
      } catch (err) {
        setError('Failed to fetch event');
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

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

  if (!event) {
    return <div className="text-gray-500 py-8 text-center">Event not found.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 border border-eco-green-100">
      <h1 className="text-3xl font-bold text-eco-green-800 mb-4">{event.title}</h1>
      <div className="flex items-center mb-6 text-sm text-gray-500">
        <span>{new Date(event.date).toLocaleDateString()}</span>
        <span className="mx-2">•</span>
        <span>{event.location}</span>
        <span className="mx-2">•</span>
        <span className="capitalize">{event.category}</span>
      </div>
      <div className="text-lg text-gray-700 mb-8 whitespace-pre-line">
        {event.description}
      </div>
      <div className="mb-4 flex flex-wrap gap-2">
        <span className="bg-leaf-yellow-100 text-leaf-yellow-800 px-3 py-1 rounded-full text-xs font-medium">
          {event.ecoPointsReward} eco points
        </span>
        <span className="bg-eco-green-100 text-eco-green-800 px-3 py-1 rounded-full text-xs font-medium">
          {event.attendees?.length || 0} Attending
        </span>
      </div>
      <div className="mt-8">
        <Link to="/events" className="text-eco-green-600 hover:text-eco-green-800 font-medium">← Back to Events</Link>
      </div>
    </div>
  );
};

export default EventDetail;
