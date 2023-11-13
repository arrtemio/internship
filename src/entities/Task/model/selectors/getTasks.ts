import { StateSchema } from '../../../../app/store';

export const getTasks = (state: StateSchema) => state.tasks.data || [];
