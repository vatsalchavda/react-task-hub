import React from 'react';
import { Task, TaskStatus } from '../../types';
import './TaskList.css';

interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
  onStatusChange: (taskId: string, status: TaskStatus) => void;
  onDeleteTask: (taskId: string) => void;
}

export const TaskList: React.FC<TaskListProps> = ({
  tasks,
  onTaskClick,
  onStatusChange,
  onDeleteTask,
}) => {
  const getStatusColor = (status: TaskStatus): string => {
    switch (status) {
      case TaskStatus.TODO:
        return '#6c757d';
      case TaskStatus.IN_PROGRESS:
        return '#007bff';
      case TaskStatus.COMPLETED:
        return '#28a745';
      case TaskStatus.ARCHIVED:
        return '#6c757d';
      default:
        return '#6c757d';
    }
  };

  const getPriorityBadge = (priority: string): string => {
    switch (priority) {
      case 'URGENT':
        return 'priority-urgent';
      case 'HIGH':
        return 'priority-high';
      case 'MEDIUM':
        return 'priority-medium';
      case 'LOW':
        return 'priority-low';
      default:
        return 'priority-medium';
    }
  };

  if (tasks.length === 0) {
    return (
      <div className="task-list-empty">
        <p>No tasks found. Create your first task to get started!</p>
      </div>
    );
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
          key={task.id}
          className="task-card"
          onClick={() => onTaskClick(task)}
        >
          <div className="task-header">
            <h3 className="task-title">{task.title}</h3>
            <span
              className={`priority-badge ${getPriorityBadge(task.priority)}`}
            >
              {task.priority}
            </span>
          </div>

          <p className="task-description">{task.description}</p>

          <div className="task-meta">
            <span className="task-assignee">
              {task.assignee || 'Unassigned'}
            </span>
            <span className="task-date">
              {new Date(task.updatedAt).toLocaleDateString()}
            </span>
          </div>

          {task.tags && task.tags.length > 0 && (
            <div className="task-tags">
              {task.tags.map((tag, index) => (
                <span key={index} className="task-tag">
                  {tag}
                </span>
              ))}
            </div>
          )}

          <div className="task-actions">
            <select
              className="status-select"
              value={task.status}
              onChange={(e) => {
                e.stopPropagation();
                onStatusChange(task.id, e.target.value as TaskStatus);
              }}
              style={{ borderColor: getStatusColor(task.status) }}
            >
              <option value={TaskStatus.TODO}>To Do</option>
              <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
              <option value={TaskStatus.COMPLETED}>Completed</option>
              <option value={TaskStatus.ARCHIVED}>Archived</option>
            </select>

            <button
              className="delete-btn"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteTask(task.id);
              }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

