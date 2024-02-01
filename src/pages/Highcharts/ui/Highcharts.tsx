import React, { memo, useEffect } from 'react';
import { Container } from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { subscribeToTasks } from 'entities/Task';
import { getUserData } from 'entities/User';
import { TaskCountByStatusChart, DailyTaskActivityChart } from 'widgets/highcharts';

import { HighchartsStyle as styles } from './Highcharts.style';

export const Highcharts = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation');
    const email = useAppSelector(getUserData)?.email;

    useEffect(() => {
        if (email) {
            const unsubscribe = dispatch(subscribeToTasks(email));

            return () => {
                unsubscribe();
            };
        }

        return () => {};
    }, [dispatch, email]);

    return (
        <Container sx={styles.wrapper} data-testid="Highcharts">
            <Typography align="center" variant="h4">
                {t('Tasks statistics')}
            </Typography>
            <TaskCountByStatusChart />
            <hr />
            <DailyTaskActivityChart />
        </Container>
    );
});
