import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { UserData, UserSchema } from '../types/user';
import { logOut, signIn, signUp } from '../actions/userActions';

const initialState: UserSchema = {
    data: null,
    isLoading: false,
    error: undefined,
    isAuth: false,
};

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        setIsLoading: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        authTrue: (state, action: PayloadAction<UserData>) => {
            state.isAuth = true;
            state.data = action.payload;
        },
        authFalse: (state) => {
            state.isAuth = false;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(signIn.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(signIn.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.data = action.payload;
            })
            .addCase(signIn.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'An unexpected error occurred';
            })

            .addCase(signUp.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(signUp.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isAuth = true;
                state.data = action.payload;
            })
            .addCase(signUp.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'An unexpected error occurred';
            })

            .addCase(logOut.pending, (state, action) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(logOut.fulfilled, (state) => {
                state.isLoading = false;
                state.isAuth = false;
                state.data = null;
            })
            .addCase(logOut.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'An unexpected error occurred';
            });
    },
});

export const { reducer: userReducer, actions: userActions } = userSlice;
