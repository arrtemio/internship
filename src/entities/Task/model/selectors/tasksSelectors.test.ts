import { testMessage, testTask } from 'shared/test/TestTask';
import { StateSchema } from 'app/store';
import {
    getMessages, getTasksData, getTasksError, getTasksLoading,
} from './tasksSelectors';

describe('tasksSelectors test', () => {
    const state: StateSchema = {
        tasks: {
            data: [testTask],
            isLoading: true,
            error: 'Error',
            messages: [testMessage],
        },
        user: {
            data: null,
            isLoading: false,
            isAuth: true,
        },
    };

    test('should return isLoading', () => {
        expect(getTasksLoading(state)).toEqual(true);
    });

    test('should return error', () => {
        expect(getTasksError(state)).toEqual('Error');
    });

    test('should return messages', () => {
        expect(getMessages(state)).toEqual([testMessage]);
    });

    test('should work with empty state', () => {
        const state = {
            tasks: {},
        };

        expect(getTasksData(state as StateSchema)).toEqual([]);
        expect(getTasksLoading(state as StateSchema)).toEqual(false);
        expect(getTasksError(state as StateSchema)).toEqual(undefined);
        expect(getMessages(state as StateSchema)).toEqual([]);
    });
});
