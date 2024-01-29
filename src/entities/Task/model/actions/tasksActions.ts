import {
    addDoc, collection, doc, getDoc, onSnapshot, or, query, updateDoc, where,
} from 'firebase/firestore';
import { firestore } from 'app/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { handleAsyncThunkError } from 'shared/lib/helpers';
import { AppDispatch } from 'app/store';
import { changeSubTaskStatusFn, changeTaskStatusFn, createSubTaskFn } from '../utils/tasksUtils';
import {
    BaseTask, ChangeSubTaskStatus, ChangeTaskStatus, CreateSubTask, Task, TaskDTO,
} from '../types/task';
import { tasksActions } from '../slice/tasksSlice';

const tasksCollection = collection(firestore, 'tasks');

const getTaskByID = async (taskID: string) => {
    const taskRef = doc(tasksCollection, taskID);
    const taskSnapshot = await getDoc(taskRef);
    const taskData = taskSnapshot.data() as TaskDTO;

    if (!taskData) throw new Error('Task not found');

    return { taskRef, taskData };
};

export const subscribeToTasks = (email: string) => (dispatch: AppDispatch) => {
    const q = query(
        tasksCollection,
        or(
            where('isPrivate', '==', false),
            where('taskPerformer', '==', email),
            where('author', '==', email),
        ),
    );

    return onSnapshot(
        q,
        (snapshot) => {
            const tasks: Task[] = [];
            snapshot.forEach((doc) => {
                tasks.push({ id: doc.id, ...doc.data() } as Task);
            });

            dispatch(tasksActions.setTasks(tasks.sort((a, b) => b.createdAt - a.createdAt)));
        },
        (error) => {
            dispatch(tasksActions.setError(handleAsyncThunkError(error)));
        },
    );
};

export const createTask = createAsyncThunk<null, TaskDTO, { rejectValue: string }>(
    'tasks/createTask',
    async (task, { rejectWithValue }) => {
        const { taskPerformer, author } = task;

        if (!taskPerformer) task.taskPerformer = author;

        try {
            await addDoc(tasksCollection, task);

            return null;
        } catch (error) {
            return rejectWithValue(handleAsyncThunkError(error));
        }
    },
);

export const changeTaskStatus = createAsyncThunk<null, ChangeTaskStatus, { rejectValue: string }>(
    'tasks/changeTaskStatus',
    async ({ taskID, status }, { rejectWithValue }) => {
        try {
            const { taskData, taskRef } = await getTaskByID(taskID);
            changeTaskStatusFn(taskData, status);

            await updateDoc(taskRef, { ...taskData });

            return null;
        } catch (error) {
            return rejectWithValue(handleAsyncThunkError(error));
        }
    },
);

export const createSubTask = createAsyncThunk<null, CreateSubTask, { rejectValue: string }>(
    'tasks/createSubTask',
    async ({ taskID, subTask }, { rejectWithValue }) => {
        try {
            const { taskData, taskRef } = await getTaskByID(taskID);
            createSubTaskFn(taskData, subTask);

            await updateDoc(taskRef, { ...taskData });

            return null;
        } catch (error) {
            return rejectWithValue(handleAsyncThunkError(error));
        }
    },
);

export const changeSubTaskStatus = createAsyncThunk<null, ChangeSubTaskStatus, { rejectValue: string }>(
    'tasks/changeSubTaskStatus',
    async ({ status, taskID, subTaskID }, { rejectWithValue }) => {
        try {
            const { taskData, taskRef } = await getTaskByID(taskID);
            const currentSubTask = taskData.subTasks.find((sub: BaseTask) => sub.id === subTaskID);

            if (!currentSubTask) throw new Error('Sub task not found');

            changeSubTaskStatusFn(taskData, currentSubTask, status);

            await updateDoc(taskRef, { ...taskData });

            return null;
        } catch (error) {
            return rejectWithValue(handleAsyncThunkError(error));
        }
    },
);
