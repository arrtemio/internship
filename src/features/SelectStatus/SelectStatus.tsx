import React, { FC, memo } from 'react';
import {
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { Status } from 'entities/Task';
import { returnStatusColor } from 'shared/lib/helpers';
import { StatusValues } from 'entities/Task/model/types/task';
import { statusColors } from 'styles/style';

interface SelectStatusProps {
    onChange?: (e: SelectChangeEvent) => void;
    value: Status;
}

export const SelectStatus: FC<SelectStatusProps> = memo(({ onChange, value }) => {
    const color = returnStatusColor(value);

    return (
        <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
            <InputLabel
                color={color}
                sx={{ color: statusColors[value] }}
            >
                Status
            </InputLabel>
            <Select
                value={value}
                label="Status"
                onChange={onChange}
                onClick={(event) => event.stopPropagation()}
                color={color}
                sx={{
                    fontSize: 'small',
                    '& .MuiOutlinedInput-notchedOutline': {
                        borderColor: statusColors[value],
                    },
                }}
            >
                {StatusValues.map((status) => (
                    <MenuItem
                        key={status}
                        value={status}
                    >
                        {status}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});
