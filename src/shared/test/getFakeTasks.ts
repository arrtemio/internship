import { Status, Task } from 'entities/Task';

export const getFakeTasks = (count: number) => {
    if (count < 1) return [];

    function getRandomStatus() {
        const statuses = [Status.TO_DO, Status.IN_PROGRESS, Status.COMPLETED];
        const randomIndex = Math.floor(Math.random() * statuses.length);
        return statuses[randomIndex];
    }

    function getRandomDateInRange(start: Date, end: Date) {
        return new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()));
    }

    const tasks: Task[] = [];

    for (let i = 0; i < count; i++) {
        const createdAt = getRandomDateInRange(new Date(2023, 11, 1), new Date(2024, 0, 31));
        const completedAt = getRandomStatus() === Status.COMPLETED ? getRandomDateInRange(createdAt, new Date(2024, 0, 31)) : null;

        const task: Task = {
            id: `Asdager${i + 1}`,
            status: getRandomStatus(),
            completedAt: completedAt ? completedAt.getTime() : null,
            title: `test task ${i + 1}`,
            createdAt: createdAt.getTime(),
            taskPerformer: '',
            author: '',
            isPrivate: false,
            isImportant: false,
            subTasks: [],
        };

        tasks.push(task);
    }

    return tasks;
};
