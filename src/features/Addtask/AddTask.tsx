import React, { FC, memo, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { useTranslation } from 'react-i18next';
import { AddTaskStyle as styles } from './AddTask.style';

interface AddTaskProps {
    action: (title: string) => void;
    placeholder?: string;
    size?: 'small' | 'medium';
    id?: string;
}

export const AddTask: FC<AddTaskProps> = memo(({
    action,
    id = '',
    placeholder = 'Create new task',
    size = 'medium',
}) => {
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);
    const { t } = useTranslation('translation');

    const buttonStyle = size === 'medium' ? styles.buttonMedium : styles.buttonSmall;
    const helperText = error ? t('Field cannot be empty') : ' ';

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false);
        setValue(event.target.value);
    };

    const createTask = () => {
        const taskName = value.trim();
        if (!taskName) {
            setError(true);
            return;
        }

        action(taskName);

        setValue('');
    };
    return (
        <Box sx={styles.addTaskBox}>
            <TextField
                label={t(placeholder)}
                value={value}
                onChange={handleChange}
                fullWidth
                size={size}
                error={error}
                helperText={helperText}
            />
            <Button
                variant="outlined"
                onClick={createTask}
                sx={buttonStyle}
                disabled={error}
                data-testid={`AddTask-button${id ? `-${id}` : ''}`}
                size={size}
            >
                {t('Create')}
            </Button>
        </Box>
    );
});
