import { StatusEnum, SubTask, Task } from '../../entities/Task/model/types/task';

export const testTask: Task = {
    id: 1,
    status: StatusEnum.TO_DO,
    completedAt: null,
    title: 'test task',
    createdAt: 1699860692936,
    subTasks: [
        {
            id: 1,
            status: StatusEnum.IN_PROGRESS,
            title: 'test subtask 1',
            taskId: 1,
            completedAt: null,
        },
    ],
};

export const testSubtask: SubTask = {
    id: 2,
    status: StatusEnum.TO_DO,
    title: 'test subtask 1',
    taskId: 1,
    completedAt: null,
};
