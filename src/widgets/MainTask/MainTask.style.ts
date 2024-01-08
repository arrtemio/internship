import { flexColumn, statusColors } from 'styles/style';
import { Status } from 'entities/Task';

export const MainTaskStyle = {
    taskBox: {
        width: '100%',
        ...flexColumn,
    },
    click: {
        fontSize: 'small',
        textAlign: 'center',
    },
    details: {
        gap: '10px',
        ...flexColumn,
    },
    subTasksList: {
        gap: '5px',
        ...flexColumn,
    },
    wrapperShadows: (status: Status) => {
        const color = statusColors[status];

        return {
            boxShadow: `0 2px 1px -1px ${color},0 1px 1px 0 ${color}, 0 1px 3px 0 ${color}`,
        };
    },
};
