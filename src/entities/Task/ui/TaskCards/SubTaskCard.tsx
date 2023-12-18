import React, { FC, memo } from 'react';
import {
    Box, Card, SelectChangeEvent, Typography,
} from '@mui/material';
import { Status, BaseTask } from 'entities/Task';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { getDateAndTime } from 'shared/lib/helpers';
import { SelectStatus } from 'features/SelectStatus/SelectStatus';
import { statusColors } from 'styles/style';
import { useTranslation } from 'react-i18next';
import { SubTaskCardStyles as styles } from './TaskCards.style';
import { changeSubTaskStatus } from '../../model/actions/tasksActions';

interface SubTaskCardProps {
    subTask: BaseTask;
    taskID: string;
}

export const SubTaskCard: FC<SubTaskCardProps> = memo(({ subTask, taskID }) => {
    const dispatch = useAppDispatch();
    const { status, title, completedAt } = subTask;
    const { t } = useTranslation('translation');

    const completedTime = getDateAndTime(completedAt);
    const textDecoration = status === Status.COMPLETED ? 'line-through' : 'none';
    const cardStyle = { ...styles.card, borderColor: `${statusColors[status]}` };
    const titleStyle = { textDecoration, ...styles.title };

    const handleChange = (e: SelectChangeEvent) => {
        dispatch(changeSubTaskStatus({
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
            <Box sx={styles.date}>
                { completedAt && (
                    <Typography variant="caption">
                        {t('Done')}
                        :
                        {completedTime}
                    </Typography>
                ) }
            </Box>
        </Card>
    );
});
