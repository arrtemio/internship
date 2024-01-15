import React, { memo, useEffect, useState } from 'react';
import {
    Box, Container, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import Typography from '@mui/material/Typography';
import { useTranslation } from 'react-i18next';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { getAllTasks } from 'entities/Task';
import { getUserData } from 'entities/User';
import { TaskCountByStatusChart, DailyTaskActivityChart } from 'widgets/highcharts';

import { HighchartsStyle as styles } from './Highcharts.style';

export const Highcharts = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation');
    const email = useAppSelector(getUserData)?.email;

    const currentDate = new Date(Date.now());
    const [month, setMonth] = useState<number>(currentDate.getMonth());
    const [year, setYear] = useState<number>(currentDate.getFullYear());

    const handleChangeMonth = (event: SelectChangeEvent) => {
        setMonth(Number(event.target.value));
    };

    const handleChangeYear = (event: SelectChangeEvent) => {
        setYear(Number(event.target.value));
    };

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    useEffect(() => {
        if (email) {
            dispatch(getAllTasks(email));
        }
    }, [dispatch, email]);

    return (
        <Container sx={styles.wrapper} data-testid="Highcharts">
            <Typography align="center" variant="h4">
                {t('Tasks statistics')}
            </Typography>
            <TaskCountByStatusChart />
            <hr />
            <Box sx={styles.sec_chart}>
                <Box sx={styles.select}>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">
                            {t('Month')}
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={month.toString()}
                            label={t('Month')}
                            onChange={handleChangeMonth}
                        >
                            {months.map((mon, index) => (
                                <MenuItem key={mon} value={index}>
                                    {t(mon)}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <InputLabel id="demo-simple-select-label">
                            {t('Year')}
                        </InputLabel>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={year.toString()}
                            label={t('Year')}
                            onChange={handleChangeYear}
                        >
                            <MenuItem value={2023}>2023</MenuItem>
                            <MenuItem value={2024}>2024</MenuItem>
                        </Select>
                    </FormControl>
                </Box>
                <DailyTaskActivityChart selectedYear={year} selectedMonth={month} />
            </Box>
        </Container>
    );
});
