import React, { FC, memo, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Box, Typography } from '@mui/material';
import { Status, Task } from 'entities/Task';
import { getTasksByStatus } from 'shared/lib/helpers';
import { statusColors } from 'styles/style';
import { BoardCard } from './BoardCard';
import { StrictModeDroppable } from './StrictModeDroppable';
import { styles } from './styles';

interface BoardCellProps {
    tasks: Task[],
    status: Status,
    isDraggable: boolean,
}

export const BoardColumn: FC<BoardCellProps> = memo(({ tasks, status, isDraggable }) => {
    const { t } = useTranslation('translation');
    const cellTasks = useMemo(() => getTasksByStatus(tasks, status), [tasks, status]);

    return (
        <Box sx={styles.column} data-testid={`BoardColumn-${status}`}>
            <Typography variant="h6" align="center" color={statusColors[status]}>
                {t(status)}
            </Typography>
            <StrictModeDroppable droppableId={status}>
                {(provided, snapshot) => (
                    <Box
                        sx={styles.tasksWrapper(isDraggable, snapshot.isDraggingOver)}
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {cellTasks.map((task, index) => (
                            <BoardCard key={task.id} index={index} task={task} />
                        ))}
                        {provided.placeholder}
                    </Box>
                )}
            </StrictModeDroppable>
        </Box>
    );
});
