import React, { FC, memo, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
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

    const buttonStyle = size === 'medium' ? styles.buttonMedium : styles.buttonSmall;
    const helperText = error ? 'The field cannot be empty' : ' ';

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
                label={placeholder}
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
                color={error ? 'error' : 'primary'}
                data-testid={`AddTask-button${id ? `-${id}` : ''}`}
                size={size}
            >
                Create
            </Button>
        </Box>
    );
});
