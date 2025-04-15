import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      <div className="mb-8">
        <svg className="w-32 h-32 text-eco-green-600 mx-auto" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
        </svg>
      </div>
      <h1 className="text-4xl font-bold text-eco-green-800 mb-4">404 - Page Not Found</h1>
      <p className="text-xl text-gray-600 mb-8 max-w-md">
        Oops! The page you're looking for seems to have gone back to nature.
      </p>
      <Link
        to="/"
        className="inline-flex items-center px-6 py-3 bg-eco-green-600 hover:bg-eco-green-700 text-white font-medium rounded-lg transition-colors"
      >
        <svg
          className="w-5 h-5 mr-2"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
          />
        </svg>
        Return to Home
      </Link>
      
      {/* Eco decoration */}
      <div className="mt-16 text-eco-green-200">
        <div className="flex items-center justify-center space-x-4">
          <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12 4c-4.41 0-8 3.59-8 8s3.59 8 8 8 8-3.59 8-8-3.59-8-8-8zm3.07 8.28c.08 1.69-.26 3.28-1.65 4.6-.71.71-1.58 1.12-2.48 1.12h-.34c-2.14 0-3.93-1.79-3.93-3.93a3.95 3.95 0 013.93-3.93h.34c.9 0 1.77.41 2.48 1.12.32.32.58.68.78 1.08.26-.74.39-1.54.35-2.34-.07-1.14-.81-2.22-1.88-2.77a3.393 3.393 0 00-3.5.37c-1.09.97-1.5 2.4-1.5 3.72 0 1.32-.42 2.74-1.51 3.72-1.08.96-2.52 1.2-3.49.37-1.08-.54-1.82-1.63-1.89-2.77-.08-1.56.43-3.1 1.47-3.87 1.01-.74 2.45-.63 3.5.36.35.32.71.77.78 1.08-1.7-1.13-4.26-.2-4.26 1.98 0 1.48 1.2 2.68 2.68 2.68h.13c.76 0 1.44-.39 1.82-1.02.37.63 1.05 1.02 1.82 1.02h.13c1.48 0 2.68-1.2 2.68-2.68 0-2.18-2.56-3.11-4.26-1.98z"/>
          </svg>
          <svg className="w-12 h-12" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M7.5 22c-3 0-5.13-2.86-4.01-6.14A80.56 80.56 0 017.35 8.5c.15-3.92 3.32-7 7.15-7 3.92 0 7.15 3.18 7.15 7 0 1.63-.57 3.1-1.5 4.25.05 2.3.19 5.05.35 7.35 1.12 3.28-1.01 6.14-4.01 6.14-.73 0-1.4-.25-1.99-.54-.59.3-1.26.54-1.99.54z"/>
          </svg>
          <svg className="w-10 h-10" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24">
            <path d="M12.75 20.93c-.16.06-.5.07-.76-.01-3.08-1.25-7.24-4.11-7.24-10.52 0-2.32.68-3.77 1.62-4.75.94-.98 2.21-1.61 3.5-1.95 1.3-.34 2.62-.4 3.8-.27 1.17.12 2.16.44 2.78.9.62.46.96 1.08.96 1.96 0 .8-.27 1.56-.77 2.27-.32.45-.73.88-1.24 1.25.41.87.82 1.84 1.19 2.93.38-.98.77-1.86 1.13-2.67-.45-.22-.9-.48-1.33-.79 1.02-.74 1.81-1.57 2.32-2.48.51-.9.8-1.87.8-2.89 0-1.7-.94-3.05-2.27-3.96-1.33-.9-3.12-1.4-5.1-1.4-1.97 0-3.77.5-5.1 1.4-1.33.9-2.27 2.25-2.27 3.96 0 .97.28 1.9.78 2.77.5.86 1.25 1.68 2.22 2.43-1.71 1.26-3.69 3.33-4.74 6.49-.05.15-.09.31-.12.46-.12.54.24 1.03.78 1.11.55.09 1.04-.29 1.11-.77.03-.13.07-.25.1-.38.8-2.37 2.01-4.01 3.28-5.14 1.28 1.13 2.49 2.78 3.3 5.15.13.38.48.63.88.63.1 0 .2-.02.3-.05.48-.16.74-.68.58-1.16-.9-2.71-2.3-4.56-3.74-5.81.61-.47 1.17-1.01 1.66-1.63-.47 2.43-1.28 4.26-2.22 5.85.36.84.65 1.71.86 2.62.1.48.58.78 1.06.7.5-.09.83-.56.73-1.05-.31-1.21-.77-2.33-1.39-3.42z"/>
          </svg>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
