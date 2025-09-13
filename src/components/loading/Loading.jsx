// loading.jsx
import React from 'react';
import './loading.css';

const Loading = () => {
  return (
    <div className="loading-container">
      <div className="loading-content">

        <div className="loading-title">
          IHRACHANE
          <div className="title-underline"></div>
          <div className="title-underline-ping"></div>
        </div>
        
        <div className="loading-spinner">
          <div className="spinner-outer"></div>
          <div className="spinner-spin"></div>
          <div className="spinner-inner"></div>
          <div className="spinner-dot"></div>
        </div>
        
        <div className="loading-text-container">
          <p className="loading-text">Preparing your experience</p>
          
          <div className="loading-dots">
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
            <div className="loading-dot"></div>
          </div>
        </div>
        
        <div className="background-element bg-element-1"></div>
        <div className="background-element bg-element-2"></div>
        <div className="background-element bg-element-3"></div>
        
        <div className="progress-container">
          <div className="progress-bar"></div>
        </div>
      </div>
    </div>
  );
};

export default Loading;