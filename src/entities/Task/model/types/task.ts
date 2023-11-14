export enum StatusEnum {
    COMPLETED = 'COMPLETED',
    TO_DO = 'TO_DO',
    IN_PROGRESS = 'IN_PROGRESS'
}

export interface SubTask {
    id: string;
    taskId: string;
    title: string;
    completedAt: number | null;
    status: StatusEnum;
}

export interface Task {
    id: string;
    title: string;
    createdAt: number;
    completedAt: number | null;
    status: StatusEnum;
    subTasks: SubTask[];
}

export interface TasksSchema {
    data: Task[];
}
