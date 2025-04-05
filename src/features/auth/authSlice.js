import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

export const logout = createAsyncThunk(
    'auth/logout',
    async () => {
        const response = await fetch("https://web.ics.purdue.edu/~rhee27/profile-app/logout.php");
        const data = await response.json();
        return data;
    }
);

export const login = createAsyncThunk(
    'auth/login',
    async (formData) => {
        const response = await fetch(
            "https://web.ics.purdue.edu/~rhee27/profile-app/auth.php",
            {
                method: "POST",
                body: formData,
            }
        );
        const data = await response.json();
        if (!data.success) {
            throw new Error(data.error);
        }
        return data;
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        isLogin: localStorage.getItem("isLogin") === "true",
        error: null,
        status: 'idle'
    },
    reducers: {
        clearError: (state) => {
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state) => {
                state.isLogin = true;
                state.status = 'succeeded';
                localStorage.setItem("isLogin", "true");
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(logout.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logout.fulfilled, (state) => {
                state.isLogin = false;
                state.status = 'succeeded';
                localStorage.setItem("isLogin", "false");
            })
            .addCase(logout.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export const { clearError } = authSlice.actions;
export const selectAuth = (state) => state.auth;
export default authSlice.reducer;