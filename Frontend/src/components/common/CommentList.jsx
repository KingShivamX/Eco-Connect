import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const CommentList = ({ comments, onDelete }) => {
  const { currentUser } = useAuth();
  const [expandedComments, setExpandedComments] = useState(false);
  const displayComments = expandedComments ? comments : comments.slice(0, 3);
  const hasMoreComments = comments.length > 3;

  const toggleExpand = () => {
    setExpandedComments(!expandedComments);
  };

  if (!comments || comments.length === 0) {
    return (
      <div className="text-gray-500 py-4 text-center">
        No comments yet. Be the first to comment!
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <ul className="space-y-4 animate-fade-in">
        {displayComments.map((comment) => (
          <li 
            key={comment._id} 
            className="bg-eco-green-50 rounded-lg p-4 border border-eco-green-100 card-hover"
          >
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center">
                <div className="w-8 h-8 rounded-full bg-eco-green-200 flex items-center justify-center text-eco-green-700 font-bold mr-2">
                  {comment.user?.name ? comment.user.name.charAt(0).toUpperCase() : "U"}
                </div>
                <div>
                  <span className="font-semibold text-eco-green-800">{comment.user?.name || 'Anonymous'}</span>
                  <span className="text-xs text-gray-500 ml-2">
                    {new Date(comment.date).toLocaleString(undefined, { 
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric',
                      hour: '2-digit',
                      minute: '2-digit'
                    })}
                  </span>
                </div>
              </div>
              {currentUser && (currentUser._id === comment.user?._id || currentUser.role === 'admin') && (
                <button
                  onClick={() => onDelete(comment._id)}
                  className="text-gray-400 hover:text-red-500 transition-colors"
                  title="Delete comment"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                  </svg>
                </button>
              )}
            </div>
            <p className="text-gray-700 pl-10">{comment.text}</p>
          </li>
        ))}
      </ul>
      
      {hasMoreComments && (
        <button 
          onClick={toggleExpand}
          className="text-eco-green-600 hover:text-eco-green-800 font-medium text-sm flex items-center mx-auto mt-2 transition-all duration-300 hover:scale-105"
        >
          {expandedComments ? (
            <>Show Less <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" /></svg></>
          ) : (
            <>Show All ({comments.length - 3} more) <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" /></svg></>
          )}
        </button>
      )}
    </div>
  );
};

export default CommentList;
