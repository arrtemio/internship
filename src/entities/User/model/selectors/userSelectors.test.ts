import { StateSchema } from 'app/store';
import { testUser } from 'shared/test/TestUser';
import {
    getUserData, getUserError, getUserIsAuth, getUserLoading,
} from './userSelectors';

describe('userSelectors test', () => {
    const state: StateSchema = {
        tasks: {
            data: [],
            isLoading: false,
            error: undefined,
            messages: [],
        },
        user: {
            data: testUser,
            isLoading: false,
            error: 'Error',
            isAuth: true,
        },
    };

    test('should return user data', () => {
        expect(getUserData(state)).toEqual(testUser);
    });

    test('should return isLoading', () => {
        expect(getUserLoading(state)).toEqual(false);
    });

    test('should return error', () => {
        expect(getUserError(state)).toEqual('Error');
    });

    test('should return isAuth', () => {
        expect(getUserIsAuth(state)).toEqual(true);
    });

    test('should work with empty state', () => {
        const state = {
            user: {},
        };

        expect(getUserData(state as StateSchema)).toEqual(null);
        expect(getUserLoading(state as StateSchema)).toEqual(false);
        expect(getUserError(state as StateSchema)).toEqual(undefined);
        expect(getUserIsAuth(state as StateSchema)).toEqual(false);
    });
});
