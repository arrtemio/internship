import { ReactNode } from 'react';
import { TaskList } from 'pages/TaskList';
import { Highcharts } from 'pages/Highcharts';
import { Error404 } from 'pages/Error404';
import { Unauthorized } from 'pages/Unauthorized';

interface IRoute {
    path: string;
    element: ReactNode
}

export const authRoutes: IRoute[] = [
    { path: '/', element: <TaskList /> },
    { path: '/statistics', element: <Highcharts /> },
    { path: '*', element: <Error404 /> },
];

export const unAuthRoutes: IRoute[] = [
    { path: '/', element: <Unauthorized /> },
    { path: '/statistics', element: <Unauthorized /> },
    { path: '*', element: <Error404 /> },
];
