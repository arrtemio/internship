import React, {
    FC, memo, useMemo, useRef,
} from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { getTasksData } from 'entities/Task';
import { getDataForChart } from 'shared/lib/helpers';
import { useTheme } from 'app/providers/AppThemeProvider';
import { addColorSchemeToHighcharts } from '../lib/addColorSchemeToHighcharts';

interface ChartTwoProps {
    selectedYear: number,
    selectedMonth: number,
}

interface Band {
    color: string;
    from: number;
    to: number;
}

export const DailyTaskActivityChart: FC<ChartTwoProps> = memo(({ selectedMonth, selectedYear }) => {
    const tasks = useAppSelector(getTasksData);
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const { t } = useTranslation('translation');
    const { theme: { palette: { mode } } } = useTheme();

    const {
        dates, createdTasksCount, completedTasksCount,
    } = useMemo(() => getDataForChart(selectedMonth, selectedYear, tasks), [selectedYear, selectedMonth, tasks]);

    const isWeekend = (date: Date) => {
        const day = date.getDay();
        return day === 0 || day === 6;
    };

    const options: Highcharts.Options = useMemo(() => addColorSchemeToHighcharts({
        chart: {
            backgroundColor: '',
        },
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
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
        />
    );
});
