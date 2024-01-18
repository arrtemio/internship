import { lazy } from 'react';

export const LazyHighcharts = lazy(() => import('./Highcharts')
    .then((module) => ({ default: module.Highcharts })));
