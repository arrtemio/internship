import {
    addDoc, collection, doc, getDoc, getDocs, updateDoc, query, where, or,
} from 'firebase/firestore';
import { firestore } from 'app/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleAsyncThunkError } from 'shared/lib/helpers';
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

export const getAllTasks = createAsyncThunk<Task[], string, { rejectValue: string }>(
    'tasks/getAllTasks',
    async (email, { rejectWithValue }) => {
        try {
            const q = query(
                tasksCollection,
                or(
                    where('isPrivate', '==', false),
                    where('taskPerformer', '==', email),
                    where('author', '==', email),
                ),
            );
            const querySnapshot = await getDocs(q);

            const tasks: Task[] = [];
            querySnapshot.forEach((doc) => {
                tasks.push({ id: doc.id, ...doc.data() } as Task);
            });

            return tasks.sort((a, b) => b.createdAt - a.createdAt);
        } catch (error) {
            return rejectWithValue(handleAsyncThunkError(error));
        }
    },
);

export const createTask = createAsyncThunk<Task, TaskDTO, { rejectValue: string }>(
    'tasks/createTask',
    async (task, { rejectWithValue }) => {
        const { taskPerformer, author } = task;

        if (!taskPerformer) task.taskPerformer = author;

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
    async ({ taskID, status }, { rejectWithValue }) => {
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
    async ({ taskID, subTask }, { rejectWithValue }) => {
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
    async ({ status, taskID, subTaskID }, { rejectWithValue }) => {
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
