import { generateRandomId } from 'shared/lib/helpers';

export enum Status {
    COMPLETED = 'Completed',
    TO_DO = 'To do',
    IN_PROGRESS = 'In progress'
}

export const StatusValues: Status[] = [Status.TO_DO, Status.IN_PROGRESS, Status.COMPLETED];

export interface BaseTaskDTO {
    title: string;
    completedAt: number | null;
    status: Status;
}
export interface BaseTask extends BaseTaskDTO {
    id: string;
}

export interface TaskDTO extends BaseTaskDTO {
    createdAt: number;
    subTasks: BaseTask[];
    author: string;
    taskPerformer: string;
    isPrivate: boolean;
    isImportant: boolean;
}

export interface Task extends BaseTask {
    createdAt: number;
    subTasks: BaseTask[];
    author: string;
    taskPerformer: string;
    isPrivate: boolean;
    isImportant: boolean;
}

export const createSubTaskDto = (title: string): BaseTask => (
    {
        title,
        completedAt: null,
        status: Status.TO_DO,
        id: generateRandomId(),
    }
);

export const createTaskDto = (title: string, author: string, taskPerformer: string, isPrivate: boolean, isImportant: boolean): TaskDTO => (
    {
        title,
        completedAt: null,
        status: Status.TO_DO,
        createdAt: Date.now(),
        author,
        taskPerformer: taskPerformer.trim(),
        isPrivate,
        isImportant,
        subTasks: [],
    }
);

export interface IMessage {
    title: string;
    isImportant: boolean;
    taskID: string;
}

export interface TasksSchema {
    data: Task[];
    isLoading: boolean;
    error: string | undefined;
    messages: IMessage[];
}

interface TaskID {
    taskID: string;
}

export interface CreateSubTask extends TaskID{
    subTask: BaseTask;
}

export interface ChangeTaskStatus extends TaskID {
    status: Status;
}

export interface ChangeSubTaskStatus extends ChangeTaskStatus{
    subTaskID: string;
}
