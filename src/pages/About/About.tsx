import React from 'react';
import { Link } from 'react-router-dom';
import './About.css';

/**
 * About Page
 * 
 * Demonstrates:
 * - Static content page
 * - Information architecture
 * - Link navigation
 */
export const About: React.FC = () => {
  return (
    <div className="about">
      <header className="about-header">
        <h1>ℹ️ About Task Hub</h1>
        <p className="about-subtitle">
          Enterprise-grade task management built with modern web technologies
        </p>
      </header>

      <div className="about-content">
        <section className="about-section">
          <h2>🎯 Project Overview</h2>
          <p>
            Task Hub is a demonstration project showcasing enterprise-grade web development
            practices using React, Redux, TypeScript, React Router, and Docker. This application
            demonstrates production-ready patterns and best practices for modern web applications.
          </p>
        </section>

        <section className="about-section">
          <h2>🛠️ Technologies Used</h2>
          <div className="tech-grid">
            <div className="tech-card">
              <div className="tech-icon">⚛️</div>
              <div className="tech-name">React 18</div>
              <div className="tech-description">
                Modern functional components with hooks
              </div>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🔄</div>
              <div className="tech-name">Redux Toolkit</div>
              <div className="tech-description">
                State management with Redux Thunk
              </div>
            </div>
            <div className="tech-card">
              <div className="tech-icon">📘</div>
              <div className="tech-name">TypeScript</div>
              <div className="tech-description">
                Full type safety throughout
              </div>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🧭</div>
              <div className="tech-name">React Router</div>
              <div className="tech-description">
                Client-side routing with lazy loading
              </div>
            </div>
            <div className="tech-card">
              <div className="tech-icon">📦</div>
              <div className="tech-name">Webpack 5</div>
              <div className="tech-description">
                Module bundling and optimization
              </div>
            </div>
            <div className="tech-card">
              <div className="tech-icon">🐳</div>
              <div className="tech-name">Docker</div>
              <div className="tech-description">
                Containerized deployment
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>✨ Key Features</h2>
          <div className="features-list">
            <div className="feature-item">
              <span className="feature-icon">✓</span>
              <div className="feature-content">
                <strong>Full CRUD Operations</strong>
                <p>Create, read, update, and delete tasks with Redux state management</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🔄</span>
              <div className="feature-content">
                <strong>Redux State Management</strong>
                <p>Centralized state with Redux Toolkit and Redux Thunk for async operations</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🧭</span>
              <div className="feature-content">
                <strong>React Router Navigation</strong>
                <p>Client-side routing with lazy loading and code splitting</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">♿</span>
              <div className="feature-content">
                <strong>WCAG 2.1 AA Accessibility</strong>
                <p>Keyboard navigation, ARIA labels, and screen reader support</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🎨</span>
              <div className="feature-content">
                <strong>Filtering & Pagination</strong>
                <p>Filter by status and priority, paginate with configurable items per page</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📊</span>
              <div className="feature-content">
                <strong>Analytics Dashboard</strong>
                <p>Visual representation of task statistics and productivity metrics</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">🐳</span>
              <div className="feature-content">
                <strong>Docker Containerization</strong>
                <p>Consistent deployment across different environments</p>
              </div>
            </div>
            <div className="feature-item">
              <span className="feature-icon">📘</span>
              <div className="feature-content">
                <strong>TypeScript Type Safety</strong>
                <p>Full type coverage prevents runtime errors and improves maintainability</p>
              </div>
            </div>
          </div>
        </section>

        <section className="about-section">
          <h2>🏗️ Architecture Highlights</h2>
          <ul className="architecture-list">
            <li><strong>Layered Architecture:</strong> Clear separation between presentation, business logic, and state management</li>
            <li><strong>Custom Hooks Pattern:</strong> Reusable logic encapsulated in custom hooks like useTasks</li>
            <li><strong>Component Composition:</strong> Small, focused components that compose into complex UIs</li>
            <li><strong>Route-based Code Splitting:</strong> Lazy loading pages for optimal performance</li>
            <li><strong>Centralized State:</strong> Redux store as single source of truth</li>
            <li><strong>Type-Safe Development:</strong> TypeScript interfaces and enums throughout</li>
          </ul>
        </section>

        <section className="about-section">
          <h2>💡 Technical Highlights</h2>
          <div className="technical-info">
            <p>
              <strong>Purpose:</strong> Demonstrate enterprise-grade development practices and modern web technologies
            </p>
            <p>
              <strong>Key Implementations:</strong>
            </p>
            <ul>
              <li>React Router implementation with lazy loading</li>
              <li>Redux state management with Redux Thunk</li>
              <li>TypeScript for type safety</li>
              <li>WCAG 2.1 AA accessibility compliance</li>
              <li>Docker containerization</li>
              <li>Enterprise architecture patterns</li>
            </ul>
          </div>
        </section>

        <section className="about-section">
          <h2>🚀 Getting Started</h2>
          <p>
            Ready to explore? Check out the different sections:
          </p>
          <div className="quick-links">
            <Link to="/" className="quick-link">
              <span className="link-icon">🏠</span>
              <span className="link-text">Dashboard</span>
            </Link>
            <Link to="/tasks" className="quick-link">
              <span className="link-icon">✓</span>
              <span className="link-text">Manage Tasks</span>
            </Link>
            <Link to="/analytics" className="quick-link">
              <span className="link-icon">📊</span>
              <span className="link-text">View Analytics</span>
            </Link>
            <Link to="/settings" className="quick-link">
              <span className="link-icon">⚙️</span>
              <span className="link-text">Settings</span>
            </Link>
          </div>
        </section>

        <section className="about-section about-footer-section">
          <div className="version-info">
            <p><strong>Version:</strong> 1.0.0</p>
            <p><strong>Last Updated:</strong> November 2024</p>
            <p><strong>License:</strong> MIT</p>
          </div>
        </section>
      </div>
    </div>
  );
};

