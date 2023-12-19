import { testUser } from 'shared/test/TestUser';
import { UserSchema } from '../types/user';
import { userActions, userReducer } from './userSlice';
import { logOut, signIn, signUp } from '../actions/userActions';

describe('userSlice', () => {
    const state: UserSchema = {
        data: testUser,
        error: undefined,
        isLoading: false,
        isAuth: true,
    };
    const emptyState: UserSchema = {
        data: null,
        isLoading: false,
        isAuth: false,
    };

    test('setIsLoading', () => {
        const newState = userReducer(state, userActions.setIsLoading(true));

        expect(newState.isLoading).toEqual(true);
    });

    test('authTrue', () => {
        const newState = userReducer(
            emptyState,
            userActions.authTrue({ ...testUser, email: 'qwerty@mail.com' }),
        );

        expect(newState.data).toEqual({ ...testUser, email: 'qwerty@mail.com' });
        expect(newState.isAuth).toEqual(true);
    });

    test('authFalse', () => {
        const newState = userReducer(state, userActions.authFalse());

        expect(newState.isAuth).toEqual(false);
    });

    test('signIn pending', () => {
        const newState = userReducer(emptyState, signIn.pending('', { email: '', password: '' }));

        expect(newState.isLoading).toEqual(true);
        expect(newState.error).toEqual(undefined);
    });

    test('signIn success', () => {
        const newState = userReducer(emptyState, signIn.fulfilled(testUser, '', { email: '', password: '' }));

        expect(newState.data).toEqual(testUser);
        expect(newState.isAuth).toEqual(true);
    });

    test('signIn rejected', () => {
        const newState = userReducer(emptyState, signIn.rejected({ name: 'Error', message: 'error' }, 'ererere', { email: '', password: '' }));

        expect(newState.error).toEqual('An unexpected error occurred');
    });

    test('signUp', () => {
        const newState = userReducer(emptyState, signUp.fulfilled(testUser, '', { email: '', password: '' }));

        expect(newState.data).toEqual(testUser);
        expect(newState.isAuth).toEqual(true);
    });

    test('logOut', () => {
        const newState = userReducer(state, logOut.fulfilled(undefined, ''));

        expect(newState.data).toEqual(null);
        expect(newState.isAuth).toEqual(false);
    });
});
