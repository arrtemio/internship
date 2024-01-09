import React, { FC, memo } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddSubTaskStyle as styles } from './AddSubTask.style';

interface AddSubTaskProps {
    action: (title: string) => void;
    id?: string;
}

type AddSubTaskForm = {
    value: string,
};

export const AddSubTask: FC<AddSubTaskProps> = memo(({
    action,
    id = '',
}) => {
    const { t } = useTranslation('translation');
    const {
        register, handleSubmit, formState: { errors }, reset,
    } = useForm<AddSubTaskForm>({
        defaultValues: {
            value: '',
        },
    });

    const createTask: SubmitHandler<AddSubTaskForm> = (data) => {
        action(data.value);
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
                    required: 'Field cannot be empty',
                })}
            />
            <Button
                variant="outlined"
                onClick={handleSubmit(createTask)}
                sx={styles.buttonSmall}
                disabled={!!errors.value?.message}
                data-testid={`AddSubTask-button${id ? `-${id}` : ''}`}
                size="small"
                type="submit"
            >
                {t('Create')}
            </Button>
        </Box>
    );
});
