import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    StatusEnum, SubTask, Task, TasksSchema,
} from '../types/task';

const initialState: TasksSchema = {
    data: [],
};

const updateLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getTaskById = (tasks: (Task | SubTask)[], id: number) => tasks.find((task) => task.id === id);

export const tasksSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        getAllTasks: (state) => {
            state.data = JSON.parse(localStorage.getItem('tasks') || '[]');
        },

        createNewTask: (state, action: PayloadAction<Task>) => {
            state.data.push(action.payload);
            updateLocalStorage(state.data);
        },

        changeTaskStatus: (state, action: PayloadAction<Task>) => {
            const { status } = action.payload;

            const currentTask = getTaskById(state.data, action.payload.id) as Task;
            currentTask.status = status;

            if (status === StatusEnum.COMPLETED) {
                currentTask.completedAt = Date.now();
                currentTask.subTasks = currentTask.subTasks.map((sub) => (
                    { ...sub, status: StatusEnum.COMPLETED, completedAt: Date.now() }));
            } else {
                currentTask.completedAt = null;
            }

            updateLocalStorage(state.data);
        },

        createSubTask: (state, action: PayloadAction<SubTask>) => {
            const currentTask = getTaskById(state.data, action.payload.taskId) as Task;
            currentTask.subTasks.push(action.payload);
            if (currentTask.status === StatusEnum.COMPLETED) currentTask.status = StatusEnum.IN_PROGRESS;

            updateLocalStorage(state.data);
        },

        changeSubTaskStatus: (state, action: PayloadAction<SubTask>) => {
            const currentTask = getTaskById(state.data, action.payload.taskId) as Task;
            if (currentTask) {
                const currentSubTask = getTaskById(currentTask.subTasks, action.payload.id) as SubTask;

                currentSubTask.completedAt = action.payload.status === StatusEnum.COMPLETED
                    ? Date.now()
                    : null;

                if (currentSubTask) currentSubTask.status = action.payload.status;

                const isAllSubTasksComplete = !currentTask.subTasks.find((sub) => sub.status !== StatusEnum.COMPLETED);

                if (isAllSubTasksComplete) {
                    currentTask.status = StatusEnum.COMPLETED;
                    currentTask.completedAt = Date.now();
                } else {
                    currentTask.status = StatusEnum.IN_PROGRESS;
                    currentTask.completedAt = null;
                }
            }

            updateLocalStorage(state.data);
        },
    },
});

export const {
    reducer: tasksReducer,
    actions: tasksActions,
} = tasksSlice;
