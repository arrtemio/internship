import React, { FC, memo } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { SubmitHandler, useForm } from 'react-hook-form';
import { AddTaskStyle as styles } from './AddTask.style';

interface AddTaskProps {
    action: (title: string) => void;
    placeholder?: string;
    size?: 'small' | 'medium';
    id?: string;
    disabled?: boolean;
}

type AddTaskForm = {
    value: string,
};

export const AddTask: FC<AddTaskProps> = memo(({
    action,
    id = '',
    placeholder = 'Create new task',
    size = 'medium',
    disabled = false,
}) => {
    const { t } = useTranslation('translation');
    const {
        register, handleSubmit, formState: { errors }, reset,
    } = useForm<AddTaskForm>({
        defaultValues: {
            value: '',
        },
    });

    const buttonStyle = size === 'medium' ? styles.buttonMedium : styles.buttonSmall;

    const createTask: SubmitHandler<AddTaskForm> = (data) => {
        action(data.value);
        reset();
    };

    return (
        <Box sx={styles.addTaskBox}>
            <TextField
                label={t(placeholder)}
                fullWidth
                size={size}
                error={!!errors.value?.message}
                helperText={errors.value?.message ? t(errors.value.message) : ' '}
                {...register('value', {
                    required: 'Field cannot be empty',
                })}
            />
            <Button
                variant="outlined"
                onClick={handleSubmit(createTask)}
                sx={buttonStyle}
                disabled={disabled || !!errors.value?.message}
                data-testid={`AddTask-button${id ? `-${id}` : ''}`}
                size={size}
                type="submit"
            >
                {t('Create')}
            </Button>
        </Box>
    );
});
