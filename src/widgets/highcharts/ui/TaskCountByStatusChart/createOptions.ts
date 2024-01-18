import { PaletteMode } from '@mui/material';
import Highcharts from 'highcharts';
import { Status } from 'entities/Task';
import { statusColors } from 'styles/style';
import { addColorSchemeToHighcharts } from '../../lib/addColorSchemeToHighcharts';

export const createOptions = (
    t: (key: string) => string,
    todoLength: number,
    inProgressLength: number,
    completedLength: number,
    mode: PaletteMode,
): Highcharts.Options => addColorSchemeToHighcharts({
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
}, mode);
