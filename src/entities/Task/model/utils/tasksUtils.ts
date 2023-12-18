import { BaseTask, Status, TaskDTO } from '../types/task';

export const changeTaskStatusFn = (task: TaskDTO, status: Status) => {
    task.status = status;

    if (status === Status.COMPLETED) {
        const timeStamp = Date.now();
        task.completedAt = timeStamp;
        task.subTasks.forEach((sub) => {
            sub.status = Status.COMPLETED;
            sub.completedAt = timeStamp;
        });
    } else {
        task.completedAt = null;
    }
};

export const createSubTaskFn = (task: TaskDTO, subTask: BaseTask) => {
    task.subTasks.push(subTask);
    if (task.status === Status.COMPLETED) {
        task.status = Status.IN_PROGRESS;
        task.completedAt = null;
    }
};

export const changeSubTaskStatusFn = (task: TaskDTO, subTask: BaseTask, status: Status) => {
    const timeStamp = Date.now();

    subTask.status = status;
    subTask.completedAt = status === Status.COMPLETED
        ? timeStamp
        : null;

    const areAllSubTasksCompleted = task.subTasks.every((sub) => sub.status === Status.COMPLETED);
    if (areAllSubTasksCompleted) {
        task.status = Status.COMPLETED;
        task.completedAt = timeStamp;
    } else {
        task.status = task.status === Status.COMPLETED ? Status.IN_PROGRESS : task.status;
        task.completedAt = null;
    }
};
