import React from 'react';
import { useAppSelector } from '../../store/index';
import { Link } from 'react-router-dom';
import './Analytics.css';

/**
 * Analytics Page
 * 
 * Demonstrates:
 * - Lazy loaded component (with configurable delay)
 * - Redux state consumption
 * - Data visualization concepts
 * - Static mockup of analytics dashboard
 */
export const Analytics: React.FC = () => {
  const { tasks } = useAppSelector((state) => state.tasks);

  // Calculate analytics data
  const totalTasks = tasks.length;
  const completedTasks = tasks.filter(t => t.status === 'COMPLETED').length;
  const inProgressTasks = tasks.filter(t => t.status === 'IN_PROGRESS').length;
  const todoTasks = tasks.filter(t => t.status === 'TODO').length;

  const urgentTasks = tasks.filter(t => t.priority === 'URGENT').length;
  const highTasks = tasks.filter(t => t.priority === 'HIGH').length;
  const mediumTasks = tasks.filter(t => t.priority === 'MEDIUM').length;
  const lowTasks = tasks.filter(t => t.priority === 'LOW').length;

  const completionRate = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
  const progressRate = totalTasks > 0 ? Math.round((inProgressTasks / totalTasks) * 100) : 0;

  return (
    <div className="analytics">
      <header className="analytics-header">
        <h1>📊 Analytics Dashboard</h1>
        <p className="analytics-subtitle">
          Track your productivity and task completion trends
        </p>
      </header>

      <div className="analytics-grid">
        {/* Status Distribution */}
        <div className="analytics-card">
          <h2>Task Status Distribution</h2>
          <div className="chart-container">
            <div className="bar-chart">
              <div className="bar-item">
                <div className="bar-label">Completed</div>
                <div className="bar-wrapper">
                  <div 
                    className="bar bar-completed" 
                    style={{ width: `${completionRate}%` }}
                  >
                    <span className="bar-value">{completedTasks}</span>
                  </div>
                </div>
              </div>
              <div className="bar-item">
                <div className="bar-label">In Progress</div>
                <div className="bar-wrapper">
                  <div 
                    className="bar bar-progress" 
                    style={{ width: `${progressRate}%` }}
                  >
                    <span className="bar-value">{inProgressTasks}</span>
                  </div>
                </div>
              </div>
              <div className="bar-item">
                <div className="bar-label">To Do</div>
                <div className="bar-wrapper">
                  <div 
                    className="bar bar-todo" 
                    style={{ width: `${totalTasks > 0 ? (todoTasks / totalTasks) * 100 : 0}%` }}
                  >
                    <span className="bar-value">{todoTasks}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Priority Distribution */}
        <div className="analytics-card">
          <h2>Priority Distribution</h2>
          <div className="chart-container">
            <div className="pie-chart-legend">
              <div className="legend-item">
                <span className="legend-color legend-urgent"></span>
                <span className="legend-label">Urgent: {urgentTasks}</span>
              </div>
              <div className="legend-item">
                <span className="legend-color legend-high"></span>
                <span className="legend-label">High: {highTasks}</span>
              </div>
              <div className="legend-item">
                <span className="legend-color legend-medium"></span>
                <span className="legend-label">Medium: {mediumTasks}</span>
              </div>
              <div className="legend-item">
                <span className="legend-color legend-low"></span>
                <span className="legend-label">Low: {lowTasks}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Productivity Metrics */}
        <div className="analytics-card">
          <h2>Productivity Metrics</h2>
          <div className="metrics-grid">
            <div className="metric-item">
              <div className="metric-icon">✓</div>
              <div className="metric-content">
                <div className="metric-value">{completionRate}%</div>
                <div className="metric-label">Completion Rate</div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon">⏳</div>
              <div className="metric-content">
                <div className="metric-value">{progressRate}%</div>
                <div className="metric-label">In Progress</div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon">🔥</div>
              <div className="metric-content">
                <div className="metric-value">{urgentTasks + highTasks}</div>
                <div className="metric-label">High Priority</div>
              </div>
            </div>
            <div className="metric-item">
              <div className="metric-icon">📋</div>
              <div className="metric-content">
                <div className="metric-value">{totalTasks}</div>
                <div className="metric-label">Total Tasks</div>
              </div>
            </div>
          </div>
        </div>

        {/* Insights */}
        <div className="analytics-card">
          <h2>💡 Insights & Recommendations</h2>
          <div className="insights-list">
            {completionRate >= 70 && (
              <div className="insight-item insight-success">
                <span className="insight-icon">🎉</span>
                <span className="insight-text">
                  Great job! You've completed {completionRate}% of your tasks.
                </span>
              </div>
            )}
            {urgentTasks > 0 && (
              <div className="insight-item insight-warning">
                <span className="insight-icon">⚠️</span>
                <span className="insight-text">
                  You have {urgentTasks} urgent task{urgentTasks > 1 ? 's' : ''} that need immediate attention.
                </span>
              </div>
            )}
            {inProgressTasks > 5 && (
              <div className="insight-item insight-info">
                <span className="insight-icon">ℹ️</span>
                <span className="insight-text">
                  Consider focusing on completing {inProgressTasks} in-progress tasks before starting new ones.
                </span>
              </div>
            )}
            {totalTasks === 0 && (
              <div className="insight-item insight-info">
                <span className="insight-icon">📝</span>
                <span className="insight-text">
                  No tasks yet. <Link to="/tasks">Create your first task</Link> to get started!
                </span>
              </div>
            )}
            {totalTasks > 0 && completionRate === 100 && (
              <div className="insight-item insight-success">
                <span className="insight-icon">🏆</span>
                <span className="insight-text">
                  Amazing! You've completed all your tasks. Time to add new challenges!
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      <div className="analytics-footer">
        <p>
          <strong>Note:</strong> This is a static mockup demonstrating analytics concepts. 
          In a production environment, this would include real-time charts, historical trends, 
          and advanced filtering options.
        </p>
      </div>
    </div>
  );
};

