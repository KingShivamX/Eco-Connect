import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { apiFetch } from '../../utils/api';
import { useAuth } from '../../context/AuthContext.jsx';
import CommentForm from '../../components/common/CommentForm';
import CommentList from '../../components/common/CommentList';

const EventDetail = () => {
  const { currentUser, token } = useAuth();
  const navigate = useNavigate();
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [commentSubmitting, setCommentSubmitting] = useState(false);

  const handleCommentSubmit = async (text) => {
    if (!currentUser) return;
    
    setCommentSubmitting(true);
    try {
      const res = await apiFetch(`/api/events/${id}/comments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        },
        body: JSON.stringify({ text })
      });
      
      if (res.ok) {
        const comments = await res.json();
        setEvent(prev => ({ ...prev, comments }));
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to add comment');
      }
    } catch (err) {
      console.error('Error adding comment:', err);
      alert('Failed to add comment');
    } finally {
      setCommentSubmitting(false);
    }
  };

  const handleCommentDelete = async (commentId) => {
    if (!currentUser) return;
    
    if (!window.confirm('Are you sure you want to delete this comment?')) return;
    
    try {
      const res = await apiFetch(`/api/events/${id}/comments/${commentId}`, {
        method: 'DELETE',
        headers: {
          ...(token ? { 'Authorization': `Bearer ${token}` } : {})
        }
      });
      
      if (res.ok) {
        const comments = await res.json();
        setEvent(prev => ({ ...prev, comments }));
      } else {
        const data = await res.json();
        alert(data.message || 'Failed to delete comment');
      }
    } catch (err) {
      console.error('Error deleting comment:', err);
      alert('Failed to delete comment');
    }
  };

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
      {/* Delete Button */}
      {currentUser && (currentUser.role === 'admin' || currentUser._id === event.organizer?._id) && (
        <>
          <Link
            to={`/events/${event._id}/edit`}
            className="bg-black hover:bg-gray-900 text-white text-base px-5 py-2 rounded shadow mb-4 mr-2 inline-block"
          >
            Edit
          </Link>
          <button
            onClick={async () => {
              if (window.confirm('Are you sure you want to delete this event?')) {
                const res = await apiFetch(`/api/events/${event._id}`, {
                  method: 'DELETE',
                  headers: {
                    ...(token ? { 'Authorization': `Bearer ${token}` } : {})
                  }
                });
                if (res.ok) {
                  navigate('/events');
                } else {
                  const data = await res.json();
                  alert(data.message || 'Failed to delete event');
                }
              }
            }}
            className="bg-black hover:bg-gray-900 text-white text-base px-5 py-2 rounded shadow mb-4 inline-block"
          >
            Delete
          </button>
        </>
      )}
      {/* Comments Section */}
      <section className="mt-12">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-xl font-semibold text-earth-brown-700">Comments ({event.comments?.length || 0})</h2>
        </div>
        
        <CommentForm onSubmit={handleCommentSubmit} placeholder="Share your thoughts about this event..." />
        
        <CommentList 
          comments={event.comments || []} 
          onDelete={handleCommentDelete} 
        />
      </section>

      <div className="mt-8">
        <Link to="/events" className="text-eco-green-600 hover:text-eco-green-800 font-medium">← Back to Events</Link>
      </div>
    </div>
  );
};

export default EventDetail;
