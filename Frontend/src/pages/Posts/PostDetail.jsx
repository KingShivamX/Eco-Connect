import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../utils/api';
import { useAuth } from '../../context/AuthContext.jsx';

const PostDetail = () => {
  const { currentUser, token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [post, setPost] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        setLoading(true);
        const res = await apiFetch(`/api/posts/${id}`);
        const data = await res.json();
        if (res.ok) {
          setPost(data);
        } else {
          setError(data.message || 'Failed to fetch post');
        }
      } catch (err) {
        setError('Failed to fetch post');
      } finally {
        setLoading(false);
      }
    };
    fetchPost();
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

  if (!post) {
    return <div className="text-gray-500 py-8 text-center">Post not found.</div>;
  }

  return (
    <div className="bg-white rounded-lg shadow-md p-8 border border-eco-green-100">

      <h1 className="text-3xl font-bold text-eco-green-800 mb-4">{post.title}</h1>
      <div className="flex items-center mb-6 text-sm text-gray-500">
        <span>By {post.author?.name || 'Anonymous'}</span>
        <span className="mx-2">•</span>
        <span className="capitalize">{post.category}</span>
        <span className="mx-2">•</span>
        <span>{new Date(post.createdAt).toLocaleDateString()}</span>
      </div>
      <div className="text-lg text-gray-700 mb-8 whitespace-pre-line">
        {post.content}
      </div>
      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mb-4 flex flex-wrap gap-2">
          {post.tags.map(tag => (
            <span key={tag} className="bg-eco-green-100 text-eco-green-800 px-3 py-1 rounded-full text-xs font-medium">
              #{tag}
            </span>
          ))}
        </div>
      )}
      {currentUser && (currentUser.role === 'admin' || currentUser._id === post.author?._id) && (
        <>
          <Link
            to={`/posts/${post._id}/edit`}
            className="bg-black hover:bg-gray-900 text-white text-base px-5 py-2 rounded shadow mb-4 mr-2 inline-block"
          >
            Edit
          </Link>
          <button
            onClick={async () => {
              if (window.confirm('Are you sure you want to delete this post?')) {
                const res = await apiFetch(`/api/posts/${post._id}`, {
                  method: 'DELETE',
                  headers: {
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                  }
                });
                if (res.ok) {
                  navigate('/posts');
                } else {
                  const data = await res.json();
                  alert(data.message || 'Failed to delete post');
                }
              }
            }}
            className="bg-black hover:bg-gray-900 text-white text-base px-5 py-2 rounded shadow mb-4 ml-0"
            style={{ display: 'inline-block' }}
          >
            Delete
          </button>
        </>
      )}
      {/* Comments */}
      <section className="mt-8">
        <h2 className="text-xl font-semibold text-eco-green-700 mb-4">Comments</h2>
        {post.comments && post.comments.length > 0 ? (
          <ul className="space-y-4">
            {post.comments.map(comment => (
              <li key={comment._id} className="bg-eco-green-50 rounded-lg p-4 border border-eco-green-100">
                <div className="flex items-center mb-2">
                  <span className="font-semibold text-eco-green-800 mr-2">{comment.user?.name || 'Anonymous'}</span>
                  <span className="text-xs text-gray-500">{new Date(comment.date).toLocaleString()}</span>
                </div>
                <p className="text-gray-700">{comment.text}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No comments yet. Be the first to comment!</p>
        )}
      </section>
      {/* Delete Button */}
      <div className="mt-8">
        <Link to="/posts" className="text-eco-green-600 hover:text-eco-green-800 font-medium">← Back to Posts</Link>
      </div>
    </div>
  );
};

export default PostDetail;