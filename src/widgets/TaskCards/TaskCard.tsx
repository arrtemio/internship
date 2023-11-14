import React, { FC, memo } from 'react';
import {
    Box, Card, SelectChangeEvent, Typography,
} from '@mui/material';
import { StatusEnum, Task, tasksActions } from '../../entities/Task';
import { useAppDispatch } from '../../shared/lib/hooks/redux';
import { getDateAndTime } from '../../shared/lib/helpers';
import { SelectStatus } from '../SelectStatus/SelectStatus';

interface TaskCardProps {
    task: Task;
}

export const TaskCard: FC<TaskCardProps> = memo(({ task }) => {
    const dispatch = useAppDispatch();

    const handleChange = (e: SelectChangeEvent) => {
        dispatch(tasksActions.changeTaskStatus({ ...task, status: e.target.value as StatusEnum }));
    };

    return (
        <Card
            sx={{
                width: '100%',
                display: 'flex',
                flexDirection: 'column',
                boxShadow: 'none',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '5px',
                }}
            >
                <SelectStatus value={task.status} onChange={handleChange} />
                <Typography sx={{ fontSize: 'large' }} width="100%" align="left">
                    {task.title}
                </Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                    <Typography variant="caption">
                        Created:
                        {getDateAndTime(task.createdAt)?.date}
                    </Typography>
                    { task.completedAt && (
                        <Typography variant="caption">
                            Done:
                            {getDateAndTime(task.completedAt)?.date}
                        </Typography>
                    ) }
                </Box>
            </Box>
            <Box>
                <Typography align="right">
                    Total Sub Tasks:
                    {task.subTasks.length}
                </Typography>
            </Box>
        </Card>
    );
});
