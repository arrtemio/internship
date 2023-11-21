import React, { FC, memo } from 'react';
import {
    Box, Card, SelectChangeEvent, Typography,
} from '@mui/material';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { getDateAndTime } from 'shared/lib/helpers';
import { SelectStatus } from 'features/SelectStatus/SelectStatus';
import { Status, Task, tasksActions } from 'entities/Task';
import { TaskCardStyles } from './TaskCards.style';

interface TaskCardProps {
    task: Task;
}

export const TaskCard: FC<TaskCardProps> = memo(({ task }) => {
    const {
        status,
        subTasks,
        id,
        completedAt,
        createdAt,
        title,
    } = task;

    const dispatch = useAppDispatch();

    const textDecoration = status === Status.COMPLETED ? 'line-through' : 'none';
    const createdTime = getDateAndTime(createdAt);
    const completeTime = getDateAndTime(completedAt);
    const titleStyle = { ...TaskCardStyles.title, textDecoration };

    const handleChange = (e: SelectChangeEvent) => {
        dispatch(tasksActions.changeTaskStatus({ taskID: id, status: e.target.value as Status }));
    };

    return (
        <Card sx={TaskCardStyles.card}>
            <Box sx={TaskCardStyles.main}>
                <SelectStatus value={status} onChange={handleChange} />
                <Typography sx={titleStyle}>
                    {title}
                </Typography>
                <Box sx={TaskCardStyles.date}>
                    <Typography variant="caption">
                        Created:
                        {createdTime}
                    </Typography>
                    { completedAt && (
                        <Typography variant="caption">
                            Done:
                            {completeTime}
                        </Typography>
                    ) }
                </Box>
            </Box>
            <Box>
                <Typography align="right">
                    Total Sub Tasks:
                    {subTasks.length}
                </Typography>
            </Box>
        </Card>
    );
});