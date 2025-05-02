import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { apiFetch } from '../../utils/api';

const Posts = () => {
  const { currentUser, token } = useAuth();
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
    <div className="space-y-10 animate-fade-in">
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8">
        <h1 className="text-4xl font-extrabold text-black tracking-tight relative after:content-[''] after:absolute after:w-1/3 after:h-1 after:bg-eco-green-500 after:bottom-[-8px] after:left-0 animate-fade-in-up">Eco Posts</h1>
        <Link
          to="/posts/create"
          className="bg-eco-green-700 hover:bg-eco-green-800 text-black px-6 py-3 rounded-xl font-semibold shadow-md btn-glow transform transition-all duration-300 hover:scale-105"
        >
          + New Post
        </Link>
      </div>
      {loading ? (
        <div className="flex justify-center py-16">
          <div className="blob bg-eco-green-50 p-8 rounded-full">
            <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-b-4 border-eco-green-600"></div>
          </div>
        </div>
      ) : error ? (
        <div className="bg-red-100 text-black px-4 py-3 rounded mb-4">{error}</div>
      ) : posts.length === 0 ? (
        <div className="text-black py-8 text-center">No posts yet. Be the first to share!</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {posts.map((post, index) => (
            <div key={post._id} className="relative group bg-white rounded-lg shadow-md p-6 mb-6 border border-eco-green-100 card-hover animate-fade-in-up" style={{animationDelay: `${index * 100}ms`}}>
              <Link to={`/posts/${post._id}`} className="block hover:underline">
                <h2 className="text-xl font-bold text-eco-green-800 mb-2">{post.title}</h2>
                <div className="flex items-center mb-2 text-sm text-gray-500">
                  <span>By {post.author?.name || 'Anonymous'}</span>
                  <span className="mx-2">•</span>
                  <span className="capitalize">{post.category}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.createdAt).toLocaleDateString()}</span>
                </div>
                <p className="text-gray-700 mb-2 line-clamp-3">{post.content}</p>
              </Link>

            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Posts;
