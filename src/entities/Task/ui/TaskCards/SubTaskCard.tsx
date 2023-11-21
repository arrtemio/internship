import React, { FC, memo } from 'react';
import {
    Box, Card, SelectChangeEvent, Typography,
} from '@mui/material';
import { Status, BaseTask, tasksActions } from 'entities/Task';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { getDateAndTime } from 'shared/lib/helpers';
import { SelectStatus } from 'features/SelectStatus/SelectStatus';
import { statusColors } from 'styles/style';
import { SubTaskCardStyles } from './TaskCards.style';

interface SubTaskCardProps {
    subTask: BaseTask;
    taskID: string;
}

export const SubTaskCard: FC<SubTaskCardProps> = memo(({ subTask, taskID }) => {
    const dispatch = useAppDispatch();
    const { status, title, completedAt } = subTask;

    const completedTime = getDateAndTime(completedAt);
    const textDecoration = status === Status.COMPLETED ? 'line-through' : 'none';
    const cardStyle = { ...SubTaskCardStyles.card, borderColor: `${statusColors[status]}` };
    const titleStyle = { textDecoration, ...SubTaskCardStyles.title };

    const handleChange = (e: SelectChangeEvent) => {
        dispatch(tasksActions.changeSubTaskStatus({
            subTaskID: subTask.id,
            taskID,
            status: e.target.value as Status,
        }));
    };

    return (
        <Card
            variant="outlined"
            sx={cardStyle}
        >
            <SelectStatus value={status} onChange={handleChange} />
            <Typography sx={titleStyle}>
                {title}
            </Typography>
            <Box sx={SubTaskCardStyles.date}>
                { completedAt && (
                    <Typography variant="caption">
                        Done:
                        {completedTime}
                    </Typography>
                ) }
            </Box>
        </Card>
    );
});
