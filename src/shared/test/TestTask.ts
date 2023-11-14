import { StatusEnum, SubTask, Task } from '../../entities/Task/model/types/task';

export const testTask: Task = {
    id: 'Asdager123',
    status: StatusEnum.TO_DO,
    completedAt: null,
    title: 'test task',
    createdAt: 1699860692936,
    subTasks: [
        {
            id: 'bdkldfnb123',
            status: StatusEnum.IN_PROGRESS,
            title: 'test subtask 1',
            taskId: 'Asdager123',
            completedAt: null,
        },
    ],
};

export const testSubtask: SubTask = {
    id: 'dvvbnjkg214',
    status: StatusEnum.TO_DO,
    title: 'test subtask 2',
    taskId: 'Asdager123',
    completedAt: null,
};
