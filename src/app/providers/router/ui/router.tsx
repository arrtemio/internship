import { ReactNode } from 'react';
import { TaskBoard } from 'pages/TaskBoard';
import { Highcharts } from 'pages/Highcharts';
import { Error404 } from 'pages/Error404';
import { Unauthorized } from 'pages/Unauthorized';

interface IRoute {
    path: string;
    element: ReactNode
}

export const authRoutes: IRoute[] = [
    { path: '/', element: <TaskBoard /> },
    { path: '/statistics', element: <Highcharts /> },
    { path: '*', element: <Error404 /> },
];

export const unAuthRoutes: IRoute[] = [
    { path: '/', element: <Unauthorized /> },
    { path: '/statistics', element: <Unauthorized /> },
    { path: '*', element: <Error404 /> },
];
