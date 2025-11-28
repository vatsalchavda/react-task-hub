import React, { Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import { Layout } from '../components/Layout/Layout';
import { LoadingSpinner } from '../components/LoadingSpinner/LoadingSpinner';
import { Dashboard } from '../pages/Dashboard/Dashboard';
import { TasksPage } from '../pages/TasksPage/TasksPage';
import { NotFound } from '../pages/NotFound/NotFound';

// Get lazy loading configuration from environment variables
const ENABLE_LAZY_LOADING = process.env.REACT_APP_ENABLE_LAZY_LOADING === 'true';
const LAZY_LOADING_DELAY = parseInt(process.env.REACT_APP_LAZY_LOADING_DELAY || '3000', 10);

/**
 * Lazy load a component with optional artificial delay
 * This demonstrates code splitting and lazy loading concepts
 */
const lazyLoadWithDelay = (importFunc: () => Promise<any>) => {
  return React.lazy(() => {
    if (ENABLE_LAZY_LOADING) {
      return Promise.all([
        importFunc(),
        new Promise(resolve => setTimeout(resolve, LAZY_LOADING_DELAY))
      ]).then(([moduleExports]) => moduleExports);
    } else {
      return importFunc();
    }
  });
};

// Lazy load pages for code splitting
const Analytics = lazyLoadWithDelay(() => import('../pages/Analytics/Analytics').then(m => ({ default: m.Analytics })));
const Settings = lazyLoadWithDelay(() => import('../pages/Settings/Settings').then(m => ({ default: m.Settings })));
const About = lazyLoadWithDelay(() => import('../pages/About/About').then(m => ({ default: m.About })));

/**
 * AppRoutes Component
 * 
 * Demonstrates:
 * - React Router v6 routing
 * - Lazy loading with Suspense
 * - Layout wrapper pattern
 * - Code splitting
 * - 404 error handling
 */
export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Dashboard - loaded immediately (no lazy loading) */}
        <Route index element={<Dashboard />} />
        
        {/* Tasks page - loaded immediately */}
        <Route path="tasks" element={<TasksPage />} />
        
        {/* Lazy loaded routes with Suspense fallback */}
        <Route
          path="analytics"
          element={
            <Suspense fallback={<LoadingSpinner message="Loading Analytics..." />}>
              <Analytics />
            </Suspense>
          }
        />
        
        <Route
          path="settings"
          element={
            <Suspense fallback={<LoadingSpinner message="Loading Settings..." />}>
              <Settings />
            </Suspense>
          }
        />
        
        <Route
          path="about"
          element={
            <Suspense fallback={<LoadingSpinner message="Loading About..." />}>
              <About />
            </Suspense>
          }
        />
        
        {/* 404 Not Found */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

