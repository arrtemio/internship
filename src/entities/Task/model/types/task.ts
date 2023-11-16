export enum Status {
    COMPLETED = 'Completed',
    TO_DO = 'To do',
    IN_PROGRESS = 'In progress'
}

export const StatusArr = Object.values(Status);

export interface BaseTask {
    id: string;
    title: string;
    completedAt: number | null;
    status: Status;
}

export interface Task extends BaseTask{
    createdAt: number;
    subTasks: BaseTask[];
}

export interface TasksSchema {
    data: Task[];
}
