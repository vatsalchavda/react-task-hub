import { useEffect, useCallback, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '@store/index';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  setFilter,
  setSelectedTask,
  setPage,
  setItemsPerPage,
  updateTotalPages,
  addTagToTask,
  removeTagFromTask,
} from '@store/slices/taskSlice';
import { Task, TaskFilter, TaskStatus, TaskPriority } from '../types';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, selectedTask, filter, pagination, loading, error } = useAppSelector(
    (state) => state.tasks
  );

  // Filter tasks based on current filter
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const statusMatch = !filter.status || task.status === filter.status;
      const priorityMatch = !filter.priority || task.priority === filter.priority;
      
      // ADD TAG FILTERING
      const tagMatch = !filter.tags || filter.tags.length === 0 || 
      filter.tags.some(filterTag => task.tags?.includes(filterTag));
      return statusMatch && priorityMatch && tagMatch;
    });
  }, [tasks, filter]);

  // Calculate paginated tasks
  const paginatedTasks = useMemo(() => {
    const startIndex = (pagination.currentPage - 1) * pagination.itemsPerPage;
    const endIndex = startIndex + pagination.itemsPerPage;
    return filteredTasks.slice(startIndex, endIndex);
  }, [filteredTasks, pagination.currentPage, pagination.itemsPerPage]);

  // Update total pages when filtered tasks change
  useEffect(() => {
    const totalPages = Math.ceil(filteredTasks.length / pagination.itemsPerPage) || 1;
    dispatch(updateTotalPages(totalPages));
  }, [filteredTasks.length, pagination.itemsPerPage, dispatch]);

  useEffect(() => {
    dispatch(fetchTasks(filter));
  }, [dispatch, filter]);

  const handleCreateTask = useCallback(
    async (taskData: Partial<Task>) => {
      try {
        await dispatch(createTask(taskData)).unwrap();
      } catch (err) {
        console.error('Failed to create task:', err);
      }
    },
    [dispatch]
  );

  const handleUpdateTask = useCallback(
    async (id: string, updates: Partial<Task>) => {
      try {
        await dispatch(updateTask({ id, updates })).unwrap();
      } catch (err) {
        console.error('Failed to update task:', err);
      }
    },
    [dispatch]
  );

  const handleDeleteTask = useCallback(
    async (id: string) => {
      try {
        await dispatch(deleteTask(id)).unwrap();
      } catch (err) {
        console.error('Failed to delete task:', err);
      }
    },
    [dispatch]
  );

  const handleSetFilter = useCallback(
    (newFilter: TaskFilter) => {
      dispatch(setFilter(newFilter));
    },
    [dispatch]
  );

  const handleSelectTask = useCallback(
    (task: Task | null) => {
      dispatch(setSelectedTask(task));
    },
    [dispatch]
  );

  const handleSetPage = useCallback(
    (page: number) => {
      dispatch(setPage(page));
    },
    [dispatch]
  );

  const handleSetItemsPerPage = useCallback(
    (itemsPerPage: number) => {
      dispatch(setItemsPerPage(itemsPerPage));
    },
    [dispatch]
  );

  const handleAddTag = useCallback(
    (taskId: string, tag: string) => {
      dispatch(addTagToTask({ id: taskId, tag: tag.trim() }));
    },
    [dispatch]
  );

  const handleRemoveTag = useCallback(
    (taskId: string, tag: string) => {
      dispatch(removeTagFromTask({ id: taskId, tag }));
    },
    [dispatch]
  );

  // Get all unique tags from all tasks
  const allTags = useMemo(() => {
    const tagSet = new Set<string>();
    tasks.forEach(task => {
      task.tags?.forEach(tag => tagSet.add(tag));
    });
    return Array.from(tagSet).sort();
  }, [tasks]);

  return {
    tasks: paginatedTasks,
    allTasks: tasks,
    filteredTasks,
    selectedTask,
    filter,
    pagination,
    loading,
    error,
    allTags,
    addTag: handleAddTag,
    removeTag: handleRemoveTag,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    setFilter: handleSetFilter,
    selectTask: handleSelectTask,
    setPage: handleSetPage,
    setItemsPerPage: handleSetItemsPerPage,
  };
};