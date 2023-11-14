import React, { FC, memo, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface AddTaskProps {
    action: (title: string) => void;
    variant?: 'outlined' | 'standard' | 'filled';
    placeholder?: string;
}

export const AddTask: FC<AddTaskProps> = memo(({
    action,
    placeholder = 'Create new task',
    variant = 'outlined',
}) => {
    const [taskName, setTaskName] = useState<string>('');

    const createTask = () => {
        action(taskName);

        setTaskName('');
    };
    return (
        <Box
            sx={{ display: 'flex' }}
        >
            <TextField
                label={placeholder}
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                variant={variant}
                fullWidth
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
