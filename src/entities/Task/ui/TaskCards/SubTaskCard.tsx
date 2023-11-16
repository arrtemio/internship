import React, { FC, memo } from 'react';
import {
    Box, Card, SelectChangeEvent, Typography,
} from '@mui/material';
import { Status, BaseTask, tasksActions } from 'entities/Task';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { getDateAndTime } from 'shared/lib/helpers';
import { SelectStatus } from 'features/SelectStatus/SelectStatus';
import { cardStyle } from 'styles/style';

interface SubTaskCardProps {
    subTask: BaseTask;
    taskID: string;
}

export const SubTaskCard: FC<SubTaskCardProps> = memo(({ subTask, taskID }) => {
    const dispatch = useAppDispatch();
    const { status, title, completedAt } = subTask;

    const handleChange = (e: SelectChangeEvent) => {
        dispatch(tasksActions.changeSubTaskStatus({
            subTask: { ...subTask, status: e.target.value as Status },
            taskID,
        }));
    };

    return (
        <Card
            variant="outlined"
            sx={cardStyle}
        >
            <SelectStatus value={status} onChange={handleChange} />
            <Typography width="100%" align="left">
                {title}
            </Typography>
            <Box>
                { completedAt && (
                    <Typography variant="caption">
                        Done:
                        {getDateAndTime(completedAt)}
                    </Typography>
                ) }
            </Box>
        </Card>
    );
});
