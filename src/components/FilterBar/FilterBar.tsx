import React from 'react';
import { TaskStatus, TaskPriority, TaskFilter } from '../../types';
import './FilterBar.css';

interface FilterBarProps {
  filter: TaskFilter;
  onFilterChange: (filter: TaskFilter) => void;
  onCreateTask: () => void;
}

export const FilterBar: React.FC<FilterBarProps> = ({
  filter,
  onFilterChange,
  onCreateTask,
}) => {
  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange({
      ...filter,
      status: value ? (value as TaskStatus) : undefined,
    });
  };

  const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    onFilterChange({
      ...filter,
      priority: value ? (value as TaskPriority) : undefined,
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onFilterChange({
      ...filter,
      searchQuery: e.target.value,
    });
  };

  const handleClearFilters = () => {
    onFilterChange({});
  };

  const hasActiveFilters = filter.status || filter.priority || filter.searchQuery;

  return (
    <div className="filter-bar">
      <div className="filter-controls">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks..."
            value={filter.searchQuery || ''}
            onChange={handleSearchChange}
            className="search-input"
          />
        </div>

        <select
          value={filter.status || ''}
          onChange={handleStatusChange}
          className="filter-select"
        >
          <option value="">All Status</option>
          <option value={TaskStatus.TODO}>To Do</option>
          <option value={TaskStatus.IN_PROGRESS}>In Progress</option>
          <option value={TaskStatus.COMPLETED}>Completed</option>
          <option value={TaskStatus.ARCHIVED}>Archived</option>
        </select>

        <select
          value={filter.priority || ''}
          onChange={handlePriorityChange}
          className="filter-select"
        >
          <option value="">All Priority</option>
          <option value={TaskPriority.LOW}>Low</option>
          <option value={TaskPriority.MEDIUM}>Medium</option>
          <option value={TaskPriority.HIGH}>High</option>
          <option value={TaskPriority.URGENT}>Urgent</option>
        </select>

        {hasActiveFilters && (
          <button className="clear-filters-btn" onClick={handleClearFilters}>
            Clear Filters
          </button>
        )}
      </div>

      <button className="create-task-btn" onClick={onCreateTask}>
        + Create Task
      </button>
    </div>
  );
};

