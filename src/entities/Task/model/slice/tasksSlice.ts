import { createSlice } from '@reduxjs/toolkit';
import { BaseTask, TasksSchema } from '../types/task';
import {
    changeSubTaskStatus, changeTaskStatus, createSubTask, createTask, getAllTasks,
} from '../actions/tasksActions';
import { changeSubTaskStatusFn, changeTaskStatusFn, createSubTaskFn } from '../utils/tasksUtils';

const initialState: TasksSchema = {
    data: [],
    isLoading: false,
    error: undefined,
};

const getTaskById = <T extends BaseTask>(tasks: T[], id: string): T | undefined => (
    tasks.find((task) => task.id === id)
);

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAllTasks.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(getAllTasks.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data = action.payload;
            })
            .addCase(getAllTasks.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'An unexpected error occurred';
            })

            .addCase(createTask.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(createTask.fulfilled, (state, action) => {
                state.isLoading = false;
                state.data.push(action.payload);
                state.data.sort((a, b) => b.createdAt - a.createdAt);
            })
            .addCase(createTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'An unexpected error occurred';
            })

            .addCase(changeTaskStatus.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(changeTaskStatus.fulfilled, (state, action) => {
                state.isLoading = false;

                const { status, taskID } = action.payload;

                const currentTask = getTaskById(state.data, taskID);
                if (!currentTask) return;

                changeTaskStatusFn(currentTask, status);
            })
            .addCase(changeTaskStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'An unexpected error occurred';
            })

            .addCase(createSubTask.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(createSubTask.fulfilled, (state, action) => {
                state.isLoading = false;

                const { subTask, taskID } = action.payload;
                const currentTask = getTaskById(state.data, taskID);

                if (!currentTask) return;

                createSubTaskFn(currentTask, subTask);
            })
            .addCase(createSubTask.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'An unexpected error occurred';
            })

            .addCase(changeSubTaskStatus.pending, (state) => {
                state.isLoading = true;
                state.error = undefined;
            })
            .addCase(changeSubTaskStatus.fulfilled, (state, action) => {
                state.isLoading = false;

                const { subTaskID, status, taskID } = action.payload;
                const currentTask = getTaskById(state.data, taskID);

                if (!currentTask) return;

                const currentSubTask = getTaskById(currentTask.subTasks, subTaskID);

                if (!currentSubTask) return;
                changeSubTaskStatusFn(currentTask, currentSubTask, status);
            })
            .addCase(changeSubTaskStatus.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload || 'An unexpected error occurred';
            });
    },
});

export const tasksReducer = tasksSlice.reducer;
