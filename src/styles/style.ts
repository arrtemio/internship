import { Status } from 'entities/Task';

export const flexColumn = {
    display: 'flex',
    flexDirection: 'column',
};

export const flexBetween = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
};

export const cardStyle = {
    width: '100%',
    padding: '10px',
    ...flexBetween,
};

export const statusColors = {
    [Status.COMPLETED]: '#2e7d32',
    [Status.IN_PROGRESS]: '#9c27b0',
    [Status.TO_DO]: '#1976d2',
};
