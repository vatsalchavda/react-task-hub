import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Navigation } from '../Navigation/Navigation';
import './Layout.css';

/**
 * Layout Component
 * 
 * Provides consistent layout structure across all pages:
 * - Header with navigation
 * - Main content area (Outlet for nested routes)
 * - Footer
 * 
 * Demonstrates:
 * - React Router Outlet for nested routing
 * - Shared layout pattern
 * - Navigation component integration
 */
export const Layout: React.FC = () => {
  const location = useLocation();

  return (
    <div className="layout">
      <header className="layout-header">
        <div className="header-content">
          <Link to="/" className="logo">
            <span className="logo-icon">✓</span>
            <span className="logo-text">Task Hub</span>
          </Link>
          <Navigation />
        </div>
      </header>

      <main className="layout-main">
        <Outlet />
      </main>

      <footer className="layout-footer">
        <p>
          Built with React, Redux, TypeScript, and React Router • 
          Current Route: <code>{location.pathname}</code>
        </p>
      </footer>
    </div>
  );
};

