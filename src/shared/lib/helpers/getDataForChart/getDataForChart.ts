import { Status, Task } from 'entities/Task';

const getDaysInMonth = (month: number, year: number) => new Date(year, month + 1, 0).getDate();

export const shortMonthNames = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

export const isWeekend = (date: Date) => {
    const day = date.getDay();
    return day === 0 || day === 6;
};

export const getDatesForChart = (month: number, year: number) => {
    const daysInMonth = getDaysInMonth(month, year);
    const dates: Date[] = [];

    for (let i = 1; i <= daysInMonth; i++) {
        dates.push(new Date(year, month, i));
    }

    return dates;
};

export const getTasksCountByMonth = (month: number, year: number, tasks: Task[]) => {
    const daysInMonth = getDaysInMonth(month, year);

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

    return { createdTasksCount, completedTasksCount };
};

export const getTasksCountByStatus = (tasks: Task[], status: Status): number => (
    tasks.filter((task) => task.status === status).length
);

export const getTasksYears = (tasks: Task[]): number[] => {
    const currentYear = new Date(Date.now()).getFullYear();

    if (!tasks.length) return [currentYear];

    const firstYear = tasks.reduce((min, task) => {
        const taskYear = new Date(task.createdAt).getFullYear();
        return taskYear < min ? taskYear : min;
    }, currentYear);

    return Array.from({ length: currentYear - firstYear + 1 }, (_, i) => i + firstYear);
};
