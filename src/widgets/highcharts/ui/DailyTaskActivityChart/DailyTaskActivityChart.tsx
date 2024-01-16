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
import { getDataForChart } from 'shared/lib/helpers';
import { useTheme } from 'app/providers/AppThemeProvider';
import { addColorSchemeToHighcharts } from '../../lib/addColorSchemeToHighcharts';
import { DailyTaskActivityChartStyle as styles } from './DailyTaskActivityChart.style';

interface Band {
    color: string;
    from: number;
    to: number;
}

export const DailyTaskActivityChart = memo(() => {
    const tasks = useAppSelector(getTasksData);
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const { t } = useTranslation('translation');
    const { theme: { palette: { mode } } } = useTheme();
    const currentDate = new Date(Date.now());

    const [year, setYear] = useState<number>(currentDate.getFullYear());
    const [month, setMonth] = useState<number>(currentDate.getMonth());

    const handleChangeMonth = (event: SelectChangeEvent) => {
        setMonth(Number(event.target.value));
    };

    const handleChangeYear = (event: SelectChangeEvent) => {
        setYear(Number(event.target.value));
    };

    const months = [
        'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
    ];

    const {
        dates, createdTasksCount, completedTasksCount,
    } = useMemo(() => getDataForChart(month, year, tasks), [year, month, tasks]);

    const isWeekend = (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    const options: Highcharts.Options = useMemo(() => addColorSchemeToHighcharts({
        title: {
            text: t('Number of tasks created and completed'),
        },
        xAxis: {
            title: {
                text: t('Day of the month'),
            },
            categories: dates.map((date) => date.getDate().toString()),
            plotBands: dates.reduce((bands: Band[], date, index) => {
                if (isWeekend(date)) {
                    const band = {
                        color: 'rgba(64,238,6,0.34)',
                        from: index - 0.5,
                        to: index + 0.5,
                    };
                    bands.push(band);
                }
                return bands;
            }, []),
        },
        yAxis: {
            title: {
                text: t('Number of tasks'),
            },
        },
        series: [{
            type: 'line',
            name: t('Created tasks'),
            data: createdTasksCount,
        }, {
            type: 'line',
            name: t('Completed tasks'),
            data: completedTasksCount,
        }],
        credits: {
            enabled: false,
        },
    }, mode), [completedTasksCount, createdTasksCount, dates, t, mode]);

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
                        <MenuItem value={2023}>2023</MenuItem>
                        <MenuItem value={2024}>2024</MenuItem>
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
