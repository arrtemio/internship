import Highcharts from 'highcharts';
import { PaletteMode } from '@mui/material';
import { ThemeName } from 'app/providers/AppThemeProvider';

export const addColorSchemeToHighcharts = (options: Highcharts.Options, mode: PaletteMode): Highcharts.Options => {
    options.legend = {
        ...options.legend,
        itemStyle: {
            color: `${mode === ThemeName.DARK ? 'rgb(143,143,143)' : 'rgb(51, 51, 51)'}`,
        },
        itemHoverStyle: {
            color: `${mode === ThemeName.DARK ? 'rgb(182,182,182)' : 'rgb(0,0,0)'}`,
        },
    };
    options.chart = {
        ...options.chart,
        backgroundColor: '',
    };
    options.title = {
        ...options.title,
        style: {
            color: `${mode === ThemeName.DARK ? 'rgb(143,143,143)' : 'rgb(51, 51, 51)'}`,
        },
    };
    options.xAxis = {
        ...options.xAxis,
        labels: {
            style: {
                color: `${mode === ThemeName.DARK ? 'rgb(143,143,143)' : 'rgb(51, 51, 51)'}`,
            },
        },
    };
    options.yAxis = {
        ...options.yAxis,
        labels: {
            style: {
                color: `${mode === ThemeName.DARK ? 'rgb(143,143,143)' : 'rgb(51, 51, 51)'}`,
            },
        },
    };
    options.plotOptions = {
        ...options.plotOptions,
        series: {
            cursor: 'pointer',
        },
    };
    options.credits = {
        enabled: false,
    };
    options.accessibility = {
        enabled: false,
    };

    return options;
};
