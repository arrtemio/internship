import {
    addDoc,
    collection,
    doc,
    getDoc,
    getDocs,
    updateDoc,
} from 'firebase/firestore';
import { firestore } from 'app/firebase';
import { createAsyncThunk } from '@reduxjs/toolkit';
import { changeSubTaskStatusFn, changeTaskStatusFn, createSubTaskFn } from '../utils/tasksUtils';
import {
    BaseTask,
    Status,
    Task,
    TaskDTO,
} from '../types/task';

const tasksCollection = collection(firestore, 'tasks');

export const getTaskByID = async (taskID: string) => {
    const taskRef = doc(tasksCollection, taskID);
    const taskSnapshot = await getDoc(taskRef);
    const taskData = taskSnapshot.data();

    if (!taskData) throw new Error('task didnt find');

    return { taskRef, taskData };
};

export const getAllTasks = createAsyncThunk(
    'tasks/getAllTasks',
    async () => {
        const querySnapshot = await getDocs(tasksCollection);
        const tasks: Task[] = [];
        querySnapshot.forEach((doc) => {
            tasks.push({ id: doc.id, ...doc.data() } as Task);
        });

        return tasks;
    },
);

export const createTask = createAsyncThunk(
    'tasks/createTask',
    async (task: TaskDTO) => {
        const taskRef = await addDoc(tasksCollection, task);
        const newTask: Task = { id: taskRef.id, ...task };

        return newTask;
    },
);

export const changeTaskStatus = createAsyncThunk(
    'tasks/changeTaskStatus',
    async ({ taskID, status }: { taskID: string, status: Status }) => {
        const { taskData, taskRef } = await getTaskByID(taskID);
        changeTaskStatusFn(taskData as Task, status);
        await updateDoc(taskRef, { ...taskData });

        return { taskID, status };
    },
);

export const createSubTask = createAsyncThunk(
    'tasks/createSubTask',
    async ({ subTask, taskID }: { subTask: BaseTask, taskID: string }) => {
        const { taskData, taskRef } = await getTaskByID(taskID);
        createSubTaskFn(taskData as Task, subTask);

        await updateDoc(taskRef, { ...taskData });

        return { subTask, taskID };
    },
);

interface ChangeSubTaskStatus {
    status: Status;
    taskID: string;
    subTaskID: string;
}

export const changeSubTaskStatus = createAsyncThunk(
    'tasks/changeSubTaskStatus',
    async ({ status, taskID, subTaskID }: ChangeSubTaskStatus) => {
        const { taskData, taskRef } = await getTaskByID(taskID);
        const currentSubTask = taskData.subTasks.find((sub: BaseTask) => sub.id === subTaskID);

        changeSubTaskStatusFn(taskData as Task, currentSubTask, status);

        await updateDoc(taskRef, { ...taskData });

        return { status, taskID, subTaskID };
    },
);
