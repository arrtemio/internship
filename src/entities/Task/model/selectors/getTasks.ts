import { TasksSchema } from '../types/task';

export const getTasks = (state: TasksSchema) => state.tasks || [];
