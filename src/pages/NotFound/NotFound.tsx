import React from 'react';
import { useNavigate } from 'react-router-dom';
import './NotFound.css';

/**
 * NotFound Component - 404 Error Page
 * 
 * Demonstrates:
 * - React Router navigation with useNavigate hook
 * - User-friendly error handling
 * - Accessibility with ARIA labels
 * - Professional error page design
 */
export const NotFound: React.FC = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="not-found-page" role="main">
      <div className="not-found-content">
        <div className="error-code" aria-label="Error code 404">
          404
        </div>
        
        <h1 className="error-title">
          Page Not Found
        </h1>
        
        <p className="error-message">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="error-suggestions">
          <h2 className="suggestions-title">Here are some helpful links:</h2>
          <ul className="suggestions-list">
            <li>
              <button
                onClick={handleGoHome}
                className="link-button"
                aria-label="Go to dashboard"
              >
                🏠 Dashboard
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/tasks')}
                className="link-button"
                aria-label="Go to tasks page"
              >
                ✓ Tasks
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/analytics')}
                className="link-button"
                aria-label="Go to analytics page"
              >
                📊 Analytics
              </button>
            </li>
            <li>
              <button
                onClick={() => navigate('/about')}
                className="link-button"
                aria-label="Go to about page"
              >
                ℹ️ About
              </button>
            </li>
          </ul>
        </div>

        <div className="error-actions">
          <button
            onClick={handleGoBack}
            className="btn btn-secondary"
            aria-label="Go back to previous page"
          >
            ← Go Back
          </button>
          <button
            onClick={handleGoHome}
            className="btn btn-primary"
            aria-label="Go to home page"
          >
            🏠 Go Home
          </button>
        </div>

        <div className="error-illustration" aria-hidden="true">
          <div className="illustration-circle"></div>
          <div className="illustration-text">¯\_(ツ)_/¯</div>
        </div>
      </div>
    </div>
  );
};

