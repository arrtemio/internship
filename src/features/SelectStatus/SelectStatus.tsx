import React, { FC, memo } from 'react';
import {
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { Status } from 'entities/Task';
import { StatusValues } from 'entities/Task/model/types/task';
import { colorsVariant, statusColors } from 'styles/style';
import { SelectStatusStyle as styles } from './SelectStatus.style';

interface SelectStatusProps {
    onChange?: (e: SelectChangeEvent) => void;
    value: Status;
}

export const SelectStatus: FC<SelectStatusProps> = memo(({ onChange, value }) => {
    const color = colorsVariant[value];
    const selectStyle = styles.select(value);
    const labelStyle = { color: statusColors[value] };

    const handleClick = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation();
    };

    return (
        <FormControl sx={styles.form} size="small">
            <InputLabel
                color={color}
                sx={labelStyle}
            >
                Status
            </InputLabel>
            <Select
                value={value}
                label="Status"
                onChange={onChange}
                onClick={handleClick}
                color={color}
                sx={selectStyle}
                data-testid="SelectStatus-select"
            >
                {StatusValues.map((status) => (
                    <MenuItem
                        key={status}
                        value={status}
                        data-testid={`SelectStatus-item-${status}`}
                    >
                        {status}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});
