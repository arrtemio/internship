import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IMessage, Task, TasksSchema } from '../types/task';
import {
    changeSubTaskStatus, changeTaskStatus, createSubTask, createTask,
} from '../actions/tasksActions';

const initialState: TasksSchema = {
    data: [],
    isLoading: false,
    error: undefined,
    messages: [],
};

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.data = action.payload;
        },
        setMessage: (state, action: PayloadAction<IMessage>) => {
            state.messages.push(action.payload);
        },
        removeMessage: (state, action: PayloadAction<string>) => {
            state.messages = state.messages.filter((message) => message.taskID !== action.payload);
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(createTask.pending, (state) => {
                state.error = undefined;
            })
            .addCase(createTask.rejected, (state, action) => {
                state.error = action.payload || 'An unexpected error occurred';
            })

            .addCase(changeTaskStatus.pending, (state) => {
                state.error = undefined;
            })
            .addCase(changeTaskStatus.rejected, (state, action) => {
                state.error = action.payload || 'An unexpected error occurred';
            })

            .addCase(createSubTask.pending, (state) => {
                state.error = undefined;
            })
            .addCase(createSubTask.rejected, (state, action) => {
                state.error = action.payload || 'An unexpected error occurred';
            })

            .addCase(changeSubTaskStatus.pending, (state) => {
                state.error = undefined;
            })
            .addCase(changeSubTaskStatus.rejected, (state, action) => {
                state.error = action.payload || 'An unexpected error occurred';
            });
    },
});

export const tasksReducer = tasksSlice.reducer;
export const tasksActions = tasksSlice.actions;
