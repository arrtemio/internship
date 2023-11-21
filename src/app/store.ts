import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { tasksReducer, TasksSchema } from 'entities/Task';

export interface StateSchema {
    tasks: TasksSchema,
}

const rootReducer = combineReducers<StateSchema>({
    tasks: tasksReducer,
});

export const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
