import React, { ChangeEvent, FC, useState } from 'react';
import {
    FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput,
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useTranslation } from 'react-i18next';

interface PassFieldProps {
    value: string;
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    error: boolean;
    helperText: string;
    testedComponent?: string;
}

export const PassField: FC<PassFieldProps> = (props) => {
    const {
        value, onChange, helperText, error, testedComponent = '',
    } = props;
    const [showPassword, setShowPassword] = useState<boolean>(false);
    const { t } = useTranslation('translation');

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };
    return (
        <FormControl variant="outlined">
            <InputLabel htmlFor="outlined-adornment-password">{t('Password')}</InputLabel>
            <OutlinedInput
                id="outlined-adornment-password"
                value={value}
                onChange={onChange}
                placeholder={t('Password')}
                type={showPassword ? 'text' : 'password'}
                error={error}
                data-testid={`${testedComponent}-pass`}
                label={t('Password')}
                endAdornment={(
                    <InputAdornment position="end">
                        <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            data-testid={`${testedComponent}-pass-eye`}
                        >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                    </InputAdornment>
                )}
            />
            <FormHelperText error={error}>{helperText || ' '}</FormHelperText>
        </FormControl>
    );
};
