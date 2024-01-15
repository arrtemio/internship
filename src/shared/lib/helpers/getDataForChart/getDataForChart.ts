import { Task } from 'entities/Task';

export const getDataForChart = (month: number, year: number, tasks: Task[]) => {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const dates: Date[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
        dates.push(new Date(year, month, i));
    }

    const createdTasksCount: number[] = Array(daysInMonth).fill(0);
    const completedTasksCount: number[] = Array(daysInMonth).fill(0);

    tasks.forEach((task) => {
        const createdAt = new Date(task.createdAt);
        const completedAt = task.completedAt ? new Date(task.completedAt) : null;

        if (createdAt.getMonth() === month && createdAt.getFullYear() === year) {
            createdTasksCount[createdAt.getDate() - 1]++;
        }

        if (completedAt && completedAt.getMonth() === month && completedAt.getFullYear() === year) {
            completedTasksCount[completedAt.getDate() - 1]++;
        }
    });

    return { dates, createdTasksCount, completedTasksCount };
};
