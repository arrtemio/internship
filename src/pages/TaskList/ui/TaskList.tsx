import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { AddTask } from 'features/Addtask/AddTask';
import {
    tasksActions, Status, Task, getTasks,
} from 'entities/Task';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { generateRandomId } from 'shared/lib/helpers';
import { MainTask } from 'widgets/MainTask/MainTask';
import { TaskListStyle } from './TaskList.style';

export const TaskList = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(getTasks);

    useEffect(() => {
        dispatch(tasksActions.getAllTasks());
    }, [dispatch]);

    const createTask = (title: string) => {
        const task: Task = {
            id: generateRandomId(),
            title,
            createdAt: Date.now(),
            status: Status.TO_DO,
            subTasks: [],
            completedAt: null,
        };
        dispatch(tasksActions.createNewTask(task));
    };

    return (
        <Container sx={TaskListStyle.container}>
            <>
                <AddTask action={createTask} />
                <Box sx={TaskListStyle.box}>
                    {tasks.map((task) => (
                        <MainTask
                            ID={task.id}
                            key={task.id}
                            task={task}
                        />
                    ))}
                </Box>
            </>
        </Container>
    );
};
