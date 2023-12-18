import { testSubtask, testTask } from 'shared/test/TestTask';
import { generateRandomId } from 'shared/lib/helpers';
import { Status, TasksSchema } from '../types/task';
import { tasksReducer } from './tasksSlice';
import {
    changeSubTaskStatus, changeTaskStatus, createSubTask, createTask, getAllTasks,
} from '../actions/tasksActions';

describe('tasksSlice', () => {
    const state: TasksSchema = {
        data: [testTask],
        error: undefined,
        isLoading: false,
    };
    const randomID = generateRandomId();

    test('Get all tasks pending', () => {
        const newState = tasksReducer(state, getAllTasks.pending(''));

        expect(newState.isLoading).toEqual(true);
        expect(newState.error).toEqual(undefined);
    });
    test('Get all tasks success', () => {
        const newState = tasksReducer(state, getAllTasks.fulfilled([testTask], ''));

        expect(newState.data).toEqual([testTask]);
    });
    test('Get all tasks rejected', () => {
        const newState = tasksReducer(state, getAllTasks.rejected);

        expect(newState.error).toEqual('An unexpected error occurred');
    });

    test('Create new task', () => {
        const newState = tasksReducer(state, createTask.fulfilled(
            { ...testTask, id: randomID },
            '',
            testTask,
        ));

        expect(newState.data).toEqual([testTask, { ...testTask, id: randomID }]);
    });

    test('Change task status to In Progress', () => {
        const newState = tasksReducer(state, changeTaskStatus.fulfilled(
            { taskID: testTask.id, status: Status.IN_PROGRESS },
            '',
            { taskID: testTask.id, status: Status.IN_PROGRESS },
        ));
        expect(newState.data).toEqual([{ ...testTask, status: Status.IN_PROGRESS }]);
    });

    test('Change task status to Complete', () => {
        const newState = tasksReducer(state, changeTaskStatus.fulfilled(
            { taskID: testTask.id, status: Status.COMPLETED },
            '',
            { taskID: testTask.id, status: Status.COMPLETED },
        ));
        expect(newState.data).toEqual([
            {
                ...testTask,
                status: Status.COMPLETED,
                completedAt: expect.any(Number),
                subTasks: testTask.subTasks.map((t) => ({
                    ...t,
                    status: Status.COMPLETED,
                    completedAt: expect.any(Number),
                })),
            },
        ]);
    });

    test('Create subTask', () => {
        const newState = tasksReducer(state as TasksSchema, createSubTask.fulfilled(
            { subTask: testSubtask, taskID: testTask.id },
            '',
            { subTask: testSubtask, taskID: testTask.id },
        ));
        expect(newState.data).toEqual([{ ...testTask, subTasks: [...testTask.subTasks, testSubtask] }]);
    });

    test('Create subTask when the task is Complete', () => {
        const state: TasksSchema = {
            data: [
                {
                    ...testTask,
                    status: Status.COMPLETED,
                    completedAt: expect.any(Number),
                    subTasks: [
                        { ...testSubtask, id: 'asd2314asd' },
                    ],
                },
            ],
            error: undefined,
            isLoading: false,
        };
        const newState = tasksReducer(state, createSubTask.fulfilled(
            { subTask: testSubtask, taskID: testTask.id },
            '',
            { subTask: testSubtask, taskID: testTask.id },
        ));
        expect(newState.data).toEqual([{
            ...testTask,
            status: Status.IN_PROGRESS,
            completedAt: null,
            subTasks: [{ ...testSubtask, id: 'asd2314asd' }, testSubtask],
        }]);
    });

    test('Change sub Task status', () => {
        const newState = tasksReducer(state, changeSubTaskStatus.fulfilled(
            { status: Status.COMPLETED, taskID: testTask.id, subTaskID: 'bdkldfnb123' },
            '',
            { status: Status.COMPLETED, taskID: testTask.id, subTaskID: 'bdkldfnb123' },
        ));
        expect(newState.data).toEqual([
            {
                ...testTask,
                status: Status.COMPLETED,
                completedAt: expect.any(Number),
                subTasks: testTask.subTasks.map((t) => ({
                    ...t,
                    status: Status.COMPLETED,
                    completedAt: expect.any(Number),
                })),
            },
        ]);
    });
});
