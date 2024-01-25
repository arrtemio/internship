import React, { FC, memo } from 'react';
import {
    Box, Card, SelectChangeEvent, Typography,
} from '@mui/material';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { getDateAndTime } from 'shared/lib/helpers';
import { SelectStatus } from 'features/SelectStatus/SelectStatus';
import { Status, Task } from 'entities/Task';
import { useTranslation } from 'react-i18next';
import { LabelValue } from 'shared/ui/LabelValue/LabelValue';
import { TaskCardStyles as styles } from './TaskCards.style';
import { changeTaskStatus } from '../../model/actions/tasksActions';

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
        taskPerformer,
    } = task;

    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation');

    const textDecoration = status === Status.COMPLETED ? 'line-through' : 'none';
    const createdTime = getDateAndTime(createdAt);
    const completeTime = getDateAndTime(completedAt);
    const titleStyle = { ...styles.title, textDecoration };

    const handleChange = (e: SelectChangeEvent) => {
        dispatch(changeTaskStatus({ taskID: id, status: e.target.value as Status }));
    };

    return (
        <Card sx={styles.card} data-testid="TaskCard-card">
            <Box sx={styles.main}>
                <SelectStatus
                    value={status}
                    onChange={handleChange}
                    taskPerformer={taskPerformer}
                />
                <Typography data-testid="TaskCard-title" sx={titleStyle}>
                    {title}
                </Typography>
                <Box sx={styles.date}>
                    <LabelValue label={t('Created')} value={createdTime} />
                    { completedAt && (
                        <LabelValue label={t('Done')} value={completeTime} />
                    ) }
                </Box>
            </Box>
            <Box>
                <LabelValue
                    label={t('Total Sub Tasks')}
                    value={subTasks.length}
                    variant="body1"
                    align="right"
                    testID="TaskCard-total"
                />
            </Box>
        </Card>
    );
});
