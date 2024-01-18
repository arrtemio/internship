import { createAsyncThunk } from '@reduxjs/toolkit';
import {
    signInWithEmailAndPassword, createUserWithEmailAndPassword, onAuthStateChanged, signOut,
} from 'firebase/auth';
import { AppDispatch } from 'app/store';
import { handleAsyncThunkError } from 'shared/lib/helpers';
import { auth } from 'app/firebase';
import { userActions } from '../slice/userSlice';
import { UserData } from '../types/user';

interface AuthData {
    email: string;
    password: string;
}

export const signIn = createAsyncThunk<UserData, AuthData, { rejectValue: string }>(
    'user/signIn',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { user } = await signInWithEmailAndPassword(auth, email, password);

            const data: UserData = {
                email: user.email || email,
                id: user.uid,
                token: user.refreshToken,
            };

            return data;
        } catch (error) {
            return rejectWithValue(handleAsyncThunkError(error));
        }
    },
);

export const signUp = createAsyncThunk<UserData, AuthData, { rejectValue: string }>(
    'user/signUp',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const { user } = await createUserWithEmailAndPassword(auth, email, password);

            const data: UserData = {
                email: user.email || email,
                id: user.uid,
                token: user.refreshToken,
            };

            return data;
        } catch (error) {
            return rejectWithValue(handleAsyncThunkError(error));
        }
    },
);

export const logOut = createAsyncThunk<void, void, { rejectValue: string }>(
    'user/signOut',
    async (_, { rejectWithValue }) => {
        try {
            return await signOut(auth);
        } catch (error) {
            return rejectWithValue(handleAsyncThunkError(error));
        }
    },
);

export const checkIsAuth = () => (dispatch: AppDispatch) => {
    dispatch(userActions.setIsLoading(true));
    onAuthStateChanged(auth, (user) => {
        if (user) {
            dispatch(userActions.setIsLoading(false));
            dispatch(userActions.authTrue({ email: user.email || '', id: user.uid, token: user.refreshToken }));
        } else {
            dispatch(userActions.setIsLoading(false));
        }
    });
};
