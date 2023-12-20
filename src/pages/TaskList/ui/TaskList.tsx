import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { AddTask } from 'features/Addtask/AddTask';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { MainTask } from 'widgets/MainTask/MainTask';
import {
    createTask, getAllTasks, createTaskDto, getTasksData,
} from 'entities/Task';
import { getUserIsAuth, checkIsAuth } from 'entities/User';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { TaskListStyle as styles } from './TaskList.style';

export const TaskList = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation');
    const tasks = useAppSelector(getTasksData);
    const isAuth = useAppSelector(getUserIsAuth);

    useEffect(() => {
        dispatch(checkIsAuth());

        if (isAuth) {
            dispatch(getAllTasks());
        }
    }, [dispatch, isAuth]);

    const createNewTask = (title: string) => {
        const task = createTaskDto(title);
        dispatch(createTask(task));
    };

    return isAuth ? (
        <Container sx={styles.container}>
            <AddTask action={createNewTask} />
            <Box sx={styles.box}>
                {tasks.map((task) => (
                    <MainTask
                        key={task.id}
                        task={task}
                    />
                ))}
            </Box>
        </Container>
    )
        : (
            <Container sx={styles.message}>
                <Typography
                    data-testid="TaskList-unauthorized"
                    textAlign="center"
                    variant="h4"
                >
                    {t('You must be logged in to use the application!')}
                </Typography>
            </Container>
        );
};
