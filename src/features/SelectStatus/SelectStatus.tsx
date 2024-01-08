import React, { FC, memo } from 'react';
import {
    FormControl, InputLabel, MenuItem, Select, SelectChangeEvent,
} from '@mui/material';
import { Status } from 'entities/Task';
import { StatusValues } from 'entities/Task/model/types/task';
import { colorsVariant, statusColors } from 'styles/style';
import { useTranslation } from 'react-i18next';
import { useAppSelector } from 'shared/lib/hooks/redux';
import { getUserData } from 'entities/User';
import { SelectStatusStyle as styles } from './SelectStatus.style';

interface SelectStatusProps {
    onChange?: (e: SelectChangeEvent) => void;
    value: Status;
    taskPerformer: string;
}

export const SelectStatus: FC<SelectStatusProps> = memo(({ onChange, value, taskPerformer }) => {
    const { t } = useTranslation('translation');
    const isPerformer = (useAppSelector(getUserData)?.email || null) === taskPerformer;

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
                {t('Status')}
            </InputLabel>
            <Select
                value={value}
                label={t('Status')}
                onChange={onChange}
                onClick={handleClick}
                color={color}
                sx={selectStyle}
                disabled={!isPerformer}
                data-testid="SelectStatus-select"
            >
                {StatusValues.map((status) => (
                    <MenuItem
                        key={status}
                        value={status}
                        data-testid={`SelectStatus-item-${status}`}
                    >
                        {t(status)}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
});
