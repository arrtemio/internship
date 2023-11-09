import React, { FC, memo, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';

interface AddTaskProps {
    action: (title: string) => void;
}

export const AddTask: FC<AddTaskProps> = memo(({ action }) => {
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
                label="Create new task"
                value={taskName}
                onChange={(e) => setTaskName(e.target.value)}
                variant="outlined"
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
