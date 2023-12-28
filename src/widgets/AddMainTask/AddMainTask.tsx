import { ChangeEvent, memo, useState } from 'react';
import {
    Box, Button, Checkbox, FormControlLabel, TextField,
} from '@mui/material';
import { createTask, createTaskDto } from 'entities/Task';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { getUserData } from 'entities/User';
import { useTranslation } from 'react-i18next';
import { FormValidator } from 'shared/lib/helpers';

import { AddMainTaskStyle as styles } from './AddMainTask.style';

export const AddMainTask = memo(() => {
    const dispatch = useAppDispatch();
    const { t } = useTranslation('translation');
    const email = useAppSelector(getUserData)?.email || '';

    const [taskName, setTaskName] = useState<string>('');
    const [taskNameError, setTaskNameError] = useState<string>('');
    const [performer, setPerformer] = useState<string>('');
    const [performerError, setPerformerError] = useState<string>('');
    const [isPrivate, setIsPrivate] = useState<boolean>(false);
    const [isImportant, setIsImportant] = useState<boolean>(false);

    const handleChangeTaskName = (event: ChangeEvent<HTMLInputElement>) => {
        if (taskNameError) setTaskNameError('');
        setTaskName(event.target.value);
    };

    const handleChangePerformer = (event: ChangeEvent<HTMLInputElement>) => {
        if (performerError) setPerformerError('');
        setPerformer(event.target.value);
    };

    const handleChangeIsPrivate = () => {
        setIsPrivate((prevState) => !prevState);
    };

    const handleChangeIsImportant = () => {
        setIsImportant((prevState) => !prevState);
    };

    const createNewTask = () => {
        const isTaskValid = FormValidator.isNotEmpty(taskName, setTaskNameError);
        const isPerformerValid = FormValidator.performerChecking(performer, setPerformerError);
        if (!isPerformerValid || !isTaskValid) return;

        const task = createTaskDto(taskName, email, performer, isPrivate, isImportant);
        dispatch(createTask(task));

        setPerformer('');
        setIsImportant(false);
        setIsPrivate(false);
        setTaskName('');
    };

    return (
        <Box sx={styles.wrapper}>
            <Box sx={styles.taskBox}>
                <TextField
                    label={t('Create new task')}
                    value={taskName}
                    onChange={handleChangeTaskName}
                    fullWidth
                    error={!!taskNameError}
                    helperText={t(taskNameError) || ' '}
                />
                <Button
                    onClick={createNewTask}
                    variant="outlined"
                    size="medium"
                    sx={styles.button}
                    disabled={!!taskNameError || !!performerError}
                    data-testid="AddMainTask-button"
                >
                    {t('Create')}
                </Button>
            </Box>
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
                    control={<Checkbox value={isPrivate} onChange={handleChangeIsPrivate} />}
                    label={t('Private')}
                />
                <FormControlLabel
                    control={<Checkbox value={isImportant} onChange={handleChangeIsImportant} />}
                    label={t('Important')}
                />
            </Box>
        </Box>
    );
});
