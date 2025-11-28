import React, { useState, useEffect } from 'react';
import { useTasks } from '../../hooks/useTasks';
import { Task, TaskStatus, TaskPriority } from '../../types';
import { sampleTasks } from '../../data/sampleTasks';
import './TasksPage.css';

/**
 * TasksPage Component - Main Task Management Interface
 * 
 * Demonstrates:
 * - Redux state management with Redux Thunk
 * - Custom hooks pattern (useTasks)
 * - WCAG 2.1 AA accessibility compliance
 * - Keyboard navigation
 * - ARIA labels and roles
 * - Focus management
 * - Filtering and pagination
 */
export const TasksPage: React.FC = () => {
  const {
    tasks,
    allTasks,
    filteredTasks,
    selectedTask,
    filter,
    pagination,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    setFilter,
    selectTask,
    setPage,
    setItemsPerPage,
  } = useTasks();

  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
  });

  // Focus management for accessibility
  useEffect(() => {
    if (showForm) {
      const firstInput = document.querySelector<HTMLInputElement>('#task-title-input');
      firstInput?.focus();
    }
  }, [showForm]);

  // Keyboard navigation - Escape to close modal
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showForm) {
        handleFormCancel();
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [showForm]);

  const handleCreateTask = () => {
    selectTask(null);
    setFormData({ title: '', description: '', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM });
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    selectTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      status: task.status,
      priority: task.priority,
    });
    setShowForm(true);
  };

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (selectedTask) {
        await updateTask(selectedTask.id, formData);
      } else {
        await createTask(formData);
      }
      setShowForm(false);
      selectTask(null);
      announceToScreenReader(
        selectedTask ? 'Task updated successfully' : 'Task created successfully'
      );
    } catch (err) {
      console.error('Failed to save task:', err);
      announceToScreenReader('Failed to save task. Please try again.');
    }
  };

  const handleFormCancel = () => {
    setShowForm(false);
    selectTask(null);
    document.querySelector<HTMLButtonElement>('[aria-label="Add new task"]')?.focus();
  };

  const handleDeleteTask = async (taskId: string, taskTitle: string) => {
    if (window.confirm(`Are you sure you want to delete "${taskTitle}"?`)) {
      try {
        await deleteTask(taskId);
        announceToScreenReader(`Task "${taskTitle}" deleted successfully`);
      } catch (err) {
        console.error('Failed to delete task:', err);
        announceToScreenReader('Failed to delete task. Please try again.');
      }
    }
  };

  const handleAddSampleTasks = async () => {
    try {
      for (const task of sampleTasks) {
        await createTask(task);
      }
      announceToScreenReader(`Successfully added ${sampleTasks.length} sample tasks`);
    } catch (err) {
      console.error('Failed to add sample tasks:', err);
      announceToScreenReader('Failed to add sample tasks. Please try again.');
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'TODO': return '#6c757d';
      case 'IN_PROGRESS': return '#ffc107';
      case 'COMPLETED': return '#28a745';
      default: return '#6c757d';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'LOW': return '#17a2b8';
      case 'MEDIUM': return '#ffc107';
      case 'HIGH': return '#dc3545';
      case 'URGENT': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'TODO': return 'To Do';
      case 'IN_PROGRESS': return 'In Progress';
      case 'COMPLETED': return 'Completed';
      default: return status;
    }
  };

  return (
    <div className="tasks-page">
      {/* Header with task count and add button */}
      <div className="tasks-header">
        <h1 id="tasks-heading">
          Tasks ({filteredTasks.length})
        </h1>
        <div className="tasks-actions">
          {process.env.NODE_ENV === 'development' && allTasks.length === 0 && (
            <button
              onClick={handleAddSampleTasks}
              aria-label="Add sample tasks for testing"
              className="btn btn-success"
            >
              🎲 Add Sample Tasks
            </button>
          )}
          <button
            onClick={handleCreateTask}
            aria-label="Add new task"
            className="btn btn-primary"
          >
            + Add Task
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar" role="region" aria-label="Task filters">
        <div className="filter-grid">
          <div className="filter-group">
            <label htmlFor="status-filter" className="filter-label">
              Filter by Status
            </label>
            <select
              id="status-filter"
              value={filter.status || 'all'}
              onChange={(e) => setFilter({ ...filter, status: e.target.value === 'all' ? undefined : e.target.value as TaskStatus })}
              className="filter-select"
              aria-label="Filter tasks by status"
            >
              <option value="all">All Statuses</option>
              <option value="TODO">To Do</option>
              <option value="IN_PROGRESS">In Progress</option>
              <option value="COMPLETED">Completed</option>
            </select>
          </div>

          <div className="filter-group">
            <label htmlFor="priority-filter" className="filter-label">
              Filter by Priority
            </label>
            <select
              id="priority-filter"
              value={filter.priority || 'all'}
              onChange={(e) => setFilter({ ...filter, priority: e.target.value === 'all' ? undefined : e.target.value as TaskPriority })}
              className="filter-select"
              aria-label="Filter tasks by priority"
            >
              <option value="all">All Priorities</option>
              <option value="LOW">Low</option>
              <option value="MEDIUM">Medium</option>
              <option value="HIGH">High</option>
              <option value="URGENT">Urgent</option>
            </select>
          </div>

          {(filter.status || filter.priority) && (
            <div className="filter-group filter-clear">
              <button
                onClick={() => setFilter({ status: undefined, priority: undefined })}
                aria-label="Clear all filters"
                className="btn btn-secondary"
              >
                Clear Filters
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Loading state */}
      {loading && (
        <div className="loading-state" role="status" aria-live="polite" aria-label="Loading tasks">
          <div className="loading-text">⏳ Loading tasks...</div>
          {process.env.NODE_ENV === 'development' && (
            <div className="loading-hint">
              Check Redux DevTools to see async action lifecycle
            </div>
          )}
        </div>
      )}
      
      {/* Error state */}
      {error && (
        <div className="error-state" role="alert" aria-live="assertive">
          <strong>Error:</strong> {error}
        </div>
      )}

      {/* Task list */}
      {!loading && filteredTasks.length === 0 && allTasks.length > 0 ? (
        <div className="empty-state">
          <p>No tasks match the current filters.</p>
          <button
            onClick={() => setFilter({ status: undefined, priority: undefined })}
            className="btn btn-primary"
          >
            Clear Filters
          </button>
        </div>
      ) : !loading && allTasks.length === 0 ? (
        <div className="empty-state">
          <p>No tasks yet. Click "Add Task" to get started!</p>
        </div>
      ) : (
        <div className="task-list" role="list" aria-labelledby="tasks-heading">
          {tasks.map(task => (
            <article key={task.id} role="listitem" className="task-card">
              <div className="task-card-header">
                <h3 className="task-title">{task.title}</h3>
                <div className="task-actions" role="group" aria-label="Task actions">
                  <button
                    onClick={() => handleEditTask(task)}
                    aria-label={`Edit task: ${task.title}`}
                    className="btn btn-sm btn-primary"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDeleteTask(task.id, task.title)}
                    aria-label={`Delete task: ${task.title}`}
                    className="btn btn-sm btn-danger"
                  >
                    Delete
                  </button>
                </div>
              </div>
              <p className="task-description">{task.description}</p>
              <div className="task-badges">
                <span
                  className="badge badge-status"
                  style={{ backgroundColor: getStatusColor(task.status) }}
                  aria-label={`Status: ${getStatusLabel(task.status)}`}
                >
                  {getStatusLabel(task.status)}
                </span>
                <span
                  className="badge badge-priority"
                  style={{ backgroundColor: getPriorityColor(task.priority) }}
                  aria-label={`Priority: ${task.priority.toLowerCase()}`}
                >
                  {task.priority.toLowerCase()} priority
                </span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Task form modal */}
      {showForm && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          className="modal-overlay"
          onClick={handleFormCancel}
        >
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <h2 id="modal-title" className="modal-title">
              {selectedTask ? 'Edit Task' : 'Create New Task'}
            </h2>
            <form onSubmit={handleFormSubmit} className="task-form">
              <div className="form-group">
                <label htmlFor="task-title-input" className="form-label">
                  Title <span aria-label="required">*</span>
                </label>
                <input
                  id="task-title-input"
                  type="text"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  aria-required="true"
                  className="form-input"
                />
              </div>
              <div className="form-group">
                <label htmlFor="task-description-input" className="form-label">
                  Description
                </label>
                <textarea
                  id="task-description-input"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={4}
                  className="form-textarea"
                />
              </div>
              <div className="form-group">
                <label htmlFor="task-status-select" className="form-label">
                  Status
                </label>
                <select
                  id="task-status-select"
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                  className="form-select"
                >
                  <option value="TODO">To Do</option>
                  <option value="IN_PROGRESS">In Progress</option>
                  <option value="COMPLETED">Completed</option>
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="task-priority-select" className="form-label">
                  Priority
                </label>
                <select
                  id="task-priority-select"
                  value={formData.priority}
                  onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                  className="form-select"
                >
                  <option value="LOW">Low</option>
                  <option value="MEDIUM">Medium</option>
                  <option value="HIGH">High</option>
                  <option value="URGENT">Urgent</option>
                </select>
              </div>
              <div className="form-actions">
                <button
                  type="button"
                  onClick={handleFormCancel}
                  aria-label="Cancel and close form"
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  aria-label={selectedTask ? 'Update task' : 'Create task'}
                  className="btn btn-primary"
                >
                  {selectedTask ? 'Update' : 'Create'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Pagination Controls */}
      {filteredTasks.length > 0 && (
        <div className="pagination-controls" role="navigation" aria-label="Pagination">
          <div className="pagination-info">
            <label htmlFor="items-per-page" className="pagination-label">
              Items per page:
            </label>
            <select
              id="items-per-page"
              value={pagination.itemsPerPage}
              onChange={(e) => setItemsPerPage(Number(e.target.value))}
              className="pagination-select"
              aria-label="Select items per page"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={20}>20</option>
              <option value={50}>50</option>
            </select>
            <span className="pagination-count">
              Showing {Math.min((pagination.currentPage - 1) * pagination.itemsPerPage + 1, filteredTasks.length)} - {Math.min(pagination.currentPage * pagination.itemsPerPage, filteredTasks.length)} of {filteredTasks.length}
            </span>
          </div>

          <div className="pagination-buttons">
            <button
              onClick={() => setPage(pagination.currentPage - 1)}
              disabled={pagination.currentPage === 1}
              aria-label="Go to previous page"
              className="btn btn-pagination"
            >
              Previous
            </button>

            <div className="page-numbers">
              {Array.from({ length: pagination.totalPages }, (_, i) => i + 1).map((page) => (
                <button
                  key={page}
                  onClick={() => setPage(page)}
                  aria-label={`Go to page ${page}`}
                  aria-current={pagination.currentPage === page ? 'page' : undefined}
                  className={`btn btn-page ${pagination.currentPage === page ? 'active' : ''}`}
                >
                  {page}
                </button>
              ))}
            </div>

            <button
              onClick={() => setPage(pagination.currentPage + 1)}
              disabled={pagination.currentPage === pagination.totalPages}
              aria-label="Go to next page"
              className="btn btn-pagination"
            >
              Next
            </button>
          </div>
        </div>
      )}

      {/* Live region for screen reader announcements */}
      <div
        id="sr-announcements"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
      />

      {/* Redux state inspector - Development only */}
      {process.env.NODE_ENV === 'development' && (
        <aside aria-label="Redux state inspector" className="redux-inspector">
          <div className="inspector-title">📊 Redux State Summary</div>
          <div>Tasks: {allTasks.length}</div>
          <div>Filtered: {filteredTasks.length}</div>
          <div>Showing: {tasks.length}</div>
          <div>Loading: {loading ? 'Yes' : 'No'}</div>
          <div>Error: {error || 'None'}</div>
          <div className="inspector-hint">
            Press F12 → Redux tab for full state
          </div>
        </aside>
      )}
    </div>
  );
};

/**
 * Helper function to announce messages to screen readers
 */
function announceToScreenReader(message: string) {
  const announcer = document.getElementById('sr-announcements');
  if (announcer) {
    announcer.textContent = message;
    setTimeout(() => {
      announcer.textContent = '';
    }, 1000);
  }
}

