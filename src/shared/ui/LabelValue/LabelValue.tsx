import React, { FC, memo } from 'react';
import { Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';

interface LabelValueProps {
    label: string,
    value: string | number,
    variant?: Variant,
    align?: 'right' | 'left' | 'center' | 'inherit' | 'justify' | undefined,
    testID?: string,
}

export const LabelValue: FC<LabelValueProps> = memo((
    {
        label, value, testID, variant = 'caption', align = 'inherit',
    },
) => (
    <Typography variant={variant} align={align} data-testid={testID}>
        {label}
        :
        {value}
    </Typography>
));
