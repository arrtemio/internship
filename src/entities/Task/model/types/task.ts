import { generateRandomId } from 'shared/lib/helpers';

export enum Status {
    COMPLETED = 'Completed',
    TO_DO = 'To do',
    IN_PROGRESS = 'In progress'
}

export const StatusValues = Object.values(Status);

export interface BaseTask {
    id: string;
    title: string;
    completedAt: number | null;
    status: Status;
}

export interface Task extends BaseTask {
    createdAt: number;
    subTasks: BaseTask[];
}

export interface BaseTaskDTO {
    title: string;
    completedAt: number | null;
    status: Status;
}

export interface TaskDTO extends BaseTaskDTO {
    createdAt: number;
    subTasks: BaseTask[];
}

export const createSubTaskDto = (title: string): BaseTask => (
    {
        title,
        completedAt: null,
        status: Status.TO_DO,
        id: generateRandomId(),
    }
);

export const createTasKDto = (title: string): TaskDTO => (
    {
        title,
        completedAt: null,
        status: Status.TO_DO,
        createdAt: Date.now(),
        subTasks: [],
    }
);

export interface TasksSchema {
    data: Task[];
    isLoading: boolean;
    error: string | undefined;
}
