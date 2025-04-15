import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { apiFetch } from '../../utils/api';

const Posts = () => {
  const { currentUser } = useAuth();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        setLoading(true);
        const res = await apiFetch('/api/posts');
        const data = await res.json();
        if (res.ok) {
          setPosts(data.posts || []);
        } else {
          setError(data.message || 'Failed to fetch posts');
        }
      } catch (err) {
        setError('Failed to fetch posts');
      } finally {
        setLoading(false);
      }
    };
    fetchPosts();
  }, []);

  return (
    <div className="space-y-10">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-extrabold text-black tracking-tight">Eco Posts</h1>
        <Link
          to="/posts/create"
          className="bg-eco-green-700 hover:bg-eco-green-800 text-black px-6 py-3 rounded-xl font-semibold shadow-md transition-colors"
        >
          + New Post
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-eco-green-600"></div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-black px-4 py-3 rounded mb-4">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-black py-8 text-center">No posts yet. Be the first to share!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post) => (
            <div key={post._id} className="relative group">
              <Link
                to={`/posts/${post._id}`}
                className="block bg-white/90 rounded-2xl shadow-lg hover:shadow-xl transition-shadow border border-eco-green-100 p-7 group overflow-hidden"
              >
                <div className="absolute top-0 right-0 m-3">
                  <span className="inline-block bg-eco-green-100 text-black text-xs font-semibold px-3 py-1 rounded-full group-hover:bg-eco-green-200 transition">{post.category}</span>
                </div>
                <h2 className="text-2xl font-bold text-black mb-2 line-clamp-2 group-hover:text-black transition-colors">{post.title}</h2>
                <p className="text-black mb-4 line-clamp-3">{post.content.substring(0, 180)}...</p>
                <div className="flex items-center justify-between text-sm text-black mt-2">
                  <span>By {post.author?.name || 'Anonymous'}</span>
                </div>
              </Link>
              {/* Delete button for author or admin */}
              {((post.author && currentUser && post.author._id === currentUser.id) || (currentUser && currentUser.role === 'admin')) && (
                <button
                  onClick={async (e) => {
                    e.stopPropagation();
                    if(window.confirm('Are you sure you want to delete this post?')) {
                      const token = localStorage.getItem('eco_token');
                      await apiFetch(`/api/posts/${post._id}`, {
                        method: 'DELETE',
                        headers: {
                          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                        }
                      });
                      // Refresh posts
                      setPosts(posts => posts.filter(p => p._id !== post._id));
                    }
                  }}
                  className="absolute top-2 left-2 bg-red-600 hover:bg-red-800 text-white text-xs px-3 py-1 rounded shadow z-10"
                >
                  Delete
                </button>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
