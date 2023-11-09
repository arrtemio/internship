import React, { FC, memo } from 'react';
import {
    Box, Card, SelectChangeEvent, Typography,
} from '@mui/material';
import { StatusEnum, Task } from '../../../entities/Task/model/types/task';
import { useAppDispatch } from '../../lib/hooks/redux';
import { tasksActions } from '../../../entities/Task/model/slice/tasksSlice';
import { getDateAndTime } from '../../lib/helpers/getDateAndTime';
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
                padding: '10px',
                flexDirection: 'column',
            }}
        >
            <Box
                sx={{
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <SelectStatus value={task.status} onChange={handleChange} />
                <Typography width="100%" align="left">
                    {task.title}
                </Typography>
                <Box>
                    <Typography>
                        Created at:
                        {getDateAndTime(task.createdAt)?.date}
                    </Typography>
                    <Typography>
                        Done at:
                        {getDateAndTime(task.completedAt)?.date}
                    </Typography>
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
