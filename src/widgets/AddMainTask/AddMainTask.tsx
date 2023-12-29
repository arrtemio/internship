import { ChangeEvent, memo, useState } from 'react';
import {
    Box, Checkbox, FormControlLabel, TextField,
} from '@mui/material';
import { createTask, createTaskDto } from 'entities/Task';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { getUserData } from 'entities/User';
import { useTranslation } from 'react-i18next';
import { FormValidator } from 'shared/lib/helpers';

import { AddMainTaskStyle as styles } from './AddMainTask.style';
import { AddTask } from '../../features/Addtask/AddTask';

export const AddMainTask = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation');
    const email = useAppSelector(getUserData)?.email || '';

    const [performer, setPerformer] = useState<string>('');
    const [performerError, setPerformerError] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [isImportant, setIsImportant] = useState<boolean>(false);

    const handleChangePerformer = (event: ChangeEvent<HTMLInputElement>) => {
        if (performerError) setPerformerError('');
        setPerformer(event.target.value);
    };

    const handleChangeIsPrivate = () => {
        setIsPrivate(!isPrivate);
    };

    const handleChangeIsImportant = () => {
        setIsImportant(!isImportant);
    };

    const createNewTask = (taskName: string) => {
        const isPerformerValid = FormValidator.emailChecking(performer, setPerformerError, true);
        if (!isPerformerValid) return false;

        if (!taskName.trim()) return false;

        const task = createTaskDto(taskName, email, performer, isPrivate, isImportant);
        dispatch(createTask(task));

        setPerformer('');
        setIsImportant(false);
        setIsPrivate(false);

        return true;
    };

    return (
        <Box sx={styles.wrapper}>
            <AddTask action={createNewTask} disabled={!!performerError} />
            <Box sx={styles.inputs}>
                <TextField
                    label={t('Performer email')}
                    value={performer}
                    helperText={t(performerError) || ' '}
                    onChange={handleChangePerformer}
                    fullWidth
                    error={!!performerError}
                />
                <FormControlLabel
                    control={(
                        <Checkbox
                            value={isPrivate}
                            onChange={handleChangeIsPrivate}
                            checked={isPrivate}
                        />
                    )}
                    label={t('Private')}
                />
                <FormControlLabel
                    control={(
                        <Checkbox
                            value={isImportant}
                            onChange={handleChangeIsImportant}
                            checked={isImportant}
                        />
                    )}
                    label={t('Important')}
                />
            </Box>
        </Box>
    );
});
