// error.jsx
"use client";

import { useEffect, useState } from 'react';
import './error.css';

const Error = ({ error, reset }) => {
  const [isShaking, setIsShaking] = useState(false);

  useEffect(() => {
    // Trigger shake animation when error changes
    setIsShaking(true);
    const timer = setTimeout(() => setIsShaking(false), 500);
    return () => clearTimeout(timer);
  }, [error]);

  return (
    <div className="error-container">
      {/* Background elements */}
      <div className="error-bg-element error-bg-1"></div>
      <div className="error-bg-element error-bg-2"></div>
      <div className="error-bg-element error-bg-3"></div>
      
      <div className="error-content">
        <div className="error-icon-wrapper">
          <div className="error-icon-circle"></div>
          <div className="error-icon-circle-2"></div>
          <div className="error-icon-main"></div>
        </div>
        
        <h1 className="error-title">Oops! Something went wrong</h1>
        <p className="error-subtitle">We encountered an unexpected error</p>
        
        <div className={`error-message ${isShaking ? 'error-shake' : ''}`}>
          <strong>Error Details:</strong> {error.message}
        </div>
        
        <div className="error-code">Error Code: {error.digest || 'UNKNOWN'}</div>
        
        <div className="error-actions">
          <button 
            className="error-button error-button-primary"
            onClick={() => reset()}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
              <path d="M3 3v5h5"/>
            </svg>
            Try Again
          </button>
          <button 
            className="error-button error-button-secondary"
            onClick={() => window.location.href = '/'}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/>
              <polyline points="9 22 9 12 15 12 15 22"/>
            </svg>
            Go Home
          </button>
        </div>
        
        <div className="error-support">
          Still having issues? <a href="mailto:support@ihrchane.com">
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"/>
              <path d="m15 9-6 6"/>
              <path d="m9 9 6 6"/>
            </svg>
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Error;