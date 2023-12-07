import { DeepPartial } from '@reduxjs/toolkit';
import { testTask } from 'shared/test/TestTask';
import { StateSchema } from 'app/store';
import { getTasksData, getTasksError, getTasksLoading } from './tasksSelectors';

describe('tasksSelectors test', () => {
    let state: DeepPartial<StateSchema>;

    test('should return tasks data', () => {
        state = {
            tasks: {
                data: [testTask],
            },
        };

        expect(getTasksData(state as StateSchema)).toEqual([testTask]);
    });

    test('should return isLoading', () => {
        state = {
            tasks: {
                isLoading: true,
            },
        };

        expect(getTasksLoading(state as StateSchema)).toEqual(true);
    });

    test('should return isLoading', () => {
        state = {
            tasks: {
                error: 'Error',
            },
        };

        expect(getTasksError(state as StateSchema)).toEqual('Error');
    });

    test('should work with empty state', () => {
        state = {
            tasks: {},
        };

        expect(getTasksData(state as StateSchema)).toEqual([]);
        expect(getTasksLoading(state as StateSchema)).toEqual(false);
        expect(getTasksError(state as StateSchema)).toEqual(undefined);
    });
});
