# Interview Preparation Knowledge Base

## 📚 Complete Guide for OpenText Senior Software Developer Interview

**Interview Details:**
- **Company**: OpenText (Cybersecurity Enterprise)
- **Position**: Senior Software Developer
- **Date**: Tomorrow at 2:00 PM PST
- **Application URL**: http://9.66.243.216:3000

This document contains everything you need to know for your interview. Focus on understanding these concepts and be ready to explain them with examples from this project.

---

## 🎯 Table of Contents

1. [OpenText Interview Preparation](#opentext-interview-preparation)
2. [Application Testing Guide](#application-testing-guide)
3. [5-Minute Demo Script](#5-minute-demo-script)
4. [React Fundamentals](#react-fundamentals)
5. [Redux & State Management](#redux--state-management)
6. [TypeScript Essentials](#typescript-essentials)
7. [React Hooks Deep Dive](#react-hooks-deep-dive)
8. [Accessibility (WCAG 2.1 AA)](#accessibility-wcag-21-aa)
9. [Best Practices & Patterns](#best-practices--patterns)
10. [Common Interview Questions](#common-interview-questions)
11. [Project Architecture](#project-architecture)

---

## OpenText Interview Preparation

### About OpenText
- **Industry**: Enterprise Information Management & Cybersecurity
- **Focus**: Document management, security, compliance
- **Technologies**: React, Redux, TypeScript, Webpack, Docker
- **Standards**: WCAG accessibility, enterprise-grade patterns

### Key Technologies to Highlight

1. **React 18** - Modern functional components with hooks
2. **Redux Toolkit** - State management with Redux Thunk
3. **TypeScript** - Full type safety throughout application
4. **WCAG 2.1 AA** - Accessibility compliance
5. **Webpack 5** - Module bundling and optimization
6. **Docker** - Containerization for consistent deployment

### What Makes This Project Enterprise-Ready

1. **Layered Architecture**: Clear separation of concerns
2. **Type Safety**: TypeScript prevents runtime errors
3. **Accessibility**: WCAG 2.1 AA compliant (keyboard navigation, ARIA labels, screen reader support)
4. **State Management**: Redux for predictable state updates
5. **Async Operations**: Redux Thunk for handling API calls
6. **Error Handling**: Comprehensive try-catch blocks
7. **Performance**: Memoization with useCallback/useMemo
8. **Maintainability**: Custom hooks for reusable logic

---

## Application Testing Guide

### Pre-Interview Verification (30 minutes before)

1. **Restart the application**:
   ```bash
   cd react-task-hub && docker-compose restart
   ```

2. **Wait 15 seconds** for webpack to compile

3. **Open in browser**: http://9.66.243.216:3000

4. **Verify basic functionality**:
   - Page loads without errors
   - Can create a new task
   - Can edit existing task
   - Can delete a task
   - Can toggle task completion
   - Filters work correctly

### Manual Testing Checklist

#### ✅ Basic CRUD Operations
- [ ] **Create**: Fill form and click "Add Task" - task appears in list
- [ ] **Read**: Tasks display with title, description, priority badge
- [ ] **Update**: Click "Edit", modify task, click "Update Task"
- [ ] **Delete**: Click "Delete" button, task disappears
- [ ] **Toggle**: Click checkbox to mark complete/incomplete

#### ✅ Filters
- [ ] Status filters: All, Active, Completed
- [ ] Priority filters: All, High, Medium, Low
- [ ] Filters update task list correctly

#### ✅ Accessibility
- [ ] Tab key navigates through all interactive elements
- [ ] Enter key activates buttons
- [ ] Escape key closes modal
- [ ] Focus indicators visible (blue outline)
- [ ] ARIA labels present on all interactive elements

#### ✅ Redux DevTools (if installed)
- [ ] Actions appear: `tasks/createTask/pending`, `tasks/createTask/fulfilled`
- [ ] State updates correctly in Redux DevTools
- [ ] No error actions (`rejected`)

#### ✅ Console
- [ ] No red error messages
- [ ] No yellow warnings
- [ ] No 404 errors for resources

### Expected Behavior

**Loading States**: Brief 500ms delay when creating/editing/deleting tasks (demonstrates Redux Thunk async operations)

**Data Persistence**: Tasks stored in Redux state (in-memory). They reset on page refresh. This is intentional for the demo.

**Initial State**: One demo task: "Review OpenText interview guide"

**Redux State Summary Box**: In development mode, a small box appears in the bottom-right corner showing:
- Number of tasks
- Loading state
- Error state
- Link to Redux DevTools

This is only visible in development mode (`NODE_ENV=development`) and helps demonstrate Redux state management during the interview.

### Redux State Summary Feature

**Location**: Bottom-right corner of the application (development only)

**Implementation** (lines 520-546 in [`src/App.tsx`](src/App.tsx:520)):
```typescript
{process.env.NODE_ENV === 'development' && (
  <aside aria-label="Redux state inspector">
    <div>📊 Redux State Summary</div>
    <div>Tasks: {tasks.length}</div>
    <div>Loading: {loading ? 'Yes' : 'No'}</div>
    <div>Error: {error || 'None'}</div>
    <div>Press F12 → Redux tab for full state</div>
  </aside>
)}
```

**Purpose**:
- Quick visual feedback of Redux state
- Demonstrates real-time state updates
- Helps during interview demo
- Shows loading states during async operations
- Only appears in development (not production)

**What it shows**:
1. **Tasks count**: Number of tasks in Redux store
2. **Loading state**: Whether async operation is in progress
3. **Error state**: Any errors from Redux operations
4. **DevTools hint**: Reminder to use Redux DevTools for full inspection

---

## Redux DevTools - Complete Guide

### What is Redux DevTools?

Redux DevTools is a browser extension that provides powerful debugging capabilities for Redux applications. It's like a time machine for your application state.

**Browser Extension**: You have it installed in Chrome (the "Redux" tab in DevTools)

### Key Features

#### 1. **Action History**
See every action dispatched in chronological order:
```
tasks/createTask/pending
tasks/createTask/fulfilled
tasks/updateTask/pending
tasks/updateTask/fulfilled
tasks/deleteTask/pending
tasks/deleteTask/fulfilled
```

#### 2. **State Inspector**
View the complete Redux state at any point:
```json
{
  "tasks": {
    "items": [
      {
        "id": "1",
        "title": "Review OpenText interview guide",
        "description": "Study Redux, React, TypeScript",
        "status": "TODO",
        "priority": "HIGH"
      }
    ],
    "filter": {
      "status": "all",
      "priority": "all"
    },
    "loading": false,
    "error": null
  }
}
```

#### 3. **Time-Travel Debugging**
- Click any action to see state at that moment
- Jump back and forth through state changes
- See exactly what changed with each action

#### 4. **Action Payload Inspection**
See the data sent with each action:
```json
// Action: tasks/createTask/fulfilled
{
  "type": "tasks/createTask/fulfilled",
  "payload": {
    "id": "2",
    "title": "New Task",
    "description": "Task details",
    "status": "TODO",
    "priority": "MEDIUM"
  }
}
```

#### 5. **Diff View**
See exactly what changed in state:
```diff
State Diff:
+ tasks.items[1] = { id: "2", title: "New Task", ... }
  tasks.loading: true → false
```

### How to Use During Interview

#### Example 1: Demonstrating Redux Thunk Async Flow

**Say this**: "Let me show you how Redux Thunk handles async operations. Watch the Redux DevTools as I create a task."

**Steps**:
1. Open Redux DevTools (F12 → Redux tab)
2. Click "Add Task" in the application
3. Fill form and submit
4. Point out in DevTools:
   - `tasks/createTask/pending` - Request started
   - 500ms delay (simulated API call)
   - `tasks/createTask/fulfilled` - Request succeeded
   - State updated with new task

**What to say**: "Notice the three-phase lifecycle: pending, fulfilled, and rejected. This is Redux Thunk handling the async operation. The 500ms delay simulates a real API call."

#### Example 2: Debugging State Issues

**Interviewer might ask**: "How would you debug if a task isn't appearing after creation?"

**Your answer**: "I'd use Redux DevTools to check:
1. Was the action dispatched? (Check action history)
2. What was the payload? (Inspect action details)
3. Did the state update? (Check state tree)
4. Was there an error? (Look for rejected actions)

Let me demonstrate..."

**Steps**:
1. Open Redux DevTools
2. Create a task
3. Show the action in history
4. Click the action to see payload
5. Show the state tree updated
6. Point out the diff view

#### Example 3: Time-Travel Debugging

**Say this**: "One powerful feature is time-travel debugging. I can replay state changes."

**Steps**:
1. Create several tasks
2. In Redux DevTools, click on earlier actions
3. Show how the UI updates to that state
4. Click forward through actions
5. Show state evolving

**What to say**: "This is invaluable for debugging complex state interactions. I can see exactly when and why state changed."

### Common Interview Questions About Redux DevTools

#### Q1: "How do you debug Redux applications?"

**Answer**: "I use Redux DevTools extensively. It shows me:
- Every action dispatched with its payload
- Complete state tree at any moment
- State diffs showing exactly what changed
- Time-travel to replay state changes
- Performance monitoring for slow reducers

For example, if a component isn't updating, I check if the action was dispatched, verify the payload is correct, and confirm the state actually changed."

#### Q2: "What would you do if state isn't updating as expected?"

**Answer**: "I'd follow this debugging process:

1. **Check Redux DevTools action history** - Was the action dispatched?
2. **Inspect the action payload** - Is the data correct?
3. **Look at state diff** - Did the state change?
4. **Check for errors** - Any rejected actions?
5. **Verify reducer logic** - Is the reducer handling the action?

Let me show you..." [Demonstrate in DevTools]

#### Q3: "How do you handle async operations in Redux?"

**Answer**: "We use Redux Thunk middleware. It allows action creators to return functions instead of actions.

In Redux DevTools, you'll see three actions for each async operation:
- `pending` - Request started
- `fulfilled` - Request succeeded
- `rejected` - Request failed

This makes debugging async flows much easier because you can see exactly when each phase occurred and what data was involved."

#### Q4: "What if Redux DevTools shows an action but the UI doesn't update?"

**Answer**: "This indicates a React rendering issue, not a Redux issue. I'd check:

1. **Component connection** - Is the component using `useSelector` correctly?
2. **Selector logic** - Is the selector returning the right data?
3. **Reference equality** - Is the selector creating new objects unnecessarily?
4. **React DevTools** - Is the component re-rendering?

Redux DevTools confirms the state changed, so the issue is in the React layer."

#### Q5: "How would you optimize Redux performance?"

**Answer**: "I'd use Redux DevTools to identify issues:

1. **Action frequency** - Are too many actions dispatching?
2. **State size** - Is the state tree too large?
3. **Reducer performance** - Are reducers taking too long?
4. **Selector efficiency** - Are selectors recomputing unnecessarily?

Redux DevTools has a 'Trace' tab showing which actions cause re-renders and how long reducers take."

### Troubleshooting Scenarios

#### Scenario 1: Task Created But Not Showing

**Interviewer**: "You create a task but it doesn't appear. How do you debug?"

**Your approach**:
1. Open Redux DevTools
2. Check action history - Look for `tasks/createTask/fulfilled`
3. Click the action - Verify payload has correct data
4. Check state tree - Confirm task is in `tasks.items` array
5. Check Diff tab - See what changed
6. If task is in state but not showing, it's a React rendering issue
7. If action is `rejected`, check error message

**Demo this live**: Create a task and walk through each step in DevTools.

#### Scenario 2: Loading State Stuck

**Interviewer**: "The loading spinner never goes away. What's wrong?"

**Your approach**:
1. Open Redux DevTools
2. Check last action - Is it still `pending`?
3. Look for `fulfilled` or `rejected` - Did the async operation complete?
4. Check state tree - What's the value of `loading`?
5. If stuck on `pending`, the async operation didn't complete
6. Check for errors in console
7. Verify Redux Thunk middleware is configured

#### Scenario 3: Wrong Data in State

**Interviewer**: "A task has the wrong priority. How do you find where it went wrong?"

**Your approach**:
1. Open Redux DevTools
2. Find the task in state tree - Note its current priority
3. Go through action history backwards
4. Find the action that created/updated the task
5. Check the payload - Was the wrong data sent?
6. Use time-travel to see when it changed
7. Identify if it's a form issue, reducer issue, or API issue

### Best Practices for Interview Demo

1. **Keep DevTools open** - Show it alongside your application
2. **Narrate what you see** - "Notice the pending action here..."
3. **Use time-travel** - Demonstrate going back and forth
4. **Show state diffs** - Point out exactly what changed
5. **Explain the flow** - "Action dispatched → Thunk middleware → Reducer → State update"

### What Interviewers Look For

✅ **Understanding of Redux flow** - Can you explain what's happening?
✅ **Debugging methodology** - Do you have a systematic approach?
✅ **Tool proficiency** - Can you navigate DevTools efficiently?
✅ **Problem-solving** - Can you identify and fix issues?
✅ **Communication** - Can you explain technical concepts clearly?

### Quick Reference

**Open DevTools**: F12 or Right-click → Inspect
**Redux Tab**: Should appear if Redux DevTools extension is installed
**Key Sections**:
- **Action** - List of all dispatched actions
- **State** - Current state tree
- **Diff** - What changed
- **Trace** - Performance monitoring
- **Test** - Generate test code

---

## 5-Minute Demo Script

### Opening (30 seconds)
"I've built a modern task management application using React, Redux, TypeScript, and Docker. It demonstrates enterprise-grade patterns including state management, accessibility compliance, and containerized deployment."

### Architecture Overview (1 minute)
"The application follows a layered architecture:
- **Presentation Layer**: React components with TypeScript
- **Business Logic**: Custom hooks abstracting complexity
- **State Management**: Redux Toolkit with Redux Thunk
- **Service Layer**: Simulated API with async operations

This separation ensures maintainability and testability."

### Live Demo (2 minutes)

1. **Create Task** (30 seconds)
   - "Let me create a new task. Notice the form validation and the brief loading state."
   - Fill form: Title "Demo Task", Description "For interview", Priority "High"
   - Click "Add Task"
   - "The 500ms delay demonstrates Redux Thunk handling async operations."

2. **Redux State Management** (30 seconds)
   - Open Redux DevTools (if available)
   - "You can see the Redux actions: `createTask/pending` then `createTask/fulfilled`"
   - "The state updates immutably using Redux Toolkit's Immer integration."

3. **Accessibility Features** (30 seconds)
   - Press Tab key multiple times
   - "Full keyboard navigation - Tab to move, Enter to activate, Escape to close modals."
   - "All interactive elements have ARIA labels for screen readers."
   - "This meets WCAG 2.1 AA standards."

4. **Filters** (30 seconds)
   - Click different filter buttons
   - "Filters demonstrate Redux state management - the filter state updates and components re-render efficiently."

### Technical Highlights (1 minute)

"Key technical decisions:

1. **Redux Toolkit**: Reduces boilerplate, includes Redux Thunk, uses Immer for immutable updates
2. **TypeScript**: Full type safety prevents runtime errors, improves IDE support
3. **Custom Hooks**: `useTasks` hook abstracts Redux complexity from components
4. **Accessibility**: Semantic HTML, ARIA labels, keyboard navigation, focus management
5. **Docker**: Containerized for consistent deployment across environments

The application is production-ready and follows enterprise best practices."

### Closing (30 seconds)
"I'm happy to dive deeper into any aspect - the Redux implementation, TypeScript patterns, accessibility features, or the Docker setup. What would you like to explore?"

---

## Accessibility (WCAG 2.1 AA)

### What is WCAG?
Web Content Accessibility Guidelines - standards for making web content accessible to people with disabilities.

### WCAG 2.1 AA Compliance

Our application meets Level AA standards:

#### 1. **Keyboard Navigation**
All functionality available via keyboard:
- Tab: Move focus forward
- Shift+Tab: Move focus backward
- Enter: Activate buttons/links
- Escape: Close modals
- Space: Toggle checkboxes

```typescript
// Example: Keyboard event handling
const handleKeyDown = (e: React.KeyboardEvent) => {
  if (e.key === 'Enter') {
    handleSubmit();
  } else if (e.key === 'Escape') {
    handleClose();
  }
};
```

#### 2. **ARIA Labels**
Descriptive labels for screen readers:

```typescript
<button
  onClick={handleCreate}
  aria-label="Add new task"
  aria-describedby="form-description"
>
  Add Task
</button>

<form
  role="form"
  aria-label="Task creation form"
>
```

#### 3. **Focus Management**
Visible focus indicators and logical focus order:

```css
button:focus,
input:focus {
  outline: 2px solid #007bff;
  outline-offset: 2px;
}
```

#### 4. **Semantic HTML**
Proper HTML elements for meaning:

```typescript
<main role="main">
  <section aria-labelledby="task-list-heading">
    <h2 id="task-list-heading">Tasks</h2>
  </section>
</main>
```

#### 5. **Screen Reader Support**
Live regions for dynamic content:

```typescript
<div
  role="status"
  aria-live="polite"
  aria-atomic="true"
>
  {statusMessage}
</div>
```

#### 6. **Color Contrast**
Sufficient contrast ratios:
- Normal text: 4.5:1 minimum
- Large text: 3:1 minimum
- UI components: 3:1 minimum

### Why Accessibility Matters in Enterprise

1. **Legal Compliance**: ADA, Section 508 requirements
2. **Broader Audience**: 15% of population has disabilities
3. **Better UX**: Benefits all users (keyboard shortcuts, clear labels)
4. **SEO Benefits**: Semantic HTML improves search rankings
5. **Corporate Responsibility**: Inclusive design principles

---

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