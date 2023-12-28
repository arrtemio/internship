import { flexColumn } from 'styles/style';

export const TaskListStyle = {
    container: {
        mt: '20px',
    },
    message: {
        mt: '30vh',
    },
    box: {
        mt: '20px',
        gap: '10px',
        ...flexColumn,
    },
};
