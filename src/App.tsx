import React, { useState } from 'react';
import { Provider } from 'react-redux';
import { ApolloProvider } from '@apollo/client';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { store } from '@store/index';
import apolloClient from '@services/graphql/client';
import { TaskList } from '@components/TaskList/TaskList';
import { TaskForm } from '@components/TaskForm/TaskForm';
import { FilterBar } from '@components/FilterBar/FilterBar';
import { useTasks } from '@hooks/useTasks';
import { Task } from './types';
import './App.css';

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

  const handleCreateTask = () => {
    selectTask(null);
    setShowForm(true);
  };

  const handleEditTask = (task: Task) => {
    selectTask(task);
    setShowForm(true);
  };

  const handleFormSubmit = async (taskData: Partial<Task>) => {
    if (selectedTask) {
      await updateTask(selectedTask.id, taskData);
    } else {
      await createTask(taskData);
    }
    setShowForm(false);
    selectTask(null);
  };

  const handleFormCancel = () => {
    setShowForm(false);
    selectTask(null);
  };

  const handleStatusChange = async (taskId: string, status: any) => {
    await updateTask(taskId, { status });
  };

  const handleDeleteTask = async (taskId: string) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      await deleteTask(taskId);
    }
  };

  return (
    <div className="app-container">
      <header className="app-header">
        <h1>React Task Hub</h1>
        <p>Manage your tasks efficiently with React, Redux & GraphQL</p>
      </header>

      <main className="app-main">
        <FilterBar
          filter={filter}
          onFilterChange={setFilter}
          onCreateTask={handleCreateTask}
        />

        {loading && <div className="loading">Loading tasks...</div>}
        {error && <div className="error">Error: {error}</div>}

        <TaskList
          tasks={tasks}
          onTaskClick={handleEditTask}
          onStatusChange={handleStatusChange}
          onDeleteTask={handleDeleteTask}
        />

        {showForm && (
          <TaskForm
            task={selectedTask}
            onSubmit={handleFormSubmit}
            onCancel={handleFormCancel}
          />
        )}
      </main>
    </div>
  );
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <ApolloProvider client={apolloClient}>
        <Router>
          <Routes>
            <Route path="/" element={<TasksPage />} />
            <Route path="/tasks" element={<TasksPage />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </ApolloProvider>
    </Provider>
  );
};

export default App;

// Made with Bob
