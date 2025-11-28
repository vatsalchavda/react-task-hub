import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task, TaskStatus, TaskFilter } from '../../types';

interface TaskState {
  tasks: Task[];
  selectedTask: Task | null;
  filter: TaskFilter;
  pagination: {
    currentPage: number;
    itemsPerPage: number;
    totalPages: number;
  };
  loading: boolean;
  error: string | null;
}

// Initial demo task
const demoTask: Task = {
  id: '1',
  title: 'Welcome to React Task Hub with Redux',
  description: 'This application demonstrates Redux Toolkit, Redux Thunk for async operations, TypeScript for type safety, and WCAG 2.1 AA accessibility. Try creating, editing, and deleting tasks!',
  status: TaskStatus.TODO,
  priority: 'MEDIUM' as any,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
};

const initialState: TaskState = {
  tasks: [demoTask],
  selectedTask: null,
  filter: {},
  pagination: {
    currentPage: 1,
    itemsPerPage: 10,
    totalPages: 1,
  },
  loading: false,
  error: null,
};

// Simulate API delay for realistic async behavior
const simulateApiDelay = () => new Promise(resolve => setTimeout(resolve, 500));

/**
 * Fetch Tasks Thunk
 * Simulates API call with delay to demonstrate Redux Thunk async handling
 */
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (filter: TaskFilter = {}, { rejectWithValue, getState }) => {
    try {
      await simulateApiDelay();
      
      // In a real app, this would be an API call
      // For demo, return tasks from current state
      const state = getState() as { tasks: TaskState };
      return state.tasks.tasks;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Create Task Thunk
 * Demonstrates Redux Thunk with simulated async operation
 */
export const createTask = createAsyncThunk(
  'tasks/createTask',
  async (taskData: Partial<Task>, { rejectWithValue }) => {
    try {
      await simulateApiDelay();
      
      // Simulate API response
      const newTask: Task = {
        id: Date.now().toString(),
        title: taskData.title || '',
        description: taskData.description || '',
        status: taskData.status || TaskStatus.TODO,
        priority: taskData.priority || 'MEDIUM' as any,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      };
      
      return newTask;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Update Task Thunk
 * Demonstrates Redux Thunk for update operations
 */
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, updates }: { id: string; updates: Partial<Task> }, { rejectWithValue, getState }) => {
    try {
      await simulateApiDelay();
      
      // Find existing task
      const state = getState() as { tasks: TaskState };
      const existingTask = state.tasks.tasks.find(t => t.id === id);
      
      if (!existingTask) {
        throw new Error('Task not found');
      }
      
      // Simulate API response with updated task
      const updatedTask: Task = {
        ...existingTask,
        ...updates,
        updatedAt: new Date().toISOString(),
      };
      
      return updatedTask;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

/**
 * Delete Task Thunk
 * Demonstrates Redux Thunk for delete operations
 */
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id: string, { rejectWithValue }) => {
    try {
      await simulateApiDelay();
      
      // Simulate successful deletion
      return id;
    } catch (error) {
      return rejectWithValue((error as Error).message);
    }
  }
);

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    setSelectedTask: (state, action: PayloadAction<Task | null>) => {
      state.selectedTask = action.payload;
    },
    setFilter: (state, action: PayloadAction<TaskFilter>) => {
      state.filter = action.payload;
      // Reset to first page when filter changes
      state.pagination.currentPage = 1;
    },
    clearError: (state) => {
      state.error = null;
    },
    updateTaskStatus: (state, action: PayloadAction<{ id: string; status: TaskStatus }>) => {
      const task = state.tasks.find(t => t.id === action.payload.id);
      if (task) {
        task.status = action.payload.status;
        task.updatedAt = new Date().toISOString();
      }
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.pagination.currentPage = action.payload;
    },
    setItemsPerPage: (state, action: PayloadAction<number>) => {
      state.pagination.itemsPerPage = action.payload;
      state.pagination.currentPage = 1; // Reset to first page
    },
    updateTotalPages: (state, action: PayloadAction<number>) => {
      state.pagination.totalPages = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Tasks
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Create Task
      .addCase(createTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks.push(action.payload);
        state.error = null;
      })
      .addCase(createTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Update Task
      .addCase(updateTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.tasks.findIndex(t => t.id === action.payload.id);
        if (index !== -1) {
          state.tasks[index] = action.payload;
        }
        state.error = null;
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      // Delete Task
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter(t => t.id !== action.payload);
        state.error = null;
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { setSelectedTask, setFilter, clearError, updateTaskStatus, setPage, setItemsPerPage, updateTotalPages } = taskSlice.actions;
export default taskSlice.reducer;

/**
 * INTERVIEW TALKING POINTS:
 * 
 * 1. REDUX THUNK DEMONSTRATION:
 *    - All async operations use createAsyncThunk
 *    - Three lifecycle states: pending, fulfilled, rejected
 *    - Simulated API delays show real async behavior
 *    - Error handling with rejectWithValue
 * 
 * 2. TYPE SAFETY:
 *    - Full TypeScript typing throughout
 *    - Type-safe action creators
 *    - Type-safe state access
 * 
 * 3. IMMUTABLE UPDATES:
 *    - Redux Toolkit uses Immer internally
 *    - Can write "mutating" code that's actually immutable
 *    - State updates are predictable
 * 
 * 4. SCALABILITY:
 *    - Modular slice architecture
 *    - Easy to add new async operations
 *    - Clear separation of concerns
 * 
 * 5. REAL-WORLD READY:
 *    - Replace simulateApiDelay with actual fetch calls
 *    - Error handling already in place
 *    - Loading states for UX feedback
 */

// Made with Bob
