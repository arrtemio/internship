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

    const createTask = () => {
        if (!taskName.trim()) return;

        action(taskName.trim());

        setTaskName('');
    };
    return (
        <Box
            sx={{ display: 'flex', gap: '15px' }}
        >
            <TextField
                label={placeholder}
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                variant={variant}
                fullWidth
                size={size}
            />
            <Button
                variant="outlined"
                onClick={createTask}
            >
                Create
            </Button>
        </Box>
    );
});
