import { createSlice } from '@reduxjs/toolkit';

const modeSlice = createSlice({
  name: 'mode',
  initialState: {
    isDarkMode: false
  },
  reducers: {
    toggleMode: (state) => {
      state.isDarkMode = !state.isDarkMode;
    }
  }
});

export const { toggleMode } = modeSlice.actions;
export const selectMode = (state) => state.mode.isDarkMode ? "dark" : "light";
export default modeSlice.reducer;