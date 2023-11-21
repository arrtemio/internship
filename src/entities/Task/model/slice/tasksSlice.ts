import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
    Status, BaseTask, Task, TasksSchema,
} from '../types/task';

const initialState: TasksSchema = {
    data: [],
};

const updateLocalStorage = (tasks: Task[]) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
};

const getTaskById = <T extends BaseTask>(tasks: T[], id: string): T | undefined => (
    tasks.find((task) => task.id === id)
);

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

        changeTaskStatus: (state, action: PayloadAction<{taskID: string, status: Status}>) => {
            const { status, taskID } = action.payload;

            const currentTask = getTaskById(state.data, taskID);
            if (!currentTask) return;

            currentTask.status = status;

            if (status === Status.COMPLETED) {
                const timeStamp = Date.now();
                currentTask.completedAt = timeStamp;
                currentTask.subTasks.forEach((sub) => {
                    sub.status = Status.COMPLETED;
                    sub.completedAt = timeStamp;
                });
            } else {
                currentTask.completedAt = null;
            }

            updateLocalStorage(state.data);
        },

        createSubTask: (state, action: PayloadAction<{ subTask: BaseTask, taskID: string }>) => {
            const { subTask, taskID } = action.payload;
            const currentTask = getTaskById(state.data, taskID);

            if (!currentTask) return;

            currentTask.subTasks.push(subTask);
            if (currentTask.status === Status.COMPLETED) {
                currentTask.status = Status.IN_PROGRESS;
                currentTask.completedAt = null;
            }

            updateLocalStorage(state.data);
        },

        changeSubTaskStatus: (state, action: PayloadAction<{
            status: Status,
            subTaskID: string,
            taskID: string,
        }>) => {
            const { subTaskID, status, taskID } = action.payload;
            const currentTask = getTaskById(state.data, taskID);

            if (!currentTask) return;

            const currentSubTask = getTaskById(currentTask.subTasks, subTaskID);

            if (!currentSubTask) return;

            const timeStamp = Date.now();

            currentSubTask.status = status;
            currentSubTask.completedAt = status === Status.COMPLETED
                ? timeStamp
                : null;

            const areAllSubTasksCompleted = currentTask.subTasks.every((sub) => sub.status === Status.COMPLETED);
            if (areAllSubTasksCompleted) {
                currentTask.status = Status.COMPLETED;
                currentTask.completedAt = timeStamp;
            } else {
                currentTask.status = Status.IN_PROGRESS;
                currentTask.completedAt = null;
            }

            updateLocalStorage(state.data);
        },
    },
});

export const {
    reducer: tasksReducer,
    actions: tasksActions,
} = tasksSlice;
