import { Status, BaseTask, Task } from 'entities/Task';

export const testTask: Task = {
    id: 'Asdager123',
    status: Status.TO_DO,
    completedAt: null,
    title: 'test task',
    createdAt: 1699860692936,
    taskPerformer: '',
    author: '',
    isPrivate: false,
    isImportant: false,
    subTasks: [
        {
            id: 'bdkldfnb123',
            status: Status.IN_PROGRESS,
            title: 'test subtask 1',
            completedAt: null,
        },
    ],
};

export const testSubtask: BaseTask = {
    id: 'dvvbnjkg214',
    status: Status.TO_DO,
    title: 'test subtask 2',
    completedAt: null,
};
