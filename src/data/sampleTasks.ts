import { TaskStatus, TaskPriority } from '../types';

/**
 * Sample task data for testing and demonstration
 * 
 * This file contains 60 diverse tasks with:
 * - All status types (TODO, IN_PROGRESS, COMPLETED)
 * - All priority levels (LOW, MEDIUM, HIGH, URGENT)
 * - Realistic titles and descriptions
 * - Perfect for testing filters and pagination
 */

export const sampleTasks = [
  // URGENT Priority Tasks (8 tasks)
  { title: 'Server downtime investigation', description: 'Production server experiencing intermittent outages', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.URGENT },
  { title: 'Data breach response', description: 'Investigate and contain potential security incident', status: TaskStatus.TODO, priority: TaskPriority.URGENT },
  { title: 'Critical payment gateway failure', description: 'Payment processing completely down, affecting revenue', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.URGENT },
  { title: 'Database corruption recovery', description: 'Primary database showing signs of corruption', status: TaskStatus.TODO, priority: TaskPriority.URGENT },
  { title: 'DDoS attack mitigation', description: 'Website under active DDoS attack', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.URGENT },
  { title: 'SSL certificate expired', description: 'Production SSL certificate expired 2 hours ago', status: TaskStatus.COMPLETED, priority: TaskPriority.URGENT },
  { title: 'Memory leak causing crashes', description: 'Application crashing every 30 minutes due to memory leak', status: TaskStatus.TODO, priority: TaskPriority.URGENT },
  { title: 'API rate limit exceeded', description: 'Third-party API blocking our requests', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.URGENT },

  // HIGH Priority Tasks (17 tasks)
  { title: 'Fix critical security vulnerability', description: 'Address CVE-2024-1234 in authentication module', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.HIGH },
  { title: 'Deploy production hotfix', description: 'Emergency fix for payment processing bug', status: TaskStatus.TODO, priority: TaskPriority.HIGH },
  { title: 'Review pull request #456', description: 'Critical feature for Q4 release', status: TaskStatus.TODO, priority: TaskPriority.HIGH },
  { title: 'Setup CI/CD pipeline', description: 'Configure GitHub Actions for automated testing', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.HIGH },
  { title: 'Add accessibility audit', description: 'Run WAVE and axe DevTools on all pages', status: TaskStatus.TODO, priority: TaskPriority.HIGH },
  { title: 'Implement rate limiting', description: 'Add API rate limiting to prevent abuse', status: TaskStatus.TODO, priority: TaskPriority.HIGH },
  { title: 'Fix authentication bypass', description: 'Critical security flaw in login system', status: TaskStatus.COMPLETED, priority: TaskPriority.HIGH },
  { title: 'Optimize slow database queries', description: 'Dashboard loading takes 15+ seconds', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.HIGH },
  { title: 'Implement backup system', description: 'Automated daily backups for production database', status: TaskStatus.TODO, priority: TaskPriority.HIGH },
  { title: 'Add error monitoring', description: 'Integrate Sentry for production error tracking', status: TaskStatus.COMPLETED, priority: TaskPriority.HIGH },
  { title: 'Fix broken checkout flow', description: 'Users unable to complete purchases', status: TaskStatus.TODO, priority: TaskPriority.HIGH },
  { title: 'Upgrade Node.js version', description: 'Current version reaching end of life', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.HIGH },
  { title: 'Implement GDPR compliance', description: 'Add data export and deletion features', status: TaskStatus.TODO, priority: TaskPriority.HIGH },
  { title: 'Fix mobile responsive issues', description: 'Layout broken on iOS devices', status: TaskStatus.COMPLETED, priority: TaskPriority.HIGH },
  { title: 'Add load balancing', description: 'Distribute traffic across multiple servers', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.HIGH },
  { title: 'Implement caching strategy', description: 'Redis caching for frequently accessed data', status: TaskStatus.TODO, priority: TaskPriority.HIGH },
  { title: 'Security penetration testing', description: 'Hire external firm for security audit', status: TaskStatus.TODO, priority: TaskPriority.HIGH },

  // MEDIUM Priority Tasks (25 tasks)
  { title: 'Update API documentation', description: 'Document new endpoints for v2.0 API', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.MEDIUM },
  { title: 'Refactor user authentication', description: 'Improve code quality and add unit tests', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM },
  { title: 'Optimize database queries', description: 'Reduce query time for dashboard analytics', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM },
  { title: 'Implement dark mode', description: 'Add theme toggle and dark color scheme', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.MEDIUM },
  { title: 'Add error logging', description: 'Integrate Sentry for error tracking', status: TaskStatus.COMPLETED, priority: TaskPriority.MEDIUM },
  { title: 'Write unit tests for TaskSlice', description: 'Achieve 80% code coverage for Redux slice', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM },
  { title: 'Migrate to TypeScript 5.0', description: 'Update project to latest TypeScript version', status: TaskStatus.COMPLETED, priority: TaskPriority.MEDIUM },
  { title: 'Performance optimization', description: 'Reduce bundle size and improve load time', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.MEDIUM },
  { title: 'Create user onboarding flow', description: 'Design and implement tutorial for new users', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM },
  { title: 'Setup monitoring dashboard', description: 'Configure Grafana for system metrics', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.MEDIUM },
  { title: 'Implement email notifications', description: 'Send alerts for important events', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM },
  { title: 'Add user profile page', description: 'Allow users to update their information', status: TaskStatus.COMPLETED, priority: TaskPriority.MEDIUM },
  { title: 'Implement search functionality', description: 'Add full-text search across all content', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.MEDIUM },
  { title: 'Add export to CSV feature', description: 'Allow users to export data to spreadsheet', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM },
  { title: 'Implement file upload', description: 'Add drag-and-drop file upload component', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM },
  { title: 'Add real-time notifications', description: 'WebSocket-based notification system', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.MEDIUM },
  { title: 'Create admin dashboard', description: 'Build analytics dashboard for administrators', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM },
  { title: 'Implement two-factor authentication', description: 'Add 2FA for enhanced security', status: TaskStatus.COMPLETED, priority: TaskPriority.MEDIUM },
  { title: 'Add social media integration', description: 'Allow sharing content on social platforms', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM },
  { title: 'Optimize image loading', description: 'Implement lazy loading and WebP format', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.MEDIUM },
  { title: 'Add keyboard shortcuts', description: 'Implement power user keyboard shortcuts', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM },
  { title: 'Create API rate limiting dashboard', description: 'Monitor API usage and limits', status: TaskStatus.COMPLETED, priority: TaskPriority.MEDIUM },
  { title: 'Implement data validation', description: 'Add comprehensive input validation', status: TaskStatus.IN_PROGRESS, priority: TaskPriority.MEDIUM },
  { title: 'Add user activity logging', description: 'Track user actions for analytics', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM },
  { title: 'Create mobile app', description: 'Build React Native mobile application', status: TaskStatus.TODO, priority: TaskPriority.MEDIUM },

  // LOW Priority Tasks (10 tasks)
  { title: 'Update README documentation', description: 'Add installation instructions and examples', status: TaskStatus.TODO, priority: TaskPriority.LOW },
  { title: 'Clean up old dependencies', description: 'Remove unused npm packages', status: TaskStatus.TODO, priority: TaskPriority.LOW },
  { title: 'Add code comments', description: 'Document complex algorithms in utils', status: TaskStatus.COMPLETED, priority: TaskPriority.LOW },
  { title: 'Organize project files', description: 'Restructure components directory', status: TaskStatus.COMPLETED, priority: TaskPriority.LOW },
  { title: 'Design new landing page', description: 'Create mockups for marketing site redesign', status: TaskStatus.TODO, priority: TaskPriority.LOW },
  { title: 'Update dependencies', description: 'Upgrade React to v18.3 and other packages', status: TaskStatus.COMPLETED, priority: TaskPriority.LOW },
  { title: 'Add internationalization', description: 'Support multiple languages (i18n)', status: TaskStatus.TODO, priority: TaskPriority.LOW },
  { title: 'Create style guide', description: 'Document design system and components', status: TaskStatus.TODO, priority: TaskPriority.LOW },
  { title: 'Add Easter eggs', description: 'Fun hidden features for users to discover', status: TaskStatus.TODO, priority: TaskPriority.LOW },
  { title: 'Improve error messages', description: 'Make error messages more user-friendly', status: TaskStatus.COMPLETED, priority: TaskPriority.LOW },
];

