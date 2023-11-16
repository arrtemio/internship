import { DeepPartial } from '@reduxjs/toolkit';
import { testTask } from 'shared/test/TestTask';
import { StateSchema } from 'app/store';
import { getTasks } from './getTasks';

describe('getTasks', () => {
    let state: DeepPartial<StateSchema>;

    beforeEach(() => {
        state = {
            tasks: {
                data: [testTask],
            },
        };
    });
    test('should return tasks', () => {
        expect(getTasks(state as StateSchema)).toEqual([testTask]);
    });

    test('should work with empty state', () => {
        state = {
            tasks: {},
        };

        expect(getTasks(state as StateSchema)).toEqual([]);
    });
});
