import { lazy } from 'react';

export const LazyTasksList = lazy(() => import('./TaskList')
    .then((module) => ({ default: module.TaskList })));
