import { flexColumn } from 'styles/style';

export const TaskListStyle = {
    container: {
        mt: '20px',
    },
    box: {
        mt: '20px',
        gap: '10px',
        '& .MuiAccordion-root:hover': {
            boxShadow: '0 0 2px 1px rgba(0,0,0,0.4)',
        },
        ...flexColumn,
    },
};
