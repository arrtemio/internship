import React, { useEffect } from 'react';
import { Box, Container } from '@mui/material';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { MainTask } from 'widgets/MainTask/MainTask';
import { getAllTasks, getTasksData } from 'entities/Task';
import { getUserIsAuth, checkIsAuth, getUserData } from 'entities/User';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { AddMainTask } from 'widgets/AddMainTask/AddMainTask';
import { TaskListStyle as styles } from './TaskList.style';

export const TaskList = () => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation');
    const tasks = useAppSelector(getTasksData);
    const isAuth = useAppSelector(getUserIsAuth);
    const email = useAppSelector(getUserData)?.email;

    useEffect(() => {
        dispatch(checkIsAuth());

        if (isAuth && email) {
            dispatch(getAllTasks(email));
        }
    }, [dispatch, isAuth, email]);

    return isAuth ? (
        <Container sx={styles.container}>
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
