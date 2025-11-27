# Interview Preparation Knowledge Base

## 📚 Complete Guide for React, Redux, TypeScript & GraphQL Interview

This document contains everything you need to know for your Senior Software Developer interview tomorrow. Focus on understanding these concepts and be ready to explain them with examples from this project.

---

## 🎯 Table of Contents

1. [React Fundamentals](#react-fundamentals)
2. [Redux & State Management](#redux--state-management)
3. [TypeScript Essentials](#typescript-essentials)
4. [GraphQL Concepts](#graphql-concepts)
5. [React Hooks Deep Dive](#react-hooks-deep-dive)
6. [Best Practices & Patterns](#best-practices--patterns)
7. [Common Interview Questions](#common-interview-questions)
8. [Project Walkthrough](#project-walkthrough)

---

## React Fundamentals

### What is React?
React is a JavaScript library for building user interfaces, particularly single-page applications. It uses a component-based architecture and virtual DOM for efficient rendering.

### Key Concepts

#### 1. **Components**
Building blocks of React applications. Two types:
- **Functional Components** (Modern approach - what we use)
- **Class Components** (Legacy)

**Example from our project:**
```typescript
// Functional component with TypeScript
export const TaskList: React.FC<TaskListProps> = ({ tasks, onTaskClick }) => {
  return (
    <div className="task-list">
      {tasks.map(task => (
        <div key={task.id}>{task.title}</div>
      ))}
    </div>
  );
};
```

#### 2. **JSX (JavaScript XML)**
Syntax extension that looks like HTML but is JavaScript.

```typescript
// JSX allows mixing HTML-like syntax with JavaScript
const element = <h1>Hello, {user.name}!</h1>;
```

#### 3. **Props (Properties)**
Data passed from parent to child components. Props are **read-only**.

```typescript
interface TaskListProps {
  tasks: Task[];
  onTaskClick: (task: Task) => void;
}
```

#### 4. **State**
Data that changes over time within a component.

```typescript
const [showForm, setShowForm] = useState(false);
```

#### 5. **Virtual DOM**
React creates a virtual representation of the DOM. When state changes:
1. React creates a new virtual DOM
2. Compares it with the previous one (diffing)
3. Updates only what changed in the real DOM (reconciliation)

**Why it's fast:** Batch updates and minimal DOM manipulation.

---

## Redux & State Management

### What is Redux?
A predictable state container for JavaScript apps. It centralizes application state and logic.

### Core Principles

#### 1. **Single Source of Truth**
The entire application state is stored in one object tree within a single store.

```typescript
// Our store structure
{
  tasks: {
    tasks: [],
    selectedTask: null,
    filter: {},
    loading: false,
    error: null
  }
}
```

#### 2. **State is Read-Only**
The only way to change state is to emit an action (an object describing what happened).

```typescript
dispatch(createTask({ title: 'New Task', description: 'Details' }));
```

#### 3. **Changes are Made with Pure Functions**
Reducers are pure functions that take previous state and action, return new state.

```typescript
// Pure function - same input always produces same output
const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.payload] };
    default:
      return state;
  }
};
```

### Redux Toolkit (Modern Redux)

**Why Redux Toolkit?**
- Less boilerplate code
- Built-in best practices
- Includes Redux Thunk for async operations
- Immer for immutable updates

**Key APIs:**

#### 1. **createSlice**
Creates reducer and actions together.

```typescript
const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSelectedTask: (state, action) => {
      state.selectedTask = action.payload; // Looks mutable but Immer handles it
    }
  }
});
```

#### 2. **createAsyncThunk**
Handles async operations (API calls).

```typescript
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (filter: TaskFilter) => {
    const response = await fetch('/api/tasks');
    return response.json();
  }
);
```

**Lifecycle:**
- `pending`: Request started
- `fulfilled`: Request succeeded
- `rejected`: Request failed

### Redux Thunk

Middleware that allows you to write action creators that return functions instead of actions.

```typescript
// Without Thunk (can't do async)
const action = { type: 'ADD_TASK', payload: task };

// With Thunk (can do async)
const asyncAction = (dispatch) => {
  fetch('/api/tasks')
    .then(response => response.json())
    .then(data => dispatch({ type: 'ADD_TASK', payload: data }));
};
```

### When to Use Redux?

**Use Redux when:**
- Multiple components need the same state
- State needs to be accessed from many places
- Complex state logic
- Need time-travel debugging

**Don't use Redux when:**
- Simple local component state
- State only used in one component
- Small applications

---

## TypeScript Essentials

### What is TypeScript?
TypeScript is a superset of JavaScript that adds static typing. It compiles to plain JavaScript.

### Why TypeScript?

1. **Type Safety**: Catch errors at compile time
2. **Better IDE Support**: Autocomplete, refactoring
3. **Self-Documenting**: Types serve as documentation
4. **Easier Refactoring**: Compiler catches breaking changes

### Key Concepts

#### 1. **Basic Types**

```typescript
// Primitives
let name: string = "John";
let age: number = 30;
let isActive: boolean = true;

// Arrays
let numbers: number[] = [1, 2, 3];
let strings: Array<string> = ["a", "b"];

// Any (avoid when possible)
let anything: any = "could be anything";
```

#### 2. **Interfaces**
Define the shape of objects.

```typescript
interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
}

// Using the interface
const task: Task = {
  id: "1",
  title: "Learn TypeScript",
  description: "Study for interview",
  status: TaskStatus.IN_PROGRESS,
  priority: TaskPriority.HIGH
};
```

#### 3. **Enums**
Define a set of named constants.

```typescript
enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
  ARCHIVED = 'ARCHIVED'
}

// Usage
const status: TaskStatus = TaskStatus.TODO;
```

#### 4. **Union Types**
A value can be one of several types.

```typescript
type Status = 'pending' | 'success' | 'error';
let currentStatus: Status = 'pending'; // OK
let currentStatus: Status = 'loading'; // Error!
```

#### 5. **Generics**
Create reusable components that work with multiple types.

```typescript
interface ApiResponse<T> {
  data: T;
  error?: string;
  loading: boolean;
}

// Usage
const taskResponse: ApiResponse<Task[]> = {
  data: [],
  loading: false
};
```

#### 6. **Type Inference**
TypeScript can automatically infer types.

```typescript
let count = 5; // TypeScript infers: number
const user = { name: "John", age: 30 }; // Infers object shape
```

#### 7. **Utility Types**

```typescript
// Partial - makes all properties optional
type PartialTask = Partial<Task>;

// Pick - select specific properties
type TaskPreview = Pick<Task, 'id' | 'title'>;

// Omit - exclude specific properties
type TaskWithoutId = Omit<Task, 'id'>;

// Required - makes all properties required
type RequiredTask = Required<Task>;
```

---

## GraphQL Concepts

### What is GraphQL?
A query language for APIs and a runtime for executing those queries. Alternative to REST.

### GraphQL vs REST

| Feature | REST | GraphQL |
|---------|------|---------|
| Endpoints | Multiple (/users, /posts) | Single (/graphql) |
| Data Fetching | Fixed structure | Request exactly what you need |
| Over-fetching | Common | Eliminated |
| Under-fetching | Requires multiple requests | Single request |
| Versioning | URL versioning | Schema evolution |

### Core Concepts

#### 1. **Schema**
Defines the structure of your API.

```graphql
type Task {
  id: ID!
  title: String!
  description: String!
  status: TaskStatus!
  priority: TaskPriority!
  createdAt: String!
  updatedAt: String!
}

enum TaskStatus {
  TODO
  IN_PROGRESS
  COMPLETED
  ARCHIVED
}
```

#### 2. **Queries**
Read data from the server.

```graphql
query GetTasks($filter: TaskFilter) {
  tasks(filter: $filter) {
    id
    title
    description
    status
    priority
  }
}
```

**In our project:**
```typescript
import { gql } from '@apollo/client';

export const GET_TASKS = gql`
  query GetTasks($filter: TaskFilter) {
    tasks(filter: $filter) {
      id
      title
      status
    }
  }
`;
```

#### 3. **Mutations**
Modify data on the server.

```graphql
mutation CreateTask($input: CreateTaskInput!) {
  createTask(input: $input) {
    id
    title
    status
  }
}
```

#### 4. **Apollo Client**
GraphQL client for React applications.

**Key Features:**
- Declarative data fetching
- Intelligent caching
- Optimistic UI updates
- Error handling

**Setup:**
```typescript
const client = new ApolloClient({
  uri: 'https://api.example.com/graphql',
  cache: new InMemoryCache(),
});
```

**Usage with Hooks:**
```typescript
import { useQuery, useMutation } from '@apollo/client';

// Query
const { data, loading, error } = useQuery(GET_TASKS);

// Mutation
const [createTask] = useMutation(CREATE_TASK);
```

---

## React Hooks Deep Dive

### What are Hooks?
Functions that let you "hook into" React features from functional components.

### Built-in Hooks

#### 1. **useState**
Adds state to functional components.

```typescript
const [count, setCount] = useState(0);
const [user, setUser] = useState<User | null>(null);

// Update state
setCount(count + 1);
setCount(prev => prev + 1); // Functional update (preferred)
```

**When to use:**
- Component-level state
- Simple state updates
- UI state (modals, toggles)

#### 2. **useEffect**
Performs side effects in functional components.

```typescript
useEffect(() => {
  // Effect code
  fetchData();
  
  // Cleanup function (optional)
  return () => {
    cleanup();
  };
}, [dependencies]); // Dependency array
```

**Dependency Array:**
- `[]` - Run once on mount
- `[dep1, dep2]` - Run when dependencies change
- No array - Run on every render (avoid!)

**Common use cases:**
- Data fetching
- Subscriptions
- DOM manipulation
- Timers

#### 3. **useCallback**
Memoizes functions to prevent unnecessary re-renders.

```typescript
const handleClick = useCallback(() => {
  doSomething(value);
}, [value]); // Only recreate if value changes
```

**When to use:**
- Passing callbacks to optimized child components
- Dependencies in other hooks
- Expensive function creation

#### 4. **useMemo**
Memoizes computed values.

```typescript
const expensiveValue = useMemo(() => {
  return computeExpensiveValue(a, b);
}, [a, b]);
```

**When to use:**
- Expensive calculations
- Derived state
- Preventing unnecessary recalculations

#### 5. **useContext**
Accesses context values.

```typescript
const theme = useContext(ThemeContext);
```

#### 6. **useReducer**
Alternative to useState for complex state logic.

```typescript
const [state, dispatch] = useReducer(reducer, initialState);
```

### Custom Hooks

Reusable logic extracted into functions.

**Our useTasks hook:**
```typescript
export const useTasks = () => {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useAppSelector(state => state.tasks);

  const createTask = useCallback(async (taskData) => {
    await dispatch(createTask(taskData)).unwrap();
  }, [dispatch]);

  return { tasks, loading, error, createTask };
};
```

**Benefits:**
- Code reusability
- Separation of concerns
- Easier testing
- Cleaner components

### Hook Rules

1. **Only call hooks at the top level** (not in loops, conditions, or nested functions)
2. **Only call hooks from React functions** (components or custom hooks)

---

## Best Practices & Patterns

### Component Design

#### 1. **Single Responsibility Principle**
Each component should do one thing well.

```typescript
// Good - focused components
<TaskList tasks={tasks} />
<TaskForm onSubmit={handleSubmit} />
<FilterBar onFilterChange={handleFilter} />

// Bad - one component doing everything
<TaskManager /> // handles list, form, filters, etc.
```

#### 2. **Composition over Inheritance**
Build complex UIs by composing simple components.

```typescript
<App>
  <Header />
  <Main>
    <Sidebar />
    <Content />
  </Main>
  <Footer />
</App>
```

#### 3. **Props Drilling vs Context**

**Props Drilling** (passing props through multiple levels):
```typescript
<App>
  <Parent user={user}>
    <Child user={user}>
      <GrandChild user={user} />
    </Child>
  </Parent>
</App>
```

**Context** (avoid props drilling):
```typescript
const UserContext = createContext();

<UserContext.Provider value={user}>
  <App />
</UserContext.Provider>

// Any component can access
const user = useContext(UserContext);
```

### State Management Patterns

#### 1. **Lift State Up**
Move state to the closest common ancestor.

```typescript
// Parent manages state
const Parent = () => {
  const [value, setValue] = useState('');
  
  return (
    <>
      <ChildA value={value} />
      <ChildB onChange={setValue} />
    </>
  );
};
```

#### 2. **Controlled vs Uncontrolled Components**

**Controlled** (React controls the value):
```typescript
<input 
  value={value} 
  onChange={(e) => setValue(e.target.value)} 
/>
```

**Uncontrolled** (DOM controls the value):
```typescript
<input ref={inputRef} />
// Access with: inputRef.current.value
```

### Performance Optimization

#### 1. **React.memo**
Prevents re-renders if props haven't changed.

```typescript
export const TaskCard = React.memo(({ task }) => {
  return <div>{task.title}</div>;
});
```

#### 2. **Code Splitting**
Load code only when needed.

```typescript
const TaskForm = lazy(() => import('./TaskForm'));

<Suspense fallback={<Loading />}>
  <TaskForm />
</Suspense>
```

#### 3. **Virtualization**
Render only visible items in long lists.

```typescript
// Using react-window
<FixedSizeList
  height={600}
  itemCount={1000}
  itemSize={50}
>
  {Row}
</FixedSizeList>
```

### Error Handling

#### 1. **Error Boundaries**
Catch JavaScript errors in component tree.

```typescript
class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }
    return this.props.children;
  }
}
```

#### 2. **Try-Catch in Async Operations**

```typescript
const handleSubmit = async () => {
  try {
    await createTask(taskData);
  } catch (error) {
    console.error('Failed to create task:', error);
    setError(error.message);
  }
};
```

---

## Common Interview Questions

### React Questions

**Q1: What is the Virtual DOM and how does it work?**
**A:** The Virtual DOM is a lightweight copy of the actual DOM. When state changes, React:
1. Creates a new Virtual DOM tree
2. Compares it with the previous one (diffing)
3. Calculates the minimum changes needed
4. Updates only those parts in the real DOM (reconciliation)

This is faster than manipulating the real DOM directly.

**Q2: What's the difference between state and props?**
**A:**
- **Props**: Data passed from parent to child, read-only, used for component configuration
- **State**: Data managed within a component, mutable, used for dynamic data

**Q3: Explain the component lifecycle.**
**A:** In functional components with hooks:
- **Mount**: Component is created and inserted into DOM (`useEffect` with `[]`)
- **Update**: Component re-renders due to state/props changes (`useEffect` with dependencies)
- **Unmount**: Component is removed from DOM (cleanup function in `useEffect`)

**Q4: What are React Hooks and why were they introduced?**
**A:** Hooks are functions that let you use React features in functional components. Introduced to:
- Reuse stateful logic without changing component hierarchy
- Split complex components into smaller functions
- Use React features without classes

**Q5: When would you use useCallback vs useMemo?**
**A:**
- **useCallback**: Memoize functions (returns the same function reference)
- **useMemo**: Memoize values (returns the computed value)

```typescript
const memoizedCallback = useCallback(() => doSomething(a, b), [a, b]);
const memoizedValue = useMemo(() => computeExpensive(a, b), [a, b]);
```

### Redux Questions

**Q6: Why use Redux? What problems does it solve?**
**A:** Redux solves:
- **Props drilling**: No need to pass props through many levels
- **State sharing**: Multiple components can access the same state
- **Predictability**: Single source of truth, predictable state updates
- **Debugging**: Time-travel debugging, action history

**Q7: Explain Redux data flow.**
**A:**
1. Component dispatches an action
2. Action goes through middleware (Redux Thunk)
3. Reducer receives action and current state
4. Reducer returns new state
5. Store updates
6. Components re-render with new state

**Q8: What is Redux Thunk and when do you use it?**
**A:** Redux Thunk is middleware that allows action creators to return functions instead of actions. Use it for:
- Async operations (API calls)
- Conditional dispatching
- Accessing current state before dispatching

**Q9: What's the difference between Redux and Context API?**
**A:**
- **Context**: Built into React, good for simple state sharing, can cause unnecessary re-renders
- **Redux**: External library, better for complex state, middleware support, dev tools, better performance

### TypeScript Questions

**Q10: What are the benefits of using TypeScript?**
**A:**
- Type safety catches errors at compile time
- Better IDE support (autocomplete, refactoring)
- Self-documenting code
- Easier refactoring
- Better team collaboration

**Q11: Explain interfaces vs types in TypeScript.**
**A:**
- **Interfaces**: Can be extended, merged, better for object shapes
- **Types**: More flexible, can use unions, intersections, better for complex types

```typescript
// Interface
interface User {
  name: string;
}

// Type
type Status = 'pending' | 'success' | 'error';
```

**Q12: What are generics and why use them?**
**A:** Generics create reusable components that work with multiple types:

```typescript
function identity<T>(arg: T): T {
  return arg;
}

identity<string>("hello"); // Returns string
identity<number>(42);      // Returns number
```

### GraphQL Questions

**Q13: What are the advantages of GraphQL over REST?**
**A:**
- **Single endpoint**: One URL for all operations
- **Precise data fetching**: Request exactly what you need
- **No over-fetching**: Get only requested fields
- **No under-fetching**: Get related data in one request
- **Strong typing**: Schema defines API contract
- **Introspection**: API is self-documenting

**Q14: Explain queries vs mutations in GraphQL.**
**A:**
- **Queries**: Read operations, like GET in REST
- **Mutations**: Write operations, like POST/PUT/DELETE in REST

**Q15: What is Apollo Client and what does it provide?**
**A:** Apollo Client is a GraphQL client that provides:
- Declarative data fetching
- Intelligent caching
- Local state management
- Optimistic UI updates
- Error handling
- React hooks integration

### General Questions

**Q16: How do you handle errors in React applications?**
**A:**
- Error Boundaries for component errors
- Try-catch for async operations
- Error states in components
- Global error handling
- Logging services (Sentry, LogRocket)

**Q17: How do you optimize React application performance?**
**A:**
- Use React.memo for expensive components
- useCallback/useMemo for expensive operations
- Code splitting with lazy loading
- Virtualization for long lists
- Avoid inline functions in JSX
- Use production build
- Optimize images and assets

**Q18: Explain your approach to testing React applications.**
**A:**
- **Unit tests**: Test individual components (Jest, React Testing Library)
- **Integration tests**: Test component interactions
- **E2E tests**: Test user flows (Cypress, Playwright)
- **Test hooks**: Test custom hooks in isolation
- **Snapshot tests**: Catch unintended UI changes

---

## Project Walkthrough

### Architecture Overview

Our application follows a **layered architecture**:

1. **Presentation Layer** (Components)
   - TaskList, TaskForm, FilterBar
   - Responsible for UI rendering

2. **Business Logic Layer** (Hooks)
   - useTasks custom hook
   - Encapsulates task management logic

3. **State Management Layer** (Redux)
   - Task slice with reducers
   - Centralized state management

4. **Data Layer** (Services)
   - GraphQL client
   - API communication

### Key Files Explained

#### 1. **src/types/index.ts**
Defines TypeScript interfaces and enums.

**Key Points:**
- Centralized type definitions
- Enums for constants (TaskStatus, TaskPriority)
- Interfaces for data structures (Task, User, TaskFilter)

#### 2. **src/store/slices/taskSlice.ts**
Redux slice for task management.

**Key Points:**
- Uses Redux Toolkit's createSlice
- Async thunks for API calls
- Immutable state updates with Immer
- Handles loading and error states

#### 3. **src/hooks/useTasks.ts**
Custom hook for task operations.

**Key Points:**
- Abstracts Redux logic from components
- Provides clean API for task operations
- Uses useCallback for memoization
- Handles error logging

#### 4. **src/components/TaskList/TaskList.tsx**
Displays list of tasks.

**Key Points:**
- Receives tasks via props
- Maps over tasks to render cards
- Handles user interactions
- Conditional rendering for empty state

#### 5. **src/App.tsx**
Main application component.

**Key Points:**
- Sets up Redux Provider
- Configures Apollo Client
- Implements React Router
- Manages global state

### Data Flow Example

**Creating a Task:**

1. User fills form in `TaskForm`
2. Form calls `onSubmit` prop
3. `App` component calls `createTask` from `useTasks` hook
4. Hook dispatches Redux action `createTask`
5. Redux Thunk makes API call via GraphQL
6. API returns new task
7. Reducer adds task to state
8. Components re-render with new task

### Scalability Features

1. **Modular Structure**: Easy to add new features
2. **Type Safety**: Prevents runtime errors
3. **Centralized State**: Single source of truth
4. **Reusable Hooks**: Share logic across components
5. **Component Composition**: Build complex UIs from simple parts

---

## 🎯 Interview Tips

### Before the Interview

1. **Run the project**: Make sure you can demo it
2. **Review this document**: Focus on concepts you're less familiar with
3. **Practice explaining**: Talk through the architecture out loud
4. **Prepare questions**: Have 2-3 questions ready for the interviewer

### During the Interview

1. **Think out loud**: Explain your thought process
2. **Ask clarifying questions**: Don't assume requirements
3. **Start simple**: Begin with basic solution, then optimize
4. **Admit what you don't know**: It's okay to say "I don't know, but here's how I'd find out"
5. **Use examples**: Reference this project when explaining concepts

### Key Talking Points

1. **Component Design**: "I follow single responsibility principle..."
2. **State Management**: "I chose Redux because..."
3. **Type Safety**: "TypeScript helps catch errors early..."
4. **Performance**: "I optimize by using React.memo and useCallback..."
5. **Testing**: "I would test this component by..."

### Common Mistakes to Avoid

1. ❌ Over-engineering simple solutions
2. ❌ Not asking questions
3. ❌ Ignoring edge cases
4. ❌ Poor variable naming
5. ❌ Not considering performance

### What Interviewers Look For

1. ✅ Problem-solving approach
2. ✅ Code organization
3. ✅ Understanding of fundamentals
4. ✅ Communication skills
5. ✅ Ability to learn and adapt

---

## 📝 Quick Reference Cheat Sheet

### React Hooks
```typescript
useState()      // State management
useEffect()     // Side effects
useCallback()   // Memoize functions
useMemo()       // Memoize values
useContext()    // Access context
useReducer()    // Complex state logic
useRef()        // DOM references
```

### Redux Toolkit
```typescript
createSlice()        // Create reducer + actions
createAsyncThunk()   // Async operations
configureStore()     // Create store
useAppDispatch()     // Dispatch actions
useAppSelector()     // Select state
```

### TypeScript
```typescript
interface          // Object shapes
type              // Type aliases
enum              // Named constants
Partial<T>        // Make all optional
Pick<T, K>        // Select properties
Omit<T, K>        // Exclude properties
```

### GraphQL
```graphql
query             # Read data
mutation          # Modify data
subscription      # Real-time updates
fragment          # Reusable fields
```

---

## 🚀 Final Preparation Checklist

- [ ] Understand React component lifecycle
- [ ] Explain Redux data flow
- [ ] Know when to use different hooks
- [ ] Understand TypeScript benefits
- [ ] Explain GraphQL advantages
- [ ] Can walk through project architecture
- [ ] Prepared to demo the application
- [ ] Have questions ready for interviewer
- [ ] Reviewed common interview questions
- [ ] Practiced explaining concepts out loud

---

## 💡 Remember

- **Confidence**: You've built a production-ready application
- **Honesty**: It's okay to say "I don't know"
- **Curiosity**: Show eagerness to learn
- **Communication**: Explain your thinking clearly
- **Enthusiasm**: Show passion for development

**Good luck with your interview! You've got this! 🎉**