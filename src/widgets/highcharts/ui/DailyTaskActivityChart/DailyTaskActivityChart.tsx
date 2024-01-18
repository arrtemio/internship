import React, {
    memo, useMemo, useRef, useState,
} from 'react';
import {
    Box, FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { getTasksData } from 'entities/Task';
import {
    getDatesForChart, getTasksCountByMonth, getTasksYears, shortMonthNames as months,
} from 'shared/lib/helpers';
import { useTheme } from 'app/providers/AppThemeProvider';
import { createOptions } from './createOptions';
import { DailyTaskActivityChartStyle as styles } from './DailyTaskActivityChart.style';

export const DailyTaskActivityChart = memo(() => {
    const tasks = useAppSelector(getTasksData);
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const { t } = useTranslation('translation');
    const { theme: { palette: { mode } } } = useTheme();
    const currentDate = new Date(Date.now());
    const years = useMemo(() => getTasksYears(tasks), [tasks]);

    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState<number>(currentDate.getMonth());

    const handleChangeMonth = (event: SelectChangeEvent) => {
        setMonth(Number(event.target.value));
    };

    const handleChangeYear = (event: SelectChangeEvent) => {
        setYear(Number(event.target.value));
    };

    const dates = useMemo(() => getDatesForChart(month, year), [year, month]);

    const {
        createdTasksCount, completedTasksCount,
    } = useMemo(() => getTasksCountByMonth(month, year, tasks), [year, month, tasks]);

    const options: Highcharts.Options = useMemo(
        () => createOptions(t, dates, completedTasksCount, createdTasksCount, mode),
        [completedTasksCount, createdTasksCount, dates, t, mode],
    );

    return (
        <Box sx={styles.wrapper}>
            <Box sx={styles.select}>
                <FormControl>
                    <InputLabel id="select-month">
                        {t('Month')}
                    </InputLabel>
                    <Select
                        labelId="select-month"
                        id="select-month"
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
                    <InputLabel id="select-year">
                        {t('Year')}
                    </InputLabel>
                    <Select
                        labelId="select-year"
                        id="select-year"
                        value={year.toString()}
                        label={t('Year')}
                        onChange={handleChangeYear}
                    >
                        {years.map((y) => (
                            <MenuItem key={y} value={y}>
                                {y}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <HighchartsReact
                highcharts={Highcharts}
                options={options}
                ref={chartComponentRef}
            />
        </Box>
    );
});
