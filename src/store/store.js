import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './taskslice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer, 
  },
});

export default store;
