import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navigation.css';

/**
 * Navigation Component
 * 
 * Provides main navigation menu with:
 * - Active route highlighting
 * - Accessible navigation
 * - Responsive design
 * 
 * Demonstrates:
 * - React Router NavLink with active styling
 * - ARIA navigation landmarks
 * - Keyboard navigation support
 */
export const Navigation: React.FC = () => {
  return (
    <nav className="navigation" role="navigation" aria-label="Main navigation">
      <ul className="nav-list">
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-icon">🏠</span>
            <span className="nav-text">Dashboard</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/tasks"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-icon">✓</span>
            <span className="nav-text">Tasks</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/analytics"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-icon">📊</span>
            <span className="nav-text">Analytics</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/settings"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-icon">⚙️</span>
            <span className="nav-text">Settings</span>
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/about"
            className={({ isActive }) => isActive ? 'nav-link active' : 'nav-link'}
          >
            <span className="nav-icon">ℹ️</span>
            <span className="nav-text">About</span>
          </NavLink>
        </li>
      </ul>
    </nav>
  );
};

