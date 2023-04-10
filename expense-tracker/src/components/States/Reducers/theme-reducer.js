import { createSlice } from "@reduxjs/toolkit";

const themeSlice = createSlice({
    name: 'theme',
    initialState: {
      darkMode: window.matchMedia('(prefers-color-scheme: dark)').matches,
    },
    reducers: {
      toggleTheme: (state) => {
        state.darkMode = !state.darkMode;
      },
    },
  });
  
export const themeState = themeSlice.actions;
const themeReducer = themeSlice.reducer ;

export default themeReducer ;