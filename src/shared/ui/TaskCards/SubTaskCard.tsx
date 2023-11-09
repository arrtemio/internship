import React, { FC, memo } from 'react';
import {
    Box, Card, SelectChangeEvent, Typography,
} from '@mui/material';
import { StatusEnum, SubTask } from '../../../entities/Task/model/types/task';
import { useAppDispatch } from '../../lib/hooks/redux';
import { tasksActions } from '../../../entities/Task/model/slice/tasksSlice';
import { getDateAndTime } from '../../lib/helpers/getDateAndTime';
import { SelectStatus } from '../SelectStatus/SelectStatus';

interface SubTaskCardProps {
    task: SubTask;
}

export const SubTaskCard: FC<SubTaskCardProps> = memo(({ task }) => {
    const dispatch = useAppDispatch();

    const handleChange = (e: SelectChangeEvent) => {
        dispatch(tasksActions.changeSubTaskStatus({ ...task, status: e.target.value as StatusEnum }));
    };

    return (
        <Card
            variant="outlined"
            sx={{
                width: '100%',
                display: 'flex',
                padding: '10px',
                alignItems: 'center',
                justifyContent: 'space-between',
            }}
        >
            <SelectStatus value={task.status} onChange={handleChange} />
            <Typography width="100%" align="left">
                {task.title}
            </Typography>
            <Box>
                <Typography>{getDateAndTime(task.completedAt)?.date}</Typography>
            </Box>
        </Card>
    );
});
