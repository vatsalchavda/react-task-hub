import React from 'react';
import { Link } from 'react-router-dom';
import { useAppSelector } from '../../store/index';
import './Dashboard.css';

/**
 * Dashboard Page
 * 
 * Demonstrates:
 * - React Router Link component
 * - Redux state access across routes
 * - Dashboard layout with stats
 * - Quick action navigation
 */
export const Dashboard: React.FC = () => {
  const { tasks } = useAppSelector((state) => state.tasks);

  // Calculate statistics
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const todoTasks = tasks.filter(t => t.status === 'TODO').length;
  const highPriorityTasks = tasks.filter(t => t.priority === 'HIGH' || t.priority === 'URGENT').length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>Welcome to Task Hub</h1>
        <p className="dashboard-subtitle">
          Your enterprise-grade task management solution
        </p>
      </header>

      <div className="stats-grid">
        <div className="stat-card stat-total">
          <div className="stat-icon">📋</div>
          <div className="stat-content">
            <div className="stat-value">{totalTasks}</div>
            <div className="stat-label">Total Tasks</div>
          </div>
        </div>

        <div className="stat-card stat-completed">
          <div className="stat-icon">✓</div>
          <div className="stat-content">
            <div className="stat-value">{completedTasks}</div>
            <div className="stat-label">Completed</div>
          </div>
        </div>

        <div className="stat-card stat-progress">
          <div className="stat-icon">⏳</div>
          <div className="stat-content">
            <div className="stat-value">{inProgressTasks}</div>
            <div className="stat-label">In Progress</div>
          </div>
        </div>

        <div className="stat-card stat-todo">
          <div className="stat-icon">📝</div>
          <div className="stat-content">
            <div className="stat-value">{todoTasks}</div>
            <div className="stat-label">To Do</div>
          </div>
        </div>

        <div className="stat-card stat-priority">
          <div className="stat-icon">🔥</div>
          <div className="stat-content">
            <div className="stat-value">{highPriorityTasks}</div>
            <div className="stat-label">High Priority</div>
          </div>
        </div>

        <div className="stat-card stat-rate">
          <div className="stat-icon">📊</div>
          <div className="stat-content">
            <div className="stat-value">{completionRate}%</div>
            <div className="stat-label">Completion Rate</div>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="action-grid">
          <Link to="/tasks" className="action-card">
            <span className="action-icon">✓</span>
            <span className="action-title">Manage Tasks</span>
            <span className="action-description">
              View, create, and organize your tasks
            </span>
          </Link>

          <Link to="/analytics" className="action-card">
            <span className="action-icon">📊</span>
            <span className="action-title">View Analytics</span>
            <span className="action-description">
              Analyze your productivity and trends
            </span>
          </Link>

          <Link to="/settings" className="action-card">
            <span className="action-icon">⚙️</span>
            <span className="action-title">Settings</span>
            <span className="action-description">
              Configure your preferences
            </span>
          </Link>
        </div>
      </div>

      <div className="dashboard-info">
        <div className="info-card">
          <h3>🎯 Getting Started</h3>
          <ul>
            <li>Create your first task in the <Link to="/tasks">Tasks</Link> page</li>
            <li>Use filters to organize tasks by status and priority</li>
            <li>Track your progress in <Link to="/analytics">Analytics</Link></li>
            <li>Customize your experience in <Link to="/settings">Settings</Link></li>
          </ul>
        </div>

        <div className="info-card">
          <h3>✨ Key Features</h3>
          <ul>
            <li><strong>Redux State Management</strong> - Centralized state with Redux Toolkit</li>
            <li><strong>React Router</strong> - Client-side routing with lazy loading</li>
            <li><strong>TypeScript</strong> - Full type safety throughout</li>
            <li><strong>Accessibility</strong> - WCAG 2.1 AA compliant</li>
            <li><strong>Docker</strong> - Containerized deployment</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

