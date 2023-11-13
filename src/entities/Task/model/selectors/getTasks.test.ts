import { DeepPartial } from '@reduxjs/toolkit';
import { getTasks } from './getTasks';
import { testTask } from '../../../../shared/test/TestTask';
import { StateSchema } from '../../../../app/store';

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
