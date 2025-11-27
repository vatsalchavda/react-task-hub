# React Task Hub

A modern, scalable task management application built with React, Redux, TypeScript, and GraphQL. This project demonstrates enterprise-level architecture patterns and best practices for building production-ready web applications.

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Docker Desktop (optional)

### Option 1: Run Locally (Recommended)

```bash
# Navigate to project
cd projects/react-task-hub

# Install dependencies
npm install

# Start development server
npm run dev

# Open browser to http://localhost:3000
```

### Option 2: Run with Docker

```bash
# Navigate to project
cd projects/react-task-hub

# Build and run
docker-compose up

# Open browser to http://localhost:3000
```

---

## 📋 Tech Stack & Features

**Technologies:**
- React 18 with TypeScript
- Redux Toolkit with Redux Thunk
- GraphQL with Apollo Client
- React Router v6
- Webpack 5
- Docker containerization

**Features:**
- ✅ Create, read, update, delete tasks
- ✅ Filter by status, priority, search
- ✅ Real-time state management
- ✅ Type-safe development
- ✅ Responsive design
- ✅ Modular architecture

---

## 🏗️ Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                        React App                             │
│                                                              │
│  ┌────────────────────────────────────────────────────┐    │
│  │              Components Layer                       │    │
│  │  ┌──────────┐  ┌──────────┐  ┌──────────────┐    │    │
│  │  │TaskList  │  │TaskForm  │  │ FilterBar    │    │    │
│  │  └────┬─────┘  └────┬─────┘  └──────┬───────┘    │    │
│  │       │             │                │             │    │
│  └───────┼─────────────┼────────────────┼─────────────┘    │
│          │             │                │                   │
│  ┌───────▼─────────────▼────────────────▼─────────────┐    │
│  │              Custom Hooks Layer                     │    │
│  │           ┌─────────────────────┐                   │    │
│  │           │    useTasks Hook    │                   │    │
│  │           └──────────┬──────────┘                   │    │
│  └──────────────────────┼────────────────────────────────┘  │
│                         │                                    │
│  ┌──────────────────────▼────────────────────────────────┐  │
│  │              Redux Store Layer                        │  │
│  │  ┌─────────────────────────────────────────────┐     │  │
│  │  │         Task Slice (State + Reducers)       │     │  │
│  │  │  • tasks[]                                  │     │  │
│  │  │  • selectedTask                             │     │  │
│  │  │  • filter                                   │     │  │
│  │  │  • loading, error                           │     │  │
│  │  └──────────────────┬──────────────────────────┘     │  │
│  │                     │                                 │  │
│  │  ┌──────────────────▼──────────────────────────┐     │  │
│  │  │         Redux Thunk Middleware              │     │  │
│  │  │  • Async action handling                    │     │  │
│  │  │  • Side effects management                  │     │  │
│  │  └──────────────────┬──────────────────────────┘     │  │
│  └─────────────────────┼──────────────────────────────────┘│
│                        │                                    │
│  ┌─────────────────────▼──────────────────────────────┐    │
│  │              Services Layer                        │    │
│  │  ┌──────────────────────────────────────────┐     │    │
│  │  │      GraphQL Client (Apollo)             │     │    │
│  │  │  • Queries (GET_TASKS, GET_TASK_BY_ID)   │     │    │
│  │  │  • Mutations (CREATE, UPDATE, DELETE)    │     │    │
│  │  │  • Cache management                      │     │    │
│  │  └──────────────────┬───────────────────────┘     │    │
│  └─────────────────────┼──────────────────────────────────┘│
└────────────────────────┼───────────────────────────────────┘
                         │
                         ▼
              ┌──────────────────────┐
              │   GraphQL API Server │
              └──────────────────────┘
```

---

## 📁 Project Structure

```
react-task-hub/
├── src/
│   ├── components/         # React components
│   │   ├── TaskList/
│   │   ├── TaskForm/
│   │   └── FilterBar/
│   ├── store/             # Redux store
│   │   ├── index.ts
│   │   └── slices/
│   ├── services/          # GraphQL services
│   │   └── graphql/
│   ├── hooks/             # Custom hooks
│   ├── types/             # TypeScript types
│   ├── App.tsx            # Main app
│   └── index.tsx          # Entry point
├── public/                # Static files
├── Dockerfile             # Docker config
├── docker-compose.yml     # Docker Compose
├── package.json           # Dependencies
├── webpack.config.js      # Build config
├── tsconfig.json          # TypeScript config
├── README.md              # This file
└── KNOWLEDGE_BASE.md      # Interview prep guide
```

---

## 🔄 Data Flow

1. **User Interaction** → Component triggers action
2. **Component** → Calls custom hook (useTasks)
3. **Custom Hook** → Dispatches Redux action
4. **Redux Thunk** → Handles async operations
5. **GraphQL Client** → Makes API request
6. **API Response** → Returns data
7. **Redux Store** → Updates state
8. **Component** → Re-renders with new data

---

## 🛠️ Available Commands

```bash
# Development
npm install          # Install dependencies
npm run dev         # Start dev server
npm run build       # Build for production
npm run lint        # Lint code

# Docker
docker-compose up           # Start with Docker
docker-compose up -d        # Start in background
docker-compose down         # Stop containers
docker-compose logs -f      # View logs
```

---

## 🔧 Troubleshooting

### Port 3000 Already in Use

**Windows:**
```bash
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

**Mac/Linux:**
```bash
lsof -ti:3000 | xargs kill -9
```

### npm install Fails

**Windows:** Run PowerShell as Administrator

**Mac/Linux:**
```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
export PATH=~/.npm-global/bin:$PATH
```

### TypeScript Errors in VS Code

These are expected before running `npm install`. They will disappear after installing dependencies.

### Module Not Found

```bash
rm -rf node_modules package-lock.json
npm install
```

---

## 🎯 Key Concepts Demonstrated

### React
- Functional components with TypeScript
- React Hooks (useState, useEffect, useCallback)
- Custom hooks for reusable logic
- Component composition
- Controlled components

### Redux
- Redux Toolkit for simplified Redux
- Slices for modular state
- Redux Thunk for async actions
- Typed hooks (useAppDispatch, useAppSelector)
- Immutable state updates

### TypeScript
- Interface definitions
- Type safety throughout
- Enums for constants
- Generic types
- Type inference

### GraphQL
- Queries for data fetching
- Mutations for data modification
- Apollo Client configuration
- Cache management
- Error handling

---

## 📚 Interview Preparation

For comprehensive interview preparation including:
- React, Redux, TypeScript, GraphQL concepts
- Common interview questions with answers
- Code examples and explanations
- Best practices and patterns

**See:** [`KNOWLEDGE_BASE.md`](./KNOWLEDGE_BASE.md)

---

## 🌐 Environment Variables

Create a `.env` file:

```env
GRAPHQL_ENDPOINT=https://your-graphql-api.com/graphql
```

---

## 📦 Scalability Features

### Modular Architecture
- Separation of concerns
- Reusable components
- Custom hooks for shared logic

### State Management
- Centralized store
- Normalized state
- Middleware support

### Type Safety
- TypeScript throughout
- Strict mode enabled
- Interface-driven development

### Performance
- Code splitting with Webpack
- Component memoization
- Optimized builds

---

## 🔮 Future Enhancements

- [ ] Authentication and authorization
- [ ] Real-time updates with WebSockets
- [ ] Task comments and attachments
- [ ] Drag-and-drop task reordering
- [ ] Data visualization dashboard
- [ ] Offline support with service workers
- [ ] Internationalization (i18n)
- [ ] Comprehensive testing suite

---

## 📄 License

MIT License - Free to use for learning and development

---

**Built with ❤️ using React, Redux, TypeScript, and GraphQL**