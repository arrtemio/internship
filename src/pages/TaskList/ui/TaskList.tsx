import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { AddTask } from 'features/Addtask/AddTask';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { MainTask } from 'widgets/MainTask/MainTask';
import {
    createTask, getAllTasks, createTaskDto, getTasksData, getTasksLoading, getTasksError,
} from 'entities/Task';
import { Loader } from 'shared/ui/Loader/Loader';
import { ErrorMessage } from 'shared/ui/ErrorMessage/ErrorMessage';
import { TaskListStyle as styles } from './TaskList.style';

export const TaskList = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(getTasksData);
    const isLoading = useAppSelector(getTasksLoading);
    const error = useAppSelector(getTasksError);

    useEffect(() => {
        dispatch(getAllTasks());
    }, [dispatch]);

    const createNewTask = (title: string) => {
        const task = createTaskDto(title);
        dispatch(createTask(task));
    };

    return (
        <Container sx={styles.container}>
            <>
                {error && <ErrorMessage error={error} />}
                <Loader isLoading={isLoading} />
                <AddTask action={createNewTask} />
                <Box sx={styles.box}>
                    {tasks.map((task) => (
                        <MainTask
                            key={task.id}
                            task={task}
                        />
                    ))}
                </Box>
            </>
        </Container>
    );
};
