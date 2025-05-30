import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiFetch } from '../../utils/api';

const UpdatePost = () => {
  const { id } = useParams();
  const { token, currentUser } = useAuth();
  const [form, setForm] = useState({ title: '', content: '', category: 'other' });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await apiFetch(`/api/posts/${id}`);
        const data = await res.json();
        if (res.ok) {
          setForm({ title: data.title, content: data.content, category: data.category });
        } else {
          setError(data.message || 'Failed to load post');
        }
      } catch (err) {
        setError('Failed to load post');
      }
    };
    fetchPost();
  }, [id]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    try {
      const res = await apiFetch(`/api/posts/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { Authorization: `Bearer ${token}` } : {})
        },
        body: JSON.stringify(form)
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || 'Failed to update post');
      navigate(`/posts/${id}`);
    } catch (err) {
      setError(err.message || 'Failed to update post');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-white rounded-lg shadow p-8">
      <h1 className="text-2xl font-bold text-eco-green-800 mb-6">Update Post</h1>
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
          <label className="block text-gray-700 font-medium mb-1">Content</label>
          <textarea
            name="content"
            value={form.content}
            onChange={handleChange}
            rows={6}
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
            <option value="recycling">Recycling</option>
            <option value="energy">Energy</option>
            <option value="conservation">Conservation</option>
            <option value="sustainable-living">Sustainable Living</option>
            <option value="gardening">Gardening</option>
            <option value="other">Other</option>
          </select>
        </div>
        <button
          type="submit"
          className="bg-black text-white hover:bg-gray-900 font-bold py-2 px-4 rounded"
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Post'}
        </button>
      </form>
    </div>
  );
};

export default UpdatePost;