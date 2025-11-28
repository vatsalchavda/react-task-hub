import React from 'react';
import './LoadingSpinner.css';

interface LoadingSpinnerProps {
  message?: string;
}

/**
 * LoadingSpinner Component
 * 
 * Displays a loading indicator with optional message.
 * Used as Suspense fallback for lazy-loaded routes.
 * 
 * Demonstrates:
 * - Accessible loading states
 * - ARIA live regions
 * - Visual feedback during async operations
 */
export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ 
  message = 'Loading...' 
}) => {
  return (
    <div className="loading-spinner-container" role="status" aria-live="polite">
      <div className="loading-spinner">
        <div className="spinner"></div>
      </div>
      <p className="loading-message">{message}</p>
    </div>
  );
};

