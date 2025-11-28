import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './store';
import { AppRoutes } from './routes';
import './App.css';

/**
 * App Component - Root Application Component
 * 
 * Architecture Overview:
 * - Redux for global state management
 * - React Router for client-side routing
 * - Lazy loading for code splitting
 * - Layout pattern with shared navigation
 * - TypeScript for type safety
 * 
 * Key Features Demonstrated:
 * 1. Redux Integration
 *    - Centralized state management
 *    - Redux Thunk for async operations
 *    - Redux DevTools for debugging
 * 
 * 2. React Router v6
 *    - Client-side routing
 *    - Nested routes with Layout
 *    - Lazy loading with Suspense
 *    - 404 error handling
 * 
 * 3. Accessibility (WCAG 2.1 AA)
 *    - ARIA labels and roles
 *    - Keyboard navigation
 *    - Focus management
 *    - Screen reader support
 * 
 * 4. Performance Optimization
 *    - Code splitting with lazy loading
 *    - Pagination for large datasets
 *    - Memoization where appropriate
 * 
 * 5. Modern React Patterns
 *    - Functional components with hooks
 *    - Custom hooks (useTasks)
 *    - Component composition
 *    - Separation of concerns
 * 
 * Interview Talking Points:
 * - Explain Redux flow: Action → Reducer → Store → Component
 * - Discuss React Router benefits: SPA navigation, code splitting
 * - Highlight accessibility features and WCAG compliance
 * - Demonstrate understanding of performance optimization
 * - Show knowledge of TypeScript benefits
 */
const App: React.FC = () => {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </Provider>
  );
};

export default App;

