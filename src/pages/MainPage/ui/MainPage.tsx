import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { AddTask } from '../../../widgets/Addtask/AddTask';
import {
    MainTask, tasksActions, StatusEnum, Task, getTasks,
} from '../../../entities/Task';
import { useAppDispatch, useAppSelector } from '../../../shared/lib/hooks/redux';
import { generateRandomId } from '../../../shared/lib/helpers';

export const MainPage = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(getTasks);

    useEffect(() => {
        dispatch(tasksActions.getAllTasks());
    }, [dispatch]);

    const createTask = (title: string) => {
        const randomID = generateRandomId();

        const task: Task = {
            id: randomID,
            title,
            createdAt: Date.now(),
            status: StatusEnum.TO_DO,
            subTasks: [],
            completedAt: null,
        };
        dispatch(tasksActions.createNewTask(task));
    };

    return (
        <Container
            sx={{ mt: '20px' }}
        >
            <>
                <AddTask action={createTask} />
                <Box sx={{
                    mt: '20px',
                    gap: '10px',
                    display: 'flex',
                    flexDirection: 'column',
                }}
                >
                    {tasks.map((task) => (
                        <MainTask ID={generateRandomId(4)} key={task.id} task={task} />
                    ))}
                </Box>
            </>
        </Container>
    );
};
