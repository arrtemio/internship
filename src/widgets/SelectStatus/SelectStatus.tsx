import React, { FC, memo } from 'react';
import {
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { StatusEnum } from '../../entities/Task/model/types/task';
import { returnStatusColor } from '../../shared/lib/helpers/returnStatusColor/returnStatusColor';

interface SelectStatusProps {
    onChange?: (e: SelectChangeEvent) => void;
    value: StatusEnum;
    color?: 'success' | 'primary' | 'secondary'
}

export const SelectStatus: FC<SelectStatusProps> = memo(({ onChange, value, color = 'primary' }) => (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel color={returnStatusColor(value)}>Status</InputLabel>
        <Select
            value={value}
            label="Status"
            onChange={onChange}
            onClick={(event) => event.stopPropagation()}
            color={returnStatusColor(value)}
            sx={{ fontSize: 'small' }}
        >
            <MenuItem value={StatusEnum.TO_DO}>To do</MenuItem>
            <MenuItem value={StatusEnum.COMPLETED}>Completed</MenuItem>
            <MenuItem value={StatusEnum.IN_PROGRESS}>In progress</MenuItem>
        </Select>
    </FormControl>
));
