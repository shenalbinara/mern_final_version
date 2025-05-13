import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    theme: 'light', // use lowercase consistently
};

const themeSlice = createSlice({
    name: 'theme',
    initialState,
    reducers: {
        toggleTheme: (state) => {
            state.theme = state.theme === 'light' ? 'dark' : 'light'; // consistent lowercase
        },
    }
});

export const { toggleTheme } = themeSlice.actions;
export default themeSlice.reducer;