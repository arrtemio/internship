import { Status } from 'entities/Task';

export const returnStatusColor = (value: Status) => {
    let color: 'success' | 'primary' | 'secondary';

    switch (value) {
    case Status.IN_PROGRESS:
        color = 'secondary';
        break;
    case Status.COMPLETED:
        color = 'success';
        break;
    default:
        color = 'primary';
    }

    return color;
};
