import { lazy } from 'react';

export const LazyTaskBoard = lazy(() => import('./TaskBoard')
    .then((module) => ({ default: module.TaskBoard })));
