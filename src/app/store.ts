import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { tasksReducer, TasksSchema } from 'entities/Task';
import { userReducer, UserSchema } from 'entities/User';

export interface StateSchema {
    tasks: TasksSchema,
    user: UserSchema,
}

const rootReducer = combineReducers<StateSchema>({
    tasks: tasksReducer,
    user: userReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
    reducer: rootReducer,
    preloadedState,
});

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
