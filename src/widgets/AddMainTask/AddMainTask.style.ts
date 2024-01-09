import { flexColumn } from 'styles/style';

export const AddMainTaskStyle = {
    taskBox: {
        display: 'flex',
        gap: '20px',
    },
    wrapper: {
        ...flexColumn,
        gap: '10px',
    },
    inputs: {
        display: 'flex',
        alignItems: 'center',
        gap: '20px',
    },
    top_inputs: {
        display: 'flex',
        gap: '15px',
    },
    button: {
        height: '56px',
    },
};
