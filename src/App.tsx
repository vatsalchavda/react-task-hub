import React, { useState, useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@store/index';
import { useTasks } from '@hooks/useTasks';
import { Task, TaskStatus, TaskPriority } from './types';
import './App.css';

/**
 * TasksPage Component - Redux-Connected with Accessibility
 * 
 * Demonstrates:
 * - Redux state management with Redux Thunk
 * - Custom hooks pattern (useTasks)
 * - WCAG 2.1 AA accessibility compliance
 * - Keyboard navigation
 * - ARIA labels and roles
 * - Focus management
 */
const TasksPage: React.FC = () => {
  const {
    tasks,
    selectedTask,
    filter,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    setFilter,
    selectTask,
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
      // Focus first input when modal opens
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
      
      // Announce success to screen readers
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
    // Return focus to Add Task button
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
    <div className="app-container">
      {/* Skip to main content link for keyboard users */}
      <a 
        href="#main-content" 
        className="skip-link"
        style={{
          position: 'absolute',
          left: '-9999px',
          zIndex: 999,
          padding: '1em',
          backgroundColor: '#667eea',
          color: 'white',
          textDecoration: 'none',
        }}
        onFocus={(e) => {
          e.currentTarget.style.left = '0';
        }}
        onBlur={(e) => {
          e.currentTarget.style.left = '-9999px';
        }}
      >
        Skip to main content
      </a>

      <header className="app-header" role="banner">
        <h1>React Task Hub</h1>
        <p>Enterprise-grade task management with React, Redux & TypeScript</p>
        {process.env.NODE_ENV === 'development' && (
          <div style={{ fontSize: '14px', opacity: 0.9, marginTop: '8px' }}>
            🔴 Redux DevTools Active | Press F12 to inspect state
          </div>
        )}
      </header>

      <main id="main-content" className="app-main" role="main">
        {/* Header with task count and add button */}
        <div style={{ marginBottom: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h2 style={{ margin: 0, color: '#333' }} id="tasks-heading">
            Tasks ({tasks.length})
          </h2>
          <button
            onClick={handleCreateTask}
            aria-label="Add new task"
            style={{
              padding: '10px 20px',
              backgroundColor: '#667eea',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: 'pointer',
              fontSize: '16px',
              fontWeight: '500',
            }}
          >
            + Add Task
          </button>
        </div>

        {/* Loading state */}
        {loading && (
          <div 
            className="loading" 
            role="status" 
            aria-live="polite"
            aria-label="Loading tasks"
          >
            <div style={{ fontSize: '18px', marginBottom: '8px' }}>⏳ Loading tasks...</div>
            {process.env.NODE_ENV === 'development' && (
              <div style={{ fontSize: '14px', opacity: 0.7 }}>
                Check Redux DevTools to see async action lifecycle
              </div>
            )}
          </div>
        )}
        
        {/* Error state */}
        {error && (
          <div 
            className="error" 
            role="alert" 
            aria-live="assertive"
          >
            <strong>Error:</strong> {error}
            {process.env.NODE_ENV === 'development' && (
              <div style={{ fontSize: '14px', marginTop: '8px' }}>
                Check Redux DevTools for the action that caused this error
              </div>
            )}
          </div>
        )}

        {/* Task list */}
        {!loading && tasks.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6c757d' }}>
            <p style={{ fontSize: '18px' }}>No tasks yet. Click "Add Task" to get started!</p>
          </div>
        ) : (
          <div 
            style={{ display: 'grid', gap: '16px' }}
            role="list"
            aria-labelledby="tasks-heading"
          >
            {tasks.map(task => (
              <article
                key={task.id}
                role="listitem"
                style={{
                  backgroundColor: 'white',
                  padding: '20px',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
                  border: '1px solid #e9ecef',
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '12px' }}>
                  <h3 style={{ margin: 0, color: '#333', fontSize: '20px' }}>
                    {task.title}
                  </h3>
                  <div style={{ display: 'flex', gap: '8px' }} role="group" aria-label="Task actions">
                    <button
                      onClick={() => handleEditTask(task)}
                      aria-label={`Edit task: ${task.title}`}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#667eea',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteTask(task.id, task.title)}
                      aria-label={`Delete task: ${task.title}`}
                      style={{
                        padding: '6px 12px',
                        backgroundColor: '#dc3545',
                        color: 'white',
                        border: 'none',
                        borderRadius: '4px',
                        cursor: 'pointer',
                        fontSize: '14px',
                      }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                <p style={{ color: '#6c757d', marginBottom: '12px' }}>
                  {task.description}
                </p>
                <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
                  <span
                    style={{
                      padding: '4px 12px',
                      backgroundColor: getStatusColor(task.status),
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
                    aria-label={`Status: ${getStatusLabel(task.status)}`}
                  >
                    {getStatusLabel(task.status)}
                  </span>
                  <span
                    style={{
                      padding: '4px 12px',
                      backgroundColor: getPriorityColor(task.priority),
                      color: 'white',
                      borderRadius: '4px',
                      fontSize: '14px',
                      fontWeight: '500',
                    }}
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
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              backgroundColor: 'rgba(0,0,0,0.5)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              zIndex: 1000,
            }}
            onClick={handleFormCancel}
          >
            <div
              style={{
                backgroundColor: 'white',
                padding: '30px',
                borderRadius: '12px',
                maxWidth: '500px',
                width: '90%',
                maxHeight: '90vh',
                overflow: 'auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <h2 id="modal-title" style={{ marginTop: 0, marginBottom: '20px', color: '#333' }}>
                {selectedTask ? 'Edit Task' : 'Create New Task'}
              </h2>
              <form onSubmit={handleFormSubmit}>
                <div style={{ marginBottom: '16px' }}>
                  <label 
                    htmlFor="task-title-input"
                    style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}
                  >
                    Title <span aria-label="required">*</span>
                  </label>
                  <input
                    id="task-title-input"
                    type="text"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                    aria-required="true"
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ced4da',
                      borderRadius: '6px',
                      fontSize: '16px',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label 
                    htmlFor="task-description-input"
                    style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}
                  >
                    Description
                  </label>
                  <textarea
                    id="task-description-input"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    rows={4}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ced4da',
                      borderRadius: '6px',
                      fontSize: '16px',
                      resize: 'vertical',
                    }}
                  />
                </div>
                <div style={{ marginBottom: '16px' }}>
                  <label 
                    htmlFor="task-status-select"
                    style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}
                  >
                    Status
                  </label>
                  <select
                    id="task-status-select"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ced4da',
                      borderRadius: '6px',
                      fontSize: '16px',
                    }}
                  >
                    <option value="TODO">To Do</option>
                    <option value="IN_PROGRESS">In Progress</option>
                    <option value="COMPLETED">Completed</option>
                  </select>
                </div>
                <div style={{ marginBottom: '24px' }}>
                  <label 
                    htmlFor="task-priority-select"
                    style={{ display: 'block', marginBottom: '8px', fontWeight: '500', color: '#333' }}
                  >
                    Priority
                  </label>
                  <select
                    id="task-priority-select"
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value as any })}
                    style={{
                      width: '100%',
                      padding: '10px',
                      border: '1px solid #ced4da',
                      borderRadius: '6px',
                      fontSize: '16px',
                    }}
                  >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                  </select>
                </div>
                <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-end' }}>
                  <button
                    type="button"
                    onClick={handleFormCancel}
                    aria-label="Cancel and close form"
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#6c757d',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '16px',
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    aria-label={selectedTask ? 'Update task' : 'Create task'}
                    style={{
                      padding: '10px 20px',
                      backgroundColor: '#667eea',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontSize: '16px',
                      fontWeight: '500',
                    }}
                  >
                    {selectedTask ? 'Update' : 'Create'}
                  </button>
                </div>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Live region for screen reader announcements */}
      <div
        id="sr-announcements"
        role="status"
        aria-live="polite"
        aria-atomic="true"
        style={{
          position: 'absolute',
          left: '-10000px',
          width: '1px',
          height: '1px',
          overflow: 'hidden',
        }}
      />

      {/* Redux state inspector - Development only */}
      {process.env.NODE_ENV === 'development' && (
        <aside
          aria-label="Redux state inspector"
          style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            background: 'rgba(0,0,0,0.8)',
            color: 'white',
            padding: '12px 16px',
            borderRadius: '8px',
            fontSize: '12px',
            maxWidth: '300px',
            zIndex: 9999,
          }}
        >
          <div style={{ fontWeight: 'bold', marginBottom: '8px' }}>
            📊 Redux State Summary
          </div>
          <div>Tasks: {tasks.length}</div>
          <div>Loading: {loading ? 'Yes' : 'No'}</div>
          <div>Error: {error || 'None'}</div>
          <div style={{ marginTop: '8px', fontSize: '11px', opacity: 0.8 }}>
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
    // Clear after announcement
    setTimeout(() => {
      announcer.textContent = '';
    }, 1000);
  }
}

/**
 * App Component - Root with Redux Provider
 * 
 * Demonstrates enterprise architecture:
 * - Redux Provider for centralized state management
 * - Proper provider composition
 * - Type-safe Redux integration
 */
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <TasksPage />
    </Provider>
  );
};

export default App;

/**
 * INTERVIEW TALKING POINTS:
 * 
 * 1. REDUX ARCHITECTURE:
 *    - Centralized state management with Redux Toolkit
 *    - Redux Thunk for async operations (API calls)
 *    - Type-safe with TypeScript throughout
 *    - Custom hooks abstract Redux complexity
 * 
 * 2. ACCESSIBILITY (WCAG 2.1 AA):
 *    - Semantic HTML (header, main, article, aside)
 *    - ARIA labels and roles
 *    - Keyboard navigation (Tab, Enter, Escape)
 *    - Focus management for modals
 *    - Screen reader announcements
 *    - Skip to main content link
 * 
 * 3. CUSTOM HOOKS PATTERN:
 *    - useTasks hook encapsulates Redux logic
 *    - Components don't need Redux knowledge
 *    - Easy to test and maintain
 *    - Reusable across components
 * 
 * 4. ERROR HANDLING:
 *    - Centralized error state in Redux
 *    - User-friendly error messages
 *    - Screen reader announcements for errors
 *    - Try-catch in async operations
 * 
 * 5. PERFORMANCE:
 *    - Memoized selectors in Redux
 *    - useCallback for stable references
 *    - Optimized re-renders
 * 
 * 6. ENTERPRISE PATTERNS:
 *    - Separation of concerns
 *    - Type safety throughout
 *    - Scalable architecture
 *    - Development tools integration
 */

// Made with Bob
