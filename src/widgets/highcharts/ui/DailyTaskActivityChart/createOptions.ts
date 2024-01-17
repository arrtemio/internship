import { PaletteMode } from '@mui/material';
import Highcharts from 'highcharts';
import { isWeekend } from 'shared/lib/helpers';
import { addColorSchemeToHighcharts } from '../../lib/addColorSchemeToHighcharts';

interface Band {
    color: string;
    from: number;
    to: number;
}

export const createOptions = (
    t: (key: string) => string,
    dates: Date[],
    completedTasksCount: number[],
    createdTasksCount: number[],
    mode: PaletteMode,
): Highcharts.Options => addColorSchemeToHighcharts({
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
}, mode);
