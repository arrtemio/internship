import React, { FC, memo } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/lib/hooks/redux';
import { SubmitHandler, useForm } from 'react-hook-form';
import { FormMessages } from 'shared/lib/messages';
import { createSubTask, createSubTaskDto } from 'entities/Task';

import { AddSubTaskStyle as styles } from './AddSubTask.style';

interface AddSubTaskProps {
    id: string;
}

type AddSubTaskForm = {
    value: string,
};

export const AddSubTask: FC<AddSubTaskProps> = memo(({ id }) => {
    const { t } = useTranslation('translation');
    const dispatch = useAppDispatch();
    const {
        register, handleSubmit, formState: { errors }, reset,
    } = useForm<AddSubTaskForm>({
        defaultValues: {
            value: '',
        },
    });

    const createNewSubTask: SubmitHandler<AddSubTaskForm> = ({ value }) => {
        const subTask = createSubTaskDto(value);

        dispatch(createSubTask({ taskID: id, subTask }));

        reset();
    };

    return (
        <Box sx={styles.addTaskBox}>
            <TextField
                label={t('Create sub task')}
                placeholder={t('Create sub task')}
                fullWidth
                size="small"
                error={!!errors.value?.message}
                helperText={errors.value?.message ? t(errors.value.message) : ' '}
                {...register('value', {
                    required: FormMessages.EMPTY,
                })}
            />
            <Button
                variant="outlined"
                onClick={handleSubmit(createNewSubTask)}
                sx={styles.buttonSmall}
                disabled={!!errors.value?.message}
                data-testid={`AddSubTask-button-${id}`}
                size="small"
                type="submit"
            >
                {t('Create')}
            </Button>
        </Box>
    );
});
