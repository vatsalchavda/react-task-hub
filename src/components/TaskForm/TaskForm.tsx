import React, { useState, useEffect } from 'react';
import { Task, TaskStatus, TaskPriority } from '../../types';
import './TaskForm.css';

interface TaskFormProps {
  task?: Task | null;
  onSubmit: (taskData: Partial<Task>) => void;
  onCancel: () => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({ task, onSubmit, onCancel }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: TaskStatus.TODO,
    priority: TaskPriority.MEDIUM,
    assignee: '',
    tags: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        assignee: task.assignee || '',
        tags: task.tags?.join(', ') || '',
      });
    }
  }, [task]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const taskData: Partial<Task> = {
      title: formData.title,
      description: formData.description,
      status: formData.status as TaskStatus,
      priority: formData.priority as TaskPriority,
      assignee: formData.assignee || undefined,
      tags: formData.tags
        ? formData.tags.split(',').map((tag) => tag.trim()).filter(Boolean)
        : undefined,
    };

    onSubmit(taskData);
  };

  return (
    <div className="task-form-overlay">
      <div className="task-form-container">
        <div className="task-form-header">
          <h2>{task ? 'Edit Task' : 'Create New Task'}</h2>
          <button className="close-btn" onClick={onCancel}>
            ×
          </button>
        </div>

        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-group">
            <label htmlFor="title">Title *</label>
            <input
              type="text"
              id="title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              required
              placeholder="Enter task title"
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Enter task description"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label htmlFor="status">Status</label>
              <select
                id="status"
                name="status"
                value={formData.status}
                onChange={handleChange}
              >
                <option value={TaskStatus.TODO}>To Do</option>
                <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
                <option value={TaskStatus.COMPLETED}>Completed</option>
                <option value={TaskStatus.ARCHIVED}>Archived</option>
              </select>
            </div>

            <div className="form-group">
              <label htmlFor="priority">Priority</label>
              <select
                id="priority"
                name="priority"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value={TaskPriority.LOW}>Low</option>
                <option value={TaskPriority.MEDIUM}>Medium</option>
                <option value={TaskPriority.HIGH}>High</option>
                <option value={TaskPriority.URGENT}>Urgent</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="assignee">Assignee</label>
            <input
              type="text"
              id="assignee"
              name="assignee"
              value={formData.assignee}
              onChange={handleChange}
              placeholder="Enter assignee name"
            />
          </div>

          <div className="form-group">
            <label htmlFor="tags">Tags (comma-separated)</label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              placeholder="e.g., frontend, bug, urgent"
            />
          </div>

          <div className="form-actions">
            <button type="button" className="cancel-btn" onClick={onCancel}>
              Cancel
            </button>
            <button type="submit" className="submit-btn">
              {task ? 'Update Task' : 'Create Task'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};