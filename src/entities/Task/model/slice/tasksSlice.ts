import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    StatusEnum, SubTask, Task, TasksSchema,
} from '../types/task';

const initialState: TasksSchema = {
    tasks: [],
};

const updateLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getTaskById = (tasks: (Task | SubTask)[], id: number) => tasks.find((task) => task.id === id);

export const tasksSlice = createSlice({
    name: 'task',
    initialState,
    reducers: {
        getAllTasks: (state) => {
            state.tasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        },

        createNewTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
            updateLocalStorage(state.tasks);
        },

        changeTaskStatus: (state, action: PayloadAction<Task>) => {
            const { status } = action.payload;

            const currentTask = getTaskById(state.tasks, action.payload.id) as Task;
            currentTask.status = status;

            if (status === StatusEnum.COMPLETED) {
                currentTask.completedAt = Date.now();
                currentTask.subTasks = currentTask.subTasks.map((sub) => (
                    { ...sub, status: StatusEnum.COMPLETED, completedAt: Date.now() }));
            } else {
                currentTask.completedAt = null;
            }

            updateLocalStorage(state.tasks);
        },

        createSubTask: (state, action: PayloadAction<SubTask>) => {
            const currentTask = getTaskById(state.tasks, action.payload.taskId) as Task;
            currentTask.subTasks.push(action.payload);
            if (currentTask.status === StatusEnum.COMPLETED) currentTask.status = StatusEnum.IN_PROGRESS;

            updateLocalStorage(state.tasks);
        },

        changeSubTaskStatus: (state, action: PayloadAction<SubTask>) => {
            const currentTask = getTaskById(state.tasks, action.payload.taskId) as Task;
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

            updateLocalStorage(state.tasks);
        },
    },
});

export const {
    reducer: tasksReducer,
    actions: tasksActions,
} = tasksSlice;
