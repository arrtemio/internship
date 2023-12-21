import { StateSchema } from 'app/store';

export const getUserData = (store: StateSchema) => store.user.data || null;
export const getUserLoading = (store: StateSchema) => store.user.isLoading || false;
export const getUserError = (store: StateSchema) => store.user.error || undefined;
export const getUserIsAuth = (store: StateSchema) => store.user.isAuth || false;
