import { Status } from 'entities/Task';
import { statusColors } from 'styles/style';

export const styles = {
    column: {
        display: 'flex',
        flexDirection: 'column',
        width: '100%',
        gap: '20px',
        padding: '8px',
    },
    tasks: {
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        gap: '10px',
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
