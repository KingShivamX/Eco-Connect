import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const CommentForm = ({ onSubmit, placeholder = "Add a comment..." }) => {
  const { currentUser } = useAuth();
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;
    
    setIsSubmitting(true);
    try {
      await onSubmit(text);
      setText(''); // Clear the input on success
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!currentUser) {
    return (
      <div className="bg-eco-green-50 p-4 rounded-lg text-center">
        <p className="text-eco-green-700">Please log in to leave a comment.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex items-start space-x-4">
        <div className="w-10 h-10 rounded-full bg-eco-green-200 flex items-center justify-center text-eco-green-700 font-bold">
          {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : "U"}
        </div>
        <div className="flex-1">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            className="w-full p-3 border border-eco-green-200 rounded-lg focus:ring-2 focus:ring-eco-green-500 focus:border-eco-green-500 transition-all duration-300"
            placeholder={placeholder}
            rows="3"
            disabled={isSubmitting}
          ></textarea>
          <button
            type="submit"
            disabled={isSubmitting || !text.trim()}
            className={`mt-2 px-6 py-3 rounded-lg font-bold text-base transition-all duration-300 shadow-lg ${
              isSubmitting || !text.trim()
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-eco-green-400 text-black hover:bg-eco-green-500 btn-glow ring-2 ring-eco-green-200 transform hover:scale-105 font-extrabold'
            }`}
          >
            {isSubmitting ? 'Submitting...' : 'Post Comment'}
          </button>
        </div>
      </div>
    </form>
  );
};

export default CommentForm;
