import { StateSchema } from 'app/store';

export const getTasksData = (state: StateSchema) => state.tasks.data || [];
export const getTasksLoading = (state: StateSchema) => state.tasks.isLoading || false;
export const getTasksError = (state: StateSchema) => state.tasks.error || undefined;
export const getMessages = (state: StateSchema) => state.tasks.messages || [];
