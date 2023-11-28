import { combineReducers, configureStore, PreloadedState } from '@reduxjs/toolkit';
import { tasksReducer, TasksSchema } from 'entities/Task';

export interface StateSchema {
    tasks: TasksSchema,
}

const rootReducer = combineReducers<StateSchema>({
    tasks: tasksReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

export const setupStore = (preloadedState?: PreloadedState<RootState>) => configureStore({
    reducer: rootReducer,
    preloadedState,
});

export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore['dispatch'];
