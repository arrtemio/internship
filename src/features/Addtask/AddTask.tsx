import React, { FC, memo, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { FormValidator } from 'shared/lib/helpers';
import { AddTaskStyle as styles } from './AddTask.style';

interface AddTaskProps {
    action: (title: string) => boolean;
    placeholder?: string;
    size?: 'small' | 'medium';
    id?: string;
    disabled?: boolean;
}

export const AddTask: FC<AddTaskProps> = memo(({
    action,
    id = '',
    placeholder = 'Create new task',
    size = 'medium',
    disabled = false,
}) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<string>('');
    const { t } = useTranslation('translation');

    const buttonStyle = size === 'medium' ? styles.buttonMedium : styles.buttonSmall;

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError('');
        setValue(event.target.value);
    };

    const createTask = () => {
        const isValueValid = FormValidator.isNotEmpty(value, setError);

        const isActionSuccessful = action(value);

        if (isValueValid && isActionSuccessful) setValue('');
    };

    return (
        <Box sx={styles.addTaskBox}>
            <TextField
                label={t(placeholder)}
                value={value}
                onChange={handleChange}
                fullWidth
                size={size}
                error={!!error}
                helperText={t(error) || ' '}
            />
            <Button
                variant="outlined"
                onClick={createTask}
                sx={buttonStyle}
                disabled={disabled || !!error}
                data-testid={`AddTask-button${id ? `-${id}` : ''}`}
                size={size}
            >
                {t('Create')}
            </Button>
        </Box>
    );
});
