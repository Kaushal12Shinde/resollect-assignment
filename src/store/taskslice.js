import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { db, collection, getDocs, addDoc, deleteDoc, updateDoc, doc } from '../firebase.config';

export const fetchTasksAsync = createAsyncThunk('tasks/fetchTasks', async (_, { rejectWithValue }) => {
  try {
    const snapshot = await getDocs(collection(db, 'tasks'));
    const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return data;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const addTaskAsync = createAsyncThunk('tasks/addTask', async (task, { rejectWithValue }) => {
  try {
    const docRef = await addDoc(collection(db, 'tasks'), task);
    return { ...task, id: docRef.id };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const deleteTaskAsync = createAsyncThunk('tasks/deleteTask', async (id, { rejectWithValue }) => {
  try {
    await deleteDoc(doc(db, 'tasks', id));
    return id;
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

export const updateTaskAsync = createAsyncThunk('tasks/updateTask', async ({ id, updates }, { rejectWithValue }) => {
  try {
    await updateDoc(doc(db, 'tasks', id), updates);
    return { id, ...updates };
  } catch (error) {
    return rejectWithValue(error.message);
  }
});

const taskslice = createSlice({
  name: 'tasks',
  initialState: {
    tasks: [],
    tab: 'ongoing',
    doRender: false,
    loading: false,
    error: null,
  },
  reducers: {
    setTab: (state, action) => {
      state.tab = action.payload;
    },
    triggerRender: (state, action) => {
      state.doRender = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch tasks
        .addCase(fetchTasksAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(fetchTasksAsync.fulfilled, (state, action) => {
          state.tasks = action.payload;
          state.doRender = true;
          state.loading = false;
        })
        .addCase(fetchTasksAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

      // Add task
        .addCase(addTaskAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(addTaskAsync.fulfilled, (state, action) => {
          state.tasks.push(action.payload);
          state.doRender = true;
          state.loading = false;
        })
        .addCase(addTaskAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

      // Delete task
        .addCase(deleteTaskAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(deleteTaskAsync.fulfilled, (state, action) => {
          state.tasks = state.tasks.filter(task => task.id !== action.payload);
          state.doRender = true;
          state.loading = false;
        })
        .addCase(deleteTaskAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        })

      // Update task
        .addCase(updateTaskAsync.pending, (state) => {
          state.loading = true;
          state.error = null;
        })
        .addCase(updateTaskAsync.fulfilled, (state, action) => {
          const index = state.tasks.findIndex(t => t.id === action.payload.id);
          if (index !== -1) {
            state.tasks[index] = { ...state.tasks[index], ...action.payload };
          }
          state.doRender = true;
          state.loading = false;
        })
        .addCase(updateTaskAsync.rejected, (state, action) => {
          state.loading = false;
          state.error = action.payload;
        });
  }
});

export const { setTab, triggerRender, clearError } = taskslice.actions;
export default taskslice.reducer;
