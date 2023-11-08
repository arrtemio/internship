import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    StatusEnum, SubTask, Task, TasksSchema,
} from '../types/task';

const initialState: TasksSchema = {
    tasks: [],
};

export const tasksSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        getAllTasks: (state) => {
            state.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        },

        createNewTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },

        changeTaskStatus: (state, action: PayloadAction<Task>) => {
            const taskWithNewStatus = action.payload;
            state.tasks = state.tasks.map((task) => {
                if (task.id === taskWithNewStatus.id) {
                    const changedSubTasks = taskWithNewStatus.status === StatusEnum.COMPLETED
                        ? task?.subTasks?.map((sub) => ({ ...sub, status: StatusEnum.COMPLETED }))
                        : task?.subTasks;

                    const changedTask: Task = {
                        ...task,
                        status: taskWithNewStatus.status,
                        subTasks: changedSubTasks,
                    };
                    return changedTask;
                }
                return task;
            });
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },

        createSubTask: (state, action: PayloadAction<SubTask>) => {
            state.tasks = state.tasks.map((task) => {
                if (task.id === action.payload.task_id) {
                    const { subTasks } = task;
                    subTasks.push(action.payload);
                    if (task.status === StatusEnum.COMPLETED) task.status = StatusEnum.TO_DO;

                    return { ...task, subTasks };
                }
                return task;
            });
            localStorage.setItem('tasks', JSON.stringify(state.tasks));
        },
    },
});

export const {
    reducer: tasksReducer,
    actions: tasksActions,
} = tasksSlice;
