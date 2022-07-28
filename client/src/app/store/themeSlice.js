import { createSlice } from '@reduxjs/toolkit';

export const themeSlice = createSlice({
  name: 'theme',
  initialState: localStorage.getItem('theme') || 'light',
  reducers: {
    toggleTheme: (state) => {
      const newMode = state === 'light' ? 'dark' : 'light';
      localStorage.setItem('theme', newMode);
      return newMode;
    }
  }
});

export const { toggleTheme } = themeSlice.actions;

export default themeSlice.reducer;
