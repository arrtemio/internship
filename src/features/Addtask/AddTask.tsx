import React, { FC, memo, useState } from 'react';
import { Box, Button, TextField } from '@mui/material';
import { AddTaskStyle } from './AddTask.style';

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
    const [value, setValue] = useState<string>('');
    const [error, setError] = useState<boolean>(false);

    const buttonStyle = size === 'medium' ? AddTaskStyle.buttonMedium : AddTaskStyle.buttonSmall;
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
        <Box sx={AddTaskStyle.addTaskBox}>
            <TextField
                label={placeholder}
                value={value}
                onChange={handleChange}
                variant={variant}
                fullWidth
                size={size}
                error={error}
                helperText={helperText}
            />
            <Button
                type="submit"
                variant="outlined"
                onClick={createTask}
                sx={buttonStyle}
                disabled={error}
                color={error ? 'error' : 'primary'}
            >
                Create
            </Button>
        </Box>
    );
});
