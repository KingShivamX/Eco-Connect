import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiFetch } from '../../utils/api';

const UpdateEvent = () => {
  const { id } = useParams();
  const { token } = useAuth();
  const [form, setForm] = useState({ title: '', description: '', date: '', location: '', category: 'other' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await apiFetch(`/api/events/${id}`);
        const data = await res.json();
        if (res.ok) {
          setForm({
            title: data.title,
            description: data.description,
            date: new Date(data.date).toISOString().slice(0, 10),
            location: data.location,
            category: data.category
          });
        } else {
          setError(data.message || 'Failed to load event');
        }
      } catch (err) {
        setError('Failed to load event');
      }
    };
    fetchEvent();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch(`/api/events/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update event');
      navigate(`/events/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update event');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8">
      <h1 className="text-2xl font-bold text-eco-green-800 mb-6">Update Event</h1>
      {error && <div className="bg-red-100 text-red-700 px-4 py-2 rounded mb-4">{error}</div>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700 font-medium mb-1">Title</label>
          <input
            type="text"
            name="title"
            value={form.title}
            onChange={handleChange}
            className="w-full border border-eco-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Description</label>
          <textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-eco-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Date</label>
          <input
            type="date"
            name="date"
            value={form.date}
            onChange={handleChange}
            className="w-full border border-eco-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Location</label>
          <input
            type="text"
            name="location"
            value={form.location}
            onChange={handleChange}
            className="w-full border border-eco-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green-400"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-1">Category</label>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-eco-green-200 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-eco-green-400"
          >
            <option value="cleanup">Cleanup</option>
            <option value="workshop">Workshop</option>
            <option value="seminar">Seminar</option>
            <option value="volunteer">Volunteer</option>
            <option value="planting">Planting</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-black text-white hover:bg-gray-900 font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Event'}
        </button>
      </form>
    </div>
  );
};

export default UpdateEvent;
