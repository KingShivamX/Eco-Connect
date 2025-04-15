import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../utils/api';

const Home = () => {
  const { currentUser } = useAuth();
  const [recentPosts, setRecentPosts] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch recent posts
        const postsResponse = await apiFetch('/api/posts?limit=3');
        const postsData = await postsResponse.json();
        
        // Fetch upcoming events
        const eventsResponse = await apiFetch('/api/events?upcoming=true&limit=3');
        const eventsData = await eventsResponse.json();
        
        setRecentPosts(postsData.posts || []);
        setUpcomingEvents(eventsData.events || []);
      } catch (error) {
        console.error('Error fetching home data:', error);
      } finally {
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);
  
  return (
    <div className="space-y-12">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-eco-green-900 to-eco-green-800 text-black rounded-3xl shadow-xl overflow-hidden">
        <div className="absolute inset-0 opacity-80"></div>
        <div className="relative z-10 px-8 py-16 md:py-24 md:px-12 max-w-5xl mx-auto flex flex-col items-center text-center">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 tracking-tight drop-shadow-lg">
            Welcome to EcoConnect
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-2xl mx-auto text-black">
            Join our community of eco-conscious individuals sharing ideas, participating in events, and making a positive impact together.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link 
              to="/posts" 
              className="bg-white text-black hover:bg-eco-green-100 px-8 py-3 rounded-xl font-semibold text-lg shadow transition-colors duration-300"
            >
              Browse Posts
            </Link>
            <Link 
              to="/events" 
              className="bg-transparent hover:bg-eco-green-700 border-2 border-white px-8 py-3 rounded-xl font-semibold text-lg transition-colors duration-300 text-black"
            >
              Discover Events
            </Link>
          </div>
        </div>

      </section>
      
      {/* User Welcome */}
      <section className="bg-white/80 rounded-2xl shadow-lg p-8 flex flex-col md:flex-row items-center justify-between gap-8 border border-eco-green-100">
        <div>
          <h2 className="text-2xl font-extrabold text-black">
            Hello, {currentUser?.name}! <span role="img" aria-label="wave">👋</span>
          </h2>
          <p className="text-gray-700 mt-2">What eco-friendly actions will you take today?</p>
        </div>
        <div className="mt-4 md:mt-0 bg-eco-green-50 p-5 rounded-xl shadow border border-eco-green-200 flex flex-col items-center">
          <span className="text-black font-bold text-lg mb-1">Your Eco Points</span>
          <span className="text-3xl font-extrabold text-eco-green-600">{currentUser?.ecoPoints || 0}</span>
        </div>
      </section>
      
      {/* Content Sections */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Recent Posts */}
        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-eco-green-700 py-4 px-6">
            <h2 className="text-xl font-bold text-black">Recent Posts</h2>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-eco-green-600"></div>
              </div>
            ) : recentPosts.length > 0 ? (
              <div className="space-y-4">
                {recentPosts.map(post => (
                  <div key={post._id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <Link to={`/posts/${post._id}`} className="block">
                      <h3 className="text-lg font-semibold text-black hover:text-eco-green-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 mt-1 line-clamp-2">
                        {post.content.substring(0, 120)}...
                      </p>
                      <div className="flex items-center mt-2 text-sm text-gray-500">
                        <span>By {post.author?.name || 'Anonymous'}</span>
                        <span className="mx-2">•</span>
                        <span className="capitalize">{post.category}</span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-4 text-center">No posts yet. Be the first to share!</p>
            )}
            <div className="mt-4 text-center">
              <Link 
                to="/posts" 
                className="text-eco-green-600 hover:text-black font-medium"
              >
                View All Posts →
              </Link>
            </div>
          </div>
        </section>
        
        {/* Upcoming Events */}
        <section className="bg-white rounded-lg shadow-md overflow-hidden">
          <div className="bg-earth-brown-700 py-4 px-6">
            <h2 className="text-xl font-bold text-black">Upcoming Events</h2>
          </div>
          <div className="p-6">
            {loading ? (
              <div className="flex justify-center py-8">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-earth-brown-600"></div>
              </div>
            ) : upcomingEvents.length > 0 ? (
              <div className="space-y-4">
                {upcomingEvents.map(event => (
                  <div key={event._id} className="border-b border-gray-200 pb-4 last:border-0 last:pb-0">
                    <Link to={`/events/${event._id}`} className="block">
                      <h3 className="text-lg font-semibold text-earth-brown-800 hover:text-earth-brown-600 transition-colors">
                        {event.title}
                      </h3>
                      <p className="text-gray-600 mt-1">
                        <span className="font-medium">
                          {new Date(event.date).toLocaleDateString('en-US', { 
                            month: 'short', 
                            day: 'numeric',
                            year: 'numeric'
                          })}
                        </span>{' '}
                        at {event.location}
                      </p>
                      <div className="flex items-center justify-between mt-2">
                        <span className="text-sm text-gray-500 capitalize">
                          {event.category}
                        </span>
                        <span className="text-xs bg-leaf-yellow-100 text-leaf-yellow-800 px-2 py-1 rounded-full">
                          {event.ecoPointsReward} eco points
                        </span>
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-gray-500 py-4 text-center">No upcoming events. Check back soon!</p>
            )}
            <div className="mt-4 text-center">
              <Link 
                to="/events" 
                className="text-earth-brown-600 hover:text-earth-brown-800 font-medium"
              >
                View All Events →
              </Link>
            </div>
          </div>
        </section>
      </div>
      
      {/* Environmental Tips */}
      <section className="bg-leaf-yellow-50 border border-leaf-yellow-200 rounded-2xl shadow p-8">
        <h2 className="text-2xl font-extrabold text-leaf-yellow-900 mb-4">Eco Tip of the Day</h2>
        <div className="flex flex-col md:flex-row items-start gap-6">
          <div className="flex-shrink-0 bg-leaf-yellow-200 p-5 rounded-full shadow">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-leaf-yellow-800" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <div>
            <p className="text-leaf-yellow-900 text-lg font-semibold">
              Try a "Plastic-Free Day" challenge once a week. Replace plastic items with reusable alternatives like glass containers, cloth bags, and stainless steel water bottles.
            </p>
            <p className="mt-2 text-leaf-yellow-800">
              Small changes in daily habits can lead to significant environmental impact over time.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
