import { useEffect, useCallback } from 'react';
import { useAppDispatch, useAppSelector } from '@store/index';
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
  setFilter,
  setSelectedTask,
} from '@store/slices/taskSlice';
import { Task, TaskFilter } from '../types';

export const useTasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, selectedTask, filter, loading, error } = useAppSelector(
    (state) => state.tasks
  );

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

  return {
    tasks,
    selectedTask,
    filter,
    loading,
    error,
    createTask: handleCreateTask,
    updateTask: handleUpdateTask,
    deleteTask: handleDeleteTask,
    setFilter: handleSetFilter,
    selectTask: handleSelectTask,
  };
};

// Made with Bob
