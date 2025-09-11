"use client"
import Link from 'next/link';
import './not-found.css';

const NotFound = () => {
  return (
    <div className="not-found-container">
      {/* Background elements */}
      <div className="not-found-bg-element not-found-bg-1"></div>
      <div className="not-found-bg-element not-found-bg-2"></div>
      <div className="not-found-bg-element not-found-bg-3"></div>
      
      <div className="not-found-content">
        {/* Animated 404 number */}
        <div className="not-found-number">404</div>
        
        {/* Message */}
        <h1 className="not-found-title">Page Not Found</h1>
        <p className="not-found-subtitle">
          Oops! The page you're looking for seems to have wandered off into the digital wilderness. Let's get you back on track.
        </p>
        
        {/* Action buttons */}
        <div className="not-found-actions">
          <Link 
            href="/"
            className="not-found-button not-found-button-primary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
              <polyline points="9 22 9 12 15 12 15 22"></polyline>
            </svg>
            Go Home
          </Link>
          
          <button 
            onClick={() => window.history.back()}
            className="not-found-button not-found-button-secondary"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M19 12H5M12 19l-7-7 7-7"></path>
            </svg>
            Go Back
          </button>
        </div>
        
        {/* Support link */}
        <div className="not-found-support">
          Need help? <a href="mailto:support@ihrchane.com">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M8 14s1.5 2 4 2 4-2 4-2"></path>
              <line x1="9" y1="9" x2="9.01" y2="9"></line>
              <line x1="15" y1="9" x2="15.01" y2="9"></line>
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;