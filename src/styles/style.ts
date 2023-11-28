import { Status } from 'entities/Task';

export const flexColumn = {
    display: 'flex',
    flexDirection: 'column',
};

export const statusColors = {
    [Status.COMPLETED]: '#2e7d32',
    [Status.IN_PROGRESS]: '#9c27b0',
    [Status.TO_DO]: '#1976d2',
};

type ColorsVariantType = {
    'Completed': 'success',
    'In progress': 'secondary',
    'To do': 'primary',
};

export const colorsVariant: ColorsVariantType = {
    [Status.COMPLETED]: 'success',
    [Status.IN_PROGRESS]: 'secondary',
    [Status.TO_DO]: 'primary',
};
