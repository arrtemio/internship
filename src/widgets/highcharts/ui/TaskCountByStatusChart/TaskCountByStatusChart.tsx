import React, { memo, useMemo, useRef } from 'react';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { getTasksCountByStatus } from 'shared/lib/helpers';
import { getTasksData, Status } from 'entities/Task';
import { useTheme } from 'app/providers/AppThemeProvider';
import { createOptions } from './createOptions';

export const TaskCountByStatusChart = memo(() => {
    const tasks = useAppSelector(getTasksData);
    const chartComponentRef = useRef<HighchartsReact.RefObject>(null);
    const { t } = useTranslation('translation');
    const { theme: { palette: { mode } } } = useTheme();

    const todoLength = useMemo(() => getTasksCountByStatus(tasks, Status.TO_DO), [tasks]);
    const inProgressLength = useMemo(() => getTasksCountByStatus(tasks, Status.IN_PROGRESS), [tasks]);
    const completedLength = useMemo(() => getTasksCountByStatus(tasks, Status.COMPLETED), [tasks]);

    const options: Highcharts.Options = useMemo(
        () => createOptions(t, todoLength, inProgressLength, completedLength, mode),
        [completedLength, inProgressLength, todoLength, t, mode],
    );

    return (
        <HighchartsReact
            highcharts={Highcharts}
            options={options}
            ref={chartComponentRef}
        />
    );
});
