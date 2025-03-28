import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';
import modeReducer from '../features/mode/modeSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    mode: modeReducer
  }
});
