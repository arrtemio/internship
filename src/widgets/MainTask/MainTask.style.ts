import { flexColumn } from 'styles/style';

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
};
