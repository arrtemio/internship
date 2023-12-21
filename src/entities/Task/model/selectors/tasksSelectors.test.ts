import { testTask } from 'shared/test/TestTask';
import { StateSchema } from 'app/store';
import { getTasksData, getTasksError, getTasksLoading } from './tasksSelectors';

describe('tasksSelectors test', () => {
    const state: StateSchema = {
        tasks: {
            data: [testTask],
            isLoading: true,
            error: 'Error',
        },
        user: {
            data: null,
            isLoading: false,
            isAuth: true,
        },
    };

    test('should return tasks data', () => {
        expect(getTasksData(state)).toEqual([testTask]);
    });

    test('should return isLoading', () => {
        expect(getTasksLoading(state)).toEqual(true);
    });

    test('should return error', () => {
        expect(getTasksError(state)).toEqual('Error');
    });

    test('should work with empty state', () => {
        const state = {
            tasks: {},
        };

        expect(getTasksData(state as StateSchema)).toEqual([]);
        expect(getTasksLoading(state as StateSchema)).toEqual(false);
        expect(getTasksError(state as StateSchema)).toEqual(undefined);
    });
});
