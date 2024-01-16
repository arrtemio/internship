import React, { memo, useMemo, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { getTasksData, Status } from 'entities/Task';
import { statusColors } from 'styles/style';
import { useTheme } from 'app/providers/AppThemeProvider';
import { addColorSchemeToHighcharts } from '../../lib/addColorSchemeToHighcharts';

export const TaskCountByStatusChart = memo(() => {
    const tasks = useAppSelector(getTasksData);
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const { t } = useTranslation('translation');
    const { theme: { palette: { mode } } } = useTheme();

    const todoLength = useMemo(() => tasks.filter((task) => task.status === Status.TO_DO).length, [tasks]);
    const inProgressLength = useMemo(() => tasks.filter((task) => task.status === Status.IN_PROGRESS).length, [tasks]);
    const completedLength = useMemo(() => tasks.filter((task) => task.status === Status.COMPLETED).length, [tasks]);

    const options: Highcharts.Options = useMemo(() => addColorSchemeToHighcharts({
        chart: {
            type: 'column',
        },
        title: {
            text: t('Current number of tasks'),
        },
        xAxis: {
            categories: [t('Status')],
        },
        yAxis: {
            title: {
                text: t('Number of tasks'),
            },
        },
        series: [{
            type: 'column',
            name: t(Status.TO_DO),
            data: [{ y: todoLength }],
        }, {
            type: 'column',
            name: t(Status.IN_PROGRESS),
            data: [{ y: inProgressLength }],
        }, {
            type: 'column',
            name: t(Status.COMPLETED),
            data: [{ y: completedLength }],
        }],
        colors: [
            statusColors[Status.TO_DO],
            statusColors[Status.IN_PROGRESS],
            statusColors[Status.COMPLETED],
        ],
    }, mode), [completedLength, inProgressLength, todoLength, t, mode]);

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
        />
    );
});
