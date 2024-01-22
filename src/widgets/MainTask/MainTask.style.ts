import { statusColors } from 'styles/style';
import { Status } from 'entities/Task';

export const MainTaskStyle = {
    taskBox: {
        width: '100%',
        minWidth: '600px',
        display: 'flex',
        flexDirection: 'column',
    },
    click: {
        fontSize: 'small',
        textAlign: 'center',
    },
    details: {
        gap: '10px',
        display: 'flex',
        flexDirection: 'column',
    },
    subTasksList: {
        gap: '5px',
        display: 'flex',
        flexDirection: 'column',
    },
    wrapperShadows: (status: Status) => {
        const color = statusColors[status];

        return {
            boxShadow: `0 2px 1px -1px ${color},0 1px 1px 0 ${color}, 0 1px 3px 0 ${color}`,
        };
    },
};
