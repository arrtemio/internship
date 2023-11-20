import React, { FC, memo, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface AddTaskProps {
    action: (title: string) => void;
    variant?: 'outlined' | 'standard' | 'filled';
    placeholder?: string;
    size?: 'small' | 'medium';
}

export const AddTask: FC<AddTaskProps> = memo(({
    action,
    placeholder = 'Create new task',
    variant = 'outlined',
    size = 'medium',
}) => {
    const [taskName, setTaskName] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (error) setError(false);
        setTaskName(event.target.value);
    };

    const createTask = () => {
        if (!taskName.trim()) {
            setError(true);
            return;
        }

        action(taskName.trim());

        setTaskName('');
    };
    return (
        <Box sx={{ display: 'flex', gap: '15px' }}>
            <TextField
                label={placeholder}
                value={taskName}
                onChange={handleChange}
                variant={variant}
                fullWidth
                size={size}
                error={error}
                helperText={`${error ? 'cannot be empty' : ' '}`}
            />
            <Button
                type="submit"
                variant="outlined"
                onClick={createTask}
                sx={{ height: `${size === 'medium' ? '56px' : '40px'}` }}
            >
                Create
            </Button>
        </Box>
    );
});
