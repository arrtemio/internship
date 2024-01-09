import { memo } from 'react';
import {
    Box, Button, Checkbox, FormControlLabel, TextField,
} from '@mui/material';
import { createTask, createTaskDto } from 'entities/Task';
import { useAppDispatch, useAppSelector } from 'shared/lib/hooks/redux';
import { getUserData } from 'entities/User';
import { useTranslation } from 'react-i18next';

import { SubmitHandler, useForm } from 'react-hook-form';
import { AddMainTaskStyle as styles } from './AddMainTask.style';

type AddMainTaskForm = {
    performer: string,
    taskName: string,
    isImportant: boolean,
    isPrivate: boolean,
}

export const AddMainTask = memo(() => {
    const dispatch = useAppDispatch();
    const {
        handleSubmit, register, formState: { errors }, reset, watch,
    } = useForm<AddMainTaskForm>({
        defaultValues: {
            performer: '',
            taskName: '',
            isImportant: false,
            isPrivate: false,
        },
    });

    const { t } = useTranslation('translation');
    const taskAuthor = useAppSelector(getUserData)?.email || '';

    const createNewTask: SubmitHandler<AddMainTaskForm> = (data) => {
        const {
            performer, isPrivate, isImportant, taskName,
        } = data;
        const task = createTaskDto(taskName, taskAuthor, performer, isPrivate, isImportant);

        dispatch(createTask(task));
        reset();
    };

    return (
        <Box sx={styles.wrapper}>
            <Box sx={styles.top_inputs}>
                <TextField
                    fullWidth
                    label={t('Create new task')}
                    error={!!errors.taskName?.message}
                    helperText={errors.taskName?.message ? t(errors.taskName.message) : ' '}
                    {...register('taskName', {
                        required: 'Field cannot be empty',
                    })}
                />
                <Button
                    sx={styles.button}
                    variant="outlined"
                    type="submit"
                    data-testid="AddSubTask-button"
                    onClick={handleSubmit(createNewTask)}
                    disabled={!!errors.taskName?.message || !!errors.performer?.message}
                >
                    {t('Create')}
                </Button>
            </Box>
            <Box sx={styles.inputs}>
                <TextField
                    fullWidth
                    label={t('Performer email')}
                    helperText={errors.performer?.message ? t(errors.performer.message) : ' '}
                    error={!!errors.performer?.message}
                    {...register('performer', {
                        pattern: {
                            value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                            message: 'Must be an email',
                        },
                    })}
                />
                <FormControlLabel
                    control={<Checkbox checked={watch('isPrivate')} {...register('isPrivate')} />}
                    label={t('Private')}
                />
                <FormControlLabel
                    control={<Checkbox checked={watch('isImportant')} {...register('isImportant')} />}
                    label={t('Important')}
                />
            </Box>
        </Box>
    );
});
