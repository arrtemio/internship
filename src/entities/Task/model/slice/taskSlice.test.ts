import { DeepPartial } from '@reduxjs/toolkit';
import { testSubtask, testTask } from 'shared/test/TestTask';
import { generateRandomId } from 'shared/lib/helpers';
import { Status, Task, TasksSchema } from '../types/task';
import { tasksActions, tasksReducer } from './tasksSlice';

describe('tasksSlice', () => {
    const state: DeepPartial<TasksSchema> = {
        data: [
            testTask,
        ],
    };
    const randomID = generateRandomId();
    const task: Task = { ...testTask, id: randomID };

    test('Get all todos', () => {
        const state = {};
        localStorage.setItem('tasks', JSON.stringify([testTask]));
        expect(tasksReducer(state as TasksSchema, tasksActions.getAllTasks()))
            .toEqual({ data: [testTask] });
    });

    test('Create new task', () => {
        expect(tasksReducer(state as TasksSchema, tasksActions.createNewTask(task)))
            .toEqual({
                data: [
                    testTask,
                    { ...testTask, id: randomID },
                ],
            });
    });

    test('Change task status to In Progress', () => {
        expect(tasksReducer(state as TasksSchema, tasksActions.changeTaskStatus(
            { ...testTask, status: Status.IN_PROGRESS },
        )))
            .toEqual({
                data: [
                    { ...testTask, status: Status.IN_PROGRESS },
                ],
            });
    });

    test('Change task status to Complete', () => {
        expect(tasksReducer(state as TasksSchema, tasksActions.changeTaskStatus(
            { ...testTask, status: Status.COMPLETED },
        )))
            .toEqual({
                data: [
                    {
                        id: 'Asdager123',
                        status: Status.COMPLETED,
                        completedAt: expect.any(Number),
                        title: 'test task',
                        createdAt: 1699860692936,
                        subTasks: [
                            {
                                id: 'bdkldfnb123',
                                status: Status.COMPLETED,
                                title: 'test subtask 1',
                                completedAt: expect.any(Number),
                            },
                        ],
                    },
                ],
            });
    });

    test('Create subTask', () => {
        expect(tasksReducer(state as TasksSchema, tasksActions.createSubTask({ subTask: testSubtask, taskID: testTask.id })))
            .toEqual({
                data: [
                    { ...testTask, subTasks: [...testTask.subTasks, testSubtask] },
                ],
            });
    });

    test('Create subTask when the task is Complete', () => {
        const state: DeepPartial<TasksSchema> = {
            data: [
                {
                    id: 'Asdager123',
                    status: Status.COMPLETED,
                    completedAt: 1699860692936,
                    title: 'test task',
                    createdAt: 1699860692936,
                    subTasks: [
                        { ...testSubtask, id: 'asd2314asd' },
                    ],
                },
            ],
        };
        expect(tasksReducer(state as TasksSchema, tasksActions.createSubTask({ subTask: testSubtask, taskID: testTask.id })))
            .toEqual({
                data: [
                    {
                        ...testTask,
                        status: Status.IN_PROGRESS,
                        completedAt: null,
                        subTasks: [{ ...testSubtask, id: 'asd2314asd' }, testSubtask],
                    },
                ],
            });
    });

    test('Change sub Task status', () => {
        expect(tasksReducer(state as TasksSchema, tasksActions.changeSubTaskStatus(
            {
                subTask: {
                    id: 'bdkldfnb123',
                    status: Status.COMPLETED,
                    title: 'test subtask 1',
                    completedAt: null,
                },
                taskID: testTask.id,
            },
        ))).toEqual({
            data: [
                {
                    id: 'Asdager123',
                    status: Status.COMPLETED,
                    completedAt: expect.any(Number),
                    title: 'test task',
                    createdAt: 1699860692936,
                    subTasks: [
                        {
                            id: 'bdkldfnb123',
                            status: Status.COMPLETED,
                            title: 'test subtask 1',
                            completedAt: expect.any(Number),
                        },
                    ],
                },
            ],
        });
    });
});
