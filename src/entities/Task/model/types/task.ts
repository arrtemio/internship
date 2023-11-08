export enum StatusEnum {
    COMPLETED = 'COMPLETED',
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS'
}

export interface SubTask {
    id: number;
    task_id: number;
    title: string;
    doneAt?: number;
    status: StatusEnum;
}

export interface Task {
    id: number;
    title: string;
    createdAt: number;
    completedAt?: number;
    status: StatusEnum;
    subTasks: SubTask[];
}

export interface TasksSchema {
    tasks: Task[];
}
