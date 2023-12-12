import {
    addDoc, collection, doc, getDoc, getDocs, updateDoc,
} from 'firebase/firestore';
import { firestore } from 'app/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { changeSubTaskStatusFn, changeTaskStatusFn, createSubTaskFn } from '../utils/tasksUtils';
import {
    BaseTask, ChangeSubTaskStatus, ChangeTaskStatus, CreateSubTask, Task, TaskDTO,
} from '../types/task';

const tasksCollection = collection(firestore, 'tasks');

const getTaskByID = async (taskID: string) => {
    const taskRef = doc(tasksCollection, taskID);
    const taskSnapshot = await getDoc(taskRef);
    const taskData = taskSnapshot.data() as TaskDTO;

    if (!taskData) throw new Error('Task not found');

    return { taskRef, taskData };
};

const handleAsyncThunkError = (error: any) => {
    if (error instanceof Error) {
        return error.message;
    }
    return 'An unexpected error occurred';
};

export const getAllTasks = createAsyncThunk<Task[], void, { rejectValue: string }>(
    'tasks/getAllTasks',
    async (_, { rejectWithValue }) => {
        try {
            const querySnapshot = await getDocs(tasksCollection);
            const tasks: Task[] = [];
            querySnapshot.forEach((doc) => {
                tasks.push({ id: doc.id, ...doc.data() } as Task);
            });

            return tasks;
        } catch (error) {
            return rejectWithValue(handleAsyncThunkError(error));
        }
    },
);

export const createTask = createAsyncThunk<Task, TaskDTO, { rejectValue: string }>(
    'tasks/createTask',
    async (task: TaskDTO, { rejectWithValue }) => {
        try {
            const taskRef = await addDoc(tasksCollection, task);
            const newTask: Task = { id: taskRef.id, ...task };

            return newTask;
        } catch (error) {
            return rejectWithValue(handleAsyncThunkError(error));
        }
    },
);

export const changeTaskStatus = createAsyncThunk<ChangeTaskStatus, ChangeTaskStatus, { rejectValue: string }>(
    'tasks/changeTaskStatus',
    async ({ taskID, status }: ChangeTaskStatus, { rejectWithValue }) => {
        try {
            const { taskData, taskRef } = await getTaskByID(taskID);
            changeTaskStatusFn(taskData, status);

            await updateDoc(taskRef, { ...taskData });

            return { taskID, status };
        } catch (error) {
            return rejectWithValue(handleAsyncThunkError(error));
        }
    },
);

export const createSubTask = createAsyncThunk<CreateSubTask, CreateSubTask, { rejectValue: string }>(
    'tasks/createSubTask',
    async ({ taskID, subTask }: CreateSubTask, { rejectWithValue }) => {
        try {
            const { taskData, taskRef } = await getTaskByID(taskID);
            createSubTaskFn(taskData, subTask);

            await updateDoc(taskRef, { ...taskData });

            return { subTask, taskID };
        } catch (error) {
            return rejectWithValue(handleAsyncThunkError(error));
        }
    },
);

export const changeSubTaskStatus = createAsyncThunk<ChangeSubTaskStatus, ChangeSubTaskStatus, { rejectValue: string }>(
    'tasks/changeSubTaskStatus',
    async ({ status, taskID, subTaskID }: ChangeSubTaskStatus, { rejectWithValue }) => {
        try {
            const { taskData, taskRef } = await getTaskByID(taskID);
            const currentSubTask = taskData.subTasks.find((sub: BaseTask) => sub.id === subTaskID);

            if (!currentSubTask) throw new Error('Sub task not found');

            changeSubTaskStatusFn(taskData, currentSubTask, status);

            await updateDoc(taskRef, { ...taskData });

            return { status, taskID, subTaskID };
        } catch (error) {
            return rejectWithValue(handleAsyncThunkError(error));
        }
    },
);
