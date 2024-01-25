import { Status } from 'entities/Task';
import { statusColors } from 'styles/style';

const tasksWrapperStyle = {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    gap: '10px',
    padding: '5px',
};

const tasksDragging = {
    ...tasksWrapperStyle,
    backgroundColor: 'rgba(101,155,248,0.5)',
    boxShadow: '',
};

const tasksDraggingAboveWrapper = {
    ...tasksWrapperStyle,
    backgroundColor: 'rgba(26,150,26,0.5)',
    boxShadow: '0 0 0 3px rgba(26,150,26,1)',
};

export const styles = {
    column: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '20px',
    },
    date: {
        whiteSpace: 'nowrap',
        textAlign: 'right',
        display: 'flex',
        flexDirection: 'column',
    },
    more: {
        fontSize: 'small',
        variant: 'text',
    },
    wrapperDragShadow: {
        boxShadow: '1px 1px 9px 0 rgba(222, 206, 142, 1)',
    },
    empty: {
        visibility: 'hidden',
    },
    tasksWrapper: (isDragging: boolean, isDraggingOver: boolean) => (
        (isDragging && isDraggingOver)
            ? tasksDraggingAboveWrapper
            : (isDragging && !isDraggingOver)
                ? tasksDragging
                : tasksWrapperStyle
    ),
    board_card: (isDisabled: boolean) => ({
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        padding: '10px',
        gap: '10px',
        cursor: isDisabled ? 'not-allowed' : 'grab',
    }),
    title: (status: Status) => ({
        fontSize: 'large',
        textDecoration: status === Status.COMPLETED ? 'line-through' : 'none',
        mb: '10px',
        whiteSpace: 'nowrap',
        overflow: 'hidden',
        textOverflow: 'ellipsis',
        maxWidth: '340px',
    }),
    wrapperShadows: (status: Status) => {
        const color = statusColors[status];

        return {
            boxShadow: `0 2px 1px -1px ${color},0 1px 1px 0 ${color}, 0 1px 3px 0 ${color}`,
        };
    },
};
