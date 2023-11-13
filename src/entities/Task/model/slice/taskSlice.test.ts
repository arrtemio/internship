import { DeepPartial } from '@reduxjs/toolkit';
import { StatusEnum, Task, TasksSchema } from '../types/task';
import { tasksActions, tasksReducer } from './tasksSlice';
import { testSubtask, testTask } from '../../../../shared/test/TestTask';

describe('tasksSlice', () => {
    const state: DeepPartial<TasksSchema> = {
        data: [
            testTask,
        ],
    };
    const task: Task = { ...testTask, id: 2 };

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
                    { ...testTask, id: 2 },
                ],
            });
    });

    test('Change task status to In Progress', () => {
        expect(tasksReducer(state as TasksSchema, tasksActions.changeTaskStatus({ ...testTask, status: StatusEnum.IN_PROGRESS })))
            .toEqual({
                data: [
                    { ...testTask, status: StatusEnum.IN_PROGRESS },
                ],
            });
    });

    test('Change task status to Complete', () => {
        expect(tasksReducer(state as TasksSchema, tasksActions.changeTaskStatus({ ...testTask, status: StatusEnum.COMPLETED })))
            .toEqual({
                data: [
                    {
                        id: 1,
                        status: StatusEnum.COMPLETED,
                        completedAt: expect.any(Number),
                        title: 'test task',
                        createdAt: 1699860692936,
                        subTasks: [
                            {
                                id: 1,
                                status: StatusEnum.COMPLETED,
                                title: 'test subtask 1',
                                taskId: 1,
                                completedAt: expect.any(Number),
                            },
                        ],
                    },
                ],
            });
    });

    test('Create subTask', () => {
        expect(tasksReducer(state as TasksSchema, tasksActions.createSubTask(testSubtask)))
            .toEqual({
                data: [
                    { ...testTask, subTasks: [...testTask.subTasks, testSubtask] },
                ],
            });
    });

    test('Change sub Task status', () => {
        expect(tasksReducer(state as TasksSchema, tasksActions.changeSubTaskStatus({
            id: 1,
            status: StatusEnum.COMPLETED,
            title: 'test subtask 1',
            taskId: 1,
            completedAt: null,
        }))).toEqual({
            data: [
                {
                    id: 1,
                    status: StatusEnum.COMPLETED,
                    completedAt: expect.any(Number),
                    title: 'test task',
                    createdAt: 1699860692936,
                    subTasks: [
                        {
                            id: 1,
                            status: StatusEnum.COMPLETED,
                            title: 'test subtask 1',
                            taskId: 1,
                            completedAt: expect.any(Number),
                        },
                    ],
                },
            ],
        });
    });
});
