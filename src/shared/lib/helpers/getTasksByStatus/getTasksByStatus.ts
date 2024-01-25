import { Status, Task } from 'entities/Task';

export const getTasksByStatus = (tasks: Task[], status: Status) => tasks.filter((task) => task.status === status);
