import React, { FC, memo } from 'react';
import {
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { StatusEnum } from '../../../entities/Task/model/types/task';

interface SelectStatusProps {
    onChange?: (e: SelectChangeEvent) => void;
    value: StatusEnum;
    label?: string;

}

export const SelectStatus: FC<SelectStatusProps> = memo(({ onChange, value, label = 'Status' }) => (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
        <InputLabel>{label}</InputLabel>
        <Select
            value={value}
            label={label}
            onChange={onChange}
            onClick={(event) => event.stopPropagation()}
        >
            <MenuItem value={StatusEnum.TO_DO}>To do</MenuItem>
            <MenuItem value={StatusEnum.COMPLETED}>Completed</MenuItem>
            <MenuItem value={StatusEnum.IN_PROGRESS}>In progress</MenuItem>
        </Select>
    </FormControl>
));
