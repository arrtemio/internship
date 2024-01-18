import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { MainTask } from 'widgets/MainTask/MainTask';
import { getAllTasks, getTasksData } from 'entities/Task';
import { getUserData } from 'entities/User';
import { AddMainTask } from 'widgets/AddMainTask/AddMainTask';

import { TaskListStyle as styles } from './TaskList.style';

export const TaskList = () => {
    const dispatch = useAppDispatch();
    const tasks = useAppSelector(getTasksData);
    const email = useAppSelector(getUserData)?.email;

    useEffect(() => {
        if (email) {
            dispatch(getAllTasks(email));
        }
    }, [dispatch, email]);

    return (
        <Container sx={styles.container} data-testid="TaskList">
            <AddMainTask />
            <Box sx={styles.box}>
                {tasks.map((task) => (
                    <MainTask
                        key={task.id}
                        task={task}
                    />
                ))}
            </Box>
        </Container>
    );
};
